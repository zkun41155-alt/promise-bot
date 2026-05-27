const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');
const cfgPath = './data/config.json';

function loadConfig() {
  if (!fs.existsSync('./data')) fs.mkdirSync('./data');
  if (!fs.existsSync(cfgPath)) fs.writeFileSync(cfgPath, '{}');
  return JSON.parse(fs.readFileSync(cfgPath));
}
function saveConfig(data) { fs.writeFileSync(cfgPath, JSON.stringify(data, null, 2)); }

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setwelcome')
    .setDescription('Set the welcome channel and message')
    .addChannelOption(o => o.setName('channel').setDescription('Channel for welcome messages').setRequired(true))
    .addStringOption(o => o.setName('message').setDescription('Custom welcome message ({user} = mention, {server} = server name)').setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
  async execute(interaction) {
    const channel = interaction.options.getChannel('channel');
    const message = interaction.options.getString('message') || 'Welcome {user} to **{server}**! 🎉';
    const config = loadConfig();
    if (!config[interaction.guild.id]) config[interaction.guild.id] = {};
    config[interaction.guild.id].welcomeChannel = channel.id;
    config[interaction.guild.id].welcomeMessage = message;
    saveConfig(config);

    const embed = new EmbedBuilder()
      .setColor('#57F287')
      .setTitle('✅ Welcome Channel Set')
      .addFields(
        { name: 'Channel', value: `${channel}`, inline: true },
        { name: 'Message Preview', value: message.replace('{user}', interaction.user.toString()).replace('{server}', interaction.guild.name) },
      )
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
