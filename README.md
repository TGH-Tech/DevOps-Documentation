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
