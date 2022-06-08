# Steps to be done when working with a project

**Prerequisite**
<br>
Each project should have

1. Main Branch
2. Test Branch - This branch is used by developers to test the project before deplopyment. Heroku or AWS Amplify is used for testing as of now.
3.pp Deploy/Deployment Branch - Used for deployment. Code in this branch is for production.

**Path**

Using the normal referencing like ./folder1/folder2/app is not supported in all the systems.
Since not all the systems use the same referencing technique as in linux and windows.

Also, if we use normal path referencing, we will not be able to use relative paths if we are trying to access a file inside the root directory.

Eg: node ./home/index.js

THis format is not appropriate since from the main root directory we'll not be able to access the relative path.

Solution:
using path package of nodejs.

[Official Documentation for path pakage](https://nodejs.org/api/path.html)

In bots(developed using nodejs), to confiure the path for environmental variables, we can use:

`require('dotenv').config({ path: path.join(__dirname, '.env') })`

# CICD Pipeline

If there is a pipeline, developer should inform the addition of new packages or dependencies to the person who has created the pipeline. 
<br>
Telegram Bot : For testing and in production, the bot token or the telegram api should be different. 
