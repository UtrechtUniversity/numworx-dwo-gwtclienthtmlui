This project can be used from the commandline in bash or via maven. HTML pages
and javascript files to create an app are in src/main/html. An example index.html
already exists there. 

BASH

From the commandline build the docker image:

cd src/main/docker
docker build -t docker-local-ebs-dev-proxy .

run the image from src/main

cd ..
docker run -dit --name local-ebs-dev-proxy -p 8080:80 -v "$PWD"/html:/usr/local/apache2/htdocs/local docker-local-ebs-dev-proxy

stop the image by listing the containers with

docker ps

and do

docker stop {containerid}

to find the stopped container do

docker ps -a

and start it with

docker start {containerid}

Keep any html and javascript files in src/main/html for compatibility with the maven
pom.xml. Ensure that the files are accessible by docker to read. 

MAVEN

building:

mvn docker:build

running:

mvn docker:run

