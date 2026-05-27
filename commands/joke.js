const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const jokes = [
  "Why don't scientists trust atoms? Because they make up everything!",
  "I told my wife she was drawing her eyebrows too high. She looked surprised.",
  "Why can't you give Elsa a balloon? Because she'll let it go.",
  "What do you call fake spaghetti? An impasta.",
  "Why did the scarecrow win an award? Because he was outstanding in his field.",
  "I'm reading a book about anti-gravity. It's impossible to put down!",
  "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them.",
  "Why do cows wear bells? Because their horns don't work.",
  "I would tell you a construction joke, but I'm still working on it.",
  "What do you call cheese that isn't yours? Nacho cheese.",
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('joke')
    .setDescription('Get a random joke'),
  async execute(interaction) {
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    const embed = new EmbedBuilder()
      .setColor('#FEE75C')
      .setTitle('😂 Random Joke')
      .setDescription(joke)
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
