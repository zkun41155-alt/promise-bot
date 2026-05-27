const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Delete a number of messages from the channel')
    .addIntegerOption(o => o.setName('amount').setDescription('Number of messages to delete (1-100)').setRequired(true).setMinValue(1).setMaxValue(100))
    .addUserOption(o => o.setName('user').setDescription('Only delete messages from this user').setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  async execute(interaction) {
    const amount = interaction.options.getInteger('amount');
    const filterUser = interaction.options.getUser('user');

    await interaction.deferReply({ ephemeral: true });

    let messages = await interaction.channel.messages.fetch({ limit: 100 });
    if (filterUser) messages = messages.filter(m => m.author.id === filterUser.id);
    messages = [...messages.values()].slice(0, amount);

    const deleted = await interaction.channel.bulkDelete(messages, true);
    await interaction.editReply({ content: `🗑️ Deleted **${deleted.size}** message(s)${filterUser ? ` from ${filterUser.tag}` : ''}.` });
  },
};
