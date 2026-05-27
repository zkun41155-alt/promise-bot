const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Show information about a user')
    .addUserOption(o => o.setName('user').setDescription('User to check (defaults to you)').setRequired(false)),
  async execute(interaction) {
    const member = interaction.options.getMember('user') || interaction.member;
    const user = member.user;
    const roles = member.roles.cache.filter(r => r.id !== interaction.guild.id).map(r => r.toString()).join(', ') || 'None';

    const embed = new EmbedBuilder()
      .setColor(member.displayHexColor || '#5865F2')
      .setTitle(`👤 ${user.tag}`)
      .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 256 }))
      .addFields(
        { name: '🆔 ID', value: user.id, inline: true },
        { name: '🤖 Bot?', value: user.bot ? 'Yes' : 'No', inline: true },
        { name: '📅 Account Created', value: `<t:${Math.floor(user.createdTimestamp / 1000)}:D>`, inline: true },
        { name: '📥 Joined Server', value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:D>`, inline: true },
        { name: '🎨 Nickname', value: member.nickname || 'None', inline: true },
        { name: `🎭 Roles (${member.roles.cache.size - 1})`, value: roles.length > 1024 ? roles.slice(0, 1020) + '...' : roles },
      )
      .setFooter({ text: `Requested by ${interaction.user.tag}` })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
