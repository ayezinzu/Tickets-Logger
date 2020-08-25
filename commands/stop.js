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
    let foundUser = await User.findOne({userid: message.author.id})
    foundUser.msgid = ""
    foundUser.logNumber = ""
    await foundUser.save()
   message.guild.channels.resolve(`${message.channel.id}`).delete()
}

exports.help = {
    name: 'new'
  };