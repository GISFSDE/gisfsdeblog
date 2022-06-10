---
index: 2
icon: markdown
title: SpringCloud
date: 2022-06-06
category:
  - SpringCloud
tag:
  - SpringCloud
---

> # 新学四问
>
> WHY【与前代优化了什么，弥补了什么空白】微服务，主流
> WHAT【框架，思维导图，主题框架】eureka注册中心，Gateway网关，Ribbon负载均衡，Feign服务调用，Hystrix熔断器等，springcloudalibaba
> HOW【如何记忆，学习资源】:[bilibili](https://www.bilibili.com/video/BV18E411x7eT?from=search&seid=14879779334617797619)，[官网](https://spring.io/projects/spring-cloud#overview)
> LEVEL【不是每个都学精】当前阶段熟练运用

<!--more-->

# Spring Cloud 【[Hoxton](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-Hoxton-Release-Notes)】

## 简介

## 1. 系统架构演变

  随着互联网的发展，网站应用的规模不断扩大。需求的激增，带来的是技术上的压力。系统架构也因此也不断的演
  进、升级、迭代。从单一应用，到垂直拆分，到分布式服务，到SOA，以及现在火热的微服务架构，还有在Google
  带领下来势汹涌的Service Mesh。

### 1.1. 集中式架构

  当网站流量很小时，只需一个应用，将所有功能都部署在一起，以减少部署节点和成本。

  优点：
  	系统开发速度快
  	维护成本低
  	适用于并发要求较低的系统
  缺点：
  	代码耦合度高，后期维护困难
  	无法针对不同模块进行针对性优化
  	无法水平扩展
  	单点容错率低，并发能力差

  ### 1.2. 垂直拆分

  ​		当访问量逐渐增大，单一应用无法满足需求，此时为了应对更高的并发和业务需求，我们根据业务功能对系统进行拆
  分：

![image-20210408193459062](http://qnimg.gisfsde.com/image-20210408193459062.png)

优点：
	系统拆分实现了流量分担，解决了并发问题
	可以针对不同模块进行优化
	方便水平扩展，负载均衡，容错率提高
缺点：
	系统间相互独立，会有很多重复开发工作，影响开发效率

### 1.3. 分布式服务

​	当垂直应用越来越多，应用之间交互不可避免，将核心业务抽取出来，作为独立的服务，逐渐形成稳定的服务中心，使前端应用能更快速的响应多变的市场需求。

![image-20210408193652894](http://qnimg.gisfsde.com/image-20210408193652894.png)

优点：
	将基础服务进行了抽取，系统间相互调用，提高了代码复用和开发效率
缺点：
	系统间耦合度变高，调用关系错综复杂，难以维护

### 1.4. 面向服务架构（SOA）

​	SOA（Service Oriented Architecture）面向服务的架构：它是一种设计方法，其中包含多个服务， 服务之间通过相互依赖最终提供一系列的功能。一个服务 通常以独立的形式存在与操作系统进程中。各个服务之间 通过网络调用。SOA结构图：

![image-20210408193720315](http://qnimg.gisfsde.com/image-20210408193720315.png)

ESB（企业服务总线），简单 来说 ESB 就是一根管道，用来连接各个服务节点。为了集 成不同系统，不同协议的服务，ESB 做了消息的转化解释和路由工作，让不同的服务互联互通。

SOA缺点：每个供应商提供的ESB产品有偏差，自身实现较为复杂；应用服务粒度较大，ESB集成整合所有服务和协
议、数据转换使得运维、测试部署困难。所有服务都通过一个通路通信，直接降低了通信速度。

### 1.5. 微服务架构 

​	微服务架构是使用一套小服务来开发单个应用的方式或途径，每个服务基于单一业务能力构建，运行在自己的进程中，并使用轻量级机制通信，通常是HTTP API，并能够通过自动化部署机制来独立部署。这些服务可以使用不同的编程语言实现，以及不同数据存储技术，并保持最低限度的集中式管理。微服务结构图：

<img src="http://qnimg.gisfsde.com/image-20210408193752800.png" alt="image-20210408193752800" style="zoom: 150%;" />

![image-20210803185328530](http://qnimg.gisfsde.com/work/image-20210803185328530.png)

![image-20210803190213530](http://qnimg.gisfsde.com/work/image-20210803190213530.png)

![image-20210803190057605](http://qnimg.gisfsde.com/work/image-20210803190057605.png)

API Gateway网关是一个服务器，是系统的唯一入口。为每个客户端提供一个定制的API。API网关核心是，所有的客户端和消费端都通过统一的网关接入微服务，在网关层处理所有的非业务功能。如它还可以具有其它职责，如身份验证、监控、负载均衡、缓存、请求分片与管理、静态响应处理。通常，网关提供RESTful/HTTP的方式访问服务。而服务端通过服务注册中心进行服务注册和管理。

微服务的特点：
**单一职责**：微服务中每一个服务都对应唯一的业务能力，做到单一职责
**微**：微服务的服务拆分粒度很小，例如一个用户管理就可以作为一个服务。每个服务虽小，但“五脏俱全”。
**面向服务**：面向服务是说每个服务都要对外暴露Rest风格服务接口API。并不关心服务的技术实现，做到与平台和语言无关，也不限定用什么技术实现，只要提供Rest的接口即可。
**自治**：自治是说服务间互相独立，互不干扰
		团队独立：每个服务都是一个独立的开发团队，人数不能过多。
		技术独立：因为是面向服务，提供Rest接口，使用什么技术没有别人干涉
		前后端分离：采用前后端分离开发，提供统一Rest接口，后端不用再为PC、移动端开发不同接口
		数据库分离：每个服务都使用自己的数据源
		部署独立：服务间虽然有调用，但要做到服务重启不影响其它服务。有利于持续集成和持续交付。每个服务都是独立的组件，可复用，可替换，降低耦合，易维护

微服务架构与SOA都是对系统进行拆分；微服务架构基于SOA思想，可以把微服务当做去除了ESB的SOA。ESB是SOA架构中的中心总线，设计图形应该是星形的，而微服务是去中心化的分布式软件架构。两者比较类似，但其实也有一些差别：

![image-20210408194622844](http://qnimg.gisfsde.com/image-20210408194622844.png)

## 2.  服务调用方式

### 2.1. RPC和HTTP

无论是微服务还是SOA，都面临着服务间的远程调用。那么服务间的远程调用方式有哪些呢？
常见的远程调用方式有以下2种：

- **RPC**：Remote Produce Call远程过程调用，RPC基于Socket，工作在会话层。自定义数据格式，速度快，效率高。早期的webservice，现在热门的dubbo，都是RPC的典型代表

- **Http**：http其实是一种网络传输协议，基于TCP，工作在应用层，规定了数据传输的格式。现在客户端浏览器与服务端通信基本都是采用Http协议，也可以用来进行远程服务调用。缺点是消息封装臃肿，优势是对服务的提供和调用方没有任何技术限定，自由灵活，更符合微服务理念。

现在热门的Rest风格，就可以通过http协议来实现。
区别：RPC的机制是根据语言的API（language API）来定义的，而不是根据基于网络的应用来定义的。
如果你们公司全部采用Java技术栈，那么使用Dubbo作为微服务架构是一个不错的选择。
相反，如果公司的技术栈多样化，而且你更青睐Spring家族，那么Spring Cloud搭建微服务是不二之选。在我们的项目中，会选择Spring Cloud套件，因此会使用Http方式来实现服务间调用。

### 2.2. Http客户端工具

既然微服务选择了Http，那么我们就需要考虑自己来实现对请求和响应的处理。不过开源世界已经有很多的http客户端工具，能够帮助我们做这些事情，例如：
HttpClient
OKHttp
URLConnection
不过这些不同的客户端，API各不相同。而Spring也有对http的客户端进行封装，提供了工具类叫**RestTemplate**。

### 2.3. Spring的RestTemplate

Spring提供了一个RestTemplate模板工具类，对基于Http的客户端进行了封装，并且实现了对象与json的序列化和
反序列化，非常方便。RestTemplate并没有限定Http的客户端类型，而是进行了抽象，目前常用的3种都有支持：
HttpClient
OkHttp
JDK原生的URLConnection（默认的）

## 3.Springcloud综述

版本命名：伦敦地铁站字母顺序

实验环境

![image-20210803191107717](http://qnimg.gisfsde.com/work/image-20210803191107717.png)

## 停更、升级、替换

 ![image-20210803192154130](http://qnimg.gisfsde.com/work/image-20210803192154130.png)

## 父工程创建

### 创建工程前准备

> 约定》配置》编码

#### 编码UTF-8全套

作用

![image-20210803195102713](http://qnimg.gisfsde.com/work/image-20210803195102713.png)

#### 注解生效激活

作用

![image-20210803195303082](http://qnimg.gisfsde.com/work/image-20210803195303082.png)

#### JAVA编译版本

![image-20210803195348074](http://qnimg.gisfsde.com/work/image-20210803195348074.png)

#### 文件过滤

作用，关闭对应文件idea可见

![image-20210803195603866](http://qnimg.gisfsde.com/work/image-20210803195603866.png)

## Eureka【大楼老板】



























# Spring Cloud [Finchley]

​	一系列框架有序集合，封装后屏蔽了复杂的配置和实现原理。Spring Cloud为开发人员提供了工具，以快速构建分布式系统中的一些常见模式（例如，配置管理，服务发现，断路器，智能路由，微代理，控制总线，一次性令牌，全局锁，领导选举，分布式会话，群集状态）。分布式系统的协调导致样板式样，并且使用Spring Cloud开发人员可以快速站起来实现这些样板的服务和应用程序。它们将在任何分布式环境中都能很好地工作，包括开发人员自己的笔记本电脑，裸机数据中心以及诸如Cloud Foundry之类的托管平台。



## 1.系统架构演变

```mermaid
graph LR;
1[集中式架构] --> 2[垂直拆分]
2 --> 3[分布式服务]
3 --> 4[SOA面向服务架构]
4 --> 5[微服务架构]
```

### 微服务架构 

一套使用小服务或者单一业务来开发单个应用的方式或途径。

#### 微服务架构特点：

- 单一职责
- 服务粒度小
- 面向服务（对外暴露REST api）
- 服务之间相互独立

与使用ESB的SOA架构的区别：

微服务架构没有使用ESB，有服务治理注册中心；业务粒度小。

## 2.服务调用方式

- RPC：基于socket，速度快，效率高；webservice、dubbo
- HTTP：基于TCP，封装比较臃肿；对服务和调用方没有任何技术、语言的限定，自由灵活；RESTful，Spring Cloud



一般情况下有如下三种http客户端工具类包都可以方便的进行http服务调用：

- httpClient
- okHttp
- JDK原生URLConnection

spring 提供了RestTemplate的工具类对上述的3种http客户端工具类进行了封装，可在spring项目中使用RestTemplate进行服务调用。

### **小结**：

```java
@RunWith(SpringRunner.class)
@SpringBootTest
public class RestTemplateTest {

    @Autowired
    private RestTemplate restTemplate;

    @Test
    public void test(){
        String url = "http://localhost/user/8";
        //restTemplate可以对json格式字符串进行反序列化
        User user = restTemplate.getForObject(url, User.class);
        System.out.println(user);
    }
}

```

## 3.SpringCloud概述

- 整合的组件可以有很多组件；常见的组件有：eureka注册中心，Gateway网关，Ribbon负载均衡，Feign服务调用，Hystrix熔断器。在有需要的时候项目添加对于的启动器依赖即可。

- 版本特征：以英文单词命名（伦敦地铁站名）

## 4.创建微服务工程

- 父工程springcloud：添加spring boot父坐标和管理其它组件的依赖
- 用户服务工程user-service：整合mybatis查询数据库中用户数据；提供查询用户服务
- 服务消费工程consumer-demo：利用查询用户服务获取用户数据并输出到浏览器

  

## 5.搭建配置Service工程

1. 添加启动器依赖（web、通用Mapper）；
2. 创建启动引导类和配置文件；
3. 修改配置文件中的参数；
4. 编写测试代码（UserMapper，UserService，UserController）；
5. 测试

## 6.搭建配置Client工程

1. 添加启动器依赖；
2. 创建启动引导类（注册RestTemplate）和配置文件；
3. 编写测试代码（ConsumerController中使用restTemplate访问服务获取数据）
4. 测试

## 7.问题

- 服务管理
  如何自动注册和发现
  如何实现状态监管
  如何实现动态路由

- 服务如何实现负载均衡

- 服务如何解决容灾问题

- 服务如何实现统一配置

##### 上述问题通过springcloud各种组件解决

## 8.Eureka

Eureka的主要功能是进行服务管理，定期检查服务状态，返回服务地址列表。

![1560439174201](http://qnimg.gisfsde.com/1560439174201.png)

### 8.1Eureka-server

Eureka是服务注册中心，只做服务注册；自身并不提供服务也不消费服务。可以搭建web工程使用Eureka，可以使用Spring Boot方式搭建。

搭建步骤：

1. 创建工程；
2. 添加启动器依赖；
3. 编写启动引导类（添加Eureka的服务注解）和配置文件；
4. 修改配置文件（端口，应用名称...）；
5. 启动测试

### 8.2服务注册与发现

- 服务注册：在服务提供工程user-service上添加Eureka客户端依赖；自动将服务注册到EurekaServer服务地址列表。
  - 添加依赖；
  - 改造启动引导类；添加开启Eureka客户端发现的注解；
  - 修改配置文件；设置Eureka 服务地址
- 服务发现：在服务消费工程consumer-demo上添加Eureka客户端依赖；可以使用工具类根据服务名称获取对应的服务地址列表。
  - 添加依赖；
  - 改造启动引导类；添加开启Eureka客户端发现的注解；
  - 修改配置文件；设置Eureka 服务地址；
  - 改造处理器类Controller，可以使用工具类DiscoveryClient根据服务名称获取对应服务地址列表。

### 8.3高可用配置

​		将Eureka Server作为一个服务注册到其它Eureka Server，这样多个Eureka Server之间就能够互相发现对方，同步服务，实现Eureka Server集群。



## 9.负载均衡Ribbon



Ribbon提供了轮询、随机两种负载均衡算法（默认是轮询）可以实现从地址列表中使用负载均衡算法获取地址进行服务调用。

### 9.1Ribbon应用

在实例化RestTemplate的时候使用@LoadBalanced，服务地址直接可以使用服务名。

## 10.熔断器Hystrix（豪猪）

Hystrix是一个延迟和容错库，用于隔离访问远程服务，防止出现级联失败。

### 10.1线程隔离&服务降级 

Hystrix解决雪崩效应：

- 线程隔离：用户请求不直接访问服务，而是使用线程池中空闲的线程访问服务，加速失败判断时间。
- 服务降级：及时返回服务调用失败的结果，让线程不因为等待服务而阻塞。

**小结**：

- 添加依赖

```xml
        \<dependency>
            \<groupId>org.springframework.cloud\</groupId>
            \<artifactId>spring-cloud-starter-netflix-hystrix\</artifactId>
        \</dependency>
```

- 开启熔断 

- 降级逻辑

```java
@RestController
@RequestMapping("/consumer")
@Slf4j
@DefaultProperties(defaultFallback = "defaultFallback")
public class ConsumerController {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private DiscoveryClient discoveryClient;

    @GetMapping("/{id}")
    //@HystrixCommand(fallbackMethod = "queryByIdFallback")
    @HystrixCommand
    public String queryById(@PathVariable Long id){
        /*String url = "http://localhost:9091/user/"+id;
        
        //获取eureka中注册的user-service的实例
        List\<ServiceInstance> serviceInstances = discoveryClient.getInstances("user-service");
        ServiceInstance serviceInstance = serviceInstances.get(0);

        url = "http://" + serviceInstance.getHost() + ":" + serviceInstance.getPort() + "/user/" + id;*/
        String url = "http://user-service/user/" + id;
        return restTemplate.getForObject(url, String.class);
    }

    public String queryByIdFallback(Long id){
        log.error("查询用户信息失败。id：{}", id);
        return "对不起，网络太拥挤了！";
    }

    public String defaultFallback(){
        return "默认提示：对不起，网络太拥挤了！";
    }
}

```



- 修改超时配置

```yml
hystrix:
  command:
    default:
      execution:
        isolation:
          thread:
            timeoutInMilliseconds: 2000
```



### 10.2服务熔断

​		在服务熔断中，使用的熔断器，也叫断路器，其英文单词为：Circuit Breaker
​		熔断机制与家里使用的电路熔断原理类似；当如果电路发生短路的时候能立刻熔断电路，避免发生灾难。在分布式系
统中应用服务熔断后；服务调用方可以自己进行判断哪些服务反应慢或存在大量超时，可以针对这些服务进行主动熔
断，防止整个系统被拖垮。
​		Hystrix的服务熔断机制，可以实现弹性容错；当服务请求情况好转之后，可以自动重连。通过断路的方式，将后续
请求直接拒绝，一段时间（默认5秒）之后允许部分请求通过，如果调用成功则回到断路器关闭状态，否则继续打
开，拒绝请求的服务。
Hystrix的熔断状态机模型：![Spring Cloud 第一天讲义](http://qnimg.gisfsde.com/Spring%20Cloud%20%E7%AC%AC%E4%B8%80%E5%A4%A9%E8%AE%B2%E4%B9%89.jpg)

状态机有3个状态：
Closed：关闭状态（断路器关闭），所有请求都正常访问。
Open：打开状态（断路器打开），所有请求都会被降级。Hystrix会对请求情况计数，当一定时间内失败请求百
分比达到阈值，则触发熔断，断路器会完全打开。默认失败比例的阈值是50%，请求次数最少不低于20次。
Half Open：半开状态，不是永久的，断路器打开后会进入休眠时间（默认是5S）。随后断路器会自动进入半开
状态。此时会释放部分请求通过，若这些请求都是健康的，则会关闭断路器，否则继续保持打开，再次进行休
眠计时。



## 11.服务消费者（Feign）

### 	11.1简介

​		Feign是一个声明式的伪Http客户端，它使得写Http客户端变得更简单。使用Feign，只需要创建一个接口并注解。它具有可插拔的注解特性，可使用Feign 注解和JAX-RS注解。Feign支持可插拔的编码器和解码器。Feign默认集成了Ribbon，并和Eureka结合，默认实现了负载均衡的效果。

简而言之：

Feign 采用的是**基于接口的注解**
Feign 整合了ribbon，具有**负载均衡**的能力
整合了Hystrix，具有**熔断**的能力

## 12.断路器（Hystrix）

​		在微服务架构中，根据业务来拆分成一个个的服务，服务与服务之间可以相互调用（RPC），在Spring Cloud可以用RestTemplate+Ribbon和Feign来调用。为了保证其高可用，单个服务通常会集群部署。由于网络原因或者自身的原因，服务并不能保证100%可用，如果单个服务出现问题，调用这个服务就会出现线程阻塞，此时若有大量的请求涌入，Servlet容器的线程资源会被消耗完毕，导致服务瘫痪。服务与服务之间的依赖性，故障会传播，会对整个微服务系统造成灾难性的严重后果，这就是服务故障的“雪崩”效应。

为了解决这个问题，业界提出了断路器模型。

### 12.1断路器简介

​		Netflix has created a library called Hystrix that implements the circuit breaker pattern. In a microservice architecture it is common to have multiple layers of service calls.Netflix. 开源了Hystrix组件，实现了断路器模式，SpringCloud对这一组件进行了整合。 在微服务架构中，一个请求需要调用多个服务是非常常见的。较底层的服务如果出现故障，会导致连锁故障。当对特定的服务的调用的不可用达到一个阀值（Hystric 是5秒20次） 断路器将会被打开。断路打开后，可用避免连锁故障，fallback方法可以直接返回一个固定值。

<img src="http://qnimg.gisfsde.com/20190601005310316.png" alt="img" style="zoom: 80%;" />



<img src="http://qnimg.gisfsde.com/20190601005329346.png" alt="在这里插入图片描述" style="zoom: 80%;" />



## 13.路由网关(zuul)

​		Zuul的主要功能是路由转发和过滤器。路由功能是微服务的一部分，比如／api/user转发到到user服务，/api/shop转发到到shop服务。zuul默认和Ribbon结合实现了负载均衡的功能。

zuul有以下功能：

Authentication
Insights
Stress Testing
Canary Testing
Dynamic Routing
Service Migration
Load Shedding
Security
Static Response handling
Active/Active traffic management

### 服务过滤

filterType：返回一个字符串代表过滤器的类型，在zuul中定义了四种不同生命周期的过滤器类型，具体如下：
pre：路由之前
routing：路由之时
post： 路由之后
error：发送错误调用
filterOrder：过滤的顺序
shouldFilter：这里可以写逻辑判断，是否要过滤，本文true,永远过滤。
run：过滤器的具体逻辑。可用很复杂，包括查sql，nosql去判断该请求到底有没有权限访问。

## 14.分布式配置中心(Spring Cloud Config)

​		在分布式系统中，由于服务数量巨多，为了方便服务配置文件统一管理，实时更新，所以需要分布式配置中心组件。在Spring Cloud中，有分布式配置中心组件spring cloud config ，它支持配置服务放在配置服务的内存中（即本地），也支持放在远程Git仓库中。在spring cloud config 组件中，分两个角色，一是config server，二是config client。

## 15. 高可用的分布式配置中心(Spring Cloud Config)

​		当服务实例很多时，都从配置中心读取文件，这时可以考虑将配置中心做成一个微服务，将其集群化，从而达到高可用



## 16.消息总线(Spring Cloud Bus)

​		Spring Cloud Bus 将分布式的节点用轻量的消息代理连接起来。它可以用于广播配置文件的更改或者服务之间的通讯，也可以用于监控。本文要讲述的是用Spring Cloud Bus实现通知微服务架构的配置文件的更改。【修改配置文件，无需重启】

准备：安装rabbitMq

![在这里插入图片描述](http://qnimg.gisfsde.com/20190601005920376.png)

## 17.服务链路追踪(Spring Cloud Sleuth)

​		微服务架构上通过业务来划分服务的，通过REST调用，对外暴露的一个接口，可能需要很多个服务协同才能完成这个接口功能，如果链路上任何一个服务出现问题或者网络超时，都会形成导致接口调用失败。随着业务的不断扩张，服务之间互相调用会越来越复杂。



术语
Span：基本工作单元，例如，在一个新建的span中发送一个RPC等同于发送一个回应请求给RPC，span通过一个64位ID唯一标识，trace以另一个64位ID表示，span还有其他数据信息，比如摘要、时间戳事件、关键值注释(tags)、span的ID、以及进度ID(通常是IP地址)
span在不断的启动和停止，同时记录了时间信息，当你创建了一个span，你必须在未来的某个时刻停止它。
Trace：一系列spans组成的一个树状结构，例如，如果你正在跑一个分布式大数据工程，你可能需要创建一个trace。
Annotation：用来及时记录一个事件的存在，一些核心annotations用来定义一个请求的开始和结束
cs - Client Sent -客户端发起一个请求，这个annotion描述了这个span的开始
sr - Server Received -服务端获得请求并准备开始处理它，如果将其sr减去cs时间戳便可得到网络延迟
ss - Server Sent -注解表明请求处理的完成(当请求返回客户端)，如果ss减去sr时间戳便可得到服务端需要的处理请求时间
cr - Client Received -表明span的结束，客户端成功接收到服务端的回复，如果cr减去cs时间戳便可得到客户端从服务端获取回复的所有所需时间
将Span和Trace在一个系统中使用Zipkin注解的过程图形化：

![在这里插入图片描述](http://qnimg.gisfsde.com/20190601010259716.png)



![image-20210406194129791](http://qnimg.gisfsde.com/image-20210406194129791.png)



## 18.高可用的服务注册中心

​		服务注册中心Eureka Server，是一个实例，当成千上万个服务向它注册的时候，它的负载是非常高的，这在生产环境上是不太合适的，这篇文章主要介绍怎么将Eureka Server集群化。Eureka通过运行多个实例，使其更具有高可用性。事实上，这是它默认的熟性，你需要做的就是给对等的实例一个合法的关联serviceurl。

# [SpringCloud Alibaba](https://github.com/MrDemonlxl/cloud2020/commits/master)









































> **参考文献**：黑马课程笔记，[方志朋的博客](http://blog.csdn.net/forezp)