const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const dares = [
  'Send a voice message singing your favorite song.',
  'Change your nickname to whatever the next person says for 1 hour.',
  'Type with your elbows for the next 5 minutes.',
  'Send the last photo in your camera roll.',
  'Write a love poem for the person to your left.',
  'Talk in a different accent for the next 10 minutes.',
  'Send a message to someone you haven\'t talked to in a year.',
  'Do your best impression of a famous person.',
  'Let someone else post something on your behalf.',
  'Speak only in questions for the next 5 minutes.',
  'Send a ❤️ to the last 5 people in your DMs.',
  'Say a tongue twister 3 times fast.',
  'Describe yourself in 3 emojis only.',
  'Send your most used emoji and explain why.',
  'Write a haiku about the person who dared you.',
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dare')
    .setDescription('Get a random dare 😈')
    .addUserOption(o => o.setName('user').setDescription('Who has to do the dare?').setRequired(false)),
  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    const dare = dares[Math.floor(Math.random() * dares.length)];
    const embed = new EmbedBuilder()
      .setColor('#FF4500')
      .setTitle('😈 Dare!')
      .setDescription(`${user} must:\n\n**${dare}**`)
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
