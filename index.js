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

bot.on('error', (err) => {
  console.log(err);
})

const poems = [
  {
    line1: 'line1',
    line2: 'line2',
    line3: 'line3'
  },
  {
    line1: 'line4',
    line2: 'line5',
    line3: 'line6'
  },
  {
    line1: 'line7',
    line2: 'line8',
    line3: 'line9'
  },
]

const sendHaiku = () => {
  bot.postMessageToChannel(
    'tomtest',
    `:zap: ${poems[1].line2}`
);
}

function handleMessage(message) {
  if (message.includes('recite')) return sendHaiku()
}

bot.on('message', (data) => {
  if(data.type !== 'message') {
      return;
  }
  handleMessage(data.text);
})