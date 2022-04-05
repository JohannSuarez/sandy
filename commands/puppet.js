'use strict';
const { SlashCommandBuilder } = require('@discordjs/builders');
// const axios = require('axios');


module.exports = {
  data: new SlashCommandBuilder()
    .setName('puppet')
    .setDescription('Make Duane say something.')
    .addStringOption(option =>
      option.setName('text')
        .setDescription("Duane says...")
        .setRequired(true)),
  async execute(interaction) {

      /*
       * Step 1: Grab channel information from interaction object.
       * Step 2: Use channel.send() to send it the string passed on from the command argument.
       * Step 3: Reply to the interaction but ephemerally, to confirm the bot received your command.
       */

      const channel_id = interaction.channelId
      const message = interaction.options.getString("text")
      interaction.member.guild.channels.cache.get(channel_id).send(message);

      interaction.reply({
        content: "Processing...",
        ephemeral: true,
      });

    }

};
