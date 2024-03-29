---
index: 2
icon: markdown
title: 快查
date: 2022-06-06
category:
  - 快查
tag:
  - 快查
sticker: lucide//search
---

> ### Linux,Shell,软件等常用命令快捷键
>

<!-- more -->

# 技术官方文档

JAVA

Spring全家桶

MYSQL



# JAVA

```bash
java -选项
其中选项包括:
    -d32          使用 32 位数据模型 (如果可用)
    -d64          使用 64 位数据模型 (如果可用)
    -server       选择 "server" VM
                  默认 VM 是 server.
    -cp \<目录和 zip/jar 文件的类搜索路径>
    -classpath \<目录和 zip/jar 文件的类搜索路径>
                  用 ; 分隔的目录, JAR 档案
                  和 ZIP 档案列表, 用于搜索类文件。
    -D\<名称>=\<值> 设置系统属性
    -verbose:[class|gc|jni]
                  启用详细输出
    -version      输出产品版本并退出
    -showversion  输出产品版本并继续
    -ea[:\<packagename>...|:\<classname>]
    -enableassertions[:\<packagename>...|:\<classname>]
                  按指定的粒度启用断言
    -da[:\<packagename>...|:\<classname>]
    -disableassertions[:\<packagename>...|:\<classname>]
                  禁用具有指定粒度的断言
    -esa | -enablesystemassertions
                  启用系统断言
    -dsa | -disablesystemassertions
                  禁用系统断言
    -agentlib:\<libname>[=\<选项>]
                  加载本机代理库 \<libname>, 例如 -agentlib:hprof
                  另请参阅 -agentlib:jdwp=help 和 -agentlib:hprof=help
    -agentpath:\<pathname>[=\<选项>]
                  按完整路径名加载本机代理库
    -javaagent:\<jarpath>[=\<选项>]
                  加载 Java 编程语言代理, 请参阅 java.lang.instrument
    -splash:\<imagepath>
                  使用指定的图像显示启动屏幕
有关详细信息, 请参阅 http://www.oracle.com/technetwork/java/javase/documentation/index.html。
```

## 常用

```bash
#查看JDK安装路径 结果第一行
java -verbose
#[Opened C:\Program Files\Java\jdk1.8.0_181\jre\lib\rt.jar]
```

# CMD

## 电脑信息

```bash
#查看电脑信息
systeminfo
#查看开机启动文件夹
shell:common startup
fuwu
services.msc
taskmgr
#查看CUP核心数与线程数
wmic
cpu get *
NumberOfCores：CPU核心数
NumberOfLogicalProcessors：CPU线程数
```

文件信息

```cmd
#查看文件树不加/f为查看文件目录树
tree /f
```



cmd窗口点击内容会暂停，右键属性关闭快速编辑即可，但是关闭后无法复制cmd内容。

## 网络

```bash
#查找对应端口pid
netstat -ano #全部
netstat -ano|findstr  "59207"
#查看对应pid程序
tasklist|findstr "1396"
#强制关闭对应端口的进程及其子进程
taskkill /t /f /pid "8888"
#启动远程桌面
mstsc  
#策略组
gpedit.msc
#给同局域网发送消息弹窗
msg /server:126.11.9.213 * 消息    
#查看域名IP
nslookup 域名
#查看端口是否互通，需要控制面板打开 telnet功能
telnet ip 端口
#查看主板支持最大内存
wmic memphysical get maxcapacity 
```

## 网络切换

```cmd
@ echo off
%1 %2
ver|find "5.">nul&&goto :Admin
mshta vbscript:createobject("shell.application").shellexecute("%~s0","goto :Admin","","runas",1)(window.close)&goto :eof
:Admin

netsh interface set interface "WLAN" enabled
netsh interface set interface "INSEIDE" disabled
```



## [windows快捷弹窗](https://blog.csdn.net/younghaiqing/article/details/60867393)

