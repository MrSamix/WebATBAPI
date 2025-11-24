sudo apt update

git clone https://github.com/MrSamix/WebATBAPI.git

cd WebApiATB

sudo docker build -t webatbapi .

sudo docker login

sudo docker tag webatbapi mrsamix/webatbapi:latest

sudo docker push mrsamix/webatbapi:latest