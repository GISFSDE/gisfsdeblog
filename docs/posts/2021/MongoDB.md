---
index: 2
icon: markdown
title: MongoDB
date: 2022-06-06
category:
  - MongoDB
tag:
  - MongoDB
---

> 最像关系型数据库的非关系型数据库

<!-- more -->

> # 新学四问
>
> **WHY【与前代优化了什么，弥补了什么空白】：**
> **WHAT【框架，思维导图，主题框架】：**
> **HOW【如何记忆，学习资源】**：[菜鸟](https://www.runoob.com/mongodb/mongodb-intro.html)、[官方文档](https://docs.mongodb.com/manual/introduction/)
> **LEVEL【不是每个都学精】：**

# 进度：【[一天](https://www.runoob.com/mongodb/mongodb-operators.html)】

# 快查

| 命令                               | 解释                     | 备注 |
| ---------------------------------- | ------------------------ | ---- |
| show dbs                           | 查看所有数据库           |      |
| db                                 | 显示当前数据库对象或集合 |      |
| use                                | 连接到一个指定的数据库   |      |
| db.createCollection(name, options) | 创建集合                 |      |
| show collections 或 show tables    | 查看集合                 |      |
|                                    |                          |      |
|                                    |                          |      |
|                                    |                          |      |
|                                    |                          |      |

关系图

# 一、简介

C++语言编写的，是一个基于分布式文件存储的开源数据库系统。

在高负载的情况下，添加更多的节点，可以保证服务器性能。

MongoDB 旨在为WEB应用提供可扩展的高性能数据存储解决方案。

MongoDB 将数据存储为一个文档，数据结构由键值(key=>value)对组成。MongoDB 文档类似于 JSON 对象。字段值可以包含其他文档，数组及文档数组。

环境：win10

# 二、基础概念

| SQL术语/概念 | MongoDB术语/概念 | 解释/说明                           |
| :----------- | :--------------- | :---------------------------------- |
| database     | database         | 数据库                              |
| table        | collection       | 数据库表/集合                       |
| row          | document         | 数据记录行/文档                     |
| column       | field            | 数据字段/域                         |
| index        | index            | 索引                                |
| table joins  |                  | 表连接,MongoDB不支持                |
| primary key  | primary key      | 主键,MongoDB自动将_id字段设置为主键 |

默认数据库为db文件夹需要自己创建，数据放在data文件夹中

## 文档(Document)

​		文档是一组键值(key-value)对(即 BSON)。MongoDB 的文档不需要设置相同的字段，并且相同的字段不需要相同的数据类型，这与关系型数据库有很大的区别，也是 MongoDB 非常突出的特点。一个简单的文档例子如下：

```
{"site":"www.runoob.com", "name":"菜鸟教程"}
```

下表列出了 RDBMS 与 MongoDB 对应的术语：

|       RDBMS        | MongoDB                           |
| :----------------: | :-------------------------------- |
|       数据库       | 数据库                            |
|        表格        | 集合                              |
|         行         | 文档                              |
|         列         | 字段                              |
|       表联合       | 嵌入文档                          |
|        主键        | 主键 (MongoDB 提供了 key 为 _id ) |
| 数据库服务和客户端 |                                   |
|   Mysqld/Oracle    | mongod                            |
|   mysql/sqlplus    | mongo                             |

需要注意的是：

1. 文档中的键/值对是**有序**的。
2. 文档中的值不仅可以是在双引号里面的字符串，还可以是其他几种数据类型（甚至可以是整个嵌入的文档)。
3. MongoDB**区分类型和大小写**。
4. MongoDB的文档**不能有重复的键**。
5. 文档的**键是字符串**。除了少数例外情况，键可以使用任意UTF-8字符。

**文档键命名规范**：

- 键不能含有\0 (空字符)。这个字符用来表示键的结尾。
- .和$有特别的意义，只有在特定环境下才能使用。
- 以下划线"_"开头的键是保留的(不是严格要求的)。

------

## 集合 / 表

集合就是 MongoDB 文档组，类似于 RDBMS （关系数据库管理系统：Relational Database Management System)中的表格。

集合存在于数据库中，集合**没有固定的结构**，这意味着你在对集合**可以插入不同格式和类型的数据**，但通常情况下我们插入集合的数据都会有一定的关联性。



比如，我们可以将以下不同数据结构的文档插入到集合中：

```
{"site":"www.baidu.com"}
{"site":"www.google.com","name":"Google"}
{"site":"www.runoob.com","name":"菜鸟教程","num":5}
```

当**第一个文档插入时，集合就会被创建**。

### 合法的集合名

- 集合名不能是空字符串""。
- 集合名不能含有\0字符（空字符)，这个字符表示集合名的结尾。
- 集合名不能以"system."开头，这是为系统集合保留的前缀。
- 用户创建的集合名字不能含有保留字符。有些驱动程序的确支持在集合名里面包含，这是因为某些系统生成的集合中包含该字符。除非你要访问这种系统创建的集合，否则千万不要在名字里出现$。　

如下实例：

```
db.col.findOne()
```

### capped collections

Capped collections 就是**固定大小的collection**。

它有**很高的性能以及队列过期的特性**(过期按照插入的顺序). 有点和 "RRD" 概念类似。

Capped collections 是高性能自动的维护对象的插入顺序。它非常**适合类似记录日志的功能**，和标准的 collection 不同，你必须要显式的创建一个capped collection，**指定**一个 collection 的**大小**，**单位是字节**。collection 的数据存储空间值提前分配的。

Capped collections 可以按照文档的插入顺序保存到集合中，而且这些文档在磁盘上存放位置也是按照插入顺序来保存的，所以当我们更新Capped collections 中文档的时候，更新后的文档不可以超过之前文档的大小，这样话就可以确保所有文档在磁盘上的位置一直保持不变。

由于 Capped collection 是按照文档的插入顺序而不是使用索引确定插入位置，这样的话可以提高增添数据的效率。MongoDB 的操作日志文件 oplog.rs 就是利用 Capped Collection 来实现的。

要注意的是指定的存储大小包含了数据库的头信息。

```
db.createCollection("mycoll", {capped:true, size:100000})
```

- 在 capped collection 中，你能添加新的对象。
- **能进行更新，然而，对象不会增加存储空间。如果增加，更新就会失败** 。
- 使用 Capped Collection 不能删除一个文档，可以使用 drop() 方法删除 collection 所有的行。
- 删除之后，你必须显式的重新创建这个 collection。
- 在**32bit**机器中，capped collection **最大存储为 1e9( 1X109)个字节**。

------

## 元数据

数据库的信息是存储在集合中。它们使用了系统的命名空间：

```
dbname.system.*
```

在MongoDB数据库中名字空间 \<dbname>.system.* 是包含多种系统信息的特殊集合(Collection)，如下:

| 集合命名空间             | 描述                                      |
| :----------------------- | :---------------------------------------- |
| dbname.system.namespaces | 列出所有名字空间。                        |
| dbname.system.indexes    | 列出所有索引。                            |
| dbname.system.profile    | 包含数据库概要(profile)信息。             |
| dbname.system.users      | 列出所有可访问数据库的用户。              |
| dbname.local.sources     | 包含复制对端（slave）的服务器信息和状态。 |

对于修改系统集合中的对象有如下限制。

在system.indexes插入数据，可以创建索引。但除此之外该表信息是不可变的(特殊的drop index命令将自动更新相关信息)。

system.users是可修改的。 system.profile是可删除的。

------

## MongoDB 数据类型

下表为MongoDB中常用的几种数据类型。

| 数据类型           | 描述                                                         |
| :----------------- | :----------------------------------------------------------- |
| String             | 字符串。存储数据常用的数据类型。在 MongoDB 中，UTF-8 编码的字符串才是合法的。 |
| Integer            | 整型数值。用于存储数值。根据你所采用的服务器，可分为 32 位或 64 位。 |
| Boolean            | 布尔值。用于存储布尔值（真/假）。                            |
| Double             | 双精度浮点值。用于存储浮点值。                               |
| Min/Max keys       | 将一个值与 BSON（二进制的 JSON）元素的最低值和最高值相对比。 |
| Array              | 用于将数组或列表或多个值存储为一个键。                       |
| Timestamp          | 时间戳。记录文档修改或添加的具体时间。                       |
| Object             | **用于内嵌文档。**                                           |
| Null               | 用于创建空值。                                               |
| Symbol             | 符号。该数据类型基本上等同于字符串类型，但不同的是，它一般用于采用特殊符号类型的语言。 |
| Date               | 日期时间。用 UNIX 时间格式来存储当前日期或时间。你可以指定自己的日期时间：创建 Date 对象，传入年月日信息。 |
| Object ID          | 对象 ID。用于创建文档的 ID。                                 |
| Binary Data        | 二进制数据。用于存储二进制数据。                             |
| Code               | **代码类型。用于在文档中存储 JavaScript 代码。**             |
| Regular expression | **正则表达式类型。用于存储正则表达式。**                     |

下面说明下几种重要的数据类型。

### ObjectId

ObjectId 类似唯一主键，可以很快的去生成和排序，包含 12 bytes，含义是：

- 前 4 个字节表示创建 **unix** 时间戳,格林尼治时间 **UTC** 时间，比北京时间晚了 8 个小时
- 接下来的 3 个字节是机器标识码
- 紧接的两个字节由进程 id 组成 PID
- 最后三个字节是随机数

