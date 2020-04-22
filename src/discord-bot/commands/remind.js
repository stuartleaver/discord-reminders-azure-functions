const axios = require('axios').default;

module.exports = {
    name: 'remind',
    description: 'A command using Azure Functions for natural language processing to remind you, or someone else to do something. An example being "Remind @me to go to bed at 8PM"',
    args: true,
    usage: '[text]',
    cooldown: 5,
    execute(message, args) {
        if (!message.mentions.users.size) {
            return message.reply('You need to tag a user in order to remind them!');
        }

        const taggedUser = message.mentions.users.first();
        const reminder = args.join(" ");

        axios.post(`${process.env.AZURE_FUNCTION_APP_ENDPOINT}SimpleHttpTriggerTest`, {
            text: reminder
        })
            .then(function (response) {
                message.channel.send(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    },
};