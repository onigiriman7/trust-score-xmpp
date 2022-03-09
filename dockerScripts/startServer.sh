# !/bin/bash

sudo docker stop $(docker ps -a -q)
sudo docker rm ejabberd
sudo docker run --name ejabberd -p 5222:5222 ejabberd/ecs 