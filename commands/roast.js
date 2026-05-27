const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const roasts = [
  '{user} is the human equivalent of a participation trophy.',
  "I'd roast {user} but my mom said I'm not allowed to burn trash.",
  '{user} has the charisma of a wet paper bag.',
  "If {user} were any more basic, they'd be pH 14.",
  "{user}'s brain is like a browser with 100 tabs open, all of them loading.",
  '{user} is proof that evolution can go in reverse.',
  'The only thing sharper than {user} is a marble.',
  '{user} brings a lot of joy when they leave the room.',
  '{user} is like a cloud — when they disappear, it\'s a beautiful day.',
  'I\'ve seen better looking faces on a clock, {user}.',
  '{user} has the personality of a cardboard box.',
  'If {user} was a spice, they\'d be flour.',
  '{user} is the reason they put instructions on shampoo bottles.',
  'Scientists say the universe is made of neutrons, protons and electrons. They forgot to mention {user} is made of morons.',
  '{user} is not stupid — they just have bad luck thinking.',
  'There\'s only one problem with {user}\'s face — it shows.',
  'I\'d agree with {user} but then we\'d both be wrong.',
  '{user} is living proof that even mistakes can walk and talk.',
  'You\'re not ugly, {user}. You\'re just... aesthetically challenging.',
  '{user} peaked in kindergarten and it\'s been downhill since.',
  'I\'d call {user} a clown but that would be an insult to clowns.',
  '{user} is like a software update — nobody asked for them and they always cause problems.',
  'If brains were gasoline, {user} couldn\'t power a go-kart around a Cheerio.',
  '{user} is the type to bring a spoon to a knife fight.',
  'I\'d roast {user} harder but I don\'t want to burn something with so little substance.',
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('roast')
    .setDescription('Roast someone! 🔥 (all in good fun)')
    .addUserOption(o => o.setName('user').setDescription('Who to roast').setRequired(true))
    .addStringOption(o => o.setName('level')
      .setDescription('Roast intensity')
      .setRequired(false)
      .addChoices(
        { name: '😊 Mild', value: 'mild' },
        { name: '🔥 Medium', value: 'medium' },
        { name: '💀 Savage', value: 'savage' },
      )),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const level = interaction.options.getString('level') || 'medium';
    let pool;
    if (level === 'mild') pool = roasts.slice(0, 8);
    else if (level === 'medium') pool = roasts.slice(0, 16);
    else pool = roasts;

    const roast = pool[Math.floor(Math.random() * pool.length)].replace(/{user}/g, user.toString());
    const embed = new EmbedBuilder()
      .setColor('#ED4245')
      .setTitle(`🔥 Roasted! (${level})`)
      .setDescription(roast)
      .setFooter({ text: 'All in good fun 😄' })
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