![img](https://www.runoob.com/wp-content/uploads/2013/10/2875754375-5a19268f0fd9b_articlex.jpeg)

MongoDB 中存储的文档必须有一个 _id 键。这个键的值可以是任何类型的，默认是个 ObjectId 对象

由于 ObjectId 中保存了创建的时间戳，所以你不需要为你的文档保存时间戳字段，你可以通过 getTimestamp 函数来获取文档的创建时间:

```
> var newObject = ObjectId()
> newObject.getTimestamp()
ISODate("2017-11-25T07:21:10Z")
```

ObjectId 转为字符串

```
> newObject.str
5a1919e63df83ce79df8b38f
```

### 字符串

**BSON 字符串都是 UTF-8 编码。**

### 时间戳

BSON 有一个特殊的时间戳类型用于 MongoDB 内部使用，与普通的 日期 类型不相关。 时间戳值是一个 64 位的值。其中：

- 前32位是一个 time_t 值（与Unix新纪元相差的秒数）
- 后32位是在某秒中操作的一个递增的`序数`

在单个 mongod 实例中，时间戳值通常是唯一的。

在复制集中， oplog 有一个 ts 字段。这个字段中的值使用BSON时间戳表示了操作时间。

> BSON 时间戳类型主要用于 MongoDB 内部使用。在大多数情况下的应用开发中，你可以使用 BSON 日期类型。

### 日期

表示当前距离 Unix新纪元（1970年1月1日）的毫秒数。日期类型是有符号的, 负数表示 1970 年之前的日期。

```
> var mydate1 = new Date()     //格林尼治时间
> mydate1
ISODate("2018-03-04T14:58:51.233Z")
> typeof mydate1
object
> var mydate2 = ISODate() //格林尼治时间
> mydate2
ISODate("2018-03-04T15:00:45.479Z")
> typeof mydate2
object
```

这样创建的时间是日期类型，可以使用 JS 中的 Date 类型的方法。

返回一个时间类型的字符串：

```
> var mydate1str = mydate1.toString()
> mydate1str
Sun Mar 04 2018 14:58:51 GMT+0000 (UTC) 
> typeof mydate1str
string
```

或者

```
> Date()
Sun Mar 04 2018 15:02:59 GMT+0000 (UTC) 
```

# 三、安装（win）

## [下载](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)

## [安装](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)

## 创建默认数据文件夹   \data\db 与  \data\log \MongoDB.log文件

## 手动运行MongoDB服务器

```bash
#安装目录\bin\mongod --dbpath 自己定义的数据文件夹（c:\data\db）
F:\Softs\Installed\MongoDB\bin\mongod --dbpath F:\Softs\Installed\MongoDB\data\db


#成功结果：
{"t":{"$date":"2022-01-18T14:50:04.760+08:00"},"s":"I",  "c":"CONTROL",  "id":23285,   "ctx":"-","msg":"Automatically disabling TLS 1.0, to force-enable TLS 1.0 specify --sslDisabledProtocols 'none'"}
{"t":{"$date":"2022-01-18T14:50:04.761+08:00"},"s":"I",  "c":"NETWORK",  "id":4915701, "ctx":"-","msg":"Initialized wire specification","attr":{"spec":{"incomingExternalClient":{"minWireVersion":0,"maxWireVersion":13},"incomingInternalClient":{"minWireVersion":0,"maxWireVersion":13},"outgoing":{"minWireVersion":0,"maxWireVersion":13},"isInternalClient":true}}}
。。。
```

# 四、连接

```bash
#一
#将其配置成服务后启动服务
mongod --dbpath "F:\Softs\Installed\MongoDB\data\db" --logpath "F:\Softs\Installed\MongoDB\data\log\MongoDB.log" --install --serviceName "MongoDB"
PS F:\Softs\Installed\MongoDB\bin> net start mongodb
请求的服务已经启动。

#二
#配置bin目录环境变量后，用mongo连接
C:\Users\Administrator>mongo
MongoDB shell version v5.0.6-rc0
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("4f5de15b-0c12-4dde-8cc4-325ae6b23114") }
MongoDB server version: 5.0.6-rc0



#关闭

#不为系统服务时
关闭mongo命令窗口
#系统服务
NET stop MongoDB (关闭服务)

#删除进程
mongod --dbpath "d:\mongodb\data\db" --logpath "d:\mongodb\data\log\MongoDB.log" --remove --serviceName "MongoDB"
```

# 五、数据库

```bash
#创建数据库，没有创建，有则切换，

#数据命名规则：
#不能是空字符串（"")。
#不得含有' '（空格)、.、$、/、\和\0 (空字符)。
#应全部小写。
#最多64字节。

#有一些数据库名是保留的，可以直接访问这些有特殊作用的数据库。
#admin： 从权限的角度来看，这是"root"数据库。要是将一个用户添加到这个数据库，这个用户自动继承所有数据库的权限。一些特定的服务器端命令也只能从这个数据库运行，比如列出所有的数据库或者关闭服务器。
#local: 这个数据永远不会被复制，可以用来存储限于本地单台服务器的任意集合
#config: 当Mongo用于分片设置时，config数据库在内部使用，用于保存分片的相关信息。

> use user
switched to db user
#查看当前数据库名
> db
user
#插入数据
> db.user.insert({"name":"lxl"})
WriteResult({ "nInserted" : 1 })
#查看数据库列表，有数据的数据库才会显示
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
user    0.000GB
#删除数据库
> use user
switched to db user
> db.dropDatabase()
{ "ok" : 1 }
```

# 六、集合

```bash
#查看所有数据库
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
> use student
switched to db student
#创建集合数据
> db.createCollection("students")
{ "ok" : 1 }
#查看集合show collections 或 show tables
> show tables
students
> db.student.drop()
false
#删除集合数据
> db.students.drop()
true
> show tables
>
```



options 参数：

| 字段        | 类型 | 描述                                                         |
| :---------- | :--- | :----------------------------------------------------------- |
| capped      | 布尔 | （可选）如果为 true，则创建固定集合。固定集合是指有着固定大小的集合，当达到最大值时，它会自动覆盖最早的文档。 **当该值为 true 时，必须指定 size 参数。** |
| autoIndexId | 布尔 | 3.2 之后不再支持该参数。（可选）如为 true，自动在 _id 字段创建索引。默认为 false。 |
| size        | 数值 | （可选）为固定集合指定一个最大值，即字节数。 **如果 capped 为 true，也需要指定该字段。** |
| max         | 数值 | （可选）指定固定集合中包含文档的最大数量。                   |

# 七、文档

## 增

```bash
> show tables
> db
student
> show collections
> db
student
#插入文档  insert（）
> db.student.insert({name:"lxl"})
WriteResult({ "nInserted" : 1 })
#查看文档  find()
> db.student.find()
{ "_id" : ObjectId("61e7add36e48f4bf534731d6"), "name" : "lxl" }
# 将文档声明成变量再插入
> document=({age:18})
{ "age" : 18 }
> db.student.insert(document)
WriteResult({ "nInserted" : 1 })
> db.student.find()
{ "_id" : ObjectId("61e7add36e48f4bf534731d6"), "name" : "lxl" }
{ "_id" : ObjectId("61e7ae456e48f4bf534731d7"), "age" : 18 }
> document=({"_id" : ObjectId("61e7ae456e48f4bf534731d7"),age:19})
{ "_id" : ObjectId("61e7ae456e48f4bf534731d7"), "age" : 19 }
# 插入文档 save（），有_id时重复则修改
> db.student.save(document)
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.student.find()
{ "_id" : ObjectId("61e7add36e48f4bf534731d6"), "name" : "lxl" }
{ "_id" : ObjectId("61e7ae456e48f4bf534731d7"), "age" : 19 }
> document=({"_id" : ObjectId("61e7ae456e48f4bf534731d7"),age:20})
{ "_id" : ObjectId("61e7ae456e48f4bf534731d7"), "age" : 20 }
#插入文档 insetOne（）id重复报错  db.collection.insertMany()一次插入多个文档
> db.student.insertOne(document)
WriteError({
        "index" : 0,
        "code" : 11000,
        "errmsg" : "E11000 duplicate key error collection: student.student index: _id_ dup key: { _id: ObjectId('61e7ae456e48f4bf534731d7') }",
        "op" : {
                "_id" : ObjectId("61e7ae456e48f4bf534731d7"),
                "age" : 20
        }
}) :
WriteError({
        "index" : 0,
        "code" : 11000,
        "errmsg" : "E11000 duplicate key error collection: student.student index: _id_ dup key: { _id: ObjectId('61e7ae456e48f4bf534731d7') }",
        "op" : {
                "_id" : ObjectId("61e7ae456e48f4bf534731d7"),
                "age" : 20
        }
})
WriteError@src/mongo/shell/bulk_api.js:465:48
mergeBatchResults@src/mongo/shell/bulk_api.js:871:49
executeBatch@src/mongo/shell/bulk_api.js:940:13
Bulk/this.execute@src/mongo/shell/bulk_api.js:1182:21
DBCollection.prototype.insertOne@src/mongo/shell/crud_api.js:264:9
@(shell):1:1
#插入文档replaceOne（）
> db.student.replaceOne(document)
uncaught exception: TypeError: can't convert undefined to object :
DBCollection.prototype.replaceOne@src/mongo/shell/crud_api.js:477:16
@(shell):1:1
> db.student.find()
{ "_id" : ObjectId("61e7add36e48f4bf534731d6"), "name" : "lxl" }
{ "_id" : ObjectId("61e7ae456e48f4bf534731d7"), "age" : 19 }
>
```

## 改

模板

```bash
db.collection.update(
   \<query>,
   \<update>,
   {
     upsert: \<boolean>,
     multi: \<boolean>,
     writeConcern: \<document>
   }
)
```

**参数说明：**

- **query** : update的查询条件，类似sql update查询内where后面的。
- **update** : update的对象和一些更新的操作符（如$,$inc...）等，也可以理解为sql update查询内set后面的
- **upsert** : 可选，如果不存在update的记录，是否插入objNew,true为插入，默认是false，不插入。
- **multi** : 可选，mongodb 默认是false,只更新找到的第一条记录，如果这个参数为true,就把按条件查出来多条记录全部更新。
- **writeConcern** :可选，抛出异常的级别。

```bash
> db.student.find()
{ "_id" : ObjectId("61e7add36e48f4bf534731d6"), "name" : "lxl" }
{ "_id" : ObjectId("61e7ae456e48f4bf534731d7"), "age" : 19 }
#更新第一条文档
> db.student.update({"name":"lxl"},{$set:{"name":"lll"}})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.student.find()
{ "_id" : ObjectId("61e7add36e48f4bf534731d6"), "name" : "lll" }
{ "_id" : ObjectId("61e7ae456e48f4bf534731d7"), "age" : 19 }
> document=({age:21})
{ "age" : 21 }
> db.student.insert(document)
WriteResult({ "nInserted" : 1 })
> db.student.find()
{ "_id" : ObjectId("61e7add36e48f4bf534731d6"), "name" : "lll" }
{ "_id" : ObjectId("61e7ae456e48f4bf534731d7"), "age" : 19 }
{ "_id" : ObjectId("61e7b1736e48f4bf534731d8"), "age" : 21 }
> document=({age:21})
{ "age" : 21 }
> db.student.insert(document)
WriteResult({ "nInserted" : 1 })
> db.student.find()
{ "_id" : ObjectId("61e7add36e48f4bf534731d6"), "name" : "lll" }
{ "_id" : ObjectId("61e7ae456e48f4bf534731d7"), "age" : 19 }
{ "_id" : ObjectId("61e7b1736e48f4bf534731d8"), "age" : 21 }
{ "_id" : ObjectId("61e7b19a6e48f4bf534731d9"), "age" : 21 }
#更新类型必须相同
> db.student.update({"age":"21"},{$set:{"age":"22"}})
WriteResult({ "nMatched" : 0, "nUpserted" : 0, "nModified" : 0 })
#多条文档相同只更新第一条
> db.student.update({"age":21},{$set:{"age":22}})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.student.find()
{ "_id" : ObjectId("61e7add36e48f4bf534731d6"), "name" : "lll" }
{ "_id" : ObjectId("61e7ae456e48f4bf534731d7"), "age" : 19 }
{ "_id" : ObjectId("61e7b1736e48f4bf534731d8"), "age" : 22 }
{ "_id" : ObjectId("61e7b19a6e48f4bf534731d9"), "age" : 21 }
> db.student.update({"age":22},{$set:{"age":21}})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.student.find()
{ "_id" : ObjectId("61e7add36e48f4bf534731d6"), "name" : "lll" }
{ "_id" : ObjectId("61e7ae456e48f4bf534731d7"), "age" : 19 }
{ "_id" : ObjectId("61e7b1736e48f4bf534731d8"), "age" : 21 }
{ "_id" : ObjectId("61e7b19a6e48f4bf534731d9"), "age" : 21 }
#,{multi:true}将全部符合条件的文档都更新
> db.student.update({"age":21},{$set:{"age":22}},{multi:true})
WriteResult({ "nMatched" : 2, "nUpserted" : 0, "nModified" : 2 })
> db.student.find()
{ "_id" : ObjectId("61e7add36e48f4bf534731d6"), "name" : "lll" }
{ "_id" : ObjectId("61e7ae456e48f4bf534731d7"), "age" : 19 }
{ "_id" : ObjectId("61e7b1736e48f4bf534731d8"), "age" : 22 }
{ "_id" : ObjectId("61e7b19a6e48f4bf534731d9"), "age" : 22 }
>
```

## 删

```
db.collection.remove(
   \<query>,
   {
     justOne: \<boolean>,
     writeConcern: \<document>
   }
)
```

**参数说明：**

- **query** :（可选）删除的文档的条件。
- **justOne** : （可选）如果设为 true 或 1，则只删除一个文档，如果不设置该参数，或使用默认值 false，则删除所有匹配条件的文档。
- **writeConcern** :（可选）抛出异常的级别

```bash
> db.student.find({"age":22})
{ "_id" : ObjectId("61e7b1736e48f4bf534731d8"), "age" : 22 }
{ "_id" : ObjectId("61e7b19a6e48f4bf534731d9"), "age" : 22 }
#删除所有复合条件的文档
> db.student.remove({"age":22})
WriteResult({ "nRemoved" : 2 })
> db.student.find()
{ "_id" : ObjectId("61e7add36e48f4bf534731d6"), "name" : "lll" }
{ "_id" : ObjectId("61e7ae456e48f4bf534731d7"), "age" : 19 }
> db.student.insert(document)
WriteResult({ "nInserted" : 1 })
> db.student.insert(document)
WriteResult({ "nInserted" : 1 })
> db.student.find()
{ "_id" : ObjectId("61e7add36e48f4bf534731d6"), "name" : "lll" }
{ "_id" : ObjectId("61e7ae456e48f4bf534731d7"), "age" : 19 }
{ "_id" : ObjectId("61e7b3d76e48f4bf534731da"), "age" : 21 }
{ "_id" : ObjectId("61e7b3d96e48f4bf534731db"), "age" : 21 }
#设置justOne为true或1，删除符合条件的第一条文档
> db.student.remove({"age":22},1)
WriteResult({ "nRemoved" : 0 })
> db.student.remove({"age":21},1)
WriteResult({ "nRemoved" : 1 })
> db.student.find()
{ "_id" : ObjectId("61e7add36e48f4bf534731d6"), "name" : "lll" }
{ "_id" : ObjectId("61e7ae456e48f4bf534731d7"), "age" : 19 }
{ "_id" : ObjectId("61e7b3d96e48f4bf534731db"), "age" : 21 }
#删除所有文档
> db.student.remove()
uncaught exception: Error: remove needs a query :
DBCollection.prototype._parseRemove@src/mongo/shell/collection.js:364:15
DBCollection.prototype.remove@src/mongo/shell/collection.js:394:18
@(shell):1:1
> db.student.remove({})
WriteResult({ "nRemoved" : 3 })
> db.student.find()
>
```

## 查

```
db.collection.find(query, projection)
```

- **query** ：可选，使用查询操作符指定查询条件
- **projection** ：可选，使用投影操作符指定返回的键。查询时返回文档中所有键值， 只需省略该参数即可（默认省略）。

如果你需要以易读的方式来读取数据，可以使用 pretty() 方法，语法格式如下：

```
>db.col.find().pretty()
```

pretty() 方法以格式化的方式来显示所有文档。

```bash
> db.student.remove({})
WriteResult({ "nRemoved" : 2 })
> db.student.insert({"age":22,name:"a1"})
WriteResult({ "nInserted" : 1 })
> db.student.insert({"age":11,name:"a2"})                                                                         
WriteResult({ "nInserted" : 1 })
#查询第一个
> db.student.findOne()
{ "_id" : ObjectId("61e7b65b6e48f4bf534731dd"), "age" : 22, "name" : "a1" }
> db.student.find().pretty()
{ "_id" : ObjectId("61e7b65b6e48f4bf534731dd"), "age" : 22, "name" : "a1" }
{ "_id" : ObjectId("61e7b6646e48f4bf534731de"), "age" : 11, "name" : "a2" }

#查询全部
> db.student.find()
{ "_id" : ObjectId("61e7b65b6e48f4bf534731dd"), "age" : 22, "name" : "a1" }
{ "_id" : ObjectId("61e7b6646e48f4bf534731de"), "age" : 11, "name" : "a2" }
#条件查询  小于$lt
> db.student.find({age:{$lt:20}})
{ "_id" : ObjectId("61e7b6646e48f4bf534731de"), "age" : 11, "name" : "a2" }
#查询小于$lt的指定字段
> db.student.find({age:{$lt:20}}，{"_id":1})
{ "_id" : ObjectId("61e7b6646e48f4bf534731de")}
#查询小于$lt的指定外字段
> db.student.find({age:{$lt:20}}，{"_id":0})
{ "age" : 11, "name" : "a2" }
#条件查询  小于或等于$lt
> db.student.find({age:{$lte:22}})
{ "_id" : ObjectId("61e7b65b6e48f4bf534731dd"), "age" : 22, "name" : "a1" }
{ "_id" : ObjectId("61e7b6646e48f4bf534731de"), "age" : 11, "name" : "a2" }
#条件查询  大于$lt
> db.student.find({age:{$gt:20}})
{ "_id" : ObjectId("61e7b65b6e48f4bf534731dd"), "age" : 22, "name" : "a1" }
#条件查询  大于或等于$lt
> db.student.find({age:{$gte:11}})
{ "_id" : ObjectId("61e7b65b6e48f4bf534731dd"), "age" : 22, "name" : "a1" }
{ "_id" : ObjectId("61e7b6646e48f4bf534731de"), "age" : 11, "name" : "a2" }
#条件查询  不等于$lt
> db.student.find({age:{$ne:11}})
{ "_id" : ObjectId("61e7b65b6e48f4bf534731dd"), "age" : 22, "name" : "a1" }
> db.student.insert({"age":11,name:"a3"})
WriteResult({ "nInserted" : 1 })
> db.student.find()
{ "_id" : ObjectId("61e7b65b6e48f4bf534731dd"), "age" : 22, "name" : "a1" }
{ "_id" : ObjectId("61e7b6646e48f4bf534731de"), "age" : 11, "name" : "a2" }
{ "_id" : ObjectId("61e7b6f66e48f4bf534731df"), "age" : 11, "name" : "a3" }
#条件查询  and  $ne
> db.student.find({age:{$ne:22},name:"a2"})
{ "_id" : ObjectId("61e7b6646e48f4bf534731de"), "age" : 11, "name" : "a2" }
> db.student.insert({"age":33,name:"a3"})
WriteResult({ "nInserted" : 1 })
> db.student.find()
{ "_id" : ObjectId("61e7b65b6e48f4bf534731dd"), "age" : 22, "name" : "a1" }
{ "_id" : ObjectId("61e7b6646e48f4bf534731de"), "age" : 11, "name" : "a2" }
{ "_id" : ObjectId("61e7b6f66e48f4bf534731df"), "age" : 11, "name" : "a3" }
{ "_id" : ObjectId("61e7b78a6e48f4bf534731e0"), "age" : 33, "name" : "a3" }
#条件查询  or $or  缺少冒号
> db.student.find({$or[age:{$ne:11},name:"a2"]})
uncaught exception: SyntaxError: missing : after property id :
@(shell):1:20
#条件查询  or $or  缺少括号
> db.student.find({$or:[age:{$ne:11},name:"a2"]})
uncaught exception: SyntaxError: missing ] after element list :
@(shell):1:25
#条件查询  or $or
> db.student.find({$or:[{age:{$ne:11}},{name:"a2"}]})
{ "_id" : ObjectId("61e7b65b6e48f4bf534731dd"), "age" : 22, "name" : "a1" }
{ "_id" : ObjectId("61e7b6646e48f4bf534731de"), "age" : 11, "name" : "a2" }
{ "_id" : ObjectId("61e7b78a6e48f4bf534731e0"), "age" : 33, "name" : "a3" }
#条件查询  or + and
> db.student.find({name:"a3",$or:[{age:{$ne:11}},{name:"a2"}]})
{ "_id" : ObjectId("61e7b78a6e48f4bf534731e0"), "age" : 33, "name" : "a3" }
>
```

### $type 操作符

| **类型**                | **数字** | **备注**         |
| :---------------------- | :------- | :--------------- |
| Double                  | 1        |                  |
| String                  | 2        |                  |
| Object                  | 3        |                  |
| Array                   | 4        |                  |
| Binary data             | 5        |                  |
| Undefined               | 6        | 已废弃。         |
| Object id               | 7        |                  |
| Boolean                 | 8        |                  |
| Date                    | 9        |                  |
| Null                    | 10       |                  |
| Regular Expression      | 11       |                  |
| JavaScript              | 13       |                  |
| Symbol                  | 14       |                  |
| JavaScript (with scope) | 15       |                  |
| 32-bit integer          | 16       |                  |
| Timestamp               | 17       |                  |
| 64-bit integer          | 18       |                  |
| Min key                 | 255      | Query with `-1`. |
| Max key                 | 127      |                  |

```bash
> db.student.insert({"age":33,name:1})
WriteResult({ "nInserted" : 1 })
> db.student.find()
{ "_id" : ObjectId("61e7b65b6e48f4bf534731dd"), "age" : 22, "name" : "a1" }
{ "_id" : ObjectId("61e7b6646e48f4bf534731de"), "age" : 11, "name" : "a2" }
{ "_id" : ObjectId("61e7b6f66e48f4bf534731df"), "age" : 11, "name" : "a3" }
{ "_id" : ObjectId("61e7b78a6e48f4bf534731e0"), "age" : 33, "name" : "a3" }
{ "_id" : ObjectId("61e8eedf6e48f4bf534731e1"), "age" : 33, "name" : 1 }
> db.student.find({"name":{$type:'32-bit integer'}})
Error: error: {
        "ok" : 0,
        "errmsg" : "Unknown type name alias: 32-bit integer",
        "code" : 2,
        "codeName" : "BadValue"
}
> db.student.find({"name":{$type:'integer'}})
Error: error: {
        "ok" : 0,
        "errmsg" : "Unknown type name alias: integer",
        "code" : 2,
        "codeName" : "BadValue"
}
> db.student.find({"name":{$type:16}})
> db.student.find({"name":{$type:2}})
{ "_id" : ObjectId("61e7b65b6e48f4bf534731dd"), "age" : 22, "name" : "a1" }
{ "_id" : ObjectId("61e7b6646e48f4bf534731de"), "age" : 11, "name" : "a2" }
{ "_id" : ObjectId("61e7b6f66e48f4bf534731df"), "age" : 11, "name" : "a3" }
{ "_id" : ObjectId("61e7b78a6e48f4bf534731e0"), "age" : 33, "name" : "a3" }
> db.student.find({"name":{$type:18}})
#类型数字默认为double 即1 类型
> db.student.find({"name":{$type:1}})
{ "_id" : ObjectId("61e8eedf6e48f4bf534731e1"), "age" : 33, "name" : 1 }
> db.student.find({"name":{$type:'Double'}})
Error: error: {
        "ok" : 0,
        "errmsg" : "Unknown type name alias: Double",
        "code" : 2,
        "codeName" : "BadValue"
}
> db.student.find({"name":{$type:Double}})
uncaught exception: ReferenceError: Double is not defined :
@(shell):1:26
> db.student.find({"name":{$type:double}})
uncaught exception: ReferenceError: double is not defined :
@(shell):1:26
#类型小写引号
> db.student.find({"name":{$type:'double'}})
{ "_id" : ObjectId("61e8eedf6e48f4bf534731e1"), "age" : 33, "name" : 1 }
>
```

### Limit() 方法

```bash
> db.student.find()
{ "_id" : ObjectId("61e7b65b6e48f4bf534731dd"), "age" : 22, "name" : "a1" }
{ "_id" : ObjectId("61e7b6646e48f4bf534731de"), "age" : 11, "name" : "a2" }
{ "_id" : ObjectId("61e7b6f66e48f4bf534731df"), "age" : 11, "name" : "a3" }
{ "_id" : ObjectId("61e7b78a6e48f4bf534731e0"), "age" : 33, "name" : "a3" }
{ "_id" : ObjectId("61e8eedf6e48f4bf534731e1"), "age" : 33, "name" : 1 }
> db.student.find().limit(2)
{ "_id" : ObjectId("61e7b65b6e48f4bf534731dd"), "age" : 22, "name" : "a1" }
{ "_id" : ObjectId("61e7b6646e48f4bf534731de"), "age" : 11, "name" : "a2" }
> db.student.find({name:{$type:1}}).limit(2)
{ "_id" : ObjectId("61e8eedf6e48f4bf534731e1"), "age" : 33, "name" : 1 }
#条件筛选后限制查询数量
> db.student.find({name:{$type:2}}).limit(2)
{ "_id" : ObjectId("61e7b65b6e48f4bf534731dd"), "age" : 22, "name" : "a1" }
{ "_id" : ObjectId("61e7b6646e48f4bf534731de"), "age" : 11, "name" : "a2" }
>
```

### Skip() 方法

```bash
> db.student.find()
{ "_id" : ObjectId("61e7b65b6e48f4bf534731dd"), "age" : 22, "name" : "a1" }
{ "_id" : ObjectId("61e7b6646e48f4bf534731de"), "age" : 11, "name" : "a2" }
{ "_id" : ObjectId("61e7b6f66e48f4bf534731df"), "age" : 11, "name" : "a3" }
{ "_id" : ObjectId("61e7b78a6e48f4bf534731e0"), "age" : 33, "name" : "a3" }
{ "_id" : ObjectId("61e8eedf6e48f4bf534731e1"), "age" : 33, "name" : 1 }
> db.student.find().limit(2)
{ "_id" : ObjectId("61e7b65b6e48f4bf534731dd"), "age" : 22, "name" : "a1" }
{ "_id" : ObjectId("61e7b6646e48f4bf534731de"), "age" : 11, "name" : "a2" }
> db.student.find({name:{$type:1}}).limit(2)
{ "_id" : ObjectId("61e8eedf6e48f4bf534731e1"), "age" : 33, "name" : 1 }
> db.student.find({name:{$type:2}}).limit(2)
{ "_id" : ObjectId("61e7b65b6e48f4bf534731dd"), "age" : 22, "name" : "a1" }
{ "_id" : ObjectId("61e7b6646e48f4bf534731de"), "age" : 11, "name" : "a2" }
#跳过对应数量的限制查询的数据
> db.student.find({name:{$type:2}}).limit(2).skip(1)
{ "_id" : ObjectId("61e7b6646e48f4bf534731de"), "age" : 11, "name" : "a2" }
{ "_id" : ObjectId("61e7b6f66e48f4bf534731df"), "age" : 11, "name" : "a3" }
>
```

### sort() 方法

```bash
> db.student.find().sort({age:1})
{ "_id" : ObjectId("61e7b6646e48f4bf534731de"), "age" : 11, "name" : "a2" }
{ "_id" : ObjectId("61e7b6f66e48f4bf534731df"), "age" : 11, "name" : "a3" }
{ "_id" : ObjectId("61e7b65b6e48f4bf534731dd"), "age" : 22, "name" : "a1" }
{ "_id" : ObjectId("61e7b78a6e48f4bf534731e0"), "age" : 33, "name" : "a3" }
{ "_id" : ObjectId("61e8eedf6e48f4bf534731e1"), "age" : 33, "name" : 1 }
> db.student.find().sort({age:-1})
{ "_id" : ObjectId("61e7b78a6e48f4bf534731e0"), "age" : 33, "name" : "a3" }
{ "_id" : ObjectId("61e8eedf6e48f4bf534731e1"), "age" : 33, "name" : 1 }
{ "_id" : ObjectId("61e7b65b6e48f4bf534731dd"), "age" : 22, "name" : "a1" }
{ "_id" : ObjectId("61e7b6646e48f4bf534731de"), "age" : 11, "name" : "a2" }
{ "_id" : ObjectId("61e7b6f66e48f4bf534731df"), "age" : 11, "name" : "a3" }
>
```

# 八、索引

## createIndex() 方法`

```bash
> db.student.find().sort({age:1})
{ "_id" : ObjectId("61e7b6646e48f4bf534731de"), "age" : 11, "name" : "a2" }
{ "_id" : ObjectId("61e7b6f66e48f4bf534731df"), "age" : 11, "name" : "a3" }
{ "_id" : ObjectId("61e7b65b6e48f4bf534731dd"), "age" : 22, "name" : "a1" }
{ "_id" : ObjectId("61e7b78a6e48f4bf534731e0"), "age" : 33, "name" : "a3" }
{ "_id" : ObjectId("61e8eedf6e48f4bf534731e1"), "age" : 33, "name" : 1 }
> db.student.find().sort({age:-1})
{ "_id" : ObjectId("61e7b78a6e48f4bf534731e0"), "age" : 33, "name" : "a3" }
{ "_id" : ObjectId("61e8eedf6e48f4bf534731e1"), "age" : 33, "name" : 1 }
{ "_id" : ObjectId("61e7b65b6e48f4bf534731dd"), "age" : 22, "name" : "a1" }
{ "_id" : ObjectId("61e7b6646e48f4bf534731de"), "age" : 11, "name" : "a2" }
{ "_id" : ObjectId("61e7b6f66e48f4bf534731df"), "age" : 11, "name" : "a3" }
> db.student.createIndex({"age":1})
{
        "numIndexesBefore" : 1,
        "numIndexesAfter" : 2,
        "createdCollectionAutomatically" : false,
        "ok" : 1
}
> db.student.createIndex({"age":-1})
{
        "numIndexesBefore" : 2,
        "numIndexesAfter" : 3,
        "createdCollectionAutomatically" : false,
        "ok" : 1
}
#创建索引  1为正序，可使用多个字段创建索引
> db.student.createIndex({"age":-1,"name":1})
{
        "numIndexesBefore" : 3,
        "numIndexesAfter" : 4,
        "createdCollectionAutomatically" : false,
        "ok" : 1
}
>
```

| Parameter          | Type          | Description                                                  |
| :----------------- | :------------ | :----------------------------------------------------------- |
| background         | Boolean       | 建索引过程会阻塞其它数据库操作，background可指定以后台方式创建索引，即增加 "background" 可选参数。 "background" 默认值为**false**。 |
| unique             | Boolean       | 建立的索引是否唯一。指定为true创建唯一索引。默认值为**false**. |
| name               | string        | 索引的名称。如果未指定，MongoDB的通过连接索引的字段名和排序顺序生成一个索引名称。 |
| dropDups           | Boolean       | **3.0+版本已废弃。**在建立唯一索引时是否删除重复记录,指定 true 创建唯一索引。默认值为 **false**. |
| sparse             | Boolean       | 对文档中不存在的字段数据不启用索引；这个参数需要特别注意，如果设置为true的话，在索引字段中不会查询出不包含对应字段的文档.。默认值为 **false**. |
| expireAfterSeconds | integer       | 指定一个以秒为单位的数值，完成 TTL设定，设定集合的生存时间。 |
| v                  | index version | 索引的版本号。默认的索引版本取决于mongod创建索引时运行的版本。 |
| weights            | document      | 索引权重值，数值在 1 到 99,999 之间，表示该索引相对于其他索引字段的得分权重。 |
| default_language   | string        | 对于文本索引，该参数决定了停用词及词干和词器的规则的列表。 默认为英语 |
| language_override  | string        | 对于文本索引，该参数指定了包含在文档中的字段名，语言覆盖默认的language，默认值为 language. |



# 九、聚合

## aggregate() 方法

处理数据(诸如统计平均值，求和等)

```bash
> db.student.find()
{ "_id" : ObjectId("61e7b65b6e48f4bf534731dd"), "age" : 22, "name" : "a1" }
{ "_id" : ObjectId("61e7b6646e48f4bf534731de"), "age" : 11, "name" : "a2" }
{ "_id" : ObjectId("61e7b6f66e48f4bf534731df"), "age" : 11, "name" : "a3" }
{ "_id" : ObjectId("61e7b78a6e48f4bf534731e0"), "age" : 33, "name" : "a3" }
{ "_id" : ObjectId("61e8eedf6e48f4bf534731e1"), "age" : 33, "name" : 1 }
#通过name判断相同name有多少数据
> db.student.aggregate([{$group:{_id:"$name",num_tutorial:{$sum:1}}}])
{ "_id" : "a2", "num_tutorial" : 1 }
{ "_id" : "a3", "num_tutorial" : 2 }
{ "_id" : "a1", "num_tutorial" : 1 }
{ "_id" : 1, "num_tutorial" : 1 }
>
```

聚合的表达式:

| 表达式    | 描述                                                         | 实例                                                         |
| :-------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| $sum      | 计算总和。                                                   | db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$sum : "$likes"}}}]) |
| $avg      | 计算平均值                                                   | db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$avg : "$likes"}}}]) |
| $min      | 获取集合中所有文档对应值得最小值。                           | db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$min : "$likes"}}}]) |
| $max      | 获取集合中所有文档对应值得最大值。                           | db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$max : "$likes"}}}]) |
| $push     | 将值加入一个数组中，不会判断是否有重复的值。                 | db.mycol.aggregate([{$group : {_id : "$by_user", url : {$push: "$url"}}}]) |
| $addToSet | 将值加入一个数组中，会判断是否有重复的值，若相同的值在数组中已经存在了，则不加入。 | db.mycol.aggregate([{$group : {_id : "$by_user", url : {$addToSet : "$url"}}}]) |
| $first    | 根据资源文档的排序获取第一个文档数据。                       | db.mycol.aggregate([{$group : {_id : "$by_user", first_url : {$first : "$url"}}}]) |
| $last     | 根据资源文档的排序获取最后一个文档数据                       | db.mycol.aggregate([{$group : {_id : "$by_user", last_url : {$last : "$url"}}}]) |

