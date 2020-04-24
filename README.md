# Reminders Discord Bot and Slack App with Azure Functions
A Discord Bot and Slack App to create reminders with the Durable Functions extension in Azure Functions.

## Quick Deploy to Azure
[![Deploy to Azure](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Fstuartleaver%2Fdiscord-slack-reminders-azure-functions%2Fmaster%2Fazuredeploy.json)

This template creates the resources required.

Below are the parameters which can be user configured in the parameters file including:

- **Application Name:** Enter the name you wish to call the application. This name will be used as a base for the resources which will get created.

Ideally this would be part of the Action to deploy the code, and it was at one point. However, I decided to split it out to make Deploying to the Function App a bit easier. The function's could have been deployed via RBAC, but that has been deprecated in favour of using the Publish Profile. So a compromise was made. I will probably have a go at getting it fully automated, but feel free to submit suggestions or have a go yourself at getting it fully automated.

## License
[MIT](LICENSE)
