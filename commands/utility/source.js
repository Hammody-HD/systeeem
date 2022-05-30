const config = require(`${process.cwd()}/structures/botconfig/config.json`);
const {
  Client,
  Message,
  MessageEmbed
} = require('discord.js');

module.exports = {
  name: "source",
  aliases: ["code", "src", "github", "replit"],
  usage: "",
  description: "",
  category: "utility",
  cooldown: 0,
  userPermissions: "",
  botPermissions: "",
  ownerOnly: false,
  toggleOff: false,

  /**
   * @param {Client} client 
   * @param {Message} message
   * @param {String[]} args
   */

  async execute(client, message, args, ee) {
    try {

      return message.channel.send({
        embeds: [new MessageEmbed()
          .setColor(ee.color)
          .setFooter({
            text: `Milanio | Made By: https://milaniodev.ml`,
            iconURL: client.user.displayAvatarURL({ dynamic: true })
          })
          .setAuthor({
            name: `Milanio's Source Code`,
            iconURL: client.user.displayAvatarURL({ dynamic: true })
          })
          .setDescription(`**[This Bot is Made by: \`Zedro#2742\`](https://discordapp.com/users/850303341435027466/)**`)
          .setFields({
            name: `Discord.js`,
            value: `[\`v13.5.0\`](https://discord.js.org/)`,
            inline: true
          }, {
              name: `Node.js`,
              value: `[\`v16.13.1\`](https://nodejs.org/en/)`,
              inline: true
            }, {
              name: `Enmap`,
              value: `[\`v5.8.7\`](https://enmap.evie.dev/api)`,
              inline: true
            }, {
              name: `MongoDB`,
              value: `[\`v6.0.11\`](https://mongoosejs.com/)`,
              inline: true
            }, {
              name: `Source Code`,
              value: `Don't just use the source for yourself, Please [invite me](${process.env.INVITE}) too in your server!`,
            }, {
              name: `Github Fork`,
              value: `[Click Me to Fork From Github](https://github.com/Zedro2742/Milanio)`,
              inline: true
            }, {
              name: `Replit Fork`,
              value: `[Click Me to Fork From Replit](https://replit.com/@Zedro2742/Milanio)`,
              inline: true
            })]
      });


    } catch (e) {
      console.log(String(e.stack).bgRed)
      const errorLogsChannel = client.channels.cache.get(config.botlogs.errorLogsChannel);
      return errorLogsChannel.send({
        embeds: [new MessageEmbed()
          .setColor("RED")
          .setAuthor(message.guild.name, message.guild.iconURL({
            dynamic: true
          }))
          .setTitle(`${client.allEmojis.x} Got a Error:`)
          .setDescription(`\`\`\`${e.stack}\`\`\``)
          .setFooter(`Having: ${message.guild.memberCount} Users`)
        ]
      })
    }
  }
};