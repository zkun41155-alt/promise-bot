const { Events, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = './data/xp.json';

function loadXP() {
  if (!fs.existsSync('./data')) fs.mkdirSync('./data');
  if (!fs.existsSync(path)) fs.writeFileSync(path, '{}');
  return JSON.parse(fs.readFileSync(path));
}
function saveXP(data) { fs.writeFileSync(path, JSON.stringify(data, null, 2)); }
function getLevel(xp) { return Math.floor(0.1 * Math.sqrt(xp)); }
function xpForLevel(level) { return Math.pow(level / 0.1, 2); }

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    if (message.author.bot || !message.guild) return;
    const xpData = loadXP();
    const key = `${message.guild.id}-${message.author.id}`;
    if (!xpData[key]) xpData[key] = { xp: 0, level: 0, lastMessage: 0 };

    const now = Date.now();
    if (now - xpData[key].lastMessage < 60000) return; // 1 min cooldown
    xpData[key].lastMessage = now;

    const gained = Math.floor(Math.random() * 15) + 10;
    xpData[key].xp += gained;

    const newLevel = getLevel(xpData[key].xp);
    if (newLevel > xpData[key].level) {
  xpData[key].level = newLevel;
}
    saveXP(xpData);
  },
};


