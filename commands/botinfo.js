const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { version } = require('discord.js');
const os = require('os');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('botinfo')
    .setDescription('Show information about the bot'),
  async execute(interaction, client) {
    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);

    const embed = new EmbedBuilder()
      .setColor('#5865F2')
      .setTitle(`🤖 ${client.user.username} Info`)
      .setThumbnail(client.user.displayAvatarURL())
      .addFields(
        { name: '📦 Discord.js', value: `v${version}`, inline: true },
        { name: '🟢 Node.js', value: process.version, inline: true },
        { name: '💾 Memory', value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1)} MB`, inline: true },
        { name: '⏱️ Uptime', value: `${hours}h ${minutes}m ${seconds}s`, inline: true },
        { name: '🏠 Servers', value: `${client.guilds.cache.size}`, inline: true },
        { name: '👥 Users', value: `${client.users.cache.size}`, inline: true },
        { name: '💻 Platform', value: `${os.platform()} (${os.arch()})`, inline: true },
        { name: '📡 Ping', value: `${Math.round(client.ws.ping)}ms`, inline: true },
      )
      .setFooter({ text: `Requested by ${interaction.user.tag}` })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
