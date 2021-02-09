#!/bin/bash
source /etc/os-release
if [ $ID_LIKE === 'debian' ];then
    echo 'Adding the nodeJs apt repository'
    curl -sL https://deb.nodesource.com/setup_15.x | sudo -E bash -
    echo 'Installing NodeJs on the system'
    sudo apt-get install -y nodejs
    echo 'Installing git'
    sudo apt install git
fi
echo 'Updating the git repository'
git fetch
git pull
echo 'ready now use the npm run start, if you are rooted just use npm run start-root '