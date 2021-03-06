---
index: 2
icon: markdown
title: MyBatis
date: 2022-06-06
category:
  - MyBatis
tag:
  - MyBatis
---

> > MyBatis
>
> <!-- more -->
>
> > # 新学四问
> >
> > **WHY【与前代优化了什么，弥补了什么空白】：**  
> > **WHAT【框架，思维导图，主题框架】：**  
> > **HOW【如何记忆，学习资源】**：[Bili](https://www.bilibili.com/video/BV1NE411Q7Nx?spm_id_from=333.999.0.0)、[官方文档](https://mybatis.org/mybatis-3/zh/statement-builders.html)、[源码](https://github.com/mybatis/mybatis-3)  
> > **LEVEL【不是每个都学精】：**速看速记  

# 进度：【17】两天

# 快查

# 常用语句

# 一、简介

# 二、动态SQL

# 三、缓存

什么是缓存？是存在内存中的缓存数据，此数据一般不经常改变，以此提升查询效率。

## 一级缓存

默认开启，在开启连接到关闭连接之间有效，即一次sqlSession中有效。

#### 缓存失效情况

1. 查不同数据
2. 增删改，可能会改变数据的操作
3. 查询不同的mapper.xml

## 二级缓存

```xml
<!--mybatis-config.xml配置文件中 -->
\<setting name="cacheEnabled"             value="true" />  <!-- 全局映射器启用缓存 -->

<!--mapper中开启缓存，可自定义一些参数，没有eviction时需要序列化实体类（implement Serializable） -->
\<cache/> 
```

一级缓存失效时二级缓存失效或提交会话后将数据提交到二级缓存。先读二级缓存再一级缓存。

## 自定义缓存

### ehcache   分布式缓存

可增加保存到磁盘等增强实现。

现在一般用redis。

```xml
\<cache type="自定义缓存的包.自定义缓存"/> 
```

## [${}和#{}区别](https://blog.csdn.net/super_DuoLa/article/details/121971500)



