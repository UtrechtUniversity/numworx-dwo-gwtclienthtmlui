# build with 
$ docker build -t docker-local-ebs-dev-proxy .
# run and map docker port 80 to localhost port 8888 on ubuntu or OS-X with
$ docker run -v `pwd`/src:/usr/local/apache2/htdocs/local -p 127.0.0.1:8888:80 -dit --name local-ebs-dev-proxy docker-local-ebs-dev-proxy
# localhost:8888 now is a localhost proxy for ebs-dev.dwo.nl
# directory src is mapped to localhost:8888/local/
# A local sample index.html already exists. You may edit the files in subdir src as desired.

