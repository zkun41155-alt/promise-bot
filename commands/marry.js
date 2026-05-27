const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('marry')
    .setDescription('Propose to someone! 💍')
    .addUserOption(o => o.setName('user').setDescription('Who to propose to').setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    if (user.id === interaction.user.id) return interaction.reply({ content: '❌ You can\'t marry yourself! 😂', ephemeral: true });
    if (user.bot) return interaction.reply({ content: '🤖 Bots can\'t get married... yet! 😂', ephemeral: true });

    const accepted = Math.random() > 0.3;
    const embed = new EmbedBuilder()
      .setColor(accepted ? '#FF69B4' : '#ED4245')
      .setTitle(accepted ? '💍 Marriage Proposal Accepted!' : '💔 Marriage Proposal Rejected!')
      .setDescription(accepted
        ? `${user} said **YES** to ${interaction.user}! 🎉\n\nCongratulations to the happy couple! 💑`
        : `${user} said **NO** to ${interaction.user}! 💔\n\nThat's rough buddy... 😬`)
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