## 管道

管道在Unix和Linux中一般用于将当前命令的输出结果作为下一个命令的参数。

MongoDB的聚合管道将MongoDB文档在一个管道处理完毕后将结果传递给下一个管道处理。管道操作是可以重复的。

表达式：处理输入文档并输出。表达式是无状态的，只能用于计算当前聚合管道的文档，不能处理其它的文档。

这里我们介绍一下聚合框架中常用的几个操作：

- $project：修改输入文档的结构。可以用来重命名、增加或删除域，也可以用于创建计算结果以及嵌套文档。
- $match：用于过滤数据，只输出符合条件的文档。$match使用MongoDB的标准查询操作。
- $limit：用来限制MongoDB聚合管道返回的文档数。
- $skip：在聚合管道中跳过指定数量的文档，并返回余下的文档。
- $unwind：将文档中的某一个数组类型字段拆分成多条，每条包含数组中的一个值。
- $group：将集合中的文档分组，可用于统计结果。
- $sort：将输入文档排序后输出。
- $geoNear：输出接近某一地理位置的有序文档。

```bash
> db.student.find()
{ "_id" : ObjectId("61e7b65b6e48f4bf534731dd"), "age" : 22, "name" : "a1" }
{ "_id" : ObjectId("61e7b6646e48f4bf534731de"), "age" : 11, "name" : "a2" }
{ "_id" : ObjectId("61e7b6f66e48f4bf534731df"), "age" : 11, "name" : "a3" }
{ "_id" : ObjectId("61e7b78a6e48f4bf534731e0"), "age" : 33, "name" : "a3" }
{ "_id" : ObjectId("61e8eedf6e48f4bf534731e1"), "age" : 33, "name" : 1 }
#只显示默认的id与name
> db.student.aggregate({$project:{name:1}})
{ "_id" : ObjectId("61e7b65b6e48f4bf534731dd"), "name" : "a1" }
{ "_id" : ObjectId("61e7b6646e48f4bf534731de"), "name" : "a2" }
{ "_id" : ObjectId("61e7b6f66e48f4bf534731df"), "name" : "a3" }
{ "_id" : ObjectId("61e7b78a6e48f4bf534731e0"), "name" : "a3" }
{ "_id" : ObjectId("61e8eedf6e48f4bf534731e1"), "name" : 1 }
#去掉默认id，只显示name
> db.student.aggregate({$project:{_id:0,name:1}})
{ "name" : "a1" }
{ "name" : "a2" }
{ "name" : "a3" }
{ "name" : "a3" }
{ "name" : 1 }
#显示前三条之后的数据
> db.student.aggregate({$skip:3})
{ "_id" : ObjectId("61e7b78a6e48f4bf534731e0"), "age" : 33, "name" : "a3" }
{ "_id" : ObjectId("61e8eedf6e48f4bf534731e1"), "age" : 33, "name" : 1 }
#显示大于10 小于等于25的一条数据
> db.student.aggregate( [{ $match : { age : { $gt:10,$lte:25}}},{ $group:{ _id: null, count: { $sum: 1 } } } ] );
{ "_id" : null, "count" : 3 }
>
```

