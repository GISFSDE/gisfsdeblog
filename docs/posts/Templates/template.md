---
index: 2
icon: page
title: template
author: GIS-FSDE
date: 2022-06-06
category:
  - template
tag:
  - template
  - template
sticky: false
article: false
footer: 这是测试显示的页脚
description: 内容描述
shortTitle: template
isOriginal: "true"
star: "1"
banner: https://qnimg.gisfsde.com/markdown/heros.jpg
image: https://qnimg.gisfsde.com/markdown/heros.jpg
---

> 博客模板

<!-- more -->

> # 新学四问
>
> **WHY【与前代优化了什么，弥补了什么空白】**:  
> **WHAT【框架，思维导图，主题框架】**:  
> **HOW【如何记忆，学习资源（官方文档、视频资源、项目地址）】**:  
> **LEVEL【不是每个都学精】**:  



# [# 页面的 frontmatter 配置](https://theme-hope.vuejs.press/zh/config/)
## 基本信息
### title

- 类型: `string`
- 必填: 否

当前页面内容标题，默认为 Markdown 文件中的第一个 h1 标签内容。

### shortTitle

- 类型: `string`
- 必填: 否

当前页面的短标题，会在导航栏、侧边栏和路径导航中作为首选。

### description

- 类型: `string`
- 必填: 否

当前页面内容描述。

### icon

