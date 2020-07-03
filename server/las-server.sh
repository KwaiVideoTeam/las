#!/usr/bin/env bash

# get the source code of SRS
git clone -b feature/las https://github.com/dean-river/srs.git srs
cd srs/trunk

# compile the source code
./configure --with-las && make

# start the service
./objs/srs -c conf/srs.conf
