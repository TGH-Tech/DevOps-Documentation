# Deployment of SSL Encrypted Node.js App on AWS EC2 Using Nginx and Docker with LetsEncrypt

**Just Create an Ubuntu EC2 instance.** <br>

While creating Security Group, please make sure the ports, 5000, 80, 443, 22 are open. My node app works on 5000 port. You can change it as your convenience. Port 80 and 443 is for HTTP and HTTPS. Port 22 is for SSH.

1. Login to your EC2 instance and type the command

```sudo apt-get update```

## 2. Now install Docker
If your are using Ubuntu these commands will work.

a. Uninstall Old versions

```yml
sudo apt-get remove docker docker-engine docker.io containerd runc
```

b. Before you install Docker Engine for the first time on a new host machine, you need to set up the Docker repository. Afterward, you can install and update Docker from the repository. Then Add Docker’s official GPG key

```yml
sudo apt-get install \
 ca-certificates \
 curl \
 gnupg \
 lsb-release
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg — dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

c. Now set up the stable repository

```yml
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
  ```

d. Install the latest version of Docker Engine

```
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io
```

e. Verify that Docker Engine is installed correctly by running the hello-world image

```sudo docker run hello-world```

## 3. Now install Docker Compose.
We use Docker Compose because there are two containers we are going to setup. If you are having only one container, no need to install docker compose.

a. Download the current stable release of Docker Compose

```yml
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

b. Apply executable permissions to the binary

```yml
sudo chmod +x /usr/local/bin/docker-compose
```

c. Test the installation.

```docker-compose --version```

## 4. Now we are going to work with some files and codes(You can do this in EC2 or in your local system)

a. Create a directory

```mkdir test```

b. cd into it

```cd test```

c. Here create two folders — one for node and one for nginx

```mkdir appmkdir nginx```

d. Navigate to app folder and type the following command to create a package.json

```npm init```

e. Now in the terminal, clicking yes will be good. Then execute the following commands.
* Creates the index.js file
* Installs the express web framework

```yml
touch index.js npm install express
```

f. Open your index.js file, and paste the following code. You can use vim or any other code editor. This code gives a sample message at port 5000(what ever port you are specifying here need to be opened in the security group)

```yml
const express = require('express');
const app = express();
app.get('/', (req, res) => {
  res.send('Hello, your server is working!')
})app.listen(5000, () => console.log('Server is up and running'));
```

g. Now run the server to test everything is working

```node index.js```

Go to this link http://localhost:5000 , you will see a message like this Hello, your server is working!
That means your code is working

Now come out of the directory by typing cd. Check the current directory by typing pwd

```/home/ubuntu```

## 5. Here install Nginx

a. Install Nginx package to your EC2 machine

```sudo apt-get install nginx```

b. Nginx registers itself as a service with ufw, our firewall, upon installation.

```sudo ufw app list```

You should get a listing of the application profiles:

```yml
OutputAvailable applications:
  Nginx Full
  Nginx HTTP
  Nginx HTTPS
  OpenSSH
```

c. We will be allowing Nginx Full and OpenSSH

```yml
sudo ufw allow 22/tcp
sudo ufw allow ‘nginx full’
```

d. Now Refresh the firewall settings

```sudo ufw reload```

But if you are getting Firewall not enabled (skipping reload), then enable the firewall by entering:

```sudo ufw enable```

Type yes if prompted, because we have already allowed port 22.

f. To access your app over https, you need to have an SSL certificate installed. Letsencrypt helps you in getting SSLcertificates. It does this by using a software tool called Certbot, which you need to install on your instance. Run the following commands:

```sudo apt install certbot python3-certbot-nginx```

g. Now it’s time for domain configuration. You need to set-up ARecord, oherwise the ssl certificates won’t be installed in the system. Give the ARecord deails. You can give the subdomain as your wish. In the answer section mention the IP address of your EC2
DNS configuration

h. Now in the EC2 run the following commands to install SSL certificates.

```sudo certbot --nginx -d YOUR_DOMAIN```

We are choosing 2 because we need to redirect all traffic to HTTPS, also please not the location where your ssl certificates are stored. We need to add it in the conf file.

Once the ssl is done please check whether your domain is working in https

## 6. Dockerfile <br>
Now we will be configuring docker file for our both node container and nginx container.

a. cd into the location where your index file is located and create a Dockerfile.

```touch Dockerfile```

b. Open the Dockerfile and paste the following code and save it.

```yml
FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD [“node”, “index.js”]
```
c. Ceate a .dockerignore file

```touch .dockerignore```

d. Paste the following into it

```yml
node_modules
npm-debug.log
```
e. Now move to nginx directory and cretae a Dockerfile by typing:

```yml
cd ..
cd nginx
touch Dockerfile
```
f. paste the following into your Dockerfile

```yml
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
EXPOSE 443
CMD [ “nginx”, “-g”, “daemon off;” ]
```
## 7. Nginx conf File <br>
a. Now we need a conf file in the nginx folder. We will be copying the conf file which is located in our EC2 instance. Use the below commands to check your conf file.

```sudo vim /etc/nginx/nginx.conf```

The conf file will be similar to what you see in this image. I have just showed the beginning of the conf file. <br>

Before executing the copy command make sure you are still inside the nginx folder where we just created docker file. Now copy the conf file use below command:

```cp /etc/nginx/nginx.conf .```

Now check whether the file has been copied or not.

b. Next setup Reverse Proxy so that direct connection to the Node App will not be happening.

```yml
server {
 location / {
 proxy_set_header Host $host;
 proxy_set_header X-Real-IP $remote_addr;
 proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
 proxy_set_header X-Forwarded-Proto $scheme;
 proxy_pass http://nodeserver:5000;
  }
}
```

Here http://nodeserver:5000 nodeserver is the name I use for my container. You can setup the name as your wish. The conatiner name setup is done in the docker-compose file.
<br>
c. Next set up SSL configuration. Add the following just above the following.

```yml
listen 80; 
listen 443 ssl; 
ssl_certificate /etc/letsencrypt/live/Your-Domain/fullchain.pem; ssl_certificate_key /etc/letsencrypt/live/Your-Domain/privkey.pem;
```

## 8. Docker Compose
In the root directory create a Docker Compose File and paste the following code into it.

```touch dokcer-compose.yml```

Here container image names are nodeserver & nginix. This nodeserver is given while we created a reverse proxy.
```yml
version: "2"
services:
        nodeserver:
                build:
                        context: ./app
                ports:
                        - "5000:5000"
        nginix:
                restart: always
                build:
                        context: ./nginx
                ports:
                        - "80:80"
                        - "443:443"
                volumes:
                        - ./nginx/nginx.conf:/etc/nginx/nginx.conf
                        - ./nginx/error.log:/etc/nginx/error_log.log
                        - /etc/letsencrypt/:/etc/letsencrypt/
```

Make sure Docker Compose file is in the root directory
<br>
Use the below command to build the docker image.

```sudo docker-compose up```

It will start building your image and run the server. The output in the terminal will be as shown. But we wont be able to use our terminal for any purpose, so we can run it in the background. So close the process using CTRL+C
<br>
Use the below command to run the containers in the deached or background

```sudo docker-compose up -d```
