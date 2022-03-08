# Jenkins pipeline setup for deploying a Nodejs Application in AWS EC2

Create two EC2
1. Node application will be in an EC2 called production EC2.
2. Jenkins will be in an EC2 called Jenkins Server

# Production EC2
1. Spin up the EC2.(I'm usimg Ubuntu 18.0)
2. Install Node and NPM
```yml
sudo apt update
sudo apt install nodejs npm
```
3. Verify the installation by running:
```yml
nodejs --version
```
4. If you want to install most stable version use the below commands
```yml
sudo npm cache clean -f
```
```yml
sudo npm install -g n
```
```yml
sudo n stable
```
5. Verify the installation by running:
```yml
nodejs --version
```
**PM2 Installation**
<br>
PM2 is a tool that will keep your site up as it restarts the application if it crashes, and also help you by restarting the node application as a service when you restart the server.
<br>
6. To install PM2 use the following command:
```yml
sudo npm install pm2 -g
```
