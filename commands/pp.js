const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pp')
    .setDescription('Check pp size 😂 (just for fun!)')
    .addUserOption(o => o.setName('user').setDescription('User to check').setRequired(false)),
  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    const size = Math.floor(Math.random() * 15);
    const pp = '8' + '='.repeat(size) + 'D';
    const embed = new EmbedBuilder()
      .setColor('#FF69B4')
      .setTitle('📏 PP Size')
      .setDescription(`${user}'s pp:\n\n\`${pp}\`\n\n**${size} inches**`)
      .setFooter({ text: 'Just for fun! 😂' })
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
