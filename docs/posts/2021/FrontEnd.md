---
index: 2
icon: markdown
title: 前端
date: 2022-06-06
category:
  - 前端
tag:
  - 前端
---

> VUE、HTML、JS、、、、

<!-- more -->c

[TOC]



# VUE

## 准备

教程：[尚硅谷Vue2.0+Vue3.0全套教程丨vuejs从入门到精通_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Zy4y1K7SH?spm_id_from=333.337.search-card.all.click)

## 简介

## 环境



## 安装

#### [创建新项目](https://cli.vuejs.org/zh/guide/creating-a-project.html)

vue-cli版本是2.0左右的就会有webpack的config目录
vue-cli版本是3.0以上的就会有[vue.config.js](https://cli.vuejs.org/zh/config/)没有config目录

### vue init

是vue-cli2.x的初始化方式，可以使用github上面的一些模板来初始化项目

webpack是官方推荐的标准模板名

使用方式：vue init webpack 项目名称

electron-vue的模板

使用方式：vue init simulatedgreg/electron-vue 项目名称

###  vue create

是vue-cli3.x的初始化方式，模板是固定的，模板选项可自由配置

使用方式：vue create 项目名称

## 初始化项目文件结构说明

```cmd
│  .babelrc
│  .editorconfig
│  .eslintignore
│  .eslintrc.js
│  .gitignore
│  .postcssrc.js
│  index.html
│  package-lock.json
│  package.json
│  README.md
│
├─build
│      build.js
│      check-versions.js
│      logo.png
│      utils.js
│      vue-loader.conf.js
│      webpack.base.conf.js
│      webpack.dev.conf.js
│      webpack.prod.conf.js
│
├─config
│      dev.env.js
│      index.js
│      prod.env.js
│      test.env.js
│
├─node_modules
├─src
│  │  App.vue
│  │  main.js
│  │
│  ├─assets
│  │      logo.png
│  │
│  ├─components
│  │      HelloWorld.vue
│  │
│  └─router
│          index.js
│
├─static
│      .gitkeep
│
└─test
    ├─e2e
    │  │  nightwatch.conf.js
    │  │  runner.js
    │  │
    │  ├─custom-assertions
    │  │      elementCount.js
    │  │
    │  └─specs
    │          test.js
    │
    └─unit
        │  .eslintrc
        │  jest.conf.js
        │  setup.js
        │
        └─specs
                HelloWorld.spec.js

```

## Src工程化文件目录结构

```cmd
├─src
│  │  App.vue
│  │  main.js
│  │
│  ├─api
│  ├─assets
│  │      logo.png
│  │
│  ├─components
│  │      HelloWorld.vue
│  │
│  ├─layout
│  ├─router
│  │      index.js
│  │
│  ├─utils
│  └─views
```

### [vue create 和vue init webpack的区别](https://blog.csdn.net/weixin_42617917/article/details/115774159)

vue create 是vue-cli3.x的初始化方式

vue init 是vue-cli2.x的初始化方式，可以使用[github](https://so.csdn.net/so/search?q=github)上面的一些模板来初始化项目，webpack是官方推荐的标准模板名。

#### vue cli2升级到vue cli3

1.先升级npm的版本

npm install -g npm

2.再卸载之前的vue cli 2.9.6

npm uninstall -g @vue/cli

3.下载最新的vue cli版本

npm install -g @vue/cli

#### 区别

1.打包方式：
cli2 运行:npm run dev
cli3 运行：npm run serve
至于为什么会变，来看一下package.json
2.文件夹目录：
3.cli3 文件目录：取消掉了config目录、build目录、static目录 ,还有最重要的一点，3.0的安装项目时自动下载node-model，vue.config.js也没了，需要手动添加。
3.创建项目方式：
3.cli3的安装：vue create project
2.cli2的安装：vue init webpack project

## 常用插件



## 页面跳转

```
1：router-link跳转
2：this.$router.push() 
3：this.$router.replace()  
4：this.$router.go(n) 
```



## [组件之间传值](https://blog.csdn.net/qq_42005992/article/details/111290354)

![在这里插入图片描述](http://qnimg.gisfsde.com/work/20201216164359342.png)

## 生命周期

![生命周期图.jpg](http://qnimg.gisfsde.com/work/aHR0cHM6Ly9jZG4ubmxhcmsuY29tL3l1cXVlLzAvMjAyMC9qcGVnLzUzMDc2NC8xNTgyMzgxMzU5NjA5LTIxN2RjNmE3LTJmZGItNGVlMC05OGNhLWUwOGM2MTJlMDU5OS5qcGVn)

# [ES6](https://blog.csdn.net/itzhongzi/article/details/73330681)

ECMAScript 6

## 变量定义 5 vs 6

ES5

1. var定义的变量，没有块的概念，可以跨块{}访问, 不能跨函数访问，可多次重复定义相同变量，定义的变量提前用显示undefine

ES6

1. let定义的变量，只能在块作用域里访问，不能跨块访问，也不能跨函数访问，不可多次重复定义相同变量，定义的变量提前用显示报错未定义
2. const用来定义只读常量，使用时必须初始化(即必须赋值)，只能在块作用域里访问，而且不能修改指针。
3. this.$nextTick(()=>{创建地图对象代码})顺序加载DOM

## 常用方法

reverse()   数组翻转

# HTML5

# WEBGL

# Three.js

# Yarn/NPM/PNPM

# UniApp

https://uniapp.dcloud.io/

一段开发多端运行，基于VUE，可开发小程序

# MiniProgram



# Bootstrap

# CSS

# Ajax

# JQuery

# Axios

## vue-axios

### 准备

```js
npm install --save axios vue-axios

import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
```

​		axios 使用 post 发送数据时，默认是直接把 json 放到请求体中提交到后端的。也就是说，我们的 Content-Type 变成了 application/json;charset=utf-8 ,这是axios默认的请求头content-type类型。但是实际我们后端要求的 'Content-Type': 'application/x-www-form-urlencoded' 为多见.

```js
//POST:
      let data = Qs.stringify({
        a: 2,
        b: "11",
      });
			await axios
              .post(url, params, {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                  Host: "172.0.0.1:0000",
                },
              })
              .then((res) => {
                console.log("结果", res);
                if (
                ) {
                }
              })
              .catch((err) => {
                console.log(err);
              });
//GET:
 axios.get(url)
```

- 

# CLI

# [MVN](http://nvm.uihtm.com/)

## 1.彻底清除所有node

## 2.[安装mvn](http://nvm.uihtm.com/)

修改  安装目录/setting.txt  添加

node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/

## 3.安装node

- `nvm arch`：显示node是运行在32位还是64位。
- `nvm install <version> [arch]` ：安装node， version是特定版本也可以是最新稳定版本latest。可选参数arch指定安装32位还是64位版本，默认是系统位数。可以添加--insecure绕过远程服务器的SSL。
- `nvm list [available]` ：显示已安装的列表。可选参数available，显示可安装的所有版本。list可简化为ls。
- `nvm on` ：开启node.js版本管理。
- `nvm off` ：关闭node.js版本管理。
- `nvm proxy [url]` ：设置下载代理。不加可选参数url，显示当前代理。将url设置为none则移除代理。
- `nvm node_mirror [url]` ：设置node镜像。默认是https://nodejs.org/dist/。如果不写url，则使用默认url。设置后可至安装目录settings.txt文件查看，也可直接在该文件操作。
- `nvm npm_mirror [url]` ：设置npm镜像。https://github.com/npm/cli/archive/。如果不写url，则使用默认url。设置后可至安装目录settings.txt文件查看，也可直接在该文件操作。
- `nvm uninstall <version>` ：卸载指定版本node。
- `nvm use [version] [arch]` ：使用制定版本node。可指定32/64位。
- `nvm root [path]` ：设置存储不同版本node的目录。如果未设置，默认使用当前目录。
- `nvm version` ：显示nvm版本。version可简化为v

# Webpack 

![img](https://qnimg.gisfsde.com/markdown/32af52ff9594b121517ecdd932644da4.png)

# [querystring](https://github.com/ljharb/qs)

> A querystring parsing and stringifying library with some added security.
>
> 安装：npm install qs *// 或者* npm install querystring 
>
> ES6引入：import querystring from 'querystring'

- parse、decode  将query字符串解析成对象
- escape  参数编码
- unescape 参数解码
- encode、stringify 将对象转换成query字符串。如果属性值不是string、boolean和number中的一种，它就不能序列化，返回内容中的关键字对应的值为空



# [Element-UI](https://element.eleme.cn/#/zh-CN/component/installation)

```javascript
//安装
npm i element-ui -S
//引入
<!-- 引入样式 --> 
\<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css"> 
<!-- 引入组件库 --> 
\<script src="https://unpkg.com/element-ui/lib/index.js">\</script>
//VUE main.js
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(ElementUI);

new Vue({
  el: '#app',
  render: h => h(App)
});

//使用：复制
```

## 组件

#### [tree](https://element.eleme.cn/#/zh-CN/component/tree#attributes)动态新增子节点

# [iconfont-阿里巴巴矢量图标库](https://www.iconfont.cn/)





# 其他

1. Ajax：ajax最早出现的发送后端请求技术，隶属于原始js中，核心使用XMLHttpRequest对象，多个请求之间如果有先后关系的话，就会出现回调地狱。
2. Jquery Ajax：是jQuery框架中的发送后端请求技术，由于jQuery是基于原始的基础上做的封装，所以，jquery Ajax自然也是原始ajax的封装。
3. Promise:Promise主要用于解决异步回调嵌套的问题。
4. Fetch：fetch号称是AJAX的替代品，是在ES6出现的，使用了ES6中的promise对象。Fetch是基于promise设计的。Fetch的代码结构比起ajax简单多了，参数有点像jQuery ajax。但是，一定记住fetch不是ajax的进一步封装，而是原生js。Fetch函数就是原生js，没有使用XMLHttpRequest对象。
5. axios：axios是通过promise实现对ajax技术的一种封装，就像jQuery实现ajax封装一样。即*ajax技术实现了网页的局部数据刷新，axios实现了对ajax的封装。它不仅可以在客户端使用，也可以在nodejs端使用，也可以在请求和响应阶段进行拦截*
5. 

# 开发技巧

## VsCode代码片段模板

添加路径：Windows/Linux: File→Preferences→User Snippets macOS: Code→Preferences→User Snippets

### 示例：VUE

```vue
"Print to console": {
		"prefix": "vue",
		"body": [
			"<!-- $1 -->",
			"\<template>",
			"\<div class='$2'>$5\</div>",
			"\</template>",
			"",
			"\<script>",
			"//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）",
			"//例如：import 《组件名称》 from '《组件路径》';",
			"",
			"export default {",
			"//import引入的组件需要注入到对象中才能使用",
			"components: {},",
			"data() {",
			"//这里存放数据",
			"return {",
			"",
			"};",
			"},",
			"//监听属性 类似于data概念",
			"computed: {},",
			"//监控data中的数据变化",
			"watch: {},",
			"//方法集合",
			"methods: {",
			"",
			"},",
			"//生命周期 - 创建完成（可以访问当前this实例）",
			"created() {",
			"",
			"},",
			"//生命周期 - 挂载完成（可以访问DOM元素）",
			"mounted() {",
			"",
			"},",
			"beforeCreate() {}, //生命周期 - 创建之前",
			"beforeMount() {}, //生命周期 - 挂载之前",
			"beforeUpdate() {}, //生命周期 - 更新之前",
			"updated() {}, //生命周期 - 更新之后",
			"beforeDestroy() {}, //生命周期 - 销毁之前",
			"destroyed() {}, //生命周期 - 销毁完成",
			"activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发",
			"}",
			"\</script>",
			"\<style scoped>",
			"//@import url($3); 引入公共css类",
			"$4",
			"\</style>"
		],
		"description": "生成vue模板"
	},
	"http-get请求": {
		"prefix": "httpget",
		"body": [
			"this.\\$http({",
			"url: this.\\$http.adornUrl(''),",
			"method: 'get',",
			"params: this.\\$http.adornParams({})",
			"}).then(({ data }) => {",
			"})"
		],
		"description": "httpGET请求"
	},
	"http-post请求": {
		"prefix": "httppost",
		"body": [
			"this.\\$http({",
			"url: this.\\$http.adornUrl(''),",
			"method: 'post',",
			"data: this.\\$http.adornData(data, false)",
			"}).then(({ data }) => { });"
		],
		"description": "httpPOST请求"
	}
```



## 调试技巧

1. 侵入式：代码中添加debugger；

2. 侵入式：代码中或控制台输入console（VS中cl快捷方式），代码中使用alert弹出信息。

3. 非侵入式：谷歌浏览器来源调试，网络中查看网络请求相关信息，元素栏进行元素定位同左上角icon作用，应用查看缓存等

   ![image-20211229200137287](http://qnimg.gisfsde.com/work/image-20211229200137287.png)

谷歌浏览器

ctrl+F5强制刷新缓存



# 设计之美

# 综合应用

## iframe

### [iframe 父子间传值通信](https://www.cnblogs.com/dxt510/p/11151744.html)

1、同域 iframe 父子间传值

（1）父页面

```html
\<html>
\<head>
    \<script type="text/javascript">
        function say(){
            alert("parent.html");
        }
        function callChild(){
            myFrame.window.say();
            myFrame.window.document.getElementById("button").value="调用结束";
        }
    \</script>
\</head>
\<body>
    \<input id="button" type="button" value="调用child.html中的函数say()" onclick="callChild()"/>
    \<iframe name="myFrame" src="child.html">\</iframe>
\</body>
\</html>
```

（2）子页面

```html
\<html>
\<head>
    \<script type="text/javascript">
        function say(){
            alert("child.html");
        }
        function callParent(){
            parent.say();
            parent.window.document.getElementById("button").value="调用结束";
        }
    \</script>
\</head>
\<body>
    \<input id="button" type="button" value="调用parent.html中的say()函数" onclick="callParent()"/>
\</body>
\</html>
```

总结：方法调用

```
父页面调用子页面方法：FrameName.window.childMethod();

子页面调用父页面方法：parent.window.parentMethod();
```

2、跨域 iframe 父子间传值

（1）父页面

```html
\<template>
    \<div>
        \<iframe 
         :src="iframesrc" 
         id="a-page">\</iframe>
    \</div>
\</template>

\<script>
export default {
    computed:{
        iframesrc:function(){
            let iframesrc = "http://b.com"
            return iframesrc
        }
    },
    created () {
        // 得到B传来的值 
        window.addEventListener('message',function(e){
            console.log("B DOM的高度", e.data)
        },false);
        // 监听A页面的事件，发送给B
        window.addEventListener('scroll', function () {
            let iframe = document.getElementById('a-page');
            
            let json = {
                scrollTop: scrollTop,
                windowHeight: windowHeight,
            };
            iframe.contentWindow.postMessage(json, '*');
        });
    }
}
\</script>
```

（2）子页面

```html
\<template>
    \<div>
        \<div id="b-page">\</div>
    \</div>
\</template>

\<script>
export default {
    mounted() {
        // 获取到B页面的值，发送给A
        let _this = this
        let b_pageH = document.getElementById('b-page').scrollHeight;
        window.parent.postMessage(b_pageH, '*');
        // 得到A页面的值
        window.addEventListener('message',function(e){
            console.log("e.data.scrollTop", e.data.scrollTop)
            console.log("e.data.windowHeight", e.data.windowHeight) 
        },false);
    }
}
\</script>
```

### 取消边框

```html
\<iframe src="https://blog.csdn.net/qq_33583069/article/details/111240367" style="width:100%;height:1100px" name="iframe_a"  frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes">\</iframe>
```

​    

## 接口

```javascript
//导入
$ npm install axios
import axios from "axios";

\<script src="https://unpkg.com/axios/dist/axios.min.js">\</script>

使用
axios.request(config)
axios.get(url[, config])
axios.delete(url[, config])
axios.head(url[, config])
axios.options(url[, config])
axios.post(url[, data[, config]])
axios.put(url[, data[, config]])
axios.patch(url[, data[, config]])

//示例
    axios.get("http://172.18.109.13:8083/512834d664a4d3407b4c18ba3e8b3b66373945ec/ArcGIS/MapService/Catalog/SDE.L2021PS.gis/query?&f=json").then((res) => {
        console.log("res", res);
      });
```

## VUE深拷贝浅拷贝

## 缓存

### cookie 

Cookie是存储在用户计算机上的小文件，保存特定客户端和网站的适量数据，并可以有Web服务器或客户端浏览器访问，允许服务器提供针对特定用户定制的页面，或者页面本身可以包含一些知道cookie中的数据的脚本。

#### 存取

```js
//根据名称获取Cookie
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return null;
};
 
//设置Cookie； 参数cname名称，cvalue值，exdays天数
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires + ";path=/;domain=.xxxxx.com";
};
//使用时一定要修改 .xxxxx.com 为你的域名，  如www.baidu.com 改为.baidu.com
```

#### 常规

```js
function setCookie(cname,cvalue,exdays){
    var d = new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
}
function getCookie(cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name)==0) { return c.substring(name.length,c.length); }
    }
    return "";
}
function checkCookie(){
    var user=getCookie("username");
    if (user!=""){
        alert("欢迎 " + user + " 再次访问");
    }
    else {
        user = prompt("请输入你的名字:","");
          if (user!="" && user!=null){
            setCookie("username",user,30);
        }
    }
}
```



#### 跨域cookie 

```js
function setCookie(c_name, value, expiredays) {
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + expiredays);
		document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString() + ";path=/;domain=.testdomain.com")
	}
 
	var AdTime = new Date(); 
	if (AdTime != "") {
 
		setCookie("AdTime", AdTime, 1);
	}
```

### sessionStorage:临时的会话存储

​    只要当前的会话窗口未关闭，存储的信息就不会丢失，即便刷新了页面，或者在编辑器中更改了代码，存储的会话信息也不会丢失。

### localStorage:永久存储

 会一直将数据存储在客户端的储存方式，即使关闭了浏览器，下次打开的时候仍然可以看到之前存储的未主动清楚的数据(即便是杀毒软件或者浏览器自带的清除功能，也不能将localStorage存储的数据清除掉)

#### 相关操作

```js
		//设置缓存
        localStorage.setItem('name', '张三')
        sessionStorage.setItem('name', '李四')
        //删除缓存
        localStorage.removeItem('name')
        sessionStorage.removeItem('name')
        //获取缓存
        console.log(localStorage.getItem('name'))
        console.log(sessionStorage.getItem('name'))

        //设置json类数据
        localStorage.jsonData = JSON.stringify(jsonData)
        sessionStorage.jsonData = JSON.stringify(jsonData)
        //获取
        console.log(localStorage.jsonData)
        console.log(sessionStorage.jsonData)



        localStorage.setItem('name', '张三')
        localStorage.age = '18'
        sessionStorage.setItem('name', '李四')
        sessionStorage.age = '20'
 
        //清除所有数据
        localStorage.clear()
        sessionStorage.clear()
 
        console.log(localStorage.getItem('name'), localStorage.age)
        console.log(sessionStorage.getItem('name'), sessionStorage.age)
```

## 数据类型转换

## 判断终端类型

```js
//判断终端类型
      function systemType() {
        let agent = navigator.userAgent.toLowerCase();
        let windows = agent.indexOf("win") > -1 || agent.indexOf("wow") > -1;
        let mac = /macintosh|mac x/i.test(agent);
        let iOS = !!agent.match(/\(i[^;]+;( u;)? cpu.+mac os x/);
        let android =
          agent.indexOf("android") > -1 || agent.indexOf("adr") > -1;

        if (windows) return "Windows";
        if (mac) return "mac";
        if (iOS) return "iOS";
        if (android) return "Android";
      }
```

## VUE项目局域网访问

1.开启对应端口的防火墙

2.在 config 文件中，将 host 设置为 0.0.0.0

module.exports = {
    dev: {
        host: "0.0.0.0",
        port: 8080, 
2.在 webpack.dev.conf.js 文件，devServer中加入 useLocalIp: true,

防止运行项目时地址为0.0.0.0，设置后无需手动更改ip地址

devServer: {
    useLocalIp: true,
    clientLogLevel: 'warning',

## Cannot find module '@/views/dgrh/project/index

```js
export const loadView = (view) => { // 路由懒加载
  return () => import(`@/views/${view}`)
   //return (resolve) => require([`@/views/${view}.vue`], resolve)
}
```

## 未操作监听

```js
    actionListener() {
      var count = 0;
      var outTime = 0.1; //分钟
      function go() {
        count++;
        if (count == outTime * 60) {
          alert("您长时间未操作页面");
          // 此处处理后续操作
        }
      }
      //页面倒计时
      window.setInterval(go, 1000);
      //监听鼠标
      var x;
      var y;
      document.onmousemove = function (event) {
        /* Act on the event */
        var x1 = event.clientX;
        var y1 = event.clientY;
        if (x != x1 || y != y1) {
          count = 0;
        }
        x = x1;
        y = y1;
      };
      document.onkeydown = function (event) {
        count = 0;
      };
    },
```

## 获取url相关参数

```
var url      = window.location.href;  // 返回完整 URL (https://www.runoob.com/html/html-tutorial.html)
var pathname = window.location.pathname; // 返回路径部分 (/html/html-tutorial.html)
var origin   = window.location.origin;   // 返回基础 URL (https://www.runoob.com/)
var domain = document.domain;  // 返回域名部分 (www.runoob.com)

//获取参数
function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}
```

## 同步异步

JS是**单线程**的，**同步**是几件事一个事做完再做下个事，**异步**是几件事中间一件事可先跳过，剩下的事全部执行完后执行跳过的事。异步比如：定时器、事件绑定、Ajax读取数据、回调函数。