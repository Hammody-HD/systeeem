const config = require(`${process.cwd()}/structures/botconfig/config.json`);
const {
  Client,
  CommandInteraction,
  MessageEmbed
} = require("discord.js");
const DB = require(`${process.cwd()}/structures/models/afk`);

module.exports = {
  name: 'afk',
  usage: '',
  description: 'AFK System',
  category: "utility",
  cooldown: 0,
  serPermissions: "",
  botPermissions: "",
  ownerOnly: false,
  toggleOff: false,
  options: [{
    name: 'set',
    type: 'SUB_COMMAND',
    description: 'Set to AFK',
    options: [{
      name: "status",
      description: "Set your AFK Status",
      type: 'STRING',
      required: true
    }]
  }, {
    name: 'remove',
    type: 'SUB_COMMAND',
    description: 'Remove AFK Status',
  }],

   /**
   * @param {Client} client 
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */

    async execute(client, interaction, args, ee) {
    const {
      guild,
      options,
      user,
      createdTimestamp
    } = interaction;

    const Embed = new MessageEmbed()
      .setAuthor(user.tag, user.displayAvatarURL({
        dynamic: true
      }));

    const afkStatus = options.getString("status");

    try {
      switch (options.getSubcommand()) {
        case "set": {
          await DB.findOneAndUpdate({
            // GuildID: guild.id,
            UserID: user.id
          }, {
            Status: afkStatus,
            Time: parseInt(createdTimestamp / 1000)
          }, {
            new: true,
            upsert: true
          })

          Embed.setColor(ee.color).setDescription(`>>> You have Been Set to AFK <a:M_afk:923232069545508964>
**Status:** ${afkStatus}`);

          return interaction.reply({
            embeds: [Embed],
            ephemeral: true
          })
        }
        case "remove": {
          await DB.deleteOne({
            // GuildID: guild.id,
            UserID: user.id
          })

          Embed.setColor(ee.color).setDescription(`>>> You have Been Removed From AFK <a:M_afk:923232069545508964>`);

          return interaction.reply({
            embeds: [Embed],
            ephemeral: true
          })
        }
      }
    } catch (err) {
      console.log(err)
    }

  }
}