import { $ } from "bun"

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'DarkMagenta']

export async function lgbt(image: Uint8Array | ArrayBuffer | Blob): Promise<Uint8Array> {
	const outputs: Blob[] = [];
	
	for (let i = 0; i < colors.length; i++) {
		const step = 1/(colors.length);
		const output = await $`magick convert - -set page ${`-%[fx:w*0]-%[fx:h*${i * step}]`} -crop ${`0%x${step * 100}%+0+0`} -colorspace gray -fill ${colors[i]} -tint 100 miff:- < ${image}`.blob()
		outputs.push(output)
	}
	
	const result = await $`magick convert miff:- -append png:- < ${new Blob(outputs)}`.arrayBuffer();
	
	return new Uint8Array(result);
}
	
export function lgbtPhrase(phrase: string): string {
	return phrase.replaceAll(
		/( |\n|$)/g, () => ' ' + ['🏳️‍🌈', '💅🏼', '🏳️‍⚧️', '👨‍❤️‍👨', '🌈'][Math.floor(Math.random() * 5)] + ' '
	)
}