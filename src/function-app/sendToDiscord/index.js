const axios = require('axios').default

module.exports = async function (context) {
    const payload = context.bindings.payload;

    axios.post(process.env["DiscordWebhook"], {
        content: `Reminder '${payload.reminder}' was scheduled to happen now.`
    })
        .then(function (response) {
            console.log(`Discord response: ${response.status}`);
        })
        .catch(function (error) {
            console.log(`Error: ${error}`);
        })
};



