const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('steal')
    .setDescription('Steal someone\'s item 😂 (just for fun!)')
    .addUserOption(o => o.setName('user').setDescription('Who to steal from').setRequired(true))
    .addStringOption(o => o.setName('item').setDescription('What to steal').setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const item = interaction.options.getString('item');
    const success = Math.random() > 0.4;
    const embed = new EmbedBuilder()
      .setColor(success ? '#57F287' : '#ED4245')
      .setTitle(success ? '✅ Theft Successful!' : '❌ Caught Red-Handed!')
      .setDescription(success
        ? `${interaction.user} successfully stole **${item}** from ${user}! 😈`
        : `${interaction.user} tried to steal **${item}** from ${user} but got caught! 😂`)
      .setFooter({ text: 'Just for fun! 😄' })
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
