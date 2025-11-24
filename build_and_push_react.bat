@echo off

echo Changing directory react...
cd "react-ts"

echo Building Docker image react...
docker build -t webatbreact .

echo Docker login...
docker login

echo Tagging Docker image react...
docker tag webatbreact:latest mrsamix/webatbreact:latest

echo Pushing Docker image react to repository...
docker push mrsamix/webatbreact:latest

echo Done ---react---!
pause

