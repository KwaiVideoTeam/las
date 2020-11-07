#!/usr/bin/env bash

ffmpeg -re -stream_loop -1 -i in.flv \
        -vf scale=1280:720 -c:v libx264 -b:v 2000k -x264-params "no-scenecut=1:threads=8:keyint=90" -c:a copy -f flv -y rtmp://127.0.0.1/livestream/out0 \
        -vf scale=960:540  -c:v libx264 -b:v 1000k -x264-params "no-scenecut=1:threads=8:keyint=90" -c:a copy -f flv -y rtmp://127.0.0.1/livestream/out1 \
        -vf scale=640:360  -c:v libx264 -b:v  500k -x264-params "no-scenecut=1:threads=8:keyint=90" -c:a copy -f flv -y rtmp://127.0.0.1/livestream/out2
