const { App } = require('@slack/bolt');
const store = require('./store');

const dotenv = require('dotenv')
dotenv.config({ debug: process.env.DEBUG })

// use the Bolt framework to scaffold a new Slack App
// and obviously, don't commit your secrets to the repository
/** Someone's built the tools, use them
 * 
 * scaffold a new slack app
 * take care not to commit your secrets to the repository
 * (gitignore the environment variables and pop them in Heroku manually)
 * 
 * NOTE: this will change if the app is destined for public consumption
 * because the OAuth implementation is a different kettle of fish
 * @todo - find out what's needed to publish this app to the Slack App Marketplace
 */
const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN
});

/** LIST OF POEMS
 * Ordinarily, this would live in a database. 
 * However, since this is an experiment we are hard-coding a list
 * of resources that our app will need to spit mad verse :)
 */
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
  },{
    title: "TAKEN",
    line1: "You may take my balls",
    line2: "But I will lick what remains",
    line3: "And then, dear, your face."
  },
  {
    title: "GRASS",
    line1: "Why do I eat grass? ",
    line2: "Perhaps today is the day",
    line3: "It is sausages"
  },
  {
    title: "GOING TO THE PARK",
    line1: "Forgive my distrust",
    line2: "But the last time you said 'the park'",
    line3: "Someone took my balls"
  },
  {
    title: "BEST FRIEND",
    line1: "The definition",
    line2: "Of friendship must surely be",
    line3: "You, a bag, my poo"
  },
  {
    title: "RETURNING",
    line1: "Whenever you leave",
    line2: "The wonder of your return",
    line3: "Almost makes things whole"
  },
  {
    title: "THE BOSS",
    line1: "I just eat and sleep",
    line2: "And you collect me faeces",
    line3: "But sure, you're the boss"
  },
  {
    title: "THE ROLL",
    line1: "That paper you keep",
    line2: "In a roll, next to the seat",
    line3: "I fixed that for you"
  },
  {
    title: "RUBS",
    line1: "It hurts my feelings",
    line2: "When you avoid stroking there",
    line3: "Nipples are me too"
  },
  {
    title: "PLAYING",
    line1: "I do not believe",
    line2: "That your fixation with my",
    line3: "Playing dead is fine"
  },
  {
    title: "WHEN I LOOK UP AT YOU",
    line1: "You think what we think",
    line2: "You are perfect creations",
    line3: "We know you need that"
  },
  {
    title: "STANDING",
    line1: "I sometimes feel bad",
    line2: "That I don't get as happy",
    line3: "Whenever you sit"
  },
  {
    title: "BED",
    line1: "Before sleep, we turn",
    line2: "Circling again and again",
    line3: "This disappearing"
  },
  {
    title: "WHAT'S THAT, BOY?",
    line1: "When you look like that",
    line2: "Sometimes, it's like you're trying",
    line3: "To tell me something"
  },
  {
    title: "PERFECTION",
    line1: "It is so perfect",
    line2: "That the warm small of your back",
    line3: "Fits my cold nose so"
  },
  {
    title: "THE TAIL THAT WAGS",
    line1: "Sometimes I'm happy",
    line2: "But often it's a little",
    line3: "More complicated"
  },
  {
    title: "WHO'S A GOOD BOY",
    line1: "I no longer know",
    line2: "If you're being genuine",
    line3: "Or rhetorical"
  },
  {
    title: "A BETTER BOY",
    line1: "Yes, good is OK",
    line2: "But I want to be better",
    line3: "Perhaps a great boy?"
  },
  {
    title: "PANTING",
    line1: "You try keeping cool",
    line2: "When the only hairless bit",
    line3: "Is in your mouth"
  },
  {
    title: "CHAIR",
    line1: "We should have a talk",
    line2: "About the chair. No biggie, ",
    line3: "I'm fine with sharing"
  },
  {
    title: "NAPPIES",
    line1: "Now that they have bred",
    line2: "They keep parcels of faeces",
    line3: "For me to open"
  },
  {
    title: "THE BALL",
    line1: "I bring you the ball",
    line2: "You throw it far, far away",
    line3: "Summer follows spring"
  },
  {
    title: "SLIPPERS",
    line1: "My advice to you",
    line2: "Is have one set of foot things",
    line3: "Then I can relax"
  },
  {
    title: "THE SMELL OF ALL THINGS",
    line1: "If I didn't check",
    line2: "Who knows how the world might smell?",
    line3: "Yes, mainly dog wee"
  },
  {
    title: "PATS",
    line1: "You seem to believe",
    line2: "That I like being patted",
    line3: "I prefer bacon"
  },
  {
    title: "FRONT LEGS",
    line1: "There's no easy way",
    line2: "For me to break this to you",
    line3: "Your front legs are weird"
  },
  {
    title: "THE LEAD",
    line1: "You make me bring you",
    line2: "This harness of oppression",
    line3: "In my own damn mouth"
  },
  {
    title: "DOGGY STYLE",
    line1: "How would you like it",
    line2: "If I reduced your species",
    line3: "To sex logistics"
  },
  {
    title: "SELFISH",
    line1: "Hey, would it kill you,",
    line2: "Every once in a while, ",
    line3: "To lick my face back?"
  },
  {
    title: "GOING TO LIVE ON THE FARM",
    line1: "Guys, there is no farm",
    line2: "I wish there was, but there is",
    line3: "Only nothingness"
  },
  {
    title: "DOG FARTS",
    line1: "How about you try",
    line2: "Eating what you make me eat",
    line3: "Before you judge me"
  },
  {
    title: "CONSPIRACY",
    line1: "This whole 'cat, dog thing'",
    line2: "Is entirely happening",
    line3: "On television"
  },
  {
    title: "PERSPECTIVE",
    line1: "To be fair, although",
    line2: "I have made rather a mess",
    line3: "You steal testicles"
  },
  {
    title: "THE DOOR HOLE",
    line1: "If I didn't bark",
    line2: "Who knows what terrible things",
    line3: "Might come through the hole"
  },
  {
    title: "YOUR THINGS",
    line1: "You keep throwing it",
    line2: "I keep on bringing it back",
    line3: "Look. After. Your. Things."
  },
  {
    title: "WALKIES",
    line1: "I have come to loathe",
    line2: "That singsong voice you employ",
    line3: "It demeans us both"
  },
  {
    title: "BEG",
    line1: "What kind of a man",
    line2: "Will only feed their best friend",
    line3: "If they beg for it?"
  },
  {
    title: "THE MOVING THING",
    line1: "Nobody knows what",
    line2: "Happens if I don't do this",
    line3: "But let's not risk it"
  },
  {
    title: "SHOES",
    line1: "How about next time",
    line2: "You don't make foor coverings",
    line3: "From delicious cow?"
  },
  {
    title: "HOWL",
    line1: "I saw the best minds",
    line2: "Of my generation, lick",
    line3: "Each other's bumholes"
  },
  {
    title: "A BALANCED DIET",
    line1: "To be honest, dear",
    line2: "We find it a little odd",
    line3: "That you don't eat poop"
  },
  {
    title: "A DOG'S LIFE",
    line1: "Your use of this phrase",
    line2: "Shows a striking ignorance ",
    line3: "Of what makes life nice"
  },
  {
    title: "TOILET",
    line1: "I have a complaint",
    line2: "Someone keeps leaving huge poos",
    line3: "In my special bowl"
  },
  {
    title: "NAMES",
    line1: "Within me there lies",
    line2: "The blood of a million wolves",
    line3: "You named me 'Fluffy'"
  },
  {
    title: "BURIED",
    line1: "Last night I buried",
    line2: "The thing I adore the most",
    line3: "Can you get it please?"
  },
  {
    title: "THE TABLE",
    line1: "If I just sit here, ",
    line2: "Contemplating nothingness",
    line3: "Sausages might come?"
  },
  {
    title: "BEWARE",
    line1: "Think how you would feel",
    line2: "If there was a sign saying:",
    line3: "Beware the human"
  },
  {
    title: "AL FRESCO",
    line1: "Lunch, no longer lunch",
    line2: "Pooling in the autumn sunshine",
    line3: "Becomes again lunch"
  },
  {
    title: "GOOD BOY",
    line1: "Your predilection",
    line2: "For giving this constant praise",
    line3: "Says more about you"
  },
  {
    title: "THE OUTSIDE BELL",
    line1: "It is very rude",
    line2: "That you don't call out in joy",
    line3: "When people arrive"
  },
  {
    title: "AFTER THE PUDDLE",
    line1: "We can both agree",
    line2: "That the only solution",
    line3: "Is violent shaking"
  },
  {
    title: "AN OFFERING",
    line1: "I do not have much",
    line2: "But what little that I do",
    line3: "I place in your shoes"
  },
  {
    title: "LICKS",
    line1: "You seem to think that",
    line2: "The licking thing signals love",
    line3: "Salt is delicious"
  },
  {
    title: "CRAYONS",
    line1: "Oh, kind tiny one, ",
    line2: "Who fed me the coloured sticks",
    line3: "Now I poop rainbows"
  },
  {
    title: "THE PAST IN FRONT OF US",
    line1: "This tail I follow",
    line2: "Rich with possibilities",
    line3: "Behind us, futures..."
  },
  {
    title: "SHAME",
    line1: "Now that you say it",
    line2: "It seems pretty obvious",
    line3: "I shouldn't have peed"
  },
  {
    title: "WHITE LIES",
    line1: "You throw the ball and",
    line2: "I will chase it, though clearly",
    line3: "It's behind your back"
  },
  {
    title: "A NEW PERSPECTIVE",
    line1: "Life is so puzzling",
    line2: "But perhaps it will make sense",
    line3: "If I tilt my head"
  },
  {
    title: "A WINTER MORNING",
    line1: "I have come to think",
    line2: "That neither of us enjoys",
    line3: "These walks. Shall we stop?"
  }
]

