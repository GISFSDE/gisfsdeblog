---
index: 2
icon: markdown
title: RabbitMQ
category:
  - RabbitMQ
tag:
  - RabbitMQ
---
## RabbitMQ简介

> MQ全称为Message Queue，消息队列是应用程序和应用程序之间的通信方法。
>

<!--more-->

<img src="http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210720184121269.png" alt="image-20210720184121269" style="zoom:50%;" />

RabbitMQ是由erlang语言开发，基于AMQP（Advanced Message Queue 高级消息队列协议）协议实现的消息队列，它是一种应用程序之间的通信方法，消息队列在分布式系统开发中应用非常广泛。RabbitMQ官方地址：http://www.rabbitmq.com/

![image-20210720185853830](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210720185853830.png)![image-20210720185933386](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210720185933386.png)

AMQP  一个提供统一消息服务的应用层标准高级消息队列协议，是应用层协议的一个开放标准，为面向消息的中间件设计。

AMQP是一个二进制协议，拥有一些现代化特点：多信道、协商式，异步，安全，扩平台，中立，高效。

RabbitMQ是AMQP协议的Erlang的实现。

| 概念           | 说明                                                         |
| -------------- | ------------------------------------------------------------ |
| 连接Connection | 一个网络连接，比如TCP/IP套接字连接。                         |
| 会话Session    | 端点之间的命名对话。在一个会话上下文中，保证“恰好传递一次”。 |
| 信道Channel    | 多路复用连接中的一条独立的双向数据流通道。为会话提供物理传输介质。 |
| 客户端Client   | AMQP连接或者会话的发起者。AMQP是非对称的，客户端生产和消费消息，服务器存储和路由这些消息。 |
| 服务节点Broker | 消息中间件的服务节点；一般情况下可以将一个RabbitMQ Broker看作一台RabbitMQ 服务器。 |
| 端点           | AMQP对话的任意一方。一个AMQP连接包括两个端点（一个是客户端，一个是服务器）。 |
| 消费者Consumer | 一个从消息队列里请求消息的客户端程序。                       |
| 生产者Producer | 一个向交换机发布消息的客户端应用程序。                       |

## 6种工作模式：

简单模式，work模式，Publish/Subscribe发布与订阅模式，Routing路由模式，Topics主题模式，RPC远程调用模式（远程调用，不太算MQ；暂不作介绍）；

官网对应模式介绍：https://www.rabbitmq.com/getstarted.html

## 优势：

1. **应用解耦**，提升容错性和可维护性

2. **异步提速**，提升用户体验，系统吞吐量

3. **削峰填谷**，提高系统稳定性

   
   
   ![image-20210714183656364](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210714183656364.png)

## 劣势：

1. 系统可用性降低（需保证MQ高可用）

2. 系统复杂度提高（不被重复消费，保证消息顺序）

3. 数据一致性问题  



## 使用条件:

1. 生产者不需要从消费者处获得反馈

2. 容许短暂的不一致性

3. 确实用了有效果 ，好处大于复杂性等劣势

## 常见MQ产品

<img src="http://rcy276gfy.hd-bkt.clouddn.com/image-20210322181823260.png"/>

## JMS

JMS即Java消息服务（JavaMessage Service）应用程序接口，是一个Java平台中关于面向消息中间件（MOM）的API，用于在两个应用程序之间，或分布式系统中发送消息，进行异步通信。



## AMQP 与 JMS 区别

- JMS是定义了统一的接口，来对消息操作进行统一；AMQP是通过规定协议来统一数据交互的格式
- JMS限定了必须使用Java语言；AMQP只是协议，不规定实现方式，因此是跨语言的。
- JMS规定了两种消息模式；而AMQP的消息模式更加丰富

# RabbitMQ 安装配置

MQ版本选择和erlang相关

使用资料里提供的CentOS-7-x86_64-DVD-1810.iso 安装虚拟机. 

### 1. 安装依赖环境

在线安装依赖环境：

```shell
yum install build-essential openssl openssl-devel unixODBC unixODBC-devel make gcc gcc-c++ kernel-devel m4 ncurses-devel tk tc xz
```

### 2. 安装Erlang

上传  alt+p进入sftp界面

erlang-18.3-1.el7.centos.x86_64.rpm
socat-1.7.3.2-5.el7.lux.x86_64.rpm
rabbitmq-server-3.6.5-1.noarch.rpm

```sh
# 安装
rpm -ivh erlang-18.3-1.el7.centos.x86_64.rpm 
```

如果出现如下错误

![image-20210720192503168](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210720192503168.png)

说明gblic 版本太低。我们可以查看当前机器的gblic 版本

```shell
strings /lib64/libc.so.6 | grep GLIBC
```

![image-20210720192521968](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210720192521968.png)

当前最高版本2.12，需要2.15.所以需要升级glibc

- 使用yum更新安装依赖

  ```shell
  sudo yum install zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gcc make -y
  ```

- 下载rpm包

  ```shell
  wget http://copr-be.cloud.fedoraproject.org/results/mosquito/myrepo-el6/epel-6-x86_64/glibc-2.17-55.fc20/glibc-utils-2.17-55.el6.x86_64.rpm &
  wget http://copr-be.cloud.fedoraproject.org/results/mosquito/myrepo-el6/epel-6-x86_64/glibc-2.17-55.fc20/glibc-static-2.17-55.el6.x86_64.rpm &
  wget http://copr-be.cloud.fedoraproject.org/results/mosquito/myrepo-el6/epel-6-x86_64/glibc-2.17-55.fc20/glibc-2.17-55.el6.x86_64.rpm &
  wget http://copr-be.cloud.fedoraproject.org/results/mosquito/myrepo-el6/epel-6-x86_64/glibc-2.17-55.fc20/glibc-common-2.17-55.el6.x86_64.rpm &
  wget http://copr-be.cloud.fedoraproject.org/results/mosquito/myrepo-el6/epel-6-x86_64/glibc-2.17-55.fc20/glibc-devel-2.17-55.el6.x86_64.rpm &
  wget http://copr-be.cloud.fedoraproject.org/results/mosquito/myrepo-el6/epel-6-x86_64/glibc-2.17-55.fc20/glibc-headers-2.17-55.el6.x86_64.rpm &
  wget http://copr-be.cloud.fedoraproject.org/results/mosquito/myrepo-el6/epel-6-x86_64/glibc-2.17-55.fc20/nscd-2.17-55.el6.x86_64.rpm &
  ```

- 安装rpm包

  ```shell
  sudo rpm -Uvh *-2.17-55.el6.x86_64.rpm --force --nodeps
  ```

