@echo off

echo Changing directory api...
cd "WebApiATB"

echo Building Docker image api...
docker build -t webatbapi .

echo Docker login...
docker login

echo Tagging Docker image api...
docker tag webatbapi mrsamix/webatbapi:latest

echo Pushing Docker image api to repository...
docker push mrsamix/webatbapi:latest

echo Done ---api---!
pause

