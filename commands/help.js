const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('View the commands granted to AncientNPC.'),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor(0xd4af37)
      .setTitle('📜 AncientNPC Command Scroll')
      .setDescription(
        '*"Welcome, traveler. These ancient tablets describe the powers granted to AncientNPC."*',
      )
      .addFields(
        { name: '🤖 AI', value: '• /ask — Ask AncientNPC anything.' },
        { name: '📜 Wisdom', value: '• /wisdom — Receive ancient wisdom.' },
        {
          name: '🏺 Ancient Magic',
          value: '• /curse — Place an ancient curse.\n• /blessing — Receive an ancient blessing.',
        },
        { name: '⚡ Utility', value: '• /ping — Check if AncientNPC is awake.' },
      )
      .setFooter({ text: 'More relics are uncovered with every update...' })
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
