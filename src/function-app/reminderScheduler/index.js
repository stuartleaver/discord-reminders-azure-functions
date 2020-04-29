const df = require("durable-functions");
const chrono = require('chrono-node');
const moment = require('moment-timezone');

module.exports = async function (context, req) {
    const client = df.getClient(context);

    var data = {
        'message': req.body.message,
        'reminderDueAt': moment.utc(chrono.parseDate(req.body.message))
    }

    const instanceId = await client.startNew(req.params.functionName, undefined, data);

    context.log(`Started orchestration with ID = '${instanceId}'.`);

    return client.createCheckStatusResponse(context.bindingData.req, instanceId);
};