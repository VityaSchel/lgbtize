import './env.js'
import TelegramBot from 'node-telegram-bot-api'
import tmp from 'temp-dir'
import { lgbt } from 'lgbt'

const token = process.env.TOKEN
if(!token) throw new Error('TOKEN is not defined')

const bot = new TelegramBot(token, { polling: true })
bot.on('message', async (event) => {
  if(!event.photo) {
    await bot.sendMessage(event.chat.id, 'Пришли мне фото')
    return
  }

  const photo = event.photo.sort((photo1, photo2) => photo2.width*photo2.height - photo1.width*photo1.height)[0]
  const file = await bot.downloadFile(photo.file_id, tmp)

  const msg = await bot.sendMessage(event.chat.id, 'Пидоризация... 🏳️‍🌈')
  
  const result = await lgbt(file)
  await bot.deleteMessage(event.chat.id, msg.message_id)
  await bot.sendPhoto(event.chat.id, result)
})