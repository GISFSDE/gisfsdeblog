---
index: 2
icon: markdown
title: Linux
date: 2022-06-06
category:
  - Linux
tag:
  - Linux
---

> Linux常用知识、服务器选择、搭建个人网盘、JAVA开发相关软件配置、博客搭建、域名配置、相关软件推荐。
>
> 系统下载：[阿里1](https://mirrors.aliyun.com/centos-vault/)，[阿里2](https://developer.aliyun.com/mirror/)，[官网](https://www.centos.org/download/)

<!-- more -->

![image-20211027122241544](http://qnimg.gisfsde.com/work/image-20211027122241544.png)

# TODO
---
- [x] 理论 
- [ ] 频率最高linux命令
- [ ] linux java 端口，防火墙，环境，部署，运维，日志等流程操作
- [ ] shell所有综合写一个脚本
- [ ] 所有命令实践时整理表格打印
# 常用命令
## 高频率
```bash

```

## 帮助命令

### man 获得帮助信息

```bash
man [命令或配置文件] （功能描述：获得帮助信息）
显示说明
NAME 命令的名称和单行描述
SYNOPSIS 怎样使用命令
DESCRIPTION 命令功能的深入讨论
EXAMPLES 怎样使用命令的例子
SEE ALSO 相关主题（通常是手册页）
#示例
man ls
```

### help 获得shell 内置命令的帮助信息

一部分基础功能的系统命令是直接内嵌在shell 中的，系统加载启动之后会随着shell一起加载，常驻系统内存中。这部分命令被称为“内置（built-in）命令”；相应的其它命令被称为“外部命令”。
1）基本语法
help 命令（功能描述：获得shell **内置命令**的帮助信息）

命令 --help (**外部命令**)

2）案例实操
（1）查看cd 命令的帮助信息
 help cd  

### 常用快捷键

ctrl + c 停止进程
ctrl+l 清屏，等同于clear；彻底清屏是：reset
善于用tab 键提示(更重要的是可以防止敲错)
上下键查找执行过的命令

## 文件

### 本地文件上传下载

#### 方式一：lrzsz

```cmd
#安装
yum -y install lrzsz
#上传下载的目录SecureCRT可配置
#上传【弹出窗口选择文件】
rz
#下载
sz 文件名
```

#### 方式二：sftp

SecureCRT 快捷键`alt+p`

```cmd
get -r linux绝对路径文件        #Linux文件上传到Windows
put -r Windows绝对路径文件        #Windows文件上传到Linux
#需要指定两个对应的路径，上传到linux默认到root
```

### 远程文件下载

```cmd
#下载到当前目录
wget https://download.redis.io/releases/redis-6.0.8.tar.gz
#下载到指定目录
wget -P /usr/software https://download.redis.io/releases/redis-6.0.8.tar.gz
#下载并更换文件名
wget -O redis.tar.gz https://download.redis.io/releases/redis-6.0.8.tar.gz
#断点续传【断网等中断下载情况可借此无需从头下载】
wget -c https://download.redis.io/releases/redis-6.0.8.tar.gz
```



#### 其他图形化方式

XFTP、SecureFX、FileZilla等

### 解压缩

#### gzip/gunzip 

gzip 文件（功能描述：压缩文件，只能将文件压缩为*.gz 文件）
gunzip 文件.gz （功能描述：解压缩文件命令）

（1）只能压缩文件不能压缩目录

（2）**不保留源文件**
（3）同时多个文件会产生多个压缩包

#### zip/unzip

zip 压缩命令在windows/linux都通用，可以压缩目录且**保留源文件**。

zip [选项] XXX.zip 将要压缩的内容（功能描述：压缩文件和目录的命令）

-r 压缩目录

unzip [选项] XXX.zip （功能描述：解压缩文件）

-d<目录> 指定解压后文件的存放目录

#### tar

tar [选项] XXX.tar.gz 将要打包进去的内容（功能描述：打包目录，压缩后的文件格式.tar.gz）

-c 产生.tar 打包文件
-v 显示详细信息
-f 指定压缩后的文件名
-z 打包同时压缩
-x 解包.tar 文件
-C 解压到指定目录

示例：

1.压缩文件
tar -czf test.tar.gz /test1 /test2

2.列出压缩文件列表
tar -tzf test.tar.gz

3.解压文件
tar -xvzf test.tar.gz

### 新建

touch 文件名

### 删除

rm -rf 文件名  强制删除无提示

### 修改  

**打开：vi/vim 文件名** 

i:在光标所在字符前开始插入
a:在光标所在字符后开始插入
o:在光标所在行的下面另起一新行插入

**保存文件：**

第一步：ESC  进入命令行模式
第二步：:   进入底行模式
第三步：wq   保存并退出编辑

**取消编辑：**

第一步：ESC  进入命令行模式
第二步：:   进入底行模式
第三步：q!   撤销本次修改并退出编辑

**1) 命令行模式command mode）**
      控制屏幕光标的移动，字符、字或行的删除，查找，移动复制某区段及进入Insert mode下，或者到 last line mode。
      命令行模式下的常用命令：
      【1】控制光标移动：↑，↓，j，k
      【2】删除当前行：dd 
      【3】查找：/字符
      【4】进入编辑模式：i o a
      【5】进入底行模式：:
      
**2) 编辑模式（Insert mode）**
      只有在Insert mode下，才可以做文字输入，按「ESC」键可回到命令行模式。
      编辑模式下常用命令：
      【1】ESC 退出编辑模式到命令行模式；



:set number  显示行号      
**3) 底行模式（last line mode）**
     将文件保存或退出vi，也可以设置编辑环境，如寻找字符串、列出行号……等。
     底行模式下常用命令：
     【1】退出编辑：   :q
     【2】强制退出：   :q!
     【3】保存并退出：  :wq

### 移动

mv /temp/movefile /targetFolder

### 复制

cp source dest 复制文件

cp -r sourceFolder targetFolder 递归复制整个文件夹

scp sourecFile romoteUserName@remoteIp:remoteAddr 远程拷贝

### 软连接

#### ln 

又叫符号连接，类似windows快捷方式

##### 创建

ln -s [原文件或目录] [软链接名]

-s 不加为硬链接  ，相当于多个指向

##### 删除

rm -rf 软链接名，而不是rm -rf 软链接名/
如果使用rm -rf 软链接名/ 删除，会把软链接对应的真实目录下内容删掉

##### 进入实际目录

cd [软链接名]/  是进入软连接目录而进入实际物理路径：

cd -P [软链接名]/ 

### 查看内容

```cmd
cat：看最后一屏

#示例：使用cat查看/etc/sudo.conf文件，只能显示最后一屏内容
#cat sudo.conf

more：百分比显示

#示例：使用more查看/etc/sudo.conf文件，可以显示百分比，
#more sudo.conf
#q  退出查看
#=/:f 显示行号
#b 回退
#空格 下一页
#回车 下一行


less：翻页查看，适合大文档

#示例：使用less查看/etc/sudo.conf文件
#less sudo.conf
#空格 下一页
#回车 下一行
#b 回退
#q  退出查看
#PgUp和PgDn向上和向下翻页
#g/G 开头/末尾
#/关键字 搜索  n/N 向 下/上查找

head/tail：指定行数或者动态查看头尾

#示例：使用tail -10 查看/etc/sudo.conf文件的后10行，Ctrl+C结束 
#tail -10 sudo.conf

#查看文件头10行
head -n 10 example.txt

#查看文件尾10行
tail -n 10 example.txt

#查看日志类型文件
tail -f exmaple.log //这个命令会自动显示新增内容，屏幕只显示10行内容的（可设置）。ctrl + s 暂停


```

### 查找

find / -name filename.txt 根据名称查找/目录下的filename.txt文件。

find . -name "*.xml" 递归查找所有的xml文件

find . -name "*.xml" |xargs grep "hello world" 递归查找所有文件内容中包含hello world的xml文件

grep -H 'spring' *.xml 查找所以有的包含spring的xml文件

find ./ -size 0 | xargs rm -f & 删除文件大小为零的文件

ls -l | grep '.jar' 查找当前目录中的所有jar文件

grep 'test' d* 显示所有以d开头的文件中包含test的行。

grep 'test' aa bb cc 显示在aa，bb，cc文件中匹配test的行。

grep '[a-z]\{5\}' aa 显示所有包含每个字符串至少有5个连续小写字符的字符串的行。

### 重命名

mv oldNameFile newNameFile

### 权限