- 类型: `string`
- 必填: 否
- 详情:
    - [指南 → 图标支持](https://theme-hope.vuejs.press/zh/guide/interface/icon.html)

当前页面图标的 FontClass 或文件路径 (建议填写)。

### author

- 类型: `Author | boolean`
    
    ```
    type AuthorName = string;
    
    interface AuthorInfo {
      /**
       * 作者姓名
       */
      name: string;
    
      /**
       * 作者网站
       */
      url?: string;
    
      /**
       * 作者 Email
       */
      email?: string;
    }
    
    type Author = AuthorName | AuthorName[] | AuthorInfo | AuthorInfo[];
    ```
    
- 必填: 否
    

作者，如果不填，则会回退到默认作者。

提示

在主题选项中指定默认作者时，可以设置 `false` 以防止显示默认作者。

### isOriginal

- 类型: `boolean`
- 默认值: `false`

当前文章是否为原创。

### date

- 类型: `DateString`
- 必填: 否
- 格式: `YYYY-MM-DD` 或 `YYYY-MM-DD hh:mm:ss`

写作时间。

### category

- 类型: `string | string[]`
- 必填: 否

分类。

### tag

- 类型: `string | string[]`
- 必填: 否

标签。

### sticky

- 类型: `boolean | number`
- 默认值: `false`

是否在列表中置顶。当填入数字时，数字越大，排名越靠前。

### star

- 类型: `boolean | number`
- 默认值: `false`

是否收藏在博客主题的文章列表中。当填入数字时，数字越大，排名越靠前。

### article

- 类型: `boolean`
- 默认值: `true`

是否将该文章添加至文章列表中。

### timeline

- 类型: `boolean`
- 默认值: `true`

是否将该文章添加至时间线中。

### image

- 类型: `string`
- 必填: 否

设置预览图 (分享图)，请填入绝对路径。

### banner

- 类型: `string`
- 必填: 否

设置横幅图片 (宽屏分享图)，请填入绝对路径。

## 布局
### pageInfo

- 类型: `PageInfo[] | false`
- 默认值: 主题选项中的值

`PageInfo` 可选的值和对应内容如下:

| 条目            | 对应内容     | 页面 frontmatter 值         |
| --------------- | ------------ | --------------------------- |
| `"Author"`      | 作者         | `author`                    |
| `"Date"`        | 写作日期     | `date`                      |
| `"Original"`    | 是否原创     | `isOriginal`                |
| `"Category"`    | 分类         | `category`                  |
| `"Tag"`         | 标签         | `tag`                       |
| `"ReadingTime"` | 预计阅读时间 | N/A(自动生成)               |
| `"Word"`        | 字数         | N/A(自动生成)               |
| `"PageView"`    | 访问量       | `pageview` (仅 Waline 可用) |

文章信息展示项目。

### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/layout.html#pageview)pageview

- 类型: `boolean`
- 默认值: 主题选项中的值

是否显示浏览量。

提示

显示浏览量功能需要你拥有有效的 Waline 评论服务配置。

### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/layout.html#breadcrumb)breadcrumb

- 类型: `boolean`
- 默认值: 主题选项中的值

是否开启路径导航。

### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/layout.html#breadcrumbicon)breadcrumbIcon

- 类型: `boolean`
- 默认值: 主题选项中的值

是否开启路径导航图标。

### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/layout.html#navbar)navbar

- 类型: `boolean`

导航栏配置，填入 `false` 会禁用导航栏

### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/layout.html#sidebar)sidebar

- 类型: `"heading" | false`

侧边栏配置选项。支持 `"heading"` 或 `false`。

### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/layout.html#headerdepth)headerDepth

- 类型: `number`
- 默认值: `2`

标题渲染深度。

### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/layout.html#index)index

- 类型: `boolean`
- 默认值: `true`

是否在侧边栏中索引当前页面。

### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/layout.html#order)order

- 类型: `number`

指定当前页面在侧边栏中的排序

- 当填写正数的时候，页面将排在靠前的位置，数字越小出现的位置越前。
- 当填写负数的时候，页面将排在靠后的位置，数字越大出现的位置越前（比如 -1 在 -2 之后）。

### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/layout.html#dir)dir

用于 [结构侧边栏](https://theme-hope.vuejs.press/zh/guide/layout/sidebar.html) 的分组信息。

#### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/layout.html#dir-text)dir.text

- 类型: `string`
- 默认值: `README.md` 的标题

分组标题。

#### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/layout.html#dir-icon)dir.icon

- 类型: `string`
- 默认值: `README.md` 的图标

分组图标。

#### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/layout.html#dir-collapsible)dir.collapsible

- 类型: `boolean`
- 默认值: `true`

分组是否可折叠。

#### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/layout.html#dir-link)dir.link

- 类型: `boolean`
- 默认值: `false`

分组是否可点击

注

设置为 `true` 意味着将分组链接设置为 `README.md` 链接。

#### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/layout.html#dir-index)dir.index

- 类型: `boolean`
- 默认值: `true`

是否索引当前目录

#### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/layout.html#dir-order)dir.order

- 类型: `number`

分组在侧边栏的顺序

- 填写正数，页面会出现在最前，较小的数字会出现在前面。
- 填写负数，页面会出现在最后，较大的数字会出现在前面。 (如 -1 在 -2 之后)

### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/layout.html#comment)comment

- 类型: `boolean`
- 默认值: 主题选项中的值

当前页面是否开启评论功能。

### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/layout.html#lastupdated)lastUpdated

- 类型: `boolean`
- 默认值: 主题选项中的值

是否显示最后更新时间。

### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/layout.html#editlink)editLink

- 类型: `boolean`
- 默认值: 主题选项中的值

是否显示编辑链接。

### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/layout.html#contributors)contributors

- 类型: `boolean`
- 默认值: 主题选项中的值

是否显示贡献者。

### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/layout.html#prev)prev

- 类型: `AutoLinkOptions | string | false`
    
    ```
    interface AutoLinkOptions {
      text: string;
      icon: string;
      link: string;
    }
    ```
    

上一篇文章链接。

### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/layout.html#next)next

- 类型: `AutoLinkOptions | string | false`
    
    ```
    interface AutoLinkOptions {
      text: string;
      icon: string;
      link: string;
    }
    ```
    

下一篇文章链接。

### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/layout.html#footer)footer

- 类型: `boolean | string | HTMLString`

设置页脚内容。

- 设置为 `false` 以禁用页脚
- 设置为 `""` 以移除默认的页脚内容，
- 设置为 `true` 以使用默认页脚。

更多详情请看 [页面 → 页脚支持](https://theme-hope.vuejs.press/zh/guide/layout/footer.html)

### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/layout.html#copyright)copyright

- 类型: `string | false`
- 默认值: 主题选项中的值

设置版权信息，更多详情请看 [页面 → 页脚支持](https://theme-hope.vuejs.press/zh/guide/layout/footer.html)

### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/layout.html#backtotop)backToTop

- 类型: `boolean`
- 默认值: `true`

设置是否显示返回顶部按钮

### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/layout.html#toc-heading)toc

- 类型: `boolean`
- 默认值: 主题选项中的值

设置在桌面模式下是否在右侧显示标题列表。

### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/layout.html#containerclass)containerClass

- 类型: `string`
- 必填: 否

额外的页面容器 Class。

### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/layout.html#layout)layout

- 类型: `string`
- 默认值: `"Layout"`

页面的自定义布局名称。
## 插件
### copyright2 插件

#### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/plugins.html#copy-triggerwords)copy.triggerWords

- 类型: `number`
- 默认值: `100`

触发附加版权的最小字数

#### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/plugins.html#copy-disablecopy)copy.disableCopy

- 类型: `boolean`
- 默认值: `false`

禁用复制

#### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/plugins.html#copy-disableselection)copy.disableSelection

- 类型: `boolean`
- 默认值: `false`

禁用选择

### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/plugins.html#feed2-%E6%8F%92%E4%BB%B6)feed2 插件

#### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/plugins.html#feed-title)feed.title

- 类型: `string`

Feed 项目的标题

#### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/plugins.html#feed-description)feed.description

- 类型: `string`

Feed 项目的描述

#### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/plugins.html#feed-content)feed.content

- 类型: `string`

Feed 项目的内容

#### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/plugins.html#feed-author)feed.author

- 类型: `FeedAuthor[] | FeedAuthor`

Feed 项目的作者

FeedAuthor 格式

#### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/plugins.html#feed-contributor)feed.contributor

- 类型: `FeedContributor[] | FeedContributor`

Feed 项目的贡献者

FeedContributor 格式

#### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/plugins.html#feed-guid)feed.guid

- 类型: `string`

Feed 项目的标识符，用于标识 Feed 项目。

注

你应该确保此项全局唯一。

### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/plugins.html#sitemap2-%E6%8F%92%E4%BB%B6)sitemap2 插件

#### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/plugins.html#sitemap-changefreq)sitemap.changefreq

- 类型: `"always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"`
- 默认值: `"daily"`

页面默认更新频率。它会覆盖插件选项中的 changefreq 选项。

#### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/plugins.html#sitemap-exclude)sitemap.exclude

- 类型: `boolean`
- 默认值: `false`

是否不输出此页面到 Sitemap

#### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/plugins.html#sitemap-priority)sitemap.priority

- 类型: `number`
- 默认值: `0.5`

页面优先级，范围 `0` 至 `1`。
## 主页
### home

- 类型: `boolean`
- 默认值: `false`

设置为 `true` 时启用首页样式

### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/home.html#title)title

- 类型: `string`
- 必填: 否

设置页面标题，会用于路径导航、页面增强等。

### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/home.html#herotext)heroText

- 类型: `string | false`
- 默认值: `"Hello"`

主页标题

### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/home.html#tagline)tagline

- 类型: `string | false`
- 默认值: `"Welcome to your VuePress site"`

附加文字描述

### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/home.html#heroimage)heroImage

- 类型: `string`
- 必填: 否

主页图标 (logo) 链接，不支持相对路径。

### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/home.html#heroimagedark)heroImageDark

- 类型: `string`
- 默认值: `heroImage`

深色模式下主页图标 (logo) 链接，不支持相对路径。

### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/home.html#heroimagestyle)heroImageStyle

- 类型: `Record<string, string> | string`
- 必填: 否

首页图标的 CSS 样式

### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/home.html#heroalt)heroAlt

- 类型: `string`
- 必填: 否

主页图标的替代文字

### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/home.html#bgimage)bgImage

- 类型: `string`
- 必填: 否

背景图片的地址，不支持相对路径。

### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/home.html#bgimagedark)bgImageDark

- 类型: `string`
- 默认值: `bgImage`

深色模式下背景图片的地址，不支持相对路径。

### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/home.html#bgimagestyle)bgImageStyle

- 类型: `Record<string, string> | string`
- 必填: 否

背景图片的 CSS 样式。

### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/home.html#herofullscreen)heroFullScreen

- 类型: `boolean`
- 默认值: `false`

是否全屏显示 Hero

### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/home.html#actions)actions

- 类型: `ThemeHomeActionOptions[]`
    
    ```
    interface ThemeHomeActionOptions {
      /**
       * 操作名称
       */
      text: string;
    
      /**
       * 操作链接
       */
      link: string;
    
      /**
       * 操作类型
       * @default 'default'
       */
      type?: "primary" | "default";
    }
    ```
    
- 必填: 否
    

主页操作

### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/home.html#highlights)highlights

- 类型: `(ThemeProjectHomeFeatureOptions | ThemeProjectHomeHighlightOptions)[]`
    
    ```
    interface ThemeProjectHomeHighlightItem {
      /**
       * Item name, supports HTML string
       */
      title: string;
    
      /**
       * Item description, supports HTML string
       */
      details?: string;
    
      /**
       * Item icon
       *
       * @description image link or icon fontClass are supported
       */
      icon?: string;
    
      /**
       * Item link
       */
      link?: string;
    }
    
    type ThemeProjectHomeFeatureItem = ThemeProjectHomeHighlightItem;
    
    interface ThemeProjectHomeFeatureOptions {
      /**
       * 功能标题
       */
      header?: string;
    
      /**
       * 功能描述，支持 HTML 字符串
       */
      description?: string;
    
      /**
       * 文字颜色
       */
      color?: string;
    
      /**
       * 功能图像
       */
      image?: string;
    
      /**
       * 夜间模式使用的功能图片
       *
       * @default image
       */
      imageDark?: string;
    
      /**
       * 功能背景图
       */
      bgImage?: string;
    
      /**
       * 夜间模式使用的功能背景图
       *
       * @default bgImage
       */
      bgImageDark?: string;
    
      /**
       * 功能背景图样式
       */
      bgImageStyle?: Record<string, string> | string;
    
      /**
       * 功能
       */
      features: ThemeProjectHomeFeatureItem[];
    }
    
    interface ThemeProjectHomeHighlightSection {
      /**
       * 亮点标题，支持 HTML 字符串
       */
      header: string;
    
      /**
       * 亮点描述，支持 HTML 字符串
       */
      description?: string;
    
      /**
       * 文字颜色
       */
      color?: string;
    
      /**
       * 亮点图像
       */
      image?: string;
    
      /**
       * 夜间模式使用的亮点图片
       *
       * @default image
       */
      imageDark?: string;
    
      /**
       * 亮点背景图
       */
      bgImage?: string;
    
      /**
       * 夜间模式使用的亮点背景图
       *
       * @default bgImage
       */
      bgImageDark?: string;
    
      /**
       * 亮点背景图样式
       */
      bgImageStyle?: Record<string, string> | string;
    
      /**
       * 亮点列表类型
       *
       * @default un-order
       */
      type?: "order" | "un-order" | "no-order";
    
      /**
       * 亮点
       */
      highlights?: ThemeProjectHomeHighlightItem[];
    }
    ```
    
- 必填: 否
    

亮点描述。

### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/home.html#features)features

- 类型: `ThemeProjectHomeFeatureItem[]`
    
    ```
    interface ThemeProjectHomeFeatureItem {
      /**
       * 项目名称，支持 HTML 字符串
       */
      title: string;
    
      /**
       * 项目描述，支持 HTML 字符串
       */
      details?: string;
    
      /**
       * 项目图标
       *
       * @description 支持图片链接或者图标字体类
       */
      icon?: string;
    
      /**
       * 项目链接
       */
      link?: string;
    }
    ```
    
- 必填: 否
    

功能描述。
## 博客主页
### home

- 类型: `boolean`
- 默认值: `false`

设置为 `true` 时启用首页样式

### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/blog-home.html#hero)hero

- 类型: `boolean`
- 默认值: `true`

是否显示主页的图标与描述。

### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/blog-home.html#title)title

- 类型: `string`
- 必填: 否

设置页面标题，会用于路径导航、页面增强等。

### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/blog-home.html#herotext)heroText

- 类型: `string | false`
- 默认值: `"Hello"`

主页标题

### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/blog-home.html#tagline)tagline

- 类型: `string | false`
- 默认值: `"Welcome to your VuePress site"`

附加文字描述

### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/blog-home.html#heroimage)heroImage

- 类型: `string`
- 必填: 否

主页图标 (logo) 地址，不支持相对路径。

### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/blog-home.html#heroimagedark)heroImageDark

- 类型: `string`
- 默认值: `heroImage`

深色模式下主页图标 (logo) 地址，不支持相对路径。

### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/blog-home.html#heroimagestyle)heroImageStyle

- 类型: `Record<string, string> | string`
- 必填: 否

首页图标的 CSS 样式

### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/blog-home.html#heroalt)heroAlt

- 类型: `string`
- 必填: 否

主页图标的替代文字

### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/blog-home.html#bgimage)bgImage

- 类型: `string | false`
- 默认值: 一张内置风景图片

背景图片的地址，不支持相对路径。如果不填写，会自动应用一张默认的风景图片。

### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/blog-home.html#bgimagedark)bgImageDark

- 类型: `string`
- 默认值: `bgImage`

深色模式下背景图片的地址，不支持相对路径。

### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/blog-home.html#bgimagestyle)bgImageStyle

- 类型: `Record<string, string> | string`
- 必填: 否

背景图片的 CSS 样式。

### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/blog-home.html#herofullscreen)heroFullScreen

- 类型: `boolean`
- 默认值: `false`

是否全屏显示 Hero

### [#](https://theme-hope.vuejs.press/zh/config/frontmatter/blog-home.html#projects)projects

- 类型: `ThemeBlogHomeProjectOptions[]`
    
    ```
    interface ThemeBlogHomeProjectOptions {
      /**
       * 项目名称
       */
      name: string;
    
      /**
       * 项目描述
       */
      desc?: string;
    
      /**
       * 项目链接
       */
      link: string;
    
      /**
       * 项目图标
       *
       * @description 支持图片链接或者图标字体类，同时也支持 `"link"`、`"project"`、`"book"`、`"article"`、`"friend"`
       */
      icon?: string;
    }
    ```
    
- 必填: 否
    

项目列表
# 进度： 【】

# 快查

# 一、简介

## 知识背景

## 章节总结

## 章节问题

1. 。。。？
2. 



# 二、

# 引用：



