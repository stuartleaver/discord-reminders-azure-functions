# Reminders Discord Bot and Slack App with Azure Functions
A Discord Bot and Slack App to create reminders with the Durable Functions extension in Azure Functions.

## Quick Deploy to Azure
[![Deploy to Azure](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Fstuartleaver%2Fdiscord-slack-reminders-azure-functions%2Fmaster%2Fazuredeploy.json)

This template creates the resources required.

Below are the parameters which can be user configured in the parameters file including:

- **Application Name:** Enter the name you wish to call the application. This name will be used as a base for the resources which will get created.

Ideally this would be part of the Action to deploy the code, and it was at one point. However, I decided to split it out to make Deploying to the Function App a bit easier. The function's could have been deployed via RBAC, but that has been deprecated in favour of using the Publish Profile. So a compromise was made. I will probably have a go at getting it fully automated, but feel free to submit suggestions or have a go yourself at getting it fully automated.

## Discord Bot & Webhook Setup
Setting up a Discord Bot is not just a case of building and deploying the code. There are some manual steps needed to use this sample.

There are two steps to this process:
1. Setting up a bot application
2. Adding your bot to servers
3. Setting up the webhook
4. Connecting it all together

[Discord.js Guide](https://discordjs.guide) has some great documentation on this so the following is just some additional information in the context of this sample.

### Setting up a bot application
Setup your application as per the "[Setting up a bot application](https://discordjs.guide/preparations/setting-up-a-bot-application.html)" guide. Once created, you should see a page like this:

![discord-bot-general-information](assets/discord-bot-application-general-information.png)

Then once you have created the Bot, you should see something like this:

![discord-bot-general-information](assets/discord-bot-application-bot.png)

Then it just needs adding to a server.

### Adding your bot to servers
Again, you can follow the "[Adding your bot to servers](https://discordjs.guide/preparations/adding-your-bot-to-servers.html)" for this step.

Once added, you should see something similiar to this:

![discord-bot-server](assets/discord-bot-server.png)

You of course will only see the Bot online if you have have added your Client Secret as `DISCORD_TOKEN` to either your GitHub Secrets if deploying through GitHub Actions or where ever needed depending on how you are running the Bot. For example, a `.env` file if running the code locally.

### Setting up the webhook
You can create webhooks directly through the discord client, go to Server Settings, you will see a `Webhooks` tab.

![discord-creating-webhooks](assets/discord-creating-webhooks.png)

Once you are there, click on the `Create Webhook` button on the top right. This will create a webhook, from here you can edit the channel, the name, and the avatar. Copy the link, the first part is the id, and the second is the token, you will need this later.

![discord-edit-webhook](assets/discord-edit-webhook.png)

### Connecting it all together
In the above steps, the following pieces of information were generated:
* Client Secret for the Discord bot
* Webhook URL

The deployment is not fully automated and so these will need to be manually placed in the correct locations.

You of course will only see the Bot online if you have have added your Client Secret as `DISCORD_TOKEN` to either your GitHub Secrets if deploying through GitHub Actions or where ever needed depending on how you are running the Bot. For example, a `.env` file if running the code locally or in the Config Vars of a Heroku App:

![heroku-config-vars](assets/heroku-config-vars.png)

You will also need to place the Webhook URL in the Azure Function App Application Settings with a Name of `DiscordWebhook`. If the Function App is already deployed, the easiest way of doing with is with the Azure CLI replacing the parameter values:

`az functionapp config appsettings set --name {MyFunctionApp} --resource-group {MyResourceGroup} --settings "DiscordWebhook={Webhook URL}"`

![function-app-application-settings](assets/function-app-application-settings.png)

## License
[MIT](LICENSE)
