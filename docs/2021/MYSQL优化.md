---
index: 2
icon: markdown
title: MYSQL优化
category:
  - MYSQL优化
tag:
  - MYSQL优化
---



> MySql知识及优化

<!--more-->

相关资源：[优化视频](https://www.bilibili.com/video/BV1KW411u7vy?spm_id_from=333.337.search-card.all.click)、[官方文档](https://dev.mysql.com/doc/refman/5.7/en/)、[基础视频](https://www.bilibili.com/video/BV1iq4y1u7vj?spm_id_from=333.999.0.0)



# MySQL基础

## 为什么要使用数据库

**内存**  
优： 存取速度快；缺： 数据不能永久保存  

**文件**  
优： 数据永久保存；缺：1）速度比内存操作慢，频繁的IO操作 2）查询不方便 

 **数据库** 
 1）数据永久保存 2）使用SQL语句，查询方便效率高。3）管理数据方便

## 什么是SQL？

结构化查询语言(Structured Query Language)，用于存取数据、查询、更新和管理关系数据库系统的数据库查询语言

## 什么是MySQL?

关系型数据库管理系统

## 数据库三大范式是什么

**第一范式**：每个列都不可以再拆分。  
**第二范式**：在第一范式的基础上，非主键列完全依赖于主键，而不能是依赖于主键的一部分。 
**第三范式**：在第二范式的基础上，非主键列只依赖于主键，不依赖于其他非主键。  

在设计数据库结构的时候，要尽量遵守三范式，如果不遵守，必须有足够的理由。比如性能。事实上我们经常会为了性能而妥协数据库的设计。

## mysql有关权限的表都有哪几个

MySQL服务器通过权限表来控制用户对数据库的访问，权限表存放在mysql数据库里，由mysql_install_db脚本初始化。这些权限表分别user，db，table_priv，columns_priv和host。下面分别介绍一下这些表的结构和内容：    

user权限表：记录允许连接到服务器的用户帐号信息，里面的权限是全局级的。  
db权限表：记录各个帐号在各个数据库上的操作权限。 
table_priv权限表：记录数据表级的操作权限。  
columns_priv权限表：记录数据列级的操作权限。  
host权限表：配合db权限表对给定主机上数据库级操作权限作更细致的控制。这个权限表不受GRANT和REVOKE语句的影响。

## MySQL的binlog有有几种录入格式？分别有什么区别？

有三种格式，statement，row和mixed。    

statement模式下，每一条会修改数据的sql都会记录在binlog中。不需要记录每一行的变化，减少了binlog日志量，节约了IO，提高性能。由于sql的执行是有上下文的，因此在保存的时候需要保存相关的信息，同时还有一些使用了函数之类的语句无法被记录复制。 
row级别下，不记录sql语句上下文相关信息，仅保存哪条记录被修改。记录单元为每一行的改动，基本是可以全部记下来但是由于很多操作，会导致大量行的改动(比如alter table)，因此这种模式的文件保存的信息太多，日志量太大。  
mixed，一种折中的方案，普通操作使用statement记录，当无法使用statement的时候使用row。  此外，新版的MySQL中对row级别也做了一些优化，当表结构发生变化的时候，会记录语句而不是逐行记录。

## 执行顺序

![desc](file:///C:/Users/ADMINI~1/AppData/Local/Temp/msohtmlclip1/01/clip_image002.png)

## CREATE（drop，use） DATABASE 数据库名;

CREATE TABLE IF NOT EXISTS `runoob_tbl`(   `runoob_id` INT UNSIGNED AUTO_INCREMENT,   `runoob_title` VARCHAR(100) NOT NULL,   `runoob_author` VARCHAR(40) NOT NULL,   `submission_date` DATE,   PRIMARY KEY ( `runoob_id` )  )ENGINE=InnoDB DEFAULT CHARSET=utf8;

##  增删改查

•   INSERT INTO table_name ( field1, field2,...fieldN ) 
 VALUES ( value1, value2,...valueN )， ( value11, value22,...valueNN );

•   SELECT column_name,column_name
 FROM table_name
 [WHERE condition1 [AND [OR]] condition2
 field1 LIKE condition1 [AND [OR]] filed2 = 'somevalue'][LIMIT N][ OFFSET M]
 查询语句中你可以使用一个或者多个表，表之间使用逗号(,)分割，并使用WHERE语句来设定查询条件。
 SELECT 命令可以读取一条或者多条记录。
 你可以使用星号（*）来代替其他字段，SELECT语句会返回表的所有字段数据
 你可以使用 WHERE 语句来包含任何条件，使用 AND 或者 OR 指定一个或多个条件。
 你可以使用LIKE子句代替等号 =。- 代表单个，% 表示任意 0 个或多个字符。可匹配任意类型和长度的字符，有些情况下若是中文，请使用两个百分号（%%）表示。[]：表示括号内所列字符中的一个（类似正则表达式）。指定一个字符、字符串或范围，要求所匹配对象为它们中的任一个。[^] ：表示不在括号所列之内的单个字符。其取值和 [] 相同，但它要求所匹配对象为指定字符以外的任一个字符。
 查询内容包含通配符时,由于通配符的缘故，导致我们查询特殊字符 “%”、“_”、“[” 的语句无法正常实现，而把特殊字符用 “[ ]” 括起便可正常查询。
 你可以使用 LIMIT 属性来设定返回的记录数。
 你可以通过OFFSET指定SELECT语句开始查询的数据偏移量。默认情况下偏移量为0。

•   SELECT expression1, expression2, ... expression_n
 FROM tables
 [WHERE conditions]
 UNION [ALL | DISTINCT]
 SELECT expression1, expression2, ... expression_n
 FROM tables
 [WHERE conditions];
 UNION 操作符用于连接两个以上的 SELECT 语句的结果组合到一个结果集合中。多个 SELECT 语句会删除重复的数据。
 expression1, expression2, ... expression_n: 要检索的列。
 tables: 要检索的数据表。
 WHERE conditions: 可选， 检索条件。
 DISTINCT: 可选，删除结果集中重复的数据。默认情况下 UNION 操作符已经删除了重复数据，所以 DISTINCT 修饰符对结果没啥影响。
 ALL: 可选，返回所有结果集，包含重复数据。

•   SELECT field1, field2,...fieldN FROM table_name1, table_name2...ORDER BY field1 [ASC [DESC][默认 ASC]], [field2...] [ASC [DESC][默认 ASC]]

•   SELECT column_name, function(column_name)
 FROM table_name
 WHERE column_name operator value
 GROUP BY column_name;

•   根据一个或多个列对结果集进行分组。
 在分组的列上我们可以使用 COUNT, SUM, AVG,等函数。
 WITH ROLLUP 可以实现在分组统计数据基础上再进行相同的统计（SUM,AVG,COUNT…）

•   使用聚合函数后需要group by分组，having只能用于group by 后面

•   INNER JOIN（内连接,或等值连接）【交集】：获取两个表中字段匹配关系的记录。
 LEFT JOIN（左连接）【左交】：获取左表所有记录，即使右表没有对应匹配的记录。
 RIGHT JOIN（右连接）【左交】： 与 LEFT JOIN 相反，用于获取右表所有记录，即使左表没有对应匹配的记录。

•   select p.id,p.name,t.content from person p left join task t on p.id=t.person_id order by p.id

•   UPDATE table_name SET field1=new-value1, field2=new-value2
 [WHERE Clause]
 你可以同时更新一个或多个字段。
 你可以在 WHERE 子句中指定任何条件。
 你可以在一个单独表中同时更新数据。

•   update titles_test set emp_no=replace(emp_no,'10001','10005') where id=5

•   DELETE FROM table_name [WHERE Clause]
 如果没有指定 WHERE 子句，MySQL 表中的所有记录将被删除。
 你可以在 WHERE 子句中指定任何条件
 您可以在单个表中一次性删除记录。

DROP TABLE table_name ;

ALTER TABLE table_name DROP i;                           ADD i INT ;                  删除，添加或修改表字段                           

MODIFY c CHAR(10) ;                            CHANGE i j BIGINT;         修改字段类型及名称                           

ALTER i SET DEFAULT 1000;                             ALTER i DROP DEFAULT;    修改,删除字段的默认值                           

ALTER TABLE testalter_tbl RENAME TO alter_tbl;改表名

·    表中只剩余一个字段则无法使用DROP来删除字段

## SQL语句主要分为哪几类

**数据定义语言 DDL（Data Ddefinition Language）**CREATE，DROP，ALTER  对逻辑结构等有操作的，其中包括表结构，视图和索引。    数据查询语言 DQL（Data Query Language）SELECT  查询操作，以 select 关键字。简单查询，连接查询等 都属于 DQL。    

**数据操纵语言 DML（Data Manipulation Language）**INSERT，UPDATE，DELETE  数据操作，对应上面所说的查询操作 DQL 与 DML 共同构建了多数初级程序员常用的增删改查操作。查询较为特殊划分到 DQL 中。    

**数据控制功能 DCL（Data Control Language）**GRANT，REVOKE，COMMIT，ROLLBACK  对数据库安全性完整性等有操作的，权限控制等

### DQMC

## 超键、候选键、主键、外键分别是什么？

**超键**：在关系中能唯一标识元组的属性集称为关系模式的超键。一个属性可以为作为一个超键，多个属性组合在一起也可以作为一个超键。超键包含候选键和主键。  

**候选键**：是最小超键，即没有冗余元素的超键。 

**主键**：数据库表中对储存数据对象予以唯一和完整标识的数据列或属性的组合。一个数据列只能有一个主键，且主键的取值不能缺失，即不能为空值（Null）。  外键：在一个表中存在的另一个表的主键称此表的外键。

## SQL 约束有哪几种？

NOT NULL: 用于控制字段的内容一定不能为空（NULL）。  

UNIQUE: 控件字段内容不能重复，一个表允许有多个 Unique 约束。  

PRIMARY KEY: 也是用于控件字段内容不能重复，但它在一个表只允许出现一个。  

FOREIGN KEY: 用于预防破坏表之间连接的动作，也能防止非法数据插入外键列，因为它必须是它指向的那个表中的值之一。  

CHECK: 用于控制字段的值范围。

## 六种关联查询

交叉连接（CROSS JOIN）  内连接（INNER JOIN）  外连接（LEFT JOIN/RIGHT JOIN）  联合查询（UNION 与 UNION ALL）  全连接（FULL JOIN）

### ·    交叉连接（CROSS JOIN）

 SELECT * FROM A,B(,C) 或者 SELECT * FROM A CROSS JOIN B (CROSS JOIN C) #没有任何关联条件，结果是笛卡尔积，结果集会很大，没有意义，很少使用内连接（INNER JOIN）SELECT * FROM A,B WHERE A.id=B.id或者SELECT * FROM A INNER JOIN B ON A.id=B.id多表中同时符合某种条件的数据记录的集合，INNER JOIN可以缩写为JOIN

·    内连接分为三类

 等值连接：ON A.id=B.id
 不等值连接：ON A.id > B.id
 自连接：SELECT * FROM A T1 INNER JOIN A T2 ON T1.id=T2.pid

### ·    外连接（LEFT JOIN/RIGHT JOIN）

 左外连接：LEFT OUTER JOIN, 以左表为主，先查询出左表，按照 ON 后的关联条件匹配右表，没有匹配到的用 NULL 填充，可以简写成 LEFT JOIN
 右外连接：RIGHT OUTER JOIN, 以右表为主，先查询出右表，按照 ON 后的关联条件匹配左表，没有匹配到的用 NULL 填充，可以简写成 RIGHT JOIN

### ·    联合查询（UNION 与 UNION ALL）

 SELECT * FROM A UNION SELECT * FROM B UNION ...
 就是把多个结果集集中在一起，UNION 前的结果为基准，需要注意的是联合查询的列数要相等，相同的记录行会合并
 如果使用 UNION ALL，不会合并重复的记录行
 效率 UNION 高于 UNION ALL

### ·    全连接（FULL JOIN）

 MySQL 不支持全连接
 可以使用 LEFT JOIN 和 UNION 和 RIGHT JOIN 联合使用
 SELECT * FROM A LEFT JOIN B ON A.id=B.id UNIONSELECT * FROM A RIGHT JOIN B ON A.id=B.id

## 什么是子查询

### 条件：一条 SQL 语句的查询结果做为另一条查询语句的条件或查询结果    嵌套：多条 SQL 语句嵌套使用，内部的 SQL 查询语句称为子查询。

## 子查询的三种情况

子查询是单行单列的情况：结果集是一个值，父查询使用：=、 <、> 等运算符  -- 查询工资最高的员工是谁？   select * from employee where salary=(select max(salary) from employee);  子查询是多行单列的情况：结果集类似于一个数组，父查询使用：in 运算符  -- 查询工资最高的员工是谁？   select * from employee where salary=(select max(salary) from employee);  子查询是多行多列的情况：结果集类似于一张虚拟表，不能用于 where 条件，用于 select 子句中做为子表  -- 1) 查询出2011年以后入职的员工信息  -- 2) 查询所有的部门信息，与上面的虚拟表中的信息比对，找出所有部门ID相等的员工。  select * from dept d, (select * from employee where join_date > '2011-1-1') e where e.dept_id = d.id;      -- 使用表连接：  select d.*, e.* from dept d inner join employee e on d.id = e.dept_id where e.join_date > '2011-1-1'

## mysql中 in 和 exists 区别

mysql 中的 in 语句是把外表和内表作 hash 连接，而 exists 语句是对外表作 loop 循环，每次 loop 循环再对内表进行查询。一直大家都认为 exists 比 in 语句的效率要高，这种说法其实是不准确的。这个是要区分环境的。    如果查询的两个表大小相当，那么用 in 和 exists 差别不大。  如果两个表中一个较小，一个是大表，则子查询表大的用 exists，子查询表小的用 in。  not in 和 not exists：如果查询语句使用了 not in，那么内外表都进行全表扫描，没有用到索引；而 not extsts 的子查询依然能用到表上的索引。所以无论那个表大，用 not exists 都比 not in 要快。

## varchar与char的区别

char 的特点    char 表示定长字符串，长度是固定的；    如果插入数据的长度小于 char 的固定长度时，则用空格填充；    因为长度固定，所以存取速度要比 varchar 快很多，甚至能快 50%，但正因为其长度固定，所以会占据多余的空间，是空间换时间的做法；    对于 char 来说，最多能存放的字符个数为 255，和编码无关    varchar 的特点    varchar 表示可变长字符串，长度是可变的；    插入的数据是多长，就按照多长来存储；    varchar 在存取方面与 char 相反，它存取慢，因为长度不固定，但正因如此，不占据多余的空间，是时间换空间的做法；    对于 varchar 来说，最多能存放的字符个数为 65532    总之，结合性能角度（char 更快）和节省磁盘空间角度（varchar 更小），具体情况还需具体来设计数据库才是妥当的做法。

## varchar(50)中50的涵义

最多存放 50 个字符，varchar(50)和 (200) 存储 hello 所占空间一样，但后者在排序时会消耗更多内存，因为 order by col 采用 fixed_length 计算 col 长度(memory 引擎也一样)。在早期 MySQL 版本中， 50 代表字节数，现在代表字符数。

## int(20)中20的涵义

是指显示字符的长度。20 表示最大显示宽度为 20，但仍占 4 字节存储，存储范围不变；    不影响内部存储，只是影响带 zerofill 定义的 int 时，前面补多少个 0，易于报表展示

## mysql为什么这么设计

对大多数应用没有意义，只是规定一些工具用来显示字符的个数；int(1) 和 int(20) 存储和计算均一样；

## mysql中int(10)和char(10)以及varchar(10)的区别

int(10) 的 10 表示显示的数据的长度，不是存储数据的大小；chart(10) 和 varchar(10) 的 10 表示存储数据的大小，即表示存储多少个字符。    int(10) 10 位的数据长度 9999999999，占 32 个字节，int 型 4 位  char(10) 10 位固定字符串，不足补空格 最多 10 个字符  varchar(10) 10 位可变字符串，不足补空格 最多 10 个字符    char(10) 表示存储定长的 10 个字符，不足 10 个就用空格补齐，占用更多的存储空间    varchar(10) 表示存储 10 个变长的字符，存储多少个就是多少个，空格也按一个字符存储，这一点是和 char(10) 的空格不同的，char(10) 的空格表示占位不算一个字符

## FLOAT和DOUBLE的区别是什么？

 FLOAT 类型数据可以存储至多 8 位十进制数，并在内存中占 4 字节。  DOUBLE 类型数据可以存储至多 18 位十进制数，并在内存中占 8 字节。

## drop、delete与truncate的区别

​            Delete   Truncate  Drop  类型       属于 DML   属于 DDL    属于 DDL  回滚       可回滚 不可回滚   不可回滚  删除内容      表结构还在，删除表的全部或者一部分数据行 表结构还在，删除表中的所有数据    从数据库中删除表，所有的数据行，索引和权限也会被删除  删除速度      删除速度慢，需要逐行删除   删除速度快 删除速度最快  因此，在不再需要一张表的时候，用 drop；在想删除部分数据行时候，用 delete；在保留表而删除所有数据的时候用 truncate。

## UNION与UNION ALL的区别？

如果使用 UNION ALL，不会合并重复的记录行  效率 UNION 高于 UNION ALL

# 数据类型

> **1bit 位  1字节=8bit  1k=1024字节 1兆=1024k  1G=1023M  1T=1024G**



![image-20210706135508764](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210706135508764.png)

# 引擎

## MySQL存储引擎MyISAM与InnoDB区别

存储引擎 Storage engine：MySQL 中的数据、索引以及其他对象是如何存储的，是一套文件系统的实现。

## MyISAM索引与InnoDB索引的区别？

Innodb 引擎：Innodb 引擎提供了对数据库 ACID 事务的支持。并且还提供了行级锁和外键的约束。它的设计的目标就是处理大数据容量的数据库系统。  MyIASM 引擎 (原本 Mysql 的默认引擎)：不提供事务的支持，也不支持行级锁和外键。  MEMORY 引擎：所有的数据都在内存中，数据的处理速度快，但是安全性不高。

 InnoDB 索引是聚簇索引，MyISAM 索引是非聚簇索引。  InnoDB 的主键索引的叶子节点存储着行数据，因此主键索引非常高效。  MyISAM 索引的叶子节点存储的是行数据地址，需要再寻址一次才能得到数据。  InnoDB 非主键索引的叶子节点存储的是主键和其他带索引的列数据，因此查询时做到覆盖索引会非常高效。

## InnoDB引擎的4大特性

插入缓冲（insert buffer)    二次写 (double write)    自适应哈希索引 (ahi)    预读 (read ahead)

