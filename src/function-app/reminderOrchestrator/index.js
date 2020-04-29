const df = require("durable-functions");

module.exports = df.orchestrator(function* (context) {
    const data = context.df.getInput();

    const reminderDueAt = data.reminderDueAt;

    yield context.df.createTimer(new Date(reminderDueAt));

    return yield context.df.callActivity("sendToDiscord", data);
});