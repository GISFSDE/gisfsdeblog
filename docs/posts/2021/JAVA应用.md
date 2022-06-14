---
index: 2
icon: markdown
title: JAVA应用
date: 2022-06-06
category:
  - JAVA应用
tag:
  - JAVA应用
---

> **所有的技术都是为了更好的解决业务**

<!-- more -->

# **菜鸟一站：**

> ### 图例：
>
> + [ ] 记录
> + [ ] **进行中**
> + [x] **完成**
>


+ [ ] JSR303数据校验：javax.validation.constraints
+ [ ] UV、PV统计
+ [ ] cron表达式、正则表达式
+ [ ] 日志记录（tomcat、mysql）
+ [ ] Excel数据操作
+ [ ] 文件上传下载解析到数据库
+ [ ] 集成自己的Java前后台框架
+ [ ] CURD（所有框架）
+ [ ] 网络通信
+ [ ] 单元测试
+ [ ] 常用工具类
+ [ ] 实际业务
+ [ ] 加密解密【AES(CBC)】
+ [ ] 缓存
+ [ ] 自定义注解
+ [ ] 单个配置类型
+ [ ] hutool（JAVA工具类包）
+ [ ] 扫码登录
+ [ ] JAVA常用专业名词
+ [ ] 图片处理
+ [ ] jeekins与部署实施
+ [ ] 动态表单设计与实现
+ [ ] 验证码
+ [ ] 外部接口应用
+ [ ] 工作流
+ [ ] JWT
+ [ ] spring security
+ [ ] 代码生成
+ [ ] 数据库设计(见MySQL优化)
+ [ ] 文件格式转换（word--》pdf）
+ [ ] 数据格式转换
+ [ ] 工具类合集
+ [ ] 分页
+ [ ] 跨域
+ [ ] 单点登录
+ [ ] 外发接口规范token验证
+ [ ] 支付
+ [ ] 短信
+ [ ] 后台创建数据【创建时间，id，初始数据】
+ [ ] 目录可参考[kuangstudy](https://www.kuangstudy.com/course?cid=1)
+ [ ] 数据格式
+ [ ] 权限管理
+ [ ] JDK高版本
+ [ ] 序列化反序列化
+ [ ] 开源相关
+ [ ] 常用组件：日志（登录、操作）记录、角色权限、性能监控（在线用户、数据流转、服务器性能）、字典管理、参数设置、公告聊天系统、代码生成、定时任务
+ [ ] 开源项目研究：[JEECG BOOT 低代码开发平台](https://github.com/jeecgboot/jeecg-boot)【学习业务：代码生成，工作流，文件管理，单点登录，数据性能监控，消息中心】[文档](http://www.jeecg.com/)
+ [ ] 工具类【文件【Excel、图片、Word等】、网络、安全【[Xss](https://www.jianshu.com/p/4fcb4b411a66)】、格式、线程、文本【日期，json】、日志、】
+ [ ] 前端：大屏，常用组件（）

![image-20211221110052586](http://qnimg.gisfsde.com/work/image-20211221110052586.png)

# 开源阅读

## 开源项目 JEECG

### 环境：

```
npm i yarn -g
yarn config set registry https://registry.npm.taobao.org --global
yarn config set disturl https://npm.taobao.org/dist --global
yarn install
 
yarn常用命令
yarn / yarn install 等同于npm install 批量安装依赖
yarn add xxx 等同于 npm install xxx —save 安装指定包到指定位置
yarn remove xxx 等同于 npm uninstall xxx —save 卸载指定包
yarn add xxx —dev 等同于 npm install xxx —save-dev
yarn upgrade 等同于 npm update 升级全部包
yarn global add xxx 等同于 npm install xxx -g 全局安装指定包
```

# CRUD

> 所有知识从CRUD开始

## SSM

## SpringBoot

## SpringCloud

# 文件上传下载

## 相关对象：

1、MultipartFile 和 CommonsMultipartFile都是用来接收上传的文件流的 ！

2、MultipartFile是一个接口，CommonsMultipartFile是MultipartFile接口的实现类 ！

3、使用MultipartFile作为形参接收上传文件时，直接用即可。CommonsMultipartFile作为形参接收上传文件时，必需添加@RequestParam注解（否则会报错：exception is java.lang.NoSuchMethodException: org.springframework.web.multipart.commons.CommonsMultipartFile）

```java
MultipartFile
    
```

## 文件路径：

```
HttpServletRequest req
```

**Servlet获取当前项目的上下文路径（web文件下的路径）：**

```
req.getContextPath()
```

**Servlet获取当前项目的上下文的绝对路径（web文件下的路径）：**

```java
req.getServletContext().getRealPath();
```

**获取Java程序中的resources文件路径：**

```
Resources.getResourceAsStream()
```

# 前后端交互：

## 跨域

### 解决根本原理



### 什么情况会跨域

- 同一协议， 如http或https
- 同一IP地址, 如127.0.0.1
- 同一端口, 如8080

以上三个条件中有一个条件不同就会产生跨域问题。

### [解决方案](https://www.cnblogs.com/zyndev/p/13697313.html)

#### 前端解决方案

1. 使用JSONP方式实现跨域调用；
2. 使用NodeJS服务器做为服务代理，前端发起请求到NodeJS服务器， NodeJS服务器代理转发请求到后端服务器；

#### 后端解决方案

- nginx反向代理解决跨域
- 服务端设置Response Header(响应头部)的Access-Control-Allow-Origin
- 在需要跨域访问的类和方法中设置允许跨域访问（如Spring中使用@CrossOrigin注解）；
- 继承使用Spring Web的CorsFilter（适用于Spring MVC、Spring Boot）
- 实现WebMvcConfigurer接口（适用于Spring Boot）

## WebService

### 简介

**跨编程语言和跨操作系统平台的远程调用技术**

### 原理

XML,SOAP和WSDL就是构成WebService平台的三大技术 。

WebService采用Http协议来在客户端和服务端之间传输数据。WebService使用XML来封装数据，XML主要的优点在于它是跨平台的。

WebService通过HTTP协议发送请求和接收结果时，发送的请求内容和结果内容都采用XML格式封装，并增加了一些特定的HTTP消息头，以说明HTTP消息的内容格式，这些特定的HTTP消息头和XML内容格式就是SOAP协议规定的。

WebService服务器端首先要通过一个WSDL文件来说明自己有什么服务可以对外调用。简单的说，WSDL就像是一个说明书，用于描述WebService及其方法、参数和返回值。 WSDL文件保存在Web服务器上，通过一个url地址就可以访问到它。客户端要调用一个WebService服务之前，要知道该服务的WSDL文件的地址。WebService服务提供商可以通过两种方式来暴露它的WSDL文件地址：1.注册到UDDI服务器，以便被人查找；2.直接告诉给客户端调用者。

## RESTful

### 简介

# 数据格式

## JSON

### 数据示例

```json
{
    "sites": [
    { "name":"a" , "url":"www.runoob.com" }, 
    { "name":"b" , "url":"www.google.com" }, 
    { "name":"c" , "url":"www.weibo.com" }
    ]
}
```

### 不同数据相互转换方式

字符串，Map，对象，JSONObject（无序），JSONArray（有序），Java数组

- 字符串2Json

```

```

### 判断是否包含

.has

### CRUD

### 取值

```java
static Map analysisJsonResultMap = new HashMap();
    public static Map analysisJson(Object objJson) {

        //如果obj为json数组
        if (objJson instanceof JSONArray) {
            JSONArray objArray = (JSONArray) objJson;
            for (int i = 0; i \< objArray.size(); i++) {
                analysisJson(objArray.get(i));
            }
        }
        //如果为json对象
        else if (objJson instanceof JSONObject) {
            JSONObject jsonObject = (JSONObject) objJson;
            Iterator it = jsonObject.keySet().iterator();
            while (it.hasNext()) {
                String key = it.next().toString();
                Object object = jsonObject.get(key);
                //如果得到的是数组
                if (object instanceof JSONArray) {
                    JSONArray objArray = (JSONArray) object;
                    analysisJson(objArray);
                }
                //如果key中是一个json对象
                else if (object instanceof JSONObject) {
                    analysisJson((JSONObject) object);
                }
                //如果key中是其他
                else {
                    System.out.println("[" + key + "]:" + object.toString() + " ");

                    analysisJsonResultMap.put(key, object.toString());

                }
            }
        }

        return analysisJsonResultMap;
    }
```

# 开源相关

https://www.runoob.com/w3cnote/open-source-license.html

![img](https://www.runoob.com/wp-content/uploads/2018/03/da68b98e404578126b87c5afd9ba9bc3.png)

# 单元测试

## 分层测试

### SpringBoot快捷测试

鼠标放在要测试的类名上command+shift+T

### DAO

### Service

### Controller

## **JUnit**

1. 非常简单地组织测试代码，并随时运行它们，JUnit就会给出成功的测试和失败的测试，
2. 还可以生成**测试报告**，不仅包含测试的成功率，还可以统计测试的代码覆盖率，即被测试的代码本身有多少经过了测试。
3. 对于高质量的代码来说，测试覆盖率应该在80%以上。
4. 此外，几乎所有的IDE工具**都集成**了JUnit，这样我们就可以直接在IDE中编写并运行JUnit测试。
5. 一是单元测试代码本身必须非常**简单**，能一下看明白，决不能再为测试代码编写测试；
6. 二是每个单元测试应当互相**独立**，不依赖运行的顺序；
7. 三是测试时不但要覆盖常用测试用例，还要特别注意测试边界条件，例如输入为0，null，空字符串""等情况。
8. 测试**可回滚**

### Junit4 or 5 ?

```java
//junit5   Spring Boot 2.2.X以后
import org.junit.jupiter.api.Test;
//junit4   Spring Boot 2.2.X以后
import org.junit.Test;


//POM
//junit4
\<dependency>
    \<groupId>junit\</groupId>
    \<artifactId>junit\</artifactId>
    \<version>4.13.1\</version>
    \<scope>test\</scope>
\</dependency>
//junit5
\<dependency>
    \<groupId>org.springframework.boot\</groupId>
    \<artifactId>spring-boot-starter-test\</artifactId>
    \<scope>test\</scope>
    \<exclusions>
        \<exclusion>
            \<groupId>org.junit.vintage\</groupId>
            \<artifactId>junit-vintage-engine\</artifactId>
        \</exclusion>
    \</exclusions>
\</dependency>

- JUnit — The de-facto standard for unit testing Java applications.
- Spring Test & Spring Boot Test — Utilities and integration test support for Spring Boot applications.
- AssertJ — A fluent assertion library.
- Hamcrest — A library of matcher objects (also known as constraints or predicates).
- Mockito — A Java mocking framework.
- JSONassert — An assertion library for JSON.
- JsonPath — XPath for JSON.
  Spring Boot 2.2 之后的 pom.xml
```

IDEA Ctrl+Shift+T (Window) 创建测试类

![image-20211216200328875](http://qnimg.gisfsde.com/image-20211216200328875.png)

#### 注解变化

- @RunWith(SpringRunner.class) + @SpringBootTest  =====》 @SpringBootTest

```java
//JUnit4
@RunWith(SpringRunner.class)
@SpringBootTest
//JUnit5
//@RunWith被@ExtendWith替换。同时有下@SpringBootTest源码得知@SpringBootTest包含@ExtendWith
@SpringBootTest
```

```java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@BootstrapWith(SpringBootTestContextBootstrapper.class)
@ExtendWith({SpringExtension.class})
public @interface SpringBootTest {
```

**[总结](https://blog.csdn.net/boling_cavalry/article/details/108810587)**

| **Junit4**  |    **Junit5**     |
| :---------: | :---------------: |
|   Before    |    BeforeEach     |
|    After    |     AfterEach     |
| BeforeClass |     BeforeAll     |
| AfterClass  |     AfterAll      |
|  Category   |        Tag        |
|   RunWith   |    ExtendWith     |
|    Rule     |    ExtendWith     |
|  ClassRule  | RegisterExtension |

### Junit5常用注解

@BeforeClass：针对所有测试，只执行一次，且必须为static void
@Before：初始化方法，执行当前测试类的每个测试方法前执行。
@Test：测试方法，在这里可以测试期望异常和超时时间
@After：释放资源，执行当前测试类的每个测试方法后执行
@AfterClass：针对所有测试，只执行一次，且必须为static void
@Ignore：忽略的测试方法（只在测试类的时候生效，单独执行该测试方法无效）
@RunWith:可以更改测试运行器 ，缺省值 org.junit.runner.Runner

#### 一个单元测试类执行顺序为：

@BeforeClass –> @Before –> @Test –> @After –> @AfterClass

每一个测试方法的调用顺序为：

@Before –> @Test –> @After

### 断言(assertThat)

##### 基础语法

assertThat( [value], [matcher statement] );

- value 是接下来想要测试的变量值；

- matcher statement 是使用 Hamcrest 匹配符来表达的对前面变量所期望的值的声明，如果 value 值与 matcher statement 所表达的期望值相符，则测试成功，否则测试失败。

  ```java
  import static org.junit.Assert.*;
  字符相关匹配符
  /**equalTo匹配符断言被测的testedValue等于expectedValue，
  * equalTo可以断言数值之间，字符串之间和对象之间是否相等，相当于Object的equals方法
  */
  assertThat(testedValue, equalTo(expectedValue));
  /**equalToIgnoringCase匹配符断言被测的字符串testedString
  *在忽略大小写的情况下等于expectedString
  */
  assertThat(testedString, equalToIgnoringCase(expectedString));
  /**equalToIgnoringWhiteSpace匹配符断言被测的字符串testedString
  *在忽略头尾的任意个空格的情况下等于expectedString，
  *注意：字符串中的空格不能被忽略
  */
  assertThat(testedString, equalToIgnoringWhiteSpace(expectedString);
  /**containsString匹配符断言被测的字符串testedString包含子字符串subString**/
  assertThat(testedString, containsString(subString) );
  /**endsWith匹配符断言被测的字符串testedString以子字符串suffix结尾*/
  assertThat(testedString, endsWith(suffix));
  /**startsWith匹配符断言被测的字符串testedString以子字符串prefix开始*/
  assertThat(testedString, startsWith(prefix));
  一般匹配符
  /**nullValue()匹配符断言被测object的值为null*/
  assertThat(object,nullValue());
  /**notNullValue()匹配符断言被测object的值不为null*/
  assertThat(object,notNullValue());
  /**is匹配符断言被测的object等于后面给出匹配表达式*/
  assertThat(testedString, is(equalTo(expectedValue)));
  /**is匹配符简写应用之一，is(equalTo(x))的简写，断言testedValue等于expectedValue*/
  assertThat(testedValue, is(expectedValue));
  /**is匹配符简写应用之二，is(instanceOf(SomeClass.class))的简写，
  *断言testedObject为Cheddar的实例
  */
  assertThat(testedObject, is(Cheddar.class));
  /**not匹配符和is匹配符正好相反，断言被测的object不等于后面给出的object*/
  assertThat(testedString, not(expectedString));
  /**allOf匹配符断言符合所有条件，相当于“与”（&&）*/
  assertThat(testedNumber, allOf( greaterThan(8), lessThan(16) ) );
  /**anyOf匹配符断言符合条件之一，相当于“或”（||）*/
  assertThat(testedNumber, anyOf( greaterThan(16), lessThan(8) ) );
  数值相关匹配符
  /**closeTo匹配符断言被测的浮点型数testedDouble在20.0¡À0.5范围之内*/
  assertThat(testedDouble, closeTo( 20.0, 0.5 ));
  /**greaterThan匹配符断言被测的数值testedNumber大于16.0*/
  assertThat(testedNumber, greaterThan(16.0));
  /** lessThan匹配符断言被测的数值testedNumber小于16.0*/
  assertThat(testedNumber, lessThan (16.0));
  /** greaterThanOrEqualTo匹配符断言被测的数值testedNumber大于等于16.0*/
  assertThat(testedNumber, greaterThanOrEqualTo (16.0));
  /** lessThanOrEqualTo匹配符断言被测的testedNumber小于等于16.0*/
  assertThat(testedNumber, lessThanOrEqualTo (16.0));
  集合相关匹配符
  /**hasEntry匹配符断言被测的Map对象mapObject含有一个键值为"key"对应元素值为"value"的Entry项*/
  assertThat(mapObject, hasEntry("key", "value" ) );
  /**hasItem匹配符表明被测的迭代对象iterableObject含有元素element项则测试通过*/
  assertThat(iterableObject, hasItem (element));
  /** hasKey匹配符断言被测的Map对象mapObject含有键值“key”*/
  assertThat(mapObject, hasKey ("key"));
  /** hasValue匹配符断言被测的Map对象mapObject含有元素值value*/
  assertThat(mapObject, hasValue(value));
  ```
  
  

可表达全部的测试思想。

Springboot 可自动生成测试代码  IDEA   Ctrl + Shift +T 生成测试类

### Service

```java
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import static org.hamcrest.CoreMatchers.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class LearnServiceTest {

    @Autowired
    private LearnService learnService;

    @Test
    public void getLearn(){
        LearnResource learnResource=learnService.selectByKey(1001L);
        Assert.assertThat(learnResource.getAuthor(),is("嘟嘟MD独立博客"));
    }
}
```



### Controller

MockMvc：可以不启动工程测试接口，MockMvc 实现了对 Http 请求的模拟，能够直接使用网络的形式，转换到 Controller 的调用，这样可以使得测试速度快、不依赖网络环境，而且提供了一套验证的工具，这样可以使得请求的验证统一而且很方便。

1. `mockMvc.perform`执行一个请求
2. `MockMvcRequestBuilders.get(“/user/1”)`构造一个请求，Post请求就用.post方法
3. `contentType(MediaType.APPLICATION_JSON_UTF8)`代表发送端发送的数据格式是`application/json;charset=UTF-8`
4. `accept(MediaType.APPLICATION_JSON_UTF8)`代表客户端希望接受的数据类型为`application/json;charset=UTF-8`
5. `session(session)`注入一个session，这样拦截器才可以通过
6. `ResultActions.andExpect`添加执行完成后的断言
7. `ResultActions.andExpect(MockMvcResultMatchers.status().isOk())`方法看请求的状态响应码是否为200如果不是则抛异常，测试不通过
8. `andExpect(MockMvcResultMatchers.jsonPath(“$.author”).value(“嘟嘟MD独立博客”))`这里jsonPath用来获取author字段比对是否为嘟嘟MD独立博客,不是就测试不通过
9. `ResultActions.andDo`添加一个结果处理器，表示要对结果做点什么事情，比如此处使用`MockMvcResultHandlers.print()`输出整个响应结果信息



### 单元测试回滚

测试的垃圾数据清理，添加注解

@Transactional   默认引擎是InnoDB有效，MyISAM（MySQL5.5之前默认引擎）不支持事务、也不支持外键

想关闭回滚，只要加上`@Rollback(false)`注解即可。`@Rollback`表示事务执行完回滚，支持传入一个参数value，默认true即回滚，false不回滚。

### 修改默认数据库引擎的步骤

- MyISAM适合：(1)做很多count 的计算；(2)插入不频繁，查询非常频繁；(3)没有事务。
- InnoDB适合：(1)可靠性要求比较高，或者要求事务；(2)表更新和查询都相当的频繁，并且表锁定的机会比较大的情况。(4)性能较好的服务器，比如单独的数据库服务器，像阿里云的关系型数据库RDS就推荐使用InnoDB引擎。

show variables like '%storage_engine%';

show create table user;

ALTER TABLE user ENGINE=INNODB;



## [TextNG](https://testng.org/doc/index.html)

注解跟junit差不多，但是功能更多。

# Swagger UI

接口文档，接口测试

**启动类添加注解@EnableSwagger2Doc**

```
@Api：用在请求的类上，表示对类的说明
    tags="说明该类的作用，可以在UI界面上看到的注解"
    value="该参数没什么意义，在UI界面上也看到，所以不需要配置"
 
 
@ApiOperation：用在请求的方法上，说明方法的用途、作用
    value="说明方法的用途、作用"
    notes="方法的备注说明"
 
 
@ApiImplicitParams：用在请求的方法上，表示一组参数说明
    @ApiImplicitParam：用在@ApiImplicitParams注解中，指定一个请求参数的各个方面
        name：参数名
        value：参数的汉字说明、解释
        required：参数是否必须传
        paramType：参数放在哪个地方
            · header --> 请求参数的获取：@RequestHeader
            · query --> 请求参数的获取：@RequestParam
            · path（用于restful接口）--> 请求参数的获取：@PathVariable
            · body（不常用）
            · form（不常用）    
        dataType：参数类型，默认String，其它值dataType="Integer"       
        defaultValue：参数的默认值
 
 
@ApiResponses：用在请求的方法上，表示一组响应
    @ApiResponse：用在@ApiResponses中，一般用于表达一个错误的响应信息
        code：数字，例如400
        message：信息，例如"请求参数没填好"
        response：抛出异常的类
 
 
@ApiModel：用于响应类上，表示一个返回响应数据的信息
            （这种一般用在post创建的时候，使用@RequestBody这样的场景，
            请求参数无法使用@ApiImplicitParam注解进行描述的时候）
    @ApiModelProperty：用在属性上，描述响应类的属性
```

# http转https

## 两者区别：

### https：优：

1.**数据加密**
2.**SSL安全机制**【客户端访问服务器->服务器把数字证书+公用密匙 发给客户端->客户端验证服务器，确保访问的是正确的服务器（不是钓鱼网站）->客户端生产会话密匙并用公用密匙进行加密再次发给服务器->服务器用私人密匙进行解密（也就相当于验证客户端），验证成功建立起一条安全的数据传递通道->服务器把客户端请求的数据打包加密发送给客户端->客户端浏览器接收数据并解析
3.**安全标识**，提高用户信任感

## 步骤：

1. 申请SSL证书
2. 安装证书。
3. 整改网站链接
4. 全站做301转向，减少网站权重的流失

## 相关

1. 服务器 的 80、8080、443（https默认）端口开放需要备案。 

### nginx  【win】

购买ssl证书获得key和pem文件

```nginx
server {
    listen       8080 ssl;
    server_name  aaa.bbb.com;
    ssl on;
	ssl_certificate E:/tys/nginx-1.12.2/key_pem//hzsgis.pem;
	ssl_certificate_key E:/tys/nginx-1.12.2/key_pem/hzsgis.key;
	ssl_session_cache shared:SSL:1m;
	ssl_session_timeout 20m;
	ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!aNULL:!MD5:!ADH:!RC4;
	ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
	ssl_prefer_server_ciphers on;
    #charset koi8-r;

    #access_log  logs/host.access.log  main;
     location /main/map3d/rest {
        #add_header 'Access-Control-Allow-Headers' '*';
       proxy_pass   http://111.111.11.11:1111/main/map3d/rest;
    }
    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }
}
```

### nginx  【Linux】

购买ssl证书获得key和pem文件并添加到nginx目录下

#### 改443端口配置

```bash

#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    upstream jq_one{
server 10.32.250.176:8080 weight=5;
server 10.32.250.177:8080 weight=5;
}

upstream jq_two{
server 10.32.250.178:8080 weight=5;
server 10.32.250.179:8080 weight=5;
}
server {



listen     8080;

server_name  localhost;

#charset koi8-r;

#access_log  logs/host.access.log  main;



location / {

root   html;

index  index.html index.htm;

proxy_pass  http://jq_two;

proxy_set_header Host $http_host;

proxy_set_header X-Real-IP $remote_addr;

proxy_set_header REMOTE-HOST $remote_addr;

proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

}}

    server {
        listen       80;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   html;
            index  index.html index.htm;
	proxy_pass  http://jq_one; 
 proxy_set_header Host $http_host;
             proxy_set_header X-Real-IP $remote_addr;
              proxy_set_header REMOTE-HOST $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;       
}


        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }


    server {
        listen       443 ssl;
        server_name  fyditu.fuyang.gov.cn;
		ssl_certificate /usr/local/nginx/key_pem//fyditu.fuyang.gov.cn_bundle.pem;
		ssl_certificate_key /usr/local/nginx/key_pem//fyditu.fuyang.gov.cn.key;
		ssl_session_cache shared:SSL:1m;
		ssl_session_timeout 20m;
		ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!aNULL:!MD5:!ADH:!RC4;
		ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
		ssl_prefer_server_ciphers on;
        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   html;
            index  index.html index.htm;
			proxy_pass  http://jq_one; 
			proxy_set_header Host $http_host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header REMOTE-HOST $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;       
		}


        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }


    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}


    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}

}

```

#### 检验配置文件

```
/usr/local/nginx/sbin 安装目录下执行
./nginx -t
```

#### nginx安装SSL模块

```bash
#进入nginx源码文件夹执行，/usr/local/nginx为安装文件夹
./configure --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module
#替换安装 非make install覆盖安装
make
#备份
cp /usr/local/nginx/sbin/nginx /usr/local/nginx/sbin/nginx.bak
```

#### 重启

```
#查看nginx端口号
ps -ef|grep nginx
#关闭进程
kill -QUIT 端口号
#从源码文件夹复制到安装文件夹
cp ./objs/nginx /usr/local/nginx/sbin/
#先切换到sbin目录
cd /usr/local/nginx/sbin/
#检测nginx的配置文件是否有错误
./niginx -t
#启动
/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf

```

#### 开通443端口

```bash
#1.先查看服务器防火墙开放的端口
firewall-cmd --zone=public --list-ports     //查看防火墙的开放端口
#2.允许防火墙放行443端口
#　　命令含义：
#　　　　--zone #作用域
#　　　　--add-port=443/tcp #添加端口，格式为：端口/通讯协议
#　　　　--permanent #代表永久生效，没有此参数重启后失效
firewall-cmd --zone=public --add-port=443/tcp --permanent
#3.重启防火墙
firewall-cmd --reload
1.systemctl start firewalld.service（开启防火墙）
2.systemctl stop firewalld.service（开启防火墙）
3.service firewalld restart（重启防火墙）
4.firewall-cmd --zone=public --add-port=4400-4600/udp --permanen(指定端口范围为4400-4600通过防火墙)
Warning: ALREADY_ENABLED: 3306:tcp（说明3306端口通过成功）
5.firewall-cmd --zone=public --remove-port=80/tcp --permanent（关闭指定端口）
6.firewall-cmd --zone=public --list-ports（查看通过的端口）
7.查看防火墙状态 ：firewall-cmd --state
```



# 定时任务

## SpringBoot

@Scheduled注解，接口SchedulingConfigurer,Quartz 



# 工作流

## Activit



# 分库分表

在访问量连接数或者数据量大的组合情况下选择不同分库分表方案。根据数据访问量，单库承受量选择分多少。根据表信息选择水平【比如不同等级】或垂直拆分（比如买家买家信息），

# 多数据源，主从复制

# [序列化反序列化](https://blog.csdn.net/qq_44713454/article/details/108418218)

```java
//Java 序列化是指：将对象转化成一个字节序列(二进制数据)的过程。
//将序列化对象写入文件之后，可以从文件中读取出来，并且对它进行反序列化。
//Java 反序列化是指：将一个对象的字节序列恢复成 Java 对象的过程。
//一个平台中序列化的对象，可以在另一个平台中进行反序列化，因为这个过程是在 JVM 中独立完成的，可以依赖于 Java 的可移植性。
public class BaseEntity implements Serializable
{
    private static final long serialVersionUID = 1L;
}
```

# JAVA常用专业名词

## [领域模型](https://blog.csdn.net/ayunnuo/article/details/114531191)

**VO （View Object）视图对象**
用于展示层，它的作用是把某个指定页面（或组件）的所有数据封装起来。通常用于业务层之间的数据传递，和 PO 一样也是仅仅包含数据而已，但应是抽象出的业务对象，可以和表对应，也可以不，这根据业务的需要，用 new 关键字创建，由 GC 回收

view Object 试图对象

接受页面传递来的数据，封装对象，封装页面需要用的数据

**DTO（Data Transfer Object）数据传输对象**
主要用于展示层与服务层之间的数据传输对象。这个概念来源于 J2EE 的设计模式，原来的目的是为了 EJB的分布式应用提供粗粒度的数据实体，以减少分布式调用的次数，从而提高分数调用的性能和降低网络负载，但在这里，泛指用于展示层与服务层之间的数据传输对象

**DO（Domain Object）领域对象**
就是从现实世界中抽象出来的有形或无形的业务实体。

**PO（Persistent Object）：持久化对象**
它跟持久层（通常是关系型数据库）的数据结构形成一一对应的映射关系，如果持久层是关系型数据库，那么，数据表中的每个字段就对应PO的一个属性。po 就是对应数据库中某一个表的一条记录，多个记录可以用 PO 的集合，PO 中应该不包含任何对数据库到操作

### **TO (Transfer Object) 数据传输对象**

不同的应用程序之间传输的对象

### **BO(business object) 业务对象**

从业务模型的角度看，见 UML 原件领域模型中的领域对象，封装业务逻辑的， java 对象，通过调用 DAO 方法，结合 PO VO,进行业务操作，business object 业务对象，主要作用是把业务逻辑封装成一个对象，这个对象包括一个或多个对象，比如一个简历，有教育经历，工作经历，社会关系等等，我们可以把教育经历对应一个 PO 、工作经验对应一个 PO、 社会关系对应一个 PO, 建立一个对应简历的的 BO 对象处理简历，每 个 BO 包含这些 PO ,这样处理业务逻辑时，我们就可以针对 BO 去处理

### **POJO ( plain ordinary java object) 简单无规则 java 对象**

传统意义的 java 对象，就是说一些 Object/Relation Mapping 工具中，能够做到维护数据库表记录的 persisent object 完全是一个符合  Java Bean 规范的 纯 java 对象，没有增加别的属性和方法，我们的理解就是最基本的 Java bean 只有属性字段 setter 和 getter 方法

POJO 时是 DO/DTO/BO/VO 的统称

### **DAO（data access object） 数据访问对象**

是一个 sun 的一个标准 j2ee 设计模式，这个模式有个接口就是 DAO ，他负持久层的操作，为业务层提供接口，此对象用于访问数据库，通常和 PO 结合使用，DAO 中包含了各种数据库的操作方法，通过它的方法，结合 PO 对数据库进行相关操作，夹在业务逻辑与数据库资源中间，配合VO 提供数据库的 CRUD 功能

**VO 与 DTO 的区别**
DTO 和 VO 的属性值基本是一致的，而且他们通常都是 POJO【简单的 Java 对象（Plain Old Java Object）】,但两者存在本质上的区别；DTO 代表服务层需要接收的数据和返回的数据，而VO 代表展示层需要显示的数据。

**DTO 与 DO 的区别**
首先是概念上的区别，DTO 是展示层和服务层之间的数据传输对象（可以认为是两者之间的协议），而 DO是对现实世界各种业务角色的抽象，这就引出了两者在数据上的区别。

**DO 与 PO 的区别**
DO 和 PO 在绝大部分情况下是一一对应的，PO是只含有 get/set 方法的POJO，但某些场景还是能反映出两者在概念上存在本质区别：
DO在某些场景下不需要进行显式的持久化，例如利用策略模式设计的商品折扣策略，会衍生出折扣策略的接口和不同折扣策略实现类，这些折扣策略实现类可以算是DO，但它们只会驻留在静态内存池，不需要持久化到持久层，因此，这类 DO 是不存在对应的 PO的。
同样的道理，某些场景下，PO也没有对应的DO，例如老师Teacher和学生Student存在多对多的关系，在关系数据库中，这种关系需要表现为一个中间表，也就对应有一个TeacherAndStudentPO的PO，但这个PO在业务领域没有任何现实的意义，它完全不能与任何DO对应上。

# 日志记录以及详解

## [Tomcat](https://blog.csdn.net/cherish_CX/article/details/110635153)

### 一.tomcat日志文件路径

tomcat/logs

 

### 二.tomcat日志配置文件

tomcat对应日志的配置文件：tomcat目录下的/conf/logging.properties

tomcat的日志等级有：SEVERE (最高级别) > WARNING > INFO > CONFIG > FINE > FINER(精心) > FINEST (所有内容,最低级别)

 

### 三.tomcat日志文件都有哪些

tomcat有五类日志：catalina、localhost、manager、admin、host-manager

 

### 四.使用率较高的日志文件是哪些？

4.1 catalina.out/实时运行日志

即标准输出和标准出错，所有输出到这两个位置的都会进入catalina.out，这里包含tomcat运行自己输出的日志以及应用里向console输出的日志。默认这个日志文件是不会进行自动切割的，我们需要借助其他工具进行切割（注意：catalina.out文件如果过大会影响）

4.2 catalina.yy-mm-dd.log/tomcat运行日志

catalina.{yyyy-MM-dd}.log是tomcat自己运行的一些日志，这些日志还会输出到catalina.out，但是应用向console输出的日志不会输出到catalina.{yyyy-MM-dd}.log,它是tomcat的启动和暂停时的运行日志，注意，它和catalina.out是里面的内容是不一样的。

 

### 五.其他日志文件说明

5.1 localhost.yy-mm-dd.log

localhost.{yyyy-MM-dd}.log主要是应用初始化(listener, filter, servlet)未处理的异常最后被tomcat捕获而输出的日志,它也是包含tomcat的启动和暂停时的运行日志,但它没有catalina.2018-09-19.log 日志全。它只是记录了部分日志。

5.2 localhost_access_log.yy-mm-dd.txt

这个是访问 tomcat 的日志，请求时间和资源，状态码都有记录。

5.3 manager.yy-mm-dd.log

这个是 tomcat manager 项目专有的日志文件.

5.4 host-manager.yy-mm-dd.log

这个估计是放 tomcat 的自带的 manager 项目的日志信息的，未看到有什么重要的日志信息。

 

### 六.tomcat日志文件切割

tomcat 的 catalina.out 文件 tomcat 是不会进行日志切割的，当这个文件大于2G  时，会影响tomcat的运行。那么我们需要对这个文件进行日志切割，切割的方法有很多种：

第一种：通过系统自带的切割工具：logrotate来进行切割。

第二种:使用logj4进行切割日志。

第三种：使用用cronolog分割tomcat的catalina.out文件 。

以上三种方法见：https://www.cnblogs.com/happy-king/p/9193401.html

# 常用工具类

## 类型转换

```java
import java.math.BigDecimal;
import java.math.BigInteger;
import java.nio.ByteBuffer;
import java.nio.charset.Charset;
import java.text.NumberFormat;
import java.util.Set;
import com.jeethink.common.utils.StringUtils;

/**
 * 类型转换器
 * 
 */
public class Convert
{
    /**
     * 转换为字符串\<br>
     * 如果给定的值为null，或者转换失败，返回默认值\<br>
     * 转换失败不会报错
     * 
     * @param value 被转换的值
     * @param defaultValue 转换错误时的默认值
     * @return 结果
     */
    public static String toStr(Object value, String defaultValue)
    {
        if (null == value)
        {
            return defaultValue;
        }
        if (value instanceof String)
        {
            return (String) value;
        }
        return value.toString();
    }

    /**
     * 转换为字符串\<br>
     * 如果给定的值为\<code>null\</code>，或者转换失败，返回默认值\<code>null\</code>\<br>
     * 转换失败不会报错
     * 
     * @param value 被转换的值
     * @return 结果
     */
    public static String toStr(Object value)
    {
        return toStr(value, null);
    }

    /**
     * 转换为字符\<br>
     * 如果给定的值为null，或者转换失败，返回默认值\<br>
     * 转换失败不会报错
     * 
     * @param value 被转换的值
     * @param defaultValue 转换错误时的默认值
     * @return 结果
     */
    public static Character toChar(Object value, Character defaultValue)
    {
        if (null == value)
        {
            return defaultValue;
        }
        if (value instanceof Character)
        {
            return (Character) value;
        }

        final String valueStr = toStr(value, null);
        return StringUtils.isEmpty(valueStr) ? defaultValue : valueStr.charAt(0);
    }

    /**
     * 转换为字符\<br>
     * 如果给定的值为\<code>null\</code>，或者转换失败，返回默认值\<code>null\</code>\<br>
     * 转换失败不会报错
     * 
     * @param value 被转换的值
     * @return 结果
     */
    public static Character toChar(Object value)
    {
        return toChar(value, null);
    }

    /**
     * 转换为byte\<br>
     * 如果给定的值为\<code>null\</code>，或者转换失败，返回默认值\<br>
     * 转换失败不会报错
     * 
     * @param value 被转换的值
     * @param defaultValue 转换错误时的默认值
     * @return 结果
     */
    public static Byte toByte(Object value, Byte defaultValue)
    {
        if (value == null)
        {
            return defaultValue;
        }
        if (value instanceof Byte)
        {
            return (Byte) value;
        }
        if (value instanceof Number)
        {
            return ((Number) value).byteValue();
        }
        final String valueStr = toStr(value, null);
        if (StringUtils.isEmpty(valueStr))
        {
            return defaultValue;
        }
        try
        {
            return Byte.parseByte(valueStr);
        }
        catch (Exception e)
        {
            return defaultValue;
        }
    }

    /**
     * 转换为byte\<br>
     * 如果给定的值为\<code>null\</code>，或者转换失败，返回默认值\<code>null\</code>\<br>
     * 转换失败不会报错
     * 
     * @param value 被转换的值
     * @return 结果
     */
    public static Byte toByte(Object value)
    {
        return toByte(value, null);
    }

    /**
     * 转换为Short\<br>
     * 如果给定的值为\<code>null\</code>，或者转换失败，返回默认值\<br>
     * 转换失败不会报错
     * 
     * @param value 被转换的值
     * @param defaultValue 转换错误时的默认值
     * @return 结果
     */
    public static Short toShort(Object value, Short defaultValue)
    {
        if (value == null)
        {
            return defaultValue;
        }
        if (value instanceof Short)
        {
            return (Short) value;
        }
        if (value instanceof Number)
        {
            return ((Number) value).shortValue();
        }
        final String valueStr = toStr(value, null);
        if (StringUtils.isEmpty(valueStr))
        {
            return defaultValue;
        }
        try
        {
            return Short.parseShort(valueStr.trim());
        }
        catch (Exception e)
        {
            return defaultValue;
        }
    }

    /**
     * 转换为Short\<br>
     * 如果给定的值为\<code>null\</code>，或者转换失败，返回默认值\<code>null\</code>\<br>
     * 转换失败不会报错
     * 
     * @param value 被转换的值
     * @return 结果
     */
    public static Short toShort(Object value)
    {
        return toShort(value, null);
    }

    /**
     * 转换为Number\<br>
     * 如果给定的值为空，或者转换失败，返回默认值\<br>
     * 转换失败不会报错
     * 
     * @param value 被转换的值
     * @param defaultValue 转换错误时的默认值
     * @return 结果
     */
    public static Number toNumber(Object value, Number defaultValue)
    {
        if (value == null)
        {
            return defaultValue;
        }
        if (value instanceof Number)
        {
            return (Number) value;
        }
        final String valueStr = toStr(value, null);
        if (StringUtils.isEmpty(valueStr))
        {
            return defaultValue;
        }
        try
        {
            return NumberFormat.getInstance().parse(valueStr);
        }
        catch (Exception e)
        {
            return defaultValue;
        }
    }

    /**
     * 转换为Number\<br>
     * 如果给定的值为空，或者转换失败，返回默认值\<code>null\</code>\<br>
     * 转换失败不会报错
     * 
     * @param value 被转换的值
     * @return 结果
     */
    public static Number toNumber(Object value)
    {
        return toNumber(value, null);
    }

    /**
     * 转换为int\<br>
     * 如果给定的值为空，或者转换失败，返回默认值\<br>
     * 转换失败不会报错
     * 
     * @param value 被转换的值
     * @param defaultValue 转换错误时的默认值
     * @return 结果
     */
    public static Integer toInt(Object value, Integer defaultValue)
    {
        if (value == null)
        {
            return defaultValue;
        }
        if (value instanceof Integer)
        {
            return (Integer) value;
        }
        if (value instanceof Number)
        {
            return ((Number) value).intValue();
        }
        final String valueStr = toStr(value, null);
        if (StringUtils.isEmpty(valueStr))
        {
            return defaultValue;
        }
        try
        {
            return Integer.parseInt(valueStr.trim());
        }
        catch (Exception e)
        {
            return defaultValue;
        }
    }

    /**
     * 转换为int\<br>
     * 如果给定的值为\<code>null\</code>，或者转换失败，返回默认值\<code>null\</code>\<br>
     * 转换失败不会报错
     * 
     * @param value 被转换的值
     * @return 结果
     */
    public static Integer toInt(Object value)
    {
        return toInt(value, null);
    }

    /**
     * 转换为Integer数组\<br>
     * 
     * @param str 被转换的值
     * @return 结果
     */
    public static Integer[] toIntArray(String str)
    {
        return toIntArray(",", str);
    }

    /**
     * 转换为Long数组\<br>
     * 
     * @param str 被转换的值
     * @return 结果
     */
    public static Long[] toLongArray(String str)
    {
        return toLongArray(",", str);
    }

    /**
     * 转换为Integer数组\<br>
     * 
     * @param split 分隔符
     * @param split 被转换的值
     * @return 结果
     */
    public static Integer[] toIntArray(String split, String str)
    {
        if (StringUtils.isEmpty(str))
        {
            return new Integer[] {};
        }
        String[] arr = str.split(split);
        final Integer[] ints = new Integer[arr.length];
        for (int i = 0; i \< arr.length; i++)
        {
            final Integer v = toInt(arr[i], 0);
            ints[i] = v;
        }
        return ints;
    }

    /**
     * 转换为Long数组\<br>
     * 
     * @param split 分隔符
     * @param str 被转换的值
     * @return 结果
     */
    public static Long[] toLongArray(String split, String str)
    {
        if (StringUtils.isEmpty(str))
        {
            return new Long[] {};
        }
        String[] arr = str.split(split);
        final Long[] longs = new Long[arr.length];
        for (int i = 0; i \< arr.length; i++)
        {
            final Long v = toLong(arr[i], null);
            longs[i] = v;
        }
        return longs;
    }

    /**
     * 转换为String数组\<br>
     * 
     * @param str 被转换的值
     * @return 结果
     */
    public static String[] toStrArray(String str)
    {
        return toStrArray(",", str);
    }

    /**
     * 转换为String数组\<br>
     * 
     * @param split 分隔符
     * @param split 被转换的值
     * @return 结果
     */
    public static String[] toStrArray(String split, String str)
    {
        return str.split(split);
    }

    /**
     * 转换为long\<br>
     * 如果给定的值为空，或者转换失败，返回默认值\<br>
     * 转换失败不会报错
     * 
     * @param value 被转换的值
     * @param defaultValue 转换错误时的默认值
     * @return 结果
     */
    public static Long toLong(Object value, Long defaultValue)
    {
        if (value == null)
        {
            return defaultValue;
        }
        if (value instanceof Long)
        {
            return (Long) value;
        }
        if (value instanceof Number)
        {
            return ((Number) value).longValue();
        }
        final String valueStr = toStr(value, null);
        if (StringUtils.isEmpty(valueStr))
        {
            return defaultValue;
        }
        try
        {
            // 支持科学计数法
            return new BigDecimal(valueStr.trim()).longValue();
        }
        catch (Exception e)
        {
            return defaultValue;
        }
    }

    /**
     * 转换为long\<br>
     * 如果给定的值为\<code>null\</code>，或者转换失败，返回默认值\<code>null\</code>\<br>
     * 转换失败不会报错
     * 
     * @param value 被转换的值
     * @return 结果
     */
    public static Long toLong(Object value)
    {
        return toLong(value, null);
    }

    /**
     * 转换为double\<br>
     * 如果给定的值为空，或者转换失败，返回默认值\<br>
     * 转换失败不会报错
     * 
     * @param value 被转换的值
     * @param defaultValue 转换错误时的默认值
     * @return 结果
     */
    public static Double toDouble(Object value, Double defaultValue)
    {
        if (value == null)
        {
            return defaultValue;
        }
        if (value instanceof Double)
        {
            return (Double) value;
        }
        if (value instanceof Number)
        {
            return ((Number) value).doubleValue();
        }
        final String valueStr = toStr(value, null);
        if (StringUtils.isEmpty(valueStr))
        {
            return defaultValue;
        }
        try
        {
            // 支持科学计数法
            return new BigDecimal(valueStr.trim()).doubleValue();
        }
        catch (Exception e)
        {
            return defaultValue;
        }
    }

    /**
     * 转换为double\<br>
     * 如果给定的值为空，或者转换失败，返回默认值\<code>null\</code>\<br>
     * 转换失败不会报错
     * 
     * @param value 被转换的值
     * @return 结果
     */
    public static Double toDouble(Object value)
    {
        return toDouble(value, null);
    }

    /**
     * 转换为Float\<br>
     * 如果给定的值为空，或者转换失败，返回默认值\<br>
     * 转换失败不会报错
     * 
     * @param value 被转换的值
     * @param defaultValue 转换错误时的默认值
     * @return 结果
     */
    public static Float toFloat(Object value, Float defaultValue)
    {
        if (value == null)
        {
            return defaultValue;
        }
        if (value instanceof Float)
        {
            return (Float) value;
        }
        if (value instanceof Number)
        {
            return ((Number) value).floatValue();
        }
        final String valueStr = toStr(value, null);
        if (StringUtils.isEmpty(valueStr))
        {
            return defaultValue;
        }
        try
        {
            return Float.parseFloat(valueStr.trim());
        }
        catch (Exception e)
        {
            return defaultValue;
        }
    }

    /**
     * 转换为Float\<br>
     * 如果给定的值为空，或者转换失败，返回默认值\<code>null\</code>\<br>
     * 转换失败不会报错
     * 
     * @param value 被转换的值
     * @return 结果
     */
    public static Float toFloat(Object value)
    {
        return toFloat(value, null);
    }

    /**
     * 转换为boolean\<br>
     * String支持的值为：true、false、yes、ok、no，1,0 如果给定的值为空，或者转换失败，返回默认值\<br>
     * 转换失败不会报错
     * 
     * @param value 被转换的值
     * @param defaultValue 转换错误时的默认值
     * @return 结果
     */
    public static Boolean toBool(Object value, Boolean defaultValue)
    {
        if (value == null)
        {
            return defaultValue;
        }
        if (value instanceof Boolean)
        {
            return (Boolean) value;
        }
        String valueStr = toStr(value, null);
        if (StringUtils.isEmpty(valueStr))
        {
            return defaultValue;
        }
        valueStr = valueStr.trim().toLowerCase();
        switch (valueStr)
        {
            case "true":
                return true;
            case "false":
                return false;
            case "yes":
                return true;
            case "ok":
                return true;
            case "no":
                return false;
            case "1":
                return true;
            case "0":
                return false;
            default:
                return defaultValue;
        }
    }

    /**
     * 转换为boolean\<br>
     * 如果给定的值为空，或者转换失败，返回默认值\<code>null\</code>\<br>
     * 转换失败不会报错
     * 
     * @param value 被转换的值
     * @return 结果
     */
    public static Boolean toBool(Object value)
    {
        return toBool(value, null);
    }

    /**
     * 转换为Enum对象\<br>
     * 如果给定的值为空，或者转换失败，返回默认值\<br>
     * 
     * @param clazz Enum的Class
     * @param value 值
     * @param defaultValue 默认值
     * @return Enum
     */
    public static \<E extends Enum\<E>> E toEnum(Class\<E> clazz, Object value, E defaultValue)
    {
        if (value == null)
        {
            return defaultValue;
        }
        if (clazz.isAssignableFrom(value.getClass()))
        {
            @SuppressWarnings("unchecked")
            E myE = (E) value;
            return myE;
        }
        final String valueStr = toStr(value, null);
        if (StringUtils.isEmpty(valueStr))
        {
            return defaultValue;
        }
        try
        {
            return Enum.valueOf(clazz, valueStr);
        }
        catch (Exception e)
        {
            return defaultValue;
        }
    }

    /**
     * 转换为Enum对象\<br>
     * 如果给定的值为空，或者转换失败，返回默认值\<code>null\</code>\<br>
     * 
     * @param clazz Enum的Class
     * @param value 值
     * @return Enum
     */
    public static \<E extends Enum\<E>> E toEnum(Class\<E> clazz, Object value)
    {
        return toEnum(clazz, value, null);
    }

    /**
     * 转换为BigInteger\<br>
     * 如果给定的值为空，或者转换失败，返回默认值\<br>
     * 转换失败不会报错
     * 
     * @param value 被转换的值
     * @param defaultValue 转换错误时的默认值
     * @return 结果
     */
    public static BigInteger toBigInteger(Object value, BigInteger defaultValue)
    {
        if (value == null)
        {
            return defaultValue;
        }
        if (value instanceof BigInteger)
        {
            return (BigInteger) value;
        }
        if (value instanceof Long)
        {
            return BigInteger.valueOf((Long) value);
        }
        final String valueStr = toStr(value, null);
        if (StringUtils.isEmpty(valueStr))
        {
            return defaultValue;
        }
        try
        {
            return new BigInteger(valueStr);
        }
        catch (Exception e)
        {
            return defaultValue;
        }
    }

    /**
     * 转换为BigInteger\<br>
     * 如果给定的值为空，或者转换失败，返回默认值\<code>null\</code>\<br>
     * 转换失败不会报错
     * 
     * @param value 被转换的值
     * @return 结果
     */
    public static BigInteger toBigInteger(Object value)
    {
        return toBigInteger(value, null);
    }

    /**
     * 转换为BigDecimal\<br>
     * 如果给定的值为空，或者转换失败，返回默认值\<br>
     * 转换失败不会报错
     * 
     * @param value 被转换的值
     * @param defaultValue 转换错误时的默认值
     * @return 结果
     */
    public static BigDecimal toBigDecimal(Object value, BigDecimal defaultValue)
    {
        if (value == null)
        {
            return defaultValue;
        }
        if (value instanceof BigDecimal)
        {
            return (BigDecimal) value;
        }
        if (value instanceof Long)
        {
            return new BigDecimal((Long) value);
        }
        if (value instanceof Double)
        {
            return new BigDecimal((Double) value);
        }
        if (value instanceof Integer)
        {
            return new BigDecimal((Integer) value);
        }
        final String valueStr = toStr(value, null);
        if (StringUtils.isEmpty(valueStr))
        {
            return defaultValue;
        }
        try
        {
            return new BigDecimal(valueStr);
        }
        catch (Exception e)
        {
            return defaultValue;
        }
    }

    /**
     * 转换为BigDecimal\<br>
     * 如果给定的值为空，或者转换失败，返回默认值\<br>
     * 转换失败不会报错
     * 
     * @param value 被转换的值
     * @return 结果
     */
    public static BigDecimal toBigDecimal(Object value)
    {
        return toBigDecimal(value, null);
    }

    /**
     * 将对象转为字符串\<br>
     * 1、Byte数组和ByteBuffer会被转换为对应字符串的数组 2、对象数组会调用Arrays.toString方法
     * 
     * @param obj 对象
     * @return 字符串
     */
    public static String utf8Str(Object obj)
    {
        return str(obj, CharsetKit.CHARSET_UTF_8);
    }

    /**
     * 将对象转为字符串\<br>
     * 1、Byte数组和ByteBuffer会被转换为对应字符串的数组 2、对象数组会调用Arrays.toString方法
     * 
     * @param obj 对象
     * @param charsetName 字符集
     * @return 字符串
     */
    public static String str(Object obj, String charsetName)
    {
        return str(obj, Charset.forName(charsetName));
    }

    /**
     * 将对象转为字符串\<br>
     * 1、Byte数组和ByteBuffer会被转换为对应字符串的数组 2、对象数组会调用Arrays.toString方法
     * 
     * @param obj 对象
     * @param charset 字符集
     * @return 字符串
     */
    public static String str(Object obj, Charset charset)
    {
        if (null == obj)
        {
            return null;
        }

        if (obj instanceof String)
        {
            return (String) obj;
        }
        else if (obj instanceof byte[] || obj instanceof Byte[])
        {
            return str((Byte[]) obj, charset);
        }
        else if (obj instanceof ByteBuffer)
        {
            return str((ByteBuffer) obj, charset);
        }
        return obj.toString();
    }

    /**
     * 将byte数组转为字符串
     * 
     * @param bytes byte数组
     * @param charset 字符集
     * @return 字符串
     */
    public static String str(byte[] bytes, String charset)
    {
        return str(bytes, StringUtils.isEmpty(charset) ? Charset.defaultCharset() : Charset.forName(charset));
    }

    /**
     * 解码字节码
     * 
     * @param data 字符串
     * @param charset 字符集，如果此字段为空，则解码的结果取决于平台
     * @return 解码后的字符串
     */
    public static String str(byte[] data, Charset charset)
    {
        if (data == null)
        {
            return null;
        }

        if (null == charset)
        {
            return new String(data);
        }
        return new String(data, charset);
    }

    /**
     * 将编码的byteBuffer数据转换为字符串
     * 
     * @param data 数据
     * @param charset 字符集，如果为空使用当前系统字符集
     * @return 字符串
     */
    public static String str(ByteBuffer data, String charset)
    {
        if (data == null)
        {
            return null;
        }

        return str(data, Charset.forName(charset));
    }

    /**
     * 将编码的byteBuffer数据转换为字符串
     * 
     * @param data 数据
     * @param charset 字符集，如果为空使用当前系统字符集
     * @return 字符串
     */
    public static String str(ByteBuffer data, Charset charset)
    {
        if (null == charset)
        {
            charset = Charset.defaultCharset();
        }
        return charset.decode(data).toString();
    }

    // ----------------------------------------------------------------------- 全角半角转换
    /**
     * 半角转全角
     * 
     * @param input String.
     * @return 全角字符串.
     */
    public static String toSBC(String input)
    {
        return toSBC(input, null);
    }

    /**
     * 半角转全角
     * 
     * @param input String
     * @param notConvertSet 不替换的字符集合
     * @return 全角字符串.
     */
    public static String toSBC(String input, Set\<Character> notConvertSet)
    {
        char c[] = input.toCharArray();
        for (int i = 0; i \< c.length; i++)
        {
            if (null != notConvertSet && notConvertSet.contains(c[i]))
            {
                // 跳过不替换的字符
                continue;
            }

            if (c[i] == ' ')
            {
                c[i] = '\u3000';
            }
            else if (c[i] \< '\177')
            {
                c[i] = (char) (c[i] + 65248);

            }
        }
        return new String(c);
    }

    /**
     * 全角转半角
     * 
     * @param input String.
     * @return 半角字符串
     */
    public static String toDBC(String input)
    {
        return toDBC(input, null);
    }

    /**
     * 替换全角为半角
     * 
     * @param text 文本
     * @param notConvertSet 不替换的字符集合
     * @return 替换后的字符
     */
    public static String toDBC(String text, Set\<Character> notConvertSet)
    {
        char c[] = text.toCharArray();
        for (int i = 0; i \< c.length; i++)
        {
            if (null != notConvertSet && notConvertSet.contains(c[i]))
            {
                // 跳过不替换的字符
                continue;
            }

            if (c[i] == '\u3000')
            {
                c[i] = ' ';
            }
            else if (c[i] > '\uFF00' && c[i] \< '\uFF5F')
            {
                c[i] = (char) (c[i] - 65248);
            }
        }
        String returnString = new String(c);

        return returnString;
    }

    /**
     * 数字金额大写转换 先写个完整的然后将如零拾替换成零
     * 
     * @param n 数字
     * @return 中文大写数字
     */
    public static String digitUppercase(double n)
    {
        String[] fraction = { "角", "分" };
        String[] digit = { "零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖" };
        String[][] unit = { { "元", "万", "亿" }, { "", "拾", "佰", "仟" } };

        String head = n \< 0 ? "负" : "";
        n = Math.abs(n);

        String s = "";
        for (int i = 0; i \< fraction.length; i++)
        {
            s += (digit[(int) (Math.floor(n * 10 * Math.pow(10, i)) % 10)] + fraction[i]).replaceAll("(零.)+", "");
        }
        if (s.length() \< 1)
        {
            s = "整";
        }
        int integerPart = (int) Math.floor(n);

        for (int i = 0; i \< unit[0].length && integerPart > 0; i++)
        {
            String p = "";
            for (int j = 0; j \< unit[1].length && n > 0; j++)
            {
                p = digit[integerPart % 10] + unit[1][j] + p;
                integerPart = integerPart / 10;
            }
            s = p.replaceAll("(零.)*零$", "").replaceAll("^$", "零") + unit[0][i] + s;
        }
        return head + s.replaceAll("(零.)*零元", "元").replaceFirst("(零.)+", "").replaceAll("(零.)+", "零").replaceAll("^整$", "零元整");
    }
}

```

## UUID

```java
package com.jeethink.common.core.lang;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

import com.jeethink.common.exception.UtilException;

/**
 * 提供通用唯一识别码（universally unique identifier）（UUID）实现
 *
 @author  官方网址
 */
public final class UUID implements java.io.Serializable, Comparable\<UUID>
{
    private static final long serialVersionUID = -1185015143654744140L;

    /**
     * SecureRandom 的单例
     *
     */
    private static class Holder
    {
        static final SecureRandom numberGenerator = getSecureRandom();
    }

    /** 此UUID的最高64有效位 */
    private final long mostSigBits;

    /** 此UUID的最低64有效位 */
    private final long leastSigBits;

    /**
     * 私有构造
     * 
     * @param data 数据
     */
    private UUID(byte[] data)
    {
        long msb = 0;
        long lsb = 0;
        assert data.length == 16 : "data must be 16 bytes in length";
        for (int i = 0; i \< 8; i++)
        {
            msb = (msb \<\< 8) | (data[i] & 0xff);
        }
        for (int i = 8; i \< 16; i++)
        {
            lsb = (lsb \<\< 8) | (data[i] & 0xff);
        }
        this.mostSigBits = msb;
        this.leastSigBits = lsb;
    }

    /**
     * 使用指定的数据构造新的 UUID。
     *
     * @param mostSigBits 用于 {@code UUID} 的最高有效 64 位
     * @param leastSigBits 用于 {@code UUID} 的最低有效 64 位
     */
    public UUID(long mostSigBits, long leastSigBits)
    {
        this.mostSigBits = mostSigBits;
        this.leastSigBits = leastSigBits;
    }

    /**
     * 获取类型 4（伪随机生成的）UUID 的静态工厂。 使用加密的本地线程伪随机数生成器生成该 UUID。
     * 
     * @return 随机生成的 {@code UUID}
     */
    public static UUID fastUUID()
    {
        return randomUUID(false);
    }

    /**
     * 获取类型 4（伪随机生成的）UUID 的静态工厂。 使用加密的强伪随机数生成器生成该 UUID。
     * 
     * @return 随机生成的 {@code UUID}
     */
    public static UUID randomUUID()
    {
        return randomUUID(true);
    }

    public static void main(String[] args) {
        System.out.println(randomUUID());
        System.out.println(fastUUID());
    }
    /**
     * 获取类型 4（伪随机生成的）UUID 的静态工厂。 使用加密的强伪随机数生成器生成该 UUID。
     * 
     * @param isSecure 是否使用{@link SecureRandom}如果是可以获得更安全的随机码，否则可以得到更好的性能
     * @return 随机生成的 {@code UUID}
     */
    public static UUID randomUUID(boolean isSecure)
    {
        final Random ng = isSecure ? Holder.numberGenerator : getRandom();

        byte[] randomBytes = new byte[16];
        ng.nextBytes(randomBytes);
        randomBytes[6] &= 0x0f; /* clear version */
        randomBytes[6] |= 0x40; /* set to version 4 */
        randomBytes[8] &= 0x3f; /* clear variant */
        randomBytes[8] |= 0x80; /* set to IETF variant */
        return new UUID(randomBytes);
    }

    /**
     * 根据指定的字节数组获取类型 3（基于名称的）UUID 的静态工厂。
     *
     * @param name 用于构造 UUID 的字节数组。
     *
     * @return 根据指定数组生成的 {@code UUID}
     */
    public static UUID nameUUIDFromBytes(byte[] name)
    {
        MessageDigest md;
        try
        {
            md = MessageDigest.getInstance("MD5");
        }
        catch (NoSuchAlgorithmException nsae)
        {
            throw new InternalError("MD5 not supported");
        }
        byte[] md5Bytes = md.digest(name);
        md5Bytes[6] &= 0x0f; /* clear version */
        md5Bytes[6] |= 0x30; /* set to version 3 */
        md5Bytes[8] &= 0x3f; /* clear variant */
        md5Bytes[8] |= 0x80; /* set to IETF variant */
        return new UUID(md5Bytes);
    }

    /**
     * 根据 {@link #toString()} 方法中描述的字符串标准表示形式创建{@code UUID}。
     *
     * @param name 指定 {@code UUID} 字符串
     * @return 具有指定值的 {@code UUID}
     * @throws IllegalArgumentException 如果 name 与 {@link #toString} 中描述的字符串表示形式不符抛出此异常
     *
     */
    public static UUID fromString(String name)
    {
        String[] components = name.split("-");
        if (components.length != 5)
        {
            throw new IllegalArgumentException("Invalid UUID string: " + name);
        }
        for (int i = 0; i \< 5; i++)
        {
            components[i] = "0x" + components[i];
        }

        long mostSigBits = Long.decode(components[0]).longValue();
        mostSigBits \<\<= 16;
        mostSigBits |= Long.decode(components[1]).longValue();
        mostSigBits \<\<= 16;
        mostSigBits |= Long.decode(components[2]).longValue();

        long leastSigBits = Long.decode(components[3]).longValue();
        leastSigBits \<\<= 48;
        leastSigBits |= Long.decode(components[4]).longValue();

        return new UUID(mostSigBits, leastSigBits);
    }

    /**
     * 返回此 UUID 的 128 位值中的最低有效 64 位。
     *
     * @return 此 UUID 的 128 位值中的最低有效 64 位。
     */
    public long getLeastSignificantBits()
    {
        return leastSigBits;
    }

    /**
     * 返回此 UUID 的 128 位值中的最高有效 64 位。
     *
     * @return 此 UUID 的 128 位值中最高有效 64 位。
     */
    public long getMostSignificantBits()
    {
        return mostSigBits;
    }

    /**
     * 与此 {@code UUID} 相关联的版本号. 版本号描述此 {@code UUID} 是如何生成的。
     * \<p>
     * 版本号具有以下含意:
     * \<ul>
     * \<li>1 基于时间的 UUID
     * \<li>2 DCE 安全 UUID
     * \<li>3 基于名称的 UUID
     * \<li>4 随机生成的 UUID
     * \</ul>
     *
     * @return 此 {@code UUID} 的版本号
     */
    public int version()
    {
        // Version is bits masked by 0x000000000000F000 in MS long
        return (int) ((mostSigBits >> 12) & 0x0f);
    }

    /**
     * 与此 {@code UUID} 相关联的变体号。变体号描述 {@code UUID} 的布局。
     * \<p>
     * 变体号具有以下含意：
     * \<ul>
     * \<li>0 为 NCS 向后兼容保留
     * \<li>2 \<a href="http://www.ietf.org/rfc/rfc4122.txt">IETF&nbsp;RFC&nbsp;4122\</a>(Leach-Salz), 用于此类
     * \<li>6 保留，微软向后兼容
     * \<li>7 保留供以后定义使用
     * \</ul>
     *
     * @return 此 {@code UUID} 相关联的变体号
     */
    public int variant()
    {
        // This field is composed of a varying number of bits.
        // 0 - - Reserved for NCS backward compatibility
        // 1 0 - The IETF aka Leach-Salz variant (used by this class)
        // 1 1 0 Reserved, Microsoft backward compatibility
        // 1 1 1 Reserved for future definition.
        return (int) ((leastSigBits >>> (64 - (leastSigBits >>> 62))) & (leastSigBits >> 63));
    }

    /**
     * 与此 UUID 相关联的时间戳值。
     *
     * \<p>
     * 60 位的时间戳值根据此 {@code UUID} 的 time_low、time_mid 和 time_hi 字段构造。\<br>
     * 所得到的时间戳以 100 毫微秒为单位，从 UTC（通用协调时间） 1582 年 10 月 15 日零时开始。
     *
     * \<p>
     * 时间戳值仅在在基于时间的 UUID（其 version 类型为 1）中才有意义。\<br>
     * 如果此 {@code UUID} 不是基于时间的 UUID，则此方法抛出 UnsupportedOperationException。
     *
     * @throws UnsupportedOperationException 如果此 {@code UUID} 不是 version 为 1 的 UUID。
     */
    public long timestamp() throws UnsupportedOperationException
    {
        checkTimeBase();
        return (mostSigBits & 0x0FFFL) \<\< 48//
                | ((mostSigBits >> 16) & 0x0FFFFL) \<\< 32//
                | mostSigBits >>> 32;
    }

    /**
     * 与此 UUID 相关联的时钟序列值。
     *
     * \<p>
     * 14 位的时钟序列值根据此 UUID 的 clock_seq 字段构造。clock_seq 字段用于保证在基于时间的 UUID 中的时间唯一性。
     * \<p>
     * {@code clockSequence} 值仅在基于时间的 UUID（其 version 类型为 1）中才有意义。 如果此 UUID 不是基于时间的 UUID，则此方法抛出
     * UnsupportedOperationException。
     *
     * @return 此 {@code UUID} 的时钟序列
     *
     * @throws UnsupportedOperationException 如果此 UUID 的 version 不为 1
     */
    public int clockSequence() throws UnsupportedOperationException
    {
        checkTimeBase();
        return (int) ((leastSigBits & 0x3FFF000000000000L) >>> 48);
    }

    /**
     * 与此 UUID 相关的节点值。
     *
     * \<p>
     * 48 位的节点值根据此 UUID 的 node 字段构造。此字段旨在用于保存机器的 IEEE 802 地址，该地址用于生成此 UUID 以保证空间唯一性。
     * \<p>
     * 节点值仅在基于时间的 UUID（其 version 类型为 1）中才有意义。\<br>
     * 如果此 UUID 不是基于时间的 UUID，则此方法抛出 UnsupportedOperationException。
     *
     * @return 此 {@code UUID} 的节点值
     *
     * @throws UnsupportedOperationException 如果此 UUID 的 version 不为 1
     */
    public long node() throws UnsupportedOperationException
    {
        checkTimeBase();
        return leastSigBits & 0x0000FFFFFFFFFFFFL;
    }

    /**
     * 返回此{@code UUID} 的字符串表现形式。
     *
     * \<p>
     * UUID 的字符串表示形式由此 BNF 描述：
     * 
     * \<pre>
     * {@code
     * UUID                   = \<time_low>-\<time_mid>-\<time_high_and_version>-\<variant_and_sequence>-\<node>
     * time_low               = 4*\<hexOctet>
     * time_mid               = 2*\<hexOctet>
     * time_high_and_version  = 2*\<hexOctet>
     * variant_and_sequence   = 2*\<hexOctet>
     * node                   = 6*\<hexOctet>
     * hexOctet               = \<hexDigit>\<hexDigit>
     * hexDigit               = [0-9a-fA-F]
     * }
     * \</pre>
     * 
     * \</blockquote>
     *
     * @return 此{@code UUID} 的字符串表现形式
     * @see #toString(boolean)
     */
    @Override
    public String toString()
    {
        return toString(false);
    }

    /**
     * 返回此{@code UUID} 的字符串表现形式。
     *
     * \<p>
     * UUID 的字符串表示形式由此 BNF 描述：
     * 
     * \<pre>
     * {@code
     * UUID                   = \<time_low>-\<time_mid>-\<time_high_and_version>-\<variant_and_sequence>-\<node>
     * time_low               = 4*\<hexOctet>
     * time_mid               = 2*\<hexOctet>
     * time_high_and_version  = 2*\<hexOctet>
     * variant_and_sequence   = 2*\<hexOctet>
     * node                   = 6*\<hexOctet>
     * hexOctet               = \<hexDigit>\<hexDigit>
     * hexDigit               = [0-9a-fA-F]
     * }
     * \</pre>
     * 
     * \</blockquote>
     *
     * @param isSimple 是否简单模式，简单模式为不带'-'的UUID字符串
     * @return 此{@code UUID} 的字符串表现形式
     */
    public String toString(boolean isSimple)
    {
        final StringBuilder builder = new StringBuilder(isSimple ? 32 : 36);
        // time_low
        builder.append(digits(mostSigBits >> 32, 8));
        if (false == isSimple)
        {
            builder.append('-');
        }
        // time_mid
        builder.append(digits(mostSigBits >> 16, 4));
        if (false == isSimple)
        {
            builder.append('-');
        }
        // time_high_and_version
        builder.append(digits(mostSigBits, 4));
        if (false == isSimple)
        {
            builder.append('-');
        }
        // variant_and_sequence
        builder.append(digits(leastSigBits >> 48, 4));
        if (false == isSimple)
        {
            builder.append('-');
        }
        // node
        builder.append(digits(leastSigBits, 12));

        return builder.toString();
    }

    /**
     * 返回此 UUID 的哈希码。
     *
     * @return UUID 的哈希码值。
     */
    public int hashCode()
    {
        long hilo = mostSigBits ^ leastSigBits;
        return ((int) (hilo >> 32)) ^ (int) hilo;
    }

    /**
     * 将此对象与指定对象比较。
     * \<p>
     * 当且仅当参数不为 {@code null}、而是一个 UUID 对象、具有与此 UUID 相同的 varriant、包含相同的值（每一位均相同）时，结果才为 {@code true}。
     *
     * @param obj 要与之比较的对象
     *
     * @return 如果对象相同，则返回 {@code true}；否则返回 {@code false}
     */
    public boolean equals(Object obj)
    {
        if ((null == obj) || (obj.getClass() != UUID.class))
        {
            return false;
        }
        UUID id = (UUID) obj;
        return (mostSigBits == id.mostSigBits && leastSigBits == id.leastSigBits);
    }

    // Comparison Operations

    /**
     * 将此 UUID 与指定的 UUID 比较。
     *
     * \<p>
     * 如果两个 UUID 不同，且第一个 UUID 的最高有效字段大于第二个 UUID 的对应字段，则第一个 UUID 大于第二个 UUID。
     *
     * @param val 与此 UUID 比较的 UUID
     *
     * @return 在此 UUID 小于、等于或大于 val 时，分别返回 -1、0 或 1。
     *
     */
    public int compareTo(UUID val)
    {
        // The ordering is intentionally set up so that the UUIDs
        // can simply be numerically compared as two numbers
        return (this.mostSigBits \< val.mostSigBits ? -1 : //
                (this.mostSigBits > val.mostSigBits ? 1 : //
                        (this.leastSigBits \< val.leastSigBits ? -1 : //
                                (this.leastSigBits > val.leastSigBits ? 1 : //
                                        0))));
    }

    // -------------------------------------------------------------------------------------------------------------------
    // Private method start
    /**
     * 返回指定数字对应的hex值
     * 
     * @param val 值
     * @param digits 位
     * @return 值
     */
    private static String digits(long val, int digits)
    {
        long hi = 1L \<\< (digits * 4);
        return Long.toHexString(hi | (val & (hi - 1))).substring(1);
    }

    /**
     * 检查是否为time-based版本UUID
     */
    private void checkTimeBase()
    {
        if (version() != 1)
        {
            throw new UnsupportedOperationException("Not a time-based UUID");
        }
    }

    /**
     * 获取{@link SecureRandom}，类提供加密的强随机数生成器 (RNG)
     * 
     * @return {@link SecureRandom}
     */
    public static SecureRandom getSecureRandom()
    {
        try
        {
            return SecureRandom.getInstance("SHA1PRNG");
        }
        catch (NoSuchAlgorithmException e)
        {
            throw new UtilException(e);
        }
    }

    /**
     * 获取随机数生成器对象\<br>
     * ThreadLocalRandom是JDK 7之后提供并发产生随机数，能够解决多个线程发生的竞争争夺。
     * 
     * @return {@link ThreadLocalRandom}
     */
    public static ThreadLocalRandom getRandom()
    {
        return ThreadLocalRandom.current();
    }
}

```

\<details>
\</details>

# 提高CPU，防止服务器降配

```java
package com.atguigu.java2;

import java.io.IOException;

class CPUTest {

    public static void main(String[] args) {

        CPUTestThread cpuTestThread = new CPUTestThread();
        //修改for次数

        for (int i = 0; i \< 20; i++) {

            Thread cpuTest = new Thread(cpuTestThread);

            cpuTest.start();

        }

//Windows Task Manager shows

        try {

            Runtime.getRuntime().exec("taskmgr");

        } catch (IOException e1) {

            e1.printStackTrace();

        }

    }

}

class CPUTestThread implements Runnable {

    @Override

    public void run() {

        int busyTime = 10;

        int idleTime = busyTime;

        long startTime = 0;

        while (true) {

                startTime = System.currentTimeMillis();

            System.out.println(System.currentTimeMillis()+","+startTime+","+(System.currentTimeMillis() - startTime));

// busy loop

            while ((System.currentTimeMillis() - startTime) \<= busyTime);

// idle loop

            try {

                Thread.sleep(idleTime);

            } catch (InterruptedException e) {

                System.out.println(e);

            }

        }

    }

}
```

# [vo2dto](https://mp.weixin.qq.com/s/Xq7oQg7dYESMYxHVnxX8Dw)

BeanUtil.copyProperties

# 技术细节思考
