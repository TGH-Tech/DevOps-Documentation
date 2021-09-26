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

Next the provider and runtime details are given
```yml
provider:
  name: aws
  runtime: nodejs12.x
  lambdaHashingVersion: 20201221
  region: ap-south-1
```
Make sure you are using the correct region. If you don't mention in `region:` it will be deployed at US-EAST-1.
<br>
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
