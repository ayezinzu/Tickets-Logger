const Discord = require('discord.js')
const { Client, MessageAttachment } = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const Enmap = require('enmap');
require('dotenv-flow').config();
const config = {
    token: process.env.TOKEN,
    prefix: process.env.PREFIX
}; 

const prefix = config.prefix;


client.commands = new Enmap();

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
    realMessage = message.content.toLowerCase()
    if (message.author.bot) return;
    if (realMessage.indexOf(prefix) !== 0) return;
    const args = realMessage.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command);
    console.log(command);
    if (!cmd) return;
    cmd.run(client, message, args);
    
})

fs.readdir('./commands/', async (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
      if (!file.endsWith('.js')) return;
      let props = require(`./commands/${file}`);
      let cmdName = file.split('.')[0];
      console.log(`Loaded command '${cmdName}'`);
      client.commands.set(cmdName, props);
    });
  });

client.login(process.env.TOKEN);