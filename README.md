# LGBT

![Putin](https://imgdb.net/storage/uploads/68590e7a835f3dd5cf2f82cdbce3de591ecfb03850c32e9ca62a7d0ad1246fe3.png)

Node.js utilities to LGBTize anything.

Check out [Telegram bot](https://t.me/lgbtize_bot) that paints pictures to LGBT flag.

## lgbt(pathToImage: string)

Uses ImageMagick's hue shifting under the hood

Example:
```ts
import { lgbt } from 'lgbt'

const bufferResult = await lgbt('/Users/Putin/Desktop/me.png')
console.log(bufferResult)
```

## lgbtPhrase(phrase: string)

Insert rainbow flags AND other lgbt-ish things 💅🏼🏳️‍🌈 

Example:
```ts
import { lgbtPhrase } from 'lgbt'

const newPhrase = lgbtPhrase('I am 100% Straight and I am not gay.')
console.log(newPhrase) // I 🌈 am 🌈 100% 💅🏼 Straight 🏳️‍🌈 and 🏳️‍⚧️ I 🏳️‍⚧️ am 💅🏼 not 🌈 gay. 💅🏼
```
