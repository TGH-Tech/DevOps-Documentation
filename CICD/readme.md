# GitHub Acions vs Jenkins
## GitHub Actions
* GitHub Actions is the CI/CD solution provided by GitHub, which is well integrated into the GitHub platform and it’s a preferred choice when using GitHub as your source code management solution.
* You can also run it on a local server, which is called a runner. GitHub actions runns in cloud, <mark style="background-color: lightblue">so no need to have a server.</mark>
* Since GitHub Actions is a fully managed service by GitHub, you don’t need to know <mark style="background-color: lightblue">how to scale and operate the infrastructure</mark> to run it.
* GitHub Actions are free to use for public repositories. For <mark style="background-color: lightblue">private repositories, it has a pay-as-you-go</mark> mechanism and a free usage tier is also avaliable. 

## Jenkins
* Jenkins is a free, open source build tool used to implement CI/CD pipelines
* Jenkins is a <mark style="background-color: lightblue">server based application</mark> that runs in servlet containers(Docker) such as Apache Tomcat. Additional server which means <mark style="background-color: lightblue">additional costs.</mark>
* Jenkins server needs installation, <mark style="background-color: lightblue">so management and setup is our consern</mark>
