[![npm](https://img.shields.io/npm/v/@kwai-video-team/las.js.svg?style=flat)](https://npmjs.org/package/@kwai-video-team/las.js)
[![](https://data.jsdelivr.com/v1/package/npm/@kwai-video-team/las.js/badge?style=rounded)](https://www.jsdelivr.com/package/npm/@kwai-video-team/las.js)


# las.js

las.js是一个JavaScript库，可实现flv直播多码率客户端。它依靠HTML5 video和[MediaSource](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaSource)扩展进行播放。

las.js是通过将flv传输流转换为fragmented mp4来工作的。支持使用web worker。

las.js直接在标准的[HTML &lt;video&gt;](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video)元素上运行。

## 快速入门

[快速入门](./docs/GettingStarted.md)


## API文档

[API文档及代码示例](./docs/API.md)

## Demo

https://kwaivideoteam.github.io/las.js/demo/index.html

```js
<script src="https://cdn.jsdelivr.net/npm/@kwai-video-team/las.js@latest"></script>
<video id="video"></video>
<script>
    var video = document.getElementById('video');
    if(Las.isSupported()) {
        var las = new Las();
        las.attachMedia(video);
        las.load('http://xxx');
        las.on(Las.Events.MANIFEST_PARSED,function() {
            video.play();
        });
    }
</script>
```

demo/index.html

## 视频控制

视频是通过HTML`<video>`元素控制的。

## 兼容性

las.js需要在支持MSE及fetch的浏览器上运行

浏览器版本要求如下：

- chrome >= 42
- firefox >= 42
- safari >= 10.1
- edge >=14

### Server-side-rendering (SSR)

可以安全地在Node中require此库

## CORS

flv资源必须允许GET请求，且包含[CORS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)响应头。

## 功能

- 基于http-flv直播多码率自适应
- 基于http-flv直播多码率平滑切换

## License

MIT
