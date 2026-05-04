const { roles, joinleaveID} = require('../config.json');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'guildMemberRemove',
    execute(member) {
        const channelId = joinleaveID;
        const channel = member.guild.channels.cache.get(channelId);
        if (!channel) { return console.error(`Channel with ID ${channelId} not found.`); }
        const embed = new EmbedBuilder()
            .setTitle(member.user.username)
            .setDescription(`${member.user} **left.**`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setFooter({ text: "Ottowispz Corporations", iconURL: member.guild.iconURL({ dynamic: true }) })
            .setColor('#0099ff')
            .setTimestamp();
        channel.send({ embeds: [embed] });
    },
};
