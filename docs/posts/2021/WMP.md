---
index: 2
icon: markdown
title: 微信小程序
date: 2022-06-06
category:
  - 微信小程序
tag:
  - 微信小程序
---

- 微信小程序指南

<!-- more -->

# 常用函数

## 跳转

```js
wx.navigateTo({
      url: '../component/L-component'
    })
```



# 简介

前端，后端任意，上线需配置域名。

**WeixinJSBridge**对内---》

**JS-SDK**，前者包装，对内转对外---》

**小程序**，逻辑层和渲染层是分开的，逻辑层运行在 JSCore 中，并没有一个完整浏览器对象，因而缺少相关的DOM API和BOM API。导致无法运行常用前端库jQuery、 Zepto 等， JSCore 的环境同 NodeJS 环境也是不尽相同，所以一些 NPM 的包在小程序中也是无法运行的。

**初始过程：**申请小程序账号(管理小程序，获取AppID)，安装小程序开发工具、配置项目

# 结构

![image-20211018145101111](http://qnimg.gisfsde.com/work/image-20211018145101111.png)

## app.json  

全局配置，包括了小程序的所有页面路径、界面表现、网络超时时间、底部 tab 



```
{
  // 描述当前小程序所有页面路径，这是为了让微信客户端知道当前你的小程序页面定义在哪个目录。
  "pages":[
    "pages/index/index",
    "pages/logs/logs"
  ],
  // 定义小程序所有页面的顶部背景颜色，文字颜色定义等。
  "window":{
    "backgroundTextStyle":"light",
    "navigationBarBackgroundColor": "#fff",
    "navigationBarTitleText": "Weixin",
    "navigationBarTextStyle":"black"
  },
  "style": "v2",
  "sitemapLocation": "sitemap.json"
}

```

## project.config.json 

小程序开发者工具个性化配置，界面颜色、编译配置等等

## page.json

表示 pages/logs 目录下的 `logs.json` 这类和小程序页面相关的配置。独立定义每个页面的一些属性

页面中配置项会覆盖 `app.json` 的 `window` 中相同的配置项

## index.**wxml**

WXML（WeiXin Markup Language），

```html
数据绑定
<!--wxml-->
\<view> {{message}} \</view>
// page.js
Page({
  data: {
    message: 'Hello MINA!'
  }
})
列表渲染
<!--wxml-->
\<view wx:for="{{array}}"> {{item}} \</view>
// page.js
Page({
  data: {
    array: [1, 2, 3, 4, 5]
  }
})
条件渲染
<!--wxml-->
\<view wx:if="{{view == 'WEBVIEW'}}"> WEBVIEW \</view>
\<view wx:elif="{{view == 'APP'}}"> APP \</view>
\<view wx:else="{{view == 'MINA'}}"> MINA \</view>
// page.js
Page({
  data: {
    view: 'MINA'
  }
})
模板
<!--wxml-->
\<template name="staffName">
  \<view>
    FirstName: {{firstName}}, LastName: {{lastName}}
  \</view>
\</template>

\<template is="staffName" data="{{...staffA}}">\</template>
\<template is="staffName" data="{{...staffB}}">\</template>
\<template is="staffName" data="{{...staffC}}">\</template>
// page.js
Page({
  data: {
    staffA: {firstName: 'Hulk', lastName: 'Hu'},
    staffB: {firstName: 'Shang', lastName: 'You'},
    staffC: {firstName: 'Gideon', lastName: 'Lin'}
  }
})
```

## index.wxss

CSS,仅支持部分 `CSS` 选择器,新增了尺寸单位,提供了全局的样式[app.wxss]和局部样式

## .js

逻辑层

![img](http://qnimg.gisfsde.com/work/4-1.ad156d1c.png)

除此之外，只有后缀名在白名单内的文件可以被上传，不在白名单列表内文件在开发工具能被访问到，但无法被上传。具体白名单列表如下：

1. wxs
2. png
3. jpg
4. jpeg
5. gif
6. svg
7. json
8. cer
9. mp3
10. aac
11. m4a
12. mp4
13. wav
14. ogg
15. silk
16. wasm
17. br

# 基础

## 场景值：

描述用户进入小程序的路径，目前还无法获取到按 Home 键退出到桌面，然后从桌面再次进小程序的场景值，对于这种情况，会保留上一次的场景值。

获取方式：`onLaunch` 和 `onShow`，[wx.getLaunchOptionsSync](https://developers.weixin.qq.com/miniprogram/dev/api/base/app/life-cycle/wx.getLaunchOptionsSync.html)

| 场景值 | 场景                            | appId含义  |
| :----- | :------------------------------ | :--------- |
| 1020   | 公众号 profile 页相关小程序列表 | 来源公众号 |
| 1035   | 公众号自定义菜单                | 来源公众号 |
| 1036   | App 分享消息卡片                | 来源App    |
| 1037   | 小程序打开小程序                | 来源小程序 |
| 1038   | 从另一个小程序返回              | 来源小程序 |
| 1043   | 公众号模板消息                  | 来源公众号 |

## 逻辑层App Service

`JavaScript` 的基础上，增加一些功能，由于并非运行在浏览器中，window，document等一些web能力无法使用：

- 增加 `App` 和 `Page` 方法，进行[程序注册](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/app.html)和[页面注册](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page.html)。
- 增加 `getApp` 和 `getCurrentPages` 方法，分别用来获取 `App` 实例和当前页面栈。
- 提供丰富的 [API](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/api.html)，如微信用户数据，扫一扫，支付等微信特有能力。
- 提供[模块化](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/module.html#模块化)能力，每个页面有独立的[作用域](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/module.html#文件作用域)。

### 注册小程序

`app.js` 中调用 `App` 方法注册小程序实例，绑定生命周期回调函数、错误监听和页面不存在监听函数等。

```js
整个小程序只有一个 App 实例，是全部页面共享的。开发者可以通过 getApp 方法获取到全局唯一的 App 实例，获取App上的数据或调用开发者注册在 App 上的函数。

// xxx.js
const appInstance = getApp()
console.log(appInstance.globalData) // I am global data
```

### 注册页面

#### Page()

```js
Page({
  data: {
    text: "This is page data."
  },
  onLoad: function(options) {
    // 页面创建时执行
  },
  onShow: function() {
    // 页面出现在前台时执行
  },
  onReady: function() {
    // 页面首次渲染完毕时执行
  },
  onHide: function() {
    // 页面从前台变为后台时执行
  },
  onUnload: function() {
    // 页面销毁时执行
  },
  onPullDownRefresh: function() {
    // 触发下拉刷新时执行
  },
  onReachBottom: function() {
    // 页面触底时执行
  },
  onShareAppMessage: function () {
    // 页面被用户分享时执行
  },
  onPageScroll: function() {
    // 页面滚动时执行
  },
  onResize: function() {
    // 页面尺寸变化时执行
  },
  onTabItemTap(item) {
    // tab 点击时执行
    console.log(item.index)
    console.log(item.pagePath)
    console.log(item.text)
  },
  // 事件响应函数
  viewTap: function() {
    this.setData({
      text: 'Set some data for updating view.'
    }, function() {
      // this is setData callback
    })
  },
  // 自由数据
  customData: {
    hi: 'MINA'
  }
})
```



#### behaviors

> 2.9.2 开始支持,低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)。

 behaviors 可以用来让多个页面有相同的数据字段和方法。

```js
// my-behavior.js
module.exports = Behavior({
  data: {
    sharedText: 'This is a piece of data shared between pages.'
  },
  methods: {
    sharedMethod: function() {
      this.data.sharedText === 'This is a piece of data shared between pages.'
    }
  }
})
// page-a.js
var myBehavior = require('./my-behavior.js')
Page({
  behaviors: [myBehavior],
  onLoad: function() {
    this.data.sharedText === 'This is a piece of data shared between pages.'
  }
})
```

#### Component ()

> 基础库 1.6.3 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)。方法需要放在 `methods: { }` 里面。类似自定义组件，适合**复杂页面**

```js
Component({
  data: {
    text: "This is page data."
  },
  methods: {
    onLoad: function(options) {
      // 页面创建时执行
    },
    onPullDownRefresh: function() {
      // 下拉刷新时执行
    },
    // 事件响应函数
    viewTap: function() {
      // ...
    }
  }
})
```

### 页面生命周期

![img](http://qnimg.gisfsde.com/work/page-lifecycle.2e646c86.png)

### 页面路由

在小程序中所有页面的路由全部由框架进行管理。

#### 页面栈

框架以栈的形式维护了当前的所有页面。 当发生路由切换的时候，页面栈的表现如下：

| 路由方式   | 页面栈表现                        |
| :--------- | :-------------------------------- |
| 初始化     | 新页面入栈                        |
| 打开新页面 | 新页面入栈                        |
| 页面重定向 | 当前页面出栈，新页面入栈          |
| 页面返回   | 页面不断出栈，直到目标返回页      |
| Tab 切换   | 页面全部出栈，只留下新的 Tab 页面 |
| 重加载     | 页面全部出栈，只留下新的页面      |

开发者可以使用 `getCurrentPages()` 函数获取当前页面栈。

#### 路由方式

对于路由的触发方式以及页面生命周期函数如下：

| 路由方式   | 触发时机                                                     | 路由前页面 | 路由后页面         |
| :--------- | :----------------------------------------------------------- | :--------- | :----------------- |
| 初始化     | 小程序打开的第一个页面                                       |            | onLoad, onShow     |
| 打开新页面 | 调用 API [wx.navigateTo](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateTo.html) 使用组件 [``](https://developers.weixin.qq.com/miniprogram/dev/component/navigator.html) | onHide     | onLoad, onShow     |
| 页面重定向 | 调用 API [wx.redirectTo](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.redirectTo.html) 使用组件 [``](https://developers.weixin.qq.com/miniprogram/dev/component/navigator.html) | onUnload   | onLoad, onShow     |
| 页面返回   | 调用 API [wx.navigateBack](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateBack.html) 使用组件[``](https://developers.weixin.qq.com/miniprogram/dev/component/navigator.html) 用户按左上角返回按钮 | onUnload   | onShow             |
| Tab 切换   | 调用 API [wx.switchTab](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.switchTab.html) 使用组件 [``](https://developers.weixin.qq.com/miniprogram/dev/component/navigator.html) 用户切换 Tab |            | 各种情况请参考下表 |
| 重启动     | 调用 API [wx.reLaunch](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.reLaunch.html) 使用组件 [``](https://developers.weixin.qq.com/miniprogram/dev/component/navigator.html) | onUnload   | onLoad, onShow     |

Tab 切换对应的生命周期（以 A、B 页面为 Tabbar 页面，C 是从 A 页面打开的页面，D 页面是从 C 页面打开的页面为例）：

| 当前页面        | 路由后页面    | 触发的生命周期（按顺序）                           |
| :-------------- | :------------ | :------------------------------------------------- |
| A               | A             | Nothing happend                                    |
| A               | B             | A.onHide(), B.onLoad(), B.onShow()                 |
| A               | B（再次打开） | A.onHide(), B.onShow()                             |
| C               | A             | C.onUnload(), A.onShow()                           |
| C               | B             | C.onUnload(), B.onLoad(), B.onShow()               |
| D               | B             | D.onUnload(), C.onUnload(), B.onLoad(), B.onShow() |
| D（从转发进入） | A             | D.onUnload(), A.onLoad(), A.onShow()               |
| D（从转发进入） | B             | D.onUnload(), B.onLoad(), B.onShow()               |

#### 注意事项

- `navigateTo`, `redirectTo` 只能打开非 tabBar 页面。
- `switchTab` 只能打开 tabBar 页面。
- `reLaunch` 可以打开任意页面。
- 页面底部的 tabBar 由页面决定，即只要是定义为 tabBar 的页面，底部都有 tabBar。
- 调用页面路由带的参数可以在目标页面的`onLoad`中获取。

### 模块化

公共的代码抽离成为一个单独的 js 文件，作为一个模块。模块只有通过 [`module.exports`](https://developers.weixin.qq.com/miniprogram/dev/reference/api/module.html) 或者 `exports`【`exports` 是 [`module.exports`](https://developers.weixin.qq.com/miniprogram/dev/reference/api/module.html) 的一个引用，因此在模块里边随意更改 `exports` 的指向会造成未知的错误。】 才能对外暴露接口。不支持直接引入 `node_modules` , 开发者需要使用到 `node_modules` 时候建议拷贝出相关的代码到小程序的目录中，或者使用小程序支持的 [npm](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html) 功能

```js
// common.js
function sayHello(name) {
  console.log(`Hello ${name} !`)
}
function sayGoodbye(name) {
  console.log(`Goodbye ${name} !`)
}

module.exports.sayHello = sayHello
exports.sayGoodbye = sayGoodbye
​在需要使用这些模块的文件中，使用 require 将公共代码引入

var common = require('common.js')
Page({
  helloMINA: function() {
    common.sayHello('MINA')
  },
  goodbyeMINA: function() {
    common.sayGoodbye('MINA')
  }
})
```

### 文件作用域

在 JavaScript 文件中声明的变量和函数只在该文件中有效；不同的文件中可以声明相同名字的变量和函数，不会互相影响。

通过全局函数 `getApp` 可以获取全局的应用实例，如果需要全局的数据可以在 `App()` 中设置

```js
// app.js
App({
  globalData: 1
})
// a.js
// The localValue can only be used in file a.js.
var localValue = 'a'
// Get the app instance.
var app = getApp()
// Get the global data and change it.
app.globalData++

// b.js
// You can redefine localValue in file b.js, without interference with the localValue in a.js.
var localValue = 'b'
// If a.js it run before b.js, now the globalData shoule be 2.
console.log(getApp().globalData)
```

### API

事件监听 API    `on` 开头,监听某个事件是否触发,如：[wx.onSocketOpen](https://developers.weixin.qq.com/miniprogram/dev/api/network/websocket/wx.onSocketOpen.html)，[wx.onCompassChange](https://developers.weixin.qq.com/miniprogram/dev/api/device/compass/wx.onCompassChange.html) 等。

同步 API   `Sync` 结尾,如 [wx.setStorageSync](https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.setStorageSync.html)，[wx.getSystemInfoSync](https://developers.weixin.qq.com/miniprogram/dev/api/base/system/wx.getSystemInfoSync.html) 等

异步 API   如 [wx.request](https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html)，[wx.login](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/login/wx.login.html) 等

云开发 API   

## 视图层 View

### WXML



### WXSS (WeiXin Style Sheets)

`@import`语句可以导入外联样式表

#### 内联样式

框架组件上支持使用 style、class 属性来控制组件的样式。

#### 选择器

目前支持的选择器有：

| 选择器           | 样例             | 样例描述                                       |
| :--------------- | :--------------- | :--------------------------------------------- |
| .class           | `.intro`         | 选择所有拥有 class="intro" 的组件              |
| #id              | `#firstname`     | 选择拥有 id="firstname" 的组件                 |
| element          | `view`           | 选择所有 view 组件                             |
| element, element | `view, checkbox` | 选择所有文档的 view 组件和所有的 checkbox 组件 |
| ::after          | `view::after`    | 在 view 组件后边插入内容                       |
| ::before         | `view::before`   | 在 view 组件前边插入内容                       |

### WXS

WXS（WeiXin Script）是小程序的一套脚本语言

1. WXS 不依赖于运行时的基础库版本，可以在所有版本的小程序中运行。
2. WXS 与 JavaScript 是不同的语言，有自己的语法，并不和 JavaScript 一致。
3. WXS 的运行环境和其他 JavaScript 代码是隔离的，WXS 中不能调用其他 JavaScript 文件中定义的函数，也不能调用小程序提供的API。
4. WXS 函数不能作为组件的事件回调。
5. 由于运行环境的差异，在 iOS 设备上小程序内的 WXS 会比 JavaScript 代码快 2 ~ 20 倍。在 android 设备上二者运行效率无差异。

```js
\<wxs module="m1">
var msg = "hello world";

module.exports.message = msg;
\</wxs>

\<view> {{m1.message}} \</view>
```

### 事件系统

#### 简意双向绑定

只能是一个单一字段的绑定

```js
\<input model:value="值为 {{value}}" />
\<input model:value="{{ a + b }}" />
```

都是非法的；

目前，尚不能 data 路径

```js
\<input model:value="{{ a.b }}" />
```

组件中传递双向绑定并触发更新

```js
Component({
  properties: {
    myValue: String
  },
     methods: {
    update: function() {
      // 更新 myValue
      this.setData({
        myValue: 'leaf'
      })
    }
})
\<input model:value="{{myValue}}" />
```

#### 基础组件

#### 获取界面上的节点信息

##### WXML节点信息：获取节点属性、样式、在界面上的位置等信息

##### WXML节点布局相交状态：

- 参照节点：监听的参照节点，取它的布局区域作为参照区域。如果有多个参照节点，则会取它们布局区域的 **交集** 作为参照区域。页面显示区域也可作为参照区域之一。
- 目标节点：监听的目标，默认只能是一个节点（使用 `selectAll` 选项时，可以同时监听多个节点）。
- 相交区域：目标节点的布局区域与参照区域的相交区域。
- 相交比例：相交区域占参照区域的比例。
- 阈值：相交比例如果达到阈值，则会触发监听器的回调函数。阈值可以有多个。

```js
Page({
  onLoad: function(){
    wx.createIntersectionObserver().relativeToViewport().observe('.target-class', (res) => {
      res.id // 目标节点 id
      res.dataset // 目标节点 dataset
      res.intersectionRatio // 相交区域占目标节点的布局区域的比例
      res.intersectionRect // 相交区域
      res.intersectionRect.left // 相交区域的左边界坐标
      res.intersectionRect.top // 相交区域的上边界坐标
      res.intersectionRect.width // 相交区域的宽度
      res.intersectionRect.height // 相交区域的高度
    })
  }
})
```



#### 响应显示区域变化

##### 在手机上启用屏幕旋转支持

```
app.json` 的 `window` 段中设置 `"pageOrientation": "auto"` ，或在页面 json 文件中配置 `"pageOrientation": "auto", 2.5.0 开始， pageOrientation 还可以被设置为 landscape ，表示固定为横屏显示
```

##### 在 iPad 上启用屏幕旋转支持

```
app.json` 中添加 `"resizable": true，不能单独配置某个页面是否支持屏幕旋转
```

##### Media Query

对于不同尺寸的显示区域，页面的布局会有所差异。此时可以使用 media query 来解决大多数问题。

**代码示例：**

```css
.my-class {
  width: 40px;
}

@media (min-width: 480px) {
  /* 仅在 480px 或更宽的屏幕上生效的样式规则 */
  .my-class {
    width: 200px;
  }
}
```

在 WXML 中，可以使用 [match-media](https://developers.weixin.qq.com/miniprogram/dev/component/match-media.html) 组件来根据 media query 匹配状态展示、隐藏节点。

此外，可以在页面或者自定义组件 JS 中使用 `this.createMediaQueryObserver()` 方法来创建一个 [`MediaQueryObserver`](https://developers.weixin.qq.com/miniprogram/dev/api/wxml/MediaQueryObserver.html) 对象，用于监听指定的 media query 的匹配状态。

#### 分栏模式

##### 启用

3.3版本以上在pc等大屏幕上支持分栏模式，

app.json 中同时添加 `"resizable": true` 和 `"frameset": true`

##### 分栏占位图片

当某一栏没有展示任何页面时，会展示一张图片在此栏正中央。

如果代码包中的 `frameset/placeholder.png` 文件存在，这张图片将作为此时展示的图片。

#### [动画](https://developers.weixin.qq.com/miniprogram/dev/framework/view/animation.html)

#### [初始渲染缓存](https://developers.weixin.qq.com/miniprogram/dev/framework/view/initial-rendering-cache.html)

# 自定义组件

## 介绍

### 创建自定义组件

类似于页面，一个自定义组件由 `json` `wxml` `wxss` `js` 4个文件组成。要编写一个自定义组件，首先需要在组件的 `json` 文件中进行自定义组件声明：

```json
{
  "component": true
}
```

同时，还要在 `wxml` 文件中编写组件模板，在 `wxss` 文件中加入组件样式，它们的写法与页面的写法类似。

```html
<!-- 这是自定义组件的内部WXML结构 -->
\<view class="inner">
  {{innerText}}
\</view>
\<slot>\</slot>
/* 这里的样式只应用于这个自定义组件 */
.inner {
  color: red;
}
```

**组件wxss中不应使用ID选择器、属性选择器和标签名选择器。**

在自定义组件的 `js` 文件中，需要使用 `Component()` 来注册组件，并提供组件的属性定义、内部数据和自定义方法。

组件的属性值和内部数据将被用于组件 `wxml` 的渲染，其中，属性值是可由组件外部传入的。

```js
Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    innerText: {
      type: String,
      value: 'default value',
    }
  },
  data: {
    // 这里是一些组件内部数据
    someData: {}
  },
  methods: {
    // 这里是一个自定义方法
    customMethod: function(){}
  }
})
```

### 使用自定义组件

使用已注册的自定义组件前，首先要在用组件的页面的 `json` 文件中进行引用声明。此时需要提供每个自定义组件的标签名和对应的自定义组件文件路径：

```json
{
  "usingComponents": {
    "component-tag-name": "path/to/the/custom/component"//同目录下直接写文件名
  }
}
```

这样，在页面的 `wxml` 中就可以像使用基础组件一样使用自定义组件。节点名即自定义组件的标签名，节点属性即传递给组件的属性值。

```html
\<view>
  <!-- 以下是对一个自定义组件的引用 -->
  \<component-tag-name inner-text="Some text">\</component-tag-name>
\</view>
```

## 组件模板和样式

### 组件模板

组件模板的写法与页面模板相同。组件模板与组件数据结合后生成的节点树，将被插入到组件的引用位置上。

在组件模板中可以提供一个 `\<slot>` 节点，用于承载组件引用时提供的子节点。

**代码示例：**

[在开发者工具中预览效果](https://developers.weixin.qq.com/s/1udXLnmi6KY2)

```html
<!-- 组件模板 -->
\<view class="wrapper">
  \<view>这里是组件的内部节点\</view>
  \<slot>\</slot>
\</view>
<!-- 引用组件的页面模板 -->
\<view>
  \<component-tag-name>
    <!-- 这部分内容将被放置在组件 \<slot> 的位置上 -->
    \<view>这里是插入到组件slot中的内容\</view>
  \</component-tag-name>
\</view>
```

注意，在模板中引用到的自定义组件及其对应的节点名需要在 `json` 文件中显式定义，否则会被当作一个无意义的节点。除此以外，节点名也可以被声明为[抽象节点](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/generics.html)

### 模板数据绑定

与普通的 WXML 模板类似，可以使用数据绑定，这样就可以向子组件的属性传递动态数据。

**代码示例：**

[在开发者工具中预览效果](https://developers.weixin.qq.com/s/8ZhcXBme7djX)

```html
<!-- 引用组件的页面模板 -->
\<view>
  \<component-tag-name prop-a="{{dataFieldA}}" prop-b="{{dataFieldB}}">
    <!-- 这部分内容将被放置在组件 \<slot> 的位置上 -->
    \<view>这里是插入到组件slot中的内容\</view>
  \</component-tag-name>
\</view>
```

在以上例子中，组件的属性 `propA` 和 `propB` 将收到页面传递的数据。页面可以通过 `setData` 来改变绑定的数据字段。

注意：这样的数据绑定只能传递 JSON 兼容数据。自基础库版本 [2.0.9](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html) 开始，还可以在数据中包含函数（但这些函数不能在 WXML 中直接调用，只能传递给子组件）。

### 组件 wxml 的 slot

在组件的 wxml 中可以包含 `slot` 节点，用于承载组件使用者提供的 wxml 结构。

默认情况下，一个组件的 wxml 中只能有一个 slot 。需要使用多 slot 时，可以在组件 js 中声明启用。

```js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: { /* ... */ },
  methods: { /* ... */ }
})
```

此时，可以在这个组件的 wxml 中使用多个 slot ，以不同的 `name` 来区分。

```html
<!-- 组件模板 -->
\<view class="wrapper">
  \<slot name="before">\</slot>
  \<view>这里是组件的内部细节\</view>
  \<slot name="after">\</slot>
\</view>
```

使用时，用 `slot` 属性来将节点插入到不同的 slot 上。

```html
<!-- 引用组件的页面模板 -->
\<view>
  \<component-tag-name>
    <!-- 这部分内容将被放置在组件 \<slot name="before"> 的位置上 -->
    \<view slot="before">这里是插入到组件slot name="before"中的内容\</view>
    <!-- 这部分内容将被放置在组件 \<slot name="after"> 的位置上 -->
    \<view slot="after">这里是插入到组件slot name="after"中的内容\</view>
  \</component-tag-name>
\</view>
```

### 组件样式

组件对应 `wxss` 文件的样式，只对组件wxml内的节点生效。编写组件样式时，需要注意以下几点：

- 组件和引用组件的页面不能使用id选择器（`#a`）、属性选择器（`[a]`）和标签名选择器，请改用class选择器。
- 组件和引用组件的页面中使用后代选择器（`.a .b`）在一些极端情况下会有非预期的表现，如遇，请避免使用。
- 子元素选择器（`.a>.b`）只能用于 `view` 组件与其子节点之间，用于其他组件可能导致非预期的情况。
- 继承样式，如 `font` 、 `color` ，会从组件外继承到组件内。
- 除继承样式外， `app.wxss` 中的样式、组件所在页面的的样式对自定义组件无效（除非更改组件样式隔离选项）。

```css
#a { } /* 在组件中不能使用 */
[a] { } /* 在组件中不能使用 */
button { } /* 在组件中不能使用 */
.a > .b { } /* 除非 .a 是 view 组件节点，否则不一定会生效 */
```

除此以外，组件可以指定它所在节点的默认样式，使用 `:host` 选择器（需要包含基础库 [1.7.2](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html) 或更高版本的开发者工具支持）。

**代码示例：**

```css
/* 组件 custom-component.wxss */
:host {
  color: yellow;
}
<!-- 页面的 WXML -->
\<custom-component>这段文本是黄色的\</custom-component>
```

### 组件样式隔离

默认情况下，自定义组件的样式只受到自定义组件 wxss 的影响。除非以下两种情况：

- `app.wxss` 或页面的 `wxss` 中使用了标签名选择器（或一些其他特殊选择器）来直接指定样式，这些选择器会影响到页面和全部组件。通常情况下这是不推荐的做法。
- 指定特殊的样式隔离选项 `styleIsolation` 。

```js
Component({
  options: {
    styleIsolation: 'isolated'
  }
})
```

[在开发者工具中预览效果](https://developers.weixin.qq.com/s/xPQhJcm37e7h)

`styleIsolation` 选项从基础库版本 [2.6.5](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html) 开始支持。它支持以下取值：

- `isolated` 表示启用样式隔离，在自定义组件内外，使用 class 指定的样式将不会相互影响（一般情况下的默认值）；
- `apply-shared` 表示页面 wxss 样式将影响到自定义组件，但自定义组件 wxss 中指定的样式不会影响页面；
- `shared` 表示页面 wxss 样式将影响到自定义组件，自定义组件 wxss 中指定的样式也会影响页面和其他设置了 `apply-shared` 或 `shared` 的自定义组件。（这个选项在插件中不可用。）

**使用后两者时，请务必注意组件间样式的相互影响。**

如果这个 [Component 构造器用于构造页面](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/component.html) ，则默认值为 `shared` ，且还有以下几个额外的样式隔离选项可用：

- `page-isolated` 表示在这个页面禁用 app.wxss ，同时，页面的 wxss 不会影响到其他自定义组件；
- `page-apply-shared` 表示在这个页面禁用 app.wxss ，同时，页面 wxss 样式不会影响到其他自定义组件，但设为 `shared` 的自定义组件会影响到页面；
- `page-shared` 表示在这个页面禁用 app.wxss ，同时，页面 wxss 样式会影响到其他设为 `apply-shared` 或 `shared` 的自定义组件，也会受到设为 `shared` 的自定义组件的影响。

从小程序基础库版本 [2.10.1](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html) 开始，也可以在页面或自定义组件的 json 文件中配置 `styleIsolation` （这样就不需在 js 文件的 `options` 中再配置）。例如：

```json
{
  "styleIsolation": "isolated"
}
```

此外，小程序基础库版本 [2.2.3](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html) 以上支持 `addGlobalClass` 选项，即在 `Component` 的 `options` 中设置 `addGlobalClass: true` 。 这个选项等价于设置 `styleIsolation: apply-shared` ，但设置了 `styleIsolation` 选项后这个选项会失效。

**代码示例：**

[在开发者工具中预览效果](https://developers.weixin.qq.com/s/VkTd7Fm37ggl)

```js
/* 组件 custom-component.js */
Component({
  options: {
    addGlobalClass: true,
  }
})
<!-- 组件 custom-component.wxml -->
\<text class="red-text">这段文本的颜色由 `app.wxss` 和页面 `wxss` 中的样式定义来决定\</text>
/* app.wxss */
.red-text {
  color: red;
}
```

### 外部样式类

> 基础库 1.9.90 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)。

有时，组件希望接受外部传入的样式类。此时可以在 `Component` 中用 `externalClasses` 定义段定义若干个外部样式类。

这个特性可以用于实现类似于 `view` 组件的 `hover-class` 属性：页面可以提供一个样式类，赋予 `view` 的 `hover-class` ，这个样式类本身写在页面中而非 `view` 组件的实现中。

**注意：在同一个节点上使用普通样式类和外部样式类时，两个类的优先级是未定义的，因此最好避免这种情况。**

**代码示例：**

```js
/* 组件 custom-component.js */
Component({
  externalClasses: ['my-class']
})
<!-- 组件 custom-component.wxml -->
\<custom-component class="my-class">这段文本的颜色由组件外的 class 决定\</custom-component>
```

这样，组件的使用者可以指定这个样式类对应的 class ，就像使用普通属性一样。在 [2.7.1](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html) 之后，可以指定多个对应的 class 。

**代码示例：**

[在开发者工具中预览效果](https://developers.weixin.qq.com/s/rbgNNKmE6bZK)

```html
<!-- 页面的 WXML -->
\<custom-component my-class="red-text" />
\<custom-component my-class="large-text" />
<!-- 以下写法需要基础库版本 2.7.1 以上 -->
\<custom-component my-class="red-text large-text" />
.red-text {
  color: red;
}
.large-text {
  font-size: 1.5em;
}
```

### 引用页面或父组件的样式

> 基础库 2.9.2 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)。

即使启用了样式隔离 `isolated` ，组件仍然可以在局部引用组件所在页面的样式或父组件的样式。

例如，如果在页面 wxss 中定义了：

```css
.blue-text {
  color: blue;
}
```

在这个组件中可以使用 `~` 来引用这个类的样式：

```html
\<view class="~blue-text"> 这段文本是蓝色的 \</view>
```

如果在一个组件的父组件 wxss 中定义了：

```css
.red-text {
  color: red;
}
```

在这个组件中可以使用 `^` 来引用这个类的样式：

```html
\<view class="^red-text"> 这段文本是红色的 \</view>
```

也可以连续使用多个 `^` 来引用祖先组件中的样式。

**注意：如果组件是比较独立、通用的组件，请优先使用外部样式类的方式，而非直接引用父组件或页面的样式。**

### 虚拟化组件节点

> 基础库 2.11.2 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)。

默认情况下，自定义组件本身的那个节点是一个“普通”的节点，使用时可以在这个节点上设置 `class` `style` 、动画、 flex 布局等，就如同普通的 view 组件节点一样。

```html
<!-- 页面的 WXML -->
\<view style="display: flex">
  <!-- 默认情况下，这是一个普通的节点 -->
  \<custom-component style="color: blue; flex: 1">蓝色、满宽的\</custom-component>
\</view>
```

但有些时候，自定义组件并不希望这个节点本身可以设置样式、响应 flex 布局等，而是希望自定义组件内部的第一层节点能够响应 flex 布局或者样式由自定义组件本身完全决定。

这种情况下，可以将这个自定义组件设置为“虚拟的”：

```js
Component({
  options: {
    virtualHost: true
  },
  properties: {
    style: { // 定义 style 属性可以拿到 style 属性上设置的值
      type: String,
    }
  },
  externalClasses: ['class'], // 可以将 class 设为 externalClasses
})
```

这样，可以将 flex 放入自定义组件内：

```html
<!-- 页面的 WXML -->
\<view style="display: flex">
  <!-- 如果设置了 virtualHost ，节点上的样式将失效 -->
  \<custom-component style="color: blue">不是蓝色的\</custom-component>
\</view>
<!-- custom-component.wxml -->
\<view style="flex: 1">
  满宽的
  \<slot>\</slot>
\</view>
```

需要注意的是，自定义组件节点上的 `class` `style` 和动画将不再生效，但仍可以：

- 将 style 定义成 `properties` 属性来获取 style 上设置的值；
- 将 class 定义成 `externalClasses` 外部样式类使得自定义组件 wxml 可以使用 class 值。

## Component 构造器

`Component` 构造器可用于定义组件，调用 `Component` 构造器时可以指定组件的属性、数据、方法等。

详细的参数含义和使用请参考 [Component 参考文档](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Component.html)。

```js
Component({

  behaviors: [],

  properties: {
    myProperty: { // 属性名
      type: String,
      value: ''
    },
    myProperty2: String // 简化的定义方式
  },
  
  data: {}, // 私有数据，可用于模板渲染

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { },
    moved: function () { },
    detached: function () { },
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () { }, // 此处attached的声明会被lifetimes字段中的声明覆盖
  ready: function() { },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () { },
    hide: function () { },
    resize: function () { },
  },

  methods: {
    onMyButtonTap: function(){
      this.setData({
        // 更新属性和数据的方法与更新页面数据的方法类似
      })
    },
    // 内部方法建议以下划线开头
    _myPrivateMethod: function(){
      // 这里将 data.A[0].B 设为 'myPrivateData'
      this.setData({
        'A[0].B': 'myPrivateData'
      })
    },
    _propertyChange: function(newVal, oldVal) {

    }
  }

})
```

### 使用 Component 构造器构造页面

事实上，小程序的页面也可以视为自定义组件。因而，页面也可以使用 `Component` 构造器构造，拥有与普通组件一样的定义段与实例方法。但此时要求对应 json 文件中包含 `usingComponents` 定义段。

此时，组件的属性可以用于接收页面的参数，如访问页面 `/pages/index/index?paramA=123&paramB=xyz` ，如果声明有属性 `paramA` 或 `paramB` ，则它们会被赋值为 `123` 或 `xyz` 。

页面的生命周期方法（即 `on` 开头的方法），应写在 `methods` 定义段中。

**代码示例：**

```json
{
  "usingComponents": {}
}
Component({

  properties: {
    paramA: Number,
    paramB: String,
  },

  methods: {
    onLoad: function() {
      this.data.paramA // 页面参数 paramA 的值
      this.data.paramB // 页面参数 paramB 的值
    }
  }

})
```

使用 `Component` 构造器来构造页面的一个好处是可以使用 `behaviors` 来提取所有页面中公用的代码段。

例如，在所有页面被创建和销毁时都要执行同一段代码，就可以把这段代码提取到 `behaviors` 中。

**代码示例：**

```js
// page-common-behavior.js
module.exports = Behavior({
  attached: function() {
    // 页面创建时执行
    console.info('Page loaded!')
  },
  detached: function() {
    // 页面销毁时执行
    console.info('Page unloaded!')
  }
})
// 页面 A
var pageCommonBehavior = require('./page-common-behavior')
Component({
  behaviors: [pageCommonBehavior],
  data: { /* ... */ },
  methods: { /* ... */ },
})
// 页面 B
var pageCommonBehavior = require('./page-common-behavior')
Component({
  behaviors: [pageCommonBehavior],
  data: { /* ... */ },
  methods: { /* ... */ },
})
```

## 组件间通信与事件

### 组件间通信

组件间的基本通信方式有以下几种。

- **WXML 数据绑定**：用于父组件向子组件的指定属性设置数据，仅能设置 JSON 兼容数据（自基础库版本 [2.0.9](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html) 开始，还可以在数据中包含函数）。具体在 [组件模板和样式](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html) 章节中介绍。
- **事件**：用于子组件向父组件传递数据，可以传递任意数据。
- 如果以上两种方式不足以满足需要，父组件还可以通过 **`this.selectComponent`** 方法获取子组件实例对象，这样就可以直接访问组件的任意数据和方法。

### 监听事件

事件系统是组件间通信的主要方式之一。自定义组件可以触发任意的事件，引用组件的页面可以监听这些事件。关于事件的基本概念和用法，参见 [事件](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html) 。

监听自定义组件事件的方法与监听基础组件事件的方法完全一致：

**代码示例：**

```html
<!-- 当自定义组件触发“myevent”事件时，调用“onMyEvent”方法 -->
\<component-tag-name bindmyevent="onMyEvent" />
<!-- 或者可以写成 -->
\<component-tag-name bind:myevent="onMyEvent" />
Page({
  onMyEvent: function(e){
    e.detail // 自定义组件触发事件时提供的detail对象
  }
})
```

### 触发事件

自定义组件触发事件时，需要使用 `triggerEvent` 方法，指定事件名、detail对象和事件选项：

**代码示例：**

[在开发者工具中预览效果](https://developers.weixin.qq.com/s/DFfYSKmI6vZD)

```html
<!-- 在自定义组件中 -->
\<button bindtap="onTap">点击这个按钮将触发“myevent”事件\</button>
Component({
  properties: {},
  methods: {
    onTap: function(){
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myEventDetail, myEventOption)
    }
  }
})
```

触发事件的选项包括：

| 选项名       | 类型    | 是否必填 | 默认值 | 描述                                                         |
| :----------- | :------ | :------- | :----- | :----------------------------------------------------------- |
| bubbles      | Boolean | 否       | false  | 事件是否冒泡                                                 |
| composed     | Boolean | 否       | false  | 事件是否可以穿越组件边界，为false时，事件将只能在引用组件的节点树上触发，不进入其他任何组件内部 |
| capturePhase | Boolean | 否       | false  | 事件是否拥有捕获阶段                                         |

关于冒泡和捕获阶段的概念，请阅读 [事件](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html) 章节中的相关说明。

**代码示例：**

[在开发者工具中预览效果](https://developers.weixin.qq.com/s/UGfljKm66zZ1)

```html
// 页面 page.wxml
\<another-component bindcustomevent="pageEventListener1">
  \<my-component bindcustomevent="pageEventListener2">\</my-component>
\</another-component>
// 组件 another-component.wxml
\<view bindcustomevent="anotherEventListener">
  \<slot />
\</view>
// 组件 my-component.wxml
\<view bindcustomevent="myEventListener">
  \<slot />
\</view>
// 组件 my-component.js
Component({
  methods: {
    onTap: function(){
      this.triggerEvent('customevent', {}) // 只会触发 pageEventListener2
      this.triggerEvent('customevent', {}, { bubbles: true }) // 会依次触发 pageEventListener2 、 pageEventListener1
      this.triggerEvent('customevent', {}, { bubbles: true, composed: true }) // 会依次触发 pageEventListener2 、 anotherEventListener 、 pageEventListener1
    }
  }
})
```

### 获取组件实例

可在父组件里调用 `this.selectComponent` ，获取子组件的实例对象。

调用时需要传入一个匹配选择器 `selector`，如：`this.selectComponent(".my-component")`。

`selector` 详细语法可查看 [selector 语法参考文档](https://developers.weixin.qq.com/miniprogram/dev/api/wxml/SelectorQuery.select.html)。

**代码示例：**

[在开发者工具中预览效果](https://developers.weixin.qq.com/s/oQ64sFmm7rhD)

```javascript
// 父组件
Page({
  data: {},
  getChildComponent: function () {
    const child = this.selectComponent('.my-component');
    console.log(child)
  }
})
```

在上例中，父组件将会获取 `class` 为 `my-component` 的子组件实例对象，即子组件的 `this` 。

**注意** ：默认情况下，小程序与插件之间、不同插件之间的组件将无法通过 `selectComponent` 得到组件实例（将返回 `null`）。如果想让一个组件在上述条件下依然能被 `selectComponent` 返回，可以自定义其返回结果（见下）。

### 自定义的组件实例获取结果

若需要自定义 `selectComponent` 返回的数据，可使用内置 `behavior`: `wx://component-export`

从基础库版本 [2.2.3](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html) 开始提供支持。

使用该 behavior 时，自定义组件中的 `export` 定义段将用于指定组件被 `selectComponent` 调用时的返回值。

**代码示例：**

[在开发者工具中预览效果](https://developers.weixin.qq.com/s/ZtosuRmK741Y)

```javascript
// 自定义组件 my-component 内部
Component({
  behaviors: ['wx://component-export'],
  export() {
    return { myField: 'myValue' }
  }
})
<!-- 使用自定义组件时 -->
\<my-component id="the-id" />
// 父组件调用
const child = this.selectComponent('#the-id') // 等于 { myField: 'myValue' }
```

在上例中，父组件获取 `id` 为 `the-id` 的子组件实例的时候，得到的是对象 `{ myField: 'myValue' }` 。

# 开发经验

## 准备

1. 需要后端接口使用要开通企业账号，注册费用300元
1. 有后台数据：服务器、域名、端口443、8080、80 开通并且备案。
2. 443端口 业务域名需要，其他端口服务域名需要，开发时可关闭域名校验。
3. 可通过 UniApp ，通过 VUE 方式简介发行小程序。
3. 可通过VSCode打开HBuilder X 运行的项目比较方便
3. 业务域名，服务器域名
3. 注意分包问题，每个包不大于2M.
3. 可以通过代理通过一个域名使用多个代理。





























转载整理来源：https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/route.html