```bash
#计算器	
calc
#剪贴簿查看器	
clipbrd
#设备管理器	
devmgmt.msc
#显示属性	
control desktop (desk.cpl)
#Internet属性	
inetcpl.cpl
#IP配置实用程序(显示连接配置)	
ipconfig /all
#IP配置实用程序(显示DNS缓存内容)	
ipconfig /displaydns
#IP配置实用程序(删除DNS缓存内容)	
ipconfig /flushdns
#IP配置实用程序(释放全部(或指定)适配器的由DHCP分配的动态IP地址)	
ipconfig /release
#IP配置实用程序(为全部适配器重新分配IP地址)	
ipconfig /renew
#IP配置实用程序(刷新DHCP并重新注册DNS)	
ipconfig /registerdns
#IP配置实用程序(显示DHCP Class ID)	
ipconfig /showclassid
#IP配置实用程序(修改DHCP Class ID)	
ipconfig /setclassid
#Java控制面板(如果已经安装)	
jpicpl32.cpl
#本地安全设置	
secpol.msc
#从Windows注销	
logoff
#网络连接	
control netconnections (ncpa.cpl)
#记事本	
notepad
#远程桌面	
mstsc
#Windows安全中心	
wscui.cpl
#服务	
services.msc
#共享文件夹	
fsmgmt.msc
#声音和音频设备属性	
mmsys.cpl
#系统配置实用程序	
msconfig
#任务管理器	
taskmgr
```



# HEXO

Hexo c 清理
Hexo g编译
Hexo s运行
Hexo d部署
hexo new draft（scaffolds中模板名字）“标题”新建草稿 在source/_drafts目录
hexo new “标题”新建文档
hexo publish “标题”草稿移动到source/_post目录

# IDEA

ctrl +R 替换

ctrl +shift + 数字标记文件内位置      ctrl+数字回到对应位置

双击shift全局搜索

ctrl + shift +F  全局文字搜索

ctrl + shift +y 搜索插件翻译选中文字

ctrl + shift +o codota搜索所选代码示例  不选中代码时显示翻译输入框

alt + F7 快速匹配项目中所有此用法

Ctrl+Alt+Shift+U  UML图

Shift+Alt 选中文件汇总所有当前字符

Ctrl+Shift+E 可获取最近查看或更改的代码段的列表

