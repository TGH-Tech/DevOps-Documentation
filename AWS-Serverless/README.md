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

# Points to keep in mind
  * It is important that you return an object with statusCode 200 so that telegram understands that the query has been successfully answered. 
  * when you want to send JSON, ensure that you send it after stringifying it first.
  * Request path contains unescaped characters which can be fixed by creating a function to format text using [this](https://stackoverflow.com/questions/31024779/typeerror-request-path-contains-unescaped-characters-how-can-i-fix-this/62437210#62437210)
  * Lambda is stateless, meaning that you can’t persist variable states in global variables, Each new call will result in a fresh instance being fired upon. This would have implications when storing user keyboard presses in memory. (Some alternative would be storing the button status in a db (too slow) or using some in-memory cache systems like Redis or Memcached (as suggested in the discussion thread by Node-telegram bot api)).
  * Telegram ensures only one way of getting inputs is active at any particular moment. Hene you can’t have polling and webhooks enabled at the same time. Ie. If you use the node-telegram-bot-api and set polling:true and have also enabled a webhook, when you run npm start, the webhook will automatically get disabled. 
  * In order to delete pending messages which may get accumulated in case you forgot to return 200 statusCode or for any other reason that could result in same response message being sent by the bot, you can use the following url structure to delete pending updates: *https://api.telegram.org/bot{my_bot_token}/setWebhook?url={url_to_send_updates_to}&drop_pending_update=true*
  * If you’ve got some extra route defined which accepts a request from a backend and performs an action (eg: `‘/notify’` route which when called sends a telegram notification message to the user), then that function can be exported and defined in the `serverless.yml` file which will give a new HTTPS url for that function. This can then be called by the backend to invoke that function. The package [aws serverless express](https://github.com/vendia/serverless-express) can be used if the function is complex and would require some expressJs like route handling.
  * Note that you may have environment variables which may be defined in a .env file. This needs to be added to the aws console as well by going to the `configuration` tab and selecting `environment-variables` section from the left side menu.

  # Things which could be explored and improved when the need arises
  * Use [ngrok](https://ngrok.com/) to expose a local port to the internet, which would provide an HTTPS enabled url which can be used to set up the webhook. This would enable live-reloading whenever a change is made as there would be no more need to deploy the function to AWS to see the changes
  * A way to connect a database like MongoDb.  This can be done by calling the Mongo connect function in the handler function so as to persist the database connection for some time without having to do a cold start for each invocation like mentioned [here](https://github.com/vendia/serverless-express#async-setup-lambda-handler)