## 存储引擎选择

如果没有特别的需求，使用默认的Innodb即可。    MyISAM：以读写插入为主的应用程序，比如博客系统、新闻门户网站。    Innodb：更新（删除）操作频率也高，或者要保证数据的完整性；并发量高，支持事务和外键。比如 OA 自动化办公系统。

# 索引

## 什么是索引？

索引是一种特殊的文件 (InnoDB 数据表上的索引是表空间的一个组成部分)，它们包含着对数据表里所有记录的引用指针。    索引是一种数据结构。数据库索引，是数据库管理系统中一个排序的数据结构，以协助快速查询、更新数据库表中数据。索引的实现通常使用 B 树及其变种 B + 树。    更通俗的说，索引就相当于目录。为了方便查找书中的内容，通过对内容建立索引形成目录。索引是一个文件，它是要占据物理空间的。

## 索引有哪些优缺点？

**优**  可以大大加快数据的检索速度，这也是创建索引的最主要的原因。  通过使用索引，可以在查询的过程中，使用优化隐藏器，提高系统的性能。  

**缺**  时间方面：创建索引和维护索引要耗费时间，具体地，当对表中的数据进行增加、删除和修改的时候，索引也要动态的维护，会降低增 / 改 / 删的执行效率；  空间方面：索引需要占物理空间

## 索引使用场景（重点）

### where

可以尝试在一个字段未建立索引时，根据该字段查询的效率，然后对该字段建立索引（alter table 表名 add index(字段名)），同样的 SQL 执行的效率，你会发现查询效率会有明显的提升（数据量越大越明显）。

### order by

使用order by将查询结果按照某个字段排序时，如果该字段没有建立索引，那么执行计划会将查询出的所有数据使用外部排序（将数据从硬盘分批读取到内存使用内部排序，最后合并排序结果），这操作很影响性能的，因为需要将查询涉及到的所有数据从磁盘中读到内存（如果单条数据过大或者数据量过多都会降低效率），更无论读到内存之后的排序了。
 但是如果我们对该字段建立索引alter table 表名 add index(字段名)，那么由于索引本身是有序的，因此直接按照索引的顺序和映射关系逐条取出数据即可。而且如果分页的，那么只用取出索引表某个范围内的索引对应的数据，而不用像上述那取出所有数据进行排序再返回某个范围内的数据。（从磁盘取数据是最影响性能的）

### join

对join语句匹配关系（on）涉及的字段建立索引能够提高效率

### 索引覆盖

如果要查询的字段都建立过索引，那么引擎会直接在索引表中查询而不会访问原始数据（否则只要有一个字段没有建立索引就会做全表扫描），这叫索引覆盖。因此我们需要尽可能的在select后只写必要的查询字段，以增加索引覆盖的几率。
 这里值得注意的是不要想着为每个字段建立索引，因为优先使用索引的优势就在于其体积小。

## 索引有哪几种类型？

### 1）从存储结构上来划分

·    Btree 索引（B+tree，B-tree)

·    哈希索引

·    full-index 全文索引

·    RTree

### 2）从应用层次上来划分

·    **普通索引:** 基本的索引类型，没有唯一性的限制，允许为 NULL 值。
 CREATE INDEX indexName ON table_name (column_name)或
 ALTER TABLE table_name ADD INDEX index_name (column);创建普通索引
 ALTER TABLE table_name ADD INDEX index_name(column1, column2, column3);创建组合索引

•   ALTER TABLE testalter_tbl ADD/DROP INDEX (c);

·    **唯一索引:** 数据列不允许重复，允许为 NULL 值，一个表允许多个列创建唯一索引。
 可以通过 ALTER TABLE table_name ADD UNIQUE (column); 创建唯一索引
 可以通过 ALTER TABLE table_name ADD UNIQUE (column1,column2); 创建唯一组合索引

·    **主键索引:** 数据列不允许重复，不允许为 NULL，一个表只能有一个主键。
 ALTER TABLE `table_name` ADD PRIMARY KEY ( `column` )

### 3）从表记录的排列顺序和索引的排列顺序是否一致来划分

·    **聚集索引：**表记录的排列顺序和索引的排列顺序一致。

•   就是以主键创建的索引。

·    **非聚集索引：**表记录的排列顺序和索引的排列顺序不一致。

•   以非主键创建的索引（也叫做二级索引）。

## 索引的数据结构（b树，hash）

我们经常使用的 InnoDB 存储引擎的默认索引实现为：B + 树索引。对于哈希索引来说，底层的数据结构就是哈希表，因此在绝大多数需求为单条记录查询的时候，可以选择哈希索引，查询性能最快；其余大部分场景，建议选择 BTree 索引。

### B 树索引

![image-20210706135612918](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210706135612918.png)

·    mysql 通过存储引擎取数据，基本上 90% 的人用的就是 InnoDB 了，按照实现方式分，InnoDB 的索引类型目前只有两种：BTREE（B 树）索引和 HASH 索引。B 树索引是 Mysql 数据库中使用最频繁的索引类型，基本所有存储引擎都支持 BTree 索引。通常我们说的索引不出意外指的就是（B 树）索引（实际是用 B + 树实现的，因为在查看表索引时，mysql 一律打印 BTREE，所以简称为 B 树索引）

•   查询方式：

 主键索引区: PI(关联保存的时数据的地址) 按主键查询,

 普通索引区: si(关联的 id 的地址, 然后再到达上面的地址)。所以按主键查询, 速度最快

 B+tree 性质：

 1.）n 棵子 tree 的节点包含 n 个关键字，不用来保存数据而是保存数据的索引。

 2.）所有的叶子结点中包含了全部关键字的信息，及指向含这些关键字记录的指针，且叶子结点本身依关键字的大小自小而大顺序链接。

 3.）所有的非终端结点可以看成是索引部分，结点中仅含其子树中的最大（或最小）关键字。

 4.）B+ 树中，数据对象的插入和删除仅在叶节点上进行。

 5.）B + 树有 2 个头指针，一个是树的根节点，一个是最小关键码的叶节点。

### 哈希索引