# 十、复制

数据冗余备份，硬件故障，服务中断数据恢复。无需停机维护，分布式读取数据。

mongodb的复制至少需要两个节点。其中一个是主节点，负责处理客户端请求，其余的都是从节点，负责复制主节点上的数据。

mongodb各个节点常见的搭配方式为：一主一从、一主多从。

主节点记录在其上的所有操作oplog，从节点定期轮询主节点获取这些操作，然后对自己的数据副本执行这些操作，从而保证从节点的数据与主节点一致。

MongoDB复制结构图如下所示：

<img src="https://www.runoob.com/wp-content/uploads/2013/12/replication.png" alt="MongoDB复制结构图" style="zoom: 67%;" />

以上结构图中，客户端从主节点读取数据，在客户端写入数据到主节点时， 主节点与从节点进行数据交互保障数据的一致性。

## 副本集特征：

- N 个节点的集群
- 任何节点可作为主节点
- 所有写入操作都在主节点上
- 自动故障转移
- 自动恢复

------

## MongoDB副本集设置

在本教程中我们使用同一个MongoDB来做MongoDB主从的实验， 操作步骤如下：

1、关闭正在运行的MongoDB服务器。

现在我们通过指定 --replSet 选项来启动mongoDB。--replSet 基本语法格式如下：

```
mongod --port "PORT" --dbpath "YOUR_DB_DATA_PATH" --replSet "REPLICA_SET_INSTANCE_NAME"
```

示例

```bash
mongod --port 27017 --dbpath "F:\Softs\Installed\MongoDB\data" --replSet rs0
```

示例启动一个名为rs0的MongoDB实例，其端口号为27017。启动后打开命令提示框并连接上mongoDB服务。在Mongo客户端使用命令rs.initiate()来启动一个新的副本集。我们可以使用rs.conf()来查看副本集的配置查看副本集状态使用 rs.status() 命令

```bash
#关闭服务
C:\Users\Administrator>net stop mongodb
#创建rs0实例
C:\Users\Administrator>mongod --port 27017 --dbpath "F:\Softs\Installed\MongoDB\data" --replSet rs0
#启动
C:\Users\Administrator>mongo
MongoDB shell version v5.0.6-rc0
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("a7bc72f5-0db4-4de3-b3c1-4f457b526e8b") }
MongoDB server version: 5.0.6-rc0
================
Warning: the "mongo" shell has been superseded by "mongosh",
which delivers improved usability and compatibility.The "mongo" shell has been deprecated and will be removed in
an upcoming release.
For installation instructions, see
https://docs.mongodb.com/mongodb-shell/install/
================
#启动新的副本集
> rs.initiate()
{
        "info2" : "no configuration specified. Using a default configuration for the set",
        "me" : "localhost:27017",
        "ok" : 1
}
查看副本配置
rs0:SECONDARY> rs.conf()
{
        "_id" : "rs0",
        "version" : 1,
        "term" : 1,
        "members" : [
                {
                        "_id" : 0,
                        "host" : "localhost:27017",
                        "arbiterOnly" : false,
                        "buildIndexes" : true,
                        "hidden" : false,
                        "priority" : 1,
                        "tags" : {

                        },
                        "secondaryDelaySecs" : NumberLong(0),
                        "votes" : 1
                }
        ],
        "protocolVersion" : NumberLong(1),
        "writeConcernMajorityJournalDefault" : true,
        "settings" : {
                "chainingAllowed" : true,
                "heartbeatIntervalMillis" : 2000,
                "heartbeatTimeoutSecs" : 10,
                "electionTimeoutMillis" : 10000,
                "catchUpTimeoutMillis" : -1,
                "catchUpTakeoverDelayMillis" : 30000,
                "getLastErrorModes" : {

                },
                "getLastErrorDefaults" : {
                        "w" : 1,
                        "wtimeout" : 0
                },
                "replicaSetId" : ObjectId("61ea43d55303298c0a702c41")
        }
}
#查看副本集状态
rs0:PRIMARY> rs.status()
{
        "set" : "rs0",
        "date" : ISODate("2022-01-21T05:26:33.032Z"),
        "myState" : 1,
        "term" : NumberLong(1),
        "syncSourceHost" : "",
        "syncSourceId" : -1,
        "heartbeatIntervalMillis" : NumberLong(2000),
        "majorityVoteCount" : 1,
        "writeMajorityCount" : 1,
        "votingMembersCount" : 1,
        "writableVotingMembersCount" : 1,
        "optimes" : {
                "lastCommittedOpTime" : {
                        "ts" : Timestamp(1642742783, 1),
                        "t" : NumberLong(1)
                },
                "lastCommittedWallTime" : ISODate("2022-01-21T05:26:23.117Z"),
                "readConcernMajorityOpTime" : {
                        "ts" : Timestamp(1642742783, 1),
                        "t" : NumberLong(1)
                },
                "appliedOpTime" : {
                        "ts" : Timestamp(1642742783, 1),
                        "t" : NumberLong(1)
                },
                "durableOpTime" : {
                        "ts" : Timestamp(1642742783, 1),
                        "t" : NumberLong(1)
                },
                "lastAppliedWallTime" : ISODate("2022-01-21T05:26:23.117Z"),
                "lastDurableWallTime" : ISODate("2022-01-21T05:26:23.117Z")
        },
        "lastStableRecoveryTimestamp" : Timestamp(1642742741, 1),
        "electionCandidateMetrics" : {
                "lastElectionReason" : "electionTimeout",
                "lastElectionDate" : ISODate("2022-01-21T05:25:42.687Z"),
                "electionTerm" : NumberLong(1),
                "lastCommittedOpTimeAtElection" : {
                        "ts" : Timestamp(1642742741, 1),
                        "t" : NumberLong(-1)
                },
                "lastSeenOpTimeAtElection" : {
                        "ts" : Timestamp(1642742741, 1),
                        "t" : NumberLong(-1)
                },
                "numVotesNeeded" : 1,
                "priorityAtElection" : 1,
                "electionTimeoutMillis" : NumberLong(10000),
                "newTermStartDate" : ISODate("2022-01-21T05:25:42.963Z"),
                "wMajorityWriteAvailabilityDate" : ISODate("2022-01-21T05:25:43.131Z")
        },
        "members" : [
                {
                        "_id" : 0,
                        "name" : "localhost:27017",
                        "health" : 1,
                        "state" : 1,
                        "stateStr" : "PRIMARY",
                        "uptime" : 203,
                        "optime" : {
                                "ts" : Timestamp(1642742783, 1),
                                "t" : NumberLong(1)
                        },
                        "optimeDate" : ISODate("2022-01-21T05:26:23Z"),
                        "lastAppliedWallTime" : ISODate("2022-01-21T05:26:23.117Z"),
                        "lastDurableWallTime" : ISODate("2022-01-21T05:26:23.117Z"),
                        "syncSourceHost" : "",
                        "syncSourceId" : -1,
                        "infoMessage" : "Could not find member to sync from",
                        "electionTime" : Timestamp(1642742742, 1),
                        "electionDate" : ISODate("2022-01-21T05:25:42Z"),
                        "configVersion" : 1,
                        "configTerm" : 1,
                        "self" : true,
                        "lastHeartbeatMessage" : ""
                }
        ],
        "ok" : 1,
        "$clusterTime" : {
                "clusterTime" : Timestamp(1642742783, 1),
                "signature" : {
                        "hash" : BinData(0,"AAAAAAAAAAAAAAAAAAAAAAAAAAA="),
                        "keyId" : NumberLong(0)
                }
        },
        "operationTime" : Timestamp(1642742783, 1)
}
rs0:PRIMARY>
```

