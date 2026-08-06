const {
  SlashCommandBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require('discord.js');

const GOLD = 0xd4af37;
const FOOTER_DEFAULT = 'AncientNPC • A forgotten guardian from the Bronze Age\nVersion 1.0';

const BUTTONS = [
  { id: 'ai', label: 'AI', emoji: '🤖' },
  { id: 'ancient', label: 'Ancient', emoji: '🏺' },
  { id: 'utility', label: 'Utility', emoji: '⚡' },
  { id: 'about', label: 'About', emoji: 'ℹ️' },
];

const PAGES = {
  main: {
    title: '📜 AncientNPC Command Scroll',
    description:
      'Welcome, traveler.\n\nThese ancient tablets record every power entrusted to AncientNPC.\nChoose your path wisely.',
    fields: [
      { name: '🤖 AI', value: '• /ask — Ask AncientNPC anything.' },
      { name: '📜 Wisdom', value: '• /wisdom — Receive ancient wisdom.' },
      {
        name: '🏺 Ancient Magic',
        value: '• /curse — Place an ancient curse.\n• /blessing — Receive an ancient blessing.',
      },
      { name: '⚡ Utility', value: '• /ping — Check if AncientNPC is awake.' },
    ],
  },
  ai: {
    title: '🤖 AI Commands',
    description: null,
    fields: [{ name: '/ask', value: 'Ask AncientNPC anything using Gemini AI.' }],
  },
  ancient: {
    title: '🏺 Ancient Powers',
    description: null,
    fields: [
      { name: '/wisdom', value: 'Receive ancient wisdom.' },
      { name: '/curse', value: 'Place an ancient curse.' },
      { name: '/blessing', value: 'Receive an ancient blessing.' },
    ],
  },
  utility: {
    title: '⚡ Utility',
    description: null,
    fields: [
      { name: '/ping', value: 'Check if AncientNPC is awake.' },
      { name: '/help', value: 'Display this help menu.' },
    ],
  },
  about: {
    title: 'ℹ️ About AncientNPC',
    description:
      'AncientNPC is a humorous Bronze Age guardian who somehow survived into modern Discord.\n\nPowered by:\n• Discord.js v14\n• Google Gemini AI\n\nVersion:\n1.0',
    fields: [],
    footer: 'I once guarded a forgotten temple. Now I guard Discord servers.',
  },
};

function buildEmbed(pageId, client) {
  const page = PAGES[pageId];
  const embed = new EmbedBuilder()
    .setColor(GOLD)
    .setTitle(page.title)
    .setThumbnail(client.user.displayAvatarURL())
    .setTimestamp();
  if (page.description) embed.setDescription(page.description);
  if (page.fields && page.fields.length > 0) embed.addFields(page.fields);
  embed.setFooter({ text: page.footer ?? FOOTER_DEFAULT });
  return embed;
}

function buildRow(selectedId) {
  return new ActionRowBuilder().addComponents(
    BUTTONS.map((button) =>
      new ButtonBuilder()
        .setCustomId(`help_${button.id}`)
        .setLabel(button.label)
        .setEmoji(button.emoji)
        .setStyle(selectedId === button.id ? ButtonStyle.Primary : ButtonStyle.Secondary),
    ),
  );
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('View the commands granted to AncientNPC.'),
  async execute(interaction) {
    await interaction.reply({
      embeds: [buildEmbed('main', interaction.client)],
      components: [buildRow('main')],
    });
  },
  async handleButton(interaction) {
    if (!interaction.isButton()) return false;
    if (!interaction.customId.startsWith('help_')) return false;
    const pageId = interaction.customId.slice('help_'.length);
    if (!PAGES[pageId]) return false;
    await interaction.update({
      embeds: [buildEmbed(pageId, interaction.client)],
      components: [buildRow(pageId)],
    });
    return true;
  },
};
