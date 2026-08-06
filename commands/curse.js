const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const curses = [
  'May every USB require three attempts.',
  'May your pillow forever remain warm.',
  'May your fries always be missing one piece.',
  'May every loading bar stop at 99%.',
  'May your internet disconnect only during ranked.',
  'May every CAPTCHA mistake you for a goat.',
  'May your socks forever remain slightly wet.',
  'May your charger only work at one angle.',
  'May your tea become cold just before you drink it.',
  'May every camel silently judge your decisions.',
  'May your notifications arrive only after you answer.',
  'May your pen run dry mid-signature.',
  'May your autocorrect change your finest words to vegetables.',
  'May your umbrella break at the second droplet.',
  'May your game update right before the tournament.',
  'May your bread land butter-side down, always.',
  'May your arrow fly true only when no one is watching.',
  'May your map rotate at every intersection.',
  'May your coffee stay lukewarm for all eternity.',
  'May the merchant always have just the one thing you cannot afford.',
  'May your scroll burn at the exact important passage.',
  'May every chair you sit on wobble slightly.',
  'May your video buffer precisely on the plot twist.',
  'May your camel disagree with your travel plans.',
  'May your dog steal exactly one sock each week.',
  'May your light turn red the moment you arrive.',
  'May every group project contain one silent member.',
  'May your ruler measure everything but the truth.',
  'May your cursor drift toward the wrong button.',
  'May every NPC stand directly in your path.',
  'May your toga tangle at the festival.',
  'May your cart lose one wheel at the market.',
  'May every deadline sneak up while you nap.',
  'May your chariot develop a permanent squeak.',
  'May your voice crack mid-speech.',
  'May your scrolls roll up the wrong way.',
  'May your fire smoke regardless of the wind.',
  'May your boots fill with sand on the first step.',
  'May every hourglass feel the urge to sprint.',
  'May your melody sound right only in your head.',
  'May your spear miss the target and find your foot.',
  'May your sandal strap break at the temple steps.',
  'May your gold purse have a hole with no memory.',
  'May every password hide just beyond your memory.',
  'May your water skin leak when you need it most.',
  'May your sun dial fail precisely at noon.',
  'May your tent leak during the one storm.',
  'May your wine turn to vinegar the moment it is opened.',
  'May your calendar forget tomorrow.',
  'May your mirror show only yesterday.',
  'May every knot come undone at once.',
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('curse')
    .setDescription('Curse a user with ancient misfortune.')
    .addUserOption((option) =>
      option.setName('target').setDescription('The user to curse. Defaults to you.'),
    ),
  async execute(interaction) {
    const target = interaction.options.getUser('target') ?? interaction.user;
    const curse = curses[Math.floor(Math.random() * curses.length)];
    const embed = new EmbedBuilder()
      .setColor(0xb00020)
      .setTitle('🏺 AncientNPC has spoken...')
      .setDescription(`**${target}**\n\n${curse}\n\n*"The clay tablets rarely lie."*`);
    await interaction.reply({ embeds: [embed] });
  },
  curses,
};
