const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('announce')
    .setDescription('Send a formatted announcement')
    .addStringOption(o => o.setName('title').setDescription('Announcement title').setRequired(true))
    .addStringOption(o => o.setName('message').setDescription('Announcement message').setRequired(true))
    .addChannelOption(o => o.setName('channel').setDescription('Channel to announce in').setRequired(false))
    .addStringOption(o => o.setName('ping').setDescription('Who to ping (@here, @everyone, or role ID)').setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
  async execute(interaction) {
    const title = interaction.options.getString('title');
    const message = interaction.options.getString('message');
    const channel = interaction.options.getChannel('channel') || interaction.channel;
    const ping = interaction.options.getString('ping');

    const embed = new EmbedBuilder()
      .setColor('#5865F2')
      .setTitle(`📢 ${title}`)
      .setDescription(message)
      .setFooter({ text: `Announced by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
      .setTimestamp();

    let content = '';
    if (ping === '@everyone') content = '@everyone';
    else if (ping === '@here') content = '@here';
    else if (ping) content = `<@&${ping}>`;

    await channel.send({ content: content || undefined, embeds: [embed] });
    await interaction.reply({ content: `✅ Announcement sent to ${channel}`, ephemeral: true });
  },
};
