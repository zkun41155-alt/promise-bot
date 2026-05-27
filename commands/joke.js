const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const jokes = {
  general: [
    "Why don't scientists trust atoms? Because they make up everything!",
    "I told my wife she was drawing her eyebrows too high. She looked surprised.",
    "What do you call fake spaghetti? An impasta.",
    "Why did the scarecrow win an award? He was outstanding in his field.",
    "I'm reading a book about anti-gravity. It's impossible to put down!",
    "What do you call cheese that isn't yours? Nacho cheese.",
    "Why do cows wear bells? Because their horns don't work.",
    "I would tell you a construction joke but I'm still working on it.",
    "What do you call a sleeping dinosaur? A dino-snore.",
    "Why can't a bicycle stand on its own? It's two-tired.",
    "What do you call a fish without eyes? A fsh.",
    "Why did the math book look so sad? Because it had too many problems.",
    "What do you get when you cross a snowman and a vampire? Frostbite.",
    "I used to hate facial hair but then it grew on me.",
    "What do you call a factory that makes okay products? A satisfactory.",
  ],
  dark: [
    "I have a joke about construction, but I'm still working on it.",
    "My dog used to chase people on a bike a lot. It got so bad I had to take his bike away.",
    "I told my doctor that I broke my arm in two places. He told me to stop going to those places.",
    "Why don't skeletons fight each other? They don't have the guts.",
    "I asked my dog what two minus two is. He said nothing.",
    "Why did the golfer bring an extra pair of pants? In case he got a hole in one.",
    "What's the best time to go to the dentist? Tooth-hurty.",
    "I only know 25 letters of the alphabet. I don't know y.",
    "Why can't you trust an atom? Because they make up everything.",
    "What do you call an elephant that doesn't matter? An irrelephant.",
  ],
  techie: [
    "Why do programmers prefer dark mode? Because light attracts bugs!",
    "How many programmers does it take to change a light bulb? None — that's a hardware problem.",
    "A SQL query walks into a bar, walks up to two tables and asks... 'Can I join you?'",
    "Why do Java developers wear glasses? Because they don't C#.",
    "There are only 10 types of people: those who understand binary and those who don't.",
    "A programmer's wife tells him: 'Go to the store and get a gallon of milk, and if they have eggs, get a dozen.' He comes home with 12 gallons of milk.",
    "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings.",
    "What's a programmer's favourite hangout place? Foo Bar.",
    "How do you comfort a JavaScript bug? You console it.",
    "Why did the developer go broke? Because he used up all his cache.",
  ],
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('joke')
    .setDescription('Get a random joke 😂')
    .addStringOption(o => o.setName('type')
      .setDescription('Type of joke')
      .setRequired(false)
      .addChoices(
        { name: '😂 General', value: 'general' },
        { name: '😈 Dark', value: 'dark' },
        { name: '💻 Techie', value: 'techie' },
      )),
  async execute(interaction) {
    const type = interaction.options.getString('type') || 'general';
    const joke = jokes[type][Math.floor(Math.random() * jokes[type].length)];
    const embed = new EmbedBuilder()
      .setColor('#FEE75C')
      .setTitle('😂 Random Joke')
      .setDescription(joke)
      .setFooter({ text: `Category: ${type}` })
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
