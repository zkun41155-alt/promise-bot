const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'guildMemberAdd',
  async execute(member, client) {
    const channel = member.guild.systemChannel;
    if (!channel) return;

    const embed = new EmbedBuilder()
      .setColor('#5865F2')
      .setTitle('👋 Welcome to the server!')
      .setDescription(`Hey ${member}, welcome to **${member.guild.name}**!\nYou are member **#${member.guild.memberCount}**.`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setFooter({ text: member.guild.name, iconURL: member.guild.iconURL() });

    channel.send({ embeds: [embed] });
  },
};
