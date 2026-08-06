const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const blessings = [
  'May your code compile on the first try.',
  'May every traffic light turn green.',
  'May your Wi-Fi remain stronger than the desert winds.',
  'May your teammates actually communicate.',
  'May your pillow always stay cool.',
  'May every merchant accidentally give you a discount.',
  'May your battery last longer than expected.',
  'May your downloads finish before your patience ends.',
  'May your food always arrive hot.',
  'May fortune follow your footsteps like a loyal camel.',
  'May your notifications arrive when they matter.',
  'May your ink never run dry at the critical line.',
  'May your umbrella remain forever unnecessary.',
  'May your game update only between battles.',
  'May your bread land butter-side up.',
  'May your arrow always find its target.',
  'May your map point true at every turn.',
  'May your coffee stay warm through the long night.',
  'May the merchant always offer you the finest price.',
  'May your scrolls never burn.',
  'May every chair you sit on hold steady.',
  'May your videos load in a single breath.',
  'May your camel follow your path faithfully.',
  'May your socks stay dry through every river.',
  'May your light turn green as you approach.',
  'May every group project have willing hands.',
  'May your cursor always find the right button.',
  'May every NPC step aside for you.',
  'May your toga stay perfect at the festival.',
  'May your cart roll smooth through the market.',
  'May every deadline respect your schedule.',
  'May your chariot ride silent and swift.',
  'May your voice carry strong when it matters.',
  'May your scrolls unroll the right way.',
  'May your fire burn bright in any wind.',
  'May your boots stay free of sand.',
  'May your hours stretch when you need them.',
  'May your melody be as sweet as you imagine.',
  'May your spear always strike true.',
  'May your sandal straps hold through the temple steps.',
  'May your purse stay full and your bag light.',
  'May every password return to you in time.',
  'May your water skin never fail.',
  'May your sun dial always show the hour.',
  'May your tent stand firm through every storm.',
  'May your wine taste of grapes and gladness.',
  'May your calendar hold every promise.',
  'May your mirror reflect what you wish to see.',
  'May every knot hold when you need it.',
  'May your camel\'s hump be high with provisions.',
  'May the stars write your name in gold.',
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('blessing')
    .setDescription('Bless a user with ancient fortune.')
    .addUserOption((option) =>
      option.setName('target').setDescription('The user to bless. Defaults to you.'),
    ),
  async execute(interaction) {
    const target = interaction.options.getUser('target') ?? interaction.user;
    const blessing = blessings[Math.floor(Math.random() * blessings.length)];
    const embed = new EmbedBuilder()
      .setColor(0xffd700)
      .setTitle('🌞 AncientNPC grants a blessing...')
      .setDescription(`**${target}**\n\n${blessing}\n\n*"The stars smile upon your journey."*`);
    await interaction.reply({ embeds: [embed] });
  },
  blessings,
};
