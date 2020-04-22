module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.body && req.body.text) {
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Hello from Azure, " + req.body.text
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass the expected values in the request"
        };
    }
};