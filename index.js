require('dotenv').config();
const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const commands = [
  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong! and the bot latency in milliseconds.'),
];

client.once('clientReady', async () => {
  try {
    const rest = new REST().setToken(process.env.TOKEN);
    await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), {
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
});

client.login(process.env.TOKEN);
