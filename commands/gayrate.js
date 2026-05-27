const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('gayrate')
    .setDescription('How gay are you? 🌈 (just for fun!)')
    .addUserOption(o => o.setName('user').setDescription('User to check').setRequired(false)),
  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    const percent = Math.floor(Math.random() * 101);
    const bar = '🌈'.repeat(Math.floor(percent / 10)) + '⬛'.repeat(10 - Math.floor(percent / 10));
    const embed = new EmbedBuilder()
      .setColor('#FF69B4')
      .setTitle('🌈 Gay Rate')
      .setDescription(`${user} is **${percent}% gay**\n\n${bar}`)
      .setFooter({ text: 'Just for fun! 😄' })
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
