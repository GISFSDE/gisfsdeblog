---
index: 2
icon: markdown
title: 谷粒商城
date: 2022-06-06
category:
  - 谷粒商城
tag:
  - 谷粒商城
---
> 介绍

<!-- more -->

> # 新学四问
>
> **WHY【与前代优化了什么，弥补了什么空白】**：学习实践分布式组件，高并发等业务  
> **WHAT【框架，思维导图，主题框架】**：通过项目扎实技术，SpringBoot+SpringCloud+Docker+VUE+Element-UI  
> **HOW【如何记忆，学习资源（官方文档、视频资源、项目地址）】**：[谷粒商城源码和软件](https://share.weiyun.com/z0DElpTd)、[在线教程](https://www.bilibili.com/video/BV1np4y1C7Yf?spm_id_from=333.999.0.0)  
> **LEVEL【不是每个都学精】**：清晰明了  

# 进度： 【基础篇完成--7.26，高级篇[170](https://www.bilibili.com/video/BV1np4y1C7Yf?p=104&spm_id_from=pageDriver&vd_source=10bfbb2d4bb1646ac73508c202d5f815)，集群篇】
  + [x] GuLimall基础篇
  + [ ] **微服务架构篇**
  + [ ] 高可用集群篇

重点片段：55集附近树相关操作、66-69统一异常处理相关，156解决缓存击穿问题，158分布式锁原理与使用
		**【Redis缓存实践、Druid数据源监控、Jenkins自动化部署、测试】**
		·1、分布式基础概念
		·微服务、注册中心、配置中心、远程调用、Feign、网关
		·2、基础开发
		SpringBoot2.0、SpringCloud、Mybatis-PIus、Vue组件化、阿里云对象存储
		・3、环境
		·Vagrant、Linux、Docker、MySQL、Redis、逆向工程&人人开源
		·4、开发规范
		·数据校验JSR303、全局异常处理、全局统一返回、全局跨域处理
		·枚举状态、业务状态码、VO与TO与PO划分、逻辑删除
		·Lombok:@Data、@slf4j

# =====**分布式基础篇**=====

---

#  一、项目介绍 

##  1.1 项目背景 

项目在线接口文档：[1、分页请求参数 - 谷粒商城  (easydoc.net)](https://easydoc.net/s/78237135/ZUqEdvA4/hKJTcbfd)



##  1.2 电商模式  

市面上有5种常见的电商模式 B2B 、B2C、C2B 、C2C、O2O

###  1.2.1 B2B 模式 

B2B （ Business to  Business） 是指商家和商家建立的商业关系，如阿里巴巴。

###  1.2.2 B2C 模式 

B2C(Business to Consumer) 就是我们经常看到的供应商直接把商品买个用户，即 “商对客” 模式，也就是我们呢说的商业零售，直接面向消费销售产品和服务，如苏宁易购，京东，天猫，小米商城

###  1.2.3 C2B 模式 

C2B (Customer to Business),即消费者对企业，先有消费者需求产生而后有企业生产，即先有消费者提出需求，后又生产企业按需求组织生产

###  1.2.4 C2C  模式 

 C2C (Customer to Consumer) 客户之间吧自己的东西放到网上去卖 如 淘宝 咸鱼

###  1.2.5 O2O 

O2O 即 Online To Offline，也即将线下商务的机会与互联网结合在一起，让互联网成为线下交易前台，线上快速支付，线下优质服务，如：饿了么，美团，淘票票，京东到家

##  1.3 谷粒商城 

谷粒商城是一个 B2C 模式的电商平台，销售自营商品给客户

##  1.4  项目架构图 

 1. ### 项目微服务架构图 

![谷粒商城-微服务架构图.jpg](http://qnimg.gisfsde.com/work/1610937357129-af7e3c78-9872-4db0-8d77-1a982788a193.jpeg)

 2. ### 微服务划分图 

![image-20201015112852613.png](http://qnimg.gisfsde.com/work/1610938057423-20a6e87f-c156-4a6b-96dc-69b8fe3c9686.png)

##  1.5 项目技术和特色 

● 前后分离技术、并开发基于 vue 的后台管理系统。

●SpringCloud 全新的解决方案

●应用监控、限流、网关、熔断降级、等分布式方案，全方位涉及

●透彻讲解分布式事务，分布式锁等分布式系统的难点

●压力测试与性能优化

●各种集群技术的区别以及使用

●CI/CD的使用

##  1.6 项目前置要求 

学习项目的前置知识

●熟悉 Springboot 以及常见的整合方案

●了解 SpringCloud

●熟悉 git maven

●熟悉 Linux 、 redis docker 基本操作

●了解html、css、js 、vue

●熟悉使用 idea 开发项目

#  二、分布式基础概念 

##  2.1 微服务 

微服务架构风格，就像是把一个单独的应用程序开发成一套小服务，每个小服务运行在自己的进程中，并使用轻量级机制通信，通常是HTTP API 这些服务围绕业务能力来构建，并通过完全自动化部署机制来独立部署，这些服务使用不同的编程语言来写，以及不同的数据存储技术，并保持最低限度的集中式管理。

简而言之，拒绝大型单体应用，基于业务边界进行服务拆分，每个服务独立部署运行。

![image-20201015101317095.png](http://qnimg.gisfsde.com/work/1610943441881-f899ea10-7007-46a8-870a-331b680ac9ac.png)

##  2.2 集群 &  分布式 & 节点 

集群是个物理状态，分布式是个工作方式。

只要是一对机器，也可以叫做集群，他不是一起协作干活，这谁也不知道。

《分布式系统原理与范型》定义：


“分布式系统是若干独立计算机的集合，这些计算机对于用户来说像但各相关系统”

分布式系统 (distributed system) 是建立网络之上的软件系统
分布式是指讲不通的业务分布在不同的地方
集群实质是将几台服务器集中在一起，实现同一业务
例如：京东是一个分布式系统，众多业务运行在不同的机器上，所有业务构成一个大型的业务集群，每一个小的业务，比如用户系统，访问压力大的时候一台服务器是不够的，我们就应该将用户系统部署到多个服务器，也就是每个一业务系统也可以做集群化

分布式中的每一个节点，都可以做集群，而集群并不一定就是分布式的

节点：集群中的一个服务器

##  2.3 远程调用 

在分布式系统中，各个服务可能处于不同主机，但是服务之间不可避免的需要互相调用，我们称之为远程调用 

SpringCloud 中使用 HTTP + JSON 的方式来完成远程调用。

HTTP+JSON

![image-20201015103427667.png](http://qnimg.gisfsde.com/work/1610943854828-5998cdc5-0ece-453f-976d-5866876f02fa.png)

##  2.4 负载均衡 

![image-20201015103547907.png](http://qnimg.gisfsde.com/work/1610943916861-7de530e5-43b4-4543-8f87-104f0da5af10.png)



分布式系统中，A 服务需要调用  B 服务，B 服务在多台机器中都存在，A 调用任意一个服务器均可完成功能。

为了使每一个服务器都不要太忙后者太闲，我们可以负载均衡调用每一个服务器，提升网站的健壮性。

常见的负载均算法：

轮询： 为第一个请求选择健康池中的第一个后端服务器，然后按顺序往后依次选择，直到最后一个，然后循环。
最小连接： 优先选择连接数最少，也就是压力最小的后端服务器，在会话较长的情况下可以考虑采取这种方式。

##  2.5 服务注册/发现  & 注册中心 

A 服务调用 B 服务， A 服务 不知道 B 服务当前在哪几台服务器上有，那些正常的，那些服务已经下线，解决这个问题可以引入注册中心。

![image-20201015104330935.png](http://qnimg.gisfsde.com/work/1610946745993-411f3672-87aa-4440-8974-fecb57c54204.png)



如果某些服务下线，我们其他人可以实时的感知到其他服务的状态，从而避免调用不可用的服务。

##  2.6 配置中心 

![image-20201015104450711.png](http://qnimg.gisfsde.com/work/1610946879552-b1d838ea-605c-4ee3-871c-25dd9123faa0.png)

每一个服务最终都有大量配置，并且每个服务都可能部署在多个服务器上，我们经常需要变更配置，我们可以让每个服务在配置中心获取自己的配置，配置中心用来集中管理微服务的配置信息。

##  2.7 服务熔断 & 服务降级 

在微服务架构中，微服务之间通过网络来进行通信，存在相互依赖，当其中一个服务不可用时，有可能会造成雪崩效应，要防止这种情况，必须要有容错机制来保证服务。

![image-20201015105256207.png](http://qnimg.gisfsde.com/work/1610947257467-3299ac4c-69de-4553-aec8-7972fa6da25e.png)

 1. ### 服务熔断 

●设置服务的超时，当被调用的服务经常失败达到某个阈值，我们可以开启短路保护机制，后来的请求不再去调用这个服务，本地直接返回默认的数据。

 2. ### 服务降级 

●在运维期间，当系统处于高峰期，系统资源紧张，我们可以让非核心业务降级运行，降级某些服务不处理，或者简单处理【抛异常，返回NULL，调用MOCk数据，调用FallBack处理逻辑】

##  2.8 Api网关 

在微服务架构中， Api Gateway 作为整体架构的重要组件，它抽象服务中需要的公共功能，同时它提供给了客户端负载均衡、服务自动熔断、灰度发布、统一认证、限流监控、日志统计 等 丰富功能，帮助我们解决了很多 API  管理的难题  。

![image-20201015110148578.png](http://qnimg.gisfsde.com/work/1610947741988-1bfd6a06-45bb-48f4-9849-a6fa424c30e9.png)

#  三、搭建环境 

##  3.1 安装 Linux  虚拟机 

下载&安装 VirtualBox https://www.virtualbox.org/  要开启 CPU 虚拟化

### 下载& 安装 Vagrant 

https://app.vagrantup.com/boxes/search Vagrant 官方镜像仓库

https://www.vagrantup.com/downloads.html Vagrant下载

打开window cmd窗口，运行**vagrant init centos/7** ,即可**初始化**一个centos系统

运行**vagrant up**即可**启动**虚拟机。**系统root用户的密码是vagrant**

[**vagrant其他常用命令**](https://www.vagrantup.com/docs/cli/init.html)

```bash
vagrant upload source [destination] [name|id] 上传文件
vagrant init      	# 初始化
vagrant init <box>	# 初始化一个指定box
vagrant up        	# 启动虚拟机
vagrant halt      	# 关闭虚拟机
vagrant reload    	# 重启虚拟机
vagrant ssh       	# SSH 至虚拟机
vagrant suspend   	# 挂起虚拟机
vagrant resume    	# 唤醒虚拟机
vagrant status    	# 查看虚拟机运行状态
vagrant provision 	#重新应用更改 vagrant 配置
vagrant destroy   	# 销毁当前虚拟机
 
vagrant reload --provision 	#按新配置重启
vagrant up --provision   #按新配置启动
 
vagrant box list    # 查看本地box列表
vagrant box add     # 添加box到列表
vagrant box remove  # 从box列表移除 
 
vagrant package --output local-centos.box # 将虚拟机打包为一个.box的文件
```

默认虚拟机的ip 地址不是固定ip 开发不方便

Vagrant 和 VirtualBox 版本有对应问题  有问题就都安装最新版本 

**修改 Vagrantfile**

  config.vm.network "private_network", ip: "192.168.56.10"

这里 ip 需要在 物理机下使用 ipconfig 命令找到

![image-20201015141629387.png](https://cdn.nlark.com/yuque/0/2021/png/440247/1610948554518-f1099be6-606a-455c-b1bf-402c52057afe.png)

**打开允许ssh连接工具，设置允许账户密码登录**

默认只允许ssh登录的方式，设置允许账户密码登录如下：

```
Vagrant ssh
vi /etc/ssh/sshd_config
修改  PasswordAuthentication yes
重启服务 service sshd restart
```



#### 打包虚拟机及其环境

在VirtualBox工作文件夹下 ，比如：C:\Users\aaa\VirtualBox VMs

```
vagrant package --base  虚拟机文件夹名 --output 导出box名字.box
另一台导入
vagrant box add 新box名 导出的box文件路径
vagrant box list 
删除旧配置文件 .vagrant 与 Vagrantfile 不删除会创建没有软件的初始化虚拟机
init 命令会在box文件所在目录创建.vagrant 与 Vagrantfile，创建后复制到用户目录下会更加便捷
vagrant init 新box名
vagrant up
vagrant ssh
```



##  3.2 安装 docker 

Docker 参考 [Docker](https://www.docker.com/)

###  3.2.1 卸载系统之前安装的docker 

Uninstall old versions.

一步一步往下执行就行


```bash
sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine
```

SET UP THE REPOSITORY

Install the yum-utils package (which provides the yum-config-manager utility) and set up the stable repository.

```bash
sudo yum install -y yum-utils
sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
```



INSTALL DOCKER ENGINE
1.Install the latest version of Docker Engine and containerd, or go to the next step to install a specific version:

```bash
sudo yum install docker-ce docker-ce-cli containerd.io
```

Start Docker


```bash
sudo systemctl start docker
```

Verify that Docker Engine is installed correctly by running the hello-world image.


```bash
sudo docker run hello-world
```

设置 docker 开机自启动


```bash
sudo systemctl enable docker
```

查看Docker的镜像

```bash
sudo docker images
```

查看docker使用情况(内存、CPU、网络情况)

```
docker stats
```



设置 Docker 镜像加速

登录 aliyun.com 在控制台找到容器镜像服务


![image-20201015144524435.png](https://cdn.nlark.com/yuque/0/2021/png/440247/1610948939792-421b248d-416d-4c57-b18d-33b5b9a3fbbb.png)

docker 进入 对应容器

```bash
docker ps  #查看主机有哪些容器正在运行
docker exec -it 容器ID/NAME /bin/bash  #进入对应容器
exit; #退出容器[快捷键 ctrl + p/q]
```



##  3.3 docker 安装  mysql 

###  3.3.1 下载镜像文件 

```bash
sudo docker pull mysql:5.7
sudo docker images
```

 3.3.2 创建实例并启动 

```bash
# --name指定容器名字 -v目录挂载 -p指定端口映射  -e设置mysql参数 -d后台运行
sudo docker run -p 3306:3306 --name mysql \
-v /mydata/mysql/log:/var/log/mysql \
-v /mydata/mysql/data:/var/lib/mysql \
-v /mydata/mysql/conf:/etc/mysql \
-e MYSQL_ROOT_PASSWORD=root \
-d mysql:5.7
####
-v 将对应文件挂载到主机【类似快捷方式，两者内容同步】，比如-v /mydata/mysql/log【主机快捷方式】:/var/log/mysql【容器中文件夹】
-e 初始化对应MYSQL参数
-p 容器端口映射到主机的端口
su root
docker ps  #查看主机有哪些容器正在运行
```

MySQL 配置

切换为root 用户密码 vagrant

vi /mydata/mysql/conf/my.cnf 创建&修改该文件


```
[client]
default-character-set=utf8
[mysql]
default-character-set=utf8
[mysqld]
init_connect='SET collation_connection = utf8_unicode_ci'
init_connect='SET NAMES utf8'
character-set-server=utf8
collation-server=utf8_unicode_ci
skip-character-set-client-handshake
skip-name-resolve
```

```bash
#重启mysql
docker restart mysql
```



###  3.3.3 通过容器的mysql 命令工具连接 

![image.png](https://cdn.nlark.com/yuque/0/2021/png/440247/1610949284748-a37e0692-eb52-449c-861c-2fb73d627668.png)

##  3.4 docker 安装 redis 

###  3.4.1 下载镜像文件 

```
docker pull redis
```

###  3.4.2 创建实例并启动 

```bash
#先创建文件夹和文件再挂载，否则会将其文件名创建为文件夹
mkdir -p /mydata/redis/conf
touch /mydata/redis/conf/redis.conf
# 启动 同时 映射到对应文件夹
# 后面 \ 代表换行
docker run -p 6379:6379 --name redis \
-v /mydata/redis/data:/data \
-v /mydata/redis/conf/redis.conf:/etc/redis/redis.conf \
-d redis redis-server /etc/redis/redis.conf

docker ps
```

###  3.4.3 使用 redis 镜像执行 redis-cli 命令连接 

进入docker cli

docker exec -it redis redis-cli

持久化 默认 appendonly on 没有开启

```bash
vi /mydata/redis/conf/redis.conf
# 插入下面内容
appendonly yes
#重启
docker restart redis

#虚拟机重启
vagrant reload 
#查看当前运行容器
docker ps
#自动重启redis/mysql
docker update redis --restart=always
```



##  3.5 开发环境统一 

[后台框架](https://gitee.com/renrenio/renren-fast)、[前台框架](https://gitee.com/renrenio/renren-fast-vue)

###  3.5.1 Maven版本与配置 

####  1.配置阿里云镜像 

```xml
\<mirrors>
    \<mirror>
    \<id>nexus-aliyun\</id>
    \<mirrorOf>central\</mirrorOf>
    \<name>Nexus aliyun\</name>
    \<url>http://maven.aliyun.com/nexus/content/groups/public\</url>
    \</mirror>
\</mirrors>
```

 2. #### 配置 jdk 1.8 编译项目 

```xml
\<profiles>
    \<profile>
      \<id>jdk-1.8\</id>
      \<activation>
        \<activeByDefault>true\</activeByDefault>
        \<jdk>1.8\</jdk>
      \</activation>
      \<properties>
        \<maven.compiler.source>1.8\</maven.compiler.source>
        \<maven.compiler.target>1.8\</maven.compiler.target>\<maven.compiler.compilerVersion>1.8\</maven.compiler.compilerVersion>
      \</properties>
    \</profile>
  \</profiles>
```



###  3.5.2 idea & vscode 

[VSCode插件](https://github.com/varHarrie/varharrie.github.io/issues/10)

Vetur ——语法高亮，智能感知 包含格式化功能，Alt+Shift+F (格式化全文) ，Ctrl+K Ctrl+F (格式化选中代码，两个Ctrl需要同时按着)
EsLint 一一 语法纠错
Auto Close Tag 一一 自动闭合HTML/XML标签
Auto Rename Tag 一一 自动完成另-侧标签的同步修改
JavaScript(ES6) code snippets 一一 ES6 语法智能提示以及快速输入，除j外还支持.ts, .jsx， .tsx， .html, .vue;省去了配置其支持各种包含is代码文件的时间

### 3.5.3 MybatisPlus整合

#### 4.1 配置环境

##### 4.1.1、导入依赖

```xml
\<dependency>
            \<groupId>com.baomidou\</groupId>
            \<artifactId>mybatis-plus-boot-starter\</artifactId>
            \<version>3.2.0\</version>
        \</dependency>
```

##### 4.2.2、配置数据源

配置数据源

1. ###### 导入数据库驱动

   https://mvnrepository.com/artifact/mysql/mysql-connector-java

   ```xml
    <!--导入mysql驱动-->
           \<dependency>
               \<groupId>mysql\</groupId>
               \<artifactId>mysql-connector-java\</artifactId>
               \<version>8.0.17\</version>
           \</dependency>
   ```

2. ###### 在application.yml配置数据源相关信息

   ```yml
   spring:
     datasource:
       username: root
       password: root
       url: jdbc:mysql://192.168.56.10:3306/gulimall_pms
       driver-class-name: com.mysql.jdbc.Driver
   mybatis-plus:
   	# mapper文件扫描
     mapper-locations: classpath*:/mapper/**/*.xml
     global-config:
       db-config:
         id-type: auto # 数据库主键自增
   ```

配置MyBatis-Plus包扫描：

1. 使用@MapperScanner

2. 告诉MyBatis-Plus,Sql映射文件位置

   ```java
   @MapperScan("com.atguigu.gulimall.product.dao")
   @SpringBootApplication
   public class GulimallProductApplication {
       public static void main(String[] args) {
           SpringApplication.run(GulimallProductApplication.class, args);
       }
   }
   ```

   

具体过程参考官网： https://baomidou.com/guide/install.html#release

#### 4.2 分页配置

```java
@Configuration // 声明配置类
@EnableTransactionManagement // 开启注解
@MapperScan("com.atguigu.gulimall.product.dao") // 指定扫描包
public class MyBatisConfig {


    /**
     * 引入分页插件 拦截器
     * @return
     */
    @Bean
    public PaginationInterceptor paginationInterceptor() {
        PaginationInterceptor paginationInterceptor = new PaginationInterceptor();
        // 设置请求的页面大于最大页后操作， true调回到首页，false 继续请求  默认false
         paginationInterceptor.setOverflow(true);
        // 设置最大单页限制数量，默认 500 条，-1 不受限制
         paginationInterceptor.setLimit(1000);
        // 开启 count 的 join 优化,只针对部分 left join
        paginationInterceptor.setCountSqlParser(new JsqlParserCountOptimize(true));
        return paginationInterceptor;
    }
}
```

#### 4.3 逻辑删除

说明:

只对自动注入的sql起效:

- 插入: 不作限制
- 查找: 追加where条件过滤掉已删除数据,且使用 wrapper.entity 生成的where条件会忽略该字段
- 更新: 追加where条件防止更新到已删除数据,且使用 wrapper.entity 生成的where条件会忽略该字段
- 删除: 转变为 更新

例如:

- 删除: `update user set deleted=1 where id = 1 and deleted=0`
- 查找: `select id,name,deleted from user where deleted=0`

##### 步骤1：配置 application.yml

```yaml
mybatis-plus:
  mapper-locations: classpath*:/mapper/**/*.xml
  global-config:
    db-config:
      id-type: auto # 数据库主键自增
      logic-delete-value: 1 # 逻辑已删除值(默认为 1)
      logic-not-delete-value: 0 # 逻辑未删除值(默认为 0)
```

##### 步骤2: 实体类字段上加上`@TableLogic`注解

```java
/**
 * 是否显示[0-不显示，1显示]
 */
@TableLogic(value = "1",delval = "0")
private Integer showStatus;
```



###  3.5.4 安装配置git 

 1. #### 下载git 

https://git-scm.com/

 2. #### 配置 git 进入  git bash 

```
# 配置用户名
git config --global user.name "user.name"
# 配置邮箱
git config --global user.email "username@email.com" # 注册账号使用的邮箱
```

 3. ### 配置 ssh 免密码登录 

https://github.com/settings/keys

```
git bash 使用 ssh-keygen -t rsa -C "XXX@xxx.com" 命令 连续三次回车
一般用户目录下都会有
id_rsa 文件
id_rsa.pub 文件
或者 cat ~/.ssh/id_rsa.pub
登录进 github/gitee 设置 SSH KEY
使用 ssh -T git@gitee.com 测试是否成功
具体过程参考百度
```

项目结构创建



###  3.5.5  逆向工程的使用 

####  1.下载人人开源项目 

https://gitee.com/renrenio

![image.png](https://cdn.nlark.com/yuque/0/2021/png/440247/1610950177379-b008f830-de8f-4367-9c43-1276a0d13fcb.png)

 2. #### 选择 renren -generator 项目 

1.下载之后，导入项目，修改数据库，修改工程shiro依赖为SpringSecurity

2.修改对应数据库配置，模块名与数据库表名前缀


 3. #### 下载 renren-fast-vue项目 

1.vscode 导入前端项目

2.前后端联调测试基本功能

#### 2.创建业务模块

#### 3.配置公共环境

#### 4.使用人人代码生成器生成基础业务代码

修改相关配置

##  3.6 前后端联调 

###  3.6.1 启动前端项目 

npm install  安装依赖

 通过 npm run dev 启动

###  3.6.2 启动后端项目 

这时，你使用浏览器直接该接口，发现访问没事，但是用前端项目访问却报错，什么原因？

这其实是浏览器的同源策略造成的跨域问题。

###  3.6.3 跨域问题 

[跨源资源共享（CORS） - HTTP | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS)

跨域：浏览器对于javascript的同源策略的限制 。

以下情况都属于跨域：

| 跨域原因说明       | 示例                                |
| ------------------ | ----------------------------------- |
| 域名不同           | www.jd.com  与 www.taobao.com       |
| 域名相同，端口不同 | www.jd.com:8080  与 www.jd.com:8081 |
| 二级域名不同       | item.jd.com  与 miaosha.jd.com      |

如果域名和端口都相同，但是请求路径不同，不属于跨域，如：

www.jd.com/item

www.jd.com/goods

http和https也属于跨域

而我们刚才是从manager.gmall.com去访问api.gmall.com，这属于端口不同，跨域了。

####  3.6.3.1 为什么会有跨域问题 

跨域不一定都会有跨域问题。

因为跨域问题是浏览器对于ajax请求的一种安全限制：一个页面发起的ajax请求，只能是与当前页域名相同的路径，这能有效的阻止跨站攻击。

因此：跨域问题 是针对ajax的一种限制。

但是这却给我们的开发带来了不便，而且在实际生产环境中，肯定会有很多台服务器之间交互，地址和端口都可能不同，怎么办？

####  3.6.3.2 为什么会有跨域问题 

目前比较常用的跨域解决方案有3种：

●Jsonp最早的解决方案，利用script标签可以跨域的原理实现。限制：

○需要服务的支持

○只能发起GET请求

●nginx反向代理 思路是：利用nginx把跨域反向代理为不跨域，支持各种请求方式 缺点：需要在nginx进行额外配置，语义不清晰 

●CORS规范化的跨域请求解决方案，安全可靠。优势：

○在服务端进行控制是否允许跨域，可自定义规则

○支持各种请求方式

●缺点：

○会产生额外的请求

我们这里会采用cors的跨域方案。



###  3.6.4 跨域解决 

 **什么是cors** 

CORS是一个W3C标准，全称是"跨域资源共享"（Cross-origin resource sharing）。

它允许浏览器向跨源服务器，发出[XMLHttpRequest](http://www.ruanyifeng.com/blog/2012/09/xmlhttprequest_level_2.html)请求，从而克服了AJAX只能[同源](http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)使用的限制。

CORS需要浏览器和服务器同时支持。目前，所有浏览器都支持该功能，IE浏览器不能低于IE10。

●浏览器端： 目前，所有浏览器都支持该功能（IE10以下不行）。整个CORS通信过程，都是浏览器自动完成，不需要用户参与。

●服务端： CORS通信与AJAX没有任何差别，因此你不需要改变以前的业务逻辑。只不过，浏览器会在请求中携带一些头信息，我们需要以此判断是否允许其跨域，然后在响应头中加入一些信息即可。这一般通过过滤器完成即可。

 **原理** 

预检请求

跨域请求会在正式通信之前，增加一次HTTP查询请求，称为"预检"请求（preflight）。

浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些HTTP动词和头信息字段。只有得到肯定答复，浏览器才会发出正式的XMLHttpRequest请求，否则就报错。

一个“预检”请求的样板：

OPTIONS /cors HTTP/1.1

Origin: http://localhost:1000

Access-Control-Request-Method: GET

Access-Control-Request-Headers: X-Custom-Header

User-Agent: Mozilla/5.0...

●Origin：会指出当前请求属于哪个域（协议+域名+端口）。服务会根据这个值决定是否允许其跨域。

●Access-Control-Request-Method：接下来会用到的请求方式，比如PUT

●Access-Control-Request-Headers：会额外用到的头信息

预检请求的响应

服务的收到预检请求，如果许可跨域，会发出响应：

HTTP/1.1 200 OK

Date: Mon, 01 Dec 2008 01:15:39 GMT

Server: Apache/2.0.61 (Unix)

Access-Control-Allow-Origin: [http://miaosha.jd.com](http://miaosha.jd.com/)

Access-Control-Allow-Credentials: true

Access-Control-Allow-Methods: GET, POST, PUT

Access-Control-Allow-Headers: X-Custom-Header

Access-Control-Max-Age: 1728000

Content-Type: text/html; charset=utf-8

Content-Encoding: gzip

Content-Length: 0

Keep-Alive: timeout=2, max=100

Connection: Keep-Alive

Content-Type: text/plain

如果服务器允许跨域，需要在返回的响应头中携带下面信息：

●Access-Control-Allow-Origin：可接受的域，是一个具体域名或者*（代表任意域名）

●Access-Control-Allow-Credentials：是否允许携带cookie，默认情况下，cors不会携带cookie，除非这个值是true

●Access-Control-Allow-Methods：允许访问的方式

●Access-Control-Allow-Headers：允许携带的头

●Access-Control-Max-Age：本次许可的有效时长，单位是秒，过期之前的ajax请求就无需再次进行预检了

有关cookie：

要想操作cookie，需要满足3个条件：

●服务的响应头中需要携带Access-Control-Allow-Credentials并且为true。

●浏览器发起ajax需要指定withCredentials 为true

●响应头中的Access-Control-Allow-Origin一定不能为*，必须是指定的域名



 **实现方式** 

虽然原理比较复杂，但是前面说过：

●浏览器端都有浏览器自动完成，我们无需操心

●服务端可以通过拦截器统一实现，不必每次都去进行跨域判定的编写。

事实上，Spring已经帮我们写好了CORS的跨域过滤器，内部已经实现了刚才所讲的判定逻辑。

```
spring-webmvc：CorsFilter
spring-webflux：CorsWebFilter
```

springcloud-gateway集成的是webflux，所以这里使用的是CorsWebFilter
在gmall-gateway中编写一个配置类，并且注册CorsWebFilter：
Plain Text
```
@Configuration
public class CorsConfig {
    @Bean
    public CorsWebFilter corsWebFilter() {
        // 初始化CORS配置对象
        CorsConfiguration config = new CorsConfiguration();
        // 允许的域,不要写*，否则cookie就无法使用了
        config.addAllowedOrigin("http://manager.gmall.com");
        config.addAllowedOrigin("http://www.gmall.com");
        // 允许的头信息
        config.addAllowedHeader("*");
        // 允许的请求方式
        config.addAllowedMethod("*");
        // 是否允许携带Cookie信息
        config.setAllowCredentials(true);
        // 添加映射路径，我们拦截一切请求
        UrlBasedCorsConfigurationSource corsConfigurationSource = new UrlBasedCorsConfigurationSource();
        corsConfigurationSource.registerCorsConfiguration("/**", config);
        return new CorsWebFilter(corsConfigurationSource);
    }
}
```

#   四、分布式组件

## [SpringCloud Alibaba](https://github.com/alibaba/spring-cloud-alibaba/blob/2.2.x/README-zh.md) 

请查看cloud笔记或官方文档或[中文文档](https://www.springcloud.cc/)

**SpringClouid的几大痛点：**

SpringCloud部分组件停止维护和更新，给开发带来不便;

SpringCloud部分环境搭建复杂，没有完善的可视化界面，我们需要大量的二次开发和定制

SpringCloud配置复杂，难以上手，部分配置差别难以区分和合理应用



**SpringCloud Alibaba的优势：**

阿里使用过的组件经历了考验，性能强悍，设计合理，现在开源出来大家用

成套的产品搭配完善的可视化界面给开发运维带来极大的便利

搭建简单，学习曲线低。



## **技术搭配方案**

### **SpringCloud Alibaba**

Nacos : 注册中心 (服务发现/注册)

Nacos: 配置中心 (动态配置管理)

Sentinel: 服务容错(限流、降级、熔断)

Seata: 原Fescar, 即分布式事务解决方案

### **SpringCloud** 

Ribbon: 负载均衡

Feign: 声明式HTTP客户端(调用远程服务)

Gateway:  API 网关 (webflux 编程模式)

Sleuth:调用链监控



## 项目架构

![image-20220510131550076](http://qnimg.gisfsde.com/work/image-20220510131550076.png)

### 组件技术方案

![image-20220510132138533](http://qnimg.gisfsde.com/work/image-20220510132138533.png)

## [Nacos【注册中心】](https://github.com/alibaba/spring-cloud-alibaba/blob/2.2.x/spring-cloud-alibaba-examples/nacos-example/nacos-discovery-example/readme-zh.md)

注册中心【服务发现/注册】

```
下载后点击  nacos\bin\startup.cmd
如果启动报错：Unable to start web server; nested exception is org.springframework.boot.web.server.WebServerException: Unable to start embedded Tomcat  
更改
set MODE="cluster"  =》  set MODE="standalone"
```



### 1.公共依赖引进

```xml
 \<dependency>
     \<groupId>com.alibaba.cloud\</groupId>
     \<artifactId>spring-cloud-starter-alibaba-nacos-discovery\</artifactId>
 \</dependency>
```

### 2.下载 Nacos Server

###   [Releases · alibaba/nacos (github.com)](https://github.com/alibaba/nacos/releases)并点击文件夹下的startup.bat启动服务,启动不了可能未配JAVA_HOME环境变量

### 3.配置

#### 1、首先，修改 pom.xml 文件，引入  Nacos Discovery Starter

```xml
 \<dependency>
     \<groupId>com.alibaba.cloud\</groupId>
     \<artifactId>spring-cloud-starter-alibaba-nacos-discovery\</artifactId>
 \</dependency>
```

#### 2、在应用的 /resource /application.properties 中配置 Nacos Server地址

```PROPER
spring.cloud.nacos.discovery.server-addr=127.0.0.1:8848
```

### 4.启动类添加注解开启服务与注解功能

```
@EnableDiscoveryClient
```

###  5.配置模块名

```
spring.application.name=service-provider
```

### 6.启动模块访问

[Nacos](http://localhost:8848/nacos/#/login)

## Nacos【配置中心】

#### 1、pom.xml 引入 Nacos Config Starter

```xml
  <!--配置中心来做配置管理-->
\<dependency>
   \<groupId>com.alibaba.cloud\</groupId>
   \<artifactId>spring-cloud-starter-alibaba-nacos-config\</artifactId>
\</dependency>
```

#### 2、在应用的 resource 下 bootstrap.properties

```properties
spring.application.name=gulimall-coupon
spring.cloud.nacos.config.server-addr=127.0.0.1:8848
```

#### 3、在 nacos 中添加配置

选择右上角添加配置

![image-20220512152022866](http://qnimg.gisfsde.com/work/image-20220512152022866.png)

Data ID 改成 gulimall-coupon.properties 默认规则 用户名.应用名.properties

![image-20220512152043662](http://qnimg.gisfsde.com/work/image-20220512152043662.png)

#### 4、在应用中使用@Value 和 @RefreshScope

```java
@RefreshScope // 刷新对应controller，每次动态刷新的从nacos配置中心获取最新配置
@RestController
@RequestMapping("coupon/coupon")
public class CouponController {
    @Autowired
    private CouponService couponService;

    @Value("${coupon.user.name}")
    private String name;

    @Value("${coupon.user.age}")
    private Integer age;
    @RequestMapping("/test")
    public R test() {
        return R.ok().put("name",name).put("age",age);
    }

```

#### 5、进阶

> 1、核心概念

![image-20220707133510313](https://qnimg.gisfsde.com/markdown/image-20220707133510313.png)

**命名空间:**
用于进行租户粒度的**配置隔离**。不同的命名空间下，可以存在相同的 **Group** 或 **DatalD** 的配置。**Namespace**  的常用场景之一是不同环境的配置的区分隔离，例如开发测试环境和生产环境的资源(如配置、服务)隔离等。

**配置集**

**一组相关或者不相关的配置项的集合称为配置集**。在系统中，一个配置文件通常就是一个配置集，包含了系统各个方面的配置。例如，一个配置集可能包含了数据源、线程池、日志级别等配置项。

**配置集ID:**

Nacos 中的某个配置集的 ID，配置集 ID 是组织划分配置的维度之一，**Data ID** 通常用于组织划分系统的配置集，一个系统或者应用可以包含多个配置集，一个系统应用可以包含多个配置集，每个配置集都可以被一个有意义的名称标识，Data ID 通常采用类 Java 包 如 ( com.taobao.tc.refund.log.level ) 的命名规则保证全局唯一性，此命名规则非强制

**配置分组：**

Nacos 中的一组配置集，是组织配置的维度之一，通过一个有意义的字符串，(如 Buy 或 Trade ) 对配置集进行分组，从而区分 Data ID 相同的配置集，当您在 Nacos 上创建一个配置时，如果未填写配置分组的名称，则配置分组的名称默认采用，DEFAULT_GROUP 配置分组的常见场景，不同的应用或组件采用了相同的配置类型，如 database_url 配置和 MQ_topic 配置



**bootstrap.properties 配置**

```properties
spring.application.name=gulimall-coupon # 服务的名称
spring.cloud.nacos.config.server-addr=127.0.0.1:8848  # 服务注册地址
spring.cloud.nacos.config.namespace=ae34901c-9215-4409-ae61-c6b8d6c8f9b0  # 命名空间地址
#spring.cloud.nacos.config.group=111 # 对应分组

spring.cloud.nacos.config.ext-config[0].data-id=datasource.yml  # 配置集指定data_id
spring.cloud.nacos.config.ext-config[0].group=dev               # 配置集指定 group 分组
spring.cloud.nacos.config.ext-config[0].refresh=true            # 是否动态刷新 在配置中心修改后 微服务自动刷新


```

#### 相关解释

启动报错端口占用

[Nacos 2.0.0 兼容性文档](https://nacos.io/zh-cn/docs/2.0.0-compatibility.html)

检查三个端口，正在使用的端口比如8848，还有[gRPC](https://so.csdn.net/so/search?q=gRPC&spm=1001.2101.3001.7020)的通信方式两个端口9848、9849

Nacos2.0版本相比1.X新增了gRPC的通信方式，因此需要增加2个端口。新增端口是在配置的主端口(server.port)基础上，进行一定偏移量自动生成。

| 端口 | 与主端口的偏移量 | 描述                                                       |
| ---- | ---------------- | ---------------------------------------------------------- |
| 9848 | 1000             | 客户端gRPC请求服务端端口，用于客户端向服务端发起连接和请求 |
| 9849 | 1001             | 服务端gRPC请求服务端端口，用于服务间同步等                 |

```java
/**
 * 1、如何使用 Nacos作为配置中心统一管理配置
 *  1.1 引入依赖
 *     \<dependency>
 *             \<groupId>com.alibaba.cloud\</groupId>
 *             \<artifactId>spring-cloud-starter-alibaba-nacos-config\</artifactId>
 *      \</dependency>
 *  1.2 创建一个bootstrap.properties
 *      spring.application.name=gulimall-coupon
 *      spring.cloud.nacos.config.server-addr=127.0.0.1:8848
 *  1.3 需要给配置中心默认添加一个叫 数据集 (Data Id) gulimall-coupon.properties 默认规则 用户名.应用名.properties
 *  1.4 给 应用名.properties 添加任何配置
 *  1.5 动态获取配置
 *      @RefreshScope: 动态获取并刷新配置
 *      @Value$("${配置项的名字}")
 * 如果配置中心和当前应用的配置文件中都配置了相同的配置文件，优先使用配置中心的文件
 *
 * 2、细节
 *      1、命名空间：配置隔离：
 *          默认：public(保留空间)；默认新增的所有配置都在 public 空间
 *          1、开发 测试 生产 利用命名空间来做环境隔离
 *          注意: 在bootstrap.properties配置上 需要使用哪个命名空间下的配置
 *              spring.cloud.nacos.config.namespace=b1e89ce0-784f-4a80-9de0-e9b080eeaca5
 *          2、每一个微服务之间互相隔离配置，每一个微服务都创建自己的命名空间，只加载自己命名空间下的所有配置
 *
 *
 *      2、配置集：所有配置的集合
 *
 *      3、配置集ID：类似文件名
 *          Data ID：类型文件名
 *
 *      4、配置分组：
 *      默认所有的配置都属于 DEFAULT_GROUP
 *
 * 每个微服务创建自己的命名空间，使用配置分组区分环境，dev、test、prod
 *
 * 3、同时加载多个配置集
 *      1、微服务任何配置信息，任何配置文件多可以放在配置中心中
 *      2、只要在 bootstrap.properties 说明加载配置中心中哪些配置文件即可
 *      3、@Value，@ConfigurationProperties...
 *      以前SpringBoot的任何方式从配置文件中获取值，都能使用
 *      配置中心有的优先使用配置中心的
 */
```

## Sentinel

### 1、简介

#### 1、服务降级限流

**什么是熔断：**

​	A 服务调用 B 服务的某个功能，由于网络不稳定问题，或者 B 服务卡机，导致功能时间超长，如果这样子的次数太多，我们可以直接将 B 断路了，（A 不在请求  B 接口）凡是调用 B 服务的直接返回降级数据，不必等待 B 的 超时执行，这样 B 的故障问题，就不会级联影响到 A。

**什么是降级：**

​	整个网站处于流量高峰期服务器压力剧增，根据当前自身业务情况以及流量，对一些服务和页面进行有策略的降级/停止服务，所有的调用直接返回降级数据以此缓解服务器资源的压力，以保证核心业务的正常运行，同时也保持了客户和大部分客户等到正确的响应

异同：

​	相同点

​		1、为了保证集群大部分服务的可用性和可靠性，防止崩溃，牺牲小我	

​		2、用户最终都是体验到某个功能不可用

​	不同点：

​		1、熔断是被调用方的故障，触发系统的主动规则

​		2、降级是基于全局的考虑停止一些正常服务，释放资源

什么是限流

​	对打入的服务的请求流量进行控制，使服务能够承担不超过自己能力的流量压力

#### 2、Sentinel 简介

官方文档：https://github.com/alibaba/Sentinel/wiki/%E4%BB%8B%E7%BB%8D

项目文档：https://github.com/alibaba/Sentinel

随着微服务的流行，服务和服务之间的稳定性变得越来越重要。Sentinel 以流量为切入点，从流量控制、熔断降级、系统负载保护等多个维度保护服务的稳定性。

**Sentinel 具有以下特征:**

- **丰富的应用场景**：Sentinel 承接了阿里巴巴近 10 年的双十一大促流量的核心场景，例如秒杀（即突发流量控制在系统容量可以承受的范围）、消息削峰填谷、集群流量控制、实时熔断下游不可用应用等。
- **完备的实时监控**：Sentinel 同时提供实时的监控功能。您可以在控制台中看到接入应用的单台机器秒级数据，甚至 500 台以下规模的集群的汇总运行情况。
- **广泛的开源生态**：Sentinel 提供开箱即用的与其它开源框架/库的整合模块，例如与 Spring Cloud、Dubbo、gRPC 的整合。您只需要引入相应的依赖并进行简单的配置即可快速地接入 Sentinel。
- **完善的 SPI 扩展点**：Sentinel 提供简单易用、完善的 SPI 扩展接口。您可以通过实现扩展接口来快速地定制逻辑。例如定制规则管理、适配动态数据源等。

Sentinel 的主要特性：

![image-20201125115407751](http://qnimg.gisfsde.com/work/image-20201125115407751.png)

**Sentinel 分为两个部分:**

- 核心库（Java 客户端）不依赖任何框架/库，能够运行于所有 Java 运行时环境，同时对 Dubbo / Spring Cloud 等框架也有较好的支持。
- 控制台（Dashboard）基于 Spring Boot 开发，打包后可以直接运行，不需要额外的 Tomcat 等应用容器。

**Sentinel 基本概念:**

- 资源
  - 资源是 Sentinel 的关键概念。它可以是 Java 应用程序中的任何内容，例如，由应用程序提供的服务，或由应用程序调用的其它应用提供的服务，甚至可以是一段代码。在接下来的文档中，我们都会用资源来描述代码块。
  - **只要通过 Sentinel API 定义的代码，就是资源，能够被 Sentinel 保护起来**。大部分情况下，可以使用方法签名，URL，甚至服务名称作为资源名来标示资源。
- 规则
  - 围绕资源的实时状态设定的规则，可以包括**流量控制规则、熔断降级规则以及系统保护规则。所有规则可以动态实时调整。**



### 2、Hystrix 与 Sentinel 比较

![image-20201125120634969](http://qnimg.gisfsde.com/work/image-20201125120634969.png)

### 3、整合 Feign 和 Sentinel 测试熔断降级

熔断降级官网解释：https://github.com/alibaba/Sentinel/wiki/%E7%86%94%E6%96%AD%E9%99%8D%E7%BA%A7

Spring-  Cloud整合Sentinel和Feign：https://github.com/alibaba/spring-cloud-alibaba/wiki/Sentinel

pom.xml

```xml
<!-- 导入sentinel依赖 -->
\<dependency>
    \<groupId>com.alibaba.cloud\</groupId>
    \<artifactId>spring-cloud-starter-alibaba-sentinel\</artifactId>
\</dependency>
<!--导入openFeign -->
\<dependency>
    \<groupId>org.springframework.cloud\</groupId>
    \<artifactId>spring-cloud-starter-openfeign\</artifactId>
\</dependency>
```

application.properties 

```properties
## sentinel与项目间的通信端口
spring.cloud.sentinel.transport.port=8719
## sentinel端口设置
spring.cloud.sentinel.transport.dashboard=localhost:8333
## 暴露信息
management.endpoints.web.exposure.exclude=*
## 配置文件打开 Sentinel 对 Feign 的支持
feign.sentinel.enabled=true
```

开启后，在微服务中调用远程服务，Sentinel 就会记录微服务之间的调用，从而对远程调用进行设置熔断降级等。

请求设置

![image-20201126154714221](http://qnimg.gisfsde.com/work/image-20201126154714221.png)

设置流控规则

![image-20201126165501709](http://qnimg.gisfsde.com/work/image-20201126165501709.png)

Feign设置

![image-20201126165336761](http://qnimg.gisfsde.com/work/image-20201126165336761.png)

结果

![image-20201126164858768](http://qnimg.gisfsde.com/work/image-20201126164858768.png)



### 4、整合 Sentinel 测试限流

官网Spring-Cloud 整合：https://github.com/alibaba/spring-cloud-alibaba/wiki/Sentinel

Pom.xml

> 参考 3、整合 Feign 和 Sentinel 测试熔断降级

控制台：

![](http://qnimg.gisfsde.com/work/image-20201126161848389.png)

超过单继阈值，返回自定义请求结果

实现方式：

```java
/**
  		1、代码
 *      	try (Entry entry = SphU.entry("resourceName")) {
 *      	}(BlockedException e){}
 *      2、基于注解
 *       	@SentinelResource(value = "getCurrentSeckillSkusSource",blockHandler = "BlockHandler")
 *       	无论1/2方式一定要配置限流以后的默认返回
 *       	url可以设置统一返回

**/
```

具体实现方式参考官网给出文档：https://github.com/alibaba/Sentinel/wiki/%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8



### 5、Sentinel网关限流

官网文档：https://github.com/alibaba/Sentinel/wiki/%E7%BD%91%E5%85%B3%E9%99%90%E6%B5%81

pom.xml

```xml
\<dependency>
          \<groupId>com.alibaba.cloud\</groupId>
          \<artifactId>spring-cloud-alibaba-sentinel-gateway\</artifactId>
          \<version>2.1.0.RELEASE\</version>
\</dependency>
```

启动Sentinle1.7.1 后比原先的1.6.1多个一个功能

![image-20201127102052864](http://qnimg.gisfsde.com/work/image-20201127102052864.png)



您可以在 `GatewayCallbackManager` 注册回调进行定制：

- `setBlockHandler`：注册函数用于实现自定义的逻辑处理被限流的请求，对应接口为 `BlockRequestHandler`。默认实现为 `DefaultBlockRequestHandler`，当被限流时会返回类似于下面的错误信息：`Blocked by Sentinel: FlowException`。

```java
@Configuration
public class SentinelGatewayConfig {

    public SentinelGatewayConfig() {
        GatewayCallbackManager.setBlockHandler(new BlockRequestHandler() {
            // 网关限流了 就会回调
            @Override
            public Mono\<ServerResponse> handleRequest(ServerWebExchange serverWebExchange, Throwable throwable) {
                R error = R.error(BizCodeEnume.TO_MANY_REQUEST.getCode(), BizCodeEnume.TO_MANY_REQUEST.getMsg());
                String errorJson = JSON.toJSONString(error);
                Mono\<ServerResponse> body = ServerResponse.ok().body(Mono.just(errorJson), String.class);
                return body;
            }
        });
    }
}
```



## Seata

#### 1、简介

Seata 是一款开源的分布式事务解决方案，致力于提供高性能和简单易用的分布式事务服务。Seata 将为用户提供了 AT、TCC、SAGA 和 XA 事务模式，为用户打造一站式的分布式解决方案。



https://seata.io/zh-cn/index.html



### 2、核心概念

**TC (Transaction Coordinator) - 事务协调者**

维护全局和分支事务的状态，驱动全局事务提交或回滚。

**TM (Transaction Manager) - 事务管理器**

定义全局事务的范围：开始全局事务、提交或回滚全局事务。

**RM (Resource Manager) - 资源管理器**

管理分支事务处理的资源，与TC交谈以注册分支事务和报告分支事务的状态，并驱动分支事务提交或回滚。





## OSS

### 5.6.1、简介

对象存储服务 阿里云对象存储服务（Object Storage Service，简称 OSS），是阿里云提供的海量、安全、低成本、高可靠的云存储服务。您可以在任何应用、任何时间、任何地点存储和访问任意类型的数据。

![image-20220512152840054](http://qnimg.gisfsde.com/work/image-20220512152840054.png)



### 5.6.2、使用步骤

使用 Java 上传文件

https://help.aliyun.com/document_detail/32011.html?spm=a2c4g.11186623.6.915.56196d39rr96Ll

来自官网实例 - 上传文件流

```java
  @Test
    public void testUpload() throws FileNotFoundException {
        // Endpoint以杭州为例，其它Region请按实际情况填写。
        String endpoint = "http://oss-cn-hangzhou.aliyuncs.com";
            // 云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，创建并使用RAM子账号进行API访问或日常运维，请登录 //https://ram.console.aliyun.com 创建。
        String accessKeyId = "\<yourAccessKeyId>";
        String accessKeySecret = "\<yourAccessKeySecret>";

        // 创建OSSClient实例。
        OSS ossClient = new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);

        // 上传文件流。
        InputStream inputStream = new FileInputStream("\<yourlocalFile>");
        ossClient.putObject("\<yourBucketName>", "\<yourObjectName>", inputStream);

        // 关闭OSSClient。
        ossClient.shutdown();
        System.out.println("上传成功");
    }
```

需要填写 AccesskeyId 以及 Secret 同时也要指定文件位置 以及文件名字

最终上传结果

![image-20220512152930694](http://qnimg.gisfsde.com/work/image-20220512152930694.png)



### 5.6.3、 抽取成一个单独的第三方服务？OSS

官网文档

https://github.com/alibaba/aliyun-spring-boot/blob/master/aliyun-spring-boot-samples/aliyun-oss-spring-boot-sample/README-zh.md

新建项目 gulimall-third-party

pom 配置

```xml
 \<dependency>
            \<groupId>com.alibaba.cloud\</groupId>
            \<artifactId>spring-cloud-starter-alicloud-oss\</artifactId>
 \</dependency>

 \<dependencyManagement>
        \<dependencies>
            \<dependency>
                \<groupId>org.springframework.cloud\</groupId>
                \<artifactId>spring-cloud-dependencies\</artifactId>
                \<version>${spring-cloud.version}\</version>
                \<type>pom\</type>
                \<scope>import\</scope>
            \</dependency>
           <!-- springCloudAlibaba -->
            \<dependency>
                \<groupId>com.alibaba.cloud\</groupId>
                \<artifactId>spring-cloud-alibaba-dependencies\</artifactId>
                \<version>2.1.0.RELEASE\</version>
                \<type>pom\</type>
                \<scope>import\</scope>
            \</dependency>
        \</dependencies>
    \</dependencyManagement>
```

application.yml 配置 **accessKey、secretKey、endpoint** 

```yaml
spring:
  cloud:
    nacos:
      discovery:
        server-addr: 127.0.0.1:8848
    alicloud:
      access-key: LTAI4GE22ckocpNBfd36zkxJ 
      secret-key: qDFrQ6cxZqc4DwxoWx5K2aosXXj0Go
      oss:
        endpoint: oss-cn-shenzhen.aliyuncs.com  ## 地域节点
        bucket: gulimall-oss01 # 桶列表

  application:
    name: gulimall-third-party

server:
  port: 30000
```



### 5.6.4、Web端上传介绍

> 阿里云对象存储-普通上传方式：

![image-20220512152947516](http://qnimg.gisfsde.com/work/image-20220512152947516.png)

用户提交文件到服务器，服务器将文件提交到 OSS 对象存储

和数据直传到OSS相比，以上方法有三个缺点：

- 上传慢：用户数据需先上传到应用服务器，之后再上传到OSS。网络传输时间比直传到OSS多一倍。如果用户数据不通过应用服务器中转，而是直传到OSS，速度将大大提升。而且OSS采用BGP带宽，能保证各地各运营商之间的传输速度。
- 扩展性差：如果后续用户多了，应用服务器会成为瓶颈。
- 费用高：需要准备多台应用服务器。由于OSS上传流量是免费的，如果数据直传到OSS，不通过应用服务器，那么将能省下几台应用服务器。





> 阿里云对象存储-服务端签名后直传：

![image-20201019203744740](http://qnimg.gisfsde.com/work/image-20201019203744740.png)

[流程介绍](https://help.aliyun.com/document_detail/31926.html)

![时序图](http://qnimg.gisfsde.com/work/p139016.png)

**背景**

采用JavaScript客户端直接签名（参见[JavaScript客户端签名直传](https://help.aliyun.com/document_detail/31925.html?spm=a2c4g.11186623.2.11.26386e28XWAM19#concept-frd-4gy-5db)）时，AccessKey ID和AcessKey Secret会暴露在前端页面，因此存在严重的安全隐患。因此，OSS提供了服务端签名后直传的方案。

Web端向服务端请求签名，然后直接上传，不会对服务端产生压力，而且安全可靠。服务端签后直传



## OpenFeign

### [简介](https://www.springcloud.cc/spring-cloud-greenwich.html#_spring_cloud_openfeign)

Feign 是一个声明式的 HTTP 客户端，他的目的就是让远程调用更加简单，Feign提供了 HTTP请求的模板，**通过编写简单的接口和插入注解**，就可以定义好的 HTTP 请求参数、格式、地址等信息

Feign 整合了 **Ribbon（负载均衡**）和 **Hystrix（服务熔断**），可以让我们不再需要显示地使用这两个组件

SpringCloud - Feign，在 NetflixFeign 的基础上扩展了对 SpringMVC 注解的支持，在其实现下，我们只需创建一个接口并用注解的方式来配置它，即可完成对服务提供方的接口绑定。简化了 SpringCloud - Ribbon 自行封装服务调用客户端的开发量。

### 1.引入依赖

```xml
\<dependency>
    \<groupId>org.springframework.cloud\</groupId>
    \<artifactId>spring-cloud-starter-openfeign\</artifactId>
\</dependency>
```

### 2.创建服务接口

```java
@FeignClient("gulimall-coupon")
public interface CouponFeignService {
    @RequestMapping("/coupon/coupon/member/list")
    public R membercoupons();
}
```

### 3.开启远程调用功能

客户端主启动类注解开启远程调用功能，调用接口使用服务

```
@EnableFeignClients(basePackages = "com.atguigu.gulimall.member.feign")
```

## Gateway

### 简介

网关作为流量入口，常用功能包括通过断言进行路由转发，权限效验，限流控制等，而 SpringCloud GateWay作为 SpringCloud 官方推出的第二代网关框架，取代了 Zull 网关

网上测试 三种网关对应请求数

![image-20220512153202454](http://qnimg.gisfsde.com/work/image-20220512153202454.png)

网关提供 API 全托管服务，丰富的 API 管理功能，辅助企业管理大规模的 API，以降低管理成本和安全风险、包括协议适配、协议转发、安全策略、防刷、流量、监控日志等功能

Spring Cloud GateWay 旨在提供一种简单有效的方式来对 API 进行路由，并为他们提供切面，列如、安全性、监控/指标 和弹性等

示例：

```yml
spring:
  cloud:
    gateway:
      routes:
#        - id: baidu_route
#          uri: https://www.baidu.com
#          predicates:
#            - Query=url,baidu
#
#        - id: qq_route
#          uri: https://www.qq.com
#          predicates:
#            - Query=url,qq

        - id: product_route
          uri: lb://gulimall-product
          predicates:
            - Path=/api/product/**
          filters:
            - RewritePath=/api/?(?<segment>.*), /$\{segment}

        - id: member_route
          uri: lb://gulimall-member
          predicates:
            - Path=/api/member/**
          filters:
            - RewritePath=/api/?(?<segment>.*), /$\{segment}

        - id: third_party_route
          uri: lb://gulimall-third-party
          predicates:
            - Path=/api/thirdparty/**
          filters:
            - RewritePath=/api/thirdparty/?(?<segment>.*), /$\{segment}


        - id: admin_route
          uri: lb://renren-fast
          predicates:
            - Path=/api/**
          filters:
            - RewritePath=/api/?(?<segment>.*), /renren-fast/$\{segment}
```







## Sleuth+Zipkin 服务链路追踪

### 为什么用

微服务架构是一个分布式架构，它按业务划分服务单元，一个分布式系统往往有很多个服务单元。由于服务单元数量众多，业务的复杂性，如果出现了错误和异常，很难去定位。主要体现在，一个请求可能需要调用很多个服务，而内部服务的调用复杂性，决定了问题难以定位。所以微服务架构中，必须实现分布式链路追踪，去跟进一个请 求到底有哪些服务参与，参与的顺序又是怎样的，从而达到每个请求的步骤清晰可见，出了问题，很快定位。

链路追踪组件有Google 的Dapper, Twitter 的Zipkin,以及阿里的Eagleeye(鹰眼)等，它们都是非常优秀的链路追踪开源组件。



# 五、前端开发基础知识

## 7.1 VSCode 使用

Get

```vue
	"http-get请求": {
		"prefix": "httpget",
		"body": [
		"this.\\$http({",
		"url: this.\\$http.adornUrl(''),",
		"method: 'get',",
		"params: this.\\$http.adornParams({})",
		"}).then(({ data }) => {",
		"})"],
		"description": "httpGET请求"
	},
```

POST 

```vue
	"http-post请求": {
		"prefix": "httppost",
		"body": [
		"this.\\$http({",
		"url: this.\\$http.adornUrl(''),",
		"method: 'post',",
		"data: this.\\$http.adornData(data, false)",
		"}).then(({ data }) => { });" ],
		"description": "httpPOST请求"
	}
```

## 7.2 [ES6](https://es6.ruanyifeng.com/)

ECMAScript 和 JavaScript 的关系是，前者是后者的规格，后者是前者的一种实现.

变量

## 7.3 Node.js

## 7.4 Vue

### 7.4.1VUE

### 7.4.2 整合 Element UI

> 1、安装

```vu
npm i element-ui -S
```


> 2、引入 Element

main.js 中引入以下内容

```vue
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 引入静态资源文件
import App from './App.vue';

Vue.use(ElementUI);

new Vue({
  el: '#app',
  render: h => h(App)
});
```



## 7.5 Babel

## 7.6 Webpack









# 六、商品服务&三级分类



## 8.1 基础概念

### 8.1.1、三级分类



![image-20220512154227328](http://qnimg.gisfsde.com/work/image-20220512154227328.png)

一级分类查出二级分类数据，二级分类中查询出三级分类数据

**数据库设计**

![image-20220512154240463](http://qnimg.gisfsde.com/work/image-20220512154240463.png)

### 8.1.2、SPU 和 SKU

**SPU：Standard Product Unit （标准化产品单元）**

是商品信息聚合的最小单位，是一组可复用，易检索的标准化信息的组合，该集合描述了一个产品的特性

![image-20201020083615056](http://qnimg.gisfsde.com/work/image-20201020083615056.png)

![image-20201020083857519](http://qnimg.gisfsde.com/work/image-20201020083857519.png)



IPhoneX 是 SPU,MI8 是 SPU

IPhoneX 64G 黑曜石 是 SKU

MIX8 + 64G 是 SKU

**SKU: Stock KeepingUnit (库存量单位)**



### 8.1.3、基本属性 【规格参数】与 销售属性

每个分共下的商共享规格参数、与销售属性，只是有些商品不一定更用这个分类下全部的属性：



属性是以三级分类组织起来的

规格参数中有些是可以提供检索的

规格参数也是基本属性，他们具有自己的分组

属性的分组也是以三级分类组织起来的

属性名确定的，但是值是每一个商品不同来决定的



> 【属性分组-规格参数-销售属性-三级分类】关联关系

![image-20201020150957557](http://qnimg.gisfsde.com/work/image-20201020150957557.png)

SPU-SKU-属性表

![image-20201020151022330](http://qnimg.gisfsde.com/work/image-20201020151022330.png)



### 8.1.4、接口文档位置

https://easydoc.xyz/s/78237135/ZUqEdvA4/hKJTcbfd

### 8.1.5、 Object 划分

#### **VO （View Object）视图对象**

用于展示层，它的作用是把某个指定页面（或组件）的所有数据封装起来。通常用于业务层之间的数据传递，和 PO 一样也是仅仅包含数据而已，但应是抽象出的业务对象，可以和表对应，也可以不，这根据业务的需要，用 new 关键字创建，由 GC 回收

view Object 试图对象

接受页面传递来的数据，封装对象，封装页面需要用的数据

#### **DTO（Data Transfer Object）数据传输对象**

主要用于展示层与服务层之间的数据传输对象。这个概念来源于 J2EE 的设计模式，原来的目的是为了 EJB的分布式应用提供粗粒度的数据实体，以减少分布式调用的次数，从而提高分数调用的性能和降低网络负载，但在这里，泛指用于展示层与服务层之间的数据传输对象

#### **DO（Domain Object）领域对象**

就是从现实世界中抽象出来的有形或无形的业务实体。

#### **PO（Persistent Object）：持久化对象**

它跟持久层（通常是关系型数据库）的数据结构形成一一对应的映射关系，如果持久层是关系型数据库，那么，数据表中的每个字段就对应PO的一个属性。po 就是对应数据库中某一个表的一条记录，多个记录可以用 PO 的集合，PO 中应该不包含任何对数据库到操作

#### **TO (Transfer Object) 数据传输对象**

不同的应用程序之间传输的对象

#### **BO(business object) 业务对象**

从业务模型的角度看，见 UML 原件领域模型中的领域对象，封装业务逻辑的， java 对象，通过调用 DAO 方法，结合 PO VO,进行业务操作，business object 业务对象，主要作用是把业务逻辑封装成一个对象，这个对象包括一个或多个对象，比如一个简历，有教育经历，工作经历，社会关系等等，我们可以把教育经历对应一个 PO 、工作经验对应一个 PO、 社会关系对应一个 PO, 建立一个对应简历的的 BO 对象处理简历，每 个 BO 包含这些 PO ,这样处理业务逻辑时，我们就可以针对 BO 去处理

#### **POJO ( plain ordinary java object) 简单无规则 java 对象**

传统意义的 java 对象，就是说一些 Object/Relation Mapping 工具中，能够做到维护数据库表记录的 persisent object 完全是一个符合  Java Bean 规范的 纯 java 对象，没有增加别的属性和方法，我们的理解就是最基本的 Java bean 只有属性字段 setter 和 getter 方法

POJO 时是 DO/DTO/BO/VO 的统称

#### **DAO（data access object） 数据访问对象**

是一个 sun 的一个标准 j2ee 设计模式，这个模式有个接口就是 DAO ，他负持久层的操作，为业务层提供接口，此对象用于访问数据库，通常和 PO 结合使用，DAO 中包含了各种数据库的操作方法，通过它的方法，结合 PO 对数据库进行相关操作，夹在业务逻辑与数据库资源中间，配合VO 提供数据库的 CRUD 功能

#### **VO 与 DTO 的区别**

DTO 和 VO 的属性值基本是一致的，而且他们通常都是 POJO【简单的 Java 对象（Plain Old Java Object）】,但两者存在本质上的区别；DTO 代表服务层需要接收的数据和返回的数据，而VO 代表展示层需要显示的数据。

#### **DTO 与 DO 的区别**

首先是概念上的区别，DTO 是展示层和服务层之间的数据传输对象（可以认为是两者之间的协议），而 DO是对现实世界各种业务角色的抽象，这就引出了两者在数据上的区别。

#### **DO 与 PO 的区别**

DO 和 PO 在绝大部分情况下是一一对应的，PO是只含有 get/set 方法的POJO，但某些场景还是能反映出两者在概念上存在本质区别：
DO在某些场景下不需要进行显式的持久化，例如利用策略模式设计的商品折扣策略，会衍生出折扣策略的接口和不同折扣策略实现类，这些折扣策略实现类可以算是DO，但它们只会驻留在静态内存池，不需要持久化到持久层，因此，这类 DO 是不存在对应的 PO的。
同样的道理，某些场景下，PO也没有对应的DO，例如老师Teacher和学生Student存在多对多的关系，在关系数据库中，这种关系需要表现为一个中间表，也就对应有一个TeacherAndStudentPO的PO，但这个PO在业务领域没有任何现实的意义，它完全不能与任何DO对应上。



## 8.2 三级分类接口编写

```java
// 返回查询所有分类以及子子分类，以树形结构组装起来    
List\<CategoryEntity> listWithTree();
```

实现类：

```java
  @Override
    public List\<CategoryEntity> listWithTree() {
        // 1、查出所有分类 设置为null查询全部
        List\<CategoryEntity> entities = baseMapper.selectList(null);

        // 2、组装成父子的树形结构
        List\<CategoryEntity> levelList = entities.stream().filter(categoryEntity -> {
            // parentCid ==0 为父目录默认0
            return categoryEntity.getParentCid() == 0;
        }).map(menu -> {
            // 设置二三级分类 递归
            menu.setChildren(getChildrens(menu,entities));
            return menu;
        }).sorted((menu1, menu2) -> {
            //  排序 Sort字段排序
            return (menu1.getSort() == null ? 0 : menu1.getSort()) - (menu2.getSort() == null ? 0 : menu2.getSort());
        }).collect(Collectors.toList());

        return levelList;
    }

  /**
     *  递归查询子分类
     * @param root 当前category对象
     * @param all  全部分类数据
     * @return
     */
    private List\<CategoryEntity> getChildrens(CategoryEntity root, List\<CategoryEntity> all) {

        List\<CategoryEntity> collect = all.stream().filter(categoryEntity -> {
            // 遍历所有的category对象的父类id = 等于root的分类id 说明是他的子类
            return categoryEntity.getParentCid() == root.getCatId();
        }).map(menu -> {
            // 1、递归遍历菜单
            menu.setChildren(getChildrens(menu, all));
            return menu;
        }).sorted((menu1, menu2) -> {
            // 2、菜单排序
            return (menu1.getSort() == null ? 0 : menu1.getSort()) - (menu2.getSort() == null ? 0 : menu2.getSort());
        }).collect(Collectors.toList());

        return collect;
    }
```

> 跨域

跨域：指的是浏览器不能执行其他网站的脚本。它是由浏览器的同源策略造成的，是浏览器对javascript施加的安全限制。

同源策略：是指协议，域名，端口都要相同，其中有一个不同都会产生跨域；

下图详细说明了 URL  的改变导致是否允许通信

![image-20220512154306048](http://qnimg.gisfsde.com/work/image-20220512154306048.png)



> 跨域流程

![image-20220512154318670](http://qnimg.gisfsde.com/work/image-20220512154318670.png)

浏览器发请求都要实现发送一个请求询问是否可以进行通信 ，我直接给你返回可以通信不就可以了吗？![image-20201017090546193](http://qnimg.gisfsde.com/work/image-20201017090546193.png)



相关资料参考：https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS

> 解决跨越（ 一 ） 使用nginx部署为同一域

开发过于麻烦，上线在使用

![image-20220512154332704](http://qnimg.gisfsde.com/work/image-20220512154332704.png)

> 解决跨域 （ 二 ）配置当次请求允许跨域

1、添加响应头

- Access-Control-Allow-Origin: 支持哪些来源的请求跨域

- Access-Control-Allow-Methods: 支持哪些方法跨域

- Access-Control-Allow-Credentials: 跨域请求默认不包含cookie,设置为true可以包含cookie

- Access-Control-Expose-Headers: 跨域请求暴露的字段

  ​	CORS请求时, XML .HttpRequest对象的getResponseHeader()方法只能拿到6个基本字段: CacheControl、Content-L anguage、Content Type、Expires、 

  Last-Modified、 Pragma。 如果想拿到其他字段，就必须在Access-Control-Expose-Headers里面指定。

- Access-Control-Max- Age: 表明该响应的有效时间为多少秒。在有效时间内，浏览器无须为同一-请求再次发起预检请求。请注意，浏览器自身维护了一个最大有效时间，如果该首部字段的值超过了最大有效时间，将不会生效。



网关配置文件

```yaml
        - id: product_route
          uri: lb://gulimall-product
          predicates:
            - Path=/api/product/**
          filters:
            - RewritePath=/api/(?\<segment>/?.*),/$\{segment}

        - id: admin_route
          uri: lb://renren-fast  # lb负载均衡
          predicates:
            - Path=/api/**  # path指定对应路径
          filters: # 重写路径
            - RewritePath=/api/(?\<segment>/?.*), /renren-fast/$\{segment}
```

跨越设置

请求先发送到网关，网关在转发给其他服务  事先都要注册到**注册中心**

```java
@Configuration
public class GulimallCorsConfiguration {

    @Bean
    public CorsWebFilter corsWebFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        CorsConfiguration corsConfiguration = new CorsConfiguration();

        // 配置跨越
        corsConfiguration.addAllowedHeader("*"); // 允许那些头
        corsConfiguration.addAllowedMethod("*"); // 允许那些请求方式
        corsConfiguration.addAllowedOrigin("*"); //  允许请求来源
        corsConfiguration.setAllowCredentials(true); // 是否允许携带cookie跨越
        // 注册跨越配置
        source.registerCorsConfiguration("/**",corsConfiguration);

        return new CorsWebFilter(source);
    }

}
```

去掉renren-fast默认跨域设置

### 8.2.1 树形展示三级分类数据

> 1、用到的前端组件  Tree 树形控件

![image-20220512154347353](http://qnimg.gisfsde.com/work/image-20220512154347353.png)

```vue
\<el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick">\</el-tree>
<!--
data	
展示数据
props 配置选项
children 指定子树为节点对象的某个属性值
label 指定节点标签为节点对象的某个属性值
disabled 节点选择框是否禁用为节点对象的某个属性值
@node-click 节点被点击时的回调
-->
```

配置静态数据就能显示出对应的效果

> 2、编写方法获取全部菜单数据

```javascript
getMenus() {
      this.$http({
          // 请求接口见上面
        url: this.$http.adornUrl("/product/category/list/tree"),
        method: "get"
      }).then(({ data }) => {
        console.log("返回的菜单数据" + data.data);
        this.menus = data.data;
      });
    }
```

> 3、最终展示结果  ( append ,edit 会在后面介绍)

![image-20220512154358877](http://qnimg.gisfsde.com/work/image-20220512154358877.png)

### 8.2.2 逻辑删除&删除效果细化

效果图

![image-20220512154414329](http://qnimg.gisfsde.com/work/image-20220512154414329.png)

> 1、节点的内容支持自定义，可以在节点区添加按钮或图标等内容

```vue
 \<el-button
            v-if="node.childNodes.length == 0"
            type="text"
            size="mini"
            @click="() => remove(node, data)"
          > Delete\</el-button>
 <!-- 
	v-if="node.childNodes.length == 0"  没有子节点可以删除
	type 对应类型
	size 大小
	@click 点击后出发的方法 此处使用了 箭头函数
-->
```

> 2、前端remove方法进行删除

```javascript
remove(node, data) {
      this.$confirm(`是否删除【${data.name}】菜单 ? `, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 拿到当前节点的catId
          var ids = [data.catId];
          this.$http({
            url: this.$http.adornUrl("/product/category/delete"),
            method: "post",
            data: this.$http.adornData(ids, false)
          }).then(({ data }) => {
            this.$message({
              message: "菜单删除成功",
              type: "success"
            });
            // 刷新菜单
            this.getMenus();
            // 设置默认需要展开的菜单
            /**
            default-expanded-keys  默认展开节点的 key 数组 
            */
            this.expandedKey = [node.parent.data.catId];
            console.log(node.parent.data.catId);
          });
        })
        .catch(() => {});

      console.log("remove", node, data);
    }
```

> 3、后端接口 -- 逻辑删除配置

3.1 第一种方式 mybatisplus 逻辑删除参考官网：https://baomidou.com/guide/logic-delete.html

在appliction.yml 中配置 myabtisplus 逻辑删除

```yaml
mybatis-plus:
  mapper-locations: classpath*:/mapper/**/*.xml
  global-config:
    db-config:
      id-type: auto # 数据库主键自增
      logic-delete-value: 1 # 逻辑已删除值(默认为 1)
      logic-not-delete-value: 0 # 逻辑未删除值(默认为 0)
```

3.2 第二种方式 在 Entity中 使用注解 

```java
/**
	是否为数据库表字段
	默认 true 存在，false 不存在
	标记为false 说明 该字段不在数据库 
**/
@TableField(exist = false)
private List\<CategoryEntity> children;
```

> 4、Controller 实现  使用了代码生成器

```java
 /**
     * 删除
     * @RequestBody:获取请求体，必须发送post请求才有 get请求没有
     * SpringMvc 自动将请求体的数据 ( json ) 转为对应的对象
     */
    @RequestMapping("/delete")
    public R delete(@RequestBody Long[] catIds){
        // 1、检查当前删除的菜单，是否被别的地方应用
        categoryService.removeMenuByIds(Arrays.asList(catIds));
        return R.ok();
    }
//Service 实现
   @Override
    public void removeMenuByIds(List\<Long> asList) {
        // 1、逻辑删除
        baseMapper.deleteBatchIds(asList);

    }

```



### 8.2.3 新增效果&基本修改

![image-20220512154444827](http://qnimg.gisfsde.com/work/image-20220512154444827.png)



> 1、前端组件 button 组件  Dialog 对话框

```vue
  <!-- 层级小于2 才能新增 -->
          \<el-button
            v-if="node.level \<= 2"
            type="text"
            size="mini"
            @click="() => append(data)"
            >Append
          \</el-button>
 \<el-button type="text" size="mini" @click="() => edit(data)"
            >edit
          \</el-button>

<!-- 上面组件在tree中-->
\<el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      \<el-form :model="category">
        \<el-form-item label="分类名称">
          \<el-input v-model="category.name" autocomplete="off">\</el-input>
        \</el-form-item>
        \<el-form-item label="图标">
          \<el-input v-model="category.icon" autocomplete="off">\</el-input>
        \</el-form-item>
        \<el-form-item label="计量单位">
          \<el-input
            v-model="category.productUnit"
            autocomplete="off"
          >\</el-input>
        \</el-form-item>
      \</el-form>
      \<span slot="footer" class="dialog-footer">
        \<el-button @click="dialogVisible = false">取 消\</el-button>
        \<el-button type="primary" @click="submitData">确 定\</el-button>
      \</span>
    \</el-dialog>
```

> 2、新增&修改

```javascript
  append(data) {
      this.dialogVisible = true;
      console.log("append", data);
      this.category.name = "";
      this.dialogType = "add";
      this.title = "添加分类";
      this.category.parentCid = data.catId;
      this.category.catLevel = data.catLevel * 1 + 1;
      this.category.name = "";
      this.category.catId = null;
      this.category.icon = "";
      this.category.productUnit = "";
    }, // 要修改的数据
    edit(data) {
      console.log("要修改的数据", data);
      this.dialogType = "edit";
      this.title = "修改分类";
      this.dialogVisible = true;

      // 发送请求获取最新的数据
      this.$http({
        url: this.$http.adornUrl(`/product/category/info/${data.catId}`),
        method: "get"
      }).then(({ data }) => {
        // 请求成功
        console.log("要回显的数据", data);
        this.category.name = data.data.name;
        this.category.catId = data.data.catId;
        this.category.icon = data.data.icon;
        this.category.productUnit = data.data.productUnit;
        this.category.parentCid = data.data.parentCid;
      });
    },



submitData() {
      if (this.dialogType == "add") {
        // 进行新增
        this.addCategory();
      }
      if (this.dialogType == "edit") {
        // 进行修改
        this.editCategory();
      }
    },
        // 添加三级分类
    addCategory() {
      console.log("添加三级分类的数据", this.category);
      this.$http({
        url: this.$http.adornUrl("/product/category/save"),
        method: "post",
        data: this.$http.adornData(this.category, false)
      }).then(({ data }) => {
        this.$message({
          message: "菜单保存成功",
          type: "success"
        });
        // 关闭对话框
        this.dialogVisible = false;
        // 重新刷新数据
        this.getMenus();
        // 默认展开的菜单
        this.expandedKey = [this.category.parentCid];
      });
    }, // 修改三级分类数据
    editCategory() {
      // 解构出单独的几个对象 用来提交
      var { catId, name, icon, productUnit } = this.category;
      this.$http({
        url: this.$http.adornUrl("/product/category/update"),
        method: "post",
        data: this.$http.adornData({ catId, name, icon, productUnit }, false)
      }).then(({ data }) => {
        this.$message({
          message: "菜单修改成功",
          type: "success"
        });
        // 关闭对话框
        this.dialogVisible = false;
        // 重新刷新数据
        this.getMenus();
        // 默认展开的菜单
        this.expandedKey = [this.category.parentCid];
      });
    },
```

> 3、要考虑到的点 以及细节

- 添加完成后要把表单的数据进行清除，否则第二次打开任然会有上次表单提交剩下的数据      this.category.name = "";
- 修改和新增用的是同一个表单，因此在方法对话框中 动态的绑定了  :title="title" 标题 用于显示是新增还是修改
- 一个表单都是一个提交方法 因此在提交方法的时候进行了判断，根据变量赋值决定调用那个方法  this.dialogType = "add";  this.dialogType = "edit";





### 8.2.4 拖拽功能&数据收集&批量删除

效果演示

![image-20220512154501803](http://qnimg.gisfsde.com/work/image-20220512154501803.png)



> 1、前端用的组件  Tree 树形控件 可拖拽节点 

通过 draggable 属性可让节点变为可拖拽。

```vue
 \<el-tree
      :expand-on-click-node="false" 
      :data="menus"
      :props="defaultProps"
      show-checkbox
      node-key="catId"
      :default-expanded-keys="expandedKey"
      :draggable="draggable"
      :allow-drop="allowDrop"
      @node-drop="handleDrop"
      ref="menuTree"
    >
<!-- 
:expand-on-click-node 是否在点击节点的时候展开或者收缩节点 默认 true 则只有点箭头图标的时候才会展开或者收缩节点。
show-checkbox	节点是否可被选择
node-key 每个树节点用来做唯一标识的属性 
default-expanded-keys  默认展开节点的节点
draggable 表示是否可以被拖拽 true&false
allow-drop 拖拽时判定目标节点能否被放置
node-drop 拖拽成功完成出发的事件
ref 该组件tree的引用
详细解释参考官网 https://element.eleme.cn/#/zh-CN/component/tree
-->
```

> 2、主要业务逻辑  TODO：暂时不懂 回头再来看

**allowDrop**：

拖拽时判定目标节点能否被放置。`type` 参数有三种情况：'prev'、'inner' 和 'next'，分别表示放置在目标节点前、插入至目标节点和放置在目标节点后

**@node-drop**

拽成功完成时触发的事件

共四个参数，依次为：被拖拽节点对应的 Node、结束拖拽时最后进入的节点、被拖拽节点的放置位置（before、after、inner）、event

```javascript
 allowDrop(draggingNode, dropNode, type) {
      // 1、被拖动的当前节点以及所在的父节点总层次不能大于3

      // 1) 被拖动节点的总层数
      console.log("allowDrop", draggingNode, dropNode, type);

      this.countNodeLevel(draggingNode.data);

      // 当前正在拖动的节点 + 父节点所在的深度不大于3即可
      let deep = Math.abs(this.maxLevel - draggingNode.level) + 1;
      console.log("深度", deep);

      if (type == "inner") {
        return deep + dropNode.level \<= 3;
      } else {
        return deep + dropNode.parent.level \<= 3;
      }
 },
    countNodeLevel(node) {
      // 找到所有子节点，求出最大深度
      if (node.children != null && node.children.length > 0) {
        for (let i = 0; i \< node.children.length; i++) {
          if (node.children[i].catLevel > this.maxLevel) {
            this.maxLevel = node.children[i].catLevel;
          }
          // 递归查找
          this.countNodeLevel(node.children[i]);
        }
      }
    },  handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log("handleDrop: ", draggingNode, dropNode, dropType);

      // 1、当前节点最新的父节点
      let pCid = 0;
      let siblings = null;
      if (dropType == "before" || dropType == "after") {
        pCid =
          dropNode.parent.data.catId == undefined
            ? 0
            : dropNode.parent.data.catId;
        siblings = dropNode.parent.childNodes;
      } else {
        pCid = dropNode.data.catId;
        siblings = dropNode.childNodes;
      }
      // this.PCid = pCid
      this.pCid.push(pCid);

      // 2、当前拖拽节点的最新顺序
      for (let i = 0; i \< siblings.length; i++) {
        if (siblings[i].data.catId == draggingNode.data.catId) {
          // 如果遍历的是当前正在拖拽的节点
          let catLevel = draggingNode.level;
          if (siblings[i].level != draggingNode.level) {
            // 当前结点的层级发生变化
            catLevel = siblings[i].level;
            // 修改它子节点的层级
            this.updateChildNodeLevel(siblings[i]);
          }
          // 如果遍历当前正在拖拽的节点
          this.updateNodes.push({
            catId: siblings[i].data.catId,
            sort: i,
            parentCid: pCid
          });
        } else {
          this.updateNodes.push({ catId: siblings[i].data.catId, sort: i });
        }
      }

      // 3、当前拖拽节点的最新层级
      console.log("updateNodes", this.updateNodes);
    },
    updateChildNodeLevel() {
      if (node.childNodes.length > 0) {
        for (let i = 0; i \< node.childNodes.length; i++) {
          var cNode = node.childNodes[i].data;
          this.updateNodes.push({
            catId: cNode.catId,
            catLevel: node.childNodes[i].level
          });
          this.updateChildNodeLevel(node.childNodes[i]);
        }
      }
    },
```



> 3、批量删除

```vue
 \<el-button type="danger" @click="batchDelete">批量删除\</el-button>
```

batchDelete方法 

```javascript
  batchDelete() {
      let catIds = [];
      let names = [];
      // 返回目前被选中的节点所组成的数组
      let checkedNodes = this.$refs.menuTree.getCheckedNodes();
      console.log("被选中的元素", checkedNodes);
      for (let i = 0; i \< checkedNodes.length; i++) {
          // 遍历节点数组 拿到需要的值
        catIds.push(checkedNodes[i].catId);
        names.push(checkedNodes[i].name);
      }
      this.$confirm(`是否批量删除【${names}】菜单 ? `, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl("/product/category/delete"),
          method: "post",
          data: this.$http.adornData(catIds, false)
        }).then(({ data }) => {
          this.$message({
            message: "删除成功",
            type: "success"
          });
        // 刷新菜单
        this.getMenus();
        });
      });
    },
```

后端接口也是逻辑批量删除

```java
void removeMenuByIds(List\<Long> asList); //接收的是一个id数组
```

**总结：**

前端用到的组件

 Dialog 对话框、可拖拽节点、Switch 开关、Button 按钮、Tree组件（属性较多）

细节点：

没开启拖拽



开启拖拽：

通过 draggable 属性可让节点变为可拖拽。

![image-20220512154539368](http://qnimg.gisfsde.com/work/image-20220512154539368.png)





# 七、商品服务&品牌管理

## 9.1、效果显示优化与快速显示开关

vue代码

```vue
 \<el-switch
            v-model="scope.row.showStatus"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
            @change="updateBrandStatus(scope.row)"
          >
     <!-- 
scope.row 拿到整行的数据
active-color	switch 打开时的背景色
inactive-color	switch 关闭时的背景色
active-value	switch 打开时的值
inactive-value	switch 关闭时的值
-->
```

组件地址：https://element.eleme.cn/#/zh-CN/component/switch

用户点击 switch 开关就会调用后台的接口更改对应数据库的字段 ( 决定是否显示)，定义了 @change 事件 只要修后就会触发对应方法

```javascript
 updateBrandStatus(data) {
      console.log("整行数据",data);
     // 单独就封装两个字段
      let {brandId,showStatus} = data
      this.$http({
        url: this.$http.adornUrl('/product/brand/update'),
        method: 'post',
        data: this.$http.adornData({brandId,showStatus}, false)
      }).then(({ data }) => {
        this.$message({
          type:"success",
          message:"状态更新成功"
        })
       });
    },
```



## 9.2、表单效验&自定义效验规则

Form 组件提供了表单验证的功能，只需要通过 `rules` 属性传入约定的验证规则，并将 Form-Item 的 `prop` 属性设置为需校验的字段名即可

```vue
\<el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="140px"
    >
```

data中

 自定义的规则 ，用来对数据进行判断

```javascript
dataRule: {
        name: [{ required: true, message: "品牌名不能为空", trigger: "blur" }],
        // 自定义的规则  
        firstLetter: [
          { validator: (rule, value, callback) => {
            if(value == '') {
              callback(new Error("首字母必须填写"))
            } else if(! /^[a-zA-Z]$/.test(value)) {
              callback(new Error("首字母必须a-z或者A-Z之间"))
            } else {
              callback()
            }
          },trigger:'blur'}
        ],
        sort: [{ validator: (rule, value, callback) => {
            if(value == '') {
              callback(new Error("排序字段必须填写"));
            } else if(!Number.isInteger(value) || value \< 0) {
              callback(new Error("排序必须是一个大于等于0的整数"));
            } else {
              callback();
            }
          }, trigger: "blur" }]
      }
```

## 9.3、JSR303 数据效验 & 统一异常处理

前端数据效验成功了，就会把json数据传递到后端，但是有人利用接口 比如 postman 乱发送请求 那会怎么办，于是后端也会利用 JSR303进行数据效验

### 9.3.1、给Bean添加效验注解  javax.validation.constraints包下 并定义自己的的message提示

![](http://qnimg.gisfsde.com/work/image-20201019205020068.png)

```java
@NotEmpty(messsage = "logo不能为空")
@URL(message = "logo必须是一个合法的url地址")
private String logo;
```

### 9.3.2、开启效验功能 @Valid

* 效果：效验错误以后有默认的响应

  Controller代码：

  ```java
  @RequestMapping("/save")
  public R save(@Valid@RequestBody BrandEntity brand){
      brandService.save(brand);
      return R.ok();
  }
  ```

  ![image-20201020083020271](http://qnimg.gisfsde.com/work/image-20201020083020271.png)

### 9.3.3、给效验的bean后紧跟一个BindingResult 就可以获取到效验的结果

```java
 public R save(@Valid @RequestBody BrandEntity brand,BindingResult result){
  if(result.hasErrors()){
            Map\<String,String> map = new HashMap\<>();
            //1、获取校验的错误结果
            result.getFieldErrors().forEach((item)->{
                //FieldError 获取到错误提示
                String message = item.getDefaultMessage();
                //获取错误的属性的名字
                String field = item.getField();
                map.put(field,message);
            });

            return R.error(400,"提交的数据不合法").put("data",map);
        }else {

        }
```

### 9.3.4、分组效验 (多场景复杂效验)

添加一个组 & 修改一个组

1、@NotBlank(message = "品牌名必须提交",groups = {AddGroup.class,UpdateGroup.class})

- **给效验注解标注什么情况需要进行效验**
- @Validated({AddGroup.class}) 在对应方法上进行标注
- **默认没有指定分组的效验注解 @NotBlank 在分组效验情况@Validated({AddGroup.class})不生效**，只会在@Validated生效

```java
// 标记使用修改分组
public R update(@Validated(UpdateGroup.class) @RequestBody BrandEntity brand){
	brandService.updateById(brand);
      return R.ok();
  }
```

Entity

```java
/**
 * 品牌id
 */
@Null(message = "新增不能指定Id",groups = {AddGroup.class})
@NotNull(message = "修改必须指定品牌id",groups = {UpdateGroup.class})
@TableId
private Long brandId;
/**
 * 品牌名
 */
@NotBlank(message = "品牌名不能为空",groups = {AddGroup.class,UpdateGroup.class})
private String name;
/**
 * 品牌logo地址
 */
@NotEmpty(groups = {AddGroup.class})
@URL(message = "logo必须是一个合法的url地址",groups = {AddGroup.class,UpdateGroup.class})
private String logo;
/**
 * 介绍
 */
private String descript;
/**
 * 显示状态[0-不显示；1-显示]
 */
@NotNull(groups = {AddGroup.class, UpdateStatusGroup.class})
@ListValue(vals={0,1},groups = {AddGroup.class,UpdateStatusGroup.class})
private Integer showStatus;
/**
 * 检索首字母
 */
@NotEmpty(groups = {AddGroup.class})
@Pattern(regexp = "^[a-zA-Z]$",message = "检索首字母必须是一个字母",groups = {AddGroup.class,UpdateGroup.class})
private String firstLetter;
/**
 * 排序
 */
@NotNull(groups = {AddGroup.class})
@Min(value=0,message = "排序必须大于等于0",groups = {AddGroup.class,UpdateGroup.class})
private Integer sort;
```

### 9.3.5、自定义效验

*      编写一个自定义的效验注解
*      编写一个自定义的效验器何自定义的效验注解

```java
@Documented
@Constraint(validatedBy = {ListValueConstraintValidator.class})//【可以指定多个不同的效验器，适配不同类型的效验】
@Target({ METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER, TYPE_USE })
@Retention(RUNTIME)
public @interface ListValue {

    // 三要素不能丢
    String message() default "{com.atguigu.gulimall.product.valid.ListValue.message}";

    Class\<?>[] groups() default { };

    Class\<? extends Payload>[] payload() default { };

    int[] vals() default { };

}
```

实现约束

```java
public class ListValueConstraintValidator implements ConstraintValidator\<ListValue,Integer> {

    private Set\<Integer> set = new HashSet\<>();
    // 初始化方法
    @Override
    public void initialize(ListValue constraintAnnotation) {
        int[] vals = constraintAnnotation.vals();
        for(int val : vals) {
            // 将结果添加到set集合
            set.add(val);
        }
    }
    /**
     *	判断效验是否成功
     * @param value 需要效验的值
     * @param context
     * @return
     */
    @Override
    public boolean isValid(Integer value, ConstraintValidatorContext context) {
        // 判断是包含该值
        return set.contains(value);
    }
}
```



### 9.3.6、异常处理 

这里使用到了 SpringMVC 的注解 @ControllerAdvice

1、编写异常处理类使用SpringMvc的@ControllerAdvice

 2、使用@ExceptionHandler标记方法可以处理异常

```java
@Slf4j
@RestControllerAdvice(basePackages =  "com.atguigu.gulimall.product.controller")
public class GulimallExceptionControllerAdvice {

    /**
     * 捕获定义的异常
     * @param e
     * @return
     */
    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public R handleVaildException(MethodArgumentNotValidException e) {
        log.error("数据效验出现问题{},异常类型:{}",e.getMessage(),e.getClass());
        Map\<String,String> errorMap = new HashMap\<>();
        BindingResult bindingResult = e.getBindingResult();
        bindingResult.getFieldErrors().forEach(fieldError -> {
            errorMap.put(fieldError.getField(),fieldError.getDefaultMessage());
        });
        return R.error(BizCodeEnume.VAILD_EXCEPTION.getCode(),BizCodeEnume.VAILD_EXCEPTION.getMsg()).put("data",errorMap);
    }

    /**
     * 兜底异常
     * @param throwable
     * @return
     */
    @ExceptionHandler(value = Throwable.class)
    public R handleException(Throwable throwable) {
        return R.error();
    }

}
```

**异常错误码定义 （重点）**

后端将定义的错误码写入到开发手册，前端出现对于的错误，就可以通过手册查询到对应的异常

```java
/***
 * 错误码和错误信息定义类
 * 1. 错误码定义规则为5为数字
 * 2. 前两位表示业务场景，最后三位表示错误码。例如：100001。10:通用 001:系统未知异常
 * 3. 维护错误码后需要维护错误描述，将他们定义为枚举形式
 * 错误码列表：
 *  10: 通用
 *      001：参数格式校验
 *  11: 商品
 *  12: 订单
 *  13: 购物车
 *  14: 物流
 *
 *
 */
public enum BizCodeEnume {
    UNKNOW_EXCEPTION(10000,"系统未知异常"),
    VAILD_EXCEPTION(10001,"参数格式校验失败");

    private int code;
    private String msg;
    BizCodeEnume(int code,String msg){
        this.code = code;
        this.msg = msg;
    }

    public int getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }
}
```





# 八、商品服务&属性分组

## 10.1 、前端组件抽取 & 父子组件交互

### 10.1.1 属性分组 - 效果

![image-20201020151047887](http://qnimg.gisfsde.com/work/image-20201020151047887.png)

左边这个树形空间我们已经写过了，在三级分类的时候编写过，相对应的功能，拖拽，添加，删除等等都已经实现，那我们为什么不把他抽取出一个公共的组件便于其他组件利用？

说干就干！

在 modules 中新建 common 文件夹，在common中 新建 category.vue

category.vue 核心代码

抽取需要的结果，多余的结果进行删除

```vue
\<template>
  \<el-tree :data="menus" :props="defaultProps" node-key="catId" ref="menuTree" @node-click="nodeClick">
  \</el-tree>
\</template>
```

### 10.1.2 Layout 布局

通过基础的 24 分栏，迅速简便地创建布局、类似之前学过的bootstrap 

```vue
\<el-row :gutter="20">
  \<el-col :span="6">表格\</el-col>
  \<el-col :span="18">菜单\</el-col>
\</el-row>
```

左边放表格，右边放菜单

引入 category 组件

```javascript
import category from "../common/category";
```

并且声明

```javascript
//import引入的组件需要注入到对象中才能使用
  components: {
    category
  },
```

最后在组件中使用

```vue
   \<el-col :span="6">
       <!-- 直接使用-->
      \<category @tree-node-click="treenodeclick">\</category>
    \</el-col>
```

右边菜单使用代码生成器的代码直接引入即可

### 10.1.3 父子组件如何进行交互

子组件中的 Tree 组件的一个事件  node-click 节点被点击时的回调

```javascript
  // 向父组件发送事件，后面是需要传递的对象，参数等
this.$emit("tree-node-click",data,node,component)
```

父组件需要定义相同方法接收

```vue
  \<category @tree-node-click="treenodeclick">\</category>

```

```javascript
 // 感知到节点被点击
    treenodeclick(node, data, component) {
      console.log("attrgroup感知到category节点被点击");
      console.log("刚才被点击的菜单id:" + data.catId);
      if (node.level == 3) {
        this.catId = data.catId;
        this.getDataList();
      }
    },
```



## 10.2 、获取属性分类分组

查看提供的接口文档

![image-20201020153526835](http://qnimg.gisfsde.com/work/image-20201020153526835.png)

请求参数需要我们带对应的分页参数，所以我们在请求的时候得把参数带上

那就定义接口 go

```java
    /**
     * 
     * @param params 分页请求相关参数
     * @param catelogId 三级分类id
     * @return
     */
    PageUtils queryPage(Map\<String, Object> params, Long catelogId);
```

实现类

```java
@Override
public PageUtils queryPage(Map\<String, Object> params, Long catelogId) {
    // 分类id 等于01 查询全部
    if (catelogId == 0) {
        IPage\<AttrGroupEntity> page = this.page(new Query\<AttrGroupEntity>().getPage(params),
                new QueryWrapper\<AttrGroupEntity>());
        return new PageUtils(page);
    } else {
        // 拿到参数中的 key
        String key = (String) params.get("key");
        // 先根据分类id进行查询
        QueryWrapper\<AttrGroupEntity> wrapper = new QueryWrapper\<AttrGroupEntity>()
                .eq("catelog_id",catelogId);
        // selecet * from attrgroup where catelog_id = ? and (attr_group_id = key or like attr_group_name = key)
        // 有时候查询也不会带上key 所以得判断
        if (!StringUtils.isEmpty(key)) {
            // where条件后加上 and 
            wrapper.and((obj) -> {
                obj.eq("attr_group_id",key).or().like("attr_group_name",key);
            });
        }
        // 组装条件进行查询 
        IPage\<AttrGroupEntity> page = this.page(new Query\<AttrGroupEntity>().getPage(params),
                wrapper);
        return  new PageUtils(page);
    }
}
```

## 10.3 、分类新增 & 级联选择器

级联选择器是啥？？ 没接触过

官方解释

**Cascader 级联选择器**

当一个数据集合有清晰的层级结构时，可通过级联选择器逐级查看并选择。

对应效果 

![image-20201020154619941](http://qnimg.gisfsde.com/work/image-20201020154619941.png)

attrgroup-add-or-update.vue 中 加入该组件

```vue
  \<el-cascader
          v-model="dataForm.catelogPath"
           placeholder="试试搜索：手机"
          :options="categorys"
          :props="props"
          filterable
        >\</el-cascader>
<!--
placeholder="试试搜索：手机"默认的搜索提示
:options="categorys" 可选项数据源，键名可通过 Props 属性配置
:props="props" 配置选项	
 filterable 是否可搜索选项
-->
```

那么问题来了？ 我怎样把数据加载到这个组件里面？

在你组件加载完成后，我在调用方法 ( getCategorys() ) 获取菜单数据，在设置到options不就行了吗？

```javascript
  getCategorys(){
      this.$http({
        url: this.$http.adornUrl("/product/category/list/tree"),
        method: "get"
      }).then(({ data }) => {
        this.categorys = data.data;
      });
    },
```

## 10.4 、分类修改 & 回显级联选择器

修改和新增用的是一个添加组件 那么我们再点击修改后，你如何把 级联显示的数据再次显示出来？

在 AttrGroup点击修改后，会触发addOrUpdateHandle方法，他会通过引用 vue 文件里的 addOrUpdate 并调用他的 init初始化方法

```javascript
 // 新增 / 修改
    addOrUpdateHandle(id) {
      // 对话框显示
      this.addOrUpdateVisible = true;
      // 要渲染的组件完成选然后 调用该方法
      this.$nextTick(() => {
        // this 当前 refs 当前所有组件
        this.$refs.addOrUpdate.init(id);
      });
    },
```

init执行完成会回调

```java
.then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.attrGroupName = data.attrGroup.attrGroupName;
              this.dataForm.sort = data.attrGroup.sort;
              this.dataForm.descript = data.attrGroup.descript;
              this.dataForm.icon = data.attrGroup.icon;
              this.dataForm.catelogId = data.attrGroup.catelogId;
                // 设置 级联的路径 从数据中取
              this.dataForm.catelogPath = data.attrGroup.catelogPath;
            }
          });
```

后端如何根据分组id 查询出 对应的分类？定义接口

```java
/**
 * 找到catelogId的完整路径
 * 【父/子/孙】
 * @param catelogId
 */
Long[] findCatelogPath(Long catelogId);
```

实现

```java
@Override
public Long[] findCatelogPath(Long catelogId) {
    List\<Long> paths = new ArrayList\<>();
    List\<Long> parentPath = findParentPath(catelogId, paths);
    // 反转
    Collections.reverse(parentPath);
    //转成Long[] 数组返回
    return parentPath.toArray(new Long[parentPath.size()]);
}

/**
 * 递归查找
 * @param catelogId 三级分类的id
 * @param paths 路径
 * @return
 */
private List\<Long> findParentPath(Long catelogId,List\<Long> paths) {
    // 1、收集当前节点id
    paths.add(catelogId);
    // 2、通过分类id拿到 Category 对象
    CategoryEntity byId = this.getById(catelogId);
    // 3、如果不是根节点 就一直递归下去查找
    if (byId.getParentCid() != 0) {
        findParentPath(byId.getParentCid(),paths);
    }
    return paths;

}
```

在 AttrGroupEntity 中 添加了一个新属性

```java
/**
 * 用于存放 级联显示的 父子孙的地址
 */
@TableField(exist = false) // 标注为false 表是不是数据库字段
private Long[] catelogPath;
```

Controller 具体设置返回数据

```java
 /**
   * 信息
   */
  @RequestMapping("/info/{attrGroupId}")
  public R info(@PathVariable("attrGroupId") Long attrGroupId){
      // 根据id查询出 分组group对象
	AttrGroupEntity attrGroup = attrGroupService.getById(attrGroupId);
	// 拿到分类id
      Long catelogId = attrGroup.getCatelogId();
      // 根据分类id查询出 他的 父 子 孙 对应的数据,并且设置到 attrGroup对象
      Long[] catelogPath = categoryService.findCatelogPath(catelogId);
      attrGroup.setCatelogPath(catelogPath);

      return R.ok().put("attrGroup", attrGroup);
  }
```



## 10.5、品牌分类关联与级联更新

### 10.5.1、实现品牌管理搜索

![image-20201020120929362](http://qnimg.gisfsde.com/work/image-20201020120929362.png)

在原本查询中加入新功能

```java
 @Override
    public PageUtils queryPage(Map\<String, Object> params) {
        // 1、获取key
        String key = (String) params.get("key");
        QueryWrapper\<BrandEntity> wrapper = new QueryWrapper\<>();
        // key不为空 brand_id 和 name 进行值匹配 
        if (!StringUtils.isEmpty(key)) {
            wrapper.eq("brand_id",key).or().like("name",key);
        }
        IPage\<BrandEntity> page = this.page(
                new Query\<BrandEntity>().getPage(params),
                wrapper
        );

        return new PageUtils(page);
    }
```

我们是直接把数据表存进了中间表,如果在真正的品牌名和分类名进行了修改，那么此时中间表的数据就是不对的，这时候数据就不是一致性

解决

在进行修改的时候，也要把中间表的数据进行更改

Brand

```java
// BrandController
 /**
      /**
     * 修改
     */
    @RequestMapping("/update")
    public R update(@Validated(UpdateGroup.class) @RequestBody BrandEntity brand){

		brandService.updateDetail(brand);

        return R.ok();
    }
// Service
@Override
public void updateDetail(BrandEntity brand) {
    // 保证字段一致
    // 根据id更改
    this.updateById(brand);
    if (!StringUtils.isEmpty(brand.getName())) {
        // 同步更新其他关联表中的数据
        categoryBrandRelationService.updateBrand(brand.getBrandId(),brand.getName());
        // TODO 更新其他关联
    }
}
// Service实现类
  @Override
    public void updateBrand(Long brandId, String name) {
        CategoryBrandRelationEntity relationEntity = new CategoryBrandRelationEntity();
        relationEntity.setBrandName(name);
        relationEntity.setBrandId(brandId);
        this.update(relationEntity,new UpdateWrapper\<CategoryBrandRelationEntity>().eq("brand_id",brandId));
    }
```

Category

```java
@Override
public void updateCascate(CategoryEntity category) {
    this.updateById(category);
    categoryBrandRelationService.updateCategory(category.getCatId(),category.getName());
}
// Service 
  @Override
    public void updateCascate(CategoryEntity category) {
        // 更新自己表对象
        this.updateById(category);
        // 更新关联表对象
        categoryBrandRelationService.updateCategory(category.getCatId(),category.getName());
    }
```

# 九、商品服务&平台属性

## Object划分

##### 1、PO (persistant object) 持久化对象

po 就是对应数据库中某一个表的一条记录，多个记录可以用 PO 的集合，PO 中应该不包含任何对数据库到操作

##### 2、DO ( Domain Object) 领域对象

就是从现实世界抽象出来的有形或无形的业务实体

##### 3、TO (Transfer Object) 数据传输对象

不同的应用程序之间传输的对象

##### 4、DTO  (Data Transfer Object) 数据传输对象

这个概念来源于 J2EE 的设计模式，原来的目的是为了 EJB的分布式应用提供粗粒度的数据实体，以减少分布式调用的次数，从而提高分数调用的性能和降低网络负载，但在这里，泛指用于展示层与服务层之间的数据传输对象

##### 5、VO(value object) 值对象

通常用于业务层之间的数据传递，和 PO 一样也是仅仅包含数据而已，但应是抽象出的业务对象，可以和表对应，也可以不，这根据业务的需要，用 new 关键字创建，由 GC 回收

view Object 试图对象

接受页面传递来的数据，封装对象，封装页面需要用的数据

##### 6、BO(business object) 业务对象

从业务模型的角度看，见 UML 原件领域模型中的领域对象，封装业务逻辑的， java 对象，通过调用 DAO 方法，结合 PO VO,进行业务操作，business object 业务对象，主要作用是把业务逻辑封装成一个对象，这个对象包括一个或多个对象，比如一个简历，有教育经历，工作经历，社会关系等等，我们可以把教育经历对应一个 PO 、工作经验对应一个 PO、 社会关系对应一个 PO, 建立一个对应简历的的 BO 对象处理简历，每 个 BO 包含这些 PO ,这样处理业务逻辑时，我们就可以针对 BO 去处理

##### 7、POJO ( plain ordinary java object) 简单无规则 java 对象

传统意义的 java 对象，就是说一些 Object/Relation Mapping 工具中，能够做到维护数据库表记录的 persisent object 完全是一个符合  Java Bean 规范的 纯 java 对象，没有增加别的属性和方法，我们的理解就是最基本的 Java bean 只有属性字段 setter 和 getter 方法

POJO 时是 DO/DTO/BO/VO 的统称

##### 8、DAO（data access object） 数据访问对象

是一个 sun 的一个标准 j2ee 设计模式，这个模式有个接口就是 DAO ，他负持久层的操作，为业务层提供接口，此对象用于访问数据库，通常和 PO 结合使用，DAO 中包含了各种数据库的操作方法，通过它的方法，结合 PO 对数据库进行相关操作，夹在业务逻辑与数据库资源中间，配合VO 提供数据库的 CRUD 功能

## 11.1 规格参数新增与VO

### 11.1.1 获取分类规格参数

**具体需求：**

查询的数据没有分类和分组

![image-20201021051239049](http://qnimg.gisfsde.com/work/image-20201021051239049.png)

属性分类 和 所属分组居然没有数据？

先查看返回的数据

![image-20201021051433485](http://qnimg.gisfsde.com/work/image-20201021051433485.png)

发现没有 catelogName 和 AttrGroupName 的数据！！ 原因是 AttrEntity没有这两个属性

![image-20201021051653178](http://qnimg.gisfsde.com/work/image-20201021051653178.png)

但是他关联了 pms_attr_attrgroup_relation 表 这个表里面有 attr_Group_id 那么思路来了？

1、我先用 attr_id 去 pms_attr_attrgroup_relation中查询出 attr_Group_id 然后通过 attr_Group_id去pms_attr_group 表中查询出 分组的名称

2、自身 attr表中有 catelog_id 那我根据这个id去 category表中查询到 分类的姓名 不就行了吗？

上代码

```java
@Override
public PageUtils queryBaseAttrPage(Map\<String, Object> params, Long catelogId) {

    QueryWrapper\<AttrEntity> wrapper = new QueryWrapper\<>();
    if (catelogId != 0) {
        wrapper.eq("catelog_id",catelogId);
    }
    String key = (String) params.get("key");
    if (!StringUtils.isEmpty(key)) {
        wrapper.and((wrapper1) -> {
            wrapper1.eq("attr_id",key).or().like("attr_name",key);
        });
    }
    IPage\<AttrEntity> page = this.page(
            new Query\<AttrEntity>().getPage(params),
            wrapper
    );
    PageUtils pageUtils = new PageUtils(page);

    // 拿到分页记录
    List\<AttrEntity> records = page.getRecords();

    List\<AttrRespVo> respVo = records.stream().map((attrEntity) -> {

        AttrRespVo attrRespVo = new AttrRespVo();
        BeanUtils.copyProperties(attrEntity, attrRespVo);

        // 1、设置分类和分组的名字
        AttrAttrgroupRelationEntity attr_idEntity = relationDao.selectOne(new QueryWrapper\<AttrAttrgroupRelationEntity>()
                .eq("attr_id", attrEntity.getAttrId()));
        if (attr_idEntity != null) {
            AttrGroupEntity attrGroupEntity = attrGroupDao.selectById(attr_idEntity.getAttrGroupId());
            attrRespVo.setGroupName(attrGroupEntity.getAttrGroupName());
        }
        CategoryEntity categoryEntity = categoryDao.selectById(attrEntity.getCatelogId());
        if (categoryEntity != null) {
            attrRespVo.setCatelogName(categoryEntity.getName());
        }
        return attrRespVo;
    }).collect(Collectors.toList());

    pageUtils.setList(respVo);
    return pageUtils;
}
```

但是原先的 AttrEntity 对象里面任然没有这两个属性 ! 怎么解决

1、我直接在 AttrEntity中新建对应的字段不就行了吗？ 然后设置成不是数据库的字段

缺点：**这样子是不是太乱了？**

2、新建一个 VO 抽取出这两个属性 不就行了吗？

```java
@Data
public class AttrRespVo extends AttrVo {
    /**
     * catelogName 手机数码，所属分类名字
     * groupName 主体 所属分组名字
     */
    private String catelogName;
    private String groupName;
}
```



## 11.2 规格参数列表&规格修改

#### 11.2.1、获取分类规格参数

```java
/**
 * 获取分类规格参数
 	attrType 和 catelogId 通用
 * @param params 
 * @param catelogId
 * @param type  sale 销售属性 base 规格参数
 * @return
 */
@GetMapping("/{attrType}/list/{catelogId}")
public R baseAttrList(@RequestParam Map\<String,Object> params
        ,@PathVariable("catelogId") Long catelogId,
                      @PathVariable("attrType") String  type) {
    PageUtils page = attrService.queryBaseAttrPage(params,catelogId,type);
    return R.ok().put("page",page);
}
```

实现类

```java
 @Override
    public PageUtils queryBaseAttrPage(Map\<String, Object> params, Long catelogId, String type) {
        // 先根据 attr_type字段进行查询 该字段表示 1是基本属性 0是销售属性，基本属性和销售属性我们放在一张表内
        QueryWrapper\<AttrEntity> wrapper = new QueryWrapper\<AttrEntity>()
                .eq("attr_type","base".equalsIgnoreCase(type)?
                        ProductConstant.AttrEnum.ATTR_TYPE_BASE.getCode():
                        ProductConstant.AttrEnum.ATTR_TYPE_SALE.getCode());
        // 分类id不等于0 按照分类id进行查询
        if (catelogId != 0) {
            wrapper.eq("catelog_id",catelogId);
        }
        // 取出参数 key,进行条件查询
        String key = (String) params.get("key");
        if (!StringUtils.isEmpty(key)) {
            wrapper.and((wrapper1) -> {
                wrapper1.eq("attr_id",key).or().like("attr_name",key);
            });
        }
        // 封装分页数据
        IPage\<AttrEntity> page = this.page(
                new Query\<AttrEntity>().getPage(params),
                wrapper
        );

        PageUtils pageUtils = new PageUtils(page);

        // 拿到全部的分页记录
        List\<AttrEntity> records = page.getRecords();
        // 查询所属分类以及所属分组
        List\<AttrRespVo> respVo = records.stream().map((attrEntity) -> {
            // 实例化数据传输对象 将 attrEntity的分类名字以及分组名字 复制到该对象
            AttrRespVo attrRespVo = new AttrRespVo();
            BeanUtils.copyProperties(attrEntity, attrRespVo);
            // Controller地址如果是 基础 才进行查询分裂
            if("base".equalsIgnoreCase(type)){
                // 1、根据attr_id 查询到 attr和 attrGroup的关系表
                AttrAttrgroupRelationEntity attr_idEntity = relationDao.selectOne(new QueryWrapper\<AttrAttrgroupRelationEntity>()
                        .eq("attr_id", attrEntity.getAttrId()));
                //查询到的关系对象以及分组id不为空
                if (attr_idEntity != null && attr_idEntity.getAttrGroupId()!=null) {
                    // 根据分组id查询到分组信息
                    AttrGroupEntity attrGroupEntity = attrGroupDao.selectById(attr_idEntity.getAttrGroupId());
                    attrRespVo.setGroupName(attrGroupEntity.getAttrGroupName());
                }
            }
            // 根据attrEntity的分类id 查询到分类对象并设置分类姓名
            CategoryEntity categoryEntity = categoryDao.selectById(attrEntity.getCatelogId());
            if (categoryEntity != null) {
                attrRespVo.setCatelogName(categoryEntity.getName());
            }
            return attrRespVo;
        }).collect(Collectors.toList());
        //封装到分页工具类
        pageUtils.setList(respVo);
        return pageUtils;
    }
```

先是根据 `catelog_id`查询到`AttrEntity` 对象 该对象里拥有 `attr_id` 然后根据attr_id 去 `pms_attr_attrgroup_relation`表进行查询



#### 11.2.2、查询属性详情

![image-20201022154745658](http://qnimg.gisfsde.com/work/image-20201022154745658.png)

Controller

```java
/**
   * 信息
   */
  @RequestMapping("/info/{attrId}")
  public R info(@PathVariable("attrId") Long attrId){
AttrRespVo attr = attrService.getAttrInfo(attrId);

      return R.ok().put("attr", attr);
  }
```

Service 实现

```java
@Override
public AttrRespVo getAttrInfo(Long attrId) {
    // 实例化封装VO数据对象
    AttrRespVo attrRespVo = new AttrRespVo();
    // 根据attrid查询出商品属性
    AttrEntity attrEntity = this.getById(attrId);
    // 将商品属性对象的属性复制到 VO数据对象
    BeanUtils.copyProperties(attrEntity, attrRespVo);

    //  attrType == 1为基本类型才进行查询分组信息
    if (attrEntity.getAttrType() == ProductConstant.AttrEnum.ATTR_TYPE_BASE.getCode()) {
        // 根据 attr_id 查询到 商品属性以及商品分组关系表
        AttrAttrgroupRelationEntity relationEntity = relationDao.selectOne(new QueryWrapper\<AttrAttrgroupRelationEntity>()
                .eq("attr_id", attrId));
        if (relationEntity != null) {
            // 设置分组id
            attrRespVo.setAttrGroupId(relationEntity.getAttrGroupId());
            // 分组&商品信息关系表拿到分组id 查询到分组对象
            AttrGroupEntity attrGroupEntity = attrGroupDao.selectById(relationEntity.getAttrGroupId());
            if (attrGroupEntity != null) {
                //不为空设置分组姓名
                attrRespVo.setGroupName(attrGroupEntity.getAttrGroupName());
            }
        }
    }
    // 从当前商品属性对象中拿到分类id进行设置分类信息
    Long catelogId = attrEntity.getCatelogId();
    // 根据 catelogId 查询到分类 父 子 孙 路径
    Long[] catelogPath = categoryService.findCatelogPath(catelogId);
    attrRespVo.setCatelogPath(catelogPath);
    //最后根据分类id 查询到分类对象 并进行设置分类姓名
    CategoryEntity categoryEntity = categoryService.getById(catelogId);
    if (categoryEntity != null) {
        attrRespVo.setCatelogName(categoryEntity.getName());
    }
    return attrRespVo;
}
```

主要理解： 先是根据 `attrId` 查询到**商品属性**  然后根据 attrId 查询到**分类关系表** 该表中有分组id attrGroup_id 通过这个查询到 **分组对象信息**，

，同时在 商品属性表中拿到 分类id 通过**分类id 查询到 查询到分类对象** 同时根据 分类id查询对应层级关系，并设置**分类姓名**

#### 11.3.3、销售属性

![image-20201022155557579](http://qnimg.gisfsde.com/work/image-20201022155557579.png)

销售属性 和 基本属性 通过一个字段来区分，对应的修改，查询 都用的同一个方法，所以在方法的中 也进行了对应的判断

保存

```java
@Override
public void saveAttr(AttrVo attr) {
    AttrEntity attrEntity = new AttrEntity();
    BeanUtils.copyProperties(attr, attrEntity);
    // 保存基本数据
    this.save(attrEntity);

    // 2、保存关联关系
    // 等于1 说明基本属性 才进行保存分组关系
    if (attr.getAttrType() == ProductConstant.AttrEnum.ATTR_TYPE_BASE.getCode() && attr.getAttrGroupId() != null) {
        AttrAttrgroupRelationEntity relationEntity = new AttrAttrgroupRelationEntity();
        relationEntity.setAttrGroupId(attr.getAttrGroupId());
        relationEntity.setAttrId(attrEntity.getAttrId());
        relationDao.insert(relationEntity);
    }

}
```

修改

```java
 @Transactional
    @Override
    public void updateAttr(AttrVo attr) {
        // Vo数据传输对象属性拷贝到 attrEntity对象
        AttrEntity attrEntity = new AttrEntity();
        BeanUtils.copyProperties(attr, attrEntity);
        this.updateById(attrEntity);

        // attrType 等于 1 也就是基本属性
        if (attrEntity.getAttrType() == ProductConstant.AttrEnum.ATTR_TYPE_BASE.getCode()) {
            //1、修改分组关联
            AttrAttrgroupRelationEntity relationEntity = new AttrAttrgroupRelationEntity();
            // 设置attrid 以及 分组id
            relationEntity.setAttrId(attr.getAttrId());
            relationEntity.setAttrGroupId(attr.getAttrGroupId());
            // 关系表中根据attr_id 进行更新
            relationDao.update(relationEntity, new UpdateWrapper\<AttrAttrgroupRelationEntity>().
                    eq("attr_id", attr.getAttrId()));
            // 根据 attr_id 是否可以查询到结果
            Integer count = relationDao.selectCount(new QueryWrapper\<AttrAttrgroupRelationEntity>().
                    eq("attr_id", attr.getAttrId()));
            
            // 查得到
            if (count > 0) {
                // 进行更新
                relationDao.update(relationEntity, new UpdateWrapper\<AttrAttrgroupRelationEntity>().
                        eq("attr_id", attr.getAttrId()));
            } else {
                // 查不到意味着 没有该记录 则进行插入
                relationDao.insert(relationEntity);
            }

        }

    }
```

## 11.3 查询分类关联属性&删除关联&查询分组未关联属性

#### 11.3.1、获取属性分组的关联的所有属性

```java
/**
 * 获取属性分组的关联的所有属性
 * @param attrgroupId
 * @return
 */
@GetMapping("/{attrgroupId}/attr/relation")
public R attrRelation(@PathVariable("attrgroupId") Long attrgroupId) {
    List\<AttrEntity> entityList = attrService.getRelationAttr(attrgroupId);

    return R.ok().put("data", entityList);
}
```

Service 实现

```java
/**
 * 根据分组id查找关联的所有基本属性
 * @param attrgroupId
 * @return
 */
@Override
public List\<AttrEntity> getRelationAttr(Long attrgroupId) {
    // 根据attr_group_id 查询到 关系表
    List\<AttrAttrgroupRelationEntity> entities = relationDao.selectList(new QueryWrapper\<AttrAttrgroupRelationEntity>()
            .eq("attr_group_id", attrgroupId));

    // 从关系表中 取到 属性id
    List\<Long> attrIds = entities.stream().map((attr) -> {
        return attr.getAttrId();
    }).collect(Collectors.toList());
    if (attrIds == null || attrIds.size() == 0) {
        return null;
    }

    // 按照属性id进行查询
    Collection\<AttrEntity> attrEntities = this.listByIds(attrIds);
    return (List\<AttrEntity>) attrEntities;
}
```

![image-20201022161654834](http://qnimg.gisfsde.com/work/image-20201022161654834.png)

已知有参数 attr_group_id 进行查询 能查到 attr_id,在利用 attr_id 查询到 attr相关信息



#### 11.3.2、删除属性与分组的关联关系

![image-20201022162103501](http://qnimg.gisfsde.com/work/image-20201022162103501.png)

```java
/**
 * 删除属性与分组的关联关系
 * @param relationVo
 * @return
 */
@PostMapping("/attr/relation/delete")
public R deleteRelation(@RequestBody AttrGroupRelationVo[] relationVo) {
    attrService.deleteRelation(relationVo);
    return R.ok();
}
```

Service 实现

```java
 @Override
    public void deleteRelation(AttrGroupRelationVo[] relationVo) {

        // 转成 list 进行stream流处理
        List\<AttrAttrgroupRelationEntity> entities = Arrays.asList(relationVo).stream().map((item) -> {
            // 将 item对应属性拷贝到 relationEntity对象中
            AttrAttrgroupRelationEntity relationEntity = new AttrAttrgroupRelationEntity();
            BeanUtils.copyProperties(item, relationEntity);
            return relationEntity;
        }).collect(Collectors.toList());
        // id批量删除
        relationDao.deleteBatchRelation(entities);

    }
```

deleteBatchRelation 方法

```xml
\<delete id="deleteBatchRelation">
    DELETE FROM `pms_attr_attrgroup_relation` WHERE 
    \<!- 循环遍历进行删除 使用的是 or-->
    \<foreach collection="entities" item="item" separator=" OR ">
        ( attr_id=#{item.attrId} AND attr_group_id=#{item.attrGroupId} )
    \</foreach>
\</delete>
```



#### 11.3.3、查询分组未关联属性

```java
@GetMapping("/{attrgroupId}/noattr/relation")
public R attrNoRelation(@PathVariable("attrgroupId") Long attrgroupId,
                        @RequestParam Map\<String, Object> params) {
    PageUtils page = attrService.getNoRelationAttr(params,attrgroupId);
    return R.ok().put("page",page);
}
```

Service

```java
@Override
public PageUtils getNoRelationAttr(Map\<String, Object> params, Long attrgroupId) {
    // 1、当前分组只能关联自己所属分类里面的所有属性
    AttrGroupEntity attrGroupEntity = attrGroupDao.selectById(attrgroupId);
    Long catelogId = attrGroupEntity.getCatelogId();

    //2、当前分组只能关联别的分组没有引用的属性
    //2.1 当前分类下的 **其他分组** 根据分类id进行查询
    List\<AttrGroupEntity> group = attrGroupDao.selectList(new QueryWrapper\<AttrGroupEntity>()
            .eq("catelog_id", catelogId));
    // 拿到分组id
    List\<Long> collect = group.stream().map(item -> {
        return item.getAttrGroupId();
    }).collect(Collectors.toList());

    //2.2 这些分组关联的属性  根据分组id查询出关联表
    List\<AttrAttrgroupRelationEntity> groupId = relationDao.selectList(new QueryWrapper\<AttrAttrgroupRelationEntity>()
            .in("attr_group_id", collect));
    // 拿到所有的属性id
    List\<Long> attrIds = groupId.stream().map((item) -> {
        return item.getAttrId();
    }).collect(Collectors.toList());

    //2.3 从当前分类的所有属性中移除这些属性
    QueryWrapper\<AttrEntity> wrapper = new QueryWrapper\<AttrEntity>()
            .eq("catelog_id", catelogId)
            .eq("attr_type", ProductConstant.AttrEnum.ATTR_TYPE_BASE.getCode());

    // attrIds 属性id数组不为空
    if (attrIds != null && attrIds.size() > 0) {
        // 在attrids 数组中得id不用进行查询
        wrapper.notIn("attr_id", attrIds);
    }
    //取出参数进行 对应条件查询
    String key = (String) params.get("key");
    if (!StringUtils.isEmpty(key)) {
        wrapper.and((w) -> {
            w.eq("attr_id", key).or().like("attr_name", key);
        });
    }
    // 根据分页数据 以及 wrapper进行查询
    IPage\<AttrEntity> page = this.page(new Query\<AttrEntity>().getPage(params), wrapper);
    PageUtils pageUtils = new PageUtils(page);
    return pageUtils;
}
```

#### 11.4.4、新增分组与属性关联

```java
@PostMapping("/attr/relation")
public  R addRelation(@RequestBody List\<AttrGroupRelationVo> attrGroupRelationVo) {
    attrAttrgroupRelationService.saveBatch(attrGroupRelationVo);
    return R.ok();
}
```

Service

```java
@Override
public void saveBatch(List\<AttrGroupRelationVo> attrGroupRelationVo) {
    List\<AttrAttrgroupRelationEntity> collect = attrGroupRelationVo.stream().map((item) -> {
        // 复制属性 返回
        AttrAttrgroupRelationEntity relationEntity = new AttrAttrgroupRelationEntity();
        BeanUtils.copyProperties(item, relationEntity);
        return relationEntity;
    }).collect(Collectors.toList());
    this.saveBatch(collect);
}
```

业务之间需要多种测试 各种判断 	



# 十、商品服务&新增商品



## 12.1 获取分类关联的品牌

前端发送请求

后端编写：

Controller

```java
/**
 *  获取分类关联的品牌
 * @param catId
 * @return
 */
@GetMapping("/brands/list")
public R relationBrandList(@RequestParam(value = "catId",required = true) Long catId) {

    List\<BrandEntity> vos = categoryBrandRelationService.getBrandCatId(catId);
    //拿到 品牌对象数据后 从中抽取除 品牌姓名和id
    List\<BrandVo> collect = vos.stream().map(item -> {
        BrandVo brandVo = new BrandVo();
        brandVo.setBrandId(item.getBrandId());
        brandVo.setBrandName(item.getName());
        return brandVo;
    }).collect(Collectors.toList());
    return R.ok().put("data",collect);
}
```

Service实现

```java
@Override
public List\<BrandEntity> getBrandCatId(Long catId) {
    // 根据分类id查询出 分类和品牌的关系表
    List\<CategoryBrandRelationEntity> catelogId = categoryBrandRelationDao.selectList(new QueryWrapper\<CategoryBrandRelationEntity>().eq("catelog_id", catId));

    List\<BrandEntity> collect = catelogId.stream().map(item -> {
        //根据品牌id查询出品牌对象
        BrandEntity brandEntity = brandDao.selectById(item.getBrandId());
        return brandEntity;
    }).collect(Collectors.toList());

    return collect;
}
```

> 总结：

业务操作设计两个表

- pms_brand
- pms_category_brand_relation

请求参数是 CatId Long类型

- 先根据 CatId 在 pms_category_brand_relation表中查询到品牌 Id 
- 拿到 brand_id 查询出 brand 的相关信息
- 组装成 BrandVo 后 返回

![image-20201023052748618](http://qnimg.gisfsde.com/work/image-20201023052748618.png)







## 12.2 获取分类下所有分组以及属性

![image-20201023072959266](http://qnimg.gisfsde.com/work/image-20201023072959266.png)

基本信息输入成功后，就会跳转到规格参数，

并根据分类id查询出对应数据

![image-20201023073041272](http://qnimg.gisfsde.com/work/image-20201023073041272.png)



Controller

```java
/**
 *  获取分类下所有分组&关联属性
 * @param catelogId
 * @return
 */
@RequestMapping("/{catelogId}/withattr")
public R getAttrGroupWithAttrs(@PathVariable("catelogId") Long catelogId)   {
    List\<AttrGroupWithAttrsVo> vos = attrGroupService.getAttrGroupWithAttrsByCatelogId(catelogId);
    return R.ok().put("data",vos);
}
```

Service 实现

```java
@Override
public List\<AttrGroupWithAttrsVo> getAttrGroupWithAttrsByCatelogId(Long catelogId) {
    // 1、根据分类id查询出 查询分组关系
    List\<AttrGroupEntity> attrgroupEntites = this.list(new QueryWrapper\<AttrGroupEntity>().eq("catelog_id", catelogId));

    List\<AttrGroupWithAttrsVo> collect = attrgroupEntites.stream().map(group -> {
        AttrGroupWithAttrsVo attrsVo = new AttrGroupWithAttrsVo();
        // 2、将分组属性拷贝到 VO中
        BeanUtils.copyProperties(group, attrsVo);

        // 3、通过分组id查询出 商品属性信息
        // 调用 getRelationAttr方法先根据 分组id去 中间关系表查询到商品属性id 然后根据商品属性id查询到商品信息
        List\<AttrEntity> relationAttr = attrService.getRelationAttr(attrsVo.getAttrGroupId());
        attrsVo.setAttrs(relationAttr);
        return attrsVo;
    }).collect(Collectors.toList());

    return collect;
}
```



## 12.3 商品 VO 抽取&商品新增业务流程

商品属性、销售属性、规格参数、基本信息都填好了后就会生成一串 JSON

![image-20201023080411308](http://qnimg.gisfsde.com/work/image-20201023080411308.png)

我们将 json 放到 json解析网站上 并生成对应得实体类

![image-20201023080500520](http://qnimg.gisfsde.com/work/image-20201023080500520.png)

### 12.3.4 封装 Vo 中，更改对应得属性

![image-20201023081250886](http://qnimg.gisfsde.com/work/image-20201023081250886.png)

有些参与计算的属性 如 int price 将类型更改为 BigDecimal 

### 12.3.5 分析业务流程

> 业务流程:

![image-20201024112115137](http://qnimg.gisfsde.com/work/image-20201024112115137.png)

### 12.3.6 主要编码！

```java
@Transactional
@Override
public void saveSpuInfo(SpuSaveVo vo) {

    // 1、保存Spu基本信息  pms_spu_info
    SpuInfoEntity spuInfoEntity = new SpuInfoEntity();
    BeanUtils.copyProperties(vo,spuInfoEntity);
    spuInfoEntity.setCreateTime(new Date());
    spuInfoEntity.setUpdateTime(new Date());

    this.saveBaseSpuInfo(spuInfoEntity);
    // 2、保存Spu的描述信息  pms_spu_info_desc
    List\<String> decript = vo.getDecript();
    SpuInfoDescEntity spuInfoDescEntity = new SpuInfoDescEntity();
    // SpuInfoEntity保存到取得 spuId 设置到 Desc中
    spuInfoDescEntity.setSpuId(spuInfoEntity.getId());
    // 以逗号来拆分
    spuInfoDescEntity.setDecript(String.join(",",decript));
    spuInfoDescService.saveSpuInfoDesc(spuInfoDescEntity);

    // 3、保存Spu的图片集 pms_spu_images
    List\<String> imageList = vo.getImages();
    spuImagesService.saveImages(spuInfoEntity.getId(),imageList);

    // 4、保存spu的规格参数 pms_product_attr_value
    List\<BaseAttrs> baseAttrs = vo.getBaseAttrs();
    List\<ProductAttrValueEntity> collect = baseAttrs.stream().map(attr -> {
        // 设置 spu 属性值
        ProductAttrValueEntity valueEntity = new ProductAttrValueEntity();
        valueEntity.setAttrId(attr.getAttrId());
        AttrEntity attrEntity = attrService.getById(attr.getAttrId());
        valueEntity.setAttrName(attrEntity.getAttrName());
        valueEntity.setSpuId(spuInfoEntity.getId());
        valueEntity.setQuickShow(attr.getShowDesc());
        valueEntity.setAttrValue(attr.getAttrValues());
        return valueEntity;
    }).collect(Collectors.toList());
    attrValueService.saveProductAttr(collect);


    // 5、保存SPU的积分信息 gulimall_sms sms => sms_spu_bounds
    Bounds bounds = vo.getBounds();
    SpuBoundTo spuBoundTo = new SpuBoundTo();
    BeanUtils.copyProperties(bounds,spuBoundTo);
    spuBoundTo.setSpuId(spuInfoEntity.getId());
    // 远程服务调用
    R r = couponFeignService.saveSpuBounds(spuBoundTo);
    if (r.getCode() != 0) {
        log.error("远程保存优惠信息失败");
    }


    // 5、保存当前Spu对应的所有SKU信息
    List\<Skus> skus = vo.getSkus();
    if (skus != null && skus.size() > 0) {
        // 遍历 skus 集合
        skus.forEach(item ->{
            String defaultImage = "";
            // 遍历 skus 集合中的图片 
            for (Images image : item.getImages()) {
                // 默认图片等于 1 该记录则是默认图片
                if (image.getDefaultImg() == 1) {
                    defaultImage = image.getImgUrl();
                }
            }
            // private String skuName;
            //    private String price;
            //    private String skuTitle;
            //    private String skuSubtitle;
            // 只有上面4个属性相同
            SkuInfoEntity skuInfoEntity = new SkuInfoEntity();
            BeanUtils.copyProperties(item,skuInfoEntity);
            // 其他属性需要自己赋值
            skuInfoEntity.setBrandId(spuInfoEntity.getBrandId());
            skuInfoEntity.setCatalogId(spuInfoEntity.getCatalogId());
            skuInfoEntity.setSaleCount(0L);
            skuInfoEntity.setSpuId(spuInfoDescEntity.getSpuId());
            skuInfoEntity.setSkuDefaultImg(defaultImage);
            //5.1、SKU的基本信息 pms_sku_info
            skuInfoService.saveSkuInfo(skuInfoEntity);

            Long skuId = skuInfoEntity.getSkuId();

            // 保存 sku 图片信息
            List\<SkuImagesEntity> imagesEntities = item.getImages().stream().map(img -> {
                SkuImagesEntity skuImagesEntity = new SkuImagesEntity();
                skuImagesEntity.setSkuId(skuId);
                skuImagesEntity.setImgUrl(img.getImgUrl());
                skuImagesEntity.setDefaultImg(img.getDefaultImg());

                return skuImagesEntity;
            }).filter(entity ->{
                //返回 true 需要 false 过滤
                return !StringUtils.isEmpty(entity.getImgUrl());
            }).collect(Collectors.toList());

            // TODO 没有图片路径的无需保存
            //5.2、SKU的图片信息 pms_sku_images
            skuImagesService.saveBatch(imagesEntities);


            List\<Attr> attr = item.getAttr();
            // 保存 sku 销售属性
            List\<SkuSaleAttrValueEntity> skuSaleAttrValueEntities = attr.stream().map(a -> {
                SkuSaleAttrValueEntity skuSaleAttrValueEntity = new SkuSaleAttrValueEntity();
                BeanUtils.copyProperties(a, skuSaleAttrValueEntity);
                skuSaleAttrValueEntity.setSkuId(skuId);

                return skuSaleAttrValueEntity;
            }).collect(Collectors.toList());
            //5.3、SKU的销售属性信息 pms_sku_sale_attr_value
            saleAttrValueService.saveBatch(skuSaleAttrValueEntities);

            //5.4、SKU的优惠、满减等信息 gulimall_sms ->sms_sku_ladder \sms_sku_full_reduction\sms_member_price

            SkuReductionTo skuReductionTo = new SkuReductionTo();
            BeanUtils.copyProperties(item,skuReductionTo);
            skuReductionTo.setSkuId(skuId);
            if (skuReductionTo.getFullCount() > 0 || skuReductionTo.getFullPrice().compareTo(new BigDecimal("0")) == 1) {
                R r1 = couponFeignService.saveSkuReduction(skuReductionTo);
                if (r1.getCode() != 0) {
                    log.error("远程保存sku优惠信息失败");
                }
            }
        });
    }
}
```

saveImages

```java
@Override
public void saveImages(Long id, List\<String> imageList) {
    if (imageList == null || imageList.size() \<=0) {
        log.error("图片为空！！！！！！");
    } else {
        List\<SpuImagesEntity> collect = imageList.stream().map(img -> {
            SpuImagesEntity entity = new SpuImagesEntity();
            // 设置主要属性 
            entity.setSpuId(id);
            entity.setImgUrl(img);

            return entity;
        }).collect(Collectors.toList());
        this.saveBatch(collect );
    }

}
```

远程服务调用 对应方法

保存了 **商品阶梯价格**、**商品满减信息**、**商品会员价格**

```java
@Override
public void saveSkuReduction(SkuReductionTo skuReductionTo) {

    //5.4、SKU的优惠、满减等信息 gulimall_sms ->sms_sku_ladder \sms_sku_full_reduction\sms_member_price

    //sms_sku_ladder
    SkuLadderEntity skuLadderEntity = new SkuLadderEntity();
    skuLadderEntity.setSkuId(skuReductionTo.getSkuId());
    skuLadderEntity.setFullCount(skuReductionTo.getFullCount());
    skuLadderEntity.setAddOther(skuReductionTo.getCountStatus());
    skuLadderEntity.setDiscount(skuReductionTo.getDiscount());
    if (skuLadderEntity.getFullCount() > 0) {
        skuLadderService.save(skuLadderEntity);
    }


    //sms_sku_full_reduction
    SkuFullReductionEntity skuFullReductionEntity = new SkuFullReductionEntity();
    BeanUtils.copyProperties(skuReductionTo,skuFullReductionEntity);
    // BigDecimal 用 compareTo来比较
    if (skuFullReductionEntity.getFullPrice().compareTo(new BigDecimal("0")) == 1) {

        this.save(skuFullReductionEntity);
    }

    //sms_member_price

    List\<MemberPrice> memberPrice = skuReductionTo.getMemberPrice();

    List\<MemberPriceEntity> collect = memberPrice.stream().map(item -> {
        MemberPriceEntity priceEntity = new MemberPriceEntity();
        priceEntity.setSkuId(skuReductionTo.getSkuId());
        priceEntity.setMemberPrice(item.getPrice());
        priceEntity.setMemberLevelName(item.getName());
        priceEntity.setMemberLevelId(item.getId());
        priceEntity.setAddOther(1);
        return priceEntity;
    }).filter(item -> {
        // 会员对应价格等于0 过滤掉
        return item.getMemberPrice().compareTo(new BigDecimal("0")) == 1;
    }).collect(Collectors.toList());

    memberPriceService.saveBatch(collect);

}
```

### **12.3.7 总结**

- 电商系统中大表数据不做关联 宁可一点一点查询
- 商品新增业务，眨眼一看很多代码，但是如果把他们划分成几个功能点一一完成，业务也就不会变得很庞大

相关操作的表

![image-20201024113618961](http://qnimg.gisfsde.com/work/image-20201024113618961.png)

### 12.3.8 商品保存后 Debug 调试

很少有一次写的代码能一次通过，所以我们要 一个功能点一个断点来调试程序是否正确

```mysql
# 将当前会话等级设置成读为提交，当前窗口就能查看到没有提交的数据
SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
```

具体 Debug 过程不在此叙述

### 12.3.9 商品保存其他问题处理

####   1、   `sku_images` 表中 img_url 字段为空

`sku_images` 中有很多图片都是为空，因此我们需要在程序中处理这个数据，空数据不写入到数据库中

![image-20201024114238060](http://qnimg.gisfsde.com/work/image-20201024114238060.png)

**解决思路：**

`skuImages` 保存部分代码、如果 `ImgUrl` 为空则进行过滤

```java
}).filter(entity ->{
    //返回 true 需要 false 过滤
    return !StringUtils.isEmpty(entity.getImgUrl());
}).collect(Collectors.toList());
```



#### 2、sku 满减以及打折信息 数据出现错误

有部分数据 为0

![image-20201024114652266](http://qnimg.gisfsde.com/work/image-20201024114652266.png)

解决思路：

在代码中过滤对应为0的数据

部分修改代码

```java
// 满几件 大于0 可以添加  满多少钱 至少要大于0
if (skuReductionTo.getFullCount() > 0 || skuReductionTo.getFullPrice().compareTo(new BigDecimal("0")) == 1) {
    R r1 = couponFeignService.saveSkuReduction(skuReductionTo);
    if (r1.getCode() != 0) {
        log.error("远程保存sku优惠信息失败");
    }
}
```

远程服务中也进行对应修改

```java
/**
保存 商品阶梯价格
件数 大于0才能进行修改
**/
if (skuLadderEntity.getFullCount() > 0) {
    skuLadderService.save(skuLadderEntity);
}
/**
保存商品满减信息
**/
  // BigDecimal 用 compareTo来比较
if (skuFullReductionEntity.getFullPrice().compareTo(new BigDecimal("0")) == 1) {

	this.save(skuFullReductionEntity);
}
/**
保存商品会员价格
也进行了过滤数据
**/
 }).filter(item -> {
            // 会员对应价格等于0 过滤掉
            return item.getMemberPrice().compareTo(new BigDecimal("0")) == 1;
        }).collect(Collectors.toList());
```

#### 3、程序中其他的异常

程序中总会出现一些其他的异常的，这个留到高级篇进行讲解



# 十一、 商品服务&商品管理

## SPU SKU



## 11.1 商品管理 SPU 检索

**功能概述：**

- 查询刚刚发布的商品，并能进行对应的条件查询

![image-20201024061157844](http://qnimg.gisfsde.com/work/image-20201024061157844.png)

Controller

```java
/**
     * 列表
     */
    @RequestMapping("/list")
    //@RequiresPermissions("product:spuinfo:list")
    public R list(@RequestParam Map\<String, Object> params){
        PageUtils page = spuInfoService.queryPageByCondition(params);

        return R.ok().put("page", page);
    }
```

Service 实现

```java
/**
 * 根据条件进行查询 spu相关信息
 * @param params 分页参数  status上架状态，catelogId 分类id brandId 品牌id
 * @return
 */
@Override
public PageUtils queryPageByCondition(Map\<String, Object> params) {
    QueryWrapper\<SpuInfoEntity> wrapper = new QueryWrapper\<>();

    // 取出参数 key 进行查询
    String key = (String) params.get("key");
    if (!StringUtils.isEmpty(key)) {
        wrapper.and((w) ->{
            w.eq("id","key").or().like("spu_name",key);
        });
    }

    // 验证不为空 取出参数进行 查询
    String status = (String) params.get("status");
    if (!StringUtils.isEmpty(status)) {
        wrapper.eq("publish_status",status);
    }
    String brandId = (String) params.get("brandId");
    if (!StringUtils.isEmpty(brandId)  && ! "0".equalsIgnoreCase(brandId)) {
        wrapper.eq("brand_id",brandId);
    }

    String catelogId = (String) params.get("catelogId");
    if (!StringUtils.isEmpty(catelogId) && ! "0".equalsIgnoreCase(catelogId)) {
        wrapper.eq("catalog_id",catelogId);
    }

    IPage\<SpuInfoEntity> page = this.page(
            new Query\<SpuInfoEntity>().getPage(params),
            wrapper);

    return new PageUtils(page);
}
```

**总结业务流程**

- 主要查询的是 `pms_spu_info` 这张表 前端传递过来的参数 主要有分页，以及 品牌id 分类id  我们需要判断这些值是否正确，然后进行查询数据



## 11.2 商品管理 SkU 检索

**功能概述：**

查询具体的商品管理 库存 

![image-20201024061836312](http://qnimg.gisfsde.com/work/image-20201024061836312.png)

Controller

```
/**
 * 列表
 */
@RequestMapping("/list")
//@RequiresPermissions("product:skuinfo:list")
public R list(@RequestParam Map\<String, Object> params){
    PageUtils page = skuInfoService.queryPageByCondition(params);

    return R.ok().put("page", page);
}
```

Service

```java
@Override
public PageUtils queryPageByCondition(Map\<String, Object> params) {

    QueryWrapper\<SkuInfoEntity> wrapper = new QueryWrapper\<>();

    // 取出参数 进行查询
    String key = (String) params.get("key");
    if (!StringUtils.isEmpty(key)) {
        wrapper.and((w) ->{
            w.eq("sku_id",key).or().like("sku_name",key);
        });
    }

    // 验证 id 是否为0 否则进行匹配
    String catelogId = (String) params.get("catelogId");
    if (!StringUtils.isEmpty(catelogId) && !"0".equalsIgnoreCase(catelogId)) {
        wrapper.eq("catalog_id",catelogId);
    }
    String brandId = (String) params.get("brandId");
    if (!StringUtils.isEmpty(brandId) && !"0".equalsIgnoreCase(brandId)) {
        wrapper.eq("brand_id",brandId);
    }
    String min = (String) params.get("min");
    if (!StringUtils.isEmpty(min)) {
        wrapper.ge("price",min);
    }
    String max = (String) params.get("max");

    if (!StringUtils.isEmpty(max) ) {
        // 怕前端传递的数据是 abc 等等 所以要抛出异常
        try {
            BigDecimal bigDecimal = new BigDecimal(max);
            if ( bigDecimal.compareTo(new BigDecimal("0")) == 1) {
                wrapper.le("price",max);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    IPage\<SkuInfoEntity> page = this.page(
            new Query\<SkuInfoEntity>().getPage(params),
            wrapper
    );

    return new PageUtils(page);
}
```

**总结业务流程：**

主要查询是 `pms_sku_info` 这张表，我出现的问题是发布商品时候，实体类的 价格 与 VO属性不一致，出现了数据没有拷贝，修改后，数据查询正常



# 十二、仓储服务&仓库管理

## 14.1 整合ware服务&获取仓库列表

### 14.1.1整合 ware 服务

1、首先服务需要先注册到 Nacos 中，需要自己配置文件 配置对应的 nacos注册地址，

2、启动类需要开启 服务注册发现，开启远程服务调用

```java
@EnableFeignClients // 开启openfeign 远程服务调用
@EnableTransactionManagement //开启事务
@MapperScan("com.atguigu.gulimall.ware.dao") //mapper包扫描
@EnableDiscoveryClient //服务注册发现
```

### 14.1.2 获取仓库列表

**具体需求：**

根据参数名查询出 仓库相关的记录 ，具体对于操作的是`wms_ware_info` 表

![](http://qnimg.gisfsde.com/work/image-20201024121842147.png)



Controller

```java
/**
 * 列表
 */
@RequestMapping("/list")
//@RequiresPermissions("ware:wareinfo:list")
public R list(@RequestParam Map\<String, Object> params){
    PageUtils page = wareInfoService.queryPage(params);

    return R.ok().put("page", page);
}
```

Service

```java
@Override
public PageUtils queryPage(Map\<String, Object> params) {
    QueryWrapper\<WareInfoEntity> wrapper = new QueryWrapper\<>();

    // 取出参数
    String key = (String)params.get("key");
    // 拼接条件
    if (!StringUtils.isEmpty(key)) {
        wrapper.eq("id",key).or()
                .like("name",key)
                .eq("address",key)
                .eq("areacode",key);
    }
    IPage\<WareInfoEntity> page = this.page(
            new Query\<WareInfoEntity>().getPage(params),
            wrapper
    );

    return new PageUtils(page);
}
```

**总结业务流程**

仓库维护对应的是 `wms_ware_info` 根据前端传递过来的参数进行拼接然后进行查询



## 14.2 查询库存&创建采购需求

### 14.2.1 查询库存

**具体需求：**

根据 **仓库、skuId** 进行查询对应的表是 wms_ware_sku 

![image-20201024122540156](http://qnimg.gisfsde.com/work/image-20201024122540156.png)

Controller

```java
/**
 * 列表
 */
@RequestMapping("/list")
//@RequiresPermissions("ware:waresku:list")
public R list(@RequestParam Map\<String, Object> params){
    PageUtils page = wareSkuService.queryPage(params);

    return R.ok().put("page", page);
}
```

Service

```java
@Override
public PageUtils queryPage(Map\<String, Object> params) {
    QueryWrapper\<WareSkuEntity> queryWrapper = new QueryWrapper\<>();

    // 取出请求的参数 组装条件进行查询
    String skuId = (String) params.get("skuId");
    if (!StringUtils.isEmpty(skuId)) {
        queryWrapper.eq("sku_id",skuId);
    }
    String wareId = (String) params.get("wareId");
    if (!StringUtils.isEmpty(wareId)) {
        queryWrapper.eq("ware_id",wareId);
    }

    IPage\<WareSkuEntity> page = this.page(
            new Query\<WareSkuEntity>().getPage(params),
            queryWrapper
    );

    return new PageUtils(page);
}
```

**总结业务流程：**

`wms_ware_sku` 主要的操作的就是该表 一样的封装条件，然后进行查询



### 14.2.2 创建采购需求

**具体需求：**

选择 仓库、状态、 以及其他关键字 查询出对应的数据 那么查询的是哪张表？ `wms_purchase_detail`

![image-20201024125311832](http://qnimg.gisfsde.com/work/image-20201024125311832.png)

Controller

如往常一样 调用 `Service` 返回结果 组装 返回~~~

```java
/**
 * 列表
 */
@RequestMapping("/list")
//@RequiresPermissions("ware:purchasedetail:list")
public R list(@RequestParam Map\<String, Object> params){
    PageUtils page = purchaseDetailService.queryPage(params);

    return R.ok().put("page", page);
}
```

Service

```java
/**
 *  //   status: 0,//状态
 *         //   wareId: 1,//仓库id
 * @param params
 * @return
 */
@Override
public PageUtils queryPage(Map\<String, Object> params) {
    QueryWrapper\<PurchaseDetailEntity> wrapper = new QueryWrapper\<>();

    // 取出key
    String key = (String) params.get("key");
    // key 主要查询条件 
    if (!StringUtils.isEmpty(key)) {
        wrapper.and((w) ->{
            w.eq("purchase_id",key).or().eq("sku_id",key);
        });
    }

    String status = (String) params.get("status");
    if (!StringUtils.isEmpty(status)) {
        wrapper.and((w) ->{
            w.eq("status",status);
        });
    }
    String wareId = (String) params.get("wareId");
    if (!StringUtils.isEmpty(wareId)) {
        wrapper.and((w) ->{
            w.eq("ware_id",wareId);
        });
    }

    IPage\<PurchaseDetailEntity> page = this.page(
            new Query\<PurchaseDetailEntity>().getPage(params),
            wrapper
    );

    return new PageUtils(page);
}
```

**总结业务流程：**

对 `wms_purchase_detail` 表进行操作  拼装条件  查询 嗯 就这样~~~



## 14.3 合并采购需求&领取采购单&完成采购&Spu规格维护

### 14.3.1 合并采购需求

**具体需求：**

![](http://qnimg.gisfsde.com/work/image-20201024131822802.png)

选中 点击批量操作

![image-20201024132207468](http://qnimg.gisfsde.com/work/image-20201024132207468.png)

请求参数分享

```java
{
  purchaseId: 1, //整单id
  items:[1,2,3,4] //合并项集合
}
```

那就建立对应的 Vo 用来接收请求参数

Controller

```java
/**
 * 合并采购
 * @param mergeVo
 * @return
 */
///ware/purchase/merge
@PostMapping("/merge")
public R merge(@RequestBody MergeVo mergeVo) {
    purchaseService.mrgePurchase(mergeVo);

    return R.ok();
}
```

Service

```java
/**
 * 合并采购需求
 * @param mergeVo
 */
@Transactional
@Override
public void mrgePurchase(MergeVo mergeVo) {
    // 拿到采购单id
    Long purchaseId = mergeVo.getPurchaseId();
    // 采购单 id为空 新建
    if (purchaseId == null ) {
        PurchaseEntity purchaseEntity = new PurchaseEntity();
        // 状态设置为新建
        purchaseEntity.setStatus(WareConstant.PurchaseStatusEnum.CREATED.getCode());
        purchaseEntity.setCreateTime(new Date());
        purchaseEntity.setUpdateTime(new Date());
        this.save(purchaseEntity);
        // 拿到最新的采购单id
        purchaseId = purchaseEntity.getId();
    }
    //TODO 确认采购是 0 或 1 才可以合并

    // 拿到合并项 **采购需求的id**
    List\<Long> items = mergeVo.getItems();
    Long finalPurchaseId = purchaseId;
    List\<PurchaseDetailEntity> collect = items.stream().map(i -> {
        // 采购需求
        PurchaseDetailEntity detailEntity = new PurchaseDetailEntity();

        // 通过采购单id 查询到 采购信息对象
        PurchaseEntity byId = this.getById(finalPurchaseId);
        // 状态如果是正在采购
        if (! (byId.getStatus() == WareConstant.PurchaseDetailStatusEnum.BUYING.getCode())) {
            // 设置为已分配
            detailEntity.setStatus(WareConstant.PurchaseDetailStatusEnum.HASERROR.getCode());
        }

        detailEntity.setId(i);
        // 设置采购单id
        detailEntity.setPurchaseId(finalPurchaseId);

        return detailEntity;
    }).collect(Collectors.toList());

    // id批量更新
    purchaseDetailService.updateBatchById(collect);

    // 再次合并的话 更新修改时间
    PurchaseEntity purchaseEntity = new PurchaseEntity();
    purchaseEntity.setId(purchaseId);
    purchaseEntity.setUpdateTime(new Date());
    this.updateById(purchaseEntity);
}
```

**总结业务流程:**

- 从 参数 mergeVo中取出 purchaseId 和 items 进行相关操作 
- 主要是用来操作两张表 `wms_purchase` 和 `wms_purchase_detail` 
- `wms_purchase` 表是 采购信息
- `wms_purchase_detail` 表是 采购需求
- 我的理解是将 `wms_purchase` 的id插入到 `wms_purchase_detail` 表中 也就是 purchase_id 字段，中间通过这个字段关联起来，同时 `wms_purchase` 表对 status 状态有比较多的选择，视频里面也是定义了两个常量

```java
public class WareConstant {
    public enum  PurchaseStatusEnum{
        CREATED(0,"新建"),ASSIGNED(1,"已分配"),
        RECEIVE(2,"已领取"),FINISH(3,"已完成"),
        HASERROR(4,"有异常");
        private int code;
        private String msg;
        PurchaseStatusEnum(int code,String msg) {
            this.code = code;
            this.msg = msg;
        }

        public int getCode() {
            return code;
        }

        public void setCode(int code) {
            this.code = code;
        }

        public String getMsg() {
            return msg;
        }

        public void setMsg(String msg) {
            this.msg = msg;
        }
    }
    public enum  PurchaseDetailStatusEnum{
        CREATED(0,"新建"),ASSIGNED(1,"已分配"),
        BUYING(2,"正在采购"),FINISH(3,"已完成"),
        HASERROR(4,"采购失败");
        private int code;
        private String msg;
        PurchaseDetailStatusEnum(int code,String msg) {
            this.code = code;
            this.msg = msg;
        }

        public int getCode() {
            return code;
        }

        public void setCode(int code) {
            this.code = code;
        }

        public String getMsg() {
            return msg;
        }

        public void setMsg(String msg) {
            this.msg = msg;
        }
    }
}
```

将常量抽取出来，修改更加方便



### 14.3.2 领取采购单

**具体需求：**

合并采购需求成功后，具体这个功能有啥用啊？ 你总得需要有人去采购吧？ 所以就会有一个**采购APP 工作人员点击采购**，然后就去采购，这里就没有实现采购 APP 就用接口来实现，通过 JSON 的参数 来请求

![image-20201024140120849](http://qnimg.gisfsde.com/work/image-20201024140120849.png)

Controller

```java
/**
 *
 * @param ids
 * @return
 */
@PostMapping("/received")
public R received(@RequestBody List\<Long> ids) {
    purchaseService.received(ids);

    return R.ok();
}
```

Service

```java
@Override
public void received(List\<Long> ids) {
    // 1、确认当前采购单是 新建或者 已分配状态 才能进行采购
    List\<PurchaseEntity> collect = ids.stream().map(id -> {
        // 根据采购id查询出采购信息
        PurchaseEntity byId = this.getById(id);
        return byId;
    }).filter(item -> {
        // 新建或者已分配留下
        if (item.getStatus() == WareConstant.PurchaseStatusEnum.CREATED.getCode() ||
                item.getStatus() == WareConstant.PurchaseStatusEnum.ASSIGNED.getCode()) {
            return true;
        }
        return false;
    }).map(item -> {
        // 设置为已领取
        item.setStatus(WareConstant.PurchaseStatusEnum.RECEIVE.getCode());
        item.setUpdateTime(new Date());
        return item;
    }).collect(Collectors.toList());

    // 2、改变采购单状态
    this.updateBatchById(collect);


    // 3、改变采购项的状态
    collect.forEach((item) -> {
        // 根据 purchase_id 查询出采购需求
        List\<PurchaseDetailEntity> entities = purchaseDetailService.listDetailByPurchaseId(item.getId());
        //
        List\<PurchaseDetailEntity> detailEntites = entities.stream().map(entity -> {
            PurchaseDetailEntity detailEntity = new PurchaseDetailEntity();

            detailEntity.setId(entity.getId());
            // 设置状态正在采购
            detailEntity.setStatus(WareConstant.PurchaseDetailStatusEnum.BUYING.getCode());
            return detailEntity;
        }).collect(Collectors.toList());
        // id批量更新
        purchaseDetailService.updateBatchById(detailEntites);
    });
}
```



**总结业务流程：**

业务分析

- 采购人员通过 APP 点击采购 完成对应的采购需求，这里使用的是 PostMan 来发送请求，发送请求 带的参数是什么？ 参数就是 采购Id
- 通过采购 Id 查询出采购相关信息，然后设置采购表的状态，设置成采购成功，同时通过这个 id 在 `wms_purchase_detail`  表中 **对应的是 purchase_id** 查询采购需求表的数据， 查询到后将他的状态设置成 **“正在采购“**

### 14.3.3 完成采购

**具体需求：**

采购人员参与采购后，采购就会有他的结果，采购成功、采购失败，

![image-20201024142800046](http://qnimg.gisfsde.com/work/image-20201024142800046.png)

有了请求参数，如果比较多，那么底考虑设计一个 VO 哦

```java
@PostMapping("/done")
public R finish(@RequestBody PurchaseDoneVo doneVo) {
    purchaseService.done(doneVo);

    return R.ok();
}
```

Vo

```java
@Data
public class PurchaseDoneVo {
    /**
     * 采购单id
     */
    @NotNull
    private Long id;
    public List\<PurchaseItemDoneVo> items;

}
```

```
@Data
public class PurchaseItemDoneVo {

    /**
     * 完成/失败的需求详情
     */
    private Long itemId;
    /**
     * 状态
     */
    private Integer status;
    
    private String reason;
}
```

Service

```java
@Transactional
@Override
public void done(PurchaseDoneVo doneVo) {


    // 采购单id
    Long id = doneVo.getId();

    // 2、改变采购项目的状态
    Boolean flag = true;
    List\<PurchaseItemDoneVo> items = doneVo.getItems();
    List\<PurchaseDetailEntity> updates = new ArrayList\<>();
    for (PurchaseItemDoneVo item : items) {
        PurchaseDetailEntity detailEntity = new PurchaseDetailEntity();
        // 如果采购失败
        if (item.getStatus() == WareConstant.PurchaseDetailStatusEnum.HASERROR.getCode()) {
            flag = false;
            detailEntity.setStatus(item.getStatus());
        } else {
            // 3、将成功采购的进行入库
            PurchaseDetailEntity entity = purchaseDetailService.getById(item.getItemId());
            wareSkuService.addStock(entity.getSkuId(),entity.getWareId(),entity.getSkuNum());
            detailEntity.setStatus(WareConstant.PurchaseDetailStatusEnum.FINISH.getCode());
        }
        detailEntity.setId(item.getItemId());
        updates.add(detailEntity);
    }
    // 批量更新
    purchaseDetailService.updateBatchById(updates);

    // 1、改变采购单状态
    PurchaseEntity purchaseEntity = new PurchaseEntity();
    purchaseEntity.setId(id);
    // 设置状态根据变量判断
    purchaseEntity.setStatus(flag?WareConstant.PurchaseStatusEnum.FINISH.getCode():WareConstant.PurchaseStatusEnum.HASERROR.getCode());
    purchaseEntity.setUpdateTime(new Date());
    this.updateById(purchaseEntity);

}
```

addStock方法

```java
@Override
public void addStock(Long skuId, Long wareId, Integer skuNum) {
    // 先根据 skuId 和 ware_id 查询 是否拥有这个用户
    List\<WareSkuEntity> wareSkuEntities = wareSkuDao.selectList(new QueryWrapper\<WareSkuEntity>().eq("sku_id", skuId).eq("ware_id", wareId));
    
    //没有这个用户 那就新增
    if(wareSkuEntities == null || wareSkuEntities.size() == 0) {
        WareSkuEntity wareSkuEntity = new WareSkuEntity();
        // 根据属性值设置
        wareSkuEntity.setSkuId(skuId);
        wareSkuEntity.setStock(skuNum);
        wareSkuEntity.setWareId(wareId);
        wareSkuEntity.setStockLocked(0);
        // TODO 远程查询sku的名字 如果失败整个事务不需要回滚
        try {
            // 远程调用 根据 skuid进行查询
            R info = productFeignService.info(skuId);
            Map\<String,Object> map = (Map\<String, Object>) info.get("skuInfo");
            if (info.getCode() == 0) {
                wareSkuEntity.setSkuName((String) map.get("skuName"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        wareSkuDao.insert(wareSkuEntity);
    }else {
        // 有该记录那就进行更新
    wareSkuDao.addStock(skuId,wareId,skuNum);
    }
}
```

addStock 具体实现

```java
\<insert id="addStock">
UPDATE `wms_ware_sku` SET stock=stock+#{skuNum} WHERE sku_id=#{skuId} AND ware_id=#{wareId}
\</insert>
```

### 14.3.4 Spu规格维护

**具体需求：**

前端项目遇到的问题： 需要自己去 router目录下找到 index.js 增加改行配置，主要是配置规格维护的路径

![image-20201025095926893](http://qnimg.gisfsde.com/work/image-20201025095926893.png)

在 Spu管理上 点击规格后查询出相关规格信息

![image-20201025100138990](http://qnimg.gisfsde.com/work/image-20201025100138990.png)

Controller

```java
@GetMapping("/base/listforspu/{spuId}")
public R baseAttrListforspu(@PathVariable("spuId") Long spuId) {
    List\<ProductAttrValueEntity> productAttrValueEntity = productAttrValueService.baseAttrListforspu(spuId);
    return R.ok().put("data",productAttrValueEntity);
}
```

Service 

```java
@Override
public List\<ProductAttrValueEntity> baseAttrListforspu(Long spuId) {
    // 1、根据spuid进行查询
    List\<ProductAttrValueEntity> attrValueEntities = this.baseMapper.selectList(new QueryWrapper\<ProductAttrValueEntity>().eq("spu_id", spuId));
    return attrValueEntities;
}
```

**总结业务流程：**

单表操作，根据 spu_id 查询出 `pms_product_attr_value` 表的信息



### 14.3.5 Spu更新操作

**具体需求：**

根据spu_id 查询出规格信息后 ，修改对应信息 提交后会发送一个post请求，并同时带上请求参数

```json
[{
	"attrId": 7,
	"attrName": "入网型号",
	"attrValue": "LIO-AL00",
	"quickShow": 1
}, {
	"attrId": 14,
	"attrName": "机身材质工艺",
	"attrValue": "玻璃",
	"quickShow": 0
}, {
	"attrId": 16,
	"attrName": "CPU型号",
	"attrValue": "HUAWEI Kirin 980",
	"quickShow": 1
}]
```

刚好这四个参数和实体类的一致，就不需要创建 Vo来接收

![image-20201025100424345](http://qnimg.gisfsde.com/work/image-20201025100424345.png)

Controller

```java
@RequestMapping("/update/{spuId}")
//@RequiresPermissions("product:attr:update")
public R updateSpuAttr(@PathVariable("spuId") Long spuId,
                       @RequestBody List\<ProductAttrValueEntity> productAttrValueEntityList){

    productAttrValueService.updateSpuAttr(spuId,productAttrValueEntityList);
    return R.ok();
}
```

Service

```java
/**
 * 先删除 后更新
 * @param spuId
 * @param productAttrValueEntityList
 */
@Override
public void updateSpuAttr(Long spuId, List\<ProductAttrValueEntity> productAttrValueEntityList) {
    // 1、根据spuid删除记录
    this.baseMapper.delete(new QueryWrapper\<ProductAttrValueEntity>().eq("spu_id",spuId));

    // 2、遍历传递过来的记录 设置 spuId
    List\<ProductAttrValueEntity> collect = productAttrValueEntityList.stream().map(item -> {
        item.setSpuId(spuId);
        return item;
    }).collect(Collectors.toList());
    // 3、批量保存
    this.saveBatch(collect);
}
```

**总结业务流程：**

- 更新操作，根据前端传递过来的参数来进行更新，前端传递了一个 `spu_id` 和多个 spu属性值 一个 `spu_id`对多个 spu 属性值
- 先根据 `spu_id` 删除存在 pms_product_attr_value 表的记录 
- 然后对多个  ProductAttrValueEntity 对象设置 sup_id ，最后进行批量保存



# 分布式基础篇总结

## 1、分布式基础概念

- 微服务、注册中心（Nacos）、配置中心（Nacos Cofig）、远程调用、Feign、网关

## 2、基础开发

- SpringBoot2.0、SpringCloud、Mybatis-Plus、Vue组件化、阿里云对象存储

## 3、环境

- Vagrant、Linux、Docker、MySQL、Redis、逆向工程&人人开源

## **4、开发规范**

- 数据效验JSR303、全局异常处理、全局统一返回、全家跨越处理
- 枚举状态、业务状态、VO与TO与PO划分、逻辑删除
- Lombok:@Data、@Slf4j

# =====**分布式高级篇**=====

# 1、[Elasticsearch - 全文检索](https://www.elastic.co/guide/cn/elasticsearch/guide/current/index.html)

### 简介

https://www.elastic.co/cn/what-is/elasticsearch/

全文搜索属于最常见的需求，开源的 Elasticsearch 是目前全文搜索引擎的首选。

他可以快速地存储、搜索和分析海量数据。维基百科、Stack Overflow、Github 都采用他

![image-20201026084916698](http://qnimg.gisfsde.com/work/image-20201026084916698.png)

Elatic 的底层是开源库吧Lucene。但是，你没法直接用，必须自己写代码调用它的接口，Elastic 是 Lunce 的封装，提供了 REST API 的操作接口，开箱即用

REST API：天然的跨平台

官网文档：https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html

官网中文：https://www.elastic.co/guide/cn/elasticsearch/guide/current/index.html

社区中文：

http://doc.codingdict.com/elasticsearch/

### 1.1、基本概念

#### 1.1.1 index(索引)

动词，相当于 MySQL 中的 insert；

名词，相当于MySQL 中的 DataBase

#### 1.1.2 Type(类型)

在 Index（索引）中，可以定义一个或多个类型

类似于 MySQL 中的 Table，每一种类型的数据放在一起

#### 1.1.3 Document(文档)

保存在某个索引（index）下，某种类型（Type）的一个数据（Document）,文档是 JSON 格式的，Document 就像是 MySQL 中某个 Table 里面的内容

#### 1.1.4 倒排索引机制

![image-20201026092738311](http://qnimg.gisfsde.com/work/image-20201026092738311.png)

### 1.2 Docker 安装 ES

#### 1.2.1 下载镜像

sudo docker pull elasticsearch:7.4.2  存储和检索数据

sudo docker pull kibana:7.4.2 可视化检索数据	

#### 1.2.2 创建实例

##### 1、ElasticSearch

配置

```bash
mkdir -p /mydata/elasticsearch/config # 用来存放配置文件
mkdir -p /mydata/elasticsearch/data  # 数据
echo "http.host: 0.0.0.0" >/mydata/elasticsearch/config/elasticsearch.yml # 允许任何机器访问
chmod -R 777 /mydata/elasticsearch/ ## 设置elasticsearch文件可读写权限
```

启动

```bash
docker run --name  elasticsearch -p 9200:9200 -p 9300:9300 \ # 容器名  9200 rest接口使用 9300 分布式之间访问接口
-e  "discovery.type=single-node" \  # 单节点运行
-e ES_JAVA_OPTS="-Xms64m -Xmx512m" \  #不指定会占用全部内存
-v   /mydata/elasticsearch/config/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml \   #目录挂载
-v /mydata/elasticsearch/data:/usr/share/elasticsearch/data \
-v  /mydata/elasticsearch/plugins:/usr/share/elasticsearch/plugins \   #挂载插件目录
-d elasticsearch:7.4.2 
```

```bash
docker run --name elasticsearch -p 9200:9200 -p 9300:9300 \
-e  "discovery.type=single-node" \
-e ES_JAVA_OPTS="-Xms64m -Xmx512m" \
-v /mydata/elasticsearch/config/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml \
-v /mydata/elasticsearch/data:/usr/share/elasticsearch/data \
-v  /mydata/elasticsearch/plugins:/usr/share/elasticsearch/plugins \
-d elasticsearch:7.4.2 
```

开机启动 elasticsearch

```bash
docker update elasticsearch --restart=always
```

以后再外面装好插件重启就可

特别注意：

-e ES_JAVA_OPTS="-Xms64m -Xmx128m" \ 测试环境下，设置 ES 的初始内存和最大内存，否则导致过大启动不了ES

##### 2、Kibana

```bash
docker run --name kibana -e ELASTICSEARCH_HOSTS=http://192.168.56.10:9200 -p 5601:5601 -d kibana:7.4.2

http://192.168.56.10:9200 改成自己Elasticsearch上的地址
```

##### 3、安装nginx

随便启动一个 nginx 实例，只是为了复制出配置

```
docker run -p80:80 --name nginx -d nginx:1.10   
```

将容器内的配置文件拷贝到当前目录 （注意后面有个小点）

```bash
docker container cp nginx:/etc/nginx .  
```

创建nginx文件夹

```shell
mkdir -p /mydata/nginx/html
mkdir -p /mydata/nginx/logs
 #由于拷贝完成后会在config中存在一个nginx文件夹，所以需要将它的内容移动到conf中
 #conf 文件夹下就是原先nginx的配置
mv /mydata/nginx/conf/nginx/* /mydata/nginx/conf/
rm -rf /mydata/nginx/conf/nginx
```

别忘了后面的点

修改文件名称：mv nginx.conf 把这个conf 移动到 /mydata/nginx 下

终止原容器， docker stop nginx

执行命令删除容器：docker rm $Containerid

创建新的 nginx 执行以下命令

```bash
 docker run -p 80:80 --name nginx \
 -v /mydata/nginx/html:/usr/share/nginx/html \
 -v /mydata/nginx/logs:/var/log/nginx \
 -v /mydata/nginx/conf/:/etc/nginx \
 -d nginx:1.10
```



### 1.3 初步检索

#### 1.3.1、_cat

GET /_cat/nodes：查看所有节点

GET /_cat/health：查看 es 健康状况

GET /_cat/master：查看主节点

GET /_cat/incices：查看所有索引 show databases;

#### 1.3.2 索引一个文档（保存）

```
数据格式
{
    "name": "John Doe2"
}
```

保存一个数据，保存在哪个索引的哪个类型下，指定用哪个唯一标识

PUT customer/external/1; 在 customer 索引下的 external 类型下保存 1号数据为

```http
新增 put 需带 id 保存    索引/类型/id
PUT customer/external/1
新增  post 不带id 且id之前没数据    修改  带id且之前有数据
POST customer/external/    
```

#### 1.3.3、查询文档

```http
GET custome/external/1
```

结果：

```json
{
    "_index": "customer", // 在那个索引
    "_type": "external", // 在那个类型
    "_id": "1", // 记录id
    "_version": 1, 。// 版本号
    "_seq_no": 0, // 并发控制字段，每次更新就会+1，用来做乐观锁
    "_primary_term": 1, //同上，主分片重新分配，如重启，就会变化
    "found": true, 
    "_source": {
        "name": "John Doe" // 存储数据
    }
}
```

```
更新携带：?if_seq_no=4&if_primary_term=1   形成乐观锁
192.168.56.10:9200/customer/external/1?if_seq_no=0&if_primary_term=1
```



#### 1.3.4 更新文档

更新  post （带__update ）都会检查数据，数据没变化不会更新版本号

```http
POST customer/external/1/_update
{
	"doc":{
		"name":"John Doew"
	}
}

返回
{
    "_index": "customer",
    "_type": "external",
    "_id": "1",
    "_version": 6, 数据没变化不会更新版本号
    "result": "noop",
    "_shards": {
        "total": 0,
        "successful": 0,
        "failed": 0
    },
    "_seq_no": 7,
    "_primary_term": 22
}
```

更新 put和post （不带__update ）都会直接更新数据不检查

不同：

- Post操作会对比源文档数据，如果相同不会有什么操作，文档 version 不增加 PUT操作总会将数据重新保存并增加 version 版本
- 带 _update 对比元数据如果一样就不进行任何操作
- 场景
  - 对于大并发更新，不带update
  - 对于大并发查询并偶尔更新，带update 对比更新，重新计算分配规则

```http
POST customer/external/1
{
	"name":"John Doe2"
}

或者
PUT customer/external/1
{
	"name":"jack"
}
```

更新同时增加属性
POS customer/external/1/_update
{
	"doc":{"name":"Jane Doe","age":20}
}
PUT 和 POST 不带_update也可以

#### 1.3.5 删除文档&索引

删除  指定索引或者id  不能指定类型（表）

```http
DELETE customer/external/1
DELETE customer
```

#### 1.3.6 bulk 批量 API

```http
POST customer/external/_bulk
{"index":{"_id":"1"}}
{"name":"John Doe"}
{"index":{"_id":"2"}}
{"name":"John Doe"}

返回
#! Deprecation: [types removal] Specifying types in bulk requests is deprecated.
{
  "took" : 3,
  "errors" : false,
  "items" : [
    {
      "index" : {
        "_index" : "customer",
        "_type" : "external",
        "_id" : "1",
        "_version" : 5,
        "result" : "updated",
        "_shards" : {
          "total" : 2,
          "successful" : 1,
          "failed" : 0
        },
        "_seq_no" : 5,
        "_primary_term" : 22,
        "status" : 200
      }
    },
    {
      "index" : {
        "_index" : "customer",
        "_type" : "external",
        "_id" : "2",
        "_version" : 2,
        "result" : "updated",
        "_shards" : {
          "total" : 2,
          "successful" : 1,
          "failed" : 0
        },
        "_seq_no" : 6,
        "_primary_term" : 22,
        "status" : 200
      }
    }
  ]
}
```

语法格式

```json
{action:{metadata}}\n
{requeestBody}\n
{action:{metadata}}\n
{requesetbod }\n
```

复杂实例：

```http
POST /_bulk
{"delete":{"_index":"website","_type":"blog","_id":"123"}}
{"create":{"_index":"website","_type":"blog","_id":"123"}}
{"title":"my first blog post"}
{"index":{"_index":"website","_type":"blog"}}
{"title":"my second blog post"}
{"update":{"_index":"website","_type":"blog","_id":"123"}}
{"doc":{"title":"my updated blog post"}}
```

bulk API以此按顺序执行所有的action (动作)。如果一一个单个的动作因任何原因而失败，它将继续处理它后面剩余的动作。当bulkAPI 返回时，它将提供每个动作的状态(与发送的顺序相同)，所以您可以检查是否一个指定的动作是不是失败了。

#### 1.3.7 样本测试数据

我准备了一份顾客银行账户信息虚构的 JSON 文档样本，每个用户都有下列的 schema （模式）：

```json
{
	"account_number": 1,
	"balance": 39225,
	"firstname": "Amber",
	"lastname": "Duke",
	"age": 32,
	"gender": "M",
	"address": "880 Holmes Lane",
	"employer": "Pyrami",
	"email": "amberduke@pyrami.com",
	"city": "Brogan",
	"state": "IL"
}
```

https://github.com/elastic/elasticsearch/edit/master/docs/src/test/resources/accounts.json

[es测试数据.json · 坐看云起时/common_content - Gitee.com](https://gitee.com/xlh_blog/common_content/blob/master/es测试数据.json)

导入测试数据

POST bank/account/_bulk

测试数据

![image-20201026114903942](http://qnimg.gisfsde.com/work/image-20201026114903942.png)



### 1.4 进阶检索

#### 1.4.1 SearchAPI

ES 支持两种基本方式检索:

- 一个是通过使用 REST request URL,发送搜索参数，(uri + 检索参数)
- 另一个是通过使用 REST request bod 来发送他们，(uri + 请求体)

1、检索信息

一切检索从_search开始

GET /bank/_search 检索 bank 下的所有信息，包括 type 和 docs

GET /bank/_search?q=*&sort=account_number:asc 请求参数方式检索

响应结果解释
took - Elasticearch执 行搜索的时间(毫秒)

time_ out - 告诉我们搜索是否超时

_shards - 告诉我们多少个分片被搜索了，以及统计了成功/失败的搜索分片
hit - 搜索结果
hits.total - 搜索结果
hits.hits - 实际的搜索结果数组(默认为前10的文档)
sort - 结果的排序key (键) (没有则按 score 排序)
score 和 max score - 相关性得分和最高得分(全文检索用)

uri + 请求体进行检查

```java
GET /bank/_search
{
  "query": { "match_all": {} },
  "sort": [
    { "account_number": "asc" }
  ]
}
```

HTTP 客户端工具（POSTMAN）,get请求不能携带请求体，我们变为 post也是一样的 我们 POST 一个 JSON风格的查询请求体到 _search API

需要了解，一旦搜索结果被返回，ES 就完成了这次请求的搜索，并且不会维护任何服务端的资源或者结果的 cursor（游标）

#### 1.4.2、QueryDSL

##### 1、基本语法格式

ES 提供了一个可以执行查询的 Json 风格的 DSL （domain-specifig langurage 领域特定语言），这个被成为 Query DSL ，该查询语言非常全面，并且刚开始的时候优点复杂，真正学好对他的方法是从一些基础的示例开始的

一个查询语句 的典型结构

```json
{
    QUERY_NAME:{
        ARGUMENT:VALUE,
        ARGUMENT:VALUE.....
    }
}
```

如果针对某个字段，那么它的结构如下

```json
{
    QUERY_NAME:{
        FIELD_NAME:{
            ARGUMENT:VALUE,
            ARGUMENT:VALUE.....
        }
    }
}
```

```http
GET /bank/_search
{
  "query": { "match_all": {} },
  "sort": [
    { "account_number": "asc" }
  ],
  "from": 10,
  "size": 10
}
```

query 定义如何查询

match_all 查询类型【代表查询所有的所有】，es中可以在 query中 组合非常多的查询类型完成复杂查询

除了 query 参数之外，我们也可以传递其他的参数改变查询结构，如 sort，size

from + size 限定，完成分页功能

sort排序，多字段排序，会在前序字段相等时后续字段内部排序，否则以前序为准

##### 2、返回部分字段

```http
 GET bank/_search
 {
   "query":{
     "match_all": {}
   },
   "sort": [
     {
       "balance": {
         "order": "desc"
       }
     }
   ],
   "from": 5,
   "size": 5,
   "_source": ["firstname","lastname"]
 }
```

##### 3、**match【匹配查询】**

基本类型(非字符串)，精准匹配

```http
GET bank/_search
{
  "query":{
   "match": {
     "address": "mill lane"
   } 
  }
}
```

全文检索按照评分进行排序，会对检索条件进行**分词匹配**

##### 4、**match_phrase【短语匹配】**

将需要匹配的值当成一个整体单词（**不分词**）进行检索

```http
GET /bank/_search
{
  "query": { "match_phrase": { "address": "mill lane" } }
}
```

##### 5、**multi_match【多字段匹配】**

```http
GET bank/_search
{
  "query":{
    "multi_match": {
      "query": "mill",
      "fields": ["address","city"]
    }
  }
}
```

##### 6、**bool 【复合查询】**

bool 用来做复合查询

复合语句可以合并 任何 其他嵌套语句，包括复合语句，了解这一点是很重要的，这就意味着，复合语句之间可以互相嵌套，可以表达式非常复杂的逻辑

- **must/must_not**：**必须满足/不满足** must 列举的所有条件

```http
GET /bank/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "gender": "M"
          }
        },
        {
          "match": {
            "address": "mill"
          }
        }
      ],
      "must_not": [
        {"match":{
          "age":"18"
        }}
      ],
      "should": [
        {"match": {
          "lastname": "Wallace"
        }}
      ]
    }
  }
}
```

- should:最好达到 should 列举的条件，如果达到**会增加相关文档的评分，并不会改变查询的结果**，如果 query 中只有 should 且只有一种匹配规则，那么 should的条件就会被作为默认匹配条件而区改变查询结果

```json
 "should": [
        {"match": {
          "lastname": "Wallace"
        }}
      ]
```

![image-20201026052225903](http://qnimg.gisfsde.com/work/image-20201026052225903.png)

##### 7、filter【结果过滤】

并不是所有的查询都需要产生分数，特别是那些仅仅用于 filtering（过滤）的文档，为了**不计算分数** ES 会自动检查场景并且优化查询的执行

```http
GET /bank/_search
{
  "query": {
    "bool": {
      "must": { "match_all": {} },
      "filter": {
        "range": {
          "balance": {
            "gte": 20000,
            "lte": 30000
          }
        }
      }
    }
  }
}
```

##### 8、term

和 match 一样，匹配某个属性的值，**全文检索字段用 match，其他非text字段匹配用 term**

```json
//短语匹配
GET bank/_search
{
  "query":{
    "match": {
      "address.keyword": "789 Madison"
    }
  }
}

//精确匹配
GET bank/_search
{
  "query":{
    "match_phrase": {
      "address": "789 Madison"
    }
  }
}
```

##### 9、aggregations（执行聚合）

聚合提供了从数据分组和提取数据的能力，最简单的聚合方法大致等于 SQL GROUP BY 和 SQL 聚合函数，在 ES 中，你有执行搜索返回 hits （命中结果） 并且同时返回聚合结果，把一个响应中的所有 hits（命中结果）分隔开的能力，这是非常强大有效的，你可以执行查询和多个聚合，并且在一个使用中得到各自的（任何一个的）返回结果，使用一次简洁简化的 API 来避免网络往返，"size":0 不显示搜索数据

**搜索address中包含mill的所有人的年龄分布以及平均年龄、薪资**

```json
GET bank/_search
{
  "query": {
    "match": {
      "address": "mill"
    }
  },
  "aggs": {
    "ageAgg": {
      "terms": {
        "field": "age",
        "size": 10
      }
    },
    "ageAvg":{
      "avg": {
        "field": "age"
      }
    },
    "balanceAvg":{
      "avg": {
        "field": "balance"
      }
    }
    
  },
  "size":0
}
```

**按照年龄聚合，并且请求这些年龄段的这些人的平均薪资**

```java
GET bank/_search
{
  "query":{
    "match_all": {}
  },
  "aggs": {
    "ageAgg": {
      "terms": {
        "field": "age",
        "size": 10
      },
      "aggs": {
        "ageAvg": {
          "avg": {
            "field": "balance"
          }
        }
      }
    }
  }
}
```

**查出所有年龄分布，并且这些年龄段中M的平均薪资和 F 的平均薪资以及这个年龄段的总体平均薪资**

```java
GET /bank/_search
{
  "query": {
    "match_all": {}
  },
  "aggs": {
    "ageAgg": {
      "terms": {
        "field": "age",
        "size": 100
      },
      "aggs": {
        "genderAgg": {
          "terms": {
            "field": "gender.keyword",
            "size": 10
          },
          "aggs": {
            "balanceAvg": {
              "avg": {
                "field": "balance"
                }
            }
          }
        }
      }
    }
  }
}
```

##### 10、nested

嵌套查询

数据类型概览

![image-20201225063939652](http://qnimg.gisfsde.com/work/image-20201225063939652.png)

参考博客：https://elastic.blog.csdn.net/article/details/82950393

#### 1.4.3 Mapping

##### 1、字段类型

![image-20201026074813810](http://qnimg.gisfsde.com/work/image-20201026074813810.png)

![image-20201026074841875](http://qnimg.gisfsde.com/work/image-20201026074841875.png)

##### 2、映射

Mapping（映射）

Mapping 是用来定义一个文档（document）,以及他所包含的属性（field）是如何存储索引的，比如使用 mapping来定义的：

- 哪些字符串属性应该被看做全文本属性（full text fields）
- 那些属性包含数字，日期或者地理位置
- 文档中的所有属性是能被索引（_all 配置）
- 日期的格式
- 自定义映射规则来执行动态添加属性

查看 mapping 信息

GET bank/_mapping

修改 mapping 信息

https://www.elastic.co/guide/en/elasticsearch/reference/7.10/mapping-types.html

自动猜测的映射类型

![image-20201026075424198](http://qnimg.gisfsde.com/work/image-20201026075424198.png)

##### 3、新版本改变

- 关系型数据库中两个数据表示是独立的，即使他们里面有相同名称的列也不影响使用，但ES中不是这样的。elasticsearch 是基于Lucene开发的搜索引擎，而ES中不同type下名称相同的filed 最终在Lucene,中的处理方式是一样的。

- 两个不同 type下的两个user_ name, 在ES同-个索引下其实被认为是同一一个filed,你必须在两个不同的type中定义相同的filed映射。否则，不同typpe中的相同字段称就会在处理中出现神突的情况，导致Lucene处理效率下降。
- 去掉type就是为了提高ES处理数据的效率。

ES 7.x 

URL 中的 type 参数 可选，比如索引一个文档不再要求提供文档类型

ES 8.X

不在支持 URL 中的 type 参数

解决：

1、将索引从多类型迁移到单类型，每种类型文档一个独立的索引

2、将已存在的索引下的类型数据，全部迁移到指定位置即可，详见数据迁移

**1、创建映射**

```http
PUT /my_index
{
  "mappings":{
    "properties": {
      "age":{"type":"integer"},
      "email":{"type":"keyword"}
    }
  }
}
```

**2、添加新的字段映射**

```http
PUT /my_index/_mapping
{
  "properties":{
    "employeeid":{
      "type":"keyword",
      "index":false
    }
  }
}
```

##### 3、更新映射

对于已经存在的映射字段，我们不能更新，更新必须创建新的索引进行数据迁移

**4、数据迁移**

先创 new_twitter 的正确映射，然乎使用如下方式进行数据迁移

```http
POST _reindex [固定写法]
{
  "source":{
    "index":"twitter"
  },
  "dest":{
    "index":"new_twitter"
  }
}
## 将旧索引的 type 下的数据进行迁移
POST _reindex
{
  "source": {
    "index":"twitter",
    "type":"tweet"
  },
  "dest":{
    "index":"twweets"
  }
}
```

参考官网：https://www.elastic.co/guide/en/elasticsearch/reference/7.10/mapping-types.html

参数映射规则：https://www.elastic.co/guide/en/elasticsearch/reference/7.10/mapping-params.html#mapping-params

#### 1.4.4 分词

一个 **tokenizer**（分词器）接收一个字符流，将之分割为独立的 **tokens**（词元，通常是独立的单词），然后输出 **token** 流

列如，witespace tokenizer 遇到的空白字符时分割文本，它会将文本 “Quick brown fox” 分割为 【Quick brown fox】

该 **tokenizer** (分词器)还负责记录各个**term** (词条)的顺序或 **position** 位置(用于**phrase**短语和**word** proximity词近邻查询)，以及

**term** (词条)所代表的原始 **word** (单词)的start(起始)和end (结束)的 **character** **offsets** (字符偏移量) (用于 高亮显示搜索的内容)。

**Elasticsearch** 提供了很多内置的分词器，可以用来构建custom analyzers(自定义分词器)

##### 1、安装 ik 分词器

注意:不能用默认的 elasticsearch-plugin.install xxx.zip 进行自动安装

https://github.com/medcl/elasticsearch-analysis-ik/releases 下载与 es对应的版本

安装后拷贝到 /mydata/elasticsearch/plugins 目录下

##### 2、测试

分词器

![image-20201026092255250](http://qnimg.gisfsde.com/work/image-20201026092255250.png)

**3、自定义词库**

修改 /usr/share/elasticsearch/plugins/ik/config/中的 IKAnalyzer.cfg.xml

/usr/share/elasticsearch/plugins/ik/config

```java
\<?xml version="1.0" encoding="UTF-8"?>
\<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
\<properties>
        \<comment>IK Analyzer 扩展配置\</comment>
        <!--用户可以在这里配置自己的扩展字典 -->
        \<entry key="ext_dict">\</entry>
         <!--用户可以在这里配置自己的扩展停止词字典-->
        \<entry key="ext_stopwords">\</entry>
        <!--用户可以在这里配置远程扩展字典 -->
         \<entry key="remote_ext_dict">http://192.168.56.10/es/fenci.txt\</entry>
        <!--用户可以在这里配置远程扩展停止词字典-->
        <!-- \<entry key="remote_ext_stopwords">words_location\</entry> -->
\</properties>

```



### 1.5 Elasticsearch - Rest - client

1、9300：TCP

Spring-data-elasticsearch:transport-api.jar

SpringBoot版本不同，`transport-api.jar` 不同，不能适配 es 版本

7.x 已经不在适合使用，8 以后就要废弃

**2、9200：HTTP**

JestClient 非官方，更新慢

RestTemplate:默认发送 HTTP 请求，ES很多操作都需要自己封装、麻烦

HttpClient：同上

Elasticsearch - Rest - Client：官方RestClient，封装了 ES 操作，API层次分明

最终选择 Elasticsearch - Rest - Client （elasticsearch - rest - high - level - client）

#### 1.5.1 SpringBoot 整合

1、Pom.xml

```xml
<!-- 导入es的 rest-high-level-client -->
\<dependency>
    \<groupId>org.elasticsearch.client\</groupId>
    \<artifactId>elasticsearch-rest-high-level-client\</artifactId>
    \<version>7.4.2\</version>
\</dependency>
```

为什么要导入这个？这个配置那里来的？

官网：https://www.elastic.co/guide/en/elasticsearch/client/java-rest/current/java-rest-high-getting-started-maven.html

#### 1.5.2 Config配置

```java
/**
 * @author gcq
 * @Create 2020-10-26
 *
 * 1、导入配置
 * 2、编写配置，给容器注入一个RestHighLevelClient
 * 3、参照API 官网进行开发
 */
@Configuration
public class GulimallElasticsearchConfig {


    public static final RequestOptions COMMON_OPTIONS;
    static {
        RequestOptions.Builder builder = RequestOptions.DEFAULT.toBuilder();
//        builder.addHeader("Authorization", "Bearer " + TOKEN);
//        builder.setHttpAsyncResponseConsumerFactory(
//                new HttpAsyncResponseConsumerFactory
//                        .HeapBufferedResponseConsumerFactory(30 * 1024 * 1024 * 1024));
        COMMON_OPTIONS = builder.build();
    }



    @Bean
    public RestHighLevelClient esRestClient() {
        RestClientBuilder builder = null;
        builder = RestClient.builder(new HttpHost("192.168.56.10", 9200, "http"));

        RestHighLevelClient client = new RestHighLevelClient(builder);
//        RestHighLevelClient client = new RestHighLevelClient(
//                RestClient.builder(
//                        new HttpHost("localhost", 9200, "http"),
//                        new HttpHost("localhost", 9201, "http")));
        return client;
    }

}
```

官网：https://www.elastic.co/guide/en/elasticsearch/client/java-rest/current/java-rest-high-getting-started-initialization.html

#### 1.5.3 使用

> 测试是否注入成功

```java
@Autowired
private RestHighLevelClient client;

@Test
public void contextLoads() {
    System.out.println(client);
}
```

> 测试是否能 添加 或更新数据

```java
/**
 * 添加或者更新
 * @throws IOException
 */
@Test
public void indexData() throws IOException {
    IndexRequest indexRequest = new IndexRequest("users");
    User user = new User();
    user.setAge(19);
    user.setGender("男");
    user.setUserName("张三");
    String jsonString = JSON.toJSONString(user);
    indexRequest.source(jsonString,XContentType.JSON);

    // 执行操作
    IndexResponse index = client.index(indexRequest, GulimallElasticsearchConfig.COMMON_OPTIONS);

    // 提取有用的响应数据
    System.out.println(index);
}

    @Data
    class  User{
        private String userName;
        private String gender;
        private Integer age;
    }
```

测试复杂检索

```java
 @Test
    public void searchTest() throws IOException {
        // 1、创建检索请求
        SearchRequest searchRequest = new SearchRequest();
        // 指定索引
        searchRequest.indices("bank");
        // 指定 DSL，检索条件
        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();

        sourceBuilder.query(QueryBuilders.matchQuery("address", "mill"));

        //1、2 按照年龄值分布进行聚合
        TermsAggregationBuilder aggAvg = AggregationBuilders.terms("ageAgg").field("age").size(10);
        sourceBuilder.aggregation(aggAvg);

        //1、3 计算平均薪资
        AvgAggregationBuilder balanceAvg = AggregationBuilders.avg("balanceAvg").field("balance");
        sourceBuilder.aggregation(balanceAvg);


        System.out.println("检索条件" + sourceBuilder.toString());

        searchRequest.source(sourceBuilder);

        // 2、执行检索
        SearchResponse searchResponse = client.search(searchRequest, GulimallElasticsearchConfig.COMMON_OPTIONS);

        // 3、分析结果
        System.out.println(searchResponse.toString());

        // 4、拿到命中得结果
        SearchHits hits = searchResponse.getHits();
        // 5、搜索请求的匹配
        SearchHit[] searchHits = hits.getHits();
        // 6、进行遍历
        for (SearchHit hit : searchHits) {
            // 7、拿到完整结果字符串
            String sourceAsString = hit.getSourceAsString();
            // 8、转换成实体类
            Accout accout = JSON.parseObject(sourceAsString, Accout.class);
            System.out.println("account:" + accout );
        }

        // 9、拿到聚合
        Aggregations aggregations = searchResponse.getAggregations();
//        for (Aggregation aggregation : aggregations) {
//
//        }
        // 10、通过先前名字拿到对应聚合
        Terms ageAgg1 = aggregations.get("ageAgg");
        for (Terms.Bucket bucket : ageAgg1.getBuckets()) {
            // 11、拿到结果
            String keyAsString = bucket.getKeyAsString();
            System.out.println("年龄:" + keyAsString);
            long docCount = bucket.getDocCount();
            System.out.println("个数：" + docCount);
        }
        Avg balanceAvg1 = aggregations.get("balanceAvg");
        System.out.println("平均薪资：" + balanceAvg1.getValue());
        System.out.println(searchResponse.toString());
    }
```

结果：

```java
accout:GulimallSearchApplicationTests.Accout(account_number=970, balance=19648, firstname=Forbes, lastname=Wallace, age=28, gender=M, address=990 Mill Road, employer=Pheast, email=forbeswallace@pheast.com, city=Lopezo, state=AK)accout:GulimallSearchApplicationTests.Accout(account_number=136, balance=45801, firstname=Winnie, lastname=Holland, age=38, gender=M, address=198 Mill Lane, employer=Neteria, email=winnieholland@neteria.com, city=Urie, state=IL)accout:GulimallSearchApplicationTests.Accout(account_number=345, balance=9812, firstname=Parker, lastname=Hines, age=38, gender=M, address=715 Mill Avenue, employer=Baluba, email=parkerhines@baluba.com, city=Blackgum, state=KY)accout:GulimallSearchApplicationTests.Accout(account_number=472, balance=25571, firstname=Lee, lastname=Long, age=32, gender=F, address=288 Mill Street, employer=Comverges, email=leelong@comverges.com, city=Movico, state=MT)年龄:38
个数:2
年龄:28
个数:1
年龄:32
个数:1
平均薪水:25208.0
```

总结：参考官网的API 和对应在 kibana 中发送的请求，在代码中通过调用对应API实现效果

官网：https://www.elastic.co/guide/en/elasticsearch/client/java-rest/current/java-rest-high-search.html#java-rest-high-search-request-optional

ELK  

Elasticsearch 用于检索数据

logstach：存储数据

Kiban:视图化查看数据

![image-20201027120603889](http://qnimg.gisfsde.com/work/image-20201027120603889.png)







# 2、商城业务 & 商品上架

上架的商品才可以在网站展示

上架的商品需要可以检索

### 2.1 商品Mapping

分析：商品上架在 es 中是存入 sku 还是 spu ？

1、检索的时候输入名字，是需要按照 sku 的 title进行全文检索的

2、检索使用商品规格，规格是 spu 的公共属性，每个 spu 是一样的

3、按照分类 id 进去的 都是直接列出 spu的，还可以切换

4、我们如果将 sku 的 全量信息 保存在 es 中 （包括 spu 属性），就太多量字段了

5、如果我们将 spu 以及他包含的 sku 信息保存到 es 中，也可以方

```json
//        "index": false,    不检索
//      "doc_values": false  不分析
//       "type":"nested",  嵌入式的
PUT product
{
  "mappings":{
    "properties":{
      "skuId":{
        "type":"long"
      },
       "spuId":{
        "type":"keyword"
      },
       "skuTitle":{
        "type":"text",
        "analyzer": "ik_smart"
      },
       "skuPrice":{
        "type":"keyword"
      },
       "skuImg":{
        "type":"text",
        "analyzer": "ik_smart"
      },
       "saleCount":{
        "type":"long"
      },
       "hasStock":{
        "type":"boolean"
      },
      "hotScore":{
        "type":"long"
      },
      "brandId":{
        "type":"long"
      },
      "catelogId":{
        "type":"long"
      },
      "brandName":{
        "type":"keyword",
        "index": false,
        "doc_values": false
      },
      "brandImg":{
        "type":"keyword",
         "index": false,
        "doc_values": false
      },
      "catalogName":{
        "type":"keyword",
         "index": false,
         "doc_values": false
      },
      "attrs":{
        "type":"nested",
        "properties": {
          "attrId":{
            "type":"long"
          },
          "attrName":{
            "type":"keyword",
            "index":false,
            "doc_values":false
          },
          "attrValue": {
            "type":"keyword"
          }
        }
      }
    }
  }
}
```



### 2.2 商品上架接口编写

**需求分析：**

上架商品、将该商品相关属性上传到 Es中 为搜索服务做铺垫

<img src="http://qnimg.gisfsde.com/work/image-20201028152104489.png" alt="image-20201028152104489" style="zoom:200%;" />

Controller

```java
/**
 * 商品上架
 * @param spuId
 * @return
 */
@RequestMapping("/{spuId}/up")
public R list(@PathVariable("spuId") Long spuId){
    spuInfoService.up(spuId);

    return R.ok();
}
```

Service

```java
@Override
public void up(Long spuId) {

    // 1、查出当前 spuid 对应的所有skuid信息，品牌的名字
    List\<SkuInfoEntity> skus = skuInfoService.getSkuBySpuId(spuId);
    // 取出 Skuid 组成集合
    List\<Long> skuIds = skus.stream().map(SkuInfoEntity::getSkuId).collect(Collectors.toList());

    //TODO 4、查询当前 sku 的所有可以用来被检索的规格属性
    List\<ProductAttrValueEntity> attrValueEntities = attrValueService.baseAttrListforspu(spuId);

    // 返回所有 attrId
    List\<Long> attrIds = attrValueEntities.stream().map(attr -> {
        return attr.getAttrId();
    }).collect(Collectors.toList());

    // 根据 attrIds 查询出 检索属性，pms_attr表中 search_type为一 则是检索属性
    List\<Long> searchAttrIds = attrService.selectSearchAttrs(attrIds);

    // 将查询出来的 attr_id 放到 set 集合中 用来判断 attrValueEntities 是否包含 attrId
    Set\<Long> idSet = new HashSet\<>(searchAttrIds);

    List\<SkuEsModel.Attrs> attrList = attrValueEntities.stream().filter(item -> {
        // 过滤掉不包含在 searchAttrIds集合中的元素
        return idSet.contains(item.getAttrId());
    }).map(item -> {
        SkuEsModel.Attrs attrs1 = new SkuEsModel.Attrs();
        // 属性对拷 将 ProductAttrValueEntity对象与 SkuEsModel.Attrs相同的属性进行拷贝
        BeanUtils.copyProperties(item, attrs1);
        return attrs1;
    }).collect(Collectors.toList());


    //TODO 1、发送远程调用，库存系统查询是否有库存
    Map\<Long, Boolean> stockMap = null;
    try {
        R r = wareFeignService.getSkuHasStock(skuIds);
        // key 是 SkuHasStockVo的 skuid value是 item的hasStock 是否拥有库存
        TypeReference\<List\<SkuHasStockVo>> typeReference = new TypeReference\<List\<SkuHasStockVo>>() {
        };
        stockMap = r.getData(typeReference).stream().collect(Collectors.toMap(SkuHasStockVo::getSkuId, item -> item.getHasStock()));
    } catch (Exception e) {
        log.error("库存服务异常：原因：{}",e);
        e.printStackTrace();
    }

    // 2、封装每个 sku 的信息
    Map\<Long, Boolean> finalStockMap = stockMap;
    List\<SkuEsModel> upProducts = skus.stream().map(sku -> {
        // 组装需要查询的数据
        SkuEsModel skuEsModel = new SkuEsModel();
        BeanUtils.copyProperties(sku, skuEsModel);
        skuEsModel.setSkuPrice(sku.getPrice());
        skuEsModel.setSkuImg(sku.getSkuDefaultImg());

        // 设置属性
        skuEsModel.setAttrs(attrList);

        // 设置库存信息
        if (finalStockMap == null) {
            // 远程服务出现问题，任然设置为null
            skuEsModel.setHasStock(true);
        } else {
            skuEsModel.setHasStock(finalStockMap.get(sku.getSkuId()));
        }
        //TODO 2、热度频分 0
        skuEsModel.setHotScore(0L);

        //TODO 3、查询品牌名字和分类的信息
        BrandEntity brandEntity = brandService.getById(skuEsModel.getBrandId());
        skuEsModel.setBrandName(brandEntity.getName());
        skuEsModel.setBrandImg(brandEntity.getLogo());
        CategoryEntity categoryEntity = categoryService.getById(skuEsModel.getCatalogId());
        skuEsModel.setCatalogName(categoryEntity.getName());

        return skuEsModel;
    }).collect(Collectors.toList());


    //TODO 5、将数据发送给 es保存 ，直接发送给 search服务
    R r = esFeignClient.productStatusUp(upProducts);
    if (r.getCode() == 0) {
        // 远程调用成功
        // TODO 6、修改当前 spu 的状态
        baseMapper.updateSpuStatus(spuId, ProductConstant.StatusEnum.SPU_UP.getCode());
    } else {
        // 远程调用失败
        //TODO 7、重复调用？ 接口冥等性 重试机制

        /**
         * 1、构造请求数据，将对象转成json
         * RequestTemplate template = buildTemplateFromArgs.create(argv);
         * 2、发送请求进行执行(执行成功进行解码)
         *  executeAndDecode(template);
         * 3、执行请求会有重试机制
         *  while (true) {
         *       try {
         *         return executeAndDecode(template);
         *       } catch (RetryableException e) {
         *         try {
         *           retryer.continueOrPropagate(e);
         *         } catch (RetryableException th) {
         *              throw cause;
         *         }
         *         continute
         */
    }
}
```

#### 2.2.1、发送远程调用，库存系统查询是否有库存

```java
/**
 * 根据 skuIds 查询是否有库存
 * @param skuIds
 * @return
 */
@PostMapping("/hasstock")
public R getSkuHasStock(@RequestBody List\<Long> skuIds) {
    List\<SkuHasStockVo> vos = wareSkuService.getSkusStock(skuIds);

    R ok = R.ok();
    ok.setData(vos);
    return ok;
}
```

Service

```java
@Override
public List\<SkuHasStockVo> getSkusStock(List\<Long> skuIds) {
    List\<SkuHasStockVo> collect = skuIds.stream().map(skuId -> {
        SkuHasStockVo vo = new SkuHasStockVo();
        // 查询当前 sku 的总库存良
        // SELECT SUM(stock-stock_locked) FROM `wms_ware_sku` WHERE sku_id = 1
        Long count = baseMapper.getSkuStock(skuId);

        vo.setSkuId(skuId);
        vo.setHasStock(count == null?false:count>0);

        return vo;
    }).collect(Collectors.toList());
    return collect;
}
```

#### 2.2.2 将数据发送给 es保存 ，直接发送给 search服务

controller

```java
/**
     * 上架商品
     * @param skuEsModelList
     * @return
     */
    @PostMapping("/product")
    public R productStatusUp(@RequestBody List\<SkuEsModel> skuEsModelList){
        boolean b = false;
        try {
            b = productSaveService.productStatusUp(skuEsModelList);
        } catch (Exception e) {
            log.error("ElasticSaveController商品上架错误：{}",e);
            return R.error(BizCodeEnume.PRODUCT_UP_EXCEPTION.getCode(),BizCodeEnume.PRODUCT_UP_EXCEPTION.getMsg());
        }
        if (!b) {
            return R.ok();
        } else {
            return R.error(BizCodeEnume.PRODUCT_UP_EXCEPTION.getCode(),BizCodeEnume.PRODUCT_UP_EXCEPTION.getMsg());
        }
    }

```

service

```java
@Override
public boolean productStatusUp(List\<SkuEsModel> skuEsModelList) throws IOException {
    
    // 保存到es
    // 批量保存
    BulkRequest bulkRequest = new BulkRequest();
    for (SkuEsModel model : skuEsModelList) {
        // 1、构造请求 指定es索引
        IndexRequest indexRequest = new IndexRequest(EsConstant.PRODUCT_INDEX);
        // 1.1 指定id
        indexRequest.id(model.getSkuId().toString());
        // 1.2 将对象esmodel对象转换成 json 进行存储
        String s = JSON.toJSONString(model);
        // 1.3 设置文档源
        indexRequest.source(s, XContentType.JSON);

        bulkRequest.add(indexRequest);
    }
    
    BulkResponse bulk = restHighLevelClient.bulk(bulkRequest, GulimallElasticsearchConfig.COMMON_OPTIONS);

    // TODO 1、 如果批量错误
    boolean b = bulk.hasFailures();
    List\<String> collect = Arrays.stream(bulk.getItems()).map(item -> {
        return item.getId();
    }).collect(Collectors.toList());
    log.error("商品上架完成：{}",collect);

    return b;
}
```



**业务流程总结：**

前端点击上架后，发送请求并带上参数 spuid

- 根据 `spuid` 查询 `pms_sku_info` 表得到商品相关属性

- ![image-20201028153205471](http://qnimg.gisfsde.com/work/image-20201028153205471.png)

- 根据 `spuid` 查询 `pms_product_attr_value` 表得到可以用来检索的规格属性

- ![image-20201028153038796](http://qnimg.gisfsde.com/work/image-20201028153038796.png)

  

- 从 `ProductAttrValueEntity` 中拿到所有的 attrId，根据 attrId 查询 `pms_attr` 查询检索的属性

- ![image-20201028155204710](http://qnimg.gisfsde.com/work/image-20201028155204710.png)

- x根据 `pms_attr`  查询到检索属性后，用检索属性和 原先根据 `spuid` 查询 `pms_sku_info` 表得到商品相关属性进行比较，`pms_sku_info` 包含 从 `pms_attr` 字段attr_id 则数据保存否则过滤

- 根据 `skuIds` 去查询远程仓库中是否有库存 SELECT SUM(stock-stock_locked) FROM `wms_ware_sku` WHERE sku_id = 1

- 组装数据 设置 SkuEsModel 

- 发送给 es 保存





# 3、商城业务 & 首页整合

### 3.1 整合 thymeleaf 渲染首页

**需求分析：**

开发传统Java WEB工程时，我们可以使用JSP页面模板语言，但是在SpringBoot中已经不推荐使用了。SpringBoot支持如下页面模板语言

- Thymeleaf
- FreeMarker
- Velocity
- Groovy
- JSP

thymeleaf 官网：https://www.thymeleaf.org/

官网文档给出了，语法、相关标签如何使用的步骤，由于官网文档都是英文，英文文档阅读能力好的同学可以选择阅读，英文不好的同学可以选择中文文档进行学习，为此我在网上找到了相关的中文文档：文档：thymeleaf
链接：http://note.youdao.com/noteshare?id=7771a96e9031b30b91ed55c50528e918

#### 3.1.2 SpringBoot 整合 thymeleaf

Pom.xml

```xml
\<dependency>
    \<groupId>org.springframework.boot\</groupId>
    \<artifactId>spring-boot-starter-thymeleaf\</artifactId>
    <!-- 版本后由SpringBoot进行管理-->
\</dependency>
```

application.yml

```yaml
Spring:
  thymeleaf:
    cache: false # 开发过程建议关闭缓存
```

resource 目录介绍：

![image-20201029102830164](http://qnimg.gisfsde.com/work/image-20201029102830164.png)



index.html中使用

```html
\<!DOCTYPE html>
<!--使用thymeleaf中必须声明加上该行代码-->
\<html lang="en"  xmlns:th="http://www.thymeleaf.org">
```

相关语法使用

```html
<!--和jsp相关表达式有点相似 具体使用过程参考文档-->
\<ul>
  \<li th:each="category : ${categorys}">
    \<a href="#" class="header_main_left_a"
       th:attr="ctg-data=${category.catId}">
      \<b th:text="${category.name}">家用电器\</b>\</a>
  \</li>
```

默认SpringBoot会直接去找 templates 下的 index.html 

![image-20201029103230550](http://qnimg.gisfsde.com/work/image-20201029103230550.png)

### 3.2 整合dev-tools 渲染分类数据

**需求分析：**

我们需要在页面的侧边查询出分类的数据，并且选中一级分类数据后显示二级和三级分类数据

![image-20201029103544553](http://qnimg.gisfsde.com/work/image-20201029103544553.png)

- 先获取一级分类数据
- 用户选中后在查询二级分类数据

Controller

```java
/**
 * 查询所有一级分类
 * @param model
 * @return
 */
@GetMapping({"/","/index.html"})
public String indexPage(Model model){

    // select * from category where parent_id = 0
    //TODO 1、查询所有的一级分类
    List\<CategoryEntity> categoryEntityList = categoryService.getLevel1Categorys();

    model.addAttribute("categorys",categoryEntityList);
    // 查询所有的一级分类
    return "index";
}
```

Service

```java
@Override
public List\<CategoryEntity> getLevel1Categorys() {
    // parent_cid为0则是一级目录
   return baseMapper.selectList(new QueryWrapper\<CategoryEntity>().eq("parent_cid",0));

}
```

一级分类数据能显示后，着手处理二级分类数据获取

Controller

```java
/**
 * 查询完整分类数据
 * @return
 */
@ResponseBody
@RequestMapping("/index/catalog.json")
public Map\<String, List\<Catelog2Vo>> getCatelogJson() {
    Map\<String, List\<Catelog2Vo>> catelogJson = categoryService.getCatelogJson();
    return catelogJson;
}
```

Service

```java
@Override
public Map\<String, List\<Catelog2Vo>> getCatelogJson() {

    // 1、查询所有1级分类
    List\<CategoryEntity> level1Categorys = getLevel1Categorys();
    // 2、封装数据封装成 map类型  key为 catId,value List\<Catelog2Vo>
    Map\<String, List\<Catelog2Vo>> categoryList = level1Categorys.stream().collect(Collectors.toMap(k -> k.getCatId().toString(), v -> {
        // 1、每一个的一级分类，查询到这个一级分类的二级分类
        List\<CategoryEntity> categoryEntities = baseMapper.selectList(new QueryWrapper\<CategoryEntity>().eq("parent_cid", v.getCatId()));
        // 2、封装上面的结果
        List\<Catelog2Vo> catelog2Vos = null;
        if (categoryEntities != null) {
            catelog2Vos = categoryEntities.stream().map(l2 -> {
                Catelog2Vo catelog2Vo = new Catelog2Vo(v.getCatId().toString(), null, l2.getCatId().toString(), l2.getName());
                // 1、查询当前二级分类的三级分类vo
                List\<CategoryEntity> categoryEntities1 = baseMapper.selectList(new QueryWrapper\<CategoryEntity>().eq("parent_cid", l2.getCatId()));
                if (categoryEntities1 != null ){
                    // 2、分装成指定格式
                    List\<Catelog2Vo.catelog3Vo> catelog3VoList = categoryEntities1.stream().map(l3 -> {
                        Catelog2Vo.catelog3Vo catelog3Vo = new Catelog2Vo.catelog3Vo(l2.getCatId().toString(), l3.getCatId().toString(), l3.getName());
                        return catelog3Vo;
                    }).collect(Collectors.toList());
                    // 3、设置分类数据
                    catelog2Vo.setCatalog3List(catelog3VoList);
                 }
                return catelog2Vo;
            }).collect(Collectors.toList());
        }
        return catelog2Vos;
    }));
    // 2、封装数据
    return categoryList;
}
```

**上方代码具体业务逻辑：**

- 查询到一级分类，根据一级分类查询出二级分类并设置对应Vo对象，以此类推



# 4、商城业务 & Nginx 域名访问

### 4.1 Nginx 搭建域名环境一（反向代理配置）

什么是 反向代理?

![image-20201029051037570](http://qnimg.gisfsde.com/work/image-20201029051037570.png)

vi nginx.conf 文件后在底部有该条语句：

- 引入nginx下的 conf.d 下面的conf文件
- 那么我们开始在该目录下增加关于 谷粒商城的 nginx

![image-20201029045921936](http://qnimg.gisfsde.com/work/image-20201029045921936.png)

拷贝原先默认的 conf

![image-20201029050207857](http://qnimg.gisfsde.com/work/image-20201029050207857.png)

修改

![image-20201029050136324](http://qnimg.gisfsde.com/work/image-20201029050136324.png)



### 4.2 Nginx 搭建域名环境二 （负载均衡到网关）

 配置 UpStream

![image-20201029050256216](http://qnimg.gisfsde.com/work/image-20201029050256216.png)



使用nginx实现负载平衡的最简单配置如下,官网地址：https://nginx.org/en/docs/http/load_balancing.html

```http
http {
    upstream myapp1 {
        server srv1.example.com;
        server srv2.example.com;
        server srv3.example.com;
    }

    server {
        listen 80;

        location / {
            proxy_pass http://myapp1;
        }
    }
}
```

同时在 本机上 hosts 文件上那个配置 域名映射

![image-20201029050625740](http://qnimg.gisfsde.com/work/image-20201029050625740.png)

将请求转接给网关后，需要在网关配置

```yaml
- id: gulimall_host_route
  uri: lb://gulimall-product
  predicates:
    - Host=**.gulimall.com
```

最后放几张图方便理解哈

![image-20201029050828421](http://qnimg.gisfsde.com/work/image-20201029050828421.png)



![image-20201029050901546](http://qnimg.gisfsde.com/work/image-20201029050901546.png)









# 5、性能压测 & 压力测试

**简介**

压力测试考察当前软硬件环境下系统所能承受住的最大负荷并帮助找出系统的瓶颈所在，压测都是为了系统在线上的处理能力和稳定性维持在一个标准范围内，做到心中有数。使用压力测试，我们有希望找到很多种用其他测试方法更难发现的错误，有两种错误类型是：`内存泄漏、并发与同步`

有效的压力测试系统将应用以下这些关键条件：`重复、并发、量级、随机变化`

### 5.1 性能指标

#### 5.1.1 Jvm 内存模型

1、Jvm内存模型

![image-20201029112517466](http://qnimg.gisfsde.com/work/image-20201029112517466.png)



![image-20201029113956043](http://qnimg.gisfsde.com/work/image-20201029113956043.png)



#### 5.1.2 堆

所有的对象实例以及数组都要在堆上分配，堆时垃圾收集器管理的主要区域，也被称为 "GC堆"，也是我们优化最多考虑的地方

堆可以细分为：

- 新生代
  - Eden空间
  - From Survivor 空间
  - To Survivor 空间

- 老年代

- 永久代/原空间
  - Java8 以前永久代、受 JVM 管理、Java8 以后原空间，直接使用物理内存，因此默认情况下，原空间的大小仅受本地内存限制

垃圾回收

![image-20201029114153244](http://qnimg.gisfsde.com/work/image-20201029114153244.png)

从 Java8 开始,HotSpot 已经完全将永久代（Permanent Generation）移除，取而代之的是一个新的区域 - 元空间（MetaSpac)

<img src="http://qnimg.gisfsde.com/work/image-20201029114652885.png" alt="http://qnimg.gisfsde.com/work/image-20201029114652885"  />



![image-20201029114218716](http://qnimg.gisfsde.com/work/image-20201029114218716.png)

#### 5.1.3 jconsole 与 jvisualvm

jdk 的两个小工具 jconsole、jvisualvm（升级版本的 jconsole）。通过命令行启动、可监控本地和远程应用、远程应用需要配置

1、jvisualvm 能干什么

监控内存泄漏、跟踪垃圾回收、执行时内存、cpu分析、线程分析.....

![image-20201029120502383](http://qnimg.gisfsde.com/work/image-20201029120502383.png)

运行：正在运行的线程

休眠：sleep

等待：wait

驻留：线程池里面的空闲线程

监视：组赛的线程、正在等待锁

2、安装插件方便查看 gc

cmd 启动 jvisualvm

工具->插件

![image-20201029121108492](http://qnimg.gisfsde.com/work/image-20201029121108492.png)



如果503 错误解决

打开网址： https://visualvm.github.io/pluginscenters.html

cmd 查看自己的jdk版本，找到对应的

docker stats 查看相关命令

#### 5.1.4 监控指标

SQL 耗时越小越好、一般情况下微妙级别

命中率越高越好、一般情况下不能低于95%

锁等待次数越低越好、等待时间越短越好

##### 1、中间件指标

毫秒 

|                  压测内容                  | 压测线程数 | 吞吐量/ms                   | 90%响应时间/ms | 99%响应时间/ms |
| :----------------------------------------: | ---------- | --------------------------- | -------------- | -------------- |
|                 **Nginx**                  | 50         | 1834                        | 11             | 40             |
|                **GateWay**                 | 50b        | 16577                       | 5              | 19             |
|                **简单服务**                | 50         | 17965                       | 5              | 10             |
|            **首页一级菜单渲染**            | 50         | 400（慢的原因db,thymeleaf） | 149            | 230            |
|            **首页渲染(开缓存)**            | 50         | 467                         | 128            | 209            |
| **首页渲染（开缓存、优化数据库，关日志）** | 50         | 1300                        | 60             | 107            |
|            **三级分类数据获取**            | 50         | 4.4（db）/18（优化后）      | 16622          | 16832          |
|      **三级分类数据获取（优化业务）**      | 50         | 163                         | 410            | 585            |
|     **三级分类数据获取（redis缓存）**      | 50         | 553                         | 113            | 182            |
|            **首页全量数据获取**            | 50         | 10（静态资源）/12           | 6183           | 12358          |
|               Nginx+Gateway                | 50         |                             |                |                |
|              Gateway+简单服务              | 50         | 2685                        | 7              | 10             |
|                   全链路                   | 50         | 900                         | 73             | 971            |

- 中间件越多，性能损失越大，大多都损失在了网络交互
- 业务：
  - DB(MySQL优化)
  - 模板的渲染速度
  - 静态资源
- 底层JVM

##### 2、数据库指标

- **响应时间**（Response Time:RT）响应时间指用户从客户端发起一个请求开始，到客户端接收到服务器端返回的响应结束，整个过程所耗费的时间
- **HPS**（Hits Per Second） ：每秒点击次数，单位是次/秒
- **TPS**（Transaction per Second）：系统每秒处理交易数，单位是笔/秒
- **QPS** (Query perSecond) :系统每秒处理查询次数，单位是次/秒。对于互联网业务中，如果某些业务有且仅有一个请求连接，那么TPS=QPS=HPS，一般情况下用TPS来衡量整个业务流程，用QPS来衡量接口查询次数，用HPS来表示对服务器单击请求。
- 无论TPS、QPS、HPS,此指标是衡量系统处理能力非常重要的指标，越大越好，根据经验，一般情况下:
  - 金融行业: 1000TPS~50000TPS, 不包括互联网化的活动
  - 保险行业: 1007P-00000PS， 不包括互联网化的活动
  - 制造行业: 10TPS~5000TPS
  - 互联网电子商务: 10000TPS~-100000TPS
  - 互联网中型网站: 1000TPS~50000TPS
  - 互联网小型网站: 5007PS~10000TPS

- **最大响应时间**(Max Response Time) 指用户发出请求或者指令到系统做出反应(响应)的最大时间。
- **最少响应时间** （Mininum ResponseTime）指用户发出请求或者指令到系统做出反应（响应）的最少时间
- **90%响应时间**（90% Response Time） 是指所有用户的响应时间进行排序、第90%的响应时间
- 从外部看、性能测试主要关注如下三个指
  - 吞吐量：每秒钟系统能够处理的请求数、任务数
  - 响应时间：服务处理一个请求或一个任务的耗时
  - 错误率：一批请求中结果出错的请求所占比例

吞吐量大:系统支持高并发，

响应时间：越短说明接口性能越好



### 5.2 JMeter

#### 5.2.1 JMeter 安装

jmeter官网：https://jmeter.apache.org/

#### 5.2.2 JMeter 压测示例

##### 1、添加线程组

![image-20201029084634498](http://qnimg.gisfsde.com/work/image-20201029084634498.png)

##### 2、添加 HTTP 请求

![image-20201029085843220](http://qnimg.gisfsde.com/work/image-20201029085843220.png)

##### 3、添加监听器

![image-20201029085942442](http://qnimg.gisfsde.com/work/image-20201029085942442.png)

##### 4、启动压测&查看

汇总图

![image-20201029092357910](http://qnimg.gisfsde.com/work/image-20201029092357910.png)

察看结果树

![image-20201029092436633](http://qnimg.gisfsde.com/work/image-20201029092436633.png)

汇总报告

![image-20201029092454376](http://qnimg.gisfsde.com/work/image-20201029092454376.png)



聚合报告

![image-20201029092542876](http://qnimg.gisfsde.com/work/image-20201029092542876.png)



#### 5.2.3 JMeter Address Already in use 错误解决

windows本身提供的端口访问机制的问题。
Windows提供给TCP/IP 链接的端口为1024-5000，并且要四分钟来循环回收他们。就导致
我们在短时间内跑大量的请求时将端口占满了。

1.cmd中，用regedit命令打开注册表

2.在HKEY_ LOCAL MACHINE\SYSTEMCurrentControlSet\Services Tcpip\Parameters下，

​	1.右击parameters,添加一个新的DWORD,名字为MaxUserPort
​	2.然后双击 MaxUserPort,输入数值数据为65534,基数选择十进制(如果是分布式运行的话，控制机器和负载机器都需要这样操作哦)

3.修改配置完毕之后记得重启机器才会生效

TCPTimedWaitDelay:30



# 6、缓存与分布式锁

### 6.1 缓存

#### 6.1.2 缓存使用

为了系统性能的提升，我们一般都会将部分数据放入缓存中，加速访问，而 db 承担数据落盘工作

**哪些数据适合放入缓存？**

- **即时性、数据一致性要求不高的**
- **访问量大且更新频率不高的数据（读多、写少）**

举例：电商类应用、商品分类，商品列表等适合缓存并加一个失效时间（根据数据更新频率来定）后台如果发布一个商品、买家需要 5 分钟才能看到新商品一般还是可以接受的。

![image-20201030190425556](http://qnimg.gisfsde.com/work/image-20201030190425556.png)

伪代码

```java
data = cche.load(b); //从缓存中加载数据
if(data == null) {
    data = db.load(id); // 从数据库加载数据
    cache.put(id,data); // 保存到 cache中
}
return data;
```

注意：在开发中，凡是放到缓存中的数据我们都应该制定过期时间，使其可以在系统即使没有主动更新数据也能自动触发数据加载的流程，避免业务奔溃导致的数据永久不一致的问题



#### 6.1.3 整合 redis 作为缓存

##### 1、引入依赖

SpringBoot 整合 redis，查看SpringBoot提供的 starts

![image-20201031154148722](http://qnimg.gisfsde.com/work/image-20201031154148722.png)

官网：https://docs.spring.io/spring-boot/docs/2.1.18.RELEASE/reference/html/using-boot-build-systems.html#using-boot-starter

pom.xml

     * TODO 产生堆外内存溢出：OutOfDirectMemoryError
     * 1)、springboot2.a以后默认使用lettuce作为操作redis的客户端。它使用netty进行网络通信。
     * 2)、lettuce的bug导致netty堆外内存溢出-Xmx300m;netty如果没有指定堆外内存，默认使用-Xmx300m
     * 可以通过-Dio.netty.maxDirectMemory进行设置
     * 解决方案：不能使用-Dio.netty.maxDirectMemory只去调大堆外内存。
     * )、升级lettuce客户端。2)、切换使用jedis
```xml
 <!--引入redis-->

        \<dependency>
            \<groupId>org.springframework.boot\</groupId>
            \<artifactId>spring-boot-starter-data-redis\</artifactId>
            <!--不加载自身的 lettuce-->
            \<exclusions>
                \<exclusion>
                    \<groupId>io.lettuce\</groupId>
                    \<artifactId>lettuce-core\</artifactId>
                \</exclusion>
            \</exclusions>
        \</dependency>

        <!--jedis-->
        \<dependency>
            \<groupId>redis.clients\</groupId>
            \<artifactId>jedis\</artifactId>
        \</dependency>
```

##### 2、配置

application.yaml

```yaml
Spring:
  redis:
    host: 192.168.56.10
    port: 6379
```

RedisAutoConfig.java

![image-20201031154710108](http://qnimg.gisfsde.com/work/image-20201031154710108.png)

##### 3、测试

```java
@Autowired
StringRedisTemplate stringRedisTemplate;

@Test
public void testStringRedisTemplate() {

    stringRedisTemplate.opsForValue().set("hello","world_" + UUID.randomUUID().toString());
    String hello = stringRedisTemplate.opsForValue().get("hello");
    System.out.println("之前保存的数据是：" + hello);
}
```

##### 4、优化三级分类数据获取

```java
/**
 * TODO 产生堆外内存溢出 OutOfDirectMemoryError
 * 1、SpringBoot2.0以后默认使用 Lettuce作为操作redis的客户端，它使用 netty进行网络通信
 * 2、lettuce 的bug导致netty堆外内存溢出，-Xmx300m netty 如果没有指定堆内存移除，默认使用 -Xmx300m
 *      可以通过-Dio.netty.maxDirectMemory 进行设置
 *   解决方案 不能使用 -Dio.netty.maxDirectMemory调大内存
 *   1、升级 lettuce客户端，2、 切换使用jedis
 *   redisTemplate:
 *   lettuce、jedis 操作redis的底层客户端，Spring再次封装
 * @return
 */
@Override
public Map\<String, List\<Catelog2Vo>> getCatelogJson() {

    // 给缓存中放 json 字符串、拿出的是 json 字符串，还要逆转为能用的对象类型【序列化和反序列化】

    // 1、加入缓存逻辑，缓存中放的数据是 json 字符串
    // JSON 跨语言，跨平台兼容
    String catelogJSON = redisTemplate.opsForValue().get("catelogJSON");
    if (StringUtils.isEmpty(catelogJSON)) {
        // 2、缓存没有，从数据库中查询
        Map\<String, List\<Catelog2Vo>> catelogJsonFromDb = getCatelogJsonFromDb();
        // 3、查询到数据，将数据转成 JSON 后放入缓存中
        String s = JSON.toJSONString(catelogJsonFromDb);
        redisTemplate.opsForValue().set("catelogJSON",s);
        return catelogJsonFromDb;
    }
    // 转换为我们指定的对象
    Map\<String, List\<Catelog2Vo>> result = JSON.parseObject(catelogJSON, new TypeReference\<Map\<String, List\<Catelog2Vo>>>() {});

    return result;
}
```



### 6.2 缓存失效

#### 高并发下缓存失效问题 

##### 缓存失效

![](http://qnimg.gisfsde.com/work/image-20201031163704355.png)

##### 缓存雪崩

![image-20201031163949881](http://qnimg.gisfsde.com/work/image-20201031163949881.png)

##### 缓存击穿

![image-20201031164021131](http://qnimg.gisfsde.com/work/image-20201031164021131.png)

##### 分布式下如何加锁

![image-20201031112235353](http://qnimg.gisfsde.com/work/image-20201031112235353.png)



### 6.3分布式锁

#### 分布式锁原理与应用

##### 分布式锁基本原理

![image-20201031122557660](http://qnimg.gisfsde.com/work/image-20201031122557660.png)

**理解：**就先当1000个人去占一个厕所，厕所只能有一个人占到这个坑，占到这个坑其他人就只能在外面等待，等待一段时间后可以再次来占坑，业务执行后，释放锁，那么其他人就可以来占这个坑



##### 分布式锁演进 - 阶段一

![image-20201031123441336](http://qnimg.gisfsde.com/work/image-20201031123441336.png)

**代码：**

```java
 Boolean lock = redisTemplate.opsForValue().setIfAbsent("lock", "0");
        if (lock) {
            // 加锁成功..执行业务
            Map\<String,List\<Catelog2Vo>> dataFromDb = getDataFromDB();
            redisTemplate.delete("lock"); // 删除锁
            return dataFromDb;
        } else {
            // 加锁失败，重试 synchronized()
            // 休眠100ms重试
            return getCatelogJsonFromDbWithRedisLock();
        }
```

##### 分布式锁演进 - 阶段二

![image-20201031123640746](http://qnimg.gisfsde.com/work/image-20201031123640746.png)

**代码：**

```java
 Boolean lock = redisTemplate.opsForValue().setIfAbsent()
        if (lock) {
            // 加锁成功..执行业务
            // 设置过期时间
            redisTemplate.expire("lock",30,TimeUnit.SECONDS);
            Map\<String,List\<Catelog2Vo>> dataFromDb = getDataFromDB();
            redisTemplate.delete("lock"); // 删除锁
            return dataFromDb;
        } else {
            // 加锁失败，重试 synchronized()
            // 休眠100ms重试
            return getCatelogJsonFromDbWithRedisLock();
        }

```

##### 分布式锁演进 - 阶段三

![image-20201031124210112](http://qnimg.gisfsde.com/work/image-20201031124210112.png)

**代码：**

```java
// 设置值同时设置过期时间
Boolean lock = redisTemplate.opsForValue().setIfAbsent("lock","111",300,TimeUnit.SECONDS);
if (lock) {
    // 加锁成功..执行业务
    // 设置过期时间,必须和加锁是同步的，原子的
    redisTemplate.expire("lock",30,TimeUnit.SECONDS);
    Map\<String,List\<Catelog2Vo>> dataFromDb = getDataFromDB();
    redisTemplate.delete("lock"); // 删除锁
    return dataFromDb;
} else {
    // 加锁失败，重试 synchronized()
    // 休眠100ms重试
    return getCatelogJsonFromDbWithRedisLock();
}
```

##### 分布式锁演进 - 阶段四

![image-20201031124615670](http://qnimg.gisfsde.com/work/image-20201031124615670.png)

图解：

![image-20201031130547173](http://qnimg.gisfsde.com/work/image-20201031130547173.png)

代码：

```java
 String uuid = UUID.randomUUID().toString();
        // 设置值同时设置过期时间
        Boolean lock = redisTemplate.opsForValue().setIfAbsent("lock",uuid,300,TimeUnit.SECONDS);
        if (lock) {
            // 加锁成功..执行业务
            // 设置过期时间,必须和加锁是同步的，原子的
//            redisTemplate.expire("lock",30,TimeUnit.SECONDS);
            Map\<String,List\<Catelog2Vo>> dataFromDb = getDataFromDB();
//            String lockValue = redisTemplate.opsForValue().get("lock");
//            if (lockValue.equals(uuid)) {
//                // 删除我自己的锁
//                redisTemplate.delete("lock"); // 删除锁
//            }
// 通过使用lua脚本进行原子性删除
            String script = "if redis.call('get',KEYS[1]) == ARGV[1] then return redis.call('del',KEYS[1]) else return 0 end";
                //删除锁
                Long lock1 = redisTemplate.execute(new DefaultRedisScript\<Long>(script, Long.class), Arrays.asList("lock"), uuid);

            return dataFromDb;
        } else {
            // 加锁失败，重试 synchronized()
            // 休眠100ms重试
            return getCatelogJsonFromDbWithRedisLock();
        }

```

##### 分布式锁演进 - 阶段五 最终模式

![image-20201031130201609](http://qnimg.gisfsde.com/work/image-20201031130201609.png)

代码：

```java
 String uuid = UUID.randomUUID().toString();
        // 设置值同时设置过期时间
        Boolean lock = redisTemplate.opsForValue().setIfAbsent("lock",uuid,300,TimeUnit.SECONDS);
        if (lock) {
            System.out.println("获取分布式锁成功");
            // 加锁成功..执行业务
            // 设置过期时间,必须和加锁是同步的，原子的
//            redisTemplate.expire("lock",30,TimeUnit.SECONDS);
            Map\<String,List\<Catelog2Vo>> dataFromDb;
//            String lockValue = redisTemplate.opsForValue().get("lock");
//            if (lockValue.equals(uuid)) {
//                // 删除我自己的锁
//                redisTemplate.delete("lock"); // 删除锁
//            }
            try {
                dataFromDb = getDataFromDB();
            } finally {
                String script = "if redis.call('get',KEYS[1]) == ARGV[1] then return redis.call('del',KEYS[1]) else return 0 end";
                //删除锁
                Long lock1 = redisTemplate.execute(new DefaultRedisScript\<Long>(script, Long.class), Arrays.asList("lock"), uuid);
            }
            return dataFromDb;
        } else {
            // 加锁失败，重试 synchronized()
            // 休眠200ms重试
            System.out.println("获取分布式锁失败，等待重试");
            try { TimeUnit.MILLISECONDS.sleep(200); } catch (InterruptedException e) { e.printStackTrace(); }
            return getCatelogJsonFromDbWithRedisLock();
        }
```



问题：

- 分布式加锁解锁都是这两套代码，可以封装成工具类
- 分布式锁有更专业的框架



#### 分布式锁 - Redisson

##### 1、简介&整合

官网文档上详细说明了 不推荐使用 setnx来实现分布式锁，应该参考 the Redlock algorithm 的实现

![image-20201101050725534](http://qnimg.gisfsde.com/work/image-20201101050725534.png)

 the Redlock algorithm：https://redis.io/topics/distlock

在Java 语言环境下使用 Redisson

![image-20201101050924914](http://qnimg.gisfsde.com/work/image-20201101050924914.png)

github：https://github.com/redisson/redisson

有对应的 中文文档

在 Maven 仓库中搜索也能搜索出 Redisson

![image-20201101051157803](http://qnimg.gisfsde.com/work/image-20201101051157803.png)

Pom

```xml
<!--以后使用 redisson 作为分布锁，分布式对象等功能-->
\<dependency>
    \<groupId>org.redisson\</groupId>
    \<artifactId>redisson\</artifactId>
    \<version>3.12.0\</version>
\</dependency>
```

config

```java
package com.atguigu.gulimall.product.config;

import org.redisson.Redisson;
import org.redisson.api.RedissonClient;
import org.redisson.config.Config;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;

/**
 * Created with IntelliJ IDEA.
 *
 * @Author: lxl
 * @Date: 2022/09/26/18:08
 * @Description:
 */
@Configuration
public class MyRedissonConfig {
    /**
     * 注入客户端实例对象
     */
    @Bean(destroyMethod="shutdown")
    public RedissonClient redisson(@Value("${spring.redis.host}") String host, @Value("${spring.redis.port}")String port) throws IOException {
        // 1.创建配置
        Config config = new Config();
        config.useSingleServer().setAddress("redis://192.168.56.10:6379");// 单节点模式
//        config.useSingleServer().setAddress("redis://" + host + ":" + port);// 单节点模式
//        config.useSingleServer().setAddress("rediss://" + host + ":" + port);// 使用安全连接
//        config.useClusterServers().addNodeAddress("127.0.0.1:7004", "127.0.0.1:7001");// 集群模式
        // 2.创建redisson客户端实例
        RedissonClient redissonClient = Redisson.create(config);
        return redissonClient;
    }
}

```

test

```java
    @Autowired
    RedissonClient redissonClient;
    @Test
    public void testRedssion() {
        System.out.println(redissonClient);
    }
```

##### 2、Redisson - Lock 锁测试 & Redisson - Lock 看门狗原理 - Redisson 如何解决死锁

```java
@RequestMapping("/hello")
@ResponseBody
public String hello(){
    // 1、获取一把锁，只要锁得名字一样，就是同一把锁
    RLock lock = redission.getLock("my-lock");

    // 2、加锁
    lock.lock(); // 阻塞式等待，默认加的锁都是30s时间
    // 1、锁的自动续期，如果业务超长，运行期间自动给锁续上新的30s，不用担心业务时间长，锁自动过期后被删掉
    // 2、加锁的业务只要运行完成，就不会给当前锁续期，即使不手动解锁，锁默认会在30s以后自动删除

    lock.lock(10, TimeUnit.SECONDS); //10s 后自动删除
    //问题 lock.lock(10, TimeUnit.SECONDS) 在锁时间到了后，不会自动续期
    // 1、如果我们传递了锁的超时时间，就发送给 redis 执行脚本，进行占锁，默认超时就是我们指定的时间
    // 2、如果我们为指定锁的超时时间，就是用 30 * 1000 LockWatchchdogTimeout看门狗的默认时间、
    //      只要占锁成功，就会启动一个定时任务，【重新给锁设置过期时间，新的过期时间就是看门狗的默认时间】,每隔10s就自动续期
    //      internalLockLeaseTime【看门狗时间】 /3,10s

    //最佳实践
    // 1、lock.lock(10, TimeUnit.SECONDS);省掉了整个续期操作，手动解锁

    try {
        System.out.println("加锁成功，执行业务..." + Thread.currentThread().getId());
        Thread.sleep(3000);
    } catch (Exception e) {

    } finally {
        // 解锁 将设解锁代码没有运行，reidsson会不会出现死锁
        System.out.println("释放锁...." + Thread.currentThread().getId());
        lock.unlock();
    }

    return "hello";
}
```

进入到 `Redisson` Lock 源码

1、进入 `Lock` 的实现 发现 他调用的也是 `lock` 方法参数  时间为 -1

![image-20201101051659465](http://qnimg.gisfsde.com/work/image-20201101051659465.png)

2、再次进入 `lock` 方法

发现他调用了 tryAcquire

![image-20201101051925487](http://qnimg.gisfsde.com/work/image-20201101051925487.png)

3、进入 tryAcquire

![image-20201101052008724](http://qnimg.gisfsde.com/work/image-20201101052008724.png)

4、里头调用了 tryAcquireAsync

这里判断 laseTime != -1 就与刚刚的第一步传入的值有关系

![image-20201101052037959](http://qnimg.gisfsde.com/work/image-20201101052037959.png)

5、进入到 `tryLockInnerAsync` 方法

![image-20201101052158592](http://qnimg.gisfsde.com/work/image-20201101052158592.png)



6、`internalLockLeaseTime` 这个变量是锁的默认时间

这个变量在构造的时候就赋初始值

![image-20201101052346059](http://qnimg.gisfsde.com/work/image-20201101052346059.png)

7、最后查看 `lockWatchdogTimeout` 变量

也就是30秒的时间

![image-20201101052428198](http://qnimg.gisfsde.com/work/image-20201101052428198.png)



##### 3、Reidsson - 读写锁

二话不说，上代码！！！

```java
/**
     * 保证一定能读取到最新数据，修改期间，写锁是一个排他锁（互斥锁，独享锁）读锁是一个共享锁
     * 写锁没释放读锁就必须等待
     * 读 + 读 相当于无锁，并发读，只会在 reids中记录好，所有当前的读锁，他们都会同时加锁成功
     * 写 + 读 等待写锁释放
     * 写 + 写 阻塞方式
     * 读 + 写 有读锁，写也需要等待
     * 只要有写的存在，都必须等待
     * @return String
     */
    @RequestMapping("/write")
    @ResponseBody
    public String writeValue() {

        RReadWriteLock lock = redission.getReadWriteLock("rw_lock");
        String s = "";
        RLock rLock = lock.writeLock();
        try {
            // 1、改数据加写锁，读数据加读锁
            rLock.lock();
            System.out.println("写锁加锁成功..." + Thread.currentThread().getId());
            s = UUID.randomUUID().toString();
            try { TimeUnit.SECONDS.sleep(3); } catch (InterruptedException e) { e.printStackTrace(); }
            redisTemplate.opsForValue().set("writeValue",s);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            rLock.unlock();
            System.out.println("写锁释放..." + Thread.currentThread().getId());
        }
        return s;
    }

    @RequestMapping("/read")
    @ResponseBody
    public String readValue() {
        RReadWriteLock lock = redission.getReadWriteLock("rw_lock");
        RLock rLock = lock.readLock();
        String s = "";
        rLock.lock();
        try {
            System.out.println("读锁加锁成功..." + Thread.currentThread().getId());
            s = (String) redisTemplate.opsForValue().get("writeValue");
            try { TimeUnit.SECONDS.sleep(3); } catch (InterruptedException e) { e.printStackTrace(); }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            rLock.unlock();
            System.out.println("读锁释放..." + Thread.currentThread().getId());
        }
        return s;
    }

```

来看下官网的解释

![image-20201101053042268](http://qnimg.gisfsde.com/work/image-20201101053042268.png)

##### 4、Redisson - 闭锁测试

官网！！！

![image-20201101053053554](http://qnimg.gisfsde.com/work/image-20201101053053554.png)

上代码



```java
/**
 * 放假锁门
 * 1班没人了
 * 5个班级走完，我们可以锁们了
 * @return
 */
@GetMapping("/lockDoor")
@ResponseBody
public String lockDoor() throws InterruptedException {
    RCountDownLatch door = redission.getCountDownLatch("door");
    door.trySetCount(5);
    door.await();//等待闭锁都完成

    return "放假了....";
}
@GetMapping("/gogogo/{id}")
@ResponseBody
public String gogogo(@PathVariable("id") Long id) {
    RCountDownLatch door = redission.getCountDownLatch("door");
    door.countDown();// 计数器减一

    return id + "班的人走完了.....";
}
```

和 JUC 的 CountDownLatch 一致

await()等待闭锁完成

countDown() 把计数器减掉后 await就会放行

##### 5、Redisson - 信号量测试

官网！！！

![image-20201101053450708](http://qnimg.gisfsde.com/work/image-20201101053450708.png)



```java
/**
 * 车库停车
 * 3车位
 * @return
 */
@GetMapping("/park")
@ResponseBody
public String park() throws InterruptedException {
    RSemaphore park = redission.getSemaphore("park");
    boolean b = park.tryAcquire();//获取一个信号，获取一个值，占用一个车位

    return "ok=" + b;
}

@GetMapping("/go")
@ResponseBody
public String go() {
    RSemaphore park = redission.getSemaphore("park");

    park.release(); //释放一个车位

    return "ok";
}
```

类似 JUC 中的 Semaphore 



##### 6、Redission - 缓存一致性解决

### 6.4缓存数据一致性

#### 缓存数据一致性 - 双写模式

![image-20201101053613373](http://qnimg.gisfsde.com/work/image-20201101053613373.png)

两个线程写 最终只有一个线程写成功，后写成功的会把之前写的数据给覆盖，这就会造成脏数据

#### 缓存数据一致性 - 失效模式

![image-20201101053834126](http://qnimg.gisfsde.com/work/image-20201101053834126.png)

三个连接 

一号连接 写数据库 然后删缓存

二号连接 写数据库时网络连接慢，还没有写入成功

三号链接 直接读取数据，读到的是一号连接写入的数据，此时 二号链接写入数据成功并删除了缓存，三号开始更新缓存发现更新的是二号的缓存

#### 缓存数据一致性解决方案

无论是双写模式还是失效模式，都会到这缓存不一致的问题，即多个实力同时更新会出事，怎么办？

- 1、如果是用户纬度数据（订单数据、用户数据），这并发几率很小，几乎不用考虑这个问题，缓存数据加上过期时间，每隔一段时间触发读的主动更新即可
- 2、如果是菜单，商品介绍等基础数据，也可以去使用 canal 订阅，binlog 的方式
- 3、缓存数据 + 过期时间也足够解决大部分业务对缓存的要求
- 4、通过加锁保证并发读写，写写的时候按照顺序排好队，读读无所谓，所以适合读写锁，（业务不关心脏数据，允许临时脏数据可忽略）

总结:

- 我们能放入缓存的数据本来就不应该是实时性、一致性要求超高的。所以缓存数据的时候加上过期时间，保证每天拿到当前的最新值即可
- 我们不应该过度设计，增加系统的复杂性
- 遇到实时性、一致性要求高的数据，就应该查数据库，即使慢点



### 6.5 Spring Cache

#### 1、简介

- Spring 从3.1开始定义了 `org.springframework.cache.Cache` 和 `org.sprngframework.cache.CacheManager` 接口睐统一不同的缓存技术
- 并支持使用 `JCache`（JSR-107）注解简化我们的开发
- Cache 接口为缓存的组件规范定义，包含缓存的各种操作集合 `Cache` 接口下 Spring 提供了各种 XXXCache的实现，如 `RedisCache`、`EhCache`,`ConcrrentMapCache`等等，
- 每次调用需要缓存功能实现方法的时候，`Spring` 会检查检查指定参数的马努表犯法是否已经被嗲用过，如果有就直接从缓存中获取方法调用后的结果，如果没有就调用方法并缓存结果后返回给用户，下次直接调用从缓存中获取
- 使用 `Sprng` 缓存抽象时我们需要关注的点有以下两点
  - 1、确定方法需要被缓存以及他们的的缓存策略
  - 2、从缓存中读取之前缓存存储的数据

官网地址：https://docs.spring.io/spring-framework/docs/5.2.10.RELEASE/spring-framework-reference/integration.html#cache-strategie

缓存注解配置

![image-20201228171806703](http://qnimg.gisfsde.com/work/image-20201228171806703.png)

#### 2、基础概念

从3.1版本开始，Spring 框架就支持透明地向现有 Spring 应用程序添加缓存。与事务支持类似，缓存抽象允许在对代码影响最小的情况下一致地使用各种缓存解决方案。从 Spring 4.1 开始，缓存抽象在JSR-107注释和更多定制选项的支持下得到了显著扩展。

```java
 /**
 *  8、整合SpringCache简化缓存开发
 *      1、引入依赖
 *          spring-boot-starter-cache
 *      2、写配置
 *          1、自动配置了那些
 *              CacheAutoConfiguration会导入 RedisCacheConfiguration
 *              自动配置好了缓存管理器，RedisCacheManager
 *          2、配置使用redis作为缓存
 *          Spring.cache.type=redis
 *
 *       4、原理
 *       CacheAutoConfiguration ->RedisCacheConfiguration ->
 *       自动配置了 RedisCacheManager ->初始化所有的缓存 -> 每个缓存决定使用什么配置
 *       ->如果redisCacheConfiguration有就用已有的，没有就用默认的
 *       ->想改缓存的配置，只需要把容器中放一个 RedisCacheConfiguration 即可
 *       ->就会应用到当前 RedisCacheManager管理所有缓存分区中
 */
```

#### 3、注解

对于缓存声明，Spring的缓存抽象提供了一组Java注解

```java
/**
@Cacheable: Triggers cache population:触发将数据保存到缓存的操作
@CacheEvict: Triggers cache eviction: 触发将数据从缓存删除的操作
@CachePut: Updates the cache without interfering with the method execution:不影响方法执行更新缓存
@Caching: Regroups multiple cache operations to be applied on a method:组合以上多个操作
@CacheConfig: Shares some common cache-related settings at class-level:在类级别共享缓存的相同配置
**/
```

**注解使用**

```java
/**
     * 1、每一个需要缓存的数据我们都需要指定放到那个名字的缓存【缓存分区的划分【按照业务类型划分】】
     * 2、@Cacheable({"category"})
     *      代表当前方法的结果需要缓存，如果缓存中有，方法不调用
     *      如果缓存中没有，调用方法，最后将方法的结果放入缓存
     * 3、默认行为:
     *      1、如果缓存中有，方法不用调用
     *      2、key默自动生成，缓存的名字:SimpleKey[](自动生成的key值)
     *      3、缓存中value的值，默认使用jdk序列化，将序列化后的数据存到redis
     *      3、默认的过期时间，-1
     *
     *    自定义操作
     *      1、指定缓存使用的key     key属性指定，接收一个SpEl
     *      2、指定缓存数据的存活时间  配置文件中修改ttl
     *      3、将数据保存为json格式
     * @return
     */
	//value 缓存的别名
     // key redis中key的名称，默认是方法名称
    @Cacheable(value = {"category"},key = "#root.method.name")
    @Override
    public List\<CategoryEntity> getLevel1Categorys() {
        long l = System.currentTimeMillis();
        // parent_cid为0则是一级目录
        List\<CategoryEntity> categoryEntities = baseMapper.selectList(new QueryWrapper\<CategoryEntity>().eq("parent_cid", 0));
        System.out.println("耗费时间：" + (System.currentTimeMillis() - l));
        return categoryEntities;
    }
```

#### 4、表达式语法

配置

```java
package com.atguigu.gulimall.product.config;

import org.springframework.boot.autoconfigure.cache.CacheProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.StringRedisSerializer;

/**
 * @author gcq
 * @Create 2020-11-01
 */
@EnableConfigurationProperties(CacheProperties.class)
@EnableCaching
@Configuration
public class MyCacheConfig {

    /**
     * 配置文件中的东西没有用上
     * 1、原来的配置吻技安绑定的配置类是这样子的
     *      @ConfigurationProperties(prefix = "Spring.cache")
     * 2、要让他生效
     *      @EnableConfigurationProperties(CacheProperties.class)
     * @param cacheProperties
     * @return
     */
    @Bean
    RedisCacheConfiguration redisCacheConfiguration(CacheProperties cacheProperties) {
        RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig();
        // 设置key的序列化
        config = config.serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(new StringRedisSerializer()));
        // 设置value序列化 ->JackSon
        config = config.serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(new GenericJackson2JsonRedisSerializer()));

        CacheProperties.Redis redisProperties = cacheProperties.getRedis();
        if (redisProperties.getTimeToLive() != null) {
            config = config.entryTtl(redisProperties.getTimeToLive());
        }
        if (redisProperties.getKeyPrefix() != null) {
            config = config.prefixKeysWith(redisProperties.getKeyPrefix());
        }
        if (!redisProperties.isCacheNullValues()) {
            config = config.disableCachingNullValues();
        }
        if (!redisProperties.isUseKeyPrefix()) {
            config = config.disableKeyPrefix();
        }
        return config;
    }

}
```

yaml 

```yaml
Spring:
  cache:
    type: redis
    redis:
      time-to-live: 3600000           # 过期时间
      key-prefix: CACHE_              # key前缀
      use-key-prefix: true            # 是否使用写入redis前缀
      cache-null-values: true         # 是否允许缓存空值
```

#### 5、缓存穿透问题解决

```java
/**
 * 1、每一个需要缓存的数据我们都需要指定放到那个名字的缓存【缓存分区的划分【按照业务类型划分】】
 * 2、@Cacheable({"category"})
 *      代表当前方法的结果需要缓存，如果缓存中有，方法不调用
 *      如果缓存中没有，调用方法，最后将方法的结果放入缓存
 * 3、默认行为:
 *      1、如果缓存中有，方法不用调用
 *      2、key默自动生成，缓存的名字:SimpleKey[](自动生成的key值)
 *      3、缓存中value的值，默认使用jdk序列化，将序列化后的数据存到redis
 *      3、默认的过期时间，-1
 *
 *    自定义操作
 *      1、指定缓存使用的key     key属性指定，接收一个SpEl
 *      2、指定缓存数据的存活时间  配置文件中修改ttl
 *      3、将数据保存为json格式
 * 4、Spring-Cache的不足：
 *      1、读模式：
 *          缓存穿透:查询一个null数据，解决 缓存空数据：ache-null-values=true
 *          缓存击穿:大量并发进来同时查询一个正好过期的数据，解决:加锁 ？ 默认是无加锁
 *          缓存雪崩:大量的key同时过期，解决：加上随机时间，Spring-cache-redis-time-to-live
 *       2、写模式：（缓存与数据库库不一致）
 *          1、读写加锁
 *          2、引入canal，感知到MySQL的更新去更新数据库
 *          3、读多写多，直接去数据库查询就行
 *
 *    总结：
 *      常规数据（读多写少，即时性，一致性要求不高的数据）完全可以使用SpringCache 写模式（ 只要缓存数据有过期时间就足够了）
 *
 *    特殊数据：特殊设计
 *      原理：
 *          CacheManager(RedisManager) -> Cache(RedisCache) ->Cache负责缓存的读写
 * @return
 */
@Cacheable(value = {"category"},key = "#root.method.name",sync = true)
@Override
public List\<CategoryEntity> getLevel1Categorys() {
    long l = System.currentTimeMillis();
    // parent_cid为0则是一级目录
    List\<CategoryEntity> categoryEntities = baseMapper.selectList(new QueryWrapper\<CategoryEntity>().eq("parent_cid", 0));
    System.out.println("耗费时间：" + (System.currentTimeMillis() - l));
    return categoryEntities;
}
```

#### 6、缓存更新

```java
/**
     * 级联更新所有的关联数据
     * @CacheEvict 失效模式
     * 1、同时进行多种缓存操作 @Caching
     * 2、指定删除某个分区下的所有数据 @CacheEvict(value = {"category"},allEntries = true)
     * 3、存储同一类型的数据，都可以指定成同一分区，分区名默认就是缓存的前缀
     *
     * @param category
     */
    @Caching(evict = {
            @CacheEvict(value = {"category"},key = "'getLevel1Categorys'"),
            @CacheEvict(value = {"category"},key = "'getCatelogJson'")
    })
//    @CacheEvict(value = {"category"},allEntries = true)
    @Transactional
    @Override
    public void updateCascate(CategoryEntity category) {
        // 更新自己表对象
        this.updateById(category);
        // 更新关联表对象
        categoryBrandRelationService.updateCategory(category.getCatId(), category.getName());
    }
```

总结业务流程：

如果忘了这个技术点看下做的笔记的例子，然后去官网看下文档，温故而知新

流程图

![image-20201228171552816](http://qnimg.gisfsde.com/work/image-20201228171552816.png)



# 7、商城业务 & 商品检索

### 7.1 检索业务分析

#### 7.1.1 检索查询参数模型分析抽取

打个比例吧 你肯定上过京东、淘宝买过东西吧？ 那么你想要购买什么东西，你需要在搜索框中搜索你想要购买的物品，那么系统就会给你响应	

我在京东搜索 `Iphone`  他会显示出相对应的产品

![image-20201104152544243](http://qnimg.gisfsde.com/work/image-20201104152544243.png)



那么我们开始对业务条件进行分析，并创建对应的VO类

![image-20201104153118677](http://qnimg.gisfsde.com/work/image-20201104153118677.png)

好的创建出来了........

```java
/**
 * 封装页面所有可能传递过来的查询条件
 * @author gcq
 * @Create 2020-11-02
 */
@Data
public class SearchParam {

    /**
     * 页面传递过来的全文匹配关键字
     */
    private String keyword;
    /**
     * 三级分类id
     */
    private Long catalog3Id;
    /**
     * sort=saleCout_asc/desc
     * sort=skuPrice_asc/desc
     * sort=hotScore_asc/desc
     * 排序条件
     */
    private String sort;

    /**
     * hasStock(是否有货) skuPrice区间，brandId、catalog3Id、attrs
     */
    /**
     * 是否显示有货
     */
    private Integer hasStock = 0;
    /**
     * 价格区间查询
     */
    private String skuPrice;
    /**
     * 按照品牌进行查询，可以多选
     */
    private List\<Long> brandId;
    /**
     * 按照属性进行筛选
     */
    private List\<String> attrs;
    /**
     * 页码
     */
    private Integer pageNum = 1;

}
```

#### 7.1.2 检索返回结果模型分析抽取

 那么返回的数据我们是不是也要创建一个 VO 用来返回页面的数据？

借鉴京东的实例来做参考

![image-20201104153950990](http://qnimg.gisfsde.com/work/image-20201104153950990.png)

那么抽取实体类

```java
/**
 * 查询结果返回
 * @author gcq
 * @Create 2020-11-02
 */
@Data
public class SearchResult {
    /**
     * 查询到所有商品的商品信息
     */
    private List\<SkuEsModel> products;
    /**
     * 以下是分页信息
     * 当前页码
     */
    private Integer pageNum;
    /**
     * 总共记录数
     */
    private Long total;
    /**
     * 总页码
     */
    private Integer totalPages;
    /**
     * 当前查询到的结果，所有设计的品牌
     */
    private List\<BrandVo> brands;
    /**
     * 当前查询结果，所有涉及到的分类
     */
    private List\<CatalogVo> catalogs;
    /**
     * 当前查询到的结果，所有涉及到的所有属性
     */
    private List\<AttrVo> attrs;
    /**
     * 页码
     */
    private List\<Integer> pageNavs;

    //==================以上是要返回给页面的所有信息
    @Data
    public static class BrandVo {
        /**
         * 品牌id
         */
        private Long brandId;
        /**
         * 品牌名字
         */
        private String brandName;
        /**
         * 品牌图片
         */
        private String brandImg;
    }
    @Data
    public static class CatalogVo {
        /**
         * 分类id
         */
        private Long catalogId;
        /**
         * 品牌名字
         */
        private String CatalogName;
    }

    @Data
    public static class AttrVo {
        /**
         * 属性id
         */
        private Long attrId;

        /**
         * 属性名字
         */
        private String attrName;
        /**
         * 属性值
         */
        private List\<String> attrValue;
    }

}
```

### 7.2 检索语句构建

#### 7.2.1 查询部分 & 聚合部分

那么这个 DSL 编写我们就在 Kibana 中测试

```json

GET gulimall_product/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "skuTitle": "华为" // 按照关键字查询
          }
        }
      ],
      "filter": [
        {
          "term": {
            "catalogId": "225" // 根据分类id过滤
          }
        },
        {
          "terms": {
            "brandId": [ // 品牌id
              "1",
              "5",
              "9"
            ]
          }
        },
        {
          "nested": { // 根据属性id 以及属性值进行过滤
            "path": "attrs",
            "query": {
              "bool": {
                "must": [
                  {
                    "term": {
                      "attrs.attrId": {
                        "value": "8"
                      }
                    }
                  },
                  {
                    "terms": {
                      "attrs.attrValue": [
                        "2019"
                      ]
                    }
                  }
                ]
              }
            }
          }
        },
        {
          "term": { // 是否有库存
            "hasStock": {
              "value": "false"
            }
          }
        },
        {
                  "range": { // 价格区间
                    "skuPrice": {
                      "gte": 0,
                      "lte": 7000
                    }
                  }
                }
      ]
    }
  },
  "sort": [ //排序
    {
      "skuPrice": {
        "order": "desc"
      }
    }
  ],
  "from": 0,
  "size":4,
  "highlight": { // 对搜索田间进行高亮
    "fields": {"skuTitle": {}}, 
    "pre_tags": "\<b style=color:red>",
    "post_tags": "\</b>"
  },
  "aggs": {
    "brand_agg": { //品牌进行聚合
      "terms": {
        "field": "brandId",
        "size": 10
      },
      "aggs": {
        "brand_name_agg": { // 品牌名字
          "terms": {
            "field": "brandName",
            "size": 10
          }
        },
        "brand_img_agg": { //品牌图片
          "terms": {
            "field": "brandImg",
            "size": 10
          }
        }
      }
    },
    "catalog_agg": { // 分类
      "terms": {
        "field": "catalogId",
        "size": 10
      },
      "aggs": {
        "catalog_name_agg": { //分类名字
          "terms": {
            "field": "catalogName",
            "size": 10
          }
        }
      }
    },
    "attr_agg":{
      "nested": {
        "path": "attrs"
      },
      "aggs": { //属性聚合
        "attr_id_agg": {
          "terms": {
            "field": "attrs.attrId",
            "size": 10
          },
          "aggs": {
            "attr_name_agg": { //属性名字
              "terms": {
                "field": "attrs.attrName",
                "size": 10
              }
            },
            "attr_value_agg":{ //属性的值
              "terms": {
                "field": "attrs.attrValue",
                "size": 10
              }
            }
          }
        }
      }
    }
  }
}

```

用代码实现

```java
 /**
     * 准备检索请求
     * #模糊匹配、过滤（按照属性、分类、品牌、价格区间、库存）、排序、分页、高亮、聚合分析
     *
     * @return
     */
    private SearchRequest buildSearchRequest(SearchParam param) {

        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder(); //构建DSL语句
        /**
         * 模糊匹配 过滤（按照属性、分类、品牌、价格区间、库存）
         */
        // 1、构建bool - query
        BoolQueryBuilder boolQuery = QueryBuilders.boolQuery();
        // 1.1 must - 模糊匹配
        if (!StringUtils.isEmpty(param.getKeyword())) {
            boolQuery.must(QueryBuilders.matchQuery("skuTitle", param.getKeyword()));
        }
        // 1.2 bool - filter 按照三级分类id来查询
        if (param.getCatalog3Id() != null) {
            boolQuery.filter(QueryBuilders.termQuery("catalogId", param.getCatalog3Id()));
        }
        // 1.2 bool - filter 按照品牌id来查询
        if (param.getBrandId() != null && param.getBrandId().size() > 0) {
            boolQuery.filter(QueryBuilders.termsQuery("brandId", param.getBrandId()));
        }
        // 1.2 bool - filter 按照所有指定的属性来进行查询 *******不理解这个attr=1_5寸:8寸这样的设计
        if (param.getAttrs() != null && param.getAttrs().size() > 0) {
            for (String attr : param.getAttrs()) {
                // attr=1_5寸:8寸&attrs=2_16G:8G
                BoolQueryBuilder nestedboolQuery = QueryBuilders.boolQuery();
                String[] s = attr.split("_");
                String attrId = s[0];// 检索的属性id
                String[] attrValues = s[1].split(":");
                nestedboolQuery.must(QueryBuilders.termQuery("attrs.attrId", attrId));
                nestedboolQuery.must(QueryBuilders.termsQuery("attrs.attrValue", attrValues));
                // 每一个必须都生成一个nested查询
                NestedQueryBuilder nestedQuery = QueryBuilders.nestedQuery("attrs", nestedboolQuery, ScoreMode.None);
                boolQuery.filter(nestedQuery);
            }
        }
        // 1.2 bool - filter 按照库存是否存在
        boolQuery.filter(QueryBuilders.termQuery("hasStock", param.getHasStock() == 1 ? true : false));
        // 1.2 bool - filter 按照价格区间
        /**
         * 1_500/_500/500_
         */
        if (!StringUtils.isEmpty(param.getSkuPrice())) {
            RangeQueryBuilder rangeQuery = QueryBuilders.rangeQuery("skuPrice");
            String[] s = param.getSkuPrice().split("_");
            if (s.length == 2) {
                // 区间
                rangeQuery.gte(s[0]).lte(s[1]);
            } else if (s.length == 1) {
                if (param.getSkuPrice().startsWith("_")) {
                    rangeQuery.lte(s[0]);
                }
                if (param.getSkuPrice().endsWith("_")) {
                    rangeQuery.gte(s[0]);
                }
            }
            boolQuery.filter(rangeQuery);
        }
        //把以前所有条件都拿来进行封装
        sourceBuilder.query(boolQuery);

        /**
         * 排序、分页、高亮
         */
        //2.1、排序
        if (!StringUtils.isEmpty(param.getSort())) {
            String sort = param.getSort();
            //sort=hotScore_asc/desc
            String[] s = sort.split("_");
            SortOrder order = s[1].equalsIgnoreCase("asc") ? SortOrder.ASC : SortOrder.DESC;
            sourceBuilder.sort(s[0], order);
        }
        //2.2 分页 pageSize:5
        // pageNum:1 from 0 size:5 [0,1,2,3,4]
        // pageNum:2 from 5 size:5
        // from (pageNum - 1)*size
        sourceBuilder.from((param.getPageNum() - 1) * EsConstant.PRODUCT_PAGESIZE);
        sourceBuilder.size(EsConstant.PRODUCT_PAGESIZE);
        //2.3、高亮
        if (!StringUtils.isEmpty(param.getKeyword())) {
            HighlightBuilder builder = new HighlightBuilder();
            builder.field("skuTitle");
            builder.preTags("\<b style='color:red'>");
            builder.postTags("\</b>");
            sourceBuilder.highlighter(builder);
        }
        /**
         * 聚合分析
         */
        //1、品牌聚合
        TermsAggregationBuilder brand_agg = AggregationBuilders.terms("brand_agg");
        brand_agg.field("brandId").size(50);
        //品牌聚合的子聚合
        brand_agg.subAggregation(AggregationBuilders.terms("brand_name_agg").field("brandName").size(2));
        brand_agg.subAggregation(AggregationBuilders.terms("brand_img_agg").field("brandImg").size(2));
        // TODO 1、聚合brand
        sourceBuilder.aggregation(brand_agg);
        //2、分类聚合
        TermsAggregationBuilder catalog_agg = AggregationBuilders.terms("catalog_agg").field("catalogId").size(20);
        catalog_agg.subAggregation(AggregationBuilders.terms("catalog_name_agg").field("catalogName").size(1));
        // TODO 2、聚合catalog
        sourceBuilder.aggregation(catalog_agg);
        //3、属性聚合 attr_agg
        NestedAggregationBuilder attr_agg = AggregationBuilders.nested("attr_agg", "attrs");
        // 聚合出当前所有的attrId
        TermsAggregationBuilder attr_id_agg = AggregationBuilders.terms("attr_id_agg").field("attrs.attrId");
        //聚合分析出当前attr_id对应的名字
        attr_id_agg.subAggregation(AggregationBuilders.terms("attr_name_agg").field("attrs.attrName").size(1));
        // 聚合分析出当前attr_id对应的可能的属性值attractValue
        attr_id_agg.subAggregation(AggregationBuilders.terms("attr_value_agg").field("attrs.attrValue").size(50));
        attr_agg.subAggregation(attr_id_agg);
        // TODO 3、聚合attr
        sourceBuilder.aggregation(attr_agg);


        String s = sourceBuilder.toString();
        System.out.println("构建的DSL:" + s);
        SearchRequest searchRequest = new SearchRequest(new String[]{EsConstant.PRODUCT_INDEX}, sourceBuilder);
        return searchRequest;
    }
```

代码实现基本上是 根据 json 来写 调用对应的 API 

term 和 terms 不要调用错误

### 7.3 结果提取封装

Controller

```java
	/**
     * 自动将页面提交过来的所有请求查询参数自动封装成指定的对象
     * @param param
     * @return
     */
    @GetMapping("/list.html")
    public String listPage(SearchParam param, Model model){

        //1、根据传递来的页面参数，去es中检索商品
        SearchResult result = mallSearchService.search(param);
        model.addAttribute("result",result);
        return "list";
    }
```

Service

```java
@Override
public SearchResult search(SearchParam param) {
    // 1、动态构建出查询需要的DSL语句
    SearchResult result = null;

    //1、准备检索请求
    SearchRequest searchRequest = buildSearchRequest(param);
    try {
        // 2、执行检索请求
        SearchResponse response = client.search(searchRequest, GulimallElasticsearchConfig.COMMON_OPTIONS);

        // 3、分析响应数据封装成我们需要的格式
        result = buildSearchResult(response, param);
    } catch (Exception e) {
        e.printStackTrace();
    }
    return result;
}
```

具体业务执行

```java
/**
 * 构建结果数据
 *
 * @param response
 * @return
 */
private SearchResult buildSearchResult(SearchResponse response, SearchParam param) {

    SearchResult result = new SearchResult();
    SearchHits hits = response.getHits();
    List\<SkuEsModel> esModels = new ArrayList\<>();
    if (hits.getHits() != null && hits.getHits().length > 0) {
        for (SearchHit hit : hits.getHits()) {
            String sourceAsString = hit.getSourceAsString();
            SkuEsModel skuEsModel = JSON.parseObject(sourceAsString, SkuEsModel.class);
            if (!StringUtils.isEmpty(param.getKeyword())) {
                HighlightField skuTitle = hit.getHighlightFields().get("skuTitle");
                String string = skuTitle.getFragments()[0].string();
                skuEsModel.setSkuTitle(string);
            }
            esModels.add(skuEsModel);
        }
    }
    //1、返回所有查询到的商品
    result.setProducts(esModels);
    //2、当前所有商品设计到的所有属性信息
    List\<SearchResult.AttrVo> attrVos = new ArrayList\<>();
    ParsedNested attr_agg = response.getAggregations().get("attr_agg");
    ParsedLongTerms attr_id_agg = attr_agg.getAggregations().get("attr_id_agg");
    for (Terms.Bucket bucket : attr_id_agg.getBuckets()) {
        SearchResult.AttrVo attrVo = new SearchResult.AttrVo();
        // 1、得到属性的id
        Long attrId = bucket.getKeyAsNumber().longValue();
        // 2、得到属性的名字
        String attrName = ((ParsedStringTerms) bucket.getAggregations().get("attr_name_agg")).getBuckets().get(0).getKeyAsString();
        // 3、得到属性的所有值
        List\<String> attrValue = ((ParsedStringTerms) bucket.getAggregations().get("attr_value_agg")).getBuckets().stream().map(item -> {
            String keyAsString = item.getKeyAsString();
            return keyAsString;
        }).collect(Collectors.toList());
        attrVo.setAttrId(attrId);
        attrVo.setAttrName(attrName);
        attrVo.setAttrValue(attrValue);
        attrVos.add(attrVo);
    }
    result.setAttrs(attrVos);
    //3、当前所有商品的分类信息
    ParsedLongTerms Catalog_agg = response.getAggregations().get("catalog_agg");
    List\<SearchResult.CatalogVo> catalogVos = new ArrayList\<>();
    List\<? extends Terms.Bucket> buckets = Catalog_agg.getBuckets();
    for (Terms.Bucket bucket : buckets) {
        SearchResult.CatalogVo catalogVo = new SearchResult.CatalogVo();
        // 得到分类id
        String keyAsString = bucket.getKeyAsString();
        catalogVo.setCatalogId(Long.parseLong(keyAsString));
        // 得到分类名
        ParsedStringTerms catalog_name_agg = bucket.getAggregations().get("catalog_name_agg");
        String catalog_name = catalog_name_agg.getBuckets().get(0).getKeyAsString();
        catalogVo.setCatalogName(catalog_name);
        catalogVos.add(catalogVo);
    }
    result.setCatalogs(catalogVos);

    //4、当前所有商品的品牌信息
    List\<SearchResult.BrandVo> brandVos = new ArrayList\<>();
    ParsedLongTerms brand_agg = response.getAggregations().get("brand_agg");
    for (Terms.Bucket bucket : brand_agg.getBuckets()) {
        SearchResult.BrandVo brandVo = new SearchResult.BrandVo();
        // 1、得到品牌的id
        long brandId = bucket.getKeyAsNumber().longValue();
        // 2、得到品牌的图片
        String brandImg = ((ParsedStringTerms) bucket.getAggregations().get("brand_img_agg")).getBuckets().get(0).getKeyAsString();
        // 3、得到品牌的姓名
        String brandname = ((ParsedStringTerms) bucket.getAggregations().get("brand_name_agg")).getBuckets().get(0).getKeyAsString();
        brandVo.setBrandName(brandname);
        brandVo.setBrandId(brandId);
        brandVo.setBrandImg(brandImg);
        brandVos.add(brandVo);
    }
    result.setBrands(brandVos);
    //5、分页信息 - 总记录数
    long total = hits.getTotalHits().value;
    result.setTotal(total);
    //6、分页信息 - 页码
    result.setPageNum(param.getPageNum());
    //7、分页信息 - 总页码
    int totalPages = (int) total % EsConstant.PRODUCT_PAGESIZE == 0 ? (int) total / EsConstant.PRODUCT_PAGESIZE : ((int) total / EsConstant.PRODUCT_PAGESIZE + 1);
    result.setTotalPages(totalPages);

    List\<Integer> pageNavs = new ArrayList\<>();
    for(int i = 1; i \<= totalPages; i++) {
        pageNavs.add(i);
    }
    result.setPageNavs(pageNavs);
    return result;
}
```



### 7.4 页面数据渲染

#### 7.4.1基本数据渲染

![image-20201105124530345](http://qnimg.gisfsde.com/work/image-20201105124530345.png)



遍历后显示结果

![image-20201105124552833](http://qnimg.gisfsde.com/work/image-20201105124552833.png)



#### 7.4.3 筛选条件渲染

品牌条件筛选

![image-20201105125018666](http://qnimg.gisfsde.com/work/image-20201105125018666.png)

分类

![image-20201105125250519](http://qnimg.gisfsde.com/work/image-20201105125250519.png)

属性筛选

![image-20201105125718289](http://qnimg.gisfsde.com/work/image-20201105125718289.png)



```javascript
 
function searchProducts(name, value) {
    // 跳转对应地址
        location.href = replaceAndParamVal(location.href,name,value)
    }
   /**
     * 正则表达式替换
     * **/
    function replaceAndParamVal(url, paramName, replaceVal,forceAdd) {
        var oUrl = url.toString();
        // 1、如果没有就添加，有就替换
        if (oUrl.indexOf(paramName) != -1) {
            if(forceAdd) {
                var nUrl = "";
                if (oUrl.indexOf("?") != -1) {
                    nUrl = oUrl + "&" + paramName + "=" + replaceVal;
                } else {
                    nUrl = oUrl + "?" + paramName + "=" + replaceVal;
                }
                return nUrl;
            } else {
                var re = eval('/(' + paramName + '=)([^&]*)/gi');
                var nUrl = oUrl.replace(re, paramName + '=' + replaceVal)
                return nUrl;
            }
        } else {
            var nUrl = "";
            if (oUrl.indexOf("?") != -1) {
                nUrl = oUrl + "&" + paramName + "=" + replaceVal;
            } else {
                nUrl = oUrl + "?" + paramName + "=" + replaceVal;
            }
            return nUrl;
        }

    }

```





#### 7.4.4 分页数据筛选

![image-20201105125925391](http://qnimg.gisfsde.com/work/image-20201105125925391.png)





#### 7.4.5 页面排序功能

![image-20201105130422378](http://qnimg.gisfsde.com/work/image-20201105130422378.png)

#### 7.4.6 页面价格筛选

![image-20201105131105507](http://qnimg.gisfsde.com/work/image-20201105131105507.png)

JS

```javascript
$("#skuPriceSearchBtn").click(function() {
    // 1、拼上价格区间的查询条件
    var from = $("#skuPriceFrom").val();
    var to = $("#skuPriceTo").val();
    // 2、拼接语句
    var query = from + "_" + to;
    // 3、替换 skuPrice
    location.href = replaceAndParamVal(location.href,"skuPrice",query);
})
```

#### 7.4.7 面包屑导航（遇到问题！）

前端页面：

![image-20201105131701322](http://qnimg.gisfsde.com/work/image-20201105131701322.png)

在返回Vo类中 新增了

![image-20201105131841728](http://qnimg.gisfsde.com/work/image-20201105131841728.png)

Controller中 的解析方法中

```java
    // 8、构建面包屑导航功能
        if (param.getAttrs()!=null && param.getAttrs().size() >0){
            List\<SearchResult.NavVo> collect = param.getAttrs().stream().map(attr -> {
                // 1、分析每个 attrs传递过来的值
                SearchResult.NavVo navo = new SearchResult.NavVo();
                // attrs=2_5寸：6寸
                String[] s = attr.split("_");
                navo.setNavValue(s[1]);
                R r = productFeignService.getAttrInfo(Long.parseLong(s[0]));
                result.getAttrIds().add(Long.parseLong(s[0]));
                if (r.getCode() == 0) {
                    AttrResponseVo data = r.getData("attr", new TypeReference\<AttrResponseVo>() {
                    });
                    navo.setNavName(data.getAttrName());
                } else {
                    navo.setNavName(s[0]);
                }
                // 取消这个面包屑导航以后，我们要跳转到那个地方，将请求地址的url里面的当前置空
                //拿到所有的查询条件后，去掉当前
                // attrs=15_海思(Hisilicon)

                String replace = replaceQueryString(param, attr,"attrs");
                navo.setLink("http://search.gulimall.com/list.html?" + replace);

                return navo;
            }).collect(Collectors.toList());
            result.setNavs(collect);
        }
        // 品牌、分类
        if(param.getBrandId() != null && param.getBrandId().size() > 0) {
            List\<SearchResult.NavVo> navs = result.getNavs();
            SearchResult.NavVo navVo = new SearchResult.NavVo();
            navVo.setNavName("品牌");
            //TODO 远程查询所有品牌
            R info = productFeignService.info(param.getBrandId());
            if (info.getCode() == 0) {
                List\<BrandVo> brand = info.getData("brand", new TypeReference\<List\<BrandVo>>() {
                });
                StringBuffer buffer = new StringBuffer();
                String replace = "";
                for (BrandVo brandVo : brand) {
                    buffer.append(brandVo.getBrandName() + ";");
                    replace = replaceQueryString(param,brandVo.getBrandId() + "","brandId");
                }
                navVo.setNavValue(buffer.toString());
                navVo.setLink("http://search.gulimall.com/list.html?" + replace);
            }
            navs.add(navVo);
        }

        //TODO 分类：不需要导航
        return result;
```



# 8、异步 & 线程池

### 8.1 线程回顾

#### 8.1.1 初始化线程的 4 种方式

1、继承 Thread

2、实现 Runnable

3、实现 Callable 接口 + FutureTask（可以拿到返回结果，可以处理异常）

4、线程池

方式一和方式二 主进程无法获取线程的运算结果，不适合当前场景

方式三：主进程可以获取当前线程的运算结果，但是不利于控制服务器种的线程资源，可以导致服务器资源耗尽

方式四：通过如下两种方式初始化线程池

```java
Executors.newFixedThreadPool(3);
//或者
new ThreadPollExecutor(corePoolSize,maximumPoolSize,keepAliveTime,TimeUnit,unit,workQueue,threadFactory,handler);
```

通过线程池性能稳定，也可以获取执行结果，并捕获异常，但是，**在业务复杂情况下，一个异步调用可能会依赖另一个异步调用的执行结果**

#### 8.1.2 线程池的 7 大参数	

![image-20201105154808826](http://qnimg.gisfsde.com/work/image-20201105154808826.png)

运行流程：

1、线程池创建，准备好 `core` 数量 的核心线程，准备接受任务

2、新的任务进来，用 `core` 准备好的空闲线程执行

- `core` 满了，就将再进来的任务放入阻塞队列中，空闲的 core 就会自己去阻塞队列获取任务执行
- 阻塞队列也满了，就直接开新线程去执行，最大只能开到 `max` 指定的数量
- `max` 都执行好了，`Max-core` 数量空闲的线程会在 `keepAliveTime` 指定的时间后自动销毁，终保持到 `core` 大小
- 如果线程数开到了 `max` 数量，还有新的任务进来，就会使用 reject 指定的拒绝策略进行处理

3、所有的线程创建都是由指定的 `factory` 创建的



面试;

一个线程池 core 7、max 20 ，queue 50 100 并发进来怎么分配的 ?

先有 7 个能直接得到运行，接下来 50 个进入队列排队，再多开 13 个继续执行，线程70个被安排上了，剩下30个默认拒绝策略



#### 8.1.3 常见的 4 种线程池

- `newCacheThreadPool`
  - 创建一个可缓存的线程池，如果线程池长度超过需要，可灵活回收空闲线程，若无可回收，则新建线程
- `newFixedThreadPool`
  - 创建一个指定长度的线程池，可控制线程最大并发数，超出的线程会再队列中等待
- `newScheduleThreadPool`
  - 创建一个定长线程池，支持定时及周期性任务执行
- `newSingleThreadExecutor`
  - 创建一个单线程化的线程池，她只会用唯一的工作线程来执行任务，保证所有任务

#### 8.1.4 开发中为什么使用线程池

- 降低资源的消耗
  - 通过重复利用已创建好的线程降低线程的创建和销毁带来的损耗
- 提高响应速度
  - 因为线程池中的线程没有超过线程池的最大上限时，有的线程处于等待分配任务的状态，当任务来时无需创建新的线程就能执行
- 提高线程的客观理性
  - 线程池会根据当前系统的特点对池内的线程进行优化处理，减少创建和销毁线程带来的系统开销，无限的创建和销毁线程不仅消耗系统资源，还降低系统的稳定性，使用线程池进行统一分配

### 8.2 CompletableFuture 异步编排

业务场景：

查询商品详情页逻辑比较复杂，有些数据还需要远程调用，必然需要花费更多的时间

![image-20201105163535757](http://qnimg.gisfsde.com/work/image-20201105163535757.png )

假如商品详情页的每个查询，需要如下标注时间才能完成

那么，用户需要5.5s后才能看到商品相详情页的内容，很显然是不能接受的

如果有多个线程同时完成这 6 步操作，也许只需要 1.5s 即可完成响应

#### 8.2.1 创建异步对象

CompletableFuture 提供了四个静态方法来创建一个异步操作

![image-20201105185420349](http://qnimg.gisfsde.com/work/image-20201105185420349.png)

1、**runXxx 都是没有返回结果的，supplyXxxx都是可以获取返回结果的**

2、可以传入自定义的线程池，否则就是用默认的线程池

3、根据方法的返回类型来判断是否该方法是否有返回类型

代码实现：

```java
  public static void main(String[] args) throws ExecutionException, InterruptedException {
        System.out.println("main....start.....");
        CompletableFuture\<Void> completableFuture = CompletableFuture.runAsync(() -> {
            System.out.println("当前线程：" + Thread.currentThread().getId());
            int i = 10 / 2;
            System.out.println("运行结果：" + i);
        }, executor);

        CompletableFuture\<Integer> future = CompletableFuture.supplyAsync(() -> {
            System.out.println("当前线程：" + Thread.currentThread().getId());
            int i = 10 / 2;
            System.out.println("运行结果：" + i);
            return i;
        }, executor);
        Integer integer = future.get();

        System.out.println("main....stop....." + integer);
    }
```



#### 8.2.2 计算完成时回调方法

![image-20201105185821263](http://qnimg.gisfsde.com/work/image-20201105185821263.png)

whenComplete 可以处理正常和异常的计算结果，exceptionally 处理异常情况

whenComplete 和 whenCompleteAsync 的区别

​		whenComplete ：是执行当前任务的线程继续执行 whencomplete 的任务

​		whenCompleteAsync： 是执行把 whenCompleteAsync 这个任务继续提交给线程池来进行执行

**方法不以 Async 结尾，意味着 Action 使用相同的线程执行，而 Async 可能会使用其他线程执行（如果是使用相同的线程池，也可能会被同一个线程选中执行）**

```java
CompletableFuture\<Integer> future = CompletableFuture.supplyAsync(() -> {
    System.out.println("当前线程：" + Thread.currentThread().getId());
    int i = 10 / 0;
    System.out.println("运行结果：" + i);
    return i;
}, executor).whenComplete((res,exception) ->{
    // 虽然能得到异常信息，但是没法修改返回的数据
    System.out.println("异步任务成功完成了...结果是：" +res + "异常是：" + exception);
}).exceptionally(throwable -> {
    // 可以感知到异常，同时返回默认值
    return 10;
});
```

#### 8.2.3 handle 方法

![image-20201105194503175](http://qnimg.gisfsde.com/work/image-20201105194503175.png)

和 complete 一样，可以对结果做最后的处理（可处理异常），可改变返回值

```java
CompletableFuture\<Integer> future = CompletableFuture.supplyAsync(() -> {
    System.out.println("当前线程：" + Thread.currentThread().getId());
    int i = 10 / 2;
    System.out.println("运行结果：" + i);
    return i;
}, executor).handle((res,thr) ->{
    if (res != null ) {
        return res * 2;
    }
    if (thr != null) {
        return 0;
    }
    return 0;
});
```

#### 8.2.4 线程串行方法

![image-20201105195632819](http://qnimg.gisfsde.com/work/image-20201105195632819.png)

thenApply 方法：**当一个线程依赖另一个线程时，获取上一个任务返回的结果，并返回当前任物的返回值**

thenAccept方法：**消费处理结果，接受任务处理结果，并消费处理，无返回结果**

thenRun 方法：**只要上面任务执行完成，就开始执行 thenRun ,只是处理完任务后，执行 thenRun的后续操作**

带有 Async 默认是异步执行的，同之前，

以上都要前置任务完成

```java
   /**
         * 线程串行化，
         * 1、thenRun:不能获取到上一步的执行结果，无返回值
         * .thenRunAsync(() ->{
         *             System.out.println("任务2启动了....");
         *         },executor);
         * 2、能接受上一步结果，但是无返回值 thenAcceptAsync
         * 3、thenApplyAsync 能收受上一步结果，有返回值
         *
         */
        CompletableFuture\<String> future = CompletableFuture.supplyAsync(() -> {
            System.out.println("当前线程：" + Thread.currentThread().getId());
            int i = 10 / 2;
            System.out.println("运行结果：" + i);
            return i;
        }, executor).thenApplyAsync(res -> {
            System.out.println("任务2启动了..." + res);
            return "Hello " + res;
        }, executor);
        String s = future.get();

        System.out.println("main....stop....." + s);
```

#### 8.2.5 两任务组合 - 都要完成

![image-20210102044028142](http://qnimg.gisfsde.com/work/image-20210102044028142.png)

![image-20210102044044914](http://qnimg.gisfsde.com/work/image-20210102044044914.png)



两个任务必须都完成，触发该任务

thenCombine: 组合两个 future，获取两个 future的返回结果，并返回当前任务的返回值

thenAccpetBoth: 组合两个 future，获取两个 future 任务的返回结果，然后处理任务，没有返回值

runAfterBoth:组合 两个 future，不需要获取 future 的结果，只需要两个 future处理完成任务后，处理该任务，

```java
   /**
         * 两个都完成
         */
        CompletableFuture\<Integer> future01 = CompletableFuture.supplyAsync(() -> {
            System.out.println("任务1当前线程：" + Thread.currentThread().getId());
            int i = 10 / 4;
            System.out.println("任务1结束：" + i);
            return i;
        }, executor);

        CompletableFuture\<String> future02 = CompletableFuture.supplyAsync(() -> {
            System.out.println("任务2当前线程：" + Thread.currentThread().getId());
            System.out.println("任务2结束：");
            return "Hello";
        }, executor);

        // f1 和 f2 执行完成后在执行这个
//        future01.runAfterBothAsync(future02,() -> {
//            System.out.println("任务3开始");
//        },executor);

        // 返回f1 和 f2 的运行结果
//        future01.thenAcceptBothAsync(future02,(f1,f2) -> {
//            System.out.println("任务3开始....之前的结果:" + f1 + "==>" + f2);
//        },executor);

        // f1 和 f2 单独定义返回结果
        CompletableFuture\<String> future = future01.thenCombineAsync(future02, (f1, f2) -> {
            return f1 + ":" + f2 + "-> Haha";
        }, executor);

        System.out.println("main....end....." + future.get());
```



#### 8.2.6 两任务组合 - 一个完成

![image-20201106101904880](http://qnimg.gisfsde.com/work/image-20201106101904880.png)

![image-20201106101918013](http://qnimg.gisfsde.com/work/image-20201106101918013.png)

当两个任务中，任意一个future 任务完成时，执行任务

**applyToEither**;两个任务有一个执行完成，获取它的返回值，处理任务并有新的返回值

**acceptEither**: 两个任务有一个执行完成，获取它的返回值，处理任务，没有新的返回值

**runAfterEither**:两个任务有一个执行完成，不需要获取 future 的结果，处理任务，也没有返回值



```java
/**
         * 两个任务，只要有一个完成，我们就执行任务
         * runAfterEnitherAsync：不感知结果，自己没有返回值
         * acceptEitherAsync：感知结果，自己没有返回值
         *  applyToEitherAsync：感知结果，自己有返回值
         */
//        future01.runAfterEitherAsync(future02,() ->{
//            System.out.println("任务3开始...之前的结果:");
//        },executor);

//        future01.acceptEitherAsync(future02,(res) -> {
//            System.out.println("任务3开始...之前的结果:" + res);
//        },executor);

        CompletableFuture\<String> future = future01.applyToEitherAsync(future02, res -> {
            System.out.println("任务3开始...之前的结果：" + res);
            return res.toString() + "->哈哈";
        }, executor);
```



#### 8.2.7 多任务组合

![image-20201106104031315](http://qnimg.gisfsde.com/work/image-20201106104031315.png)

allOf：**等待所有任务完成**

anyOf:**只要有一个任务完成**

```java
        CompletableFuture\<String> futureImg = CompletableFuture.supplyAsync(() -> {
            System.out.println("查询商品的图片信息");
            return "hello.jpg";
        });

        CompletableFuture\<String> futureAttr = CompletableFuture.supplyAsync(() -> {
            System.out.println("查询商品的属性");
            return "黑色+256G";
        });

        CompletableFuture\<String> futureDesc = CompletableFuture.supplyAsync(() -> {
            try { TimeUnit.SECONDS.sleep(3); } catch (InterruptedException e) { e.printStackTrace(); }
            System.out.println("查询商品介绍");
            return "华为";
        });

        // 等待全部执行完
//        CompletableFuture\<Void> allOf = CompletableFuture.allOf(futureImg, futureAttr, futureDesc);
//        allOf.get();

        // 只需要有一个执行完
        CompletableFuture\<Object> anyOf = CompletableFuture.anyOf(futureImg, futureAttr, futureDesc);
        anyOf.get();
        System.out.println("main....end....." + anyOf.get());
```

都是操作 CompletableFuture 类 更多方法还请参考该类



# 9、商品详情

### 9.1 详情数据

![image-20201229121729595](http://qnimg.gisfsde.com/work/image-20201229121729595.png)

![image-20201109080935340](http://qnimg.gisfsde.com/work/image-20201109080935340.png)

**需求分析：**通过 `skuId` 查询出商品的相关信息，图片、标题、价格，属性对应版本等等

#### 9.1.1 返回数据模型抽取

```java
/**
 * @author gcq
 * @Create 2020-11-06
 */
@Data
public class SkuItemVo {
    // 1、sku基本获取 pms_sku_info
    SkuInfoEntity skuInfo;
    // 是否有库存
    boolean  hasStock = true;
    // 2、sku的图片信息 pms_sku_images
    List\<SkuImagesEntity> images;
    // 3、获取spu的销售属性组
    List\<SkuItemSalAttrVo> saleAttr;
    // 4、获取spu的介绍
    SpuInfoDescEntity desc;
    // 5、获取spu的规格参数信息
    List\<SpuItemAttrGroupVo> groupAttrs;
}
```



```java
/**
 * @author gcq
 * @Create 2020-11-08
 */
@Data
public class SkuItemSalAttrVo {
    private Long attrId;
    private String attrName;
    private List\<AttrValueWithSkuIdVo> attrValues;
}
```



```java
/**
 * @author gcq
 * @Create 2020-11-08
 */
@Data
public class AttrValueWithSkuIdVo {

    private String attrValue;
    private String skuIds;
    
}
```

### 9.2 查询详情

```java
@Override
public SkuItemVo item(Long skuId) throws ExecutionException, InterruptedException {
    SkuItemVo skuItemVo = new SkuItemVo();
    // 1、sku基本获取 pms_sku_info
    CompletableFuture\<SkuInfoEntity> infoFuture = CompletableFuture.supplyAsync(() -> {
        // 根据 skuid 查询出 spuInfo对象
        SkuInfoEntity info = getById(skuId);
        skuItemVo.setSkuInfo(info);
        return info;
    }, executor);

    CompletableFuture\<Void> saleAttrFuture = infoFuture.thenAcceptAsync((res) -> {
        // 3、获取spu的销售属性组合
        List\<SkuItemSalAttrVo> saleAttrVos = skuSaleAttrValueService.getSaleAttrBySpuId(res.getSpuId());
        skuItemVo.setSaleAttr(saleAttrVos);
    }, executor);

    CompletableFuture\<Void> descFuture = infoFuture.thenAcceptAsync(res -> {
        // 4、获取spu的介绍
        // 通过spuid查询出spu描述信息
        SpuInfoDescEntity spuInfoDescEntity = spuInfoDescService.getById(res.getSpuId());
        skuItemVo.setDesc(spuInfoDescEntity);
    }, executor);

    CompletableFuture\<Void> baseFuture = infoFuture.thenAcceptAsync(res -> {
        // 5、获取spu的规格参数信息
        List\<SpuItemAttrGroupVo> attrGroupVos = attrGroupService.getAttrGroupWithAttrBySpuId(res.getSpuId(), res.getCatalogId());
        skuItemVo.setGroupAttrs(attrGroupVos);
    }, executor);

    CompletableFuture\<Void> imageFuture = CompletableFuture.runAsync(() -> {
        // 2、sku的图片信息 pms_sku_images
        List\<SkuImagesEntity> images = imagesService.getImagesBySkuId(skuId);
        skuItemVo.setImages(images);
    }, executor);

    // 等待所有任务完成
    CompletableFuture.allOf(saleAttrFuture, descFuture, baseFuture, imageFuture).get();

    return skuItemVo;
}
```

获取spu的销售属性组合

```java
  \<select id="getSaleAttrBySpuId" resultMap="SkuItemSaleAttrVo">
             SELECT
          ssav.`attr_id` attr_id,
          ssav.`attr_name` attr_name,
          ssav.`attr_value` ,
          GROUP_CONCAT(DISTINCT info.`sku_id`) sku_ids
        FROM
          `pms_sku_info` info
          LEFT JOIN `pms_sku_sale_attr_value` ssav
            ON ssav.`sku_id` = info.`sku_id`
        WHERE info.`spu_id` = #{spuId}
        GROUP BY ssav.`attr_id`,ssav.`attr_name`,ssav.`attr_value`
    \</select>
```

获取spu的规格参数信息

```
\<select id="getAttrGroupWithAttrsBySpuId"
        resultMap="spuItemAttrGroupVo">
    SELECT
      pav.`spu_id`,
      ag.`attr_group_name` ,
      ag.`attr_group_id`,
      aar.`attr_id`,
      attr.`attr_name`,
      pav.`attr_value`
    FROM
      `pms_attr_group` ag
      LEFT JOIN `pms_attr_attrgroup_relation` aar
        ON aar.`attr_group_id` = ag.`attr_group_id`
      LEFT JOIN `pms_attr` attr
        ON attr.`attr_id` = aar.`attr_id`
      LEFT JOIN `pms_product_attr_value` pav
        ON pav.`attr_id` = attr.`attr_id`
    WHERE ag.`catelog_id` = #{catalogId}
      AND pav.`spu_id` = #{spuId}
\</select>
```

其他都是通过对应关联的 `id` 进行查询，就上面两个查询销售属性、规格参数属性 比较难，SQL这块比较难以理解

### 9.3 sku 组合切换

```javascript
 // sku 组合切换
    $(".sku_attr_value").click(function () {
        var skus = new Array();
        // 1、点击的元素添加上自定义属性,为了识别我们刚在被点击的
        $(this).addClass("clicked")
        // 1.1、当前被选中的属性的skus信息
        var curr = $(this).attr("skus").split(",");
        // 2、添加到数组中
        skus.push(curr);
        // 3、去掉同一行的所有的 checked  a->dd->dl
        $(this).parent().parent().find(".sku_attr_value").removeClass("checked")

        // 4、其他项也需要添加到数组里面
        $("a[class='sku_attr_value checked']").each(function () {
            skus.push($(this).attr("skus").split(","))
        })
        
        // 5、取出他们的交集 jquery 中使用 filter方法来取出他们的交集
        // 5.1 属性项可能有多个，内存、版本等等，所以需要遍历
        var filterEle = skus[0]
        for (var i = 1; i \< skus.length; i++) {
            filterEle = $(filterEle).filter(skus[i])
        }
        // 6、跳转到交集页面
        console.log(filterEle[0])
        location.href = "http://item.gulimall.com/" + filterEle[0] + ".html"
    })
    $(function () {
        // 默认父元素是灰色
        $(".sku_attr_value").parent().css({"border": "solid 1px #CCC"});
        // 拥有checked样式表示选中当前元素
        $("a[class='sku_attr_value checked']").parent().css({"border": "solid 1px red"});
    }) 	
```



# 10、商品业务 & 认证服务

### 10.1 环境搭建

- 为登录和注册创建一个服务
- 讲提供的前端放到  `templates` 目录下

![image-20201110084252039](http://qnimg.gisfsde.com/work/image-20201110084252039.png)

### 10.2 前端验证码倒计时

定义id 使用 `Jquery` 触发点击事件

![image-20201110084521166](http://qnimg.gisfsde.com/work/image-20201110084521166.png)

Jquery

```javascript
$(function () {
    /**
     * 验证码发送
     */
    $("#sendCode").click(function () {
        //判断是否有该样式
        if ($(this).hasClass("disabled")) {
            // 正在倒计时
        } else {
            // 发送验证码
            $.get("/sms/sendCode?phone=" + $("#phoneNum").val(), function (data) {
                if (data.code != 0) {
                    alert(data.msg)
                }
            })
            timeoutChangeStyle();
        }
    })
})
// 60秒
var num = 60;
function timeoutChangeStyle() {
    // 先添加样式，防止重复点击
    $("#sendCode").attr("class", "disabled")
    // 到达0秒后 重置时间，去除样式
    if (num == 0) {
        $("#sendCode").text("发送验证码")
        num = 60;
        // 时间到达后清除样式
        $("#sendCode").attr("class", "");
    } else {
        var str = num + "s 后再次发送"
        $("#sendCode").text(str);
        setTimeout("timeoutChangeStyle()", 1000);
    }
    num--;
}
```

对应效果

![image-20201110084733372](http://qnimg.gisfsde.com/work/image-20201110084733372.png)

### 10.3 整合短信验证码

#### 1、短信验证我们选择的是阿里云的短信服务

![image-20201110084936446](http://qnimg.gisfsde.com/work/image-20201110084936446.png)

#### 2、选择对应短信服务进行开通

在云市场就能看到购买的服务

![image-20201110085141506](http://qnimg.gisfsde.com/work/image-20201110085141506.png)

#### 3、验证短信功能是否能发送

在购买短信的页面，能进行调试短信

![image-20201110085315288](http://qnimg.gisfsde.com/work/image-20201110085315288.png)

输入对应手机号，appCode 具体功能不做演示

![image-20201110085348103](http://qnimg.gisfsde.com/work/image-20201110085348103.png)

#### 4、使用 Java 测试短信是否能进行发送

往下拉找到对应 Java 代码

**注意：**

​	服务商提供的**接口地址**，**请求参数**都不同，请参考服务商提供的测试代码

```java
@Test
public void contextLoads() {
   String host = "http://dingxin.market.alicloudapi.com";
	    String path = "/dx/sendSms";
	    String method = "POST";
	    String appcode = "你自己的AppCode";
	    Map\<String, String> headers = new HashMap\<String, String>();
	    //最后在header中的格式(中间是英文空格)为Authorization:APPCODE 83359fd73fe94948385f570e3c139105
	    headers.put("Authorization", "APPCODE " + appcode);
	    Map\<String, String> querys = new HashMap\<String, String>();
	    querys.put("mobile", "159xxxx9999");
	    querys.put("param", "code:1234");
	    querys.put("tpl_id", "TP1711063");
	    Map\<String, String> bodys = new HashMap\<String, String>();


	    try {
	    	/**
	    	* 重要提示如下:
	    	* HttpUtils请从
	    	* https://github.com/aliyun/api-gateway-demo-sign-java/blob/master/src/main/java/com/aliyun/api/gateway/demo/util/HttpUtils.java
	    	* 下载
	    	*
	    	* 相应的依赖请参照
	    	* https://github.com/aliyun/api-gateway-demo-sign-java/blob/master/pom.xml
	    	*/
	    	HttpResponse response = HttpUtils.doPost(host, path, method, headers, querys, bodys);
	    	System.out.println(response.toString());
	    	//获取response的body
	    	//System.out.println(EntityUtils.toString(response.getEntity()));
	    } catch (Exception e) {
	    	e.printStackTrace();
	    }
}
```

需要导入对应工具类，参照注释就行



### 10.4 验证码防刷校验

用户要是一直提交验证码

- 前台：限制一分钟后提交

- 后台：存入redis 如果有就返回

```java
/**
 * 发送短信验证码
 * @param phone 手机号
 * @return
 */
@GetMapping("/sms/sendCode")
@ResponseBody
public R sendCode(@RequestParam("phone") String phone) {
    // TODO 1、接口防刷
    // 先从redis中拿取
    String redisCode = redisTemplate.opsForValue().get(AuthServerConstant.SMS_CODE_CACHE_PREFIX + phone);
    if(!StringUtils.isEmpty(redisCode)) {
        // 拆分
        long l = Long.parseLong(redisCode.split("_")[1]);
        // 当前系统事件减去之前验证码存入的事件 小于60000毫秒=60秒
        if (System.currentTimeMillis() -l \< 60000) {
            // 60秒内不能再发
            R.error(BizCodeEnume.SMS_CODE_EXCEPTION.getCode(),BizCodeEnume.SMS_CODE_EXCEPTION.getMsg());
        }
    }
    // 2、验证码的再次效验
    // 数据存入 =》redis key-phone value - code sms:code:131xxxxx - >45678
    String code = UUID.randomUUID().toString().substring(0,5).toUpperCase();
    // 拼接验证码
    String substring = code+"_" + System.currentTimeMillis();
    // redis缓存验证码 防止同一个phone在60秒内发出多次验证吗
    redisTemplate.opsForValue().set(AuthServerConstant.SMS_CODE_CACHE_PREFIX+phone,substring,10, TimeUnit.MINUTES);

    // 调用第三方服务发送验证码
    thirdPartFeignService.sendCode(phone,code);
    return R.ok();
}
```



### 10.5 一步一坑注册页环境

#### 1、编写 vo 接收页面提交

- 使用到了 JSR303校验

```java
/**
 * 注册数据封装Vo
 * @author gcq
 * @Create 2020-11-09
 */
@Data
public class UserRegistVo {
    @NotEmpty(message = "用户名必须提交")
    @Length(min = 6,max = 18,message = "用户名必须是6-18位字符")
    private String userName;

    @NotEmpty(message = "密码必须填写")
    @Length(min = 6,max = 18,message = "密码必须是6-18位字符")
    private String password;

    @NotEmpty(message = "手机号码必须提交")
    @Pattern(regexp = "^[1]([3-9])[0-9]{9}$",message = "手机格式不正确")
    private String phone;

    @NotEmpty(message = "验证码必须填写")
    private String code;
}
```

#### 2、页面提交数据与Vo一致

设置 `name` 属性与 `Vo` 一致，方便将传递过来的数据转换成 JSON

![image-20201110100732631](http://qnimg.gisfsde.com/work/image-20201110100732631.png)

#### 3、数据校验

```java
/**
 * //TODO 重定向携带数据，利用session原理，将数据放在session中，
 * 只要跳转到下一个页面取出这个数据，session中的数据就会删掉
 * //TODO分布式下 session 的问题
 * RedirectAttributes redirectAttributes 重定向携带数据
 * redirectAttributes.addFlashAttribute("errors", errors); 只能取一次
 * @param vo 数据传输对象
 * @param result 用于验证参数
 * @param redirectAttributes 数据重定向
 * @return
 */
@PostMapping("/regist")
public String regist(@Valid UserRegistVo vo, BindingResult result,
                     RedirectAttributes redirectAttributes) {
    // 校验是否通过
    if (result.hasErrors()) {
        // 拿到错误信息转换成Map
        Map\<String, String> errors = result.getFieldErrors().stream().collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage));
        //用一次的属性
        redirectAttributes.addFlashAttribute("errors",errors);
        // 校验出错，转发到注册页
        return "redirect:http://auth.gulimall.com/reg.html";
    }

    // 将传递过来的验证码 与 存redis中的验证码进行比较
    String code = vo.getCode();
    String s = redisTemplate.opsForValue().get(AuthServerConstant.SMS_CODE_CACHE_PREFIX + vo.getPhone());
    if (!StringUtils.isEmpty(s)) {
        // 验证码和redis中的一致
        if(code.equals(s.split("_")[0])) {
            // 删除验证码：令牌机制
            redisTemplate.delete(AuthServerConstant.SMS_CODE_CACHE_PREFIX + vo.getPhone());
            // 调用远程服务，真正注册
            R r = memberFeignService.regist(vo);
            if (r.getCode() == 0) {
                // 远程调用注册服务成功
                return "redirect:http://auth.gulimall.com/login.html";
            } else {
                Map\<String, String> errors = new HashMap\<>();
                errors.put("msg",r.getData(new TypeReference\<String>(){}));
                redirectAttributes.addFlashAttribute("errors", errors);
                return "redirect:http://auth.gulimall.com/reg.html";
            }
        } else {
            Map\<String, String> errors = new HashMap\<>();
            errors.put("code", "验证码错误");
            redirectAttributes.addFlashAttribute("code", "验证码错误");
            // 校验出错，转发到注册页
            return "redirect:http://auth.gulimall.com/reg.html";
        }
    } else {
        Map\<String, String> errors = new HashMap\<>();
        errors.put("code", "验证码错误");
        redirectAttributes.addFlashAttribute("code", "验证码错误");
        // 校验出错，转发到注册页
        return "redirect:http://auth.gulimall.com/reg.html";
    }
}
```

#### 4、前端页面接收错误信息

![image-20201110101306173](http://qnimg.gisfsde.com/work/image-20201110101306173.png)

#### 5、异常机制 & 用户注册

- 用户注册单独抽出了一个服务

Controller

```java
/**
 * 注册
 * @param registVo
 * @return
 */
@PostMapping("/regist")
public R regist(@RequestBody MemberRegistVo registVo) {
    try {
        memberService.regist(registVo);
    } catch (PhoneExsitException e) {
        // 返回对应的异常信息
       return R.error(BizCodeEnume.PHONE_EXIST_EXCEPTION.getCode(),BizCodeEnume.PHONE_EXIST_EXCEPTION.getMsg());
    } catch (UserNameExistException e) {
        return R.error(BizCodeEnume.USER_EXIST_EXCEPTION.getCode(),BizCodeEnume.USER_EXIST_EXCEPTION.getMsg());
    }
    return R.ok();
}
```

```java
@Override
public void regist(MemberRegistVo registVo) {
    MemberDao memberDao = this.baseMapper;
    MemberEntity entity = new MemberEntity();

    // 设置默认等级
    MemberLevelEntity memberLevelEntity = memberLevelDao.getDefaultLevel();
    entity.setLevelId(memberLevelEntity.getId());


    // 检查手机号和用户名是否唯一
    checkPhoneUnique(registVo.getPhone());
    checkUserNameUnique(registVo.getUserName());

    entity.setMobile(registVo.getPhone());
    entity.setUsername(registVo.getUserName());

    //密码要加密存储
    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    String encode = passwordEncoder.encode(registVo.getPassword());
    entity.setPassword(encode);

    memberDao.insert(entity);
}

@Override
public void checkPhoneUnique(String phone) throws PhoneExsitException {
    MemberDao memberDao = this.baseMapper;
    Integer mobile = memberDao.selectCount(new QueryWrapper\<MemberEntity>().eq("mobile", phone));
    if (mobile > 0) {
        throw new PhoneExsitException();
    }
}

@Override
public void checkUserNameUnique(String username) throws UserNameExistException {
    MemberDao memberDao = this.baseMapper;
    Integer count = memberDao.selectCount(new QueryWrapper\<MemberEntity>().eq("username", username));
    if (count > 0) {
        throw new PhoneExsitException();
    }
}
```

 此处引入一个问题

- 密码是直接存入数据库吗？ 这样子会导致数据的不安全，
- 引出了使用 MD5进行加密，但是MD5加密后，别人任然可以暴力破解
- 可以使用加盐的方式，将密码加密后，得到一串随机字符，
- 随机字符和密码和进行验证相同结果返回true否则false



至此注册相关结束~



### 10.6 账号密码登录

#### 1、定义 Vo 接收数据提交

```java
/**
 * @author gcq
 * @Create 2020-11-10
 */
@Data
public class UserLoginVo {
    private String loginacct;
    private String password;
}
```

同时需要保证前端页面提交字段与 Vo 类中一致

#### 2、在 Member 服务中编写接口

```java
@Override
public MemberEntity login(MemberLoginVo vo) {
    String loginacct = vo.getLoginacct();
    String password = vo.getPassword();

    // 1、去数据库查询 select * from  ums_member where username=? or mobile =?
    MemberDao memberDao = this.baseMapper;
    MemberEntity memberEntity = memberDao.selectOne(new QueryWrapper\<MemberEntity>()
            .eq("username", loginacct).or().
                    eq("mobile", loginacct));
    if (memberDao == null) {
        // 登录失败
        return null;
    } else {
        // 获取数据库的密码
        String passwordDB = memberEntity.getPassword();
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        // 和用户密码进行校验
        boolean matches = passwordEncoder.matches(password, passwordDB);
        if(matches) {
            // 密码验证成功 返回对象
            return memberEntity;
        } else {
            return null;
        }
    }
}
```





### 11.7 分布式 Session不共享不同步问题

我们在auth.gulimall.com中保存session，但是网址跳转到 gulimall.com中，取不出auth.gulimall.com中保存的session，这就造成了微服务下的session不同步问题

![image-20201111103637615](http://qnimg.gisfsde.com/work/image-20201111103637615.png)

#### 1、Session同步解决方案-分布式下session共享问题

同一个服务复制多个，但是session还是只能在一个服务上保存，浏览器也是只能读取到一个服务的session

![image-20201111104758917](http://qnimg.gisfsde.com/work/image-20201111104758917.png)



#### 2、Session共享问题解决-session复制





![image-20201111104851977](http://qnimg.gisfsde.com/work/image-20201111104851977.png)

#### 3、Session共享问题解决-客户端存储

![image-20201111104913888](http://qnimg.gisfsde.com/work/image-20201111104913888.png)

#### 4、Session共享问题解决-hash一致性

![image-20201111105039741](http://qnimg.gisfsde.com/work/image-20201111105039741.png)

#### 5、Session共享问题解决-统一存储

![image-20201111105135178](http://qnimg.gisfsde.com/work/image-20201111105135178.png)

### 11.8 SpringSession整合

#### 1、官网文档 阅读

- 进入到 Spring Framework

![image-20201111144109273](http://qnimg.gisfsde.com/work/image-20201111144109273.png)

##### 2、选择Spring Session文档

![image-20201111144350506](http://qnimg.gisfsde.com/work/image-20201111144350506.png)

![image-20201111144438592](http://qnimg.gisfsde.com/work/image-20201111144438592.png)

##### 3、开始使用Spring Session

![image-20201111144639786](http://qnimg.gisfsde.com/work/image-20201111144639786.png)

![image-20201111144718176](http://qnimg.gisfsde.com/work/image-20201111144718176.png)

#### 2、整合SpringBoot

##### 1、添加Pom.xml依赖

![image-20201111144914600](http://qnimg.gisfsde.com/work/image-20201111144914600.png)

##### 2、application.yml 配置

![image-20201111145601673](http://qnimg.gisfsde.com/work/image-20201111145601673.png)

##### 3、reids配置

![image-20201111150056671](http://qnimg.gisfsde.com/work/image-20201111150056671.png)

##### 4、启动类加上 @EnableRedisHttpSession

```java
@EnableRedisHttpSession // 整合spring session
```

#### 3、自定义 SpringSession 完成 Session 子域共享

##### `CookieSerializer`

api文档参考：https://docs.spring.io/spring-session/docs/2.4.1/reference/html5/index.html#api-cookieserializer

![image-20210101124234037](http://qnimg.gisfsde.com/work/image-20210101124234037.png)

##### 指定redis序列化

文档地址：

https://docs.spring.io/spring-session/docs/2.4.1/reference/html5/index.html#api-redisindexedsessionrepository-config

![image-20210101124513827](http://qnimg.gisfsde.com/work/image-20210101124513827.png)

redis中json序列化

官网文档地址：https://docs.spring.io/spring-session/docs/2.4.1/reference/html5/index.html#samples

![image-20210101125216426](http://qnimg.gisfsde.com/work/image-20210101125216426.png)

提供的实例：

https://github.com/spring-projects/spring-session/blob/2.4.1/spring-session-samples/spring-session-sample-boot-redis-json/src/main/java/sample/config/SessionConfig.java

![image-20210101125303807](http://qnimg.gisfsde.com/work/image-20210101125303807.png)

```java

/**
 * SpringSession整合子域
 * 以及redis数据存储为json
 * @author gcq
 * @Create 2020-11-11
 */
@Configuration
public class GulimallSessionConfig {

    /**
     * 设置cookie信息
     * @return
     */
    @Bean
    public CookieSerializer CookieSerializer(){
        DefaultCookieSerializer cookieSerializer = new DefaultCookieSerializer();
        // 设置一个域名的名字
        cookieSerializer.setDomainName("gulimall.com");
        // cookie的路径
        cookieSerializer.setCookieName("GULIMALLSESSION");
        return cookieSerializer;
    }

    /**
     * 设置json转换
     * @return
     */
    @Bean
    public RedisSerializer\<Object> springSessionDefaultRedisSerializer() {
        // 使用jackson提供的转换器
        return new GenericJackson2JsonRedisSerializer();
    }

}
```



#### 4、SpringSession 原理 

```java
/**
 * 核心原理
 * 1、@EnableRedisHttpSession导入RedisHttpSessionConfiguration配置
 *      1、给容器中添加了一个组件
 *          sessionRepository = 》》》【RedisOperationsSessionRepository】 redis 操作 session session的增删改查封装类
 *      2、SessionRepositoryFilter==>:session存储过滤器，每个请求过来必须经过Filter
 *          1、创建的时候，就自动从容器中获取到了SessionRepostiory
 *          2、原始的request,response都被包装了 SessionRepositoryRequestWrapper、SessionRepositoryResponseWrapper
 *          3、以后获取session.request.getSession()
 *              SessionRepositoryResponseWrapper
 *          4、wrappedRequest.getSession() ==>SessionRepository
 *
 *          装饰者模式
 *          spring-redis的相关功能:
 *                 执行session相关操作后，redis里面存储的时间也会刷新
 */
```

核心源码是：

- `SessionRepositoryFilter` 类下面的 `doFilterInternal` 方法

- 及那个 `request`、`response` 包装成 `SessionRepositoryRequestWrapper`

  ![image-20201111195249024](http://qnimg.gisfsde.com/work/image-20201111195249024.png) 



# 11、单点登录和社交登录

### 11.1 社交登录



![image-20201110124933726](http://qnimg.gisfsde.com/work/image-20201110124933726.png)

QQ、微博，github等网站的用户量非常大，别的网站为了简化网站的登陆和注册逻辑，引入社交登录功能

步骤

1、用户点击 QQ按钮

2、引导跳转进 QQ 授权页

![image-20201110124945111](http://qnimg.gisfsde.com/work/image-20201110124945111.png)

3、用户主动点击授权，跳回之前网页



#### 11.1.1 OAuth2.0

- **OAuth：**OAuth（开放授权）是一个开放标准，允许用户授权第三方网站访问他们存储在另外的服务提供者上的信息，而不需要将用户名和密码提供给第三方网站或分享他们的数据的内容

- **OAuth2.0：**对于用户相关的 OpenAPI（例如获取用户信息，动态同步，照片，日志，分享等），为了保存用户数据的安全和隐私，第三方网站访问用户数据前都需要显示向用户授权

- 官方版流程

  ![img](http://qnimg.gisfsde.com/work/oAuth2_01.gif)

文档地址：

相关流程分析

![image-20201110154532752](http://qnimg.gisfsde.com/work/image-20201110154532752.png)



#### 11.2 微博登录准备工作

##### 1、进入微博开放平台



![image-20201110154702360](http://qnimg.gisfsde.com/work/image-20201110154702360.png)



##### 2、登录微博，进入微连接，选择网站接入

![image-20201110160834589](http://qnimg.gisfsde.com/work/image-20201110160834589.png)



##### 3、选择立即接入

![image-20201110161001013](http://qnimg.gisfsde.com/work/image-20201110161001013.png)

##### 4、创建自己的应用

![image-20201110161032203](http://qnimg.gisfsde.com/work/image-20201110161032203.png)

##### 5、我们可以在开发阶段

![image-20201110161152105](http://qnimg.gisfsde.com/work/image-20201110161152105.png)

##### 6、进入高级信息

![image-20201110161407018](http://qnimg.gisfsde.com/work/image-20201110161407018.png)

##### 7、添加测试账号

![image-20201110161451881](http://qnimg.gisfsde.com/work/image-20201110161451881.png)

##### 8、进入文档

![image-20201110161634486](http://qnimg.gisfsde.com/work/image-20201110161634486.png)



#### 11.3 微博登录代码实现

##### 登陆注册流程图

看不清，放大一点

##### **微博登录流程**![image-20201231084733753](http://qnimg.gisfsde.com/work/image-20201231084733753.png)

###### **注册流程**

![image-20201231084909415](http://qnimg.gisfsde.com/work/image-20201231084909415.png)

###### **账号密码登录流程：**

![image-20201231012134722](http://qnimg.gisfsde.com/work/image-20201231012134722.png)

###### **手机验证码发送流程：**

![image-20201231012207446](http://qnimg.gisfsde.com/work/image-20201231012207446.png)

##### 11.3.1 查看微博开放平台文档

https://open.weibo.com/wiki/%E6%8E%88%E6%9D%83%E6%9C%BA%E5%88%B6%E8%AF%B4%E6%98%8E

![image-20201111093019560](http://qnimg.gisfsde.com/work/image-20201111093019560.png)



##### 11.3.2 点击微博登录后，跳转到微博授权页面

![image-20201111093153199](http://qnimg.gisfsde.com/work/image-20201111093153199.png)

##### 11.3.3 用户授权后调用回调接口，并带上参数code换取AccessToken

```java
/**
     * 回调接口
     * @param code
     * @return
     * @throws Exception
     */
    @GetMapping("/oauth2.0/weibo/success")
    public String weibo(@RequestParam("code") String code) throws Exception {
        // 1、根据code换取accessToken
        Map\<String, String> map = new HashMap\<>();
        map.put("client_id", "1133714539");
        map.put("client_secret", "f22eb330342e7f8797a7dbe173bd9424");
        map.put("grant_type", "authorization_code");
        map.put("redirect_uri", "http://auth.gulimall.com/oauth2.0/weibo/success");
        map.put("code", code);


        HttpResponse response = HttpUtils.doPost("https://api.weibo.com",
                "/oauth2/access_token",
                "post",
                new HashMap\<>(),
                map,
                new HashMap\<>());

        // 状态码为200请求成功
        if (response.getStatusLine().getStatusCode() == 200 ){
            // 获取到了accessToken
            String json = EntityUtils.toString(response.getEntity());
            SocialUser socialUser = JSON.parseObject(json, SocialUser.class);
            R r = memberFeignService.OAuthlogin(socialUser);
            if (r.getCode() == 0) {
                MemberRespVo data = r.getData("data", new TypeReference\<MemberRespVo>() {
                });
                log.info("登录成功:用户:{}",data.toString());

                // 2、登录成功跳转到首页
                return "redirect:http://gulimall.com";
            } else {
                // 注册失败
                return "redirect:http://auth.gulimall.com/login.html";
            }
        } else {
            // 请求失败
            // 注册失败
            return "redirect:http://auth.gulimall.com/login.html";
        }

        // 2、登录成功跳转到首页
        return "redirect:http://gulimall.com";
    }
```

##### 11.3.4 拿到AccessToken 请求对应接口拿到信息

```java
@Override
public MemberEntity login(SocialUser vo) {
    // 登录和注册合并逻辑
    String uid = vo.getUid();
    MemberDao memberDao = this.baseMapper;
    // 根据社交用户的uuid查询
    MemberEntity memberEntity = memberDao.selectOne(new QueryWrapper\<MemberEntity>()
            .eq("social_uid", uid));
    // 能查询到该用户
    if (memberEntity != null ){
        // 更新对应值
        MemberEntity update = new MemberEntity();
        update.setId(memberEntity.getId());
        update.setAccessToken(vo.getAccess_token());
        update.setExpiresIn(vo.getExpires_in());

        memberDao.updateById(update);

        memberEntity.setAccessToken(vo.getAccess_token());
        memberEntity.setExpiresIn(vo.getExpires_in());
        return memberEntity;
    } else {
        // 2、没有查询到当前社交用户对应的记录就需要注册一个
        MemberEntity regist = new MemberEntity();
        try {
            Map\<String,String> query = new HashMap\<>();
            // 设置请求参数
            query.put("access_token",vo.getAccess_token());
            query.put("uid",vo.getUid());
            // 发送get请求获取社交用户信息
            HttpResponse response = HttpUtils.doGet("https://api.weibo.com/",
                    "2/users/show.json",
                    "get",
                    new HashMap\<>(),
                    query);
            // 状态码为200 说明请求成功
            if (response.getStatusLine().getStatusCode() == 200){
                // 将返回结果转换成json
                String json = EntityUtils.toString(response.getEntity());
                // 利用fastjson将请求返回的json转换为对象
                JSONObject jsonObject = JSON.parseObject(json);
                // 拿到需要的值
                String name = jsonObject.getString("name");
                String gender = jsonObject.getString("gender");
                //.. 拿到多个信息
                regist.setNickname(name);
                regist.setGender("m".equals(gender) ? 1 : 0);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        // 设置社交用户相关信息
        regist.setSocialUid(vo.getUid());
        regist.setAccessToken(vo.getAccess_token());
        regist.setExpiresIn(vo.getExpires_in());
        memberDao.insert(regist);
        return regist;
    }
}
```

### 11.2 SSO(单点登录)

#### 1、什么是SSO

单点登录(SingleSignOn，SSO)，就是通过用户的一次性鉴别登录。当用户在身份认证服务器上登录一次以后，即可获得访问单点登录系统中其他关联系统和应用软件的权限，同时这种实现是不需要管理员对用户的登录状态或其他信息进行修改的，这意味着在多个应用系统中，用户只需一次登录就可以访问所有相互信任的应用系统。这种方式减少了由登录产生的时间消耗，辅助了用户管理，是目前比较流行的 [1]

#### 2、前置知识

https://gitee.com/xuxueli0323/xxl-sso

#### 3、同域下的单点登录

#### 4、不同域下的单点登录

#### 5、单点登录框架 & 原理演示

XXL-SSO 是一个分布式单点登录框架。只需要登录一次就可以访问所有相互信任的应用系统。 拥有"轻量级、分布式、跨域、Cookie+Token均支持、Web+APP均支持"等特性。现已开放源代码，开箱即用。

首先对整个项目进行：mvn clean package -Dmaven.skip.test=true  

xxl-sso-server:

- 8080/xxl-sso-server

- 编排：
  - ssoserver.com 登陆验证服务器
  - client1.com 客户端1
  - client2.com 客户端2

先启动xxl-sso-server 然后启动client1

只要 `client1` 登录成功 `client2` 就不用进行登录直接登录成功

代码测试:

sso-client

```java
/**
 * @author gcq
 * @Create 2020-11-12
 */
@Controller
public class HelloController {

    @Value("${sso.server.url}")
    private String ssoServerUrl;

    /**
     * 无需登录就可以访问
     * @return
     */
    @ResponseBody
    @RequestMapping("/hello")
    public String hello() {
        return "hello";
    }

    /**
     * 需要验证的连接
     * @param model
     * @param token 只要是ssoserver登陆成功回来就会带上
     * @return
     */
    @GetMapping("/employees")
    public String employees(Model model, HttpSession session,
                            @RequestParam(value="token",required = false) String token) {
        if (!StringUtils.isEmpty(token)) {
            // 去ssoserver登录成功调回来就会带上
            //TODO 1、去ssoserver获取当前token真正对应的用户信息
            RestTemplate restTemplate = new RestTemplate();
            // 使用restTemplate进行远程请求
            ResponseEntity\<String> forEntity = restTemplate.getForEntity("http://ssoserver.com:8080/userInfo?token=" + token, String.class);
            // 拿到数据
            String body = forEntity.getBody();
            // 设置到session中
            session.setAttribute("loginUser",body);
        }
        Object loginUser = session.getAttribute("loginUser");
        if (loginUser == null ){
            // 没有登录重定向到登陆页面，并带上当前地址
            return "redirect:" + ssoServerUrl + "?redirect_url=http://client1.com:8081/employees";
        } else {
            List\<String> emps = new ArrayList\<>();
            emps.add("张三");
            emps.add("李四");
            model.addAttribute("emps",emps);
            return "list";
        }

    }
}
```

sso-server

```java
/**
 * @author gcq
 * @Create 2020-11-12
 */
@Controller
public class LoginController {

    @Autowired
    StringRedisTemplate redisTemplate;

    /**
     * 根据token从redis中查询用户信息
     * @param token
     * @return
     */
    @ResponseBody
    @GetMapping("/userInfo")
    public String userInfo(@RequestParam("token") String token) {
        String s = redisTemplate.opsForValue().get(token);
        return s;
    }

    @GetMapping("login.html")
    public String login(@RequestParam("redirect_url") String url, Model model,
                        @CookieValue(value = "sso_token",required = false)String sso_token) {
        if (!StringUtils.isEmpty(sso_token)) {
            //说明有人之前登录过，给浏览器留下了痕迹
            return "redirect:" + url + "?token=" + sso_token;
        }
        // 添加url到model地址中，在前端页面进行取出
        model.addAttribute("url",url);
        return "login";
    }

    /**
     * 登录
     * @param username
     * @param password
     * @param url client端带过来的地址
     * @return
     */
    @PostMapping("/doLogin")
    public String doLogin(@RequestParam("username") String username,
                          @RequestParam("password") String password,
                          @RequestParam("url") String url,
                          HttpServletResponse response){
        // 账号密码不为空 
        if (!StringUtils.isEmpty(username) && !StringUtils.isEmpty(password)) {
            // 登陆成功
            // 把登录成功的用户存起来
            String uuid = UUID.randomUUID().toString().replace("-","");
            redisTemplate.opsForValue().set(uuid,username);
            // 将uuid存入cookie
            Cookie token = new Cookie("sso_token",uuid);
            response.addCookie(token);
            // 保存到cookie
            return "redirect:" + url + "?token=" + uuid;
        }
        // 登录失败，展示登录页
        return "login";
    }
}
```



#### 6、使用 jwt





### 11.3 JWT



# 12、购物车

### 12.1 购物车需求

#### 1、需求描述：

用户可以在**登录状态**下将商品添加到购物车**【登录购物车/在线购物车】**

放入数据库

mongodb

**放入 redis（采用）**

用户可以在**未登录状态**下将商品添加到购物车**【游客购物车/离线购物车】**

放入 localstorage

cookie 

WebSQL

**放入 redis (采用)**

用户可以使用购物车一起结算下单

用户可以**查询自己的购物车**

用户可以在**购物中修改购买商品的数量**

用户可以在**购物车中删除商品**

**选中不选中商品**

在购物车中**展示商品优惠信息**

提示购物车商品价格变化

购物车数据结构

![image-20201113110938713](http://qnimg.gisfsde.com/work/image-20201113110938713.png)

![image-20201115154652394](http://qnimg.gisfsde.com/work/image-20201115154652394.png)

每一个购物项信息，都是一个对象，基本字段包括

```java
skuId:123123, // 商品id
check:true, // 是否选中
title:"apple phone", // 商品标题
defaultImage:'', // 商品默认显示的图片
price:4999, // 商品价格
count:1, // 商品数量
totalPrice:4999 // 购物车中选中商品总价格
skuSaleVo:{} // 。。。。
```

另外，购物车中不止一条数据，因此最终会是对象的数组

```
{...},{....},{....}
```

Redis有5种不同数据结构，这里选择哪一种 比较合适呢? Map\<String, List\<String>> 首先**不同用户应该有独立的购物车**。

因此购物车应该以用户的作为key来存储，**Value是用户的所有购物车信息**。这样看来基本的 k-v 结构就可以了。

但是，我们对购物车中的商品进行增、删、改操作，**基本都需要根据商品id进行判断**，为了方便后期处理，我们的购物车也应该是 k-v 结构，**key 是商品 id, value 才是这个商品的购物车信息。**

综上所述，我们的购物车结构是一一个**双层Map: Map\<String,Map\<String,String>>**，在redis中类型为 hash 

**外头key就是用户的id,里面的key就是skuid**

redis中：

新增商品：hset gulimall:cart:7  **(key)334488[商品skuid]  (value)商品的信息**

增加商品数量：hincrby shopcar:uuid1024 334477 1

商品总数：hlen shopcar:uuid

全部选择：hgetall shopcar:uuid1024



![image-20201115155054434](http://qnimg.gisfsde.com/work/image-20201115155054434.png)

![image-20210102202926973](http://qnimg.gisfsde.com/work/image-20210102202926973.png)



### 12.2 Vo编写 & ThreadLocal身份验证

#### 12.2.1 Vo 编写

购物车

```java

/**
 * 整个购物车
 * 需要计算的属性，必须重写他的get方法，保证每次获取属性都会进行计算
 * @author gcq
 * @Create 2020-11-13
 */
public class Cart {
    /**
     * 商品项
     */
    List\<CartItem> items;

    /**
     * 商品数量
     */
    private Integer countNum;

    /**
     * 商品类型数量
     */
    private Integer countType;
    /**
     * 商品总价
     */
    private BigDecimal totalAmount;
    /**
     *  减免价格
     */
    private BigDecimal reduce = new BigDecimal("0");;

    public Integer getCountType() {
        int count = 0;
        if (items !=null && items.size() > 0) {
            for (CartItem item : items) {
                count+=1;
            }
        }
        return count;
    }
    public BigDecimal getTotalAmount() {
        BigDecimal amount = new BigDecimal("0");
        // 1、计算购物项总价
        if (items != null && items.size() > 0) {
            for (CartItem item : items) {
                // 拿到购物车中单个商品的总金额
                BigDecimal totalPrice = item.getTotalPrice();
                // 添加到购物总价中
                amount = amount.add(totalPrice);
            }
        }
        // 2、减去优惠总价
        BigDecimal subtract = amount.subtract(getReduce());

        return subtract;
    }

 
}
```

购物车中的实体

```java
/**
 * 购物项
 * @author gcq
 * @Create 2020-11-13
 */
public class CartItem {

    /**
     * 商品id
     */
    private Long skuId;
    /**
     * 购物车中是否选中
     */
    private Boolean check = true;
    /**
     * 商品的标题
     */
    private String title;
    /**
     * 商品的图片
     */
    private String image;
    /**
     * 商品的属性
     */
    private List\<String> skuAttr;
    /**
     * 商品的价格
     */
    private BigDecimal price;
    /**
     * 商品的数量
     */
    private Integer count;
    /**
     * 购物车价格 使用自定义get、set
     */
    private BigDecimal totalPrice;
     /**
     *  计算购物项价格
     * @return
     */
    public BigDecimal getTotalPrice() {
        //价格乘以数量
        return this.price.multiply(new BigDecimal("" + this.count));
    }


```

#### 12.2.3 ThreadLocal 身份验证

需求分析：

```java
 /**
     * 浏览器有一个cookie：user-key,标识用户身份，一个月后过期
     * 如果第一次使用jd的购物车功能，都会给一个临时的用户身份
     * 浏览器以后保存，每次访问都会带上这个cookie
     *
     * 登录 session 有
     * 没登录，按照cookie中的user-key来做
     * 第一次：如果没有临时用户，帮忙创建一个临时用户 --> 使用拦截器
     * @return 
     */
```

代码

```java
**
 * 在执行目标方法之前,判断用户的登录状态，并封装给Controller目标请求
 * @author gcq
 * @Create 2020-11-13
 */
public class CartInterceptor implements HandlerInterceptor {

    public static ThreadLocal\<UserInfo> threadLocal = new ThreadLocal\<>();

    /**
     * 目标方法执行之前
     * @param request
     * @param response
     * @param handler
     * @return
     * @throws Exception
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        UserInfo userInfo = new UserInfo();
        // 拿到session
        HttpSession session = request.getSession();
        // 查看session中是否保存了用户的值
        MemberRespVo member = (MemberRespVo) session.getAttribute(AuthServerConstant.LOGIN_USER);
        if (member != null) {
            // 用户登录
            userInfo.setUserId(member.getId());
        }
        Cookie[] cookies = request.getCookies();
        if (cookies != null && cookies.length > 0) {
            for (Cookie cookie : cookies) {
                String name = cookie.getName();
                // 拿到cookie名字进行判断如果包含 user-key 就复制到userInfo中
                if (name.equals(CartConstant.TEMP_USER_COOKIE_NAME)) {
                    userInfo.setUserKey(cookie.getValue());
                    userInfo.setTempUser(true);
                }
            }
        }
        // 如果没有临时用户一定要分配一个临时用户
        if (StringUtils.isEmpty(userInfo.getUserKey())) {
            String uuid = UUID.randomUUID().toString();
            userInfo.setUserKey(uuid);
        }
        // 全部放行
        threadLocal.set(userInfo);
        return true;
    }

    /**
     * 业务执行之后,分配临时用户，让浏览器保存
     * @param request
     * @param response
     * @param handler
     * @param modelAndView
     * @throws Exception
     */
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        // 拿到用户信息
        UserInfo userInfo = threadLocal.get();
        // 如果没有临时用户一定要保存一个临时用户
        if (!userInfo.isTempUser()) {
            // 持续的延长临时用户的过期时间
            Cookie cookie = new Cookie(CartConstant.TEMP_USER_COOKIE_NAME, userInfo.getUserKey());
            cookie.setDomain("gulimall.com");
            cookie.setMaxAge(CartConstant.TEMP_USER_COOKIE_TIMEOUT);
            response.addCookie(cookie);
        }
    }
}
```



### 12.3 添加购物车

在页面点击加入购物车后将商品添加进购物车

![image-20201115155956396](http://qnimg.gisfsde.com/work/image-20201115155956396.png)

需求分析：

首先需要在页面拿到要提交的参数，skuid，购买数量，并提交后台完成购物车数据添加

后端如何处理这个数据？

1. **通过 `skuid` 远程查询这个商品的信息**
2. **远程查询sku组合的信息**
3. **如果购物车中已经有该数据如何进行提交**？
   1. **如果有该数据，那么就行更改**，根据 skuid 从 reids 中取出数据
   2. 将数据转换成对象然后加上对应的数量，**再次转换为json存入redis**
4. **前端页面频繁添加购物车如何解决？**
   1. 请求发送过来后我们**重定向到其他的页面用来显示数据**，这时候用户刷新的话也是在其他页面进行刷新

```javascript
 /**
     * 加入到购物车
     */
    $("#addToCartA").click(function() {
        // 购买的数量
        var num = $("#numInput").val();
        // skuid
        var skuid = $(this).attr("skuId");
        location.href="http://cart.gulimall.com/addToCart?skuId=" + skuid + "&num=" + num;
        return false
    })
```

请求发送到Controller后

```java
@GetMapping("/addToCart")
public String addToCart(@RequestParam("skuId") Long skuId,
                        @RequestParam("num") Integer num,
                        RedirectAttributes  res) throws ExecutionException, InterruptedException {

    cartService.addToCart(skuId,num);
    //将数据拼接到url后面
    res.addAttribute("skuId",skuId);
    // 重定向到对应的地址
    return "redirect:http://cart.gulimall.com/addToCartSuccess.html";
}
```

Service

```java
    /**
     * 给购物车里面添加商品
     * @param skuId 商品id
     * @param num 数量
     * @throws ExecutionException
     * @throws InterruptedException
     * 如果远程查询比较慢，比如方法当中有好几个远程查询，都要好几秒以上，等整个方法返回就需要很久，这块你是怎么处理的?
     *  1、为了提交远程查询的效率，可以使用线程池的方式，异步进行请求
     *  2、要做的操作就是将所有的线程全部放到自己手写的线程池里面
     *  3、每一个服务都需要配置一个自己的线程池
     *  4、完全使用线程池来控制所有的请求
     */
    @Override
    public void addToCart(Long skuId, Integer num) throws ExecutionException, InterruptedException {
        // 获取到要操作的购物车
        BoundHashOperations\<String, Object, Object> cartOps = getCartOps();
        // 1、如果购物车中已有该商品那么需要做的就是修改商品的数量，如果没有该商品需要进行添加该商品到购物车中
        String result = (String) cartOps.get(skuId.toString()); // 商品id作为键，先去Redis里面查看有没有这个相同的商品
        if (StringUtils.isEmpty(result)) { // 如果返回为空，那么说明购物车中没有这个商品，那就要执行添加
            // 2、添加商品到购物车
            // 第一个异步任务,查询当前商品信息
            CartItem cartItem = new CartItem(); // 购物车中每一个都是一个购物项，封装购物车的内容
            CompletableFuture\<Void> completableFutureSkuInfo = CompletableFuture.runAsync(() -> {
                // 2.1、远程查询出当前要添加的商品信息
                // 添加哪个商品到购物车，先查询到这个商品的信息
                R r = productFeignService.getSkuInfo(skuId);
                // 获取远程返回的数据，远程数据都封装在skuInfo中
                SkuInfoVo skuInfo = r.getData("skuInfo", new TypeReference\<SkuInfoVo>() {
                });
                cartItem.setCheck(true); // 添加商品到购物车，那么这个商品一定是选中的
                cartItem.setSkuId(skuInfo.getSkuId()); // 查询的是哪个商品的id，那么这个商品id就是哪个
                cartItem.setImage(skuInfo.getSkuDefaultImg()); // 当前商品的图片信息
                cartItem.setPrice(skuInfo.getPrice()); // 当前商品的价格
                cartItem.setTitle(skuInfo.getSkuTitle()); // 当前商品的标题
                cartItem.setCount(num); // 当前商品添加的数量
            }, executor);
            // 3、第二个异步任务，远程查询sku组合信息
            CompletableFuture\<Void> completableFutureSkuAttr = CompletableFuture.runAsync(() -> {
                List\<String> skuSaleAttrValues = productFeignService.getSkuSaleAttrValues(skuId); // 根据skuid来查
                cartItem.setSkuAttr(skuSaleAttrValues); // 远程查询出来到sku组合信息，需要在购物车中进行显示
            }, executor);
            // 4、两个异步任务都完成，才能把数据放到redis中
            CompletableFuture.allOf(completableFutureSkuInfo,completableFutureSkuAttr).get();
            // 把购物项的数据保存redis中
            String cartItemJson = JSON.toJSONString(cartItem);
            cartOps.put(skuId.toString(),cartItemJson); // 添加商品到购物车中
        } else {
            // 如果购物车中有这个商品，那么需要做的就是将商品的数量进行更改,也即是新添加的商品数量加上当前购物车中商品数量
            CartItem cartItem = JSON.parseObject(result, CartItem.class);
            cartItem.setCount(cartItem.getCount() + num);
            String cartItemJson = JSON.toJSONString(cartItem);
            // 更新redis
            cartOps.put(skuId.toString(),cartItemJson);
        }
    }
```

解决刷新问题

```java
/**
 * 跳转到成功页面
 * @param skuId
 * @param model
 * @return
 */
@GetMapping("/addToCartSuccess.html")
public String addToCartSuccessPage(@RequestParam("skuId") Long skuId,Model model) {

    // 重定向到成功页面，再次查询购物车数据
    CartItem item = cartService.getCartItem(skuId);
    model.addAttribute("item",item);
    return "success";
}
```

### 12.4 获取合并购物车

#### 12.4.1 需求分析

1. **如果用户登录，临时购物车的数据如何显示**？
   1. 将临时购物车的数据合并到用户购物车中
2. **如何显示购物车的数据？**
   1. 从 redis 取出数据放到对象中并渲染出来

#### 12.4.2 代码编写

Controller

```java
@GetMapping("/cart.html")
public String cartListPage(Model model) throws ExecutionException, InterruptedException {
    Cart cart = cartService.getCart();
    model.addAttribute("cart",cart);
    return "cartList";
}
```

Service

拼装 `Key` 从 `redis` 中查询数据

临时购物车如果有数据，当前状态是登录，那就将临时购物车的数据合并到当前用户的购物车

```java
  @Override
    public Cart getCart() throws ExecutionException, InterruptedException {
        /**
         * 需求分析1
         *   1、如果用户登录后，那么临时购物车的数据如何处理？
         *      将临时购物车的数据，放到用户购物车中进行合并
         *   2、如何显示购物车中的数据？
         *      从redis中查询到数据放到对象中，返回到页面进行渲染
         */
        Cart cart = new Cart();
        // 1、购物车的获取操作，分为登录后购物车 和 没登录购物车
        UserInfo userInfo = CartIntercept.threadLocal.get(); // 拿到共享数据
        if (userInfo.getUserId() != null) { // 登录后的购物车
            String cartKey = CART_PREFIX + userInfo.getUserKey();
            String tempCartKey = CART_PREFIX + userInfo.getUserKey();
            // 如果临时购物车中还有数据，那就需要将临时购物车合并到已登录购物车里面
            // 判断临时购物车中是否有数据
            List\<CartItem> cartItems = getCartItems(tempCartKey);
            if (cartItems != null ) { // 临时购物车中有数据，需要将临时购物车的数据合并到登录后的购物车
                for (CartItem item : cartItems) { // 拿到临时购物车的所有数据，将他添加到已登录购物车里面来
                    // 调用addToCart()这个方法，他会根据登录状态进行添加，当前是登录状态
                    // 所以这个方法会将临时购物车的数据添加到已登录购物车中
                    addToCart(item.getSkuId(),item.getCount()); // 合并临时和登录后的购物车
                }
                // 合并完成后还需要将临时购物车中的数据删除
                clearCart(tempCartKey);
            }
            // 再次获取用户登录后的购物车【包含临时购物车数据和已登录购物车数据】
            List\<CartItem> cartItemList = getCartItems(cartKey);
            cart.setItems(cartItemList);// 将多个购物项设置到购物车中
        } else {
            // 没有登录的购物车，拿到没有登录购物车的数据
            String cartKey = CART_PREFIX + userInfo.getUserKey();
            // 获取购物车中的所有购物项
            List\<CartItem> cartItems = getCartItems(cartKey);
            cart.setItems(cartItems);
        }
        return cart;
    }
```

getCaerItems

```java
/**
     * 获取指定用户 (登录用户/临时用户) 购物车里面的数据
     * @param cartKey
     * @return
     */
    private List\<CartItem> getCartItems(String cartKey) {
        BoundHashOperations\<String, Object, Object> operations = redisTemplate.boundHashOps(cartKey);
        List\<Object> values = operations.values(); // 拿到多个购物项
        if (values != null) {
            List\<CartItem> cartItemList = values.stream().map((obj) -> {
                String s = (String) obj;
                CartItem cartItem = JSON.parseObject(s, CartItem.class);
                return cartItem;
            }).collect(Collectors.toList());
            return cartItemList;
        }
        return null;
    }
```



### 12.5 选中购物项 & 改变购物项的数量 & 删除购物项

#### 12.5.1 需求分析：

##### 1、选中购物项

1. 在页面中选中购物项后，数据应该要和redis中的数据进行同步
2. 页面选中，reids中数据就要更改

##### 2、改变购物项数量

1. 购物车中，增加了商品的数量，对应的价格，总价也需要进行改变

##### 3、删除购物项

1. 在购物项中删除该条数据，从redis中根据skuid删除这条记录

##### 4、将数据修改或删除后，重新跳转到cart.html 重新加载数据

#### 12.5.2 代码实现

前端页面方法

```java
// 选中购物项
    $(".itemCheck").click(function () {
        var skuId = $(this).attr("skuId");
        var check = $(this).prop("checked");
        location.href = "http://cart.gulimall.com/checkItem?skuId=" + skuId + "&check=" + (check?1:0);
    })

    // 改变购物项数量
    $(".countOpsBtn").click(function() {
        var skuId = $(this).parent().attr("skuId");
        var num = $(this).parent().find(".countOpsNum").text();
        location.href = "http://cart.gulimall.com/countItem?skuId=" + skuId + "&num=" + num;
    })
    var deleteId = 0;
    // 删除购物项
    function deleteItem() {
        location.href = "http://cart.gulimall.com/deleteItem?skuId=" + deleteId;
    }
    $(".deleteItemBtn").click(function() {
        deleteId = $(this).attr("skuId");
    })
```

Controller

```java
 /**
    * @需求描述: 系统管理员 购物车组 模块 用户选中购物项更新redis中对象
    * @创建人: 
    * @创建时间: 2021/01/04 15:37
    * @修改需求:
    * @修改人:
    * @修改时间:
    * @需求思路:
    */
    @GetMapping("/checkItem")
    public String checkItem(@RequestParam("skuId") Long skuId,
                            @RequestParam("checked") Integer checked) {
        cartService.checkItem(skuId,checked);
        // 重定向到购物车页面，重新获取购物车数据
        return "redirect:http://cart.gulimall.com/cart.html";
    }

    /**
    * @需求描述: 系统管理员 购物车组 模块 用户更改购物车中购物项的数量
    * @创建人: 
    * @创建时间: 2021/01/04 16:05
    * @修改需求:
    * @修改人:
    * @修改时间:
    * @需求思路:
    */
    @GetMapping("/updateItem")
    public String updateItem(@RequestParam("skuId") Long skuId,
                             @RequestParam("count") Integer count) {
        cartService.updateItem(skuId,count);
        return "redirect:http://cart.gulimall.com/cart.html";
    }

    /**
    * @需求描述: 系统管理员 购物车服务 模块 用户删除购物车中的购物项
    * @创建人: 
    * @创建时间: 2021/01/04 16:40
    * @修改需求:
    * @修改人:
    * @修改时间:
    * @需求思路:
    */
    @GetMapping("/deleteItem")
    public String deleteItem(@RequestParam("skuId") Long skuId) {
        cartService.deleteItem(skuId);
        return "redirect:http://cart.gulimall.com/cart.html";
    }
```

Service

```java
@Override
    public void checkItem(Long skuId, Integer checked) {
        // 1、从redis中查出购物项设置购物项是否选中。
        BoundHashOperations\<String, Object, Object> cartOps = getCartOps();
        String cart = (String) cartOps.get(skuId.toString());
        CartItem cartItem = JSON.parseObject(cart, CartItem.class);
        cartItem.setCheck(checked == 1 ? true : false);
        String jsonStirng = JSON.toJSONString(cartItem);
        cartOps.put(skuId.toString(),jsonStirng); // 更新redis
    }

    @Override
    public void updateItem(Long skuId, Integer count) {
        // 1、用户在页面对某个购物项增加或减少购物项的数量，那么redis中应该也要进行更新
        CartItem cartItem = getCartItem(skuId);
        cartItem.setCount(count);
        BoundHashOperations\<String, Object, Object> cartOps = getCartOps();
        cartOps.put(skuId.toString(),JSON.toJSONString(cartItem)); // 更新redis中数据
    }

    @Override
    public void deleteItem(Long skuId) {
        // 获取到当前购物车，然后根据id删除购物车里面的购物项
        BoundHashOperations\<String, Object, Object> cartOps = getCartOps();
        cartOps.delete(skuId.toString());
    }	
```



# 13、消息队列 - MQ

### 13.1 RabbitMQ

#### 异步处理

消息发送的时间取决于业务执行的最长的时间

![image-20210104205412477](http://qnimg.gisfsde.com/work/image-20210104205412477.png)

#### 应用解耦

原本是需要**订单系统**直接调用**库存系统**

只需要将请求发送给消息队列，其他的就不需要去处理了，节省了处理业务逻辑的时间


![image-20210104210738678](http://qnimg.gisfsde.com/work/image-20210104210738678.png)

#### 流量消峰

某一时刻如果请求特别的大，那就先把它放入消息队列，从而达到流量消峰的作用

![image-20210104210725093](http://qnimg.gisfsde.com/work/image-20210104210725093.png)

流程图地址：https://www.processon.com/view/link/5fbda8c35653bb1d54f7077b

### 13.2 概述

1. 大多应用中，可通过消息服务中间件来提升系统异步通信，扩展解耦能力
2. 消息服务中两个重要概念：
   1. **消息代理（message broker）** 和 **目的地（destination）**
3. 当消息发送者发送消息后，将由消息代理接管，消息代理保证消息传递到指定目的地
4. 消息队列主要有两种形式的目的地
   1. **队列（Queue）**:点对点消息通信（point - to - point）
   2. **主题（topic）**：发布（publish）/订阅（subscribe）消息通信
5. 点对点式：
   1. 消息发送者发送消息，消息代理将其放入一个队列中，消息接收者从队列中获取消息内容，消息读取后被移出队列
   2. 消息只有唯一的发送者和接受者，单并不是说只能有一个接收者
6. 发布订阅式:
   1. 发送者（发布者）发到消息到主题，多个接收者（订阅者）监听（订阅）这个主题，那么就会在消息到达时同时收到消息
7. **JMS（Java Message Service） Java消息服务：**
   1. 基于JVM消息代理的规范，ActiveMQ、HornetMQ是JMS的实现
8. AMQP（Advanced Message Queuing Protocol）
   1. 高级消息队列协议，也是一个消息代理的规范，兼容JMS
   2. RabbitMQ是AMQP的实现
9. Spring 支持
   1. spring - jms提供了对JMS的支持
   2. spring - rabbit提供了对AMQP的支持
   3. 需要ConnectionFactory的实现来连接消息代理
   4. 提供 **JmsTemplate**、**RabbitTemplate** 来发送消息
   5. @JmsListener（JMS）、@RabbitListener（AMQP）注解在方法上监听消息代理发布的消息
   6. @EnableJms、@EnableRabbit开启支持
10. Spring Boot 自动配置
    1. JmsAutoConfiguration
    2. RabbitAutoConfiguration
11. 市面上的MQ产品
    1. ActiveMQ、RabbitMQ、RocketMQ，kafka

![image-20201116091205853](http://qnimg.gisfsde.com/work/image-20201116091205853.png)



### 13.3 RabbitMQ概念

RabbitMQ简介：

RabbitMQ是一由erlang开发的AMQP（Advanved Message Queue Protocol）的开源实现

核心概念

**Message**

消息，消息是不具名的，它是由消息头和消息体组成，消息体是不透明的，而消息头则由一系列的可选属性组成，这些属性包括 **routing - key （路由键）**，**priority（相对于其他消息的优先权）**，**delivery - mode（指出该消息可能需要持久性存储）**等

**Publisher**

消息的生产者，也是一个像交换器发布消息的客户端应用程序

**Exchange**

交换器，用来接收生产者发送的消息并将这些消息路由给服务器中的队列

Exchange有4种类型：**direct(默认)**、**fanout**、**topic**，和**heades**，不同类型的 **Exchange** 转发消息的策略有所区别

**Queue**

消息队列，用来保存消息直到发送给**消费者**，**他是消息的容器**，也是消息的重点，一个消息可以投入一个或多个队列，消息一直在队列里面，等待消费者连接到这个队列将其取走

**Binding**

绑定，**用于消息队列和交换器之间的关联**，一个绑定就是基于路由键将交换器和消息队列连接起来的规则，所有可以将交换器理解成一个由绑定构成的路由表

**Connection**

网路连接，比如一个TCP连接

**Channel**

信道，多路复用连接中的一个独立的双向数据流通道，信道是建立在真实的TCP连接的内的虚拟连接，AMQP 命令都是通过信息到发送出去的，不管是发布消息，订阅队列还是接收消息，这些动作都是通过队列完成，因为对应操作系统来说建立和销毁 TCP 都是非常昂贵的开销，所以引入了信道的概念，以复用一条TCP连接

**Consumer**

消息的消费者，表示一个消息队列中取得消息的客户端应用程序

**Virtual Host**

虚拟主机，表示交换器、消息队列和相关对象。虚拟主机是共享相同的身份认证和加密环境的独立服务器域。每个Virtual host本质上就是一个 mini 版的RabbitMQ 服务器,拥有自己的队列、交换器、绑定和权限机制。Virtual host 是 AMQP 概念的基础，必须在连接时指定,RabbitMQ默认的vhost是/。

**Broker**

表示消息队列服务器实体

![image-20201116100431093](http://qnimg.gisfsde.com/work/image-20201116100431093.png)

### 13.4 Docker 安装RabbitMQ

```shell
docker run -d --name rabbitmq -p 5671:5671 -p 5672:5672 -p 4369:4369 -p 25672:25672 -p 15671:15671 -p 15672:15672 rabbitmq:management

4369, 25672 (Erlang发现&集群端口)
5672, 5671 (AMQP端口)
15672 (web管理后台端口)
61613, 61614 (STOMP协议端口)
1883, 8883 (MQTT协议端口)
 # 自动启动
docker update rabbitmq --restart=always

```

![image-20201116102734767](http://qnimg.gisfsde.com/work/image-20201116102734767.png)

![image-20201116103446291](http://qnimg.gisfsde.com/work/image-20201116103446291.png)

### 13.5 RabbitMQ 运行机制

AMQP 中的消息路由

AMQP 中消息的路由过程和 Java 开发者熟悉的 JMS 存在一些差别，AMQP中增加了 **Exchange** 和 **Binding** 的角色 生产者把消息发布到 Exchange 上，消息最终到达队列并被消费者接收，而 Binding 决定交换器的消息应该发送给那个队列

![image-20201116104235856](http://qnimg.gisfsde.com/work/image-20201116104235856.png)

**Exchange 类型**

Exchange 分发消息时根据类型的不同分发策略有区别，目前共四种类型：direct、tanout、topic、headers header匹配AMQP消息的 header 而不是路由键，headers 交换器和 direct 交换器完全一致，但性能差能多，目前几乎用不到了，所以直接看另外三种类型

![image-20201116104546717](http://qnimg.gisfsde.com/work/image-20201116104546717.png)

![image-20201116104918897](http://qnimg.gisfsde.com/work/image-20201116104918897.png)

### 13.6 RabbitMQ 整合

#### 1、引入 Spring-boot-starter-amqp

```xml
      \<dependency>
            \<groupId>org.springframework.boot\</groupId>
            \<artifactId>spring-boot-starter-amqp\</artifactId>
        \</dependency>

```

#### 2、application.yml配置

```yaml
spring:
  rabbitmq:
    host: 192.168.56.10
    port: 5672
    virtual-host: /
```

#### 3、测试RabbitMQ

##### 1、AmqpAdmin:管理组件

```java
 /**
     * 创建Exchange
     * 1、如何利用Exchange,Queue,Binding
     *      1、使用AmqpAdmin进行创建
     * 2、如何收发信息
     */
    @Test
    public void contextLoads() {
        //	public DirectExchange(
        //	String name, 交换机的名字
        //	boolean durable, 是否持久
        //	boolean autoDelete, 是否自动删除
        //	Map\<String, Object> arguments)
        //	{
        DirectExchange directExchange = new DirectExchange("hello-java.exchange",true,false);
        amqpAdmin.declareExchange(directExchange);
        log.info("Exchange[{}]创建成功：","hello-java.exchange");
    }

    /**
     * 创建队列
     */
    @Test
    public void createQueue() {
        // public Queue(String name, boolean durable, boolean exclusive, boolean autoDelete, Map\<String, Object> arguments) {
        Queue queue = new Queue("hello-java-queue",true,false,false);
        amqpAdmin.declareQueue(queue);
        log.info("Queue[{}]:","创建成功");
    }


/**
     * 绑定队列
     */
    @Test
    public void createBinding() {
        // public Binding(String destination, 目的地
        // DestinationType destinationType, 目的地类型
        // String exchange,交换机
        // String routingKey,//路由键
        Binding binding = new Binding("hello-java-queue",
                Binding.DestinationType.QUEUE,
                "hello-java.exchange",
                "hello.java",null);
        amqpAdmin.declareBinding(binding);
        log.info("Binding[{}]创建成功","hello-java-binding");
    }
```



##### 2、RabbitTemplate：消息发送处理组件

```java
 @Autowired
    @Test
    public void sendMessageTest() {
        for(int i = 1; i \<=5; i++) {
            if(i%2==0) {
                OrderReturnReasonEntity reasonEntity = new OrderReturnReasonEntity();
                reasonEntity.setId(1l);
                reasonEntity.setCreateTime(new java.util.Date());
                reasonEntity.setName("哈哈");
                //
                String msg = "Hello World";
                // 发送的对象类型的消息，可以是一个json
                rabbitTemplate.convertAndSend("hello-java.exchange","hello.java",reasonEntity);
            } else {
                OrderEntity orderEntity = new OrderEntity();
                orderEntity.setOrderSn(UUID.randomUUID().toString());
                rabbitTemplate.convertAndSend("hello-java.exchange","hello.java",orderEntity);
            }
            log.info("消息发送完成{}");
        }

    }
```



### 13.7 RabbitMQ消息确认机制 - 可靠到达

- 保证消息不丢失，可靠抵达，可以使用事务消息，性能下降250倍，为此引入确认机制
- **publisher** confirmCallback 确认模式
- **publisher** returnCallback 未投递到 queue 退回
- **consumer** ack 机制

![image-20201116163631107](http://qnimg.gisfsde.com/work/image-20201116163631107.png)

#### 可靠抵达 - ConfirmCallback

spring.rabbitmq.publisher-confirms=true

在创建 `connectionFactory` 的时候设置 PublisherConfirms(true) 选项，开启 `confirmcallback`。

`CorrelationData` 用来表示当前消息唯一性

消息只要被 broker 接收到就会执行 confirmCallback,如果 cluster 模式，需要所有 broker 接收到才会调用 confirmCallback

被 broker 接收到只能表示 message 已经到达服务器，并不能保证消息一定会被投递到目标 queue 里，所以需要用到接下来的 returnCallback

#### 可靠抵达 - ReturnCallback

spring.rabbitmq.publisher-retuns=true

spring.rabbitmq.template.mandatory=true

confirm 模式只能保证消息到达 broker，不能保证消息准确投递到目标 queue 里。在有些模式业务场景下，我们需要保证消息一定要投递到目标 queue 里，此时就需要用到 return 退回模式

这样如果未能投递到目标 queue 里将调用 returnCallback，可以记录下详细到投递数据，定期的巡检或者自动纠错都需要这些数据

#### 可靠抵达 - Ack 消息确认机制

- 消费者获取到消息，成功处理，可以回复Ack给Broker
  - basic.ack 用于肯定确认：broker 将移除此消息
  - basic.nack 用于否定确认：可以指定 beoker 是否丢弃此消息，可以批量
  - basic.reject用于否定确认，同上，但不能批量
- 默认，消息被消费者收到，就会从broker的queue中移除
- 消费者收到消息，默认自动ack，但是如果无法确定此消息是否被处理完成，或者成功处理，我们可以开启手动ack模式
  - 消息处理成功，ack()，接受下一条消息，此消息broker就会移除
  - 消息处理失败，nack()/reject() 重新发送给其他人进行处理，或者容错处理后ack
  - 消息一直没有调用ack/nack方法，brocker认为此消息正在被处理，不会投递给别人，此时客户端断开，消息不会被broker移除，会投递给别人

### 13.8 RabbitMQ 延时队列(实现定时任务)

**场景:**

比如未付款的订单，超过一定时间后，系统自动取消订单并释放占有物品

**常用解决方案：**

Spring的schedule 定时任务轮询数据库

**缺点：**

消耗系统内存，增加了数据库的压力，存在较大的时间误差

**解决：**rabbitmq的消息TTL和死信Exchange结合



#### 使用场景

![image-20201120120737525](http://qnimg.gisfsde.com/work/image-20201120120737525.png)

时效问题

上一轮扫描刚好扫描，而这个时候刚好下了订单，就没有扫描到，下一轮扫描的时候，订单还没有过期，等到订单过期后30分钟才被扫描到

![image-20201120120914320](http://qnimg.gisfsde.com/work/image-20201120120914320.png)

#### 消息的TTL（Time To Live）

- 消息的TTL 就是**消息的存活时间**，
- RabbitMQ可以对**队列**还有**消息**分别设置TTL
  - 对队列设置就是没有消费者连着的保持时间，**也可以对每一个消息单独的设置，超过了这个时间我们可以认为这个消息他死了，称之为死信**
  - 如果队列设置了，消息也设置了，那么会**取小**，所以一个消息如果被路由到不同的队列中，这个消息死亡时间有可能不一样的（不同队列设置），这里讲的是单个TTL 因为他是实现延时任务的关键，可以通过**设置消息的 expiration 字段或者 x-message-ttl** 来设置时间两者是一样的效果

#### Dead Letter Exchange（DLX）

- 一个消息在满足如下条件下，会进**死信路由**，记住这里是路由不是队列，一个路由可以对应很多队列，（什么是死信）
  - 一个消息被Consumer拒收了，并且reject方法的参数里requeue是false。也就是说不被再次放在队列里，被其他消费者使用。(basic.reject/ basic.nack) 
  - requeue= false上面的消息的TTL到了，消息过期了。
  - 队列的长度限制满了。排在前面的消息会被丢弃或者扔到死信路由上
- Dead Letter Exchange其实就是一种普通的exchange, 和创建其他exchange没有两样。只是在某一个设置 Dead Letter Exchange的队列中有消息过期了自动触发消息的转发，发送到Dead Letter Exchange中去。
- 我们既可以控制消息在一段时间后变成死信， 又可以控制变成死信的消息被路由到某一个指定的交换机， 结合C者，其实就可以实现一个延时队列

#### 延时队列实现 - 1

![image-20201120132805292](http://qnimg.gisfsde.com/work/image-20201120132805292.png)

延时队列实现 - 2

![image-20201120132922164](http://qnimg.gisfsde.com/work/image-20201120132922164.png)

代码实现：

下单场景

![image-20201120133054368](http://qnimg.gisfsde.com/work/image-20201120133054368.png)

模式升级

![image-20201120133258725](http://qnimg.gisfsde.com/work/image-20201120133258725.png)

代码实现：

SpringBoot可以使用@Bean 来初始化Queue、exchange、Biding等

```java
/**
 * 监听队列信息
 * @param orderEntity
 */
@RabbitListener(queues = "order.release.order.queue")
public void listener(OrderEntity orderEntity, Channel channel, Message message) throws IOException {
    System.out.println("收到过期的订单信息，准备关闭订单" + orderEntity.getOrderSn());
    // 确认接收到消息，不批量接收
    channel.basicAck(message.getMessageProperties().getDeliveryTag(), false);
}

/**
 * 容器中的 Binding、Queue、exchange 都会自动创建，(RabbitMQ没有的情况下)
 * @return
 */
@Bean
public Queue orderDelayQueue(){
    // 特殊参数
    Map\<String,Object> map = new HashMap\<>();
    // 设置交换器

    map.put("x-dead-letter-exchange", "order-event-exchange");
    // 路由键
    map.put("x-dead-letter-routing-key","order.release.order");
    // 消息过期时间
    map.put("x-message-ttl",60000);
    Queue queue = new Queue("order.delay.queue", true, false, false,map);
    return queue;
}

/**
 * 创建队列
 * @return
 */
@Bean
public Queue orderReleaseOrderQueue() {
    Queue queue = new Queue("order.release.order.queue", true, false, false);
    return queue;
}

/**
 * 创建交换机
 * @return
 */
@Bean
public Exchange orderEventExchange() {
    return new TopicExchange("order-event-exchange",true,false);
}

/**
 * 绑定关系 将delay.queue和event-exchange进行绑定
 * @return
 */
@Bean
public Binding orderCreateOrderBingding(){
        return new Binding("order.delay.queue",
                Binding.DestinationType.QUEUE,
                "order-event-exchange",
                "order.create.order",
                null);
}

/**
 * 将 release.queue 和 event-exchange进行绑定
 * @return
 */
@Bean
public Binding orderReleaseOrderBinding(){
    return new Binding("order.release.order.queue",
            Binding.DestinationType.QUEUE,
            "order-event-exchange",
            "order.release.order",
            null);
}
```



### 13.9 如何保证消息可靠性 - 消息丢失 & 消息重复

#### 1、消息丢失

- **消息发送出去，由于网络问题没有抵达服务器**
  - 做好容错方法(try-Catch) ，发送消息可能会网络失败，失败后要有重试机制，可记录到数据库，采用定期扫描重发的方式
  - 做好日志记录，每个消息状态是否都被服务器收到都应该记录
  - 做好定期重发，如果消息没有发送成功，定期去数据库扫描未成功的消息进行重发
- **消息抵达Broker, Broker要将消息写入磁盘(持久化)才算成功。此时Broker尚未持久化完成，宕机。**
  - publisher也必须加入确认回调机制，确认成功的消息，修改数据库消息状态。
- **自动ACK的状态下。消费者收到消息，但没来得及消息然后宕机**
  - 一定开启手动ACK，消费成功才移除，失败或者没来得及处理就noAck并重新入队

#### 2、消息重复

- **消息消费成功，事务已经提交，ack时，机器宕机。导致没有ack成功，Broker的消息重新由unack变为ready,并发送给其他消费者**
- **消息消费失败，由于重试机制，自动又将消息发送出去**
- **成功消费，ack时宕机，消息由unack变为ready, Broker又重新发送**
  - 消费者的业务消费接口应该设计为**幂等性**的。比如扣库存有工作单的状态标志
  - 使用**防重表**(redis/mysq|) ，发送消息每一 个都有业务的唯一 标识，处理过就不用处理
  - rabbitMQ的每一个消息都有redelivered字段， 可以获取**是否是被重新投递过来的**，而不是第一次投递过来的

#### 3、消息积压

- **消费者积压**
- **消费者消费能力不足积压**
- **发送者发送流量太大**
  - 上线更多消费者，进行正常消费
  - 上线专门的队列消费服务，将消息先批量取出来，记录数据库，离线慢慢处理





# 14、订单

### 14.1 订单中心

1、订单中心

电商系列涉及到 3 流，分别为信息流、资金流、物流，而订单系统作为中枢将三者有机的集合起来

订单模块是电商系统的枢纽，在订单这个模块上获取多个模块的数据和信息，同时对这些信息进行加工处理后流向下个环节，这一系列就构成了订单的信息疏通

#### 1、订单构成

![image-20201117102129127](http://qnimg.gisfsde.com/work/image-20201117102129127.png)

##### 1、用户信息

用户信息包括是用户账号、用户等级、用户的收货地址、收货人、收货人电话、用户账号需要绑定手机号码，但是用户绑定的手机号码不一定是收货信息上的电话。用户可以添加多个收货信息，用户等级信息可以用来和促销系统进行匹配，获取商品折扣，同时用户等级还可以获取积分的奖励等

##### 2、订单基础信息

订单基础信息是订单流转的核心，其包括订单类型，父/子订单、订单编号、订单状态、订单流转时间等

1. 订单类型包括实体订单和虚拟订单商品等，这个根据商城商品和服务类型进行区分
2. 同时订单都需要做父子订单处理，之前在初创公司一直只有一个订单，没有做父子订单处理后期需
3. 要进行拆单的时候就比较麻烦，尤其是多商户商场，和不同仓库商品的时候，父子订单就是为后期做拆单准备的。
4. 订单编号不多说了，需要强调的一点是父子订单都需要有订单编号，需要完善的时候可以对订单编号的每个字段进行统一定义和诠释。
5. 订单状态记录订单每次流转过程，后面会对订单状态进行单独的说明。
6. 订单流转时间需要记录下单时间，支付时间，发货时间，结束时间/关闭时间等等



##### 3、商品信息

商品信息从商品库中获取商品的SKU信息、图片、名称、属性规格、商品单价、商户信息等，从用户

下单行为记录的用户下单数量，商品合计价格等



##### 4、优惠信息

优惠信息记录用户参与过的优惠活动，包括优惠促销活动，比如满减、满赠、秒杀等，用户使用的优

惠卷信息，优惠卷满足条件的优惠卷需要展示出来，另外虚拟币抵扣信息等进行记录

为什么把优惠信息单独拿出来而不放在支付信息里面呢?

因为优惠信息只是记录用户使用的条目，而支付信息需要加入数据进行计算，所以做为区分。



##### 5、支付信息

支付流水单号，这个流水单号是在唤起网关支付后支付通道返回给电商业务平台的支付流水号，财务

通过订单号和流水单号与支付通道进行对账使用。

支付方式用户使用的支付方式，比如微信支付、支付宝支付、钱包支付、快捷支付等。支付方式有时候可能有两个一-余额支付+第三方支付。

商品总金额，每个商品加总后的金额:运费，物流产生的费用;优惠总金额，包括促销活动的优惠金额，

优惠券优惠金额，虚拟积分或者虛拟币抵扣的金額，会员折扣的金额等之和;实付金额，用户实际需要

付款的金额。

**用户实付金额=商品总金额+运费 - 优惠总金额**



##### 6、物流信息

物流信息包括配送方式，物流公司，物流单号，物流状态，物流状态可以通过第三方接口来
获取和向用户展示物流每个状态节点。

#### 2、订单状态

##### 1、待付款

用户提交订单后，订单进行预下单，目前主流电商网站都会唤起支付，便于用户快速完成支
付，需要注意的是待付款状态下可以对库存进行锁定，锁定库存需要配置支付超时时间，超
时后将自动取消订单，订单变更关闭状态。

##### 2、已付款/代发货

用户完成订单支付，订单系统需要记录支付时间，支付流水单号便于对账，订单下放到WMS系统，仓库进行调动、配货、分拣，出库等操作

##### 3、待收货/已发货

仓库将商品出库后，订单进入物流环节，订单系统需要同步物流信息，便于用户实时熟悉商品的物流状态

##### 4、已完成

用户确认收货后吗，订单交易完成，后续支付则进行计算，如果订单存在问题进入售后状态

##### 5、已取消

付款之前取消订单，包括超时未付款或用户商户取消订单都会产生这种订单状态

##### 6、售后中

用户在付款后申请退款，或商家发货后用户申请退货



售后也同样存在各种状态，当发起售后申请后生成售后订单，售后订单状态为待审核，等待

商家审核，商家审核通过后订单状态变更为待退货，等待用户将商品寄回，商家收货后订单

状态更新为待退款状态，退款到用户原账户后订单状态更新为售后成功。





### 14.2 订单流程

订单流程是指从订单产生到完成整个流转的过程，从而行程了-套标准流程规则。而不同的产品类型或业务类型在系统中的流程会千差万别，比如上面提到的线上实物订单和虚拟订单的流程，线上实物订单与020订单等，所以需要根据不同的类型进行构建订单流程。不管类型如何订单都包括正向流程和逆向流程，对应的场景就是购买商品和退换货流程，正向流程就是一一个正常的网购步骤:订单生成>支付订单->卖家发货一确认收货>交易成功。而每个步骤的背后，订单是如何在多系统之间交互流转的，

可概括如下图

![image-20201117104613032](http://qnimg.gisfsde.com/work/image-20201117104613032.png)	

1、订单创建与支付

1. 订单创建前需要预览订单，选择收货信息等
2. 订单创建需要锁定库存，库存有才可创建，否则不能创建
3. 订单创建后超时未支付需要解锁库存
4. 支付成功后，需要进行拆单，根据商品打包方式，所在仓库，物流等进行拆单
5. 支付的每笔流水都需要记录，以待查账
6. 订单创建，支付成功等状态都需要给MQ发送消息，方便其他系统感知订阅

2、逆向流程

1. 修改订单，用户没有提交订单，可以对订单一些信息进行修改，比如配送信息，优惠信息，及其他一些订单可修改范围的内容，此时只需对数据进行变更即可。
2. 订单取消**，用户主动取消订单和用户超时未支付**，两种情况下订单都会取消订单，而超时情况是系统自动关闭订单，所以在订单支付的响应机制上面要做支付的

### 14.3 幂等性处理



### 14.4 订单业务

#### 1、搭建环境

在订单服务下准备好页面

![image-20210105095210202](http://qnimg.gisfsde.com/work/image-20210105095210202.png)

可以发现订单结算页，包含以下信息:

1.收货人信息:有更多地址，即有多个收货地址，其中有一个默认收货地址

2.支付方式:货到付款下在线支付，不需要后台提供

3.送货清单:配送方式(不做)及商品列表(根据购物车选中的skuld到数据库中查询)

4.发票:不做

5.优惠:查询用户领取的优惠券(不做)及可用积分(京豆)

##### 1.1、整合SpringSession

**1、引入pom**

```xml
  <!--整合spring session 解决session问题-->
        \<dependency>
            \<groupId>org.springframework.session\</groupId>
            \<artifactId>spring-session-data-redis\</artifactId>
        \</dependency>
```

**2、配置文件添加**

```yaml
Spring:
	session:
    	store-type: redis
```

**3、启动类加注解**

```java
@EnableRedisHttpSession
```

**4、修改页面中登录**

```html
						\<li style="border: 0;">
							\<a th:if="${session.loginUser != null }" class="aa">[[${session.loginUser.nickname}]]\</a>
							\<a th:if="${session.loginUser == null }" href="http://auth.gulimall.com/login.html">你好请登录\</a>
						\</li>
						\<li>
							\<a th:if="${session.loginUser == null }" style="color: red;" href="http://auth.gulimall.com/reg.html" class="li_2">免费注册\</a>
						\</li>
```

##### 1.2、订单登录拦截

任何请求都需要先经过拦截器的验证，才能去执行目标方法，这里是用户是否登录，用户登录了则放行，否则跳转到登陆页面

```java
  /**
     * 目标方法执行之前
     * @param request
     * @param response
     * @param handler
     * @return
     * @throws Exception
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String requestURI = request.getRequestURI();
        // 指定的请求不拦截
        boolean match1 = new AntPathMatcher().match("/order/order/status/**", requestURI);
        boolean match2 = new AntPathMatcher().match("/payed/notify", requestURI);
        if (match1 || match2) {
            return true;
        }
        MemberRespVo memberRespVo= (MemberRespVo) request.getSession().getAttribute(AuthServerConstant.LOGIN_USER);
        if (memberRespVo != null) { // 用户登陆了
            loginUser.set(memberRespVo); // 放到共享数据中
            return true;
        } else { // 用户没登录
            // 给前端显示提示信息
            request.getSession().setAttribute("msg","请先进行登录");
            // 重定向到登录页面
            response.sendRedirect("http://auth.gulimall.com/login.html");
            return false;
        }
    }
```

#### 2、订单确认页

![image-20210105142735857](http://qnimg.gisfsde.com/work/image-20210105142735857.png)

**根据图片中商品信息抽取成Vo**

##### 2.1、抽取Vo

**订单确认OrderConfirmVo**

```java

/**
 * 订单确认页需要的数据
 * @author gcq
 * @Create 2020-11-17
 */

public class OrderConfirmVo {

    // 收货地址，ums_member_receive_address
    @Getter @Setter
    List\<MemberAddressVo> address;

    // 所有选中的购物项
    @Getter @Setter
    List\<OrderItemVo> item;

    // 发票记录...

    /**
     * 优惠卷信息
     */
    @Getter @Setter
    Integer integration;

    /**
     * 订单总额
     */
    BigDecimal total;
    public BigDecimal getTotal() {
        BigDecimal sum = new BigDecimal("0");
        if(item != null) {
            for (OrderItemVo orderItemVo : item) {
                BigDecimal multiply = orderItemVo.getPrice().multiply(new BigDecimal(orderItemVo.getCount().toString()));
                sum = sum.add(multiply);
            }
        }
        return sum;
    }
    @Getter @Setter
    Map\<Long,Boolean> stocks;
    /**
     * 应付价格
     */
    BigDecimal payPrice;

    public BigDecimal getPayPrice() {
        BigDecimal sum = new BigDecimal("0");
        if(item != null) {
            for (OrderItemVo orderItemVo : item) {
                BigDecimal multiply = orderItemVo.getPrice().multiply(new BigDecimal(orderItemVo.getCount().toString()));
                sum = sum.add(multiply);
            }
        }
        return sum;
    }

    @Setter
    private Integer count;

    /**
     * 遍历item 拿到商品的数量
     * @return
     */
    public Integer getCount() {
        Integer i = 0;
        if (item != null) {
            for (OrderItemVo orderItemVo : item) {
                i+=orderItemVo.getCount();
            }
        }
        return i;
    }

    @Getter @Setter
    private String orderToken;

}
```

**商品项orderItemVo**

```java
/**
 * 商品项
 * @author gcq
 * @Create 2020-11-17
 */
@Data
public class OrderItemVo {
    /**
     * 商品id
     */
    private Long skuId;
    /**
     * 购物车中是否选中
     */
    private Boolean check = true;
    /**
     * 商品的标题
     */
    private String title;
    /**
     * 商品的图片
     */
    private String image;
    /**
     * 商品的属性
     */
    private List\<String> skuAttr;
    /**
     * 商品的价格
     */
    private BigDecimal price;
    /**
     * 商品的数量
     */
    private Integer count;
    /**
     * 购物车价格 使用自定义get、set
     */
    private BigDecimal totalPrice;


    private BigDecimal weight;

}
```

**用户地址MemberAddressVo**

```java
/**
 * 用户地址信息
 * @author gcq
 * @Create 2020-11-17
 */
@Data
public class MemberAddressVo {
    private Long id;
    /**
     * member_id
     */
    private Long memberId;
    /**
     * 收货人姓名
     */
    private String name;
    /**
     * 电话
     */
    private String phone;
    /**
     * 邮政编码
     */
    private String postCode;
    /**
     * 省份/直辖市
     */
    private String province;
    /**
     * 城市
     */
    private String city;
    /**
     * 区
     */
    private String region;
    /**
     * 详细地址(街道)
     */
    private String detailAddress;
    /**
     * 省市区代码
     */
    private String areacode;
    /**
     * 是否默认
     */
    private Integer defaultStatus;
}
```

##### 2.2、订单确认页数据查询

```java
   @Override
    public OrderConfirmVo confirmOrder() throws ExecutionException, InterruptedException {
        OrderConfirmVo confirmVo = new OrderConfirmVo();
        MemberRespVo memberRespVo = OrderInterceptor.loginUser.get();// 获取当前登录后的用户
        // 异步任务执行之前，先共享数据
        RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
        // 1、第一个异步任务 远程查询用户地址信息
        CompletableFuture\<Void> memberFuture = CompletableFuture.runAsync(() -> {
            // 在主线程中拿到原来的数据，在父线程里面共享RequestContextHolder
            // 只有共享，拦截其中才会有数据
            RequestContextHolder.setRequestAttributes(requestAttributes);
            // 根据会员id查出之前会员保存过的收货地址信息
            // 远程查询会员服务的收获地址信息
            List\<MemberAddressVo> address = memberFeignService.getAddress(memberRespVo.getId());
            log.error("address:{}",address);
            confirmVo.setAddress(address);
        }, executor);

        // 2、第二个异步任务远程查询购物车中选中给的购物项
        CompletableFuture\<Void> addressFuture = CompletableFuture.runAsync(() -> {
            // 每一个线程都来共享之前的请求数据
            RequestContextHolder.setRequestAttributes(requestAttributes);
            // 远程查询购物车中的购物项信息，用来结账
            List\<OrderItemVo> currentUserCartItem = cartFeignServicea.getCurrentUserCartItem();// 获取当前用户的购物项数据
            log.error("currentUserCartItem:{}",currentUserCartItem);
            confirmVo.setItem(currentUserCartItem);
            // 查询到购物项信息后，再看查询购物的库存信息
        }, executor).thenRunAsync(() -> { // 只要上面任务执行完成，就开始执行thenRunAsync的任务
            // 3、商品是否有库存
            List\<OrderItemVo> items = confirmVo.getItem();
            // 批量查询每一个商品的信息
            // 收集好商品id
            List\<Long> collect = items.stream().map(item -> item.getSkuId()).collect(Collectors.toList());
            // 远程查询购物项对应的库存信息
            R data = wareFeignService.hasStock(collect);
            // 得到每一个商品的库存状态信息
            List\<SkuHasStockVo> hasStockVo = data.getData(new TypeReference\<List\<SkuHasStockVo>>() {
            });
            if (hasStockVo != null) {
                Map\<Long, Boolean> stockMap = hasStockVo.stream().collect(Collectors.toMap(SkuHasStockVo::getSkuId, SkuHasStockVo::getHasStock));
                confirmVo.setStocks(stockMap);
                log.error("stockMap:{}",stockMap);
            }
        },executor);


        // 4、查询积分信息
        Integer integration = confirmVo.getIntegration();
        confirmVo.setIntegration(integration);

        // 等两个异步任务都完成
        CompletableFuture.allOf(memberFuture, addressFuture).get();
       // 4、防重令牌
        /**
         * 接口幂等性就是用户对同一操作发起的一次请求和多次请求结果是一致的
         * 不会因为多次点击而产生了副作用，比如支付场景，用户购买了商品，支付扣款成功，
         * 但是返回结果的时候出现了网络异常，此时钱已经扣了，用户再次点击按钮，
         * 此时就会进行第二次扣款，返回结果成功，用户查询余额发现多扣钱了，
         * 流水记录也变成了两条。。。这就没有保证接口幂等性
         */
        // 先是再页面中生成一个随机码把他叫做token先存到redis中，然后放到对象中在页面进行渲染。
        // 用户提交表单的时候，带着这个token和redis里面去匹配如果一直那么可以执行下面流程。
        // 匹配成功后再redis中删除这个token，下次请求再过来的时候就匹配不上直接返回
        // 生成防重令牌
        String token = UUID.randomUUID().toString().replace("-","");
        // 存到redis中 设置30分钟超时
        redisTemplate.opsForValue().set(OrderConstant.USER_ORDER_TOKEN_PREFIX + memberRespVo.getId(),token,30, TimeUnit.SECONDS);
        // 放到页面进行显示token，然后订单中带着token来请求
        confirmVo.setOrderToken(token);

        return confirmVo;
```

#### 3、创建订单

##### 1、OrderWebController

```java
 /**
    * @需求描述: 系统管理员 订单组 模块 用户下单功能
    * @创建人: 郭承乾
    * @创建时间: 2021/01/06 12:01
    * @修改需求:
    * @修改人:
    * @修改时间:
    * @需求思路:
    */
    @PostMapping("/submitOrder")
    public String submitOrder(OrderSubmitVo vo, Model model, RedirectAttributes redirectAttributes) {
        SubmitOrderResponseVo responseVo = orderService.submitOrder(vo);
        log.error("======================订单创建成功{}:",responseVo);
        // 根据vo中定义的状态码来验证
        if (responseVo.getCode() == 0 ) { // 订单创建成功
            // 下单成功返回到支付页
            model.addAttribute("submitOrderResp",responseVo);
            return "pay";
        } else { // 下单失败
            // 根据状态码验证对应的状态
            String msg = "下单失败";
            switch (responseVo.getCode()) {
                case 1: msg += "订单信息过期，请刷新后再次提交"; break;
                case 2: msg += "订单商品价格发生变化，请确认后再次提交"; break;
                case 3: msg += "库存锁定失败，商品库存不足"; break;
            }
            redirectAttributes.addFlashAttribute("msg",msg);
            // 重新回到订单确认页面
            return "redirect:http://order.gulimall.com/toTrade";
        }
    }
```

##### 2、Service

具体业务

```java
 @Transactional
    @Override
    public SubmitOrderResponseVo submitOrder(OrderSubmitVo vo) {
        // 先将参数放到共享变量中，方便之后方法使用该参数
        confirmVoThreadLocal.set(vo);
        // 接收返回数据
        SubmitOrderResponseVo response = new SubmitOrderResponseVo();
        response.setCode(0);
        // 通过拦截器拿到用户的数据
        MemberRespVo memberRespVo = LoginInterceptor.loginUser.get();
        /**
         * 不使用原子性验证令牌
         *      1、用户带着两个订单，提交速度非常快，两个订单的令牌都是123，去redis里面查查到的也是123。
         *          两个对比都通过，然后来删除令牌，那么就会出现用户重复提交的问题，
         *      2、第一次差的快，第二次查的慢，只要没删就会出现这些问题
         *      3、因此令牌的【验证和删除必须保证原子性】
         *      String orderToken = vo.getOrderToken();
         *      String redisToken = redisTemplate.opsForValue().get(OrderConstant.USER_ORDER_TOKEN_PREFIX + memberRespVo.getId());
         *         if (orderToken != null && orderToken.equals(redisToken)) {
         *             // 令牌验证通过 进行删除
         *             redisTemplate.delete(OrderConstant.USER_ORDER_TOKEN_PREFIX + memberRespVo.getId());
         *         } else {
         *             // 不通过
         *         }
         */
        // 验证令牌【令牌的对比和删除必须保证原子性】
        // 因此使用redis中脚本来进行验证并删除令牌
        // 0【删除失败/验证失败】 1【删除成功】
        String script = "if redis.call('get',KEYS[1]) == ARGV[1] then return redis.call('del',KEYS[1]) else return 0 end";
        /**
         * redis lur脚本命令解析
         * if redis.call('get',KEYS[1]) == ARGV[1] then return redis.call('del',KEYS[1]) else return 0 end
         *  1、redis调用get方法来获取一个key的值，如果这个get出来的值等于我们传过来的值
         *  2、然后就执行删除，根据这个key进行删除，删除成功返回1，验证失败返回0
         *  3、删除否则就是0
         *  总结：相同的进行删除，不相同的返回0
         * 脚本大致意思
         */
        // 拿到令牌
        String orderToken = vo.getOrderToken();
        /**
         * 	public \<T> T execute(RedisScript\<T> script // redis的脚本
         * 	    , List\<K> keys // 对应的key 参数中使用了Array.asList 将参数转成list集合
         * 	    , Object... args) { // 要删除的值
         */
        // 原子验证和删除
        Long result = redisTemplate.execute(new DefaultRedisScript\<Long>(script, Long.class)
                , Arrays.asList(OrderConstant.USER_ORDER_TOKEN_PREFIX + memberRespVo.getId())
                , orderToken);
        if (result  == 0L) { // 验证令牌验证失败
            // 验证失败直接返回结果
            response.setCode(1);
            return response;
        } else { // 原子验证令牌成功
            // 下单 创建订单、验证令牌、验证价格、验证库存
            // 1、创建订单、订单项信息
            OrderCreateTo order = createOrder();
            // 2、应付总额
            BigDecimal payAmount = order.getOrder().getPayAmount();
            // 应付价格
            BigDecimal payPrice = vo.getPayPrice();
            /**
             * 电商项目对付款的金额精确到小数点后面两位
             * 订单创建好的应付总额 和购物车中计算好的应付价格求出绝对值。
             */
            if(Math.abs(payAmount.subtract(payPrice).doubleValue()) \< 0.01) {
                // 金额对比成功 保存订单
                saveOrder(order);
                // 创建锁定库存Vo
                WareSkuLockedVo wareSkuLockedVo = new WareSkuLockedVo();
                // 准备好商品项
                List\<OrderItemVo> lock = order.getOrderItem().stream().map(orderItemEntity -> {
                    OrderItemVo orderItemVo = new OrderItemVo();
                    // 商品购买数量
                    orderItemVo.setCount(orderItemEntity.getSkuQuantity());
                    // skuid 用来查询商品信息
                    orderItemVo.setSkuId(orderItemEntity.getSkuId());
                    // 商品标题
                    orderItemVo.setTitle(orderItemEntity.getSkuName());
                    return orderItemVo;
                }).collect(Collectors.toList());
                // 订单号
                wareSkuLockedVo.setOrderSn(order.getOrder().getOrderSn());
                // 商品项
                wareSkuLockedVo.setLocks(lock);
                // 远程调用库存服务锁定库存
                R r = wareFeignService.orderLockStock(wareSkuLockedVo);
                if (r.getCode() == 0) { // 库存锁定成功
                    // 将订单对象放到返回Vo中
                    response.setOrder(order.getOrder());
                    // 设置状态码
                    response.setCode(0);
                    // 订单创建成功发送消息给MQ
                    rabbitTemplate.convertAndSend("order-event-exchange"
                            ,"order.create.order"
                            ,order.getOrder());
                    return response;
                } else {
                    // 远程锁定库存失败
                    response.setCode(3);
                    return response;
                }
            } else {
                // 商品价格比较失败
                response.setCode(2);
                return response;
            }
        }
    }
 /**
     * 创建订单和订单项
     * @return
     */
    private OrderCreateTo createOrder() {
        OrderCreateTo orderCreateTo = new OrderCreateTo();
        // 1、生成订单号
        String orderSn = IdWorker.getTimeId();
        // 2、构建订单
        OrderEntity orderEntity = buildOrder(orderSn);
        // 3、构建订单项
        List\<OrderItemEntity> itemEntities = builderOrderItems(orderSn);
        // 4、设置价格、积分相关信息
        computPrice(orderEntity,itemEntities);
        // 5、设置订单项
        orderCreateTo.setOrderItem(itemEntities);
        // 6、设置订单
        orderCreateTo.setOrder(orderEntity);
        return orderCreateTo;
    }
 /**
     * 构建订单
     * @param orderSn
     * @return
     */
    private OrderEntity buildOrder(String orderSn) {
        // 拿到共享数据
        OrderSubmitVo orderSubmitVo = confirmVoThreadLocal.get();
        // 用户登录登录数据
        MemberRespVo memberRespVo = LoginInterceptor.loginUser.get();

        OrderEntity orderEntity = new OrderEntity();
        // 设置订单号
        orderEntity.setOrderSn(orderSn);
        // 用户id
        orderEntity.setMemberId(memberRespVo.getId());
        // 根据用户收货地址id查询出用户的收获地址信息
        R fare = wareFeignService.getFare(orderSubmitVo.getAddrId());
        FareVo data = fare.getData(new TypeReference\<FareVo>() {
        });
        //将查询到的会员收货地址信息设置到订单对象中
        // 运费金额
        orderEntity.setFreightAmount(data.getFare());
        // 城市
        orderEntity.setReceiverCity(data.getMemberAddressVo().getCity());
        // 详细地区
        orderEntity.setReceiverDetailAddress(data.getMemberAddressVo().getDetailAddress());
        // 收货人姓名
        orderEntity.setReceiverName(data.getMemberAddressVo().getName());
        // 收货人手机号
        orderEntity.setReceiverPhone(data.getMemberAddressVo().getPhone());
        // 区
        orderEntity.setReceiverRegion(data.getMemberAddressVo().getRegion());
        // 省份直辖市
        orderEntity.setReceiverProvince(data.getMemberAddressVo().getProvince());
        // 订单刚创建状态设置为 待付款，用户支付成功后将该该状态改成已付款
        orderEntity.setStatus(OrderStatusEnum.CREATE_NEW.getCode());
        // 自动确认时间
        orderEntity.setAutoConfirmDay(7);

        return orderEntity;
    }
/**
     * 构建订单项
     * @param orderSn
     * @return
     */
    private List\<OrderItemEntity> builderOrderItems(String orderSn) {
        // 获取购物车中选中的商品
        List\<OrderItemVo> currentUserCartItem = cartFeignServicea.getCurrentUserCartItem();
        if (currentUserCartItem != null && currentUserCartItem.size() > 0) {
            List\<OrderItemEntity> collect = currentUserCartItem.stream().map(orderItemVo -> {
                // 构建订单项
                OrderItemEntity itemEntity = builderOrderItem(orderItemVo);
                itemEntity.setOrderSn(orderSn);
                return itemEntity;
            }).collect(Collectors.toList());
            return collect;
        }
        return null;
    }
  /**
     * 构建订单项信息
     * @param cartItem
     * @return
     */
    private OrderItemEntity builderOrderItem(OrderItemVo cartItem) {
        OrderItemEntity itemEntity = new OrderItemEntity();
        // 1、根据skuid查询关联的spuinfo信息
        Long skuId = cartItem.getSkuId();
        R spuinfo = productFeignService.getSpuInfoBySkuId(skuId);
        SpuInfoVo spuInfoVo = spuinfo.getData(new TypeReference\<SpuInfoVo>() {
        });
        // 2、设置商品项spu信息
        // 品牌信息
        itemEntity.setSpuBrand(spuInfoVo.getBrandId().toString());
        // 商品分类信息
        itemEntity.setCategoryId(spuInfoVo.getCatalogId());
        // spuid
        itemEntity.setSpuId(spuInfoVo.getId());
        // spu_name 商品名字
        itemEntity.setSpuName(spuInfoVo.getSpuName());

        // 3、设置商品sku信息
        // skuid
        itemEntity.setSkuId(skuId);
        // 商品标题
        itemEntity.setSkuName(cartItem.getTitle());
        // 商品图片
        itemEntity.setSkuPic(cartItem.getImage());
        // 商品sku价格
        itemEntity.setSkuPrice(cartItem.getPrice());
        // 商品属性以 ; 拆分
        String skuAttr = StringUtils.collectionToDelimitedString(cartItem.getSkuAttr(), ";");
        itemEntity.setSkuAttrsVals(skuAttr);
        // 商品购买数量
        itemEntity.setSkuQuantity(cartItem.getCount());

        // 4、设置商品优惠信息【不做】
        // 5、设置商品积分信息
        // 赠送积分 移弃小数值
        itemEntity.setGiftIntegration(cartItem.getPrice().multiply(new BigDecimal(cartItem.getCount().toString())).intValue());
        // 赠送成长值
        itemEntity.setGiftGrowth(cartItem.getPrice().multiply(new BigDecimal(cartItem.getCount().toString())).intValue());

        // 6、订单项的价格信息
        // 这里需要计算商品的分解信息
        // 商品促销分解金额
        itemEntity.setPromotionAmount(new BigDecimal("0"));
        // 优惠券优惠分解金额
        itemEntity.setCouponAmount(new BigDecimal("0"));
        // 积分优惠分解金额
        itemEntity.setIntegrationAmount(new BigDecimal("0"));
        // 商品价格乘以商品购买数量=总金额(未包含优惠信息)
        BigDecimal origin = itemEntity.getSkuPrice().multiply(new BigDecimal(itemEntity.getSkuQuantity().toString()));
        // 总价格减去优惠卷-积分优惠-商品促销金额 = 总金额
        origin.subtract(itemEntity.getPromotionAmount())
                .subtract(itemEntity.getCouponAmount())
                .subtract(itemEntity.getIntegrationAmount());
        // 该商品经过优惠后的分解金额
        itemEntity.setRealAmount(origin);
        return itemEntity;
    }
 /**
     * 计算订单涉及到的积分、优惠卷抵扣、促销优惠信息等信息
     * @param orderEntity
     * @param itemEntities
     * @return
     */
    private OrderEntity computPrice(OrderEntity orderEntity, List\<OrderItemEntity> itemEntities) {
        // 1、定义好相关金额，然后遍历购物项进行计算
        // 总价格
        BigDecimal total = new BigDecimal("0");
        //相关优惠信息
        // 优惠卷抵扣金额
        BigDecimal coupon = new BigDecimal("0");
        // 积分优惠金额
        BigDecimal integration = new BigDecimal("0");
        // 促销优惠金额
        BigDecimal promotion = new BigDecimal("0");
        // 积分
        BigDecimal gift = new BigDecimal("0");
        // 成长值
        BigDecimal growth = new BigDecimal("0");

        // 遍历订单项将所有的优惠信息进行相加
        for (OrderItemEntity itemEntity : itemEntities) {
            coupon = coupon.add(itemEntity.getCouponAmount()); // 优惠卷抵扣
            integration = integration.add(itemEntity.getIntegrationAmount()); // 积分优惠分解金额
            promotion = promotion.add(itemEntity.getPromotionAmount()); // 商品促销分解金额
            gift = gift.add(new BigDecimal(itemEntity.getGiftIntegration().toString())); // 赠送积分
            growth = growth.add(new BigDecimal(itemEntity.getGiftGrowth())); // 赠送成长值
            total = total.add(itemEntity.getRealAmount()); //优惠后的总金额
        }

        // 2、设置订单金额
        // 订单总金额
        orderEntity.setTotalAmount(total);
        // 应付总额 = 订单总额 + 运费信息
        orderEntity.setPayAmount(total.add(orderEntity.getFreightAmount()));
        // 促销优化金额（促销价、满减、阶梯价）
        orderEntity.setPromotionAmount(promotion);
        // 优惠券抵扣金额
        orderEntity.setCouponAmount(coupon);

        // 3、设置积分信息
        // 订单购买后可以获得的成长值
        orderEntity.setGrowth(growth.intValue());
        // 积分抵扣金额
        orderEntity.setIntegrationAmount(integration);
        // 可以获得的积分
        orderEntity.setIntegration(gift.intValue());
        // 删除状态【0->未删除；1->已删除】
        orderEntity.setDeleteStatus(0);
        return orderEntity;
    }
```

##### 3、库存自动解锁--->MQ

###### 库存解锁、StockReleaseListener

```java
package com.atguigu.gulimall.ware.listener;

import com.atguigu.common.to.mq.OrderTo;
import com.atguigu.common.to.mq.StockLockedTo;
import com.atguigu.gulimall.ware.service.WareSkuService;
import com.rabbitmq.client.Channel;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;

/**
 * 监听库存延时队列
 * @author gcq
 * @Create 2021-01-07
 */
@Service
@RabbitListener(queues = "stock.release.stock.queue")
public class StockReleaseListener {

    @Autowired
    WareSkuService wareSkuService;

    /**
     * 监听库存队列
     * @param lockedTo
     * @param message
     */
    @RabbitHandler
    public void handleStockLockedRelease(StockLockedTo lockedTo, Message message, Channel channel) throws IOException {
        System.out.println("收到解锁库存的信息");
        try {
            wareSkuService.unLockStock(lockedTo);
            //库存解锁成功没有抛出异常，自动ack机制确认
            channel.basicAck(message.getMessageProperties().getDeliveryTag(),false);
        } catch (Exception e) {
            e.printStackTrace();
            // 重发
            channel.basicReject(message.getMessageProperties().getDeliveryTag(),true);
        }
    }

    /**
     * 订单释放
     *  订单30分钟未支付，订单关闭后发送的消息
     */
    @RabbitHandler
    public void handlerOrderCloseRelease(OrderTo orderTo, Message message, Channel channel) throws IOException {
        System.out.println("订单关闭准备解锁库存......");
        try {
            wareSkuService.unLockStock(orderTo);
            channel.basicAck(message.getMessageProperties().getDeliveryTag(),false);
        } catch (Exception e) {
            e.printStackTrace();
            channel.basicReject(message.getMessageProperties().getDeliveryTag(),true);
        }
    }
}
```

Service

```java
 /**
     * 解锁库存
     * @param lockedTo
     */
    @Override
    public void unLockStock(StockLockedTo lockedTo) {
        // 工作单详情
        StockDetailTo detail = lockedTo.getDetail();
        // 工作单详情id
        Long detailId = detail.getId();
        // 查询到库存工作单详情
        WareOrderTaskDetailEntity taskDetailEntity = wareOrderTaskDetailService.getById(detailId);
        if (taskDetailEntity != null) {
            // 解锁库存
            // 库存工作单id
            Long id = lockedTo.getId();
            // 查询到库存工作单
            WareOrderTaskEntity TaskEntity = wareOrderTaskService.getById(id);
            // 拿到订单号
            String orderSn = TaskEntity.getOrderSn();
            // 根据订单号查询订单的状态
            R orderStatus = orderFeignService.getOrderStatus(orderSn);
            if (orderStatus.getCode() == 0) {
                OrderVo data = orderStatus.getData(new TypeReference\<OrderVo>() {
                });
                // 订单状态为已关闭,那么就需要解锁库存
                if (data == null || data.getStatus() == 4) {
                    // 库存工作单锁定状态为锁定才进行解锁
                    if (taskDetailEntity.getLockStatus() == 1) {
                        unLockStock(detail.getSkuId(), detail.getWareId(), detail.getSkuNum(), detailId);
                    }
                }
            } else {
                // 消息被拒绝后重新放到队列里面，让别人继续消费解锁
                throw new RuntimeException("远败");
            }
        }
    }
```



#### 4、支付

选择的是支付宝支付，根据老师所提供的素材 **alipayTemplate、PayVo、PaySyncVo**,引入到项目中进行开发

##### 1、Controller

跳转到支付宝支付页面，**支付完成后跳转到支付成功的回调页面**

```java
/**
     * 1、跳转到支付页面
     * 2、用户支付成功后，我们要跳转到用户的订单列表页
     * produces 明确方法会返回什么类型，这里返回的是html页面
     * @param orderSn
     * @return
     * @throws AlipayApiException
     */
    @ResponseBody
    @GetMapping(value = "/payOrder",produces = "text/html")
    public String payOrder(@RequestParam("orderSn") String orderSn) throws AlipayApiException {
//        PayVo payVo = new PayVo();
//        payVo.setBody(); // 商品描述
//        payVo.setSubject(); //订单名称
//        payVo.setOut_trade_no(); // 订单号
//        payVo.setTotal_amount(); //总金额
        PayVo payvo = orderService.payOrder(orderSn);
        // 将返回支付宝的支付页面，需要将这个页面进行显示
        String pay = alipayTemplate.pay(payvo);
        System.out.println(pay);
        return pay;
    }
```

##### 2、Service

```java
 /**
     * 计算商品支付需要的信息
     * @param orderSn
     * @return
     */
    @Override
    public PayVo payOrder(String orderSn) {
        PayVo payVo = new PayVo();
        OrderEntity orderEntity = this.getOrderByOrderSn(orderSn);// 根据订单号查询到商品
        // 数据库中付款金额小数有4位，但是支付宝只接受2位，所以向上取整两位数
        BigDecimal decimal = orderEntity.getPayAmount().setScale(2, BigDecimal.ROUND_UP);
        payVo.setTotal_amount(decimal.toString());
        // 商户订单号
        payVo.setOut_trade_no(orderSn);
        // 查询出订单项，用来设置商品的描述和商品名称
        List\<OrderItemEntity> itemEntities = orderItemService.list(new QueryWrapper\<OrderItemEntity>()
                .eq("order_sn", orderSn));
        OrderItemEntity itemEntity = itemEntities.get(0);
        // 订单名称使用商品项的名字
        payVo.setSubject(itemEntity.getSkuName());
        // 商品的描述使用商品项的属性
        payVo.setBody(itemEntity.getSkuAttrsVals());
        return payVo;
    }
```

##### 3、支付成功后跳转页面

支付成功后跳转到**订单页面**

```java
 /**
    * @需求描述: 系统管理员 会员服务组 模块 用户支付成功后跳转到该页面
    * @创建人: 
    * @创建时间: 2021/01/08 11:13
    * @修改需求:
    * @修改人:
    * @修改时间:
    * @需求思路:
    */
    @GetMapping("/memberOrder.html")
    public String memberList(@RequestParam(value = "pageNum",defaultValue = "1") Integer pageNum, Model model) {
        // 准备分页参数
        Map\<String,Object> params = new HashMap\<>();
        params.put("page",pageNum);
        // 远程查询当前用户的所有订单
        R r = orderFeignService.listwithItem(params);
        System.out.println(JSON.toJSONString(r));
        if (r.getCode() == 0) {
            model.addAttribute("orders",r);
        }
        return "list";
    }
```

Service

```java
 /**
     * 查询当前用户所有订单
     * @param params
     * @return
     */
    @Override
    public PageUtils queryPageWithItem(Map\<String, Object> params) {
        // 当前用户登录数据
        MemberRespVo memberRespVo = LoginInterceptor.loginUser.get();
        // 查询当前用户所有的订单记录
        IPage\<OrderEntity> page = this.page(
                new Query\<OrderEntity>().getPage(params),
                new QueryWrapper\<OrderEntity>()
                        .eq("member_id",memberRespVo.getId())
                        .orderByDesc("id")
        );
        List\<OrderEntity> records = page.getRecords(); // 拿到分页查询结果
        List\<OrderEntity> orderEntityList = records.stream().map(item -> {
            // 根据订单号查询当订单号对应的订单项
            List\<OrderItemEntity> itemEntities = orderItemService.list(new QueryWrapper\<OrderItemEntity>()
                    .eq("order_sn", item.getOrderSn()));
            item.setOrderEntityItem(itemEntities);
            return item;
        }).collect(Collectors.toList());
        // 重新设置分页数据
        page.setRecords(orderEntityList);

        return new PageUtils(page);
    }
```

然后页面渲染数据

支付宝文档地址:

https://opendocs.alipay.com/open/270/105900

![image-20210108143131033](http://qnimg.gisfsde.com/work/image-20210108143131033.png)

![image-20210105093259313](http://qnimg.gisfsde.com/work/image-20210105093259313.png)

#### 5、收单

##### 订单：OrderListener

```java
@RabbitListener(queues = "order.release.order.queue") // 监听订单的释放队列，能到这个里面的消息都是30分钟后过来的
@Service
public class OrderListener {

    @Autowired
    OrderService orderService;

    /**
     * 订单定时关单
     *      商品下单后，会向MQ中发送一条消息告诉MQ订单创建成功。
     *      那么订单创建30分钟后用户还没有下单，MQ就会关闭该订单
     * @param orderEntity 订单对象
     * @param channel 信道
     * @param message 交换机
     * @throws IOException
     */
    @RabbitHandler
    public void listener(OrderEntity orderEntity, Channel channel, Message message) throws IOException {
        System.out.println("收到过期的订单信息，准备关闭订单：" + orderEntity.getOrderSn());
        try {
            orderService.closeOrder(orderEntity);
            // 关闭订单成功后，ack信息确认
            channel.basicAck(message.getMessageProperties().getDeliveryTag(),false);
        } catch (Exception e) {
            e.printStackTrace();
            channel.basicReject(message.getMessageProperties().getDeliveryTag(),true);
        }
    }

}
```

Service

```java
   @Override
    public void closeOrder(OrderEntity orderEntity) {
        // 订单30分钟的时间可能有属性变动，所以需要根据属性再次查询一次
        OrderEntity entity = this.getById(orderEntity.getId());
        // 当前状态为待付款，说明用户30分钟内还没有付款
        if(entity.getStatus() == OrderStatusEnum.CREATE_NEW.getCode()) {
            OrderEntity updateOrder = new OrderEntity();
            // 根据订单id更新
            updateOrder.setId(entity.getId());
            // 订单状态改成已取消
            updateOrder.setStatus(OrderStatusEnum.CANCLED.getCode());
            // 根据订单对象更新
            this.updateById(updateOrder);
            // 准备共享对象用于发送到MQ中
            OrderTo orderTo = new OrderTo();
            // 拷贝属性
            BeanUtils.copyProperties(entity,orderTo);
            try {
                rabbitTemplate.convertAndSend("order-event-exchange","order.release.other",orderTo);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
```



![image-20210105093437013](http://qnimg.gisfsde.com/work/image-20210105093437013.png)

- 订单在支付页，不支付，一直刷新，订单过期了才支付，订单状态改为已支付了，但是库存解锁了。
  - 使用支付宝自动收单功能解决。只要一段时间不支付，就不能支付了。
- 由于时延等问题。订单解锁完成，正在解锁库存的时候，异步通知才到
  - 订单解锁，手动调用收单
- 网络阻塞问题，订单支付成功的异步通知一直不到达
  - 查询订单列表时，ajax获取当前未支付的订单状态，查询订单状态时，再获取一下支付宝此订单的状态
- 其他各种问题
  - 每天晚上闲时下载支付宝对账单，一 一 进行对账

# 15、幂等性

### 15.1 什么是幂等性

**接口幂等性就是用户对同一操作发起的一次请求和多次请求结果是一致的**，不会因为多次点击而产生了副作用，比如支付场景，用户购买了商品，支付扣款成功，但是返回结果的时候出现了网络异常，此时钱已经扣了，用户再次点击按钮，此时就会进行第二次扣款，返回结果成功，用户查询余额发现多扣钱了，流水记录也变成了两条。。。这就没有保证接口幂等性

### 15.2 那些情况需要防止

用户多次点击按钮

用户页面回退再次提交

微服务互相调用，由于网络问题，导致请求失败，feign触发重试机制

其他业务情况

### 15.3 什么情况下需要幂等

以 SQL 为例，有些操作时天然**幂等**的

SELECT * FROM table WHERE id =? 无论执行多少次都不会改变状态是天然的**幂等**

UPDATE tab1 SET col1=1 WHERE col2=2 无论执行成功多少状态都是一致的，也是**幂等**操作

delete from user where userid=1 多次操作，结果一样，具备**幂等**性

insert into user(userid,name) values(1,' a' ) 如userid为唯一主键，即重复上面的业务，只会插入一条用户记录，具备**幂等**性

------

UPDATE tab1 SET col1=col1+1 WHERE col2=2,每次执行的结果都会发生变化，不是**幂等**的。insert into user(userid,name) values(,a")如userid不是主键，可以重复，那上面业务多次操作，数据都会新增多条，不具备**幂等**性。



### 15.4 幂等解决方案

#### 1、token 机制

1、服务端提供了发送 `token` 的接口，我们在分析业务的时候，哪些业务是存在幂等性问题的，就必须在执行业务前，先获取 `token`，服务器会把 `token` 保存到 redis 中

2、然后调用业务接口请求时， 把 `token` 携带过去，一般放在请求头部

3、服务器判断 `token` 是否存在 `redis`，存在表示第一次请求，然后删除 `token`，继续执行业务

4、如果判断 `token` 不存在 `redis` 中，就表示重复操作，直接返回重复标记给 `client`，这样就保证了业务代码，不被重复执行

危险性：

**1、先删除 token 还是后删除 token：**

1. 先删除可能导致，业务确实没有执行，重试还得带上之前的 token, 由于防重设计导致，请求还是不能执行
2. 后删除可能导致，业务处理成功，但是服务闪断，出现超时，没有删除掉token，别人继续重试，导致业务被执行两次
3. 我们最后设计为先删除 token，如果业务调用失败，就重新获取 token 再次请求

**2、Token 获取，比较 和删除 必须是原子性**

1. redis.get（token），token.equals、redis.del（token）,如果说这两个操作都不是原子，可能导致，在高并发下，都 get 同样的数据，判断都成功，继续业务并发执行
2. 可以在 redis 使用 lua 脚本完成这个操作

```java
"if redis.call('get',KEYS[1]) == ARGV[1] then return redis.call('del',KEYS[1]) else return 0 end"
```



#### 2、各种锁机制

##### 1、数据库悲观锁

select * from xxx where id = 1 for update;

for update 查询的时候锁定这条记录 别人需要等待

悲观锁使用的时候一般伴随事务一起使用，数据锁定时间可能会很长，需要根据实际情况选用，另外需要注意的是，id字段一定是主键或唯一索引，不然可能造成锁表的结果，处理起来会非常麻烦

##### 2、数据库的乐观锁

这种方法适合在更新的场景中

update t_goods set count = count - 1,version = version + 1 where good_id = 2 and version = 1

根据 version 版本，也就是在操作数据库存前先获取当前商品的 version 版本号，然后操作的时候带上 version 版本号，我们梳理下，我们第一次操作库存时，得

到 version 为 1，调用库存服务 version = 2，但返回给订单服务出现了问题，订单服务又一次调用了库存服务，当订单服务传的 version 还是 1，再执行上面的

 sql 语句 就不会执行，因为 version 已经变成 2 了，where 条件不成立，这样就保证了不管调用几次，只会真正处理一次，乐观锁主要使用于处理读多写少的问题

##### 3、业务层分布锁

如果多个机器可能在同一时间处理相同的数据，比如多台机器定时任务拿到了相同的数据，我们就可以加分布式锁，锁定此数据，处理完成后后释放锁，获取锁必须先判断这个数据是否被处理过

#### 3、各种唯一约束

##### 1、数据库唯一约束

插入数据，应该按照唯一索引进行插入，比如订单号，相同订单就不可能有两条订单插入，我们在数据库层面防止重复

这个机制利用了数据库的主键唯一约束的特性，解决了 insert场 景时幂等问题，但主键的要求不是自增的主键，这样就需要业务生成全局唯一的主键

如果是分库分表场景下，路由规则要保证相同请求下，落地在同一个数据库和同一表中，要不然数据库主键约束就不起效果了，因为是不同的数据库和表主键不相关

##### 2、redis set 防重

很多数据需要处理，只能被处理一次，比如我们可以计算数据的 MD5 将其放入 redis 的

set,每次处理数据，先看这个 MD5 是否已经存在，存在就不处理



#### 4、防重表

使用订单表 `orderNo` 做为去重表的唯一索引，把唯一索引插入去重表，再进行业务操作，且他们在同一个事务中，这样就保证了重复请求时，因为去重表有唯一

约束，导致请求失败，避免了幂等性等问题，去重表和业务表应该在同一个库中，这样就保证了在同一个事务，即使业务操作失败，也会把去重表的数据回滚，这

个很好的保证了数据的一致性，

redis防重也算

#### 5、全局请求唯一id

调用接口时，生成一个唯一的id，redis 将数据保存到集合中（去重），存在即处理过，可以使用 nginx 设置每一个请求一个唯一id

proxy_set_header X-Request-Id $Request_id



# 16、本地事务

### 16.1 事务的基本性质

数据库事物的几个特性：原子性（Atomiccity）、一致性（Consistetcy）、隔离性或独立性（Isolation）和持久性（Durabilily），简称ACID

- **原子性：**一系列操作整体不可拆分，要么同时成功要么同时失败
- **一致性**：数据在业务的前后，业务整体一致
  - 转账 A:1000 B:1000  转200  事务成功 A：800 B：1200
- **隔离性：**事物之间需要相互隔离
- **持久性：**一旦事务成功，数据一定会落盘在数据库



在以往的单体应用中，我们多个业务操作使用同一条连接操作不同的表，一旦有异常我们很容易整体回滚

![image-20201119115615054](http://qnimg.gisfsde.com/work/image-20201119115615054.png)

**Business**：我们具体的业务代码
**Storage**：库存业务代码;扣库存
**Order**：订单业务代码;保存订单
**Account**：账号业务代码:减账户余额
比如买东西业务，扣库存，下订单，账户扣款，是一个整体；必须同时成功或者失败



一个事务开始，代表以下的所有操作都在同一个连接里面



### 16.2 事物的隔离级别

- **READ UNCOMMITEED(读未提交)**
  - 该隔离级别的事务会读到其他未提交事务的数据，此现象也称为脏读
- **READ COMMITTED（读提交）**
  - 一个事物可以读取另一个已提交的事务，多次读取会造成不一样的结果，此现象称为不可重复读，复读问题，Oracle 和SQL Server 的默认隔离级别
- **REPEATABLE READ（可重复读）**
  - 该隔离级别是 MySQL 默认的隔离级别，在同一个事物中，SELECT 的结果是事务开始时时间点的状态，因此，同样的 SELECT 操作读到的结果会是一致
  - 但是会有幻读一致,MySQL的 InnoDB 引擎可以通过 next-key locks 机制 来避免幻读
- **SERIALIZABLE（序列化）**
  - 在该隔离级别下事务都是串行顺序执行的，MySQL 数据库的 InnoDB 引擎会给读操作隐士加一把读共享锁，从而避免了脏读、不可重复读、幻读等问题

越大的隔离级别，并发能力越低



### 16.3 事务传播行为

**PROPAGATION_REQUIRED：**如果当前没事事务，就创建一个新事务，如果当前存在事务，就加入该事务，该设置时最常使用的配置

**PROPAGATION_SUPPORTS：**支持当前事务。如果当前存在事务，就加入该事务，如果当前不存在事务，就以非事务执行

**PROPAGATION_MANDATORY：**支持当前事务，如果当前存在事务，就加入该事务，如果当前不存在该事务，就抛出异常

**PROPAGATION_REQUIRES_NEW：**创建新事务，无论当前存不存在事务，都创建新事务

**PROPAGATION_NOT_SUPPORTED：**以非事务的方式执行操作，如果当前存在事务，就把当前事务挂起

**PROPAGATION_NEVER：**以非事务方式运行，如果当前存在事务，则抛出异常 	

**PROPAGATION_NESTED：**如果当前存在事务，就嵌套在该事务内执行，如果当前没有事务，则执行PROPAGATION_REQUIRED相关操作

### 16.4 SpringBoot 事务关键点

在同一个事物内编写两个方法，内部调用的时候，会导致事务失效，原因是没有用到代理对象的缘故

解决

0)、导入spring-boot-starter-aop
1)、@EnableTransactionManagement(proxyTargetClass= true)
2)、@EnableAspectJAutoProxy(lexposeProxy-true)
3)、AopContext.currentProxy() 调用方法

#### 1、事物的自动配置

#### 2、事物的坑







# 17、分布式事务

### 17.1 为什么要有分布式事务

分布式系统经常出现的异常

机器宕机、网络异常、消息丢失、消息乱序、不可靠的TCP、存储数据丢失....

![image-20201119170602679](http://qnimg.gisfsde.com/work/image-20201119170602679.png)



分布式事务是企业中集成的一个难点，也是每一个分布式系统架构中都会涉及到的一个东西，特别是在微服务架构中，几乎是无法避免的

### 17.2 CAP 定理与 BASE 理论

#### 1、CAP 定理

CAP 原则又称 CAP 定理指的是在一个分布式系统中

- **一致性（Consistency）**
  - 在分布式系统中所有数据备份，在同一时刻是否是同样的值，（等同于所有节点访问同一份最新数据的副本）
- **可用性（Avaliability）**
  - 在集群中一部分节点故障后，集群整体是否还能响应客户端的读写请求，（对数据更新具备高可用性）
- **分区容错性（Partition tolerance）**
  - 大多数分布式系统都分布在多个子网络，每个自网络叫做一个区（partition）。分区容错性的意思是，区间通信可能失败，比如，一台服务器放在中国另一台服务器放在美国，这就是两个区，它们之间可能无法通信

CAP 的原则是，这三个要素最多只能满足两个点，**不可能三者兼顾**

![image-20201119194354467](http://qnimg.gisfsde.com/work/image-20201119194354467.png)



一般来说，分区容错无法避免，因此我们可以认为 CAP 的 P 总是成立，CAP 定理告诉我们 剩下的 C 和 A 无法同时做到

分布式实现一致性的 raft 算法

http://thesecretlivesofdata.com/raft/



#### 2、面临的问

对于大多数互联网应用的场景、主机众多、部署分散，而且集群规模越来越大，所以节点故障，网络故障是常态，而且要保证服务可用性达到99.999%，即保证P 和 A,舍弃C

#### 3、BASE 理论

是对CAP的延申，思想即是无法做到强一致性（CAP的一致性就是强一致性），但可以采用适当的弱一致性，即**最终一致性**

BASE 是指

- 基本可用（Basically Avaliable）
  - 基本可用是指分布式系统中在出现故障的时候，允许损失部分可用性（列入响应时间，功能上的可用性）允许损失部分可用性。需要注意的是基本可用不等价于系统不可用
  - 响应时间上的损失，正常情况下搜索引擎需要在0.5秒之内返回给用户相应的查询结果，但由于出现故障（比如系统部分机房断电断网故障），查询的结果响应时间增加到了1~2秒
  - 功能上的损失，购物网站双十一购物高峰，为了保证系统的稳定性，部分消费者会被引入到一个降级页面
- **软状态（Soft State）**
  - 软状态是指允许 系统存在中间状态，而该中间状态不会影响系统整体可用性。分布式存储中一般一份数据会有 多个副本，允许不同副本同步的延时就是软状态的体现。mysglreplication的异步复制也是一种体现。
- **最终一致性( Eventual Consistency)**
  - 最终致性是指系统中的所有数据副本经过一定时间后，最终能够达到一 致的状态。弱一致性和强一致性相反，最终-致性是弱一致性的一种特殊情况。



#### 4、强一致性、弱一致性、最终一致性

从客户端角度，多进程并发访问时，更新过的数据在不同进程如何获取的不同策略，决定了不同的一致性。对于关系型数据库，要求更新过的数据能被后续的访问都能看到，这是强一致性。如果能容忍后续的部分或者全部访问不到，则是弱一致性。如果经过一段时间后要求能访问到更新后的数据，则是最终一致性

### 17.3 分布式事务的几种方案

#### 1、2PC 模式

数据库支持的 2PC[2 phase commit 二阶提交]，又叫 XA Transactions

MySQL 从5.5版本开始支持，Sql Server 2005 开始支持，oracle7 开始支持

其中，XA 是一个两阶段提交协议，该协议分为两个阶段：

第一阶段：事务协调器要求每个涉及到事务的数据库预提交（precommit）此操作，并反应是否可以提交

第二阶段：事务协调器要求每个数据库提交数据

其中，如果有任何一个数据库否认这次提交，那么所有数据库都会要求回滚他们在此事务中的那部分信息

![image-20201120090516086](http://qnimg.gisfsde.com/work/image-20201120090516086.png)

- XA协议比较简单，而且一旦商业数据库实现了XA协议，使用分布式事务的成本也比较低。
- XA性能不理想，特别是在交易下单链路，往往并发量很高，XA无法满足高并发场景
- XA目前在商业数据库支持的比较理想，在mysq!数据库中支持的不太理想，mysgl的
- XA实现，没有记录prepare阶段日志，主备切换回导致主库与备库数据不一致。
- 许多nosgI也没有支持XA，这让XA的应用场景变得非常狭隘。
- 也有3PC,引入了超时机制(无论协调者还是参与者，在向对方发送请求后，若长时间未收到回应则做出相应处理)

#### 2、柔性事务 - TCC 事务

刚性事务:遵循ACID原则，强一致性。
柔性事务:遵循BASE理论，最终一致性;
与刚性事务不同，柔性事务允许一定时间内，不同节点的数据不一致，但要求最终一致。

![image-20201120090923734](http://qnimg.gisfsde.com/work/image-20201120090923734.png)

一阶段 prepare 行为:调用自定义的 prepare 逻辑。
二阶段 commit 行为:调用自定义的 commit 逻辑。
二阶段 rollback行为:调用自定义的 rollback 逻辑。
所谓TCC模式，是指支持把自定义的分支事务纳入到全局事务的管理中。

#### 3、柔性事务 - 最大努力通知型方案

按规律进行通知，**不保证数据定能通知成功， 但会提供可查询操作接口进行核对**。这种方案主要用在与第三方系统通讯时，比如:调用微信或支付宝支付后的支付结果通知。这种方案也是结合MQ进行实现，例如:通过MQ发送http请求，设置最大通知次数。达到通知次数后即不再通知。

案例:银行通知、商户通知等(各大交易业务平台间的商户通知:多次通知、查询校对、对账文件)，支付宝的支付成功异步回调

#### 4、柔性事务 - 可靠信息 + 最终一致性方案（异步通知型）

实现:业务处理服务在业务事务提交之前，向实时消息服务请求发送消息，实时消息服务只记录消息数据，而不是真正的发送。业务处理服务在业务事务提交之后，向实时消息服务确认发送。只有在得到确认发送指令后，实时消息服务才会真正发送。





# 18、支付宝支付

### 1、进入蚂蚁金服开放平台

https://open.alipay.com/platform/home.htm

2、下载支付宝官方Demo，进行配置和测试

文档地址：

https://openhome.alipay.com/docCenter/docCenter.htm 创建应用对应文档

https://opendocs.alipay.com/open/200/105304 网页移动应用文档

https://opendocs.alipay.com/open/54/cyz7do 相关Demo

![image-20201122123349754](http://qnimg.gisfsde.com/work/image-20201122123349754.png)

![image-20201122114005616](http://qnimg.gisfsde.com/work/image-20201122114005616.png)密码

创建应用

![image-20201122113922427](http://qnimg.gisfsde.com/work/image-20201122113922427.png)

### 3、使用沙箱进行测试

https://openhome.alipay.com/platform/appDaily.htm?tab=info

![image-20201122125716179](http://qnimg.gisfsde.com/work/image-20201122125716179.png)

### 4、什么是公钥、私钥、加密、签名和验签?

1、公钥私钥
公钥和私钥是一一个相对概念

它们的公私性是相对于生成者来说的。

一对密钥生成后，保存在生成者手里的就是私钥，生成者发布出去大家用的就是公钥

![image-20201122174141878](http://qnimg.gisfsde.com/work/image-20201122174141878.png)

### 5、支付宝支付流程

https://opendocs.alipay.com/open/270/105898

#### 1、引导用户进入到支付宝页面

##### 1、pom.xml

```xml
<!--支付宝模块-->
 \<dependency>
            \<groupId>com.alipay.sdk\</groupId>
            \<artifactId>alipay-sdk-java\</artifactId>
            \<version>4.9.28.ALL\</version>
        \</dependency>
```

##### 2、将素材提供的文件引入到项目中

**AlipayTemplate、PayVo、PaySyncVo**

###### AlipayTemplate

```java
package com.atguigu.gulimall.order.config;

import com.alipay.api.AlipayApiException;
import com.alipay.api.AlipayClient;
import com.alipay.api.DefaultAlipayClient;
import com.alipay.api.request.AlipayTradePagePayRequest;
import com.atguigu.gulimall.order.vo.PayVo;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@ConfigurationProperties(prefix = "alipay")
@Component
@Data
public class AlipayTemplate {

    //在支付宝创建的应用的id
    private   String app_id = "2016092200568607";

    // 商户私钥，您的PKCS8格式RSA2私钥
    private  String merchant_private_key = "XXX";
    // 支付宝公钥,查看地址：https://openhome.alipay.com/platform/keyManage.htm 对应APPID下的支付宝公钥。
    private  String alipay_public_key = "XXX";
    // 服务器[异步通知]页面路径  需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
    // 支付宝会悄悄的给我们发送一个请求，告诉我们支付成功的信息
    private  String notify_url = "http://member.gulimall.com/memberOrder.html";

    // 页面跳转同步通知页面路径 需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
    //同步通知，支付成功，一般跳转到成功页
    private  String return_url = "http://member.gulimall.com/memberOrder.html";

    // 签名方式
    private  String sign_type = "RSA2";

    // 字符编码格式
    private  String charset = "utf-8";
    // 订单超时时间，到达超时时间后自动关闭订单不能再继续支付
    private String timeout = "30m";

    // 支付宝网关； https://openapi.alipaydev.com/gateway.do
    private  String gatewayUrl = "https://openapi.alipaydev.com/gateway.do";

    public  String pay(PayVo vo) throws AlipayApiException {

        //AlipayClient alipayClient = new DefaultAlipayClient(AlipayTemplate.gatewayUrl, AlipayTemplate.app_id, AlipayTemplate.merchant_private_key, "json", AlipayTemplate.charset, AlipayTemplate.alipay_public_key, AlipayTemplate.sign_type);
        //1、根据支付宝的配置生成一个支付客户端
        AlipayClient alipayClient = new DefaultAlipayClient(gatewayUrl,
                app_id, merchant_private_key, "json",
                charset, alipay_public_key, sign_type);

        //2、创建一个支付请求 //设置请求参数
        AlipayTradePagePayRequest alipayRequest = new AlipayTradePagePayRequest();
        alipayRequest.setReturnUrl(return_url);
        alipayRequest.setNotifyUrl(notify_url);

        //商户订单号，商户网站订单系统中唯一订单号，必填
        String out_trade_no = vo.getOut_trade_no();
        //付款金额，必填
        String total_amount = vo.getTotal_amount();
        //订单名称，必填
        String subject = vo.getSubject();
        //商品描述，可空
        String body = vo.getBody();

        // timeout_express 订单支付超时时间
        alipayRequest.setBizContent("{\"out_trade_no\":\""+ out_trade_no +"\","
                + "\"total_amount\":\""+ total_amount +"\","
                + "\"subject\":\""+ subject +"\","
                + "\"body\":\""+ body +"\","
                + "\"timeout_express\":\"" + timeout + "\","
                + "\"product_code\":\"FAST_INSTANT_TRADE_PAY\"}");

        String result = alipayClient.pageExecute(alipayRequest).getBody();

        //会收到支付宝的响应，响应的是一个页面，只要浏览器显示这个页面，就会自动来到支付宝的收银台页面
        System.out.println("支付宝的响应："+result);

        return result;
    }
}
```

###### PayVo

```java
package com.atguigu.gulimall.order.vo;

import lombok.Data;

/**
 * 支付使用Vo
 */
@Data
public class PayVo {
    private String out_trade_no; // 商户订单号 必填
    private String subject; // 订单名称 必填
    private String total_amount;  // 付款金额 必填
    private String body; // 商品描述 可空
}

```

###### payAsyncVo

```java
package com.atguigu.gulimall.order.vo;

import lombok.Data;
import lombok.ToString;

import java.util.Date;

/**
 * 支付宝回调参数Vo
 */
@ToString
@Data
public class PayAsyncVo {
    private String gmt_create;
    private String charset;
    private String gmt_payment;
    private Date notify_time;
    private String subject;
    private String sign;
    private String buyer_id;//支付者的id
    private String body;//订单的信息
    private String invoice_amount;//支付金额
    private String version;
    private String notify_id;//通知id
    private String fund_bill_list;
    private String notify_type;//通知类型； trade_status_sync
    private String out_trade_no;//订单号
    private String total_amount;//支付的总额
    private String trade_status;//交易状态  TRADE_SUCCESS
    private String trade_no;//流水号
    private String auth_app_id;//
    private String receipt_amount;//商家收到的款
    private String point_amount;//
    private String app_id;//应用id
    private String buyer_pay_amount;//最终支付的金额
    private String sign_type;//签名类型
    private String seller_id;//商家的id
}
```

##### 3、编写业务跳转到支付页面

```java
/**
 * @author gcq
 * @Create 2021-01-08
 */
@Controller
public class PayWebController {

    @Autowired
    AlipayTemplate alipayTemplate;

    @Autowired
    OrderService orderService;

    /**
     * 1、跳转到支付页面
     * 2、用户支付成功后，我们要跳转到用户的订单列表页
     * produces 明确方法会返回什么类型，这里返回的是html页面
     * @param orderSn
     * @return
     * @throws AlipayApiException
     */
    @ResponseBody
    @GetMapping(value = "/payOrder",produces = "text/html")
    public String payOrder(@RequestParam("orderSn") String orderSn) throws AlipayApiException {
//        PayVo payVo = new PayVo();
//        payVo.setBody(); // 商品描述
//        payVo.setSubject(); //订单名称
//        payVo.setOut_trade_no(); // 订单号
//        payVo.setTotal_amount(); //总金额
        PayVo payvo = orderService.payOrder(orderSn);
        // 将返回支付宝的支付页面，需要将这个页面进行显示
        String pay = alipayTemplate.pay(payvo);
        System.out.println(pay);
        return pay;
    }
}
```

###### Service

```java
 /**
     * 计算商品支付需要的信息
     * @param orderSn
     * @return
     */
    @Override
    public PayVo payOrder(String orderSn) {
        PayVo payVo = new PayVo();
        OrderEntity orderEntity = this.getOrderByOrderSn(orderSn); // 根据订单号查询到商品
        // 数据库中付款金额小数有4位，但是支付宝只接受2位，所以向上取整两位数
        BigDecimal decimal = orderEntity.getPayAmount().setScale(2, BigDecimal.ROUND_UP);
        payVo.setTotal_amount(decimal.toString());
        // 商户订单号
        payVo.setOut_trade_no(orderSn);
        // 查询出订单项，用来设置商品的描述和商品名称
        List\<OrderItemEntity> itemEntities = orderItemService.list(new QueryWrapper\<OrderItemEntity>()
                .eq("order_sn", orderSn));
        OrderItemEntity itemEntity = itemEntities.get(0);
        // 订单名称使用商品项的名字
        payVo.setSubject(itemEntity.getSkuName());
        // 商品的描述使用商品项的属性
        payVo.setBody(itemEntity.getSkuAttrsVals());
        return payVo;
    }
```

最后生成页面

![image-20210108162512457](http://qnimg.gisfsde.com/work/image-20210108162512457.png)

#### 2、用户点击付款

![image-20210108162541917](http://qnimg.gisfsde.com/work/image-20210108162541917.png)

#### 3、付款成功后跳转到成功页面

\<span style="color:red">跳转的页面是根据AlipayTemplate定义的回调地址来进行跳转\</span>

- notify_url：**支付成功异步回调，返回支付成功相关的信息**
- return_url：**同步通知，支付成功后页面跳转到那里**

```java
   // 服务器[异步通知]页面路径  需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
    // 支付宝会悄悄的给我们发送一个请求，告诉我们支付成功的信息
    private  String notify_url = "http://member.gulimall.com/memberOrder.html";

// 页面跳转同步通知页面路径 需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
    //同步通知，支付成功，一般跳转到成功页
    private  String return_url = "http://member.gulimall.com/memberOrder.html";
```

> 这里跳转到的**会员服务的订单页面**，需要自己处理请求,**已在14.4.4.3节完成该功能**

![image-20210108162610017](http://qnimg.gisfsde.com/work/image-20210108162610017.png)

##### 1、支付成功后异步回调接口处理

\<span style="color:blue;font-size:18px">需要有服务器或配置了内网穿透才能接收到该方法\</span>

```java
/**
 * 支付宝成功异步回调
 * @author gcq
 * @Create 2021-01-08
 */
@RestController
public class OrderPayedListener {

    @Autowired
    AlipayTemplate alipayTemplate;

    @Autowired
    OrderService orderService;

    /**
     * 支付宝异步通知回调接口,需要拥有内网穿透或服务器
     * @param request
     * @return
     */
    @PostMapping("/payed/notify")
    public String handleAlipayed(PayAsyncVo vo, HttpServletRequest request) throws UnsupportedEncodingException, AlipayApiException {
        /**
         * 重要一步验签名
         *  防止别人通过postman给我们发送一个请求，告诉我们请求成功，为了防止这种效果通过验签
         */
        Map\<String,String> params = new HashMap\<String,String>();
        Map\<String,String[]> requestParams = request.getParameterMap();
        for (Iterator\<String> iter = requestParams.keySet().iterator(); iter.hasNext();) {
            String name = (String) iter.next();
            String[] values = (String[]) requestParams.get(name);
            String valueStr = "";
            for (int i = 0; i \< values.length; i++) {
                valueStr = (i == values.length - 1) ? valueStr + values[i]
                        : valueStr + values[i] + ",";
            }
            //乱码解决，这段代码在出现乱码时使用
            valueStr = new String(valueStr.getBytes("ISO-8859-1"), "utf-8");
            params.put(name, valueStr);
        }
        // 支付宝验签 防止恶意提交
        boolean signVerified = AlipaySignature.rsaCheckV1(params
                , alipayTemplate.getAlipay_public_key()
                , alipayTemplate.getCharset()
                , alipayTemplate.getSign_type());
        if (signVerified) {
            String result = orderService.handleAlipayed(vo);
            return result;
        } else {
            return "error";
        }
    }
}
```

Service

```java
 @Override
    public String handleAlipayed(PayAsyncVo vo) {
        // 保存交易流水信息,每个月和支付宝进行对账
        PaymentInfoEntity infoEntity = new PaymentInfoEntity();
        // 设置核心字段
        infoEntity.setOrderSn(vo.getOut_trade_no());
        infoEntity.setAlipayTradeNo(vo.getTrade_no());
        infoEntity.setPaymentStatus(vo.getTrade_status());
        infoEntity.setCallbackTime(vo.getNotify_time());
        // 保存订单流水
        paymentInfoService.save(infoEntity);
        /**
         * 支付宝交易状态说明
         *      https://opendocs.alipay.com/open/270/105902
         */
        // TRADE_FINISHED 交易结束、不可退款
        // TRADE_SUCCESS 交易支付成功
        if (vo.getTrade_status().equals("TRADE_SUCCESS") || vo.getTrade_status().equals("TRADE_FINISHED")) {
            String outTradeNo = vo.getOut_trade_no();
            // 支付宝回调成功后，更改订单的支付状态位已支付
            this.baseMapper.updateOrderStatus(outTradeNo,OrderStatusEnum.PAYED.getCode());
        }
        return "success";
    }

```



### 6、内网穿透

#### 1、简介

内网穿透功能可以允许我们使用外网的网址来访问主机
正常的外网需要访问我们项目的流程是:

1、买服务器并且有公网固定IP

2、买域名映射到服务器的IP

3、域名需要进行备案和审核

#### 2、使用场景

1、开发测试(微信、支付宝)

2、智慧互联

3、远程控制

4、私有云

#### 3、内网穿透常用的软件

1、natapp:https://natapp.cn/
2、续断: www.zhexi.tech
3、花生壳: https://www.oray.com/



# 19、秒杀

### 19.1 秒杀业务

秒杀具有瞬间高并发的特点，针对这一特点，必须要做到限流 + 异步 + 缓存（页面静态化） + **独立部署**

限流方式：

1、前端限流，一些高并发的网站直接在前端页面开始限流，列如：小米的验证码

2、nginx限流，直接负载部分请求到错误的静态页面，令牌算法、漏斗算法

3、网关限流、限流的过滤器

4、代码中使用分布式信号量

5、rabbitmq限流（能者多劳 channel.basicQos(1)）保证发挥服务器的所用性能

### 19.2 秒杀流程

参考京东秒杀流程

见秒杀流程图

完整流程图地址：https://www.processon.com/view/link/5fbda8c35653bb1d54f7077b

#### 秒杀方式一

![image-20210108164514905](http://qnimg.gisfsde.com/work/image-20210108164514905.png)

#### 秒杀方式2

![image-20210108164555957](http://qnimg.gisfsde.com/work/image-20210108164555957.png)

### 19.3 限流



### 19.4 秒杀核心业务




# 20、定时任务

### 20.1 cron表达式

语法：秒 分 时 日 月 周 年（Spring不支持）

http://www.quartz-scheduler.org/documentation/quartz-2.3.0/tutorials/crontrigger.html


特殊字符：

- `*`（ *“所有值”*）-用于选择字段中的所有值。例如，分钟字段中的“ ***** ”表示*“每分钟”*。
- `？`（ *“无特定值”*）-当您需要在允许使用字符的两个字段之一中指定某个内容而在另一个不允许的字段中指定某些内容时很有用。例如，如果我希望在某个月的某个特定日期（例如，第10天）触发触发器，但不在乎一周中的哪一天发生，则将“ 10”设置为月字段，以及“？” 在“星期几”字段中。请参阅下面的示例以进行澄清。
- `--`用于指定范围。例如，小时字段中的“ 10-12”表示*“小时10、11和12”*。
- `，` -用于指定其他值。例如，“星期几”字段中的“ MON，WED，FRI”表示*“星期一，星期三和星期五的日子”*。
- `/` -用于指定增量。例如，秒字段中的“ 0/15”表示*“秒*0、15、30*和45”*。秒字段中的“ 5/15”表示*“秒*5、20、35*和50”*。您还可以在“ **”字符**后指定“ /” **-在这种情况下，“** ”等效于在“ /”之前使用“ 0”。每月日期字段中的“ 1/3”表示*“从该月的第一天开始每三天触发一次”*。
- `L`（ *“最后一个”*）-在允许使用的两个字段中都有不同的含义。例如，“月”字段中的值“ L”表示*“*月*的最后一天”，即*非January年的1月31日，2月28日。如果单独用于星期几字段，则仅表示“ 7”或“ SAT”。但是，如果在星期几字段中使用另一个值，则表示*“该月的最后xxx天”*，例如“ 6L”表示*“该月的最后一个星期五”*。您还可以指定与该月最后一天的偏移量，例如“ L-3”，这表示日历月的倒数第三天。 *使用“ L”选项时，不要指定列表或值的范围很重要，因为这样会导致混淆/意外结果。*
- `W`（ *“工作日”*）-用于指定最接近给定日期的工作日（星期一至星期五）。例如，如果您要指定“ 15W”作为“月日”字段的值，则含义是： *“离月15日最近的工作日”*。因此，如果15号是星期六，则触发器将在14号星期五触发。如果15日是星期日，则触发器将在16日星期一触发。如果15号是星期二，那么它将在15号星期二触发。但是，如果您将“ 1W”指定为月份的值，并且第一个是星期六，则触发器将在第3个星期一触发，因为它不会“跳过”一个月日的边界。仅当月份中的某天是一天，而不是范围或天数列表时，才可以指定“ W”字符。

> “ L”和“ W”字符也可以在“月日”字段中组合以产生“ LW”，这表示*“每月的最后一个工作日” *。

- `＃` -用于指定每月的第“ XXX”天。例如，“星期几”字段中的值“ 6＃3”表示*“该月的第三个星期五”*（第6天=星期五，“＃3” =该*月的第三个星期五*）。其他示例：“ 2＃1” =该月的第一个星期一，“ 4＃5” =该月的第五个星期三。请注意，如果您指定“＃5”，并且该月的指定星期几中没有5个，则该月将不会触发。

> 法定字符以及月份和星期几的名称不区分大小写。`MON` 与`mon`相同。



### 20.2 cron 示例

阅读技巧：秒 分 时 日 月 周

![image-20201123095544841](http://qnimg.gisfsde.com/work/image-20201123095544841.png)

使用谷歌翻译后中文意思是这样的

![image-20201123095718609](http://qnimg.gisfsde.com/work/image-20201123095718609.png)

### 20.3 SpringBoot整合定时任务

定时任务相关注解:

```java
@EnableAsync // 启用Spring异步任务支持
@EnableScheduling // 启用Spring的计划任务执行功能
@Async 异步
@Scheduled(cron = "* * * * * ?")
```

代码：

```java

/**
 * @author gcq
 * @Create 2020-11-23
 *
 * 定时任务
 *      1、@EnableScheduling 开启定时任务
 *      2、Scheduled 开启一个定时任务
 *      3、自动配置类 TaskSchedulingAutoConfiguration 属性绑定在TaskExecutionProperties
 *
 * 异步任务
 *      1、@EnableAsync 开启异步任务功能
 *      2、@Async 给希望异步执行的方法上标注
 *      3、自动配置类 TaskExecutionAutoConfiguration
 *
 */
@Slf4j
@Component
@EnableAsync // 启用Spring异步任务支持
@EnableScheduling // 启用Spring的计划任务执行功能
public class HelloSchedule {

    /**
     * 1、Spring中6位组成，不允许第7位的年
     * 2、在周几的位置，1-7代表周一到周日：MON-SUN
     * 3、定时任务应该阻塞，默认是阻塞的
     *      1、可以让业务以异步的方式运行，自己提交到线程池
     *          CompletableFuture.runAsync(() -> {
     *              xxxService.hello();
     *          })
     *      2、支持定时任务线程池，设置 TaskSchedulingProperties
     *          spring.task.scheduling.pool.size=5
     *      3、让定时任务异步执行
     *          异步执行
     *     解决：使用异步 + 定时任务来完成定时任务不阻塞的功能
     */
//    @Async 异步
//    @Scheduled(cron = "* * * * * ?")
//    public void hello() {
//        log.info("hello...");
//    }
}
```

### 20.4 分布式定时任务



### 20.5定时任务的问题



### 20.6 扩展 - 分布式调整

# 21、秒杀（高并发）系统关注的问题

### 21.1 服务单一职责
秒杀服务即使自己扛不住压力，挂掉，不要影响别人
### 21.2 秒杀链接加密
防止恶意攻击模拟秒杀请求，1000次/s攻击
防止连接暴露，自己工作人员，提前秒杀商品

### 21.3 库存预热 + 快速扣减 

提前把数据加载缓存中，

### 21.4 动静分离

nginx做好动静分离，保证秒杀和商品详情页的动态请求才打到后端的服务集群

使用 CDN 网络，分担服务器压力

### 21.5 恶意请求拦截

识别非法攻击的请求并进行拦截	，网管层

### 21.6 流量错峰

使用各种手段，将流量分担到更大宽度的时间点，比如验证码，加入购物车

### 21.7 限流 & 熔断 & 降级

前端限流 + 后端限流

限制次数，限制总量，快速失败降级运行，熔断隔离防止雪崩

### 21.8 队列消峰

1万个请求，每个1000件被秒杀，双11所有秒杀成功的请求，进入队列，慢慢创建订单，扣减库存即可

