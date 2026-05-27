const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('hack')
    .setDescription('Fake hack someone 💻 (just for fun!)')
    .addUserOption(o => o.setName('user').setDescription('Who to hack').setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    await interaction.deferReply();

    const steps = [
      '🔍 Locating target...',
      '🌐 Bypassing firewall...',
      '💾 Accessing database...',
      '🔑 Cracking password...',
      '📂 Downloading files...',
      '🧹 Covering tracks...',
    ];

    let current = 0;
    const embed = new EmbedBuilder().setColor('#00FF00').setTitle(`💻 Hacking ${user.tag}...`).setDescription(steps[0]);
    const msg = await interaction.editReply({ embeds: [embed] });

    const interval = setInterval(async () => {
      current++;
      if (current >= steps.length) {
        clearInterval(interval);
        const done = new EmbedBuilder()
          .setColor('#00FF00')
          .setTitle(`✅ ${user.tag} has been hacked!`)
          .addFields(
            { name: '📧 Email', value: `${user.username.toLowerCase()}@gmail.com`, inline: true },
            { name: '🔑 Password', value: `${user.username}123!`, inline: true },
            { name: '💳 Card', value: '**** **** **** ' + Math.floor(1000 + Math.random() * 9000), inline: true },
            { name: '📍 Location', value: 'Your mom\'s house 😂', inline: true },
          )
          .setFooter({ text: 'This is 100% fake and just for fun! 😄' })
          .setTimestamp();
        await msg.edit({ embeds: [done] });
      } else {
        embed.setDescription(steps.slice(0, current + 1).join('\n'));
        await msg.edit({ embeds: [embed] });
      }
    }, 1000);
  },
};
