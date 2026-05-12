const loreConfig = {

  channelCooldown: 30000,

  randomThoughtChance: 0.003
};


const loreMessages = {

  onMention: [

    "Yes yes, I'm here, darling.",

    "Must I supervise everything personally?",

    "You summoned me. How exhausting.",

    "Careful, darling. I *am* listening.",

    "Ah. Someone requires my flawless expertise again."
  ],

  randomThoughts: [

    "This server becomes suspiciously chaotic when I stop watching.",

    "I do hope someone is creating something worthwhile tonight.",

    "Managing creatives is a full-time affliction.",

    "The moon is high. That means some of you should be drawing.",

    "Honestly, darling, I leave for five minutes..."
  ],

  encouragements: [

    "Good. Keep creating, darling.",

    "See? Progress. I knew you had it in you.",

    "Much better. You're all slightly less hopeless today.",

    "Consistency is attractive, darling."
  ],

  spicyButFriendly: [

    "Language, darling.",

    "Such dramatic vocabulary tonight.",

    "Honestly, some of you speak like cursed sailors."
  ],

  rareThoughts: [

  "Some nights, I almost remember who I was before this server.",

  "Do you ever wonder who watches the watchers, darling?",

  "There are older things than me lurking in the dark corners of Discord.", 

  "XXXX"
],
    ventingReplies: [

  "Even immortal supervisors understand difficult days, darling.",

  "You are allowed to rest. The moon does it every night.",

  "One difficult evening does not define you.",

  "Try to be gentler with yourself, darling."
],

 ancientTexts: [

`Harken close and beware the Vampyr.
Beware its cold beauty. Beware its charm. Beware its curse.
Above all, beware the pale noble, for the Vampyr cannot bear to be of the common folk.

How doth one protect from the Beast?
Walk not in blackest night, for the Vampyr loves these nights more than any other.

If you must walk, do so by the light of our moon and take care.
Carry the blessings and marks of your God at all times.

But remember, your home is your fortress, if protected well.

If you hear a knock in the night, be wary.
Let no stranger into your home.

If it be a friend, look upon them.
Do you find them pallid and wan?
See you any mark upon their neck?
See you any dirt upon their clothes?

Unless their need is great, turn all away but the most trusted.

And if the Beast finds a way into your home, flee.
Leave love and family behind.

You will not save them if you fight.
You will not see them again.

But they will see you, pale and smiling, calling them into the night.`
]
};


const easterEggs = {

  keywords: {

    moon: {
      probability: 0.08,

      responses: [
        "The moon sees more than you think, darling.",
        "Careful invoking the moon around me."
      ]
    },

    art: {
      probability: 0.05,

      responses: [
        "Good. Create something worthy tonight.",
        "Finally. Someone mentions art."
      ]
    },

    tired: {
      probability: 0.06,

      responses: [
        "Even immortal supervisors require rest occasionally.",
        "Fatigue is irritatingly mortal, isn't it?"
      ]
    },
    challenge: {

  probability: 0.10,

  responses: [

    "Good. Back to work, darling.",

    "The challenges will not complete themselves, unfortunately.",

    "Ah yes. Productivity. My favorite burden."
  ]
},

draw: {

  probability: 0.08,

  responses: [

    "Excellent. Someone remembers why we're here.",

    "Go on then, impress me.",

    "Try not to disappoint your artistic supervisor."
  ]
},

sleep: {

  probability: 0.06,

  responses: [

    "Sleep is important, darling. Annoyingly so.",

    "Even exhausted creators require rest eventually."
  ]
},

lazy: {

  probability: 0.05,

  responses: [

    "I sensed procrastination from across the server.",

    "Tragic. Absolutely tragic."
  ]
}
  },


  patterns: [

    {
      pattern: /who are you/i,

      probability: 0.25,

      responses: [

        "Botstarion. Supervisor, critic, exhausted caretaker of this server.",

        "I keep this place from collapsing entirely. You're welcome."
      ]
    }
  ]
};
const loreChannels = {

  disabled: [

    "⚠️⭐️-daily-post-⭐️⚠️"
  ],

  venting: [

    "venting-room-😮‍💨"
  ]
};


module.exports = {

  loreConfig,

  loreMessages,

  easterEggs,

  loreChannels,
};