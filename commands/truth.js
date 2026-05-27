const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const truths = [
  'What is your biggest fear?',
  'Have you ever lied to your best friend?',
  'What is the most embarrassing thing you\'ve done?',
  'Who was your first crush?',
  'What is your biggest regret?',
  'Have you ever cheated on a test?',
  'What is the worst thing you\'ve ever done?',
  'What is your most annoying habit?',
  'Have you ever blamed someone else for something you did?',
  'What is something you\'ve never told anyone?',
  'What is the most childish thing you still do?',
  'Have you ever stood someone up?',
  'What is your biggest insecurity?',
  'Have you ever spread a rumor?',
  'What is your strangest dream?',
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('truth')
    .setDescription('Get a random truth question 🤔')
    .addUserOption(o => o.setName('user').setDescription('Who has to answer?').setRequired(false)),
  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    const question = truths[Math.floor(Math.random() * truths.length)];
    const embed = new EmbedBuilder()
      .setColor('#00BFFF')
      .setTitle('🤔 Truth!')
      .setDescription(`${user} must answer:\n\n**${question}**`)
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
