This project can be used from the commandline in bash or via maven. HTML pages
and javascript files to create an app are in src/main/html. An example index.html
already exists there. Live accessing the DwoGwtClient Api goes through the javascript console.

var dpf = dwoAPI.DwoPresenterFactory.getDwoPresenterFactory();
pf = dpf.getFac();

pf will contain contain a presenterfactory in which every returned presenter  
will contain the documented call-backs in the jsdisplays package. Samples of the
ui implementations are stored in html/js-plainui. Documentation is in the package
nl.uu.fi.dwo.lms.gwtclient.gwt.jsdisplays of the DwoGwtClient application.

In the javascript console one can access the api using:


In the javascript console one can access the api using:


BASH

From the commandline build the docker image:

cd src/main/docker
docker build -t docker-local-ebs-dev-proxy .

run the image from src/main

cd ..
docker run -v $PWD/html:/usr/local/apache2/htdocs/local -p 127.0.0.1:8888:80 -dit --name local-ebs-dev-proxy docker-local-ebs-dev-proxy
open http://localhost:8888/local/

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

var dpf = dwoAPI.DwoPresenterFactory.getDwoPresenterFactory();
pf = dpf.getFac();

pf will contain contain a presenterfactory in which every returned presenter  
will contain the documented call-backs in the jsdisplays package. Samples of the
ui implementations are stored in html/js-plainui. Documentation is in the package
nl.uu.fi.dwo.lms.gwtclient.gwt.jsdisplays of the DwoGwtClient application.

In the javascript console one can access the api using:


In the javascript console one can access the api using:


BASH

From the commandline build the docker image:

cd src/main/docker
docker build -t docker-local-ebs-dev-proxy .

run the image from src/main

cd ..
docker run -dit --name local-ebs-dev-proxy -p 8888:80 -v "$PWD"/html:/usr/local/apache2/htdocs/local docker-local-ebs-dev-proxy

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

SCSS

In de css directory een scss watcher aanzetten:

cd src/main/html/css
scss --watch scss:.

Terzijde

maven package 

bouwt de css mbv een maven scss plugin

TESTEN OP MOBIEL (Mac)

Get list of hardware interfaces:

networksetup -listallhardwareports

Find your IP on your local network:

ipconfig getifaddr [interface-name]
interface-name is for example 'en0'

Visit the IP on your phone, example:

192.168.1.158:8888/local/