## 副本集添加成员

添加副本集的成员，我们需要使用多台服务器来启动mongo服务。进入Mongo客户端，并使用rs.add()方法来添加副本集的成员。

### 语法

rs.add() 命令基本语法格式如下：

```
>rs.add(HOST_NAME:PORT)
```

### 实例

假设你已经启动了一个名为mongod1.net，端口号为27017的Mongo服务。 在客户端命令窗口使用rs.add() 命令将其添加到副本集中，命令如下所示：

```
>rs.add("mongod1.net:27017")
>
```

MongoDB中你只能通过主节点将Mongo服务添加到副本集中， 判断当前运行的Mongo服务是否为主节点可以使用命令db.isMaster() 。

MongoDB的副本集与我们常见的主从有所不同，主从在主机宕机后所有服务将停止，而副本集在主机宕机后，副本会接管主节点成为主节点，不会出现宕机的情况。



# 十一、分片



------

## 分片

在Mongodb里面存在另一种集群，就是分片技术,可以满足MongoDB数据量大量增长的需求。

当MongoDB存储海量的数据时，一台机器可能不足以存储数据，也可能不足以提供可接受的读写吞吐量。这时，我们就可以通过在多台机器上分割数据，使得数据库系统能存储和处理更多的数据。

------

## 为什么使用分片

- 复制所有的写入操作到主节点
- 延迟的敏感数据会在主节点查询
- 单个副本集限制在12个节点
- 当请求量巨大时会出现内存不足。
- 本地磁盘不足
- 垂直扩展价格昂贵

------

## MongoDB分片

下图展示了在MongoDB中使用分片集群结构分布：

