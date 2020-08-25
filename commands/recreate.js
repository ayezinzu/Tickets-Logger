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
    const foundUser = await User.findOne({userid: message.author.id})
    const thatMsg = await message.channel.messages.fetch(`${foundUser.msgid}`)
    console.log(thatMsg)
    const logEmbed = new Discord.MessageEmbed().setTitle(
        "Log your completed tickets here"
      );
      logEmbed.addField(`Ticket counter`, `**This week you have completed ${foundUser.logNumber} ticket(s).**`)
      logEmbed.setColor(`#00FFFF`)
      logEmbed.setThumbnail(`https://media.discordapp.net/attachments/747229245700571168/747273092392288256/receipt.png`)
    await thatMsg.edit(logEmbed)
    const filter = (reaction, user) => {
        return (reaction.emoji.name === '⬆️' && user.id === message.author.id)
    };
    const collector = thatMsg.createReactionCollector(filter);
    collector.on('collect', async (reaction, user) => {
        await reaction.users.remove(user)
        foundUser.logNumber++
        
        const editedLogEmbed = new Discord.MessageEmbed().setTitle(
            "Log your completed tickets here"
          );
          editedLogEmbed.addField(`Ticket counter`, `**This week you have completed ${foundUser.logNumber} ticket(s).**`)
          editedLogEmbed.setColor(`#00FFFF`)
          editedLogEmbed.setThumbnail(`https://media.discordapp.net/attachments/747229245700571168/747273092392288256/receipt.png`)
        await thatMsg.edit(editedLogEmbed)
        console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
        await foundUser.save()
    });
};

exports.help = {
  name: 'recreate'
};