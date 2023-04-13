import im from 'imagemagick'
import tmp from 'temp-dir'
import { v4 as uuid } from 'uuid'
import path from 'path'
import fs from 'fs/promises'

export async function lgbt(pathToImage: string): Promise<Buffer> {
  const outputs: string[] = []
  const colors = ['red', 'orange', 'yellow', 'green', 'DeepSkyBlue1', 'blue', 'DarkMagenta']
  const extension = path.extname(pathToImage)

  const generatePart = async (i: number) => {
    const output = `${tmp}/${uuid()}${extension}`
    const step = 1/(colors.length)
    const [convertionError] = await new Promise<[Error, any]>(resolve => 
      im.convert([
        pathToImage,
        '-set',
        'page',
        `-%[fx:w*0]-%[fx:h*${i*step}]`,
        '-crop',
        `0%x${step*100}%+0+0`,
        '-colorspace',
        'gray', // haha fvery funny go fuck yousefl
        '-fill',
        colors[i],
        '-tint',
        '100',
        output
      ], (err, result) => resolve([err, result])))
    if(convertionError) throw convertionError
    outputs.push(output)
  }

  await Promise.all(colors.map((_, i) => generatePart(i)))

  const resultOutput = `${tmp}/${uuid()}${extension}`
  const [appendError] = await new Promise<[Error, any]>(resolve =>
    im.convert([
      '-append',
      ...outputs,
      resultOutput
    ], (err, result) => resolve([err, result]))
  )
  if(appendError) throw appendError

  for(const part of outputs) {
    await fs.rm(part)
  }
  
  const resultOutputBuffer = fs.readFile(resultOutput)
  await fs.rm(resultOutput)
  
  return resultOutputBuffer
}

export function lgbtPhrase(phrase: string): string {
  return phrase.replaceAll(
    /( |\n|$)/g, () => ' ' + ['🏳️‍🌈', '💅🏼', '🏳️‍⚧️', '👨‍❤️‍👨', '🌈'][Math.floor(Math.random() * 5)] + ' '
  )
}