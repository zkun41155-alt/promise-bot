const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription("Get a user's avatar")
    .addUserOption(o => o.setName('user').setDescription('User').setRequired(false)),
  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    const embed = new EmbedBuilder()
      .setColor('#5865F2')
      .setTitle(`🖼️ ${user.tag}'s Avatar`)
      .setImage(user.displayAvatarURL({ dynamic: true, size: 1024 }))
      .addFields(
        { name: 'Links', value: `[PNG](${user.displayAvatarURL({ format: 'png', size: 1024 })}) | [JPG](${user.displayAvatarURL({ format: 'jpg', size: 1024 })}) | [WEBP](${user.displayAvatarURL({ format: 'webp', size: 1024 })})` }
      )
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