![img](https://www.runoob.com/wp-content/uploads/2013/12/sharding.png)

上图中主要有如下所述三个主要组件：

- Shard:

  用于存储实际的数据块，实际生产环境中一个shard server角色可由几台机器组个一个replica set承担，防止主机单点故障

- Config Server:

  mongod 实例，存储了整个 ClusterMetadata，其中包括 chunk 信息。

- Query Routers:

  前端路由，客户端由此接入，且让整个集群看上去像单一数据库，前端应用可以透明使用。

------

## 分片实例

分片结构端口分布如下：

```
Shard Server 1：27020
Shard Server 2：27021
Shard Server 3：27022
Shard Server 4：27023
Config Server ：27100
Route Process：40000
```

步骤一：启动Shard Server

```
[root@100 /]# mkdir -p /www/mongoDB/shard/s0
[root@100 /]# mkdir -p /www/mongoDB/shard/s1
[root@100 /]# mkdir -p /www/mongoDB/shard/s2
[root@100 /]# mkdir -p /www/mongoDB/shard/s3
[root@100 /]# mkdir -p /www/mongoDB/shard/log
[root@100 /]# /usr/local/mongoDB/bin/mongod --port 27020 --dbpath=/www/mongoDB/shard/s0 --logpath=/www/mongoDB/shard/log/s0.log --logappend --fork
....
[root@100 /]# /usr/local/mongoDB/bin/mongod --port 27023 --dbpath=/www/mongoDB/shard/s3 --logpath=/www/mongoDB/shard/log/s3.log --logappend --fork
```

步骤二： 启动Config Server

```
[root@100 /]# mkdir -p /www/mongoDB/shard/config
[root@100 /]# /usr/local/mongoDB/bin/mongod --port 27100 --dbpath=/www/mongoDB/shard/config --logpath=/www/mongoDB/shard/log/config.log --logappend --fork
```

**注意：**这里我们完全可以像启动普通mongodb服务一样启动，不需要添加—shardsvr和configsvr参数。因为这两个参数的作用就是改变启动端口的，所以我们自行指定了端口就可以。

步骤三： 启动Route Process

```
/usr/local/mongoDB/bin/mongos --port 40000 --configdb localhost:27100 --fork --logpath=/www/mongoDB/shard/log/route.log --chunkSize 500
```

mongos启动参数中，chunkSize这一项是用来指定chunk的大小的，单位是MB，默认大小为200MB.

步骤四： 配置Sharding

接下来，我们使用MongoDB Shell登录到mongos，添加Shard节点

```
[root@100 shard]# /usr/local/mongoDB/bin/mongo admin --port 40000
MongoDB shell version: 2.0.7
connecting to: 127.0.0.1:40000/admin
mongos> db.runCommand({ addshard:"localhost:27020" })
{ "shardAdded" : "shard0000", "ok" : 1 }
......
mongos> db.runCommand({ addshard:"localhost:27029" })
{ "shardAdded" : "shard0009", "ok" : 1 }
mongos> db.runCommand({ enablesharding:"test" }) #设置分片存储的数据库
{ "ok" : 1 }
mongos> db.runCommand({ shardcollection: "test.log", key: { id:1,time:1}})
{ "collectionsharded" : "test.log", "ok" : 1 }
```

步骤五： 程序代码内无需太大更改，直接按照连接普通的mongo数据库那样，将数据库连接接入接口40000

# 十二、安装其他工具

下载后将其bin目录下复制到data下bin目录下：

https://www.mongodb.com/try/download/database-tools

![image-20220121145921692](http://qnimg.gisfsde.com/work/image-20220121145921692.png)

# 十三、备份 / 恢复

------

## 数据备份

备份(mongodump)与恢复(mongorestore)。在Mongodb中我们使用mongodump命令来备份MongoDB数据。该命令可以导出所有数据到指定目录中。

mongodump命令可以通过参数指定导出的数据量级转存的服务器。

### 语法

mongodump命令脚本语法如下：

```
>mongodump -h dbhost -d dbname -o dbdirectory
```

- -h：

  MongoDB 所在服务器地址，例如：127.0.0.1，当然也可以指定端口号：127.0.0.1:27017

- -d：

  需要备份的数据库实例，例如：test

- -o：

  备份的数据存放位置，例如：c:\data\dump，当然该目录需要提前建立，在备份完成后，系统自动在dump目录下建立一个test目录，这个目录里面存放该数据库实例的备份数据。

### 实例

在本地使用 27017 启动你的mongod服务。打开命令提示符窗口，进入MongoDB安装目录的bin目录输入命令mongodump:

```bash
>mongodump #即mongod
```

执行以上命令后，客户端会连接到ip为 127.0.0.1 端口号为 27017 的MongoDB服务上，并备份所有数据到 bin/dump/ 目录中。命令输出结果如下：

![MongoDB数据备份](https://www.runoob.com/wp-content/uploads/2013/12/mongodump.png)

mongodump 命令可选参数列表如下所示：

| 语法                                              | 描述                           | 实例                                             |
| :------------------------------------------------ | :----------------------------- | :----------------------------------------------- |
| mongodump --host HOST_NAME --port PORT_NUMBER     | 该命令将备份所有MongoDB数据    | mongodump --host runoob.com --port 27017         |
| mongodump --dbpath DB_PATH --out BACKUP_DIRECTORY |                                | mongodump --dbpath /data/db/ --out /data/backup/ |
| mongodump --collection COLLECTION --db DB_NAME    | 该命令将备份指定数据库的集合。 | mongodump --collection mycol --db test           |

------

## 数据恢复

mongodb使用 mongorestore 命令来恢复备份的数据。

### 语法

mongorestore命令脚本语法如下：

```
>mongorestore -h \<hostname>\<:port> -d dbname \<path>
```

- --host \<:port>, -h \<:port>：

  MongoDB所在服务器地址，默认为： localhost:27017

- --db , -d ：

  需要恢复的数据库实例，例如：test，当然这个名称也可以和备份时候的不一样，比如test2

- --drop：

  恢复的时候，先删除当前数据，然后恢复备份的数据。就是说，恢复后，备份后添加修改的数据都会被删除，慎用哦！

- \<path>：

  mongorestore 最后的一个参数，设置备份数据所在位置，例如：c:\data\dump\test。

  你不能同时指定 \<path> 和 --dir 选项，--dir也可以设置备份目录。

- --dir：

  指定备份的目录

  你不能同时指定 \<path> 和 --dir 选项。

接下来我们执行以下命令:

```
>mongorestore
```

执行以上命令输出结果如下：

![MongoDB数据恢复](https://www.runoob.com/wp-content/uploads/2013/12/mongorestore.png)



# 十四、监控

在你已经安装部署并允许MongoDB服务后，你必须要了解MongoDB的运行情况，并查看MongoDB的性能。这样在大流量得情况下可以很好的应对并保证MongoDB正常运作。

MongoDB中提供了mongostat 和 mongotop 两个命令来监控MongoDB的运行情况。

------

## mongostat 命令

mongostat是mongodb自带的状态检测工具，在命令行下使用。它会间隔固定时间获取mongodb的当前运行状态，并输出。如果你发现数据库突然变慢或者有其他问题的话，你第一手的操作就考虑采用mongostat来查看mongo的状态。

启动你的Mongod服务，进入到你安装的MongoDB目录下的bin目录， 然后输入mongostat命令，如下所示：

```
D:\set up\mongodb\bin>mongostat
```

以上命令输出结果如下：

![img](https://www.runoob.com/wp-content/uploads/2013/12/mongostat.png)

## mongotop 命令

mongotop也是mongodb下的一个内置工具，mongotop提供了一个方法，用来跟踪一个MongoDB的实例，查看哪些大量的时间花费在读取和写入数据。 mongotop提供每个集合的水平的统计数据。默认情况下，mongotop返回值的每一秒。

启动你的Mongod服务，进入到你安装的MongoDB目录下的bin目录， 然后输入mongotop命令，如下所示：

```
D:\set up\mongodb\bin>mongotop
```

以上命令执行输出结果如下：

![img](https://www.runoob.com/wp-content/uploads/2013/12/mongotop.png)

带参数实例

```
 E:\mongodb-win32-x86_64-2.2.1\bin>mongotop 10
```

![img](https://www.runoob.com/wp-content/uploads/2013/12/29122412-e32a9f09e46e496a8833433fdb421311.gif)

后面的10是*\<sleeptime>*参数 ，可以不使用，等待的时间长度，以秒为单位，mongotop等待调用之间。通过的默认mongotop返回数据的每一秒。

```
 E:\mongodb-win32-x86_64-2.2.1\bin>mongotop --locks
```

报告每个数据库的锁的使用中，使用mongotop - 锁，这将产生以下输出：

![img](https://www.runoob.com/wp-content/uploads/2013/12/29122706-bfdd58e62c404b948f8039c489f8be81.gif)

输出结果字段说明：

- ns：

  包含数据库命名空间，后者结合了数据库名称和集合。

- **db：**

  包含数据库的名称。名为 . 的数据库针对全局锁定，而非特定数据库。

- **total：**

  mongod花费的时间工作在这个命名空间提供总额。

- **read：**

  提供了大量的时间，这mongod花费在执行读操作，在此命名空间。

- **write：**

  提供这个命名空间进行写操作，这mongod花了大量的时间。

# 十五、MongoDBCompass使用

MongoDB可视化工具

mongo命令连接服务器后打开工具

点击连接默认的服务器、接口和None认证的服务

![image-20220121155412364](http://qnimg.gisfsde.com/work/image-20220121155412364.png)

![image-20220121155655870](http://qnimg.gisfsde.com/work/image-20220121155655870.png)

![image-20220121160035165](http://qnimg.gisfsde.com/work/image-20220121160035165.png)

![image-20220121160101367](http://qnimg.gisfsde.com/work/image-20220121160101367.png)

# 十六、Java使用

[文档](https://docs.mongodb.com/drivers/java/sync/current/quick-start/)

## 引入依赖

```xml
<!--MongoDB-->
\<dependency>
   \<groupId>org.mongodb\</groupId>
   \<artifactId>mongodb-driver-sync\</artifactId>
   \<version>4.4.1\</version>
\</dependency>
```



## 连接

```java
package pers.lxl.mylearnproject.programbase.nosql.mongolearn;
import static com.mongodb.client.model.Filters.eq;
import org.bson.Document;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
public class HelloMongoDB {
//1.添加依赖
//            \<dependency>
//            \<groupId>org.mongodb\</groupId>
//            \<artifactId>mongodb-driver-sync\</artifactId>
//            \<version>4.4.1\</version>
//        \</dependency>

//    2.连接到数据库
public static void main( String args[] ){
//    try{
//        // 连接到 mongodb 服务
//        MongoClient mongoClient = new MongoClient( "localhost" , 27017 );
//
//        // 连接到数据库
//        MongoDatabase mongoDatabase = mongoClient.getDatabase("mycol");
//        System.out.println("Connect to database successfully");
//
//    }catch(Exception e){
//        System.err.println( e.getClass().getName() + ": " + e.getMessage() );
//    }

// Replace the uri string with your MongoDB deployment's connection string
//    IllegalArgumentException: Unsupported compressor 'disabled'
//    String uri = "mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb";
//    Exception in thread "main" java.lang.NoClassDefFoundError: com/mongodb/internal/connection/InternalConnectionPoolSettings  升级springboot版本
    String uri = "mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb";
    try (MongoClient mongoClient = MongoClients.create(uri)) {
//        show dbs
        MongoDatabase database = mongoClient.getDatabase("student");
//        show collections 或 show tables
        MongoCollection\<Document> collection = database.getCollection("student");
        Document doc = collection.find(eq("age", 11)).first();
        System.out.println(doc.toJson()+"==========");
    }
}
}
```

# 十七、关系

MongoDB 的关系表示多个文档之间在逻辑上的相互联系。

文档间可以通过嵌入和引用来建立联系。

MongoDB 中的关系可以是：

- 1:1 (1对1)
- 1: N (1对多)
- N: 1 (多对1)
- N: N (多对多)



接下来我们来考虑下用户与用户地址的关系。

一个用户可以有多个地址，所以是一对多的关系。

以下是 **user** 文档的简单结构：

```
{
   "_id":ObjectId("52ffc33cd85242f436000001"),
   "name": "Tom Hanks",
   "contact": "987654321",
   "dob": "01-01-1991"
}
```

以下是 **address** 文档的简单结构：

```
{
   "_id":ObjectId("52ffc4a5d85242602e000000"),
   "building": "22 A, Indiana Apt",
   "pincode": 123456,
   "city": "Los Angeles",
   "state": "California"
} 
```

------

## 嵌入式关系

使用嵌入式方法，我们可以把用户地址嵌入到用户的文档中：

```
{
   "_id":ObjectId("52ffc33cd85242f436000001"),
   "contact": "987654321",
   "dob": "01-01-1991",
   "name": "Tom Benzamin",
   "address": [
      {
         "building": "22 A, Indiana Apt",
         "pincode": 123456,
         "city": "Los Angeles",
         "state": "California"
      },
      {
         "building": "170 A, Acropolis Apt",
         "pincode": 456789,
         "city": "Chicago",
         "state": "Illinois"
      }]
} 
```

以上数据保存在单一的文档中，可以比较容易的获取和维护数据。 你可以这样查询用户的地址：

```
>db.users.findOne({"name":"Tom Benzamin"},{"address":1})
```

注意：以上查询中 **db** 和 **users** 表示数据库和集合。

这种数据结构的缺点是，如果用户和用户地址在不断增加，数据量不断变大，会影响读写性能。

## 引用式关系

引用式关系是设计数据库时经常用到的方法，这种方法把用户数据文档和用户地址数据文档分开，通过引用文档的 **id** 字段来建立关系。

```
{
   "_id":ObjectId("52ffc33cd85242f436000001"),
   "contact": "987654321",
   "dob": "01-01-1991",
   "name": "Tom Benzamin",
   "address_ids": [
      ObjectId("52ffc4a5d85242602e000000"),
      ObjectId("52ffc4a5d85242602e000001")
   ]
}
```

以上实例中，用户文档的 **address_ids** 字段包含用户地址的对象id（ObjectId）数组。

我们可以读取这些用户地址的对象id（ObjectId）来获取用户的详细地址信息。

这种方法需要两次查询，第一次查询用户地址的对象id（ObjectId），第二次通过查询的id获取用户的详细地址信息。

```
>var result = db.users.findOne({"name":"Tom Benzamin"},{"address_ids":1})
>var addresses = db.address.find({"_id":{"$in":result["address_ids"]}})
```

# 十八、数据库引用

在上一章节MongoDB关系中我们提到了MongoDB的引用来规范数据结构文档。

MongoDB 引用有两种：

- 手动引用（Manual References）
- DBRefs

------

## DBRefs vs 手动引用

考虑这样的一个场景，我们在不同的集合中 (address_home, address_office, address_mailing, 等)存储不同的地址（住址，办公室地址，邮件地址等）。

这样，我们在调用不同地址时，也需要指定集合，一个文档从多个集合引用文档，我们应该使用 DBRefs。

------

## 使用 DBRefs

DBRef的形式：

```
{ $ref : , $id : , $db :  }
```

三个字段表示的意义为：

- $ref：集合名称
- $id：引用的id
- $db:数据库名称，可选参数
- 

以下实例中用户数据文档使用了 DBRef, 字段 address：

```
{
   "_id":ObjectId("53402597d852426020000002"),
   "address": {
   "$ref": "address_home",
   "$id": ObjectId("534009e4d852427820000002"),
   "$db": "runoob"},
   "contact": "987654321",
   "dob": "01-01-1991",
   "name": "Tom Benzamin"
}
```

**address** DBRef 字段指定了引用的地址文档是在 runoob 数据库下的 address_home 集合，id 为 534009e4d852427820000002。

以下代码中，我们通过指定 $ref 参数（address_home 集合）来查找集合中指定id的用户地址信息：

```
>var user = db.users.findOne({"name":"Tom Benzamin"})
>var dbRef = user.address
>db[dbRef.$ref].findOne({"_id":(dbRef.$id)})
```

以上实例返回了 address_home 集合中的地址数据：

```
{
   "_id" : ObjectId("534009e4d852427820000002"),
   "building" : "22 A, Indiana Apt",
   "pincode" : 123456,
   "city" : "Los Angeles",
   "state" : "California"
}
```

# 十九、覆盖索引查询

官方的MongoDB的文档中说明，覆盖查询是以下的查询：

- 所有的查询字段是索引的一部分
- 所有的查询返回字段在同一个索引中

由于所有出现在查询中的字段是索引的一部分， MongoDB 无需在整个数据文档中检索匹配查询条件和返回使用相同索引的查询结果。

因为索引存在于RAM中，从索引中获取数据比通过扫描文档读取数据要快得多。

------

## 使用覆盖索引查询

为了测试覆盖索引查询，使用以下 users 集合:

```
{
   "_id": ObjectId("53402597d852426020000002"),
   "contact": "987654321",
   "dob": "01-01-1991",
   "gender": "M",
   "name": "Tom Benzamin",
   "user_name": "tombenzamin"
}
```

我们在 users 集合中创建联合索引，字段为 gender 和 user_name :

```
>db.users.ensureIndex({gender:1,user_name:1})
```

现在，该索引会覆盖以下查询：

```
>db.users.find({gender:"M"},{user_name:1,_id:0})
```

也就是说，对于上述查询，MongoDB的不会去数据库文件中查找。相反，它会从索引中提取数据，这是非常快速的数据查询。

由于我们的索引中不包括 _id 字段，_id在查询中会默认返回，我们可以在MongoDB的查询结果集中排除它。

下面的实例没有排除_id，查询就不会被覆盖：

```
>db.users.find({gender:"M"},{user_name:1})
```

最后，如果是以下的查询，不能使用覆盖索引查询：

- 所有索引字段是一个数组
- 所有索引字段是一个子文档

# 二十、查询分析

MongoDB 查询分析可以确保我们所建立的索引是否有效，是查询语句性能分析的重要工具。

MongoDB 查询分析常用函数有：explain() 和 hint()。

------

## 使用 explain()

explain 操作提供了查询信息，使用索引及查询统计等。有利于我们对索引的优化。

接下来我们在 users 集合中创建 gender 和 user_name 的索引：

```
>db.users.ensureIndex({gender:1,user_name:1})
```

现在在查询语句中使用 explain ：

```
>db.users.find({gender:"M"},{user_name:1,_id:0}).explain()
```

以上的 explain() 查询返回如下结果：

```json
{
   "cursor" : "BtreeCursor gender_1_user_name_1",
   "isMultiKey" : false,
   "n" : 1,
   "nscannedObjects" : 0,
   "nscanned" : 1,
   "nscannedObjectsAllPlans" : 0,
   "nscannedAllPlans" : 1,
   "scanAndOrder" : false,
   "indexOnly" : true,//**indexOnly**: 字段为 true ，表示我们使用了索引。
   "nYields" : 0,
   "nChunkSkips" : 0,
   "millis" : 0,
   "indexBounds" : {
      "gender" : [
         [
            "M",
            "M"
         ]
      ],
      "user_name" : [
         [
            {
               "$minElement" : 1
            },
            {
               "$maxElement" : 1
            }
         ]
      ]
   }
}
```

现在，我们看看这个结果集的字段：

- **indexOnly**: 字段为 true ，表示我们使用了索引。
- **cursor**：因为这个查询使用了索引，MongoDB 中索引存储在B树结构中，所以这是也使用了 BtreeCursor 类型的游标。如果没有使用索引，游标的类型是 BasicCursor。这个键还会给出你所使用的索引的名称，你通过这个名称可以查看当前数据库下的system.indexes集合（系统自动创建，由于存储索引信息，这个稍微会提到）来得到索引的详细信息。
- **n**：当前查询返回的文档数量。
- **nscanned/nscannedObjects**：表明当前这次查询一共扫描了集合中多少个文档，我们的目的是，让这个数值和返回文档的数量越接近越好。
- **millis**：当前查询所需时间，毫秒数。
- **indexBounds**：当前查询具体使用的索引。

------

## 使用 hint()

虽然MongoDB查询优化器一般工作的很不错，但是也可以**使用 hint 来强制 MongoDB 使用一个指定的索引**。

这种方法某些情形下会提升性能。 一个有索引的 collection 并且执行一个多字段的查询(一些字段已经索引了)。

如下查询实例指定了使用 gender 和 user_name 索引字段来查询：

```
>db.users.find({gender:"M"},{user_name:1,_id:0}).hint({gender:1,user_name:1})
```

可以使用 explain() 函数来分析以上查询：

```
>db.users.find({gender:"M"},{user_name:1,_id:0}).hint({gender:1,user_name:1}).explain()
```

# 二一、MongoDB 原子操作

mongodb**不支持事务**，所以，在你的项目中应用时，要注意这点。无论什么设计，都不要要求mongodb保证数据的完整性。

但是mongodb提供了许多原子操作，比如文档的保存，修改，删除等，都是原子操作。

所谓原子操作就是要么这个文档保存到Mongodb，要么没有保存到Mongodb，不会出现查询到的文档没有保存完整的情况。

------

## 原子操作数据模型

考虑下面的例子，图书馆的书籍及结账信息。

实例说明了在一个相同的文档中如何确保嵌入字段关联原子操作（update：更新）的字段是同步的。

```
book = {
          _id: 123456789,
          title: "MongoDB: The Definitive Guide",
          author: [ "Kristina Chodorow", "Mike Dirolf" ],
          published_date: ISODate("2010-09-24"),
          pages: 216,
          language: "English",
          publisher_id: "oreilly",
          available: 3,
          checkout: [ { by: "joe", date: ISODate("2012-10-15") } ]
        }
```

你可以使用 db.collection.findAndModify() 方法来判断书籍是否可结算并更新新的结算信息。

在同一个文档中嵌入的 available 和 checkout 字段来确保这些字段是同步更新的:

```
db.books.findAndModify ( {
   query: {
            _id: 123456789,
            available: { $gt: 0 }
          },
   update: {
             $inc: { available: -1 },
             $push: { checkout: { by: "abc", date: new Date() } }
           }
} )
```

------

## 原子操作常用命令

#### $set

用来指定一个键并更新键值，若键不存在并创建。

```
{ $set : { field : value } }
```

#### $unset

用来删除一个键。

```
{ $unset : { field : 1} }
```

#### $inc

$inc可以对文档的某个值为数字型（只能为满足要求的数字）的键进行增减的操作。

```
{ $inc : { field : value } }
```

#### $push

用法：

```
{ $push : { field : value } }
```

把value追加到field里面去，field一定要是数组类型才行，如果field不存在，会新增一个数组类型加进去。

#### $pushAll

同$push,只是一次可以追加多个值到一个数组字段内。

```
{ $pushAll : { field : value_array } }
```

#### $pull

从数组field内删除一个等于value值。

```
{ $pull : { field : _value } }
```

#### $addToSet

增加一个值到数组内，而且只有当这个值不在数组内才增加。

#### $pop

删除数组的第一个或最后一个元素

```
{ $pop : { field : 1 } }
```

#### $rename

修改字段名称

```
{ $rename : { old_field_name : new_field_name } }
```

#### $bit

位操作，integer类型

```
{$bit : { field : {and : 5}}}
```

#### 偏移操作符

```
> t.find() { "_id" : ObjectId("4b97e62bf1d8c7152c9ccb74"), "title" : "ABC", "comments" : [ { "by" : "joe", "votes" : 3 }, { "by" : "jane", "votes" : 7 } ] }
 
> t.update( {'comments.by':'joe'}, {$inc:{'comments.$.votes':1}}, false, true )
 
> t.find() { "_id" : ObjectId("4b97e62bf1d8c7152c9ccb74"), "title" : "ABC", "comments" : [ { "by" : "joe", "votes" : 4 }, { "by" : "jane", "votes" : 7 } ] }
```



# 二二、高级索引

考虑以下文档集合（users ）:

```
{
   "address": {
      "city": "Los Angeles",
      "state": "California",
      "pincode": "123"
   },
   "tags": [
      "music",
      "cricket",
      "blogs"
   ],
   "name": "Tom Benzamin"
}
```

以上文档包含了 address 子文档和 tags 数组。

------

## 索引数组字段

假设我们基于标签来检索用户，为此我们需要对集合中的数组 tags 建立索引。

在数组中创建索引，需要对数组中的每个字段依次建立索引。所以在我们为数组 tags 创建索引时，会为 music、cricket、blogs三个值建立单独的索引。

使用以下命令创建数组索引：

```bash
#3.0弃用
>db.users.ensureIndex({"tags":1})

> db.users.ensureIndex({"tags":1})
uncaught exception: TypeError: db.users.ensureIndex is not a function :
@(shell):1:1
> db.users.createIndex({"tags":1})
{
        "numIndexesBefore" : 1,
        "numIndexesAfter" : 2,
        "createdCollectionAutomatically" : false,
        "ok" : 1
}
>
```

创建索引后，我们可以这样检索集合的 tags 字段：

```
>db.users.find({tags:"cricket"})
```

为了验证我们使用使用了索引，可以使用 explain 命令：

```
>db.users.find({tags:"cricket"}).explain()
```

以上命令执行结果中会显示 "cursor" : "BtreeCursor tags_1" ，则表示已经使用了索引。

```bash
db.users.find({tags:"cricket"}).explain()
{
        "explainVersion" : "1",
        "queryPlanner" : {
                "namespace" : "users.users",
                "indexFilterSet" : false,
                "parsedQuery" : {
                        "tags" : {
                                "$eq" : "cricket"
                        }
                },
                "queryHash" : "9D3B61A7",
                "planCacheKey" : "3C3D3201",
                "maxIndexedOrSolutionsReached" : false,
                "maxIndexedAndSolutionsReached" : false,
                "maxScansToExplodeReached" : false,
                "winningPlan" : {
                        "stage" : "FETCH",
                        "inputStage" : {
                                "stage" : "IXSCAN",
                                "keyPattern" : {
                                        "tags" : 1
                                },
                                "indexName" : "tags_1",
                                "isMultiKey" : true,
                                "multiKeyPaths" : {
                                        "tags" : [
                                                "tags"
                                        ]
                                },
                                "isUnique" : false,
                                "isSparse" : false,
                                "isPartial" : false,
                                "indexVersion" : 2,
                                "direction" : "forward",
                                "indexBounds" : {
                                        "tags" : [
                                                "[\"cricket\", \"cricket\"]"
                                        ]
                                }
                        }
                },
                "rejectedPlans" : [ ]
        },
        "command" : {
                "find" : "users",
                "filter" : {
                        "tags" : "cricket"
                },
                "$db" : "users"
        },
        "serverInfo" : {
                "host" : "BF-202103261718",
                "port" : 27017,
                "version" : "5.0.6-rc0",
                "gitVersion" : "60af56dfe1a17c60bbd628163fda0a161105b6c0"
        },
        "serverParameters" : {
                "internalQueryFacetBufferSizeBytes" : 104857600,
                "internalQueryFacetMaxOutputDocSizeBytes" : 104857600,
                "internalLookupStageIntermediateDocumentMaxSizeBytes" : 104857600,
                "internalDocumentSourceGroupMaxMemoryBytes" : 104857600,
                "internalQueryMaxBlockingSortMemoryUsageBytes" : 104857600,
                "internalQueryProhibitBlockingMergeOnMongoS" : 0,
                "internalQueryMaxAddToSetBytes" : 104857600,
                "internalDocumentSourceSetWindowFieldsMaxMemoryBytes" : 104857600
        },
        "ok" : 1
}
>
```



------

## 索引子文档字段

假设我们需要通过city、state、pincode字段来检索文档，由于这些字段是子文档的字段，所以我们需要对子文档建立索引。

为子文档的三个字段创建索引，命令如下：

```
>db.users.ensureIndex({"address.city":1,"address.state":1,"address.pincode":1})
```

一旦创建索引，我们可以使用子文档的字段来检索数据：

```
>db.users.find({"address.city":"Los Angeles"})   
```

查询表达不一定遵循指定的索引的顺序，mongodb 会自动优化。所以上面创建的索引将支持以下查询：

```
>db.users.find({"address.state":"California","address.city":"Los Angeles"}) 
```

同样支持以下查询：

```
>db.users.find({"address.city":"Los Angeles","address.state":"California","address.pincode":"123"})
```

# 二三、索引限制

------

## 额外开销

每个索引占据一定的存储空间，在进行插入，更新和删除操作时也需要对索引进行操作。所以，如果你很少对集合进行读取操作，建议不使用索引。

------

## 内存(RAM)使用

由于索引是存储在内存(RAM)中,你应该确保该索引的大小不超过内存的限制。

如果索引的大小大于内存的限制，MongoDB会删除一些索引，这将导致性能下降。

------

## 查询限制

索引不能被以下的查询使用：

- 正则表达式及非操作符，如 $nin, $not, 等。
- 算术运算符，如 $mod, 等。
- $where 子句

所以，检测你的语句是否使用索引是一个好的习惯，可以用explain来查看。

------

## 索引键限制

从2.6版本开始，如果现有的索引字段的值超过索引键的限制，MongoDB中不会创建索引。

------

## 插入文档超过索引键限制

如果文档的索引字段值超过了索引键的限制，MongoDB不会将任何文档转换成索引的集合。与mongorestore和mongoimport工具类似。

------

## 最大范围

- 集合中索引不能超过64个
- 索引名的长度不能超过128个字符
- 一个复合索引最多可以有31个字段

# 二四、MongoDB ObjectId

------

在前面几个章节中我们已经使用了MongoDB 的对象 Id(ObjectId)。

在本章节中，我们将了解的ObjectId的结构。

ObjectId 是一个12字节 BSON 类型数据，有以下格式：

- 前4个字节表示时间戳
- 接下来的3个字节是机器标识码
- 紧接的两个字节由进程id组成（PID）
- 最后三个字节是随机数。

MongoDB中存储的文档必须有一个"_id"键。这个键的值可以是任何类型的，默认是个ObjectId对象。

在一个集合里面，每个文档都有唯一的"_id"值，来确保集合里面每个文档都能被唯一标识。

MongoDB采用ObjectId，而不是其他比较常规的做法（比如自动增加的主键）的主要原因，因为在多个 服务器上同步自动增加主键值既费力还费时。

------

## 创建新的ObjectId

使用以下代码生成新的ObjectId：

```
>newObjectId = ObjectId()
```

上面的语句返回以下唯一生成的id：

```
ObjectId("5349b4ddd2781d08c09890f3")
```

你也可以使用生成的id来取代MongoDB自动生成的ObjectId：

```
>myObjectId = ObjectId("5349b4ddd2781d08c09890f4")
```

------

## 创建文档的时间戳

由于 ObjectId 中存储了 4 个字节的时间戳，所以你不需要为你的文档保存时间戳字段，你可以通过 getTimestamp 函数来获取文档的创建时间:

```
>ObjectId("5349b4ddd2781d08c09890f4").getTimestamp()
```

以上代码将返回 ISO 格式的文档创建时间：

```
ISODate("2014-04-12T21:49:17Z")
```

------

## ObjectId 转换为字符串

在某些情况下，您可能需要将ObjectId转换为字符串格式。你可以使用下面的代码：

```
>new ObjectId().str
```

以上代码将返回Guid格式的字符串：：

```
5349b4ddd2781d08c09890f3
```

# 二五、 Map Reduce

Map-Reduce是一种计算模型，简单的说就是将大批量的工作（数据）分解（MAP）执行，然后再将结果合并成最终结果（REDUCE）。

MongoDB提供的Map-Reduce非常灵活，对于大规模数据分析也相当实用。

### MapReduce 命令

以下是MapReduce的基本语法：

```
>db.collection.mapReduce(
   function() {emit(key,value);},  //map 函数
   function(key,values) {return reduceFunction},   //reduce 函数
   {
      out: collection,
      query: document,
      sort: document,
      limit: number
   }
)
```

使用 MapReduce 要实现两个函数 Map 函数和 Reduce 函数,Map 函数调用 emit(key, value), 遍历 collection 中所有的记录, 将 key 与 value 传递给 Reduce 函数进行处理。

Map 函数必须调用 emit(key, value) 返回键值对。

参数说明:

- **map** ：映射函数 (生成键值对序列,作为 reduce 函数参数)。
- **reduce** 统计函数，reduce函数的任务就是将key-values变成key-value，也就是把values数组变成一个单一的值value。。
- **out** 统计结果存放集合 (不指定则使用临时集合,在客户端断开后自动删除)。
- **query** 一个筛选条件，只有满足条件的文档才会调用map函数。（query。limit，sort可以随意组合）
- **sort** 和limit结合的sort排序参数（也是在发往map函数前给文档排序），可以优化分组机制
- **limit** 发往map函数的文档数量的上限（要是没有limit，单独使用sort的用处不大）

以下实例在集合 orders 中查找 status:"A" 的数据，并根据 cust_id 来分组，并计算 amount 的总和。

![img](https://static.runoob.com/images/map-reduce.bakedsvg.svg)

------

## 使用 MapReduce

考虑以下文档结构存储用户的文章，文档存储了用户的 user_name 和文章的 status 字段：

```bash
>db.posts.insert({
   "post_text": "菜鸟教程，最全的技术文档。",
   "user_name": "mark",
   "status":"active"
})
WriteResult({ "nInserted" : 1 })
>db.posts.insert({
   "post_text": "菜鸟教程，最全的技术文档。",
   "user_name": "mark",
   "status":"active"
})
WriteResult({ "nInserted" : 1 })
>db.posts.insert({
   "post_text": "菜鸟教程，最全的技术文档。",
   "user_name": "mark",
   "status":"active"
})
WriteResult({ "nInserted" : 1 })
>db.posts.insert({
   "post_text": "菜鸟教程，最全的技术文档。",
   "user_name": "mark",
   "status":"active"
})
WriteResult({ "nInserted" : 1 })
>db.posts.insert({
   "post_text": "菜鸟教程，最全的技术文档。",
   "user_name": "mark",
   "status":"disabled"
})
WriteResult({ "nInserted" : 1 })
>db.posts.insert({
   "post_text": "菜鸟教程，最全的技术文档。",
   "user_name": "runoob",
   "status":"disabled"
})
WriteResult({ "nInserted" : 1 })
>db.posts.insert({
   "post_text": "菜鸟教程，最全的技术文档。",
   "user_name": "runoob",
   "status":"disabled"
})
WriteResult({ "nInserted" : 1 })
>db.posts.insert({
   "post_text": "菜鸟教程，最全的技术文档。",
   "user_name": "runoob",
   "status":"active"
})
WriteResult({ "nInserted" : 1 })
```

现在，我们将在 posts 集合中使用 mapReduce 函数来选取已发布的文章(status:"active")，并通过user_name分组，计算每个用户的文章数：

```bash
>db.posts.mapReduce( 
   function() { emit(this.user_name,1); }, 
   function(key, values) {return Array.sum(values)}, 
      {  
         query:{status:"active"},  
         out:"post_total" 
      }
)
```

以上 mapReduce 输出结果为：

```bash
{
        "result" : "post_total",
        "timeMillis" : 23,
        "counts" : {
                "input" : 5,
                "emit" : 5,
                "reduce" : 1,
                "output" : 2
        },
        "ok" : 1
}
```

结果表明，共有 5 个符合查询条件（status:"active"）的文档， 在map函数中生成了 5 个键值对文档，最后使用reduce函数将相同的键值分为 2 组。



具体参数说明：

- result：储存结果的collection的名字,这是个临时集合，MapReduce的连接关闭后自动就被删除了。
- timeMillis：执行花费的时间，毫秒为单位
- input：满足条件被发送到map函数的文档个数
- emit：在map函数中emit被调用的次数，也就是所有集合中的数据总量
- ouput：结果集合中的文档个数**（count对调试非常有帮助）**
- ok：是否成功，成功为1
- err：如果失败，这里可以有失败原因，不过从经验上来看，原因比较模糊，作用不大

使用 find 操作符来查看 mapReduce 的查询结果：

```
>db.posts.mapReduce( 
   function() { emit(this.user_name,1); }, 
   function(key, values) {return Array.sum(values)}, 
      {  
         query:{status:"active"},  
         out:"post_total" 
      }
).find()
```

以上查询显示如下结果:

```
{ "_id" : "mark", "value" : 4 }
{ "_id" : "runoob", "value" : 1 }
```

用类似的方式，MapReduce可以被用来构建大型复杂的聚合查询。

Map函数和Reduce函数可以使用 JavaScript 来实现，使得MapReduce的使用非常灵活和强大。

# 二六、全文检索

全文检索对每一个词建立一个索引，指明该词在文章中出现的次数和位置，当用户查询时，检索程序就根据事先建立的索引进行查找，并将查找的结果反馈给用户的检索方式。

这个过程类似于通过字典中的检索字表查字的过程。

MongoDB 从 2.4 版本开始支持全文检索，目前支持15种语言的全文索引。

- danish
- dutch
- english
- finnish
- french
- german
- hungarian
- italian
- norwegian
- portuguese
- romanian
- russian
- spanish
- swedish
- turkish

------

## 启用全文检索

MongoDB 在 2.6 版本以后是默认开启全文检索的，如果你使用之前的版本，你需要使用以下代码来启用全文检索:

```
>db.adminCommand({setParameter:true,textSearchEnabled:true})
```

或者使用命令：

```
mongod --setParameter textSearchEnabled=true
```

------

## 创建全文索引

考虑以下 posts 集合的文档数据，包含了文章内容（post_text）及标签(tags)：

```
{
   "post_text": "enjoy the mongodb articles on Runoob",
   "tags": [
      "mongodb",
      "runoob"
   ]
}
```

我们可以对 post_text 字段建立全文索引，这样我们可以搜索文章内的内容：

```
>db.posts.ensureIndex({post_text:"text"})
```

------

## 使用全文索引

现在我们已经对 post_text 建立了全文索引，我们可以搜索文章中的关键词 runoob：

```
>db.posts.find({$text:{$search:"runoob"}})
```

以下命令返回了如下包含 runoob 关键词的文档数据：

```
{ 
   "_id" : ObjectId("53493d14d852429c10000002"), 
   "post_text" : "enjoy the mongodb articles on Runoob", 
   "tags" : [ "mongodb", "runoob" ]
}
```

如果你使用的是旧版本的 MongoDB，你可以使用以下命令：

```
>db.posts.runCommand("text",{search:"runoob"})
```

使用全文索引可以提高搜索效率。

------

## 删除全文索引

删除已存在的全文索引，可以使用 find 命令查找索引名：

```
>db.posts.getIndexes()
```

通过以上命令获取索引名，本例的索引名为post_text_text，执行以下命令来删除索引：

```
>db.posts.dropIndex("post_text_text")
```

# 二七、正则表达式

正则表达式是使用单个字符串来描述、匹配一系列符合某个句法规则的字符串。

许多程序设计语言都支持利用正则表达式进行字符串操作。

MongoDB 使用 **$regex** 操作符来设置匹配字符串的正则表达式。

MongoDB使用PCRE (Perl Compatible Regular Expression) 作为正则表达式语言。

不同于全文检索，我们使用正则表达式不需要做任何配置。

考虑以下 **posts** 集合的文档结构，该文档包含了文章内容和标签：

```
{
   "post_text": "enjoy the mongodb articles on runoob",
   "tags": [
      "mongodb",
      "runoob"
   ]
}
```

------

## 使用正则表达式

以下命令使用正则表达式查找包含 runoob 字符串的文章：

```
>db.posts.find({post_text:{$regex:"runoob"}})
```

以上查询也可以写为：

```
>db.posts.find({post_text:/runoob/})
```

------

## 不区分大小写的正则表达式

如果检索需要不区分大小写，我们可以设置 $options 为 $i。

以下命令将查找不区分大小写的字符串 runoob：

```
>db.posts.find({post_text:{$regex:"runoob",$options:"$i"}})
```

集合中会返回所有包含字符串 runoob 的数据，且不区分大小写：

```
{
   "_id" : ObjectId("53493d37d852429c10000004"),
   "post_text" : "hey! this is my post on  runoob", 
   "tags" : [ "runoob" ]
} 
```

------

## 数组元素使用正则表达式

我们还可以在数组字段中使用正则表达式来查找内容。 这在标签的实现上非常有用，如果你需要查找包含以 run 开头的标签数据(ru 或 run 或 runoob)， 你可以使用以下代码：

```
>db.posts.find({tags:{$regex:"run"}})
```

------

## 优化正则表达式查询

- 如果你的文档中字段设置了索引，那么使用索引相比于正则表达式匹配查找所有的数据查询速度更快。

  

- 如果正则表达式是前缀表达式，所有匹配的数据将以指定的前缀字符串为开始。例如： 如果正则表达式为 **^tut** ，查询语句将查找以 tut 为开头的字符串。

**这里面使用正则表达式有两点需要注意：**

正则表达式中使用变量。一定要使用eval将组合的字符串进行转换，不能直接将字符串拼接后传入给表达式。否则没有报错信息，只是结果为空！实例如下：

```
var name=eval("/" + 变量值key +"/i"); 
```

以下是模糊查询包含title关键词, 且不区分大小写:

```
title:eval("/"+title+"/i")    // 等同于 title:{$regex:title,$Option:"$i"}
```

# 二八、管理工具: Rockmongo

RockMongo是PHP5写的一个MongoDB管理工具。

通过 Rockmongo 你可以管理 MongoDB服务，数据库，集合，文档，索引等等。

它提供了非常人性化的操作。类似 phpMyAdmin（PHP开发的MySql管理工具）。

Rockmongo 下载地址：https://github.com/iwind/rockmongo

![img](https://www.runoob.com/wp-content/uploads/2014/08/rockmongo.png)

------

## 简介

主要特征：

- 使用宽松的[New BSD License](https://www.opensource.org/licenses/bsd-license.php)协议
- 速度快，安装简单
- 支持多语言（目前提供中文、英文、日文、巴西葡萄牙语、法语、德语、俄语、意大利语）
- 系统
  - 可以配置多个主机，每个主机可以有多个管理员
  - 需要管理员密码才能登入操作，确保数据库的安全性
- 服务器
  - 服务器信息 (WEB服务器, PHP, PHP.ini相关指令 ...)
  - 状态
  - 数据库信息
- 数据库
  - 查询，创建和删除
  - 执行命令和Javascript代码
  - 统计信息
- 集合（相当于表）
  - 强大的查询工具
  - 读数据，写数据，更改数据，复制数据，删除数据
  - 查询、创建和删除索引
  - 清空数据
  - 批量删除和更改数据
  - 统计信息
- GridFS
  - 查看分块
  - 下载文件

------

## 安装

### 需求

- 一个能运行PHP的Web服务器，比如Apache Httpd, Nginx ...
- PHP - 需要PHP v5.1.6或更高版本，需要支持SESSION
  - 为了能连接MongoDB，你需要安装[php_mongo](https://www.runoob.com/mongodb/mongodb-install-php-driver.html)扩展

### 快速安装

- [下载安装包](https://github.com/iwind/rockmongo)
- 解压到你的网站目录下
- 用编辑器打开config.php，修改host, port, admins等参数
- 在浏览器中访问index.php，比如说：http://localhost/rockmongo/index.php
- 使用用户名和密码登录，默认为"admin"和"admin"
- 开始玩转MongoDB!

# 二九、GridFS

GridFS 用于存储和恢复那些超过16M（BSON文件限制）的文件(如：图片、音频、视频等)。

GridFS 也是文件存储的一种方式，但是它是存储在MonoDB的集合中。

GridFS 可以更好的存储大于16M的文件。

GridFS 会将大文件对象分割成多个小的chunk(文件片段),一般为256k/个,每个chunk将作为MongoDB的一个文档(document)被存储在chunks集合中。



GridFS 用两个集合来存储一个文件：fs.files与fs.chunks。

每个文件的实际内容被存在chunks(二进制数据)中,和文件有关的meta数据(filename,content_type,还有用户自定义的属性)将会被存在files集合中。

以下是简单的 fs.files 集合文档：

```
{
   "filename": "test.txt",
   "chunkSize": NumberInt(261120),
   "uploadDate": ISODate("2014-04-13T11:32:33.557Z"),
   "md5": "7b762939321e146569b07f72c62cca4f",
   "length": NumberInt(646)
}
```

以下是简单的 fs.chunks 集合文档：

```
{
   "files_id": ObjectId("534a75d19f54bfec8a2fe44b"),
   "n": NumberInt(0),
   "data": "Mongo Binary Data"
}
```

------

## GridFS 添加文件

现在我们使用 GridFS 的 put 命令来存储 mp3 文件。 调用 MongoDB 安装目录下bin的 mongofiles.exe工具。

打开命令提示符，进入到MongoDB的安装目录的bin目录中，找到mongofiles.exe，并输入下面的代码：

```
>mongofiles.exe -d gridfs put song.mp3
```

**-d gridfs** 指定存储文件的数据库名称，如果不存在该数据库，MongoDB会自动创建。如果不存在该数据库，MongoDB会自动创建。Song.mp3 是音频文件名。



使用以下命令来查看数据库中文件的文档：

```
>db.fs.files.find()
```

以上命令执行后返回以下文档数据：

```
{
   _id: ObjectId('534a811bf8b4aa4d33fdf94d'), 
   filename: "song.mp3", 
   chunkSize: 261120, 
   uploadDate: new Date(1397391643474), md5: "e4f53379c909f7bed2e9d631e15c1c41",
   length: 10401959 
}
```

我们可以看到 fs.chunks 集合中所有的区块，以下我们得到了文件的 _id 值，我们可以根据这个 _id 获取区块(chunk)的数据：

```
>db.fs.chunks.find({files_id:ObjectId('534a811bf8b4aa4d33fdf94d')})
```

以上实例中，查询返回了 40 个文档的数据，意味着mp3文件被存储在40个区块中。

# 三十、固定集合（Capped Collections）

MongoDB 固定集合（Capped Collections）是性能出色且有着固定大小的集合，对于大小固定，我们可以想象其就像一个环形队列，当集合空间用完后，再插入的元素就会覆盖最初始的头部的元素！

------

## 创建固定集合

我们通过createCollection来创建一个固定集合，且capped选项设置为true：

```
>db.createCollection("cappedLogCollection",{capped:true,size:10000})
```

还可以指定文档个数,加上max:1000属性：

```
>db.createCollection("cappedLogCollection",{capped:true,size:10000,max:1000})
```

判断集合是否为固定集合:

```
>db.cappedLogCollection.isCapped()
```

如果需要将已存在的集合转换为固定集合可以使用以下命令：

```
>db.runCommand({"convertToCapped":"posts",size:10000})
```

以上代码将我们已存在的 posts 集合转换为固定集合。

------

## 固定集合查询

固定集合文档按照插入顺序储存的,默认情况下查询就是按照插入顺序返回的,也可以使用$natural调整返回顺序。

```
>db.cappedLogCollection.find().sort({$natural:-1})
```

------

## 固定集合的功能特点

可以插入及更新,但更新不能超出collection的大小,否则更新失败,不允许删除,但是可以调用drop()删除集合中的所有行,但是drop后需要显式地重建集合。

在32位机子上一个cappped collection的最大值约为482.5M,64位上只受系统文件大小的限制。

------

## 固定集合属性及用法

### 属性

- 属性1:对固定集合进行插入速度极快
- 属性2:按照插入顺序的查询输出速度极快
- 属性3:能够在插入最新数据时,淘汰最早的数据

### 用法

- 用法1:储存日志信息
- 用法2:缓存一些少量的文档

# 三一、自动增长

MongoDB 没有像 SQL 一样有自动增长的功能， MongoDB 的 _id 是系统自动生成的12字节唯一标识。

但在某些情况下，我们可能需要实现 ObjectId 自动增长功能。

由于 MongoDB 没有实现这个功能，我们可以通过编程的方式来实现，以下我们将在 counters 集合中实现_id字段自动增长。

------

## 使用 counters 集合

考虑以下 products 文档。我们希望 _id 字段实现 从 1,2,3,4 到 n 的自动增长功能。

```
{
  "_id":1,
  "product_name": "Apple iPhone",
  "category": "mobiles"
}
```

为此，创建 counters 集合，序列字段值可以实现自动长：

```
>db.createCollection("counters")
```

现在我们向 counters 集合中插入以下文档，使用 productid 作为 key:

```
{
  "_id":"productid",
  "sequence_value": 0
}
```

sequence_value 字段是序列通过自动增长后的一个值。

使用以下命令插入 counters 集合的序列文档中：

```
>db.counters.insert({_id:"productid",sequence_value:0})
```

------

## 创建 Javascript 函数

现在，我们创建函数 getNextSequenceValue 来作为序列名的输入， 指定的序列会自动增长 1 并返回最新序列值。在本文的实例中序列名为 productid 。

```
>function getNextSequenceValue(sequenceName){
   var sequenceDocument = db.counters.findAndModify(
      {
         query:{_id: sequenceName },
         update: {$inc:{sequence_value:1}},
         "new":true
      });
   return sequenceDocument.sequence_value;
}
```

------

## 使用 Javascript 函数

接下来我们将使用 getNextSequenceValue 函数创建一个新的文档， 并设置文档 _id 自动为返回的序列值：

```
>db.products.insert({
   "_id":getNextSequenceValue("productid"),
   "product_name":"Apple iPhone",
   "category":"mobiles"})

>db.products.insert({
   "_id":getNextSequenceValue("productid"),
   "product_name":"Samsung S3",
   "category":"mobiles"})
```

就如你所看到的，我们使用 getNextSequenceValue 函数来设置 _id 字段。

为了验证函数是否有效，我们可以使用以下命令读取文档：

```
>db.products.find()
```

以上命令将返回以下结果，我们发现 _id 字段是自增长的：

```
{ "_id" : 1, "product_name" : "Apple iPhone", "category" : "mobiles"}

{ "_id" : 2, "product_name" : "Samsung S3", "category" : "mobiles" }
```
