#!/bin/bash
#
if command -v node &>> /dev/null; then
    if [[ -d node_modules ]];then
        echo "We don't need to install anything"
    else
        echo "Installing Bds Manager dependencies"
        npm install --no-save
    fi
else
    if command -v curl &>> /dev/null;then
        curl https://deb.nodesource.com/setup_current.x |sudo bash -
    else
        sudo apt install curl -y
        curl https://deb.nodesource.com/setup_current.x |sudo bash -
        sudo apt install -y nodejs
    fi
fi
npm run start
