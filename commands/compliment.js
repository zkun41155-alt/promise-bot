const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const compliments = [
  '{user} is genuinely one of the coolest people around! 🌟',
  'The world is a better place with {user} in it. 💫',
  '{user} radiates good energy and everyone notices.',
  'Spending time with {user} is always the highlight of the day.',
  '{user} has an amazing ability to make everyone feel welcome.',
  '{user} is smarter than they give themselves credit for.',
  'Everything {user} does, they do with heart. ❤️',
  "{user}'s smile is genuinely contagious.",
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('compliment')
    .setDescription('Compliment a user!')
    .addUserOption(o => o.setName('user').setDescription('Who to compliment').setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const compliment = compliments[Math.floor(Math.random() * compliments.length)].replace('{user}', user.toString());
    const embed = new EmbedBuilder()
      .setColor('#57F287')
      .setTitle('💖 Compliment!')
      .setDescription(compliment)
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