- 安装完毕后再查看glibc版本,发现glibc版本已经到2.17了

  ```shell
  strings /lib64/libc.so.6 | grep GLIBC
  ```


![image-20210720192534834](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210720192534834.png)

### 3. 安装RabbitMQ

```sh
# 安装
rpm -ivh socat-1.7.3.2-5.el7.lux.x86_64.rpm

# 安装
rpm -ivh rabbitmq-server-3.6.5-1.noarch.rpm

```

```sh
[root@softbank126011009150 rabbitmq]# ls
erlang-18.3-1.el7.centos.x86_64.rpm  rabbitmq-server-3.6.5-1.noarch.rpm  socat-1.7.3.2-1.1.el7.x86_64.rpm
[root@softbank126011009150 rabbitmq]# rpm -ivh erlang-18.3-1.el7.centos.x86_64.rpm 
准备中...                          ################################# [100%]
        软件包 erlang-18.3-1.el7.centos.x86_64 已经安装
[root@softbank126011009150 rabbitmq]# rpm -ivh  socat-1.7.3.2-1.1.el7.x86_64.rpm 
警告：socat-1.7.3.2-1.1.el7.x86_64.rpm: 头V4 RSA/SHA1 Signature, 密钥 ID 87e360b8: NOKEY
准备中...                          ################################# [100%]
        软件包 socat-1.7.3.2-1.1.el7.x86_64 已经安装
[root@softbank126011009150 rabbitmq]# rpm -ivh  rabbitmq-server-3.6.5-1.noarch.rpm 
警告：rabbitmq-server-3.6.5-1.noarch.rpm: 头V4 RSA/SHA1 Signature, 密钥 ID 6026dfca: NOKEY
准备中...                          ################################# [100%]
        软件包 rabbitmq-server-3.6.5-1.noarch 已经安装
```

### 4. 开启管界面及配置

```sh
# 开启管理界面
rabbitmq-plugins enable rabbitmq_management
# 修改默认配置信息
vim /usr/lib/rabbitmq/lib/rabbitmq_server-3.6.5/ebin/rabbit.app 
# 比如修改密码、配置等等，例如：loopback_users 中的 <<"guest">>,只保留guest
http://ip:15672 访问
```


### 5. 启动

```sh
service rabbitmq-server start # 启动服务
service rabbitmq-server stop # 停止服务
service rabbitmq-server restart # 重启服务

service iptables stop#关闭防火墙
systemctl stop firewalld #conos7关闭防火墙方法
```

- 设置配置文件

```shell
cd /usr/share/doc/rabbitmq-server-3.6.5/

cp rabbitmq.config.example /etc/rabbitmq/rabbitmq.config

```





### 6. 配置虚拟主机及用户

#### 6.1. 用户角色

RabbitMQ在安装好后，可以访问`http://ip地址:15672` ；其自带了guest/guest的用户名和密码；如果需要创建自定义用户；那么也可以登录管理界面后，如下操作：

![image-20210720192553954](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210720192553954.png)



![image-20210720192606264](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210720192606264.png)

**角色说明**：

1、 超级管理员(administrator)

可登陆管理控制台，可查看所有的信息，并且可以对用户，策略(policy)进行操作。

2、 监控者(monitoring)

可登陆管理控制台，同时可以查看rabbitmq节点的相关信息(进程数，内存使用情况，磁盘使用情况等)

3、 策略制定者(policymaker)

可登陆管理控制台, 同时可以对policy进行管理。但无法查看节点的相关信息(上图红框标识的部分)。

4、 普通管理者(management)

仅可登陆管理控制台，无法看到节点信息，也无法对策略进行管理。

5、 其他

无法登陆管理控制台，通常就是普通的生产者和消费者。

#### 6.2. Virtual Hosts配置

像mysql拥有数据库的概念并且可以指定用户对库和表等操作的权限。RabbitMQ也有类似的权限管理；在RabbitMQ中可以虚拟消息服务器Virtual Host，每个Virtual Hosts相当于一个相对独立的RabbitMQ服务器，每个VirtualHost之间是相互隔离的。exchange、queue、message不能互通。 相当于mysql的db。Virtual Name一般以/开头。



##### 6.2.1. 创建Virtual Hosts

![image-20210720192626533](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210720192626533.png)

##### 6.2.2. 设置Virtual Hosts权限

![image-20210720192636051](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210720192636051.png)



![image-20210720192726258](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210720192726258.png)

解决配置文件未找到

![image-20210720194503884](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210720194503884.png)

```sh
[root@softbank126011009150 rabbitmq]# cd /usr/share/doc/rabbitmq-server-3.6.5/
[root@softbank126011009150 rabbitmq-server-3.6.5]# ls
LICENSE                         LICENSE-APL2-Stomp-Websocket  LICENSE-EPL-OTP    LICENSE-MIT-jQuery164  LICENSE-MIT-Sammy060  LICENSE-MPL-RabbitMQ     set_rabbitmq_policy.sh.example
LICENSE-APACHE2-ExplorerCanvas  LICENSE-BSD-base64js          LICENSE-MIT-EJS10  LICENSE-MIT-Mochi      LICENSE-MIT-SockJS    rabbitmq.config.example
LICENSE-APL2-Rebar              LICENSE-BSD-glMatrix          LICENSE-MIT-Flot   LICENSE-MIT-Mochiweb   LICENSE-MPL2          README
[root@softbank126011009150 rabbitmq-server-3.6.5]# ll
总用量 200
-rw-r--r--. 1 root root 28945 8月   5 2016 LICENSE
-rw-r--r--. 1 root root 11358 8月   5 2016 LICENSE-APACHE2-ExplorerCanvas
-rw-r--r--. 1 root root 10175 8月   5 2016 LICENSE-APL2-Rebar
-rw-r--r--. 1 root root 10851 8月   5 2016 LICENSE-APL2-Stomp-Websocket
-rw-r--r--. 1 root root  1206 8月   5 2016 LICENSE-BSD-base64js
-rw-r--r--. 1 root root  1304 8月   5 2016 LICENSE-BSD-glMatrix
-rw-r--r--. 1 root root 14041 8月   5 2016 LICENSE-EPL-OTP
-rw-r--r--. 1 root root  1087 8月   5 2016 LICENSE-MIT-EJS10
-rw-r--r--. 1 root root  1069 8月   5 2016 LICENSE-MIT-Flot
-rw-r--r--. 1 root root  1075 8月   5 2016 LICENSE-MIT-jQuery164
-rw-r--r--. 1 root root  1087 3月  31 2016 LICENSE-MIT-Mochi
-rw-r--r--. 1 root root  1087 8月   5 2016 LICENSE-MIT-Mochiweb
-rw-r--r--. 1 root root  1076 8月   5 2016 LICENSE-MIT-Sammy060
-rw-r--r--. 1 root root  1056 8月   5 2016 LICENSE-MIT-SockJS
-rw-r--r--. 1 root root 16726 8月   5 2016 LICENSE-MPL2
-rw-r--r--. 1 root root 24897 8月   5 2016 LICENSE-MPL-RabbitMQ
-rw-r--r--. 1 root root 21023 4月  11 2016 rabbitmq.config.example
-rw-r--r--. 1 root root   943 3月  31 2016 README
-rw-r--r--. 1 root root   277 3月  31 2016 set_rabbitmq_policy.sh.example
[root@softbank126011009150 rabbitmq-server-3.6.5]# cp ./rabbitmq.config.example /etc/rabbitmq/rabbitmq.config
[root@softbank126011009150 rabbitmq-server-3.6.5]# service rabbitmq-server restart
Restarting rabbitmq-server (via systemctl):                [  确定  ]
```

