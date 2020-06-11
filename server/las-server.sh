#!/usr/bin/env bash

# get the source code of SRS
git clone  https://gitee.com/winlinvip/srs.oschina.git  srs &&
cd srs/trunk && git remote set-url origin https://github.com/ossrs/srs.git && git pull

# compile the source code
./configure --with-las && make

# start the service
./objs/srs -c conf/srs.conf