require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client({intents: 32767})
client.once('ready', () => {
    console.log('Started Bot')
})
module.exports.client = client
client.commands = new Discord.Collection()
require('./handler/cmd')()

client.login('ODMwMDEwOTcwMjg1Mjc3MjM0.YHAd9A.gY_tJGnbr6A8SBPRSb7FYOKXkEM')