# 工作模式

## 简单模式

![image-20210721130715892](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210721130715892.png)

### **生产者**

```java
package com.lxl.producer;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

public class Producer_HelloWord {
    public static void main(String[] args) throws IOException, TimeoutException {

        //1.创建连接工厂
        ConnectionFactory factory = new ConnectionFactory();
        //2. 设置参数
        factory.setHost("126.11.41.128");//ip  默认值 localhost
        factory.setPort(5672); //端口  默认值 5672
        factory.setVirtualHost("/lxlv");//虚拟机 默认值/
        factory.setUsername("lxl");//用户名 默认 guest
        factory.setPassword("lxl");//密码 默认值 guest
        //3. 创建连接 Connection
        Connection connection = factory.newConnection();
        //4. 创建Channel
        Channel channel = connection.createChannel();
        //5. 创建队列Queue
        /*
        queueDeclare(String queue, boolean durable, boolean exclusive, boolean autoDelete, Map<String, Object> arguments)
        参数：
            1. queue：队列名称
            2. durable:是否持久化，当mq重启之后，还在
            3. exclusive：
                * 是否独占。只能有一个消费者监听这队列
                * 当Connection关闭时，是否删除队列
                *
            4. autoDelete:是否自动删除。当没有Consumer时，自动删除掉
            5. arguments：参数。

         */
        //如果没有一个名字叫hello_world的队列，则会创建该队列，如果有则不会创建
        channel.queueDeclare("hello_world",true,false,false,null);
        /*
        basicPublish(String exchange, String routingKey, BasicProperties props, byte[] body)
        参数：
            1. exchange：交换机名称。简单模式下交换机会使用默认的 ""
            2. routingKey：路由名称
            3. props：配置信息
            4. body：发送消息数据

         */

        String body = "hello rabbitmq~~~";

        //6. 发送消息
        channel.basicPublish("","hello_world",null,body.getBytes());


        //7.释放资源
//        channel.close();
//        connection.close();
    }
}

```

<img src="http://rcy276gfy.hd-bkt.clouddn.com/image-20210324210239715.png" alt="image-20210324210239715" style="zoom:67%;" />

### **消费者**

```java
package com.lxl.consumer;

import com.rabbitmq.client.*;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

public class Consumer_HelloWorld {
    public static void main(String[] args) throws IOException, TimeoutException {

        //1.创建连接工厂
        ConnectionFactory factory = new ConnectionFactory();
        //2. 设置参数
        factory.setHost("126.11.41.128");//ip  默认值 localhost
        factory.setPort(5672); //端口  默认值 5672
        factory.setVirtualHost("/lxlv");//虚拟机 默认值/
        factory.setUsername("lxl");//用户名 默认 guest
        factory.setPassword("lxl");//密码 默认值 guest
        //3. 创建连接 Connection
        Connection connection = factory.newConnection();
        //4. 创建Channel
        Channel channel = connection.createChannel();
        //5. 创建队列Queue
        /*
        queueDeclare(String queue, boolean durable, boolean exclusive, boolean autoDelete, Map<String, Object> arguments)
        参数：
            1. queue：队列名称
            2. durable:是否持久化，当mq重启之后，还在
            3. exclusive：
                * 是否独占。只能有一个消费者监听这队列
                * 当Connection关闭时，是否删除队列
                *
            4. autoDelete:是否自动删除。当没有Consumer时，自动删除掉
            5. arguments：参数。

         */
        //如果没有一个名字叫hello_world的队列，则会创建该队列，如果有则不会创建
        channel.queueDeclare("hello_world",true,false,false,null);

        /*
        basicConsume(String queue, boolean autoAck, Consumer callback)
        参数：
            1. queue：队列名称
            2. autoAck：是否自动确认
            3. callback：回调对象

         */
        // 接收消息
        Consumer consumer = new DefaultConsumer(channel){
            /*
                回调方法，当收到消息后，会自动执行该方法

                1. consumerTag：标识
                2. envelope：获取一些信息，交换机，路由key...
                3. properties:配置信息
                4. body：数据

             */
            @Override
            public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body) throws IOException {
                System.out.println("consumerTag："+consumerTag);
                System.out.println("Exchange："+envelope.getExchange());
                System.out.println("RoutingKey："+envelope.getRoutingKey());
                System.out.println("properties："+properties);
                System.out.println("body："+new String(body));
            }
        };
        channel.basicConsume("hello_world",true,consumer);


        //关闭资源？不要

    }
}

```

### RabbitMQ运转流程

在入门案例中：

- 生产者发送消息
  1. 生产者创建连接（Connection），开启一个信道（Channel），连接到RabbitMQ Broker；
  2. 声明队列并设置属性；是否排它，是否持久化，是否自动删除；
  3. 将路由键（空字符串）与队列绑定起来；
  4. 发送消息至RabbitMQ Broker；
  5. 关闭信道；
  6. 关闭连接；
- 消费者接收消息
  1. 消费者创建连接（Connection），开启一个信道（Channel），连接到RabbitMQ Broker
  2. 向Broker 请求消费相应队列中的消息，设置相应的回调函数；
  3. 等待Broker回应闭关投递响应队列中的消息，消费者接收消息；
  4. 确认（ack，自动确认）接收到的消息；
  5. RabbitMQ从队列中删除相应已经被确认的消息；
  6. 关闭信道；
  7. 关闭连接；

![image-20210721131920951](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210721131920951.png)



### 生产者流转过程说明

