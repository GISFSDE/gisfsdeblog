# YAML Frontmatter

·---

lang: zh-CN
title: 页面的标题
description: 页面的描述

YAML Frontmatter  markdown文件YAML配置头用两个---包裹

·---


# 安装



```bash
#环境
node：https://nodejs.org/zh-cn/
corepack enable
corepack prepare pnpm@7.1.0 --activate
#安装
（或 npm) pnpm create vuepress-theme-hope@next （或@具体版本)  docs
#升级
pnpm add vuepress@next vuepress-theme-hope@next && pnpm i && pnpm up


pnpm docs:dev
pnpm docs:clean-dev
pnpm docs:build
```

# 配置

.vuepress文件夹

# 项目结构

每个文件夹中以REDME.md为首页即index.html

其他  文件夹/文件名.html

一个基本的项目结构如下:



```text
.
├── .github (可选的) → GitHub 配置文件存放路径
│    └── workflow → GitHub 工作流配置
│         └── docs-deploy.yml → 自动部署文档的工作流
|
├── docs → 由你指定的项目文件夹
│    │
│    ├── .vuepress (可选的) → VuePress 配置文件夹
│    │    │
│    │    ├── dist (默认的) → 构建输出目录
│    │    │
│    │    ├── public (可选的) → 静态资源目录
│    │    │
│    │    ├── styles (可选的) → 用于存放样式相关的文件
│    │    │
│    │    ├── config.{js,ts} (可选的) → 配置文件的入口文件
│    │    │
│    │    └── client.{js,ts} (可选的) → 客户端文件
│    │
│    ├── ... → 其他项目文档
│    │
│    └── README.md → 项目主页
│
└── package.json → Nodejs 配置文件
```

# 命令



# 部署