![desc](file:///C:/Users/ADMINI~1/AppData/Local/Temp/msohtmlclip1/01/clip_image008.png)

简要说下，类似于数据结构中简单实现的 HASH 表（散列表）一样，当我们在 mysql 中用哈希索引时，主要就是通过 Hash 算法（常见的 Hash 算法有直接定址法、平方取中法、折叠法、除数取余法、随机数法），将数据库字段数据转换成定长的 Hash 值，与这条数据的行指针一并存入 Hash 表的对应位置；如果发生 Hash 碰撞（两个不同关键字的 Hash 值相同），则在对应 Hash 键下以链表形式存储。当然这只是简略模拟图。

## 索引的基本原理

索引用来快速地寻找那些具有特定值的记录。如果没有索引，一般来说执行查询时遍历整张表。    索引的原理很简单，就是把无序的数据变成有序的查询    把创建了索引的列的内容进行排序    对排序结果生成倒排表    在倒排表内容上拼上数据地址链    在查询的时候，先拿到倒排表内容，再取出数据地址链，从而拿到具体数据

## 索引算法有哪些？

BTree 算法  BTree 是最常用的 mysql 数据库索引算法，也是 mysql 默认的算法。因为它不仅可以被用在 =,>,>=,<,<= 和 between 这些比较操作符上，而且还可以用于 like 操作符，只要它的查询条件是一个不以通配符开头的常量， 例如：  -- 只要它的查询条件是一个不以通配符开头的常量  select * from user where name like 'jack%';   -- 如果一通配符开头，或者没有使用常量，则不会使用索引，例如：   select * from user where name like '%jack';    Hash 算法  Hash Hash 索引只能用于对等比较，例如 =,<=>（相当于 =）操作符。由于是一次定位数据，不像 BTree 索引需要从根节点到枝节点，最后才能访问到页节点这样多次 IO 访问，所以检索效率远高于 BTree 索引。

## 索引设计的原则？

适合索引的列是出现在 where 子句中的列，或者连接子句中指定的列  基数较小的类，索引效果较差，没有必要在此列建立索引  使用短索引，如果对长字符串列进行索引，应该指定一个前缀长度，这样能够节省大量索引空间  不要过度索引。索引需要额外的磁盘空间，并降低写操作的性能。在修改表内容的时候，索引会进行更新甚至重构，索引列越多，这个时间就会越长。所以只保持需要的索引有利于查询即可。

## 创建索引的原则（重中之重）

索引虽好，但也不是无限制的使用，最好符合一下几个原则    

1） 最左前缀匹配原则，组合索引非常重要的原则，mysql 会一直向右匹配直到遇到范围查询 (>、<、between、like) 就停止匹配，比如 a = 1 and b = 2 and c > 3 and d = 4 如果建立 (a,b,c,d) 顺序的索引，d 是用不到索引的，如果建立 (a,b,d,c) 的索引则都可以用到，a,b,d 的顺序可以任意调整。   
2）较频繁作为查询条件的字段才去创建索引    
3）更新频繁字段不适合创建索引    
4）若是不能有效区分数据的列不适合做索引列 (如性别，男女未知，最多也就三种，区分度实在太低)    
5）尽量的扩展索引，不要新建索引。比如表中已经有 a 的索引，现在要加 (a,b) 的索引，那么只需要修改原来的索引即可。    
6）定义有外键的数据列一定要建立索引。    
7）对于那些查询中很少涉及的列，重复值比较多的列不要建立索引。    8）对于定义为 text、image 和 bit 的数据类型的列不要建立索引。

## 创建索引的三种方式，删除索引

第一种方式：在执行 CREATE TABLE 时创建索引    CREATE TABLE user_index2 (  id INT auto_increment PRIMARY KEY,  first_name VARCHAR (16),  last_name VARCHAR (16),  id_card VARCHAR (18),  information text,  KEY name (first_name, last_name),  FULLTEXT KEY (information),  UNIQUE KEY (id_card)  );

第二种方式：使用 ALTER TABLE 命令去增加索引    ALTER TABLE table_name ADD INDEX index_name (column_list);  ALTER TABLE 用来创建普通索引、UNIQUE 索引或 PRIMARY KEY 索引。    其中 table_name 是要增加索引的表名，column_list 指出对哪些列进行索引，多列时各列之间用逗号分隔。    索引名 index_name 可自己命名，缺省时，MySQL 将根据第一个索引列赋一个名称。另外，ALTER TABLE 允许在单个语句中更改多个表，因此可以在同时创建多个索引。

第三种方式：使用 CREATE INDEX 命令创建    CREATE INDEX index_name ON table_name (column_list);  CREATE INDEX 可对表增加普通索引或 UNIQUE 索引。（但是，不能创建 PRIMARY KEY 索引）

删除索引    根据索引名删除普通索引、唯一索引、全文索引：alter table 表名 drop KEY 索引名    alter table user_index drop KEY name;  alter table user_index drop KEY id_card;  alter table user_index drop KEY information;  删除主键索引：alter table 表名 drop primary key（因为主键只有一个）。这里值得注意的是，如果主键自增长，那么不能直接执行此操作（自增长依赖于主键索引）：    需要取消自增长再行删除：    alter table user_index  -- 重新定义字段  MODIFY id int,  drop PRIMARY KEY  但通常不会删除主键，因为设计主键一定与业务逻辑无关。

![desc](file:///C:/Users/ADMINI~1/AppData/Local/Temp/msohtmlclip1/01/clip_image010.png)

## 创建索引时需要注意什么？

非空字段：应该指定列为 NOT NULL，除非你想存储 NULL。在 mysql 中，含有空值的列很难进行查询优化，因为它们使得索引、索引的统计信息以及比较运算更加复杂。你应该用 0、一个特殊的值或者一个空串代替空值；  取值离散大的字段：（变量各个取值之间的差异程度）的列放到联合索引的前面，可以通过 count() 函数查看字段的差异值，返回值越大说明字段的唯一值越多字段的离散程度高；  索引字段越小越好：数据库的数据存储以页为单位一页存储的数据越多一次 IO 操作获取的数据越大效率越高。

## 使用索引查询一定能提高查询的性能吗？为什么

通常，通过索引查询数据比全表扫描要快。但是我们也必须注意到它的代价。    索引需要空间来存储，也需要定期维护， 每当有记录在表中增减或索引列被修改时，索引本身也会被修改。 这意味着每条记录的 INSERT，DELETE，UPDATE 将为此多付出 4，5 次的磁盘 I/O。 因为索引需要额外的存储空间和处理，那些不必要的索引反而会使查询反应时间变慢。使用索引查询不一定能提高查询性能，索引范围查询 (INDEX RANGE SCAN) 适用于两种情况:  基于一个范围的检索，一般查询返回结果集小于表中记录数的 30%  基于非唯一性索引的检索

## [索引失效的几种情况](https://www.cnblogs.com/liehen2046/p/11052666.html)

### 什么时候没用

or，%，算，函数，转换，复合索引

1.有or必全有索引;
2.复合索引未用左列字段;
3.like以%开头;
4.需要类型转换;
5.where中索引列有运算;
6.where中索引列使用了函数;
7.如果mysql觉得全表扫描更快时（数据少）;

### 什么时没必要用

1.唯一性差;
2.频繁更新的字段不用（更新索引消耗）;
3.where中不用的字段;
4.索引使用<>时，效果一般;

## 详述（转）

索引并不是时时都会生效的，比如以下几种情况，将导致索引失效：

- 如果条件中有or，即使其中有部分条件带索引也不会使用(这也是为什么尽量少用or的原因)，例子中user_id无索引

注意：要想使用or，又想让索引生效，只能将or条件中的每个列都加上索引

![img](http://rcy276gfy.hd-bkt.clouddn.com/1623038-20190619181118118-1784753048.png)

- 对于复合索引，如果不使用前列，后续列也将无法使用，类电话簿。
- like查询是以%开头

![img](http://rcy276gfy.hd-bkt.clouddn.com/1623038-20190619181236139-968114236.png)

- 存在索引列的数据类型隐形转换，则用不上索引，比如列类型是字符串，那一定要在条件中将数据使用引号引用起来,否则不使用索引

![img](http://rcy276gfy.hd-bkt.clouddn.com/1623038-20190619181326223-1654473887.png)

- where 子句里对索引列上有数学运算，用不上索引

![img](http://rcy276gfy.hd-bkt.clouddn.com/1623038-20190619181436583-1773123023.png)

- where 子句里对有索引列使用函数，用不上索引

![img](http://rcy276gfy.hd-bkt.clouddn.com/1623038-20190619181457265-1885631328.png)

- 如果mysql估计使用全表扫描要比使用索引快,则不使用索引

> 比如数据量极少的表

## 什么情况下不推荐使用索引？

\1) 数据唯一性差（一个字段的取值只有几种时）的字段不要使用索引

> 比如性别，只有两种可能数据。意味着索引的二叉树级别少，多是平级。这样的二叉树查找无异于全表扫描。

\2) 频繁更新的字段不要使用索引

> 比如logincount登录次数，频繁变化导致索引也频繁变化，增大数据库工作量，降低效率。

\3) 字段不在where语句出现时不要添加索引,如果where后含IS NULL /IS NOT NULL/ like ‘%输入符%’等条件，不建议使用索引

> 只有在where语句出现，mysql才会去使用索引

4） where 子句里对索引列使用不等于（<>），使用索引效果一般



## 百万级别或以上的数据如何删除

关于索引：由于索引需要额外的维护成本，因为索引文件是单独存在的文件, 所以当我们对数据的增加, 修改, 删除, 都会产生额外的对索引文件的操作, 这些操作需要消耗额外的 IO, 会降低增 / 改 / 删的执行效率。所以，在我们删除数据库百万级别数据的时候，查询 MySQL 官方手册得知删除数据的速度和创建的索引数量是成正比的。    所以我们想要删除百万数据的时候可以先删除索引（此时大概耗时三分多钟）  然后删除其中无用数据（此过程需要不到两分钟）  删除完成后重新创建索引 (此时数据较少了) 创建索引也非常快，约十分钟左右。  与之前的直接删除绝对是要快速很多，更别说万一删除中断, 一切删除会回滚。那更是坑了。

## 前缀索引

语法：index(field(10))，使用字段值的前 10 个字符建立索引，默认是使用字段的全部内容建立索引。    前提：前缀的标识度高。比如密码就适合建立前缀索引，因为密码几乎各不相同。    实操的难度：在于前缀截取的长度。    我们可以利用select count(*)/count(distinct left(password,prefixLen));，通过从调整prefixLen的值（从 1 自增）查看不同前缀长度的一个平均匹配度，接近 1 时就可以了（表示一个密码的前prefixLen个字符几乎能确定唯一一条记录）

## 什么是最左前缀原则？什么是最左匹配原则

顾名思义，就是最左优先，在创建多列索引时，要根据业务需求，where 子句中使用最频繁的一列放在最左边。  最左前缀匹配原则，非常重要的原则，mysql 会一直向右匹配直到遇到范围查询 (>、<、between、like) 就停止匹配，比如 a = 1 and b = 2 and c > 3 and d = 4 如果建立 (a,b,c,d) 顺序的索引，d 是用不到索引的，如果建立 (a,b,d,c) 的索引则都可以用到，a,b,d 的顺序可以任意调整。  = 和 in 可以乱序，比如 a = 1 and b = 2 and c = 3 建立 (a,b,c) 索引可以任意顺序，mysql 的查询优化器会帮你优化成索引可以识别的形式

## B树和B+树的区别

在 B 树中，你可以将键和值存放在内部节点和叶子节点；但在 B + 树中，内部节点都是键，没有值，叶子节点同时存放键和值。    B + 树的叶子节点有一条链相连，而 B 树的叶子节点各自独立。

·     

![desc](file:///C:/Users/ADMINI~1/AppData/Local/Temp/msohtmlclip1/01/clip_image012.png)

## 使用B树的好处

B 树可以在内部节点同时存储键和值，因此，把频繁访问的数据放在靠近根节点的地方将会大大提高热点数据的查询效率。这种特性使得 B 树在特定数据重复多次查询的场景中更加高效。

## 使用B+树的好处

由于 B + 树的内部节点只存放键，不存放值，因此，一次读取，可以在内存页中获取更多的键，有利于更快地缩小查找范围。 B + 树的叶节点由一条链相连，因此，当需要进行一次全数据遍历的时候，B + 树只需要使用 O(logN) 时间找到最小的一个节点，然后通过链进行 O(N) 的顺序遍历即可。而 B 树则需要对树的每一层进行遍历，这会需要更多的内存置换次数，因此也就需要花费更多的时间

## Hash索引和B+树所有有什么区别或者说优劣呢?

首先要知道 Hash 索引和 B + 树索引的底层实现原理：    hash 索引底层就是 hash 表，进行查找时，调用一次 hash 函数就可以获取到相应的键值，之后进行回表查询获得实际数据。B + 树底层实现是多路平衡查找树。对于每一次的查询都是从根节点出发，查找到叶子节点方可以获得所查键值，然后根据查询判断是否需要回表查询数据。    那么可以看出他们有以下的不同：    hash 索引进行等值查询更快 (一般情况下)，但是却无法进行范围查询。  因为在 hash 索引中经过 hash 函数建立索引之后，索引的顺序与原顺序无法保持一致，不能支持范围查询。而 B + 树的的所有节点皆遵循 (左节点小于父节点，右节点大于父节点，多叉树也类似)，天然支持范围。    hash 索引不支持使用索引进行排序，原理同上。  hash 索引不支持模糊查询以及多列索引的最左前缀匹配。原理也是因为 hash 函数的不可预测。AAAA 和 AAAAB 的索引没有相关性。  hash 索引任何时候都避免不了回表查询数据，而 B + 树在符合某些条件 (聚簇索引，覆盖索引等) 的时候可以只通过索引完成查询。  hash 索引虽然在等值查询上较快，但是不稳定。性能不可预测，当某个键值存在大量重复的时候，发生 hash 碰撞，此时效率可能极差。而 B + 树的查询效率比较稳定，对于所有的查询都是从根节点到叶子节点，且树的高度较低。  因此，在大多数情况下，直接选择 B + 树索引可以获得稳定且较好的查询速度。而不需要使用 hash 索引。

## 数据库为什么使用B+树而不是B树

B 树只适合随机检索，而 B + 树同时支持随机检索和顺序检索；  

B + 树空间利用率更高，可减少 I/O 次数，磁盘读写代价更低。一般来说，索引本身也很大，不可能全部存储在内存中，因此索引往往以索引文件的形式存储的磁盘上。这样的话，索引查找过程中就要产生磁盘 I/O 消耗。B + 树的内部结点并没有指向关键字具体信息的指针，只是作为索引使用，其内部结点比 B 树小，盘块能容纳的结点中关键字数量更多，一次性读入内存中可以查找的关键字也就越多，相对的，IO 读写次数也就降低了。而 IO 读写次数是影响索引检索效率的最大因素；  

B + 树的查询效率更加稳定。B 树搜索有可能会在非叶子结点结束，越靠近根节点的记录查找时间越短，只要找到关键字即可确定记录的存在，其性能等价于在关键字全集内做一次二分查找。而在 B + 树中，顺序检索比较明显，随机检索时，任何关键字的查找都必须走一条从根节点到叶节点的路，所有关键字的查找路径长度相同，导致每一个关键字的查询效率相当。  B - 树在提高了磁盘 IO 性能的同时并没有解决元素遍历的效率低下的问题。B + 树的叶子节点使用指针顺序连接在一起，只要遍历叶子节点就可以实现整棵树的遍历。而且在数据库中基于范围的查询是非常频繁的，而 B 树不支持这样的操作。  增删文件（节点）时，效率更高。因为 B + 树的叶子节点包含所有关键字，并以有序的链表结构存储，这样可很好提高增删效率。

## B+树在满足聚簇索引和覆盖索引的时候不需要回表查询数据，

在 B + 树的索引中，叶子节点可能存储了当前的 key 值，也可能存储了当前的 key 值以及整行的数据，这就是聚簇索引和非聚簇索引。 在 InnoDB 中，只有主键索引是聚簇索引，如果没有主键，则挑选一个唯一键建立聚簇索引。如果没有唯一键，则隐式的生成一个键来建立聚簇索引。    当查询使用聚簇索引时，在对应的叶子节点，可以获取到整行数据，因此不用再次进行回表查询。

## 什么是聚簇索引？何时使用聚簇索引与非聚簇索引

聚簇索引：将数据存储与索引放到了一块，找到索引也就找到了数据  

非聚簇索引：将数据存储于索引分开结构，索引结构的叶子节点指向了数据的对应行，myisam 通过 key_buffer 把索引先缓存到内存中，当需要访问数据时（通过索引访问数据），在内存中直接搜索索引，然后通过索引找到磁盘相应数据，这也就是为什么索引不在 key buffer 命中时，速度慢的原因  澄清一个概念：innodb 中，在聚簇索引之上创建的索引称之为辅助索引，辅助索引访问数据总是需要二次查找，非聚簇索引都是辅助索引，像复合索引、前缀索引、唯一索引，辅助索引叶子节点存储的不再是行的物理位置，而是主键值    何时使用聚簇索引与非聚簇索引

·     

![desc](file:///C:/Users/ADMINI~1/AppData/Local/Temp/msohtmlclip1/01/clip_image014.png)

## 非聚簇索引一定会回表查询吗？

不一定，这涉及到查询语句所要求的字段是否全部命中了索引，如果全部命中了索引，那么就不必再进行回表查询。    举个简单的例子，假设我们在员工表的年龄上建立了索引，那么当进行select age from employee where age < 20的查询时，在索引的叶子节点上，已经包含了 age 信息，不会再次进行回表查询。

## 联合索引是什么？为什么需要注意联合索引中的顺序？

MySQL 可以使用多个字段同时建立一个索引，叫做联合索引。在联合索引中，如果想要命中索引，需要按照建立索引时的字段顺序挨个使用，否则无法命中索引。    具体原因为:    MySQL 使用索引时需要索引有序，假设现在建立了 "name，age，school" 的联合索引，那么索引的排序为: 先按照 name 排序，如果 name 相同，则按照 age 排序，如果 age 的值也相等，则按照 school 进行排序。    当进行查询时，此时索引仅仅按照 name 严格有序，因此必须首先使用 name 字段进行等值查询，之后对于匹配到的列而言，其按照 age 字段严格有序，此时可以使用 age 字段用做索引查找，以此类推。因此在建立联合索引的时候应该注意索引列的顺序，一般情况下，将查询需求频繁或者字段选择性高的列放在前面。此外可以根据特例的查询或者表结构进行单独的调整。

# 事务

## 什么是数据库事务？

1、用 BEGIN, ROLLBACK, COMMIT来实现    BEGIN 开始一个事务  ROLLBACK 事务回滚  COMMIT 事务确认  

2、直接用 SET 来改变 MySQL 的自动提交模式:    SET AUTOCOMMIT=0 禁止自动提交  SET AUTOCOMMIT=1 开启自动提交

在 MySQL 中只有使用了 Innodb 数据库引擎的数据库或表才支持事务。  事务处理可以用来维护数据库的完整性，保证成批的 SQL 语句要么全部执行，要么全部不执行。  事务用来管理 insert,update,delete 语句

## 事物的四大特性(ACID)介绍一下?

**原子性 (Atomicity)：**一个事务（transaction）中的所有操作，要么全部完成，要么全部不完成，不会结束在中间某个环节。事务在执行过程中发生错误，会被回滚（Rollback）到事务开始前的状态，就像这个事务从来没有执行过一样。   

 **一致性（Consistency）：**在事务开始之前和事务结束以后，数据库的完整性没有被破坏。这表示写入的资料必须完全符合所有的预设规则，这包含资料的精确度、串联性以及后续数据库可以自发性地完成预定的工作。    

**隔离性（Isolation）：**数据库允许多个并发事务同时对其数据进行读写和修改的能力，隔离性可以防止多个事务并发执行时由于交叉执行而导致数据的不一致。事务隔离分为不同级别，包括读未提交（Read uncommitted）、读提交（read committed）、可重复读（repeatable read）和串行化（Serializable）。    

**持久性（Durability）：**事务处理结束后，对数据的修改就是永久的，即便系统故障也不会丢失。

## 什么是脏读？幻读？不可重复读？

## 什么是事务的隔离级别？MySQL的默认隔离级别是什么？

# 锁

## 对MySQL的锁了解吗

## 隔离级别与锁的关系

## 按照锁的粒度分数据库锁有哪些？锁机制与InnoDB锁算法

## 从锁的类别上分MySQL都有哪些锁呢？像上面那样子进行锁定岂不是有点阻碍并发效率了

## MySQL中InnoDB引擎的行锁是怎么实现的？

## InnoDB存储引擎的锁的算法有三种

## 什么是死锁？怎么解决？

## 数据库的乐观锁和悲观锁是什么？怎么实现的？

# 视图

```mysql
#创建视图
create view 视图名称 as select语句;
#--查看视图结构：
desc user_view; 
show create view user_view;
#--查看视图内容：
select * from user_view;
```



## 为什么要使用视图？什么是视图？

由基表通过SQL动态生成的**虚拟表**，本身不包含数据，基表和视图数据会互相影响。只有基表和视图字段一一对应才可以增删改查。

在Mysql中视图的类型分为：

1、MERGE   将视图的sql语句和引用视图的sql语句合并在一起，最后一起执行。
2、TEMPTABLE   将视图的结果集存放在临时表中，每次执行时从临时表中操作。
3、UNDEFINED   默认的视图类型，DBMS倾向于选择而不是必定选择MERGE，因为MERGE的效率更高，更重要的是临时表视图不能更新。
所以，这里推荐使用MERGE算法类型视图。

## [视图有哪些特点？](https://www.cnblogs.com/ljxt/p/11613167.html)

1）简单：使用视图的用户完全不需要关心后面对应的表的结构、关联条件和筛选条件，对用户来说已经是过滤好的复合条件的结果集。
2）安全：使用视图的用户只能访问他们被允许查询的结果集，对表的权限管理并不能限制到某个行某个列，但是通过视图就可以简单的实现。
3）数据独立：一旦视图的结构确定了，可以屏蔽表结构变化对用户的影响，源表增加列对视图没有影响；源表修改列名，则可以通过修改视图来解决，不会造成对访问者的影响。
总而言之，使用视图的大部分情况是为了保障数据安全性，提高查询效率。

## 视图的使用场景有哪些？

### 分表

### 启用计算列

如有订单数量和单价，一般数据库设计不会有总价字段，视图可有

### 导入导出表

使用视图导入导出数据

### 权限控制，提高安全性

创建视图控制显示字段，用户从视图查询只会显示控制的字段，可以把权限限定到行列级别

### 解耦合

创建视图后基表结构改变不影响视图，重构数据库不影响程序，向后兼容。

### 简化数据操作

将复杂的联合等查询创建为视图，可只查询视图来简化操作

## 视图的优点

## 视图的缺点

查询性能降低，修改视图会直接修改原数据，基表视图相互依赖。

## 什么是游标？

### 游标的特性

- 不敏感：数据库可以选择不复制结果集
- 只读
- 不滚动：游标只能向一方向前进，并且不可以跳过任何一行数据

### 游标的优点

- 游标是针对行操作的，对从数据库中 select 查询得到的结果集的 每一行可以

  进行分开的独立的相同或者不相同的操作，是一种分离的思想。

### 游标的缺点

- 性能不高
- 只能一行一行操作
- 使用游标会产生死锁，造成内存开销大

### 游标的适用场景

- 存储过程
- 函数
- 触发器
- 事件

### 游标的操作

#### 1、游标的定义

DECLARE 光标名称 CURSOR FOR 查询语法

declare cursor_name cursor for select_statement

#### 2、打开游标

OPEN 光标名称

open cursor_name

#### 3、取游标中的数据

FETCH 光标名称 INFO var_name [，var_name ].....

fetch cursor_name info var_name

#### 4、关闭游标

CLOSE curso_name;

close 光标名称

#### 5、释放游标

DEALLOCATE 光标名称

deallocate cursor_name;

### 

# 存储过程与函数

## 什么是存储过程？有哪些优缺点？

# 触发器

## 什么是触发器？触发器的使用场景有哪些？

触发器是针对每一行的；对增删改非常频繁的表上切记不要使用触发器，因为它会非常消耗资源。 触发器是针对每一行的；对增删改非常频繁的表上切记不要使用触发器，因为它会非常消耗资源。 

```mysql
CREATE
    [DEFINER = { user | CURRENT_USER }]
TRIGGER trigger_name
trigger_time trigger_event
ON tbl_name FOR EACH ROW
　　[trigger_order]
trigger_body

trigger_time: { BEFORE | AFTER }

trigger_event: { INSERT | UPDATE | DELETE }

trigger_order: { FOLLOWS | PRECEDES } other_trigger_name
> BEFORE和AFTER参数指定了触发执行的时间，在事件之前或是之后。

> FOR EACH ROW表示任何一条记录上的操作满足触发事件都会触发该触发器，也就是说触发器的触发频率是针对每一行数据触发一次。

> tigger_event详解：

　　①INSERT型触发器：插入某一行时激活触发器，可能通过INSERT、LOAD DATA、REPLACE 语句触发(LOAD DAT语句用于将一个文件装入到一个数据表中，相当与一系列的INSERT操作)；

　　②UPDATE型触发器：更改某一行时激活触发器，可能通过UPDATE语句触发；

　　③DELETE型触发器：删除某一行时激活触发器，可能通过DELETE、REPLACE语句触发。

> trigger_order是MySQL5.7之后的一个功能，用于定义多个触发器，使用follows(尾随)或precedes(在…之先)来选择触发器执行的先后顺序。 
```

NEW与OLD详解

MySQL 中定义了 NEW 和 OLD，用来表示触发器的所在表中，触发了触发器的那一行数据，来引用触发器中发生变化的记录内容，具体地：

　　①在INSERT型触发器中，NEW用来表示将要（BEFORE）或已经（AFTER）插入的新数据；

　　②在UPDATE型触发器中，OLD用来表示将要或已经被修改的原数据，NEW用来表示将要或已经修改为的新数据；

　　③在DELETE型触发器中，OLD用来表示将要或已经被删除的原数据；

查看触发器

```mysql
select * from information_schema.triggers 
```

## MySQL中都有哪些触发器？

## 



# Linux下RPM版MYSQL安装、启停

# MySQL启动问题、配置文件、编码问题

# MYSQL分层、存储引擎

**连接层**（提供与客户端连接的服务）

**服务层**（提供各种用户使用的接口，提供SQL优化器【MySQL Query Optimizer】））

**引擎层**（提供各种存储数据的方式【InnoDB：事物优先，适合高并发，行锁；MyISAM：性能优先，表锁】）

show engines; 显示支持引擎

+--------------------+---------+----------------------------------------------------------------+--------------+------+------------+
| Engine             | Support | Comment                                                        | Transactions | XA   | Savepoints |
+--------------------+---------+----------------------------------------------------------------+--------------+------+------------+
| MEMORY             | YES     | Hash based, stored in memory, useful for temporary tables      | NO           | NO   | NO         |
| MRG_MYISAM         | YES     | Collection of identical MyISAM tables                          | NO           | NO   | NO         |
| CSV                | YES     | CSV storage engine                                             | NO           | NO   | NO         |
| FEDERATED          | NO      | Federated MySQL storage engine                                 | NULL         | NULL | NULL       |
| PERFORMANCE_SCHEMA | YES     | Performance Schema                                             | NO           | NO   | NO         |
| MyISAM             | YES     | MyISAM storage engine                                          | NO           | NO   | NO         |
| InnoDB             | DEFAULT | Supports transactions, row-level locking, and foreign keys     | YES          | YES  | YES        |
| BLACKHOLE          | YES     | /dev/null storage engine (anything you write to it disappears) | NO           | NO   | NO         |
| ARCHIVE            | YES     | Archive storage engine                                         | NO           | NO   | NO         |
+--------------------+---------+----------------------------------------------------------------+--------------+------+------------+	show variables like ‘%storage_engine%’;  查看当前使用引擎

```sql
-- 指定数据库引擎
create table tb(
​	id int(4) auto_increment,
​	name varchar(5),
​	dept varchar(5),
​	primary key(id)
)ENGINE=MyISAM AUTO_INCREMENT=1
DEFAULT CHARSET=utf-8		
```

**存储层**（存储数据）

# SQL解析过程、索引、B树

## sql优化：

原因：性能低，执行或等待时间太长，SQL语句欠佳（连接查询）、索引失效、服务器参数设置不对

SQL编写过程与解析过程：

- 编写:select dinstinct  ..from …join ..on ..where ..group by ..having ..order by ..limit
- 解析:form ..on ..join ..where ..group by ..having ..select dinstinct ..order by limit..
- 从哪些表构成的总表中，通过字段筛选出相应数据然后分组、排序、限制数量。

## 索引

### 简介

sql优化主要是优化索引，索引（index）相当于书的目录。索引是数据结构（默认B树【小左大右】）

![image-20210617202405953](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210617202405953.png)

### 优点

1. 提高查询效率（降低IO、CPU使用率）

### 缺点

1. 索引本身很大（可以存放在内存/硬盘）
2. 索引不是所有情况都适用：少量数据，频繁更新字段，很少使用的字段
3. 索引会降低增删改查效率

### 分类

单值索引：单字段

唯一索引：不能重复

主键索引：不能重复，不能为null，主键默认是主键索引

复合索引：相当于二级目录（name，age）

### 创建索引

#### 方式一

create 索引类型 索引名 on 表（字段）

单值索引：create index dept_index on tb(dept);

唯一索引：create unique index name-index on tb(name)

复合索引：create index dept_name_index on tb(dept,name);

#### 方式二

alter table 表名 add 索引类型 索引名（字段）

单值索引：alter table tb add index dept_index(dept);

唯一索引：alter table tb add unique index name-index(name)

复合索引：alter table tb add index dept_name_index(dept,name);

### 删除索引

drop index 索引名 on 表名

### 查询索引

show index from 表名\G

# SQL优化



## 为什么要优化

## 数据库结构优化

## MySQL数据库cpu飙升到500%的话怎么处理？

## 大表怎么优化？某个表有近千万数据，CRUD比较慢，如何优化？分库分表了是怎么做的？分表分库了有什么问题？有用到中间件么？他们的原理知道么？

## 垂直分表

### 适用场景

### 缺点

## 水平分表：

### 适用场景

### 水平切分的缺点

## MySQL的复制原理以及流程

## 读写分离有哪些解决方案？

## 备份计划，mysqldump以及xtranbackup的实现原理

## 数据表损坏的修复方式有哪些？

## 如何定位及优化SQL语句的性能问题？创建的索引有没有被使用到?或者说怎么才可以知道这条语句运行很慢的原因？

## SQL的生命周期？

## 大表数据查询，怎么优化

## 超大分页怎么处理？

## mysql 分页

## 慢查询日志

## 关心过业务系统里面的sql耗时吗？统计过慢查询吗？对慢查询都怎么优化过？

## 为什么要尽量设定一个主键？

## 主键使用自增ID还是UUID？各自优缺点？

## 字段为什么要求定义为not null？

## 如果要存储用户的密码散列，应该使用什么字段进行存储？

## 优化查询过程中的数据访问

## 优化长难的查询语句

## 优化特定类型的查询语句

## 优化关联查询

## 优化子查询

## 优化LIMIT分页

## 优化UNION查询

## 优化WHERE子句

# **SQL优化准备**

分析SQL的**执行计划**：**explain**+sql语句，模拟sql优化器执行sql语句，从而让开发人员知道自己SQL语句情况

id	select_type	table		partitions		type        possible_keys		 key		key_len	ref		rows	filtered	Extra
1		SIMPLE		user							const		PRIMARY		PRIMARY	 152		const	  1		100.00	

| **id**                | 编号 子查询id不同，关联查询相同                           |
| --------------------- | --------------------------------------------------------- |
| **select_type  **     | 查询类型                                                  |
| **table		**     | 查询表     id相同数据量越少越优先查询，id不通id越大越优先 |
| **partitions**        |                                                           |
| **type       **       | 类型                                                      |
| **possible_keys	** | 预测用到的索引                                            |
| **key		**       | 实际用到的索引                                            |
| **key_len	**       | 实际使用索引的长度                                        |
| **ref		**       | 表之间的引用                                              |
| **rows	**          | 通过索引查询到的数据量                                    |
| **filtered**          |                                                           |
| **Extra   **          | 额外的信息                                                |

## id、table

**先查内层，再查外层。子查询id不同，关联查询id相同。 id相同数据量越少越优先查询，id不同id越大越优先**

explain SELECT * from teacher where tid=(select tid from course where cid='2') or tcid=(select tcid from teachercard where tcid='3')

![image-20210622183715131](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210622183715131.png)

explain select t.* from teacher t,course c,teacherCard tc where t.tid=c.tid and t.tcid=tc.tcid and (c.cid='2' or tc.tcid='3')

![image-20210622183731786](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210622183731786.png)

## select_type（查询类型）

**PRIMARY**：包含子查询SQL中的 主查询（最外层）

**SUBQUERY**：包含子查询SQL中的子查询（非最外层）

**SIMPLE**：简单查询（不包含子查询、union）

**union**：

**derived**：衍生查询（使用到了临时表）

- **在form子查询中只有一张表**

  explain select cr.cname from (select * from course where tid in (1,2)) cr;

  ![image-20210622190113873](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210622190113873.png)

- **form子查询中，如果有table1 union table2，则table1 就是的riverd**

  explain select cr.cname from (select * from course where tid =1 union select * from course where tid =2) cr;

![image-20210622190044449](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210622190044449.png)



## type（索引类型）

**system > const > eq_ref > ref > range > index > all**   

对TYPE优化前提：有索引

system，const知识理想情况，实际能达到 ref >range

- system（忽略）：只有一条数据的系统表；或衍生表只有一条数据的主查询

- const：仅仅能查到一条数据的SQL，用于Primayr key 或unique索引（类型与索引类型有关）

- eq_ref：唯一性索引：对于每个索引建的查询，返回匹配唯一行数据（有且只有1个，不能多、不能0）

  select ·· from ··where name=···常见唯一索引和主键索引

- ref：非唯一性索引，对于每个索引建的查询，返回匹配的所有行（0，多）

- range：检索指定范围的行，where后面是一个范围查询（between，in，> < >=，in有时候会失效，从而转为all）

- index：查询全部索引中的数据，只需要扫描索引表，不需要所有表中的所有数据

- all：查询全部表中的数据，需要全表所有，即需要所有表中的所有数据

## possible_keys

可能用到的索引，是一种预测，不准

## key

实际用到的索引

## key_len：

索引长度，用于判断复合索引是否完全使用，如果索引字段可为null，则会使用1个字节用于标识，索引字段为可变长度，则会使用2个字节

## ref

注意与type值中的ref值区分

作用：指明当前表所参照的字段

select 。。。 where a.c=b.x （）

## rows

被索引优化查询的数据个数（实际通过索引而查询到的数据个数）

## extra

**using filesort**：性能消耗大,需要额外的一次排序（查询）

单索引：如果排序和查找是同一个字段，则不会出现using filesort ；如果排序和查找不是同一个字段，则会出现。

避免：where哪些字段就order by哪些字段

复合索引：不能跨列（最佳左前缀）

避免：where和order by 按照复合索引的顺序适应，不要跨列或无序使用

**using temporary**：性能损耗较大，用到了临时表。一般出现在 group by 语句中；

explain select a1 from test02 where a1 in(‘1’,’2’,’3’)  group by a1;

explain select a1 from test02 where a1 in(‘1’,’2’,’3’)  group by a2;  —–using tempporary

避免：查询哪些列，就根据哪些列group by

**using temporary**：性能提升，索引覆盖，原因：不读取源文件，只从索引中获取数据，使用到的列全部都在索引中  

**using where**：需要回原表查询

**impossible where**：where子句永远为false

# 优化示例

create table test03
(a1 int(4) not null,
a2 int(4) not null,
a3 int(4) not null,
a4 int(4) not null
)

alter table test03 add index idx_a1_a2_a3_a4(a1,a2,a3,a4);

explain select a1,a2,a3,a4 from test03 where a1=1 and a2=2 and a3=3 and a4=4;—-推荐写法

explain select a1,a2,a3,a4 from test03 where a4=1 and a2=2 and a1=3 and a4=4;—-虽然编写后的顺序和索引顺序不一致，但是sql执行前经过了sql优化器的调整，结果与上条sql是一致的。

—–以上两个sql使用了全部的索引

explain select a1,a2,a3,a4 from test03 where a4=1 and a2=2  and a4=4 order by and a1;

—-以上SQL用到了a1 a2两个索引，该两个字段 不需要回表查询using index ；a4跨列使用造成了该索引失效，所以需要回表查询，因此是using where ，以上可以通过key_len验证

explain select a1,a2,a3,a4 from test03 where a4=1  and a4=4 order by and a3;

—-以上SQL出现了using filesort（文件内排序，”多了一次额外的查找/排序“）不要跨列使用（where 和order by拼接起来使用）

explain select a1,a2,a3,a4 from test03 where a4=1  and a4=4 order by and a2,a3;  ===这样便不会出现 using filesort，如果复合索引和使用顺序全部一致，则复合索引全部使用，部分一致则使用部分索引。





















# 单表优化及总结

## （1）单表优化

create table book
(
	bid int(4) primary key,
	name varchar(20) not null,
	authorid int(4) not null,
	publicid int(4) not null,
	typeid int(4) not null 
);

insert into book values(1,'tjava',1,1,2) ;
insert into book values(2,'tc',2,1,2) ;
insert into book values(3,'wx',3,2,1) ;
insert into book values(4,'math',4,2,3) ;	
commit;	

	查询authorid=1且 typeid为2或3的	bid
	explain select bid from book where typeid in(2,3) and authorid=1  order by typeid desc ;
	
	(a,b,c)
	(a,b)
	
	优化：加索引
	alter table book add index idx_bta (bid,typeid,authorid);
	
	索引一旦进行 升级优化，需要将之前废弃的索引删掉，防止干扰。
	drop index idx_bta on book;
	
	根据SQL实际解析的顺序，调整索引的顺序：
	alter table book add index idx_tab (typeid,authorid,bid); --虽然可以回表查询bid，但是将bid放到索引中 可以提升使用using index ;
	
	再次优化（之前是index级别）：思路。因为范围查询in有时会实现，因此交换 索引的顺序，将typeid in(2,3) 放到最后。
	drop index idx_tab on book;
	alter table book add index idx_atb (authorid,typeid,bid);
	explain select bid from book where  authorid=1 and  typeid in(2,3) order by typeid desc ;


​	
​	--小结：	a.最佳做前缀，保持索引的定义和使用的顺序一致性  b.索引需要逐步优化  c.将含In的范围查询 放到where条件的最后，防止失效。
​	
​	本例中同时出现了Using where（需要回原表）; Using index（不需要回原表）：原因，where  authorid=1 and  typeid in(2,3)中authorid在索引(authorid,typeid,bid)中，因此不需要回原表（直接在索引表中能查到）；而typeid虽然也在索引(authorid,typeid,bid)中，但是含in的范围查询已经使该typeid索引失效，因此相当于没有typeid这个索引，所以需要回原表（using where）；
​	例如以下没有了In，则不会出现using where
​	explain select bid from book where  authorid=1 and  typeid =3 order by typeid desc ;
​	
​	还可以通过key_len证明In可以使索引失效。


​	

## （2）两表优化

create table teacher2
(
	tid int(4) primary key,
	cid int(4) not null
);

insert into teacher2 values(1,2);
insert into teacher2 values(2,1);
insert into teacher2 values(3,3);

create table course2
(
	cid int(4) ,
	cname varchar(20)
);

insert into course2 values(1,'java');
insert into course2 values(2,'python');
insert into course2 values(3,'kotlin');
commit;

左连接：
	explain select *from teacher2 t left outer join course2 c
	on t.cid=c.cid where c.cname='java';
	  

	索引往哪张表加？   -小表驱动大表  
		          -索引建立经常使用的字段上 （本题 t.cid=c.cid可知，t.cid字段使用频繁，因此给该字段加索引） [一般情况对于左外连接，给左表加索引；右外连接，给右表加索引]
	小表：10
	大表：300
	where   小表.x 10 = 大表.y 300;  --循环了几次？10
		
		大表.y 300=小表.x 10	--循环了300次


	小表:10
	大表:300
	
	select ...where 小表.x10=大表.x300 ;
	for(int i=0;i<小表.length10;i++)
	{
		for(int j=0;j<大表.length300;j++)
		{
			...
		}
	}


	select ...where 大表.x300=小表.x10 ;
	for(int i=0;i<大表.length300;i++)
	{
		for(int j=0;j<小表.length10;j++)
		{
			...
		}
	}

--以上2个FOR循环，最终都会循环3000次；但是 对于双层循环来说：一般建议 将数据小的循环 放外层；数据大的循环放内存。



	--当编写 ..on t.cid=c.cid 时，将数据量小的表 放左边（假设此时t表数据量小）
	
	alter table teacher2 add index index_teacher2_cid(cid) ;
	alter table course2 add index index_course2_cname(cname);


	Using join buffer:extra中的一个选项，作用：Mysql引擎使用了 连接缓存。

## （3）三张表优化

​	a.小表驱动大表  b.索引建立在经常查询的字段上

示例：
create table test03
(
  a1 int(4) not null,
  a2 int(4) not null,
  a3 int(4) not null,
  a4 int(4) not null
);
alter table test03 add index idx_a1_a2_a3_4(a1,a2,a3,a4) ;


```mysql
explain select a1,a2,a3,a4 from test03 where a1=1 and a2=2 and a3=3 and a4 =4 ; --推荐写法，因为 索引的使用顺序（where后面的顺序） 和 复合索引的顺序一致

explain select a1,a2,a3,a4 from test03 where a4=1 and a3=2 and a2=3 and a1 =4 ; --虽然编写的顺序 和索引顺序不一致，但是 sql在真正执行前 经过了SQL优化器的调整，结果与上条SQL是一致的。
--以上 2个SQL，使用了 全部的复合索引

explain select a1,a2,a3,a4 from test03 where a1=1 and a2=2 and a4=4 order by a3; 
--以上SQL用到了a1 a2两个索引，该两个字段 不需要回表查询using index ;而a4因为跨列使用，造成了该索引失效，需要回表查询 因此是using where；以上可以通过 key_len进行验证

explain select a1,a2,a3,a4 from test03 where a1=1 and a4=4 order by a3; 
--以上SQL出现了 using filesort(文件内排序，“多了一次额外的查找/排序”) ：不要跨列使用( where和order by 拼起来，不要跨列使用)
```


```mysql
explain select a1,a2,a3,a4 from test03 where a1=1 and a4=4 order by a2 , a3; --不会using filesort
```

```mysql
--总结：i.如果 (a,b,c,d)复合索引  和使用的顺序全部一致(且不跨列使用)，则复合索引全部使用。如果部分一致(且不跨列使用)，则使用部分索引。
select a,c where  a = and b= and d= 
	ii.where和order by 拼起来，不要跨列使用 
```

```mysql
using temporary:需要额外再多使用一张表. 一般出现在group by语句中；已经有表了，但不适用，必须再来一张表。
```

解析过程：			
from .. on.. join ..where ..group by ....having ...select dinstinct ..order by limit ...
	a.
		explain select * from test03 where a2=2 and a4=4 group by a2,a4 ;--没有using temporary
	b.
		explain select * from test03 where a2=2 and a4=4 group by a3 ;

# **索引失效七种情况**

```mysql
#（1）复合索引
#	a.复合索引，不要跨列或无序使用（最佳左前缀）
#	(a,b,c)  
#	b.复合索引，尽量使用全索引匹配
#	(a,b,c)  
#（2）不要在索引上进行任何操作（计算、函数、类型转换），否则索引失效
#		select ..where A.x = .. ;  --假设A.x是索引
#		不要：select ..where A.x*3 = .. ;
		explain select * from book where authorid = 1 and typeid = 2 ;--用到了at2个索引
		explain select * from book where authorid = 1 and typeid*2 = 2 ;--用到了a1个索引
		explain select * from book where authorid*2 = 1 and typeid*2 = 2 ;----用到了0个索引
		explain select * from book where authorid*2 = 1 and typeid = 2 ;----用到了0个索引,原因：对于复合索引，如果左边失效，#右侧全部失效。(a,b,c)，例如如果 b失效，则b c同时失效。
	drop index idx_atb on book ; 
	alter table book add index idx_authroid (authorid) ;
	alter table book add index idx_typeid (typeid) ;
	explain select * from book where authorid*2 = 1 and typeid = 2 ;
#（3）复合索引不能使用不等于（!=  <>）或is null (is not null)，否则自身以及右侧所有全部失效。
#	复合索引中如果有>，则自身和右侧索引全部失效。

explain select * from book where authorid = 1 and typeid =2 ;

# SQL优化，是一种概率层面的优化。至于是否实际使用了我们的优化，需要通过explain进行推测。

explain select * from book where authorid != 1 and typeid =2 ;
explain select * from book where authorid != 1 and typeid !=2 ;

#体验概率情况(< > =)：原因是服务层中有SQL优化器，可能会影响我们的优化。
drop index idx_typeid on book;
drop index idx_authroid on book;
alter table book add index idx_book_at (authorid,typeid);
explain select * from book where authorid = 1 and typeid =2 ;--复合索引at全部使用
explain select * from book where authorid > 1 and typeid =2 ; --复合索引中如果有>，则自身和右侧索引全部失效。
explain select * from book where authorid = 1 and typeid >2 ;--复合索引at全部使用
#----明显的概率问题---
explain select * from book where authorid < 1 and typeid =2 ;--复合索引at只用到了1个索引
explain select * from book where authorid < 4 and typeid =2 ;--复合索引全部失效

-- 我们学习索引优化 ，是一个大部分情况适用的结论，但由于SQL优化器等原因  该结论不是100%正确。
-- 一般而言， 范围查询（> <  in），之后的索引失效。

#（4）补救。尽量使用索引覆盖（using index）
#		（a,b,c）
select a,b,c from xx..where a=  .. and b =.. ;

#(5) like尽量以“常量”开头，不要以'%'开头，否则索引失效
select * from xx where name like '%x%' ; --name索引失效

explain select * from teacher  where tname like '%x%'; --tname索引失效

explain select * from teacher  where tname like 'x%';
 
explain select tname from teacher  where tname like '%x%'; --如果必须使用like '%x%'进行模糊查询，可以使用索引覆盖 挽救一部分。

#（6）尽量不要使用类型转换（显示、隐式），否则索引失效
explain select * from teacher where tname = 'abc' ;
explain select * from teacher where tname = 123 ;//程序底层将 123 -> '123'，即进行了类型转换，因此索引失效

#（7）尽量不要使用or，否则索引失效
explain select * from teacher where tname ='' or tcid >1 ; --将or左侧的tname 失效。
```

# **常见优化方法及慢查询SQL排查**

## exist和 in

select 。。from table where exist/in(子查询)；

如果主查询的数据集大，则使用In效率更高

如果子查询的数据集大，则使用exist效率更高

exist语法：将主查询的结果，放到子查询结果中进行条件校验（看子查询是否有数据，如果有数据，则校验成功，保留数据）

## order by

using filesort 有两种算法：双路排序、单路排序 （根据IO的次数）
MySQL4.1之前 默认使用 双路排序；双路：扫描2次磁盘（1：从磁盘读取排序字段 ,对排序字段进行排序（在buffer中进行的排序）   2：扫描其他字段 ）
	--IO较消耗性能
MySQL4.1之后 默认使用 单路排序  ： 只读取一次（全部字段），在buffer中进行排序。但种单路排序 会有一定的隐患 （不一定真的是“单路|1次IO”，有可能多次IO）。原因：如果数据量特别大，则无法 将所有字段的数据 一次性读取完毕，因此 会进行“分片读取、多次读取”。
	注意：单路排序 比双路排序 会占用更多的buffer。
		单路排序在使用时，如果数据大，可以考虑调大buffer的容量大小：  set max_length_for_sort_data = 1024  单位byte

如果max_length_for_sort_data值太低，则mysql会自动从 单路->双路   （太低：需要排序的列的总大小超过了max_length_for_sort_data定义的字节数）

提高order by查询的策略：
a.选择使用单路、双路 ；调整buffer的容量大小；
b.避免select * ...  （*会多花一些时间，且无法索引覆盖）
c.复合索引 不要跨列使用 ，避免using filesort
d.保证全部的排序字段 排序的一致性（都是升序 或 降序）

# 慢查询阀值和mysqldumpslow工具

:MySQL提供的一种日志记录，用于记录MySQL种响应时间超过阀值的SQL语句 （long_query_time，默认10秒）
 慢查询日志默认是关闭的；建议：开发调优是 打开，而 最终部署时关闭。
	

	检查是否开启了 慢查询日志 ：   show variables like '%slow_query_log%' ;
	
	临时开启：
		set global slow_query_log = 1 ;  --在内存种开启
		exit
		service mysql restart
	
	永久开启：
		/etc/my.cnf 中追加配置：
		vi /etc/my.cnf 
		[mysqld]
		slow_query_log=1
		slow_query_log_file=/var/lib/mysql/localhost-slow.log


​	
​	慢查询阀值：
​		show variables like '%long_query_time%' ;
​	
​	临时设置阀值：
​		set global long_query_time = 5 ; --设置完毕后，重新登陆后起效 （不需要重启服务）
​	
​	永久设置阀值：
​			
​		/etc/my.cnf 中追加配置：
​		vi /etc/my.cnf 
​		[mysqld]
​		long_query_time=3


	select sleep(4);
	select sleep(5);
	select sleep(3);
	select sleep(3);
	--查询超过阀值的SQL数量：  show global status like '%slow_queries%' ;
	
	(1)慢查询的sql被记录在了日志中，因此可以通过日志 查看具体的慢SQL。
	cat /var/lib/mysql/localhost-slow.log
	
	(2)通过mysqldumpslow工具查看慢SQL,可以通过一些过滤条件 快速查找出需要定位的慢SQL
	mysqldumpslow --help
	s：排序方式
	r:逆序
	l:锁定时间
	g:正则匹配模式		


	--获取返回记录最多的3个SQL
		mysqldumpslow -s r -t 3  /var/lib/mysql/localhost-slow.log
	
	--获取访问次数最多的3个SQL
		mysqldumpslow -s c -t 3 /var/lib/mysql/localhost-slow.log
	
	--按照时间排序，前10条包含left join查询语句的SQL
		mysqldumpslow -s t -t 10 -g "left join" /var/lib/mysql/localhost-slow.log
	
	语法：
		mysqldumpslow 各种参数  慢查询日志的文件

# 模拟并通过profiles分析海量数据

## a.模拟海量数据

	a.模拟海量数据  存储过程（无return）/存储函数（有return）
	create database testdata ;
	use testdata

```mysql
create table dept
(
dno int(5) primary key default 0,
dname varchar(20) not null default '',
loc varchar(30) default ''
)engine=innodb default charset=utf8;

create table emp
(
eid int(5) primary key,
ename varchar(20) not null default '',
job varchar(20) not null default '',
deptno int(5) not null default 0
)engine=innodb default charset=utf8;
	通过存储函数 插入海量数据：
	创建存储函数：
		randstring(6)  ->aXiayx  用于模拟员工名称
```


```mysql
delimiter $ #声明分号不是结束符
create function randstring(n int)   returns varchar(255) 
begin
	declare  all_str varchar(100) default 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' ;
	declare return_str varchar(255) default '' ;
	declare i int default 0 ; 
	while i<n		 
	do									
		set return_str = concat(  return_str,      substring(all_str,   FLOOR(1+rand()*52)   ,1)       );
		set i=i+1 ;
	end while ;
	return return_str;
	
end $ 
```

--如果报错：You have an error in your SQL syntax，说明SQL语句语法有错，需要修改SQL语句；

 如果报错This function has none of DETERMINISTIC, NO SQL, or READS SQL DATA in its declaration and binary logging is enabled (you *might* want to use the less safe log_bin_trust_function_creators variable)
	是因为 存储过程/存储函数在创建时 与之前的 开启慢查询日志冲突了 
	解决冲突：
	临时解决( 开启log_bin_trust_function_creators )
		show variables like '%log_bin_trust_function_creators%';
		set global log_bin_trust_function_creators = 1;
	永久解决：
	/etc/my.cnf 
	[mysqld]
	log_bin_trust_function_creators = 1


```mysql
--产生随机整数
create function ran_num() returns int(5)
begin
	declare i int default 0;
	set i =floor( rand()*100 ) ;
	return i ;

end $
```



```mysql
--通过存储过程插入海量数据：emp表中  ，  10000,   100000
create procedure insert_emp( in eid_start int(10),in data_times int(10))
begin 
	declare i int default 0;
	set autocommit = 0 ;
	
	repeat
		
		insert into emp values(eid_start + i, randstring(5) ,'other' ,ran_num()) ;
		set i=i+1 ;
		until i=data_times
	end repeat ;
	commit ;
end $
```


```mysql
--通过存储过程插入海量数据：dept表中  
	create procedure insert_dept(in dno_start int(10) ,in data_times int(10))
	begin
		declare i int default 0;
		set autocommit = 0 ;
		repeat
		
			insert into dept values(dno_start+i ,randstring(6),randstring(8)) ;
			set i=i+1 ;
			until i=data_times
		end repeat ;
	commit ;
	end$
```


```mysql
--插入数据
	delimiter ; 
	call insert_emp(1000,800000) ;
	call insert_dept(10,30) ;
```

​	

## 	b.分析海量数据:

​	（1）**profiles**
​	show profiles ; --默认关闭
​	show variables like '%profiling%';
​	set profiling = on ; 
​	show profiles  ：会记录所有profiling打开之后的  全部SQL查询语句所花费的时间。缺点：不够精确，只能看到 总共消费的时间，不能看到各个硬件消费的时间（cpu  io ）
​	
​	(2)**精确分析:sql诊断**
​	 show profile all for query 上一步查询的的Query_Id
​	 show profile cpu,block io for query 上一步查询的的Query_Id
​	
​	(3)**全局查询日志** ：记录开启之后的 全部SQL语句。 （这次全局的记录操作 仅仅在调优、开发过程中打开即可，在最终的部署实施时 一定关闭）
​		show variables like '%general_log%';
​		

```mysql
	--执行的所有SQL记录在表中
	set global general_log = 1 ;--开启全局日志
	set global log_output='table' ; --设置 将全部的SQL 记录在表中

	--执行的所有SQL记录在文件中
	set global log_output='file' ;
	set global general_log = on ;
	set global general_log_file='/tmp/general.log' ;
```


```mysql
	开启后，会记录所有SQL ： 会被记录 mysql.general_log表中。
		select * from  mysql.general_log ;
```

# 锁机制详解

锁机制 ：解决因资源共享 而造成的并发问题。
	示例：买最后一件衣服X
	A:  	X	买 ：  X加锁 ->试衣服...下单..付款..打包 ->X解锁
	B:	X       买：发现X已被加锁，等待X解锁，   X已售空

分类：
操作类型：
	a.**读锁**（共享锁）： 对同一个数据（衣服），多个**读操作**可以同时进行，互不干扰。
	b.写锁（互斥锁）： 如果当前写操作没有完毕（买衣服的一系列操作），则无法进行其他的读操作、写操作

操作范围：
	a.**表锁** ：一次性对一张表整体加锁。如MyISAM存储引擎使用表锁，开销小、加锁快；无死锁；但锁的范围大，容易发生锁冲突、并发度低。
	b.行锁 ：一次性对一条数据加锁。如InnoDB存储引擎使用行锁，开销大，加锁慢；容易出现死锁；锁的范围较小，不易发生锁冲突，并发度高（很小概率 发生高并发问题：脏读、幻读、不可重复度、丢失更新等问题）。
	c.**页锁**		

示例：

	（1）表锁 ：  --自增操作 MYSQL/SQLSERVER 支持；oracle需要借助于序列来实现自增

create table tablelock
(
id int primary key auto_increment , 
name varchar(20)
)engine myisam;


insert into tablelock(name) values('a1');
insert into tablelock(name) values('a2');
insert into tablelock(name) values('a3');
insert into tablelock(name) values('a4');
insert into tablelock(name) values('a5');
commit;

```mysql
增加锁：
locak table 表1  read/write  ,表2  read/write   ,...

查看加锁的表：
show open tables ;

会话：session :每一个访问数据的dos命令行、数据库客户端工具  都是一个会话

===加读锁：
	会话0：
		lock table  tablelock read ;
		select * from tablelock; --读（查），可以
		delete from tablelock where id =1 ; --写（增删改），不可以

		select * from emp ; --读，不可以
		delete from emp where eid = 1; --写，不可以
		结论1：
		--如果某一个会话 对A表加了read锁，则 该会话 可以对A表进行读操作、不能进行写操作； 且 该会话不能对其他表进行读、写操作。
		--即如果给A表加了读锁，则当前会话只能对A表进行读操作。

	会话1（其他会话）：
		select * from tablelock;   --读（查），可以
		delete from tablelock where id =1 ; --写，会“等待”会话0将锁释放
```


		会话1（其他会话）：
			select * from emp ;  --读（查），可以
			delete from emp where eno = 1; --写，可以
			结论2：
			--总结：
				会话0给A表加了锁；其他会话的操作：a.可以对其他表（A表以外的表）进行读、写操作
								b.对A表：读-可以；  写-需要等待释放锁。
		释放锁: unlock tables ;

# 写锁示例与MyISAM模式特征

	===加写锁：
		会话0：
			lock table tablelock write ;
	
			当前会话（会话0） 可以对加了写锁的表  进行任何操作（增删改查）；但是不能 操作（增删改查）其他表
		其他会话：
			对会话0中加写锁的表 可以进行增删改查的前提是：等待会话0释放写锁

## MySQL表级锁的锁模式

MyISAM在执行查询语句（SELECT）前，会自动给涉及的所有表加读锁，
在执行更新操作（DML）前，会自动给涉及的表加写锁。
所以对MyISAM表进行操作，会有以下情况：
a、对MyISAM表的读操作（加读锁），不会阻塞其他进程（会话）对同一表的读请求，
但会阻塞对同一表的写请求。只有当读锁释放后，才会执行其它进程的写操作。
b、对MyISAM表的写操作（加写锁），会阻塞其他进程（会话）对同一表的读和写操作，
只有当写锁释放后，才会执行其它进程的读写操作。

# 表锁情况分析及行锁解析

分析表锁定：
	查看哪些表加了锁：   show open tables ;  1代表被加了锁
	分析表锁定的严重程度： show status like 'table%' ;
			Table_locks_immediate :立刻能获取到的锁数
			Table_locks_waited：需要等待的表锁数(如果该值越大，说明存在越大的锁竞争)
	一般建议：
		Table_locks_immediate/Table_locks_waited > 5000， 建议采用InnoDB引擎，否则MyISAM引擎

​	

（2）行表（InnoDB）
create table linelock(
id int(5) primary key auto_increment,
name varchar(20)
)engine=innodb ;
insert into linelock(name) values('1')  ;
insert into linelock(name) values('2')  ;
insert into linelock(name) values('3')  ;
insert into linelock(name) values('4')  ;
insert into linelock(name) values('5')  ;


--mysql默认自动commit;	oracle默认不会自动commit ;

为了研究行锁，暂时将自动commit关闭;  set autocommit =0 ; 以后需要通过commit


	会话0： 写操作
		insert into linelock values(	'a6') ;
	   
	会话1： 写操作 同样的数据
		update linelock set name='ax' where id = 6;
	
	对行锁情况：
		1.如果会话x对某条数据a进行 DML操作（研究时：关闭了自动commit的情况下），则其他会话必须等待会话x结束事务(commit/rollback)后  才能对数据a进行操作。
		2.表锁 是通过unlock tables，也可以通过事务解锁 ; 行锁 是通过事务解锁。


​		

	行锁，操作不同数据：
	
	会话0： 写操作
	
		insert into linelock values(8,'a8') ;
	会话1： 写操作， 不同的数据
		update linelock set name='ax' where id = 5;
		行锁，一次锁一行数据；因此 如果操作的是不同数据，则不干扰。

# 行锁的注意事项及使用情况分析

​	行锁的注意事项：
​	**a.如果没有索引，则行锁会转为表锁**
​	show index from linelock ;
​	alter table linelock add index idx_linelock_name(name);

​	会话0： 写操作
​		update linelock set name = 'ai' where name = '3' ;
​		
​	会话1： 写操作， 不同的数据
​		update linelock set name = 'aiX' where name = '4' ;

​	会话0： 写操作
​		update linelock set name = 'ai' where name = 3 ;
​		
​	会话1： 写操作， 不同的数据
​		update linelock set name = 'aiX' where name = 4 ;
​		
​	--可以发现，数据被阻塞了（加锁）
​	-- 原因：如果索引类 发生了**类型转换，则索引失效**。 因此 此次操作，会从行锁 转为表锁。
​	
​	**b.行锁的一种特殊情况：间隙锁：值在范围内，但却不存在**
​	 --此时linelock表中 没有id=7的数据
​	 update linelock set name ='x' where id >1 and id<9 ;   --即在此where范围中，没有id=7的数据，则id=7的数据成为间隙。
​	间隙：Mysql会自动给 间隙 加索 ->间隙锁。即 本题 会自动给id=7的数据加 间隙锁（行锁）。
​	行锁：如果有where，则实际加索的范围 就是where后面的范围（不是实际的值）

# 	查询行锁

​	如何仅仅是查询数据，能否加锁？ 可以   for update 
​	研究学习时，将自动提交关闭：
​		set autocommit =0 ;
​		start transaction ;
​		begin ;
​	 select * from linelock where id =2 for update ;
​	
​	通过for update对query语句进行加锁。
​	
​	行锁：
​	InnoDB默认采用行锁；
​	缺点： 比表锁性能损耗大。
​	优点：并发能力强，效率高。
​	因此建议，高并发用InnoDB，否则用MyISAM。
​	
​	行锁分析：
​	  show status like '%innodb_row_lock%' ;
​		 Innodb_row_lock_current_waits :当前正在等待锁的数量  
​		  Innodb_row_lock_time：等待总时长。从系统启到现在 一共等待的时间
​		 Innodb_row_lock_time_avg  ：平均等待时长。从系统启到现在平均等待的时间
​		 Innodb_row_lock_time_max  ：最大等待时长。从系统启到现在最大一次等待的时间
​		 Innodb_row_lock_waits ：	等待次数。从系统启到现在一共等待的次数

# 主从复制  

​	windows:mysql 主
​	linux:mysql从

	安装windows版mysql:
		如果之前计算机中安装过Mysql，要重新再安装  则需要：先卸载 再安装
		先卸载：
			通过电脑自带卸载工具卸载Mysql (电脑管家也可以)
			删除一个mysql缓存文件C:\ProgramData\MySQL
			删除注册表regedit中所有mysql相关配置
			--重启计算机
			
		安装MYSQL：
			安装时，如果出现未响应：  则重新打开D:\MySQL\MySQL Server 5.5\bin\MySQLInstanceConfig.exe
	
		图形化客户端： SQLyog, Navicat


		如果要远程连接数据库，则需要授权远程访问。 
		授权远程访问 :(A->B,则再B计算机的Mysql中执行以下命令)
		GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'root' WITH GRANT OPTION;
		FLUSH PRIVILEGES;
	
		如果仍然报错：可能是防火墙没关闭 ：  在B关闭防火墙  service iptables stop 



	实现主从同步（主从复制）：图
		1.master将改变的数 记录在本地的 二进制日志中（binary log） ；该过程 称之为：二进制日志件事
		2.slave将master的binary log拷贝到自己的 relay log（中继日志文件）中
		3.中继日志事件，将数据读取到自己的数据库之中
	MYSQL主从复制 是异步的，串行化的， 有延迟
	
	master:slave = 1:n
	
	配置： 
	windows(mysql: my.ini)
	  linux(mysql: my.cnf)
	
	配置前，为了无误，先将权限(远程访问)、防火墙等处理：
		关闭windows/linux防火墙： windows：右键“网络”   ,linux: service iptables stop
		Mysql允许远程连接(windowos/linux)：
			GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'root' WITH GRANT OPTION;
			FLUSH PRIVILEGES;


主机（以下代码和操作 全部在主机windows中操作）：
my.ini
[mysqld]
#id
server-id=1
#二进制日志文件（注意是/  不是\）
log-bin="D:/MySQL/MySQL Server 5.5/data/mysql-bin"
#错误记录文件
log-error="D:/MySQL/MySQL Server 5.5/data/mysql-error"
#主从同步时 忽略的数据库
binlog-ignore-db=mysql
#(可选)指定主从同步时，同步哪些数据库
binlog-do-db=test	

windows中的数据库 授权哪台计算机中的数据库 是自己的从数据库：	
 GRANT REPLICATION slave,reload,super ON *.* TO 'root'@'192.168.2.%' IDENTIFIED BY 'root';
 flush privileges ; 

	查看主数据库的状态（每次在左主从同步前，需要观察 主机状态的最新值）
		show master status;  （mysql-bin.000001、 107）

从机（以下代码和操作 全部在从机linux中操作）：


my.cnf
[mysqld]
server-id=2
log-bin=mysql-bin
replicate-do-db=test

linux中的数据 授权哪台计算机中的数控 是自己的主计算机
CHANGE MASTER TO 
MASTER_HOST = '192.168.2.2', 
MASTER_USER = 'root', 
MASTER_PASSWORD = 'root', 
MASTER_PORT = 3306,
master_log_file='mysql-bin.000001',
master_log_pos=107;
	如果报错：This operation cannot be performed with a running slave; run STOP SLAVE first
	解决：STOP SLAVE ;再次执行上条授权语句


开启主从同步：
	从机linux:
	start slave ;
	检验  show slave status \G	主要观察： Slave_IO_Running和 Slave_SQL_Running，确保二者都是yes；如果不都是yes，则看下方的 Last_IO_Error。
本次 通过 Last_IO_Error发现错误的原因是 主从使用了相同的server-id， 检查:在主从中分别查看serverid:  show variables like 'server_id' ;
	可以发现，在Linux中的my.cnf中设置了server-id=2，但实际执行时 确实server-id=1，原因：可能是 linux版Mysql的一个bug，也可能是 windows和Linux版本不一致造成的兼容性问题。
	解决改bug： set global server_id =2 ;

	stop slave ;
	 set global server_id =2 ;
	start slave ;
	 show slave status \G
	
	演示：
	主windows =>从
	
	windows:
	将表，插入数据  
	观察从数据库中该表的数据


数据库+后端

	spring boot（企业级框架,目前使用较多）  

# 命令集合

mysql -u root -p   登录
show engines; 显示支持引擎
show variables like ‘%storage_engine%’;  查看当前使用引擎

```mysql
-- 指定数据库引擎
create table tb(
​	id int(4) auto_increment,
​	name varchar(5),
​	dept varchar(5),
​	primary key(id)
)ENGINE=MyISAM AUTO_INCREMENT=1
DEFAULT CHARSET=utf-8
```

# 常用语句

## 数据库

```mysql
#1.查看已有库
　　show databases;
#2.创建库(指定字符集)
　　create database 库名 character set utf8 ；或 charset=utf8; 
　　create database 库名 default charset utf8 collate utf8_general_ci;
#案例：创建stu数据库，编码为utf8
　　create database stu character set utf8;
　　create database stu charset=utf8;
#3.查看创建库的语句(字符集)
　　show create database 库名;
#案例：查看stu创建方法　　show create database stu;
#4.查看当前所在库
　　select database();
#5.切换库
　　use 库名;
#案例：使用stu数据库　　use stu;
#6.删除库
　　drop database 库名;
#案例：删除test数据库 　　drop database test; 
#7.库名的命名规则
##数字、字母、下划线,但不能使用纯数字
##库名区分字母大小写
##不能使用特殊字符和mysql关键字
```



## 表

```mysql
#创建
CREATE TABLE IF NOT EXISTS `表名`(
   `字段名` INT UNSIGNED AUTO_INCREMENT,
   `字段名` VARCHAR(100) NOT NULL,
   `字段名` VARCHAR(40) NOT NULL,
   `字段名` DATE,
   PRIMARY KEY ( `主键字段名` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

#对创建后的表添加列
alter table 表名 add column 新增列名 类型 not null  DEFAULT 默认值 after 前一个列名

#对创建表后添加主外键
alter table 表名  add constraint 
primary key 表名（主键字段名）
foreign  key (外建名) references 外建字段所在表名 (外建字段名) on delete cascade; #on delete cascade 级联删除
```

## 数据

```mysql
#增
#删
#改
#查
```





## 连接

```mysql
#内连接 inner join  on  交集

#外连接
##左连接 left join on / left outer join on 左表+右表符合条件数据，记录不足的地方为null
##右连接 right join on / right outer join on 右表+左表符合条件数据，记录不足的地方为null

#全连接 union /union all
```

## 索引

```mysql
#创建索引
create 索引类型 索引名 on 表名(字段名);
alter table 表名 add 索引类型 索引名(字段名);

#使用强制索引
select * from 表名 FORCE INDEX (索引名) where 条件;
```

## 视图

```mysql
#创建视图
create view 视图名称 as select语句;
#--查看视图结构：
desc user_view; 
show create view user_view;
#--查看视图内容：
select * from user_view;
```

## 游标

```mysql
#定义
DECLARE 光标名称 CURSOR FOR 查询语法
declare cursor_name cursor for select_statement

#打开
OPEN 光标名称
open cursor_name

#取游标中的数据
FETCH 光标名称 INFO var_name [，var_name ].....
fetch cursor_name info var_name

#关闭游标
CLOSE curso_name;
close 光标名称

#释放游标
DEALLOCATE 光标名称
deallocate cursor_name;
```

## [触发器](#触发器)

```mysql
#创建
##只有一个执行语句
CREATE TRIGGER 触发器名 BEFORE|AFTER 触发事件 ON 表名 FOR EACH ROW 执行语句;
##多个个执行语句
CREATE TRIGGER 触发器名 BEFORE|AFTER 触发事件
ON 表名 FOR EACH ROW
BEGIN
        执行语句列表
END;
#示例
create TRIGGER audit_log after INSERT on employees_test for each row 
begin  
INSERT INTO audit VALUES (NEW.ID, NEW.NAME);
end
```

## 其他



```mysql
#查看表字段信息
desc 表名
#查看创建表sql（表所有信息）
show create table 表名;
```

```mysql
#输出格式
date_format(date,"%Y-%m") 
#插入存在忽略
insert ignore存在忽略

#去除重复
distinct字段去重

#分组
group by 。。having
##group by 在where 最后一个限制条件后面，不能在限制条件中间，HAVING是在分组后找到特定的分组。
select user_id from order_info where date > '2025-10-15' and product_name in ('C++','Java','Python') and status='completed' group by user_id HAVING count(user_id)>1 order by user_id 

# in exists
##in先内再外
not in
##EXISTS先外再内
SELECT 字段 from 表名 where  not EXISTS (select emp_no from dept_emp where employees.emp_no = dept_emp.emp_no)

#连接,
concat(last_name,'\'',first_name)
SELECT dept_no,GROUP_CONCAT(emp_no SEPARATOR ',') as employees from dept_emp group by dept_no
#语法: group_concat([distinct] 字段 [order by 排序字段 asc/desc]  separator  '分隔符')
#函数默认的分隔符是 ","，默认可以省略

#替换
replace
update titles_test set emp_no=replace(emp_no,'10001','10005') where id=5

#更换表名
alter table titles_test rename to titles_2017

round(avg(score),3)

#正则匹配，替换，计算长度
select id,length( regexp_replace(STRING, '[A-Z0-9]', '')) from strings

#截取
select 字段 from 表名 order by 
right/left(字段,2)
substring(str,index)
substring_index(str,delim,count)
subdate(date,day)
subtime(expr1,expr2)

#分页
select * from employees LIMIT 5 offset 5
select * from employees LIMIT 5,5

#窗口函数
# 排序函数
#mysql—排序函数rank() over()、dense_rank() over()、row_num() over()
#条件相同排名相同，    间断不连续 rank() over()                       跳过重复，比如 113446
#条件相同排名相同，    间断连续 dense_rank() over()    	            不跳过重复，比如 112334
#条件相同排名不相同，不间断连续 row_num() over()                      依次相加，比如 123456
select id,number,dense_rank() over(order by number desc) as 'rank' from passing_number 
#以grade排序，number按顺序以及grade分组累加
#grade	number
#A	2
#D	1
#C	2
#B	2
select grade,sum(number) over(order by grade) t_rank from class_grade

#时间
##当前时间
current_date/curdate()  
now()
current_timestamp, current_timestamp()
#格式转换  字符串转时间
str_to_date('08/09/2008', '%m/%d/%Y'); -- 2008-08-09
str_to_date('08/09/08' , '%m/%d/%y'); -- 2008-08-09
str_to_date('08.09.2008', '%m.%d.%Y'); -- 2008-08-09
str_to_date('08:09:30', '%h:%i:%s'); -- 08:09:30
str_to_date('08.09.2008 08:09:30', '%m.%d.%Y %h:%i:%s'); -- 2008-08-09 08:09:30
#时间增减

#条件分支
(case when 条件 then 语句
 	  when  条件 then 语句 
 	  else 语句 end) as bonus
select e.emp_no,e.first_name,e.last_name,eb.btype,s.salary,
(case when eb.btype = 1 then s.salary*0.1 when  eb.btype= 2 then s.salary*0.2 else s.salary*0.3 end) as bonus 
from employees e INNER join emp_bonus eb on e.emp_no=eb.emp_no INNER join salaries s on e.emp_no=s.emp_no where s.to_date='9999-01-01';
```

### [窗口函数](https://blog.csdn.net/weixin_39010770/article/details/87862407)

**1.窗口函数语法**

```text
<窗口函数> over (partition by <用于分组的列名>
                order by <用于排序的列名>)
```

<窗口函数>的位置，可以放以下两种函数：

#### 1） 专用窗口函数，比如

**序号函数** rank, dense_rank, row_number、

**分布函数**：`PERCENT_RANK()`、`CUME_DIST()`、`PERCENT_RANK()`

**前后函数**：`LAG(expr,n)`、`LEAD(expr,n)`

**前后函数**：`LAG(expr,n)`、`LEAD(expr,n)`

**其它函数**：`NTH_VALUE(expr, n)`、`NTILE(n)`、`NTH_VALUE(expr,n)`

#### 2） 聚合函数，如sum. avg, count, max, min等

**2.窗口函数有以下功能：**

1）同时具有分组（partition by）和排序（order by）的功能

2）不减少原表的行数，所以经常用来在每组内排名

**3.注意事项**

窗口函数原则上只能写在select子句中

**4.窗口函数使用场景**

1）业务需求“**在每组内排名”**

### mysql截取字符串函数

1、left(str,length) 从左边截取length
2、right(str,length)从右边截取length
3、substring(str,index)当index>0从左边开始截取直到结束  当index<0从右边开始截取直到结束  当index=0返回空
4、substring(str,index,len) 截取str,从index开始，截取len长度
5、substring_index(str,delim,count)，str是要截取的字符串，delim是截取的字段 count是从哪里开始截取(为0则是左边第0个开始，1位左边开始第一个选取左边的，-1从右边第一个开始选取右边的
6、subdate(date,day)截取时间，时间减去后面的day
7、subtime(expr1,expr2)  时分秒expr1-expr2
8、mysql索引从1开始

**全文索引： 是目前搜索引擎使用的一种关键技术。  可以通过ALTER TABLE table_name ADD FULLTEXT (column);创建全文索引**

查询数据库中表信息

```mysql
SELECT
    *
FROM
    information_schema.`TABLES`
WHERE
    TABLE_SCHEMA = 'hz_hbzy';
```



# Postgres

## 字段映射



## [Postgres与Mysql不同](https://blog.csdn.net/u012843873/article/details/60745287)

## 查询字段备注

```sql
select a.attnum,a.attname,concat_ws('',t.typname,SUBSTRING(format_type(a.atttypid,a.atttypmod) from '\(.*\)')) as type,d.description from pg_class c,pg_attribute a,pg_type t,pg_description d
where c.relname='com_capture' and a.attnum>0 and a.attrelid=c.oid and a.atttypid=t.oid and d.objoid=a.attrelid and d.objsubid=a.attnum;
```

## 取geom数据

```sql
select st_astext(geom) from ttt  # test形式
SELECT st_asgeojson(geom) FROM "ygjcgd" # geojson形式
```

## 存geom

```sql
点INSERT into  ttt values ('1',ST_GeomFromText('POINT(119.104393005 29.3091735840001)',4490))
面INSERT into  ttt values ('2',ST_GeomFromText('POLYGON((120.489420304 30.2855081450001,120.48927819 30.2855092200001,120.489034534 30.2855205130001,120.488415416 30.2855540510001,120.488238647 30.285563627,120.487775051 30.2856122420001,120.487543209 30.2856365540001,120.48696129 30.28571928,120.486939727 30.285722842,120.486661766 30.2857687420001,120.48676176 30.2859599880001,120.486786439 30.2860551310001,120.486803289 30.286632664,120.487353662 30.2866268860001,120.487351682 30.2864715210001,120.487351632 30.286467605,120.487350721 30.2863964210001,120.487346937 30.2860998030001,120.487342737 30.285770433,120.487400427 30.2857633680001,120.487405079 30.285760184,120.48740623 30.285961001,120.487409165 30.2864727900001,120.487409564 30.286542108,120.487409728 30.2865708910001,120.487410051 30.2866269530001,120.487415064 30.2866269360001,120.487781689 30.2866291820001,120.488148313 30.286631426,120.488229104 30.286631782,120.488646675 30.2866336280001,120.488672652 30.2866335310001,120.489108909 30.286635501,120.489545164 30.286637469,120.489554908 30.2866377670001,120.489587466 30.2866073650001,120.489631665 30.286574779,120.489633218 30.2865468840001,120.489635952 30.286497766,120.489630193 30.2864750590001,120.489620367 30.286436291,120.489576415 30.2862629480001,120.489538252 30.286111927,120.489518579 30.286034075,120.489490667 30.2859208350001,120.489445946 30.285699532,120.489442796 30.285683949,120.489435137 30.2856060400001,120.489420304 30.2855081450001))',4490))
```

## 添加geom扩展

```mysql
CREATE EXTENSION postgis;
CREATE EXTENSION fuzzystrmatch;
CREATE EXTENSION postgis_tiger_geocoder;
CREATE EXTENSION address_standardizer;
CREATE EXTENSION postgis_topology;
```

## PostgREST 

服务发布

## 常用函数

<img src="http://rcy276gfy.hd-bkt.clouddn.com/work/image-20220329200655063.png" alt="image-20220329200655063" style="zoom: 67%;" />

### 图形和地理位置

- **ST_GeometryType(geometry)** —— 返回几何图形的类型
- **ST_Transform(geometry, srid)**——将几何图形投影为地理坐标数据 或 转换为不同srid坐标系统的坐标数据
- **Geography(geometry)**——将基于EPSG:4326(srid=4326)的geometry数据类型转换为geography数据类型
- **ST_NDims(geometry)** —— 返回几何图形的维数
- **ST_SRID(geometry)** —— 返回几何图形的空间参考标识码 srid
- **ST_SetSRID(geometry，SRID）**——设置srid
- **sum(expression)** ——返回一个计算式/表达式的和
- **count(expression)** ——返回一个表达式中的次数

PS : geometry，是几何类型的列的列名

srid，不同的srid就是不同标准的坐标系

**点空间函数**：

- **ST_X(geometry)** —— 返回X坐标
- **ST_Y(geometry)** —— 返回Y坐标

**线串空间函数**：

- **ST_Length(geometry)** —— 返回线串的长度
- **ST_StartPoint(geometry)** —— 将线串的第一个坐标作为点返回
- **ST_EndPoint(geometry）** —— 将线串的最后一个坐标作为点返回
- **ST_NPoints(geometry)** —— 返回线串的坐标数量

**多边形空间函数**：

- **ST_Area(geometry)** —— 返回多边形的面积
- **ST_NRings(geometry)** —— 返回多边形中环的数量（通常为1个，其他是孔）
- **ST_ExteriorRing(geometry)** —— 以线串的形式返回多边形最外面的环
- **ST_InteriorRingN(geometry, n)** —— 以线串形式返回指定的内部环
- **ST_Perimeter(geometry)** —— 返回所有环的长度

**集合空间函数**(多点、多线、多面、任意图形组合)：

- **ST_NumGeometries(geometry)** —— 返回集合中的组成部分的数量
- **ST_GeometryN(geometry, n)** —— 返回集合中指定的组成部分
- **ST_Area(geometry)** —— 返回集合中所有多边形组成部分的总面积
- **ST_Length(geometry)** —— 返回所有线段组成部分的总长度

### 几何图形输入和输出

在数据库中，**几何图形**（Geometry）以仅供PostGIS使用的格式存储在磁盘上。为了让外部程序插入和检索有用的**几何图形**信息，需要将它们转换为其他应用程序可以理解的格式。

①Well-known text（[WKT](https://link.zhihu.com/?target=https%3A//postgis.net/workshops/postgis-intro/glossary.html%23term-wkt)）

- **ST_GeomFromText(text, srid)** —— 返回geometry，除非指定SRID，否则将得到一个包含未知SRID的**几何图形**
- **ST_GeographyFromText(text)**——返回Geography
- **ST_AsText(geometry)** —— 返回text
- **ST_AsEWKT(geometry)** —— 返回text

②Well-known binary（[WKB](https://link.zhihu.com/?target=https%3A//postgis.net/workshops/postgis-intro/glossary.html%23term-wkb)）

- **ST_GeomFromWKB(bytea)** —— 返回geometry
- **ST_AsBinary(geometry)** —— 返回bytea
- **ST_AsEWKB(geometry)** —— 返回bytea

③Geographic Mark-up Language（[GML](https://link.zhihu.com/?target=https%3A//postgis.net/workshops/postgis-intro/glossary.html%23term-gml)）

- **ST_GeomFromGML(text)** —— 返回geometry
- **ST_ASGML(geometry)** —— 返回text

④Keyhole Mark-up Language（[KML](https://link.zhihu.com/?target=https%3A//postgis.net/workshops/postgis-intro/glossary.html%23term-kml)）

- **ST_GeomFromKML(text)** —— 返回geometry
- **ST_ASKML(geometry)** —— 返回text

⑤[GeoJson](https://link.zhihu.com/?target=https%3A//postgis.net/workshops/postgis-intro/glossary.html%23term-geojson)

- **ST_AsGeoJSON(geometry)** —— 返回text

⑥Scalable Vector Graphics([SVG](https://link.zhihu.com/?target=https%3A//postgis.net/workshops/postgis-intro/glossary.html%23term-svg)）

- **ST_AsSVG(geometry)** —— 返回text

以上函数最常见的用法是将**几何图形**的**文本**（text）表示形式转换为内部表示形式

请注意，除了具有**几何图**形表示形式的**文本**参数外，还可以指定一个提供几何图形**SRID**的数字参数。

### 图形关系

**ST_Equals(geometry A, geometry B)**

- 用于测试两个图形的空间相等性。
- 如果两个相同类型的几何图形具有相同的x、y坐标值，即如果第二个图形与第一个图形的坐标信息相等（相同），则ST_Equals()返回TRUE。

**ST_Intersects、ST_Disjoint、ST_Crosses和ST_Overlaps**

- **ST_Intersects**、**ST_Crosses**和**ST_Overlaps**测试几何图形是否相交。
- 如果**两个图形有重合的部分，即如果它们的边界或内部相交**，则**ST_Intersects(geometry A, geometry B)**返回TRUE
- **ST_Disjoint(geometry A, geometry B)**，如果两个几何图形没有重合的部分，则它们不相交，反之亦然。事实上测试"not intersect"通常比测试"disjoint"更有效，因为intersect测试可以使用**空间索引**
- 对于multipoint/polygon、multipoint/linestring、linestring/linestring、linestring/polygon和linestring/multipolygon的比较，**如果相交生成的几何图形的维度小于两个源几何图形的最大维度，且相交集位于两个源几何图形的内部**，则**ST_Crosses(geometry A, geometry B)**将返回TRUE。
- **ST_Overlaps(geometry A, geometry B)**比较两个**相同维度**的几何图形，**如果它们的结果集与两个源几何图形都不同但具有相同维度**，则返回TRUE。

**ST_Touches()**

- 测试两个几何图形是否在它们的边界上接触，但在它们的内部不相交
- 如果两个几何图形的**边界相交**，或者只有一个几何图形的内部与另一个几何图形的边界相交，则**ST_Touches(geometry A, geometry B)**将返回TRUE

**ST_Within和ST_Contains**

- ST_Within()和ST_Contains()测试一个几何图形是否完全位于另一个几何图形内
- 如果第一个几何图形完全位于第二个几何图形内，则ST_Within(geometry A, geometry B)返回TRUE，ST_Within()测试的结果与ST_Contains()完全相反
- 如果第二个几何图形完全包含在第一个几何图形内，则ST_Contains(geometry A, geometry B)返回TRUE

**ST_Distance和ST_DWithin**

- **ST_Distance(geometry A, geometry B)**计算两个几何图形之间的最短距离，并将其作为浮点数返回。这对于实际报告几何图形之间的距离非常有用
- **ST_DWithin()**，测试两个几何图形之间的距离是否在某个范围之内，

### geography类型

- **ST_AsText(geography)** returns `text`
- **ST_GeographyFromText(text)** returns `geography`
- **ST_AsBinary(geography)** returns `bytea`
- **ST_GeogFromWKB(bytea)** returns `geography`
- **ST_AsSVG(geography)** returns `text`
- **ST_AsGML(geography)** returns `text`
- **ST_AsKML(geography)** returns `text`
- **ST_AsGeoJson(geography)** returns `text`
- **ST_Distance(geography, geography)** returns `double`
- **ST_DWithin(geography, geography, float8)** returns `boolean`
- **ST_Area(geography)** returns `double`
- **ST_Length(geography)** returns `double`
- **ST_Covers(geography, geography)** returns `boolean`
- **ST_CoveredBy(geography, geography)** returns `boolean`
- **ST_Intersects(geography, geography)** returns `boolean`
- **ST_Buffer(geography, float8)** returns `geography`[[1\]](https://link.zhihu.com/?target=https%3A//postgis.net/workshops/postgis-intro/geography.html%23casting-note)
- **ST_Intersection(geography, geography)** returns `geography`[[1\]](https://link.zhihu.com/?target=https%3A//postgis.net/workshops/postgis-intro/geography.html%23casting-note)

**geography转换为geometry**

PostgreSQL的类型转换语法是将 **::typename** 附加到希望转换的值的末尾。因此，2::text将数字2转换为文本字符串"2"；'POINT(0 0)' :: geometry将点的文本表示形式转换为geometry点



# 上好例题

时间格式，截取匹配，分组，排序

```mysql
select job,date_format(date,"%Y-%m") as mon,sum(num) as cnt from resume_info where left(date,4)= '2025' group by job,mon order by mon desc,cnt desc
```



单输入，多字段查询

```
<if test="text!=null and text!=''">
    and CONCAT(t.city,t.bh,t.cun,t.jsztmc,t.xmxmmc) like concat ('%',#{text},'%')
</if>
```

## 有没有进行过分库分表操作？分库之后如何保持事务一致？

# Java字段映射

## 全字段详表

## 数值

[参考](https://www.runoob.com/mysql/mysql-data-types.html)

| 类型         | 大小                                     | 范围（有符号）                                               | 范围（无符号UNSIGNED）                                       | 用途            |
| :----------- | :--------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :-------------- |
| TINYINT      | 1 Bytes                                  | (-128，127)                                                  | (0，255)                                                     | 小整数值        |
| SMALLINT     | 2 Bytes                                  | (-32 768，32 767)                                            | (0，65 535)                                                  | 大整数值        |
| MEDIUMINT    | 3 Bytes                                  | (-8 388 608，8 388 607)                                      | (0，16 777 215)                                              | 大整数值        |
| INT或INTEGER | 4 Bytes                                  | (-2 147 483 648，2 147 483 647)                              | (0，4 294 967 295)                                           | 大整数值        |
| BIGINT       | 8 Bytes                                  | (-9,223,372,036,854,775,808，9 223 372 036 854 775 807)      | (0，18 446 744 073 709 551 615)                              | 极大整数值      |
| FLOAT        | 4 Bytes                                  | (-3.402 823 466 E+38，-1.175 494 351 E-38)，0，(1.175 494 351 E-38，3.402 823 466 351 E+38) | 0，(1.175 494 351 E-38，3.402 823 466 E+38)                  | 单精度 浮点数值 |
| DOUBLE       | 8 Bytes                                  | (-1.797 693 134 862 315 7 E+308，-2.225 073 858 507 201 4 E-308)，0，(2.225 073 858 507 201 4 E-308，1.797 693 134 862 315 7 E+308) | 0，(2.225 073 858 507 201 4 E-308，1.797 693 134 862 315 7 E+308) | 双精度 浮点数值 |
| DECIMAL      | 对DECIMAL(M,D) ，如果M>D，为M+2否则为D+2 | 依赖于M和D的值                                               | 依赖于M和D的值                                               | 小数值          |
## 时间
| 类型      | 大小 ( bytes) | 范围                                                         | 格式                | 用途                     |
| :-------- | :------------ | :----------------------------------------------------------- | :------------------ | :----------------------- |
| DATE      | 3             | 1000-01-01/9999-12-31                                        | YYYY-MM-DD          | 日期值                   |
| TIME      | 3             | '-838:59:59'/'838:59:59'                                     | HH:MM:SS            | 时间值或持续时间         |
| YEAR      | 1             | 1901/2155                                                    | YYYY                | 年份值                   |
| DATETIME  | 8             | 1000-01-01 00:00:00/9999-12-31 23:59:59                      | YYYY-MM-DD HH:MM:SS | 混合日期和时间值         |
| TIMESTAMP | 4             | 1970-01-01 00:00:00/2038结束时间是第 **2147483647** 秒，北京时间 **2038-1-19 11:14:07**，格林尼治时间 2038年1月19日 凌晨 03:14:07 | YYYYMMDD HHMMSS     | 混合日期和时间值，时间戳 |
## 字符串
| 类型       | 大小                  | 用途                            |
| :--------- | :-------------------- | :------------------------------ |
| CHAR       | 0-255 bytes           | 定长字符串                      |
| VARCHAR    | 0-65535 bytes         | 变长字符串                      |
| TINYBLOB   | 0-255 bytes           | 不超过 255 个字符的二进制字符串 |
| TINYTEXT   | 0-255 bytes           | 短文本字符串                    |
| BLOB       | 0-65 535 bytes        | 二进制形式的长文本数据          |
| TEXT       | 0-65 535 bytes        | 长文本数据                      |
| MEDIUMBLOB | 0-16 777 215 bytes    | 二进制形式的中等长度文本数据    |
| MEDIUMTEXT | 0-16 777 215 bytes    | 中等长度文本数据                |
| LONGBLOB   | 0-4 294 967 295 bytes | 二进制形式的极大文本数据        |
| LONGTEXT   | 0-4 294 967 295 bytes | 极大文本数据                    |

![image-20210706135508764](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210706135508764.png)

> 1bit 位  1字节=8bit  1k=1024字节 1兆=1024k  1G=1023M  1T=1024G

## 常用Java映射

| Mysql    | Java | 包   | 字段名 |      | 备注 |
| -------- | ---- | ---- | ------ | ---- | ---- |
| datetime | Date |      |        |      |      |
|          |      |      |        |      |      |
|          |      |      |        |      |      |
|          |      |      |        |      |      |
|          |      |      |        |      |      |
|          |      |      |        |      |      |
|          |      |      |        |      |      |
|          |      |      |        |      |      |
|          |      |      |        |      |      |

# 数据库设计

## 名称

**表是否：**is_xxx   类型：任何字段非负数必须是 unsigned tinyint (1是 0否)     POJO中需要从is_xxx   去掉is前缀映射到 xxx

**表名、字段名：**全小写【windows不区分大小写，linux区分】、非数字开头、两个下划线中不能只是数字、表名不使用复数。不使用保留字。表名称建议：业务名称_表的作用。

**索引名：**主键索引：pk_xxx、唯一索引名：uk_xxx、普通索引：idx_xxx 

**小数：**decimal （超过其范围建议拆成整数和小数分开存储），**禁用float、double** 【精度问题】

**字符串：**数据长度几乎相等用char定长，vachar为可变长字符串，长度超过5000 时 使用text类型独立表存储

**表单必备三字段：**id（bigint unsigned）无符号即正值范围更大、gmt_create / gmt_modified(datetime,前者现在时表示主动式创建，后者过去分词表示被动式更新)

**库名：**建议同应用名

**备注：**修改字段含义与状态添加时及时更新备注。

**其他：**字段适当长度冗余，单标数据超过500万行或容量超过2GB才建议分库分表。三年的时间估计。

## 索引

1. 具有唯一特性的字段，即使是组合字段，也必须建成唯一索引
2. 超过三个表禁止join。需要join的字段，数据类型保持绝对一致；多表关联查询时，保证被关联的字段需要有索引。
3. 在varchar字段上建立索引时，必须指定索引长度，没必要对全字段建立索引，根据实际文本区分度决定索引长度
4. 页面搜索严禁左模糊或者全模糊，如果需要请走搜索引擎来解决。
5. 如果有order by的场景，请注意利用索引的有序性。order by 最后的字段是组合索引的一部分，并且放在索引组合顺序的最后，避免出现file_sort的情况，影响查询性能。
6. 利用覆盖索引来进行查询操作，避免回表。
7. 利用延迟关联或者子查询优化超多分页场景。
8. SQL性能优化的目标：至少要达到 range 级别，要求是ref级别，如果可以是consts最好。
9. 建组合索引的时候，区分度最高的在最左边。
10. 防止因字段类型不同造成的隐式转换，导致索引失效。

## 语句

1. 不要使用count(列名)或count(常量)来替代count(*)，count(*)是SQL92定义的标准统计行数的语法，跟数据库无关，跟NULL和非NULL无关。 说明：count(*)会统计值为NULL的行，而count(列名)不会统计此列为NULL值的行。
2. 】count(distinct col) 计算该列除NULL之外的不重复行数，注意 count(distinct col1, col2) 如果其中一列全为NULL，那么即使另一列有不同的值，也返回为0。
3. 当某一列的值全是NULL时，count(col)的返回结果为0，但sum(col)的返回结果为NULL，因此使用sum()时需注意NPE问题。 正例：可以使用如下方式来避免sum的NPE问题：SELECT IFNULL(SUM(column), 0) FROM table;
4. 使用ISNULL()来判断是否为NULL值。 说明：NULL与任何值的直接比较都为NULL。 1） NULL<>NULL的返回结果是NULL，而不是false。 2） NULL=NULL的返回结果是NULL，而不是true。 3） NULL<>1的返回结果是NULL，而不是true。
5. 代码中写分页查询逻辑时，若count为0应直接返回，避免执行后面的分页语句。
6. 不得使用外键与级联，一切外键概念必须在应用层解决。
7. 禁止使用存储过程，存储过程难以调试和扩展，更没有移植性。
8. 数据订正（特别是删除或修改记录操作）时，要先select，避免出现误删除，确认无误才能执行更新语句。
9. 对于数据库中表记录的查询和变更，只要涉及多个表，都需要在列名前加表的别名（或表名）进行限定，否则同名字段存在多表中会报错。别名前加as使别名更容易识别。
10. n操作能避免则避免，若实在避免不了，需要仔细评估in后边的集合元素数量，控制在1000个之内。

## ORM映射

1. 一律不要使用 * 作为查询的字段列表，需要哪些字段必须明确写明。因为会 1）增加查询分析器解析成本。2）增减字段容易与resultMap配置不一致。3）无用字段增加网络消耗，尤其是text类型的字段。
2. POJO类的布尔属性不能加is，而数据库字段必须加is_，要求在resultMap中进行字段与属性之间的映射。
3. 不要用resultClass当返回参数，即使所有类属性名与数据库字段一一对应，也需要定义<resultMap>；反过来，每一个表也必然有一个<resultMap>与之对应。配置映射关系，使字段与DO类解耦，方便维护。
4. sql.xml配置参数使用：#{}，#param# 不要使用${} 此种方式容易出现SQL注入
5. iBATIS自带的queryForList(String statementName,int start,int size)不推荐使用。
6. 不允许直接拿HashMap与Hashtable作为查询结果集的输出。
7. 更新数据表记录时，必须同时更新记录对应的gmt_modified字段值为当前时间。
8. 执行SQL时，不要更新无改动的字段，一是易出错；二是效率低；三是增加binlog存储
9. @Transactional事务不要滥用。事务会影响数据库的QPS，另外使用事务的地方需要考虑各方面的回滚方案，包括缓存回滚、搜索引擎回滚、消息补偿、统计修正等。
10. <isEqual>中的compareValue是与属性值对比的常量，一般是数字，表示相等时带上此条件；<isNotEmpty>表示不为空且不为null时执行；<isNotNull>表示不为null值时执行。

## [主键UUID  or  INT 自增？](https://blog.csdn.net/Liu_Wd/article/details/53011128)



# 阿里规范摘要

# 数据库字段设计及对应关系

# 数据库三原则

# 数据库设计工具

# 如何设计数据库

# 应用

## 分库分表Mycat

阿里巴巴规范手册：【推荐】单表行数超过500万行或者单表容量超过2GB，才推荐进行分库分表。 说明：如果预计三年后的数据量根本达不到这个级别，请不要在创建表时就分库分表。

### 







