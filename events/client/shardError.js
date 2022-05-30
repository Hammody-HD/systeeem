module.exports = {
  name: "shardError",

  async execute(client, error, id) {
    client.logger(`Shard #${id} Errored`.brightRed);
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