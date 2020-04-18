const Discord = require('discord.js');
const client = new Discord.Client();

const { prefix } = require('./config.json');

client.once('ready', () => {
    console.log('Ready!');
});

client.login(process.env.DISCORD_TOKEN);

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();

    if (command === 'hello') {
        message.channel.send(`Remember to have a good day ${message.author}`);
    }
});