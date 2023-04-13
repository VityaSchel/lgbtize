import im from 'imagemagick'
import tmp from 'temp-dir'
import { v4 as uuid } from 'uuid'
import path from 'path'
import fs from 'fs/promises'

export async function lgbt(pathToImage: string) {
  const outputs: string[] = []
  const colors = ['red', 'orange', 'yellow', 'green', 'DeepSkyBlue1', 'blue', 'DarkMagenta']
  const extension = path.extname(pathToImage)
  for(let i = 0; i < colors.length; i++) {
    const output = `${tmp}/${uuid()}${extension}`
    const step = 1/colors.length
    const crop = generateCrop(i*step*100, step*100)
    const [convertionError] = await new Promise<[Error, any]>(resolve => 
      im.convert([
        pathToImage,
        '-crop',
        crop,
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

    const resultOutput = `${tmp}/${uuid()}${extension}`
    const [appendError] = await new Promise<[Error, any]>(resolve =>
      im.convert([
        '-append',
        ...outputs,
        resultOutput
      ], (err, result) => resolve([err, result]))
    )
    if(appendError) throw appendError
    return fs.readFile(resultOutput)
  }
}

const generateCrop = (heightStart: number, height: number) => `100%x${height}%+0%+${heightStart}%`
// `%[fx:w*1]x%[fx:h*${height.toFixed(2)}]+%[fx:w*0]+%[fx:h*${heightStart.toFixed(2)}]`