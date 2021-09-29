# Https Configuration (SSL Configuration)

Step 1: Install the Nginx

      $ apt install nginx 

Step 2: Make an Config File Same As Default Config Which Is By Default Given by the Nginx
    
       $ cp /etc/nginx/sites-available/default /etc/nginx/sites-available/www.example.com


Step 3: Now Open This Configuration File And we just need to give the Server_Name (Domain Name)

       $ vim /etc/nginx/sites-available/www.example.com
       
       server_name www.example.com

Step 4: Now Just Remove or Unlink the Default Config File
      
      $ unlink /etc/nginx/sites-enabled/default

Step 5: Link the Actual DomainConfig File
    
      $ ln -s /etc/nginx/sites-available/www.example.com /etc/nginx/sites-enabled/www.example.com

Step 6: Now First test That Syntax of the Configuration File is Perfect Or Not , Is there any Configuration Mistake

	$ nginx -t

Step 7: Start the Server
   
	$ systemctl restart nginx 
          OR
    $  service nginx restart

Step 8: Now Install the Cert Bot (As this is Automated Tool Which will Configured Our SSL Automatically)

	$ apt install python3-certbot-nginx

Step 9: Run it 
 
 	$ certbot --nginx -d www.example.com

Now, Follow the Simple Steps.


# Next On Topic How we can Setup Jenkins ?
# How we can give the Static IP to the Container? (Means How we can create Network /Subnets ?)
