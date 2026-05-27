const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const quotes = [
  { text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
  { text: 'In the middle of every difficulty lies opportunity.', author: 'Albert Einstein' },
  { text: 'It does not matter how slowly you go as long as you do not stop.', author: 'Confucius' },
  { text: 'Life is what happens when you\'re busy making other plans.', author: 'John Lennon' },
  { text: 'The future belongs to those who believe in the beauty of their dreams.', author: 'Eleanor Roosevelt' },
  { text: 'Spread love everywhere you go.', author: 'Mother Teresa' },
  { text: 'When you reach the end of your rope, tie a knot in it and hang on.', author: 'Franklin D. Roosevelt' },
  { text: 'Always remember that you are absolutely unique. Just like everyone else.', author: 'Margaret Mead' },
  { text: 'Do not go where the path may lead, go instead where there is no path and leave a trail.', author: 'Ralph Waldo Emerson' },
  { text: 'You will face many defeats in life, but never let yourself be defeated.', author: 'Maya Angelou' },
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('quote')
    .setDescription('Get an inspirational quote 💭'),
  async execute(interaction) {
    const q = quotes[Math.floor(Math.random() * quotes.length)];
    const embed = new EmbedBuilder()
      .setColor('#F1C40F')
      .setTitle('💭 Inspirational Quote')
      .setDescription(`*"${q.text}"*`)
      .setFooter({ text: `— ${q.author}` })
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
