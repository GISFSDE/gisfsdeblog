---
index: 2
icon: markdown
title: Redis
date: 2022-06-06
category:
  - Redis
tag:
  - Redis
---

> ### 简介
>
> Redis（Remote Dictionary Server）远程字典服务
>
> - 免费**开源**的，C语言编写，提供多种语言使用，支持网络，可持久化，遵守 BSD 协议，是一个高性能的 key-value 数据库。
>
> Redis 与其他 key - value 缓存产品有以下三个**特点**：
>
> Redis支持**数据的持久化**，可以将内存中的数据保存在磁盘中，重启的时候可以再次加载进行使用。
> Redis不仅仅支持简单的key-value类型的数据，同时还提供list，set，zset，hash等数据结构的存储。
> Redis支持**数据的备份**，即master-slave模式的数据备份。

<!--more-->

# 综合问题

## Redis多线程还是单线程？为什么这样？

​		单线程，Redis 6.0版本之后开始引入了多线程处理网络请求，将读取网络数据到输入缓冲区、协议解析和将执行结果写入输出缓冲区的过程变为了多线程，执行命令仍然是单线程。

​		为什么不使用多线程？因为Redis数据在内存中，多线程会增加上下文切换的代价，没有才是效率最高的。单线程没有数据一致性问题，不需要竞争锁和[CAS](https://www.cnblogs.com/X-knight/p/10669934.html)操作。

## 数据类型？

### 常用的五种数据类型：

String：可以存储**字符串、整数、浮点数**，允许设置**过期时间**自动删除。
Hash：包含**键值对的无序散列表**。通过 “数组 + 链表” 的链地址法来解决部分哈希冲突，value 只能是字符串。
List：**双向链表**，可以充当队列和栈的角色。
Set：相当于Java 中的 HashSet ，内部的键值对是**无序、唯一**的。key 就是元素的值，value 为 null。
Zset：相当于 Java 中的 SortedSet 和 HashMap 的结合体，内部的键值对是**有序、唯一**的。可以为每个元素赋予一个 score 值，用来代表排序的**权重**。

### 不常用的4种数据类型：

BitMap：即位图，其实也就是 byte 数组，用二进制表示，只有 **0 和 1** 两个数字。实际上来说是归属于 String 类型下面。
Hyperloglogs：用来做**基数统计**的算法。
Geospatial：将用户给定的**地理位置信息储存**起来， 并对这些信息进行**操作**。
Pub/Sub：支持多播的可持久化的消息队列，用于实现**发布订阅**功能。

## Redis缓存异常方案

### 缓存血崩？

[缓存血崩是什么，如何解决？](#缓存雪崩)

### 缓存预热？

### 缓存穿透？

### 缓存击穿？

### 缓存降级？



## Redis事务？

### Redis事务是否有原子性，相关命令？



## Redis 持久化机制 ？AOF 和 RDB 有什么区别？



## Redis 淘汰策略有哪些？



## Redis集群架构，主从复制？

## springmvc的控制器是单例的吗?是线程安全的吗？

# 学习工具

[命令查询](http://www.redis.cn/commands.html)

[狂神视频](https://www.bilibili.com/video/BV1S54y1R7SB)

[Redis 最全面试题及答案_岁月安然-CSDN博客_redis题库](https://blog.csdn.net/baidu_38083619/article/details/105453246)

# [数据类型概览](http://www.redis.cn/commands.html)

|              数据类型               |   [String](#String（字符串）)    |                 [Hash](#Hash（哈希）)                 |         [List](#List（列表）)          |         [Set](#Set（集合）)          |                   [ZSet](#ZSet(有序集合))                    |            [Geospatial](#Geospatial（地理位置）)             | [Hyperloglog](#Hyperloglog（基数统计）) |              [Bitmap](#Bitmap（位图）)               | [Stream 5.0](#Redis Stream) |
| :---------------------------------: | :------------------------------: | :---------------------------------------------------: | :------------------------------------: | :----------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :-------------------------------------: | :--------------------------------------------------: | ---- |
|                特点                 | 字符串，整数或浮点数，二进制安全 | 哈希，包含键（string ）值对的无序散列表，适合存储对象 | 列表，链表上的节点字符串元素，插入有序 |   集合，不同无序字符串元素,哈希表    | 有序集合，不同字符串，还有带double类型的可重复**分数**的有序集合 |                           地理位置                           | 基数统计\<br />不占内存\<br />记录网站UV  | Bitmap 位图，数据结构！二进制位记录，0 和 1 两个状态 | 弥补发布订阅无法持久化的缺点 |
|                容量                 |              512MB               |          2\<sup>32\</sup> -1 键值对（40多亿）           |           2\<sup>32\</sup> -1            |          2\<sup>32\</sup> -1           |                      2\<sup>32\</sup> -1                       |                                                              |                                         |                                                      |      |
|                 增                  |               set                |                      hset/hmset                       |              lpush，rpush              |                 sadd                 |                             zadd                             |                            geoadd                            |                  pfadd                  |                        setbit                        |      |
|                 取                  |               get                |            hget （取单个）/hmget (取多个)             | lrange取区间值lpop左取\<br/>rpop 右取  |           smembers 取所有            | zscore单取 zrange  范围取 zrevrange   升序\<br />取zrangebyscore  所有降序取zrevrangebyscore  所有升序取 | geopos\<br />geodist（两点距离）\<br/>georadius（点附近点，可数量限制） |                                         | getbit |      |
|                 删                  |               del                |                         hdel                          |            Lpop、Rpop、lrem            |                 srem                 |                             zrem                             |                                                              |                                         |                                                      |      |
|              取旧改新               |              getset              |                                                       |                                        |                                      |                                                              |                                                              |                                         |                                                      |      |
|                自增                 |       incr \<br />（可指定        |                  HINCRBY增加指定步长                  |                                        |                                      |                                                              |                                                              |                                         |                                                      |      |
|                自减                 |       decr \<br />（可指定        |                                                       |                                        |                                      |                                                              |                                                              |                                         |                                                      |      |
|                追加                 |              append              |                                                       |                                        |                                      |                                                              |                                                              |                                         |                                                      |      |
|                长度                 |              strlen              |                         hlen                          |                  llen                  |                                      |                            zcard                             |                                                              |          pfcount（不重复数量）          |                bitcount(计算状态数量)                |      |
| 批量同时设置一个或多个 key-value 对 |               mset               |                         hmset                         |                                        |                                      |                                                              |                                                              |                                         |                                                      |      |
|   返回所有一个或多个给定 key 的值   |               mget               |                         hmget                         |                                        |                                      |                                                              |                                                              |                                         |                                                      |      |
|       获取对象中所有的键值对        |                                  |                  hgetall （取所有）                   |                                        |                                      |                                                              |                                                              |                                         |                                                      |      |
|          判断元素是否存在           |                                  |                        hexists                        |                                        |              sismember               |                                                              |                                                              |                                         |                                                      |      |
|             获取字段名              |                                  |                         hkeys                         |                                        |                                      |                                                              |                                                              |                                         |                                                      |      |
|             获取字段值              |                                  |                         hvals                         |                                        |                                      |                                                              |                                                              |                                         |                                                      |      |
|              集合运算               |                                  |                                                       |                                        | sunion 并集，sinter 交集，sdiff 交差 |                                                              |                                                              |              pfmerge(合并)              |                                                      |      |
|              应用场景               |                                  |                                                       |                                        |                                      |                                                              |                                                              |                                         |                                                      |      |

# 与MongoDB对比

|      | MongoDB | Redis |      |
| ---- | ------- | ----- | ---- |
|      |         |       |      |
|      |         |       |      |
|      |         |       |      |
|      |         |       |      |
|      |         |       |      |



# Nosql由来

## 单机mysql

- mysql+缓存+垂直拆分

	- 主从读写分离

		- 分表分库+水平拆分+mysql集群

			- 现在用户社交网络数据成倍增长，sql难以支撑
			- NoSQL（Not Only SQL）非关系型数据库，不需要固定模式，无需多于操作就可以横向操作

## 简介

Redis（**Re**mote **Di**ctionary **S**erver）远程字典服务

- **免费开源**，C语言编写，提供多种语言使用，支持网络，可持久化，遵守 BSD 协议，是一个高性能的 key-value 数据库。
- **类型多样**，不仅仅支持简单的key-value类型的数据，同时还提供list，set，zset，hash等数据结构的存储。

- **Redis 优势**
  **性能极高** – Redis能读的速度是110000次/s,写的速度是81000次/s 。

  **数据的持久化**，可以将内存中的数据保存在磁盘中，重启的时候可以再次加载进行使用。

  **数据类型多样** – Redis支持二进制的 Strings, Lists, Hashes, Sets 及 Ordered Sets 数据类型操作。
  **原子** – Redis的所有操作都是原子性的，意思就是要么成功执行要么失败完全不执行。单个操作是原子性的。多个操作也支持事务，即原子性，通过MULTI和EXEC指令包起来。
  **丰富的特性** – Redis还支持 publish/subscribe, 通知, key 过期等等特性。

  **数据的备份**，即master-slave模式的数据备份。

- **Redis与其他key-value存储有什么不同？**
Redis有着更为**复杂的数据结构并且提供对他们的原子性操作**，这是一个不同于其他数据库的进化路径。Redis的数据类型都是基于基本数据结构的同时对程序员透明，无需进行额外的抽象。Redis**运行在内存中但是可以持久化到磁盘**，所以在对不同数据集进行高速读写时需要权衡内存，因为数据量不能大于硬件内存。在内存数据库方面的另一个优点是，相比在磁盘上相同的复杂的数据结构，在内存中操作起来非常简单，这样Redis可以做很多内部复杂性很强的事情。同时，在磁盘格式方面他们是紧凑的以追加的方式产生的，因为他们并不需要进行随机访问。

- **redis的应用场景**

​		1、会话高速缓存（最常用）

​		2、消息队列，比如支付

​		3、活动排行榜或计数

​		4、发布、订阅消息（消息通知）

​		5、商品列表、评论列表、计时器、计数器

​		6、地图信息分析

​		7、内存存储、持久化（rdb，aof）

### 3V+3高

- 大数据时代3V（描述问题）

	- 海量Volume
	- 多样Variety
	- 实时Velocity

- 互联网需求3高（对程序要求）

	- 高并发
	- 高可扩
	- 高性能

### 经典应用

- 阿里巴巴

### 数据库四大分类

- KV键值对

- 文档型数据库

- 列存储数据库

- 图关系数据库（图结构）

  <img src="http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210622194750340.png" alt="image-20210622194750340"  />

### CAP

- C：Consistency（强一致性）
- A：Availability（可用性）
- P：Partition tolerance（分区容错性）
- 三进二（C必实现）

	- CA

		- 单点集群，满足一致性

	- CP
	- AP

### BASE

- 基本可用（Basically Available）
- 软状态（Soft state）
- 最终一致性（Eventually consistent）

### 分布式与集群

- 

### ACID关系型数据库



# Redis 安装

## windows

企业里面几乎不用windows开发Redis

https://github.com/tporadowski/redis/releases

redis-server.exe redis.windows.conf

另启一个 cmd 窗口，原来的不要关闭，不然就无法访问服务端了（可直接设置为服务自启动如下）

设置redis环境变量之后在解压文件夹中执行命令

redis-server.exe --service-install redis.windows.conf --loglevel verbose

修改服务为自动启动

redis-cli.exe -h 127.0.0.1 -p 6379

set myKey abc

- get myKey

## Linux

​		下载 == 解压（opt） == 基本环境安装【yum install gcc-c++】== make == make install  == redis默认安装路径/usr/local/bin ==  拷贝redis的conf文件使用拷贝配置文件启动 == daemonize改为yes改为后台启动 == 启动服务redis-server redisconfig/redis.conf == 客户端连接 redis-cli -p 6379  == ping 测试连接  === 查看redis进程是否开启  ps  -ef|grep redis  == shutdown关闭服务

```bash
####新建文件夹
[root@iZpwlt9baenyc8Z ~]# mkdir /usr/local/redis
[root@iZpwlt9baenyc8Z ~]# cd /usr/local/redis
[root@iZpwlt9baenyc8Z redis]# ls

####下载源码
[root@iZpwlt9baenyc8Z redis]# wget http://download.redis.io/releases/redis-6.0.5.tar.gz
--2022-02-10 14:00:45--  http://download.redis.io/releases/redis-6.0.5.tar.gz
redis-6.0.5.tar.gz                       100%[==================================================================================>]   2.11M  42.0KB/s    in 57s     。。。

####解压缩
[root@iZpwlt9baenyc8Z redis]# tar -zxvf redis-6.0.5.tar.gz

####安装
[root@iZpwlt9baenyc8Z redis]# ls
redis-6.0.5  redis-6.0.5.tar.gz
[root@iZpwlt9baenyc8Z redis]# cd redis-6.0.5
[root@iZpwlt9baenyc8Z redis-6.0.5]# ls
00-RELEASENOTES  CONTRIBUTING  deps     Makefile   README.md   runtest          runtest-moduleapi  sentinel.conf  tests   utils
BUGS             COPYING       INSTALL  MANIFESTO  redis.conf  runtest-cluster  runtest-sentinel   src            TLS.md
[root@iZpwlt9baenyc8Z redis-6.0.5]# make
cd src && make all
make[1]: Entering directory '/usr/local/redis/redis-6.0.5/src'
   。。。
Hint: It's a good idea to run 'make test' ;)
make[1]: Leaving directory '/usr/local/redis/redis-6.0.5/src'

[root@iZpwlt9baenyc8Z redis-6.0.5]# ls
00-RELEASENOTES  CONTRIBUTING  deps     Makefile   README.md   runtest          runtest-moduleapi  sentinel.conf  tests   utils
BUGS             COPYING       INSTALL  MANIFESTO  redis.conf  runtest-cluster  runtest-sentinel   src            TLS.md
[root@iZpwlt9baenyc8Z redis-6.0.5]# cd src

####迁出可执行程序，与源码分离
[root@iZpwlt9baenyc8Z src]# make install PREFIX=/opt/redis6
    CC Makefile.dep

Hint: It's a good idea to run 'make test' ;)

####创建redis配置文件目录并复制配置文件
[root@iZpwlt9baenyc8Z src]# mkdir /etc/redis
[root@iZpwlt9baenyc8Z src]# cd ..
[root@iZpwlt9baenyc8Z redis-6.0.5]# cd ..
[root@iZpwlt9baenyc8Z redis]# ls
redis-6.0.5  redis-6.0.5.tar.gz
[root@iZpwlt9baenyc8Z redis]# cd ..
[root@iZpwlt9baenyc8Z local]# ls
aegis  bin  etc  games  include  lib  lib64  libexec  redis  sbin  share  src
[root@iZpwlt9baenyc8Z local]# cd etc
[root@iZpwlt9baenyc8Z etc]# ls
[root@iZpwlt9baenyc8Z etc]# cd /etc
[root@iZpwlt9baenyc8Z etc]# cd redis
[root@iZpwlt9baenyc8Z redis]# ls
[root@iZpwlt9baenyc8Z redis]# cp /usr/local/redis/redis-6.0.5/redis.conf /etc/redis/6379.conf

[root@iZpwlt9baenyc8Z redis]# cd ..
[root@iZpwlt9baenyc8Z etc]# cd ..
[root@iZpwlt9baenyc8Z /]# ls
bin  boot  dev  etc  home  lib  lib64  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var

[root@iZpwlt9baenyc8Z ~]# cd /etc/redis/
[root@iZpwlt9baenyc8Z redis]# ls
6379.conf

[root@iZpwlt9baenyc8Z redis]# cd /opt/redis6
[root@iZpwlt9baenyc8Z redis6]# ls
bin

###创建redis服务，复制redis示例服务并修改
[root@iZpwlt9baenyc8Z bin]# cp /usr/local/redis/redis-6.0.5/utils/systemd-redis_server.service /lib/systemd/system/redis_6379.service
[root@iZpwlt9baenyc8Z bin]# cd /lib/systemd/system/
[root@iZpwlt9baenyc8Z system]# vim /lib/systemd/system/redis_6379.service
##########################
# example systemd service unit file for redis-server
#
# In order to use this as a template for providing a redis service in your
# environment, _at the very least_ make sure to adapt the redis configuration
# file you intend to use as needed (make sure to set "supervised systemd"), and
# to set sane TimeoutStartSec and TimeoutStopSec property values in the unit's
# "[Service]" section to fit your needs.
#
# Some properties, such as User= and Group=, are highly desirable for virtually
# all deployments of redis, but cannot be provided in a manner that fits all
# expectable environments. Some of these properties have been commented out in
# this example service unit file, but you are highly encouraged to set them to
# fit your needs.
#
# Please refer to systemd.unit(5), systemd.service(5), and systemd.exec(5) for
# more information.

[Unit]
Description=Redis_6379
After=network.target
#Documentation=https://redis.io/documentation
#Before=your_application.service another_example_application.service
#AssertPathExists=/var/lib/redis

[Service]
Type=forking
PIDFile=/var/run/redis_6379.pid
ExecStart=/opt/redis6/bin/redis-server /etc/redis/6379.conf
ExecReload=/bin/kill -s HUP $MAINPID
ExecStop=/bin/kill -s QUIT $MAINPID
PrivateTmp=true
## Alternatively, have redis-server load a configuration file:
#ExecStart=/usr/local/bin/redis-server /path/to/your/redis.conf
#LimitNOFILE=10032
#NoNewPrivileges=yes
#OOMScoreAdjust=-900
#PrivateTmp=yes
#TimeoutStartSec=infinity
#TimeoutStopSec=infinity
#UMask=0077
#User=redis
#Group=redis
#WorkingDirectory=/var/lib/redis

[Install]
WantedBy=multi-user.target

:wq!
#######

[root@iZpwlt9baenyc8Z system]# cd /

###使用systemctl  开启关闭服务
#如果报错：Job for redis-server.service failed because a timeout was exceeded.
[root@iZpwlt9baenyc8Z ~]# systemctl status redis_6379
● redis_6379.service - Redis_6379
           └─151178 /opt/redis6/bin/redis-server 127.0.0.1:6379
Feb 10 14:28:06 iZpwlt9baenyc8Z redis-server[151178]:               `-.__.-'
。。。
Feb 10 14:28:06 iZpwlt9baenyc8Z redis-server[151178]: 151178:M 10 Feb 2022 14:28:06.493 * Ready to accept connections
lines 1-19/19 (END)

[root@iZpwlt9baenyc8Z /]# cd /opt/redis6
[root@iZpwlt9baenyc8Z redis6]# ls
bin
[root@iZpwlt9baenyc8Z redis6]# cd bin
[root@iZpwlt9baenyc8Z bin]# ls
redis-benchmark  redis-check-aof  redis-check-rdb  redis-cli  redis-sentinel  redis-server

###cd  /opt/redis6/bin 跳转到命令目录后使用redis-server开启服务

##全局使用redis命令解决方法
#修改profile文件： 
#vi /etc/profile 
#在最后行添加: 
#export PATH=$PATH:/opt/redis6/bin
#注意：/opt/software/redis/src 表示的是redis-cli 命令存在的目录路径
#重新加载/etc/profile 
#source /etc/profile  
[root@iZpwlt9baenyc8Z bin]# redis-server
151212:C 10 Feb 2022 14:38:14.346 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
151212:C 10 Feb 2022 14:38:14.346 # Redis version=6.0.5, bits=64, commit=00000000, modified=0, pid=151212, just started
151212:C 10 Feb 2022 14:38:14.346 # Warning: no config file specified, using the default config. In order to specify a config file use ./redis-server /path/to/redis.conf
                _._                                                  
           _.-``__ ''-._                                             
      _.-``    `.  `_.  ''-._           Redis 6.0.5 (00000000/0) 64 bit
  .-`` .-```.  ```\/    _.,_ ''-._                                   
 (    '      ,       .-`  | `,    )     Running in standalone mode
 |`-._`-...-` __...-.``-._|'` _.-'|     Port: 6379
 |    `-._   `._    /     _.-'    |     PID: 151212
  `-._    `-._  `-./  _.-'    _.-'                                   
 |`-._`-._    `-.__.-'    _.-'_.-'|                                  
 |    `-._`-._        _.-'_.-'    |           http://redis.io        
  `-._    `-._`-.__.-'_.-'    _.-'                                   
 |`-._`-._    `-.__.-'    _.-'_.-'|                                  
 |    `-._`-._        _.-'_.-'    |                                  
  `-._    `-._`-.__.-'_.-'    _.-'                                   
      `-._    `-.__.-'    _.-'                                       
          `-._        _.-'                                           
              `-.__.-'                                               

151212:M 10 Feb 2022 14:38:14.347 # WARNING: The TCP backlog setting of 511 cannot be enforced because /proc/sys/net/core/somaxconn is set to the lower value of 128.
151212:M 10 Feb 2022 14:38:14.347 # Server initialized
151212:M 10 Feb 2022 14:38:14.347 # WARNING overcommit_memory is set to 0! Background save may fail under low memory condition. To fix this issue add 'vm.overcommit_memory = 1' to /etc/sysctl.conf and then reboot or run the command 'sysctl vm.overcommit_memory=1' for this to take effect.
151212:M 10 Feb 2022 14:38:14.347 # WARNING you have Transparent Huge Pages (THP) support enabled in your kernel. This will create latency and memory usage issues with Redis. To fix this issue run the command 'echo never > /sys/kernel/mm/transparent_hugepage/enabled' as root, and add it to your /etc/rc.local in order to retain the setting after a reboot. Redis must be restarted after THP is disabled.
151212:M 10 Feb 2022 14:38:14.348 * Ready to accept connections



[root@iZpwlt9baenyc8Z ~]# cd  /opt/redis6/bin
#使用   ./redis-cli 打开终端
[root@iZpwlt9baenyc8Z bin]# ./redis-cli 
###检测服务是否启动
127.0.0.1:6379> ping
PONG          
```



### redis-benchmark性能测试

可选参数：

![image-20210630185658552](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210630185658552.png)

**测试：100个并发连接 100000请求**

./redis-benchmark -h localhost -p 6379 -c 100 -n 100000

<img src="http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210630190808370.png" alt="image-20210630190808370" style="zoom: 67%;" />

# 基础知识

redis默认有**16**个数据库，默认使用的是第**0**个
可以使用 select 进行切换数据库！select 3 

DBSIZE # 查看DB大小！

keys * # 查看数据库所有的key

清除当前数据库 flushdb
清除全部数据库的内容 FLUSHALL

**Redis 为什么单线程还这么快？**
1、误区1：高性能的服务器一定是多线程的？
2、误区2：多线程（CPU上下文会切换！）一定比单线程效率高！
先去CPU>内存>硬盘的速度要有所了解！
核心：redis 是将所有的数据全部放在内存中的，所以说使用单线程去操作效率就是最高的，多线程
（CPU上下文会切换：耗时的操作！！！），对于内存系统来说，如果**没有上下文切换**效率就是最高
的！多次读写都是在一个CPU上的，在内存情况下，这个就是最佳的方案！

## IO多路复用（Epoll）原理

简单描述：

​		执行 epoll_create 函数会在内核的高速缓存区中建立一颗红黑树以及就绪链表(该链表存储已经就绪的文件描述符)。接着应用程序执行 epoll_ctl 函数添加文件描述符会在红黑树上增加相应的结点。
​		执行 epoll_ctl 的 add 操作时，不仅将文件描述符放到红黑树上，而且也注册了 callBack 函数。内核在检测到某文件描述符可读/可写时会调用回调函数，该回调函数将文件描述符放在就绪链表中。
​		执行 epoll_wait 函数只用观察就绪链表中有无数据即可，最后将链表的数据及就绪的数量返回给应用程序，应用程序只需要遍历依次处理即可。这里返回的文件描述符是通过内存映射函数 mmap 让内核和用户空间共享同一块内存实现传递的，减少了不必要的拷贝。
​		mmap：将用户空间的一段内存区域映射到内核空间，映射成功后，用户对这段内存区域的修改可以直接反映到内核空间。同样，内核空间对这段区域的修改也直接反映用户空间。那么对于内核空间、用户空间两者之间需要大量数据传输等操作的话效率是非常高的。
具体原理可以查看下面这篇博客：
https://blog.csdn.net/armlinuxww/article/details/92803381

# Redis 配置

Redis 的配置文件位于 Redis 安装目录下，文件名为 redis.conf(Windows 名为 redis.windows.conf)。

你可以通过 CONFIG 命令查看或设置配置项。

- CONFIG GET CONFIG_SETTING_NAME

	- CONFIG GET loglevel
	- CONFIG GET *

### 编辑配置

- 可以通过修改 redis.conf 文件或使用 CONFIG set 命令来修改配置。

	- CONFIG SET CONFIG_SETTING_NAME NEW_CONFIG_VALUE

		- CONFIG SET loglevel "notice"

### 参数说明
redis.conf 配置项说明如下：

- https://www.runoob.com/redis/redis-conf.html

# Redis 数据类型

```bash
设置密码：config set requirepass 123456
授权密码：auth 123456
127.0.0.1:6379> keys * # 查看所有的key
(empty list or set)
127.0.0.1:6379> set name xiaobai # set key
OK
127.0.0.1:6379> keys *
1) "name"
127.0.0.1:6379> set age 1
OK
127.0.0.1:6379> keys *
1) "age"
2) "name"
127.0.0.1:6379> EXISTS name # 判断当前的key是否存在
(integer) 1
127.0.0.1:6379> EXISTS name1
(integer) 0
127.0.0.1:6379> move name 1 # 移除当前的key
(integer) 1
127.0.0.1:6379> keys *
1) "age"
127.0.0.1:6379> set name qinjiang
OK
127.0.0.1:6379> keys *
1) "age"
2) "name"
127.0.0.1:6379> clear
127.0.0.1:6379> keys *
1) "age"
2) "name"
127.0.0.1:6379> get name
"qinjiang"
127.0.0.1:6379> EXPIRE name 10 # 设置key的过期时间，单位是秒
(integer) 1
127.0.0.1:6379> ttl name # 查看当前key的剩余时间
(integer) 4
127.0.0.1:6379> ttl name
(integer) 3
127.0.0.1:6379> ttl name
(integer) 2
127.0.0.1:6379> ttl name
(integer) 1
127.0.0.1:6379> ttl name
(integer) -2
127.0.0.1:6379> get name
(nil)
127.0.0.1:6379> type name # 查看当前key的一个类型！
string
127.0.0.1:6379> type age
string
```



## String（字符串）

- string 是 redis 最基本的类型，你可以理解成与 Memcached 一模一样的类型，一个 key 对应一个 value。

string 类型是二进制安全的。意思是 redis 的 string 可以包含**任何数据**。比如jpg图片或者序列化的对象。

string 类型是 Redis 最基本的数据类型，string 类型的值最大能存储 512MB。
- SET runoob "菜鸟教程"

	- GET runoob

```bash
keys  正则：获取符合正则的键的值
exist：是否存在
type：值类型
del：删除
expire：设置过期时间
ttl：查看有效时间
```



```bash
##########################################################################
127.0.0.1:6379> set key1 v1 # 设置值
OK
127.0.0.1:6379> get key1 # 获得值
"v1"
127.0.0.1:6379> keys * # 获得所有的key
1) "key1"
127.0.0.1:6379> EXISTS key1 # 判断某一个key是否存在
(integer) 1
127.0.0.1:6379> APPEND key1 "hello" # 追加字符串，如果当前key不存在，就相当于set key
(integer) 7
127.0.0.1:6379> get key1
"v1hello"
127.0.0.1:6379> STRLEN key1 # 获取字符串的长度！
(integer) 7
127.0.0.1:6379> APPEND key1 ",xiaobai"
(integer) 17
127.0.0.1:6379> STRLEN key1
(integer) 17
127.0.0.1:6379> get key1
"v1hello,xiaobai"
##########################################################################

# i++
# 步长 i+=
127.0.0.1:6379> set views 0 # 初始浏览量为0
OK
127.0.0.1:6379> get views
"0"
127.0.0.1:6379> incr views # 自增1 浏览量变为1
(integer) 1
127.0.0.1:6379> incr views
(integer) 2
127.0.0.1:6379> get views
"2"
127.0.0.1:6379> decr views # 自减1 浏览量-1
(integer) 1
127.0.0.1:6379> decr views
(integer) 0
127.0.0.1:6379> decr views
(integer) -1
127.0.0.1:6379> get views
"-1"
127.0.0.1:6379> INCRBY views 10 # 可以设置步长，指定增量！
(integer) 9
127.0.0.1:6379> INCRBY views 10
(integer) 19
127.0.0.1:6379> DECRBY views 5
(integer) 14
##########################################################################

# 字符串范围 range

127.0.0.1:6379> set key1 "hello,xiaobai" # 设置 key1 的值
OK
127.0.0.1:6379> get key1
"hello,xiaobai"
127.0.0.1:6379> GETRANGE key1 0 3 # 截取字符串 [0,3]
"hell"
127.0.0.1:6379> GETRANGE key1 0 -1 # 获取全部的字符串 和 get key是一样的
"hello,xiaobai"

# 替换！

127.0.0.1:6379> set key2 abcdefg
OK
127.0.0.1:6379> get key2
"abcdefg"
127.0.0.1:6379> SETRANGE key2 1 xx # 替换指定位置开始的字符串！
(integer) 7
127.0.0.1:6379> get key2
"axxdefg"
##########################################################################

# setex (set with expire) # 设置过期时间

# setnx (set if not exist) # 不存在在设置 （在分布式锁中会常常使用！）

127.0.0.1:6379> setex key3 30 "hello" # 设置key3 的值为 hello,30秒后过期
OK
127.0.0.1:6379> ttl key3
(integer) 26
127.0.0.1:6379> get key3
"hello"
127.0.0.1:6379> setnx mykey "redis" # 如果mykey 不存在，创建mykey
(integer) 1
127.0.0.1:6379> keys *
1) "key2"
2) "mykey"
3) "key1"
127.0.0.1:6379> ttl key3
(integer) -2
127.0.0.1:6379> setnx mykey "MongoDB" # 如果mykey存在，创建失败！
(integer) 0
127.0.0.1:6379> get mykey
"redis"
##########################################################################
mset
mget
127.0.0.1:6379> mset k1 v1 k2 v2 k3 v3 # 同时设置多个值
OK
127.0.0.1:6379> keys *
1) "k1"
2) "k2"
3) "k3"
127.0.0.1:6379> mget k1 k2 k3 # 同时获取多个值
1) "v1"
2) "v2"
3) "v3"
127.0.0.1:6379> msetnx k1 v1 k4 v4 # msetnx 是一个原子性的操作，要么一起成功，要么一起失败！
(integer) 0
127.0.0.1:6379> get k4
(nil)
# 对象
set user:1 {name:zhangsan,age:3} # 设置一个user:1 对象 值为 json字符来保存一个对象！
# 这里的key是一个巧妙的设计： user:{id}:{filed} , 如此设计在Redis中是完全OK了！
127.0.0.1:6379> mset user:1:name zhangsan user:1:age 2
OK
127.0.0.1:6379> mget user:1:name user:1:age
1) "zhangsan"
2) "2"
##########################################################################
getset # 先get然后在set
127.0.0.1:6379> getset db redis # 如果不存在值，则返回 nil
(nil)
127.0.0.1:6379> get db
"redis
127.0.0.1:6379> getset db mongodb # 如果存在值，获取原来的值，并设置新的值
"redis"
127.0.0.1:6379> get db
"mongodb"
```

数据结构是相同的！
String类似的使用场景：value除了是我们的字符串还可以是我们的数字！
计数器
统计多单位的数量
粉丝数
对象缓存存储！

## Hash（哈希）

- Redis hash 是一个键值(key=>value)对**集合**。

Redis hash 是一个 string 类型的 field 和 value 的映射表，hash 特别适合用于存储对象。

	- DEL runoob 用于删除前面测试用过的 key，不然会报错：(error) WRONGTYPE Operation against a key holding the wrong kind of value
	- HMSET 设置了两个 field=>value 对, HGET 获取对应 field 对应的 value。

每个 hash 可以存储 2\<sup>32\</sup> -1 键值对（40多亿）。

- HMSET runoob field1 "Hello" field2 "World"

	- HGET runoob field1

```bash
Map集合，key-map! 时候这个值是一个map集合！ 本质和String类型没有太大区别，还是一个简单的
key-vlaue！
set myhash field xiaobai
5) "d"
##########################################################################
127.0.0.1:6379> hset myhash field1 xiaobai # set一个具体 key-vlaue
(integer) 1
127.0.0.1:6379> hget myhash field1 # 获取一个字段值
"xiaobai"
127.0.0.1:6379> hmset myhash field1 hello field2 world # set多个 key-vlaue
OK
127.0.0.1:6379> hmget myhash field1 field2 # 获取多个字段值
1) "hello"
2) "world"
127.0.0.1:6379> hgetall myhash # 获取全部的数据，
1) "field1"
2) "hello"
3) "field2"
4) "world"
127.0.0.1:6379> hdel myhash field1 # 删除hash指定key字段！对应的value值也就消失了！
(integer) 1
127.0.0.1:6379> hgetall myhash
1) "field2"
2) "world"
##########################################################################
hlen
127.0.0.1:6379> hmset myhash field1 hello field2 world
OK
127.0.0.1:6379> HGETALL myhash
1) "field2"
2) "world"
3) "field1"
4) "hello"
127.0.0.1:6379> hlen myhash # 获取hash表的字段数量！
(integer) 2
##########################################################################
127.0.0.1:6379> HEXISTS myhash field1 # 判断hash中指定字段是否存在！
(integer) 1
127.0.0.1:6379> HEXISTS myhash field3
(integer) 0
##########################################################################
# 只获得所有field
# 只获得所有value
127.0.0.1:6379> hkeys myhash # 只获得所有field
1) "field2"
2) "field1"
hash变更的数据 user name age,尤其是是用户信息之类的，经常变动的信息！ hash 更适合于对象的
存储，String更加适合字符串存储！
```



## List（列表）

- Redis 列表是简单的字符串列表，按照**插入顺序排序**。你可以添加一个元素到列表的头部（左边）或者尾部（右边）。

- 列表最多可存储2\<sup>32\</sup> -1元素 (4294967295, 每个列表可存储40多亿)。

- lpush runoob redis

	- lpush runoob mongodb

		- lrange runoob 0 10
	
	```bash
	基本的数据类型，列表
	127.0.0.1:6379> msetnx k1 v1 k4 v4 # msetnx 是一个原子性的操作，要么一起成功，要么一起
	失败！
	(integer) 0
	127.0.0.1:6379> get k4
	(nil)
	# 对象
	set user:1 {name:zhangsan,age:3} # 设置一个user:1 对象 值为 json字符来保存一个对象！
	# 这里的key是一个巧妙的设计： user:{id}:{filed} , 如此设计在Redis中是完全OK了！
	127.0.0.1:6379> mset user:1:name zhangsan user:1:age 2
	OK
	127.0.0.1:6379> mget user:1:name user:1:age
	1) "zhangsan"
	2) "2"
	##########################################################################
	getset # 先get然后在set
	127.0.0.1:6379> getset db redis # 如果不存在值，则返回 nil
	(nil)
	127.0.0.1:6379> get db
	"redis
	127.0.0.1:6379> getset db mongodb # 如果存在值，获取原来的值，并设置新的值
	"redis"
	127.0.0.1:6379> get db
	"mongodb"
	在redis里面，我们可以把list玩成 ，栈、队列、阻塞队列！
	所有的list命令都是用l开头的，Redis不区分大小命令
	##########################################################################
	127.0.0.1:6379> LPUSH list one # 将一个值或者多个值，插入到列表头部 （左）
	(integer) 1
	127.0.0.1:6379> LPUSH list two
	(integer) 2
	127.0.0.1:6379> LPUSH list three
	(integer) 3
	127.0.0.1:6379> LRANGE list 0 -1 # 获取list中值！
	1) "three"
	2) "two"
	3) "one"
	127.0.0.1:6379> LRANGE list 0 1 # 通过区间获取具体的值！
	1) "three"
	2) "two"
	127.0.0.1:6379> Rpush list righr # 将一个值或者多个值，插入到列表位部 （右）
	(integer) 4
	127.0.0.1:6379> LRANGE list 0 -1
	1) "three"
	2) "two"
	3) "one"
	4) "righr"
	##########################################################################
	LPOP
	RPOP
	127.0.0.1:6379> LRANGE list 0 -1
	1) "three"
	2) "two"
	3) "one"
	4) "righr"
	127.0.0.1:6379> Lpop list # 移除list的第一个元素
	"three"
	127.0.0.1:6379> Rpop list # 移除list的最后一个元素
	"righr"
	127.0.0.1:6379> LRANGE list 0 -1
	1) "two"
	2) "one"
	##########################################################################
	Lindex
	127.0.0.1:6379> LRANGE list 0 -1
	1) "two"
	2) "one"
	127.0.0.1:6379> lindex list 1 # 通过下标获得 list 中的某一个值！
	"one"
	127.0.0.1:6379> lindex list 0
	"two"
	##########################################################################
	Llen
	127.0.0.1:6379> Lpush list one
	(integer) 1
	127.0.0.1:6379> Lpush list two
	(integer) 2
	127.0.0.1:6379> Lpush list three
	(integer) 3
	127.0.0.1:6379> Llen list # 返回列表的长度
	(integer) 3
	##########################################################################
	移除指定的值！
	取关 uid
	Lrem
	127.0.0.1:6379> LRANGE list 0 -1
	1) "three"
	2) "three"
	3) "two"
	4) "one"
	127.0.0.1:6379> lrem list 1 one # 移除list集合中指定个数的value，精确匹配
	(integer) 1
	127.0.0.1:6379> LRANGE list 0 -1
	1) "three"
	2) "three"
	3) "two"
	127.0.0.1:6379> lrem list 1 three
	(integer) 1
	127.0.0.1:6379> LRANGE list 0 -1
	1) "three"
	2) "two"
	127.0.0.1:6379> Lpush list three
	(integer) 3
	127.0.0.1:6379> lrem list 2 three
	(integer) 2
	127.0.0.1:6379> LRANGE list 0 -1
	1) "two"
	##########################################################################
	trim 修剪。； list 截断!
	127.0.0.1:6379> keys *
	(empty list or set)
	127.0.0.1:6379> Rpush mylist "hello"
	(integer) 1
	127.0.0.1:6379> Rpush mylist "hello1"
	(integer) 2
	127.0.0.1:6379> Rpush mylist "hello2"
	(integer) 3
	127.0.0.1:6379> Rpush mylist "hello3"
	(integer) 4
	127.0.0.1:6379> ltrim mylist 1 2 # 通过下标截取指定的长度，这个list已经被改变了，截断了
	只剩下截取的元素！
	OK
	127.0.0.1:6379> LRANGE mylist 0 -1
	1) "hello1"
	2) "hello2"
	##########################################################################
	rpoplpush # 移除列表的最后一个元素，将他移动到新的列表中！
	127.0.0.1:6379> rpush mylist "hello"
	(integer) 1
	127.0.0.1:6379> rpush mylist "hello1"
	(integer) 2
	127.0.0.1:6379> rpush mylist "hello2"
	(integer) 3
	127.0.0.1:6379> rpoplpush mylist myotherlist # 移除列表的最后一个元素，将他移动到新的
	列表中！
	"hello2"
	127.0.0.1:6379> lrange mylist 0 -1 # 查看原来的列表
	1) "hello"
	2) "hello1"
	127.0.0.1:6379> lrange myotherlist 0 -1 # 查看目标列表中，确实存在改值！
	1) "hello2"
	##########################################################################
	#lset 将列表中指定下标的值替换为另外一个值，更新操作
	127.0.0.1:6379> EXISTS list # 判断这个列表是否存在
	(integer) 0
	127.0.0.1:6379> lset list 0 item # 如果不存在列表我们去更新就会报错
	(error) ERR no such key
	127.0.0.1:6379> lpush list value1
	(integer) 1
	127.0.0.1:6379> LRANGE list 0 0
	1) "value1"
	127.0.0.1:6379> lset list 0 item # 如果存在，更新当前下标的值
	OK
	127.0.0.1:6379> LRANGE list 0 0
	1) "item"
	127.0.0.1:6379> lset list 1 other # 如果不存在，则会报错！
	(error) ERR index out of range
	##########################################################################
	linsert # 将某个具体的value插入到列把你中某个元素的前面或者后面！
	127.0.0.1:6379> Rpush mylist "hello"
	(integer) 1
	127.0.0.1:6379> Rpush mylist "world"
	(integer) 2
	127.0.0.1:6379> LINSERT mylist before "world" "other"
	(integer) 3
	127.0.0.1:6379> LRANGE mylist 0 -1
	1) "hello"
	2) "other"
	3) "world"
	127.0.0.1:6379> LINSERT mylist after world new
	(integer) 4
	127.0.0.1:6379> LRANGE mylist 0 -1
	1) "hello"
	2) "other"
	3) "world"
	4) "new"
	#小结
	#他实际上是一个链表，before Node after ， left，right 都可以插入值
	#如果key 不存在，创建新的链表
	#如果key存在，新增内容
	```
	
	

## Set（集合）

- Redis 的 Set 是 **string 类型的无序集合**。

集合是通过哈希表实现的，所以添加，删除，查找的复杂度都是 **O(1)**。
- sadd 命令
添加一个 string 元素到 key 对应的 set 集合中，成功返回 1，如果元素已经在集合中返回 0。

sadd key member
- 集合中最大的成员数为 2\<sup>32\</sup> - 1(4294967295, 每个集合可存储40多亿个成员)。
- sadd runoob redis

	- smembers runoob

```bash
set中的值是不能重读的！
##########################################################################
127.0.0.1:6379> sadd myset "hello" # set集合中添加匀速
(integer) 1
127.0.0.1:6379> sadd myset "xiaobai"
(integer) 1
127.0.0.1:6379> sadd myset "lovexiaobai"
(integer) 1
127.0.0.1:6379> SMEMBERS myset # 查看指定set的所有值
1) "hello"
2) "lovexiaobai"
3) "xiaobai"
127.0.0.1:6379> SISMEMBER myset hello # 判断某一个值是不是在set集合中！
(integer) 1
127.0.0.1:6379> SISMEMBER myset world
(integer) 0
##########################################################################
127.0.0.1:6379> scard myset # 获取set集合中的内容元素个数！
(integer) 4
##########################################################################
rem
127.0.0.1:6379> srem myset hello # 移除set集合中的指定元素
(integer) 1
127.0.0.1:6379> scard myset
(integer) 3
127.0.0.1:6379> SMEMBERS myset
1) "lovexiaobai2"
2) "lovexiaobai"
3) "xiaobai"
##########################################################################
set 无序不重复集合。抽随机！
127.0.0.1:6379> SMEMBERS myset
1) "lovexiaobai2"
2) "lovexiaobai"
3) "xiaobai"
127.0.0.1:6379> SRANDMEMBER myset # 随机抽选出一个元素
"xiaobai"
127.0.0.1:6379> SRANDMEMBER myset
"xiaobai"
127.0.0.1:6379> SRANDMEMBER myset
"xiaobai"
127.0.0.1:6379> SRANDMEMBER myset
"xiaobai"
127.0.0.1:6379> SRANDMEMBER myset 2 # 随机抽选出指定个数的元素
1) "lovexiaobai"
2) "lovexiaobai2"
127.0.0.1:6379> SRANDMEMBER myset 2
1) "lovexiaobai"
2) "lovexiaobai2"
127.0.0.1:6379> SRANDMEMBER myset # 随机抽选出一个元素
"lovexiaobai2"
##########################################################################
删除定的key，随机删除key！
127.0.0.1:6379> SMEMBERS myset
1) "lovexiaobai2"
2) "lovexiaobai"
3) "xiaobai"
127.0.0.1:6379> spop myset # 随机删除一些set集合中的元素！
"lovexiaobai2"
127.0.0.1:6379> spop myset
"lovexiaobai"
127.0.0.1:6379> SMEMBERS myset
1) "xiaobai"
##########################################################################
将一个指定的值，移动到另外一个set集合！
127.0.0.1:6379> sadd myset "hello"
(integer) 1
127.0.0.1:6379> sadd myset "world"
(integer) 1
127.0.0.1:6379> sadd myset "xiaobai"
(integer) 1
127.0.0.1:6379> sadd myset2 "set2"
(integer) 1
127.0.0.1:6379> smove myset myset2 "xiaobai" # 将一个指定的值，移动到另外一个set集
合！
(integer) 1
127.0.0.1:6379> SMEMBERS myset
1) "world"
2) "hello"
127.0.0.1:6379> SMEMBERS myset2
1) "xiaobai"
2) "set2"
##########################################################################
数字集合类：
- 差集 SDIFF
- 交集
- 并集
127.0.0.1:6379> SDIFF key1 key2 # 差集
1) "b"
2) "a"
127.0.0.1:6379> SINTER key1 key2 # 交集 共同好友就可以这样实现
1) "c"
127.0.0.1:6379> SUNION key1 key2 # 并集
1) "b"
2) "c"
3) "e"
4) "a"
微博，A用户将所有关注的人放在一个set集合中！将它的粉丝也放在一个集合中！
共同关注，共同爱好，二度好友，推荐好友！（六度分割理论）

```



## ZSet(有序集合)

- Redis zset (**sorted set**：有序集合)和 set 一样也是string类型元素的集合,且不允许重复的成员。不同的是每个元素都会关联一个double类型的分数。redis正是通过分数来为集合中的成员进行从小到大的**排序**。

zset的成员是唯一的,但**分数(score)**却可以重复。
- zadd 命令
添加元素到集合，元素在集合中存在则更新对应score

zadd key score member 
- zadd runoob 0 redis

	- ZRANGEBYSCORE runoob 0 1000

```bash
在set的基础上，增加了一个值，set k1 v1 zset k1 score1 v1
127.0.0.1:6379> hvals myhash # 只获得所有value
1) "world"
2) "hello"
##########################################################################
incr decr
127.0.0.1:6379> hset myhash field3 5 #指定增量！
(integer) 1
127.0.0.1:6379> HINCRBY myhash field3 1
(integer) 6
127.0.0.1:6379> HINCRBY myhash field3 -1
(integer) 5
127.0.0.1:6379> hsetnx myhash field4 hello # 如果不存在则可以设置
(integer) 1
127.0.0.1:6379> hsetnx myhash field4 world # 如果存在则不能设置
(integer) 0
127.0.0.1:6379> zadd myset 1 one # 添加一个值
(integer) 1
127.0.0.1:6379> zadd myset 2 two 3 three # 添加多个值
(integer) 2
127.0.0.1:6379> ZRANGE myset 0 -1
1) "one"
2) "two"
3) "three"
##########################################################################
排序如何实现
127.0.0.1:6379> zadd salary 2500 xiaohong # 添加三个用户
(integer) 1
127.0.0.1:6379> zadd salary 5000 zhangsan
(integer) 1
127.0.0.1:6379> zadd salary 500 xiaobai
(integer) 1
# ZRANGEBYSCORE key min max
127.0.0.1:6379> ZRANGEBYSCORE salary -inf +inf # 显示全部的用户 从小到大！
1) "xiaobai"
2) "xiaohong"
3) "zhangsan"
127.0.0.1:6379> ZREVRANGE salary 0 -1 # 从大到进行排序！
1) "zhangsan"
2) "xiaobai"
127.0.0.1:6379> ZRANGEBYSCORE salary -inf +inf withscores # 显示全部的用户并且附带成
绩
1) "xiaobai"
2) "500"
3) "xiaohong"
4) "2500"
5) "zhangsan"
6) "5000"
127.0.0.1:6379> ZRANGEBYSCORE salary -inf 2500 withscores # 显示工资小于2500员工的升
序排序！
1) "xiaobai"
2) "500"
3) "xiaohong"
4) "2500"
##########################################################################
# 移除rem中的元素
127.0.0.1:6379> zrange salary 0 -1
1) "xiaobai"
2) "xiaohong"
3) "zhangsan"
127.0.0.1:6379> zrem salary xiaohong # 移除有序集合中的指定元素
(integer) 1
127.0.0.1:6379> zrange salary 0 -1
1) "xiaobai"
2) "zhangsan"
127.0.0.1:6379> zcard salary # 获取有序集合中的个数
(integer) 2
##########################################################################
127.0.0.1:6379> zadd myset 1 hello
(integer) 1
127.0.0.1:6379> zadd myset 2 world 3 xiaobai
(integer) 2
127.0.0.1:6379> zcount myset 1 3 # 获取指定区间的成员数量！
(integer) 3
127.0.0.1:6379> zcount myset 1 2
(integer) 2
案例思路：set 排序 存储班级成绩表，工资表排序！
普通消息，1， 重要消息 2，带权重进行判断！
排行榜应用实现，取Top N 测试！
```

## Geospatial （地理位置）

朋友的定位，附近的人，打车距离计算？
Redis 的 Geo 在Redis3.2 版本就推出了！ 这个功能可以推算地理位置的信息，两地之间的距离，方圆几里的人！
可以查询一些测试数据：http://www.jsons.cn/lngcodeinfo/0706D99C19A781A3/
只有 六个命令：
官方文档：https://www.redis.net.cn/order/3685.html
getadd
getpos
获得当前定位：一定是一个坐标值！
GEODIST

## Geohash字符串属性

该命令将返回11个字符的Geohash字符串，所以没有精度Geohash，损失相比，使用内部52位表示。返回的geohashes具有以下特性：

1. 他们可以缩短从右边的字符。它将失去精度，但仍将指向同一地区。
2. 它可以在 `geohash.org` 网站使用，网址 `http://geohash.org/\<geohash-string>`。查询例子：http://geohash.org/sqdtr74hyu0.
3. 与类似的前缀字符串是附近，但相反的是不正确的，这是可能的，用不同的前缀字符串附近。

```bash
GEOHASH 返回一个或多个 geohash 
GEOPOS 返回一个或多个坐标数组，不存在为空
GEODIST 返回所查两个点的距离，可指定单位
GEORADIUS 根据所给点（非存在数据）以及要求范围和返回数据，返回对应范围内相关点信息
GEOADD 添加一个过多个点信息（经纬度和，名称）
GEORADIUSBYMEMBER 根据已有点以及所给范围查询范围内所有位置元素
```



```bash
# getadd 添加地理位置
# 规则：两级无法直接添加，我们一般会下载城市数据，直接通过java程序一次性导入！
# 有效的经度从-180度到180度。
# 有效的纬度从-85.05112878度到85.05112878度。
# 当坐标位置超出上述指定范围时，该命令将会返回一个错误。
# 127.0.0.1:6379> geoadd china:city 39.90 116.40 beijing
(error) ERR invalid longitude,latitude pair 39.900000,116.400000
# 参数 key 值（）
127.0.0.1:6379> geoadd china:city 116.40 39.90 beijing
(integer) 1
127.0.0.1:6379> geoadd china:city 121.47 31.23 shanghai
(integer) 1
127.0.0.1:6379> geoadd china:city 106.50 29.53 chongqi 114.05 22.52 shengzhen
(integer) 2
127.0.0.1:6379> geoadd china:city 120.16 30.24 hangzhou 108.96 34.26 xian
(integer) 2
127.0.0.1:6379> GEOPOS china:city beijing # 获取指定的城市的经度和纬度！
1) 1) "116.39999896287918091"
2) "39.90000009167092543"
127.0.0.1:6379> GEOPOS china:city beijing chongqi
1) 1) "116.39999896287918091"
2) "39.90000009167092543"
2) 1) "106.49999767541885376"
2) "29.52999957900659211"
#两人之间的距离！
#单位：
#m 表示单位为米。
#km 表示单位为千米。
#mi 表示单位为英里。
#ft 表示单位为英尺。
#georadius 以给定的经纬度为中心， 找出某一半径内的元素

#我附近的人？ （获得所有附近的人的地址，定位！）通过半径来查询！
#获得指定数量的人，200
#所有数据应该都录入：china:city ，才会让结果更加请求！
127.0.0.1:6379> GEODIST china:city beijing shanghai km # 查看上海到北京的直线距离
"1067.3788"
127.0.0.1:6379> GEODIST china:city beijing chongqi km # 查看重庆到北京的直线距离
"1464.0708"
127.0.0.1:6379> GEORADIUS china:city 110 30 1000 km # 以110，30 这个经纬度为中心，寻
#找方圆1000km内的城市
1) "chongqi"
2) "xian"
3) "shengzhen"
4) "hangzhou"
127.0.0.1:6379> GEORADIUS china:city 110 30 500 km
1) "chongqi"
2) "xian"
127.0.0.1:6379> GEORADIUS china:city 110 30 500 km withdist # 显示到中间距离的位置
1) 1) "chongqi"
2) "341.9374"
2) 1) "xian"
2) "483.8340"
127.0.0.1:6379> GEORADIUS china:city 110 30 500 km withcoord # 显示他人的定位信息
1) 1) "chongqi"
2) 1) "106.49999767541885376"
2) "29.52999957900659211"
2) 1) "xian"
2) 1) "108.96000176668167114"
2) "34.25999964418929977"
127.0.0.1:6379> GEORADIUS china:city 110 30 500 km withdist withcoord count 1 #
#筛选出指定的结果！
1) 1) "chongqi"
2) "341.9374"
3) 1) "106.49999767541885376"
2) "29.52999957900659211"
127.0.0.1:6379> GEORADIUS china:city 110 30 500 km withdist withcoord count 2
1) 1) "chongqi"
2) "341.9374"
3) 1) "106.49999767541885376"
2) "29.52999957900659211"
2) 1) "xian"
2) "483.8340"
3) 1) "108.96000176668167114"
2) "34.25999964418929977"
#GEORADIUSBYMEMBER
#GEOHASH 命令 - 返回一个或多个位置元素的 Geohash 表示
#该命令将返回11个字符的Geohash字符串!
#GEO 底层的实现原理其实就是 Zset！我们可以使用Zset命令来操作geo！
```



## Hyperloglog（基数统计）

### 什么是基数？ 

A {1,3,5,7,8,7} 

B{1,3,5,7,8} 

基数（**不重复的元素**） = 5，可以接受误差！ 

### 简介 

Redis 2.8.9 版本就更新了 Hyperloglog 数据结构！

 Redis Hyperloglog 基数统计的算法！

优点：占用的内存是固定，2^64 不同的元素的技术，只需要废 12KB内存！如果要从内存角度来比较的话 Hyperloglog 首选！
网页的 UV （一个人访问一个网站多次，但是还是算作一个人！）
传统的方式， set 保存用户的id，然后就可以统计 set 中的元素数量作为标准判断 !
这个方式如果保存大量的用户id，就会比较麻烦！我们的目的是为了计数，而不是保存用户id；
0.81% 错误率！ 统计UV任务，可以忽略不计的！

### 测试使用

```bash
127.0.0.1:6379> PFadd mykey a b c d e f g h i j # 创建第一组元素 mykey
(integer) 1
127.0.0.1:6379> PFCOUNT mykey # 统计 mykey 元素的基数数量
(integer) 10
127.0.0.1:6379> PFadd mykey2 i j z x c v b n m # 创建第二组元素 mykey2
(integer) 1
127.0.0.1:6379> PFCOUNT mykey2
(integer) 9
127.0.0.1:6379> PFMERGE mykey3 mykey mykey2 # 合并两组 mykey mykey2 => mykey3 并集
OK
127.0.0.1:6379> PFCOUNT mykey3 # 看并集的数量！
(integer) 15
如果允许容错，那么一定可以使用 Hyperloglog ！
如果不允许容错，就使用 set 或者自己的数据类型即可！
```



## Bitmap（位图）

位存储
统计用户信息，活跃，不活跃！ 登录 、 未登录！ 打卡，365打卡！ **两个状态的，都可以使用**
Bitmaps！
Bitmap 位图，数据结构！ 都是操作二进制位来进行记录，就只有0 和 1 两个状态！
365 天 = 365 bit 1字节 = 8bit 46 个字节左右！

```bash
#存
setbit key offset value
#取
getbit key
#and，or，xor, not操作
bitop operation【and, or, xor, not】 destkey key [key]
#统计1个数
bitcount key [start end] 
#返回第一个0或1的位置
bitpos key bit [start end]
#对二进制位宽操作
bitfield
```



# Redis 命令

## Redis 命令

- 语法
Redis 客户端的基本语法为：

$ redis-cli

- 以下实例讲解了如何启动 redis 客户端：

启动 redis 服务器，打开终端并输入命令 redis-cli，该命令会连接本地的 redis 服务。

$ redis-cli
redis 127.0.0.1:6379>
redis 127.0.0.1:6379> PING

PONG
在以上实例中我们连接到本地的 redis 服务并执行 PING 命令，该命令用于检测 redis 服务是否启动。

- 在远程服务上执行命令

	- $ redis-cli -h host -p port -a password

## Redis keys 命令大全

- https://redis.io/commands
- [Redis Psubscribe 命令_订阅一个或多个符合给定模式的频道。](https://www.redis.net.cn/order/3632.html)

## Redis HyperLogLog

- Redis 在 2.8.9 版本添加了 HyperLogLog 结构。

Redis HyperLogLog 是用来做基数统计的算法，HyperLogLog 的优点是，在输入元素的数量或者体积非常非常大时，计算基数所需的空间总是固定 的、并且是很小的。

在 Redis 里面，每个 HyperLogLog 键只需要花费 12 KB 内存，就可以计算接近 2^64 个不同元素的基 数。这和计算基数时，元素越多耗费内存就越多的集合形成鲜明对比。

但是，因为 HyperLogLog 只会根据输入元素来计算基数，而不会储存输入元素本身，所以 HyperLogLog 不能像集合那样，返回输入的各个元素。
- 什么是基数?
比如数据集 {1, 3, 5, 7, 5, 7, 8}， 那么这个数据集的基数集为 {1, 3, 5 ,7, 8}, 基数(不重复元素)为5。 基数估计就是在误差可接受的范围内，快速计算基数。
- PFADD runoobkey "redis"

	- PFCOUNT runoobkey

## Redis 发布订阅

```
Unsubscribe 取消订阅一个或多个
Subscribe 订阅一个或多个
Pubsub 查看订阅与发布状态
Punsubscribe 退订所有给定的频道
Publish 发送相关信息到所给的频道
Psubscribe 订阅一个或多个 可用匹配符 *
```



- Redis 发布订阅 (pub/sub) 是一种消息通信模式：发送者 (pub) 发送消息，订阅者 (sub) 接收消息。

Redis 客户端可以订阅任意数量的频道。

订阅/发布消息图： 第一个：消息发送者， 第二个：频道 第三个：消息订阅者！

![image-20210712141326489](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210712141326489.png)

下图展示了频道 channel1 ， 以及订阅这个频道的三个客户端 —— client2 、 client5 和 client1 之间的 关系：

![image-20210712141343138](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210712141343138.png)

当有新消息通过 PUBLISH 命令发送给频道 channel1 时， 这个消息就会被发送给订阅它的三个客户 端： 

![image-20210712141358255](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210712141358255.png)

### 命令 

这些命令被广泛用于构建即时通信应用，比如网络聊天室(chatroom)和实时广播、实时提醒等

![image-20210712141420254](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210712141420254.png)

### 测试

```bash

订阅端：
127.0.0.1:6379> SUBSCRIBE xiaobaishuo # 订阅一个频道 xiaobaishuo
Reading messages... (press Ctrl-C to quit)
1) "subscribe"
2) "xiaobaishuo"
3) (integer) 1
# 等待读取推送的信息
1) "message" # 消息
2) "xiaobaishuo" # 那个频道的消息
3) "hello,xiaobai" # 消息的具体内容
1) "message"
2) "xiaobaishuo"
3) "hello,redis"
发送端：
127.0.0.1:6379> PUBLISH xiaobaishuo "hello,xiaobai" # 发布者发布消息到频道！
(integer) 1
127.0.0.1:6379> PUBLISH xiaobaishuo "hello,redis" # 发布者发布消息到频道！
(integer) 1
127.0.0.1:6379>

```

### 原理

Redis是使用C实现的，通过分析 Redis 源码里的 pubsub.c 文件，了解发布和订阅机制的底层实现，借此加深对 Redis 的理解。

Redis 通过 PUBLISH 、SUBSCRIBE 和 PSUBSCRIBE 等命令实现发布和订阅功能。 微信： 通过 SUBSCRIBE 命令订阅某频道后，redis-server 里维护了一个字典，字典的键就是一个个 频道！， 而字典的值则是一个链表，链表中保存了所有订阅这个 channel 的客户端。SUBSCRIBE 命令的关键， 就是将客户端添加到给定 channel 的订阅链表中。

通过 PUBLISH 命令向订阅者发送消息，redis-server 会使用给定的频道作为键，在它所维护的 channel 字典中查找记录了订阅这个频道的所有客户端的链表，遍历这个链表，将消息发布给所有订阅者。Pub/Sub 从字面上理解就是发布（Publish）与订阅（Subscribe），在Redis中，你可以设定对某一个 key值进行消息发布及消息订阅，当一个key值上进行了消息发布后，所有订阅它的客户端都会收到相应 的消息。这一功能最明显的用法就是用作实时消息系统，比如普通的即时聊天，群聊等功能。

使用场景：

1、实时消息系统！ 

2、事实聊天！（频道当做聊天室，将信息回显给所有人即可！） 

3、订阅，关注系统都是可以的！ 稍微复杂的场景我们就会使用 消息中间件 MQ （）

- SUBSCRIBE runoobChat

  - PUBLISH runoobChat "Redis PUBLISH test"
  - 重新开启个 redis 客户端在同一个频道 runoobChat 发布两次消息，订阅者就能接收到消息。


## Redis 事务(不回滚，批量执行作用)

- Redis 事务可以一次执行多个命令， 并且带有以下三个重要的保证：

批量操作在发送 EXEC 命令前被放入队列缓存。
收到 EXEC 命令后进入事务执行，**事务中任意命令执行失败，其余的命令依然被执行,代码错误，所有命令都不会执行**。
在事务执行过程，其他客户端提交的命令请求不会插入到事务执行命令序列中。
**DISCARD放弃事物，所有不执行**一个事务从开始到执行会经历以下三个阶段：

**开始事务。**
**命令入队。**
**执行事务。**

- **MULTI** 开始一个事务
- 将多个命令入队到事务中
- SET book-name "Mastering C++ in 21 days"
- GET book-name
- SADD tag "C++" "Programming" "Mastering Series"
- SMEMBERS tag
- **EXEC/DISCARD**

- 单个 Redis 命令的执行是原子性的，但 Redis 没有在事务上增加任何维持原子性的机制，所以 **Redis 事务的执行并不是原子性**的。

事务可以理解为一个打包的批量执行脚本，但批量指令并非原子化的操作，中间某条指令的失败不会导致前面已做指令的回滚，也不会造成后续的指令不做。

悲观锁：
很悲观，认为什么时候都会出问题，无论做什么都会加锁！
乐观锁：
很乐观，认为什么时候都不会出问题，所以不会上锁！ 更新数据的时候去判断一下，在此期间是否有人修改过这个数据，

获取version
更新的时候比较 version
Redis测监视测试
正常执行成功！
测试多线程修改值 , 使用watch 可以当做redis的乐观锁操作！

```shell
127.0.0.1:6379> set money 100
OK
127.0.0.1:6379> set out 0
OK
127.0.0.1:6379> watch money # 监视 money 对象
OK
127.0.0.1:6379> multi # 事务正常结束，数据期间没有发生变动，这个时候就正常执行成功！
OK
127.0.0.1:6379> DECRBY money 20
QUEUED
127.0.0.1:6379> INCRBY out 20
QUEUED
127.0.0.1:6379> exec
1) (integer) 80
2) (integer) 20
```

测试多线程修改值 , 使用watch 可以当做redis的乐观锁操作！

```shell
127.0.0.1:6379> watch money # 监视 money
OK
127.0.0.1:6379> multi
OK
127.0.0.1:6379> DECRBY money 10
QUEUED
127.0.0.1:6379> INCRBY out 10
QUEUED
127.0.0.1:6379> exec # 执行之前，另外一个线程，修改了我们的值，这个时候，就会导致事务执行失
败！
(nil)
```



## Redis 脚本

- Redis 脚本使用 Lua 解释器来执行脚本。 Redis 2.6 版本通过内嵌支持 Lua 环境。执行脚本的常用命令为 EVAL。
- EVAL script numkeys key [key ...] arg [arg ...]

	- EVAL "return {KEYS[1],KEYS[2],ARGV[1],ARGV[2]}" 2 key1 key2 first second

## Redis 连接

- Redis 连接命令主要是用于连接 redis 服务。

  - 客户端如何通过密码验证连接到 redis 服务，并检测服务是否在运行：

    - AUTH "password"

    	- PING

    验证密码是否正确

  - 1 AUTH password

    打印字符串

    2	ECHO message

    查看服务是否运行

    3	PING

    关闭当前连接

    4	QUIT

    切换到指定的数据库

    5	SELECT index

## Redis服务器

- Redis服务器命令主要是用于管理redis服务

## Redis GEO

- Redis GEO 主要用于存储地理位置信息，并对存储的信息进行操作，该功能在 Redis 3.2 版本新增。

Redis GEO 操作方法有：

geoadd：添加地理位置的坐标。
geopos：获取地理位置的坐标。
geodist：计算两个位置之间的距离。
georadius：根据用户给定的经纬度坐标来获取指定范围内的地理位置集合。
georadiusbymember：根据储存在位置集合里面的某个地点获取指定范围内的地理位置集合。
geohash：返回一个或多个位置对象的 geohash 值。
- geoadd
geoadd 用于存储指定的地理空间位置，可以将一个或多个经度(longitude)、纬度(latitude)、位置名称(member)添加到指定的 key 中。

geoadd 语法格式如下：

GEOADD key longitude latitude member [longitude latitude member ...]

	- GEOADD Sicily 13.361389 38.115556 "Palermo" 15.087269 37.502669 "Catania"
	
		- GEODIST Sicily Palermo Catania
	
			- geodist 用于返回两个给定位置之间的距离。

geodist 语法格式如下：

GEODIST key member1 member2 [m|km|ft|mi]
member1 member2 为两个地理位置。

最后一个距离单位参数说明：

m ：米，默认单位。
km ：千米。
mi ：英里。
ft ：英尺。

		- GEORADIUS Sicily 15 37 100 km
	
			- georadius 以给定的经纬度为中心， 返回键包含的位置元素当中， 与中心的距离不超过给定最大距离的所有位置元素。

georadiusbymember 和 GEORADIUS 命令一样， 都可以找出位于指定范围内的元素， 但是 georadiusbymember 的中心点是由给定的位置元素决定的， 而不是使用经度和纬度来决定中心点。

georadius 与 georadiusbymember 语法格式如下：

GEORADIUS key longitude latitude radius m|km|ft|mi [WITHCOORD] [WITHDIST] [WITHHASH] [COUNT count] [ASC|DESC] [STORE key] [STOREDIST key]
GEORADIUSBYMEMBER key member radius m|km|ft|mi [WITHCOORD] [WITHDIST] [WITHHASH] [COUNT count] [ASC|DESC] [STORE key] [STOREDIST key]
参数说明：

m ：米，默认单位。
km ：千米。
mi ：英里。
ft ：英尺。
WITHDIST: 在返回位置元素的同时， 将位置元素与中心之间的距离也一并返回。
WITHCOORD: 将位置元素的经度和维度也一并返回。
WITHHASH: 以 52 位有符号整数的形式， 返回位置元素经过原始 geohash 编码的有序集合分值。 这个选项主要用于底层应用或者调试， 实际中的作用并不大。
COUNT 限定返回的记录数。
ASC: 查找结果根据距离从近到远排序。
DESC: 查找结果根据从远到近排序。

		- GEOPOS Sicily Palermo Catania NonExisting
	
			- geopos 用于从给定的 key 里返回所有指定名称(member)的位置（经度和纬度），不存在的返回 nil。

geopos 语法格式如下：

GEOPOS key member [member ...]

		- GEOHASH Sicily Palermo Catania
	
			- geohash
Redis GEO 使用 geohash 来保存地理位置的坐标。

geohash 用于获取一个或多个位置元素的 geohash 值。

geohash 语法格式如下：

GEOHASH key member [member ...]

## Redis Stream

- Redis Stream 是 Redis 5.0 版本新增加的数据结构。

Redis Stream 主要用于**消息队列（MQ，Message Queue）**，Redis 本身是有一个 Redis 发布订阅 (pub/sub) 来实现消息队列的功能，但它有个缺点就是消息无法持久化，如果出现网络断开、Redis 宕机等，消息就会被丢弃。

简单来说发布订阅 (pub/sub) 可以分发消息，但无法记录历史消息。

而 **Redis Stream 提供了消息的持久化和主备复制功能**，可以让任何客户端访问任何时刻的数据，并且能记住每一个客户端的访问位置，还能保证消息不丢失。

Redis Stream 的结构如下所示，它有一个消息链表，将所有加入的消息都串起来，每个消息都有一个唯一的 ID 和对应的内容：

![img](https://www.runoob.com/wp-content/uploads/2020/09/en-us_image_0167982791.png)

- 每个 Stream 都有唯一的名称，它就是 Redis 的 key，在我们首次使用 xadd 指令追加消息时自动创建。

上图解析：

Consumer Group ：消费组，使用 XGROUP CREATE 命令创建，一个消费组有多个消费者(Consumer)。
last_delivered_id ：游标，每个消费组会有个游标 last_delivered_id，任意一个消费者读取了消息都会使游标 last_delivered_id 往前移动。
pending_ids ：消费者(Consumer)的状态变量，作用是维护消费者的未确认的 id。 pending_ids 记录了当前已经被客户端读取的消息，但是还没有 ack (Acknowledge character：确认字符）。

消息队列相关命令：

XADD - 添加消息到末尾
XTRIM - 对流进行修剪，限制长度
XDEL - 删除消息
XLEN - 获取流包含的元素数量，即消息长度
XRANGE - 获取消息列表，会自动过滤已经删除的消息
XREVRANGE - 反向获取消息列表，ID 从大到小
XREAD - 以阻塞或非阻塞方式获取消息列表
消费者组相关命令：

XGROUP CREATE - 创建消费者组
XREADGROUP GROUP - 读取消费者组中的消息
XACK - 将消息标记为"已处理"
XGROUP SETID - 为消费者组设置新的最后递送消息ID
XGROUP DELCONSUMER - 删除消费者
XGROUP DESTROY - 删除消费者组
XPENDING - 显示待处理消息的相关信息
XCLAIM - 转移消息的归属权
XINFO - 查看流和消费者组的相关信息；
XINFO GROUPS - 打印消费者组的信息；
XINFO STREAM - 打印流信息

- XADD

	- 使用 XADD 向队列添加消息，如果指定的队列不存在，则创建一个队列，XADD 语法格式：

XADD key ID field value [field value ...]
key ：队列名称，如果不存在就创建
ID ：消息 id，我们使用 * 表示由 redis 生成，可以自定义，但是要自己保证递增性。
field value ： 记录。
	- XADD mystream * name Sara surname OConnor

		- XADD mystream * field1 value1 field2 value2 field3 value3
	
			- XLEN mystream
	
				- XRANGE mystream - +

- XTRIM

	- 使用 XTRIM 对流进行修剪，限制长度， 语法格式：

XTRIM key MAXLEN [~] count
key ：队列名称
MAXLEN ：长度
count ：数量
	- XADD mystream * field1 A field2 B field3 C field4 D

		- XTRIM mystream MAXLEN 2
	
			- XRANGE mystream - +

- XDEL

	- 使用 XDEL 删除消息，语法格式：

XDEL key ID [ID ...]
key：队列名称
ID ：消息 ID
使用 XDEL 删除消息，语法格式：

- XLEN

	- 使用 XLEN 获取流包含的元素数量，即消息长度，语法格式：

XLEN key
key：队列名称
	- XADD mystream * item 1

		- XLEN mystream

- XRANGE

	- 使用 XRANGE 获取消息列表，会自动过滤已经删除的消息 ，语法格式：

XRANGE key start end [COUNT count]
key ：队列名
start ：开始值， - 表示最小值
end ：结束值， + 表示最大值
count ：数量
	- XADD writers * name Ngozi surname Adichie

		- XLEN writers
	
			- XRANGE writers - + COUNT 2

- XREVRANGE

	- 使用 XREVRANGE 获取消息列表，会自动过滤已经删除的消息 ，语法格式：

XREVRANGE key end start [COUNT count]
key ：队列名
end ：结束值， + 表示最大值
start ：开始值， - 表示最小值
count ：数量
	- XADD writers * name Virginia surname Woolf

		- XLEN writers
	
			- XREVRANGE writers + - COUNT 1

- XREAD

	- 使用 XREAD 以阻塞或非阻塞方式获取消息列表 ，语法格式：

XREAD [COUNT count] [BLOCK milliseconds] STREAMS key [key ...] id [id ...]
count ：数量
milliseconds ：可选，阻塞毫秒数，没有设置就是非阻塞模式
key ：队列名
id ：消息 ID
	- # 从 Stream 头部读取两条消息

> XREAD COUNT 2 STREAMS mystream writers 0-0 0-0

- XGROUP CREATE

	- 使用 XGROUP CREATE 创建消费者组，语法格式：

XGROUP [CREATE key groupname id-or-$] [SETID key groupname id-or-$] [DESTROY key groupname] [DELCONSUMER key groupname consumername]
key ：队列名称，如果不存在就创建
groupname ：组名。
$ ： 表示从尾部开始消费，只接受新消息，当前 Stream 消息会全部忽略。
从头开始消费:

XGROUP CREATE mystream consumer-group-name 0-0  
从尾部开始消费:

XGROUP CREATE mystream consumer-group-name $

- XREADGROUP GROUP

	- 使用 XREADGROUP GROUP 读取消费组中的消息，语法格式：

XREADGROUP GROUP group consumer [COUNT count] [BLOCK milliseconds] [NOACK] STREAMS key [key ...] ID [ID ...]
group ：消费组名
consumer ：消费者名。
count ： 读取数量。
milliseconds ： 阻塞毫秒数。
key ： 队列名。
ID ： 消息 ID。
XREADGROUP GROUP consumer-group-name consumer-name COUNT 1 STREAMS mystream >

# Redis 高级教程

## Redis主从复制

### 概念 

主从复制，是指将一台Redis服务器的数据，复制到其他的Redis服务器。前者称为主节点 (master/leader)，后者称为从节点(slave/follower)；数据的复制是单向的，只能由主节点到从节点。 Master以写为主，Slave 以读为主。 默认情况下，每台Redis服务器都是主节点； 且一个主节点可以有多个从节点(或没有从节点)，但一个从节点只能有一个主节点。

### 主从复制的作用： 

1、数据冗余：主从复制实现了数据的**热备份**，是持久化之外的一种数据冗余方式。

 2、故障恢复：当主节点出现问题时，可以由从节点提供服务，实现快速的故障恢复；实际上是一种服务 的冗余。 

3、负载均衡：在主从复制的基础上，配合**读写分离**，可以由主节点提供写服务，由从节点提供读服务 （即写Redis数据时应用连接主节点，读Redis数据时应用连接从节点），分担服务器负载；尤其是在写 少读多的场景下，通过多个从节点分担读负载，可以大大提高Redis服务器的并发量。

 4、高可用（集群）基石：除了上述作用以外，主从复制还是哨兵和集群能够实施的基础，因此说主从复制是**Redis高可用的基础**。 

**一般来说，要将Redis运用于工程项目中，只使用一台Redis是万万不能的（宕机），原因如下：** 

1、从结构上，单个Redis服务器会发生单点故障，并且一台服务器需要处理所有的请求负载，压力较大； 

2、从容量上，单个Redis服务器内存容量有限，就算一台Redis服务器内存容量为256G，也不能将所有 内存用作Redis存储内存，一般来说，单台Redis最大使用内存不应该超过20G。 电商网站上的商品，一般都是一次上传，无数次浏览的，说专业点也就是"多读少写"。 对于这种场景，我们可以使如下这种架构：

<img src="http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210712141739520.png" alt="image-20210712141739520" style="zoom: 80%;" />

主从复制，读写分离！ 80% 的情况下都是在进行读操作！减缓服务器的压力！架构中经常使用！ 一主二从！ 只要在公司中，主从复制就是必须要使用的，因为在真实的项目中不可能单机使用Redis！

### 环境配置

只配置从库，不用配置主库！

```bash
127.0.0.1:6379> info replication # 查看当前库的信息
# Replication
role:master # 角色 master
connected_slaves:0 # 没有从机
master_replid:b63c90e6c501143759cb0e7f450bd1eb0c70882a
master_replid2:0000000000000000000000000000000000000000
master_repl_offset:0
second_repl_offset:-1
repl_backlog_active:0
repl_backlog_size:1048576
repl_backlog_first_byte_offset:0
repl_backlog_histlen:0
```

复制3个配置文件，然后修改对应的信息 1、端口 2、pid 名字 3、log文件名字 4、dump.rdb 名字 修改完毕之后，启动我们的3个redis服务器，可以通过进程信息查看！

## 一主二从

 SLAVEOF 127.0.0.1 6379 # SLAVEOF host 6379 找谁当自己的老大！

```bash
默认情况下，每台Redis服务器都是主节点； 我们一般情况下只用配置从机就好了！
认老大！ 一主 （79）二从（80，81）
127.0.0.1:6379> info replication # 查看当前库的信息
# Replication
role:master # 角色 master
connected_slaves:0 # 没有从机
master_replid:b63c90e6c501143759cb0e7f450bd1eb0c70882a
master_replid2:0000000000000000000000000000000000000000
master_repl_offset:0
second_repl_offset:-1
repl_backlog_active:0
repl_backlog_size:1048576
repl_backlog_first_byte_offset:0
repl_backlog_histlen:0
127.0.0.1:6380> SLAVEOF 127.0.0.1 6379 # SLAVEOF host 6379 找谁当自己的老大！
OK
127.0.0.1:6380> info replication
# Replication
role:slave # 当前角色是从机
master_host:127.0.0.1 # 可以的看到主机的信息
master_port:6379
master_link_status:up
master_last_io_seconds_ago:3
master_sync_in_progress:0
slave_repl_offset:14
slave_priority:100
slave_read_only:1
connected_slaves:0
master_replid:a81be8dd257636b2d3e7a9f595e69d73ff03774e
master_replid2:0000000000000000000000000000000000000000
master_repl_offset:14
second_repl_offset:-1
repl_backlog_active:1
repl_backlog_size:1048576
repl_backlog_first_byte_offset:1
repl_backlog_histlen:14
# 在主机中查看！
127.0.0.1:6379> info replication
# Replication
role:master
connected_slaves:1 # 多了从机的配置
slave0:ip=127.0.0.1,port=6380,state=online,offset=42,lag=1 # 多了从机的配置
master_replid:a81be8dd257636b2d3e7a9f595e69d73ff03774e
master_replid2:0000000000000000000000000000000000000000
master_repl_offset:42
second_repl_offset:-1
repl_backlog_active:1
repl_backlog_size:1048576
repl_backlog_first_byte_offset:1
repl_backlog_histlen:42
如果两个都配置完了，就是有两个从机的
真实的从主配置应该在配置文件中配置，这样的话是永久的，我们这里使用的是命令，暂时的！
```

### 细节

主机可以写，从机不能写只能读！主机中的所有信息和数据，都会自动被从机保存！ 

测试：主机断开连接，从机依旧连接到主机的，但是没有写操作，这个时候，主机如果回来了，从机依旧可以直接获取到主机写的信息！ 如果是使用命令行，来配置的主从，这个时候如果重启了，就会变回主机！只要变为从机，立马就会从主机中获取值！

### 复制原理

Slave 启动成功连接到 master 后会发送一个sync同步命令 Master 接到命令，启动后台的存盘进程，同时收集所有接收到的用于修改数据集命令，在后台进程执行 完毕之后，master将传送整个数据文件到slave，并完成一次完全同步。 全量复制：而slave服务在接收到数据库文件数据后，将其存盘并加载到内存中。 增量复制：Master 继续将新的所有收集到的修改命令依次传给slave，完成同步 但是只要是重新连接master，一次完全同步（全量复制）将被自动执行！ 我们的数据一定可以在从机中 看到！

### 层层链路

上一个M链接下一个 S！这时候也可以完成我们的主从复制！如果没有老大了，这个时候能不能选择一个老大出来呢？ 手动！谋朝篡位 如果主机断开了连接，我们可以使用 SLAVEOF no one 让自己变成主机！其他的节点就可以手动连 接到最新的这个主节点（手动）！如果这个时候老大修复了，那就重新连接！

![image-20210712142049947](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210712142049947.png)

## 哨兵模式

### 概述 

（自动选举老大的模式） 主从切换技术的方法是：当主服务器宕机后，需要手动把一台从服务器切换为主服务器，这就需要人工干预，费事费力，还会造成一段时间内服务不可用。这不是一种推荐的方式，更多时候，我们优先考虑 哨兵模式。Redis从2.8开始正式提供了Sentinel（哨兵） 架构来解决这个问题。 谋朝篡位的自动版，能够后台监控主机是否故障，如果故障了根据投票数自动将从库转换为主库。 哨兵模式是一种特殊的模式，首先Redis提供了哨兵的命令，哨兵是一个独立的进程，作为进程，它会独 立运行。其原理是哨兵通过发送命令，等待Redis服务器响应，从而监控运行的多个Redis实例。

**这里的哨兵有两个作用** 

通过发送命令，让Redis服务器返回**监控其运行状态**，包括主服务器和从服务器。 当哨兵监测到master宕机，会自动将slave切换成master，然后通过发布订阅模式通知其他的从服 务器，修改配置文件，让它们切换主机。 然而一个哨兵进程对Redis服务器进行监控，可能会出现问题，为此，我们可以使用多个哨兵进行监控。 各个**哨兵之间还会进行监控**，这样就形成了多哨兵模式。

假设主服务器宕机，哨兵1先检测到这个结果，系统并**不会马上**进行failover过程，仅仅是哨兵1主观的认 为主服务器不可用，这个现象成为**主观下线**。当后面的哨兵也检测到主服务器不可用，并且**数量达到一 定值**时，那么哨兵之间就会进行一次**投票**，投票的结果由一个哨兵发起，进行failover[故障转移]操作。 切换成功后，就会通过发布订阅模式，让各个哨兵把自己监控的从服务器实现切换主机，这个过程称为 **客观下线**。

![image-20210712142213507](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210712142213507.png)

### 测试

我们目前的状态是 一主二从！ 

1、配置哨兵配置文件 sentinel.conf

```
# sentinel monitor 被监控的名称 host port 1
sentinel monitor myredis 127.0.0.1 6379 1
```

后面的这个数字1，代表主机挂了，slave投票看让谁接替成为主机，票数最多的，就会成为主机！

2、启动哨兵！

```
[root@xiaobai bin]# redis-sentinel kconfig/sentinel.conf
26607:X 31 Mar 2020 21:13:10.027 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
26607:X 31 Mar 2020 21:13:10.027 # Redis version=5.0.8, bits=64,
commit=00000000, modified=0, pid=26607, just started
26607:X 31 Mar 2020 21:13:10.027 # Configuration loaded
_._
_.-``__ ''-._
_.-`` `. `_. ''-._ Redis 5.0.8 (00000000/0) 64 bit
.-`` .-```. ```\/ _.,_ ''-._
( ' , .-` | `, ) Running in sentinel mode
|`-._`-...-` __...-.``-._|'` _.-'| Port: 26379
| `-._ `._ / _.-' | PID: 26607
`-._ `-._ `-./ _.-' _.-'
|`-._`-._ `-.__.-' _.-'_.-'|
| `-._`-._ _.-'_.-' | http://redis.io
`-._ `-._`-.__.-'_.-' _.-'
|`-._`-._ `-.__.-' _.-'_.-'|
| `-._`-._ _.-'_.-' |
`-._ `-._`-.__.-'_.-' _.-'
`-._ `-.__.-' _.-'
`-._ _.-'
`-.__.-'
26607:X 31 Mar 2020 21:13:10.029 # WARNING: The TCP backlog setting of 511
cannot be enforced because /proc/sys/net/core/somaxconn is set to the lower value
of 128.
26607:X 31 Mar 2020 21:13:10.031 # Sentinel ID is
4c780da7e22d2aebe3bc20c333746f202ce72996
26607:X 31 Mar 2020 21:13:10.031 # +monitor master myredis 127.0.0.1 6379 quorum
1
26607:X 31 Mar 2020 21:13:10.031 * +slave slave 127.0.0.1:6380 127.0.0.1 6380 @
myredis 127.0.0.1 6379
26607:X 31 Mar 2020 21:13:10.033 * +slave slave 127.0.0.1:6381 127.0.0.1 6381 @
myredis 127.0.0.1 6379
```

如果Master 节点断开了，这个时候就会从从机中随机选择一个服务器！ （这里面有一个投票算法！）

![image-20210712142408509](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210712142408509.png)

### 哨兵模式 

#### 优点： 

1、哨兵集群，基于主从复制模式，所有的主从配置优点，它全有 

2、 主从可以切换，故障可以转移，系统的可用性就会更好 3、哨兵模式就是主从模式的升级，手动到自动，更加健壮！ 

#### 缺点： 

1、Redis 不好啊在线扩容的，集群容量一旦到达上限，在线扩容就十分麻烦！

 2、实现哨兵模式的配置其实是很麻烦的，里面有很多选择！ 哨兵模式的全部配置！

```
# Example sentinel.conf
# 哨兵sentinel实例运行的端口 默认26379
port 26379
# 哨兵sentinel的工作目录
dir /tmp
# 哨兵sentinel监控的redis主节点的 ip port
# master-name 可以自己命名的主节点名字 只能由字母A-z、数字0-9 、这三个字符".-_"组成。
# quorum 配置多少个sentinel哨兵统一认为master主节点失联 那么这时客观上认为主节点失联了
# sentinel monitor \<master-name> \<ip> \<redis-port> \<quorum>
sentinel monitor mymaster 127.0.0.1 6379 2
# 当在Redis实例中开启了requirepass foobared 授权密码 这样所有连接Redis实例的客户端都要提供
密码
# 设置哨兵sentinel 连接主从的密码 注意必须为主从设置一样的验证密码
# sentinel auth-pass \<master-name> \<password>
sentinel auth-pass mymaster MySUPER--secret-0123passw0rd
# 指定多少毫秒之后 主节点没有应答哨兵sentinel 此时 哨兵主观上认为主节点下线 默认30秒
# sentinel down-after-milliseconds \<master-name> \<milliseconds>
sentinel down-after-milliseconds mymaster 30000
# 这个配置项指定了在发生failover主备切换时最多可以有多少个slave同时对新的master进行 同步，
这个数字越小，完成failover所需的时间就越长，
但是如果这个数字越大，就意味着越 多的slave因为replication而不可用。
可以通过将这个值设为 1 来保证每次只有一个slave 处于不能处理命令请求的状态。
# sentinel parallel-syncs \<master-name> \<numslaves>
sentinel parallel-syncs mymaster 1
# 故障转移的超时时间 failover-timeout 可以用在以下这些方面：
#1. 同一个sentinel对同一个master两次failover之间的间隔时间。
#2. 当一个slave从一个错误的master那里同步数据开始计算时间。直到slave被纠正为向正确的master那
里同步数据时。
#3.当想要取消一个正在进行的failover所需要的时间。
#4.当进行failover时，配置所有slaves指向新的master所需的最大时间。不过，即使过了这个超时，
slaves依然会被正确配置为指向master，但是就不按parallel-syncs所配置的规则来了
# 默认三分钟
# sentinel failover-timeout \<master-name> \<milliseconds>
sentinel failover-timeout mymaster 180000
# SCRIPTS EXECUTION
#配置当某一事件发生时所需要执行的脚本，可以通过脚本来通知管理员，例如当系统运行不正常时发邮件通知
相关人员。
#对于脚本的运行结果有以下规则：
#若脚本执行后返回1，那么该脚本稍后将会被再次执行，重复次数目前默认为10
#若脚本执行后返回2，或者比2更高的一个返回值，脚本将不会重复执行。
#如果脚本在执行过程中由于收到系统中断信号被终止了，则同返回值为1时的行为相同。
#一个脚本的最大执行时间为60s，如果超过这个时间，脚本将会被一个SIGKILL信号终止，之后重新执行。
#通知型脚本:当sentinel有任何警告级别的事件发生时（比如说redis实例的主观失效和客观失效等等），
将会去调用这个脚本，这时这个脚本应该通过邮件，SMS等方式去通知系统管理员关于系统不正常运行的信
息。调用该脚本时，将传给脚本两个参数，一个是事件的类型，一个是事件的描述。如果sentinel.conf配
置文件中配置了这个脚本路径，那么必须保证这个脚本存在于这个路径，并且是可执行的，否则sentinel无
法正常启动成功。
#通知脚本
# shell编程
# sentinel notification-script \<master-name> \<script-path>
sentinel notification-script mymaster /var/redis/notify.sh
# 客户端重新配置主节点参数脚本
# 当一个master由于failover而发生改变时，这个脚本将会被调用，通知相关的客户端关于master地址已
经发生改变的信息。
# 以下参数将会在调用脚本时传给脚本:
# \<master-name> \<role> \<state> \<from-ip> \<from-port> \<to-ip> \<to-port>
# 目前\<state>总是“failover”,
# \<role>是“leader”或者“observer”中的一个。
# 参数 from-ip, from-port, to-ip, to-port是用来和旧的master和新的master(即旧的slave)通
信的
# 这个脚本应该是通用的，能被多次调用，不是针对性的。
# sentinel client-reconfig-script \<master-name> \<script-path>
sentinel client-reconfig-script mymaster /var/redis/reconfig.sh # 一般都是由运维来配
置！

```

## Redis缓存穿透和雪崩

服务的高可用问题！

 在这里我们不会详细的区分析解决方案的底层！ Redis缓存的使用，极大的提升了应用程序的性能和效率，特别是数据查询方面。但同时，它也带来了一 些问题。其中，最要害的问题，就是数据的一致性问题，从严格意义上讲，这个问题无解。如果对数据 的一致性要求很高，那么就不能使用缓存。 另外的一些典型问题就是，缓存穿透、缓存雪崩和缓存击穿。目前，业界也都有比较流行的解决方案。

![image-20210712142553323](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210712142553323.png)

### 缓存穿透（查不到） 

#### 概念 

**【查不到的数据去查数据库】**缓存穿透的概念很简单，用户想要查询一个数据，发现redis内存数据库没有，也就是缓存没有命中，于是向持久层数据库查询。发现也没有，于是本次查询失败。当用户很多的时候，缓存都没有命中（秒杀），于是都去请求了持久层数据库。这会给持久层数据库造成很大的压力，这时候就相当于出现了缓存穿透。 

#### 解决方案 

##### 布隆过滤器 

布隆过滤器是一种数据结构，对所有可能查询的参数以hash形式存储，在控制层先进行校验，不符合则丢弃，从而避免了对底层存储系统的查询压力；

![image-20210712142640468](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210712142640468.png)

##### 缓存空对象

当存储层不命中后，即使返回的空对象也将其缓存起来，同时会设置一个过期时间，之后再访问这个数 据将会从缓存中获取，保护了后端数据源；

但是这种方法会存在两个问题： 1、如果空值能够被缓存起来，这就意味着缓存需要更多的空间存储更多的键，因为这当中可能会有很多 的空值的键； 2、即使对空值设置了过期时间，还是会存在缓存层和存储层的数据会有一段时间窗口的不一致，这对于需要保持一致性的业务会有影响。

#### 解决：

查询前先做规则校验，不合法的数据直接**拦截返回**
查询数据库没有数据也写一个 **NULL 值**到缓存里面并设置一个过期时间(不要超过1分钟，避免正常情况下也不能使用)，下一次查询在缓存失效前就能命中缓存直接返回
使用**布隆过滤器**，利用高效的数据结构和算法快速**判断出这个 Key 是否在数据库中存在**（需要提前将数据库所有数据放入到布隆过滤器的集合上，且布隆过滤器最大缺点就是无法删除数据。替换方案：布谷鸟过滤器）

### 缓存击穿（查崩了）

##### 概述 

**【过频繁访问热点数据】**这里需要注意和缓存击穿的区别，缓存击穿，是指一个key非常热点，在不停的扛着大并发，大并发集中 对这一个点进行访问，当这个key在失效的瞬间，持续的大并发就穿破缓存，直接请求数据库，就像在一 个屏障上凿开了一个洞。 当某个key在过期的瞬间，有大量的请求并发访问，这类数据一般是热点数据，由于缓存过期，会同时访 问数据库来查询最新数据，并且回写缓存，会导使数据库瞬间压力过大。 

##### 解决方案 

###### 设置热点数据永不过期 

从缓存层面来看，没有设置过期时间，所以不会出现热点 key 过期后产生的问题。

######  加互斥锁 

分布式锁：使用分布式锁，保证对于每个key同时只有一个线程去查询后端服务，其他线程没有获得分布式锁的权限，因此只需要等待即可。这种方式将高并发的压力转移到了分布式锁，因此对分布式锁的考验很大。

##### 解决：

1. 热点数据可以设置**永不过期**
2. 增加**分布式锁**，等待抢到锁的请求构建完缓存后再释放锁。其他未抢到锁的请求进行阻塞等待，被唤醒后重新请求缓存获取数据

### 缓存雪崩（一片蹦）

#### 概念 

**【大量失效】**缓存雪崩，是指在某一个时间段，**缓存集中过期失效。Redis 宕机**！ 产生雪崩的原因之一，比如在写本文的时候，马上就要到双十二零点，很快就会迎来一波抢购，这波商品时间比较集中的放入了缓存，假设缓存一个小时。那么到了凌晨一点钟的时候，这批商品的缓存就都过期了。而对这批商品的访问查询，都落到了数据库上，对于数据库而言，就会产生周期性的压力波峰。于是所有的请求都会达到存储层，存储层的调用量会暴增，造成存储层也会挂掉的情况。

![image-20210712143014357](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210712143014357.png)

其实集中过期，倒不是非常致命，比较致命的缓存雪崩，是缓存服务器某个节点宕机或断网。因为自然 形成的缓存雪崩，一定是在某个时间段集中创建缓存，这个时候，数据库也是可以顶住压力的。无非就 是对数据库产生周期性的压力而已。而缓存服务节点的宕机，对数据库服务器造成的压力是不可预知 的，很有可能瞬间就把数据库压垮。 

#### 解决方案

redis高可用 这个思想的含义是，既然redis有可能挂掉，那我多增设几台redis，这样一台挂掉之后其他的还可以继续 工作，其实就是搭建的集群。（异地多活！） 限流降级（在SpringCloud讲解过！） 这个解决方案的思想是，在缓存失效后，通过加锁或者队列来控制读数据库写缓存的线程数量。比如对 某个key只允许一个线程查询数据和写缓存，其他线程等待。 数据预热 数据加热的含义就是在正式部署之前，我先把可能的数据先预先访问一遍，这样部分可能大量访问的数 据就会加载到缓存中。在即将发生大并发访问前手动触发加载缓存不同的key，设置不同的过期时间，让 缓存失效的时间点尽量均匀。

解决：

1. 设置**随机过期**时间，避免同一时间大面积失效
2. 如果是**集群部署**，将热点数据均匀分布在不同的 Redis 库上避免全部失效
3. 设置**热点数据永不过期**，有更新缓存
4. 对源服务访问进行**限流、资源隔离（熔断）、降级**等
5. 如果是时点数据，可以进行**预加载**。等时点达到后，进行切换

## Redis持久化 

面试和工作，持久化都是重点！ Redis 是内存数据库，如果不将内存中的数据库状态保存到磁盘，那么一旦服务器进程退出，服务器中 的数据库状态也会消失。所以 Redis 提供了持久化功能！

###  RDB**（Redis DataBase）** 

什么是RDB ：在主从复制中，rdb就是备用了！从机上面！

![image-20210709185020200](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210709185020200.png)

在**指定的时间间隔内将内存中的数据集快照写入磁盘**，也就是行话讲的**Snapshot快照**，它恢复时是将快照文件直接读到内存里。

Redis会单独创建（fork）一个子进程来进行持久化，会先将数据写入到一个临时文件中，待持久化过程
都结束了，再用这个临时文件替换上次持久化好的文件。整个过程中，主进程是不进行任何IO操作的。
这就确保了极高的性能。如果需要进行**大规模数据的恢复，且对于数据恢复的完整性不是非常敏感**，那
RDB方式要比AOF方式更加的高效。RDB的**缺点**是最后一次持久化后的**数据可能丢失**。我们**默认**的就是
RDB，一般情况下不需要修改这个配置！
有时候在生产环境我们会将这个文件进行备份！
rdb保存的文件是dump.rdb 都是在我们的配置文件中快照中进行配置的！

![image-20210709185138765](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210709185138765.png)

#### 触发机制

1、**save的规则**满足的情况下，会自动触发rdb规则 

2、执行 **flushall** 命令，也会触发我们的rdb规则！

3、**退出redis**，也会产生 rdb 文件！ 备份就自动生成一个 dump.rdb

![image-20210709185310501](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210709185310501.png)

#### 如何恢复rdb文件

1、只需要将**rdb文件放在我们redis启动目录**就可以，redis启动的时候会自动检查dump.rdb 恢复其中 的数据！ 

2、查看需要存在的位置 几乎就他自己默认的配置就够用了，但是我们还是需要去学习！ 

**RDB优点： 1、适合大规模的数据恢复！ 2、对数据的完整性要不高！** 

**RDB缺点： 1、需要一定的时间间隔进程操作！如果redis意外宕机了，这个最后一次修改数据就没有的了！ 2、fork进程的时候，会占用一定的内容空间！！** 

### AOF**（Append Only File）**

 将我们的**所有命令都记录下来**，history，恢复的时候就把这个文件**全部在执行一遍**！ 是什么 127.0.0.1:6379> config get dir 1) "dir" 2) "/usr/local/bin" # 如果在这个目录下存在 dump.rdb 文件，启动就会自动恢复其中的数据

![image-20210709185507107](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210709185507107.png)

以**日志的形式来记录**每个**写**操作，将Redis执行过的所有指令记录下来（读操作不记录）**，只许追加文件 但不可以改写文件**，redis启动之初会读取该文件重新构建数据，换言之，redis重启的话就根据日志文件 的内容将写指令从前到后执行一次以完成数据的恢复工作 

Aof保存的是 **appendonly.aof** 文件

![image-20210709185553806](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210709185553806.png)

默认是不开启的，我们需要手动进行配置！我们只需要将 **appendonly 改为yes**就开启了 aof！ 再重启redis 就可以生效了！

 如果这个 aof 文件有错位，这时候 redis 是启动不起来的吗，我们需要修复这个aof文件 redis 给我们提供了一个工具 redis-check-aof --fix

aof 默认就是文件的无限追加，文件会越来越大！

如果 aof 文件大于 64m，太大了！ fork一个新的进程来将我们的文件进行重写！

![image-20210709185718957](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210709185718957.png)

#### 优点和缺点！

```
appendonly no # 默认是不开启aof模式的，默认是使用rdb方式持久化的，在大部分所有的情况下，rdb完全够用！
appendfilename "appendonly.aof" # 持久化的文件的名字
# appendfsync always # 每次修改都会 sync。消耗性能
appendfsync everysec # 每秒执行一次 sync，可能会丢失这1s的数据！
# appendfsync no # 不执行 sync，这个时候操作系统自己同步数据，速度最快！
# rewrite 重写，
```

**AOF优点： 1、每一次修改都同步，文件的完整会更加好！ 2、每秒同步一次，可能会丢失一秒的数据 3、从不同步，效率最高的！** 

**AOF缺点： 1、相对于数据文件来说，aof远远大于 rdb，修复的速度也比 rdb慢！ 2、Aof 运行效率也要比 rdb 慢，所以我们redis默认的配置就是rdb持久化！** 

扩展： 

1、RDB 持久化方式能够在指定的时间间隔内对你的数据进行快照存储 

2、AOF 持久化方式记录每次对服务器写的操作，当服务器重启的时候会重新执行这些命令来恢复原始 的数据，AOF命令以Redis 协议追加保存每次写的操作到文件末尾，Redis还能对AOF文件进行**后台重写**，使得AOF文件的体积不至于过大。 

3、只做缓存，如果你只希望你的数据在服务器运行的时候存在，你也可以不使用任何持久化 

4、同时开启两种持久化方式 在这种情况下，当redis重启的时候会**优先载入AOF**文件来恢复原始的数据，因为在通常情况下AOF 文件保存的数据集要比RDB文件保存的数据集**要完整**。 RDB 的数据不实时，同时使用两者时服务器重启也只会找AOF文件，那要不要只使用AOF呢？作者 建议不要，因为RDB更适合用于备份数据库（AOF在不断变化不好备份），快速重启，而且不会有 AOF可能潜在的Bug，留着作为一个万一的手段。

 5、性能建议 因为RDB文件只用作后备用途，**建议只在Slave上持久化RDB文件**，而且只要**15分钟**备份一次就够 了，只保留 save 900 1 这条规则。 如果Enable AOF ，好处是在最恶劣情况下也只会丢失不超过两秒数据，启动脚本较简单只load自 己的AOF文件就可以了，代价一是带来了持续的IO，二是AOF rewrite 的最后将 rewrite 过程中产 生的新数据写到新文件造成的阻塞几乎是不可避免的。只要硬盘许可，应该尽量减少AOF rewrite 的频率，AOF重写的基础大小默认值64M太小了，可以设到5G以上，默认超过原大小100%大小重 写可以改到适当的数值。 如果不Enable AOF ，仅靠 Master-Slave Repllcation 实现高可用性也可以，能省掉一大笔IO，也减少了rewrite时带来的系统波动。代价是如果Master/Slave 同时倒掉，会丢失十几分钟的数据， 启动脚本也要比较两个 Master/Slave 中的 RDB文件，载入较新的那个，微博就是这种架构。

![image-20210709190052864](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210709190052864.png)

#### 命令

![image-20210709190909839](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210709190909839.png)

```
测试
订阅端：
127.0.0.1:6379> SUBSCRIBE xiaobaishuo # 订阅一个频道 xiaobaishuo
Reading messages... (press Ctrl-C to quit)
1) "subscribe"
2) "xiaobaishuo"
3) (integer) 1
# 等待读取推送的信息
1) "message" # 消息
2) "xiaobaishuo" # 那个频道的消息
3) "hello,xiaobai" # 消息的具体内容
1) "message"
2) "xiaobaishuo"
3) "hello,redis"
发送端：
127.0.0.1:6379> PUBLISH xiaobaishuo "hello,xiaobai" # 发布者发布消息到频道！
(integer) 1
127.0.0.1:6379> PUBLISH xiaobaishuo "hello,redis" # 发布者发布消息到频道！
(integer) 1
127.0.0.1:6379>
```

原理
Redis是使用C实现的，通过分析 Redis 源码里的 pubsub.c 文件，了解发布和订阅机制的底层实现，借此加深对 Redis 的理解。

Redis 通过 PUBLISH 、SUBSCRIBE 和 PSUBSCRIBE 等命令实现发布和订阅功能。

 微信： 通过 SUBSCRIBE 命令订阅某频道后，redis-server 里维护了一个字典，字典的键就是一个个 频道！， 而字典的值则是一个链表，链表中保存了所有订阅这个 channel 的客户端。SUBSCRIBE 命令的关键， 就是将客户端添加到给定 channel 的订阅链表中。

Pub/Sub 从字面上理解就是发布（Publish）与订阅（Subscribe），在Redis中，你可以设定对某一个 key值进行消息发布及消息订阅，当一个key值上进行了消息发布后，所有订阅它的客户端都会收到相应 的消息。这一功能最明显的用法就是用作实时消息系统，比如普通的即时聊天，群聊等功能。

 使用场景： 

1、实时消息系统！ 

2、事实聊天！（频道当做聊天室，将信息回显给所有人即可！） 

3、订阅，关注系统都是可以的！ 稍微复杂的场景我们就会使用 消息中间件 MQ （）

## Redis 数据淘汰策略

**redis 提供 6种数据淘汰策略：**

1. voltile-lru：voltile（挥发性的）从已设置过期时间的数据集（server.db[i].expires）中挑选**最近最少使用**的数据淘汰
2. volatile-ttl：(Time to Live)从已设置过期时间的数据集（server.db[i].expires）中挑选**将要过期**的数据淘汰
3. volatile-random：从已设置过期时间的数据集（server.db[i].expires）中**任意**选择数据淘汰
4. allkeys-lru：从数据集（server.db[i].dict）中挑选**最近最少使用**的数据淘汰
5. allkeys-random：从数据集（server.db[i].dict）中**任意**选择数据淘汰
6. no-enviction（驱逐）：**禁止**驱逐数据

常用的淘汰算法：

1.FIFO：First In First Out，先进先出。判断被存储的时间，离目前最远的数据优先被淘汰。

2.LRU：Least Recently Used，最近最少使用。判断最近被使用的时间，目前最远的数据优先被淘汰。

3.LFU：Least Frequently Used，最不经常使用。在一段时间内，数据被使用次数最少的，优先被淘汰。

## [Redis保持数据库一致性](https://blog.csdn.net/xingduan5153/article/details/101475839)

### Cache Aside Pattern

最经典的缓存+数据库读写的模式，就是 Cache Aside Pattern。

- 读的时候，先读缓存，缓存没有的话，就读数据库，然后取出数据后放入缓存，同时返回响应。
- 更新的时候，**先更新数据库，然后再删除缓存**。

### 为什么是删除缓存，而不是更新缓存？

原因很简单，很多时候，在复杂点的缓存场景，缓存不单单是数据库中直接取出来的值。

比如可能更新了某个表的一个字段，然后其对应的缓存，是需要查询另外两个表的数据并进行运算，才能计算出缓存最新的值的。

另外更新缓存的代价有时候是很高的。是不是说，每次修改数据库的时候，都一定要将其对应的缓存更新一份？也许有的场景是这样，但是对于比较复杂的缓存数据计算的场景，就不是这样了。如果你频繁修改一个缓存涉及的多个表，缓存也频繁更新。但是问题在于，这个缓存到底会不会被频繁访问到？

举个栗子，一个缓存涉及的表的字段，在 1 分钟内就修改了 20 次，或者是 100 次，那么缓存更新 20 次、100 次；但是这个缓存在 1 分钟内只被读取了 1 次，有大量的冷数据。实际上，如果你只是删除缓存的话，那么在 1 分钟内，这个缓存不过就重新计算一次而已，开销大幅度降低。用到缓存才去算缓存。

其实删除缓存，而不是更新缓存，就是一个 lazy 计算的思想，不要每次都重新做复杂的计算，不管它会不会用到，而是让它到需要被使用的时候再重新计算。像 mybatis，hibernate，都有懒加载思想。查询一个部门，部门带了一个员工的 list，没有必要说每次查询部门，都把里面的 1000 个员工的数据也同时查出来啊。80% 的情况，查这个部门，就只是要访问这个部门的信息就可以了。先查部门，同时要访问里面的员工，那么这个时候只有在你要访问里面的员工的时候，才会去数据库里面查询 1000 个员工。

### 最初级的缓存不一致问题及解决方案

问题：先更新数据库，再删除缓存。如果删除缓存失败了，那么会导致数据库中是新数据，缓存中是旧数据，数据就出现了不一致。

![13465705-5a5fdf805529a914.png](http://rcy276gfy.hd-bkt.clouddn.com/work/0f77b3b7433edc214047cbfb698aa55c.png)


解决思路：先删除缓存，再更新数据库。如果数据库更新失败了，那么数据库中是旧数据，缓存中是空的，那么数据不会不一致。因为读的时候缓存没有，所以去读了数据库中的旧数据，然后更新到缓存中。

### 比较复杂的数据不一致问题分析

数据发生了变更，先删除了缓存，然后要去修改数据库，此时还没修改。一个请求过来，去读缓存，发现缓存空了，去查询数据库，查到了修改前的旧数据，放到了缓存中。随后数据变更的程序完成了数据库的修改。完了，数据库和缓存中的数据不一样了...

为什么上亿流量高并发场景下，缓存会出现这个问题？

只有在对一个数据在并发的进行读写的时候，才可能会出现这种问题。其实如果说你的并发量很低的话，特别是读并发很低，每天访问量就 1 万次，那么很少的情况下，会出现刚才描述的那种不一致的场景。但是问题是，如果每天的是上亿的流量，每秒并发读是几万，每秒只要有数据更新的请求，就可能会出现上述的数据库+缓存不一致的情况。

**解决方案如下：**

更新数据的时候，根据数据的唯一标识，将操作路由之后，发送到一个 jvm 内部队列中。读取数据的时候，如果发现数据不在缓存中，那么将重新读取数据+更新缓存的操作，根据唯一标识路由之后，也发送同一个 jvm 内部队列中。

一个队列对应一个工作线程，每个工作线程串行拿到对应的操作，然后一条一条的执行。这样的话，一个数据变更的操作，先删除缓存，然后再去更新数据库，但是还没完成更新。此时如果一个读请求过来，没有读到缓存，那么可以先将缓存更新的请求发送到队列中，此时会在队列中积压，然后同步等待缓存更新完成。

这里有一个优化点，一个队列中，其实多个更新缓存请求串在一起是没意义的，因此可以做过滤，如果发现队列中已经有一个更新缓存的请求了，那么就不用再放个更新请求操作进去了，直接等待前面的更新操作请求完成即可。

待那个队列对应的工作线程完成了上一个操作的数据库的修改之后，才会去执行下一个操作，也就是缓存更新的操作，此时会从数据库中读取最新的值，然后写入缓存中。

如果请求还在等待时间范围内，不断轮询发现可以取到值了，那么就直接返回；如果请求等待的时间超过一定时长，那么这一次直接从数据库中读取当前的旧值。

高并发的场景下，该解决方案要注意的问题：

读请求长时阻塞
由于读请求进行了非常轻度的异步化，所以一定要注意读超时的问题，每个读请求必须在超时时间范围内返回。

该解决方案，最大的风险点在于说，可能数据更新很频繁，导致队列中积压了大量更新操作在里面，然后读请求会发生大量的超时，最后导致大量的请求直接走数据库。务必通过一些模拟真实的测试，看看更新数据的频率是怎样的。

另外一点，因为一个队列中，可能会积压针对多个数据项的更新操作，因此需要根据自己的业务情况进行测试，可能需要部署多个服务，每个服务分摊一些数据的更新操作。如果一个内存队列里居然会挤压 100 个商品的库存修改操作，每个库存修改操作要耗费 10ms 去完成，那么最后一个商品的读请求，可能等待 10 * 100 = 1000ms = 1s 后，才能得到数据，这个时候就导致读请求的长时阻塞。

一定要做根据实际业务系统的运行情况，去进行一些压力测试，和模拟线上环境，去看看最繁忙的时候，内存队列可能会挤压多少更新操作，可能会导致最后一个更新操作对应的读请求，会 hang 多少时间，如果读请求在 200ms 返回，如果你计算过后，哪怕是最繁忙的时候，积压 10 个更新操作，最多等待 200ms，那还可以的。

如果一个内存队列中可能积压的更新操作特别多，那么你就要加机器，让每个机器上部署的服务实例处理更少的数据，那么每个内存队列中积压的更新操作就会越少。

其实根据之前的项目经验，一般来说，数据的写频率是很低的，因此实际上正常来说，在队列中积压的更新操作应该是很少的。像这种针对读高并发、读缓存架构的项目，一般来说写请求是非常少的，每秒的 QPS 能到几百就不错了。

我们来实际粗略测算一下。

如果一秒有 500 的写操作，如果分成 5 个时间片，每 200ms 就 100 个写操作，放到 20 个内存队列中，每个内存队列，可能就积压 5 个写操作。每个写操作性能测试后，一般是在 20ms 左右就完成，那么针对每个内存队列的数据的读请求，也就最多 hang 一会儿，200ms 以内肯定能返回了。

经过刚才简单的测算，我们知道，单机支撑的写 QPS 在几百是没问题的，如果写 QPS 扩大了 10 倍，那么就扩容机器，扩容 10 倍的机器，每个机器 20 个队列。

读请求并发量过高
这里还必须做好压力测试，确保恰巧碰上上述情况的时候，还有一个风险，就是突然间大量读请求会在几十毫秒的延时 hang 在服务上，看服务能不能扛的住，需要多少机器才能扛住最大的极限情况的峰值。

但是因为并不是所有的数据都在同一时间更新，缓存也不会同一时间失效，所以每次可能也就是少数数据的缓存失效了，然后那些数据对应的读请求过来，并发量应该也不会特别大。

多服务实例部署的请求路由
可能这个服务部署了多个实例，那么必须保证说，执行数据更新操作，以及执行缓存更新操作的请求，都通过 Nginx 服务器路由到相同的服务实例上。

比如说，对同一个商品的读写请求，全部路由到同一台机器上。可以自己去做服务间的按照某个请求参数的 hash 路由，也可以用 Nginx 的 hash 路由功能等等。

热点商品的路由问题，导致请求的倾斜
万一某个商品的读写请求特别高，全部打到相同的机器的相同的队列里面去了，可能会造成某台机器的压力过大。就是说，因为只有在商品数据更新的时候才会清空缓存，然后才会导致读写并发，所以其实要根据业务系统去看，如果更新频率不是太高的话，这个问题的影响并不是特别大，但是的确可能某些机器的负载会高一些。

## Session、Cookie、Redis缓存对比



## Redis 过期设置

EXPIRE key

 PERSIST key

## Redis 数据备份与恢复

- SAVE 该命令将在 redis 安装目录中创建dump.rdb文件。
- 如果需要恢复数据，只需将备份文件 (dump.rdb) 移动到 redis 安装目录并启动服务即可。获取 redis 目录可以使用 CONFIG 命令

	- CONFIG GET dir
	- 以上命令 CONFIG GET dir 输出的 redis 安装目录为 /usr/local/redis/bin。

- Bgsave

	- 创建 redis 备份文件也可以使用命令 BGSAVE，该命令在后台执行。

实例
127.0.0.1:6379> BGSAVE

Background saving started

## Redis 安全

- 通过 redis 的配置文件设置密码参数，这样客户端连接到 redis 服务就需要密码验证，这样可以让你的 redis 服务更安全。
- 查看是否设置了密码验证：
	CONFIG get requirepass默认情况下 requirepass 参数是空的，这就意味着你无需通过密码验证就可以连接到 redis 服务。

	- CONFIG set requirepass "runoob"

		- AUTH "runoob"

			- SET mykey "Test value"

				- GET mykey

## Redis 性能测试

- Redis 性能测试是通过同时执行多个命令实现的。

	- redis-benchmark [option] [option value]
	注意：该命令是在 redis 的目录下执行的，而不是 redis 客户端的内部指令
	- 以下实例同时执行 10000 个请求来检测性能：

redis-benchmark -n 10000  -q
	- redis 性能测试工具可选参数如下所示：

序号	选项	描述	默认值
1	-h	指定服务器主机名	127.0.0.1
2	-p	指定服务器端口	6379
3	-s	指定服务器 socket	
4	-c	指定并发连接数	50
5	-n	指定请求数	10000
6	-d	以字节的形式指定 SET/GET 值的数据大小	2
7	-k	1=keep alive 0=reconnect	1
8	-r	SET/GET/INCR 使用随机 key, SADD 使用随机值	
9	-P	通过管道传输 \<numreq> 请求	1
10	-q	强制退出 redis。仅显示 query/sec 值	
11	--csv	以 CSV 格式输出	
12	-l	生成循环，永久执行测试	
13	-t	仅运行以逗号分隔的测试命令列表。	
14	-I	Idle 模式。仅打开 N 个 idle 连接并等待。

		- redis-benchmark -h 127.0.0.1 -p 6379 -t set,lpush -n 10000 -q

## Redis 客户端连接

- Redis 通过监听一个 TCP 端口或者 Unix socket 的方式来接收来自客户端的连接，当一个连接建立后，Redis 内部会进行以下一些操作：

首先，客户端 socket 会被设置为非阻塞模式，因为 Redis 在网络事件处理上采用的是非阻塞多路复用模型。
然后为这个 socket 设置 TCP_NODELAY 属性，禁用 Nagle 算法
然后创建一个可读的文件事件用于监听这个客户端 socket 的数据发送
- 最大连接数

	- 在 Redis2.4 中，最大连接数是被直接硬编码在代码里面的，而在2.6版本中这个值变成可配置的。

maxclients 的默认值是 10000，你也可以在 redis.conf 中对这个值进行修改。

config get maxclients

- redis-server --maxclients 100000
	- S.N.	  命令	                         描述
	  1	CLIENT LIST	返回连接到 redis 服务的客户端列表
	  2	CLIENT SETNAME	设置当前连接的名称
	  3	CLIENT GETNAME	获取通过 CLIENT SETNAME 命令设置的服务名称
	  4	CLIENT PAUSE	挂起客户端连接，指定挂起的时间以毫秒计
	  5	CLIENT KILL	关闭客户端连接
	

## Redis管道技术

- Redis是一种基于客户端-服务端模型以及请求/响应协议的TCP服务。这意味着通常情况下一个请求会遵循以下步骤：

客户端向服务端发送一个查询请求，并监听套接字返回，通常以一对模式，等待服务端响应。
服务端处理命令，可以结果返回给客户端。

- Redis管道技术可以在服务端未响应时，客户端可以继续向服务端发送请求，并最终一次性读取所有服务端的响应。

- 查看redis管道，只需要启动redis实例并输入以下命令：

$（echo -en“ PING \ r \ n SET runoobkey redis \ r \ nGET runoobkey \ r \ nINCR访问者\ r \ nINCR访问者\ r \ nINCR访问者\ r \ n”；睡眠10）| 数控本地主机6379（echo - zh - cn “ PING \ r \ n SET redoobkey redis \ r \ nGET runoobkey \ r \ nINCR访问者\ r \ nINCR访问者\ r \ nINCR访问者\ r \ n” ；睡眠10 ）| 数控本地主机6379 

- 以上实例中我们通过使用PING命令查看redis服务是否可用，之后我们设置了runoobkey的变量redis，然后我们获取runoobkey的值并使其访客自增3次。

在返回的结果中我们可以看到这些命令一次性向redis服务提交，并最终一次性读取所有服务端的响应

- 管道技术的优势

	- 管道技术最显着的优势是提高了redis服务的性能。

## Redis 分区

- 分区是分割数据到多个Redis实例的处理过程，因此每个实例只保存key的一个子集。

分区的优势
通过利用多台计算机内存的和值，允许我们构造更大的数据库。
通过多核和多台计算机，允许我们扩展计算能力；通过多台计算机和网络适配器，允许我们扩展网络带宽。
分区的不足
redis的一些特性在分区方面表现的不是很好：

涉及多个key的操作通常是不被支持的。举例来说，当两个set映射到不同的redis实例上时，你就不能对这两个set执行交集操作。
涉及多个key的redis事务不能使用。
当使用分区时，数据处理较为复杂，比如你需要处理多个rdb/aof文件，并且从多个实例和主机备份持久化文件。
增加或删除容量也比较复杂。redis集群大多数支持在运行时增加、删除节点的透明数据平衡的能力，但是类似于客户端分区、代理等其他系统则不支持这项特性。然而，一种叫做presharding的技术对此是有帮助的。
分区类型
Redis 有两种类型分区。 假设有4个Redis实例 R0，R1，R2，R3，和类似user:1，user:2这样的表示用户的多个key，对既定的key有多种不同方式来选择这个key存放在哪个实例中。也就是说，有不同的系统来映射某个key到某个Redis服务。

范围分区
最简单的分区方式是按范围分区，就是映射一定范围的对象到特定的Redis实例。

比如，ID从0到10000的用户会保存到实例R0，ID从10001到 20000的用户会保存到R1，以此类推。

这种方式是可行的，并且在实际中使用，不足就是要有一个区间范围到实例的映射表。这个表要被管理，同时还需要各 种对象的映射表，通常对Redis来说并非是好的方法。

哈希分区
另外一种分区方法是hash分区。这对任何key都适用，也无需是object_name:这种形式，像下面描述的一样简单：

用一个hash函数将key转换为一个数字，比如使用crc32 hash函数。对key foobar执行crc32(foobar)会输出类似93024922的整数。
对这个整数取模，将其转化为0-3之间的数字，就可以将这个整数映射到4个Redis实例中的一个了。93024922 % 4 = 2，就是说key foobar应该被存到R2实例中。注意：取模操作是取除的余数，通常在多种编程语言中用%操作符实现。

## Redis 扩容

​	当做**缓存**使用，使用**一致性哈希**实现动态扩容缩容。

 	当做一个**持久化存储**使用，必须使用**固定的 keys-to-nodes 映射关系**，节点的数量一旦确定不能变化。否则的话(即 Redis 节点需要动态变化的情况），必须使用可以在运行时进行数据再平衡的一套系统，而当前只有 Redis 集群可以做到这样。

# Java 使用 Redis

## jedis

### 安装

- 开始在 Java 中使用 Redis 前， 我们需要确保已经安装了 redis 服务及 Java redis 驱动，且你的机器上能正常使用 Java。 Java的安装配置可以参考我们的 Java 开发环境配置 接下来让我们安装 Java redis 驱动：

首先你需要下载驱动包 下载 jedis.jar，确保下载最新驱动包。
在你的 classpath 中包含该驱动包。

maven jedis

### 连接到 redis 服务

```java
- import redis.clients.jedis.Jedis;

public class RedisJava {
    public static void main(String[] args) {
        //连接本地的 Redis 服务
        Jedis jedis = new Jedis("localhost");
        // 如果 Redis 服务设置来密码，需要下面这行，没有就不需要
        // jedis.auth("123456"); 
        System.out.println("连接成功");
        //查看服务是否运行
        System.out.println("服务正在运行: "+jedis.ping());
    }
}
```

### Redis Java String(字符串) 实例

```java
- import redis.clients.jedis.Jedis;

public class RedisStringJava {
    public static void main(String[] args) {
        //连接本地的 Redis 服务
        Jedis jedis = new Jedis("localhost");
        System.out.println("连接成功");
        //设置 redis 字符串数据
        jedis.set("runoobkey", "www.runoob.com");
        // 获取存储的数据并输出
        System.out.println("redis 存储的字符串为: "+ jedis.get("runoobkey"));
    }
}
```

### Redis Java List(列表) 实例

```java
- import java.util.List;
  import redis.clients.jedis.Jedis;

public class RedisListJava {
    public static void main(String[] args) {
        //连接本地的 Redis 服务
        Jedis jedis = new Jedis("localhost");
        System.out.println("连接成功");
        //存储数据到列表中
        jedis.lpush("site-list", "Runoob");
        jedis.lpush("site-list", "Google");
        jedis.lpush("site-list", "Taobao");
        // 获取存储的数据并输出
        List\<String> list = jedis.lrange("site-list", 0 ,2);
        for(int i=0; i\<list.size(); i++) {
            System.out.println("列表项为: "+list.get(i));
        }
    }
}
```

### Redis Java Keys 实例

```java
    - import java.util.Iterator;
  import java.util.Set;
  import redis.clients.jedis.Jedis;

public class RedisKeyJava {
    public static void main(String[] args) {
        //连接本地的 Redis 服务
        Jedis jedis = new Jedis("localhost");
        System.out.println("连接成功");
    // 获取数据并输出
    Set\<String> keys = jedis.keys("*"); 
    Iterator\<String> it=keys.iterator() ;   
    while(it.hasNext()){   
        String key = it.next();   
        System.out.println(key);   
    }
}}
```
### Jedis事务

```java
public static void main(String[] args) {
Jedis jedis = new Jedis("127.0.0.1", 6379);
jedis.flushDB();
JSONObject jsonObject = new JSONObject();
jsonObject.put("hello","world");
jsonObject.put("name","xiaobai");
// 开启事务
Transaction multi = jedis.multi();
String result = jsonObject.toJSONString();
// jedis.watch(result)
try {
multi.set("user1",result);
multi.set("user2",result);
int i = 1/0 ; // 代码抛出异常事务，执行失败！
multi.exec(); // 执行事务！
} catch (Exception e) {
multi.discard(); // 放弃事务
e.printStackTrace();
} finally {
System.out.println(jedis.get("user1"));
System.out.println(jedis.get("user2"));
jedis.close(); // 关闭连接
}
}

```

## SpringBoot整合Redis

SpringBoot 操作数据：spring-data jpa jdbc mongodb redis！
SpringData 也是和 SpringBoot 齐名的项目！
说明： 在 SpringBoot2.x 之后，原来使用的jedis 被替换为了 lettuce?
jedis : 采用的直连，多个线程操作的话，是不安全的，如果想要避免不安全的，使用 jedis pool 连接池！ 更像 BIO 模式
lettuce : 采用netty，实例可以再多个线程中进行共享，不存在线程不安全的情况！可以减少线程数据了，更像 NIO 模式
源码分析：

```
@Bean
@ConditionalOnMissingBean(name = "redisTemplate") // 我们可以自己定义一个
redisTemplate来替换这个默认的！
public RedisTemplate\<Object, Object> redisTemplate(RedisConnectionFactory
redisConnectionFactory)
throws UnknownHostException {
// 默认的 RedisTemplate 没有过多的设置，redis 对象都是需要序列化！
// 两个泛型都是 Object, Object 的类型，我们后使用需要强制转换 \<String, Object>
RedisTemplate\<Object, Object> template = new RedisTemplate\<>();
template.setConnectionFactory(redisConnectionFactory);
return template;
}
@Bean
@ConditionalOnMissingBean // 由于 String 是redis中最常使用的类型，所以说单独提出来了一
个bean！
public StringRedisTemplate stringRedisTemplate(RedisConnectionFactory
redisConnectionFactory)
throws UnknownHostException {
StringRedisTemplate template = new StringRedisTemplate();
template.setConnectionFactory(redisConnectionFactory);
return template;
}
```

```java
1、导入依赖
<!-- 操作redis -->
\<dependency>
\<groupId>org.springframework.boot\</groupId>
\<artifactId>spring-boot-starter-data-redis\</artifactId>
\</dependency>
2、配置连接
# 配置redis
spring.redis.host=127.0.0.1
spring.redis.port=6379
3、测试！
@SpringBootTest
class Redis02SpringbootApplicationTests {
@Autowired
private RedisTemplate redisTemplate;
@Test
void contextLoads() {
// redisTemplate 操作不同的数据类型，api和我们的指令是一样的
// opsForValue 操作字符串 类似String
// opsForList 操作List 类似List
// opsForSet
// opsForHash
// opsForZSet
// opsForGeo
// opsForHyperLogLog
// 除了进本的操作，我们常用的方法都可以直接通过redisTemplate操作，比如事务，和基本的
CRUD
// 获取redis的连接对象
// RedisConnection connection =
redisTemplate.getConnectionFactory().getConnection();
// connection.flushDb();
// connection.flushAll();
redisTemplate.opsForValue().set("mykey","关注狂神说公众号");
System.out.println(redisTemplate.opsForValue().get("mykey"));
}
}
```



# 应用场景

计算器、限速器、好友关系

缓存——提升热点数据的访问速度
共享数据——数据的存储和共享的问题
全局 ID —— 分布式全局 ID 的生成方案（分库分表）
分布式锁——进程间共享数据的原子操作保证
在线用户统计和计数 —— 使用位图进行位运算
队列、栈——跨进程的队列/栈
消息队列——异步解耦的消息机制
服务注册与发现 —— RPC 通信机制的服务协调中心（Dubbo 支持 Redis）
共享用户 Session —— 用户Session的更新和获取都可以快速完成
排行榜—— 通过分配元素 score 值进行排序

（1）、会话缓存（Session Cache） 最常用的一种使用 Redis 的情景是会话缓存（session cache）。用 Redis 缓存会话比其他 存储（如 Memcached）的优势在于：Redis 提供持久化。当维护一个不是严格要求一致性 的缓存时，如果用户的购物车信息全部丢失，大部分人都会不高兴的，现在，他们还会这样 吗？ 幸运的是，随着 Redis 这些年的改进，很容易找到怎么恰当的使用 Redis 来缓存会话的文 档。甚至广为人知的商业平台 Magento 也提供 Redis 的插件。 

（2）、全页缓存（FPC） 除基本的会话 token 之外，Redis 还提供很简便的 FPC 平台。回到一致性问题，即使重启 了 Redis 实例，因为有磁盘的持久化，用户也不会看到页面加载速度的下降，这是一个极 大改进，类似 PHP 本地 FPC。 再次以 Magento 为例，Magento 提供一个插件来使用 Redis 作为全页缓存后端。 此外，对 WordPress 的用户来说，Pantheon 有一个非常好的插件 wp-Redis，这个插件 能帮助你以最快速度加载你曾浏览过的页面。 

（3）、队列 Reids 在内存存储引擎领域的一大优点是提供 list 和 set 操作，这使得 Redis 能作为一个 很好的消息队列平台来使用。Redis 作为队列使用的操作，就类似于本地程序语言（如 Python）对 list 的 push/pop 操作。 如果你快速的在 Google 中搜索“Redis queues”，你马上就能找到大量的开源项目，这些 项目的目的就是利用 Redis 创建非常好的后端工具，以满足各种队列需求。例如，Celery 有一个后台就是使用 Redis 作为 broker，你可以从这里去查看。 

（4）、排行榜/计数器 Redis在内存中对数字进行递增或递减的操作实现的非常好。集合（Set）和有序集合（Sorted Set）也使得我们在执行这些操作的时候变的非常简单，Redis 只是正好提供了这两种数据 结构。所以，我们要从排序集合中获取到排名最靠前的 10 个用户–我们称之为 “user_scores”，我们只需要像下面一样执行即可： 当然，这是假定你是根据你用户的分数做递增的排序。如果你想返回用户及用户的分数，你 关注微信公众号：牛牛架构师，回复：面试题，获取最新版面试题 需要这样执行： ZRANGE user_scores 0 10 WITHSCORES Agora Games 就是一个很好的例子，用 Ruby 实现的，它的排行榜就是使用 Redis 来存储 数据的，你可以在这里看到。 

（5）、发布/订阅 最后（但肯定不是最不重要的）是 Redis 的发布/订阅功能。发布/订阅的使用场景确实非 常多。我已看见人们在社交网络连接中使用，还可作为基于发布/订阅的脚本触发器，甚至 用 Redis 的发布/订阅功能来建立聊天系统！（不，这是真的，你可以去核实）

