const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('Show information about this server'),
  async execute(interaction) {
    const g = interaction.guild;
    await g.fetch();
    const owner = await g.fetchOwner();

    const embed = new EmbedBuilder()
      .setColor('#5865F2')
      .setTitle(`📊 ${g.name}`)
      .setThumbnail(g.iconURL({ dynamic: true }))
      .addFields(
        { name: '👑 Owner', value: `${owner.user.tag}`, inline: true },
        { name: '📅 Created', value: `<t:${Math.floor(g.createdTimestamp / 1000)}:D>`, inline: true },
        { name: '👥 Members', value: `${g.memberCount}`, inline: true },
        { name: '💬 Channels', value: `${g.channels.cache.size}`, inline: true },
        { name: '🎭 Roles', value: `${g.roles.cache.size}`, inline: true },
        { name: '😀 Emojis', value: `${g.emojis.cache.size}`, inline: true },
        { name: '🌍 Region', value: g.preferredLocale, inline: true },
        { name: '🔒 Verification', value: ['None','Low','Medium','High','Highest'][g.verificationLevel], inline: true },
        { name: '🚀 Boosts', value: `${g.premiumSubscriptionCount || 0} (Tier ${g.premiumTier})`, inline: true },
      )
      .setImage(g.bannerURL({ size: 1024 }) || null)
      .setFooter({ text: `ID: ${g.id}` })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
