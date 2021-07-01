git checkout master; git pull; git checkout teuniz; mvn -P gitflow jgitflow:release-start; mvn -P gitflow jgitflow:release-finish; git push --tags; git push --all
