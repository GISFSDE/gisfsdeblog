---
index: 2
icon: markdown
title: 博客模板
date: 2022-06-06
category:
  - 博客模板
tag:
  - 博客模板
---

代码折叠

Welcome to [Hexo](https://hexo.io/)! This is your very first post. Check [documentation](https://hexo.io/docs/) for more info. If you get any problems when using Hexo, you can find the answer in [troubleshooting](https://hexo.io/docs/troubleshooting.html) or you can ask me on [GitHub](https://github.com/hexojs/hexo/issues).

<!-- more -->

## Quick Start

### Create a new post

``` bash
$ hexo new "My New Post"
```

More info: [Writing](https://hexo.io/docs/writing.html)

### Run server

``` bash
$ hexo server
```

More info: [Server](https://hexo.io/docs/server.html)

### Generate static files

``` bash
$ hexo generate
```

More info: [Generating](https://hexo.io/docs/generating.html)

### Deploy to remote sites

``` bash
$ hexo deploy
```

More info: [Deployment](https://hexo.io/docs/one-command-deployment.html)

     ```java main.java >folded
     import main.java
    private static void main(){
          test
         int i = 0;
        return i;}
     ```
title: 标题
top: 1   #top值越大越靠前，大于0显示置顶图标
toc: true
recommend: 1  #recommend值（必须大于0），值越大越靠前，相等取最新的，最多取5条
keywords: categories-github
date: 2021-01-19 22:10:43
thumbnail: https://cdn.jsdelivr.net/gh/mrdemonlxl/blog_image/img/2019/20190919221611.png
tags: 工具教程  
categories: [工具教程,主题工具]   #类别

#以下为文章加密信息
encrypt: true
password: 123456 #此处为文章密码
abstract: 咦，这是一篇加密文章，好像需要输入密码才能查看呢！
message: 嗨，请准确无误地输入密码查看哟！
wrong_pass_message: 不好意思，密码没对哦，在检查检查呢！
wrong_hash_message: 不好意思，信息无法验证！
加密文章不会出现在最新文章列表widget中，也不会出现在文章中推荐列表中，首页列表中需要设置top: -1 让它排在最后比较合理一些

npm install hexo-simple-mindmap #导图
npm uninstall hexo-renderer-marked --save #数学公式
npm install hexo-renderer-kramed --save
npm install --save hexo-filter-flowchart #流程图
npm install --save hexo-filter-mermaid-diagrams

\<!显示-- more -->之后的内容自动隐藏，之前作为摘要放入description中，最好为文章总结

-[ ] 勾选框初始化
