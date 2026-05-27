const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Shows all available commands'),
  cooldown: 5,
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor('#5865F2')
      .setTitle('📖 ¿Promise? Bot Commands')
      .setDescription('Here are all available commands:')
      .addFields(
        { name: '🎉 Welcome & Server', value: '`/setwelcome` `/serverinfo` `/userinfo` `/roles`', inline: false },
        { name: '🎨 Embeds & Messages', value: '`/embed` `/say` `/announce`', inline: false },
        { name: '🔨 Moderation', value: '`/kick` `/ban` `/unban` `/mute` `/unmute` `/warn` `/warnings` `/clear`', inline: false },
        { name: '🎮 Fun & Games', value: '`/8ball` `/roll` `/coinflip` `/joke` `/meme` `/roast` `/compliment`', inline: false },
        { name: '💘 Social', value: '`/ship` `/truth` `/dare` `/wyr` `/steal`', inline: false },
        { name: '😂 Rate Me', value: '`/iq` `/gayrate` `/howcringe` `/pp`', inline: false },
        { name: '🕵️ Fun Actions', value: '`/hack` `/trivia`', inline: false },
        { name: '📊 Utility', value: '`/poll` `/remind` `/avatar` `/ping` `/botinfo` `/calc`', inline: false },
        { name: '⭐ Leveling', value: '`/rank` `/leaderboard` `/setxp`', inline: false },
      )
      .setFooter({ text: `Requested by ${interaction.user.tag} • ¿Promise? Bot`, iconURL: interaction.user.displayAvatarURL() })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
