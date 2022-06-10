---
index: 2
icon: markdown
title: GIS
date: 2022-06-06
category:
  - GIS
tag:
  - GIS
---


关于GIS

<!-- more -->
# MAPBOX

## cgcs2000 Mapbox VUE使用

安装：npm i @cgcs2000/mapbox-gl

## MAPBOX源码编译、切片流程

> 准备：熟悉linux 安装、网络、文件等基本操作，JS、HTML等熟悉，Mapbox熟悉，SQL熟悉，，，
>
> 注意参数：同一套坐标、经纬度等

> Ubuntu环境准备===》其他格式数据===》shp数据===》Windows导入postgresql数据库===》通过ogr2ogr转换为geojson===》通过tippecanoe切片（参数自控）==》~~数据打包（传输更快）~~windows共享文件夹===》准备mapbox2000 js css文件====》mapbox前端代码导入数据并显示====》准备图标数据===》filter分类图标显示=====》分层数据显示====》细节优化（颜色，光，字体大小，图片大小）====》加入点击显示位置====》其他点击功能====》wfts底图切换==》控件加载===》wfs，wms数据加载（不同数据源）==》其他模型加入



### 详细步骤

### [环境准备](https://my.oschina.net/u/1464512/blog/1631972)

#### Ubuntu虚拟机：

网络环境，数据共享，Postgresql，Tippecanoe，PROJ.4、GEOS和GDAL（ogr2ogr），gcc、g++、make

### windows：

Postgresql,VMware,Ubuntu镜像（官方指定），Navicat（方便查看数据和建立空间数据库），VSCode

### 详细步骤：

1. #### [安装Postgresql数据库，环境配置，导入shp](https://blog.csdn.net/zhangshuanlai/article/details/84100165)

   #### Windows安装Postgresql

   [下载](https://www.postgresql.org/)

   环境变量添加

   设置外网访问（pg_hba.conf）

   ```elm
   # TYPE  DATABASE        USER            ADDRESS                 METHOD
   
   # IPv4 local connections:
   host    all             all             127.0.0.1/32            md5
   host    all             all             0.0.0.0/0            md5
   # IPv6 local connections:
   host    all             all             ::1/128                 md5
   # Allow replication connections from localhost, by a user with the
   # replication privilege.
   #host    replication     postgres        127.0.0.1/32            md5
   #host    replication     postgres        ::1/128                 md5
   ```

   

   建立空间数据库,目标数据库执行以下语句

   ```sql
   create extension postgis;
   create extension postgis_topology;
   create extension fuzzystrmatch;
   create extension postgis_tiger_geocoder;
   ```

   

   在SHP文件夹新建txt文件，粘贴以下代码，导入数据到数据库，相关参数如下，改成bat后缀，双击运行后输入密码，显示类似 insert 1成功

   ```sql
   shp2pgsql -s 4544 -c -W “GBK” DJQ5120812018.shp public.DJQ5120812018 | psql -d shp2pgsqldemo -U postgres -W
   示例  ：shp2pgsql -s 4544 -c -W "UTF-8" ADDRESS.shp  public.rrrrr| psql -h 192.168.22.128 -d postgres -U postgres -W
                                  编码格式  SHP数据    public下的rrrrr表        导入数据库地址     数据库名     用户名
   ```

   也可分为两个步骤，先转换为sql语句，再导入,步骤同上

   ```
   shp2pgsql -s 4544 -c -W “GBK” DJQ5120812018.shp>DJQ5120812018.sql
   psql -d shp2pgsqldemo -U postgres -f DJQ5120812018.sql -W
   ```

   #### 可能出现的问题                 解决办法

   乱码                                     更改编码

   导入中断，数据库无数据     数据过大

   

   #### 参数	               含义

   -s		空间参考标识符（SRID）
   -d    	重新建立表，并插入数据

   -a   	 在同一个表中增加数据

   -c 		建立新表，并插入数据(缺省)

   -p		只创建表

   -g		 指定要创建的表的空间字段名称(在追加数据时有用)
   -D 		使用dump方式，比缺省生成sql的速度快
   -G 		使用类型geography
   -k		 保持标识符（列名，模式，属性）大小写。
   -i		 将所有整型都转为标准的32-bit整数
   -I 		在几何列上建立GIST索引
   -S		生成简单几何，而非MULTI几何
   -t		  指定几何的维度
   -w		指定输出格式为WKT
   -W		输入的dbf文件编码方式
   -N		指定几何为空时的操作
   -n		只导入dbf文件
   -T		指定表的表空间
   -X		指定索引的表空间
   -?		帮助

   

2. #### 通过ogr2ogr转换为geojson

   ```sql
   ogr2ogr -f "GeoJSON" ./asstln.json PG:"host=localhost dbname=postgres user=postgres password=111111" -sql "select * from asstln"
                          目标文件名          导出数据库连接信息                                                            导出表名
   ```

   

3. #### 通过tippecanoe切片（参数自控）

   **单数据源**

   ```sql
   tippecanoe -e tracenln -pC -Z0 -z20 -f tracenln.json
                 目标文件夹     切片等级空值   源文件名
   ```

   **单层多数据源合并**

   ```sql
   #where确定级别
   ogr2ogr -f "GeoJSON" ./veg_py.json PG:"host=126.10.9.16 dbname=postgres user=postgres password=724111" -sql "select * from veg_py fscale=10" 
   tippecanoe -e tracenln -pC -Z0 -z20 -f tracenln1.json tracenln2.json tracenln3.json
   ```

   

   [参数查看](https://www.yuque.com/geoway-vision/vision/tippecanoe)

4. #### ~~数据打包~~ ~~复制到编程端（传输更快）~~   windows文件共享文件夹，或Tomcat，或在线服务器以便数据调用，注意解决触跨域资源访问

   ![image-20210325142648372](http://qnimg.gisfsde.com/image-20210325142648372.png)

5. #### 准备mapbox2000 js css文件

   [windows 安装 git](https://blog.csdn.net/donglaoxie/article/details/104453761)
   [Node.JS 安装说明](https://blog.csdn.net/donglaoxie/article/details/104513190)
   [Yarn安装、配置、镜像源修改](https://blog.csdn.net/donglaoxie/article/details/104520798)

   ```
   npm install --global yarn
   yarn --version
   ```

   [Node.js安装本地插件构建工具node-gyp](https://blog.csdn.net/donglaoxie/article/details/104532608)
   GitHub Mapbox源码地址：https://github.com/mapbox/mapbox-gl-js     [2000坐标源码](https://github.com/cgcs2000/tippecanoe)，

   

   #### 项目编译

   1. yarn install

   2. 安装headless-gl，并将node_modules/headless-gl/deps/windows/dll/x64/*.dll 复制到c:\windows\system32
      npm install gl 
      yarn run start-debug 
      yarn run build-dev

      准备好js和css文件

6. #### mapbox 前端代码导入地图数据并显示

7. #### 3D模型

   针对对应的建筑数据，进行建筑物3D显示

   ```js
   	paint: {
   							// 'fill-color': 'red',
   							// 'fill-opacity': 1,
   							'fill-extrusion-color': '#f5f4ee',
   							// use an 'interpolate' expression to add a smooth transition effect to the
   							// buildings as the user zooms in
   							'fill-extrusion-height': [
   								"interpolate", ["linear"], ["zoom"],
   								15, 0,
   								15.05, ["get", "height"]
   							],
   							'fill-extrusion-base': [
   								"interpolate", ["linear"], ["zoom"],
   								15, 0,
   								15.05, ["get", "min_height"]
   							],
   							'fill-extrusion-opacity': 0.85
   						},
   ```

   

8. #### vscode 插件服务器

   插件安装 Live Server

9. #### 准备图标数据，PBF字体数据

   https://github.com/mapbox/spritezero

   从零生成图标资源工具，可网上下载

   生成如图形式文件，![图表数据](http://qnimg.gisfsde.com/image-20210322153503623.png)![字体数据](http://qnimg.gisfsde.com/image-20210322153604432.png)

   

10. #### filter 分类图标显示

    ```js
    'filter': [
    							'any',
    							[
    								'==',
    								'fcode',
    								'4206002500'//2
    
    							]
    							,[
    								'==',
    								'fcode',
    								'4305010500'//2
    
    							]
    						],
    ```

    

11. #### 分层数据显示

    ```
    "layers": []//中越靠前的在底层
    ```

    

12. #### 细节优化（颜色，光，字体大小，图片大小）

    

13. #### 控件加载

    ![image-20210322154135351](http://qnimg.gisfsde.com/image-20210322154135351.png)

    [Supermap查看](https://iclient.supermap.io/examples/mapboxgl/examples.html#iServer-map)

14. #### 加入点击显示相关信息

    ```js
    //弹出框
    
    ​    map.on('click', function (e) {
    ​      var features = map.queryRenderedFeatures(e.point, {
    ​        layers: ['13'] // replace this with the id of the layer
    ​      });
    ​      if (!features.length) {
    ​        return;
    ​      }
    ​      var feature = features[0];
    ​      var popup = new mapboxgl.Popup({ offset: [0, -15] })
    ​        .setLngLat(feature.geometry.coordinates)
    ​        .setHTML('\<h3>' + feature.properties.shortname + '\</h3>\<p>' + feature.properties.name + '\</p>')
    ​        .addTo(map);
    ​    });
    ```

    

15. #### wfts 底图切换

16. #### wfs，wms 数据加载（不同数据源）

17. #### 定位

18. #### 数据查询

19. #### 数据可视化

    ![image-20210322154411490](http://qnimg.gisfsde.com/image-20210322154411490.png)

    [Supermap查看](https://iclient.supermap.io/examples/mapboxgl/examples.html#iServer-map)

20. #### 优化

    窗口样式优化，弹出框样式优化，字体等调节

### 一些小技巧

待更新

### Mapbox源码编译

### 环境准备
**GIT环境搭建：**
详细点击：[（一）windows 安装 git](https://blog.csdn.net/donglaoxie/article/details/104453761)
**Node.JS环境搭建：**
详细点击：[（一）Node.JS 安装说明](https://blog.csdn.net/donglaoxie/article/details/104513190)
**Yarn环境搭建：**
详细点击：[（一）Yarn安装、配置、镜像源修改](https://blog.csdn.net/donglaoxie/article/details/104520798)

```
npm install --global yarn
yarn --version
```

**Npm and node-gyp依赖安装**
详细点击：[（二）Node.js安装本地插件构建工具node-gyp](https://blog.csdn.net/donglaoxie/article/details/104532608)
**其他地址：**
GitHub Mapbox源码地址：https://github.com/mapbox/mapbox-gl-js

### 项目编译

1. yarn install

2. 安装headless-gl，并将node_modules/headless-gl/deps/windows/dll/x64/*.dll 复制到c:\windows\system32
   npm install gl 
   yarn run start-debug 
   yarn run build-dev

3. debug/index.html中代码最上方增加token

   \<script>
   mapboxgl.accessToken='pk.eyJ1IjoibGltbiIsImEiOiJja2t1bG1na2IxZGU0MnZvNmlzY3FhZXM4In0.oQx4VguycOR4TK80Pyusmw';
   var map = window.map = new mapboxgl.Map({

### MAPBOX专业术语

矢量瓦片：

栅格瓦片：

### MAPBOX学习

中文文档：http://www.mapbox.cn/mapbox-gl-js/api/

### Styles (8)

为地图添加生成的图标
为地图添加动画图标
为地图生成及添加缺失的图标
为地图添加图标
使用自定义样式展示地图
显示卫星地图
改变一个地图的样式
显示一个地图

### Layers (30)

用3D形式呈现建筑物
拉伸多边形以绘制3D室内地图
添加3D模型
调整图层不透明度
为线添加动画效果
为一系列图像添加动画效果
为点添加动画效果
按照缩放级别改变建筑颜色
更改标注的大小写
显示具有自定义属性的HTML聚类
创建样式聚类
使用按钮更改图层颜色
添加自定义样式图层
给线添加数据驱动属性的样式。
给圆添加数据驱动属性的样式
显示多种文本格式并设置其样式
为多边形添加图案
在标签下添加新图层
添加 GeoJSON 线
绘制 GeoJSON 点
添加 GeoJSON 多边形
创建热力图图层
添加晕暄
使用表达式创建渐变色线条
设置海洋深度数据样式
显示和隐藏图层
改变行政边界世界观
根据缩放级别更新等值线图层
变量标签位置
可视化人口密度

### Sources (9)

将本地JSON数据与矢量切片图形连接
添加影像
添加实时数据
更新实时要素
添加栅格切片数据源
添加一个第三方矢量切片来源
添加一个矢量图片数据源
添加一个视频
添加一个 WMS 源

### User interaction (17)

基于周边声音给3D建筑添加动画效果
禁用地图旋转
创建可拖动的点
创建可拖动的标记（Marker）
通过文本输入筛选符号
在 map view 中筛选要素
通过切换列表筛选符号
创建悬停效果
显示非交互式地图
更改地图的语言
高亮包含相似数据的部分
从点击点周围选择特征
限制地图平移在某一区域
获取鼠标下点的特征
切换交互
创建时间滑动条
高亮一个选择框范围内的特征

### Camera (11)

使地图相机环绕一点运动
为路线中的点添加动画效果
将地图居中于被单击的符号上
缓慢飞至某个位置
将地图缩放至边界框内
飞至某一位置
使用游戏式控件浏览地图
跳至一系列地点
以幻灯片形式播放地图位置。
根据滚动位置飞到某处
设置 pitch 和 bearing

### Controls and overlays (16)

为标记(marker)添加动画效果
改变注释的默认位置
使用 Markers 添加自定义图标
禁用滚轮缩放
全屏查看地图
定位用户
在不同地图之间滑动
显示驾驶方向
显示已绘制的多边形区域
添加地理编码器
利用地点名称添加标记
点击时显示多边形信息
悬浮时显示弹出窗
点击时显示一个弹出窗
显示一个弹出窗
将弹出窗口附加到 marker 实例

### Geocoder (8)

从其他数据源中补充进一步的地理编码查询结果
接收输入坐标至地理编码器
使用地理编码器时采用自定义渲染功能
将地理编码的结果限制在指定地区范围内
在使用地理编码器的过程中结合使用自定义相机动画
在地图上添加位置搜索框
将地理编码器进行指定语言的本地化
在Geocoder产生结果后设置一个点

### Browser support (1)

检查浏览器支持

### Internationalization support (2)

使用本地生成的表意文字
为从右至左书写的脚本提供支持

# [SUPERMAP](https://iclient.supermap.io/examples/mapboxgl/examples.html#iServer-map)

一个mapbox华丽外衣与装备

# Cusium

> 3D、2.5D、2D地图展示

## 源码解析准备

[官网](https://cesium.com/learn/)

[中文文档](http://cesium.xin/cesium/cn/Documentation1.72/index.html)

[注册](https://cesium.com/ion/?t=welcome)

源码：[下载](https://cesium.com/learn/cesiumjs-learn/)

环境：node、npm

使用：VUE

运行：方法一：

1. 解压
2. 打开命令行，进入当前目录
3. 安装依赖，输入:cnpm install,等待安装完成，然后输入: node server.js

```js
$ cd ./Cesium-1.40
$ cnpm install  ...  Installed 37 packages  Linked 569 latest versions
$ npm start 或者 node server.js(新版本是 node server.cjs)
Cesium development server running locally.  Connect to http://localhost:8080/复制
```

方法二：﻿

```js
这里如果使用 express发布遇到问题，可以使用 http-server
$ npm install http-server -g
$ http-server -c-1 (如果只输入http-server，更新代码后，页面不会同步更新)
```

方法三：VSCode 插件运行

## 获取Token

![image-20220113093336025](http://qnimg.gisfsde.com/work/image-20220113093336025.png)

使用

```js
    Cesium.Ion.defaultAccessToken = 'token';
    var viewer = new Cesium.Viewer("cesiumContainer", {})
```



## 主页说明

---

---



### Cesium ion

Cesium ion is your hub for discovering 3D content and tiling your own data for streaming. CesiumJS and ion work together to enable you to build world class 3D mapping applications.

[Sign up for a free account](https://cesium.com/ion/signup/) to get your access token required for using ion's Bing Maps global imagery and Cesium World Terrain assets.

### Local links

| [Documentation](http://126.10.1.204:8081/Build/Documentation/index.html) | The complete API documentation and reference.                |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [Hello World](http://126.10.1.204:8081/Apps/HelloWorld.html) | The simplest possible Cesium application.                    |
| [Cesium Viewer](http://126.10.1.204:8081/Apps/CesiumViewer/index.html) | A sample Cesium reference application which allows you to browse the globe and select from a variety of imagery and terrain layers as well as load CZML, GeoJSON, and other formats supported by Cesium. |
| [Sandcastle](http://126.10.1.204:8081/Apps/Sandcastle/index.html) | Cesium's live code editor and example gallery. Browse examples highlighting features of the Cesium API and edit and run them all in your web browser. Cesium applications created in Sandcastle can be saved and downloaded. |
| [Run tests](http://126.10.1.204:8081/Specs/SpecRunner.html)  | Run Cesium's full suite of unit tests                        |

### External links

| [Cesium](https://cesium.com/)                                | Learn about the Cesium team and the Cesium ion platform      |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [Cesium Blog](https://cesium.com/blog/)                      | Follow project news, developer tips, and posts about Cesium's innovative technology |
| [Tutorials](https://cesium.com/learn/)                       | Step-by-step guides for learning to use CesiumJS             |
| [Community Forum](https://community.cesium.com/)             | Questions and feedback welcome from all skill levels         |
| [GitHub](https://github.com/CesiumGS/cesium)                 | The official CesiumJS GitHub repository                      |
| [User Stories](https://cesium.com/blog/categories/user-stories/) | Demos and information about projects using CesiumJS          |
| [WebGL Report](http://webglreport.com/)                      | Provides technical information about WebGL capabilities supported by your browser |

---

---

## 界面介绍

![](http://qnimg.gisfsde.com/work/image-20220111165928042.png)

## 自项目编写

环境：VUE2 ，cesium  1.89

C:\Users\Administrator>node -v
v14.16.0

C:\Users\Administrator>npm -v
6.14.11

### 项目创建

```
vue init webpack gislearn
```

### 安装cesium  1.89

```
npm i cesium
```

### 修改webpack.prod.conf.js

修改 --Cesium--标记处

```javascript
'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// 定义路径--Cesium--
const cesiumSource = 'node_modules/cesium/Source'
const cesiumWorkers = '../Build/Cesium/Workers'

const env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : require('../config/prod.env')

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // 添加如下插件--Cesium--
    new CopyWebpackPlugin([{ from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' }]),
    new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Assets'), to: 'Assets' }]),
    new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' }]),
    new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'ThirdParty/Workers'), to: 'ThirdParty/Workers' }]),
    new webpack.DefinePlugin({
      // 注意这里和dev的配置不同
      // 定义Cesium从哪里加载资源，如果使用默认的''，却变成了绝对路径了，所以这里使用'./'，使用相对路径
      CESIUM_BASE_URL: JSON.stringify('./')
    }),
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`, 
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true,
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),

    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig

```

### webpack.dev.conf.js

```javascript
'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
// 定义路径：--Cesium--
const cesiumSource = 'node_modules/cesium/Source'
const cesiumWorkers = '../Build/Cesium/Workers'

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    // 添加如下插件--Cesium--
    new CopyWebpackPlugin([{ from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' }]),
    new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Assets'), to: 'Assets' }]),
    new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' }]),
    new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'ThirdParty/Workers'), to: 'ThirdParty/Workers' }]),
    new webpack.DefinePlugin({
      // Define relative base path in cesium for loading assets
      CESIUM_BASE_URL: JSON.stringify('')
    }),


    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
          ? utils.createNotifierCallback()
          : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})

```

### webpack.base.conf.js

```javascript
'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
//定义 Cesium 源码路径  --Cesium--
const cesiumSource = '../node_modules/cesium/Source'
const cesiumWorkers = path.join(cesiumSource, 'Workers');
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  // output: {
  //   path: config.build.assetsRoot,
  //   filename: '[name].js',
  //   publicPath: process.env.NODE_ENV === 'production'
  //     ? config.build.assetsPublicPath
  //     : config.dev.assetsPublicPath
  // },

  // 让webpack正确处理多行字符串，在output中添加sourcePrefix:' '--Cesium--
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath,
    sourcePrefix: ' ' //让webpack正确处理多行字符串
  },
  // resolve: {
  //   extensions: ['.js', '.vue', '.json'],
  //   alias: {
  //     'vue$': 'vue/dist/vue.esm.js',
  //     '@': resolve('src'),
  //   }
  // },

  // 需要在resolve中设置cesium别名，这样在引入的时候就可以根据别名找到Cesium的包。--Cesium--
  // （注：也可以不设置别名，导包是直接导入'cesium/Source/Cesium.js'就行。其实设置别名的目的就是让“别名”指向/ node_modules / cesium / Source目录）
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      cesium: path.resolve(__dirname, cesiumSource) //设置cesium别名
    }
  },
  module: {
    // 解决报错 1.87版本无效，只能暂时退版本--Cesium--
    // npm install @open-wc/webpack-import-meta-loader --save-dev
    //  error  in ./node_modules/cesium/Source/ThirdParty/zip.js
    // Module parse failed: Unexpected token(6400:57)
    // You may need an appropriate loader to handle this file type.
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: '@open-wc/webpack-import-meta-loader',
        },
      },
      // 创建工程师会选择 ESLint 代码校验
      //  Use ESLint to lint your code? Yes
      // ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ],
    unknownContextCritical: false,//阻止依赖警告--Cesium--
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}

```

### 创建地图组件 src\view\earth.vue

```html
\<template>
  \<div class="container">
    \<div id="cesiumContainer">\</div>
    \<div id="credit">\</div>
  \</div>
\</template>
 
\<script>
// 这里不能使用 import Cesium from 'cesium/Cesium' 导入模块，因为Cesium 1.63 版本以后使用的是ES6。应该使用一下方式
// import { Viewer } from "cesium/Cesium";
import * as Cesium from "cesium/Cesium"; //正确
import "cesium/Widgets/widgets.css";
export default {
  name: "earth",
  data() {
    return {};
  },
  mounted() {
    // let viewer = new Viewer("cesiumContainer");
    // 1. Geocoder : 查找位置工具，查找到之后会将镜头对准找到的地址，默认使用bing地图
    // 2. Home Button :视角返回初始位置.
    // 3. Scene Mode Picker : 选择视角的模式，有三种：3D，2D，哥伦布视图(CV)
    // 4. Base Layer Picker : 图层选择器，选择要显示的地图服务和地形服务.
    // 5. Navigation Help Button :导航帮助按钮，显示默认的地图控制帮助.
    // 6. Animation : 动画器件，控制视图动画的播放速度.
    // 7. Timeline :时间线,指示当前时间，并允许用户跳到特定的时间.
    // 8. Credits Display :版权显示，显示数据归属，必选
    // 9. Fullscreen Button :全屏按钮.
    Cesium.Ion.defaultAccessToken ="自己的token";
    var viewer = new Cesium.Viewer("cesiumContainer", {
      // geocoder: false,
      // homeButton: false,
      // sceneModePicker: false,
      // baseLayerPicker: false,
      // navigationHelpButton: false,
      // animation: false,
      creditContainer: "credit",
      // timeline: false,
      // fullscreenButton: false,
      // vrButton: false,
      // skyBox : new Cesium.SkyBox({
      //     sources : {
      //     positiveX : 'stars/TychoSkymapII.t3_08192x04096_80_px.jpg',
      //     negativeX : 'stars/TychoSkymapII.t3_08192x04096_80_mx.jpg',
      //     positiveY : 'stars/TychoSkymapII.t3_08192x04096_80_py.jpg',
      //     negativeY : 'stars/TychoSkymapII.t3_08192x04096_80_my.jpg',
      //     positiveZ : 'stars/TychoSkymapII.t3_08192x04096_80_pz.jpg',
      //     negativeZ : 'stars/TychoSkymapII.t3_08192x04096_80_mz.jpg'
      //     }
      // })
    });
    // 显示帧速(FPS)
    viewer.scene.debugShowFramesPerSecond = true;
    // 绘制形状
    // 方式一：
    var redBox = viewer.entities.add({
      name: "Red box with black outline",
      position: Cesium.Cartesian3.fromDegrees(-107.0, 40.0, 300000.0),
      box: {
        dimensions: new Cesium.Cartesian3(400000.0, 300000.0, 500000.0),
        material: Cesium.Color.BLUE.withAlpha(0.5),
        outline: true,
        outlineColor: Cesium.Color.BLACK,
      },
    });

    viewer.zoomTo(viewer.entities);

    // 方式二：
    var czml = [
      {
        id: "document",
        name: "box",
        version: "1.0",
      },
      {
        id: "shape2",
        name: "Red box with black outline",
        position: {
          cartographicDegrees: [-107.0, 50.0, 300000.0],
        },
        box: {
          dimensions: {
            cartesian: [400000.0, 300000.0, 500000.0],
          },
          material: {
            solidColor: {
              color: {
                rgba: [255, 0, 0, 128],
              },
            },
          },
          outline: true,
          outlineColor: {
            rgba: [0, 0, 0, 255],
          },
        },
      },
    ];
    // 重复创建Viewer会添加多个窗口
    // var viewer = new Cesium.Viewer("cesiumContainer");
    var dataSourcePromise = Cesium.CzmlDataSource.load(czml);
    viewer.dataSources.add(dataSourcePromise);
    viewer.zoomTo(dataSourcePromise);
  },
};
\</script>
 
\<style scoped>
.container {
  width: 100%;
  height: 100%;
}
#cesiumContainer {
  width: 100%;
  height: 100%;
}

/* 不占据空间，无法点击，右上角按钮组，左下角动画控件 ，时间线，logo信息*/
/* .cesium-viewer-toolbar,
.cesium-viewer-animationContainer,
.cesium-viewer-timelineContainer,
.cesium-viewer-bottom {
  display: none;
} */
/* 全屏按钮 */
/* .cesium-viewer-fullscreenContainer  {
  position: absolute;
  top: -999em;
} */

/* 注：全屏按钮不能通过display:none的方式来达到隐藏的目的，这是因为生成的按钮控件的行内样式设置了display属性，会覆盖引入的css属性

\<div class="cesium-viewer-fullscreenContainer" style="display: block;">...\</div> */
\</style>
```

### 添加路由  src\router\index.js

```
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import earth from '@/view/earth'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/earth',
      name: 'earth',
      component: earth
    }
  ]
})

```

### 运行报错1

error in ./node_modules/cesium/Source/ThirdParty/zip.js

#### 解决

```
npm i @open-wc/webpack-import-meta-loader -S
```

#### vue.config.js 或 webpack.base.conf.js配置

```js
module.exports = {
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: {
                        loader: '@open-wc/webpack-import-meta-loader',
                    },
                },
            ],
        },
    },
}

