This project can be used from the commandline in bash or via maven. HTML pages
and javascript files to create an app are in src/main/html. An example index.html
already exists there. 

BASH

From the commandline build the docker image:

cd src/main/docker
docker build -t docker-local-ebs-dev-proxy .

run the image from src/main

cd ..
docker run -v `../html:/usr/local/apache2/htdocs/local -p 127.0.0.1:8888:80 -dit --name local-ebs-dev-proxy docker-local-ebs-dev-proxy

stop the image by listing the containers with

docker ps

and run

docker stop {containerid}

Keep any html and javascript files in src/main/html for compatibility with the maven
pom.xml

MAVEN

building:

mvn docker:build

running:

mvn docker:run

