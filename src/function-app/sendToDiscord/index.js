module.exports = async function (context) {
    const payload = context.bindings.payload;

    return `You scheduled ${payload.reminder} to happen now.`;
};