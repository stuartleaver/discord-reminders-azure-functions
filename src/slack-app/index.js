const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const signature = require("./verifySignature");

const app = express();

const rawBodyBuffer = (req, res, buf, encoding) => {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || "utf8");
  }
};

app.use(bodyParser.urlencoded({ verify: rawBodyBuffer, extended: true }));
app.use(bodyParser.json({ verify: rawBodyBuffer }));

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(
    "Express server listening on port %d in %s mode",
    server.address().port,
    app.settings.env
  );
});

// Slash Command Endpoint to receive a payload

app.post("/command", async (req, res) => {
  if (!signature.isVerified(req)) {
    res.sendStatus(404); // You may throw 401 or 403, but why not just giving 404 to malicious attackers ;-)
    return;
  } else {
    const reminder = req.body.text;

    console.log(reminder);

    const errorBlock = [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "Opps, something went wrong with your reminder."
        }
      }
    ];

    axios
      .post(
        `${process.env.AZURE_FUNCTION_APP_ENDPOINT}/api/orchestrators/reminderOrchestrator?code=${process.env.AZURE_FUNCTION_APP_MASTER_KEY}`,
        {
          reminder: reminder
        }
      )
      .then(function (response) {
        if (response.status == 202) {
          const blocks = [
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: `'${reminder}' has been scheduled`
              }
            }
          ];

          const message = {
            response_type: "in_channel",
            blocks: blocks
          };

          res.json(message);
        } else {
          const message = {
            response_type: "in_channel",
            blocks: errorBlock
          };

          res.json(message);
        }
      })
      .catch(function (error) {
        console.log(error);

        const message = {
          response_type: "in_channel",
          blocks: errorBlock
        };

        res.json(message);
      });
  }
});
