const config = require(`${process.cwd()}/structures/botconfig/config.json`);
const {
  Client,
  CommandInteraction,
  MessageEmbed
} = require("discord.js");
const ms = require("ms");

module.exports = {
    name: "timeout",
    usage: '',
    description: "Timeout a user in the server",
    category: "moderation",
    cooldown: 0,
    userPermissions: "MODERATE_MEMBERS",
    botPermissions: "MODERATE_MEMBERS",
    ownerOnly: false,
    toggleOff: false,
    options: [{
            name: "set",
            description: "Set a member to timeout.",
            type: "SUB_COMMAND",
            options: [{
                name: "user",
                description: "The member you want to timeout",
                type: "USER",
                required: true
            }, {
                name: "duration",
                description: "Duration of the timeout. (Example: 2d for 2 days)",
                type: "STRING",
                required: true
            }, {
                name: "reason",
                description: "Reason of the timeout",
                type: "STRING",
                required: true
            }]
        },
        {
            name: "remove",
            description: "Remove a member from timeout.",
            type: "SUB_COMMAND",
            options: [{
                name: "user",
                description: "The member you want to timeout",
                type: "USER",
                required: true
            }, {
                name: "reason",
                description: "Reason of the timeout",
                type: "STRING",
                required: true
            }]
        }
    ],

    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    async execute(client, interaction, args, ee) {
        try {
            switch (interaction.options.getSubcommand()) {
                case "set": {
                    const user = interaction.options.getUser("user");
                    const duration = interaction.options.getString("duration");
                    const reason = interaction.options.getString("reason");
                    const member = interaction.guild.members.cache.get(user.id);

                    if (member.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({
                        embeds: [new MessageEmbed()
                            .setColor(ee.wrongcolor)
                            .setFooter(ee.footertext, ee.footericon)
                            .setDescription(`${client.allEmojis.x} You cannot timeout this user as thier role is the same or higher then yours.`)
                        ]
                    });

                    const timeToMs = ms(duration);
                    if (!timeToMs) return interaction.reply({
                        embeds: [new MessageEmbed()
                            .setColor(ee.wrongcolor)
                            .setTitle(`${client.allEmojis.x} Please specify a valid time!`)
                        ]
                    });

                    member.timeout(timeToMs, reason);
                    return interaction.reply({
                        embeds: [new MessageEmbed()
                            .setColor(ee.wrongcolor)
                            .setAuthor(`Successfully Timeout-ed`, interaction.user.displayAvatarURL({
                                dynamic: true
                            }))
                            .setDescription(`>>> ${user} has been timeout-ed for \`${duration}\`\n**Reason:** ${reason}`)
                        ]
                    });
                }
                case "remove": {
                    const user = interaction.options.getUser("user");
                    const reason2 = interaction.options.getString("reason");
                    const member2 = interaction.guild.members.cache.get(user.id);

                    if (member2.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({
                        embeds: [new MessageEmbed()
                            .setColor(ee.wrongcolor)
                            .setFooter(ee.footertext, ee.footericon)
                            .setDescription(`${client.allEmojis.x} You cannot remove this user from timeout as thier role is the same or higher then yours.`)
                        ]
                    });

                    member2.timeout(null, reason2);
                    return interaction.reply({
                        embeds: [new MessageEmbed()
                            .setColor(ee.wrongcolor)
                            .setAuthor(`Successfully Removed From Timeout`, interaction.user.displayAvatarURL({
                                dynamic: true
                            }))
                            .setDescription(`>>> ${user} has been Removed from timeout\n**Reason:** ${reason2}`)
                        ]
                    });
                }
            }
        } catch (e) {
            console.log(e)
            return interaction.reply({
                embeds: [new MessageEmbed()
                    .setTitle(`⛔ Error`)
                    .setDescription(`${e}`)
                ]
            })
        }
    }
}