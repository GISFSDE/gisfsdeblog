---
title: Office
top: 0
toc: true
recommend: 1 
keywords: categories-Office
date: 2021-01-20 22:10:43
thumbnail: http://rcy276gfy.hd-bkt.clouddn.com/webp.png
tags: 工具教程
categories: [工具教程,Office]

#以下为文章加密信息
#encrypt: true
#password: 123456 #此处为文章密码
#abstract: 咦，这是一篇加密文章，好像需要输入密码才能查看呢！
#message: 嗨，请准确无误地输入密码查看哟！
#wrong_pass_message: 不好意思，密码没对哦，在检查检查呢！
#wrong_hash_message: 不好意思，信息无法验证！

---

> Office高级教程记录，边用边记录
>

<!-- more -->

# WORD



# PPT

# EXCEL

相对地址、绝对地址

相对地址在公式中会相变变化，绝对反之，绝对地址在相对地址B1基础上添加$比如$B$1

## 函数篇

替换   =LEFT(C2835,LEN(C2835)-1)&"路-散盘"

提取   =MID（）

结合 =CONCATENATE(A2,B2)

随机 =CHOOSE(RANDBETWEEN(1,2),"出让","划拨")

随机数 =RANDBETWEEN(5,100)

奇偶 =MOD(ROW(),2)

替换，插入 =REPLACE(A1,2,,"09")  

查找 =FIND("K",A2,1)

模糊匹配删除

计算重复数量 Countif（统计范围，统计对象）

=INDEX(Sheet0!A:AA,ROW(),MATCH(INDIRECT((CHAR(COLUMN()+ 64)&1)),Sheet0!A1:AA1,0))复制对应列名单元格