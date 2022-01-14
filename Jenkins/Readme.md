# Jenkins Pipeline Setup for Container, Docker Images (GitHub, EC2, Docker Hub, Jenkins)

We will be setting up a pipeline for pushing the code to Docker Hub from GitHub and Pulling the code form Docker Hub and AWS EC2. <br>

We will be using this code for this entire deployment. You can check any tutorial for Jenkins Installation. Its a straight forward one. We will be using another EC2 for the container Deployment. We call it as production EC2 <br>

**Production EC2**

In the production EC2, install Docker and Docker Compose.
Create a Folder, all the container files will be inside this folder. Here add your docker-compose file. Its is an important step as we want to give this location while pulling the code and running the container. <br>
Also you need to generate a Key pair, which we will do in the coming steps. <br>

**Plugins**

Initially we need to install plugins before moving to any other process.
    a. From Jenkins dashboard, click on Manage Jenkins
    b. Click on Manage Plugins
    c. Click on Available tab and type the plugin name in search box, select the plugin and click on Install without restart. <br>
GitHub Plugin, Docker Pipelines Plugin, Publish over SSH plugin, these are the main plugins we need in setting up our project. <br>

**Publish Over SSH**

Once the plugins are installed,

1. In your production EC2(The 2nd EC2, which is used for setting the containers) Create a Key Pair using :

        ssh-keygen

2. Once the Key pair is generated, put the public-key to the production EC2 in authorized_keys Folder
3. Now go to the Jenkins console and configure the SSH.
4. Click “Manage Jenkins”
5. Click “Configure System”
6. Go to “Publish over SSH” section
7. Either enter “/Ubuntu/Jenkins/.ssh/id_rsa” to “Path to Key” or Paste the Private Key as it is.
8. Click “Add” at “SSH Servers”
9. Enter any logical name to “Name”
10. Enter IP Address or Hostname of the server(production EC2) to “Hostname”
11. Enter the user name to login to “Username”
12. Enter any directory to “Remote Directory”
13. Click “Test Configuration”
14. Click “Save” at bottom of the page

**Jenkins**

1. Hope you have logged into your Jenkins. Here Click New Item to create New Pipeline. You can add the name as your wish
2. Now select Freestyle Project as the option and Click OK
3. In the general section select GitHub Project as the option.
    a. Add your project URL, which is the same URL of the GitHub Repo.
4. Chose source code management as Git.
    a. Add the same URL which you have added just above
    b. If its the first time setting up the Jenkins then add the GitHub Credentials
    c. Specify the branch which will be used for deployment. We will be using Test branch.
5. Add GitHub hook trigger for GITScm polling as build trigger option so that when the GitHub webhook is done, the pipeline will be triggered automatically when a commit is done in the GitHub.
6. Add the Shell commands in the Build Section.

    ```yml
    sudo docker-compose build
    sudo docker login -u “username” -p “password” docker.io
    sudo docker-compose push
    ```

In the first red colored portion add your Docker hub user name and on the second red colored section add docker hub password. Both should be in inverted commas.

7. Now add the Post-build Actions

8. Choose Send build artifacts over SSH and specify the operartion to be done one the push finishes
9. Choose the SSH server name from the dropdown list
10. In the Exec Command section paste the below code
    ```yml
    docker-compose -f /home/jenkins/Docker_Nginx/docker-compose.yml pull
    docker-compose -f /home/jenkins/Docker_Nginx/docker-compose.yml up -d
    ```
11. Click “Save” at bottom of the page

**Run**

1. Select the Project and click Build Now on the right side
2. If the Build is successful we will get a green tick or it will be a red cross.
<br>

Successfully we have implemented a Pipeline using Jenkins for containerizing our project.
<br>
If the pipeline is to happen after each and every commit you need to set up GitHub Webhook. Its a starlight forward one.