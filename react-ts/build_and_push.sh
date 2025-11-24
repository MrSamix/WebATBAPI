sudo apt update

git clone https://github.com/MrSamix/WebATBAPI.git

cd react-ts

sudo docker build -t webatbreact .

sudo docker login

sudo docker tag webatbreact mrsamix/webatbreact:latest

sudo docker push mrsamix/webatbreact:latest