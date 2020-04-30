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

        const reminder = args.join(" ");

        axios.post(`${process.env.AZURE_FUNCTION_APP_ENDPOINT}/orchestrators/reminderOrchestrator`, {
            reminder: reminder
        })
            .then(function (response) {
                if(response.status == 202){
                    message.channel.send(`'${reminder}' has been scheduled`);
                } else {
                    message.author.send('Opps, something went wrong with your reminder.')
                }
            })
            .catch(function (error) {
                console.log(error);

                message.author.send('Opps, something went wrong with your reminder.')
            });
    },
};