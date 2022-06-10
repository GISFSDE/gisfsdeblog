---
index: 2
icon: markdown
title: Office
date: 2022-06-06
category:
  - Office
tag:
  - Office
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