自定义模板后，方法名上/*   然后tab  添加注释

# WINDOWS

alt + tab 两应用之间切换

ctrl+w关闭当前窗口

服务自动重启

```cmd
#nginx
https://www.jb51.net/article/211867.htm
#Redis
redis-server --service-install redis.windows-service.conf --loglevel verbose

#tomcat
1、进入到tomcat\bin目录下，打开cmd命令窗口
2、输入 service install tomcat服务名(服务名称自定义）

在运行窗口输入：net start 服务名称
这样tomcat服务就启动了

做成开机主启动
在我的电脑右击-->管理-->服务和应用程序-->选择服务
或在cmd命令窗口输入：service.msc
找到Apache Tomcat XXXX [服务名称]
将手动修改成自动后就可以开机自启动了。

如果要删除，和修改服务！
在cmd命令窗口输入：
删除：sc delete 服务名
修改：sc config 服务名 [参数]
```



# LINUX

yum install net-tools 安装网络工具

linux可直接复制给别人，复制VMware工作目录然后直接打开

su 回车输入密码转换为超级管理员
ifconfig查询网络相关
clear清空显示
ifconfig eth0  192.16.。。。设置IP地址
命令多数为临时生效，写入配置文件为永久生效
ls [-选项][参数]：ls -la /etc 目录处理命令（list）
ls -a/l/lh/ld/i 隐藏文件/文件详细信息/大小单位显示/查看目录信息/查看文件id

- d l 文件开头  文件、目录、软连接     权限

mkdir【make directories】 创建目录  -p递归创建  创建没有此目录下的目录，可同时创建多个mkdir /tmp/a/b /tmp/a/c
cd 【change directory】切换目录  cd ..返回上一级目录
pwd【print working directory】
cd ./.. 当前目录/上级目录
remdir【remove empty dirctories】 删除空目录
cp【copy】复制 源文件 目录  -r复制目录 -p复制并保留文件属性（比如创建时间）  复制并改名
mv【move】 剪切
rm【remove】删除文件，目录 -r删除目录 -f强制删除 -rf直接删除
ctrl+c终止操作
touch 创建文件 可创建多个，创建空格文件名使用双引号但是不建议
cat 浏览文件内容 -n显示行号
tac 倒置浏览文件内容
more 分页显示长文件 空格翻页，回车换行，q退出，
less 显示文件内容，可向上翻页pageup，可搜索：/关键词 n显示下一个搜索结果  
head 只看文件前几行 -n 7 文件 显示前7行，默认前十行
tail 同上 -f动态显示变化 ctrl+c退出

ln【link】 -s创建软连接 不写-s创建硬链接【软连接相当于快捷方式rwxrwxrwx，权限跟源文件权限无关，硬链接相当于拷贝cp -p并且同步更新，硬链接通过i节点区分，不能跨分区（相当于不能c盘复制到d盘），不能针对目录使用】
yum -y install git
sudo -s1获得管理员权限
命令：sudo  -s回车
输入密码

编辑保存文件-----------------------------------
第一步：cd到该文件的目录下

第二步：vi  要编辑的文件名，进入普通模式，（可以查看文件内容）
sudo gedit /etc/apt/sources.list 可视化编辑
第三步：输入 i  进入编辑模式，开始编辑文本

第四步：编辑之后，按ESC退出到普通模式。

第五步：在普通模式下，输入 : 进入命令模式

第六步：在命令模式下输入wq, 即可保存并退出

【#】代表 root权限
【$】代表普通用户
reboot重启

BUG————————————————————————————–
centos7 cannot find a valid baseurl for repo·············
https://blog.csdn.net/jiankunking/article/details/82770502
zlib.h: No such file or directory························
yum install zlib-devel
CentOS Name or service not known··································
vi /etc/sysconfig/network-scripts/ifcfg-ens33命令来编辑配置文件
Job for network.service failed because the control process exited with error code········································································
关闭 NetworkManger 服务就好了， service NetworkManager stop
禁止开机启动 chkconfig NetworkManager off
su: Authentication failure·····················································
sudo passwd root
网络—————————————————————————————

网络不行都用桥接

```
systemctl restart network //重启网卡
```

====ifup eth0（网卡名称）
ip addr查询网络信息

postgresql——————————————————————————-
sudo -u postgres psql 进入psql交互环境
alter user postgres with password'密码'; 修改postgres用户的密码
\q  退出数据库 
\?
\password：设置密码
\h：查看SQL命令的解释，比如\h select。
?：查看psql命令列表。
\l：列出所有数据库。
\c [database_name]：连接其他数据库。
\d：列出当前数据库的所有对象，如Table,View等。
\dt: 列出当前数据库的所有Table。
\d [table_name]：列出某一张表格的结构。
\du：列出所有用户。
\e：打开文本编辑器。
\conninfo：列出当前数据库和连接的信息。
df 命令 来检查当前磁盘利用率

SecureCRT==============================
alt+p进入sftp
put -r 路径传目录

shp导入到postgresql———————————————————————
shp2pgsql -s 4544 -c -W "UTF-8" ADDRESS.shp  public.rrrrr| psql -h 192.168.22.128 -d postgres -U postgres -W

转换格式———————————————————————
ogr2ogr -f "GeoJSON" ./natural.json PG:"host=localhost dbname=postgres user=postgres password=724111" -sql "select * from natural"

切片——————————————————————————————
tippecanoe -z 14 -Z 5 -ps -Bg -o buildings.mbtiles buildings.json
tippecanoe -e lakepbf -pC -Z1 -z17 -f natural.json 



# 各种常用软件环境安装

# NPM

npm install ---install dependencies

npm run dev---serve with hot reload at localhost:8080

npm run build---build for production with minification

npm run build --report----build for production and view the bundle analyzer report

npm run unit---run unit tests

npm run e2e---run e2e tests

npm test----run all tests

# REDIDS

./redis-server redis.windows.conf 启动服务

server.exe --service-install redis.windows.conf --loglevel verbose 开机启动 windows

redis-server --service-install redis.windows-service.conf --loglevel verbose

# VSCODE

ctrl+~ ：打开终端
F1 或 Ctrl+Shift+P（俗称万能键）  ：打开命令面板。在打开的输入框内，可以输入任何命令
代码格式化:   Shift+Alt+F

# VUE

脚手架
npm config set registry https://registry.npm.taobao.org
vue init webpack projectName
cd projectName
npm install
npm run dev
npm i element-ui -S
npm install axios



# GIT

# **Git常用命令及方法大全**

 

>  
>
> ![img](https://imgconvert.csdnimg.cn/aHR0cDovL3d3dy5ydWFueWlmZW5nLmNvbS9ibG9naW1nL2Fzc2V0LzIwMTUvYmcyMDE1MTIwOTAxLnBuZw?x-oss-process=image/format,png)
>
> 下面是我整理的常用 Git 命令清单。几个专用名词的译名如下。
>
> > - Workspace：工作区
> > - Index / Stage：暂存区
> > - Repository：仓库区（或本地仓库）
> > - Remote：远程仓库

>  
>
> ## **本地分支关联远程**
>
> ```vbnet
> git branch --set-upstream-to=origin/分支名 分支名
> ```
>
> ## 代码库修改密码后push不上去怎么办？
>
> ```php
> // 重新输入密码
> git config --system --unset credential.helper
> // 密码存储同步
> git config --global credential.helper store
> ```
>
>  

 

## 一、新建代码库

> ```bash
> # 在当前目录新建一个Git代码库
> $ git init
> # 新建一个目录，将其初始化为Git代码库
> $ git init [project-name]
> # 下载一个项目和它的整个代码历史
> $ git clone [url]
> ```

## 二、配置

 

Git的设置文件为`.gitconfig`，它可以在用户主目录下（全局配置），也可以在项目目录下（项目配置）。

> ```bash
> # 显示当前的Git配置
> $ git config --list
> # 编辑Git配置文件
> $ git config -e [--global]
> # 设置提交代码时的用户信息
> $ git config [--global] user.name "[name]"
> $ git config [--global] user.email "[email address]"
> ```

## 三、增加/删除文件

> ```bash
> # 添加指定文件到暂存区
> $ git add [file1] [file2] ...
> # 添加指定目录到暂存区，包括子目录
> $ git add [dir]
> # 添加当前目录的所有文件到暂存区
> $ git add .
> 
> # 添加每个变化前，都会要求确认
> # 对于同一个文件的多处变化，可以实现分次提交
>  $ git add -p
> # 删除工作区文件，并且将这次删除放入暂存区
> $ git rm [file1] [file2] ...
> # 停止追踪指定文件，但该文件会保留在工作区
> $ git rm --cached [file]
> # 改名文件，并且将这个改名放入暂存区
> $ git mv [file-original] [file-renamed]
> ```

## 四、代码提交

> ```bash
> # 提交暂存区到仓库区
> $ git commit -m [message]
> # 提交暂存区的指定文件到仓库区
> $ git commit [file1] [file2] ... -m [message]
> # 提交工作区自上次commit之后的变化，直接到仓库区
> $ git commit -a
> # 提交时显示所有diff信息
> $ git commit -v
>  # 使用一次新的commit，替代上一次提交
> # 如果代码没有任何新变化，则用来改写上一次commit的提交信息
> $ git commit --amend -m [message]
> # 重做上一次commit，并包括指定文件的新变化
> $ git commit --amend [file1] [file2] ...
> ```

## 五、分支

> ```bash
> # 列出所有本地分支
> $ git branch
> # 列出所有远程分支
> $ git branch -r
> # 列出所有本地分支和远程分支
> $ git branch -a
> # 新建一个分支，但依然停留在当前分支
> $ git branch [branch-name]
>  # 以远程分支为基础新建一个分支，并切换到该分支
> $ git checkout -b [branch] origin/[remote-branch]
> # 新建一个分支，指向指定commit
> $ git branch [branch] [commit]
> # 新建一个分支，与指定的远程分支建立追踪关系
> $ git branch --track [branch] [remote-branch]
> # 切换到指定分支，并更新工作区
> $ git checkout [branch-name]
> # 切换到上一个分支
> $ git checkout -
> # 建立追踪关系，在现有分支与指定的远程分支之间
> $ git branch --set-upstream [branch] [remote-branch]
>  # 合并指定分支到当前分支
> $ git merge [branch]
> # 选择一个commit，合并进当前分支
> $ git cherry-pick [commit]
> # 删除分支
> $ git branch -d [branch-name]
> # 删除远程分支
> $ git push origin --delete [branch-name]
> $ git branch -dr [remote/branch]
> ```

## 六、标签

> ```bash
> # 列出所有tag
> $ git tag
> # 新建一个tag在当前commit
> $ git tag [tag]
> # 新建一个tag在指定commit
> $ git tag [tag] [commit]
> # 删除本地tag
> $ git tag -d [tag]
>  # 删除远程tag
> $ git push origin :refs/tags/[tagName]
> # 查看tag信息
> $ git show [tag]
> # 提交指定tag
> $ git push [remote] [tag]
> # 提交所有tag
> $ git push [remote] --tags
> # 新建一个分支，指向某个tag
> $ git checkout -b [branch] [tag]
> ```

## 七、查看信息

> ```bash
> # 显示有变更的文件
> $ git status
> # 显示当前分支的版本历史
> $ git log
> # 显示commit历史，以及每次commit发生变更的文件
> $ git log --stat
> # 搜索提交历史，根据关键词
> $ git log -S [keyword]
>  # 显示某个commit之后的所有变动，每个commit占据一行
> $ git log [tag] HEAD --pretty=format:%s
> # 显示某个commit之后的所有变动，其"提交说明"必须符合搜索条件
> $ git log [tag] HEAD --grep feature
> # 显示某个文件的版本历史，包括文件改名
> $ git log --follow [file]
> $ git whatchanged [file]
> # 显示指定文件相关的每一次diff
> $ git log -p [file]
> # 显示过去5次提交
> $ git log -5 --pretty --oneline
> # 显示所有提交过的用户，按提交次数排序
>  $ git shortlog -sn
> # 显示指定文件是什么人在什么时间修改过
> $ git blame [file]
> # 显示暂存区和工作区的差异
> $ git diff
> # 显示暂存区和上一个commit的差异
> $ git diff --cached [file]
> # 显示工作区与当前分支最新commit之间的差异
> $ git diff HEAD
> # 显示两次提交之间的差异
> $ git diff [first-branch]...[second-branch]
> # 显示今天你写了多少行代码
>  $ git diff --shortstat "@{0 day ago}"
> # 显示某次提交的元数据和内容变化
> $ git show [commit]
> # 显示某次提交发生变化的文件
> $ git show --name-only [commit]
> # 显示某次提交时，某个文件的内容
> $ git show [commit]:[filename]
> # 显示当前分支的最近几次提交
> $ git reflog
> ```

## 八、远程同步

> ```bash
> # 下载远程仓库的所有变动
> $ git fetch [remote]
> # 显示所有远程仓库
> $ git remote -v
> # 显示某个远程仓库的信息
> $ git remote show [remote]
> # 增加一个新的远程仓库，并命名
> $ git remote add [shortname] [url]
>  # 取回远程仓库的变化，并与本地分支合并
> $ git pull [remote] [branch]
> # 上传本地指定分支到远程仓库
> $ git push [remote] [branch]
> # 强行推送当前分支到远程仓库，即使有冲突
> $ git push [remote] --force
> # 推送所有分支到远程仓库
> $ git push [remote] --all
> ```

## 九、撤销

> ```bash
> # 恢复暂存区的指定文件到工作区
> $ git checkout [file]
> # 恢复某个commit的指定文件到暂存区和工作区
> $ git checkout [commit] [file]
> # 恢复暂存区的所有文件到工作区
> $ git checkout .
> # 重置暂存区的指定文件，与上一次commit保持一致，但工作区不变
> $ git reset [file]
>  # 重置暂存区与工作区，与上一次commit保持一致$ git reset --hard
> # 重置当前分支的指针为指定commit，同时重置暂存区，但工作区不变
> $ git reset [commit]
> # 重置当前分支的HEAD为指定commit，同时重置暂存区和工作区，与指定commit一致
> $ git reset --hard [commit]
> # 重置当前HEAD为指定commit，但保持暂存区和工作区不变
> $ git reset --keep [commit]
> # 新建一个commit，用来撤销指定commit
> # 后者的所有变化都将被前者抵消，并且应用到当前分支
> $ git revert [commit]
> # 暂时将未提交的变化移除，稍后再移入
> $ git stash
>  $ git stash pop
> ```

## 十、其他

> ```bash
> # 生成一个可供发布的压缩包
> $ git archive
> ```

# Git分支管理策略

 

**一、主分支Master**

首先，代码库应该有一个、且仅有一个主分支。所有提供给用户使用的正式版本，都在这个主分支上发布。

![img](https://imgconvert.csdnimg.cn/aHR0cDovL3d3dy5ydWFueWlmZW5nLmNvbS9ibG9naW1nL2Fzc2V0LzIwMTIwNy9iZzIwMTIwNzA1MDMucG5n?x-oss-process=image/format,png)

Git主分支的名字，默认叫做Master。它是自动建立的，版本库初始化以后，默认就是在主分支在进行开发。

**二、开发分支Develop**

主分支只用来分布重大版本，日常开发应该在另一条分支上完成。我们把开发用的分支，叫做Develop。

![img](https://imgconvert.csdnimg.cn/aHR0cDovL3d3dy5ydWFueWlmZW5nLmNvbS9ibG9naW1nL2Fzc2V0LzIwMTIwNy9iZzIwMTIwNzA1MDQucG5n?x-oss-process=image/format,png)

这个分支可以用来生成代码的最新隔夜版本（nightly）。如果想正式对外发布，就在Master分支上，对Develop分支进行"合并"（merge）。

Git创建Develop分支的命令：

> 　　git checkout -b develop master

将Develop分支发布到Master分支的命令：

> 　　# 切换到Master分支
> 　　git checkout master
>
> 　　# 对Develop分支进行合并
> 　　git merge --no-ff develop

这里稍微解释一下，上一条命令的--no-ff参数是什么意思。默认情况下，Git执行"快进式合并"（fast-farward merge），会直接将Master分支指向Develop分支。

![img](https://imgconvert.csdnimg.cn/aHR0cDovL3d3dy5ydWFueWlmZW5nLmNvbS9ibG9naW1nL2Fzc2V0LzIwMTIwNy9iZzIwMTIwNzA1MDUucG5n?x-oss-process=image/format,png)

使用--no-ff参数后，会执行正常合并，在Master分支上生成一个新节点。为了保证版本演进的清晰，我们希望采用这种做法。关于合并的更多解释，请参考Benjamin Sandofsky的[《Understanding the Git Workflow》](http://sandofsky.com/blog/git-workflow.html)。

![img](https://imgconvert.csdnimg.cn/aHR0cDovL3d3dy5ydWFueWlmZW5nLmNvbS9ibG9naW1nL2Fzc2V0LzIwMTIwNy9iZzIwMTIwNzA1MDYucG5n?x-oss-process=image/format,png)

**三、临时性分支**

前面讲到版本库的两条主要分支：Master和Develop。前者用于正式发布，后者用于日常开发。其实，常设分支只需要这两条就够了，不需要其他了。

但是，除了常设分支以外，还有一些临时性分支，用于应对一些特定目的的版本开发。临时性分支主要有三种：

> 　　* 功能（feature）分支
>
> 　　* 预发布（release）分支
>
> 　　* 修补bug（fixbug）分支

这三种分支都属于临时性需要，使用完以后，应该删除，使得代码库的常设分支始终只有Master和Develop。

**四、 功能分支**

接下来，一个个来看这三种"临时性分支"。

第一种是功能分支，它是为了开发某种特定功能，从Develop分支上面分出来的。开发完成后，要再并入Develop。

![img](https://imgconvert.csdnimg.cn/aHR0cDovL3d3dy5ydWFueWlmZW5nLmNvbS9ibG9naW1nL2Fzc2V0LzIwMTIwNy9iZzIwMTIwNzA1MDcucG5n?x-oss-process=image/format,png)

功能分支的名字，可以采用feature-*的形式命名。

创建一个功能分支：

> 　　git checkout -b feature-x develop

开发完成后，将功能分支合并到develop分支：

> 　　git checkout develop
>
> 　　git merge --no-ff feature-x

删除feature分支：

> 　　git branch -d feature-x

**五、预发布分支**

第二种是预发布分支，它是指发布正式版本之前（即合并到Master分支之前），我们可能需要有一个预发布的版本进行测试。

预发布分支是从Develop分支上面分出来的，预发布结束以后，必须合并进Develop和Master分支。它的命名，可以采用release-*的形式。

创建一个预发布分支：

> 　　git checkout -b release-1.2 develop

确认没有问题后，合并到master分支：

> 　　git checkout master
>
> 　　git merge --no-ff release-1.2
>
> 　　# 对合并生成的新节点，做一个标签
> 　　git tag -a 1.2

再合并到develop分支：

> 　　git checkout develop
>
> 　　git merge --no-ff release-1.2

最后，删除预发布分支：

> 　　git branch -d release-1.2

**六、修补bug分支**

最后一种是修补bug分支。软件正式发布以后，难免会出现bug。这时就需要创建一个分支，进行bug修补。

修补bug分支是从Master分支上面分出来的。修补结束以后，再合并进Master和Develop分支。它的命名，可以采用fixbug-*的形式。

![img](https://imgconvert.csdnimg.cn/aHR0cDovL3d3dy5ydWFueWlmZW5nLmNvbS9ibG9naW1nL2Fzc2V0LzIwMTIwNy9iZzIwMTIwNzA1MDgucG5n?x-oss-process=image/format,png)

创建一个修补bug分支：

> 　　git checkout -b fixbug-0.1 master

修补结束后，合并到master分支：

> 　　git checkout master
>
> 　　git merge --no-ff fixbug-0.1
>
> 　　git tag -a 0.1.1

再合并到develop分支：

> 　　git checkout develop
>
> 　　git merge --no-ff fixbug-0.1

最后，删除"修补bug分支"：

> 　　git branch -d fixbug-0.1

 

# 版本回退-撤销文件修改

{针对文件修改恢复}

## 工作区修改一个文件后，又想回到修改前(git add前)

\1. 当然可以直接手动再在工作区中将文件修改回去

\2. 修改后，通过命令git status查看

```html
$ git status



# On branch master



# Changes not staged for commit:



#   (use "git add \<file>..." to update what will be committed)



#   (use "git checkout -- \<file>..." to discard changes in working directory)



#



#       modified:   readme.txt



#



no changes added to commit (use "git add" and/or "git commit -a")
```

这时Git会告诉你，git checkout -- file可以丢弃工作区的修改：

```html
$ git checkout -- readme.txt
```

**Note**:

\1. git checkout -- file命令中的--很重要，没有--，就变成了“切换到另一个分支”的命令，我们在后面的分支管理中会再次遇到git checkout命令。

\2. 命令git checkout -- readme.txt意思就是，把readme.txt文件在工作区的修改全部撤销，这里有两种情况：

一种是readme.txt自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；一种是readme.txt已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。总之，就是让这个文件回到最近一次git commit或git add时的状态。

\3. 工作区、暂存区的概念不清楚的可见于[Git版本控制教程 - Git本地仓库](http://blog.csdn.net/pipisorry/article/details/44588351)

## 如果在工作区中修改了文件还git add到暂存区（但是在commit之前）

用git status查看一下，修改只是添加到了暂存区，还没有提交：

```html
$ git status



# On branch master



# Changes to be committed:



#   (use "git reset HEAD \<file>..." to unstage)



#



#       modified:   readme.txt



#
```

Git同样告诉我们，用命令git reset HEAD file可以把暂存区的修改撤销掉（unstage），重新放回工作区：

```html
$ git reset HEAD readme.txt



Unstaged changes after reset:



M       readme.txt
```

git reset命令既可以回退版本，也可以把暂存区的修改回退到工作区。当我们用HEAD时，表示最新的版本。

再用git status查看一下，现在暂存区是干净的，工作区有修改。

然后丢弃工作区的修改

```html
$ git checkout -- readme.txt



 



$ git status



# On branch master



nothing to commit (working directory clean)
```

## 不但修改了文件还从暂存区提交commit到了版本库 - 版本回退

版本回退可以回退到上一个版本。不过，这是有条件的，就是你还没有把自己的本地版本库推送到远程。Git是分布式版本控制系统。

在工作中对某个文件（如readme.txt）进行多次修改交commit。

可以通过版本控制系统命令告诉我们提交的历史记录，在Git中，我们用git log命令查看：

```html
$ git log



commit 3628164fb26d48395383f8f31179f24e0882e1e0



Author: Michael Liao \<askxuefeng@gmail.com>



Date:   Tue Aug 20 15:11:49 2013 +0800



 



    append GPL



 



commit ea34578d5496d7dd233c827ed32a8cd576c5ee85



Author: Michael Liao \<askxuefeng@gmail.com>



Date:   Tue Aug 20 14:53:12 2013 +0800



 



    add distributed



 



commit cb926e7ea50ad11b8f9e909c05226233bf755030



Author: Michael Liao \<askxuefeng@gmail.com>



Date:   Mon Aug 19 17:51:55 2013 +0800



 



    wrote a readme file
```

**Note**:

\1. git log命令显示从最近到最远的提交日志，我们可以看到3次提交，最近的一次是append GPL，上一次是add distributed，最早的一次是wrote a readme file。

\2. 如果嫌输出信息太多，看得眼花缭乱的，可以试试加上--pretty=oneline参数：

```html
$ git log --pretty=oneline



3628164fb26d48395383f8f31179f24e0882e1e0 append GPL



ea34578d5496d7dd233c827ed32a8cd576c5ee85 add distributed



cb926e7ea50ad11b8f9e909c05226233bf755030 wrote a readme file
```

\3. 你看到的一大串类似3628164...882e1e0的是commit id（版本号），和SVN不一样，Git的commit id不是1，2，3……递增的数字，而是一个SHA1计算出来的一个非常大的数字，用十六进制表示，而且你看到的commit id和我的肯定不一样，以你自己的为准。为什么commit id需要用这么一大串数字表示呢？因为Git是分布式的版本控制系统，后面我们还要研究多人在同一个版本库里工作，如果大家都用1，2，3……作为版本号，那肯定就冲突了。

\4. 每提交一个新版本，实际上Git就会把它们自动串成一条时间线。如果使用可视化工具（如GitX、github的客户端、pycharm）查看Git历史，就可以更清楚地看到提交历史的时间线。

### 现在我们想要把readme.txt回退到上一个版本

如“add distributed”的那个版本，怎么做呢？首先，Git必须知道当前版本是哪个版本，在Git中，用HEAD表示当前版本，也就是最新的提交3628164...882e1e0（注意我的提交ID和你的肯定不一样），上一个版本就是HEAD^，上上一个版本就是HEAD^^，当然往上100个版本写100个^比较容易数不过来，所以写成HEAD~100。

现在，我们要把当前版本“append GPL”回退到上一个版本“add distributed”，就可以使用git reset命令：

```csharp
$ git reset --hard HEAD^



HEAD is now at ea34578 add distributed
```

这时readme.txt的内容就成了版本add distributed

我们用git log再看看现在版本库的状态：

```html
$ git log



commit ea34578d5496d7dd233c827ed32a8cd576c5ee85



Author: Michael Liao \<askxuefeng@gmail.com>



Date:   Tue Aug 20 14:53:12 2013 +0800



 



    add distributed



 



commit cb926e7ea50ad11b8f9e909c05226233bf755030



Author: Michael Liao \<askxuefeng@gmail.com>



Date:   Mon Aug 19 17:51:55 2013 +0800



 



    wrote a readme file
```

最新的那个版本append GPL已经看不到了！

## 恢复文件后，要是我们又想回到修改后的文件呢？（命令行窗口还没有被关掉）

{这个是git reset --hard后，又反悔了，想回到修改后的状态}

只要上面的命令行窗口还没有被关掉，你就可以顺着往上找啊找啊，找到那个append GPL的commit id是3628164...，于是就可以指定回到未来的某个版本：

```html
$ git reset --hard 3628164



HEAD is now at 3628164 append GPL
```

版本号没必要写全，前几位就可以了，Git会自动去找。

Git的版本回退速度非常快，因为Git在内部有个指向当前版本的HEAD指针，当你回退版本的时候，Git仅仅是把HEAD从指向append GPL：

![git-head](https://img-blog.csdn.net/20150824103212235?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQv/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

改为指向add distributed：

![git-head-move](https://img-blog.csdn.net/20150824103242645?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQv/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

然后顺便把工作区的文件更新了。所以你让HEAD指向哪个版本号，你就把当前版本定位在哪。

## 恢复文件后，要是我们又想回到修改后的文件呢？（命令行窗口早就关掉了）

{这个是git reset --hard后，又反悔了，想回到修改后的状态}

想恢复到新版本怎么办？找不到新版本的commit id怎么办？当你用$ git reset --hard HEAD^回退到add distributed版本时，再想恢复到append GPL，就必须找到append GPL的commit id。

Git提供了一个命令git reflog用来记录你的每一次命令：[[Git高级教程](http://blog.csdn.net/pipisorry/article/details/50669350):git log与git reflog]

```html
$ git reflog



ea34578 HEAD@{0}: reset: moving to HEAD^



3628164 HEAD@{1}: commit: append GPL



ea34578 HEAD@{2}: commit: add distributed



cb926e7 HEAD@{3}: commit (initial): wrote a readme file
```

第二行显示append GPL的commit id是3628164，现在，你又可以乘坐时光机回到未来了。