// THIS IS THE HEART OF THE APP: builds the response to be posted to a given
// Slack channel. Chooses a random poem from the list and returns a string template
const sendHaiku = () => {
  const chosen = Math.floor(Math.random()*poems.length)

  return `ok, here's a haiku
    
    *${poems[chosen].title}*
     
    ${poems[chosen].line1}
    ${poems[chosen].line2}
    ${poems[chosen].line3}
  `

}

/** Interacting with Poetic Dog from the Apps section of the Slack sidebar
 * 
 * This would be a good place for Poetic Dog to tell you what it can do. 
 * This code allows the app to know if the user has already tried using 
 * Poetic Dog, and if not, might welcome the user to the app for the first time
 * with, say, an introductory note and a how-to
 * @todo - craft a welcome message and HOW-TO guide for Poetic Dog
 */
app.event('app_home_opened', ({ event, say }) => {  
  // Look up the user from the app's store
  let user = store.getUser(event.user);
  
  // you may want to treat a new user differently
  if(!user) {
    user = {
      user: event.user,
      channel: event.channel
    };
    store.addUser(user);
    
    say(`Welcome <@${event.user}>!`);
  } else { 
    // this user is known to the app already
    say('How I missed you!');
  }
});

// Listens for the trigger word and replies with a haiku
app.message('recite', async ({message, say}) => {
  await say(sendHaiku())
});


// Start your app
(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
  console.log(process.env)
})();

