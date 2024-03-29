---
index: 2
icon: markdown
title: 工具篇
date: 2022-06-06
category:
  - 工具篇
tag:
  - 工具篇
---

工具篇

<!-- more -->

# 工具篇

> 工欲善其事，必先利其器

# 编程

## IDEA

### 插件

```
Alibaba Java Coding Guidelines
CamelCase
EasyCode
IDE Eval Reset
Key Promoter X
LeetCode Editor
Live Coding in Python
Maven Helper
MyBatisX
Pylint
Python
Rainbow Brackets
Tabnine Al Code Completion
Translation
```

## [GIT](https://www.runoob.com/git/git-workspace-index-repo.html)

http://gitimmersion.com/index.html

http://try.github.io/ 

在线实操学习网站

### 工作流程

![img](https://www.runoob.com/wp-content/uploads/2015/02/git-process.png)

### 工作区、暂存区、版本库

- **工作区：**就是你在电脑里能看到的目录。
- **暂存区：**英文叫 stage 或 index。一般存放在 **.git** 目录下的 index 文件（.git/index）中，所以我们把暂存区有时也叫作索引（index）。
- **版本库：**工作区有一个隐藏目录 **.git**，这个不算工作区，而是 Git 的版本库。

**.git文件夹目录结构**

├─hooks
├─info
├─objects
│  ├─info
│  └─pack
└─refs
    ├─heads
    └─tags

![img](https://www.runoob.com/wp-content/uploads/2015/02/1352126739_7909.jpg)

### GIT命令【同linux】

![img](https://www.runoob.com/wp-content/uploads/2015/02/git-command.jpg)

```cmd
本地创建仓库
#初始化仓库，项目下会生成.git文件夹，后面加目录名时创建指定目录为仓库，无则当前目录为仓库
git init newreponame
#将文件纳入版本控制，将文件添加到暂存区， 文件名.文件后缀  可用*通配符 git add .添加所有
git add *.*
#初始化项目版本，将暂存区内容添加到仓库
git commit -m 'commit信息，linux使用单引号，windows使用双引号'

#克隆仓库到指定目录
git clone \<repo> \<directory>

配置管理
#查看所有配置
git config --list
#编辑当前仓库配置  --global针对所有仓库
git config -e 
#设置当前用户配置信息  --global针对所有仓库
git config --global user.name "runoob"
git config --global user.email test@runoob.com

基本命令
#提交与修改
#创建与提交快照
git add	#添加文件到暂存区
git status	#查看仓库当前的状态，显示有变更的文件。
git diff	#比较文件的不同，即暂存区和工作区的差异。
git commit	#提交暂存区到本地仓库。
git reset	#回退版本。
git rm	#删除工作区文件。
git mv	#移动或重命名工作区文件。
#提交日志
git log	#查看历史提交记录
git blame \<file>	#以列表形式查看指定文件的历史修改记录
#远程操作
git remote	#远程仓库操作
git fetch	#从远程获取代码库
git pull	#下载远程代码并合并
git push	#上传远程代码并合并

分支管理
#显示所有分支/+分支名创建分支 命令：
git branch (branchname)
#切换分支命令:
git checkout (branchname)
 git checkout -b (branchname) #创建新分支并立即切换到该分支下
#当你切换分支的时候，Git 会用该分支的最后提交的快照替换你的工作目录的内容， 所以多个分支不需要多个目录。
#合并分支
git merge 
#合并冲突处理后add告诉git冲突已解决
git add 文件 
#删除分支
git branch -d (branchname)

历史记录
git log #查看历史提交记录。 --oneline  查看简洁版本  --graph 分支历史  --reverse逆向展示  --author指定用户  --since 、 --before， --until、 --after  指定日期 http://git-scm.com/docs/git-log
git blame \<file> #以列表形式查看指定文件的历史修改记录。

标签
git tag -a v1.0 #创建标签
git log --oneline --decorate --graph / git tag#查看标签
git tag -a v0.9 85fc7e7#发布后追加标签
git tag -a \<tagname> -m "runoob.com标签"#指定标签信息命令：
git tag -s \<tagname> -m "runoob.com标签"PGP#签名标签命令：

远程仓库
git remote add [shortname] [url]#添加一个新的远程仓库
ssh-keygen -t rsa -C "youremail@example.com"#生成 SSH Key，~/ 下生成 .ssh 文件夹，进去，打开 id_rsa.pub，复制里面的 key
 #github中Account => Settings SSH and GPGkeys
 ssh -T git@github.com#验证是否成功
git remote/git remote -v #查看配置的所有远程库/远程库实际地址
git fetch#从远程仓库下载新分支与数据，该命令执行完后需要执行 git merge 远程分支到你所在的分支。
git remote rm [别名]#删除远程仓库

服务器搭建centos
#1、安装Git
yum install curl-devel expat-devel gettext-devel openssl-devel zlib-devel perl-devel
yum install git
#创建一个git用户组和用户，用来运行git服务：
groupadd git
useradd git -g git
#2、创建证书登录
#收集所有需要登录的用户的公钥，公钥位于id_rsa.pub文件中，把我们的公钥导入到/home/git/.ssh/authorized_keys文件里，一行一个。
#如果没有该文件创建它：
cd /home/git/
mkdir .ssh
chmod 755 .ssh
touch .ssh/authorized_keys
chmod 644 .ssh/authorized_keys
#3、初始化Git仓库
#首先我们选定一个目录作为Git仓库，假定是/home/gitrepo/runoob.git，在/home/gitrepo目录下输入命令：

cd /home
mkdir gitrepo
chown git:git gitrepo/
cd gitrepo
git init --bare runoob.git
Initialized empty Git repository in /home/gitrepo/runoob.git/
#以上命令Git创建一个空仓库，服务器上的Git仓库通常都以.git结尾。然后，把仓库所属用户改为git：

chown -R git:git runoob.git
#4、克隆仓库
git clone git@192.168.45.4:/home/gitrepo/runoob.git
Cloning into 'runoob'...
warning: You appear to have cloned an empty repository.
Checking connectivity... done.
#192.168.45.4 为 Git 所在服务器 ip ，你需要将其修改为你自己的 Git 服务 ip。
#这样我们的 Git 服务器安装就完成。


其他命令
#同linux
touch 文件名#创建文件
mkdir 路径#创建文件夹
echo 'runoob.com' > test.txt#创建内容文'runoob.com'的test.txt文件
```


​    git config --global --list 显示 git 配置信息
​    git config --global [user.name](http://user.name/) “yourname”，git config --global user.email “email@email.com ”设置全局用户名和邮箱
​    ssh-keygen -t rsa -C “邮箱”
​     clip \< ~/.ssh/id_rsa.pub 复制密匙，在github设置中新建SSH key粘贴即可

## VSCode

### 插件

```
Auto Close Tag
Auto Rename Tag
Chinese(Simplified（简体中文）Langua..
CSS Navigation
ESLint
GitLens-Git supercharged
HTML CSS Support
JavaScript (ES6)code snippe
Live Server
open in browser
Vetur
vscode-icons
```



# 电脑应用

Synergy键鼠共享工具
坚果云，文件同步工具
Quicker
PicGO
Snipaste
ScreenToGif 

# 学习

流程图
  在线流程图 [ProcessOn](https://www.processon.com/i/5b04bf47e4b05f5d6b64d2b2)
  离线流程图 XMaind

# 网站推荐

# 艺术

# 记录

时光序【备忘，提醒，TODO】

# 插件

Edge

   Vimium

|          |      | Navigating the page                                          |
| -------- | ---- | ------------------------------------------------------------ |
| j, \<c-e> |      | Scroll down (*scrollDown*)                                   |
| k, \<c-y> |      | Scroll up (*scrollUp*)                                       |
| gg       |      | Scroll to the top of the page (*scrollToTop*)                |
| G        |      | Scroll to the bottom of the page (*scrollToBottom*)          |
| d        |      | Scroll a half page down (*scrollPageDown*)                   |
| u        |      | Scroll a half page up (*scrollPageUp*)                       |
|          |      | Scroll a full page down (*scrollFullPageDown*)               |
|          |      | Scroll a full page up (*scrollFullPageUp*)                   |
| h        |      | Scroll left (*scrollLeft*)                                   |
| l        |      | Scroll right (*scrollRight*)                                 |
| r        |      | Reload the page (*reload*)                                   |
| yy       |      | Copy the current URL to the clipboard (*copyCurrentUrl*)     |
| p        |      | Open the clipboard's URL in the current tab (*openCopiedUrlInCurrentTab*) |
| P        |      | Open the clipboard's URL in a new tab (*openCopiedUrlInNewTab*) |
| i        |      | Enter insert mode (*enterInsertMode*)                        |
| v        |      | Enter visual mode (*enterVisualMode*)                        |
| gi       |      | Focus the first text input on the page (*focusInput*)        |
| f        |      | Open a link in the current tab (*LinkHints.activateMode*)    |
| F        |      | Open a link in a new tab (*LinkHints.activateModeToOpenInNewTab*) |
|          |      | Open a link in a new tab & switch to it (*LinkHints.activateModeToOpenInNewForegroundTab*) |
| gf       |      | Select the next frame on the page (*nextFrame*)              |
| gF       |      | Select the page's main/top frame (*mainFrame*)               |
|       |      | **Using the vomnibar**                                       |
| o     |      | Open URL, bookmark or history entry (*Vomnibar.activate*)    |
| O     |      | Open URL, bookmark or history entry in a new tab (*Vomnibar.activateInNewTab*) |
| b     |      | Open a bookmark (*Vomnibar.activateBookmarks*)               |
| B     |      | Open a bookmark in a new tab (*Vomnibar.activateBookmarksInNewTab*) |
| T     |      | Search through your open tabs (*Vomnibar.activateTabSelection*) |
|       |      | **Using find**                                               |
| /     |      | Enter find mode (*enterFindMode*)                            |
| n     |      | Cycle forward to the next find match (*performFind*)         |
| N     |      | Cycle backward to the previous find match (*performBackwardsFind*) |
|       |      | **Navigating history**                                       |
| H     |      | Go back in history (*goBack*)                                |
| L     |      | Go forward in history (*goForward*)                          |
|       |      | **Manipulating tabs**                                        |
| t     |      | Create new tab (*createTab*)                                 |
| J, gT |      | Go one tab left (*previousTab*)                              |
| K, gt |      | Go one tab right (*nextTab*)                                 |
| ^     |      | Go to previously-visited tab (*visitPreviousTab*)            |
| g0    |      | Go to the first tab (*firstTab*)                             |
| g$    |      | Go to the last tab (*lastTab*)                               |
| yt    |      | Duplicate current tab (*duplicateTab*)                       |
| \<a-p> |      | Pin or unpin current tab (*togglePinTab*)                    |
| \<a-m> |      | Mute or unmute current tab (*toggleMuteTab*)                 |
| x     |      | Close current tab (*removeTab*)                              |
| X     |      | Restore closed tab (*restoreTab*)                            |
|       |      | **Miscellaneous**                                            |
| ?     |      | Show help (*showHelp*)                                       |

