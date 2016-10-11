# OperaDB
Simple website showing data from the canteen in the University of Trento built using Slim php and ReactJS
This project is diveded into two main component:

Backend
-------
In opera_backend we can find a php server built with [Slim php](http://www.slimframework.com) that is connecting to a MySQL database and expose some REST API all accessible through GET request.

Frontend
--------
In opera_frontend we can find a one page application built with [ReactJS](https://facebook.github.io/react/) showing data that come from the exposed REST API.

Installation tips
-----------------
1. You need an Apache running and npm/node installed.
2. In opera_backend you can find the "html" directory. The content of this directory should be publish by an Apache server. So usually you copy those file in /var/www/html
3. In the file that you just copied there is "index.php". In the first part of the file are defined the parameters needed to connect to the browser: change it with your parameters.
4. At these point the backend should work. Access one of the desired urls on the port 80
5. For the frontend copy the folder opera_frontend where you like, go into it and run "npm init" and then "npm start". This should run your development server.
6. Backend and frontend are running on different ports so you should go into opera_frontend/package.json and change the proxy value to your backend ip in orther to avoid CORS problems.
7. Now access the node server (default port 3000)
