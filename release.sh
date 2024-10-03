#!/bin/sh
set -e
git checkout master; git pull; 
git checkout teuniz; git pull;
mvn -P gitflow jgitflow:release-start;
mvn -P gitflow jgitflow:release-finish;
git push --tags; git push --all
