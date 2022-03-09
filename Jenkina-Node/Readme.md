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
5.Verify the installation by running:
```yml
nodejs --version
```
**PM2 Installation**
<br>
PM2 is a tool that will keep your site up as it restarts the application if it crashes, and also help you by restarting the node application as a service when you restart the server.
<br>
6.To install PM2 use the following command:
```yml
sudo npm install pm2 -g
```
Now we need to configure the ssh key, use the below code to create a new key
```yml
ssh-keygen -t rsa -m PEM
```
This will create new key. Go to
```
cd .ssh/
```
Here there will be two files. 
    1. Private Key 
    2. Public Key
    
Copy the Public key and paste it in the SSH key section of Github. We are adding this so that we can clone and pull the code directly form GitHub. This is helpfull when running *Exec shell commands*.
<br>
Now add the public key in the autherised keys section. Why we are adding is then only the Jenkins can ssh to Production EC2.

# Jenkins GUI

1. Login in to Jenkins and go to credentials section and add the private key with correct username. I will be using ubuntu as the username. It is the default user name for Ubuntu seerver. This comes under *SSH Username with private key* 
2. Now got to Configure settings and add the IP address of Production EC2, port as 22, select the previous credentials from the drop down menu, give other values as 0. 
3. **NB** If SSH section is not avaliable Install the SSH plugins like **Publish-over-ssh**, **SSH-agent** etc.Then the ssh section will be visible. You can use the **Check Connection** to check whether the configuration is correct or not.
4. Now go to **New Item** and select **freestyle**. Give a required name.
5. 5. Under General section add GitHub project and add the project link
6. 6. For source code managemnt add the same repo link. If you haven't configured the GitHub credentials you will get error. 
7. 7. Mention the correct branch which you need to deploy to your production server.
8. 8. For the **Build Environment** select *Execute shell script on remote host using ssh* <br>
9. Here add the commands you need to execute in the remote host.
10. <br>
11. ```yml
12. cd /home/ubuntu/<filename> && git pull
13. ```
14. ```yml
15. sudo pm2 restart <filename>/index.js or server.js
    ```
    
   <br>
    
    **NB** You need to clone your repo first time using ssh link from github and run the process using pm2
    <br>
    Now if the pipeline need to run after each commit you need to setup Github Webhook and you need to enable **GitHub Hook** under **Build Trigger** section
