# LGBT

![Old mudila](https://git.hloth.dev/hloth/lgbtize/raw/branch/master/old-mudila.avif)

[Bun](https://bun.sh) utilities to LGBTize anything. Node.js is not supported. Deno is not supported.

Check out [Telegram bot](https://git.hloth.dev/VityaSchel/lgbtize/tree/telegram-bot) that paints pictures to LGBT flag.

## lgbt(image: Uint8Array | ArrayBuffer | Blob): Promise&lt;Uint8Array&gt;

Uses ImageMagick's hue shifting under the hood. `magick convert` must be installed and available in PATH.

Example with local file:

```ts
import { lgbt } from "lgbt";

const heterostink = await Bun.file("normis.png").bytes();
const gayslay = await lgbt(heterostink);
await Bun.write("lgbtized.png", gayslay);
```

Example with remote file:

```ts
import { lgbt } from "lgbt";

const bun = await fetch("https://bun.sh/logo.svg").then((res) =>
	res.arrayBuffer(),
);
const epicbun = await lgbt(bun);
await Bun.write("epicbunlogo.png", epicbun);
```

## lgbtPhrase(phrase: string): string

Insert rainbow flags AND other lgbt-ish things 💅🏼🏳️‍🌈

Example:

```ts
import { lgbtPhrase } from "lgbt";

const newPhrase = lgbtPhrase("I am 100% Straight and I am not gay.");
console.log(newPhrase); // I 🌈 am 🌈 100% 💅🏼 Straight 🏳️‍🌈 and 🏳️‍⚧️ I 🏳️‍⚧️ am 💅🏼 not 🌈 gay. 💅🏼
```

## License

[MIT](./LICENSE)

## Donate

[hloth.dev/donate](https://hloth.dev/donate)
