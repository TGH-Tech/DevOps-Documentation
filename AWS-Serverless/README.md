# Points to note while deploying a serverless bot
You should have an idea about [Webhook](https://core.telegram.org/bots/webhooks) \
  * Basically, a webhook is used for getting updates when a user sends a command or a message to the bot.
  * However, in order to set a webhook, telegram requires an HTTPS enabled url to which telegram servers make a POST request on each message input. 
  * We create a lambda function, which when deployed, provides us an HTTPS enabled url. 
  * We set up the Telegram webhook using the above HTTPS enabled url to which telegram makes a POST request which contains the message object just as it is received in the `bot.onText(/regex/, msg=>console.log(msg))` msg object.
  * We can then set up a switch statement or an if-else ladder to evaluate the message text and perform various actions depending on the command entered.
  * **Note**: It is not necessary that you use the `node-telegram-bot-api` library to send a message or get msg input etc. Telegram provides apis which can be used to send messages easily by passing in the chatId, msg-text, keyboardType etc, as seen in the above articles. Msg input can be received using webhooks as well as mentioned in the above paragraph.
  * Create a `serverless.yml` file and define the function with a path similar to the article mentioned above and deploy the function using `serverless deploy`
  * You can also [check this](https://xabaras.medium.com/setting-your-telegram-bot-webhook-the-easy-way-c7577b2d6f72) to know Set up, remove, get status of webhooks


# AWS_Serverless

We are going to use Serverless Framework. In order to use it on your machine, install Node.js. <br>

Now use this command to install serverless in your system <br> `npm install -g serverless`

Once its doen, make sure its installed properly by using either os these two commands <br>`serverless` or `sls`

Next configure your aws account by giving ID and Secret Key in this command <br>
`serverless config credentials -p aws -k <AWS_ID> -s <AWS_Secret_Key>` 
Now your serverless framework is configured with AWS

To create the Lambda function, simply create a new folder on your machine, navigate inside of it, open a terminal window, and type <br>
`serverless create --template aws-nodejs`
<br>
This will create a folder for Lambda functions. This consists of two files: `handler.js` and `serverless.yml` <br>

Now Update `handler.js` file <br>

Create a basic package.json file using the command `npm init` Simply run the command and press enter each time different prompts appear. <br>

Then run the package’s installation command:
  1. `npm i request`
  2. `npm i request-promise`
<br>
Next Change the code of the `handler.js` file <br>

You need to create your bot in Telegram. You’ll then get a secret token and paste it to the *TELEGRAM_TOKEN* variable on the second line of the JavaScript code above. <br>

Finally Deploy the code using the command <br>
`serverless deploy` 
<br>
<br>
Wait few minutes for the code to get deployed in the lambda function. <br>

Once its deployed you will get endpint in the terminal. Next task is to set up webhook, for that use the command in the terminal <br>
`curl --request POST --url https://api.telegram.org/bot<TELEGRAM_TOKEN>/setWebhook --header 'content-type: application/json' --data '{"url": "<LINK_YOU_GET_FROM_SERVERLESS_DEPLOY>"}'`
<br>
<br>
Sucessfully we have built our simple serverless bot. Check your telegram.



