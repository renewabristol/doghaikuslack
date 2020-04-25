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
    title: "JOY",
    line1: 'Although it is true,',
    line2: 'That I enjoy balls and bones,',
    line3: "They don't define me"
  },
  {
    title: "HOMEWORK",
    line1: "I don't know that word,",
    line2: "But I'm completely certain,",
    line3: "I didnt' eat it."
  },
  {
    title: "THE THRONE",
    line1: 'The water you keep,',
    line2: 'In the dog-height chair, you say',
    line3: "It's NOT for drinking?"
  },
]

const sendHaiku = () => {
  const chosen = Math.floor(Math.random()*poems.length)

  const params = {"blocks":[
    // it would be possible to structure a very decent looking message 
    // in here with pictures and other stuff
    
    // you could even call https://dog.ceo/api/breeds/image/random API
    // and prepare the image line in the block image URL
    // but you would need to call that first
    // https://dog.ceo/dog-api/ and https://www.taniarascia.com/how-to-connect-to-an-api-with-javascript/ 
  ]}

  bot.postMessageToChannel(
    'tomtest', // this is the name of the channel in which bot will post
    
    `ok, here's a haiku\n \n *${poems[chosen].title}*\n \n${poems[chosen].line1}\n${poems[chosen].line2}\n${poems[chosen].line3}`,
    // params
  );
}

const explainHowTo = () => {
  bot.postMessageToChannel('tomtest','try typing poeticdog recite')
}

const handleMessage = message => {
  if (message.includes('recite')) return sendHaiku()
  if (message.includes('help') || message.includes('?')) return explainHowTo()
}

bot.on('message', (data) => {
  if(data.type !== 'message') {
      return;
  }
  handleMessage(data.text);
})