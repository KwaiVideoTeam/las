# API

- [API](#api)
    - [配置](#配置)
        - [webWorker](#webworker)
        - [credentials](#credentials)
        - [connectionTimeout](#connectiontimeout)
        - [transmissionTimeout](#transmissiontimeout)
        - [defaultLiveDelay](#defaultlivedelay)
        - [autoRecoverMedia](#autoRecoverMedia)
    - [版本控制API](#版本控制api)
        - [Las.version](#lasversion)
    - [加载控制API](#加载控制api)
        - [las.load()](#lasload)
        - [las.stopLoad()](#lasstopload)
    - [流切换控制API](#流切换控制api)
        - [las.levels](#laslevels)
        - [las.currentLevel](#lascurrentlevel)
        - [las.nextLevel](#lasnextlevel)
    - [事件](#事件)
        - [Las.Events.MANIFEST_PARSED](#laseventsmanifest_parsed)
        - [Las.Events.LEVEL_SWITCHING](#laseventslevel_switching)
        - [Las.Events.LEVEL_SWITCHED](#laseventslevel_switched)
        - [Las.Events.LEVEL_SWITCH_FAILED](#laseventslevel_switch_failed)
        - [Las.Events.ERROR](#laseventserror)
    - [错误](#错误)
        - [网络错误](#网络错误)
            - [Las.ErrorDetails.LOAD_ERROR](#laserrordetailsload_error)
            - [Las.ErrorDetails.LOAD_ERROR_TIMEOUT](#laserrordetailsload_error_timeout)
        - [HTMLMediaElement发生错误](#htmlmediaelement发生错误)
            - [Las.ErrorDetails.VIDEO_ERROR](#laserrordetailsvideo_error)
        - [转封装发生错误](#转封装发生错误)
            - [Las.ErrorDetails.PARSING_ERROR](#laserrordetailsparsing_error)
            - [Las.ErrorDetails.REMUX_ERROR](#laserrordetailsremux_error)
            - [Las.ErrorDetails.REMUX_ALLOC_ERROR](#laserrordetailsremux_alloc_error)
        - [MSE发生错误](#mse发生错误)
            - [Las.ErrorDetails.MEDIASOURCE_ERROR](#laserrordetailsmediasource_error)
            - [Las.ErrorDetails.ADDSOURCEBUFFER_ERROR](#laserrordetailsaddsourcebuffer_error)
            - [Las.ErrorDetails.SOURCEBUFFER_ERROR](#laserrordetailssourcebuffer_error)
            - [Las.ErrorDetails.ENDOFSTREAM_ERROR](#laserrordetailsendofstream_error)
            - [Las.ErrorDetails.APPENDBUFFER_ERROR](#laserrordetailsappendbuffer_error)
        - [其他错误](#其他错误)
            - [Las.ErrorDetails.UNSUPPORTED](#laserrordetailsunsupported)
            - [Las.ErrorDetails.CONFIG_ERROR](#laserrordetailsconfig_error)
            - [Las.ErrorDetails.MANIFEST_ERROR](#laserrordetailsmanifest_error)
    - [Object](#object)

## 配置

在Las实例化时可以传入配置参数

```js
var config = {
    webWorker: true;
    credentials: false;
    connectionTimeout: 10000;
    transmissionTimeout: 30000;
    defaultLiveDelay: -2000,
    debug: 'e',
};

var las = new Las(config);
```
### webWorker

(default: `true`)

  - 启用WebWorker（如果在浏览器上可用）以进行FLV解复用/ MP4重复用，以提高性能。

### credentials

(default: `false`)

  - 是否总是发送请求资源域在本地的 cookies、 HTTP Basic authentication 等验证信息。

### connectionTimeout

(default: 10000)

  - 网络连接超时，单位：毫秒。

### transmissionTimeout

(default: 30000)

  - 网络传输超时，单位：毫秒。
  
### defaultLiveDelay

(default: -2000)

  - 直播延迟，单位：毫秒

### autoRecoverMedia

(default: false)

 - 尝试自动恢复video错误

## 版本控制API

### Las.version

Static getter: 返回las版本号.

## 加载控制API

### las.load(manifest)

传入manifest内容

调用las.load(manifest)方法后，las.js会开始解析manifest，并在Las.Events.MANIFEST_PARSED事件后开始加载直播流

### las.stopLoad()

停止直播流的加载

## 流切换控制API

默认情况下，las.js根据下载速度和manifest中流的码率信息，自动控制流切换。也可以使用手动控制

### las.levels

get: 返回可用的流列表.


### las.currentLevel

get: 返回当前播放的流index
set: 立刻切换到一个新的流，发起新的flv请求，清空buffer，触发流切换事件

设置-1会启动自动模式，设置大于等于0的值会退出自动模式

### las.nextLevel

get: 返回下一个关键帧位置将要切换的流index
set: 等待收到下个关键帧时切换清晰度，已有buffer不会被清除，会触发流切换事件

设置-1会启动自动模式，设置大于等于0的值会退出自动模式

## 事件

las.js会触发一系列事件，这些事件可以如下注册和注销：

```js
function onManifestParsed(data) {}
// 注册事件
las.on(Las.Events.MANIFEST_PARSED, onManifestParsed);
// 注销事件
las.off((Las.Events.MANIFEST_PARSED, onManifestParsed);
// 注册一次响应事件
las.once((Las.Events.MANIFEST_PARSED, onManifestParsed);
// 注销所有事件
las.removeAllListeners();
```

### Las.Events.MANIFEST_PARSED

manifest解析成功事件

```js
data: {
	levels: [] // 可用流列表, 
	currentLevel: 1, // 当前流index
}
```

### Las.Events.LEVEL_SWITCHING

开始进行流切换
```js
data:{ 
    level: 1, // 开始切换的流index
}
```

### Las.Events.LEVEL_SWITCHED

流切换成功事件

```js
data: { 
	level: 1, // 开始切换的流index
}
```

### Las.Events.LEVEL_SWITCH_FAILED

流切换失败事件

### Las.Events.ERROR

las.js错误，无法继续播放
  
```js
data: {
    type: '', // Las.ErrorTypes
    details: 0, // Las.ErrorDetails
    fatal: true, // 是否致命错误
    info: {
        reason: '', // 错误原因描述
        url: '', // 当前加载流的url
        httpStatusCode: 0 // 如果网络错误时，返回httpStautsCode
    }
}
```

## 错误

以下是错误说明

### 网络错误

Las.ErrorTypes.NETWORK_ERROR

#### Las.ErrorDetails.LOAD_ERROR

流加载错误时触发

#### Las.ErrorDetails.LOAD_ERROR_TIMEOUT

流加载超时时触发

### HTMLMediaElement发生错误

Las.ErrorTypes.MEDIA_ERROR

#### Las.ErrorDetails.VIDEO_ERROR

绑定的HTMLMediaElement发生错误时触发

### 转封装发生错误

Las.ErrorTypes.MUX_ERROR

#### Las.ErrorDetails.PARSING_ERROR

Flv解封装过程中发生错误

#### Las.ErrorDetails.REMUX_ERROR

重新封装为fragmented MP4时发生错误

#### Las.ErrorDetails.REMUX_ALLOC_ERROR

重新封装为fragmented MP4的mdat时发生错误

### MSE发生错误

Las.ErrorTypes.MSE_ERROR

#### Las.ErrorDetails.MEDIASOURCE_ERROR

初始化MSE错误

#### Las.ErrorDetails.ADDSOURCEBUFFER_ERROR

MSE增加SourceBuffer失败

#### Las.ErrorDetails.SOURCEBUFFER_ERROR

MSE的SourceBuffer触发错误

#### Las.ErrorDetails.ENDOFSTREAM_ERROR

结束MSE时发生错误

#### Las.ErrorDetails.APPENDBUFFER_ERROR

向MSE的sourcebuffer中填充数据发生错误

### 其他错误

Las.ErrorTypes.OTHER_ERROR

#### Las.ErrorDetails.UNSUPPORTED

当前浏览器不支持

#### Las.ErrorDetails.CONFIG_ERROR

传入的配置文件错误

#### Las.ErrorDetails.MANIFEST_ERROR

传入的manifest不正确

#### Las.ErrorDetails.NO_VIDEO

找不到video，可能是未绑定HTMLVideoElement

## Object

Level对象代表一个给定的质量级别。它包含与manifest相关的质量级别信息，例如：

- bitrate
- url
- codec

```js
{
    url: '',
    bitrate: 1000,
    maxBitrate: 1200,
    avgBitrate: 1000,
    qualityType: 'HD',
    qualityLabel: '高清',
    id: 0,
    codec: 'mp4a.40.5,avc1.42000d',
};
```
