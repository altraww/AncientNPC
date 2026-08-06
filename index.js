require('dotenv').config();
const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');
const { GoogleGenAI } = require('@google/genai');
const wisdomQuotes = require('./wisdom');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const commands = [
  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong! and the bot latency in milliseconds.'),
  new SlashCommandBuilder()
    .setName('wisdom')
    .setDescription('Receive one random piece of ancient wisdom.'),
  new SlashCommandBuilder()
    .setName('ask')
    .setDescription('Ask the ancient AI a question.')
    .addStringOption((option) =>
      option
        .setName('question')
        .setDescription('The question to ask Gemini.')
        .setRequired(true),
    ),
];

client.once('clientReady', async () => {
  const { TOKEN, CLIENT_ID, GUILD_ID, GEMINI_API_KEY } = process.env;

  console.log('TOKEN:', TOKEN ? 'set' : 'undefined');
  console.log('CLIENT_ID:', CLIENT_ID);
  console.log('GUILD_ID:', GUILD_ID);
  console.log('GEMINI_API_KEY:', GEMINI_API_KEY ? 'set' : 'undefined');

  if (!TOKEN) {
    console.error('TOKEN is not defined. Set it as a Railway service variable.');
    process.exit(1);
  }
  if (!CLIENT_ID) {
    console.error('CLIENT_ID is not defined. Set it as a Railway service variable.');
    process.exit(1);
  }
  if (!GUILD_ID) {
    console.error('GUILD_ID is not defined. Set it as a Railway service variable.');
    process.exit(1);
  }
  if (!GEMINI_API_KEY) {
    console.error('GEMINI_API_KEY is not defined. Set it as a Railway service variable.');
    process.exit(1);
  }

  try {
    const rest = new REST().setToken(TOKEN);
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands.map((command) => command.toJSON()),
    });
    console.log('Slash commands registered.');
  } catch (error) {
    console.error('Failed to register slash commands:', error);
  }
  console.log('AncientNPC is online!');
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply(`🏓 Pong! ${client.ws.ping}ms`);
  }

  if (interaction.commandName === 'wisdom') {
    const quote = wisdomQuotes[Math.floor(Math.random() * wisdomQuotes.length)];
    await interaction.reply(quote);
  }

  if (interaction.commandName === 'ask') {
    const question = interaction.options.getString('question');
    await interaction.deferReply();
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: question,
      });
      await interaction.editReply(response.text ?? 'The scrolls returned no answer.');
    } catch (error) {
      console.error('Gemini request failed:', error.message);
      console.error('Gemini error details:', JSON.stringify(error, null, 2));
      await interaction.editReply('The scrolls have gone silent. Try again later.');
    }
  }
});

client.login(process.env.TOKEN);