```

### 运行报错2

 error  in (webpack)/hot/dev-server.js
Module build failed: TypeError: Cannot read property 'length' of undefined
    at Object.module.exports (F:\demo\cesiumtest-master\node_modules\@open-wc\webpack-import-meta-loader\webpack-import-meta-loader.js:20:63)

#### 解决

点击报错跳转到对应文件行，将其注释即可

```js
module.exports = function (source) {
  const path = require('path');

  const relativePath = this.context.substring(
    // this.context.indexOf(this.rootContext) + this.rootContext.length + 1,
    this.resource.lastIndexOf(path.sep) + 1,
  );
```

### 运行

npm run dev

http://localhost:8081/#/earth

![](http://qnimg.gisfsde.com/work/image-20220111165928042.png)

npm run build  打包成功

### 部署dist

http://xx.xx.xx.11:8084/#/earth 成功

## 功能开发

### 控件显示控制

1. Geocoder : 查找位置工具，查找到之后会将镜头对准找到的地址，默认使用bing地图
2. Home Button :视角返回初始位置.
3. Scene Mode Picker : 选择视角的模式，有三种：3D，2D，哥伦布视图(CV)
4. Base Layer Picker : 图层选择器，选择要显示的地图服务和地形服务.
5. Navigation Help Button :导航帮助按钮，显示默认的地图控制帮助.
6. Animation : 动画器件，控制视图动画的播放速度.
7. Timeline :时间线,指示当前时间，并允许用户跳到特定的时间.
8. Credits Display :版权显示，显示数据归属，必选
9. Fullscreen Button :全屏按钮.

#### js方式

[官方文档](https://cesium.com/learn/cesiumjs/ref-doc/Viewer.html?classFilter=viewer)

```javascript
    var viewer = new Viewer("cesiumContainer", {
      geocoder: false,
      homeButton: false,
      sceneModePicker: false,
      baseLayerPicker: false,
      navigationHelpButton: false,
      animation: false,
      // creditContainer: "credit",
      timeline: false,
      fullscreenButton: false,
      vrButton: false,
      // skyBox : new Cesium.SkyBox({
      //     sources : {
      //     positiveX : 'stars/TychoSkymapII.t3_08192x04096_80_px.jpg',
      //     negativeX : 'stars/TychoSkymapII.t3_08192x04096_80_mx.jpg',
      //     positiveY : 'stars/TychoSkymapII.t3_08192x04096_80_py.jpg',
      //     negativeY : 'stars/TychoSkymapII.t3_08192x04096_80_my.jpg',
      //     positiveZ : 'stars/TychoSkymapII.t3_08192x04096_80_pz.jpg',
      //     negativeZ : 'stars/TychoSkymapII.t3_08192x04096_80_mz.jpg'
      //     }
      // })
    });
    // 显示帧速(FPS)
    viewer.scene.debugShowFramesPerSecond = true;
```



#### css方式

```css
      /* 不占据空间，无法点击 */
      .cesium-viewer-toolbar,             /* 右上角按钮组 */
      .cesium-viewer-animationContainer,  /* 左下角动画控件 */
      .cesium-viewer-timelineContainer,   /* 时间线 */
      .cesium-viewer-bottom               /* logo信息 */
      {
        display: none;
      }
      .cesium-viewer-fullscreenContainer  /* 全屏按钮 */
      { position: absolute; top: -999em;  }
```

### 创建形状

![image-20220112173200428](http://qnimg.gisfsde.com/work/image-20220112173200428.png)

```js
// 绘制形状  正方体
    // 方式一：Entity
//其他形状：http://cesium.xin/cesium/Documentation/Entity.html?classFilter=entity
    var redBox = viewer.entities.add({
      name: "Red box with black outline",
      position: Cesium.Cartesian3.fromDegrees(-107.0, 40.0, 300000.0),
      box: {
        dimensions: new Cesium.Cartesian3(400000.0, 300000.0, 500000.0),
        material: Cesium.Color.BLUE.withAlpha(0.5),
        outline: true,
        outlineColor: Cesium.Color.BLACK,
      },
    });

    viewer.zoomTo(viewer.entities);

    // 方式二：CZML(可创建几何形状也可创建动画)
    var czml = [
      {
        id: "document",
        name: "box",
        version: "1.0",
      },
      {
        id: "shape2",
        name: "Red box with black outline",
        position: {
          cartographicDegrees: [-107.0, 50.0, 300000.0],
        },
        box: {
          dimensions: {
            cartesian: [400000.0, 300000.0, 500000.0],
          },
          material: {
            solidColor: {
              color: {
                rgba: [255, 0, 0, 128],
              },
            },
          },
          outline: true,
          outlineColor: {
            rgba: [0, 0, 0, 255],
          },
        },
      },
    ];
    // 重复创建Viewer会添加多个窗口
    // var viewer = new Cesium.Viewer("cesiumContainer");
    var dataSourcePromise = Cesium.CzmlDataSource.load(czml);
    viewer.dataSources.add(dataSourcePromise);
    viewer.zoomTo(dataSourcePromise);
```

### 添加不同类型数据

[概览](https://www.jianshu.com/p/98d4c0b2c618)

> [Web Map Service](http://www.opengeospatial.org/standards/wms) (WMS) - 一种OGC标准，从分布式地理数据库中通过地图的地理范围来请求切片。   Cesium使用 [WebMapServiceImageryProvider](https://cesiumjs.org/Cesium/Build/Documentation/WebMapServiceImageryProvider.html)去支持这种。
>
> [Tile Map Service](https://cesiumjs.org/Cesium/Build/Documentation/TileMapServiceImageryProvider.html) (TMS) - 一种访问地图切片的REST接口。  可以用[CesiumLab](http://www.cesiumlab.com)， [MapTiler](http://www.maptiler.org/)  或者 [GDAL2Tiles](http://www.klokan.cz/projects/gdal2tiles/) . Cesium中使用[TileMapServiceImageryProvider](https://cesiumjs.org/Cesium/Build/Documentation/TileMapServiceImageryProvider.html).
>
> [OpenGIS Web Map Tile Service](http://www.opengeospatial.org/standards/wmts) (WMTS) - 一种OGC标准，主要是为预渲染的地图切片形式. Cesium中使用 [WebMapTileServiceImageryProvider](https://cesiumjs.org/Cesium/Build/Documentation/WebMapTileServiceImageryProvider.html).
>
> [OpenStreetMap](http://wiki.openstreetmap.org/wiki/Main_Page) - 访问 OpenStreetMap 切片 或者 任意 [Slippy map tiles](http://wiki.openstreetmap.org/wiki/Slippy_map_tilenames).有很多方法 [发布这种服务 ](http://switch2osm.org/serving-tiles/).Cesium中使用[createOpenStreetMapImageryProvider](https://cesiumjs.org/Cesium/Build/Documentation/createOpenStreetMapImageryProvider.html).
>
> [Bing 地图](http://www.bing.com/maps/) - 使用[Bing 地图 REST 服务](http://msdn.microsoft.com/en-us/library/ff701713.aspx)访问切片. 在这里 https://www.bingmapsportal.com/创建Bing地图的key. Cesium中使用 [BingMapsImageryProvider](https://cesiumjs.org/Cesium/Build/Documentation/BingMapsImageryProvider.html).
>
> Esri ArcGIS MapServer - 使用 [ArcGIS Server REST API](http://resources.esri.com/help/9.3/arcgisserver/apis/rest/) 访问存储在ArcGIS Server上的切片。Cesium中使用[ArcGisMapServerImageryProvider](https://cesiumjs.org/Cesium/Build/Documentation/ArcGisMapServerImageryProvider.html).
>
> [Google Earth Enterprise](http://www.google.com/enterprise/mapsearth/products/earthenterprise.html) - 访问Google Earth 企业版服务器发布的影像切片。Cesium中 [GoogleEarthImageryProvider](https://cesiumjs.org/Cesium/Build/Documentation/GoogleEarthImageryProvider.html).
>
> [Mapbox](https://www.mapbox.com/) - 使用 [Mapbox API](https://www.mapbox.com/developers/api/)访问切片. 在这里新建用户，并且创建一个 [access token](https://www.mapbox.com/account/apps/). Cesium中使用 [MapboxImageryProvider](https://cesiumjs.org/Cesium/Build/Documentation/MapboxImageryProvider.html).
>
> 普通图片文件 - 使用一张普通图片创建影像图层. Cesium中使用 [SingleTileImageryProvider](https://cesiumjs.org/Cesium/Build/Documentation/SingleTileImageryProvider.html).
>
> 自定义切片机制 - 使用[UrlTemplateImageryProvider](https://cesiumjs.org/Cesium/Build/Documentation/UrlTemplateImageryProvider.html), 可以通过 URL 模板连接各种影像资源 。比如TMS服务的URL模板是： `//cesiumjs.org/tilesets/imagery/naturalearthii/{z}/{x}/{reverseY}.jpg`.
>
> [切片坐标](https://cesiumjs.org/Cesium/Build/Documentation/TileCoordinatesImageryProvider.html) -  用来显示全球是如何被切片的，支持多种切片规则，画出每个切片的地理边界，并且用文字标注每个切片的level，x，y坐标。
>
> [百度地图](https://www.cesiumlab.com) -  用来加载百度默认地图或者自定义样式地图，请联系我们。

#### 跨域问题解决

```js
module.exports = {

  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    //接口地址原本是/satellite/z={z}&x={x}&y={y} 但是为了匹配代理地址 调用时需在前面加一个 /satellite,  因此接口地址需要写成这样的即可生效 /satellite/satellite/z={z}&x={x}&y={y}
    proxyTable: {
      '/ArcGIS': {//代理的目的：只要是/satellite开头的路径都往localhost:3000进行转发  
        target: 'https://sampleserver1.arcgisonline.com', //后端接口地址 设置代理服务器地址 转发地址
        ws: true,//WebSocket协议
        changeOrigin: true, //表示是否改变原域名；这个一定要选择为true; 是否允许跨域[ 如果接口跨域 则要配置这个参数]
        secure: false, // 如果是https接口 需要配置这个参数
        pathRewrite: {// 把程序中的地址转换成“真实地址”+‘/satellite’后面的部分如‘/satellite/satellite/z={z}&x={x}&y={y}'，被转换成'http://localhost:3000/satellite/z={z}&x={x}&y={y}'
          '^/ArcGIS': ''//修改pathRewrite地址 将前缀'^satellite'转为'/satellite'
        }
      },
    },
```

#### 加载不同类型数据

```js
 // 加载不同类型数据 从上到下依次覆盖==============================================

    // 数据类型1： -----------------------------------Web Map Service (WMS) -------------------------------------
    // var provider = new Cesium.WebMapServiceImageryProvider({
    //   // url: "https://sampleserver1.arcgisonline.com/ArcGIS/services/Specialty/ESRI_StatesCitiesRivers_USA/MapServer/WMSServer",
    //   url: "ArcGIS/ArcGIS/services/Specialty/ESRI_StatesCitiesRivers_USA/MapServer/WMSServer",
    //   layers: "0",
    //   // proxy: new Cesium.DefaultProxy("/proxy/"),
    // });
    // viewer.imageryLayers.addImageryProvider(provider);

    // 数据类型2：-----------------------------------OpenGIS Web Map Tile Service (WMTS)-----------------------------------
    // var shadedRelief2 = new Cesium.WebMapTileServiceImageryProvider({
    //   url: "http://basemap.nationalmap.gov/arcgis/rest/services/USGSShadedReliefOnly/MapServer/WMTS/tile/1.0.0/USGSShadedReliefOnly/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg",
    //   layer: "USGSShadedReliefOnly",
    //   style: "default",
    //   format: "image/jpeg",
    //   tileMatrixSetID: "default028mm",
    //   maximumLevel: 19,
    //   credit: new Cesium.Credit("U. S. Geological Survey"),
    // });
    // viewer.imageryLayers.addImageryProvider(shadedRelief2);
    // url:"http://61.175.211.102/arcgis/rest/services/wzmap/map/MapServer/WMTS?service=WMTS&request=GetTile&layer=wzmap&style=default&tilematriX={TileMatrix}&tilerow={TileRow}&tilecoL={TileCol}"

    // 数据类型3： -----------------------------------Tile Map Service (TMS)-----------------------------------
    // var tms = new Cesium.TileMapServiceImageryProvider({
    //   url: "../images/cesium_maptiler/Cesium_Logo_Color",
    //   fileExtension: "png",
    //   maximumLevel: 4,
    //   rectangle: new Cesium.Rectangle(
    //     Cesium.Math.toRadians(-120.0),
    //     Cesium.Math.toRadians(20.0),
    //     Cesium.Math.toRadians(-60.0),
    //     Cesium.Math.toRadians(40.0)
    //   ),
    // });
    // viewer.imageryLayers.addImageryProvider(tms);

    // 数据类型4： -----------------------------------ArcGis-----------------------------------
    // var esri = new Cesium.ArcGisMapServerImageryProvider({
    //   url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
    // });
    // viewer.imageryLayers.addImageryProvider(esri);

    // 数据类型5：-----------------------------------Mapbox-----------------------------------
    var mapbox = new Cesium.MapboxImageryProvider({
      mapId: "mapbox.mapbox-streets-v8",
      accessToken:
        "pk.eyJ1IjoibGltbiIsImEiOiJja2t1bG1na2IxZGU0MnZvNmlzY3FhZXM4In0.oQx4VguycOR4TK80Pyusmw",
    });
    viewer.imageryLayers.addImageryProvider(mapbox);
```







# [Leaflet ](https://leafletjs.com/)

> ### an open-source JavaScript library for mobile-friendly interactive maps

Leaflet 是一个为建设移动设备友好的互动地图，而开发的现代的、开源的 JavaScript 库。虽然代码仅有 38 KB，但它具有开发人员开发在线地图的大部分功能。Leaflet设计坚持简便、高性能和可用性好的思想，在所有主要桌面和移动平台能高效运作，在现代浏览器上会利用HTML5和CSS3的优势，同时也支持旧的浏览器访问。支持插件扩展，有一个友好、易于使用的API文档和一个简单的、可读的源代码。详细见官方网站https://leafletjs.com/

## 3.3.1地图

### 3.3.1.1矢量电子地图

```html
\<html>
\<head>
  \<meta charset="UTF-8">
  \<title>添加电子地图\</title>
  <!--添加leaflet样式-->
  \<link rel="stylesheet" href="http://172.18.109.232:8082/leaflet/V1.3/leaflet/leaflet.css" />
  <!--添加leafletjs包-->
  \<script src="http://172.18.109.232:8082/leaflet/V1.3/leaflet/leaflet.js">\</script>
  <!--添加坐标库-->
  \<script src="http://172.18.109.232:8082/leaflet/V1.3/pro/proj4-compressed.js">\</script>
  \<script src="http://172.18.109.232:8082/leaflet/V1.3/pro/proj4leaflet.js">\</script>
  \<style>
    html {
      height: 100%
    }
    body {
      height: 100%;
      margin: 0;
      padding: 0;
    }
    .map {
      height: 100%
    }
  \</style>
\</head>
\<body>
  \<div id="mapid" class="map">\</div>
  \<script>
    var res = [
      0.00549933137239034, // Level 0
      0.00274966568619517, // Level 1
      0.00137483284309758, // Level 2
      0.000687416421548792, // Level 3
      0.000343708210774396, // Level 4
      0.000171854105387198,
      8.5927052693599E-05,
      4.29635263467995E-05,
      2.14817631733998E-05,
      1.07408815866999E-05,
      5.37044079334994E-06,
      2.68522039667497E-06,
      1.34261019833748E-06
    ];
    var crs = new L.Proj.CRS('EPSG:4490',
      '+proj=longlat +ellps=GRS80 +no_defs',
      {
        resolutions: res,
        origin: [118.122911693886, 31.2869311022836],    //切图原点
      }
    );
    var map = L.map('mapid', {
      crs: crs
    });
    var url = "http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/hzsyvector/Mapserver";
    var attrib = "&copy 杭州市规划资源局";
    var basemap = new L.TileLayer(url + "/tile/{z}/{y}/{x}", {
      tileSize: 256,
      attribution: attrib
    });
    map.addLayer(basemap);
    map.setView([30.25168, 120.16179], 4); //设置比例尺和中心点级别             	
  \</script>
\</body>
\</html>
```

   

### 3.3.1.2影像电子地图

```html
\<!DOCTYPE html>
\<html>
\<head>
  \<meta charset="UTF-8">
  \<title>添加影像地图\</title>
  \<link rel="stylesheet" href="http://172.18.109.232:8082/leaflet/V1.3/leaflet/leaflet.css" />
  \<script src="http://172.18.109.232:8082/leaflet/V1.3/leaflet/leaflet.js">\</script>
  \<script src="http://172.18.109.232:8082/leaflet/V1.3/pro/proj4-compressed.js">\</script>
  \<script src="http://172.18.109.232:8082/leaflet/V1.3/pro/proj4leaflet.js">\</script>
  \<style>
    html {
      height: 100%
    }
    body {
      height: 100%;
      margin: 0;
      padding: 0;
    }
    .map {
      height: 100%
    }
  \</style>
\</head>
\<body>
  \<div id="mapid" class="map">\</div>
  \<script>
    var res = [
      0.00549933137239034, // Level 0
      0.00274966568619517, // Level 1
      0.00137483284309758, // Level 2
      0.000687416421548792, // Level 3
      0.000343708210774396, // Level 4
      0.000171854105387198,
      8.5927052693599E-05,
      4.29635263467995E-05,
      2.14817631733998E-05,
      1.07408815866999E-05,
      5.37044079334994E-06,
      2.68522039667497E-06,
      1.34261019833748E-06
    ];
    var crs = new L.Proj.CRS('EPSG:4490',
      '+proj=longlat +ellps=GRS80 +no_defs',
      {
        resolutions: res,
        origin: [118.122911693886, 31.2869311022836],
      }
    );
    var map = L.map('mapid', {
      crs: crs
    });
    var url = "http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/hzsyraster/Mapserver";
    var attrib = "&copy 杭州市规划资源局";
    var basemap = new L.TileLayer(url + "/tile/{z}/{y}/{x}", {
      tileSize: 256,
      attribution: attrib
    });
    map.addLayer(basemap);
    map.setView([30, 120], 4); //设置比例尺和中心点级别
  \</script>
\</body>
\</html>
```

### 3.3.1.3手动加载/移除地图

## 3.3.2图层

### 3.3.2.1弹出信息框

点击地图弹出信息，示例代码bindPopup

```html
\<html>
\<head>
  \<meta charset="UTF-8">
  \<title>添加电子地图\</title>
  <!--添加leaflet样式-->
  \<link rel="stylesheet" href="http://172.18.109.232:8082/leaflet/V1.3/leaflet/leaflet.css" />
  <!--添加leafletjs包-->
  \<script src="http://172.18.109.232:8082/leaflet/V1.3/leaflet/leaflet.js">\</script>
  <!--添加坐标库-->
  \<script src="http://172.18.109.232:8082/leaflet/V1.3/pro/proj4-compressed.js">\</script>
  \<script src="http://172.18.109.232:8082/leaflet/V1.3/pro/proj4leaflet.js">\</script>
  \<style>
    html {
      height: 100%
    }
    body {
      height: 100%;
      margin: 0;
      padding: 0;
    }
    .map {
      height: 100%
    }
  \</style>
\</head>
\<body>
  \<div id="mapid" class="map">\</div>
  \<script>
    var res = [
      0.00549933137239034, // Level 0
      0.00274966568619517, // Level 1
      0.00137483284309758, // Level 2
      0.000687416421548792, // Level 3
      0.000343708210774396, // Level 4
      0.000171854105387198,
      8.5927052693599E-05,
      4.29635263467995E-05,
      2.14817631733998E-05,
      1.07408815866999E-05,
      5.37044079334994E-06,
      2.68522039667497E-06,
      1.34261019833748E-06
    ];
    var crs = new L.Proj.CRS('EPSG:4490',
      '+proj=longlat +ellps=GRS80 +no_defs',
      {
        resolutions: res,
        origin: [118.122911693886, 31.2869311022836],    //切图原点
      }
    );
    var map = L.map('mapid', {
      crs: crs
    });
    var url = "http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/hzsyvector/Mapserver";
    var attrib = "&copy 杭州市规划资源局";
    var basemap = new L.TileLayer(url + "/tile/{z}/{y}/{x}", {
      tileSize: 256,
      attribution: attrib
    });
    map.addLayer(basemap);
    map.setView([30.25168, 120.16179], 4); //设置比例尺和中心点级别					
    L.marker([30.25168, 120.16179]).addTo(map).bindPopup("\<b>Hello world!\</b>\<br />I am a popup.").openPopup();
  \</script>
\</body>
\</html>
```

 

#### 3.3.2.2矢量图层（wms）

加载WMS地图服务，支持filter筛选

```html
\<!DOCTYPE html>
\<html>
\<head>
  \<meta charset="UTF-8">
  \<title>调用WMS\</title>
  \<link rel="stylesheet" href="http://172.18.109.232:8082/leaflet/V1.3/leaflet/leaflet.css" />
  \<script src="http://172.18.109.232:8082/leaflet/V1.3/leaflet/leaflet.js">\</script>
  \<script src="http://172.18.109.232:8082/leaflet/V1.3/leaflet/Plugins/leaflet.wms.js">\</script>
  \<script src="http://172.18.109.232:8082/leaflet/V1.3/pro/proj4-compressed.js">\</script>
  \<script src="http://172.18.109.232:8082/leaflet/V1.3/pro/proj4leaflet.js">\</script>
  \<style>
    html {
      height: 100%
    }
    body {
      height: 100%;
      margin: 0;
      padding: 0;
    }
    .map {
      height: 100%
    }
  \</style>
\</head>
\<body>
  \<div id="mapid" class="map">\</div>
  \<script>
    var res = [
      0.00549933137239034, // Level 0
      0.00274966568619517, // Level 1
      0.00137483284309758, // Level 2
      0.000687416421548792, // Level 3
      0.000343708210774396, // Level 4
      0.000171854105387198,
      8.5927052693599E-05,
      4.29635263467995E-05,
      2.14817631733998E-05,
      1.07408815866999E-05,
      5.37044079334994E-06,
      2.68522039667497E-06,
      1.34261019833748E-06
    ];
    var crs = new L.Proj.CRS('EPSG:4490',
      '+proj=longlat +ellps=GRS80 +no_defs',
      {
        resolutions: res,
        origin: [118.122911693886, 31.2869311022836],
      }
    );
    var map = L.map('mapid', {
      crs: crs
    });
    var url = "http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/hzsyvector/Mapserver";
    var attrib = "&copy 杭州市规划资源局";
    var basemap = new L.TileLayer(url + "/tile/{z}/{y}/{x}", {
      tileSize: 256,
      attribution: attrib
    });
    map.addLayer(basemap);
    map.setView([30, 120], 4); //设置比例尺和中心点级别
    // L.WMS.source
    var wmsurl = L.WMS.overlay("http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/lsyt_dmdz_csbj0619/MapServer/wms",
      {
        "transparent": true,
        "srs": "EPSG:4490",
        "layers": "lsyt_dmdz_csbj0619",
        "format": "image/png",
        "CQL_FILTER": "quxian='余杭区'"
      });
    map.addLayer(wmsurl);
    map.on('click', function (e) {
      alert("You clicked the map at " + e.latlng);
    });              	
  \</script>
\</body>
\</html>
```

#### 3.3.2.3矢量图层（wfs）

```html
\<!DOCTYPE html>
\<html>
\<head>
  \<meta charset="UTF-8" />
  \<title>加载WFS电子地图\</title>
  \<link rel="stylesheet" href="http://172.18.109.232:8082/leaflet/V1.3/leaflet/leaflet.css" />
  \<script src="http://172.18.109.232:8082/leaflet/V1.3/leaflet/leaflet.js">\</script>
  \<script src="http://172.18.109.232:8082/leaflet/V1.3/leaflet/Plugins/leaflet-wfs.js">\</script>
  \<script src="http://172.18.109.232:8082/leaflet/V1.3/pro/proj4-compressed.js">\</script>
  \<script src="http://172.18.109.232:8082/leaflet/V1.3/pro/proj4leaflet.js">\</script>
  \<script src="http://172.18.109.232:8082/jquery/jquery.js">\</script>
  \<style>
    html {
      height: 100%;
    }
    body {
      height: 100%;
      margin: 0;
      padding: 0;
    }
    .map {
      height: 100%;
    }
  \</style>
\</head>
\<body>
  \<div id="mapid" class="map">\</div>
  \<script>
    var res = [
      0.00549933137239034, // Level 0
      0.00274966568619517, // Level 1
      0.00137483284309758, // Level 2
      0.000687416421548792, // Level 3
      0.000343708210774396, // Level 4
      0.000171854105387198,
      8.5927052693599e-5,
      4.29635263467995e-5,
      2.14817631733998e-5,
      1.07408815866999e-5,
      5.37044079334994e-6,
      2.68522039667497e-6,
      1.34261019833748e-6,
    ];
    var crs = new L.Proj.CRS(
      "EPSG:4490",
      "+proj=longlat +ellps=GRS80 +no_defs",
      {
        resolutions: res,
        origin: [118.122911693886, 31.2869311022836],
      }
    );
    var map = L.map("mapid", {
      crs: crs,
    });
    var url =
      "http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/hzsyvector/Mapserver";
    var attrib = "&copy 杭州市规划资源局";
    var basemap = new L.TileLayer(url + "/tile/{z}/{y}/{x}", {
      tileSize: 256,
      attribution: attrib,
    });
    map.addLayer(basemap);
    map.setView([30, 120], 4); //设置比例尺和中心点级别
    map.on("click", function (e) {
      alert("You clicked the map at " + e.latlng);
    });
    var myStyle = {
      color: "#ff0000",
      weight: 2,
      opacity: 1,
      fillOpacity: 0.01,
    };
    var mblayer;
    $.ajax({
      url:
        "http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/lsyt_dmdz_qxbj0619/MapServer/wfs?service=wfs&version=1.0.0&request=getfeature&typename=lsyt_dmdz_qxbj0619&outputFormat=application/json",
      success: function (data) {
        var geojson = JSON.parse(data);
        mblayer = L.geoJSON(geojson, {
          style: myStyle,
        }).addTo(map);
      },
    });
  \</script>
\</body>
\</html>
```

 

 

## 3.3.3查询

### 3.3.3.1点查询 

```html
\<!DOCTYPE html>
\<html>
\<head>
  \<meta charset="UTF-8" />
  \<title>点查询\</title>
  \<link rel="stylesheet" href="http://172.18.109.232:8082/leaflet/V1.3/leaflet/leaflet.css" />
  \<script src="http://172.18.109.232:8082/leaflet/V1.3/leaflet/leaflet.js">\</script>
  \<script src="http://172.18.109.232:8082/leaflet/V1.3/leaflet/Plugins/leaflet-wfs.js">\</script>
  \<script src="http://172.18.109.232:8082/leaflet/V1.3/pro/proj4-compressed.js">\</script>
  \<script src="http://172.18.109.232:8082/leaflet/V1.3/pro/proj4leaflet.js">\</script>
  \<script src="http://172.18.109.232:8082/jquery/jquery.js">\</script>
  \<style>
    html {
      height: 100%;
    }
    body {
      height: 100%;
      margin: 0;
      padding: 0;
    }
    .map {
      height: 100%;
    }
  \</style>
\</head>
\<body>
  \<div id="mapid" class="map">\</div>
  \<script>
    var res = [
      0.00549933137239034, // Level 0
      0.00274966568619517, // Level 1
      0.00137483284309758, // Level 2
      0.000687416421548792, // Level 3
      0.000343708210774396, // Level 4
      0.000171854105387198,
      8.5927052693599e-5,
      4.29635263467995e-5,
      2.14817631733998e-5,
      1.07408815866999e-5,
      5.37044079334994e-6,
      2.68522039667497e-6,
      1.34261019833748e-6,
    ];
    var crs = new L.Proj.CRS(
      "EPSG:4490",
      "+proj=longlat +ellps=GRS80 +no_defs",
      {
        resolutions: res,
        origin: [118.122911693886, 31.2869311022836],
      }
    );
    var map = L.map("mapid", {
      crs: crs,
      /*fullscreenControl: {
        pseudoFullscreen: false
      },*/
    });
    var url =
      "http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/hzsyvector/Mapserver";
    var attrib = "&copy 杭州市规划资源局";
    var basemap = new L.TileLayer(url + "/tile/{z}/{y}/{x}", {
      tileSize: 256,
      attribution: attrib,
    });
    map.addLayer(basemap);
    map.setView([30, 120], 4); //设置比例尺和中心点级别
    map.on("click", function (e) {
      // alert("You clicked the map at " + e.latlng);
      var point = e.latlng.lng + "," + e.latlng.lat + "," + e.latlng.lng + "," + e.latlng.lat;// "120.16271670916996,30.251675868508478,120.1713094144393,30.25591314629446";
      var qurl =
        "http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/lsyt_dmdz_qxbj0619/MapServer/wfs?service=wfs&version=1.0.0&request=getfeature&typename=lsyt_dmdz_qxbj0619&outputFormat=application/json&CQL_FILTER=BBOX(geom," + point + ")";
      $.ajax({
        url: qurl,
        success: function (data) {
          console.log(data);
          var text = JSON.parse(data);
          alert("You clicked the map at " + text.features[1].properties['quxian']);
        }
      });
    });
    var myStyle = {
      color: "#ff0000",
      weight: 2,
      opacity: 1,
      fillOpacity: 0.01,
    };
    var mblayer;
    $.ajax({
      url:
        "http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/lsyt_dmdz_qxbj0619/MapServer/wfs?service=wfs&version=1.0.0&request=getfeature&typename=lsyt_dmdz_qxbj0619&outputFormat=application/json",
      success: function (data) {
        var geojson = JSON.parse(data);
        mblayer = L.geoJSON(geojson, {
          style: myStyle,
        }).addTo(map);
      },
    });
  \</script>
\</body>
\</html>
```

 

### 3.3.3.2面查询

```html
\<!DOCTYPE html>
\<html>
\<head>
  \<meta charset="UTF-8" />
  \<title>面查询\</title>
  \<link rel="stylesheet" href="http://172.18.109.232:8082/leaflet/V1.3/leaflet/leaflet.css" />
  \<link rel="stylesheet" href="http://172.18.109.232:8082/leaflet/V1.3/leaflet/Plugins/leaflet-draw/leaflet.draw.css" />
  \<script src="http://172.18.109.232:8082/leaflet/V1.3/leaflet/leaflet.js">\</script>
  \<script src="http://172.18.109.232:8082/leaflet/V1.3/leaflet/Plugins/leaflet-wfs.js">\</script>
  \<script src="http://172.18.109.232:8082/leaflet/V1.3/pro/proj4-compressed.js">\</script>
  \<script src="http://172.18.109.232:8082/leaflet/V1.3/pro/proj4leaflet.js">\</script>
  \<script src="http://172.18.109.232:8082/jquery/jquery.js">\</script>
  \<script src="http://172.18.109.232:8082/leaflet/V1.3/leaflet/Plugins/leaflet-draw/leaflet.draw.js">\</script>
  \<style>
    html {
      height: 100%;
    }
    body {
      height: 100%;
      margin: 0;
      padding: 0;
    }
    .map {
      height: 100%;
    }
  \</style>
\</head>
\<body>
  \<div id="mapid" class="map">\</div>
  \<script>
    var res = [
      0.00549933137239034, // Level 0
      0.00274966568619517, // Level 1
      0.00137483284309758, // Level 2
      0.000687416421548792, // Level 3
      0.000343708210774396, // Level 4
      0.000171854105387198,
      8.5927052693599e-5,
      4.29635263467995e-5,
      2.14817631733998e-5,
      1.07408815866999e-5,
      5.37044079334994e-6,
      2.68522039667497e-6,
      1.34261019833748e-6,
    ];
    var crs = new L.Proj.CRS(
      "EPSG:4490",
      "+proj=longlat +ellps=GRS80 +no_defs",
      {
        resolutions: res,
        origin: [118.122911693886, 31.2869311022836],
      }
    );
    var map = L.map("mapid", {
      crs: crs,
      /*fullscreenControl: {
        pseudoFullscreen: false
      },*/
    });
    var url =
      "http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/hzsyvector/Mapserver";
    var attrib = "&copy 杭州市规划资源局";
    var basemap = new L.TileLayer(url + "/tile/{z}/{y}/{x}", {
      tileSize: 256,
      attribution: attrib,
    });
    map.addLayer(basemap);
    map.setView([30, 120], 4); //设置比例尺和中心点级别
    //var draw=new L.Control.Draw(map,drawControl.options.rectangle).enable();
    var options = {
      position: "topleft",
      draw: {
        polyline: false,
        polygon: false,
        circle: false,
        marker: false,
        circlemarker: false,
        rectangle: {
          shapeOptions: {
            clickable: true,
          },
        },
      },
    };
    var drawControl = new L.Control.Draw(options);
    map.addControl(drawControl);
    map.on(L.Draw.Event.CREATED, function (e) {
      var type = e.layerType;
      if (type == "rectangle") {
        var bound = e.layer.getBounds();
        var point =
          bound._southWest.lng +
          "," +
          bound._southWest.lat +
          "," +
          bound._northEast.lng +
          "," +
          bound._northEast.lat; // "120.16271670916996,30.251675868508478,120.1713094144393,30.25591314629446";
        var qurl =
          "http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/lsyt_dmdz_qxbj0619/MapServer/wfs?service=wfs&version=1.0.0&request=getfeature&typename=lsyt_dmdz_qxbj0619&outputFormat=application/json&CQL_FILTER=BBOX(geom," +
          point +
          ")";
        $.ajax({
          url: qurl,
          success: function (data) {
            console.log(data);
            var text = JSON.parse(data);
            alert(
              "你选择的是 " + text.features[1].properties["quxian"]
            );
          },
        });
      }
    });
    var myStyle = {
      color: "#ff0000",
      weight: 2,
      opacity: 1,
      fillOpacity: 0.01,
    };
    var mblayer;
    $.ajax({
      url:
        "http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/lsyt_dmdz_qxbj0619/MapServer/wfs?service=wfs&version=1.0.0&request=getfeature&typename=lsyt_dmdz_qxbj0619&outputFormat=application/json",
      success: function (data) {
        var geojson = JSON.parse(data);
        mblayer = L.geoJSON(geojson, {
          style: myStyle,
        }).addTo(map);
      },
    });
  \</script>
\</body>
\</html>
```

 

 

### 3.3.3.3属性查询

```html
\<!DOCTYPE html>
\<html>
\<head>
  \<meta charset="UTF-8" />
  \<title>点查询\</title>
  \<link rel="stylesheet" href="http://172.18.109.232:8082/leaflet/V1.3/leaflet/leaflet.css" />
  \<script src="http://172.18.109.232:8082/leaflet/V1.3/leaflet/leaflet.js">\</script>
  \<script src="http://172.18.109.232:8082/leaflet/V1.3/leaflet/Plugins/leaflet-wfs.js">\</script>
  \<script src="http://172.18.109.232:8082/leaflet/V1.3/pro/proj4-compressed.js">\</script>
  \<script src="http://172.18.109.232:8082/leaflet/V1.3/pro/proj4leaflet.js">\</script>
  \<script src="http://172.18.109.232:8082/jquery/jquery.js">\</script>
  \<style>
    html {
      height: 100%;
    }
    body {
      height: 100%;
      margin: 0;
      padding: 0;
    }
    .map {
      height: 100%;
    }
    .h1 {
      z-index: 1009;
      position: absolute;
      left: 100px;
    }
  \</style>
\</head>
\<body>
  \<div id="mapid" class="map">
    \<h1>点击地图根据属性查询\</h1>
  \</div>
  \<script>
    var res = [
      0.00549933137239034, // Level 0
      0.00274966568619517, // Level 1
      0.00137483284309758, // Level 2
      0.000687416421548792, // Level 3
      0.000343708210774396, // Level 4
      0.000171854105387198,
      8.5927052693599e-5,
      4.29635263467995e-5,
      2.14817631733998e-5,
      1.07408815866999e-5,
      5.37044079334994e-6,
      2.68522039667497e-6,
      1.34261019833748e-6,
    ];
    var crs = new L.Proj.CRS(
      "EPSG:4490",
      "+proj=longlat +ellps=GRS80 +no_defs",
      {
        resolutions: res,
        origin: [118.122911693886, 31.2869311022836],
      }
    );
    var map = L.map("mapid", {
      crs: crs,
      /*fullscreenControl: {
        pseudoFullscreen: false
      },*/
    });
    var url =
      "http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/hzsyvector/Mapserver";
    var attrib = "&copy 杭州市规划资源局";
    var basemap = new L.TileLayer(url + "/tile/{z}/{y}/{x}", {
      tileSize: 256,
      attribution: attrib,
    });
    map.addLayer(basemap);
    map.setView([30, 120], 4); //设置比例尺和中心点级别
    map.on("click", function (e) {
      var point =
        e.latlng.lng +
        "," +
        e.latlng.lat +
        "," +
        e.latlng.lng +
        "," +
        e.latlng.lat; // "120.16271670916996,30.251675868508478,120.1713094144393,30.25591314629446";
      var qurl =
        "http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/lsyt_dmdz_qxbj0619/MapServer/wfs?service=wfs&version=1.0.0&request=getfeature&typename=lsyt_dmdz_qxbj0619&outputFormat=application/json&CQL_FILTER=";
      qurl += " quxian='上城区'";
      $.ajax({
        url: qurl,
        success: function (data) {
          console.log(data);
          var text = JSON.parse(data);
          alert("根据属性选择的是 " + text.features[0].properties["quxian"]);
        },
      });
    });
    var myStyle = {
      color: "#ff0000",
      weight: 2,
      opacity: 1,
      fillOpacity: 0.01,
    };
    var mblayer;
    $.ajax({
      url:
        "http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/lsyt_dmdz_qxbj0619/MapServer/wfs?service=wfs&version=1.0.0&request=getfeature&typename=lsyt_dmdz_qxbj0619&outputFormat=application/json",
      success: function (data) {
        var geojson = JSON.parse(data);
        mblayer = L.geoJSON(geojson, {
          style: myStyle,
        }).addTo(map);
      },
    });
  \</script>
\</body>
\</html>
```

 

 

### 3.3.3.4组合查询

```html
\<!DOCTYPE html>
\<html>
\<head>
  \<meta charset="UTF-8" />
  \<title>面查询\</title>
  \<link rel="stylesheet" href="http://172.18.109.232:8082/leaflet/V1.3/leaflet/leaflet.css" />
  \<link rel="stylesheet" href="http://172.18.109.232:8082/leaflet/V1.3/leaflet/Plugins/leaflet-draw/leaflet.draw.css" />
  \<script src="http://172.18.109.232:8082/leaflet/V1.3/leaflet/leaflet.js">\</script>
  \<script src="http://172.18.109.232:8082/leaflet/V1.3/leaflet/Plugins/leaflet-wfs.js">\</script>
  \<script src="http://172.18.109.232:8082/leaflet/V1.3/pro/proj4-compressed.js">\</script>
  \<script src="http://172.18.109.232:8082/leaflet/V1.3/pro/proj4leaflet.js">\</script>
  \<script src="http://172.18.109.232:8082/jquery/jquery.js">\</script>
  \<script src="http://172.18.109.232:8082/leaflet/V1.3/leaflet/Plugins/leaflet-draw/leaflet.draw.js">\</script>
  \<style>
    html {
      height: 100%;
    }
    body {
      height: 100%;
      margin: 0;
      padding: 0;
    }
    .map {
      height: 100%;
    }
  \</style>
\</head>
\<body>
  \<div id="mapid" class="map">\</div>
  \<script>
    var res = [
      0.00549933137239034, // Level 0
      0.00274966568619517, // Level 1
      0.00137483284309758, // Level 2
      0.000687416421548792, // Level 3
      0.000343708210774396, // Level 4
      0.000171854105387198,
      8.5927052693599e-5,
      4.29635263467995e-5,
      2.14817631733998e-5,
      1.07408815866999e-5,
      5.37044079334994e-6,
      2.68522039667497e-6,
      1.34261019833748e-6,
    ];
    var crs = new L.Proj.CRS(
      "EPSG:4490",
      "+proj=longlat +ellps=GRS80 +no_defs",
      {
        resolutions: res,
        origin: [118.122911693886, 31.2869311022836],
      }
    );
    var map = L.map("mapid", {
      crs: crs,
      /*fullscreenControl: {
        pseudoFullscreen: false
      },*/
    });
    var url =
      "http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/hzsyvector/Mapserver";
    var attrib = "&copy 杭州市规划资源局";
    var basemap = new L.TileLayer(url + "/tile/{z}/{y}/{x}", {
      tileSize: 256,
      attribution: attrib,
    });
    map.addLayer(basemap);
    map.setView([30, 120], 4); //设置比例尺和中心点级别
    //var draw=new L.Control.Draw(map,drawControl.options.rectangle).enable();
    var options = {
      position: "topleft",
      draw: {
        polyline: false,
        polygon: false,
        circle: false,
        marker: false,
        circlemarker: false,
        rectangle: {
          shapeOptions: {
            clickable: true,
          },
        },
      },
    };
    var drawControl = new L.Control.Draw(options);
    map.addControl(drawControl);
    map.on(L.Draw.Event.CREATED, function (e) {
      var type = e.layerType;
      if (type == "rectangle") {
        var bound = e.layer.getBounds();
        var point =
          bound._southWest.lng +
          "," +
          bound._southWest.lat +
          "," +
          bound._northEast.lng +
          "," +
          bound._northEast.lat; // "120.16271670916996,30.251675868508478,120.1713094144393,30.25591314629446";
        var qurl =
          "http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/lsyt_dmdz_qxbj0619/MapServer/wfs?service=wfs&version=1.0.0&request=getfeature&typename=lsyt_dmdz_qxbj0619&outputFormat=application/json&CQL_FILTER=BBOX(geom," +
          point +
          ")";
        qurl += " and quxian='上城区'";
        $.ajax({
          url: qurl,
          success: function (data) {
            console.log(data);
            var text = JSON.parse(data);
            if (!text.features.length) {
              alert("你选择的是非上城区，无查询结果！");
            } else {
              alert("你选择的是 " + text.features[0].properties["quxian"]);
            }
          },
        });
      }
    });
    var myStyle = {
      color: "#ff0000",
      weight: 2,
      opacity: 1,
      fillOpacity: 0.01,
    };
    var mblayer;
    $.ajax({
      url:
        "http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/lsyt_dmdz_qxbj0619/MapServer/wfs?service=wfs&version=1.0.0&request=getfeature&typename=lsyt_dmdz_qxbj0619&outputFormat=application/json",
      success: function (data) {
        var geojson = JSON.parse(data);
        mblayer = L.geoJSON(geojson, {
          style: myStyle,
        }).addTo(map);
      },
    });
  \</script>
\</body>
\</html>
```

 

 

 

# ArcGIS

ArcGIS API for JavaScript就是ESRI公司用JavaScipt语言编写的一套程序接口。用户可以通过调用API获取ArcGIS server、geoserver等提供的服务，例如浏览、编辑、渲染地图，以及一些常用的空间分析功能。API中包含了ArcGIS API for JavaScript中每个类的详细描述。使用API查找每个类的构造函数选项以及属性、方法和事件。

详情见官方网站https://developers.arcgis.com/javascript/3/jsapi/

## 3.1.1地图

### 3.1.1.1矢量电子地图

```html
\<!DOCTYPE html>
\<html>
\<head>
  \<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  \<meta name="viewport" content="initial-scale=1, maximum-scale=1,user-scalable=no" />
  \<title>Map with Vertor\</title>
  \<link rel="stylesheet" href="http://172.18.109.232:8082/arcgis_js_api/3.24/dijit/themes/claro/claro.css" />
  \<link rel="stylesheet" href="http://172.18.109.232:8082/arcgis_js_api/3.24/esri/css/esri.css" />
  \<style>
    html,
    body,
    \#map {
      ​ height: 100%;
      ​ width: 100%;
      ​ margin: 0;
      ​ padding: 0;
    }
    .esriControlsBR .logo-med {
      ​ display: none;
    }
  \</style>
  \<script src="http://172.18.109.232:8082/arcgis_js_api/3.24/init.js">\</script>
  \<script src="http://172.18.109.232:8082/jquery/jquery.js">\</script>
  \<script>
    var map;
    require([
      "esri/map",
      "esri/layers/WMSLayer",
      "esri/layers/WMSLayerInfo",
      "esri/layers/ArcGISTiledMapServiceLayer",
      "esri/geometry/Extent",
      "dojo/_base/array",
      "dojo/dom",
      "dojo/dom-construct",
      "dojo/parser",
      "dijit/layout/BorderContainer",
      "dijit/layout/ContentPane",
      "dojo/domReady!",
    ], function (
      Map,
      WMSLayer,
      WMSLayerInfo,
      ArcGISTiledMapServiceLayer,
      Extent,
      array,
      dom,
      domConst,
      parser
    ) {
      parser.parse();
      map = new Map("map", {
        center: new esri.geometry.Point(
          120.1594,
          30.2571,
          new esri.SpatialReference({ wkid: 4490 })
        ),
        zoom: 3,
      });
      var layer = new ArcGISTiledMapServiceLayer(
        "http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/hzsyvector/Mapserver",
        {
          id: "vector",
        }
      );
      map.addLayer(layer);
    });
  \</script>
\</head>
\<body class="claro">
  \<div ​ id="map" ​ data-dojo-type="dijit.layout.ContentPane" ​ data-dojo-props="region:'center'" ​
    style="overflow: hidden;" \>\</div>
  \</div>
\</body>
\</html>
```



 

 

#### 3.1.1.2影像电子地图

```html
\<!DOCTYPE html>
\<html>
\<head>
  \<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  \<meta name="viewport" content="initial-scale=1, maximum-scale=1,user-scalable=no" />
  \<title>Map with Raster\</title>
  \<link rel="stylesheet" href="http://172.18.109.232:8082/arcgis_js_api/3.24/dijit/themes/claro/claro.css" />
  \<link rel="stylesheet" href="http://172.18.109.232:8082/arcgis_js_api/3.24/esri/css/esri.css" />
  \<style>
    html,
    body,
    \#map {
      ​ height: 100%;
      ​ width: 100%;
      ​ margin: 0;
      ​ padding: 0;
    }
    .esriControlsBR .logo-med {
      ​ display: none;
    }
  \</style>
  \<script src="http://172.18.109.232:8082/arcgis_js_api/3.24/init.js">\</script>
  \<script src="http://172.18.109.232:8082/jquery/jquery.js">\</script>
  \<script>
    var map;
    require([
      "esri/map",
      "esri/layers/WMSLayer",
      "esri/layers/WMSLayerInfo",
      "esri/layers/ArcGISTiledMapServiceLayer",
      "esri/geometry/Extent",
      "dojo/_base/array",
      "dojo/dom",
      "dojo/dom-construct",
      "dojo/parser",
      "dijit/layout/BorderContainer",
      "dijit/layout/ContentPane",
      "dojo/domReady!",
    ], function (
      Map,
      WMSLayer,
      WMSLayerInfo,
      ArcGISTiledMapServiceLayer,
      Extent,
      array,
      dom,
      domConst,
      parser
    ) {
      parser.parse();
      map = new Map("map", {
        center: new esri.geometry.Point(
          120.1594,
          30.2571,
          new esri.SpatialReference({ wkid: 4490 })
        ),
        zoom: 3,
      });
      var layer = new ArcGISTiledMapServiceLayer(
        "http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/hzsyraster/Mapserver",
        {
          id: "raster",
        }
      );
      map.addLayer(layer);
    });
  \</script>
\</head>
\<body class="claro">
  \<div ​ id="map" ​ data-dojo-type="dijit.layout.ContentPane" ​ data-dojo-props="region:'center'" ​
    style="overflow: hidden;" \>\</div>
  \</div>
\</body>
\</html>
```





 

#### 3.1.1.3手动加载/移除地图

```html
\<!DOCTYPE html>
\<html>
\<head>
  \<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  \<meta name="viewport" content="initial-scale=1, maximum-scale=1,user-scalable=no" />
  \<title>Map with Control\</title>
  \<link rel="stylesheet" href="http://172.18.109.232:8082/arcgis_js_api/3.24/dijit/themes/claro/claro.css" />
  \<link rel="stylesheet" href="http://172.18.109.232:8082/arcgis_js_api/3.24/esri/css/esri.css" />
  \<style>
    html,
    body,
    \#map {
      ​ height: 100%;
      ​ width: 100%;
      ​ margin: 0;
      ​ padding: 0;
    }
    .esriControlsBR .logo-med {
      ​ display: none;
    }
    .details span {
      ​ cursor: pointer;
    }
  \</style>
  \<script src="http://172.18.109.232:8082/arcgis_js_api/3.24/init.js">\</script>
  \<script src="http://172.18.109.232:8082/jquery/jquery.js">\</script>
  \<script>
    var map;
    require([
      "esri/map",
      "esri/layers/WMSLayer",
      "esri/layers/WMSLayerInfo",
      "esri/layers/ArcGISTiledMapServiceLayer",
      "esri/geometry/Extent",
      "dojo/_base/array",
      "dojo/dom",
      "dojo/dom-construct",
      "dojo/parser",
      "dijit/layout/BorderContainer",
      "dijit/layout/ContentPane",
      "dojo/domReady!",
    ], function (
      Map,
      WMSLayer,
      WMSLayerInfo,
      ArcGISTiledMapServiceLayer,
      Extent,
      array,
      dom,
      domConst,
      parser
    ) {
      parser.parse();
      map = new Map("map", {
        center: new esri.geometry.Point(
          120.1594,
          30.2571,
          new esri.SpatialReference({ wkid: 4490 })
        ),
        zoom: 3,
      });
      var vector = new ArcGISTiledMapServiceLayer(
        "http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/hzsyvector/Mapserver",
        {
          id: "vector",
        }
      );
      // map.addLayer(vector);
      var raster = new ArcGISTiledMapServiceLayer(
        "http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/hzsyraster/Mapserver",
        {
          id: "raster",
        }
      );
      // map.addLayer(raster);
      $("#details span").click(function () {
        var name = $(this).attr("name");
        switch (name) {
          case "vector":
            if (!map.getLayer("vector")) map.addLayer(vector);
            break;
          case "raster":
            if (!map.getLayer("raster")) map.addLayer(raster);
            break;
          case "rvector":
            if (map.getLayer("vector")) map.removeLayer(vector);
            break;
          case "rraster":
            if (map.getLayer("raster")) map.removeLayer(raster);
            break;
        }
      });
    });
  \</script>
\</head>
\<body class="claro">
  \<div id="content" data-dojo-type="dijit.layout.BorderContainer" data-dojo-props="design:'headline', gutters:true"
    style="width: 100%; height: 100%; margin: 0;" \>
    \<div ​ id="details" ​ data-dojo-type="dijit.layout.ContentPane" ​ data-dojo-props="region:'left', splitter:true" ​
      style="overflow: auto; width: 200px;" \>
      ​ \<span name="vector">添加矢量图层\</span>
      ​ \<span name="raster">添加影像图层\</span>
      ​ \<span name="rvector">移除矢量图层\</span>
      ​ \<span name="rraster">移除影像图层\</span>
    \</div>
    \<div ​ id="map" ​ data-dojo-type="dijit.layout.ContentPane" ​ data-dojo-props="region:'center'" ​
      style="overflow: hidden;" \>\</div>
  \</div>
\</body>
\</html>
```



 

 

## 3.1.2图层

### 3.1.2.1弹出信息框

```html
\<!DOCTYPE html>
\<html>
\<head>
  \<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  \<meta name="viewport" content="initial-scale=1, maximum-scale=1,user-scalable=no" />
  \<title>Map with infoWindow\</title>
  \<link rel="stylesheet" href="http://172.18.109.232:8082/arcgis_js_api/3.24/dijit/themes/claro/claro.css" />
  \<link rel="stylesheet" href="http://172.18.109.232:8082/arcgis_js_api/3.24/esri/css/esri.css" />
  \<style>
    html,
    body,
    \#map {
      ​ height: 100%;
      ​ width: 100%;
      ​ margin: 0;
      ​ padding: 0;
    }
    .esriControlsBR .logo-med {
      ​ display: none;
    }
  \</style>
  \<script src="http://172.18.109.232:8082/arcgis_js_api/3.24/init.js">\</script>
  \<script src="http://172.18.109.232:8082/jquery/jquery.js">\</script>
  \<script>
    var map;
    require([
      "esri/map",
      "esri/layers/WFSLayer",
      "esri/layers/WMSLayerInfo",
      "esri/layers/ArcGISTiledMapServiceLayer",
      "esri/geometry/Extent",
      "dojo/_base/array",
      "dojo/dom",
      "dojo/dom-construct",
      "dojo/parser",
      "dijit/layout/BorderContainer",
      "dijit/layout/ContentPane",
      "dojo/domReady!",
    ], function (
      Map,
      WFSLayer,
      WMSLayerInfo,
      ArcGISTiledMapServiceLayer,
      Extent,
      array,
      dom,
      domConst,
      parser
    ) {
      parser.parse();
      map = new Map("map", {
        center: new esri.geometry.Point(
          120.1594,
          30.2571,
          new esri.SpatialReference({ wkid: 4490 })
        ),
        zoom: 3,
      });
      var layer = new ArcGISTiledMapServiceLayer(
        "http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/hzsyvector/Mapserver",
        {
          id: "vector",
        }
      );
      map.addLayer(layer);
      map.on('click', function (e) {
        map.infoWindow.setTitle("详细信息");
        map.infoWindow.setContent("当前坐标：" + e.mapPoint.x + "," + e.mapPoint.y);
        map.infoWindow.show(e.mapPoint);
      })
    });
  \</script>
\</head>
\<body class="claro">
  \<div ​ id="map" ​ data-dojo-type="dijit.layout.ContentPane" ​ data-dojo-props="region:'center'" ​
    style="overflow: hidden;" \>\</div>
  \</div>
\</body>
\</html>
```



 

 

### 3.1.2.2矢量图层（wms）

```html
\<!DOCTYPE html>
\<html>
\<head>
  \<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  \<meta name="viewport" content="initial-scale=1, maximum-scale=1,user-scalable=no" />
  \<title>Map with wmslayer\</title>
  \<link rel="stylesheet" href="http://172.18.109.232:8082/arcgis_js_api/3.24/dijit/themes/claro/claro.css" />
  \<link rel="stylesheet" href="http://172.18.109.232:8082/arcgis_js_api/3.24/esri/css/esri.css" />
  \<style>
    html,
    body,
    \#map {
      ​ height: 100%;
      ​ width: 100%;
      ​ margin: 0;
      ​ padding: 0;
    }
    .esriControlsBR .logo-med {
      ​ display: none;
    }
  \</style>
  \<script src="http://172.18.109.232:8082/arcgis_js_api/3.24/init.js">\</script>
  \<script src="http://172.18.109.232:8082/jquery/jquery.js">\</script>
  \<script>
    var map;
    require([
      "esri/map",
      "esri/layers/WMSLayer",
      "esri/layers/WMSLayerInfo",
      "esri/layers/ArcGISTiledMapServiceLayer",
      "esri/geometry/Extent",
      "dojo/_base/array",
      "dojo/dom",
      "dojo/dom-construct",
      "dojo/parser",
      "dijit/layout/BorderContainer",
      "dijit/layout/ContentPane",
      "dojo/domReady!",
    ], function (
      Map,
      WMSLayer,
      WMSLayerInfo,
      ArcGISTiledMapServiceLayer,
      Extent,
      array,
      dom,
      domConst,
      parser
    ) {
      parser.parse();
      map = new Map("map", {
        center: new esri.geometry.Point(
          120.1594,
          30.2571,
          new esri.SpatialReference({ wkid: 4490 })
        ),
        zoom: 3,
      });
      var layer = new ArcGISTiledMapServiceLayer(
        "http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/hzsyvector/Mapserver",
        {
          id: "vector",
        }
      );
      map.addLayer(layer);
      map.on("load", function () {
        var extent = map.extent;
        var url =
          "http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/lsyt_dmdz_qxbj0619/MapServer/wms";
        var resourceInfo = {
          extent: extent,
          layerInfos: [],
          version: "1.1.1",
          visibleLayers: ["1"],
        };
        var wmslayer = new esri.layers.WMSLayer(url, {
          resourceInfo: resourceInfo,
        });
        wmslayer.setImageFormat("png");
        wmslayer.setVisibleLayers("gpserver");
        map.addLayer(wmslayer);
      });
    });
  \</script>
\</head>
\<body class="claro">
  \<div ​ id="map" ​ data-dojo-type="dijit.layout.ContentPane" ​ data-dojo-props="region:'center'" ​
    style="overflow: hidden;" \>\</div>
  \</div>
\</body>
\</html>
```



 

 

### 3.1.2.3矢量图层（wfs）

```html
\<!DOCTYPE html>
\<html>
\<head>
  \<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  \<meta name="viewport" content="initial-scale=1, maximum-scale=1,user-scalable=no" />
  \<title>Map with wfslayer\</title>
  \<link rel="stylesheet" href="http://172.18.109.232:8082/arcgis_js_api/3.24/dijit/themes/claro/claro.css" />
  \<link rel="stylesheet" href="http://172.18.109.232:8082/arcgis_js_api/3.24/esri/css/esri.css" />
  \<style>
    html,
    body,
    \#map {
      ​ height: 100%;
      ​ width: 100%;
      ​ margin: 0;
      ​ padding: 0;
    }
    .esriControlsBR .logo-med {
      ​ display: none;
    }
  \</style>
  \<script src="http://172.18.109.232:8082/arcgis_js_api/3.24/init.js">\</script>
  \<script src="http://172.18.109.232:8082/jquery/jquery.js">\</script>
  \<script>
    var map, symbol;
    require([
      "esri/map",
      "esri/layers/WFSLayer",
      "esri/layers/WMSLayerInfo",
      "esri/layers/ArcGISTiledMapServiceLayer",
      "esri/symbols/SimpleLineSymbol",
      "esri/symbols/SimpleFillSymbol",
      "esri/graphic",
      "esri/geometry/Extent",
      "esri/geometry/Polygon",
      "dojo/_base/array",
      "dojo/dom",
      "dojo/dom-construct",
      "dojo/parser",
      "dijit/layout/BorderContainer",
      "dijit/layout/ContentPane",
      "dojo/domReady!",
    ], function (
      Map,
      WFSLayer,
      WMSLayerInfo,
      ArcGISTiledMapServiceLayer,
      SimpleLineSymbol,
      SimpleFillSymbol,
      Graphic,
      Extent,
      Polygon,
      array,
      dom,
      domConst,
      parser
    ) {
      parser.parse();
      map = new Map("map", {
        center: new esri.geometry.Point(
          120.1594,
          30.2571,
          new esri.SpatialReference({ wkid: 4490 })
        ),
        zoom: 3,
      });
      var layer = new ArcGISTiledMapServiceLayer(
        "http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/hzsyvector/Mapserver",
        {
          id: "vector",
        }
      );
      map.addLayer(layer);
      map.on("load", function () {
        var extent = map.extent;
        var url =
          "http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/lsyt_dmdz_qxbj0619/MapServer/wfs?service=wfs&version=1.0.0&request=getfeature&typename=lsyt_dmdz_qxbj0619&outputFormat=application/json";
        $.ajax({
          url: url,
          success: function (data) {
            console.log(data);
            var text = JSON.parse(data);
            for (var i = 0; i \< text.features.length; i++) {
              symbol = new SimpleFillSymbol();
              if (text.features[i].geometry.type == "Polygon") {
                var polygonjson = {
                  "rings": text.features[i].geometry.coordinates[0],
                  "spatialReference": { "wkid": 4490 }
                }
                var poly = new Polygon(polygonjson)
                var graphic = new Graphic(poly, symbol);
                //var gra = new Graphic(text.features[i].geometry, symbol);
                map.graphics.add(graphic);
              } else if (text.features[i].geometry.type == "MultiPolygon") {
                var len = text.features[i].geometry.coordinates.length;
                for (var k = 0; k \< len; k++) {
                  var polygonjson = {
                    "rings": text.features[i].geometry.coordinates[k],
                    "spatialReference": { "wkid": 4490 }
                  }
                  var poly = new Polygon(polygonjson)
                  var graphic = new Graphic(poly, symbol);
                  map.graphics.add(graphic);
                }
              } else {
                alert();
              }
            }
          }
        });
      });
    });
  \</script>
\</head>
\<body class="claro">
  \<div ​ id="map" ​ data-dojo-type="dijit.layout.ContentPane" ​ data-dojo-props="region:'center'" ​
    style="overflow: hidden;" \>\</div>
  \</div>
\</body>
\</html>
```



## 3.1.3查询

### 3.1.3.1点查询

```html
\<!DOCTYPE html>
\<html>
\<head>
  \<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  \<meta name="viewport" content="initial-scale=1, maximum-scale=1,user-scalable=no" />
  \<title>Query By Point\</title>
  \<link rel="stylesheet" href="http://172.18.109.232:8082/arcgis_js_api/3.24/dijit/themes/claro/claro.css" />
  \<link rel="stylesheet" href="http://172.18.109.232:8082/arcgis_js_api/3.24/esri/css/esri.css" />
  \<style>
    html,
    body,
    \#map {
      ​ height: 100%;
      ​ width: 100%;
      ​ margin: 0;
      ​ padding: 0;
    }
  \</style>
  \<script src="http://172.18.109.232:8082/arcgis_js_api/3.24/init.js">\</script>
  \<script src="http://172.18.109.232:8082/jquery/jquery.js">\</script>
  \<script>
    var map;
    require([
      "esri/map",
      "esri/layers/WMSLayer",
      "esri/layers/WMSLayerInfo",
      "esri/layers/ArcGISTiledMapServiceLayer",
      "esri/geometry/Extent",
      "dojo/_base/array",
      "dojo/dom",
      "dojo/dom-construct",
      "dojo/parser",
      "dijit/layout/BorderContainer",
      "dijit/layout/ContentPane",
      "dojo/domReady!",
    ], function (
      Map,
      WMSLayer,
      WMSLayerInfo,
      ArcGISTiledMapServiceLayer,
      Extent,
      array,
      dom,
      domConst,
      parser
    ) {
      parser.parse();
      map = new Map("map", {
        // basemap: "streets",
        // center: [120.1594, 30.2571],
        center: new esri.geometry.Point(
          120.1594,
          30.2571,
          new esri.SpatialReference({ wkid: 4490 })
        ),
        zoom: 3,
      });
      var layer2 = new ArcGISTiledMapServiceLayer(
        "http://21.15.116.31/e8b4611714092ac7bc35cb5e8d476e4824f85f3a/Tile/ArcGISREST/hzsyvector.gis",
        {
          // id: layerInfo.LayerName,
          id: "底图",
        }
      );
      map.addLayer(layer2);
      map.on("load", function () {
        var extent = map.extent;
        var url =
          "http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/lsyt_dmdz_qxbj0619/MapServer/wms";
        var resourceInfo = {
          extent: extent,
          layerInfos: [],
          version: "1.1.1",
          visibleLayers: ["1"],
        };
        var wmslayer = new esri.layers.WMSLayer(url, {
          resourceInfo: resourceInfo,
        });
        wmslayer.setImageFormat("png");
        wmslayer.setVisibleLayers("gpserver");
        map.addLayer(wmslayer);
      });
      map.on("click", function (e) {
        console.log("获取到的点" + e);
        var point = e.mapPoint.x + "," + e.mapPoint.y + "," + e.mapPoint.x + "," + e.mapPoint.y;// "120.16271670916996,30.251675868508478,120.1713094144393,30.25591314629446";
        var qurl =
          "http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/lsyt_dmdz_qxbj0619/MapServer/wfs?service=wfs&version=1.0.0&request=getfeature&typename=lsyt_dmdz_qxbj0619&outputFormat=application/json&CQL_FILTER=BBOX(geom," + point + ")";
        $.ajax({
          url: qurl,
          success: function (data) {
            console.log(data);
            var text = JSON.parse(data);
            $('#details').html(text.features[1].properties['quxian']);
          }
        });
      });
    });
  \</script>
\</head>
\<body class="claro">
  \<div id="content" data-dojo-type="dijit.layout.BorderContainer" data-dojo-props="design:'headline', gutters:true"
    style="width: 100%; height: 100%; margin: 0;" \>
    \<div ​ id="details" ​ data-dojo-type="dijit.layout.ContentPane" ​ data-dojo-props="region:'left', splitter:true" ​
      style="overflow: auto; width: 200px;" \>\</div>
    \<div ​ id="map" ​ data-dojo-type="dijit.layout.ContentPane" ​ data-dojo-props="region:'center'" ​
      style="overflow: hidden;" \>\</div>
  \</div>
\</body>
\</html>
```



### 3.1.3.2面查询

```html
\<!DOCTYPE html>
\<html>
\<head>
  \<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  \<meta name="viewport" content="initial-scale=1, maximum-scale=1,user-scalable=no" />
  \<title>Query By Rectangle\</title>
  \<link rel="stylesheet" href="http://172.18.109.232:8082/arcgis_js_api/3.24/dijit/themes/claro/claro.css" />
  \<link rel="stylesheet" href="http://172.18.109.232:8082/arcgis_js_api/3.24/esri/css/esri.css" />
  \<style>
    html,
    body,
    \#map {
      ​ height: 100%;
      ​ width: 100%;
      ​ margin: 0;
      ​ padding: 0;
    }
  \</style>
  \<script src="http://172.18.109.232:8082/arcgis_js_api/3.24/init.js">\</script>
  \<script src="http://172.18.109.232:8082/jquery/jquery.js">\</script>
  \<script>
    var map, toolbar;
    require([
      "esri/map",
      "esri/layers/WMSLayer",
      "esri/layers/WMSLayerInfo",
      "esri/toolbars/draw",
      "esri/symbols/SimpleLineSymbol",
      "esri/symbols/SimpleFillSymbol",
      "esri/graphic",
      "esri/layers/ArcGISTiledMapServiceLayer",
      "esri/geometry/Extent",
      "dojo/_base/array",
      "dojo/dom",
      "dojo/dom-construct",
      "dojo/parser",
      "dijit/layout/BorderContainer",
      "dijit/layout/ContentPane",
      "dojo/domReady!",
    ], function (
      Map,
      WMSLayer,
      WMSLayerInfo,
      Draw,
      SimpleLineSymbol,
      SimpleFillSymbol,
      Graphic,
      ArcGISTiledMapServiceLayer,
      Extent,
      array,
      dom,
      domConst,
      parser
    ) {
      parser.parse();
      map = new Map("map", {
        // basemap: "streets",
        // center: [120.1594, 30.2571],
        center: new esri.geometry.Point(
          120.1594,
          30.2571,
          new esri.SpatialReference({ wkid: 4490 })
        ),
        zoom: 3,
      });
      var layer2 = new ArcGISTiledMapServiceLayer(
        "http://21.15.116.31/e8b4611714092ac7bc35cb5e8d476e4824f85f3a/Tile/ArcGISREST/hzsyvector.gis",
        {
          // id: layerInfo.LayerName,
          id: "底图",
        }
      );
      map.addLayer(layer2);
      map.on("load", function () {
        var extent = map.extent;
        var url =
          "http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/lsyt_dmdz_qxbj0619/MapServer/wms";
        var resourceInfo = {
          extent: extent,
          layerInfos: [],
          version: "1.1.1",
          visibleLayers: ["1"],
        };
        var wmslayer = new esri.layers.WMSLayer(url, {
          resourceInfo: resourceInfo,
        });
        wmslayer.setImageFormat("png");
        wmslayer.setVisibleLayers("gpserver");
        map.addLayer(wmslayer);
        toolbar = new Draw(map);
        toolbar.on("draw-end", showinfo);
        toolbar.activate(Draw["RECTANGLE"]);
      });
      function showinfo(evt) {
        var symbol;
        toolbar.deactivate();
        map.graphics.clear();
        symbol = new SimpleFillSymbol();
        var graphic = new Graphic(evt.geometry, symbol);
        map.graphics.add(graphic);
        getAttr(evt.geometry);
      }
      function getAttr(geo) {
        var point =
          geo.cache._extent.xmin +
          "," +
          geo.cache._extent.ymin +
          "," +
          geo.cache._extent.xmax +
          "," +
          geo.cache._extent.ymax; // "120.16271670916996,30.251675868508478,120.1713094144393,30.25591314629446";
        var qurl = "http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/lsyt_dmdz_qxbj0619/MapServer/wfs?service=wfs&version=1.0.0&request=getfeature&typename=lsyt_dmdz_qxbj0619&outputFormat=application/json&CQL_FILTER=BBOX(geom," + point + ")";
        $.ajax({
          url: qurl,
          success: function (data) {
            console.log(data);
            var text = JSON.parse(data);
            var attr = "";
            for (var i = 0; i \< text.features.length; i++) {
              attr += text.features[i].properties["quxian"] + "\</br>";
            }
            $("#details").html(attr);
            toolbar.activate(Draw["RECTANGLE"]);
          },
        });
      }
    });
  \</script>
\</head>
\<body class="claro">
  \<div id="content" data-dojo-type="dijit.layout.BorderContainer" data-dojo-props="design:'headline', gutters:true"
    style="width: 100%; height: 100%; margin: 0;" \>
    \<div ​ id="details" ​ data-dojo-type="dijit.layout.ContentPane" ​ data-dojo-props="region:'left', splitter:true" ​
      style="overflow: auto; width: 200px;" \>\</div>
    \<div ​ id="map" ​ data-dojo-type="dijit.layout.ContentPane" ​ data-dojo-props="region:'center'" ​
      style="overflow: hidden;" \>\</div>
  \</div>
\</body>
\</html>
```

### 3.1.3.3属性查询

```html
\<!DOCTYPE html>
\<html>
\<head>
  \<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  \<meta name="viewport" content="initial-scale=1, maximum-scale=1,user-scalable=no" />
  \<title>Query by Attr\</title>
  \<link rel="stylesheet" href="http://172.18.109.232:8082/arcgis_js_api/3.24/dijit/themes/claro/claro.css" />
  \<link rel="stylesheet" href="http://172.18.109.232:8082/arcgis_js_api/3.24/esri/css/esri.css" />
  \<style>
    html,
    body,
    \#map {
      ​ height: 100%;
      ​ width: 100%;
      ​ margin: 0;
      ​ padding: 0;
    }
  \</style>
  \<script src="http://172.18.109.232:8082/arcgis_js_api/3.24/init.js">\</script>
  \<script src="http://172.18.109.232:8082/jquery/jquery.js">\</script>
  \<script>
    var map;
    require([
      "esri/map",
      "esri/layers/WMSLayer",
      "esri/layers/WMSLayerInfo",
      "esri/layers/ArcGISTiledMapServiceLayer",
      "esri/geometry/Extent",
      "dojo/_base/array",
      "dojo/dom",
      "dojo/dom-construct",
      "dojo/parser",
      "dijit/layout/BorderContainer",
      "dijit/layout/ContentPane",
      "dojo/domReady!",
    ], function (
      Map,
      WMSLayer,
      WMSLayerInfo,
      ArcGISTiledMapServiceLayer,
      Extent,
      array,
      dom,
      domConst,
      parser
    ) {
      parser.parse();
      map = new Map("map", {
        center: new esri.geometry.Point(
          120.1594,
          30.2571,
          new esri.SpatialReference({ wkid: 4490 })
        ),
        zoom: 3,
      });
      var layer2 = new ArcGISTiledMapServiceLayer(
        "http://21.15.116.31/e8b4611714092ac7bc35cb5e8d476e4824f85f3a/Tile/ArcGISREST/hzsyvector.gis",
        {
          id: "底图",
        }
      );
      map.addLayer(layer2);
      map.on("load", function () {
        var extent = map.extent;
        var url =
          "http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/lsyt_dmdz_qxbj0619/MapServer/wms";
        var resourceInfo = {
          extent: extent,
          layerInfos: [],
          version: "1.1.1",
          visibleLayers: ["1"],
        };
        var wmslayer = new esri.layers.WMSLayer(url, {
          resourceInfo: resourceInfo,
        });
        wmslayer.setImageFormat("png");
        wmslayer.setVisibleLayers("gpserver");
        map.addLayer(wmslayer);
      });
      map.on("click", function (e) {
        console.log("获取到的点" + e);
        var point =
          "120.16271670916996,30.251675868508478,120.1713094144393,30.25591314629446"; // "120.16271670916996,30.251675868508478,120.1713094144393,30.25591314629446";
        var qurl =
          "http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/lsyt_dmdz_qxbj0619/MapServer/wfs?service=wfs&version=1.0.0&request=getfeature&typename=lsyt_dmdz_qxbj0619&outputFormat=application/json&CQL_FILTER=BBOX(geom," +
          point +
          ")";
        qurl += " and quxian='上城区'";
        $.ajax({
          url: qurl,
          success: function (data) {
            console.log(data);
            var text = JSON.parse(data);
            var attr = "";
            for (var i = 0; i \< text.features.length; i++) {
              attr += text.features[i].properties["quxian"] + "\</br>";
            }
            $("#details").html(attr);
          },
        });
      });
    });
  \</script>
\</head>
\<body class="claro">
  \<div id="content" data-dojo-type="dijit.layout.BorderContainer" data-dojo-props="design:'headline', gutters:true"
    style="width: 100%; height: 100%; margin: 0;" \>
    \<div ​ id="details" ​ data-dojo-type="dijit.layout.ContentPane" ​ data-dojo-props="region:'left', splitter:true" ​
      style="overflow: auto; width: 200px;" \>点击地图实现按属性查询（区县=上城区）\</div>
    \<div ​ id="map" ​ data-dojo-type="dijit.layout.ContentPane" ​ data-dojo-props="region:'center'" ​
      style="overflow: hidden;" \>\</div>
  \</div>
\</body>
\</html>
```

### 3.1.3.4组合查询

```html
\<html>
\<head>
  \<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  \<meta name="viewport" content="initial-scale=1, maximum-scale=1,user-scalable=no" />
  \<title>Query\</title>
  \<link rel="stylesheet" href="http://172.18.109.232:8082/arcgis_js_api/3.24/dijit/themes/claro/claro.css" />
  \<link rel="stylesheet" href="http://172.18.109.232:8082/arcgis_js_api/3.24/esri/css/esri.css" />
  \<style>
    html,
    body,
    \#map {
      ​ height: 100%;
      ​ width: 100%;
      ​ margin: 0;
      ​ padding: 0;
    }
  \</style>
  \<script src="http://172.18.109.232:8082/arcgis_js_api/3.24/init.js">\</script>
  \<script src="http://172.18.109.232:8082/jquery/jquery.js">\</script>
  \<script>
    var map, toolbar;
    require([
      "esri/map",
      "esri/layers/WMSLayer",
      "esri/layers/WMSLayerInfo",
      "esri/toolbars/draw",
      "esri/symbols/SimpleLineSymbol",
      "esri/symbols/SimpleFillSymbol",
      "esri/graphic",
      "esri/layers/ArcGISTiledMapServiceLayer",
      "esri/geometry/Extent",
      "dojo/_base/array",
      "dojo/dom",
      "dojo/dom-construct",
      "dojo/parser",
      "dijit/layout/BorderContainer",
      "dijit/layout/ContentPane",
      "dojo/domReady!",
    ], function (
      Map,
      WMSLayer,
      WMSLayerInfo,
      Draw,
      SimpleLineSymbol,
      SimpleFillSymbol,
      Graphic,
      ArcGISTiledMapServiceLayer,
      Extent,
      array,
      dom,
      domConst,
      parser
    ) {
      parser.parse();
      map = new Map("map", {
        center: new esri.geometry.Point(
          120.1594,
          30.2571,
          new esri.SpatialReference({ wkid: 4490 })
        ),
        zoom: 3,
      });
      var layer2 = new ArcGISTiledMapServiceLayer(
        "http://21.15.116.31/e8b4611714092ac7bc35cb5e8d476e4824f85f3a/Tile/ArcGISREST/hzsyvector.gis",
        {
          id: "底图",
        }
      );
      map.addLayer(layer2);
      map.on("load", function () {
        var extent = map.extent;
        var url =
          "http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/lsyt_dmdz_qxbj0619/MapServer/wms";
        var resourceInfo = {
          extent: extent,
          layerInfos: [],
          version: "1.1.1",
          visibleLayers: ["1"],
        };
        var wmslayer = new esri.layers.WMSLayer(url, {
          resourceInfo: resourceInfo,
        });
        wmslayer.setImageFormat("png");
        wmslayer.setVisibleLayers("gpserver");
        map.addLayer(wmslayer);
        toolbar = new Draw(map);
        toolbar.on("draw-end", showinfo);
        toolbar.activate(Draw["RECTANGLE"]);
      });
      function showinfo(evt) {
        var symbol;
        toolbar.deactivate();
        map.graphics.clear();
        symbol = new SimpleFillSymbol();
        var graphic = new Graphic(evt.geometry, symbol);
        map.graphics.add(graphic);
        getAttr(evt.geometry);
      }
      function getAttr(geo) {
        var point =
          geo.cache._extent.xmin +
          "," +
          geo.cache._extent.ymin +
          "," +
          geo.cache._extent.xmax +
          "," +
          geo.cache._extent.ymax; // "120.16271670916996,30.251675868508478,120.1713094144393,30.25591314629446";
        var qurl =
          "http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/lsyt_dmdz_qxbj0619/MapServer/wfs?service=wfs&version=1.0.0&request=getfeature&typename=lsyt_dmdz_qxbj0619&outputFormat=application/json&CQL_FILTER=BBOX(geom," +
          point +
          ")";
        qurl += " and quxian='上城区'";
        $.ajax({
          url: qurl,
          success: function (data) {
            console.log(data);
            var text = JSON.parse(data);
            var attr = "";
            for (var i = 0; i \< text.features.length; i++) {
              attr += text.features[i].properties["quxian"] + "\</br>";
            }
            $("#details").html(attr);
            toolbar.activate(Draw["RECTANGLE"]);
          },
        });
      }
    });
  \</script>
\</head>
\<body class="claro">
  \<div id="content" data-dojo-type="dijit.layout.BorderContainer" data-dojo-props="design:'headline', gutters:true"
    style="width: 100%; height: 100%; margin: 0;" \>
    \<div ​ id="details" ​ data-dojo-type="dijit.layout.ContentPane" ​ data-dojo-props="region:'left', splitter:true" ​
      style="overflow: auto; width: 200px;" \>在框选范围内查询属性（区县=上城区）的数据\</div>
    \<div ​ id="map" ​ data-dojo-type="dijit.layout.ContentPane" ​ data-dojo-props="region:'center'" ​
      style="overflow: hidden;" \>\</div>
  \</div>
\</body>
\</html>
```

\<!DOCTYPE html>

# Openlayers

OpenLayers 是一个专为Web GIS 客户端开发提供的JavaScript 类库包，用于实现标准格式发布的地图数据访问。OpenLayers实现访问地理空间数据的方法都符合行业标准。OpenLayers 支持Open GIS 协会制定的WMS（Web Mapping Service）和WFS（Web Feature Service）等网络服务规范，可以通过远程服务的方式，将以OGC 服务形式发布的地图数据加载到基于浏览器的OpenLayers 客户端中进行显示。详细见官方网站https://openlayers.org/

### 地图

####  矢量电子地图

```html
\<!DOCTYPE html>
\<html>
\<head>
  \<meta charset="UTF-8">
  \<title>添加电子地图\</title>
  \<link rel="stylesheet" href="http://172.18.109.232:8082/openlayer/v3.20.1/css/ol.css" type="text/css">
  \<script src="http://172.18.109.232:8082/openlayer/v3.20.1/build/ol.js">\</script>
\</head>
\<body>
  \<div id="map" class="map">\</div>
  \<script>
    var format = 'image/png';
    var bounds = [119.347618103027, 29.7052669525146,
      120.698570251465, 30.5366992950439
    ];
    var projection = new ol.proj.Projection({
      code: 'EPSG:4490',
      units: 'degrees',
      axisOrientation: 'neu',
      global: true
    });
    var fullExtent = [118.33968849655, 29.188589472, 120.71408849655, 30.5651894750343];
    var resolutions = [
      0.00549933137239034,
      0.00274966568619517,
      0.00137483284309758,
      0.000687416421548792,
      0.000343708210774396,
      0.000171854105387198,
      8.5927052693599E-05,
      4.29635263467995E-05,
      2.14817631733998E-05,
      1.07408815866999E-05,
      5.37044079334994E-06,
      2.68522039667497E-06,
      1.34261019833748E-06,
    ];
    var tileGrid = new ol.tilegrid.TileGrid({
      tileSize: 256,
      origin: [118.122911693886, 31.2869311022836],
      extent: fullExtent,
      resolutions: resolutions
    });
    // ol.source.XYZ添加瓦片地图的层
    var tileLayer = new ol.layer.Tile({
      source: new ol.source.XYZ({
        tileGrid: tileGrid,
        tileUrlFunction: function (tileCoord) {
          var z = tileCoord[0];
          var x = tileCoord[1];
          var y = (-tileCoord[2] - 1);
          var url = 'http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/hzsyvector/Mapserver/tile/' +
            z + '/' + y + '/' + x;
          console.log(url);
          return url;
        },
        projection: 'EPSG:4490'
      })
    });
    var map = new ol.Map({
      target: 'map',
      layers: [
        tileLayer
      ],
      view: new ol.View({
        projection: projection
      })
    });
    map.getView().fit(bounds, map.getSize()); //非常重要
  \</script>
\</body>
\</html>
```



####  影像电子地图  

\<!DOCTYPE html>
\<html>
\<head>
  \<meta charset="UTF-8">
  \<title>添加电子地图\</title>
  \<link rel="stylesheet" href="http://172.18.109.232:8082/openlayer/v3.20.1/css/ol.css" type="text/css">
  \<script src="http://172.18.109.232:8082/openlayer/v3.20.1/build/ol.js">\</script>
\</head>
\<body>
  \<div id="map" class="map">\</div>
  \<script>
    var format = 'image/png';
    var bounds = [119.347618103027, 29.7052669525146,
      120.698570251465, 30.5366992950439
    ];
    var projection = new ol.proj.Projection({
      code: 'EPSG:4490',
      units: 'degrees',
      axisOrientation: 'neu',
      global: true
    });
    var fullExtent = [118.33968849655, 29.188589472, 120.71408849655, 30.5651894750343];
    var resolutions = [
      0.00549933137239034,
      0.00274966568619517,
      0.00137483284309758,
      0.000687416421548792,
      0.000343708210774396,
      0.000171854105387198,
      8.5927052693599E-05,
      4.29635263467995E-05,
      2.14817631733998E-05,
      1.07408815866999E-05,
      5.37044079334994E-06,
      2.68522039667497E-06,
      1.34261019833748E-06,
    ];
    var tileGrid = new ol.tilegrid.TileGrid({
      tileSize: 256,
      origin: [118.122911693886, 31.2869311022836],
      extent: fullExtent,
      resolutions: resolutions
    });
    // ol.source.XYZ添加瓦片地图的层
    var tileLayer = new ol.layer.Tile({
      source: new ol.source.XYZ({
        tileGrid: tileGrid,
        tileUrlFunction: function (tileCoord) {
          var z = tileCoord[0];
          var x = tileCoord[1];
          var y = (-tileCoord[2] - 1);
          var url = 'http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/hzsyraster/Mapserver/tile/' +
            z + '/' + y + '/' + x;
          console.log(url);
          return url;
        },
        projection: 'EPSG:4490'
      })
    });
    var map = new ol.Map({
      target: 'map',
      layers: [
        tileLayer
      ],
      view: new ol.View({
        projection: projection
      })
    });
    map.getView().fit(bounds, map.getSize()); //非常重要
  \</script>
\</body>
\</html>

### 图层

####  弹出框信息框

```html
\<!DOCTYPE html>
\<html>
\<head>
  \<meta charset="UTF-8" />
  \<title>弹出信息框\</title>
  \<link rel="stylesheet" href="http://172.18.109.232:8082/openlayer/v3.20.1/css/ol.css" type="text/css" />
  \<script src="http://172.18.109.232:8082/openlayer/v3.20.1/build/ol.js">\</script>
  \<script src="http://172.18.109.232:8082/jquery/jquery.js">\</script>
\</head>
\<style>
  #map {
    height: 100%;
    width: 100%;
  }
  #mypopup {
    background: #fff;
  }
\</style>
\<body>
  \<div id="map" class="map">\</div>
  \<div id="mypopup">
    \<div id="mypopup-content">内容自定义\</div>
    \<button id="closeOverlay">关闭\</button>
  \</div>
  \<script>
    var format = "image/png";
    var bounds = [
      119.347618103027,
      29.7052669525146,
      120.698570251465,
      30.5366992950439,
    ];
    var projection = new ol.proj.Projection({
      code: "EPSG:4490",
      units: "degrees",
      axisOrientation: "neu",
      global: true,
    });
    var fullExtent = [
      118.33968849655,
      29.188589472,
      120.71408849655,
      30.5651894750343,
    ];
    var resolutions = [
      0.00549933137239034,
      0.00274966568619517,
      0.00137483284309758,
      0.000687416421548792,
      0.000343708210774396,
      0.000171854105387198,
      8.5927052693599e-5,
      4.29635263467995e-5,
      2.14817631733998e-5,
      1.07408815866999e-5,
      5.37044079334994e-6,
      2.68522039667497e-6,
      1.34261019833748e-6,
    ];
    var tileGrid = new ol.tilegrid.TileGrid({
      tileSize: 256,
      origin: [118.122911693886, 31.2869311022836],
      extent: fullExtent,
      resolutions: resolutions,
    });
    // ol.source.XYZ添加瓦片地图的层
    var tileLayer = new ol.layer.Tile({
      source: new ol.source.XYZ({
        tileGrid: tileGrid,
        tileUrlFunction: function (tileCoord) {
          var z = tileCoord[0];
          var x = tileCoord[1];
          var y = -tileCoord[2] - 1;
          var url =
            "http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/hzsyvector/Mapserver/tile/" +
            z +
            "/" +
            y +
            "/" +
            x;
          // console.log(url);
          return url;
        },
        projection: "EPSG:4490",
      }),
    });
    var info = $("#mypopup");
    var content = $("#mypopup-content");
    var overlay = new ol.Overlay({
      element: info[0],
      autopan: true,
      autoPanMargin: 20,
      positioning: "center-center",
    });
    //map.addOverlay(overlay);
    var map = new ol.Map({
      target: "map",
      layers: [tileLayer],
      overlays: [overlay],
      view: new ol.View({
        projection: projection,
      }),
    });
    map.getView().fit(bounds, map.getSize()); //非常重要
    $("#closeOverlay").click(function () {
      info.hide();
      return false;
    });
    map.on("click", function (e) {
      var location = e.coordinate;
      content.html("这是信息框");
      info.show();
      overlay.setPosition(location);
    });
  \</script>
\</body>
\</html>
```



 

####  矢量图层（wms）

```html
\<!DOCTYPE html>
\<html>
\<head>
  \<meta charset="UTF-8">
  \<title>添加电子地图\</title>
  \<link rel="stylesheet" href="http://172.18.109.232:8082/openlayer/v3.20.1/css/ol.css" type="text/css">
  \<script src="http://172.18.109.232:8082/openlayer/v3.20.1/build/ol.js">\</script>
\</head>
\<body>
  \<div id="map" class="map">\</div>
  \<script>
    var format = 'image/png';
    var bounds = [119.347618103027, 29.7052669525146,
      120.698570251465, 30.5366992950439
    ];
    var projection = new ol.proj.Projection({
      code: 'EPSG:4490',
      units: 'degrees',
      axisOrientation: 'neu',
      global: true
    });
    var fullExtent = [118.33968849655, 29.188589472, 120.71408849655, 30.5651894750343];
    var resolutions = [
      0.00549933137239034,
      0.00274966568619517,
      0.00137483284309758,
      0.000687416421548792,
      0.000343708210774396,
      0.000171854105387198,
      8.5927052693599E-05,
      4.29635263467995E-05,
      2.14817631733998E-05,
      1.07408815866999E-05,
      5.37044079334994E-06,
      2.68522039667497E-06,
      1.34261019833748E-06,
    ];
    var tileGrid = new ol.tilegrid.TileGrid({
      tileSize: 256,
      origin: [118.122911693886, 31.2869311022836],
      extent: fullExtent,
      resolutions: resolutions
    });
    // ol.source.XYZ添加瓦片地图的层
    var tileLayer = new ol.layer.Tile({
      source: new ol.source.XYZ({
        tileGrid: tileGrid,
        tileUrlFunction: function (tileCoord) {
          var z = tileCoord[0];
          var x = tileCoord[1];
          var y = (-tileCoord[2] - 1);
          var url = 'http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/hzsyvector/Mapserver/tile/' +
            z + '/' + y + '/' + x;
          console.log(url);
          return url;
        },
        projection: 'EPSG:4490'
      })
    });
    var untiled = new ol.layer.Image({
      source: new ol.source.ImageWMS({
        ratio: 1,
        //url: 'http://126.10.2.27:8080/geoserver/gpserver/wms',
        url: 'http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/lsyt_dmdz_qxbj0619/MapServer/wms?',
        params: {
          'FORMAT': format,
          'VERSION': '1.1.1',
          "LAYERS": 'lsyt_dmdz_qxbj0619',
          "exceptions": 'application/vnd.ogc.se_inimage',
        }
      })
    });
    var map = new ol.Map({
      target: 'map',
      layers: [
        tileLayer,
        untiled
      ],
      view: new ol.View({
        projection: projection
      })
    });
    map.getView().fit(bounds, map.getSize()); //非常重要
  \</script>
\</body>
\</html>
```



####  矢量图层（wfs）

```html
\<!DOCTYPE html>
\<html>
\<head>
  \<meta charset="UTF-8" />
  \<title>添加WFS电子地图\</title>
  \<link rel="stylesheet" href="http://172.18.109.232:8082/openlayer/v3.20.1/css/ol.css" type="text/css" />
  \<script src="http://172.18.109.232:8082/openlayer/v3.20.1/build/ol.js">\</script>
\</head>
\<body>
  \<div id="map" class="map">\</div>
  \<script>
    var format = "image/png";
    var bounds = [
      119.347618103027,
      29.7052669525146,
      120.698570251465,
      30.5366992950439,
    ];
    var projection = new ol.proj.Projection({
      code: "EPSG:4490",
      units: "degrees",
      axisOrientation: "neu",
      global: true,
    });
    var fullExtent = [
      118.33968849655,
      29.188589472,
      120.71408849655,
      30.5651894750343,
    ];
    var resolutions = [
      0.00549933137239034,
      0.00274966568619517,
      0.00137483284309758,
      0.000687416421548792,
      0.000343708210774396,
      0.000171854105387198,
      8.5927052693599e-5,
      4.29635263467995e-5,
      2.14817631733998e-5,
      1.07408815866999e-5,
      5.37044079334994e-6,
      2.68522039667497e-6,
      1.34261019833748e-6,
    ];
    var tileGrid = new ol.tilegrid.TileGrid({
      tileSize: 256,
      origin: [118.122911693886, 31.2869311022836],
      extent: fullExtent,
      resolutions: resolutions,
    });
    // ol.source.XYZ添加瓦片地图的层
    var tileLayer = new ol.layer.Tile({
      source: new ol.source.XYZ({
        tileGrid: tileGrid,
        tileUrlFunction: function (tileCoord) {
          var z = tileCoord[0];
          var x = tileCoord[1];
          var y = -tileCoord[2] - 1;
          var url =
            "http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/hzsyvector/Mapserver/tile/" +
            z +
            "/" +
            y +
            "/" +
            x;
          //console.log(url);
          return url;
        },
        projection: "EPSG:4490",
      }),
    });
    var vectorSource = new ol.source.Vector({
      format: new ol.format.GeoJSON(),
      url: function (extent) {
        return "http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/lsyt_dmdz_qxbj0619/MapServer/wfs?service=wfs&version=1.0.0&request=getfeature&typename=lsyt_dmdz_qxbj0619&outputFormat=application/json";
      },
      //strategy: bboxStrategy,
    });
    var vector = new ol.layer.Vector({
      source: vectorSource,
      style: new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: "rgba(0, 0, 255, 1.0)",
          width: 2,
        }),
      }),
    });
    var map = new ol.Map({
      target: "map",
      layers: [tileLayer, vector],
      view: new ol.View({
        projection: projection,
      }),
    });
    map.getView().fit(bounds, map.getSize()); //非常重要
  \</script>
\</body>
\</html>
```



### 查询

####  点查询 

```html
\<!DOCTYPE html>
\<html>
\<head>
  \<meta charset="UTF-8" />
  \<title>点查询\</title>
  \<link rel="stylesheet" href="http://172.18.109.232:8082/openlayer/v3.20.1/css/ol.css" type="text/css" />
  \<script src="http://172.18.109.232:8082/openlayer/v3.20.1/build/ol.js">\</script>
  \<script src="http://172.18.109.232:8082/jquery/jquery.js">\</script>
\</head>
\<body>
  \<div id="map" class="map">\</div>
  \<script>
    var format = "image/png";
    var bounds = [
      119.347618103027,
      29.7052669525146,
      120.698570251465,
      30.5366992950439,
    ];
    var projection = new ol.proj.Projection({
      code: "EPSG:4490",
      units: "degrees",
      axisOrientation: "neu",
      global: true,
    });
    var fullExtent = [
      118.33968849655,
      29.188589472,
      120.71408849655,
      30.5651894750343,
    ];
    var resolutions = [
      0.00549933137239034,
      0.00274966568619517,
      0.00137483284309758,
      0.000687416421548792,
      0.000343708210774396,
      0.000171854105387198,
      8.5927052693599e-5,
      4.29635263467995e-5,
      2.14817631733998e-5,
      1.07408815866999e-5,
      5.37044079334994e-6,
      2.68522039667497e-6,
      1.34261019833748e-6,
    ];
    var tileGrid = new ol.tilegrid.TileGrid({
      tileSize: 256,
      origin: [118.122911693886, 31.2869311022836],
      extent: fullExtent,
      resolutions: resolutions,
    });
    // ol.source.XYZ添加瓦片地图的层
    var tileLayer = new ol.layer.Tile({
      source: new ol.source.XYZ({
        tileGrid: tileGrid,
        tileUrlFunction: function (tileCoord) {
          var z = tileCoord[0];
          var x = tileCoord[1];
          var y = -tileCoord[2] - 1;
          var url =
            "http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/hzsyvector/Mapserver/tile/" +
            z +
            "/" +
            y +
            "/" +
            x;
          //console.log(url);
          return url;
        },
        projection: "EPSG:4490",
      }),
    });
    var vectorSource = new ol.source.Vector({
      format: new ol.format.GeoJSON(),
      url: function (extent) {
        return "http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/lsyt_dmdz_qxbj0619/MapServer/wfs?service=wfs&version=1.0.0&request=getfeature&typename=lsyt_dmdz_qxbj0619&outputFormat=application/json";
      },
      //strategy: bboxStrategy,
    });
    var vector = new ol.layer.Vector({
      source: vectorSource,
      style: new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: "rgba(0, 0, 255, 1.0)",
          width: 2,
        }),
      }),
    });
    var map = new ol.Map({
      target: "map",
      layers: [tileLayer, vector],
      view: new ol.View({
        projection: projection,
      }),
    });
    map.getView().fit(bounds, map.getSize()); //非常重要
    map.on("click", function (e) {
      var location = e.coordinate;
      var point = location[0] + "," + location[1] + "," + location[0] + "," + location[1];// "120.16271670916996,30.251675868508478,120.1713094144393,30.25591314629446";
      var qurl =
        "http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/lsyt_dmdz_qxbj0619/MapServer/wfs?service=wfs&version=1.0.0&request=getfeature&typename=lsyt_dmdz_qxbj0619&outputFormat=application/json&CQL_FILTER=BBOX(geom," + point + ")";
      $.ajax({
        url: qurl,
        success: function (data) {
          console.log(data);
          var text = JSON.parse(data);
          alert("You clicked the map at " + text.features[1].properties['quxian']);
        }
      });
    });
  \</script>
\</body>
\</html>
```

####  面查询

```html
\<!DOCTYPE html>
\<html>
\<head>
  \<meta charset="UTF-8" />
  \<title>框选查询\</title>
  \<link rel="stylesheet" href="http://172.18.109.232:8082/openlayer/v3.20.1/css/ol.css" type="text/css" />
  \<script src="http://172.18.109.232:8082/openlayer/v3.20.1/build/ol.js">\</script>
  \<script src="http://172.18.109.232:8082/jquery/jquery.js">\</script>
\</head>
\<body>
  \<div id="map" class="map">\</div>
  \<script>
    var format = "image/png";
    var bounds = [
      119.347618103027,
      29.7052669525146,
      120.698570251465,
      30.5366992950439,
    ];
    var projection = new ol.proj.Projection({
      code: "EPSG:4490",
      units: "degrees",
      axisOrientation: "neu",
      global: true,
    });
    var fullExtent = [
      118.33968849655,
      29.188589472,
      120.71408849655,
      30.5651894750343,
    ];
    var resolutions = [
      0.00549933137239034,
      0.00274966568619517,
      0.00137483284309758,
      0.000687416421548792,
      0.000343708210774396,
      0.000171854105387198,
      8.5927052693599e-5,
      4.29635263467995e-5,
      2.14817631733998e-5,
      1.07408815866999e-5,
      5.37044079334994e-6,
      2.68522039667497e-6,
      1.34261019833748e-6,
    ];
    var tileGrid = new ol.tilegrid.TileGrid({
      tileSize: 256,
      origin: [118.122911693886, 31.2869311022836],
      extent: fullExtent,
      resolutions: resolutions,
    });
    // ol.source.XYZ添加瓦片地图的层
    var tileLayer = new ol.layer.Tile({
      source: new ol.source.XYZ({
        tileGrid: tileGrid,
        tileUrlFunction: function (tileCoord) {
          var z = tileCoord[0];
          var x = tileCoord[1];
          var y = -tileCoord[2] - 1;
          var url =
            "http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/hzsyvector/Mapserver/tile/" +
            z +
            "/" +
            y +
            "/" +
            x;
          //console.log(url);
          return url;
        },
        projection: "EPSG:4490",
      }),
    });
    var vectorSource = new ol.source.Vector({
      format: new ol.format.GeoJSON(),
      url: function (extent) {
        return "http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/lsyt_dmdz_qxbj0619/MapServer/wfs?service=wfs&version=1.0.0&request=getfeature&typename=lsyt_dmdz_qxbj0619&outputFormat=application/json";
      },
      //strategy: bboxStrategy,
    });
    var vector = new ol.layer.Vector({
      source: vectorSource,
      style: new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: "rgba(0, 0, 255, 1.0)",
          width: 2,
        }),
      }),
    });
    var map = new ol.Map({
      target: "map",
      layers: [tileLayer, vector],
      view: new ol.View({
        projection: projection,
      }),
    });
    map.getView().fit(bounds, map.getSize()); //非常重要
    var dragbox = new ol.interaction.DragBox();
    map.addInteraction(dragbox);
    dragbox.on("boxend", function () {
      var extent = dragbox.getGeometry().getExtent();
      var point = extent[0] + "," + extent[1] + "," + extent[0] + "," + extent[1];// "120.16271670916996,30.251675868508478,120.1713094144393,30.25591314629446";
      var qurl =
        "http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/lsyt_dmdz_qxbj0619/MapServer/wfs?service=wfs&version=1.0.0&request=getfeature&typename=lsyt_dmdz_qxbj0619&outputFormat=application/json&CQL_FILTER=BBOX(geom," + point + ")";
      $.ajax({
        url: qurl,
        success: function (data) {
          console.log(data);
          var text = JSON.parse(data);
          alert("You clicked the map at " + text.features[0].properties['quxian']);
        }
      });
    })
  \</script>
\</body>
\</html>
```

 

 

####  属性查询

```html
\<!DOCTYPE html>
\<html>
\<head>
  \<meta charset="UTF-8" />
  \<title>属性查询\</title>
  \<link rel="stylesheet" href="http://172.18.109.232:8082/openlayer/v3.20.1/css/ol.css" type="text/css" />
  \<script src="http://172.18.109.232:8082/openlayer/v3.20.1/build/ol.js">\</script>
  \<script src="http://172.18.109.232:8082/jquery/jquery.js">\</script>
\</head>
\<body>
  \<div id="map" class="map">\</div>
  \<script>
    var format = "image/png";
    var bounds = [
      119.347618103027,
      29.7052669525146,
      120.698570251465,
      30.5366992950439,
    ];
    var projection = new ol.proj.Projection({
      code: "EPSG:4490",
      units: "degrees",
      axisOrientation: "neu",
      global: true,
    });
    var fullExtent = [
      118.33968849655,
      29.188589472,
      120.71408849655,
      30.5651894750343,
    ];
    var resolutions = [
      0.00549933137239034,
      0.00274966568619517,
      0.00137483284309758,
      0.000687416421548792,
      0.000343708210774396,
      0.000171854105387198,
      8.5927052693599e-5,
      4.29635263467995e-5,
      2.14817631733998e-5,
      1.07408815866999e-5,
      5.37044079334994e-6,
      2.68522039667497e-6,
      1.34261019833748e-6,
    ];
    var tileGrid = new ol.tilegrid.TileGrid({
      tileSize: 256,
      origin: [118.122911693886, 31.2869311022836],
      extent: fullExtent,
      resolutions: resolutions,
    });
    // ol.source.XYZ添加瓦片地图的层
    var tileLayer = new ol.layer.Tile({
      source: new ol.source.XYZ({
        tileGrid: tileGrid,
        tileUrlFunction: function (tileCoord) {
          var z = tileCoord[0];
          var x = tileCoord[1];
          var y = -tileCoord[2] - 1;
          var url =
            "http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/hzsyvector/Mapserver/tile/" +
            z +
            "/" +
            y +
            "/" +
            x;
          //console.log(url);
          return url;
        },
        projection: "EPSG:4490",
      }),
    });
    var vectorSource = new ol.source.Vector({
      format: new ol.format.GeoJSON(),
      url: function (extent) {
        return "http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/lsyt_dmdz_qxbj0619/MapServer/wfs?service=wfs&version=1.0.0&request=getfeature&typename=lsyt_dmdz_qxbj0619&outputFormat=application/json";
      },
      //strategy: bboxStrategy,
    });
    var vector = new ol.layer.Vector({
      source: vectorSource,
      style: new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: "rgba(0, 0, 255, 1.0)",
          width: 2,
        }),
      }),
    });
    var map = new ol.Map({
      target: "map",
      layers: [tileLayer, vector],
      view: new ol.View({
        projection: projection,
      }),
    });
    map.getView().fit(bounds, map.getSize()); //非常重要
    map.on("click", function (e) {
      var location = e.coordinate;
      var point = location[0] + "," + location[1] + "," + location[0] + "," + location[1];// "120.16271670916996,30.251675868508478,120.1713094144393,30.25591314629446";
      var qurl =
        "http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/lsyt_dmdz_qxbj0619/MapServer/wfs?service=wfs&version=1.0.0&request=getfeature&typename=lsyt_dmdz_qxbj0619&outputFormat=application/json&CQL_FILTER=";
      qurl += " quxian='上城区'";
      $.ajax({
        url: qurl,
        success: function (data) {
          console.log(data);
          var text = JSON.parse(data);
          alert("根据属性选择的是" + text.features[0].properties['quxian']);
        }
      });
    });
  \</script>
\</body>
\</html>
```

####  组合查询

```html
\<!DOCTYPE html>
\<html>
\<head>
  \<meta charset="UTF-8" />
  \<title>组合查询\</title>
  \<link rel="stylesheet" href="http://172.18.109.232:8082/openlayer/v3.20.1/css/ol.css" type="text/css" />
  \<script src="http://172.18.109.232:8082/openlayer/v3.20.1/build/ol.js">\</script>
  \<script src="http://172.18.109.232:8082/jquery/jquery.js">\</script>
\</head>
\<body>
  \<div id="map" class="map">\</div>
  \<script>
    var format = "image/png";
    var bounds = [
      119.347618103027,
      29.7052669525146,
      120.698570251465,
      30.5366992950439,
    ];
    var projection = new ol.proj.Projection({
      code: "EPSG:4490",
      units: "degrees",
      axisOrientation: "neu",
      global: true,
    });
    var fullExtent = [
      118.33968849655,
      29.188589472,
      120.71408849655,
      30.5651894750343,
    ];
    var resolutions = [
      0.00549933137239034,
      0.00274966568619517,
      0.00137483284309758,
      0.000687416421548792,
      0.000343708210774396,
      0.000171854105387198,
      8.5927052693599e-5,
      4.29635263467995e-5,
      2.14817631733998e-5,
      1.07408815866999e-5,
      5.37044079334994e-6,
      2.68522039667497e-6,
      1.34261019833748e-6,
    ];
    var tileGrid = new ol.tilegrid.TileGrid({
      tileSize: 256,
      origin: [118.122911693886, 31.2869311022836],
      extent: fullExtent,
      resolutions: resolutions,
    });
    // ol.source.XYZ添加瓦片地图的层
    var tileLayer = new ol.layer.Tile({
      source: new ol.source.XYZ({
        tileGrid: tileGrid,
        tileUrlFunction: function (tileCoord) {
          var z = tileCoord[0];
          var x = tileCoord[1];
          var y = -tileCoord[2] - 1;
          var url =
            "http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/hzsyvector/Mapserver/tile/" +
            z +
            "/" +
            y +
            "/" +
            x;
          //console.log(url);
          return url;
        },
        projection: "EPSG:4490",
      }),
    });
    var vectorSource = new ol.source.Vector({
      format: new ol.format.GeoJSON(),
      url: function (extent) {
        return "http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/lsyt_dmdz_qxbj0619/MapServer/wfs?service=wfs&version=1.0.0&request=getfeature&typename=lsyt_dmdz_qxbj0619&outputFormat=application/json";
      },
      //strategy: bboxStrategy,
    });
    var vector = new ol.layer.Vector({
      source: vectorSource,
      style: new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: "rgba(0, 0, 255, 1.0)",
          width: 2,
        }),
      }),
    });
    var map = new ol.Map({
      target: "map",
      layers: [tileLayer, vector],
      view: new ol.View({
        projection: projection,
      }),
    });
    map.getView().fit(bounds, map.getSize()); //非常重要
    map.on("click", function (e) {
      var location = e.coordinate;
      var point = location[0] + "," + location[1] + "," + location[0] + "," + location[1];// "120.16271670916996,30.251675868508478,120.1713094144393,30.25591314629446";
      var qurl =
        "http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/lsyt_dmdz_qxbj0619/MapServer/wfs?service=wfs&version=1.0.0&request=getfeature&typename=lsyt_dmdz_qxbj0619&outputFormat=application/json&CQL_FILTER=BBOX(geom," + point + ")";
      qurl += " and quxian='上城区'";
      $.ajax({
        url: qurl,
        success: function (data) {
          console.log(data);
          var text = JSON.parse(data);
          if (!text.features.length) {
            alert("你选择的是非上城区，无查询结果！");
          } else {
            alert("你选择的是 " + text.features[0].properties["quxian"]);
          }
        }
      });
    });
  \</script>
\</body>
\</html>
```

 

# Cygwin

windows使用linux环境（部分机型失败）

# [Tippecanoe](https://github.com/mapbox/tippecanoe)

> Tippecanoe是Mapbox的一个开源切片工具，项目地址：[https://github.com/mapbox/tippecanoe](https://www.oschina.net/action/GoToLink?url=https%3A%2F%2Fgithub.com%2Fmapbox%2Ftippecanoe)，Mapbox常规的切片方法tilelive-copy参见[另一篇博客](https://www.oschina.net/action/GoToLink?url=http%3A%2F%2Fblog.csdn.net%2Fwan_yanyan528%2Farticle%2Fdetails%2F69266362)。Tippecanoe主要在处理大数据量时有很大的优势，具有很高的效率，并且有很多参数可以控制。Tippecanoe只能处理GeoJSON，因此在切片前需要将矢量数据转换为GeoJSON，推荐使用ogr2ogr工具转换。切片以后的格式为mbtiles，可自行导入mongodb等数据库。 
>
> 目的：根据你的数据创造一个可自由缩放的视图 

引用地址：https://my.oschina.net/u/1464512/blog/1631972

####  [常用tippecanoe参数设置](https://blog.csdn.net/u012539364/article/details/107068474/)

# GEOJSON



# [GeoSever](http://geoserver.org/)

 GeoServer是OGC Web服务器规范的J2EE实现，利用GeoServer可以方便地发布地图数据，允许用户对特征数据进行更新、删除、插入操作，通过GeoServer可以比较容易地在用户之间迅速共享空间地理信息。GeoServer是开源软件。

  GeoServer主要包含如下一些特点：

- 兼容WMS和WFS特性

- 支持PostGIS、Shapefile、ArcSDE、Oracle、VPF、MySQL、MapInfo

- 支持上百种投影

- 能够将网络地图输出为JPEG、GIF、PNG、SVG、KML等格式

- 能够运行在任何基于J2EE/Servlet容器之上

- 嵌入MapBuilder支持AJAX的地图客户端OpenLayers

> [引用地址](https://blog.csdn.net/qq_35732147/article/details/81869864)



# WMS && WFS

WMS是由服务器将一地图图像发送给客户端，而WFS是服务器将矢量数据发送给客户端，也就是在使用WMS时地图由服务器绘制，在使用WFS时地图由客户端绘制。

## WMS

### 1.2.1 WMS服务简介

Web Map Service（网络地图服务），简称WMS，由开放地理信息联盟（Open GeoSpatial Consortium，OGC）制定。该规范定义了Web客户端从网络地图服务器获取地图的接口标准。一个WMS可以动态地生成具有地理参考数据的地图，这些地图通常用GIF、JPEG或PNG等图像格式等，使用者通过指定的参数获取相应的地图图片。

### 1.2.2 服务操作列表

WMS实现规范由三个基础性操作协议(GetCapabilities，GetMap和GetFeatureInfo)组成，这些协议共同构成了利用WMS创建和叠加显示不同来源的远程异构地图服务的基础。WMS服务操作列表见下表所示。 

| 操作            | 实现要求 | 描述                                                         |
| --------------- | -------- | ------------------------------------------------------------ |
| GetCapabilities | 强制实现 | 暂关闭                                                       |
| GetMap          | 强制实现 | 获取地图图片。该操作根据客户端发出的请求参数在服务端进行检索，服务器端返回一个地图图像，其地理空间参数和大小参数是已经明确定义的，返回的地图图像可以是GIF、JPEG、PNG或SVG格式。 |
| GetFeatureInfo  | 选择实现 |                                                              |

### 1.2.3服务操作的参数列表

| 参数名称 | 参数个数     | 参数类型和值                                    |
| -------- | ------------ | ----------------------------------------------- |
| service  | 1个(必选)    | 字符类型，服务类型值为“WMS”                     |
| request  | 1个(必选)    | 字符类型，请求的操作名称，值为“GetCapabilities” |
| version  | 0或1个(可选) | 字符类型，值为请求的WMS的版本号                 |
| format   | 0或1个(可选) | MIME类型，值为服务元数据的输出格式              |

GetMap操作请求方法实现参数

| 参数名称    | 参数个数     | 参数类型和值                                                 |
| ----------- | ------------ | ------------------------------------------------------------ |
| service     | 1个(必选)    | 字符类型，服务类型标识值为“WMS”                              |
| request     | 1个(必选)    | 字符类型，值为“GetMap”                                       |
| version     | 1个(必选)    | 字符类型，值为请求的WMS的版本号                              |
| layers      | 1个(必选)    | 字符类型，值为一个或多个地图图层列表，多个图层之间用”,”隔开  |
| styles      | 1个(必选)    | 字符类型，值为请求图层的地图渲染样式                         |
| CRS         | 1个(必选)    | 字符类型，值为坐标参照系统                                   |
| BBOX        | 1个(必选)    | Wkt格式，值为某个CRS下的地图边界范围的坐标序列               |
| width       | 1个(必选)    | 整型类型，值为地图图片的像素宽度                             |
| height      | 1个(必选)    | 整型类型，值为地图图片的像素高度                             |
| format      | 1个(必选)    | 字符类型，值为地图的输出格式                                 |
| transparent | 0或1个(可选) | 字符类型，值为true或者false，用来表示地图图层是否透明(默认情况下是不透明的) |
| filter      | 0或1个(可选) | 请求要素的过滤条件                                           |

### 1.2.4 接口调用示例

| 实例名称        | 调用实例                                                     |
| --------------- | ------------------------------------------------------------ |
| GetCapabilities | 暂关闭                                                       |
| GetMap          | http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/lsyt_dmdz_csbj0619/MapServer/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&LAYERS=gpserver%3Alsyt_dmdz_csbj0619&CQL_FILTER=quxian%3D%27%E6%BB%A8%E6%B1%9F%E5%8C%BA%27&SRS=EPSG%3A4490&STYLES=&WIDTH=768&HEIGHT=546&BBOX=120.05413055419922%2C30.084686279296875%2C120.31780242919922%2C30.272140502929688 |

## WFS

### 1.3.1 WFS服务简介

Web Feature Service（网络要素服务），简称WFS，由开放地理信息联盟（Open GeoSpatial Consortium，OGC）制定。该规范主要对OpenGIS简单要素的数据编辑操作进行规范，从而使服务器端和客户端能够在要素层面进行“通讯”。其返回结果的是XML格式的WFS服务元数据文档，通过该文档用户能够了解：WFS服务器支持的所有操作操作列表，GetFeature操作返回的数据格式，可用的坐标参照系统列表，操作异常信息的列表，WFS服务提供商的相关信息，WFS服务器的可用要素类列表等。

### 1.3.2 服务操作列表

WFS服务接口规范定义了GetCapabilities，DescribeFeatureType、GetFeature、Transaction等操作。其中GetCapabilities，DescribeFeatureType和GetFeature为必须实现的操作，也即只要实现了这三个操作的服务均可称为WFS服务。WFS的操作见下表所示。 

| 操作                | 实现要求 | 描述                                                         |
| ------------------- | -------- | ------------------------------------------------------------ |
| GetCapabilities     | 强制实现 | GetCapabilities请求用于查询WFS服务的能力信息，包括支持的操作、支持的格式、空间坐标、包含的资源等。它主要的目的是使客户端在使用GetFeature请求前可以对WFS服务有一个基本的了解，从而可以设置正确的参数。 |
| DescribeFeatureType | 强制实现 | 用于生成一个 Schema 描述，该 Schema 描述了 WFS 服务提供的要素类型（Feature Type），以及要素类型的结构信息。该 Schema 还定义了 WFS 服务所期望的要素实例在输入时如何编码以及输出时如何生成要素实例。 |
| GetFeature          | 强制实现 | GetFeature用于向WFS的客户端程序提供查询特定地理信息的能力，通过GetFeature操作可以由指定的属性条件、空间条件或者两者叠加的条件进行空间查询。 |
| Transaction         | 选择实现 | 允许Transaction操作，使客户端可对服务器端所提供的地图要素类执插入，更新，删除等命令 |

### 1.3.3服务操作的参数列表

GetCapabilities操作请求方法实现参数

 

| 参数名称 | 参数个数     | 参数类型和值                                    |
| -------- | ------------ | ----------------------------------------------- |
| service  | 1个(必选)    | 字符类型，服务类型值为“WFS”                     |
| request  | 1个(必选)    | 字符类型，请求的操作名称，值为“GetCapabilities” |
| versions | 0或1个(可选) | 字符类型，值为请求的WFS的版本号                 |

DescribeFeatureType操作请求方法实现参数

| 参数名称     | 参数个数     | 参数类型和值                                                 |
| ------------ | ------------ | ------------------------------------------------------------ |
| service      | 1个(必选)    | 字符类型，服务类型值为“WFS”                                  |
| request      | 1个(必选)    | 字符类型，请求的操作名称，值为“DescribeFeatureType”          |
| typeName     | 0或1个(可选) | 字符类型，值为要素类型的列表，多个值之间用“，”隔开，默认解析包括的全部要素类型 |
| outputFormat | 0或1个(可选) | MIME类型，值为输出格式                                       |

GetFeature操作请求方法实现参数

| 参数名称       | 参数个数     | 参数类型和值                                                 |
| -------------- | ------------ | ------------------------------------------------------------ |
| service        | 1个(必选)    | 字符类型，服务类型标识值为“WFS”                              |
| request        | 1个(必选)    | 字符类型，请求的操作值为“GetFeature”                         |
| typeName       | 1个(必选)    | 字符类型，值为请求的要素类型的名称，多个名称之间用“，”隔开   |
| version        | 0或1个(可选) | 字符类型，值为请求的WFS的版本号                              |
| outputFormat   | 0或1个(可选) | MIME类型，值为输出格式                                       |
| resultType     | 0或1个(可选) | 字符类型，值为请求的结果类型                                 |
| propertyName   | 0或1个(可选) | 字符类型，值为请求要素的属性名，多个值之间用“，”隔开         |
| featureVersion | 0或1个(可选) | 字符类型，值为要素的版本，值为ALL返回请求的要素的所有版本，没有值默认为返回请求要素的最新版本 |
| maxFeature     | 0或1个(可选) | 整型类型，值为请求要素的最大数，默认值为满足查询的所有结果集 |
| expiry         | 0或1个(可选) | 数字类型，要素被锁定的时间                                   |
| SRSName        | 0或1个(可选) | 字符类型，值为坐标系统名                                     |
| featureID      | 0或1个(可选) | 字符类型，值为要素的ID，多个ID之间用“，”隔开                 |
| filter         | 0或1个(可选) | 请求要素的过滤条件                                           |
| bBox           | 0或1个(可选) | Wkt格式，请求指定要素查询范围，可以替代featureId和filter参数 |

### 1.3.4 接口调用示例

| 实例名称            | 调用实例                                                     |
| ------------------- | ------------------------------------------------------------ |
| GetCapabilities     | http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/lsyt_dmdz_csbj0619/MapServer/wfs?service=wfs&version=1.1.0&request=getcapabilities |
| DescribeFeatureType | http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/lsyt_dmdz_qxbj0619/MapServer/wfs?service=wfs&version=1.1.0&request=describefeaturetype&typename=lsyt_dmdz_csbj0619 |
| GetFeature          | http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/lsyt_dmdz_csbj0619/MapServer/wfs?service=wfs&version=1.1.0&request=getfeature&typename=lsyt_dmdz_csbj0619&outputFormat=json&CQL_FILTER=zhenjie=%27%E9%97%B2%E6%9E%97%E8%A1%97%E9%81%93%27 |

# WMTS

## WMTS

### 1.1 WMTS服务简介

​		Web Map Tile Service（网络地图瓦片服务），简称WMTS，由开放地理信息联盟（Open GeoSpatial Consortium，OGC）制定，是和WMS并列的重要OGC规范之一。WMTS标准定义了一些操作，这些操作允许用户访问切片地图，是OGC首个支持RESTful访问的服务标准。WMTS不同于WMS,它最重要的特征是采用缓存技术能够缓解WebGIS服务器端数据处理的压力，提高交互响应速度，大幅改善在线地图应用客户端的用户体验。WMTS是OGC主推的缓存技术规范，是目前各种缓存技术相互兼容的一种方法。

WMTS的切片坐标系统和其组织方式可参考下图：

![这里写图片描述](http://qnimg.gisfsde.com/work/clip_image001.png)

### 1.2 服务操作列表

WMTS服务支持RESTful访问，其接口包括GetCapabilities、GetTile和GetFeatureInfo3个操作，这些操作允许用户访问切片地图。

| 操作            | 操作     | 描述                                                         |
| --------------- | -------- | ------------------------------------------------------------ |
| GetCapabilities | 强制实现 | 获取WMTS的能力文档（即元数据文档），里面包含服务的信息       |
| GetTile         | 强制实现 | 该操作根据客户端发出的请求参数在服务端进行检索，服务器端返回地图瓦片图像 |
| GetFeatureInfo  | 选择实现 |                                                              |

### 1.3 服务操作的参数列表

GetCapabilities操作请求方法实现参数

| 参数名称 | 参数个数  | 参数类型和值                                    |
| -------- | --------- | ----------------------------------------------- |
| service  | 1个(必选) | 字符类型，服务类型值为“WMTS”                    |
| request  | 1个(必选) | 字符类型，请求的操作名称，值为“GetCapabilities” |

GetTile操作请求方法实现参数

| 参数名称      | 参数个数  | 参数类型和值                                           |
| ------------- | --------- | ------------------------------------------------------ |
| service       | 1个(必选) | 字符类型，服务类型标识值为“WMTS”                       |
| request       | 1个(必选) | 字符类型，请求的操作值为“GetTile”                      |
| version       | 1个(必选) | 字符类型，值为请求的WMTS的版本号                       |
| layer         | 1个(必选) | 字符类型，值为请求的图层名称                           |
| style         | 1个(必选) | 字符类型，值为请求图层的渲染样式                       |
| format        | 1个(必选) | 字符类型，值为瓦片地图的输出格式                       |
| tileMatrixSet | 1个(必选) | 字符类型，瓦片矩阵数据集，其值在服务的元数据文档中指定 |
| tileMatrix    | 1个(必选) | 字符类型，瓦片矩阵，其值在服务的元数据文档中指定       |
| tileRow       | 1个(必选) | 整型类型，值为大于0的整数，表示瓦片矩阵的行号          |
| tileCol       | 1个(必选) | 整型类型，值为大于0的整数，表示瓦片矩阵的列号          |

 

### 1.4接口调用示例

| 实例名称            | 调用实例                                                     |
| ------------------- | ------------------------------------------------------------ |
| GetCapabilities操作 | http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/hzsyvector/Mapserver/WMTS?service=wmts&request=GetCapabilities |
| GetTile操作         | http://172.18.109.232:8080/68DE38F71E38CD8C508FAB3035752EA8ED8F9221EDE18FDBE593B01FCDD12BD296F09FE27CD7D2733AD075EAF994851B/PBS/rest/services/hzsyvector/Mapserver/WMTS?service=wmts&request=getTile&version=1.0.0&layer=hzsyvector&Style=&tilematrixset=hzsyvector&tilematrix=3&tilerow=5&tilecol=7&format=png  **** |