![image-20221214192123746](https://qnimg.gisfsde.com/markdown/image-20221214192123746.png)

####  查看权限

`ll`

（1）0 首位表示类型
在Linux中第一个字符代表这个文件是目录、文件或链接文件等等

-代表文件
d 代表目录
l 链接文档(link file)；
（2）第1-3位确定属主（该文件的所有者）拥有该文件的权限。---User
（3）第4-6位确定属组（所有者的同组用户）拥有该文件的权限，---Group
（4）第7-9位确定其他用户拥有该文件的权限---Other

示例：chmod 777 file.java //file.java 的权限 - rwx rwxr wx，r表示读、w表示写、x表示可执行： 

2）rwx 作用文件和目录的不同解释
（1）作用到文件：
[ r ]代表可读(read): 可以读取，查看
[ w ]代表可写(write): 可以修改，但是不代表可以删除该文件，删除一个文件的前
提条件是对该文件所在的目录有写权限，才能删除该文件.
[ x ]代表可执行(execute):可以被系统执行
（2）作用到目录：
[ r ]代表可读(read): 可以读取，ls查看目录内容
[ w ]代表可写(write): 可以修改，目录内创建+删除+重命名目录
[ x ]代表可执行(execute):可以进入该目录

![image-20221215132408053](https://qnimg.gisfsde.com/markdown/image-20221215132408053.png)

#### 更改权限

##### 更改读写执行权限

![image-20221215132621170](https://qnimg.gisfsde.com/markdown/image-20221215132621170.png)

u:所有者g:所有组o:其他人a:所有人(u、g、o 的总和)    r=4 w=2 x=1 rwx=4+2+1=7（二进制原理）

chmod [{ugoa}{+-=}{rwx}] 文件或目录

chmod [mode=421 ] [文件或目录] 

 添加`-R` 子目录也更改 

[更改文件属性](#更改文件属性)

##### 更改所有者

chown [选项] [最终用户] [文件或目录] （功能描述：改变文件或者目录的所有者）

##### 更改所属组

chgrp [最终用户组] [文件或目录] （功能描述：改变文件或者目录的所属组）

## 目录

### 0.切换路径

cd 绝对路径、

 cd `../` 当前目录上层菜单、   

 cd `./` 当前目录、   

cd `-  `返回之前目录、

cd   返回用户根目录

cd ~ 切换到用户目录

### 1.查看文件列表包含文件类型、隐藏文件等详细信息

ls -alh

### 2.当前工作目录

pwd

### 3.创建目录

mkdir newfolder 父目录需存在

mkdir -p newfolder 父目录也会创建

### 4.删除目录

rmdir deleteEmptyFolder 删除空叶子目录  

rmdir -p deleteEmptyFolder 删除空目录包含空父目录  

rm -rf deleteFile 递归删除目录中所有内容

### 5.以树状图列出目录的内容

tree a

ps: Mac下使用tree命令

## 查找

### find

find [搜索范围] [选项]

-name<查询方式> 	按照指定的文件名查找模式查找文件
-user<用户名> 		查找属于指定用户名所有文件
-size<文件大小> 	按照指定的文件大小查找文件,单位为:
								b —— 块（512 字节）
								c —— 字节
								w —— 字（2 字节）
								k —— 千字节
								M —— 兆字节
								G —— 吉字节

### locate

locate 指令利用事先建立的系统中所有文件名称及路径的locate 数据库实现快速定位给定的文件。Locate 指令无需遍历整个文件系统，查询速度较快。为了保证查询结果的准确度，管理员必须定期更新locate 时刻。由于locate 指令基于数据库进行查询，所以第一次运行前，必须使用updatedb 指令创建locate 数据库。

updatedb   

locate 搜索文件

### which/whereis  

查询命令路径

### grep 

管道符，“|”，表示将前一个命令的处理结果输出传递给后面的命令处理

grep 选项 查找内容 源文件

-n 显示匹配行及行号。

示例：ls | grep -n test

## 用户

```cmd
#===用户=====
#用户目录  /home/
# 添加无密码用户
useradd 用户名 
# 删除用户
userdel 用户名（功能描述：删除用户但保存用户主目录）
userdel -r 用户名（功能描述：用户和用户主目录，都删除）
# 设置用户密码
passwd 用户名
# 切换用户swich user
su 用户名
# 查看指定用户是否存在
id 用户名
# 查看所有用户以及详细信息
cat /etc/passwd
# 回退到上个用户
exit
#查询原始登录用户
who am i
# 当前会话用户
whoami
# 查看所有登录用户
who
# 普通户用使用超级管理员身份执行命令（需要root授权）
sudo 命令
# root授权
vim /etc/sudoers
在Allow root to run any commands anywhere下添加用户  添加后：wq!强制保存


#====用户组====
#新增组
groupadd 组名
#删除组
groupdel 组名
#修改组
groupmod -n 新组名 老组名
#查看组
cat /etc/group
```

## 进程

### 查看一个程序是否运行

```cmd
进程状态【ps:process status】
#查看所有有关tomcat的进程
ps –ef|grep tomcat 
#高亮要查询的关键字
ps -ef|grep --color java 
#查看java进程
ps aux|grep java
#查看所有进程
ps aux 
a #列出带有终端的所有用户的进程
x #列出当前用户的所有进程，包括没有终端的进程
u #面向用户友好的显示风格
-e #列出所有进程
-u #列出某个用户关联的所有进程
-f #显示完整格式的进程列表
#如果想查看进程的CPU 占用率和内存占用率，可以使用aux;
#如果想查看进程的父进程ID 可以使用ef;
显示信息说明【ps aux】
USER：#该进程是由哪个用户产生的
PID：#进程的ID 号
%CPU：#该进程占用CPU 资源的百分比，占用越高，进程越耗费资源；
%MEM：#该进程占用物理内存的百分比，占用越高，进程越耗费资源；
VSZ：#该进程占用虚拟内存的大小，单位KB；
RSS：#该进程占用实际物理内存的大小，单位KB；
TTY：#该进程是在哪个终端中运行的。对于CentOS 来说，tty1 是图形化终端，tty2-tty6 #是本地的字符界面终端。pts/0-255 代表虚拟终端。
STAT：#进程状态。常见的状态有：R：运行状态、S：睡眠状态、T：暂停状态、
Z：#僵尸状态、s：包含子进程、l：多线程、+：前台显示
START：#该进程的启动时间
TIME：#该进程占用CPU 的运算时间，注意不是系统时间
COMMAND：#产生此进程的命令名
显示信息说明【ps -ef】
UID：#用户ID
PID：#进程ID
PPID：#父进程ID
C：#CPU 用于计算执行优先级的因子。数值越大，表明进程是CPU 密集型运算，执行优先级会降低；数值越小，表明进程是I/O 密集型运算，执行优先级会提高
STIME：#进程启动的时间
TTY：#完整的终端名称
TIME：#CPU 时间
CMD：#启动进程所用的命令和参数
```

### 终止线程

kill [选项] 进程号（功能描述：通过进程号杀死进程）
killall 进程名称（功能描述：通过进程名称杀死进程，也支持通配符，这在系统因负载过大而变得很慢时很有用）

kill -9 19979   强迫终止线程号位19979的进程      -9 强迫终止

### 查看进程树

pstree [选项]

-p 显示进程的PID
-u 显示进程的所属用户

### 实时监控系统进程状态

top [选项]

-d 秒数指定top 命令每隔几秒更新。默认是3 秒在top 命令的交互模式当中可以执行的命令
-i 使top 不显示任何闲置或者僵死进程。
-p 通过指定监控进程ID 来仅仅监控某个进程的状态。

P 以CPU 使用率排序，默认就是此项
M 以内存的使用率排序
N 以PID 排序
q 退出top
u 筛选用户进程
k 删除输入进程

#### 查询结果字段解释

##### 第一行信息为任务队列信息


12:26:46 	系统当前时间
up 1 day, 13:32 	系统的运行时间，本机已经运行1 天13 小时32 分钟
2 users 	当前登录了两个用户
load average: 0.00, 0.00, 0.00 	系统在之前1 分钟，5 分钟，15 分钟的平均负载。一般认为小于1 时，负载较小。如果大于1，系统已经超出负荷。

##### 第二行为进程信息

Tasks: 95 total 	系统中的进程总数
1 running 	正在运行的进程数
94 sleeping 	睡眠的进程
0 stopped 	正在停止的进程
0 zombie 	僵尸进程。如果不是0，需要手工检查僵尸进程

##### 第三行为CPU 信息

Cpu(s): 0.1%us 	用户模式占用的CPU 百分比
0.1%sy 	系统模式占用的CPU 百分比
0.0%ni 	改变过优先级的用户进程占用的CPU 百分比
99.7%id 	空闲CPU 的CPU 百分比
0.1%wa 	等待输入/输出的进程的占用CPU 百分比
0.0%hi 	硬中断请求服务占用的CPU 百分比
0.1%si 	软中断请求服务占用的CPU 百分比
0.0%st 	st（Steal time）虚拟时间百分比。就是当有虚拟机时，虚拟CPU 等待实际CPU 的时间百分比。

##### 第四行为物理内存信息

Mem: 625344k total 	物理内存的总量，单位KB
571504k used 	已经使用的物理内存数量
53840k free 	空闲的物理内存数量，我们使用的是虚拟机，总共只分配了628MB 内存，所以只有53MB 的空闲内存了
65800k buffers 	作为缓冲的内存数量

##### 第五行为交换分区（swap）信息

Swap: 524280k total 	交换分区（虚拟内存）的总大小
0k used 	已经使用的交互分区的大小
524280k free 	空闲交换分区的大小
409280k cached 	作为缓存的交互分区的大小



### 端口

```cmd
#查看目前所有运行端口
netstat -tunlp

#查看端口8080的使用情况
netstat -tln | grep 8080 

#查看端口属于哪个程序
lsof -i :8080 
```

## 系统

```cmd
#关机
    shutdown -h now        #立刻关机
    shutdown -h 5       # 5分钟后关机
    poweroff           # 立刻关机
#重启
    shutdown -r now        #立刻重启
    shutdown -r 5        #5分钟后重启
    reboot                #立刻重启
#--help命令
  shutdown --help：
  ifconfig  --help：#查看网卡信息
#man命令（命令说明书） 
  man shutdown
  #注意：man shutdown打开命令说明书之后，使用按键q退出
  
#远程登录
ssh userName@ip


#####查看系统硬件信息#####
#查看内存占用前十进程信息
ps aux|head -1;ps aux|grep -v PID|sort -rn -k +4|head
#查看操作系统的版本
cat /etc/redhat-release
cat /etc/os-release
#查看系统内核
uname –a
=============== CPU=======================
lscpu
cat /proc/cpuinfo |grep "processor"|sort -u|wc -l #逻辑cpu数量
grep "physical id" /proc/cpuinfo|sort -u|wc -l  #物理cpu的数量
grep "cpu cores" /proc/cpuinfo|uniq #每个cpu内核数
=============内存===================
free -h #查看内存占用情况
cat /proc/meminfo#查看内存详细情况
============硬盘===============
分区【fdisk】root使用
fdisk -l #硬盘分区情况
fdisk 硬盘设备名 #分区
#（1）Linux 分区
Device：分区序列
Boot：引导
Start：从X磁柱开始
End：到Y磁柱结束
Blocks：容量
Id：分区类型ID
System：分区类型
#（2）分区操作按键说明
m：显示命令列表
p：显示当前磁盘分区
n：新增分区
w：写入分区信息并退出
q：不保存分区信息直接退出


 查看磁盘空间使用情况【df】
df -h #磁盘使用情况
-h #以人们较易阅读的GBytes, MBytes, KBytes 等格式自行显示；

查看文件和目录占用的磁盘空间【du】
du #目录/文件（功能描述：显示目录下每个子目录的磁盘使用情况）
-h #以人们较易阅读的GBytes, MBytes, KBytes 等格式自行显示；
-a #不仅查看子目录大小，还要包括文件
-c #显示所有的文件和子目录大小后，显示总和
-s #只显示总和
--max-depth=n #指定统计子目录的深度为第n 层
示例：
du -sh #查看当前目录总共占的容量。而不单独列出各子项占用的容量。
du -lh --max-depth=1 #查看当前目录下一级子文件和子目录占用的磁盘容量。
du -cks * | sort -rn | head -n 10 #查看某个目录下占用空间最多的文件或目录。

查看设备挂载情况【lsblk】
list clock
lsblk -f

挂载/卸载【mount/umount】 
mount [-t vfstype] [-o options] device dir #挂载
umount 设备文件名或挂载点 #卸载

-t vfstype #指定文件系统的类型，通常不必指定。mount 会自动选择正确的类型。常用类型有：光盘或光盘镜像：iso9660,DOS fat16 文件系统：msdos,Windows 9x fat32 文件系统：vfat,Windows NT ntfs 文件系统：ntfs,Mount Windows 文件网络共享：smbfs,UNIX(LINUX) 文件网络共享：nfs
-o options #主要用来描述设备或档案的挂接方式。常用的参数有：
loop：#用来把一个文件当成硬盘分区挂接上系统
ro：#采用只读方式挂接设备
rw：#采用读写方式挂接设备
iocharset：#指定访问文件系统所用字符集
device #要挂接(mount)的设备
dir #设备在系统上的挂接点(mount point)

设置开机自动挂载
vi /etc/fstab
添加 # 设备名称或uuid 挂载点 类型 defaults 0 0 


系统定时任务【crontab】
systemctl restart crond #重新启动crond 服务

crontab [选项]
-e #编辑crontab 定时任务
-l #查询crontab 任务
-r #删除当前用户所有的crontab 任务

* * * * * 执行的任务 解释如下表
```

![image-20221216132903253](https://qnimg.gisfsde.com/markdown/image-20221216132903253.png)

## 网络

```cmd
#ip相关信息查询
ip addr
ifconfig
#查看IP
hostname -I
#网络联通
ping www.just-ping.com
#防火墙
# 开启
service firewalld start
# 重启
service firewalld restart
# 关闭
service firewalld stop

防火墙【firewall】
#1、查看防火墙状态
firewall-cmd --state
#2、开启防火墙
systemctl start firewalld
#3、开放指定端口
 firewall-cmd --zone=public --add-port=1935/tcp --permanent
#参数命令含义：
--zone #作用域
--add-port=1935/tcp  #添加端口，格式为：端口/通讯协议
--permanent  #永久生效，没有此参数重启后失效
 
#-- 关闭指定端口
firewall-cmd --remove-port=80/tcp --permanent

#6、查询所有开放端口
firewall-cmd --list-ports
# 查看防火墙规则
firewall-cmd --list-all
# 查询端口是否开放
firewall-cmd --query-port=443/tcp

# 移除端口
firewall-cmd --permanent --remove-port=8080/tcp
#重启防火墙(修改配置后要重启防火墙)
firewall-cmd --reload

#显示网络状态和端口占用信息【netstat】
netstat -anp | grep 进程号 #查看该进程网络信息
netstat –nlp | grep 端口号 #查看网络端口号占用情况
-a #显示所有正在监听（listen）和未监听的套接字（socket）
-n #拒绝显示别名，能显示数字的全部转化成数字
-l #仅列出在监听的服务状态
-p #表示显示哪个进程在调用
```

## 时间

### date

#### 查

（1）date （功能描述：显示当前时间）
（2）date +%Y （功能描述：显示当前年份）
（3）date +%m （功能描述：显示当前月份）
（4）date +%d （功能描述：显示当前是哪一天）
（5）date "+%Y-%m-%d %H:%M:%S" （功能描述：显示年月日时分秒）

（1）date -d '1 days ago' （功能描述：显示前一天时间）
（2）date -d '-1 days ago' （功能描述：显示明天时间）

#### 改

date -s 字符串时间    date -s "2017-06-19 20:52:18"   ntpdate 恢复联网时间

### cal

cal 年份

## 其他

### 历史执行命令

#### history

history 显示所有执行过的命令

history 10 显示最后10条

！编号 显示对应执行 的命令

history -c 清空命令记录

### > 输出重定向和>> 追加

echo “内容” `>>` 文件  将输出内容**追加**文件末尾

ls -l `>` 文件  将输出内容**覆盖**文件内容

#### echo

echo [选项] [输出内容]   输出内容、环境变量（输出$tab可查看所有环境变量）到控制台

\\ 	输出\本身
\n 	换行符
\t 	制表符，也就是Tab 键

## 部署

## JAVA常用

打印信息
echo $JAVA_HOME 打印java home环境变量的值

java 常用命令
java javac  jps , jstat , jmap,  jstack

# 应用场景

## 离线/在线 安装各种包

### jdk安装配置

\1.    创建 /usr/java 文件夹，将安装包放入解压

解压命令：tar zxvf 压缩包名称 （例如：tar zxvf jdk-8u152-linux-x64.tar.gz）

删除命令：rm -f 压缩包名称 （例如 rm -f jdk-8u152-linux-x64.tar.gz）

\2.    修改配置文件

vi /etc/profile

export JAVA_HOME=/usr/java/jdk1.8.0_221

export JRE_HOME=/usr/java/jdk1.8.0_221/jre

export CLASSPATH=.:${JAVA_HOME}/jre/lib/rt.jar:${JAVA_HOME}/lib/dt.jar:${JAVA_HOME}/lib/tools.jar

export PATH=$PATH:${JAVA_HOME}/bin

![image-20220512163128012](http://qnimg.gisfsde.com/work/image-20220512163128012.png)

配置文件生效

source /etc/profile

修改默认jdk

cd /usr/bin

ln -s -f /usr/java/jdk1.8.0_221/jre/bin/java

ln -s -f /usr/java/jdk1.8.0_221/bin/javac

java -version

 ![image-20220512163210054](http://qnimg.gisfsde.com/work/image-20220512163210054.png)

### redis安装

1）连接服务器，将redis安装包放入服务器

 ![image-20220512163256560](http://qnimg.gisfsde.com/work/image-20220512163256560.png)

2）解压安装包 

**tar -zxvf redis-5.0.5.tar.gz**

 ![image-20220512163328993](http://qnimg.gisfsde.com/work/image-20220512163328993.png)

3）解压后目录为

 ![image-20220512163337716](http://qnimg.gisfsde.com/work/image-20220512163337716.png)

4）进入 redis-5.0.5 目录，然后执行make命令

 ![image-20220512163444465](http://qnimg.gisfsde.com/work/image-20220512163444465.png)

5）出现下面标识说明成功

 ![image-20220512163450978](http://qnimg.gisfsde.com/work/image-20220512163450978.png)

6）执行命令 make install

 ![image-20220512163456177](http://qnimg.gisfsde.com/work/image-20220512163456177.png)

7）安装完毕，修改配置

Vi redis.conf（或者直接将文件拿出来修改）

修改 daemonize no 为yes (功能，设置redis后台运行)

设置 其他机器访问 bind 127.0.0.1 改成 bind 0.0.0.0

关闭持久化操作：728行appendfsync 设置为no ，216行 save "" 注释其他3个save

启动redis命令：redis-server  redis.conf

 ![image-20220512163502664](http://qnimg.gisfsde.com/work/image-20220512163502664.png)

ps -ef |grep redis  查看redis进程是否启动成功

 ![image-20220512163508882](http://qnimg.gisfsde.com/work/image-20220512163508882.png)

redis-cli -p 6379 使用redis

 ![image-20220512163512897](http://qnimg.gisfsde.com/work/image-20220512163512897.png)

如果设置了密码，则先登录：auth ***

 ![image-20220512163517101](http://qnimg.gisfsde.com/work/image-20220512163517101.png)

输入命令ping 返回pong成功

 ![image-20220512163521999](http://qnimg.gisfsde.com/work/image-20220512163521999.png)

退出命令

 ![image-20220512163526126](http://qnimg.gisfsde.com/work/image-20220512163526126.png)

 

卸载redis 

ps -ef |grep redis  查看redis进程

kill -9 ****    停止redis服务

执行 ll /usr/local/bin

执行删除命令 rm -f /usr/local/bin/redis*

查看文件是否已经删除执行 ll /usr/local/bin

查到源文件所在的目录

执行删除命令 rm -rf redis-4.0.6/

卸载完成

 

**Redis设置密码**

**需要永久配置密码的话就去redis.conf****的配置文件中找到requirepass****这个参数，如下配置：**

**修改redis.conf配置文件**　

 

**# requirepass foobared**

**requirepass 123** **指定密码123**

**保存后重启redis就可以了**

 

### Tomcat安装

\1.    将安装包放入服务器中

 ![image-20220512163547148](http://qnimg.gisfsde.com/work/image-20220512163547148.png)

\2.    命令解压 tar -xzvf apache-tomcat-8.5.51.tar.gz

 ![image-20220512163552150](http://qnimg.gisfsde.com/work/image-20220512163552150.png)

\3.    进入bin目录执行命令将文件的权限设置低

chmod -R 777 startup.sh shutdown.sh catalina.sh

 ![image-20220512163559037](http://qnimg.gisfsde.com/work/image-20220512163559037.png)

\4.    启动tomcat

 ![image-20220512163603831](http://qnimg.gisfsde.com/work/image-20220512163603831.png)

\5.    是否启动成功 ps -ef|grep tomcat

 ![image-20220512163612137](http://qnimg.gisfsde.com/work/image-20220512163612137.png)

\6.    浏览器访问查看能否访问

访问失败执行

firewall-cmd --zone=public --add-port=8080/tcp --permanent  将8080端口加入防火墙success成功

firewall-cmd --state 防火墙状态

firewall-cmd --reload 重启防火墙 success成功

firewall-cmd --zone=public --query-port=8080/tcp 查询8080端口是加入成功 yes成功

\7.    开机自启

vi /etc/rc.d/rc.local

输入i进入编辑模式

加入代码

source /etc/profile

sh /opt/Tomcat/apache-tomcat-8.5.51/bin/startup.sh

esc—>退出编辑模式

:wq 保存退出

 ![image-20220517093013032](http://qnimg.gisfsde.com/work/image-20220517093013032.png)

8．第二种开机自启

每次开机都要启动tomcat，非常麻烦：通过直接修改系统文件，实现tomcat自启动：

 

\1. 修改脚本文件rc.local：vim /etc/rc.d/rc.local

 

　　这个脚本是使用者自定的开机启动程序，可以在里面添加想在系统启动之后执行的脚本或者脚本执行命令

 

\2. 添加如下内容：

export JAVA_HOME=/usr/java/jdk1.8.0_221

/opt/tomcat/apache-tomcat-8.5.51/bin/startup.sh start

\3. esc 退出编辑，:wq 保存修改

\4. 将rc.local修改为可执行

chmod 777 /etc/rc.d/rc.local

卸载tomcat

卸载: 找到tomcat的安装目录 rm -rf /usr/java/tomcat/apache-tomcat-8.5.31 (安装目录) 安装

Tomcat管理页面设置密码

Tomcat-user.xml修改

**\<tomcat-user>**

​    **\<user** **username****=****"tomcat"** **password****=****"123"** **roles****=****"manager-gui"****/>**

**\</tomcat-users>**

```
Manager ``下面的META-INF配置
 \<Context antiResourceLocking="false" privileged="true" >
 \<Valve className="org.apache.catalina.valves.RemoteAddrValve"
     allow="^.*$" />
```

 

Manager App

在 tomcat/bin/Catalina.sh文件中

 

找到 -Djava.security.manager \

 

 -Djava.security.policy=="\"$CATALINA_BASE/conf/catalina.policy\""\

 

 -Dcatalina.base="\"$CATALINA_BASE\"" \

 

 -Dcatalina.home="\"$CATALINA_HOME\"" \

 

   -Djava.io.tmpdir="\"$CATALINA_TMPDIR\""\

 

在每段后追加一句

 

-Djava.awt.headless=true \

 

该步骤解决使用中无法选择数据路径的问题

 

### Nginx安装

\1.    将安装包放入服务器，解压

tar xf nginx-1.8.1.tar.gz

 ![image-20220517104132775](http://qnimg.gisfsde.com/work/image-20220517104132775.png)

\2.    安装依赖

yum -y install gcc gcc-c++ automake pcre-devel zlib zlib-devel open openssl-devel

\3.    进入目录编译安装

./configure --prefix=/opt/nginx

 ![image-20220517104146707](http://qnimg.gisfsde.com/work/image-20220517104146707.png)

\4.    安装

make && make install

 ![image-20220517104155552](http://qnimg.gisfsde.com/work/image-20220517104155552.png)

\5.    查看/opt/nginx目录

 ![image-20220517104202724](http://qnimg.gisfsde.com/work/image-20220517104202724.png)

\6.    进入/opt/nginx/sbin目录 ./nginx -v

 ![image-20220517104209541](http://qnimg.gisfsde.com/work/image-20220517104209541.png)

 ![image-20220517104215779](http://qnimg.gisfsde.com/work/image-20220517104215779.png)

查看nginx进程

ps aux | grep nginx

 ![image-20220517104222944](http://qnimg.gisfsde.com/work/image-20220517104222944.png)

\7.    启动nginx

./nginx

 ![image-20220517104230379](http://qnimg.gisfsde.com/work/image-20220517104230379.png)

\8.    将端口加入防火墙

firewall-cmd --zone=public --add-port=80/tcp

 

卸载nginx:

./nginx -s stop 停止nginx服务

find / -name nginx  查找包含nginx的文件

执行删除命令

rm –rf *

 

 

yum remove nginx

查看nginx是否还存在

Which nginx

 

 

Nginx配置SSL报错

nginx: [emerg] the "ssl" parameter requires ngx_http_ssl_module in /opt/nginx/conf/nginx.conf:130

 

https://blog.csdn.net/m0_37711292/article/details/85163834

 查看nginx正在使用的配置文件

nginx -t

### Mysql安装

\1.    上传安装包到服务器并解压

tar -xvf MySQL-5.6.40-1.el7.x86_64.rpm-bundle.tar -C /opt/mysql

 ![image-20220517104240849](http://qnimg.gisfsde.com/work/image-20220517104240849.png)

\2.    查看是否有安装mariadb

rpm -qa | grep -i mariadb

 ![image-20220517104246710](http://qnimg.gisfsde.com/work/image-20220517104246710.png)

卸载

yum remove mariadb-server-5.5.65-1.el7.x86_64

 ![image-20220517104255787](http://qnimg.gisfsde.com/work/image-20220517104255787.png)

 ![image-20220517104310392](http://qnimg.gisfsde.com/work/image-20220517104310392.png)

\3.    安装文件

rpm -ivh MySQL-shared-compat-5.6.40-1.el7.x86_64.rpm --nodeps –force

 ![image-20220517104317541](http://qnimg.gisfsde.com/work/image-20220517104317541.png)

 

rpm -ivh MySQL-server-5.6.40-1.el7.x86_64.rpm --nodeps –force

 ![image-20220517104323815](http://qnimg.gisfsde.com/work/image-20220517104323815.png)

rpm -ivh MySQL-client-5.6.40-1.el7.x86_64.rpm --nodeps –force

 ![image-20220517104332109](http://qnimg.gisfsde.com/work/image-20220517104332109.png)

rpm -ivh MySQL-devel-5.6.40-1.el7.x86_64.rpm --nodeps –force

 ![image-20220517104337957](http://qnimg.gisfsde.com/work/image-20220517104337957.png)

rpm -ivh MySQL-embedded-5.6.40-1.el7.x86_64.rpm --nodeps –force

 ![image-20220517104350501](http://qnimg.gisfsde.com/work/image-20220517104350501.png)

rpm -ivh MySQL-shared-5.6.40-1.el7.x86_64.rpm --nodeps –force

 ![image-20220517104357082](http://qnimg.gisfsde.com/work/image-20220517104357082.png)

获取安装状态

rpm -qa | grep -i mysql

 ![image-20220517104406519](http://qnimg.gisfsde.com/work/image-20220517104406519.png)

\4.    获取随机生成密码

cat /root/.mysql_secret

 ![image-20220517104414959](http://qnimg.gisfsde.com/work/image-20220517104414959.png)

启动服务

service mysql start

 ![image-20220517104425442](http://qnimg.gisfsde.com/work/image-20220517104425442.png)

登录

mysql -u root –p 

输入刚才查询的密码

 ![image-20220517104433590](http://qnimg.gisfsde.com/work/image-20220517104433590.png)

登录成功，修改密码

set password for 'root'@'localhost' = password('root');

 ![image-20220517104440183](http://qnimg.gisfsde.com/work/image-20220517104440183.png)

设置远程连接

grant all privileges on *.* to 'root'@'%' identified by 'root' with grant option;

 ![image-20220517104448718](http://qnimg.gisfsde.com/work/image-20220517104448718.png)

3306端口加入防火墙

firewall-cmd --add-port=3306/tcp --permanent

 ![image-20220517104455530](http://qnimg.gisfsde.com/work/image-20220517104455530.png)

重启防火墙

firewall-cmd –reload

 

### Geoserver安装

\1.    上传安装包，解压

unzip geoserver-2.15.3-war.zip -d geoserver

 ![image-20220517104505578](http://qnimg.gisfsde.com/work/image-20220517104505578.png)

\2.    将war包放入tomcat的webapps里面

\3. 修改tomcat/bin/catalina.sh增加启动参数

  Xml代码

CATALINA_OPTS="-Djava.awt.headless=true"  

 启动Tomcat(tomcat/bin/startup.sh)

 验证：登陆 http://10.32.250.178:8080/ geoserver ，看到GeoServer页面，账号：admin，密码：geoserver

 

服务报错：

org.springframework.web.util.NestedServletException: Handler dispatch failed; nested exception is java.lang.NoClassDefFoundError: Could not initialize class sun.awt.X11GraphicsEnvironment

修改tomcat/bin/catalina.sh

在所有-Djava.io.tmpdir…后面增加一个

-Djava.awt.headless=true \

### Openfile安装

https://blog.csdn.net/github_38924695/article/details/89470960

通过xftp上传到linux中。我的目录在/opt/openoffice中

解压文件：tar -zxvf Apache_OpenOffice_4.1.6_Linux_x86-64_install-rpm_zh-CN.tar.gz
 解压后进入zh-CN目录中：

cd RPMS/ 里面都是rpm文件，我们需要安装这些文件

rpm -ivh *.rpm

进入desktop-integration/目录：cd desktop-integration/

安装openoffice:rpm -ivh openoffice4.1.6-redhat-menus-4.1.6-9790.noarch.rpm

 

### 人大金仓kingbase安装
chmod
- u 表示该文件的拥有者，g 表示与该文件的拥有者属于同一个群体(group)者，o 表示其他以外的人，a 表示这三者皆是。
- + 表示增加权限、- 表示取消权限、= 表示唯一设定权限。
- r 表示可读取，w 表示可写入，x 表示可执行，X 表示只有当该文件是个子目录或者该文件已经被设定过为可执行。
```bash
#创建新用户
useradd -m kingbase
#创建密码
passwd kingbase
#创建安装目录、对用户赋权，数据目录安装时指定创建 -p- p 可以是一个路径名称。此时若路径中的某些目录尚不存在，加上此选项后，系统将自动建立好那些尚不存在的目录，即一次可以建立多个目录
mkdir -p /opt/Kingbase/ES/V8
chmod o+rwx /opt/Kingbase/ES/V8
#挂载与取消挂载安装包
mount KingbaseES_V008R006C007B0024_Lin64_install.iso ./KingbaseESV8
umount ./KingbaseESV8
#更改命令行显示语言
echo $LANG
export LANG=zh_CN.UTF-8
#进入挂载的文件夹安装数据库
cd KingbaseESV8/
#切换kingbase用户
su kingbase
sh setup.sh -i console
#下载授权文件，解压并安装时指定 https://www.kingbase.com.cn/xzzx/index.htm
Utf-8、Oracle、大小写不敏感

#切换为root 启动数据库为服务
su root
运行 ${安装目录}/install/script/root.sh  /opt/Kingbase/ES/V8/install/script/root.sh

# 启动服务
sys_ctl -w start -D ${Data 文件目录} -l "${Data 文件目录}/sys_log/startup.log"
# 停止服务
sys_ctl stop -m fast -w -D ${Data 文件目录}
```


### Postgres安装

\1.    下载安装包

下载离线 rpm 包：https://yum.postgresql.org/rpmchart/

https://www.postgresql.org/download/

 ![image-20220517104521239](http://qnimg.gisfsde.com/work/image-20220517104521239.png)

下载4个安装包

\2.    上传到服务器

 ![image-20220517104533672](http://qnimg.gisfsde.com/work/image-20220517104533672.png)

\3.    按照顺序安装

rpm -ivh postgresql11-libs-11.12-1PGDG.rhel7.x86_64.rpm

rpm -ivh postgresql11-11.12-1PGDG.rhel7.x86_64.rpm

rpm -ivh postgresql11-server-11.12-1PGDG.rhel7.x86_64.rpm

rpm -ivh postgresql11-contrib-11.12-1PGDG.rhel7.x86_64.rpm

如果报错则在语句后面增加 --force –nodeps

例：rpm -ivh postgresql11-libs-11.12-1PGDG.rhel7.x86_64.rpm --force –nodeps

安装error

 ![image-20220517104550041](http://qnimg.gisfsde.com/work/image-20220517104550041.png)

解决：

下载安装：

http://mirror.centos.org/centos/7/os/x86_64/Packages/libicu-50.2-4.el7_7.x86_64.rpm

rpm -ivh libicu-50.2-4.el7_7.x86_64.rpm

 ![image-20220517104558058](http://qnimg.gisfsde.com/work/image-20220517104558058.png)

下载安装：

http://mirror.centos.org/centos/7/os/x86_64/Packages/libxslt-1.1.28-6.el7.x86_64.rpm

rpm -ivh libxslt-1.1.28-6.el7.x86_64.rpm

卸载：

\#ps:如果要卸载的话, 先停止postges服务，然后执行下面的命令即可

rpm -qe postgresql11-libs-11.1-1PGDG.rhel7.x86_64

rpm -qe postgresql11-11.1-1PGDG.rhel7.x86_64   

rpm -qe postgresql11-server-11.1-1PGDG.rhel7.x86_64

\4.    初始化

/usr/pgsql-11/bin/postgresql-11-setup initdb

 

\5.    启动服务

```
systemctl enable postgresql-11.service
systemctl start postgresql-11.service
vi /var/lib/pgsql/11/data/postgresql.conf
按需修改以下两行：
# *表示监听所有的ip信息，也可以使用localhost、127.0.0.1等
listen_addresses = '*'  
# 默认的监听端口为5432，也可以换为其它的
port = 5432
修改同目录下的pg_hba.conf文件，设置允许访问的ip，这里我因为是测试服务器，所以设置所有：
host all all 0.0.0.0/0 trust
重启：
systemctl restart postgresql-11.service
 
# 状态查看
service postgresql-11 status 
# 停止
service postgresql-11 stop
# 启动
service postgresql-11 start
 
 
https://blog.csdn.net/justlpf/article/details/84769813
5. 移动数据库到指定目录
5.1 移动目录
#须先执行命令:
#     1. mkdir -p /data/pgsql/  
#     2. chown postgres:postgres -R /data/pgsql
[root@VMTest ~]# mv /var/lib/pgsql/11/* /data/pgsql/
[root@VMTest ~]# chown -R postgres:postgres /data/pgsql/
[root@VMTest ~]# chmod 700 /data/pgsql/data -R
5.2 修改配置文件
#a.修改指定的数据目录
[root@VMTest ~]# vi /usr/lib/systemd/system/postgresql-11.service 
 
# 执行前须执行命令: 
#     1. mkdir -p /data/pgsql/  
#     2. chown postgres:postgres -R /data/pgsql
#     3. chmod 700 /data/pgsql/data -R
#修改Environment=PGDATA=/var/lib/pgsql/11/data/为
Environment=PGDATA=/data/pgsql/data/
 
#b.修改数据目录
[root@VMTest ~]# vi /data/pgsql/data/postgresql.conf
#执行前须执行命令: 
#     1. mkdir -p /data/pgsql/  
#     2. chown postgres:postgres -R /data/pgsql
#     3. chmod 700 /data/pgsql/data -R
#修改data_directory:
 data_directory = '/data/pgsql/data'
 
其它配置修改:
log_directory = 'log'  
max_connections = 100 
5.3 重新加载配置文件，重启数据库
[root@VMTest ~]# systemctl daemon-reload
[root@VMTest ~]# systemctl restart postgresql-11
[root@VMTest ~]# ps -ef | grep postgres  #确认启动成功
6. 修改密码
[root@VMTest ~]# su postgres
[postgres@VMTest root]$ psql
could not change directory to "/root": Permission denied
psql (11.1)
Type "help" for help.
 
postgres=# 
 
#------------------------------------------------------
#执行命令
postgres=# ALTER ROLE postgres WITH PASSWORD '123abc';
 
postgres卸载
yum remove postgresql*
验证是都卸载完毕
rpm -qa | grep postgresql
```

### Postges安装

https://blog.csdn.net/qq_33554285/article/details/111135786

1. 上传tar.gz包

   ![image-20220517104719688](http://qnimg.gisfsde.com/work/image-20220517104719688.png)

tar –zxvf ****
cd postgresql-11.5/
./configure
失败，提示

![image-20220517104735589](http://qnimg.gisfsde.com/work/image-20220517104735589.png)

查看readline是否安装
rpm -qa | grep readline

![image-20220517104745893](http://qnimg.gisfsde.com/work/image-20220517104745893.png)

./configure --without-readline

![image-20220517104754342](http://qnimg.gisfsde.com/work/image-20220517104754342.png)

Zlib 下载
http://mirror.centos.org/centos/7/os/x86_64/Packages/zlib-devel-1.2.7-18.el7.x86_64.rpm
rpm -ivh zlib-devel-1.2.7-18.el7.x86_64.rpm

make 
make install
vi /etc/profile

export PG_HOME=/usr/local/pgsql
export PATH=$PG_HOME/bin:$PATH
export LD_LIBRARY_PATH=/usr/local/pgsql/lib


source /etc/profile


查看版本
psql --version
mkdir data

sudo groupadd postgres
sudo useradd -gpostgres postgres

chown postgres:postgres /opt/postgres/data/

创建数据库集簇
su postgres -c '/usr/local/pgsql/bin/initdb -D /opt/postgres/data/’

![image-20220517104816626](http://qnimg.gisfsde.com/work/image-20220517104816626.png)

启动数据库的进程服务
/usr/local/pgsql/bin/pg_ctl -D /opt/postgres/data/ -l logfile start

![image-20220517104832306](http://qnimg.gisfsde.com/work/image-20220517104832306.png)

切换到root对postgres的/usr/local/pgsql/bin与/opt/postgres/进行赋权
chown -R postgres:postgres ./
chmod -R 700 ./data/

![image-20220517104840906](http://qnimg.gisfsde.com/work/image-20220517104840906.png)

停止pg_ctl
bin/pg_ctl -D /opt/postgres/data/ stop

![image-20220517104850281](http://qnimg.gisfsde.com/work/image-20220517104850281.png)

/usr/local/pgsql/bin/pg_ctl -D /opt/postgres/data/ -m fast start启动数据库

![image-20220517104900933](http://qnimg.gisfsde.com/work/image-20220517104900933.png)


查看数据库端口并连接

netstat -nptl

psql -p 5432b -U postgres

![image-20220517104910928](http://qnimg.gisfsde.com/work/image-20220517104910928.png)

修改data里面的配置文件
postgresql.conf： listen_address = ‘*’
port = 5432 
注释取消
在pg_hba.conf第一行添加host all all 0.0.0.0/0 md5
(md5:需要密码,trust：无需密码)
先设置trust修改密码：
alter user postgres with password ‘postgres’;
在改为MD5,重启服务
su postgres
/usr/local/pgsql/bin/pg_ctl -D /opt/postgres/data/ stop
/usr/local/pgsql/bin/pg_ctl -D /opt/postgres/data/ start

查看防火墙状态，判断是否需要放开端口

![image-20220517104923140](http://qnimg.gisfsde.com/work/image-20220517104923140.png)firewall-cmd –state
如果running
firewall-cmd --zone=public --add-port=5432/tcp --permanent

firewall-cmd --reload

firewall-cmd --zone=public --query-port=5432/tcp

### postgis安装

gdal

tar -zxvf gdal-2.4.1.tar.gz

cd gdal-2.4.1

./configure --prefix=/opt/gdal-2.4.1

make

make install

 ![image-20220517104934455](http://qnimg.gisfsde.com/work/image-20220517104934455.png)

安装proj报错

![image-20220517104941776](http://qnimg.gisfsde.com/work/image-20220517104941776.png)

Sqllite下载地址

https://www.sqlite.org/chronology.html

https://www.sqlite.org/index.html

https://www.sqlite.org/2015/...

https://blog.csdn.net/dikcychen2011/article/details/21969357

升级sqlite3版本：

https://blog.csdn.net/weixin_39559523/article/details/116814527

 

 

### 防火墙

#### 一、iptables防火墙

1、基本操作

\# 查看防火墙状态

service iptables status 

\# 停止防火墙

service iptables stop 

\# 启动防火墙

service iptables start 

\# 重启防火墙

service iptables restart 

\# 永久关闭防火墙

chkconfig iptables off 

\# 永久关闭后重启

chkconfig iptables on　　

2、开启80端口

vim /etc/sysconfig/iptables

\# 加入如下代码

-A INPUT -m state --state NEW -m tcp -p tcp --dport 80 -j ACCEPT

保存退出后重启防火墙

service iptables restart

#### 二、firewall防火墙

1、查看firewall服务状态

systemctl status firewalld

出现Active: active (running)切高亮显示则表示是启动状态。

出现 Active: inactive (dead)灰色表示停止，看单词也行。

2、查看firewall的状态

firewall-cmd --state

3、开启、重启、关闭、firewalld.service服务

\# 开启

service firewalld start

\# 重启

service firewalld restart

\# 关闭

service firewalld stop

4、查看防火墙规则

firewall-cmd --list-all

5、查询、开放、关闭端口

\# 查询端口是否开放

firewall-cmd --query-port=8080/tcp

\# 开放80端口

firewall-cmd --permanent --add-port=80/tcp

\# 移除端口

firewall-cmd --permanent --remove-port=8080/tcp

\#重启防火墙(修改配置后要重启防火墙)

firewall-cmd --reload

\# 参数解释

1、firwall-cmd：是Linux提供的操作firewall的一个工具；

2、--permanent：表示设置为持久；

3、--add-port：标识添加的端口；

原文：https://blog.csdn.net/bbwangj/article/details/74502967

## 程序部署

## 内存CPU占用排查

```
free -m
```

1. **total:** 总内存
2. **used:** 正在运行的进程使用的内存(used= total – free – buff/cache)
3. **free:** 未使用的内存 (free= total – used – buff/cache)
4. **shared:** 多个进程共享的内存
5. **buffers:** 内存保留用于内核操作一个进程队列请求
6. **cache:** 在 RAM 中保存最近使用的文件的页面缓存的大小
7. **buff/cache:** Buffers + Cache
8. **available:** 估计有多少内存可用于启动新应用程序，而无需交换。

```
cat /proc/meminfo
```

```
top
```

-   PID：进程的ID

    USER：进程所有者

     PR：进程的优先级别，越小越优先被执行

     NI：进程Nice值，代表这个进程的优先值

     VIRT：进程占用的虚拟内存

     RES：进程占用的物理内存

     SHR：进程使用的共享内存

    S：进程的状态。S表示休眠，R表示正在运行，Z表示僵死状态

     %CPU：进程占用CPU的使用

     %MEM：进程使用的物理内存和总内存的百分

     TIME+：该进程启动后占用的总的CPU时间，即占用CPU使用时间的累加值

     COMMAND：启动该进程的命令名称

## 文件操作

## 清理速度优化

df -h

du -sh *

## 进程管理

## 权限管理

## 查看服务器配置

# Linux简介

Linux，全称GNU/Linux，是一种免费使用和自由传播的[类UNIX](https://baike.baidu.com/item/类UNIX/9032872)操作系统

<img src="https://qnimg.gisfsde.com/markdown/image-20221206182827310.png" alt="image-20221206182827310" style="zoom: 80%;" />

# Linux相关资源

SecureCRT、Xshells、[VertualBox](https://www.virtualbox.org/wiki/Downloads)、[vmware](https://www.vmware.com/products/workstation-pro/workstation-pro-evaluation.html)

[CentOS](https://www.centos.org/download/)

# Linux安装

## vmware

### 1.准备vmware、linux ios镜像文件

### 2.BIOS开起虚拟化

![image-20221206192859992](https://qnimg.gisfsde.com/markdown/image-20221206192859992.png)

### 3.安装

![image-20221206191038049](https://qnimg.gisfsde.com/markdown/image-20221206191038049.png)

![image-20221206191113115](https://qnimg.gisfsde.com/markdown/image-20221206191113115.png)

![image-20221206191132430](https://qnimg.gisfsde.com/markdown/image-20221206191132430.png)

![image-20221206191207931](https://qnimg.gisfsde.com/markdown/image-20221206191207931.png)

![image-20221206191644526](https://qnimg.gisfsde.com/markdown/image-20221206191644526.png)

<img src="https://qnimg.gisfsde.com/markdown/image-20221206192238803.png" alt="image-20221206192238803" style="zoom: 67%;" />

![image-20221206192317850](https://qnimg.gisfsde.com/markdown/image-20221206192317850.png)

![image-20221206192405689](https://qnimg.gisfsde.com/markdown/image-20221206192405689.png)

![image-20221206192433743](https://qnimg.gisfsde.com/markdown/image-20221206192433743.png)

![image-20221206192449797](https://qnimg.gisfsde.com/markdown/image-20221206192449797.png)

![image-20221206192507950](https://qnimg.gisfsde.com/markdown/image-20221206192507950.png)

![image-20221206192550125](https://qnimg.gisfsde.com/markdown/image-20221206192550125.png)

![image-20221206192631511](https://qnimg.gisfsde.com/markdown/image-20221206192631511.png)

![image-20221206192643085](https://qnimg.gisfsde.com/markdown/image-20221206192643085.png)

![image-20221206193120404](https://qnimg.gisfsde.com/markdown/image-20221206193120404.png)

![image-20221206193314823](https://qnimg.gisfsde.com/markdown/image-20221206193314823.png)

<img src="https://qnimg.gisfsde.com/markdown/image-20221206193426698.png" alt="image-20221206193426698" style="zoom:67%;" />

<img src="https://qnimg.gisfsde.com/markdown/image-20221206193542304.png" alt="image-20221206193542304" style="zoom: 67%;" />

### 手动分区

<img src="https://qnimg.gisfsde.com/markdown/image-20221206194129359.png" alt="image-20221206194129359" style="zoom:67%;" />

<img src="https://qnimg.gisfsde.com/markdown/image-20221206194324197.png" alt="image-20221206194324197" style="zoom:67%;" />

<img src="https://qnimg.gisfsde.com/markdown/image-20221206194432403.png" alt="image-20221206194432403" style="zoom:67%;" />

<img src="https://qnimg.gisfsde.com/markdown/image-20221206194621193.png" alt="image-20221206194621193" style="zoom:67%;" />

<img src="https://qnimg.gisfsde.com/markdown/image-20221206194640454.png" alt="image-20221206194640454" style="zoom:67%;" />

<img src="https://qnimg.gisfsde.com/markdown/image-20221206194743948.png" alt="image-20221206194743948" style="zoom:67%;" />

<img src="https://qnimg.gisfsde.com/markdown/image-20221206195103259.png" alt="image-20221206195103259" style="zoom:67%;" />

<img src="https://qnimg.gisfsde.com/markdown/image-20221206200015497.png" alt="image-20221206200015497" style="zoom:67%;" />

### 克隆

vmware 右键克隆，

修改vim /etc/sysconfig/network-scripts/ifcfg-ens33 ,修改IP 地址

修改/etc/hostname 或hostname命令,修改主机名

# 启动过程

![image-20210628202034974](http://qnimg.gisfsde.com/work/image-20210628202034974.png)

内核的引导。

- 电源

	- BIOS开机自检，按照BIOS中设置的启动设备（通常是硬盘）来启动

		- 操作系统接管硬件以后，首先读入 /boot 目录下的内核文件。

## 运行 init

- init程序的类型

	- SysV: init, CentOS 5之前, 配置文件： /etc/inittab。
	- Upstart: init,CentOS 6, 配置文件： /etc/inittab, /etc/init/*.conf。
	- Systemd： systemd, CentOS 7,配置文件： /usr/lib/systemd/system、 /etc/systemd/system。

- init 进程是系统所有进程的起点，你可以把它比拟成系统所有进程的老祖宗，没有这个进程，系统中任何进程都不会启动。
init 程序首先是需要读取配置文件 /etc/inittab。
- 运行级别

	- 程序需要开机启动。它们在Windows叫做"服务"（service），在Linux就叫做"守护进程"（daemon）。

init进程的一大任务，就是去运行这些开机启动的程序。

但是，不同的场合需要启动不同的程序，比如用作服务器时，需要启动Apache，用作桌面就不需要。

Linux允许为不同的场合，分配不同的开机启动程序，这就叫做"运行级别"（runlevel）。也就是说，启动时根据"运行级别"，确定要运行哪些程序。

	- 运行级别0：系统停机状态，系统默认运行级别不能设为0，否则不能正常启动
运行级别1：单用户工作状态，root权限，用于系统维护，禁止远程登陆
运行级别2：多用户状态(没有NFS)
运行级别3：完全的多用户状态(有NFS)，登陆后进入控制台命令行模式
运行级别4：系统未使用，保留
运行级别5：X11控制台，登陆后进入图形GUI模式
运行级别6：系统正常关闭并重启，默认运行级别不能设为6，否则不能正常启动

## 系统初始化

- si::sysinit:/etc/rc.d/rc.sysinit　它调用执行了/etc/rc.d/rc.sysinit，而rc.sysinit是一个bash shell的脚本，它主要是完成一些系统初始化的工作，rc.sysinit是每一个运行级别都要首先运行的重要脚本。
它主要完成的工作有：激活交换分区，检查磁盘，加载硬件模块以及其它一些需要优先执行任务。
- l5:5:wait:/etc/rc.d/rc 5
这一行表示以5为参数运行/etc/rc.d/rc，/etc/rc.d/rc是一个Shell脚本，它接受5作为参数，去执行/etc/rc.d/rc5.d/目录下的所有的rc启动脚本，/etc/rc.d/rc5.d/目录中的这些启动脚本实际上都是一些连接文件，而不是真正的rc启动脚本，真正的rc启动脚本实际上都是放在/etc/rc.d/init.d/目录下。

而这些rc启动脚本有着类似的用法，它们一般能接受start、stop、restart、status等参数。

/etc/rc.d/rc5.d/中的rc启动脚本通常是K或S开头的连接文件，对于以 S 开头的启动脚本，将以start参数来运行。

而如果发现存在相应的脚本也存在K打头的连接，而且已经处于运行态了(以/var/lock/subsys/下的文件作为标志)，则将首先以stop为参数停止这些已经启动了的守护进程，然后再重新运行。

这样做是为了保证是当init改变运行级别时，所有相关的守护进程都将重启。

至于在每个运行级中将运行哪些守护进程，用户可以通过chkconfig或setup中的"System Services"来自行设定。

## 建立终端 

- rc执行完毕后，返回init。这时基本系统环境已经设置好了，各种守护进程也已经启动了。

init接下来会打开6个终端，以便用户登录系统。在inittab中的以下6行就是定义了6个终端：

1:2345:respawn:/sbin/mingetty tty1
2:2345:respawn:/sbin/mingetty tty2
3:2345:respawn:/sbin/mingetty tty3
4:2345:respawn:/sbin/mingetty tty4
5:2345:respawn:/sbin/mingetty tty5
6:2345:respawn:/sbin/mingetty tty6
从上面可以看出在2、3、4、5的运行级别中都将以respawn方式运行mingetty程序，mingetty程序能打开终端、设置模式。

同时它会显示一个文本登录界面，这个界面就是我们经常看到的登录界面，在这个登录界面中会提示用户输入用户名，而用户输入的用户将作为参数传给login程序来验证用户的身份。

## 用户登录系统

- 一般来说，用户的登录方式有三种：

（1）命令行登录
（2）ssh登录
（3）图形界面登录
- 对于运行级别为5的图形方式用户来说，他们的登录是通过一个图形化的登录界面。登录成功后可以直接进入 KDE、Gnome 等窗口管理器。

而本文主要讲的还是文本方式登录的情况：当我们看到mingetty的登录界面时，我们就可以输入用户名和密码来登录系统了。

Linux 的账号验证程序是 login，login 会接收 mingetty 传来的用户名作为用户名参数。

然后 login 会对用户名进行分析：如果用户名不是 root，且存在 /etc/nologin 文件，login 将输出 nologin 文件的内容，然后退出。

这通常用来系统维护时防止非root用户登录。只有/etc/securetty中登记了的终端才允许 root 用户登录，如果不存在这个文件，则 root 用户可以在任何终端上登录。

/etc/usertty文件用于对用户作出附加访问限制，如果不存在这个文件，则没有其他限制。

## 图形模式与文字模式的切换方式

- Linux预设提供了六个命令窗口终端机让我们来登录。

默认我们登录的就是第一个窗口，也就是tty1，这个六个窗口分别为tty1,tty2 … tty6，你可以按下Ctrl + Alt + F1 ~ F6 来切换它们。

如果你安装了图形界面，默认情况下是进入图形界面的，此时你就可以按Ctrl + Alt + F1 ~ F6来进入其中一个命令窗口界面。

当你进入命令窗口界面后再返回图形界面只要按下Ctrl + Alt + F7 就回来了。

如果你用的vmware 虚拟机，命令窗口切换的快捷键为 Alt + Space + F1~F6. 如果你在图形界面下请按Alt + Shift + Ctrl + F1~F6 切换至命令窗口。

## Linux 关机

- 在linux领域内大多用在服务器上，很少遇到关机的操作。毕竟服务器上跑一个服务是永无止境的，除非特殊情况下，不得已才会关机。

正确的关机流程为：sync > shutdown > reboot > halt

关机指令为：shutdown ，你可以man shutdown 来看一下帮助文档。

例如你可以运行如下命令关机：

sync 将数据由内存同步到硬盘中。

shutdown 关机指令，你可以man shutdown 来看一下帮助文档。例如你可以运行如下命令关机：

shutdown –h 10 ‘This server will shutdown after 10 mins’ 这个命令告诉大家，计算机将在10分钟后关机，并且会显示在登陆用户的当前屏幕中。

shutdown –h now 立马关机

shutdown –h 20:25 系统会在今天20:25关机

shutdown –h +10 十分钟后关机

shutdown –r now 系统立马重启

shutdown –r +10 系统十分钟后重启

reboot 就是重启，等同于 shutdown –r now

halt 关闭系统，等同于shutdown –h now 和 poweroff
最后总结一下，不管是重启系统还是关闭系统，首先要运行 sync 命令，把内存中的数据写到磁盘中。

关机的命令有 shutdown –h now halt poweroff 和 init 0 , 重启系统的命令有 shutdown –r now reboot init 6。

# 注意事项

严格区分大小写

所有内容以文件形式保存，包括硬件

- 硬件/dev/sd[a-p]
- 光盘文件/dec/sr0等

不靠扩展名区分文件类型

- 有扩展都是给管理员看的

所有存储设备都需要挂载之后才能使用

windows程序不能直接在linux安装运行

服务器不允许关机，只能重启

- 重启时应该关闭服务

服务器访问高峰不要使用高负载命令

远程配置防火墙时不要把自己踢出服务器

指定合理密码规范并定期更新

合理分配权限

定期备份重要数据和日志

# 系统目录结构

linux系统中一切皆文件

![image-20210628202151998](http://qnimg.gisfsde.com/work/image-20210628202151998.png)

###  命令   `ls`    查看当前目录下所有目录

### /bin：
bin 是 Binaries (二进制文件) 的缩写, 这个目录存放着最经常使用的命令，比如ls,cd等。

### /boot：

这里存放的是启动 Linux 时使用的一些核心文件，包括一些连接文件以及镜像文件。

### /dev ：

dev 是 Device(设备) 的缩写, 该目录下存放的是 Linux 的外部设备，在 Linux 中访问设备的方式和访问文件的方式是相同的。

### /etc：

etc 是 Etcetera(等等) 的缩写,这个目录用来存放所有的系统管理所需要的配置文件和子目录。

### /home：

用户的主目录，在 Linux 中，每个用户都有一个自己的目录，一般该目录名是以用户的账号命名的，如上图中的 alice、bob 和 eve。

### /lib：

lib 是 Library(库) 的缩写这个目录里存放着系统最基本的动态连接共享库，其作用类似于 Windows 里的 DLL 文件。几乎所有的应用程序都需要用到这些共享库。

### /lost+found：

这个目录一般情况下是空的，当系统非法关机后，这里就存放了一些文件。

### /media：

linux 系统会自动识别一些设备，例如U盘、光驱等等，当识别后，Linux 会把识别的设备挂载到这个目录下。

### /mnt：

系统提供该目录是为了让用户临时挂载别的文件系统的，我们可以将光驱挂载在 /mnt/ 上，然后进入该目录就可以查看光驱里的内容了。

### /opt：

opt 是 optional(可选) 的缩写，这是给主机额外安装软件所摆放的目录。比如你安装一个ORACLE数据库则就可以放到这个目录下。默认是空的。

### /proc：

proc 是 Processes(进程) 的缩写，/proc 是一种伪文件系统（也即虚拟文件系统），存储的是当前内核运行状态的一系列特殊文件，这个目录是一个虚拟的目录，它是系统内存的映射，我们可以通过直接访问这个目录来获取系统信息。
这个目录的内容不在硬盘上而是在内存里，我们也可以直接修改里面的某些文件，比如可以通过下面的命令来屏蔽主机的ping命令，使别人无法ping你的机器：

echo 1 > /proc/sys/net/ipv4/icmp_echo_ignore_all

### /root：

该目录为系统管理员，也称作超级权限者的用户主目录。

### /sbin：

s 就是 Super User 的意思，是 Superuser Binaries (超级用户的二进制文件) 的缩写，这里存放的是系统管理员使用的系统管理程序。

### /selinux：

 这个目录是 Redhat/CentOS 所特有的目录，Selinux 是一个安全机制，类似于 windows 的防火墙，但是这套机制比较复杂，这个目录就是存放selinux相关的文件的。

### /srv：

 该目录存放一些服务启动之后需要提取的数据。

### /sys：

这是 Linux2.6 内核的一个很大的变化。该目录下安装了 2.6 内核中新出现的一个文件系统 sysfs 。

sysfs 文件系统集成了下面3种文件系统的信息：针对进程信息的 proc 文件系统、针对设备的 devfs 文件系统以及针对伪终端的 devpts 文件系统。

该文件系统是内核设备树的一个直观反映。

当一个内核对象被创建的时候，对应的文件和目录也在内核对象子系统中被创建。

### /tmp：

tmp 是 temporary(临时) 的缩写这个目录是用来存放一些临时文件的。

### /usr：

 usr 是 unix shared resources(共享资源) 的缩写，这是一个非常重要的目录，用户的很多应用程序和文件都放在这个目录下，类似于 windows 下的 program files 目录。

### /usr/bin：

系统用户使用的应用程序。

### /usr/sbin：

超级用户使用的比较高级的管理程序和系统守护程序。

### /usr/src：

内核源代码默认的放置目录。

### /var：

var 是 variable(变量) 的缩写，这个目录中存放着在不断扩充着的东西，我们习惯将那些经常被修改的目录放在这个目录下。包括各种日志文件。

### /run：

是一个临时文件系统，存储系统启动以来的信息。当系统重启时，这个目录下的文件应该被删掉或清除。如果你的系统上有 /var/run 目录，应该让它指向 run。

在 Linux 系统中，有几个目录是比较重要的，平时需要注意不要误删除或者随意更改内部文件。

### /etc：

 上边也提到了，这个是系统中的**配置文件**，如果你更改了该目录下的某个文件可能会导致系统不能启动。

### /bin, /sbin, /usr/bin, /usr/sbin: 

这是系统预设的执行文件的放置目录，比如 ls 就是在 /bin/ls 目录下的。

值得提出的是，/bin, /usr/bin 是给系统用户使用的指令（除root外的通用户），而/sbin, /usr/sbin 则是给 root 使用的指令。

### /var： 

这是一个非常重要的目录，系统上跑了很多程序，那么每个程序都会有相应的日志产生，而这些日志就被记录到这个目录下，具体在 /var/log 目录下，另外 mail 的预设放置也是在这里。

忘记密码解决方法https://www.runoob.com/linux/linux-forget-password.html

# vi/vim

linux输入汉字：设置语言中，输入源添加`汉语PINYIN` ,win+空格切换输入法

所有的 Unix Like 系统都会内建 vi 文书编辑器，其他的文书编辑器则不一定会存在。但是目前我们使用比较多的是 vim 编辑器。vim 具有程序编辑的能力，可以主动的以字体颜色辨别语法的正确性，方便程序设计。

### 什么是 vim？

Vim是从 vi 发展出来的一个文本编辑器。代码补完、编译及错误跳转等方便编程的功能特别丰富，在程序员中被广泛使用。
简单的来说， vi 是老式的字处理器，不过功能已经很齐全了，但是还是有可以进步的地方。 vim 则可以说是程序开发者的一项很好用的工具。
连 vim 的官方网站 (http://www.vim.org) 自己也说 vim 是一个程序开发工具而不是文字处理软件。
vim 键盘图：

<img src="http://qnimg.gisfsde.com/work/image-20210628202603114.png" alt="image-20210628202603114" style="zoom: 67%;" />

### vi/vim 的使用

#### 三种模式

![image-20221207184835968](https://qnimg.gisfsde.com/markdown/image-20221207184835968.png)

命令模式（Command mode），输入模式（Insert mode）和底线命令模式（Last line mode）。

 这三种模式的作用分别是：

- **命令模式：**

  用户刚刚启动 vi/vim，便进入了命令模式。

此状态下敲击键盘动作会被Vim识别为命令，而非输入字符。比如我们此时按下i，并不会输入一个字符，i被当作了一个命令。

常用的几个命令：

i 切换到输入模式，以输入字符。
x 删除当前光标所在处的字符。
: 切换到底线命令模式，以在最底一行输入命令。
若想要编辑文本：启动Vim，进入了命令模式，按下i，切换到输入模式。命令模式只有一些最基本的命令，因此仍要依靠底线命令模式输入更多命令。

![image-20221207185408582](https://qnimg.gisfsde.com/markdown/image-20221207185408582.png)

- **输入模式**

在命令模式下按下下标常用语法进入输入模式。在输入模式中，可以使用以下按键：字符按键以及Shift组合，输入字符
ENTER，回车键，换行
BACK SPACE，退格键，删除光标前一个字符
DEL，删除键，删除光标后一个字符
方向键，在文本中移动光标
HOME/END，移动光标到行首/行尾
Page Up/Page Down，上/下翻页
Insert，切换光标为输入/替换模式，光标将变成竖线/下划线
ESC，退出输入模式，切换到命令模式

![image-20221207191024927](https://qnimg.gisfsde.com/markdown/image-20221207191024927.png)

- **底线命令模式**

在命令模式下按下`:`（英文冒号）就进入了底线命令模式。底线命令模式可以输入单个或多个字符的命令，可用的命令非常多。在底线命令模式中，基本的命令有（已经省略了冒号）：

：q 退出程序
：w 保存文件
：set nu/nonu 显示/隐藏行号

按ESC键可随时退出底线命令模式。

![image-20221207191654346](https://qnimg.gisfsde.com/markdown/image-20221207191654346.png)

### vi/vim 使用实例

- 使用 vi/vim 进入一般模式
  如果你想要使用 vi 来建立一个名为 runoob.txt 的文件时，你可以这样做：

$ vim runoob.txt
直接输入 vi 文件名 就能够进入 vi 的一般模式了。请注意，记得 vi 后面一定要加文件名，不管该文件存在与否！

	- 按下 i 进入输入模式(也称为编辑模式)，开始编辑文字

在一般模式之中，只要按下 i, o, a 等字符就可以进入输入模式了！

在编辑模式当中，你可以发现在左下角状态栏中会出现 –INSERT- 的字样，那就是可以输入任意字符的提示。

这个时候，键盘上除了 Esc 这个按键之外，其他的按键都可以视作为一般的输入按钮了，所以你可以进行任何的编辑。

	- 按下 ESC 按钮回到一般模式

好了，假设我已经按照上面的样式给他编辑完毕了，那么应该要如何退出呢？是的！没错！就是给他按下 Esc 这个按钮即可！马上你就会发现画面左下角的 – INSERT – 不见了！

在一般模式中按下 :wq 储存后离开 vi
OK，我们要存档了，存盘并离开的指令很简单，输入 :wq 即可保存离开！

	- Linux vi_vim _ 菜鸟教程.pdf

# 网络配置

## 三种网络连接模式

### 桥接模式

虚拟机直接连接外部物理网络的模式，主机起到了网桥的作用。这种模式下，虚拟机可以直接访问外部网络，并且对外部网络是可见的。

### NAT模式

NAT(network address transtion),虚拟机和主机构建一个专用网络，并通过虚拟网络地址转换 （NAT） 设备对IP进行转
换。虚拟机通过共享主机IP可以访间外部网络，但外部网络无法访间虚拟机。VMnet8

### 仅主机模式

虚拟机只与主机共享一个专用网络，与外部网络无法通信。VMnet1

## 配置固定静态IP

创建两个网卡，记录两个网卡mac地址

> nat([虚拟机](https://so.csdn.net/so/search?q=虚拟机&spm=1001.2101.3001.7020)访问互联网，使用10.0.2.x段)
> host-only(虚拟机和主机互相通信，使用192.168.56.x段)

ip addr 查看默认网卡名，比如我的是enp0s3

vim /etc/sysconfig/network-scripts/ifcfg-enp0s3

vim /etc/sysconfig/network-scripts/ifcfg-enp0s8  没有则复制enp0s3改名

![image-20220909134929629](https://qnimg.gisfsde.com/markdown/image-20220909134929629.png)

```bash
#enp0s3  -------------------------------------------------
TYPE=Ethernet
OXY_METHOD=none
BROWSER_ONLY=no
BOOTPROTO=dhcp   #与网卡二不同
DEFROUTE=yes
IPV4_FAILURE_FATAL=no
IPV6INIT=yes
IPV6_AUTOCONF=yes
IPV6_DEFROUTE=yes
IPV6_FAILURE_FATAL=no
IPV6_ADDR_GEN_MODE=stable-privacy
NAME=enp0s3
UUID=80be22a5-036c-456b-8d95-ad5cea885024
DEVICE=enp0s3
ONBOOT=yes

HWADDR=08:00:27:E4:3E:0E  #nat网卡mac地址

#enp0s8  -------------------------------------------------
YPE=Ethernet
OXY_METHOD=none			   # 代理方式：关闭状态
BROWSER_ONLY=no			  # 只是浏览器：否	
BOOTPROTO=static		  # 网卡的引导协议：DHCP[中文名称: 动态主机配置协议]
DEFROUTE=yes			 # 默认路由：是

PEERDNS=yes
PEERROUTES=yes

IPV4_FAILURE_FATAL=no		 # 是不开启IPV4致命错误检测：否
IPV6INIT=yes				# IPV6是否自动初始化: 是[不会有任何影响, 现在还没用到IPV6]
IPV6_AUTOCONF=yes            # IPV6是否自动配置：是[不会有任何影响, 现在还没用到IPV6]
IPV6_DEFROUTE=yes           # IPV6是否可以为默认路由：是[不会有任何影响, 现在还没用到IPV6]

IPV6_PEERDNS=yes
IPV6_PEERROUTES=yes

IPV6_FAILURE_FATAL=no        # 是不开启IPV6致命错误检测：否
IPV6_ADDR_GEN_MODE=stable-privacy  # IPV6地址生成模型：stable-privacy [这只一种生成IPV6的策略]
NAME=enp0s8  #网卡名不同                      # 网卡物理设备名称
UUID=80be22a5-036c-456b-8d95-ad5cea785024    # 通用唯一识别码, 每一个网卡都会有, 不能重复, 否两台linux只有一台网卡可用
DEVICE=enp0s8                    # 网卡设备名称, 必须和 `NAME` 值一样
ONBOOT=yes

HWADDR=08:00:27:61:B5:38 #host-only网卡mac地址
IPADDR=192.168.56.150  #固定IP
NETMASK=255.255.255.0   #子网掩码 

GATEWAY=”192.168.66.2” #网关IP  
```

![image-20221208191903556](https://qnimg.gisfsde.com/markdown/image-20221208191903556.png)

vi  /etc/sysconfig/network NETWORKING=yes  这样宿主机可ping虚拟机

service network restart

这样即可宿主与虚拟机两者互通，虚拟机也可访问外网

![image-20220909135859927](https://qnimg.gisfsde.com/markdown/image-20220909135859927.png)

方式二：网卡二使用桥接模式

![在这里插入图片描述](https://qnimg.gisfsde.com/markdown/20210702110159831.png)

## 修改主机名

```bash
#查看
hostname
#修改
vi /etc/hostname  #重启生效
hostnamectl set- hostname 主机名 #立即生效
#修改host
vim /etc/hosts
```

# 系统管理

计算机中，一个正在执行的程序或命令，被叫做“进程”（process）。
启动之后一只存在、常驻内存的进程，一般被称作“服务”（service）。

## 服务管理

### centos6

#### 1） 基本语法

service 服务名 start | stop | restart | status

#### 2） 经验技巧

查看服务的方法：/etc/init.d/服务名,发现只有两个服务保留在service

#### 3)系统运行级别

![image-20221209134141144](https://qnimg.gisfsde.com/markdown/image-20221209134141144.png)

### centos7

#### 1） 基本语法

systemctl start | stop | restart | status 服务名

#### 2） 经验技巧

查看服务的方法：/usr/lib/systemd/system

#### 3）systemctl 设置后台服务的自启配置

systemctl list-unit-files （功能描述：查看服务开机启动状态）
systemctl disable service_name （功能描述：关掉指定服务的自动启动）
systemctl enable service_name （功能描述：开启指定服务的自动启动）

#### 4)系统运行级别

multi-user.target 等价于原运行级别3（多用户有网，无图形界面）
graphical.target 等价于原运行级别5（多用户有网，有图形界面）

查看当前运行级别:
systemctl get-default
修改当前运行级别
systemctl set-default TARGET.target （这里TARGET 取multi-user 或者graphical）

## 关闭防火墙

1） 临时关闭防火墙
（1）查看防火墙状态
[root@hadoop100 桌面]# systemctl status firewalld
（2）临时关闭防火墙
[root@hadoop100 桌面]# systemctl stop firewalld
2）开机启动时关闭防火墙
（1）查看防火墙开机启动状态
[root@hadoop100 桌面]# systemctl enable firewalld.service
（2）设置开机时关闭防火墙
[root@hadoop100 桌面]# systemctl disable firewalld.service

## 重启linux系统

1）基本语法
（1）sync （功能描述：将数据由内存同步到硬盘中）
（2）halt （功能描述：停机，关闭系统，但不断电）
（3）poweroff （功能描述：关机，断电）
（3）reboot （功能描述：就是重启，等同于shutdown -r now）
（4）shutdown [选项] 时间

选项功能
-H 相当于--halt，停机
-r -r=reboot 重启
参数功能
now 立刻关机
时间等待多久后关机（时间单位是分钟）。

- 3 秒之内要按一下回车

	- 输入e

		- 第二行最后边输入 single，有一个空格。具体方法为按向下尖头移动到第二行，按"e"进入编辑模式

			- 在后边加上single 回车

				- 最后按"b"启动，启动后就进入了单用户模式了
			
					- 更改root密码了。更密码的命令为 passwd

## 光盘启动，按F5 进入rescue模式

- 输入linux rescue 回车

	- 选择英语

		- 选择us 键盘

			- 问你是否启动网络，有时候可能会联网调试。我们选no

				- 这里告诉我们，接下来会把系统挂载在/mnt/sysimage 中。

其中有三个选项:

Continue 就是挂载后继续下一步。 
Read-Only 挂载成只读，这样更安全，有时文件系统损坏时，只读模式会防止文件系统近一步损坏。
Skip就是不挂载，进入一个命令窗口模式。 
这里我们选择Continue。

	- 至此，系统已经挂载到了/mnt/sysimage中。接下来回车，输入chroot /mnt/sysimage 进入管理员环境。

# 远程登录

Linux 一般作为服务器使用，而服务器一般放在机房，你不可能在机房操作你的 Linux 服务器。这时我们就需要远程登录到Linux服务器来管理维护系统。

Linux 系统中是通过 ssh 服务实现的远程登录功能，默认 ssh 服务端口号为 22。
Window 系统上 Linux 远程登录客户端有 SecureCRT, Putty, SSH Secure Shell 等，本文以 Putty 为例来登录远程服务器。
Putty 下载地址：https://www.putty.org/

- 在Host Name( or IP address) 下面的框中输入你要登录的远程服务器IP(可以通过ifconfig命令查看服务器ip)，然后回车。

	- 输入要登录的用户名。

		- 再输入密码，就能登录到远程的linux系统了

### 使用密钥认证机制远程登录linux

- SSH 为 Secure Shell 的缩写，由 IETF 的网络工作小组（Network Working Group）所制定。

	SSH 为建立在应用层和传输层基础上的安全协议。
	首先使用工具 PUTTYGEN.EXE 生成密钥对。打开工具 PUTTYGEN.EXE 后如下图所示：
	
	- 该工具可以生成三种格式的key ：SSH-1(RSA) SSH-2(RSA) SSH-2(DSA) ，我们采用默认的格式即 SSH-2(RSA)。Number of bits in a generated key 这个是指生成的key的大小，这个数值越大，生成的key就越复杂，安全性就越高。这里我们写 2048。
	
		- Generate 
	
			- 过程中鼠标要来回的动，否则这个进度条是不会动的。
	
				- 可以给你的密钥输入一个密码，（在Key Passphrase那里）也可以留空。然后点 Save public key 保存公钥，点 Save private Key 保存私钥。笔者建议你放到一个比较安全的地方，一来防止别人偷窥，二来防止误删除。接下来就该到远程 linux 主机上设置了。

1）创建目录 /root/.ssh 并设置权限

[root@localhost ~]# mkdir /root/.ssh mkdir 命令用来创建目录，以后会详细介绍，暂时只了解即可。

[root@localhost ~]# chmod 700 /root/.ssh chmod 命令是用来修改文件属性权限的，以后会详细介绍。

2）创建文件 / root/.ssh/authorized_keys

[root@localhost ~]# vim /root/.ssh/authorized_keys vim 命令是编辑一个文本文件的命令，同样在后续章节详细介绍。

3）打开刚才生成的public key 文件，建议使用写字板打开，这样看着舒服一些，复制从AAAA开头至 "---- END SSH2 PUBLIC KEY ----" 该行上的所有内容，粘贴到/root/.ssh/authorized_keys 文件中，要保证所有字符在一行。（可以先把复制的内容拷贝至记事本，然后编辑成一行载粘贴到该文件中）。

在这里要简单介绍一下，如何粘贴，用vim打开那个文件后，该文件不存在，所以vim会自动创建。按一下字母"i"然后同时按shift + Insert 进行粘贴（或者单击鼠标右键即可），前提是已经复制到剪切板中了。粘贴好后，然后把光标移动到该行最前面输入 ssh-rsa ，然后按空格。再按ESC，然后输入冒号wq 即 :wq 就保存了。格式如下图：

					- 再设置putty选项，点窗口左侧的SSh –> Auth ，单击窗口右侧的Browse… 选择刚刚生成的私钥， 再点Open ，此时输入root，就不用输入密码就能登录了。如果在前面你设置了Key Passphrase ，那么此时就会提示你输入密码的。为了更加安全建议大家要设置一个Key Passphrase。

# 文件基本属性

### Linux 系统是一种典型的多用户系统，不同的用户处于不同的地位，拥有不同的权限。

为了保护系统的安全性，Linux 系统对不同的用户访问同一文件（包括目录文件）的权限做了不同的规定。

在 Linux 中我们通常使用以下两个命令来修改文件或目录的所属用户与权限：

chown (change ownerp) ： 修改所属用户与组。
chmod (change mode) ： 修改用户的权限。

- 使用 ll 或者 ls –l 命令来显示一个文件的属性以及文件所属的用户和组，如：

[root@www /]# ls -l
total 64
dr-xr-xr-x   2 root root 4096 Dec 14  2012 bin
dr-xr-xr-x   4 root root 4096 Apr 19  2012 boot
……

- 实例中，bin 文件的第一个属性用 d 表示。d 在 Linux 中代表该文件是一个目录文件。

在 Linux 中第一个字符代表这个文件是目录、文件或链接文件等等。

当为 d 则是目录
当为 - 则是文件；
若是 l 则表示为链接文档(link file)；
若是 b 则表示为装置文件里面的可供储存的接口设备(可随机存取装置)；
若是 c 则表示为装置文件里面的串行端口设备，例如键盘、鼠标(一次性读取装置)。

- 接下来的字符中，以三个为一组，且均为 rwx 的三个参数的组合。其中， r 代表可读(read)、 w 代表可写(write)、 x 代表可执行(execute)。 要注意的是，这三个权限的位置不会改变，如果没有权限，就会出现减号 - 而已。

- 每个文件的属性由左边第一部分的 10 个字符来确定（如图）。

![点击查看源网页](https://qnimg.gisfsde.com/markdown/4cedd5e3969b2b68424498c8e3e16405.png)

从左至右用 0-9 这些数字来表示。
第 0 位确定文件类型，
第 1-3 位确定属主（该文件的所有者）拥有该文件的权限。
第4-6位确定属组（所有者的同组用户）拥有该文件的权限，第7-9位确定其他用户拥有该文件的权限。
其中，第 1、4、7 位表示读权限，如果用 r 字符表示，则有读权限，如果用 - 字符表示，则没有读权限；
第 2、5、8 位表示写权限，如果用 w 字符表示，则有写权限，如果用 - 字符表示没有写权限；第 3、6、9 位表示可执行权限，如果用 x 字符表示，则有执行权限，如果用 - 字符表示，则没有执行权限。

### Linux文件属主和属组

- [root@www /]# ls -l
total 64
drwxr-xr-x 2 root  root  4096 Feb 15 14:46 cron
drwxr-xr-x 3 mysql mysql 4096 Apr 21  2014 mysql
……
对于文件来说，它都有一个特定的所有者，也就是对该文件具有所有权的用户。

同时，在Linux系统中，用户是按组分类的，一个用户属于一个或多个组。

文件所有者以外的用户又可以分为文件所有者的同组用户和其他用户。

因此，Linux系统按文件所有者、文件所有者同组用户和其他用户来规定了不同的文件访问权限。

在以上实例中，mysql 文件是一个目录文件，属主和属组都为 mysql，属主有可读、可写、可执行的权限；与属主同组的其他用户有可读和可执行的权限；其他用户也有可读和可执行的权限。

对于 root 用户来说，一般情况下，文件的权限对其不起作用。

### 更改文件属性

- chgrp：更改文件属组
语法：chgrp [-R] 属组名 文件名
参数选项
-R：递归更改文件属组，就是在更改某个目录文件的属组时，如果加上-R的参数，那么该目录下的所有文件的属组都会更改。
- chown：更改文件属主，也可以同时更改文件属组
语法：
chown [–R] 属主名 文件名
chown [-R] 属主名：属组名 文件名
进入 /root 目录（~）将install.log的拥有者改为bin这个账号：
[root@www ~] cd ~
[root@www ~]# chown bin install.log
[root@www ~]# ls -l
-rw-r--r--  1 bin  users 68495 Jun 25 08:53 install.log
将install.log的拥有者与群组改回为root：
[root@www ~]# chown root:root install.log
[root@www ~]# ls -l
-rw-r--r--  1 root root 68495 Jun 25 08:53 install.log
- chmod：更改文件9个属性
Linux文件属性有两种设置方法，一种是数字，一种是符号。

Linux 文件的基本权限就有九个，分别是 owner/group/others(拥有者/组/其他) 三种身份各有自己的 read/write/execute 权限。

先复习一下刚刚上面提到的数据：文件的权限字符为： -rwxrwxrwx ， 这九个权限是三个三个一组的！其中，我们可以使用数字来代表各个权限，各权限的分数对照表如下：
r:4
w:2
x:1
每种身份(owner/group/others)各自的三个权限(r/w/x)分数是需要累加的，例如当权限为： -rwxrwx--- 分数则是：
owner = rwx = 4+2+1 = 7
group = rwx = 4+2+1 = 7
others= --- = 0+0+0 = 0
所以等一下我们设定权限的变更时，该文件的权限数字就是 770。变更权限的指令 chmod 的语法是这样的：
 chmod [-R] xyz 文件或目录
选项与参数：
xyz : 就是刚刚提到的数字类型的权限属性，为 rwx 属性数值的相加。
-R : 进行递归(recursive)的持续变更，亦即连同次目录下的所有文件都会变更
举例来说，如果要将 .bashrc 这个文件所有的权限都设定启用，那么命令如下：
[root@www ~]# ls -al .bashrc
-rw-r--r--  1 root root 395 Jul  4 11:45 .bashrc
[root@www ~]# chmod 777 .bashrc
[root@www ~]# ls -al .bashrc
-rwxrwxrwx  1 root root 395 Jul  4 11:45 .bashrc
那如果要将权限变成 -rwxr-xr-- 呢？那么权限的分数就成为 [4+2+1][4+0+1][4+0+0]=754。

### 符号类型改变文件权限

- 还有一个改变权限的方法，从之前的介绍中我们可以发现，基本上就九个权限分别是：

user：用户
group：组
others：其他
那么我们就可以使用 u, g, o 来代表三种身份的权限。

此外， a 则代表 all，即全部的身份。读写的权限可以写成 r, w, x，也就是可以使用下表的方式来看：

chmod	u
g
o
a	+(加入)
-(除去)
=(设定)	r
w
x	文件或目录
如果我们需要将文件权限设置为 -rwxr-xr-- ，可以使用 chmod u=rwx,g=rx,o=r 文件名 来设定:

touch test1    // 创建 test1 文件

ls -al test1    // 查看 test1 默认权限

-rw-r--r-- 1 root root 0 Nov 15 10:32 test1

chmod u=rwx,g=rx,o=r  test1    // 修改 test1 权限

ls -al test1

-rwxr-xr-- 1 root root 0 Nov 15 10:32 test1
而如果是要将权限去掉而不改变其他已存在的权限呢？例如要拿掉全部人的可执行权限，则：

chmod  a-x test1

ls -al test1

-rw-r--r-- 1 root root 0 Nov 15 10:32 test1

# 文件与目录管理

Linux的目录结构为树状结构，最顶级的目录为根目录 /。

其他目录通过挂载可以将它们添加到树中，通过解除挂载可以移除它们。
在开始本教程前我们需要先知道什么是绝对路径与相对路径。

- 绝对路径：
路径的写法，由根目录 / 写起，例如： /usr/share/doc 这个目录。

- 相对路径：
  路径的写法，不是由 / 写起，例如由 /usr/share/doc 要到 /usr/share/man 底下时，可以写成： cd ../man 这就是相对路径的写法。

## 处理目录的常用命令

- ls（英文全拼：list files）: 列出目录及文件名
cd（英文全拼：change directory）：切换目录
pwd（英文全拼：print work directory）：显示目前的目录
mkdir（英文全拼：make directory）：创建一个新的目录
rmdir（英文全拼：remove directory）：删除一个空的目录
cp（英文全拼：copy file）: 复制文件或目录
rm（英文全拼：remove）: 移除文件或目录
mv（英文全拼：move file）: 移动文件与目录，或修改文件与目录的名称
你可以使用 man [命令] 来查看各个命令的使用文档，如 ：man cp。

	- ls (列出目录)
在Linux系统当中， ls 命令可能是最常被运行的。
语法：
[root@www ~]# ls [-aAdfFhilnrRSt] 目录名称
[root@www ~]# ls [--color={never,auto,always}] 目录名称
[root@www ~]# ls [--full-time] 目录名称
选项与参数：
-a ：全部的文件，连同隐藏文件( 开头为 . 的文件) 一起列出来(常用)
-d ：仅列出目录本身，而不是列出目录内的文件数据(常用)
-l ：长数据串列出，包含文件的属性与权限等等数据；(常用)
将家目录下的所有文件列出来(含属性与隐藏档)
[root@www ~]# ls -al ~
	- cd (切换目录)
cd是Change Directory的缩写，这是用来变换工作目录的命令。

**语法：**

 cd [相对路径或绝对路径]
#使用 mkdir 命令创建 runoob 目录
[root@www ~]# mkdir runoob

#使用绝对路径切换到 runoob 目录
[root@www ~]# cd /root/runoob/

#使用相对路径切换到 runoob 目录
[root@www ~]# cd ./runoob/

表示回到自己的家目录，亦即是 /root 这个目录

[root@www runoob]# cd ~

表示去到目前的上一级目录，亦即是 /root 的上一级目录的意思；

[root@www ~]# cd ..
接下来大家多操作几次应该就可以很好的理解 cd 命令的。
	- pwd (显示目前所在的目录)
pwd 是 Print Working Directory 的缩写，也就是显示目前所在目录的命令。

[root@www ~]# pwd [-P]
选项与参数：

-P ：显示出确实的路径，而非使用连结 (link) 路径。
实例：单纯显示出目前的工作目录：

[root@www ~]# pwd
/root   \<== 显示出目录啦～
实例显示出实际的工作目录，而非连结档本身的目录名而已。

[root@www ~]# cd /var/mail   \<==注意，/var/mail是一个连结档
[root@www mail]# pwd
/var/mail         \<==列出目前的工作目录
[root@www mail]# pwd -P
/var/spool/mail   \<==怎么回事？有没有加 -P 差很多～
[root@www mail]# ls -ld /var/mail
lrwxrwxrwx 1 root root 10 Sep  4 17:54 /var/mail -> spool/mail

看到这里应该知道为啥了吧？因为 /var/mail 是连结档，连结到 /var/spool/mail 

所以，加上 pwd -P 的选项后，会不以连结档的数据显示，而是显示正确的完整路径啊！

	- mkdir (创建新目录)
如果想要创建新的目录的话，那么就使用mkdir (make directory)吧。

语法：

mkdir [-mp] 目录名称
选项与参数：

-m ：配置文件的权限喔！直接配置，不需要看默认权限 (umask) 的脸色～
-p ：帮助你直接将所需要的目录(包含上一级目录)递归创建起来！
实例：请到/tmp底下尝试创建数个新目录看看：

[root@www ~]# cd /tmp
[root@www tmp]# mkdir test    \<==创建一名为 test 的新目录
[root@www tmp]# mkdir test1/test2/test3/test4
mkdir: cannot create directory `test1/test2/test3/test4': 
No such file or directory       \<== 没办法直接创建此目录啊！
[root@www tmp]# mkdir -p test1/test2/test3/test4
加了这个 -p 的选项，可以自行帮你创建多层目录！

实例：创建权限为 rwx--x--x 的目录。

[root@www tmp]# mkdir -m 711 test2
[root@www tmp]# ls -l
drwxr-xr-x  3 root  root 4096 Jul 18 12:50 test
drwxr-xr-x  3 root  root 4096 Jul 18 12:53 test1
drwx--x--x  2 root  root 4096 Jul 18 12:54 test2
上面的权限部分，如果没有加上 -m 来强制配置属性，系统会使用默认属性。

如果我们使用 -m ，如上例我们给予 -m 711 来给予新的目录 drwx--x--x 的权限。
	- rmdir (删除空的目录)
语法：

 rmdir [-p] 目录名称
选项与参数：

-p ：连同上一级『空的』目录也一起删除
删除 runoob 目录

[root@www tmp]# rmdir runoob/
将 mkdir 实例中创建的目录(/tmp 底下)删除掉！

[root@www tmp]# ls -l   \<==看看有多少目录存在？
drwxr-xr-x  3 root  root 4096 Jul 18 12:50 test
drwxr-xr-x  3 root  root 4096 Jul 18 12:53 test1
drwx--x--x  2 root  root 4096 Jul 18 12:54 test2
[root@www tmp]# rmdir test   \<==可直接删除掉，没问题
[root@www tmp]# rmdir test1  \<==因为尚有内容，所以无法删除！
rmdir: `test1': Directory not empty
[root@www tmp]# rmdir -p test1/test2/test3/test4
[root@www tmp]# ls -l        \<==您看看，底下的输出中test与test1不见了！
drwx--x--x  2 root  root 4096 Jul 18 12:54 test2
利用 -p 这个选项，立刻就可以将 test1/test2/test3/test4 一次删除。

不过要注意的是，这个 rmdir 仅能删除空的目录，你可以使用 rm 命令来删除非空目录。
	- cp (复制文件或目录)
cp 即拷贝文件和目录。

语法:

[root@www ~]# cp [-adfilprsu] 来源档(source) 目标档(destination)
[root@www ~]# cp [options] source1 source2 source3 .... directory
选项与参数：

-a：相当於 -pdr 的意思，至於 pdr 请参考下列说明；(常用)

-d：若来源档为连结档的属性(link file)，则复制连结档属性而非文件本身；

-f：为强制(force)的意思，若目标文件已经存在且无法开启，则移除后再尝试一次；

-i：若目标档(destination)已经存在时，在覆盖时会先询问动作的进行(常用)

-l：进行硬式连结(hard link)的连结档创建，而非复制文件本身；

-p：连同文件的属性一起复制过去，而非使用默认属性(备份常用)；

-r：递归持续复制，用於目录的复制行为；(常用)

-s：复制成为符号连结档 (symbolic link)，亦即『捷径』文件；

-u：若 destination 比 source 旧才升级 destination ！

用 root 身份，将 root 目录下的 .bashrc 复制到 /tmp 下，并命名为 bashrc

[root@www ~]# cp ~/.bashrc /tmp/bashrc
[root@www ~]# cp -i ~/.bashrc /tmp/bashrc
cp: overwrite `/tmp/bashrc'? n  \<==n不覆盖，y为覆盖
	- rm (移除文件或目录)
语法：

 rm [-fir] 文件或目录
选项与参数：

-f ：就是 force 的意思，忽略不存在的文件，不会出现警告信息；
-i ：互动模式，在删除前会询问使用者是否动作
-r ：递归删除啊！最常用在目录的删除了！这是非常危险的选项！！！
将刚刚在 cp 的实例中创建的 bashrc 删除掉！

[root@www tmp]# rm -i bashrc
rm: remove regular file `bashrc'? y
如果加上 -i 的选项就会主动询问喔，避免你删除到错误的档名！
	- mv (移动文件与目录，或修改名称)
语法：

[root@www ~]# mv [-fiu] source destination
[root@www ~]# mv [options] source1 source2 source3 .... directory
选项与参数：

-f ：force 强制的意思，如果目标文件已经存在，不会询问而直接覆盖；
-i ：若目标文件 (destination) 已经存在时，就会询问是否覆盖！
-u ：若目标文件已经存在，且 source 比较新，才会升级 (update)
复制一文件，创建一目录，将文件移动到目录中

[root@www ~]# cd /tmp
[root@www tmp]# cp ~/.bashrc bashrc
[root@www tmp]# mkdir mvtest
[root@www tmp]# mv bashrc mvtest
将某个文件移动到某个目录去，就是这样做！

将刚刚的目录名称更名为 mvtest2

[root@www tmp]# mv mvtest mvtest2
	- Linux 文件内容查看
Linux系统中使用以下命令来查看文件的内容：

cat  由第一行开始显示文件内容
tac  从最后一行开始显示，可以看出 tac 是 cat 的倒着写！
nl   显示的时候，顺道输出行号！
more 一页一页的显示文件内容
less 与 more 类似，但是比 more 更好的是，他可以往前翻页！
head 只看头几行
tail 只看尾巴几行
你可以使用 man [命令]来查看各个命令的使用文档，如 ：man cp。
	- cat
由第一行开始显示文件内容

语法：

cat [-AbEnTv]
选项与参数：

-A ：相当於 -vET 的整合选项，可列出一些特殊字符而不是空白而已；
-b ：列出行号，仅针对非空白行做行号显示，空白行不标行号！
-E ：将结尾的断行字节 $ 显示出来；
-n ：列印出行号，连同空白行也会有行号，与 -b 的选项不同；
-T ：将 [tab] 按键以 ^I 显示出来；
-v ：列出一些看不出来的特殊字符
检看 /etc/issue 这个文件的内容：

[root@www ~]# cat /etc/issue
CentOS release 6.4 (Final)
Kernel \r on an \m
	- tac
tac与cat命令刚好相反，文件内容从最后一行开始显示，可以看出 tac 是 cat 的倒着写！如：


[root@www ~]# tac /etc/issue

Kernel \r on an \m
CentOS release 6.4 (Final)
	- nl
显示行号

语法：

nl [-bnw] 文件
选项与参数：

-b ：指定行号指定的方式，主要有两种：
-b a ：表示不论是否为空行，也同样列出行号(类似 cat -n)；
-b t ：如果有空行，空的那一行不要列出行号(默认值)；
-n ：列出行号表示的方法，主要有三种：
-n ln ：行号在荧幕的最左方显示；
-n rn ：行号在自己栏位的最右方显示，且不加 0 ；
-n rz ：行号在自己栏位的最右方显示，且加 0 ；
-w ：行号栏位的占用的位数。
实例一：用 nl 列出 /etc/issue 的内容

[root@www ~]# nl /etc/issue
     1  CentOS release 6.4 (Final)
     2  Kernel \r on an \m
	- more
一页一页翻动

[root@www ~]# more /etc/man_db.config 
#

Generated automatically from man.conf.in by the

configure script.

#

man.conf from man-1.6d

....(中间省略)....
--More--(28%)  \<== 重点在这一行喔！你的光标也会在这里等待你的命令
在 more 这个程序的运行过程中，你有几个按键可以按的：

空白键 (space)：代表向下翻一页；
Enter         ：代表向下翻『一行』；
/字串         ：代表在这个显示的内容当中，向下搜寻『字串』这个关键字；
:f            ：立刻显示出档名以及目前显示的行数；
q             ：代表立刻离开 more ，不再显示该文件内容。
b 或 [ctrl]-b ：代表往回翻页，不过这动作只对文件有用，对管线无用。
	- less
一页一页翻动，以下实例输出/etc/man.config文件的内容：

[root@www ~]# less /etc/man.config
#

Generated automatically from man.conf.in by the

configure script.

#

man.conf from man-1.6d

....(中间省略)....
:   \<== 这里可以等待你输入命令！
less运行时可以输入的命令有：

空白键    ：向下翻动一页；
[pagedown]：向下翻动一页；
[pageup]  ：向上翻动一页；
/字串     ：向下搜寻『字串』的功能；
?字串     ：向上搜寻『字串』的功能；
n         ：重复前一个搜寻 (与 / 或 ? 有关！)
N         ：反向的重复前一个搜寻 (与 / 或 ? 有关！)
q         ：离开 less 这个程序；
	- head
取出文件前面几行

语法：

head [-n number] 文件 
选项与参数：

-n ：后面接数字，代表显示几行的意思
[root@www ~]# head /etc/man.config
默认的情况中，显示前面 10 行！若要显示前 20 行，就得要这样：

[root@www ~]# head -n 20 /etc/man.config
	- tail
取出文件后面几行

语法：

tail [-n number] 文件 
选项与参数：

-n ：后面接数字，代表显示几行的意思
-f ：表示持续侦测后面所接的档名，要等到按下[ctrl]-c才会结束tail的侦测
[root@www ~]# tail /etc/man.config

**默认的情况中，显示最后的十行！若要显示最后的 20 行，就得要这样：**

[root@www ~]# tail -n 20 /etc/man.config

# 用户和用户组管理

Linux系统是一个多用户多任务的分时操作系统，任何一个要使用系统资源的用户，都必须首先向系统管理员申请一个账号，然后以这个账号的身份进入系统。

用户的账号一方面可以帮助系统管理员对使用系统的用户进行跟踪，并控制他们对系统资源的访问；另一方面也可以帮助用户组织文件，并为用户提供安全性保护。
每个用户账号都拥有一个唯一的用户名和各自的口令。
用户在登录时键入正确的用户名和口令后，就能够进入系统和自己的主目录。

实现用户账号的管理，要完成的工作主要有如下几个方面：
用户账号的添加、删除与修改。
用户口令的管理。
用户组的管理。

### 一、Linux系统用户账号的管理

- 用户账号的管理工作主要涉及到用户账号的添加、修改和删除。

添加用户账号就是在系统中创建一个新账号，然后为新账号分配用户号、用户组、主目录和登录Shell等资源。刚添加的账号是被锁定的，无法使用。
- 1、添加新的用户账号使用useradd命令，其语法如下：
useradd 选项 用户名
参数说明：

选项:
-c comment 指定一段注释性描述。
-d 目录 指定用户主目录，如果此目录不存在，则同时使用-m选项，可以创建主目录。
-g 用户组 指定用户所属的用户组。
-G 用户组，用户组 指定用户所属的附加组。
-s Shell文件 指定用户的登录Shell。
-u 用户号 指定用户的用户号，如果同时有-o选项，则可以重复使用其他用户的标识号。
用户名:
指定新账号的登录名。
实例1

useradd –d  /home/sam -m sam

此命令创建了一个用户sam，其中-d和-m选项用来为登录名sam产生一个主目录 /home/sam（/home为默认的用户主目录所在的父目录）。

实例2

useradd -s /bin/sh -g group –G adm,root gem

此命令新建了一个用户gem，该用户的登录Shell是 /bin/sh，它属于group用户组，同时又属于adm和root用户组，其中group用户组是其主组。
这里可能新建组：#groupadd group及groupadd adm
增加用户账号就是在/etc/passwd文件中为新用户增加一条记录，同时更新其他系统文件如/etc/shadow, /etc/group等。
Linux提供了集成的系统管理工具userconf，它可以用来对用户账号进行统一管理。
- 2、删除帐号
如果一个用户的账号不再使用，可以从系统中删除。删除用户账号就是要将/etc/passwd等系统文件中的该用户记录删除，必要时还删除用户的主目录。

删除一个已有的用户账号使用userdel命令，其格式如下：

userdel 选项 用户名
常用的选项是 -r，它的作用是把用户的主目录一起删除。

例如：

userdel -r sam

此命令删除用户sam在系统文件中（主要是/etc/passwd, /etc/shadow, /etc/group等）的记录，同时删除用户的主目录。
- 3、修改帐号
修改用户账号就是根据实际情况更改用户的有关属性，如用户号、主目录、用户组、登录Shell等。

修改已有用户的信息使用usermod命令，其格式如下：

usermod 选项 用户名
常用的选项包括-c, -d, -m, -g, -G, -s, -u以及-o等，这些选项的意义与useradd命令中的选项一样，可以为用户指定新的资源值。

另外，有些系统可以使用选项：-l 新用户名

这个选项指定一个新的账号，即将原来的用户名改为新的用户名。

例如：

usermod -s /bin/ksh -d /home/z –g developer sam

此命令将用户sam的登录Shell修改为ksh，主目录改为/home/z，用户组改为developer。
- 4、用户口令的管理
用户管理的一项重要内容是用户口令的管理。用户账号刚创建时没有口令，但是被系统锁定，无法使用，必须为其指定口令后才可以使用，即使是指定空口令。

指定和修改用户口令的Shell命令是passwd。超级用户可以为自己和其他用户指定口令，普通用户只能用它修改自己的口令。命令的格式为：

passwd 选项 用户名
可使用的选项：

-l 锁定口令，即禁用账号。
-u 口令解锁。
-d 使账号无口令。
-f 强迫用户下次登录时修改口令。
如果默认用户名，则修改当前用户的口令。

例如，假设当前用户是sam，则下面的命令修改该用户自己的口令：

$ passwd 
Old password:****** 
New password:******* 
Re-enter new password:*******
如果是超级用户，可以用下列形式指定任何用户的口令：

passwd sam 

New password:******* 
Re-enter new password:*******
普通用户修改自己的口令时，passwd命令会先询问原口令，验证后再要求用户输入两遍新口令，如果两次输入的口令一致，则将这个口令指定给用户；而超级用户为用户指定口令时，就不需要知道原口令。

为了系统安全起见，用户应该选择比较复杂的口令，例如最好使用8位长的口令，口令中包含有大写、小写字母和数字，并且应该与姓名、生日等不相同。

为用户指定空口令时，执行下列形式的命令：

passwd -d sam

此命令将用户 sam 的口令删除，这样用户 sam 下一次登录时，系统就不再允许该用户登录了。

passwd 命令还可以用 -l(lock) 选项锁定某一用户，使其不能登录，例如：

passwd -l sam

### 二、Linux系统用户组的管理

- 每个用户都有一个用户组，系统可以对一个用户组中的所有用户进行集中管理。不同Linux 系统对用户组的规定有所不同，如Linux下的用户属于与它同名的用户组，这个用户组在创建用户时同时创建。

用户组的管理涉及用户组的添加、删除和修改。组的增加、删除和修改实际上就是对/etc/group文件的更新。
- 1、增加一个新的用户组使用groupadd命令。其格式如下：
groupadd 选项 用户组
可以使用的选项有：

-g GID 指定新用户组的组标识号（GID）。
-o 一般与-g选项同时使用，表示新用户组的GID可以与系统已有用户组的GID相同。
实例1：

groupadd group1

此命令向系统中增加了一个新组group1，新组的组标识号是在当前已有的最大组标识号的基础上加1。

实例2：

groupadd -g 101 group2

此命令向系统中增加了一个新组group2，同时指定新组的组标识号是101。
- 2、如果要删除一个已有的用户组，使用groupdel命令，其格式如下：
groupdel 用户组
例如：

groupdel group1

此命令从系统中删除组group1。
- 3、修改用户组的属性使用groupmod命令。其语法如下：
groupmod 选项 用户组
常用的选项有：

-g GID 为用户组指定新的组标识号。
-o 与-g选项同时使用，用户组的新GID可以与系统已有用户组的GID相同。
-n新用户组 将用户组的名字改为新名字
实例1：

groupmod -g 102 group2

此命令将组group2的组标识号修改为102。

实例2：

groupmod –g 10000 -n group3 group2

此命令将组group2的标识号改为10000，组名修改为group3。
- 4、如果一个用户同时属于多个用户组，那么用户可以在用户组之间切换，以便具有其他用户组的权限。
用户可以在登录后，使用命令newgrp切换到其他用户组，这个命令的参数就是目的用户组。例如：

$ newgrp root
这条命令将当前用户切换到root用户组，前提条件是root用户组确实是该用户的主组或附加组。类似于用户账号的管理，用户组的管理也可以通过集成的系统管理工具来完成。



### 三、与用户账号有关的系统文件

- 完成用户管理的工作有许多种方法，但是每一种方法实际上都是对有关的系统文件进行修改。

与用户和用户组相关的信息都存放在一些系统文件中，这些文件包括/etc/passwd, /etc/shadow, /etc/group等。

下面分别介绍这些文件的内容。
- 1、/etc/passwd文件是用户管理工作涉及的最重要的一个文件。
Linux系统中的每个用户都在/etc/passwd文件中有一个对应的记录行，它记录了这个用户的一些基本属性。

这个文件对所有用户都是可读的。它的内容类似下面的例子：

＃ cat /etc/passwd

root:x:0:0:Superuser:/:
daemon:x:1:1:System daemons:/etc:
bin:x:2:2:Owner of system commands:/bin:
sys:x:3:3:Owner of system files:/usr/sys:
adm:x:4:4:System accounting:/usr/adm:
uucp:x:5:5:UUCP administrator:/usr/lib/uucp:
auth:x:7:21:Authentication administrator:/tcb/files/auth:
cron:x:9:16:Cron daemon:/usr/spool/cron:
listen:x:37:4:Network daemon:/usr/net/nls:
lp:x:71:18:Printer administrator:/usr/spool/lp:
sam:x:200:50:Sam san:/home/sam:/bin/sh
从上面的例子我们可以看到，/etc/passwd中一行记录对应着一个用户，每行记录又被冒号(:)分隔为7个字段，其格式和具体含义如下：

用户名:口令:用户标识号:组标识号:注释性描述:主目录:登录Shell
- 1）"用户名"是代表用户账号的字符串。
通常长度不超过8个字符，并且由大小写字母和/或数字组成。登录名中不能有冒号(:)，因为冒号在这里是分隔符。

为了兼容起见，登录名中最好不要包含点字符(.)，并且不使用连字符(-)和加号(+)打头。

2）“口令”一些系统中，存放着加密后的用户口令字。
虽然这个字段存放的只是用户口令的加密串，不是明文，但是由于/etc/passwd文件对所有用户都可读，所以这仍是一个安全隐患。因此，现在许多Linux 系统（如SVR4）都使用了shadow技术，把真正的加密后的用户口令字存放到/etc/shadow文件中，而在/etc/passwd文件的口令字段中只存放一个特殊的字符，例如“x”或者“*”。

3）“用户标识号”是一个整数，系统内部用它来标识用户。
一般情况下它与用户名是一一对应的。如果几个用户名对应的用户标识号是一样的，系统内部将把它们视为同一个用户，但是它们可以有不同的口令、不同的主目录以及不同的登录Shell等。

通常用户标识号的取值范围是0～65 535。0是超级用户root的标识号，1～99由系统保留，作为管理账号，普通用户的标识号从100开始。在Linux系统中，这个界限是500。

4）“组标识号”字段记录的是用户所属的用户组。
它对应着/etc/group文件中的一条记录。

5)“注释性描述”字段记录着用户的一些个人情况。
例如用户的真实姓名、电话、地址等，这个字段并没有什么实际的用途。在不同的Linux 系统中，这个字段的格式并没有统一。在许多Linux系统中，这个字段存放的是一段任意的注释性描述文字，用做finger命令的输出。

6)“主目录”，也就是用户的起始工作目录。
它是用户在登录到系统之后所处的目录。在大多数系统中，各用户的主目录都被组织在同一个特定的目录下，而用户主目录的名称就是该用户的登录名。各用户对自己的主目录有读、写、执行（搜索）权限，其他用户对此目录的访问权限则根据具体情况设置。

7)用户登录后，要启动一个进程，负责将用户的操作传给内核，这个进程是用户登录到系统后运行的命令解释器或某个特定的程序，即Shell。
Shell是用户与Linux系统之间的接口。Linux的Shell有许多种，每种都有不同的特点。常用的有sh(Bourne Shell), csh(C Shell), ksh(Korn Shell), tcsh(TENEX/TOPS-20 type C Shell), bash(Bourne Again Shell)等。

系统管理员可以根据系统情况和用户习惯为用户指定某个Shell。如果不指定Shell，那么系统使用sh为默认的登录Shell，即这个字段的值为/bin/sh。

用户的登录Shell也可以指定为某个特定的程序（此程序不是一个命令解释器）。

利用这一特点，我们可以限制用户只能运行指定的应用程序，在该应用程序运行结束后，用户就自动退出了系统。有些Linux 系统要求只有那些在系统中登记了的程序才能出现在这个字段中。

8)系统中有一类用户称为伪用户（pseudo users）。
这些用户在/etc/passwd文件中也占有一条记录，但是不能登录，因为它们的登录Shell为空。它们的存在主要是方便系统管理，满足相应的系统进程对文件属主的要求。

常见的伪用户如下所示：

伪 用 户 含 义 
bin 拥有可执行的用户命令文件 
sys 拥有系统文件 
adm 拥有帐户文件 
uucp UUCP使用 
lp lp或lpd子系统使用 
nobody NFS使用
- 拥有帐户文件
1、除了上面列出的伪用户外，还有许多标准的伪用户，例如：audit, cron, mail, usenet等，它们也都各自为相关的进程和文件所需要。

由于/etc/passwd文件是所有用户都可读的，如果用户的密码太简单或规律比较明显的话，一台普通的计算机就能够很容易地将它破解，因此对安全性要求较高的Linux系统都把加密后的口令字分离出来，单独存放在一个文件中，这个文件是/etc/shadow文件。 有超级用户才拥有该文件读权限，这就保证了用户密码的安全性。

2、/etc/shadow中的记录行与/etc/passwd中的一一对应，它由pwconv命令根据/etc/passwd中的数据自动产生

它的文件格式与/etc/passwd类似，由若干个字段组成，字段之间用":"隔开。这些字段是：

登录名:加密口令:最后一次修改时间:最小时间间隔:最大时间间隔:警告时间:不活动时间:失效时间:标志
"登录名"是与/etc/passwd文件中的登录名相一致的用户账号
"口令"字段存放的是加密后的用户口令字，长度为13个字符。如果为空，则对应用户没有口令，登录时不需要口令；如果含有不属于集合 { ./0-9A-Za-z }中的字符，则对应的用户不能登录。
"最后一次修改时间"表示的是从某个时刻起，到用户最后一次修改口令时的天数。时间起点对不同的系统可能不一样。例如在SCO Linux 中，这个时间起点是1970年1月1日。
"最小时间间隔"指的是两次修改口令之间所需的最小天数。
"最大时间间隔"指的是口令保持有效的最大天数。
"警告时间"字段表示的是从系统开始警告用户到用户密码正式失效之间的天数。
"不活动时间"表示的是用户没有登录活动但账号仍能保持有效的最大天数。
"失效时间"字段给出的是一个绝对的天数，如果使用了这个字段，那么就给出相应账号的生存期。期满后，该账号就不再是一个合法的账号，也就不能再用来登录了。
下面是/etc/shadow的一个例子：

＃ cat /etc/shadow

root:Dnakfw28zf38w:8764:0:168:7:::
daemon:*::0:0::::
bin:*::0:0::::
sys:*::0:0::::
adm:*::0:0::::
uucp:*::0:0::::
nuucp:*::0:0::::
auth:*::0:0::::
cron:*::0:0::::
listen:*::0:0::::
lp:*::0:0::::
sam:EkdiSECLWPdSa:9740:0:0::::
3、用户组的所有信息都存放在/etc/group文件中。
将用户分组是Linux 系统中对用户进行管理及控制访问权限的一种手段。

每个用户都属于某个用户组；一个组中可以有多个用户，一个用户也可以属于不同的组。

当一个用户同时是多个组中的成员时，在/etc/passwd文件中记录的是用户所属的主组，也就是登录时所属的默认组，而其他组称为附加组。

用户要访问属于附加组的文件时，必须首先使用newgrp命令使自己成为所要访问的组中的成员。

用户组的所有信息都存放在/etc/group文件中。此文件的格式也类似于/etc/passwd文件，由冒号(:)隔开若干个字段，这些字段有：

组名:口令:组标识号:组内用户列表
"组名"是用户组的名称，由字母或数字构成。与/etc/passwd中的登录名一样，组名不应重复。
"口令"字段存放的是用户组加密后的口令字。一般Linux 系统的用户组都没有口令，即这个字段一般为空，或者是*。
"组标识号"与用户标识号类似，也是一个整数，被系统内部用来标识组。
"组内用户列表"是属于这个组的所有用户的列表/b]，不同用户之间用逗号(,)分隔。这个用户组可能是用户的主组，也可能是附加组。
/etc/group文件的一个例子如下：

root::0:root
bin::2:root,bin
sys::3:root,uucp
adm::4:root,adm
daemon::5:root,daemon
lp::7:root,lp
users::20:root,sam

### 四、添加批量用户

- 添加和删除用户对每位Linux系统管理员都是轻而易举的事，比较棘手的是如果要添加几十个、上百个甚至上千个用户时，我们不太可能还使用useradd一个一个地添加，必然要找一种简便的创建大量用户的方法。Linux系统提供了创建大量用户的工具，可以让您立即创建大量用户，方法如下：
- （1）先编辑一个文本用户文件。
每一列按照/etc/passwd密码文件的格式书写，要注意每个用户的用户名、UID、宿主目录都不可以相同，其中密码栏可以留做空白或输入x号。一个范例文件user.txt内容如下：

user001::600:100:user:/home/user001:/bin/bash
user002::601:100:user:/home/user002:/bin/bash
user003::602:100:user:/home/user003:/bin/bash
user004::603:100:user:/home/user004:/bin/bash
user005::604:100:user:/home/user005:/bin/bash
user006::605:100:user:/home/user006:/bin/bash
（2）以root身份执行命令 /usr/sbin/newusers，从刚创建的用户文件user.txt中导入数据，创建用户：

newusers \< user.txt

然后可以执行命令 vipw 或 vi /etc/passwd 检查 /etc/passwd 文件是否已经出现这些用户的数据，并且用户的宿主目录是否已经创建。

（3）执行命令/usr/sbin/pwunconv。
将 /etc/shadow 产生的 shadow 密码解码，然后回写到 /etc/passwd 中，并将/etc/shadow的shadow密码栏删掉。这是为了方便下一步的密码转换工作，即先取消 shadow password 功能。

pwunconv

（4）编辑每个用户的密码对照文件。
格式为：

用户名:密码
实例文件 passwd.txt 内容如下：

user001:123456
user002:123456
user003:123456
user004:123456
user005:123456
user006:123456
（5）以 root 身份执行命令 /usr/sbin/chpasswd。
创建用户密码，chpasswd 会将经过 /usr/bin/passwd 命令编码过的密码写入 /etc/passwd 的密码栏。

chpasswd \< passwd.txt

（6）确定密码经编码写入/etc/passwd的密码栏后。
执行命令 /usr/sbin/pwconv 将密码编码为 shadow password，并将结果写入 /etc/shadow。

pwconv

这样就完成了大量用户的创建了，之后您可以到/home下检查这些用户宿主目录的权限设置是否都正确，并登录验证用户密码是否正确。

# Linux磁盘管理

Linux磁盘管理好坏直接关系到整个系统的性能问题。

Linux磁盘管理常用三个命令为df，du和fdisk。

df：列出文件系统的整体磁盘使用量
du：检查磁盘空间使用量
fdisk：用于磁盘分区

## df

df命令参数功能：检查文件系统的磁盘空间占用情况。可以利用该命令来获取硬盘被占用了多少空间，目前还剩下多少空间等信息。

语法：

df [ -ahikHTm ] [目录或文件名] 
选项与参数：

-a：列出所有的文件系统，包括系统特有的/ proc等文件系统；
-k：以KBytes的容量显示各文件系统；
-m：以MBytes的容量显示各文件系统；
-h：以人们较易阅读的GB，MB，KB等格式自行显示；
-H：以M = 1000K取代M = 1024K的进位方式；
-T：显示文件系统类型，并合并该分区的文件系统名称（例如ext3）也列出；
-i：不用硬盘容量，而以inode的数量来显示
实例1
将系统内所有的文件系统列出来！

[根@ WWW 〜]＃DF
文件系统1K -块      用于推介使用％安装上
/ dev的/ HDC2          9920624 3823112 5585444 41 ％/的/ dev / hdc3上         4956316 141376 4559108 4 ％/家
/ dev的/ hdc1分区          101086 11126 84741 12 ％/引导                  
                        
tmpfs               371332 0 371332 0 ％/ dev / shm                 
在Linux底下如果df没有加任何选项，那么替换重定向系统内部的所有（排除特殊内存内部的文件系统与swap）都以1 KB的容量来列出来！

实例2
将容量结果以易读的容量格式显示出来

[根@ WWW 〜]＃DF - ħ
文件系统大小用于库存状况使用％安装上
/ dev的/ HDC2              9.5克3.7G 5.4G 41 ％/的/ dev / hdc3上             4.8G 139M 4.4G 4 ％/家
/ dev的/ hdc1分区              99M 11M 83M 12 ％/开机                        
                 
tmpfs                  363M 0 363M 0 ％/ dev / shm           
实例3
将系统内的所有特殊文件格式及名称都列出来

[根@ WWW 〜]＃DF -在
文件系统类型1K -块    用于推介使用％安装上
/ dev的/ HDC2 EXT3    9920624 3823112 5585444 41 ％/ 
PROC PROC          0 0 0 - / PROC                                    
sysfs中的sysfs          0 0 0 - / SYS                     
devpts devpts          0 0 0 -的/ dev / PTS
 / dev的/位于hdc3 EXT3    4956316 141376 4559108 4 ％/家
/ dev的/ hdc1分区EXT3     101086 11126 84741 12 ％/引导                                         
tmpfs tmpfs     371332 0 371332 0 ％/ dev / shm               
没有binfmt_misc          0 0 0 -的/ proc / SYS / FS / binfmt_misc                     
sunrpc rpc_pipefs          0 0 0 -在/ var / lib中/ NFS / rpc_pipefs                     
实例4
将/ etc底下的可用的磁盘容量以易读的容量格式显示

[根@ WWW 〜]＃DF - ħ /等
文件系统大小用于库存状况使用％安装上
/ dev的/ HDC2              9.5克3.7G 5.4G 41 ％/                        

## du

Linux du命令也是查看使用空间的，但是与df命令不同的是Linux du命令是对文件和目录磁盘使用的空间的查看，还是和df命令有一些区别的，这里介绍Linux du命令。

语法：

du [ -ahskm ]文件或目录名称 
选项与参数：

-a：列出所有的文件与目录容量，因为唯一仅统计目录底下的文件量而已。
-h：以人们较易读的容量格式（G / M）显示；
-s：列出总数而已，而不列出每个各别的目录占用容量；
-S：不包括子目录下的总计，与-s有点区别。
-k：以KBytes列出容量显示；
-m：以MBytes列出容量显示；
实例1
只列出当前目录下的所有文件夹容量（包括隐藏文件夹）：

[根@ WWW 〜]＃杜
8 ./ TEST4      \<==每个目录都会列出来8 ./ TEST2
 ....中间省略.... 12 ./。gconfd    \<==包括隐藏文件的目录220 。\<==这个目录（。）所占用的大量       
       
      
                
直接输入du没有加任何选项时，则du会分析当前所在目录的文件与目录所占用的硬盘空间。

实例2
将文件的容量也列出来

[根@ WWW 〜]＃杜-一个
12 ./安装。日志。syslog    \<==有文件的列表了8 ./。bash_logout
 8 ./ test4
 8 ./ test2
 ....中间省略.... 12 ./。gconfd
 220 。      
                     
           
实例3
检查根目录底下每个目录所占用的容量

[ root @ www〜]＃du - sm / *
7 /箱
6 /启动
.....中间省略....
0 /进程
.....中间省略....
1 /转
3859 / usr \<==系统初期最大就是他了啦！
77 / var
通配符*来代表每个目录。

与df不一样的是，du这个命令实际上会直接到文件系统内去搜寻所有的文件数据。

## fdisk

fdisk是Linux的磁盘分区表操作工具。

语法：

fdisk [ -l ]装置名称 
选项与参数：

-l：输出后面接的装置所有的分区内容。若仅有fdisk -l时，则系统将会把整个系统内部能够搜寻到的装置的分区均列出来。
实例1
列出所有分区信息

[ root @ AY120919111755c246621 tmp ]＃fdisk - l

磁盘/ dev / xvda ：21.5 GB ，21474836480字节
255磁头，63扇区/磁道，2610个柱面
单位=柱面16065 * 512 = 8225280字节
扇区大小（逻辑/物理）：512字节/ 512字节            
I / O大小（最小/最佳）：512字节/ 512字节
磁盘标识符：0x00000000   

    设备引导启动结束块ID系统/ dev / xvda1    * 1 2550 20480000 83 Linux / dev / xvda2             2550 2611 490496 82 Linux swap / Solaris                           


​                    

磁盘/ dev / xvdb ：21.5 GB ，21474836480字节
255磁头，63扇区/磁道，2610个柱面
单位=柱面16065 * 512 = 8225280字节
扇区大小（逻辑/物理）：512字节/ 512字节            
I / O大小（最小/最佳）：512字节/ 512字节
磁盘标识符：0x56f40944   

    设备启动开始端块ID系统/ dev / xvdb2                1 2610 20964793 + 83 Linux                           

实例2
找出您系统中的根目录所在磁盘，并查阅该硬盘内的相关信息

[根@ WWW 〜]＃DF / \<==注意：重点在找出磁盘文件名而已文件系统1K -块      用于推介使用％安装上
/ dev的/ HDC2               9920624 3823168 5585388 41 ％/            
                       

[根@ WWW 〜]＃的fdisk /开发/ HDC   \<==仔细看，不要加上数字喔！的汽缸数为这盘被设置到5005有是没有错与那个，但是这是大于1024 ，并且可以在某些设置会导致问题与：1 ）软件，在系统启动时运行（ē 。摹。老版本的LILO

  

）2 ）引导和分区软件从其它操作系统（É 。克。，DOS FDISK ，OS / 2 FDISK ）

   

命令（m为帮助）：\<==等待你的输入！      
输入m后，就会看到底下这些命令介绍

命令（m为帮助）：m    \<==输入m后，就会看到底下这些命令介绍Command action  

   切换可启动标志
   b编辑bsd disklabel
   c切换dos兼容性标志
   d   删除分区            \<==删除一个分区
   l列出已知的分区类型
   m   打印此菜单 
   n添加一个新分区           \<==添加一个分区
   o创建一个新的空DOS分区表
   p   打印分区表     \<==在屏幕上显示分区表
   q退出而不保存更改\<==不保存   离开fdisk程序
   创建一个新的空Sun disklabel
   t更改分区的系统ID
   u更改显示/输入单位
   v验证分区表
   w将表写入磁盘并退出\<==将刚刚的动作写入分割表
   x额外功能（仅限专家）
离开fdisk时点击q，那么所有的动作都不会生效！相反的，按下w就是动作生效的意思。

命令（m为帮助）：p   \<==这里可以输出当前磁盘的状态  

磁盘/ dev / hdc ：41.1 GB ，41174138880字节        \<==这个磁盘的文件名与容量255个磁头，63个扇区/磁道，5005个磁柱      \<==磁头，增大与磁柱大小单位= 16065 * 512磁柱= 8225280字节\<==每个磁柱的大小   

​     

   设备引导启动结束块ID系统/ dev / hdc1    * 1 13 104391 83 Linux / dev / hdc2               14 1288 10241437 + 83 Linux / dev / hdc3             1289 1925 5116702 + 83 Linux / dev / hdc4             1926 5005 24740100 5扩展/ dev /                           
                                
                
                 
                  
hdc5             1926 2052 1020096 82 Linux swap / Solaris ＃装置文件名启动区否开始磁柱结束磁柱1K大小容量磁盘分区槽内的系统                   


命令（m表示帮助）：q 
想要不储存离开吗？点击q就对了！不要随便按w啊！

使用p可以列出目前这颗磁盘的分割表信息，这个信息的上半部在显示整体磁盘的状态。
- 磁盘格式化
磁盘分割完成后自然就是要进行文件系统的格式化，格式化的命令非常的简单，使用mkfs（使文件系统）命令。

语法：

mkfs [ -t文件系统格式]装置文件名 
选项与参数：

-t：可以接文件系统格式，例如ext3，ext2，vfat等（系统有支持才会生效）
实例1
查看mkfs支持的文件格式

[ root @ www〜] ＃mkfs [标签] [标签] 
mkfs mkfs 。cramfs mkfs 。ext2 mkfs 。ext3 mkfs 。msdos mkfs 。胖子
按下两个[tab]，会发现mkfs支持的文件格式如上所示。

实例2
将分区/ dev / hdc6（可指定你自己的分区）格式化为ext3文件系统：

[ root @ www〜]＃mkfs - t ext3 / dev / hdc6
mke2fs 1.39 （29 - May - 2006 ）文件系统标签= \<==这里指的是分割槽的名称（label ）
操作系统类型：Linux块大小= 4096 （log = 2 ）\<==块的大小配置为4K片段大小= 4096 （日志= 2 ）251392个i节点，502023块     \<==由此配置决定的索引节点/块数量 
                 
             


25101块（5.00 ％）保留用于该超级用户
首先数据块= 0最大文件系统块= 515899392个16块组
32768个每块组，32768个每片段组15712个每索引节点组的超级块存储在块的备份：32768 ，98304 ，163840 ，229376 ，294912

 


​            

编写inode表：完成创建日志（8192个块）：完成\<==有日志记录编写超级块和文件系统记帐信息：完成 

 

该文件系统将每34坐骑或180天自动检查一次，以先到者为准。使用tune2fs - ç或-我要重写。＃这样就创建了我们所需要的Ext3文件系统了！简单明了！

- 磁盘检验
fsck（文件系统检查）用来检查和维护二者的文件系统。

若系统掉电或磁盘发生问题，可利用fsck命令对文件系统进行检查。

语法：

fsck [ -t文件系统] [ -ACay ]装置名称  
选项与参数：

-t：给定档案系统的型式，若在/ etc / fstab中已有定义或kernel本身已支持的则不需加上此参数
-s：依序一个一个地执行fsck的指令来检查
-A：对/ etc / fstab中所有列出来的分区（partition）做检查
-C：显示完整的检查进度
-d：打印出e2fsck的调试结果
-p：同时有-A条件时，同时有多个fsck的检查一起执行
-R：同时有-A条件时，省略/不检查
-V：详细显示模式
-a：如果检查有错则自动修复
-r：如果检查有错则由使用者回答是否恢复
-y：选项指定检测每个文件是自动输入yes，在不确定那些是不正常的时候，可以执行＃fsck -y全部检查修复。
实例1
查看系统有多少文件系统支持的fsck命令：

[ root @ www〜] ＃fsck [标签] [标签] 
fsck fsck 。cramfs fsck 。ext2 fsck 。ext3 fsck 。msdos fsck 。胖子
实例2
强制检测/ dev / hdc6分区：

[ root @ www〜]＃fsck - C - f - t ext3 / dev / hdc6
fsck的1.39 （29 -月- 2006年）
用e2fsck 1.39 （29 -月- 2006年）通1 ：检查索引节点，块，和尺寸
通行证2 ：检查目录结构
通行证3 ：检查目录的连接
通4 ：检查引用计数
传递5 ：检查组  
             摘要信息
vbird_logical ：11 /二十五万一千九百六十八文件（9.1 ％非-连续的），36926 /一百万四千零四十六块  
如果没有加上-f的选项，则由于该文件系统不曾出现问题，检查的经过非常快速！若加上-f强制检查，只会有一项的显示过程。
- 磁盘挂载与卸除
Linux的磁盘挂载使用mount命令，卸载使用umount命令。

磁盘挂载语法：

mount [ -t文件系统] [ -L标签名] [ -o其他选项] [ -n ]装置文件名挂载点       
实例1
用最小的方式，将刚刚创建的/ dev / hdc6挂载到/ mnt / hdc6上面！

[根@ WWW 〜]＃MKDIR / MNT / hdc6
 [根@ WWW 〜]＃安装/ dev的/ hdc6 / MNT / hdc6
 [根@ WWW 〜]＃DF
文件系统1K -块      用于推介使用％安装上
.... 。中间省略..... / dev / hdc6               1976312 42072 1833836 3 ％/ mnt / hdc6              
            
磁盘卸载命令umount语法：

卸除[ - FN ]装置文件名或挂载点 
选项与参数：

-f：强制卸除！可用在类似网络文件系统（NFS）无法读取到的情况下；
-n：不升级/ etc / mtab情况下卸除。
卸载/ dev / hdc6

[根@ WWW 〜]＃卸除/ dev的/ hdc6     

# [Shell编程](https://www.bilibili.com/video/BV1WY4y1H7d3?p=66&vd_source=10bfbb2d4bb1646ac73508c202d5f815)

## Shell 概述

## Shell 脚本入门

## 变量

## 运算符

## 条件判断

## 流程控制（重点）

## read 读取控制台输入

## 函数

## 正则表达式入门

## 文本处理工具

## 综合应用案例

# 软件包管理

## RPM

RPM（RedHat Package Manager），RedHat软件包管理工具，类似windows里面的setup.exe是Linux这系列操作系统里面的打包安装工具，它虽然是RedHat的标志，但理念是通用的。RPM包的名称格式
Apache-1.3.23-11.i386.rpm

- “apache” 软件名称
- “1.3.23-11”软件的版本号，主版本和此版本
- “i386”是软件所运行的硬件平台，Intel 32位处理器的统称
- “rpm”文件扩展名，代表RPM包

### 安装

rpm -ivh RPM 包全名

-i install，安装
-v --verbose，显示详细信息
-h --hash，进度条
--nodeps 安装前不检查依赖

### 查询

rpm -qa （功能描述：查询所安装的所有rpm 软件包），由于软件包比较多，一般都会采取过滤。rpm -qa | grep rpm软件包

### 卸载

（1）rpm -e RPM软件包
（2） rpm -e --nodeps 软件包

-e 卸载软件包
--nodeps 卸载软件时，不检查依赖。这样的话，那些使用该软件包的软件在此之后可能就不能正常工作了。

## YUM

### yum（Yellow dog Updater，Modified）是一个在Fedora和RedHat以及SUSE中的Shell前端连接管理器。

基于RPM包管理，能够从指定的服务器自动下载RPM包和安装，可以自动处理相对关系，并且一次安装所有依赖的软件包，无须繁琐地一次次下载，安装。

yum提供了查找，安装，删除某人，多个甚至全部完全的命令，而且命令简洁而又好记。

### yum语法
yum [选项] [命令] [包...]   
选项：任选，选项包括-h（帮助），-y（当安装过程提示选择全部为“ yes”），-q（不显示安装的过程）等等。
命令：要进行的操作。
package：安装的包名。

### yum常用命令
1.列出所有可更新的软件清单命令：yum check-update

2.更新所有软件命令：yum update

3.仅安装指定的软件命令：yum install \<程序包名称>

4.仅更新指定的软件命令：yum update \<程序包名称>

5.列出所有可安装的软件清单命令：百胜名单

6.删除删除命令：yum remove \<package_name>

7.查找普通命令：yum search \<关键字>

8.清除缓存命令：yum clean

​                      

### 国内yum源
网易（163）yum源是国内最好的yum源之一，无论是速度还是软件版本，都非常的不错。

将yum源设置为163 yum，可以提高扩展安装和更新的速度，同时避免一些常见软件版本无法找到。

安装步骤
1）安装wget, wget 用来从指定的URL 下载文件
[root@hadoop101 ~] yum install wget
2）在/etc/yum.repos.d/目录下，备份默认的repos 文件,
[root@hadoop101 yum.repos.d] pwd
/etc/yum.repos.d
[root@hadoop101 yum.repos.d] cp CentOS-Base.repo CentOS-Base
.repo.backup
3）下载网易163 或者是aliyun 的repos 文件,任选其一，如图8-2
[root@hadoop101 yum.repos.d] wget
http://mirrors.aliyun.com/repo/Centos-7.repo //阿里云
[root@hadoop101 yum.repos.d] wget
http://mirrors.163.com/.help/CentOS7-Base-163.repo //网易163
4）使用下载好的repos 文件替换默认的repos 文件
例如:用CentOS7-Base-163.repo 替换CentOS-Base.repo
[root@hadoop101 yum.repos.d]# mv CentOS7-Base-163.repo CentOS-Base.repo
5）清理旧缓存数据，缓存新数据
[root@hadoop101 yum.repos.d]#yum clean all
[root@hadoop101 yum.repos.d]#yum makecache
yum makecache 就是把服务器的包信息下载到本地电脑缓存起来
6）测试
[root@hadoop101 yum.repos.d]# yum list | grep firefox
[root@hadoop101 ~]#yum -y install firefox

除了网易之外，国内还有其他不错的yum源，某些中科大和搜狐。

中科大的yum源，安装方法查看：https ://lug.ustc.edu.cn/wiki/mirrors/help/centos

sohu的yum源安装方法查看：http : //mirrors.sohu.com/help/centos.html

## APT

### apt（Advanced Packaging Tool）是一个在 Debian 和 Ubuntu 中的 Shell 前端软件包管理器。

apt 命令提供了查找、安装、升级、删除某一个、一组甚至全部软件包的命令，而且命令简洁而又好记。

apt 命令执行需要超级管理员权限(root)。

### apt 语法
  apt [options] [command] [package ...]
options：可选，选项包括 -h（帮助），-y（当安装过程提示选择全部为"yes"），-q（不显示安装的过程）等等。
command：要进行的操作。
package：安装的包名。

### apt 常用命令
列出所有可更新的软件清单命令：sudo apt update

升级软件包：sudo apt upgrade

列出可更新的软件包及版本信息：apt list --upgradeable

升级软件包，升级前先删除需要更新软件包：sudo apt full-upgrade

安装指定的软件命令：sudo apt install \<package_name>

安装多个软件包：sudo apt install \<package_1> \<package_2> \<package_3>

更新指定的软件命令：sudo apt update \<package_name>

显示软件包具体信息,例如：版本号，安装大小，依赖关系等等：sudo apt show \<package_name>

删除软件包命令：sudo apt remove \<package_name>

清理不再使用的依赖和库文件: sudo apt autoremove

移除软件包及配置文件: sudo apt purge \<package_name>

查找软件包命令： sudo apt search \<keyword>

列出所有已安装的包：apt list --installed

列出所有已安装的包的版本信息：apt list --all-versions

实例
查看一些可更新的包：

sudo apt update


升级安装包：

sudo apt upgrade


在以上交互式输入字母 Y 即可开始升级。

可以将以下两个命令组合起来，一键升级：

sudo apt update && sudo apt upgrade -y
安装 mplayer 包：

sudo apt install mplayer


如过不太记得完整的包名，我们可以只输入前半部分的包名，然后按下 Tab 键，会列出相关的包名：



以上实例我们输入来 reds，然后按下 Tab 键，输出来四个相关的包。

如果我们想安装一个软件包，但如果软件包已经存在，则不要升级它，可以使用 –no-upgrade 选项:

sudo apt install \<package_name> --no-upgrade
安装 mplayer 如果存在则不要升级：

sudo apt install mplayer --no-upgrade


如果只想升级，不要安装可以使用 --only-upgrade 参数：

sudo apt install \<package_name> --only-upgrade
只升级 mplayer，如果不存在就不要安装它：

sudo apt install mplayer --only-upgrade


如果需要设置指定版本，语法格式如下：

sudo apt install \<package_name>=\<version_number>
package_name 为包名，version_number 为版本号。

移除包可以使用 remove 命令：

sudo apt remove mplayer


查找名为 libimobile 的相关包：

apt search libimobile


查看 pinta 包的相关信息：

apt show pinta


列出可更新的软件包：

apt list --upgradeable


清理不再使用的依赖和库文件：

sudo apt autoremove


在以上交互式输入字母 Y 即可开始清理。

# 常见问题

## 粘贴复制、无缝模式、自动尺寸

安装增强功能，开启双向粘贴、拖动。



## vboxclient:the virtualbox kernel service is not running

```bash
yum install elfutils-libelf-devel
yum update kernel -y  
yum install kernel-headers kernel-devel gcc make -y
init 6
```

重新安装增强功能，如显示未能加载虚拟光盘则先弹出桌面的VBox_GAs_6.1.34

## Job for network.service failed because the control process exited with error code. See "systemctl status network.service" and "journalctl -xe" for details.

和 NetworkManager 服务有冲突，直接关闭 NetworkManger 服务就好了。

```bash
systemctl stop NetworkManager
systemctl restart network
```

