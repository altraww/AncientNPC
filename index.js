require('dotenv').config();
const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');
const wisdomQuotes = require('./wisdom');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const commands = [
  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong! and the bot latency in milliseconds.'),
  new SlashCommandBuilder()
    .setName('wisdom')
    .setDescription('Receive one random piece of ancient wisdom.'),
];

client.once('clientReady', async () => {
  const { TOKEN, CLIENT_ID, GUILD_ID } = process.env;

  console.log('TOKEN:', TOKEN ? 'set' : 'undefined');
  console.log('CLIENT_ID:', CLIENT_ID);
  console.log('GUILD_ID:', GUILD_ID);

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
});

client.login(process.env.TOKEN);
