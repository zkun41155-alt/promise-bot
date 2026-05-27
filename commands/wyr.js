const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const questions = [
  ['Be able to fly', 'Be able to be invisible'],
  ['Never use social media again', 'Never watch TV/movies again'],
  ['Have unlimited money', 'Have unlimited time'],
  ['Know when you\'ll die', 'Know how you\'ll die'],
  ['Live in the past', 'Live in the future'],
  ['Be the funniest person', 'Be the smartest person'],
  ['Never sleep', 'Never eat'],
  ['Speak every language', 'Play every instrument'],
  ['Be famous', 'Be rich but unknown'],
  ['Always be too hot', 'Always be too cold'],
  ['Lose all your memories', 'Never make new ones'],
  ['Have no internet', 'Have no music'],
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('wyr')
    .setDescription('Would you rather? 🤷'),
  async execute(interaction) {
    const q = questions[Math.floor(Math.random() * questions.length)];
    const embed = new EmbedBuilder()
      .setColor('#9B59B6')
      .setTitle('🤷 Would You Rather?')
      .setDescription(`**🅰️ ${q[0]}**\n\nor\n\n**🅱️ ${q[1]}**`)
      .setFooter({ text: 'React with 🅰️ or 🅱️!' })
      .setTimestamp();
    const msg = await interaction.reply({ embeds: [embed], fetchReply: true });
    await msg.react('🅰️');
    await msg.react('🅱️');
  },
};
