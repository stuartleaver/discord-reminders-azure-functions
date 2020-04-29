/*
 * This function is not intended to be invoked directly. Instead it will be
 * triggered by an orchestrator function.
 * 
 * Before running this sample, please:
 * - create a Durable orchestration function
 * - create a Durable HTTP starter function
 * - run 'npm install durable-functions' from the wwwroot folder of your
 *   function app in Kudu
 */

module.exports = async function (context) {
    const payload = context.bindings.payload;

    context.log(`You scheduled ${payload.message} to happen now.`)

    return `You scheduled ${message} to happen now.`;
};