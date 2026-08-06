const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('View the commands granted to AncientNPC.'),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor(0xd4af37)
      .setTitle('📜 AncientNPC Command Scroll')
      .setThumbnail(interaction.client.user.displayAvatarURL())
      .setDescription(
        'Welcome, traveler.\nThese ancient tablets record every power entrusted to AncientNPC.\nChoose your path wisely.',
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
      .setFooter({ text: 'AncientNPC • A forgotten guardian from the Bronze Age\nVersion 1.0' })
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
