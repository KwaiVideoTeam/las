![npm](https://img.shields.io/npm/l/@kwai-video-team/las.js?style=flat)


# las-mobile

las-mobile是一个支持LAS标准的Demuxer。las-mobile基于ff_live_flv_demuxer实现了Lavf API：
1) 用于打开representation的avformat_open_input()函数
2) 用于读取单个数据包的av_read_frame()
3) 以及最终进行清除的avformat_close_input()。

具体实现细节参考 [ijklas.c](https://github.com/bilibili/ijkplayer/blob/master/ijkmedia/ijkplayer/ijkavformat/ijklas.c)

## 最新改动
- [CHANGELOG.md](CHANGELOG.md)

## Demo

https://github.com/bilibili/ijkplayer/tree/master

## 运行LAS移动端

拉取源码并安装：

```
git clone https://github.com/Bilibili/ijkplayer.git ijkplayer
cd ijkplayer
```

安装并使用Android：

```
./init-android.sh

cd android/contrib
./compile-ffmpeg.sh clean
./compile-ffmpeg.sh all

cd ..
./compile-ijk.sh all

# 打开 Android Studio
# 点击 Open an existing Android Studio project
# 选择 android/ijkplayer/ and import
# Run 'ijkplayer-sample'

# 在手机端打开 ijkmediademo
# 导航栏中点击 "Sample"
# 点击 "las test"，开始播放
```

安装并使用iOS：

```
./init-ios.sh

cd ios
./compile-ffmpeg.sh clean
./compile-ffmpeg.sh all

# 打开 Xcode
# 依次点击 File、Open 打开 ios/IJKMediaDemo/IJKMediaDemo.xcodeproj

# 点击 Run
# 在手机端打开 ijkmediademo
# 点击 "Sample" 按钮
# 点击 "las url"，开始播放
```
