const Discord = require('discord.js')
const mongoose = require("mongoose");
const MongoClient = require('mongodb').MongoClient;
const User = require("../models/user.js")
mongoose.connect('mongodb+srv://admin:admin@cluster0.ntgpc.mongodb.net/user?retryWrites=true&w=majority',{
  useNewUrlParser: true
}, function(err){
  if(err){
    console.log(err);
  }else{
    console.log("Database connection initiated");
  }
});
exports.run = async (client,message,args) => {
  let existance = await User.exists({userid: message.author.id})
  console.log(existance,`existance`)
  if(existance === true){
    let theUser = await User.findOne({userid: message.author.id})
    await message.guild.channels.create(`${message.author.id}`, { reason: 'Needed a cool new channel' })
    
    let logNumber = 0
      const logEmbed = new Discord.MessageEmbed().setTitle(
        "Log your completed tickets here"
      );
      logEmbed.addField(`Ticket counter`, `**This week you have completed ${logNumber} ticket(s).**`)
      logEmbed.setColor(`#00FFFF`)
      logEmbed.setThumbnail(`https://media.discordapp.net/attachments/747229245700571168/747273092392288256/receipt.png`)
      
      let logEmbedMessage = await message.guild.channels.cache.find(channel => channel.name === `${message.author.id}`).send(logEmbed)
    await logEmbedMessage.react(`⬆️`)
    const filter = (reaction, user) => {
        return (reaction.emoji.name === '⬆️' && user.id === message.author.id)
    };
    
    const collector = logEmbedMessage.createReactionCollector(filter);
    collector.on('collect', async (reaction, user) => {
        await reaction.users.remove(user)
        logNumber++
        theUser.logNumber = logNumber
        await theUser.save();
        const editedLogEmbed = new Discord.MessageEmbed().setTitle(
            "Log your completed tickets here"
          );
          editedLogEmbed.addField(`Ticket counter`, `**This week you have completed ${logNumber} ticket(s).**`)
          editedLogEmbed.setColor(`#00FFFF`)
          editedLogEmbed.setThumbnail(`https://media.discordapp.net/attachments/747229245700571168/747273092392288256/receipt.png`)
        await logEmbedMessage.edit(editedLogEmbed)
        console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
        
    });
    
    theUser.userid = message.author.id 
    theUser.msgid = logEmbedMessage.id
    await theUser.save();
  }
  if(existance === false){
    let theUser = new User()
    await message.guild.channels.create(`${message.author.id}`, { reason: 'Needed a cool new channel' })
    
    let logNumber = 0
      const logEmbed = new Discord.MessageEmbed().setTitle(
        "Log your completed tickets here"
      );
      logEmbed.addField(`Ticket counter`, `**This week you have completed ${logNumber} ticket(s).**`)
      logEmbed.setColor(`#00FFFF`)
      logEmbed.setThumbnail(`https://media.discordapp.net/attachments/747229245700571168/747273092392288256/receipt.png`)
      
      let logEmbedMessage = await message.guild.channels.cache.find(channel => channel.name === `${message.author.id}`).send(logEmbed)
    await logEmbedMessage.react(`⬆️`)
    const filter = (reaction, user) => {
        return (reaction.emoji.name === '⬆️' && user.id === message.author.id)
    };
    
    const collector = logEmbedMessage.createReactionCollector(filter);
    collector.on('collect', async (reaction, user) => {
        await reaction.users.remove(user)
        logNumber++
        theUser.logNumber = logNumber
        await theUser.save();
        const editedLogEmbed = new Discord.MessageEmbed().setTitle(
            "Log your completed tickets here"
          );
          editedLogEmbed.addField(`Ticket counter`, `**This week you have completed ${logNumber} ticket(s).**`)
          editedLogEmbed.setColor(`#00FFFF`)
          editedLogEmbed.setThumbnail(`https://media.discordapp.net/attachments/747229245700571168/747273092392288256/receipt.png`)
        await logEmbedMessage.edit(editedLogEmbed)
        console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
        
    });
    
    theUser.userid = message.author.id 
    theUser.msgid = logEmbedMessage.id
    await theUser.save();
  }
   



};

exports.help = {
  name: 'new'
};
