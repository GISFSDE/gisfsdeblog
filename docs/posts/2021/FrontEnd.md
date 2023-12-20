---
index: 2
icon: markdown
title: 前端
date: 2022-06-06
category:
  - 前端
tag:
  - 前端
sticker: emoji//1f308
---

> UI、VUE、HTML、JS、、、、

<!-- more -->
进度：[07.尚硅谷\_ES6-模板字符串\_哔哩哔哩\_bilibili](https://www.bilibili.com/video/BV1uK411H7on/?p=7&spm_id_from=pageDriver&vd_source=10bfbb2d4bb1646ac73508c202d5f815)
# TODO
---
## 优先级

+ [x] VUE2
+ [x] CSS3 ✅ 2023-10-15
+ [x] HTML5 ✅ 2023-10-15
+ [ ] css预处理器（Less、Sass、Stylus选前二）
+ [ ] ES6
+ [ ] 移动端（三种视口、高清显示、适配方案、事件处理）
+ [ ] 工程化（node、webpack、gulp）
+ [ ] 组件
+ [ ] VUE3
+ [ ] react、TS
+ [ ] 小程序
+ [ ] 原生应用（可安装，uni-app、Flutter、ReactNative）
+ [ ] 其他（echarts、three.js、、、）

## 组件

- [ ] 资源加载树（数据操作层次修改）
- [ ] 文件操作、显示
- [ ] FORM
- [ ] TABLE
- [ ] Pagination
- [ ] Descriptions 描述列表
- [ ] ECharts
- [ ] MessageBox 弹框
- [ ] Carousel 走马灯
- [ ] 动画背景
- [ ] 地图
## 其他
- [ ] 代码布局架构
## BASE
### [ES6](https://es6.ruanyifeng.com/#README)
- [ ] 异步同步
- [ ] class
### CSS3

### HTML5

## Frame

### VUE3
### React（考虑ing）
### 安卓（考虑ing）
### IOS（考虑ing）

## Tool
### NODE
### NPM

### MVN

### webpack

## UI
+ [ ] [原型交互](https://js.design/workspace)
+ [ ] UI设计
+ [ ] 平面设计（WEB/APP/小程序/运营插画設計）
+ [ ] 设计规范
+ [ ] 审美
+ [ ] 色彩搭配
+ [ ] 排版

  

## 其他

### ICON

### 中间件

- [ ] Element-UI
- [ ] Bootstrap
- [ ] jQuery
- [ ] Promise
- [ ] Node.js
- [ ] AJAX
- [ ] axios
- [ ] Webpack5
- [ ] 微信小程序

## 移动端
- [ ] Android
- [ ] IOS

# 学习记录
---
# VUE

## 速查 

### 常用指令

|                  指令                   |            作用            |  简写   |      |
| :-------------------------------------: | :------------------------: | :-----: | ---- |
|                 v-bind:                 |     data向容器单向绑定     |   ：    |      |
|              v-model:value              |          双向绑定          | v-model |      |
|               v-on:click                |          事件绑定          | @click  |      |
|                  v-if                   | 显示删除  与template可包裹 |         |      |
|                 v-show                  |          显示隐藏          |         |      |
| v-for="(item, index) in xxx" :key="yyy" |            遍历            |         |      |
|                                         |                            |         |      |
|                                         |                            |         |      |
|                                         |                            |         |      |
|                                         |                            |         |      |
|                                         |                            |         |      |
|                                         |                            |         |      |
|                                         |                            |         |      |
|                                         |                            |         |      |
|                                         |                            |         |      |
|                                         |                            |         |      |
|                                         |                            |         |      |
|                                         |                            |         |      |

npm run build --report  查看依赖大小树

## 准备

教程：[尚硅谷Vue2.0+Vue3.0全套教程丨vuejs从入门到精通_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Zy4y1K7SH?spm_id_from=333.337.search-card.all.click)

官网：1. 英文官网: https://vuejs.org/   中文官网: https://cn.vuejs.org/

技巧：[介绍 — Vue.js (vuejs.org)](https://v2.cn.vuejs.org/v2/cookbook/)

[ES6](https://es6.ruanyifeng.com/)、axios、promise、异同步、原型链

## 简介

### 特点

1. 借鉴Angular 的模板和数据绑定技术
2. 借鉴React 的组件化和虚拟DOM 技术

- 组件化模式，提高代码复用率，更好维护
- 声明式代码，无需直接操作DOM
- 遵循MVVM 模式
- 编码简洁, 体积小, 运行效率高, 适合移动/PC 端开发
- 动态构建用户界面的渐进式JavaScript 框架，
- 它本身只关注UI, 也可以引入其它第三方库开发项目

### [周边库](https://github.com/vuejs/awesome-vue)

[Awesome Vue packages - Awesome JS](https://awesomejs.dev/for/vue/)

1. vue-cli: vue 脚手架
2. vue-resource
3. axios
4. vue-router: 路由
5. vuex: 状态管理
6. element-ui: 基于vue 的UI 组件库(PC 端)
……

### MVVM模型

1. M：模型(Model) ：对应data 中的数据
2. V：视图(View) ：模板
3. VM：视图模型(ViewModel) ： Vue 实例对象

![image-20221106163455735](https://qnimg.gisfsde.com/markdown/image-20221106163455735.png)

### 初识VUE

```vue		
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>

    <div id="app">
        <input type="text" v-model="num">
        <button v-on:click="num++">点赞</button>
        <button v-on:click="cancle">取消</button>
        <!-- {{}} 插值，可绑定data值或js表达式 -->
        <h1> {{name}} ,非常帅，有{{num}}个人为他点赞{{hello()}}</h1>
    </div>
    <!-- CDN方式安装，vue.mini.js 压缩版会删除一些开发提示 -->
    <script src="./vue.js"></script>

    <script>
        //1、vue声明式渲染,创建实例，真实开发中只会有一个实例
        let vm = new Vue({
            el: "#app",//绑定元素，容器与实例一一对应
            data: {  //封装数据
                name: "张三",
                num: 1
            },
            methods: {  //封装方法
                cancle() {
                    this.num--;
                },
                hello() {
                    return "1"
                }
            }
        });
    </script>
</body>

</html>
```

## 创建新项目

### 环境

#### NPM

全局切换镜像源：npm config set registry http://registry.npm.taobao.org
查看镜像源使用状态：npm get registry
全局切换官方镜像源：npm config set registry http://www.npmjs.org

#### CLI

```bash
npm install -g @vue/cli
```



### 安装

[创建新项目](https://cli.vuejs.org/zh/guide/creating-a-project.html)

vue-cli版本是2.0左右的就会有webpack的config目录
vue-cli版本是3.0以上的就会有[vue.config.js](https://cli.vuejs.org/zh/config/)没有config目录

#### vue init

是vue-cli**2.x**的初始化方式，可以使用github上面的一些模板来初始化项目

webpack是官方推荐的标准模板名

使用方式：vue init webpack 项目名称

electron-vue的模板

使用方式：vue init simulatedgreg/electron-vue 项目名称

####  vue create

是vue-cli**3.x**的初始化方式，模板是固定的，模板选项可自由配置

使用方式：vue create 项目名称

### CLI3 初始化项目文件结构说明

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
│  vue.config.js                      cli 3 需手动添加 配置文件：https://cli.vuejs.org/zh/config/
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

### Src工程化文件目录结构

```cmd
├─src
│  │  App.vue	 所有组件父组件
│  │  main.js    项目入口文件
│  │
│  ├─api
│  ├─assets     静态资源
│  │      logo.png
│  │
│  ├─components   组件
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

1.运行方式：
cli2 运行:npm run dev
cli3 运行：npm run serve
至于为什么会变，看一下package.json

2.文件夹目录：
[cli3 文件目录](https://blog.csdn.net/weixin_37806077/article/details/102514115)：取消掉了config目录、build目录、static目录（原引用方式/static/...） ,多了public目录，还有最重要的一点，3.0的安装项目时自动下载node-model，vue.config.js也没了，需要手动添加。

3.创建项目方式：
cli3的安装：vue create project
cli2的安装：vue init webpack project

## VUE基础知识

### 1、指令

1、v-text、v-html.html

2、v-bind.html

3、v-model.html

4、v-on.html

5、v-for.html

6、v-if和v-show.html

7、v-else和v-else-if.html

### 2、计算属性和侦听器

1、计算属性和侦听器.html

2、过滤器.html

### 3、组件化

1、组件化.html

### 4、生命周期钩子函数

1、生命周期.html

### 05_MVVM模型

Vue中的MVVM.html

### 06_数据代理

1.回顾Object.defineProperty方法.html

2.何为数据代理.html

3.Vue中的数据代理.html

### 07_事件处理

1.事件的基本使用.html

2.事件修饰符.html

```vue
	<!-- 
				Vue中的事件修饰符：
						1.prevent：阻止默认事件（常用）；
						2.stop：阻止事件冒泡（常用）；
						3.once：事件只触发一次（常用）；
						4.capture：使用事件的捕获模式；
						5.self：只有event.target是当前操作的元素时才触发事件；
						6.passive：事件的默认行为立即执行，无需等待事件回调执行完毕；
		-->
	<!-- 准备好一个容器-->
<body>
	<div id="root">
		<h2>欢迎来到{{name}}学习</h2>
		<!-- 阻止默认事件（常用） -->
		<a href="http://www.atguigu.com" @click.prevent="showInfo">点我提示信息</a>

		<!-- 阻止事件冒泡（常用） -->
		<div class="demo1" @click="showInfo">
			<button @click.stop="showInfo">点我提示信息</button>
			<!-- 修饰符可以连续写 -->
			<!-- <a href="http://www.atguigu.com" @click.prevent.stop="showInfo">点我提示信息</a> -->
		</div>

		<!-- 事件只触发一次（常用） -->
		<button @click.once="showInfo">点我提示信息</button>

		<!-- 使用事件的捕获模式 -->
		<div class="box1" @click.capture="showMsg(1)">
			div1
			<div class="box2" @click="showMsg(2)">
				div2
			</div>
		</div>

		<!-- 只有event.target是当前操作的元素时才触发事件； -->
		<div class="demo1" @click.self="showInfo">
			<button @click="showInfo">点我提示信息</button>
		</div>

		<!-- 事件的默认行为立即执行，无需等待事件回调执行完毕； -->
		<ul @wheel.passive="demo" class="list">
			<li>1</li>
			<li>2</li>
			<li>3</li>
			<li>4</li>
		</ul>

	</div>
</body>

<script type="text/javascript">
	Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

	new Vue({
		el: '#root',
		data: {
			name: '尚硅谷'
		},
		methods: {
			showInfo(e) {
				alert('同学你好！')
				// console.log(e.target)
			},
			showMsg(msg) {
				console.log(msg)
			},
			demo() {
				for (let i = 0; i < 100000; i++) {
					console.log('#')
				}
				console.log('累坏了')
			}
		}
	})
</script>
```

3.键盘事件.html

### 08_计算属性

1.姓名案例_插值语法实现.html

2.姓名案例_methods实现.html

3.姓名案例_计算属性实现.html

4.姓名案例_计算属性简写.html

### 09_监视属性

1.天气案例.html

2.天气案例_监视属性.html

3.天气案例_深度监视.html

4.天气案例_监视属性_简写.html

5.姓名案例_watch实现.html

### 10_绑定样式

绑定样式.html

### 11_条件渲染

条件渲染.html

### 12_列表渲染

1.基本列表.html

10.总结Vue数据监测.html

2.key的原理.html

3.列表过滤.html

4.列表排序.html

5.更新时的一个问题.html

6.Vue监测数据改变的原理_对象.html

7.模拟一个数据监测.html

8.Vue.set的使用.html

9.Vue监测数据改变的原理_数组.html

### 13_收集表单数据

收集表单数据.html

### 14_过滤器

过滤器.html

### 15_内置指令

1.v-text_指令.html

2.v-html_指令.html

3.v-cloak_指令.html

4.v-once_指令.html

5.v-pre_指令.html

### 16_自定义指令

1.自定义指令.html

2.回顾一个DOM操作.html

### 17_生命周期

![生命周期图.jpg](https://qnimg.gisfsde.com/markdown/aHR0cHM6Ly9jZG4ubmxhcmsuY29tL3l1cXVlLzAvMjAyMC9qcGVnLzUzMDc2NC8xNTgyMzgxMzU5NjA5LTIxN2RjNmE3LTJmZGItNGVlMC05OGNhLWUwOGM2MTJlMDU5OS5qcGVn)

1.引出生命周期.html

2.分析生命周期.html

3.总结生命周期.html

### 18_非单文件组件

1.基本使用.html

2.几个注意点.html

3.组件的嵌套.html

4.VueComponent.html

5.一个重要的内置关系.html

### 19_单文件组件

#### [组件之间传值](https://blog.csdn.net/qq_42005992/article/details/111290354)

![在这里插入图片描述](http://qnimg.gisfsde.com/work/20201216164359342.png)

脚手架文件结构

	├── node_modules 
	├── public
	│   ├── favicon.ico: 页签图标
	│   └── index.html: 主页面
	├── src
	│   ├── assets: 存放静态资源
	│   │   └── logo.png
	│   │── component: 存放组件
	│   │   └── HelloWorld.vue
	│   │── App.vue: 汇总所有组件
	│   │── main.js: 入口文件
	├── .gitignore: git版本管制忽略的配置
	├── babel.config.js: babel的配置文件
	├── package.json: 应用包配置文件 
	├── README.md: 应用描述文件
	├── package-lock.json：包版本控制文件

### 关于不同版本的Vue

1. vue.js与vue.runtime.xxx.js的区别：
    1. vue.js是完整版的Vue，包含：核心功能 + 模板解析器。
    2. vue.runtime.xxx.js是运行版的Vue，只包含：核心功能；没有模板解析器。
2. 因为vue.runtime.xxx.js没有模板解析器，所以不能使用template这个配置项，需要使用render函数接收到的createElement函数去指定具体内容。

### vue.config.js配置文件

1. 使用vue inspect > output.js可以查看到Vue脚手架的默认配置。
2. 使用vue.config.js可以对脚手架进行个性化定制，详情见：https://cli.vuejs.org/zh

### ref属性

1. 被用来给元素或子组件注册引用信息（id的替代者）
2. 应用在html标签上获取的是真实DOM元素，应用在组件标签上是组件实例对象（vc）
3. 使用方式：
    1. 打标识：```<h1 ref="xxx">.....</h1>``` 或 ```<School ref="xxx"></School>```
    2. 获取：```this.$refs.xxx```

### props配置项

1. 功能：让组件接收外部传过来的数据

2. 传递数据：```<Demo name="xxx"/>```

3. 接收数据：

    1. 第一种方式（只接收）：```props:['name'] ```

    2. 第二种方式（限制类型）：```props:{name:String}```

    3. 第三种方式（限制类型、限制必要性、指定默认值）：

        ```js
        props:{
        	name:{
        	type:String, //类型
        	required:true, //必要性
        	default:'老王' //默认值
        	}
        }
        ```

    > 备注：props是只读的，Vue底层会监测你对props的修改，如果进行了修改，就会发出警告，若业务需求确实需要修改，那么请复制props的内容到data中一份，然后去修改data中的数据。

### mixin(混入)

1. 功能：可以把多个组件共用的配置提取成一个混入对象

2. 使用方式：

    第一步定义混合：

    ```
    {
        data(){....},
        methods:{....}
        ....
    }
    ```

    第二步使用混入：

    ​	全局混入：```Vue.mixin(xxx)```
    ​	局部混入：```mixins:['xxx']	```

### 插件

1. 功能：用于增强Vue

2. 本质：包含install方法的一个对象，install的第一个参数是Vue，第二个以后的参数是插件使用者传递的数据。

3. 定义插件：

    ```js
    对象.install = function (Vue, options) {
        // 1. 添加全局过滤器
        Vue.filter(....)
    
        // 2. 添加全局指令
        Vue.directive(....)
    
        // 3. 配置全局混入(合)
        Vue.mixin(....)
    
        // 4. 添加实例方法
        Vue.prototype.$myMethod = function () {...}
        Vue.prototype.$myProperty = xxxx
    }
    ```

4. 使用插件：```Vue.use()```

### scoped样式

1. 作用：让样式在局部生效，防止冲突。
2. 写法：```<style scoped>```

### 总结TodoList案例

1. 组件化编码流程：

    ​	(1).拆分静态组件：组件要按照功能点拆分，命名不要与html元素冲突。

    ​	(2).实现动态组件：考虑好数据的存放位置，数据是一个组件在用，还是一些组件在用：

    ​			1).一个组件在用：放在组件自身即可。

    ​			2). 一些组件在用：放在他们共同的父组件上（<span style="color:red">状态提升</span>）。

    ​	(3).实现交互：从绑定事件开始。

2. props适用于：

    ​	(1).父组件 ==> 子组件 通信

    ​	(2).子组件 ==> 父组件 通信（要求父先给子一个函数）

3. 使用v-model时要切记：v-model绑定的值不能是props传过来的值，因为props是不可以修改的！

4. props传过来的若是对象类型的值，修改对象中的属性时Vue不会报错，但不推荐这样做。

### webStorage

1. 存储内容大小一般支持5MB左右（不同浏览器可能还不一样）

2. 浏览器端通过 Window.sessionStorage 和 Window.localStorage 属性来实现本地存储机制。

3. 相关API：

    1. ```xxxxxStorage.setItem('key', 'value');```
        				该方法接受一个键和值作为参数，会把键值对添加到存储中，如果键名存在，则更新其对应的值。

    2. ```xxxxxStorage.getItem('person');```

        ​		该方法接受一个键名作为参数，返回键名对应的值。

    3. ```xxxxxStorage.removeItem('key');```

        ​		该方法接受一个键名作为参数，并把该键名从存储中删除。

    4. ``` xxxxxStorage.clear()```

        ​		该方法会清空存储中的所有数据。

4. 备注：

    1. SessionStorage存储的内容会随着浏览器窗口关闭而消失。
    2. LocalStorage存储的内容，需要手动清除才会消失。
    3. ```xxxxxStorage.getItem(xxx)```如果xxx对应的value获取不到，那么getItem的返回值是null。
    4. ```JSON.parse(null)```的结果依然是null。

### 组件的自定义事件

1. 一种组件间通信的方式，适用于：<strong style="color:red">子组件 ===> 父组件</strong>

2. 使用场景：A是父组件，B是子组件，B想给A传数据，那么就要在A中给B绑定自定义事件（<span style="color:red">事件的回调在A中</span>）。

3. 绑定自定义事件：

    1. 第一种方式，在父组件中：```<Demo @atguigu="test"/>```  或 ```<Demo v-on:atguigu="test"/>```

    2. 第二种方式，在父组件中：

        ```js
        <Demo ref="demo"/>
        ......
        mounted(){
           this.$refs.xxx.$on('atguigu',this.test)
        }
        ```

    3. 若想让自定义事件只能触发一次，可以使用```once```修饰符，或```$once```方法。

4. 触发自定义事件：```this.$emit('atguigu',数据)```		

5. 解绑自定义事件```this.$off('atguigu')```

6. 组件上也可以绑定原生DOM事件，需要使用```native```修饰符。

7. 注意：通过```this.$refs.xxx.$on('atguigu',回调)```绑定自定义事件时，回调<span style="color:red">要么配置在methods中</span>，<span style="color:red">要么用箭头函数</span>，否则this指向会出问题！

### 全局事件总线（GlobalEventBus）

1. 一种组件间通信的方式，适用于<span style="color:red">任意组件间通信</span>。

2. 安装全局事件总线：

   ```js
   new Vue({
   	......
   	beforeCreate() {
   		Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
   	},
       ......
   }) 
   ```

3. 使用事件总线：

   1. 接收数据：A组件想接收数据，则在A组件中给$bus绑定自定义事件，事件的<span style="color:red">回调留在A组件自身。</span>

      ```js
      methods(){
        demo(data){......}
      }
      ......
      mounted() {
        this.$bus.$on('xxxx',this.demo)
      }
      ```

   2. 提供数据：```this.$bus.$emit('xxxx',数据)```

4. 最好在beforeDestroy钩子中，用$off去解绑<span style="color:red">当前组件所用到的</span>事件。

### 消息订阅与发布（pubsub）

1.   一种组件间通信的方式，适用于<span style="color:red">任意组件间通信</span>。

2. 使用步骤：

   1. 安装pubsub：```npm i pubsub-js```

   2. 引入: ```import pubsub from 'pubsub-js'```

   3. 接收数据：A组件想接收数据，则在A组件中订阅消息，订阅的<span style="color:red">回调留在A组件自身。</span>

      ```js
      methods(){
        demo(data){......}
      }
      ......
      mounted() {
        this.pid = pubsub.subscribe('xxx',this.demo) //订阅消息
      }
      ```

   4. 提供数据：```pubsub.publish('xxx',数据)```

   5. 最好在beforeDestroy钩子中，用```PubSub.unsubscribe(pid)```去<span style="color:red">取消订阅。</span>
	
### nextTick

1. 语法：```this.$nextTick(回调函数)```
2. 作用：在下一次 DOM 更新结束后执行其指定的回调。
3. 什么时候用：当改变数据后，要基于更新后的新DOM进行某些操作时，要在nextTick所指定的回调函数中执行。

### Vue封装的过度与动画

1. 作用：在插入、更新或移除 DOM元素时，在合适的时候给元素添加样式类名。

2. 图示：<img src="https://img04.sogoucdn.com/app/a/100520146/5990c1dff7dc7a8fb3b34b4462bd0105" style="width:60%" />

3. 写法：

   1. 准备好样式：

      - 元素进入的样式：
        1. v-enter：进入的起点
        2. v-enter-active：进入过程中
        3. v-enter-to：进入的终点
      - 元素离开的样式：
        1. v-leave：离开的起点
        2. v-leave-active：离开过程中
        3. v-leave-to：离开的终点

   2. 使用```<transition>```包裹要过度的元素，并配置name属性：

      ```vue
      <transition name="hello">
      	<h1 v-show="isShow">你好啊！</h1>
      </transition>
      ```

   3. 备注：若有多个元素需要过度，则需要使用：```<transition-group>```，且每个元素都要指定```key```值。

### vue脚手架配置代理

#### 方法一

​	在vue.config.js中添加如下配置：

```js
devServer:{
  proxy:"http://localhost:5000"
}
```

说明：

1. 优点：配置简单，请求资源时直接发给前端（8080）即可。
2. 缺点：不能配置多个代理，不能灵活的控制请求是否走代理。
3. 工作方式：若按照上述配置代理，当请求了前端不存在的资源时，那么该请求会转发给服务器 （优先匹配前端资源）

#### 方法二

​	编写vue.config.js配置具体代理规则：

```js
module.exports = {
	devServer: {
      proxy: {
      '/api1': {// 匹配所有以 '/api1'开头的请求路径
        target: 'http://localhost:5000',// 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {'^/api1': ''}
      },
      '/api2': {// 匹配所有以 '/api2'开头的请求路径
        target: 'http://localhost:5001',// 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {'^/api2': ''}
      }
    }
  }
}
/*
   changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
   changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:8080
   changeOrigin默认值为true
*/
```

说明：

1. 优点：可以配置多个代理，且可以灵活的控制请求是否走代理。
2. 缺点：配置略微繁琐，请求资源时必须加前缀。

### 插槽

1. 作用：让父组件可以向子组件指定位置插入html结构，也是一种组件间通信的方式，适用于 <strong style="color:red">父组件 ===> 子组件</strong> 。

2. 分类：默认插槽、具名插槽、作用域插槽

3. 使用方式：

   1. 默认插槽：

      ```vue
      父组件中：
              <Category>
                 <div>html结构1</div>
              </Category>
      子组件中：
              <template>
                  <div>
                     <!-- 定义插槽 -->
                     <slot>插槽默认内容...</slot>
                  </div>
              </template>
      ```

   2. 具名插槽：

      ```vue
      父组件中：
              <Category>
                  <template slot="center">
                    <div>html结构1</div>
                  </template>
      
                  <template v-slot:footer>
                     <div>html结构2</div>
                  </template>
              </Category>
      子组件中：
              <template>
                  <div>
                     <!-- 定义插槽 -->
                     <slot name="center">插槽默认内容...</slot>
                     <slot name="footer">插槽默认内容...</slot>
                  </div>
              </template>
      ```

   3. 作用域插槽：

      1. 理解：<span style="color:red">数据在组件的自身，但根据数据生成的结构需要组件的使用者来决定。</span>（games数据在Category组件中，但使用数据所遍历出来的结构由App组件决定）

      2. 具体编码：

         ```vue
         父组件中：
         		<Category>
         			<template scope="scopeData">
         				<!-- 生成的是ul列表 -->
         				<ul>
         					<li v-for="g in scopeData.games" :key="g">{{g}}</li>
         				</ul>
         			</template>
         		</Category>
         
         		<Category>
         			<template slot-scope="scopeData">
         				<!-- 生成的是h4标题 -->
         				<h4 v-for="g in scopeData.games" :key="g">{{g}}</h4>
         			</template>
         		</Category>
         子组件中：
                 <template>
                     <div>
                         <slot :games="games"></slot>
                     </div>
                 </template>
         		
                 <script>
                     export default {
                         name:'Category',
                         props:['title'],
                         //数据在子组件自身
                         data() {
                             return {
                                 games:['红色警戒','穿越火线','劲舞团','超级玛丽']
                             }
                         },
                     }
                 </script>
         ```
   ```
   
   ```

### Vuex

#### 1.概念

​		在Vue中实现集中式状态（数据）管理的一个Vue插件，对vue应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信的方式，且适用于任意组件间通信。

#### 2.何时使用？

​		多个组件需要共享数据时

#### 3.搭建vuex环境

1. 创建文件：```src/store/index.js```

   ```js
   //引入Vue核心库
   import Vue from 'vue'
   //引入Vuex
   import Vuex from 'vuex'
   //应用Vuex插件
   Vue.use(Vuex)
   
   //准备actions对象——响应组件中用户的动作
   const actions = {}
   //准备mutations对象——修改state中的数据
   const mutations = {}
   //准备state对象——保存具体的数据
   const state = {}
   
   //创建并暴露store
   export default new Vuex.Store({
   	actions,
   	mutations,
   	state
   })
   ```

2. 在```main.js```中创建vm时传入```store```配置项

   ```js
   ......
   //引入store
   import store from './store'
   ......
   
   //创建vm
   new Vue({
   	el:'#app',
   	render: h => h(App),
   	store
   })
   ```

####    4.基本使用

1. 初始化数据、配置```actions```、配置```mutations```，操作文件```store.js```

   ```js
   //引入Vue核心库
   import Vue from 'vue'
   //引入Vuex
   import Vuex from 'vuex'
   //引用Vuex
   Vue.use(Vuex)
   
   const actions = {
       //响应组件中加的动作
   	jia(context,value){
   		// console.log('actions中的jia被调用了',miniStore,value)
   		context.commit('JIA',value)
   	},
   }
   
   const mutations = {
       //执行加
   	JIA(state,value){
   		// console.log('mutations中的JIA被调用了',state,value)
   		state.sum += value
   	}
   }
   
   //初始化数据
   const state = {
      sum:0
   }
   
   //创建并暴露store
   export default new Vuex.Store({
   	actions,
   	mutations,
   	state,
   })
   ```

2. 组件中读取vuex中的数据：```$store.state.sum```

3. 组件中修改vuex中的数据：```$store.dispatch('action中的方法名',数据)``` 或 ```$store.commit('mutations中的方法名',数据)```

   >  备注：若没有网络请求或其他业务逻辑，组件中也可以越过actions，即不写```dispatch```，直接编写```commit```

#### 5.getters的使用

1. 概念：当state中的数据需要经过加工后再使用时，可以使用getters加工。

2. 在```store.js```中追加```getters```配置

   ```js
   ......
   
   const getters = {
   	bigSum(state){
   		return state.sum * 10
   	}
   }
   
   //创建并暴露store
   export default new Vuex.Store({
   	......
   	getters
   })
   ```

3. 组件中读取数据：```$store.getters.bigSum```

#### 6.四个map方法的使用

1. <strong>mapState方法：</strong>用于帮助我们映射```state```中的数据为计算属性

   ```js
   computed: {
       //借助mapState生成计算属性：sum、school、subject（对象写法）
        ...mapState({sum:'sum',school:'school',subject:'subject'}),
            
       //借助mapState生成计算属性：sum、school、subject（数组写法）
       ...mapState(['sum','school','subject']),
   },
   ```

2. <strong>mapGetters方法：</strong>用于帮助我们映射```getters```中的数据为计算属性

   ```js
   computed: {
       //借助mapGetters生成计算属性：bigSum（对象写法）
       ...mapGetters({bigSum:'bigSum'}),
   
       //借助mapGetters生成计算属性：bigSum（数组写法）
       ...mapGetters(['bigSum'])
   },
   ```

3. <strong>mapActions方法：</strong>用于帮助我们生成与```actions```对话的方法，即：包含```$store.dispatch(xxx)```的函数

   ```js
   methods:{
       //靠mapActions生成：incrementOdd、incrementWait（对象形式）
       ...mapActions({incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
   
       //靠mapActions生成：incrementOdd、incrementWait（数组形式）
       ...mapActions(['jiaOdd','jiaWait'])
   }
   ```

4. <strong>mapMutations方法：</strong>用于帮助我们生成与```mutations```对话的方法，即：包含```$store.commit(xxx)```的函数

   ```js
   methods:{
       //靠mapActions生成：increment、decrement（对象形式）
       ...mapMutations({increment:'JIA',decrement:'JIAN'}),
       
       //靠mapMutations生成：JIA、JIAN（对象形式）
       ...mapMutations(['JIA','JIAN']),
   }
   ```

> 备注：mapActions与mapMutations使用时，若需要传递参数需要：在模板中绑定事件时传递好参数，否则参数是事件对象。

#### 7.模块化+命名空间

1. 目的：让代码更好维护，让多种数据分类更加明确。

2. 修改```store.js```

   ```javascript
   const countAbout = {
     namespaced:true,//开启命名空间
     state:{x:1},
     mutations: { ... },
     actions: { ... },
     getters: {
       bigSum(state){
          return state.sum * 10
       }
     }
   }
   
   const personAbout = {
     namespaced:true,//开启命名空间
     state:{ ... },
     mutations: { ... },
     actions: { ... }
   }
   
   const store = new Vuex.Store({
     modules: {
       countAbout,
       personAbout
     }
   })
   ```

3. 开启命名空间后，组件中读取state数据：

   ```js
   //方式一：自己直接读取
   this.$store.state.personAbout.list
   //方式二：借助mapState读取：
   ...mapState('countAbout',['sum','school','subject']),
   ```

4. 开启命名空间后，组件中读取getters数据：

   ```js
   //方式一：自己直接读取
   this.$store.getters['personAbout/firstPersonName']
   //方式二：借助mapGetters读取：
   ...mapGetters('countAbout',['bigSum'])
   ```

5. 开启命名空间后，组件中调用dispatch

   ```js
   //方式一：自己直接dispatch
   this.$store.dispatch('personAbout/addPersonWang',person)
   //方式二：借助mapActions：
   ...mapActions('countAbout',{incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
   ```

6. 开启命名空间后，组件中调用commit

   ```js
   //方式一：自己直接commit
   this.$store.commit('personAbout/ADD_PERSON',person)
   //方式二：借助mapMutations：
   ...mapMutations('countAbout',{increment:'JIA',decrement:'JIAN'}),
   ```

 ### 路由

1. 理解： 一个路由（route）就是一组映射关系（key - value），多个路由需要路由器（router）进行管理。
2. 前端路由：key是路径，value是组件。

#### 1.基本使用

1. 安装vue-router，命令：```npm i vue-router```

2. 应用插件：```Vue.use(VueRouter)```

3. 编写router配置项:

   ```js
   //引入VueRouter
   import VueRouter from 'vue-router'
   //引入Luyou 组件
   import About from '../components/About'
   import Home from '../components/Home'
   
   //创建router实例对象，去管理一组一组的路由规则
   const router = new VueRouter({
   	routes:[
   		{
   			path:'/about',
   			component:About
   		},
   		{
   			path:'/home',
   			component:Home
   		}
   	]
   })
   
   //暴露router
   export default router
   ```

4. 实现切换（active-class可配置高亮样式）

   ```vue
   <router-link active-class="active" to="/about">About</router-link>
   ```

5. 指定展示位置

   ```vue
   <router-view></router-view>
   ```

#### 2.几个注意点

1. 路由组件通常存放在```pages```文件夹，一般组件通常存放在```components```文件夹。
2. 通过切换，“隐藏”了的路由组件，默认是被销毁掉的，需要的时候再去挂载。
3. 每个组件都有自己的```$route```属性，里面存储着自己的路由信息。
4. 整个应用只有一个router，可以通过组件的```$router```属性获取到。

#### 3.多级路由（多级路由）

1. 配置路由规则，使用children配置项：

   ```js
   routes:[
   	{
   		path:'/about',
   		component:About,
   	},
   	{
   		path:'/home',
   		component:Home,
   		children:[ //通过children配置子级路由
   			{
   				path:'news', //此处一定不要写：/news
   				component:News
   			},
   			{
   				path:'message',//此处一定不要写：/message
   				component:Message
   			}
   		]
   	}
   ]
   ```

2. 跳转（要写完整路径）：

   ```vue
   <router-link to="/home/news">News</router-link>
   ```

#### 4.路由的query参数

1. 传递参数

   ```vue
   <!-- 跳转并携带query参数，to的字符串写法 -->
   <router-link :to="/home/message/detail?id=666&title=你好">跳转</router-link>
   				
   <!-- 跳转并携带query参数，to的对象写法 -->
   <router-link 
   	:to="{
   		path:'/home/message/detail',
   		query:{
   		   id:666,
               title:'你好'
   		}
   	}"
   >跳转</router-link>
   ```

2. 接收参数：

   ```js
   $route.query.id
   $route.query.title
   ```

#### 5.命名路由

1. 作用：可以简化路由的跳转。

2. 如何使用

   1. 给路由命名：

      ```js
      {
      	path:'/demo',
      	component:Demo,
      	children:[
      		{
      			path:'test',
      			component:Test,
      			children:[
      				{
                            name:'hello' //给路由命名
      					path:'welcome',
      					component:Hello,
      				}
      			]
      		}
      	]
      }
      ```

   2. 简化跳转：

      ```vue
      <!--简化前，需要写完整的路径 -->
      <router-link to="/demo/test/welcome">跳转</router-link>
      
      <!--简化后，直接通过名字跳转 -->
      <router-link :to="{name:'hello'}">跳转</router-link>
      
      <!--简化写法配合传递参数 -->
      <router-link 
      	:to="{
      		name:'hello',
      		query:{
      		   id:666,
                  title:'你好'
      		}
      	}"
      >跳转</router-link>
      ```

#### 6.路由的params参数

1. 配置路由，声明接收params参数

   ```js
   {
   	path:'/home',
   	component:Home,
   	children:[
   		{
   			path:'news',
   			component:News
   		},
   		{
   			component:Message,
   			children:[
   				{
   					name:'xiangqing',
   					path:'detail/:id/:title', //使用占位符声明接收params参数
   					component:Detail
   				}
   			]
   		}
   	]
   }
   ```

2. 传递参数

   ```vue
   <!-- 跳转并携带params参数，to的字符串写法 -->
   <router-link :to="/home/message/detail/666/你好">跳转</router-link>
   				
   <!-- 跳转并携带params参数，to的对象写法 -->
   <router-link 
   	:to="{
   		name:'xiangqing',
   		params:{
   		   id:666,
               title:'你好'
   		}
   	}"
   >跳转</router-link>
   ```

   > 特别注意：路由携带params参数时，若使用to的对象写法，则不能使用path配置项，必须使用name配置！

3. 接收参数：

   ```js
   $route.params.id
   $route.params.title
   ```

#### 7.路由的props配置

​	作用：让路由组件更方便的收到参数

```js
{
	name:'xiangqing',
	path:'detail/:id',
	component:Detail,

	//第一种写法：props值为对象，该对象中所有的key-value的组合最终都会通过props传给Detail组件
	// props:{a:900}

	//第二种写法：props值为布尔值，布尔值为true，则把路由收到的所有params参数通过props传给Detail组件
	// props:true
	
	//第三种写法：props值为函数，该函数返回的对象中每一组key-value都会通过props传给Detail组件
	props(route){
		return {
			id:route.query.id,
			title:route.query.title
		}
	}
}
```

#### 8.```<router-link>```的replace属性

1. 作用：控制路由跳转时操作浏览器历史记录的模式
2. 浏览器的历史记录有两种写入方式：分别为```push```和```replace```，```push```是追加历史记录，```replace```是替换当前记录。路由跳转时候默认为```push```
3. 如何开启```replace```模式：```<router-link replace .......>News</router-link>```

#### 9.编程式路由导航

1. 作用：不借助```<router-link> ```实现路由跳转，让路由跳转更加灵活

2. 具体编码：

   ```js
   //$router的两个API
   this.$router.push({
   	name:'xiangqing',
   		params:{
   			id:xxx,
   			title:xxx
   		}
   })
   
   this.$router.replace({
   	name:'xiangqing',
   		params:{
   			id:xxx,
   			title:xxx
   		}
   })
   this.$router.forward() //前进
   this.$router.back() //后退
   this.$router.go() //可前进也可后退
   ```

#### 10.缓存路由组件

1. 作用：让不展示的路由组件保持挂载，不被销毁。

2. 具体编码：

   ```vue
   <keep-alive include="News"> 
       <router-view></router-view>
   </keep-alive>
   ```

#### 11.两个新的生命周期钩子

1. 作用：路由组件所独有的两个钩子，用于捕获路由组件的激活状态。
2. 具体名字：
   1. ```activated```路由组件被激活时触发。
   2. ```deactivated```路由组件失活时触发。

#### 12.路由守卫

1. 作用：对路由进行权限控制

2. 分类：全局守卫、独享守卫、组件内守卫

3. 全局守卫:

   ```js
   //全局前置守卫：初始化时执行、每次路由切换前执行
   router.beforeEach((to,from,next)=>{
   	console.log('beforeEach',to,from)
   	if(to.meta.isAuth){ //判断当前路由是否需要进行权限控制
   		if(localStorage.getItem('school') === 'atguigu'){ //权限控制的具体规则
   			next() //放行
   		}else{
   			alert('暂无权限查看')
   			// next({name:'guanyu'})
   		}
   	}else{
   		next() //放行
   	}
   })
   
   //全局后置守卫：初始化时执行、每次路由切换后执行
   router.afterEach((to,from)=>{
   	console.log('afterEach',to,from)
   	if(to.meta.title){ 
   		document.title = to.meta.title //修改网页的title
   	}else{
   		document.title = 'vue_test'
   	}
   })
   ```

4. 独享守卫:

   ```js
   beforeEnter(to,from,next){
   	console.log('beforeEnter',to,from)
   	if(to.meta.isAuth){ //判断当前路由是否需要进行权限控制
   		if(localStorage.getItem('school') === 'atguigu'){
   			next()
   		}else{
   			alert('暂无权限查看')
   			// next({name:'guanyu'})
   		}
   	}else{
   		next()
   	}
   }
   ```

5. 组件内守卫：

   ```js
   //进入守卫：通过路由规则，进入该组件时被调用
   beforeRouteEnter (to, from, next) {
   },
   //离开守卫：通过路由规则，离开该组件时被调用
   beforeRouteLeave (to, from, next) {
   }
   ```

#### 13.路由器的两种工作模式

1. 对于一个url来说，什么是hash值？—— “#”及其后面的内容就是hash值。
2. hash值不会包含在 HTTP 请求中，即：hash值不会带给服务器。
3. hash模式：
   1. 地址中永远带着#号，不美观 。
   2. 若以后将地址通过第三方手机app分享，若app校验严格，则地址会被标记为不合法。
   3. 兼容性较好。
4. history模式：
   1. 地址干净，美观 。
   2. 兼容性和hash模式相比略差。
   3. 应用部署上线时需要后端人员支持，解决刷新页面服务端404的问题。
	
	 

## VUE应用

### 自定义工具类

src/util  包下

### 组件拖拽

所用知识：自定义指令，css

[Vue动态引入组件_一个无所事事的美男子罢了的博客-CSDN博客_vue 动态引入组件](https://blog.csdn.net/weixin_45114462/article/details/119614980)

# [ES（ECMAScript）](https://blog.csdn.net/itzhongzi/article/details/73330681)

[JavaScript Array 对象 | 菜鸟教程 (runoob.com)](https://www.runoob.com/jsref/jsref-obj-array.html)



## 变量定义 5 vs 6

[ES5](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)

1. var定义的变量，没有块的概念，可以跨块{}访问, 不能跨函数访问，可多次重复定义相同变量，定义的变量提前用显示undefine

ES6

1. let定义的变量，只能在块作用域里访问，不能跨块访问，也不能跨函数访问，不可多次重复定义相同变量，定义的变量提前用显示报错未定义
2. const用来定义只读常量，使用时必须初始化(即必须赋值)，只能在块作用域里访问，而且不能修改指针。
3. this.$nextTick(()=>{创建地图对象代码})vue顺序加载DOM,在下一次DOM更新结束后执行其指定的回调

## 常用方法

### 数组

- [`concat()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)
- [`copyWithin()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin)
- [`every()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
- [`filter()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [`flat()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)
- [`flatMap()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)
- [`forEach()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
- [`indexOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)
- [`lastIndexOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf)
- [`map()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [`reduce()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
- [`reduceRight()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/ReduceRight)
- [`reverse()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)   数组翻转
- [`slice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
- [`some()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
- [`sort()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
- [`splice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
- [`entries()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/entries)
- [`fill()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)
- [`find()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
- [`findIndex()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)
- [`findLast()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findLast)
- [`findLastIndex()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findLastIndex)
- [`group()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/group)
- [`groupToMap()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/groupToMap)
- [`includes()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)
- [`join()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/join)
- [`keys()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/keys)
- [`toLocaleString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toLocaleString)
- [`values()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/values)

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
进度：[172\_CSS3\_新增长度单位\_哔哩哔哩\_bilibili](https://www.bilibili.com/video/BV1p84y1P7Z5?p=172&spm_id_from=pageDriver&vd_source=10bfbb2d4bb1646ac73508c202d5f815)
## css编写位置
### 行内样式
- ﻿﻿写在标签的 style 属性中，（又称：内联样式）。
- ﻿语法：

```html
<h1 style="color:red;font-size:60px;">欢迎来到尚硅谷学习</h1>
```
    
- ﻿注意点：

1. ﻿﻿﻿style 属性的值不能随便写，写要符合CSS语法规范，是名：值；的形式。
2. ﻿﻿行内样式表，只能控制当前标签的样式，对其他标签无效。

•存在的问题：  
书写繁琐、样式不能复用、并且没有体现：出结构与样式分离 的思想，不推荐大量使用，只有对当前元素添加简单样式时，才偶尔使用。
内部样式
### 内部样式

语法： 
```html
<style>
h1 {
•写在htm1页面内部，将所有的 csS代码提取出来，单独放在<style> 标签中。
color: red;
font-size: 40px;
}
</style>
```

注意点：

1. ﻿﻿﻿style标签理论上可以放在 HTML 文档的任何地方，但一般都放在 head  标签中。
2. ﻿﻿﻿此种写法：样式可以复用、代码结构清晰。

存在的问题：
1. ﻿﻿并没有实现：结构与样式完全分离。
2. ﻿﻿﻿多个HTML页面无法复用样式。


### 外部样式

- ﻿写在单独的.css 文件中，随后在 HTML 文件中引入使用。
- ﻿语法:

1. ﻿﻿新建一个扩展名为.css的样式文件，把所有css代码都放入此文件中。  

```css
 h1{  
    color: red;
	font-size: 40px;  
    }
```

1. ﻿﻿﻿在 HTML 文件中引入.css 文件。  
```html
    <link rel="stylesheet" href="./xxx.css">
```

•注意点：  
1.link标签要写在head标签中。
2. link 标签属性说明：
- ﻿﻿href：引入的文档来自于哪里。
- ﻿﻿rel：（relation：关系）说明引入的文档与当前文档之间的关系。
1. ﻿﻿外部样式的优势：样式可以复用、结构清晰、可触发浏览器的缓存机制，提高访问速度，实现了结构与样式的完全分离。
2. ﻿﻿﻿实际开发中，几乎都使用外部样式，这是最推荐的使用方式！
## 样式表优先级
。优先级规则：行内样式＞内部样式=外部样式
1. ﻿﻿﻿内部样式、外部样式，这二者的优先级相同，且：后面的 会覆盖 前面的（简记：“后来者居上”）。
2. ﻿﻿﻿同一个样式表中，优先级也和编写顺序有关，且：后面的会覆盖前面的（简记：“后来者居上”）。

|   |   |   |   |   |
|---|---|---|---|---|
|分类|优点|缺点|使用频率|作用范围|
|行内样式|优先级最高|1.结构与样式未分离<br><br>2.代码结构混乱<br><br>3.样式不能复用|很低|当前标签|
|内部样式|1.样式可复用<br><br>2.代码结构清晰|1.结构与样式未彻底分离<br><br>2.样式不能多页面复用|一般|当前页面|
|外部样式|1.样式可多页面复用<br><br>2.代码结构清晰<br><br>3.可触发浏览器的缓存机制<br><br>4.结构与样式彻底分离|需要引入才能使用|<br><br>最高|多个页面|

## CSS语法规范
CSS 语法由两部分构成：
- ﻿选择器：找到要添加样式的元素。
- ﻿声明块：设置具体的样式（声明块是由一个或多个声明组成的），声明的格式为：属性名：属性值；  
    备注1：最后一个声明后的分号理论上能省略，但最好还是写上。  
    备注2：选择器与声明块之间，属性名与属性值之间，均有一个空格，理论上能省略，但最好还是写上。
注释：
```css
/*注释*/
```
## 代码风格

```css
   /* - ﻿展开风格 —-开发时推荐，便于维护和调试*/  
    h1 {  
    color: red; font-size: 40px;  
    }
    /* - ﻿紧凑风格—-项目上线时推荐，可减小文件体积。*/   
    h1 {color: red; font-size:40px;}
```

- ﻿备注
项目上线时，我们会通过工具将【展开风格】的代码，变成【紧凑风格】，这样可以减小文件体积，节约网络流量，同时也能让用户打开网页时速度更快。

## 基本选择器
基本选择器包括：

1. ﻿﻿﻿通配选择器
2. ﻿﻿﻿元素选择器
3. ﻿﻿﻿类选择器
4. ﻿﻿﻿id选择器

### 通配选择器

- ﻿作用：可以选中所有的 HTML元素。
- ﻿语法：

*｛
属性名：属性值；
｝

・挙例：

```css

*｛
/* 选中所有元素 */
color: orange; font-size: 40px;
｝

```

备注：目前来看通配选择器貌似有点鸡肋，但后面清除样式时，会对我们有很大帮助，后面会详细讲。

### 元素选择器

- ﻿作用：为页面中 某种元素 统一设置样式。  
- ﻿语法：  
    标签名｛  
    属性名：属性值；
- }
- ﻿挙例：  
```css
/* 选中所有h1元素 */  
 h1 {  
 color: orange; font-size: 40px;
｝
/* 选中所有p元素 */
p {
color: blue; font-size: 60px;
｝
```
 
。备注：元素选择器无法实现差异化设置，例如上面的代码中，所有的p元素效果都一样。
### 类选择器

- ﻿作用：根据元素的class 值，来选中某些元素。  
    class 翻译过来有：种类、类别的含义，所以 class 值，又称：类名。
- ﻿语法：

.类名｛属性名：属性值；
•举例：  
```css
/* 选中所有class值为speak的元素 */  
. speak {  
color: red;  
｝  
/* 选中所有class值为answer的元素 */  
.answer {  
color: blue;
｝
```

。注意点：
1. ﻿﻿元素的 class 属性值不带，，但csS的类选择器要甜。
2. ﻿﻿﻿class 值，是我们自定义的，按照标准：不要使用纯数字、不要使用中文、尽量使用英文与数字的组合，若由多个单词组成，使用-做连接，例如：left-menu，且命名要有意义，做到“见名知意”。
﻿﻿﻿一个元素不能写多个 class 属性，下面是 错误示例：  
```html
    <！--该写法错误，元素的属性不能重复，后写的会失效-->  
    <h1 class="speak" class="big">你好啊</h1>


```
﻿﻿﻿一个元素的 class 属性，能写多个值，要用空格隔开，例如： 
```html
     <！-— 该写法正确，class属性，能写多个值-->  
    <h1 class="speak big">你好啊</h1> 
```
 
### ID选择器

- ﻿作用：根据元素的 id属性值，来精准的选中某个元素。
- ﻿语法：
```css
#id值｛
	属性名：属性值；
｝
```

- ﻿举例：  
```css
    /* 选中id值为earthy的那个元素 */
	#earthy｛  
    color: red; font-size: 60px;
	}
```

- ﻿注意：
- ﻿id 属性值：尽量由字母、数字、下划线（-）、短杠（ ）组成，最好以字母开头、不要包含空格、区分大小写。
- ﻿一个元素只能拥有一个 id 属性，多个元素的 id属性值不能相同。
- ﻿一个元素可以同时拥有id和 class 属性。
## 复合选择器
### 交集选择器
·作用：选中同时符合多个条件的元素。
交集有并且的含义(通俗理解：即…又…的意思)，例如：年轻且长得帅。
。语法：选择器1选择器2选择器3.…选择器n{}
·举例：
```css
/*选中：类名为beauty的p元素，为此种写法用的非常多！！！！*/
p.beauty{
color:blue;
}
/*选中：类名包含rich和beauty的元素*/
rich.beauty{
color:green;
```

・注意
1.有标签名，标签名必须写在前面。
2.1d选择器、理论上可以作为交集的条件，但实际应用中几乎不用一一因为没有意义。
3.交集选择器中**不可能**出现**两个元素选择器**，因为一个元素，不可能即是p元素又是span元素。
4.用的最多的交集选择器是：元素选择器配合类名选择器，例如：**p.beauty**。

### 并集选择器
作用：选中多个选择器对应的元素，又称：**分组选择器**。
所谓并集就是或者的含义(通俗理解：要么…要么…的意思)，例如：给我转10万块钱或者我报警。
·语法：**选择器1，选择器2，选择器3，…选择器n{}**
多个选择器通过，连接，此处，的含义就是：**或**。
·举例：
```css
/*选中id为peiqi,或类名为rich,或类名为beauty的元素*/
#peiqi,
.rich,
beauty{
font-size:40px;
background-color:skyblue;
width:200px;
}
```

·注意：
1.并集选择器，我们一般竖着写。
2.任何形式的选择器，都可以作为并集选择器的一部分。
3.并集选择器，通常用于集体声明，可以缩小样式表体积。

### 后代选择器
作用：选中指定元素中，符合要求的后代元素。
语法：选择器1选择器2选择器3…选择器n{}
(先写祖先，再写后代)
选择器之间，用空格隔开，空格可以理解为："xxx中的"，其实就是后代的意思。
选择器1234..n，可以是我们之前学的任何一种选择器。
·举例：
```css
/*选中u1中的所有11*/
u11i{
color:red;
}
/*选中u1中所有1i中的a*/
ul li a{
color:orange;
}
/*选中类名为subject元素中的所有1i*/
subject li{
color:blue;
}
/*选中类名为subject元素中的所有类名为front-end的li*/
subject li.front-end{
color:blue;
}
```
·注意：
1.后代选择器，最终选择的是后代，不选中祖先。
2.儿子、孙子、重孙子，都算是后代。
3.结构一定要符合之前讲的HTML嵌套要求，例如：不能p中写h1~h6。
### 子代选择器
·作用：选中指定元素中，符合要求的子元素（儿子元素）。(先写父，再写子)
子代选择器又称：子元素选择器、子选择器。
语法：选择器1>选择器2>选择器3>…选择器n
选择器之间，用>隔开，>可以理解为："xxx的子代"，其实就是儿子的意思。
选择器1234.·.n,，可以是我们之学的任何一种选择器。
·举例：
```css
/*div中的子代a元素*/
div>a{
color:red;
}
/*类名为persons的元素中的子代a元素*/
persons>a{
color:red;
}
```

注意：
1.子代选择器，最终选择的是子代，不是父级。
2.子、孙子、重孙子、重重孙子…统称后代！，子就是指儿子。
### 兄弟选择器
·相邻兄弟选择器：
作用：选中指定元素后，符合条件的**相邻兄弟**元素。
所谓相邻，就是紧挨着他的下个，简记：睡在我下铺的兄弟。
语法：**选择器1+选择器2{}**。
示例：
```css
/*选中div后相邻的兄弟p元素*/
div+p{
color:red;
}
```

·通用兄弟选择器：
作用：选中指定元素后，符合条件的**所有兄弟**元素。(简记：睡在我下铺的所有兄弟)
语法：**选择器1~选择器2{}**。
实例：
```css
/*选中div后的所有的兄弟p元素*/
div~p{
color:red;
}
```

注意：两种兄弟选择器，选择的是**下面**的兄弟。
### 属性选择器
·作用：选中属性值符合一定要求的元素。
·语法：
1.【属性名】选中具有某个属性的元素。
2.[属性名=“值“]选中包含某个属性，且属性值等于指定值的元素。
3.[属性名="值"]选中包含某个属性，且属性值以指定的值开头的元素。
4.[属性名$="值“]选中包含某个属性，且属性值以指定的值结尾的元素。
5.[属性名*=“值”]选择包含某个属性，属性值包含指定值的元素。
举例：
```css
/*选中具有tit1e属性的元素*/
div[title]{color:red;}
/*选中title属性值为atguigu的元素*/
div[title="atguigu"]{color:red;}
/*选中title属性值以a开头的元素*/
div[title^="a"]{color:red;}
/*选中title属性值以u结尾的元素*/
div[titleS="u"]{color:red;}
/*选中title属性值包含g的元素*/
div[title*="g"]{color:red;}
```
### 伪类选择器
作用：选中特殊状态的元素。
如何理解“伪”？一虚假的，不是真的。
如何理解“伪类”？一像类(class),但不是类，是元素的一种特殊状态。

常用的伪类选择器：
#### 一、动态伪类：
1.**:link**超链接未被访问的状态。
2.**:visited**超链接访问过的状态。
3.**:hover**鼠标悬停在元素上的状态。
4.**:active**元素激活的状态。
什么是激活？一一按下鼠标不松开。
注意点：遵循LVHA的顺序，即：link、visited、hover、active.
5.**:focus**获取焦点的元素。
表单类元素才能使用：focus伪类。
当用户：点击元素、触摸元素、或通过键盘的“tab”键等方式，选择元素时，就是获得焦点。
#### 二、结构伪类
常用的：
1. :first-child 所有兄弟元素中的第一个。
2. :last-child 所有兄弟元素中的最后一个。
3. :nth-child(n) 所有兄弟元素中的第 n 个。
4. :first-of-type 所有同类型兄弟元素中的第一个。
5. :last-of-type 所有同类型兄弟元素中的最后一个。
6. :nth-of-type(n) 所有同类型兄弟元素中的 第n个 。
关于n 的值：
1. 0 或不写：什么都选不中 —— 几乎不用。
2. n ：选中所有子元素 —— 几乎不用。
3. 1~正无穷的整数 ：选中对应序号的子元素。
4. 2n 或 even ：选中序号为偶数的子元素。
5. 2n+1 或 odd ：选中序号为奇数的子元素。
6. -n+3 ：选中的是前3 个。
了解即可：
1. :nth-last-child(n) 所有兄弟元素中的倒数第 n 个。
2. :nth-last-of-type(n) 所有同类型兄弟元素中的 倒数第n个 。
3. :only-child 选择没有兄弟的元素（独生子女）。
4. :only-of-type 选择没有同类型兄弟的元素。
5. :root 根元素。
6. :empty 内容为空元素（空格也算内容）。
#### 三、否定伪类：
:not(选择器) 排除满足括号中条件的元素。
#### 四、UI伪类：
1. :checked 被选中的复选框或单选按钮。
2. :enable 可用的表单元素（没有 disabled 属性）。
3. :disabled 不可用的表单元素（有disabled 属性）。
#### 五、目标伪类（了解）
:target 选中锚点指向的元素。
#### 六、语言伪类（了解）
:lang() 根据指定的语言选择元素（本质是看lang 属性的值）。
### 伪元素选择器
作用：选中元素中的一些特殊位置。
常用伪元素：
::first-letter 选中元素中的第一个文字。
::first-line 选中元素中的第一行文字。
::selection 选中被鼠标选中的内容。
::placeholder 选中输入框的提示文字。
::before 在元素最开始的位置，创建一个子元素（必须用 content 属性指定内容）。
::after 在元素最后的位置，创建一个子元素（必须用 content 属性指定内容）。





# Ajax

# JQuery

# [Axios](https://www.axios-http.cn/)

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


# 其他
---
## 前端开发流程

原型图->系统交互图->UI设计图-切图->代码实现
## 常用综合资源

[Web 开发技术 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web)

## 技术趋势

### 2022

[TS](https://www.tslang.cn/)、VUE3
## 组件

#### [tree](https://element.eleme.cn/#/zh-CN/component/tree#attributes)动态新增子节点

### [iconfont-阿里巴巴矢量图标库](https://www.iconfont.cn/)

## 开发技巧

### VsCode代码片段模板

添加路径：Windows/Linux: File→Preferences→User Snippets macOS: Code→Preferences→User Snippets

#### 示例：VUE

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



### 调试技巧

1. 侵入式：代码中添加debugger；

2. 侵入式：代码中或控制台输入console（VS中cl快捷方式），代码中使用alert弹出信息。

3. 非侵入式：谷歌浏览器来源调试，网络中查看网络请求相关信息，元素栏进行元素定位同左上角icon作用，应用查看缓存等

   ![image-20211229200137287](http://qnimg.gisfsde.com/work/image-20211229200137287.png)

谷歌浏览器

ctrl+F5强制刷新缓存



## 设计之美

## 开发规范

### 命名规范（[VUE](https://v2.cn.vuejs.org/v2/style-guide)）

- camelCase（小驼峰式命名法 —— 首字母小写）
- PascalCase（大驼峰式命名法 —— 首字母大写）
- kebab-case（短横线连接式）
- Snake（下划线连接式）

|    对象    |        命名规范         |                             说明                             |
| :--------: | :---------------------: | :----------------------------------------------------------: |
|   项目名   |       kebab-case        |                                                              |
|   目录名   |      全小写可复数       |                                                              |
|  html、图  |          Snake          |                                                              |
|  css、js   |       kebab-case        |                                                              |
|    组件    | PascalCase / kebab-case |                                                              |
|  单例组件  |     The+PascalCase      | PascalCase需要脚手架，使用多个自闭和<组件名/> 也需要使用脚手架，否则只识别一个组件 |
| 基础组件名 |     Base+PascalCase     |                     PascalCase需要脚手架                     |
|  业务组件  |    Custom+PascalCase    |                     PascalCase需要脚手架                     |
| 自定义指令 |       kebab-case        |                                                              |

JS

|     对象      |                           命名规范                           | 说明 |
| :-----------: | :----------------------------------------------------------: | :--: |
|  变量、函数   |                          camelCase                           |      |
|     常量      |                            全大写                            |      |
| 类 & 构造函数 |                          PascalCase                          |      |
|    类成员     |                       _私有,共有同变量                       |      |
|     注释      | //　用来显示一个解释的评论<br/>// ->　用来显示表达式的结果<br/>// > 用来显示console的输出结果<br/>多行注释：/**/ |      |
|               |                                                              |      |
|               |                                                              |      |
|               |                                                              |      |
|               |                                                              |      |



## 综合应用

### iframe

#### [iframe 父子间传值通信](https://www.cnblogs.com/dxt510/p/11151744.html)

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

#### 取消边框

```html
\<iframe src="https://blog.csdn.net/qq_33583069/article/details/111240367" style="width:100%;height:1100px" name="iframe_a"  frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes">\</iframe>
```

​    

### 接口

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

### VUE深拷贝浅拷贝

### 缓存

#### cookie 

Cookie是存储在用户计算机上的小文件，保存特定客户端和网站的适量数据，并可以有Web服务器或客户端浏览器访问，允许服务器提供针对特定用户定制的页面，或者页面本身可以包含一些知道cookie中的数据的脚本。

##### 存取

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

##### 常规

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



##### 跨域cookie 

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

#### sessionStorage:临时的会话存储

​    只要当前的会话窗口未关闭，存储的信息就不会丢失，即便刷新了页面，或者在编辑器中更改了代码，存储的会话信息也不会丢失。

#### localStorage:永久存储

 会一直将数据存储在客户端的储存方式，即使关闭了浏览器，下次打开的时候仍然可以看到之前存储的未主动清楚的数据(即便是杀毒软件或者浏览器自带的清除功能，也不能将localStorage存储的数据清除掉)

##### 相关操作

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

### 数据类型转换

### 判断终端类型

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

### VUE项目局域网访问

1.开启对应端口的防火墙

2.在 config 文件中，将 host 设置为 0.0.0.0

module.exports = {
    dev: {
        host: "0.0.0.0",
        port: 8080, 
2.在 webpack.dev.conf.js 文件，devServer中加入 useLocalIp: true,

防止运行项目时地址为0.0.0.0，设置后无需手动更改ip地址

webpack.dev.conf.js



```js
         messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],

//改为
         
         messages: [
            `Your application is running here: `,
            `Local: http://localhost:${port}`,
            `Network: http://${devWebpackConfig.devServer.host == '0.0.0.0' ? `${require('ip').address()}` : devWebpackConfig.devServer.host}: ${port}`,
          ],
```



### Cannot find module '@/views/dgrh/project/index

```js
export const loadView = (view) => { // 路由懒加载
  return () => import(`@/views/${view}`)
   //return (resolve) => require([`@/views/${view}.vue`], resolve)
}
```

### 未操作监听

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

### 获取url相关参数

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

### 同步异步

JS是**单线程**的，**同步**是几件事一个事做完再做下个事，**异步**是几件事中间一件事可先跳过，剩下的事全部执行完后执行跳过的事。异步比如：定时器、事件绑定、Ajax读取数据、回调函数。

vue处理异步同步



