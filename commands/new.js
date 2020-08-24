const Discord = require('discord.js')
exports.run = async (client,message,args) => {
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
        const editedLogEmbed = new Discord.MessageEmbed().setTitle(
            "Log your completed tickets here"
          );
          editedLogEmbed.addField(`Ticket counter`, `**This week you have completed ${logNumber} ticket(s).**`)
          editedLogEmbed.setColor(`#00FFFF`)
          editedLogEmbed.setThumbnail(`https://media.discordapp.net/attachments/747229245700571168/747273092392288256/receipt.png`)
        await logEmbedMessage.edit(editedLogEmbed)
        console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
        
    });

collector.on('end', collected => {
	console.log(`Collected ${collected.size} items`);
});


};

exports.help = {
  name: 'new'
};
