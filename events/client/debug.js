const config = require(`${process.cwd()}/structures/botconfig/config.json`);

module.exports = {
  name: "debug",

  async execute(client, info) {
    if (config.events.Enable_debug) {
      client.logger(String(info).grey);
    }

  }
}

/**
 * @INFO
 * Bot Coded by Zedro#2742 | https://discord.gg/milanio
 * @INFO
 * Work for Milanio Development | https://discord.gg/milanio
 * @INFO
 * Please Mention Us Milanio Development, When Using This Code!
 * @INFO
 */