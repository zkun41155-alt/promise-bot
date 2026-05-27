const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('roles')
    .setDescription('List all roles in the server'),
  async execute(interaction) {
    const roles = interaction.guild.roles.cache
      .filter(r => r.id !== interaction.guild.id)
      .sort((a, b) => b.position - a.position)
      .map(r => `${r} (${r.members.size} members)`)
      .slice(0, 25);

    const embed = new EmbedBuilder()
      .setColor('#5865F2')
      .setTitle(`🎭 Roles in ${interaction.guild.name}`)
      .setDescription(roles.join('\n') || 'No roles found.')
      .setFooter({ text: `Total: ${interaction.guild.roles.cache.size - 1} roles` })
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
