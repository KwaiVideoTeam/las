#  (2021-04-26)


### Bug Fixes

* **config:** move enable ijk* to the back of disable all ([a89d810](https://github.com/bupt-steven/ijkplayer/commit/a89d81043e27ab3cfca4e73712cadf8d4121ac2a))
* **demuxer:** register ijk's custom demuxers ([d777758](https://github.com/bupt-steven/ijkplayer/commit/d77775826a7a8a9c6c5138af2958f607f29da7e2))
* **las:** change default resolution to the middle ([a6e5146](https://github.com/bupt-steven/ijkplayer/commit/a6e514686d607fcff9cb16d627d8013b34e771d0))
* **las:** skip switching when past buffer is empty ([82aed1a](https://github.com/bupt-steven/ijkplayer/commit/82aed1a598f3d0d1a34854426dc52d478415e58a))


### Features

* **las:** register ijklas demuxer & find through it's format_name ([13f03e8](https://github.com/bupt-steven/ijkplayer/commit/13f03e86cd4002ee958469300054422c4842ac21))
* **las_ios:** register ijklas_demuxer through url or format_name ([b9dd6f6](https://github.com/bupt-steven/ijkplayer/commit/b9dd6f642d8acfbd344d74869a9a9535e48b25bb))



#  (2020-12-08)

### Bug Fixes

* **las:** exits when error occurs ([10856b9](https://github.com/bupt-steven/ijkplayer/commit/10856b9bace531c3f83b5ace3477732f2ddf9414))


#  (2020-11-09)

### Features

* **las:** support media_codec when repeatSps is false ([0c021a4](https://github.com/bupt-steven/ijkplayer/commit/0c021a49e8411c26390fe05f7edff026fad9e454))

### Bug Fixes

* **init-ios:** fix the ffmpeg version in ios/android build scripts ([2692ed9](https://github.com/bupt-steven/ijkplayer/commit/2692ed95318e5379f5c4edb002f1d30260910487))


#  (2020-11-05)

### Features

* **las:** support video_tool_box by adding side data ([be38007](https://github.com/bupt-steven/ijkplayer/commit/be38007b411050f1d94b5e403d932692428feded))



#  (2020-10-23)


### Bug Fixes

* **ff_ffplay.c:** fix the destory function bugs ([af09548](https://github.com/bupt-steven/ijkplayer/commit/af09548b9e3e3ad67ae69ee8fecf6bece7452961))


### Features

* **ijklas:** add the ijklas demuxer into ijkplayer to support the multi-bitrate ([91a6280](https://github.com/bupt-steven/ijkplayer/commit/91a62800e39f0847a837006597da964acf47c999))
* **las:** copy web's algorithm to mobile ([bacab36](https://github.com/bupt-steven/ijkplayer/commit/bacab36c247bf3043168f80adf3ca80eec23c2cf))
#  (2020-12-08)


### Bug Fixes

* **ff_ffplay.c:** fix the destory function bugs ([af09548](https://github.com/bupt-steven/ijkplayer/commit/af09548b9e3e3ad67ae69ee8fecf6bece7452961))
* **init-ios:** fix the ffmpeg version in ios/android build scripts ([2692ed9](https://github.com/bupt-steven/ijkplayer/commit/2692ed95318e5379f5c4edb002f1d30260910487))
* **las:** exits when error occurs ([10856b9](https://github.com/bupt-steven/ijkplayer/commit/10856b9bace531c3f83b5ace3477732f2ddf9414))


### Features

* **ijklas:** add the ijklas demuxer into ijkplayer to support the multi-bitrate ([91a6280](https://github.com/bupt-steven/ijkplayer/commit/91a62800e39f0847a837006597da964acf47c999))
* **las:** copy web's algorithm to mobile ([bacab36](https://github.com/bupt-steven/ijkplayer/commit/bacab36c247bf3043168f80adf3ca80eec23c2cf))
* **las:** support media_codec when repeatSps is false ([0c021a4](https://github.com/bupt-steven/ijkplayer/commit/0c021a49e8411c26390fe05f7edff026fad9e454))
* **las:** support video_tool_box by adding side data ([be38007](https://github.com/bupt-steven/ijkplayer/commit/be38007b411050f1d94b5e403d932692428feded))


### Reverts

* Revert "ijksdl: libyuv hasn't support arm64-v8a yet." ([0f41875](https://github.com/bupt-steven/ijkplayer/commit/0f41875a784e870a9ef8604199c8293e465d75f9))
* Revert "VideoToolBox: fix dts&pts drop error  & return to videotoolbox sync mode" ([5ccd71d](https://github.com/bupt-steven/ijkplayer/commit/5ccd71dce0f98efce3d67db2b06fa788c6d49e52))
* Revert "VideoToolBox: AsyncDecode Mode" ([201029f](https://github.com/bupt-steven/ijkplayer/commit/201029fa31d352767c2688aeb55f06058cbade4e))
* Revert "android/build: should set minsdk=21 for arm64-v8a" ([3bdbba1](https://github.com/bupt-steven/ijkplayer/commit/3bdbba1e051c2746fa550e39c4d38e6c385df635))
* Revert "ijkavformat: Forward whitelists option to protocols" ([f545773](https://github.com/bupt-steven/ijkplayer/commit/f545773e90814b8cd8bc790bc1d3379b0df3b609))
* Revert "android: fix lint: Value overridden by Gradle build script" ([17032a5](https://github.com/bupt-steven/ijkplayer/commit/17032a55fa89ec0d0231d7fcd466dacd7137f400))



#  (2020-12-08)


### Bug Fixes

* **ff_ffplay.c:** fix the destory function bugs ([af09548](https://github.com/bupt-steven/ijkplayer/commit/af09548b9e3e3ad67ae69ee8fecf6bece7452961))
* **init-ios:** fix the ffmpeg version in ios/android build scripts ([2692ed9](https://github.com/bupt-steven/ijkplayer/commit/2692ed95318e5379f5c4edb002f1d30260910487))
* **las:** exits when error occurs ([10856b9](https://github.com/bupt-steven/ijkplayer/commit/10856b9bace531c3f83b5ace3477732f2ddf9414))


### Features

* **ijklas:** add the ijklas demuxer into ijkplayer to support the multi-bitrate ([91a6280](https://github.com/bupt-steven/ijkplayer/commit/91a62800e39f0847a837006597da964acf47c999))
* **las:** copy web's algorithm to mobile ([bacab36](https://github.com/bupt-steven/ijkplayer/commit/bacab36c247bf3043168f80adf3ca80eec23c2cf))
* **las:** support media_codec when repeatSps is false ([0c021a4](https://github.com/bupt-steven/ijkplayer/commit/0c021a49e8411c26390fe05f7edff026fad9e454))
* **las:** support video_tool_box by adding side data ([be38007](https://github.com/bupt-steven/ijkplayer/commit/be38007b411050f1d94b5e403d932692428feded))


### Reverts

* Revert "ijksdl: libyuv hasn't support arm64-v8a yet." ([0f41875](https://github.com/bupt-steven/ijkplayer/commit/0f41875a784e870a9ef8604199c8293e465d75f9))
* Revert "VideoToolBox: fix dts&pts drop error  & return to videotoolbox sync mode" ([5ccd71d](https://github.com/bupt-steven/ijkplayer/commit/5ccd71dce0f98efce3d67db2b06fa788c6d49e52))
* Revert "VideoToolBox: AsyncDecode Mode" ([201029f](https://github.com/bupt-steven/ijkplayer/commit/201029fa31d352767c2688aeb55f06058cbade4e))
* Revert "android/build: should set minsdk=21 for arm64-v8a" ([3bdbba1](https://github.com/bupt-steven/ijkplayer/commit/3bdbba1e051c2746fa550e39c4d38e6c385df635))
* Revert "ijkavformat: Forward whitelists option to protocols" ([f545773](https://github.com/bupt-steven/ijkplayer/commit/f545773e90814b8cd8bc790bc1d3379b0df3b609))
* Revert "android: fix lint: Value overridden by Gradle build script" ([17032a5](https://github.com/bupt-steven/ijkplayer/commit/17032a55fa89ec0d0231d7fcd466dacd7137f400))



