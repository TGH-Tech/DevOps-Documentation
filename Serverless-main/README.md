# Serverless

To get a working Code [Click Here](https://github.com/TGH-Tech/AWS_Serverless)

After creating a serverless template two files will be created
1. `handler.js`
2. `serverless.yml`

By default all the details will be in `serverless.yml` file, of which most of the lines will be commented out.

Service name indicates the name of service crested in the lambda.
```yml
service: testbot
frameworkVersion: '2'
```
If dashbord is enabled, app and org can be used with dashboard.serverless.com
```yml
app: query-search-bot
org: aldrinjenson
useDotenv: true
```

Next the provider and runtime details are given
```yml
provider:
  name: aws
  runtime: nodejs12.x
  lambdaHashingVersion: 20201221
  region: ap-south-1
```
Make sure you are using the correct region. If you don't mention in `region:` it will be deployed at US-EAST-1. <br>
Now mention the function name and API request
```yml
functions:
  shortbot:
    handler: handler.shortbot
    events:
        - httpApi:
            path: /users/create
            method: post
```

Here `handler:handler.shortbot` means the function shortbot from handler file. Make sure correct function is given. <br>
The Events section gives the trigger type. Here the triger type is HTTP API and the method is post. 

You can deploy a basic serverless application with the above code. <br>
Below code can be added if you want to configure it more.

You can also mention the stage as development/test/production after adding region
<br>
```yml
stage: dev
```
When you declare the websocket event type for the first time, Serverless Framework will create a new WebSocket API Gateway. `$connect` and `$disconnect` are official WebSocket route events
```yml
          - websocket: $connect
```
By default the S3 bucket will be created when we deploy the serverless function
```yml
          - s3: ${env:BUCKET}
```
You can add simple notifications service by giving sns code <br>
You can add dynamodb configuration <br>
You can configure alexaskill and smathome
```yml
       - sns: greeter-topic
       - stream: arn:aws:dynamodb:region:XXXXXX:table/foo/stream/1970-01-01T00:00:00.000
       - alexaSkill: amzn1.ask.skill.xx-xx-xx-xx
       - alexaSmartHome: amzn1.ask.skill.xx-xx-xx-xx
```
You can configure cloudwatch events for the Serverless deployment
```yml
      - cloudwatchEvent:
          event:
            source:
               - "aws.ec2"
             detail-type:
               - "EC2 Instance State-change Notification"
             detail:
               state:
                 - pending
       - cloudwatchLog: '/aws/lambda/hello'
```
You can congiure the Elastic Load Balancer for the serverless Application
```yml
       - alb:
           listenerArn: arn:aws:elasticloadbalancing:us-east-1:XXXXXX:listener/app/my-load-balancer/50dc6c495c0c9188/
           priority: 1
           conditions:
             host: example.com
             path: /hello
```
You can add CloudFormation resource templates here
```yml
 resources:
   Resources:
     NewResource:
       Type: AWS::S3::Bucket
       Properties:
         BucketName: my-new-bucket
   Outputs:
      NewOutput:
        Description: "Description for the output"
        Value: "Some output value"
```
You can add packaging information here
```yml
 package:
   patterns:
     - '!exclude-me.js'
     - '!exclude-me-dir/**'
     - include-me.js
     - include-me-dir/**
```
