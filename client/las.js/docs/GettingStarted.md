- [快速入门](#快速入门)
    - [浏览器是否支持](#浏览器是否支持)
    - [实例化las.js加载视频](#实例化lasjs加载视频)
    - [通过video控制](#通过video控制)
    - [错误处理](#错误处理)
        - [错误恢复](#错误恢复)
    - [销毁](#销毁)
    - [使用npm](#使用npm)
        - [安装](#安装)

# 快速入门

## 浏览器是否支持

首先在页面内引入las.js

```html
<script src="https://cdn.jsdelivr.net/npm/@kwai-video-team/las.js@latest"></script>
```

调用静态方法：Las.isSupported()检查你的浏览器是否支持使用las.js

```html
<script src="https://cdn.jsdelivr.net/npm/@kwai-video-team/las.js@latest"></script>
<script>
    if (Las.isSupported()) {
        console.log("hello");
    }
</script>
```

## 实例化las.js加载视频

有以下几个步骤

- 新建一个`<video>`元素
- 实例化一个Las
- 绑定`<video>`元素
- 开始加载

```html
<script src="https://cdn.jsdelivr.net/npm/@kwai-video-team/las.js@latest"></script>

<video id="video"></video>
<script>
if (Las.isSupported()) {
    var video = document.getElementById('video');
    var las = new Las();
    // 绑定video
    las.attachMedia(video);    
    // 传入manifest object，开始加载视频
    las.load(manifest);
}
</script>
```
## 通过video控制

视频的播放控制是通过HTML `<video>` 元素进行。


```js
video.play();
```

## 错误处理

所有错误均通过事件Las.Events.ERROR发出

每个错误都包含以下信息

- 错误分类
  - Las.Errors.NETWORK_ERROR: 网络相关错误
  - Las.Errors.MEDIA_ERROR: HTMLMediaElement发生错误
  - Las.Errors.MUX_ERROR: 处理Flv时出现错误
  - Las.Errors.MSE_ERROR: 调用MSE时发生错误
  - Las.Errors.OTHER_ERROR: 其他错误
- 详细错误
  - 查看[详细错误](#错误)
- 是否致命错误
- 错误信息

处理错误事件示例：

```js
las.on(Las.Events.ERROR, function (data) {
    var errorType = data.type;
    var errorDetails = data.details;
    var errorFatal = data.fatal;
    var errorInfo = data.info
});
```

### 错误恢复

```js
las.load();
```
重新加载

## 销毁

```js
las.destroy()
```

释放被调用的资源，破坏las上下文

## 使用npm

### 安装

```js
npm i @kwai-video-team/las.js
```