1. 客户端与代理服务器Broker建立连接。会调用newConnection() 方法,这个方法会进一步封装Protocol Header 0-9-1 的报文头发送给Broker ，以此通知Broker 本次交互采用的是AMQPO-9-1 协议，紧接着Broker 返回Connection.Start 来建立连接，在连接的过程中涉及Connection.Start/.Start-OK 、Connection.Tune/.Tune-Ok ，Connection.Open/ .Open-Ok 这6 个命令的交互。
2. 客户端调用connection.createChannel方法。此方法开启信道，其包装的channel.open命令发送给Broker,等待channel.basicPublish方法，对应的AMQP命令为Basic.Publish,这个命令包含了content Header 和content Body()。content Header 包含了消息体的属性，例如:投递模式，优先级等，content Body 包含了消息体本身。
3. 客户端发送完消息需要关闭资源时，涉及到Channel.Close和Channl.Close-Ok 与Connetion.Close和Connection.Close-Ok的命令交互。

![image-20210721131951019](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210721131951019.png)

### 消费者流转过程说明

1. 消费者客户端与代理服务器Broker建立连接。会调用newConnection() 方法,这个方法会进一步封装Protocol Header 0-9-1 的报文头发送给Broker ，以此通知Broker 本次交互采用的是AMQPO-9-1 协议，紧接着Broker 返回Connection.Start 来建立连接，在连接的过程中涉及Connection.Start/.Start-OK 、Connection.Tune/.Tune-Ok ，Connection.Open/ .Open-Ok 这6 个命令的交互。
2. 消费者客户端调用connection.createChannel方法。和生产者客户端一样，协议涉及Channel . Open/Open-Ok命令。
3. 在真正消费之前，消费者客户端需要向Broker 发送Basic.Consume 命令(即调用channel.basicConsume 方法〉将Channel 置为接收模式，之后Broker 回执Basic . Consume - Ok 以告诉消费者客户端准备好消费消息。
4. Broker 向消费者客户端推送(Push) 消息，即Basic.Deliver 命令，这个命令和Basic.Publish 命令一样会携带Content Header 和Content Body。
5. 消费者接收到消息并正确消费之后，向Broker 发送确认，即Basic.Ack 命令。
6. 客户端发送完消息需要关闭资源时，涉及到Channel.Close和Channl.Close-Ok 与Connetion.Close和Connection.Close-Ok的命令交互。

![image-20210721132711379](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210721132711379.png)

## 工作队列模式

模式说明（只有一盒糖你们几个抢）

![image-20210721132742431](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210721132742431.png)

`Work Queues`与入门程序的`简单模式`相比，多了一个或一些消费端，多个消费端共同消费同一个队列中的消息。

**应用场景**：对于 任务过重或任务较多情况使用工作队列可以提高任务处理的速度。

代码

`Work Queues`与入门程序的`简单模式`的代码是几乎一样的；可以完全复制，并复制多一个消费者进行多个消费者同时消费消息的测试。

#### 生产者

```java
package com.itheima.rabbitmq.work;

import com.itheima.rabbitmq.util.ConnectionUtil;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

public class Producer {

    static final String QUEUE_NAME = "work_queue";

    public static void main(String[] args) throws Exception {

        //创建连接
        Connection connection = ConnectionUtil.getConnection();

        // 创建频道
        Channel channel = connection.createChannel();

        // 声明（创建）队列
        /**
         * 参数1：队列名称
         * 参数2：是否定义持久化队列
         * 参数3：是否独占本次连接
         * 参数4：是否在不使用的时候自动删除队列
         * 参数5：队列其它参数
         */
        channel.queueDeclare(QUEUE_NAME, true, false, false, null);

        for (int i = 1; i <= 30; i++) {
            // 发送信息
            String message = "你好；小兔子！work模式--" + i;
            /**
             * 参数1：交换机名称，如果没有指定则使用默认Default Exchage
             * 参数2：路由key,简单模式可以传递队列名称
             * 参数3：消息其它属性
             * 参数4：消息内容
             */
            channel.basicPublish("", QUEUE_NAME, null, message.getBytes());
            System.out.println("已发送消息：" + message);
        }

        // 关闭资源
        channel.close();
        connection.close();
    }
}

```

#### 消费者1

```java
package com.itheima.rabbitmq.work;

import com.itheima.rabbitmq.util.ConnectionUtil;
import com.rabbitmq.client.*;

import java.io.IOException;

public class Consumer1 {

    public static void main(String[] args) throws Exception {
        Connection connection = ConnectionUtil.getConnection();

        // 创建频道
        Channel channel = connection.createChannel();

        // 声明（创建）队列
        /**
         * 参数1：队列名称
         * 参数2：是否定义持久化队列
         * 参数3：是否独占本次连接
         * 参数4：是否在不使用的时候自动删除队列
         * 参数5：队列其它参数
         */
        channel.queueDeclare(Producer.QUEUE_NAME, true, false, false, null);

        //一次只能接收并处理一个消息
        channel.basicQos(1);

        //创建消费者；并设置消息处理
        DefaultConsumer consumer = new DefaultConsumer(channel){
            @Override
            /**
             * consumerTag 消息者标签，在channel.basicConsume时候可以指定
             * envelope 消息包的内容，可从中获取消息id，消息routingkey，交换机，消息和重传标志(收到消息失败后是否需要重新发送)
             * properties 属性信息
             * body 消息
             */
            public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body) throws IOException {
                try {
                    //路由key
                    System.out.println("路由key为：" + envelope.getRoutingKey());
                    //交换机
                    System.out.println("交换机为：" + envelope.getExchange());
                    //消息id
                    System.out.println("消息id为：" + envelope.getDeliveryTag());
                    //收到的消息
                    System.out.println("消费者1-接收到的消息为：" + new String(body, "utf-8"));
                    Thread.sleep(1000);

                    //确认消息
                    channel.basicAck(envelope.getDeliveryTag(), false);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        };
        //监听消息
        /**
         * 参数1：队列名称
         * 参数2：是否自动确认，设置为true为表示消息接收到自动向mq回复接收到了，mq接收到回复会删除消息，设置为false则需要手动确认
         * 参数3：消息接收到后回调
         */
        channel.basicConsume(Producer.QUEUE_NAME, false, consumer);
    }
}
```

#### 消费者2

```java
package com.itheima.rabbitmq.work;

import com.itheima.rabbitmq.util.ConnectionUtil;
import com.rabbitmq.client.*;

import java.io.IOException;

public class Consumer2 {

    public static void main(String[] args) throws Exception {
        Connection connection = ConnectionUtil.getConnection();

        // 创建频道
        Channel channel = connection.createChannel();

        // 声明（创建）队列
        /**
         * 参数1：队列名称
         * 参数2：是否定义持久化队列
         * 参数3：是否独占本次连接
         * 参数4：是否在不使用的时候自动删除队列
         * 参数5：队列其它参数
         */
        channel.queueDeclare(Producer.QUEUE_NAME, true, false, false, null);

        //一次只能接收并处理一个消息
        channel.basicQos(1);

        //创建消费者；并设置消息处理
        DefaultConsumer consumer = new DefaultConsumer(channel){
            @Override
            /**
             * consumerTag 消息者标签，在channel.basicConsume时候可以指定
             * envelope 消息包的内容，可从中获取消息id，消息routingkey，交换机，消息和重传标志(收到消息失败后是否需要重新发送)
             * properties 属性信息
             * body 消息
             */
            public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body) throws IOException {
                try {
                    //路由key
                    System.out.println("路由key为：" + envelope.getRoutingKey());
                    //交换机
                    System.out.println("交换机为：" + envelope.getExchange());
                    //消息id
                    System.out.println("消息id为：" + envelope.getDeliveryTag());
                    //收到的消息
                    System.out.println("消费者2-接收到的消息为：" + new String(body, "utf-8"));
                    Thread.sleep(1000);

                    //确认消息
                    channel.basicAck(envelope.getDeliveryTag(), false);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        };
        //监听消息
        /**
         * 参数1：队列名称
         * 参数2：是否自动确认，设置为true为表示消息接收到自动向mq回复接收到了，mq接收到回复会删除消息，设置为false则需要手动确认
         * 参数3：消息接收到后回调
         */
        channel.basicConsume(Producer.QUEUE_NAME, false, consumer);
    }
}

```



测试

启动两个消费者，然后再启动生产者发送消息；到IDEA的两个消费者对应的控制台查看是否竞争性的接收到消息。

![image-20210721133929641](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210721133929641.png)

![image-20210721133940583](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210721133940583.png)

小结

在一个队列中如果有多个消费者，那么消费者之间对于同一个消息的关系是**竞争**的关系。

## Publish/Subscribe发布与订阅模式

**模式说明（给喜欢的人一样的糖）**【FANOUT】



![image-20210721133556547](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210721133556547.png)

在订阅模型中，多了一个 Exchange 角色，而且过程略有变化：

P：生产者，也就是要发送消息的程序，但是不再发送到队列中，而是发给X（交换机）

```
//1.创建连接工厂
//2. 设置参数
//3. 创建连接 Connection
//4. 创建Channel
//5. 创建交换机
//6. 创建队列
//7. 绑定队列和交换机
//8. 发送消息
//9. 释放资源
```

C：消费者，消息的接收者，会一直等待消息到来

Queue：消息队列，接收消息、缓存消息

Exchange：交换机（X）。一方面，接收生产者发送的消息。另一方面，知道如何处理消息，例如递交给某个特别队列、递交给所有队列、或是将消息丢弃。到底如何操作，取决于Exchange的类型。Exchange有常见以下3种类型：

Fanout：广播，将消息交给所有绑定到交换机的队列

Direct：定向，把消息交给符合指定routing key 的队列

Topic：通配符，把消息交给符合routing pattern（路由模式） 的队列

**Exchange**（交换机）只负责转发消息，不具备存储消息的能力，因此如果没有任何队列与 Exchange 绑定，或者没有符合路由规则的队列，那么消息会丢失！

## Routing路由工作模式

**模式说明：给更爱的人更甜的糖**【DIRECT】

队列与交换机的绑定，不能是任意绑定了，而是要指定一个 RoutingKey（路由key）

l消息的发送方在向 Exchange 发送消息时，也必须指定消息的 RoutingKey

lExchange 不再把消息交给每一个绑定的队列，而是根据消息的 Routing Key 进行判断，只有队列的Routingkey 与消息的 Routing key 完全一致，才会接收到消息

![image-20210401192132396](http://rcy276gfy.hd-bkt.clouddn.com/image-20210401192132396.png)

lP：生产者，向 Exchange 发送消息，发送消息时，会指定一个routing key
lX：Exchange（交换机），接收生产者的消息，然后把消息递交给与 routing key 完全匹配的队列
lC1：消费者，其所在队列指定了需要 routing key 为 error 的消息
lC2：消费者，其所在队列指定了需要 routing key 为 info、error、warning 的消息
**Routing** 模式要求队列在绑定交换机时要指定 **routing key**，消息会转发到符合 routing key 的队列

## Topics通配符工作模式

**模式说明：给姓李的人类棉花糖，姓梁的人类鸡屎麻糖**【TOPIC】

`Topic`类型与`Direct`相比，都是可以根据`RoutingKey`把消息路由到不同的队列。只不过`Topic`类型`Exchange`可以让队列在绑定`Routing key` 的时候**使用通配符**！

`Routingkey` 一般都是有一个或多个单词组成，多个单词之间以”.”分割，例如： `item.insert`

 通配符规则：

`#`：匹配一个或多个词

`*`：匹配不多不少恰好1个词

举例：

`item.#`：能够匹配`item.insert.abc` 或者 `item.insert`

`item.*`：只能匹配`item.insert`

![image-20210721141208986](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210721141208986.png)

![image-20210721141238548](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210721141238548.png)

图解：

- 红色Queue：绑定的是`usa.#` ，因此凡是以 `usa.`开头的`routing key` 都会被匹配到
- 黄色Queue：绑定的是`#.news` ，因此凡是以 `.news`结尾的 `routing key` 都会被匹配



# Spring-RabbitMQ

详情见代码

# SpringBoot-RabbitMQ

<img src="http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210721183903514.png" alt="image-20210721183903514" style="zoom: 67%;" />

<img src="http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210721183929668.png" alt="image-20210721183929668" style="zoom:67%;" />

# RabbitMQ高级特性

> 发、收、限、时、达、

## 1.1消息可靠投递

**【寄的糖你收到了吗】**

confirm确认模式       【消息从 ==producer== 到 **exchange** **无论如何**会返回一个confirmCallback】

return退回模式			【消息从producer到 **queue** **失败**则会返回一个returnCallback】

 rabbitmq整各消息投递的路径为：

profucer-----》rabbitmq broker----》exchange-----》queue----》consumer

设置ConnectionFactory的publisher-confirm="true" 开启确认模式

使用rabbitTemplate.setConfirmCallback设置回调函数。当消息发送到exchange后回调confirm方法。在方法中判断true，则发送成功，反之失败，需要处理

设置ConnectionFactory的publisher-returns="true" 开启退回模式

使用rabbitTemplate.setReturnCallback设置回调函数。当消息从exchange路由到queue失败后，如果设置了rabbitTemplate.setMandatory(true)参数，则会将消息退回给producer。并执行回调函数returnedMessage。

在RabbitMQ中也提供了事物机制，但是性能较差。

## 1.2Consumer ACK

**【收到糖给你怎么回复】**

ack指acknowledge，确认。表示**消费端收到消息后的确认方式**

三种确认方式：

​	自动确认：acknowledge="none"【业务出问题也会回复收到】

​	手动确认：acknowledge="manual"【等业务处理没问题后回复收到，有问题可处理】

​	根据异常情况确认：acknowledge="auto"

​	自动确认消息被consumer接收到，则自动确认，并将响应message从缓存中移除，实际业务中小细节受到，业务出现异常，那么消息会丢失，如果是设置的手动确认方式，则需要业务处理成功后，调用**channel.basicAck(),手动签收**，如果出现异常，则调用**channel.basicNack（）方法，让其自动重发消息**。

```java
*  1. 设置手动签收。acknowledge="manual"
*  2. 让监听器类实现ChannelAwareMessageListener接口
*  3. 如果消息成功处理，则调用channel的 basicAck()签收
*  4. 如果消息处理失败，则调用channel的basicNack()拒绝签收，broker重新发送给consumer
```

## 1.3消费端限流qos

**【我每次只收1000颗糖】**

```java
1. 确保ack机制为手动确认。
2. listener-container配置属性 perfetch = 1,表示消费端每次从mq拉去一条消息来消费，直到手动确认消费完毕后，才会继续拉去下一条消息。
 
    <rabbit:listener-container connection-factory="connectionFactory" acknowledge="manual" prefetch="1" >
```

<img src="http://rcy276gfy.hd-bkt.clouddn.com/image-20210414191501891.png" alt="image-20210414191501891" style="zoom: 50%;" />

## 1.4TTL

**【糖放快递站十年就不能吃了】**

<img src="http://rcy276gfy.hd-bkt.clouddn.com/image-20210414191545297.png" alt="image-20210414191545297" style="zoom:50%;" />

```
* TTL:过期时间
*  1. 队列统一过期
*  2. 消息单独过期
*
* 如果设置了消息的过期时间，也设置了队列的过期时间，它以时间短的为准。
* 队列过期后，会将队列所有消息全部移除。
* 消息过期后，只有消息在队列顶端，才会判断其是否过期(移除掉)
```



## 1.5死信队列

**【不好吃的糖都给其他人吧】**

死信队列（**DXL**）。Dead Letter Exchange（死信队列交换机），当消息成为Dead Message后，可以被重新发送到另外一个交换机，这个交换机就是DEX。死信队列和死信交换机和普通的没有区别。

<img src="http://rcy276gfy.hd-bkt.clouddn.com/image-20210415191209915.png" alt="image-20210415191209915" style="zoom:67%;" />

**问题：**

### 1.消息什么时候成为死信?

**消息成为死信的三种情况：**

1.队列消息的长度达到限制

2.消费者拒收消费消息，basicNack/basicReject，并且不把消息重新放入原目标队列，requeue=false

3.原队列存在消息过期设置，消息达超时间未被消费；

### 2.队列如何与DEX绑定？

<img src="http://rcy276gfy.hd-bkt.clouddn.com/image-20210415191701024.png" alt="image-20210415191701024" style="zoom:67%;" />

## 1.6延迟队列

**【我妈叫我三十分钟后才能吃这颗糖】**

消息进入队列后不会被立即被消费，只有达到指定时间后，才会被消费。

需求：

​		1.下单后三十分钟未支付，取消订单，回滚库存

​		2.新用户注册7天后，发送短信问候

实现方式

​		1.定时器（有延迟，对数据库有影响）

​		2.延迟队列（MQ中未直接提供延迟队列，**DLX+TTL实现**）

 <img src="http://rcy276gfy.hd-bkt.clouddn.com/image-20210416185944853.png" alt="image-20210416185944853" style="zoom:67%;" />

## 1.7日志与监控

RabbitMQ默认日志存放路径： /var/log/rabbitmq/rabbit@xxx.log

日志包含了RabbitMQ的版本号、Erlang的版本号、RabbitMQ服务节点名称、cookie的hash值、RabbitMQ配置文件地址、内存限制、磁盘限制、默认账户guest的创建以及权限配置等等。

```
查看队列
# rabbitmqctl list_queues
查看exchanges
# rabbitmqctl list_exchanges
查看用户
# rabbitmqctl list_users
查看连接
# rabbitmqctl list_connections
查看消费者信息
# rabbitmqctl list_consumers
查看环境变量
# rabbitmqctl environment
查看未被确认的队列
# rabbitmqctl list_queues  name messages_unacknowledged
查看单个队列的内存使用
# rabbitmqctl list_queues name memory
查看准备就绪的队列
# rabbitmqctl list_queues name messages_ready
```

## 1.8 消息追踪

在使用任何消息中间件的过程中，难免会出现某条消息异常丢失的情况。对于RabbitMQ而言，可能是因为生产者或消费者与RabbitMQ断开了连接，而它们与RabbitMQ又采用了不同的确认机制；也有可能是因为交换器与队列之间不同的转发策略；甚至是交换器并没有与任何队列进行绑定，生产者又不感知或者没有采取相应的措施；另外RabbitMQ本身的集群策略也可能导致消息的丢失。这个时候就需要有一个较好的机制跟踪记录消息的投递过程，以此协助开发和运维人员进行问题的定位。

在RabbitMQ中可以使用Firehose和rabbitmq_tracing插件功能来实现消息追踪。

**Firehose**

firehose的机制是将生产者投递给rabbitmq的消息，rabbitmq投递给消费者的消息按照指定的格式发送到默认的exchange上。这个默认的exchange的名称为amq.rabbitmq.trace，它是一个topic类型的exchange。发送到这个exchange上的消息的routing key为 publish.exchangename 和 deliver.queuename。其中exchangename和queuename为实际exchange和queue的名称，分别对应生产者投递到exchange的消息，和消费者从queue上获取的消息。

注意：打开 trace 会影响消息写入功能，适当打开后请关闭。

rabbitmqctl trace_on：开启Firehose命令

rabbitmqctl trace_off：关闭Firehose命令

**rabbitmq_tracing**

rabbitmq_tracing和Firehose在实现上如出一辙，只不过rabbitmq_tracing的方式比Firehose多了一层GUI的包装，更容易使用和管理。

启用插件：rabbitmq-plugins enable rabbitmq_tracing

# 应用问题

## 1.消息可靠性保障------**消息补偿**

![image-20210722141737848](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210722141737848.png)

## 2.消息幂等性保障-----**乐观锁机制**

幂等性指一次和多次请求某一个资源，对于资源本身应该具有同样的结果。也就是说，其任意多次执行对资源本身所产生的影响均与一次执行的影响相同。

在MQ中指，消费多条相同的消息，得到与消费该消息一次相同的结果。

![image-20210722141922740](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210722141922740.png)

## 3.RabbitMQ集群搭建

摘要：实际生产应用中都会采用消息队列的集群方案，如果选择RabbitMQ那么有必要了解下它的集群方案原理

一般来说，如果只是为了学习RabbitMQ或者验证业务工程的正确性那么在本地环境或者测试环境上使用其单实例部署就可以了，但是出于MQ中间件本身的可靠性、并发性、吞吐量和消息堆积能力等问题的考虑，在生产环境上一般都会考虑使用RabbitMQ的集群方案。

### 3.1 集群方案的原理

RabbitMQ这款消息队列中间件产品本身是基于Erlang编写，Erlang语言天生具备分布式特性（通过同步Erlang集群各节点的magic cookie来实现）。因此，RabbitMQ天然支持Clustering。这使得RabbitMQ本身不需要像ActiveMQ、Kafka那样通过ZooKeeper分别来实现HA方案和保存集群的元数据。集群是保证可靠性的一种方式，同时可以通过水平扩展以达到增加消息吞吐量能力的目的。

![image-20210722142109143](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210722142109143.png)

### 3.2 单机多实例部署

由于某些因素的限制，有时候你不得不在一台机器上去搭建一个rabbitmq集群，这个有点类似zookeeper的单机版。真实生成环境还是要配成多机集群的。有关怎么配置多机集群的可以参考其他的资料，这里主要论述如何在单机中配置多个rabbitmq实例。

主要参考官方文档：https://www.rabbitmq.com/clustering.html

首先确保RabbitMQ运行没有问题

```
[root@super ~]# rabbitmqctl status
Status of node rabbit@super ...
[{pid,10232},
 {running_applications,
     [{rabbitmq_management,"RabbitMQ Management Console","3.6.5"},
      {rabbitmq_web_dispatch,"RabbitMQ Web Dispatcher","3.6.5"},
      {webmachine,"webmachine","1.10.3"},
      {mochiweb,"MochiMedia Web Server","2.13.1"},
      {rabbitmq_management_agent,"RabbitMQ Management Agent","3.6.5"},
      {rabbit,"RabbitMQ","3.6.5"},
      {os_mon,"CPO  CXC 138 46","2.4"},
      {syntax_tools,"Syntax tools","1.7"},
      {inets,"INETS  CXC 138 49","6.2"},
      {amqp_client,"RabbitMQ AMQP Client","3.6.5"},
      {rabbit_common,[],"3.6.5"},
      {ssl,"Erlang/OTP SSL application","7.3"},
      {public_key,"Public key infrastructure","1.1.1"},
      {asn1,"The Erlang ASN1 compiler version 4.0.2","4.0.2"},
      {ranch,"Socket acceptor pool for TCP protocols.","1.2.1"},
      {mnesia,"MNESIA  CXC 138 12","4.13.3"},
      {compiler,"ERTS  CXC 138 10","6.0.3"},
      {crypto,"CRYPTO","3.6.3"},
      {xmerl,"XML parser","1.3.10"},
      {sasl,"SASL  CXC 138 11","2.7"},
      {stdlib,"ERTS  CXC 138 10","2.8"},
      {kernel,"ERTS  CXC 138 10","4.2"}]},
 {os,{unix,linux}},
 {erlang_version,
     "Erlang/OTP 18 [erts-7.3] [source] [64-bit] [async-threads:64] [hipe] [kernel-poll:true]\n"},
 {memory,
     [{total,56066752},
      {connection_readers,0},
      {connection_writers,0},
      {connection_channels,0},
      {connection_other,2680},
      {queue_procs,268248},
      {queue_slave_procs,0},
      {plugins,1131936},
      {other_proc,18144280},
      {mnesia,125304},
      {mgmt_db,921312},
      {msg_index,69440},
      {other_ets,1413664},
      {binary,755736},
      {code,27824046},
      {atom,1000601},
      {other_system,4409505}]},
 {alarms,[]},
 {listeners,[{clustering,25672,"::"},{amqp,5672,"::"}]},
 {vm_memory_high_watermark,0.4},
 {vm_memory_limit,411294105},
 {disk_free_limit,50000000},
 {disk_free,13270233088},
 {file_descriptors,
     [{total_limit,924},{total_used,6},{sockets_limit,829},{sockets_used,0}]},
 {processes,[{limit,1048576},{used,262}]},
 {run_queue,0},
 {uptime,43651},
 {kernel,{net_ticktime,60}}]
```

停止rabbitmq服务

```
[root@super sbin]# service rabbitmq-server stop
Stopping rabbitmq-server: rabbitmq-server.

```



启动第一个节点：

```
[root@super sbin]# RABBITMQ_NODE_PORT=5673 RABBITMQ_NODENAME=rabbit1 rabbitmq-server start

              RabbitMQ 3.6.5. Copyright (C) 2007-2016 Pivotal Software, Inc.
  ##  ##      Licensed under the MPL.  See http://www.rabbitmq.com/
  ##  ##
  ##########  Logs: /var/log/rabbitmq/rabbit1.log
  ######  ##        /var/log/rabbitmq/rabbit1-sasl.log
  ##########
              Starting broker...
 completed with 6 plugins.
```

启动第二个节点：

> web管理插件端口占用,所以还要指定其web插件占用的端口号。

```
[root@super ~]# RABBITMQ_NODE_PORT=5674 RABBITMQ_SERVER_START_ARGS="-rabbitmq_management listener [{port,15674}]" RABBITMQ_NODENAME=rabbit2 rabbitmq-server start

              RabbitMQ 3.6.5. Copyright (C) 2007-2016 Pivotal Software, Inc.
  ##  ##      Licensed under the MPL.  See http://www.rabbitmq.com/
  ##  ##
  ##########  Logs: /var/log/rabbitmq/rabbit2.log
  ######  ##        /var/log/rabbitmq/rabbit2-sasl.log
  ##########
              Starting broker...
 completed with 6 plugins.

```

结束命令：

```
rabbitmqctl -n rabbit1 stop
rabbitmqctl -n rabbit2 stop
```



rabbit1操作作为主节点：

```
[root@super ~]# rabbitmqctl -n rabbit1 stop_app  
Stopping node rabbit1@super ...
[root@super ~]# rabbitmqctl -n rabbit1 reset     
Resetting node rabbit1@super ...
[root@super ~]# rabbitmqctl -n rabbit1 start_app
Starting node rabbit1@super ...
[root@super ~]# 
```

rabbit2操作为从节点：

```
[root@super ~]# rabbitmqctl -n rabbit2 stop_app
Stopping node rabbit2@super ...
[root@super ~]# rabbitmqctl -n rabbit2 reset
Resetting node rabbit2@super ...
[root@super ~]# rabbitmqctl -n rabbit2 join_cluster rabbit1@'super' ###''内是主机名换成自己的
Clustering node rabbit2@super with rabbit1@super ...
[root@super ~]# rabbitmqctl -n rabbit2 start_app
Starting node rabbit2@super ...

```

查看集群状态：

```
[root@super ~]# rabbitmqctl cluster_status -n rabbit1
Cluster status of node rabbit1@super ...
[{nodes,[{disc,[rabbit1@super,rabbit2@super]}]},
 {running_nodes,[rabbit2@super,rabbit1@super]},
 {cluster_name,<<"rabbit1@super">>},
 {partitions,[]},
 {alarms,[{rabbit2@super,[]},{rabbit1@super,[]}]}]
```

web监控：

![image-20210722142125178](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210722142125178.png)





### 3.3 集群管理

**rabbitmqctl join_cluster {cluster_node} [–ram]** 将节点加入指定集群中。在这个命令执行前需要停止RabbitMQ应用并重置节点。

**rabbitmqctl cluster_status** 显示集群的状态。

**rabbitmqctl change_cluster_node_type {disc|ram}** 修改集群节点的类型。在这个命令执行前需要停止RabbitMQ应用。

**rabbitmqctl forget_cluster_node [–offline]** 将节点从集群中删除，允许离线执行。

**rabbitmqctl update_cluster_nodes {clusternode}**

在集群中的节点应用启动前咨询clusternode节点的最新信息，并更新相应的集群信息。这个和join_cluster不同，它不加入集群。考虑这样一种情况，节点A和节点B都在集群中，当节点A离线了，节点C又和节点B组成了一个集群，然后节点B又离开了集群，当A醒来的时候，它会尝试联系节点B，但是这样会失败，因为节点B已经不在集群中了。

**rabbitmqctl cancel_sync_queue [-p vhost] {queue}** 取消队列queue同步镜像的操作。

**rabbitmqctl set_cluster_name {name}** 设置集群名称。集群名称在客户端连接时会通报给客户端。Federation和Shovel插件也会有用到集群名称的地方。集群名称默认是集群中第一个节点的名称，通过这个命令可以重新设置。

### 3.4 RabbitMQ镜像集群配置

> 上面已经完成RabbitMQ默认集群模式，但并不保证队列的高可用性，尽管交换机、绑定这些可以复制到集群里的任何一个节点，但是队列内容不会复制。虽然该模式解决一项目组节点压力，但队列节点宕机直接导致该队列无法应用，只能等待重启，所以要想在队列节点宕机或故障也能正常应用，就要复制队列内容到集群里的每个节点，必须要创建镜像队列。
>
> 镜像队列是基于普通的集群模式的，然后再添加一些策略，所以你还是得先配置普通集群，然后才能设置镜像队列，我们就以上面的集群接着做。

**设置的镜像队列可以通过开启的网页的管理端Admin->Policies，也可以通过命令。**

> rabbitmqctl set_policy my_ha "^" '{"ha-mode":"all"}'

![image-20210722142138661](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210722142138661.png)

> - Name:策略名称
> - Pattern：匹配的规则，如果是匹配所有的队列，是^.
> - Definition:使用ha-mode模式中的all，也就是同步所有匹配的队列。问号链接帮助文档。

### 3.5 负载均衡-HAProxy

HAProxy提供高可用性、负载均衡以及基于TCP和HTTP应用的代理，支持虚拟主机，它是免费、快速并且可靠的一种解决方案,包括Twitter，Reddit，StackOverflow，GitHub在内的多家知名互联网公司在使用。HAProxy实现了一种事件驱动、单一进程模型，此模型支持非常大的并发连接数。

##### 3.5.1  安装HAProxy

```
//下载依赖包
yum install gcc vim wget
//上传haproxy源码包
//解压
tar -zxvf haproxy-1.6.5.tar.gz -C /usr/local
//进入目录、进行编译、安装
cd /usr/local/haproxy-1.6.5
make TARGET=linux31 PREFIX=/usr/local/haproxy
make install PREFIX=/usr/local/haproxy
mkdir /etc/haproxy
//赋权
groupadd -r -g 149 haproxy
useradd -g haproxy -r -s /sbin/nologin -u 149 haproxy
//创建haproxy配置文件
mkdir /etc/haproxy
vim /etc/haproxy/haproxy.cfg
```



##### 3.5.2 配置HAProxy

配置文件路径：/etc/haproxy/haproxy.cfg

```
#logging options
global
	log 127.0.0.1 local0 info
	maxconn 5120
	chroot /usr/local/haproxy
	uid 99
	gid 99
	daemon
	quiet
	nbproc 20
	pidfile /var/run/haproxy.pid

defaults
	log global
	
	mode tcp

	option tcplog
	option dontlognull
	retries 3
	option redispatch
	maxconn 2000
	contimeout 5s
   
     clitimeout 60s

     srvtimeout 15s	
#front-end IP for consumers and producters

listen rabbitmq_cluster
	bind 0.0.0.0:5672
	
	mode tcp
	#balance url_param userid
	#balance url_param session_id check_post 64
	#balance hdr(User-Agent)
	#balance hdr(host)
	#balance hdr(Host) use_domain_only
	#balance rdp-cookie
	#balance leastconn
	#balance source //ip
	
	balance roundrobin
	
        server node1 127.0.0.1:5673 check inter 5000 rise 2 fall 2
        server node2 127.0.0.1:5674 check inter 5000 rise 2 fall 2

listen stats
	bind 172.16.98.133:8100
	mode http
	option httplog
	stats enable
	stats uri /rabbitmq-stats
	stats refresh 5s
```

启动HAproxy负载

```
/usr/local/haproxy/sbin/haproxy -f /etc/haproxy/haproxy.cfg
//查看haproxy进程状态
ps -ef | grep haproxy

访问如下地址对mq节点进行监控
http://172.16.98.133:8100/rabbitmq-stats
```

代码中访问mq集群地址，则变为访问haproxy地址:5672





> **参考文献**：黑马视频相关笔记

