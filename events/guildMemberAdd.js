const { roles, joinleaveID, WelcomeEmbed } = require('../config.json');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'guildMemberAdd',
    execute(member) {
        const channelId = joinleaveID;
        const channel = member.guild.channels.cache.get(channelId);
        if (!channel) { return console.error(`Channel with ID ${channelId} not found.`); }
        const created = Math.floor(member.user.createdTimestamp / 1000);
        const embed = new EmbedBuilder()
            .setTitle(member.user.username)
            .setDescription(`${member.user} **joined the server**`+ `\n⏲ **Age of Account:** \n<t:${created}:f>\n **${Math.floor((Date.now() - member.user.createdTimestamp) / (1000 * 60 * 60 * 24))} days ago**`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setFooter({ text: "Ottowispz Corporations", iconURL: member.guild.iconURL({ dynamic: true }) })
            .setColor('#0099ff')
            .setTimestamp();
        channel.send({ embeds: [embed] });
        const roleIds = [
            roles.autoRoleId
        ];

        roleIds.forEach(roleId => {
            if (member.roles.cache.has(roleId)) {
                return;
            } else {
                member.roles.add(roleId)
                    .then(() => console.info(`Added role: ${roleId} to user: ${member.user.tag}`))
                    .catch(err => console.error(`Failed to add role: ${roleId} to user: ${member.user.tag} - Error: ${err}`));
            }
        });
    },
};
