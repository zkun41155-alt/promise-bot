const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const vibes = [
  { vibe: 'Main Character Energy ✨', desc: 'You\'re literally the protagonist of life right now. Everything is going your way.', color: '#F1C40F' },
  { vibe: 'Cozy Goblin Mode 🧌', desc: 'Unbothered. Unmotivated. Eating snacks. Living your best life.', color: '#8B4513' },
  { vibe: 'Chaotic Gremlin 😈', desc: 'You\'re causing mild chaos everywhere you go and honestly? Good for you.', color: '#ED4245' },
  { vibe: 'Soft Hours 🌙', desc: 'You\'re in your feels, listening to sad music, and overthinking. It\'s okay.', color: '#5865F2' },
  { vibe: 'Villain Arc 🦹', desc: 'You\'ve stopped explaining yourself. You\'re just built different now.', color: '#2C3E50' },
  { vibe: 'NPC Mode 🤖', desc: 'You\'re just going through the motions today. Wake up bro.', color: '#95A5A6' },
  { vibe: 'Sigma Grindset 💪', desc: 'No distractions. No excuses. Just pure focus and results.', color: '#57F287' },
  { vibe: 'Chaotic Good 😇', desc: 'Your intentions are pure but the execution is always somehow chaotic.', color: '#FF69B4' },
  { vibe: 'Touch Grass Mode 🌱', desc: 'You\'ve been online too long. Go outside. Breathe air.', color: '#2ECC71' },
  { vibe: 'Unhinged Era 🌪️', desc: 'Nobody knows what you\'re going to do next. Not even you.', color: '#E67E22' },
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('vibe')
    .setDescription('Check your current vibe ✨')
    .addUserOption(o => o.setName('user').setDescription('Check someone else\'s vibe').setRequired(false)),
  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    const v = vibes[Math.floor(Math.random() * vibes.length)];
    const embed = new EmbedBuilder()
      .setColor(v.color)
      .setTitle(`✨ ${user.username}'s Current Vibe`)
      .addFields(
        { name: '🎭 Vibe', value: v.vibe, inline: false },
        { name: '📖 Description', value: v.desc, inline: false },
      )
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
