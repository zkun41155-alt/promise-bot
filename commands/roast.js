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
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('roast')
    .setDescription('Roast a user (all in good fun!)')
    .addUserOption(o => o.setName('user').setDescription('Who to roast').setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const roast = roasts[Math.floor(Math.random() * roasts.length)].replace('{user}', user.toString());
    const embed = new EmbedBuilder()
      .setColor('#ED4245')
      .setTitle('🔥 Roasted!')
      .setDescription(roast)
      .setFooter({ text: 'All in good fun 😄' })
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
