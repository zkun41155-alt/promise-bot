const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('iq')
    .setDescription('Check someone\'s IQ 🧠 (just for fun!)')
    .addUserOption(o => o.setName('user').setDescription('User to check').setRequired(false)),
  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    const iq = Math.floor(Math.random() * 200) + 1;
    let verdict = iq < 50 ? '🥴 Uhh...' : iq < 80 ? '😐 Below average' : iq < 100 ? '🙂 Average' : iq < 130 ? '😎 Above average' : iq < 160 ? '🧠 Very smart!' : '🤯 GENIUS!!';
    const embed = new EmbedBuilder()
      .setColor('#3498DB')
      .setTitle('🧠 IQ Test Results')
      .setDescription(`${user}'s IQ is **${iq}**\n\n${verdict}`)
      .setFooter({ text: 'Just for fun! 😄' })
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
