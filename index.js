const SlackBot = require('slackbots');
const axios = require('axios')
const dotenv = require('dotenv')

dotenv.config({ debug: process.env.DEBUG })

const bot = new SlackBot({
  token: `${process.env.BOT_TOKEN}`,
  name: 'poeticdog'

})

bot.on('start', () => {
  const params = {
      icon_emoji: ':dog:'
  }

  bot.postMessageToChannel(
      'tomtest',
      'test123',
      params
  );
})