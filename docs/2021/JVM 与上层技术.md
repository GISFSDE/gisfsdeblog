---
index: 2
icon: markdown
title: JVM与上层技术
date: 2022-06-06
category:
  - JVM与上层技术
tag:
  - JVM与上层技术
---
> 向下扎深，向上扩展

<!-- more -->

> # 新学四问
>
> **WHY【与前代优化了什么，弥补了什么空白】**：了解底层，优化，面试，解决底层BUG
> **WHAT【框架，思维导图，主题框架】**：结构，
> **HOW【如何记忆，学习资源】**：学习资源：尚硅谷JVM，ANKI记忆，[文档](https://docs.oracle.com/en/java/javase/17/vm/java-virtual-machine-technology-overview.html)
> **LEVEL【不是每个都学精】**：了解

# 进度：上篇 【完12.19】

# 综合问题

## 类加载过程

## 整体结构

## 如何判断一个对象是否存活

## 垃圾回收算法

## 垃圾回收器

## 深拷贝浅拷贝

## 双亲委派机制

## StringTable

## 优化方法

# 上篇：==内存与垃圾回收==

# 速查

## [-XX选项表](https://docs.oracle.com/javase/8/docs/technotes/tools/unix/java.html)

### 堆

| 选项名                                                       | 选项作用                                              | 默认值             | 备注 |
| ------------------------------------------------------------ | ----------------------------------------------------- | ------------------ | ---- |
| -XX:  +PrintFlagsInitial                                     | 查看所有的参数的默认初始值                            |                    |      |
| -XX:  +PrintFlagsFinal                                       | 查看所有的参数的最终值（可能会存在修改，不再是初始值) |                    |      |
| jps                                                          | 查看当前运行中的进程                                  |                    |      |
| jinfo -flag 参数名 进程id                                    | 当前进程中参数值                                      |                    |      |
| -Xms                                                         | 初始雄空向内存                                        | 物理内存的1/64     |      |
| -Xmx                                                         | :最大雄空间内存                                       | 物理内存的1/4      |      |
| -Xmn                                                         | :设置新生代的大小。（初始值及最大值）                 |                    |      |
| -XX: NewRatio                                                | :配置新生代与老年代在堆结构的占比                     | 新老比：1:2        |      |
| -XX: SurvivorRatio                                           | :设置新生代中Eden和S0/S1空间比例                      | 8                  |      |
| -XX: MaxTenuringThreshold                                    | :设置新生代垃扱的最大年龄                             |                    |      |
| -XX:  +PrintGCdetails                                        | :输出详细GC处理日志                                   |                    |      |
| :sun_with_face: -XX:  +PrintGC  :sun_with_face: - verbose:GC | :打印筒要信息                                         |                    |      |
| -XX: HandlePromotionFailure                                  | :是否设置空问分配担保                                 |                    |      |
| -XX:  Doescapeanalysis                                       | 显式开启逃逸分析                                      | JDK 6u23后默认开启 |      |
| -XX:  Printescapeanalysis                                    | 查看逃逸分析的筛选结果                                |                    |      |
| -XX:+EliminateAllocations                                    | :开启标量替换，允许将对象打散分配在栈上。             | 默认打开           |      |

### **方法区**

| 选项名 | 选项作用 | 默认值 | 备注 |
| ------ | -------- | ------ | ---- |
|        |          |        |      |

### 垃圾回收器

| 选项名 | 选项作用 | 默认值 | 备注 |
| ------ | -------- | ------ | ---- |
|        |          |        |      |

# 一、JVM与JAVA体系结构

## 1.JAVA与JVM

### Java大事件

- 1990年，在sun公司中，由Patrick naughton、mikesheridan以及james Gosling领导的小组Green Team，开发出新的程序语言，命名为OAK，后期更名为Java
- 1995年，sun正式发布Java和hotJAVA产品，Java首次公开亮相。
- 1996年1月23日sun Microsystems发布了JDK1.0.
- 1998年，JDK1.2版本发布。同时，sun发布了JSP/Servlet、EJB规范，以及将Java分成了J2EE、J2SE和J2ME。这表明Java开始向企业、桌面应用和移动设备应用3大领域挺进。
- 2000年，JDK1.3发布，Java HotSpot Virtual Machine正式发布，成为Java默认的虚拟机。
- 2002年，JDK 1.4发布，古老的classic虚拟机退出历史舞台。
- 2003年底，Java平台的scala正式发布，同年Groovy也加入了Java阵营。
- 2004年，JDK1.5发布，同时JDK1.5改名为JavaSE5.0.
- 2006年，JDK 6发布，同年Java开源并建立了openJDK，顺理成章，Hotspot虚拟机成为了OpenJDK中默认的虚拟机。
- 2007年，Java平台迎来了新伙伴Clojure。
- 2008年，Oracle收购了BEA，得到了JRockit虚拟机。
- 2009年，Twitter宣布将后台大部分程序从ruby迁移到Scala，这是Java平台的有一次大规模应用。
- 2010年，Oracle收购了sun，获得Java商标和最具价值的hotspot虚拟机。此时Oracle拥有市场占用率最高的两款虚拟机hotspot和JRockit，并且计划未来进行整合：HotRockit。
- 2011年，JDK7发布，在JDK１.7ｕ4中，正式启用了新的垃圾回收器G1.
- 2017年，JDK9发布，将G1设置为默认GC，替代CMS。
- 2017同年，IBM的J9开源，形成了现在的open J9社区。
- 2018年，Android的Java侵权案判决，Google公司赔偿Oracle总计88亿美元。
- 2018同年，Oracle宣布JavaEE成为历史名词，JDBC、JMS、Servlet赠与Eclipse基金会。
- 2018同年，JDK11发布，LTS版本的JDK，发布革命性的ZGC，调整JDK授权许可。
- 2019年，JDK12发布，加入RedHat领导开发的shenandoah GC。
- 在JDK11之前，OracleJDK还会存在一些openJDK中没有的、闭源的功能。但在JDK11中，openJDK和OracleJDK代码实质上已经达到完全一致的程度。

### JVM介绍

​		所谓虚拟机(Virtual Machine)，就是一台虚拟的计算机。它是一款软件，用来执行一系列虚拟计算机指令。大体上，虚拟机可以分为**系统虚拟机**和**程序虚拟机**。大名鼎鼎的Visual Box,VMware就属于系统虚拟机，它们完全是对物理计算机的仿真，提供了一个可运行完整操作系统的软件平台。程序虚拟机的典型代表就是Java虚拟机，它专门为执行单个计算机程序而设计，在Java虚拟机中执行的指令我们称为Java字节码指令。无论是系统虚拟机还是程序虚拟机，在上面运行的软件都被限制于虚拟机提供的资源中。

​		Java虚拟机是一台执行Java字节码的虚拟计算机，它拥有独立的运行机制,其运行的Java字节码也未必由Java语言编译而成。JVM平台的各种语言可以共享Java虚拟机带来的跨平台性、优秀的垃圾回器，以及可靠的即时编译器。Java技术的核心就是Java虚拟机（JVM，Java Virtual Machine) ,因为所有的Java程序都运行在Java虚拟机内部。

**作用：**Java虚拟机就是二进制字节码的运行环境，负责装载字节码到其内部，解释/编译为对应平台上的机器指令执行。每一条Java指令，Java虚拟机规范都有详细定义，如怎么取操作数，怎么处理操作数，处理结果放在哪里。
**特点：**一次编译，到处运行；自动内存管理；自动垃圾回收功能

<img src="http://rcy276gfy.hd-bkt.clouddn.com/work/%E7%AC%AC01%E7%AB%A0_JVM%E8%B7%A8%E8%AF%AD%E8%A8%80%E7%9A%84%E5%B9%B3%E5%8F%B0.jpg" alt="第01章_JVM跨语言的平台" style="zoom: 50%;" />

**位置：**

<img src="http://rcy276gfy.hd-bkt.clouddn.com/work/%E7%AC%AC01%E7%AB%A0_JVM%E6%89%80%E5%A4%84%E4%BD%8D%E7%BD%AE.jpg" alt="第01章_JVM所处位置" style="zoom:50%;" />

<img src="http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211111191323311.png" alt="image-20211111191323311" style="zoom: 80%;" />

## JVM整体结构

<img src="http://rcy276gfy.hd-bkt.clouddn.com/work/%E7%AC%AC02%E7%AB%A0_JVM%E6%9E%B6%E6%9E%84-%E7%AE%80%E5%9B%BE.jpg" alt="第02章_JVM架构-简图" style="zoom:50%;" />

<img src="http://rcy276gfy.hd-bkt.clouddn.com/work/%E7%AC%AC02%E7%AB%A0_JVM%E6%9E%B6%E6%9E%84-%E4%B8%AD.jpg" alt="第02章_JVM架构-中" style="zoom:50%;" />
<img src="http://rcy276gfy.hd-bkt.clouddn.com/work/%E7%AC%AC02%E7%AB%A0_JVM%E6%9E%B6%E6%9E%84-%E8%8B%B1.jpg" alt="第02章_JVM架构-英" style="zoom:50%;" />

## Java代码执行流程

​		![image-20211111192234413](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211111192234413.png)

## JVM架构模型

Java编译器输入的指令流基本上是一种**基于栈的指令集架构**，另外一种指令集架构则是基于寄存器的指令集架构。

**区别:**

**·基于栈式架构的特点**
设计和实现更简单，适用于资源受限的系统;
避开了寄存器的分配难题:使用零地址指令方式分配。
指令流中的指令大部分是零地址指令，其执行过程依赖于操作栈。指令集更小，编译器容易实现。
不需要硬件支持，可移植性更好，更好实现跨平台

**基于寄存器架构的特点**
典型的应用是x86的二进制指令集:比如传统的PC以及Android的Davlik虚拟机。
指令集架构则完全依赖硬件,可移植性差
性能优秀和执行更高效;
花费更少的指令去完成一项操作。
在大部分情况下，基于寄存器架构的指令集往往都以一地址指令、二地址指令和三地址指令为主，而基于栈式架构的指令集却是以零地址指令为主。

**总结:**
由于跨平台性的设计，Java的指令都是根据栈来设计的。不同平台CPU架构不同，所以不能设计为基于寄存器的。优点是跨平台，指令集小，编译器容易实现，缺点是性能下降，实现同样的功能需要更多的指令。时至今日，尽管嵌入式平台已经不是Java程序的主流运行平台了（准确的来说HotSpotVM的宿主环境已经不局限于嵌入式平台了)，那么为什么不将架构更换为基于寄存器的架构呢?
栈:
跨平台性、指令集小、指令多;执行性能比寄存器差

## JVM生命周期

### 启动

Java虚拟机的启动是通过**引导类加载器(bootstrap class loader)**创建一个**初始类**(initial class)来完成的，这个类是由虚拟机的具体实现指定的

### 执行

一个运行中的Java虚拟机有着一个清晰的任务:执行Java程序。
程序开始执行时他才运行，程序结束时他就停止。
执行一个所谓的Java程序的时候，真真正正在执行的是一个叫做**Java虚拟机的进程**。

### 退出

有如下的几种情况:。程序正常执行结束
·程序在执行过程中遇到了异常或错误而异常终止·由于操作系统出现错误而导致Java虚拟机进程终止
·某线程调用Runtime类或system类的exit方法，或Runtime类的halt方法，并且Java安全管理器也允许这次exit或halt操作。
·除此之外，JNI ( Java Native Interface)规范描述了用JNI Invocation API来加载或卸载Java虚拟机时，Java虚拟机的退出情况。

## JVM发展历程

### SUN Classic VM

·早在1996年Java1.0版本的时候，sun公司发布了一款名为Sun Classic VM的Java虚拟机，它同时也是世界上第一款商用Java虚拟机，JDK1.4时完全被淘汰。
·这款虚拟机内部只提供解释器。
·如果使用JIT编译器，就需要进行外挂。但是一旦使用了JIT编译器JIT就会接管虚拟机的执行系统。解释器就不再工作。解释器和编译器不能配合工作。
·现在hotspot内置了此虚拟机。

### Exact VM

·为了解决上一个虚拟机问题，jdk1.2时，sun提供了此虚拟机。
Exact Memory Management:准确式内存管理
·也可以叫Non-conservative/Accurate Memory Management：虚拟机可以知道内存中某个位置的数据具体是什么类型。
具备现代高性能虚拟机的雏形
·热点探测
·编译器与解释器混合工作模式I
只在solaris平台短暂使用，其他平台上还是classic vm
·英雄气短，终被Hotspot虚拟机替换

### **SUN公司的 HotSpot VM**

#### HotSpot历史

·最初由一家名为“Longview Technologies"的小公司设计1997年，此公司被sun收购;2009年，sun公司被甲骨文收购。
·JDK1.3时，HotSpot VM成为默认虚拟机
·目前Hotspot占有绝对的市场地位，称霸武林。
	不管是现在仍在广泛使用的JDK6，还是使用比例较多的JDK8中，默认的虚拟机都是HotSpot
	sun/ oracle JDK 和 OpenJDK的默认虚拟机
	因此本课程中默认介绍的虚拟机都是HotSpot，相关机制也主要是指HotSpot的GC机制。(比如其他两个商用虚拟机都没有方法区的概念)
·从服务器、桌面到移动端、嵌入式都有应用。
·名称中的HotSpot指的就是它的热点代码探测技术。
	通过计数器找到最具编译价值代码，触发即时编译或栈上替换
	通过编译器与解释器协同工作，在最优化的程序响应时间与最佳执行性能中取得平衡

### BEA 的JRockit

·专注于服务器端应用
	它可以不太关注程序启动速度，因此JRockit内部不包含解析器实现，全部代码都靠即时编译器编译后执行。
·大量的行业基准测试显示，JRockit JVM是世界上最快的JVM。
使用JRockit产品，客户已经体验到了显著的性能提高（一些超过了70% ）和硬件成本的减少(达50%）。
·优势:全面的Java运行时解决方案组合
JRockit面向延迟敏感型应用的解决方案JRockit Real Time提供以毫秒或微秒级的JVM响应时间，适合财务、军事指挥、电信网络的需要MissionControl服务套件，它是一组以极低的开销来监控、管理和分析生产环境中的应用程序的工具。
 2008年，BEA被oracle收购。
oracle表达了整合两大优秀虚拟机的工作，大致在JDK 8中完成。整合的方式是在HotSpot的基础上，移植JRockit的优秀特性。
·高斯林:目前就职于谷歌，研究人工智能和水下机器人

### IBM 的J9

全称:IBM Technology for Java virtual Machine，简称IT4J，内部代号:J9
·市场定位与HotSpot接近，服务器端、桌面应用、嵌入式等多用途VM。
·广泛用于IBM的各种Java产品。 
·目前，有影响力的三大商用虚拟机之一，也号称是世界上最快的Java虚拟机。
·2017年左右，IBM发布了开源J9 VM，命名为openJ9，交给Eclipse基金会管理，也称为Eclipse OpenJ9

### KVM和cDC/CL.DC Hotspot

oracle在Java ME产品线上的两款虚拟机为:CDC/CLDC HotSpot Implementation VM KVM (Kilobyte）是CLDC-HI早期产品
·目前移动领域地位尴尬，智能手机被Android和ioS二分天下。
.KVM简单、轻量、高度可移植，面向更低端的设备上还维持自己的一片市场
	智能控制器、传感器老人手机、经济欠发达地区的功能手机
.所有的虚拟机的原则:一次编译，到处运行。

### Azul VM

·前面三大“高性能Java虚拟机”使用在通用硬件平台上
·这里Azul VM和BEA Liquid VM是与特定硬件平台绑定、软硬件配合的专有虚拟机
	高性能Java虚拟机中的战斗机。
Azul VM是Azul systems公司在HotSpot基础上进行大量改进，运行于Azul systems公司的专有硬件vega系统上的Java虚拟机。
·每个Azul VM实例都可以管理至少数十个CPU和数百GB内存的硬件资源，并提供在巨大内存范围内实现可控的GC时间的垃圾收集器、专有硬件优化的线程调度等优秀特性。
2010年，Azul systems公司开始从硬件转向软件，发布了自己的ZingJVM，可以在通用x86平台上提供接近于Vega系统的特性。

### Liquid VM

·高性能Java虚拟机中的战斗机。
·BEA公司开发的，直接运行在自家Hypervisor系统上
·Liquid VM即是现在的JRockit VE(Virtual Edition） ,LiquidVM不需要操作系统的支持，或者说它自己本身实现了一个专用操作系统的必要功能，如线程调度、文件系统、网络支持等。
·随着JRockit虚拟机终止开发，Liquid VM项目也停止了。

### Apache Harmony

 Apache也曾经推出过与JDK 1.5和JDK 1.6兼容的Java运行平台Apache Harmony。
·它是IBM和Intel联合开发的开源JVM，受到同样开源的openJDK的压制，sun坚决不让Harmony获得JCP认证，最终于2011年退役，IBM转而参与OpenJDK
·虽然目前并没有Apache Harmony被大规模商用的案例，但是它的Java类库代码吸纳进了Android SDK。

### Microsoft JVM

·微软为了在IE3浏览器中支持Java Applets，开发了Microsoft JVM。·只能在window平台下运行。但确是当时windows下性能最好的Java VM.. 1997年，sun以侵犯商标、不正当竞争罪名指控微软成功，赔了sun很多钱。微软在windowsXP SP3中抹掉了其VM。现在windows上安装的jdk都是HotSpot。

### TaobaoJVM

·由AliJVM团队发布。阿里，国内使用Java最强大的公司，覆盖云计算、金雷生切一电商等众多领域，需要解决高并发、高可用、分布式的复合问题。有大重的开源广的。
·基于openJDK开发了自己的定制版本AlibabaJDK，简称AJDK。是整个阿里Java体系的基石。
·基于openJDK HotSpot VM 发布的国内第一个优化、深度定制且开源的高性能服务器版Java虚拟机。
	创新的GCIH (GC invisible heap ）技术实现了off-heap ，即将生命周期较长的Java对象从heap中移到heap之外，并且GC不能管理GCIH内部的Java 对象，以此达到降低GC的回收频率和提升GC 的回收效率的目的。
	GCIH 中的对象还能够在多个Java虚拟机进程中实现共享
	使用crc32指令实现JVM intrinsic降低JNI 的调用开销
	PMU hardware 的Java profiling tool和诊断协助功能
	针对大数据场景的ZenGC
. taobao vm应用在阿里产品上性能高，硬件严重依赖intel的cpu，损失了兼容性，但提高了性能
	目前已经在淘宝、天猫上线，把oracle 官方JVM版本全部替换了。

### Dalvik VM :

·谷歌开发的，应用于Android系统，并在Android2.2中提供了JIT，发展迅猛。.Dalvik VM只能称作虚拟机，而不能称作“Java虚拟机”，它没有遵循
Java虚拟机规范
·不能直接执行Java 的class 文件·基于寄存器架构，不是jvm的栈架构。
·执行的是编译以后的dex(Dalvik Executable）文件。执行效率比较高
	它执行的dex (Dalvik Executable）文件可以通过class文件转化而来，使用Java语法编写应用程序，可以直接使用大部分的Java API等。
·Android 5.0使用支持提前编译(Ahead of Time Compilation，AOT）的ARTVM替换Dalvik VM。

### Graal VM

. 2018年4月，oracle Labs公开了Graal VM，号称"Run Programs Faster Anywhere"，勃勃野心。与1995年java的”write once，run anywhere"遥相呼应。
Graal VM在HotSpot VM基础上增强而成的跨语言全栈虚拟机，可以作为“任何语言”的运行平台使用。语言包括: Java、Scala、Groovy、Kotlin;C、C++
Javascript、Ruby、Python、R等
·支持不同语言中混用对方的接口和对象，支持这些语言使用已经编写好的本地库文件工作原理是将这些语言的源代码或源代码编译后的中间格式，通过解释器转换为能被Graal VM接受的中间表示。Graal VM提供Truffle工具集快速构建面向一种新语言的解释器。在运行时还能进行即时编译优化，获得比原生编译器更优秀的执行效率。
如果说HotSpot有一天真的被取代，Graal VM希望最大。但是Java的软件生态没有丝毫变化。

# 二、类加载子系统

## 1.内存简图

<img src="http://rcy276gfy.hd-bkt.clouddn.com/work/第02章_JVM架构-简图.jpg" style="zoom: 50%;" />

<img src="http://rcy276gfy.hd-bkt.clouddn.com/work/%E7%AC%AC02%E7%AB%A0_JVM%E6%9E%B6%E6%9E%84-%E8%8B%B1.jpg" style="zoom: 50%;" />

<img src="http://rcy276gfy.hd-bkt.clouddn.com/work/%E7%AC%AC02%E7%AB%A0_JVM%E6%9E%B6%E6%9E%84-%E4%B8%AD.jpg" style="zoom: 50%;" />

## 2.类加载器

​	类加载器子系统负责从文件系统或者网络中加载class文件，class文件在文件开头有特定的文件标识。
ClassLoader只负责class文件的加载，至于它是否可以运行，则由ExecutionEngine决定。
加载的类信息存放于一块称为方法区的内存空间。除了类的信息外，方法区中还会存放运行时常量池信息，可能还包括字符串字面量和数字常量（这部分常量信息是Class文件中常量池部分的内存映射)

![image-20211115193632367](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211115193632367.png)

## 3.类加载器ClassLoader角色

1. class file 存在于本地硬盘上，可以理解为设计师画在纸上的模板，而最终这个模板在执行的时候是要加载到JVM当中来，根据这个文件实例化出n个一模一样的实例。
2. class file 加载到JVM中，被称为**DNA元数据模板**，放在**方法区**。
3. 在.class文件-> JVM ->最终成为元数据模板，此过程就要一个**运输工具(类装载器class Loader)**，扮演一个快递员的角色。

![image-20211115194329061](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211115194329061.png)

![image-20211116140445121](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211116140445121.png)

### 获取ClassLoader途经

![image-20211116140425056](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211116140425056.png)

## 4.类加载过程



<img src="http://rcy276gfy.hd-bkt.clouddn.com/work/%E7%AC%AC02%E7%AB%A0_%E7%B1%BB%E7%9A%84%E5%8A%A0%E8%BD%BD%E8%BF%87%E7%A8%8B.jpg" alt="image-20211115194329061" style="zoom: 50%;" />

<img src="http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211115194822559.png" alt="image-20211115194329061" style="zoom: 80%;" />

### 加载(Loading):

1．通过一个类的全限定名获取定义此类的二进制字节流
2．将这个字节流所代表的静态存储结构转化为方法区的运行时数据结构
3．在内存中生成一个代表这个类的 **java.lang.Class** 对象，作为方法区这个类的各种数据的访问入口
补充:加载.class文件的方式
·从本地系统中直接加载
·通过网络获取，典型场景: web Applet
·从zip压缩包中读取，成为日后jar、 war格式的基础·运行时计算生成，使用最多的是:动态代理技术
·由其他文件生成，典型场景:JSP应用
·从专有数据库中提取.class文件,比较少见
·从加密文件中获取，典型的防class文件被反编译的保护措施

### 链接

#### 验证(Verify):

·目的在于**确保class文件的字节流中包含信息符合当前虚拟机要求**，保证被加载类的正确性，不会危害虚拟机自身安全。
·主要包括四种验证，文件格式验证，元数据验证，字节码验证，符号引用验证。

#### 准备(Prepare):

·为类变量**分配**内存并且设置该类变量的**默认初始值**，即零值。
这里不包含用final修饰的static，因为final在编译的时候就会分配了，准备阶段会显式链初始化;
·这里不会为实例变量分配初始化，类变量会分配在方法区中，而实例变量是会随着对象一起分配到Java堆中。

#### 解析(Resolve) :

·**将常量池内的符号引用转换为直接引用的过程。**
·事实上，解析操作往往会伴随着JVM在执行完初始化之后再执行。
·**符号引用**就是一组符号来描述所引用的目标。符号引用的字面量形式明确定义在《java虚拟机规范》的class文件格式中。**直接引用**就是直接指向目标的指针、相对偏移量或一个间接定位到目标的句柄。
·解析动作主要针对类或接口、字段、类方法、接口方法、方法类型等。对应常量池中的 CONSTANT Class info、CONSTANT Fieldref_info、CONSTANT _Methodref_info等.。

### 初始化:

·初始化阶段就是**执行类构造器方法\<clinit> ()的过程**。
·此方法不需定义，是javac编译器自动收集类中的所有类变量的赋值动作和静态代码块中的语句合并而来。
·构造器方法中指令按语句在源文件中出现的顺序执行。
. \<clinit> ()不同于类的构造器。(关联:构造器是虚拟机视角下的\<init>( ))·若该类具有父类，JVM会保证子类的\<clinit>()执行前，父类的\<clinit> ()已经执行完毕。
·虚拟机必须保证一个类的\<clinit> ()方法在多线程下被同步加锁。

## 5.类加载器分类

JVM支持两种类型的类加载器，分别为**引导类加载器**（Bootstrap ClassLoader）和**自定义类加载器**(User-Defined ClassLoader)。
·从概念上来讲，自定义类加载器一般指的是程序中由开发人员自定义的一类类加载器，但是Java虚拟机规范却没有这么定义，而是将所有派生于抽象类ClassLoader的类加载器都划分为自定义类加载器。
·无论类加载器的类型如何划分，在程序中我们最常见的类加载器始终只有3个，如下所示:

![image-20211116133613669](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211116133613669.png)

![image-20211116133718130](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211116133718130.png)

虚拟机自带的加载器

### ·启动类加载器（引导类加载器，Bootstrap classLoader)

- 这个类加载使用**C/C++**语言实现的，嵌套在JVM内部。

- 它用来加载Java的**核心库**（JAVA HOME/jre/lib/rt.jar、resources.jar或sun.boot.class.path路径下的内容），用于提供JVM自身需要的类
- 并不继承自java.lang.classLoader，没有父加载器。加载扩展类和应用程序类加载器，并指定为他们的父类加载器。
- 出于安全考虑，Bootstrap启动类加载器只加载包名为**java、javax、sun**等开头的类

### ·扩展类加载器（Extension ClassLoader)

Java语言编写，由sun.misc.Launcher$ExtClassLoader实现。派生于classLoader类
父类加载器为启动类加载器
从java.ext.dirs系统属性所指定的目录中加载类库，或从JDK的安装目录的**jre/lib/ext**子目录（扩展目录)下加载类库。如果用户创建的JAR放在此目录下，也会自动由扩展类加载器加载。

### ·应用程序类加载器（系统类加载器，AppClassLoader)

java语言编写，由sun.misc.Launcher$AppclassLoader实现>派生于classLoader类
父类加载器为扩展类加载器
它负责加载环境变量classpath或系统属性java.class.**path**指定路径下的类库
该类加载是程序中**默认的类加载器**，一般来说，Java应用的类都是由它来完成加载
通过classLoader#getSystemClassLoader ()方法可以获取到该类加载器

#### **用户自定义类加载器**

·在Java的日常应用程序开发中，类的加载几乎是由上述3种类加载器相互配合执行的，在必要时，我们还可以自定义类加载器，来定制类的加载方式。
.为什么要自定义类加载器?
隔离加载类
修改类加载的方式
扩展加载源
防止源码泄漏

#### **用户自定义类加载器实现步骤:**

1.开发人员可以通过继承抽象类java.lang.classLoader类的方式，实现自己的类加载器，以满足一些特殊的需求
2.在JDK1.2之前，在自定义类加载器时，总会去继承classLoader类并重写loadClass ()方法，从而实现自定义的类加载类，但是在JDK1.2之后已不再建议用户去覆盖loadclass ()方法，而是建议把自定义的类加载逻辑写在findclass ()方法中
3．在编写自定义类加载器时，如果没有太过于复杂的需求，可以直接继承URLClassLoader类，这样就可以避免自己去编写findclass ()方法及其获取字节码流的方式，使自定义类加载器编写更加简洁。

## 6.双亲委派机制

​	Java虚拟机对class文件采用的是**按需加载**的方式，也就是说当需要使用该类时才会将它的class文件加载到内存生成class对象。而且加载某个类的class文件时，Java虚拟机采用的是双亲委派模式，即把请求**交由父类处理**,它是一种任务委派模式。

### **工作原理**

1)如果一个类加载器收到了类加载请求，它并不会自己先去加载，而是把这个请求**委托给父类**的加载器去执行;
2)如果父类加载器还存在其父类加载器，则进一步向上委托，依次递归，请求最终将到达顶层的启动类加载器;
3)如果父类加载器可以完成类加载任务，就成功返回，倘若父类加载器无法完成此加载任务，子加载器才会尝试自己去加载，这就是双亲委派模式。

即**向上委托，向下甩锅**

![image-20211116182608650](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211116182608650.png)

### **双亲委派优势**

避免类的重复加载
保护程序安全，防止核心API被随意篡改
	自定义类:java. lang. string
	自定义类: java . lang. shkStart
java.lang. securityException: Prohibited package name: java.lang

![image-20211116183030909](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211116183030909.png)

### 沙箱安全机制

​	自定义string类，但是在加载自定义String类的时候会率先使用引导类加载器加载，而引导类加载器在加载的过程中会先加载jdk自带的文件(rt.jar包中java\lang\String.class)，报错信息说没有main方法，就是因为加载的是rt.jar包中的String类。这样可以保证对java核心源代码的保护，这就是沙箱安全机制。即**先用java核心源码再往外层用**

## 7.其他

·在JVM中表示两个class对象是否为同一个类存在两个必要条件:
	类的完整类名必须一致，包括包名。
	加载这个类的classLoader(指classLoader实例对象)必须相同。
·换句话说，在VM中，即使这两个类对象(class对象)来源同一个class文件，被同一个虚拟机所加载，但只要加载它们的ClassLoader实例对象不同，那么这两个类对象也是不相等的。

### **对类加载其的引用**

JVM必须知道一个类型是由启动加载器加载的还是由用户类加载器加载的。如果一个类型是由用户类加载器加载的，那么JVM会将这个类加载器的一个引用作为类型信息的一部分保存在方法区中。当解析一个类型到另一个类型的引用的时候，JVM需要保证这两个类型的类加载器是相同的。

### 类的主动使用和被动使用

Java程序对类的使用方式分为:主动使用和被动使用。·主动使用，又分为七种情况:
·创建类的实例
·访问某个类或接口的静态变量，或者对该静态变量赋值
·调用类的静态方法
·反射（比如: Class.forName ( "com.atguigu . Test") )>
·初始化一个类的子类
·Java虚拟机启动时被标明为启动类的类
·JDK 7开始提供的动态语言支持:java . lang.invoke.MethodHandle实例的解析结果REF getstatic、REF putstatic、REF_invokestatic句柄对应的类没有初始化，则初始化
除了以上七种情况，其他使用Java类的方式都被看作是对类的被动使用，都不会导致类的初始化。

# 三、_运行时数据区概述及线程_

## 1.运行时数据区内部结构

​		内存是非常重要的系统资源，是**硬盘和CPU的中间仓库及桥梁**，承载着操作系统和应用程序的实时运行。JVM内存布局规定了Java在运行过程中内存申请、分配、管理的策略，保证了JVM的高效稳定运行。不同的JVM对于内存的划分方式和管理机制存在着部分差异。结合JVM虚拟机规范，来探讨一下经典的JVM内存布局。

|            | Error              | GC(Garbage Collection) | OOM(OutOfMemoryError) | StackOverflowError |
| ---------- | ------------------ | ---------------------- | --------------------- | ------------------ |
| 程序计数器 | :x:                | :x:                    | :x:                   |                    |
| 本地方法栈 | :heavy_check_mark: | :x:                    | :heavy_check_mark:    | :heavy_check_mark: |
| 虚拟机栈   | :heavy_check_mark: | :x:                    | :heavy_check_mark:    | :heavy_check_mark: |
| 堆         | :heavy_check_mark: | :heavy_check_mark:     | :heavy_check_mark:    |                    |
| 方法区     | :heavy_check_mark: | :heavy_check_mark:     | :heavy_check_mark:    |                    |

<img src="http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211117173714222.png" alt="image-20211117173714222" style="zoom: 67%;" />

<img src="http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211117173754033.png" alt="image-20211117173754033" style="zoom: 67%;" />

<img src="http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211117174004750.png" alt="image-20211117174004750" style="zoom: 67%;" />

​		Java虚拟机定义了若干种程序运行期间会使用到的运行时数据区，其中有一些会随着虚拟机启动而创建，随着虚拟机退出而销毁。另外一些则是与线程一一对应的，这些与线程对应的数据区域会随着线程开始和结束而创建和销毁。灰色的为单独线程私有的，红色的为多个线程共享的。即:**每个线程独立：包括程序计数器、栈、本地栈。每个线程共享：堆、方法区**

<img src="http://rcy276gfy.hd-bkt.clouddn.com/work/%E7%AC%AC03%E7%AB%A0_%E7%BA%BF%E7%A8%8B%E5%85%B1%E4%BA%AB%E5%92%8C%E7%A7%81%E6%9C%89%E7%9A%84%E7%BB%93%E6%9E%84.jpg" alt="第03章_线程共享和私有的结构" style="zoom:50%;" />

## 2.线程

​		线程是一个程序里的运行单元。JVM允许一个应用有多个线程并行的执行。在Hotspot JVM里，每个线程都与操作系统的本地线程直接映射。
​		当一个Java线程准备好执行以后，此时一个操作系统的本地线程也同时创建。Java线程执行终止后，本地线程也会回收。操作系统负责所有线程的安排调度到任何一个可用的CPU上。一旦本地线程初始化成功，它就会调用Java线程中的run ()方法。

​		如果你使用jconsole或者是任何一个调试工具，都能看到在后台有许多线程在运行。这些后台线程不包括调用public static void main (string[])的main线程以及所有这个main线程自己创建的线程。这些主要的后台系统线程在Hotspot JVM里主要是以下几个:

**虚拟机线程:**这种线程的操作是需要JVM达到安全点才会出现。这些操作必须在不同的线程中发生的原因是他们都需要JVM达到安全点，这样堆才不会变化。这种		 线程的执行类型包括"stop-the-world"的垃圾收集，线程栈收集，线程挂起以及偏向锁撤销。
**周期任务线程:**这种线程是时间周期事件的体现(比如中断)，他们一般用于周期性操作的调度执行。
**GC线程:**这种线程对在JVM里不同种类的垃圾收集行为提供了支持。>编译线程:这种线程在运行时会将字节码编译成到本地代码。
**信号调度线程:**这种线程接收信号并发送给JVM，在它内部通过调用适当的方法进行处理。

·线程是一个程序里的运行单元。JVM允许一个应用有多个线程并行的执行。
.在Hotspot JVM里，每个线程都与操作系统的本地线程直接映射。

当一个Java线程准备好执行以后，此时一个操作系统的本地线程也同时创建。Java线程执行终止后，本地线程也会回收。
·操作系统负责所有线程的安排调度到任何一个可用的CPU上。一旦本地线程初始化成功，它就会调用Java线程中的run ()方法。
●守护线程、普通线程

# 四、_程序计数器_

### 1.[Program Counter Register介绍](https://docs.oracle.com/javaselspecs/jvms/se8/html/)

​		JVM中的程序计数寄存器(Program counter Register)中， Register的命名源于CPU的寄存器，寄存器存储指令相关的现场信息。CPU只有把数据装载到寄存器才能够运行。这里，并非是广义上所指的物理寄存器，或许将其翻译为PC计数器（或指令计数器）会更加贴切(也称为程序钩子)，并且也不容易引起一些不必要的误会。JVM中的PC寄存器是对物理PC寄存器的一种抽象模拟。

<img src="http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211117141024972.png" alt="image-20211117141024972" style="zoom: 67%;" />

作用: 
**PC寄存器用来存储指向下一条指令的地址,也即将要执行的指令代码**。由执行引擎读取下一条指令(指令代码在java栈中对应的指令)。

![image-20211117141325424](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211117141325424.png)

它是一块很小的内存空间，几乎可以忽略不记。也是**运行速度最快的存储区域**。
在JVM规范中，每个线程都有它自己的程序计数器，是线程私有的，生命周期与线程的生命周期保持一致。
任何时间一个线程都只有一个方法在执行，也就是所谓的当前方法。程序计数器会存储当前线程正在执行的Java方法的TVM指令地址;或者，如果是在执行native方法，则是未指定值（undefned) 。

它是程序控制流的指示器，分支、循环、跳转、异常处理、线程恢复等基础功能都需要依赖这个计数器来完成。
字节码解释器工作时就是通过改变这个计数器的值来选取下一条需要执行的字节码指令。
它是**唯一一个在Java虚拟机规范中没有规定任何OutOfMemoryError情况的区域**。

### 2.程序示例

```java
javap -v/verbose （class名） //反编译
```


### 3.两个问题

#### **（1）使用PC寄存器存储字节码指令地址有什么用呢?为什么使用PC寄存器记录当前线程的执行地址呢？**

因为CPU需要不停的切换各个线程，这时候切换回来以后，就得知道接着从哪开始继续执行。
JVM的字节码解释器就需要通过改变PC寄存器的值来明确下一条应该执行什么样的字节码指令。

<img src="http://rcy276gfy.hd-bkt.clouddn.com/work/%E7%AC%AC04%E7%AB%A0_PC%E5%AF%84%E5%AD%98%E5%99%A8.jpg" alt="第04章_PC寄存器" style="zoom: 50%;" />

#### **(2)PC寄存器为什么会被设定为线程私有?**

​		我们都知道所谓的多线程在一个特定的时间段内只会执行其中某一个线程的方法，CPU会不停地做任务切换，这样必然导致经常中断或恢复，如何保证分毫无差呢?为了能够准确地记录各个线程正在执行的当前字节码指令地址，最好的办法自然是为每一个线程都分配一个PC寄存器，这样一来各个线程之间便可以进行独立计算，从而不会出现相互千扰的情况。

​		CPU时间片即CPU分配给各个程序的时间，每个线程被分配一个时间段，称作它的时间片。在宏观上:我们可以同时打开多个应用程序，每个程序并行不悖，同时运行。但在微观上:由于只有一个CPU，一次只能处理程序要求的一部分，如何处理公平，一种方法就是引入时间片，每个程序轮流执行。

# 五、虚拟机栈

### 1.栈主要特点 

​		由于跨半台性的设计，Java的指令都是根据栈来设计的。不同平台CPU架构不同，所以不能设计为基于寄存器的。优点是跨平台，指令集小，编译器容易实现，缺点是性能下降，实现同样的功能需要更多的指令。**栈是运行时的单位，而堆是存储的单位。**即：**栈解决程序的运行问题，即程序如何执行，或者说如何处理数据。堆解决的是数据存储的问题，即数据怎么放、放在哪儿。**       

#### **・Java虚拟机栈是什么？**

Java虚拟机栈( Java Virtual Machine Stack),早期也叫Java栈。每个线程在创建时都会创建一个虚拟机栈，其内部保存一个个的栈帧( Stack Frame),对应着一次次的Java方法调用，**是线程私有的。生命周期和线程一致**。

#### **・作用**

主管Java程序的运行，它**保存方法的局部变量(8种基本数据类型、对象的引用地址)、部分结果，并参与方法的调用和返回。**
局部变量vs成员变量（或属性）
基本数据变量vs引用类型变量(类、数组、接口)       

#### **・栈的特点（优点）**

栈是一种快速有效的分配存储方式，**访问速度仪次于程序计数器**。
JVM直接对Java栈的操作只有两个：
每个方法执行，伴随着进栈(入栈、压栈)
执行结束后的出栈工作
对于栈来说**不存在垃圾回收问题**                

### 2.栈中可能出现的异常

​		Java虚拟机规范允许Java栈的大小是动态的或者是固定不变的。
​		如果采用固定大小的Java虚拟机栈，那每一个线程的Java虚拟机栈容量可以在线程创建的时候独立选定。如果线程请求分配的栈容量超过Java虚拟机栈允许的最大容量，Java虚拟机将会抛出一个**StackOverflowError**异常。

​		如果Java虚拟机栈可以动态扩展，并且在尝试扩展的时候无法中请到足够的内存，或者在创建新的线程时没有足够的内存去创建对应的虚拟机栈，那Java虚拟机将会抛出一个 **OutOfMemoryError**异常。

#### **设置栈大小**

> Xss size
> Sets the thread stack size( in bytes). Append the letter k or K to indicate KB, m or M to indicate MB, and g or G to indicate
> GB. The default value depends on the platform
> Linux/x64(64-bit): 1024 KB
> macos(64-bit): 1024 KB
> Oracle Solaris/x64(64-bit): 1024 KB
> Windows: The default value depends on virtual memory
> The following examples set the thread stack size to 1024 KB in different units
> -Xss1m
> -Xss1024k
> Xss1048576

![](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211122140441632.png)

<img src="http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211122140406127.png" alt="image-20211122140406127" style="zoom: 80%;" />

### 3.栈存储单位

栈中存储什么
・每个线程都有自己的栈，栈中的数据都是以栈帧( Stack Frame)的格式存在。
・在这个线程上正在执行的栈帧( Stack Frame)
栈帧是一个内存区块，是一个数据集，维系着方法执行过程中的各种数据信息
复习
・OOP的基本概念：类、对象
・类中基本结构：field(属性、字段、域)、 method

JVM直接对Java栈的操作只有两个，就是对栈帧的栈和出栈，遵循“先进后出”/“后进先出”原则。
在一条活动线程中，一个时间点上，只会有一个活动的栈帧。即只有当前正在执行的方法的栈帧（栈顶栈帧）是有效的，这个栈帧被称为当前栈帧( Current Frame),与当前栈帧相对应的方法就是当前方法（ Current Method),定义这个方法的类就是当前类( Current Class).
执行引擎运行的所有字节码指令只针对当前栈帧进行操作。
如果在该方法中调用了其他方法，对应的新的栈帧会被创建出来，放在栈的顶端，成为新的当前帧。

![image-20211122183152431](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211122183152431.png)

・不同线程中所包含的栈帧是不允许存在相互引用的，即不可能在一个栈帧之中引用另外一个线程的栈帧
・如果当前方法调用了其他方法，方法返回之际，当前栈帧会传回此方法的执行结果给前一个栈帧，接着，虚拟机会丢弃当前栈帧，使得前一个栈帧重新成为当前栈帧。
・Java方法有两种返回函数的方式，一种是正常的函数返回，使用 return指令；另外一种是抛出异常。不管使用哪种方式，都会导致栈帧被弹出。

### 4.栈帧结构

**・局部变量表(Local variables)**
**・操作数栈( Operand Stack)（或表达式栈）**
・动态链接( Dynamic Linking)（或指向运行时常量池的方法引用）
・方法返回地址( Return Address)（或方法正常退出或者异常退出的定义）
・一些附加信息

![第05章_栈桢内部结构](http://rcy276gfy.hd-bkt.clouddn.com/work/%E7%AC%AC05%E7%AB%A0_%E6%A0%88%E6%A1%A2%E5%86%85%E9%83%A8%E7%BB%93%E6%9E%84.jpg)

#### 1.局部变量表

・局部变量表也被称之为局部变量数组或本地变量表
・定义为一个数字数组，主要用于**存储方法参数和定义在方法体内的局部变量,这些数据类型包括各类基本数据类型、对象引用( reference),以及returnAddress类型**。
・由于局部变量表是建立在线程的栈上，是线程的私有数据，**因此不存在数据安全问题**
・局部变量表**所需的容量大小是在编译期确定**下来的，并保存在方法的code属性的 maximuim local variables数据项中。在方法运行期间是不会改变局部变量表的大小的。

・方法嵌套调用的次数由栈的大小决定。一般来说，栈越大，方法嵌套调用次数越多。对一个函数而言，它的参数和局部变量越多，使得局部变量表膨胀，它的栈帧就越大，以满足方法调用所需传递的信息増大的需求。进而函数调用就会占用更多的栈空间，导致其嵌套调用次数就会减少。
・局部变量表中的变量只在当前方法调用中有效。在方法执行时，虚拟机通过使用局部变量表完成参数值到参数变量列表的传递过程。当方法调用结束后，随着方法栈帧的销毁，局部变量表也会随之销毁。

#### 2.字节码中方法内部结构解析



![image-20211122190700864](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211122190700864.png)

![image-20211122191003982](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211122191003982.png)

![image-20211122191207552](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211122191207552.png)

![image-20211122192009824](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211122192009824.png)

#### 3.Slot

・参数值的存放总是在局部变量数组的 index0开始，到数组长度-1的索引结束
・**局部变量表，最基本的存储单元是Slot（变量槽）**
・局部变量表中存放编译期可知的各种基本数据类型(8种)，引用类型( reference), returnAddressa类型。
・在局部变量表里，32位以内的类型只占用一个slot(包括returnAddressa类型），64位的类型(long和 double)占用两个slot.
		byte、 short、char在存储前被转换为int, boolean也被转换为int,0表示 false,非0表示true。
		long和double则占据两个Slot。

・JVM会为局部变量表中的每一个Slot都分配一个访问素引，通过这个素引即可成功访问到局部变量表中指定的局部变量值.
・当一个实例方法被调用的时候，它的方法参数和方法体内部定义的局部变量将会按照顺序被复制到局部变量表中的每一个Slot上.
・如果需要访问局部变量表中ー个64bit的局部变量值时，只需要使用前一个素引即可。(比如：访问1ong或doub1e类型变量).
・如果当前帧是由构造方法或者实例方法创建的，那么该对象引用this将会存放在 index为0的slot处，其余的参数按照参数表顺序继续排列.

​		栈帧中的局部变量表中的槽位是可以重用的，如果一个局部变量过了其作用域，那么在其作用域之后申明的新的局部变量就很有可能会复用过期局部变量的槽位，从而达到节省资源的目的。

<img src="http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211122195538822.png" alt="image-20211122195538822" style="zoom: 67%;" />

#### 7.静态变量和局部变量对比

$\triangleright$ 参数表分配完毕之后，再根据方法体内定义的变量的顺序和作用域分配
$\triangleright$ 我们知道类变量表有两次初始化的机会，第一次是在“准备阶段”，执行系统初始化，对类变量设置零值，另一次则是在“初始化”阶段，赋予程序员在代码中定义的初始值.
$\triangleright$ 和类变量初始化不同的是，局部变量表不存在系统初始化的过程，这意味着一旦定义了局部变量则必须人为的初始化，否则无法使用。

```java
//这样的代码是错误的，没有赋值不能够使用
public void test() {
int i;
System.out .println(i);
}
```

**变量的分类：**
$\triangleright$ 按照数据类型分：基本数据类型、引用数据类型
$\triangleright$ 按照在类中声明的位置分：成员变量：在使用前，都经历过默认初始化赋值
		类变量： Linking的 prepare阶段：给类变量默认赋值–>initial阶段：给静态代码块赋值
		实例变量：随着对象的创建，会在堆空间中分配实例变量空间，并进行默认赋值
$\triangleright$ 局部变量：在使用前，必须要进行显式赋值的！否则，编译不通过。

**补充说明**
$\triangleright$ 在栈帧中 ， 与性能调优关系最为密切的部分就是前面提到的局部变量表 。在方法执行时 ， 虚拟机使用局部变量表完成方法的传递 。
$\triangleright$ 局部变量表中的变量也是重要的垃圾回收根节点 ， 只要被局部变量表中直接或间接引用的对象都不会被回收 。

#### 8.操作数栈

$\triangleright$ 每一个独立的栈帧中除了包含局部变量表以外，还包含一个后进先出(Last-In-First-0ut)的操作数栈，也可以称之为表达式栈(Expression Stack).
$\triangleright$ 操作数栈，在方法执行过程中，根据字节码指令，往栈中写入数据或提取数据，即入栈(push)/出栈(pop).
		某些字节码指令将值压入操作数栈，其余的字节码指令将操作数取出栈。使用它们后再把结果压入栈。比如：执行复制、交换、求和等操作

$\triangleright$ 如果被调用的方法带有返回值的话，其返回值将会被压入当前栈帧的操作数栈中，并更新PC寄存器中下一条需要执行的字节码指令。
$\triangleright$ 操作数栈中元素的数据类型必须与字节码指令的序列严格匹配，这由编译器在编译器期间进行验证，同时在类加载过程中的类检验阶段的数据流分析阶段要再次验证。
$\triangleright$ 另外，我们说Java虚拟机的解释引擎是基于栈的执行引擎，其中的栈指的就是操作数栈。

$\triangleright$ 操作数栈，主要用于**保存计算过程的中间结果，同时作为计算过程中变量临时的存储空间。**
$\triangleright$ 操作数栈就是JVM执行引擎的-一个工作区，当一个方法刚开始执行的时候，一个新的栈帧也会随之被创建出来，这个方法的操作数栈是**空的**。
$\triangleright$ 每一个操作数栈都会拥有一个明确的栈深度用于存储数值，其所需的最大深度在编译期就定义好了，保存在方法的Code属性中，为max stack的值。
$\triangleright$ 栈中的任何一个元素都是可以任意的Java数据类型。
	➢32bit的类型占用一个栈单位深度
	➢64bit的类型占用两个栈单位深度
$\triangleright$ 操作数栈并非采用访问索引的方式来进行数据访问的，而是只能通过标准的入栈(push) 和出栈(pop)操作来完成一次数据访问。

**代码示例：**

```java
public void testAddOperation(){
byte i=15;
int j=8;
int k=i + j;
}
```

**图例：**

![image-20211123140047087](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211123140047087.png)

![image-20211123140228419](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211123140228419.png)

![image-20211123140302504](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211123140302504.png)

![image-20211123140320706](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211123140320706.png)

![image-20211123140346031](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211123140346031.png)

![image-20211123140429125](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211123140429125.png)

![image-20211123140450391](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211123140450391.png)

![image-20211123140754907](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211123140754907.png)

#### 9.栈顶缓存（Top-of-Stack-Cashing）技术

$\star$  前面提过，基于栈式架构的虛拟机所使用的零地址指令更加紧凑，但完成一项操作的时候必然需要使用更多的入栈和出栈指令，这同时也就意味着将需要更多的指令分派( instruction dispatch)次数和内存读/写次数。
$\star$  由于操作数是存储在内存中的，因此频繁地执行内存读/写操作必然会影响执行速度。为了解决这个问题， Hotspot JVM的设计者们提出了栈顶缓存(ToS,Top-of- Stack Cashing)技术，将**栈顶元素全部缓存在物理CPU的寄存器**中，以此降低对内存的读/写次数，提升执行引擎的执行效率。

#### 10.动态链接

$\star$ 每一个栈帧内部都包含一个**指向运行时常量池中该栈帧所属方法的引用**,包含这个引用的目的就是为了支持当前方法的代码能够实现动态链接( Dynamic Linking)。比如：invoke dynamic 指令。
$\star$ 在Java源文件被编译到字节码文件中时，所有的变量和方法引用都作为符号引用( Symbolic Reference)保存在class文件的常量池里。比如：描述一个方法调用了另外的其他方法时，就是通过常量池中指向方法的符号引用来表示的，那么动态链接的作用就是为了**将这些符号引用转换为调用方法的直接引用。**

![image-20211123190249212](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211123190249212.png)

![第09章_方法区与栈的关联结构](http://rcy276gfy.hd-bkt.clouddn.com/work/%E7%AC%AC09%E7%AB%A0_%E6%96%B9%E6%B3%95%E5%8C%BA%E4%B8%8E%E6%A0%88%E7%9A%84%E5%85%B3%E8%81%94%E7%BB%93%E6%9E%84.jpg)

#### **11.方法的调用**

在JVM中，将符号引用转换为调用方法的直接引用与方法的绑定机制相关。
**静态链接：**
$\star$ 当一个字节码文件被装载进JVM内部时，如果被调用的**目标方法在编译期可知**，且运行期保持不变时。这种情况下将调用方法的符号引用转换为直接引用的过程称之为静态链接
**动态链接：**
$\star$ 如果被调用的方法在**编译期无法被确定下来**，也就是说，只能够在程序运行期将调用方法的符号引用转换为直接引用，由于这种引用转换过程具备动态性，因此也就被称之为动态链接。

对应的方法的绑定机制为：早期绑定(Early Binding)和晚期绑定( Late Binding)。绑定是一个字段、方法或者类在符号引用被替换为直接引用的过程，这仅仅发生一次。
**早期绑定：**
$\star$ 早期绑定就是指被调用的目标方法如果在**编译期可知，且运行期保持不变时**，即可将这个方法与所属的类型进行绑定，这样一来，由于明确了被调用的目标方法究竟是哪一个，因此也就可以使用静态链接的方式将符号引用转换为直接引用。
**晚期绑定：**
$\star$ 如果被调用的方法在**编译期无法被确定下来，只能够在程序运行期根据实际的类型绑定相关的方法**，这种绑定方式也就被称之为晚期绑定。

#### 12.虚方法、非虚方法

**非虚方法：**
		如果方法在**编译期就确定了具体的调用版本**，这个版本在**运行时是不可变**的。这样的方法称为非虚方法。**静态方法、私有方法、final方法、实例构造器、父类方法**都是**非虚方法**，其他方法称为虚方法。

​		随着高级语言的横空出世，类似于Javaー样的基于面向对象的编程语言如今越来越多，尽管这类编程语言在语法风格上存在一定的差别，但是它们彼此之间始终保持着一个共性，那就是都支持封装、继承和多态等面向对象特性，既然这一类的**编程语言具备多态特性，那么自然也就具备早期绑定和晚期绑定两种绑定方式。**
​		Java中任何一个普通的方法其实都具备虚函数的特征，它们相当于C++语言中的虚函数(C++中则需要使用关键字 virtual来显式定义)。如果在Java程序中不希望某个方法拥有虚函数的特征时，则可以使用关键字final来标记这个方法。

虚拟机中提供了以下几条方法调用指令

**普通调用指令**

1. invokestatic:调用**静态**方法，解析阶段确定唯一方法版本
2. invokespecial:调用**\<init>**方法、私有及父类方法，解析阶段确定唯一方法版本
3. involkevirtual:调用所有虚方法
4. invokeinterface:调用接口方法

**动态调用指令**

1. invokedynamic:动态解析出需要调用的方法，然后执行前四条指令固化在虚拟机内部，方法的调用执行不可人为干预，而 invokedynamic指令则支持由用户确定方法版本。其中 **invokestatic 指令和 invokespecial 指令调用的方法称为非虚方法，其余的( final 修饰的除外)称为虚方法。**

#### 13.Invokedynamic

$\star$ JVM字节码指令集一直比较稳定，一直到Java7中オ増加了一个 invokedynamic 指令，这是 Java 为了实现「动态类型语言」支持而做的种改进。
$\star$ 但是在 Java7 中并没有提供直接生成 invokedynamic 指令的方法，需要借助 ASM 这种底层字节码工具来产生 invokedynamic 指令。直到 Java8 的 Lambda 表达式的出现，nvokedynamic 指令的生成，在 Java 中才有了直接的生成方式。
$\star$ Java7 中增加的动态语言类型支持的本质是对 Java 虚拟机规范的修改，而不是对 Java 语言规则的修改，这一块相对来讲比较复杂，增加了虚拟机中的方法调用，最直接的受益者就是运行在 Java 平台的动态语言的编译器。

**动态类型语言和静态类型语言**
		动态类型语言和静态类型语言两者的区别就在于对类型的检查是在编译期还是在运行期，满足前者就是静态类型语言，反之是动态类型语言。**静态类型语言是判断变量自身的类型信息；动态类型语言是判断变量值的类型信息，变量没有类型信息，变量值才有类型信息**，这是动态语言（比如Python）的一个重要特征。

#### 14.方法重写本质

**Java语言中方法重写的本质**
1.找到操作数栈顶的第一个元素所执行的对象的实际类型，记作C
2.如果在类型C中找到与常量中的描述符合简单名称都相符的方法，则进行访问权限校验，如果通过则返回这个方法的直接引用，査找过程结束；如果不通过，则返回java.lang.Illegal AccessError异常。
3.否则，按照继承关系从下往上依次对C的各个父类进行第2步的搜索和验证过程。
4.如果始终没有找到合适的方法，则抛出java.lang. AbstractMethodError异常。
**Illegal Accessarror介绍：**
		程序试图访问或修改一个属性或调用一个方法，这个属性或方法，你没有权限访问。一般的，这个会引起编译器异常。这个错误如果发生在运行时，就说明一个类发生了不兼容的改变。

・在面向对象的编程中，会很频繁的使用到动态分派，如果在每次动态分派的过程中都要重新在类的方法元数据中搜索合适的目标的话就可能影响到执行效率。因此，**为了提高性能**，JVM采用在类的方法区建立一个**虚方法表**( virtual method tabble)（非虚方法不会出现在表中）来实现。使用索引表来代替查找。
・每个类中都有一个虚方法表，表中存放着各个方法的实际入口
・那么虚方法表什么时候被创建？
虚方法表会在类加载的链接阶段被创建并开始初始化，类的变量初始值准备完成之后，JVM会把该类的方法表也初始化完毕。

#### 15.方法返回地址

存放调用该方法的PC寄存器的值。

**一个方法的结束，有两种方式：**1.正常执行完成。2.出现未处理的异常，非正常退出

​		无论通过哪种方式退出，在方法退出后都返回到该方法被调用的位置。方法正常退出时，**调用者的PC计数器的值作为返回地址，即调用该方法的指令的下一条指令的地址**。而通过异常退出的，返回地址是要通过异常表来确定，栈帧中一般不会保存这部分信息。

​		本质上，方法的退出就是当前栈帧出栈的过程。此时，需要恢复上层方法的局部变量表、操作数栈、将返回值压入调用者栈帧的操作数栈、设置PC寄存器值等，让调用者方法继续执行下去。
​		正常完成出口和异常完成出口的区别在于：通过异常完成出口退出的不会给他的上层调用者产生任何的返回值。

当一个方法开始执行后，只有**两种方式可以退出这个方法**
1、执行引擎遇到任意一个方法返回的字节码指令( return),会有返回值传递给上层的方法调用者，简称**正常完成出口**

​		一个方法在正常调用完成之后究竟需要使用哪一个返回指令还需要根据方法返回值的实际数据类型而定。
​		在字节码指令中，返回指令包含 lreturn(当返回值是 boolean、byte、char、shorth和int类型时使用)、lreturn、 freturn、 dreturn以及 areturn,另外还有一个 return指令供声明为void的方法、实例初始化方法、类和接口的初始化方法使用。

2、在方法执行的过程中遇到了异常( Exception),并且这个异常没有在方法内进行处理，也就是只要在本方法的异常表中没有搜索到匹配的异常处理器，就会导致方法退出。简称**异常完成出口**。
方法执行过程中抛出异常时的异常处理，存储在一个异常处理表，方便在发生异常的时候找到处理异常的代码。

#### 16.一些附加信息(略)

## 17.面试题

举例栈溢出的情况？( StackOverflowError):[2.栈中可能出现的异常](#2.栈中可能出现的异常)
通过-Xss设置栈的大小；OOM
调整栈大小，就能保证不出现溢出吗？不能
分配的栈内存越大越好吗？不是
垃圾回收是否会涉及到虚拟机栈？不会的！
方法中定义的局部变量是否线程安全？[1.局部变量表](#1.局部变量表)

# 六、_本地方法接口_

**什么是本地方法？**
简单地讲，一个 Native Method 就是一个Java调用非Java代码的接口。一个Native Method是这样一个Java方法：该方法的实现由非Java语言实现，比如C.这个特征并非Java所特有，很多其它的编程语言都有这一机制，比如在 C 中，你可以用 extern"c"告知C  编译器去调用一个C的函数。

> A native method is a Java method whose Implementation is provided by non-java code

在定义ー个 native method 时，并不提供实现体(有些像定义ー个Javai nterface),因为其实现体是由非java语言在外面实现的。
本地接口的作用是融合不同的编程语言为Java所用，它的初衷是融合C/C++程序。

<img src="http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211124202600273.png" alt="image-20211124202600273" style="zoom:67%;" />

<img src="http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211124202817626.png" alt="image-20211124202817626" style="zoom:80%;" />

**为什么要使用 Native Method?**
Java使用起来非常方便，然而有些层次的任务用Java实现起来不容易，或者我们对程序的效率很在意时，问题就来了。
・与Java环境外交互：**有时Java应用需要与Java外面的环境交互，这是本地方法存在的主要原因。**你可以想想Java需要与一些底层系统，如操作系统或某些硬件交换信息时的情况。本地方法正是这样一种交流机制：它为我们提供了一个非常简洁的接口而且我们无需去了解Java应用之外的繁琐的细节。

**与操作系统交互**
		JVM支持着Java语言本身和运行时库，它是Java程序赖以生存的平台，它由一个解释器（解释字节码）和一些连接到本地代码的库组成。然而不管怎样，它毕竟不是一个完整的系统，它经常依赖于一些底层系统的支持。这些底层系统常常是强大的操作系统。通过使用本地方法，我们得以用Java实现了jre的与底层系统的交互，甚至JVM的一些部分就是用C写的。还有，如果我们要使用一些Java语言本身没有提供封装的操作系统的特性时，我们也需要使用本地方法。
**Sun’s Java**
		**Sun的解释器是用C实现的，这使得它能像一些普通的C一样与外部交互。**jre大部分是用Java实现的，它也通过一些本地方法与外界交互。例如：类java.lang. hread的 setpriority（）方法是用Java实现的，但是它实现调用的是该类里的本地方法setprlority0（）。这个本地方法是用C实现的，并被植入JVM内部，在Windows 95的平台上，这个本地方法最终将调用Win32 Setpriority（）API。这是一个本地方法的具体实现由JVM直接提供，更多的情况是本地方法由外部的动态链接库( external dynamic link library)提供，然后被JVM调用。

**现状**

目前该方法使用的越来越少了，除非是与硬件有关的应用，比如通过Java程序驱动打印机或者Java系统管理生产设备，在企业级应用中已经比较少见。因为现在的异构领域间的通信很发达，比如可以使用 Socket通信，也可以使用网 Web Service等等，不多做介绍。

# 七、_本地方法栈_

本地方法栈( Native Method Stack)
・Java虚拟机栈用于管理Java方法的调用，而本地方法栈**用于管理本地方法的调用**。
・本地方法栈，也是线程私有的。
・允许被实现成固定或者是可动态扩展的内存大小。（在内存溢出方面是相同的）

​		如果线程请求分配的栈容量超过本地方法栈允许的最大容量，Java虚拟机将会抛出一个 StackOverflowError异常。
​		如果本地方法栈可以动态扩展，并且在尝试扩展的时候无法申请到足够的内存，或者在创建新的线程时没有足够的内存去创建对应的本地方法栈，那么Java虚拟机将会抛出一个 OutOfMemoryError异常。
・本地方法栈是使用C语言实现的
・它的具体做法是 Native Method Stack中登记 native 方法，在 Execution Engine 执行时加载本地方法库。

・当某个线程调用一个本地方法时，它就进入了一个全新的并且不再受虚拟机限制的世界。它和虚拟机拥有同样的权限。
		本地方法栈可以通过本地方法接口来访问虚拟机内部的运行时数据区。
		它甚至可以直接使用本地处理器中的寄存器
		直接从本地内存的堆中分配任意数量的内存。
并不是所有的JVM都支持本地方法。因为Java虚拟机规范并没有明确要求本地方法栈的使用语言、具体实现方式、数据结构等。如果JVM产品不打算支持 native方法，也可以无需实现本地方法栈。
・在 Hotspot JVM中，直接将本地方法栈和虚拟机栈合二为一。

# 八、堆

## 1.堆的核心概述

・一个JVM实例只存在**一个**堆内存，堆也是Java内存管理的核心区域。
・Java堆区在JVM启动的时候即被创建，其空间大小也就确定了。是JVM管理的**最大**一块内存空间。堆内存的大小是可以调节的。《Java虚拟机规范》规定，堆可以处于物理上不连续的内存空间中，但在逻辑上它应该被视为连续的。
・所有的线程共享Java堆，在这里还可以划分线程私有的缓冲区（ Thread Local Allocation Buffer, **TLAB**)

・《Java虚拟机规范》中对Java堆的描述是：所有的对象实例以及数组都应当在运行时分配在堆上。（ The heap is the run-time data area fromwhich memcry for all class instances and arrays is allocated)我要说的是：“几乎”所有的对象实例都在这里分配内存。一从实际使用角度看的。
・数组和对象可能永远不会存储在栈上，因为栈帧中保存引用，这个引用指向对象或者数组在堆中的位置。
・在方法结束后，堆中的对象不会马上被移除，仅仅在垃圾收集的时候才会被移除。
・堆，是GC( Garbage Collection,垃圾收集器)执行**垃圾回收的重点区域**。

<img src="http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211125134653273.png" alt="image-20211125134653273" style="zoom: 50%;" />

## 2.堆的细分内存结构

<img src="http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211125135924933.png" alt="image-20211125135924933" style="zoom:80%;" />

![image-20211125140503796](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211125140503796.png)

## 3.设置堆内存大小与OOM

### 1.设置堆内存

Java堆区用于存储Java对象实例，那么堆的大小在JVM启动时就已经设定好了，大家可以通过选项"-Xmx"和"-Xms"来进行设置

​	“-Xms"用于表示堆区的起始内存，等价于ーXX: Initialheapsize
​	“-Xmx"则用于表示堆区的最大内存，等价于ーXX: Maxheapsize
一旦堆区中的内存大小超过“-Xmx"所指定的最大内存时，将会抛出 OutOfMemoryError 异常。
・通常会将 -Xms 和 -Xmx 两个参数配置相同的值，其目的是为了能够在java垃圾回收机制清理完堆区后不需要重新分隔计算堆区的大小，从而提高性能。默认情况下：**初始内存大小：物理电脑内存大小/64，最大内存大小：物理电脑内存大小/4**

4.查看设置的参数：方式一：jps/jstat -GC 进程id
								方式二：-XX:  +PrintGCdetails

### 2.OOM说明与举例

##### 工具：

jvisualvm：查看内存情况，jvisualvm命令可直接打开

![image-20211125191145594](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211125191145594.png)

##### 安装插件

![image-20211125191600977](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211125191600977.png)

```java
public class OOMInstance {
    public static void main(String[] args){
    ArrayList\<Picture1> list=new ArrayList\<>();
            while(true)

    {

        try {
            Thread.sleep(20);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        list.add(new Picture1(new Random().nextInt(1024*1024)));
    }
    }
}

class Picture1{
    private  byte[] pixels;
    public Picture1(int length){
        this.pixels = new byte[length];
    }
}
```

##### 编译程序

![image-20211125192134417](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211125192134417.png)

##### 修改堆大小

![image-20211125192042179](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211125192042179.png)

##### 运行程序查看 jvisualvm

<img src="http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211125193145169.png" alt="image-20211125193145169"  />



Exception in thread "main" java.lang.**OutOfMemoryError**: Java heap space
	at pers.lxl.mylearnproject.programbase.jvm.Picture1.\<init>(OOMInstance.java:27)
	at pers.lxl.mylearnproject.programbase.jvm.OOMInstance.main(OOMInstance.java:19)

## 4.年轻代与老年代

・存储在JVM中的Java对象可以被划分为两类
		一类是生命周期较短的瞬时对象，这类对象的创建和消亡都非常迅速
		另外一类对象的生命周期却非常长，在某些极端的情况下还能够与JVM的生命周期保持一致。
・Java堆区进一步细分的话，可以划分为年轻代( YoungGen)和老年代( OldGen)
・其中年轻代又可以划分为Eden空间、 Survivor0空间和 Survivor1空间(有时也叫做from区、to区)。

<img src="http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211126133609902.png" alt="image-20211126133609902" style="zoom:67%;" />

![image-20211126133644542](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211126133644542.png)

### 参数设置：

配置新生代与老年代在堆结构的占比。
默认**-XX: NewRatio=2**,表示新生代占1,老年代占2,新生代占整个堆的1/3
可以修改-XX: Newratio=4,表示新生代占1,老年代占4,新生代占整个堆的1/5

在 Hot Spot中，Eden究间和另外两个 Survivor'空间缺省所占的比例是8:1:1当然开发人员可以通过选项“**-Xx: SurvivorRatio**”调整这个空间比例。比如XX: Survivorratio=8,默认8
几乎所有的Java对象都是在Eden区被new出来的绝大部分的Java对象的销毁都在新生代进行了。IBM公司的专门研究表明，新生代中80%的对象都是“朝生夕死”的。
可以使用选项"**-Xmn**'"设置新生代最大内存大小>这个参数一般使用默认值就可以了。

### 对象流程：

![image-20211126133944542](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211126133944542.png)

## 5.对象分配过程

### 		1.一般过程

​		Eden 满触发 YGC/Minor GC 对 Eden与 From 区回收，还在用的对象放到 From 区，Age设为1，下次回收触发时复制 From 区转到 To 区（空的区），Age+1，Age 达到阈值（可通过设置  -XX: MaxTenuringThreshold=\<N>）放入Old。

![第08章_新生代对象分配与回收过程](http://rcy276gfy.hd-bkt.clouddn.com/work/%E7%AC%AC08%E7%AB%A0_%E6%96%B0%E7%94%9F%E4%BB%A3%E5%AF%B9%E8%B1%A1%E5%88%86%E9%85%8D%E4%B8%8E%E5%9B%9E%E6%94%B6%E8%BF%87%E7%A8%8B.jpg)

为新对象分配内存是一件非常严谨和复杂的任务，JVM的设计者们不仅需要考虑内存如何分配、在哪里分配等问题，并且由于内存分配算法与内存回收算法密切相关，所以还需要考虑GC执行完内存回收后是否会在内存空间中爬生内存碎片。
1.new的对象先放伊甸园区。此区有大小限制。
2.当伊甸园的空间填满时，程序又需要创建对象，JVM的垃圾回收器将对伊甸园区进行垃圾回收( Minor GC),将伊甸园区中的不再被其他对象所引用的对象进行销毁。再加载新的对象放到伊甸园区。
3.然后将伊甸园中的剩余对象移动到幸存者0区
4.如果再次触发垃圾回收，此时上次幸存下来的放到幸存者0区的，如果没有回收，就会放到幸存者1区。
5.如果再次经历垃圾回收，此时会重新放回幸存者0区，接着再去幸存者1区
6.啥时候能去养老区呢？可以设置次数。默认是15次。可以设置参数：-XX: MaxTenuringThreshold=\<N>进行设置。

**总结**
针对幸存者s0,s1区的总结：复制之后有交换，谁空谁是To
关于垃圾回收：频繁在新生区收集，很少在养老区收集，几乎不在永久区/元空间收集。

### 		2.特殊情况

![image-20211129132015044](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211129132015044.png)

## 6.常用调优工具

・JDK命令行
Ecllpse: Memory Analyzer Tool
Jconsole
Visualvm
Jprofiler
Java Flight Recorder
GCVlewer
GC Easy

## 7.Minor GC、 Maior GC、 Full GC

JVM在进行GC时，并非每次都对上面三个内存(新生代、老年代、方法区)区域一起回收的，大部分时候回收的都是指新生代。
针对 HotSpot VM的实现，它里面的GC按照回收区域又分为两大种类型：一种是部分收集( Partial GC),一种是整堆收集(Full GC)
		**部分收集**：不是完整收集整个JAVA堆的垃圾收集。其中又分为：
			新生代收集( Minor GC / Young GC):只是新生代的垃圾收集
			老年代收集( Major GC / Old GC):只是老年代的垃圾收集
				目前，只有 CMS GC会有单独收集老年代的行为。
				注意，很多时候 Major GC 会和 Full GC混淆使用，需要具体分辨是老年代回收还是整堆回收。
			混合收集( Mixed GC):收集整个新生代以及部分老年代的垃圾收集。
				目前，只有G1 GC会有这种行为
		**整堆收集**(Full GC):收集整个java堆和方法区的垃圾收集。

### 1.年轻代GC( Minor GC)触发机制：

​	当年轻代空间不足时，就会触发 Minor GC,这里的年轻代满指的是 Eden代满， Survivor满不会引发GC.(每次 Minor GC会清理年轻代的内存。）
​	因为Java对象大多都具备朝生夕灭的特性，所以 Minor GC非常频繁，一般回收速度也比较快。这一定义既清晰又易于理解。
​	Minor GC会引发STW,暂停其它用户的线程，等垃圾回收结東，用户线程才恢复运行。

### 2.老年代GC( Major  GC / Full GC) 触发机制

指发生在老年代的GC,对象从老年代消失时，我们说“ Major GC”或“Full GC”发生了。
出现了 Major GC,经常会伴随至少一次的  Minor GC(但非绝对的，在Parallel Scavenge收集器的收集策略里就有直接进行 Major GCE的策略选择过程）
 	也就是在老年代空间不足时，会先尝试触发 Minor GC。如果之后空间还不足，则触发 Major GC。
Major GC的速度一般会比 Minor GC 慢10倍以上，STW 的时间更长。
如果 Major GC后，内存还不足，就报OOM了
Major GC 的速度一般会比 Minor GC慢10倍以上。

### 3.Full GC 触发机制：（后面细讲触发Full GC执行的情况有如下五种：

(1)调用 System.GC（）时，系统建议执行Full GC,但是不必然执行
(2)老年代空间不足
(3)方法区空间不足
(4)通过 Minor GC后进入老年代的平均大小大于老年代的可用内存
(5)由Eden区、 survivor space0( From Space)区向 survivor space1(To Space)区复制时，对象大小大于 To Space可用内存，则把该对象转存到老年代，且老年代的可用内存小于该对象大小
说明：Full GC是开发或调优中尽量要避免的。这样暂时时间会短一些。

## 8.GC举例与日志分析

添加参数：-XX:PrintGCDetails 

查看日志：![image-20211129140420672](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211129140420672.png)

## 9.堆空间分代思想

为什么需要把Java堆分代？不分代就不能正常工作了吗？
		其实不分代完全可以，分代的唯一理由就是优化GC性能。如果没有分代，那所有的对象都在一块，就如同把一个学校的人都关在一个教室。GC的时候要找到哪些对象没用，这样就会对堆的所有区域进行扫描。而很多对象都是朝生夕死的，如果分代的话，把新创建的对象放到某一地方，当GC的时候先把这块存储“朝生夕死”对象的区域进行回收，这样就会腾出很大的空间出来。

## 10.内存分配策略（对象提升【Promotion】规则）

​		如果对象在 Eden 出生并经过第一次 Miinor GC 后仍然存活，并且能被 Survivor 容纳的话，将被移动到 Survivor 空间中，并将对象年龄设为1。对象 Survivor区中每熬过一次 MInorGC,年龄就增加1岁，当它的年龄增加到一定程度(**默认为15岁**，其实每个JVM、每个GC都有所不同)时，就会被晋升到老年代中。对象晋升老年代的年龄阈值，可以通过选项**-XX: MaxTenuringThreshold**来设置。

针对不同年龄段的对象分配原则如下所示：
优先分配到Eden。
大对象直接分配到老年代。
尽量避兔程序中出现过多的大对象。
长期存活的对象分配到老年代。
动态对象年龄判断
		如果 Survivor区中相同年龄的所有对象大小的总和大于 Survivor空间的一半，年龄大于或等于该年龄的对象可以直接进入老年代，无须等到
MaxTenuringThreshold中要求的年龄
空间分配担保：  -XX: HandlePromotionFailure

## 11.对象分配过程：TLAB

### 1.为什么有TLAB( Thread Local Allocation Buffer)?

:headphones: 堆区是线程共享区域，任何线程都可以访问到堆区中的共享数据
:headphones: 由于对象实例的创建在JVM中非常频繁，因此在并发环境下从堆区中划分内存空间是线程不安全的
:headphones: 为避免多个线程操作同一地址，需要使用加锁等机制，进而影响分配速度。

<img src="http://rcy276gfy.hd-bkt.clouddn.com/work/%E7%AC%AC08%E7%AB%A0_TLAB.jpg" alt="第08章_TLAB" style="zoom:50%;" />

### 2.什么是TLAB?

:ant: 从内存模型而不是垃圾收集的角度，对Eden区域继续进行划分，JVM为每个线程分配了一个私有缓存区域，它包含在Eden空间内
:ant: 多线程同时分配内存时，使用TLAB可以避免一系列的非线程安全问题，同时还能够提升内存分配的吞吐量，因此我们可以将这种内存分配方式称之为快速分配策略。
:ant: 据我所知所有 OPENJDK行生出来的JVM都提供了TLAB的设计
:ant: 尽管不是所有的对象实例都能够在TLAB中成功分配内存，但JVM确实是将TLAB作为内存分配的首选。
:ant: 在程序中，开发人员可以通过选项“-XX: USETLAB”设置是否开启TLAB空间。
:ant: 默认情况下，TLAB空间的内存非常小，仅占有整个Eden空间的1%,当然我们可以通过选项“-XX: TLABWasteTargetPercent”设置TLAB空间所占用Eden空间的百分比大小。
:ant: 一旦对象在AB空间分配内存失败时，JVM就会尝试着通过使用加锁机制确保数据操作的原子性，从而直接在Eden空间中分配内存。

<img src="http://rcy276gfy.hd-bkt.clouddn.com/work/%E7%AC%AC08%E7%AB%A0_%E5%AF%B9%E8%B1%A1%E5%88%86%E9%85%8D%E8%BF%87%E7%A8%8B.jpg" alt="第08章_对象分配过程" style="zoom:50%;" />

## 12.堆空间常见参数

-XX:  +PrintFlagsInitial:查看所有的参数的默认初始值
-XX:  +PrintFlagsFinal:查看所有的参数的最终值（可能会存在修改，不再是初始值)
-Xms:初始雄空向内存(默认为物理内存的1/64)
-Xmx:最大雄空间内存(默认为物理内存的1/4)
-Xmn:设置新生代的大小。（初始值及最大值）
-XX: NewRatio:配置新生代与老年代在堆结构的占比
-XX: SurvivorRatio:设置新生代中Eden和S0/S1空间比例
-XX: MaxTenuringThreshold:设置新生代垃扱的最大年龄
-XX:  +PrintGCdetails:输出详细GC处理日志
打印筒要信息：:sun_with_face: -XX:  +PrintGC  :sun_with_face: - verbose:GC
-XX: HandlePromotionFailure:是否设置空问分配担保

**是否设置空问分配担保？：**

在发生 Minor GC之前，虚拟机会检查老年代最大可用的连续空间是否大于新生代所有对象的总空间。
		如果大于，则此次 Minor GC是安全的
		如果小于，则虚拟机会查看ーXX: HandlePromotionFailure设置值是否允许担保失败。
		如果 HandlepromotionFailure=true,那么会继续检查老年代最大可用连续空间是否大于历次晋升到老年代的对象的平均大小。
		如果大于，则尝试进行一次 Minor GC,但这次 Minor GC依然是有风险的。
		如果小于，则改为进行一次Full GC。
		如果 HandlePromotionFalure= false,则改为进行一次Full GC。
		在JDK6 Update24之后， HandlePromotionFailure 参数不会再影响到虚拟机的空间分配担保策略，观察 OpenJDK中的源码变化，虽然源码中还定义了HandlePromotionFailure 参数，但是在代码中已经不会再使用它。JDK6 Update24之后的规则变为 只要老年代的连续空间大于新生代对象总大小或者历次晋升的平均大小 就会进行 Minor GC,否则将进行Full GC。

## 13.通过逃逸分析看堆空间的对象分配

**堆是分配对象存储的唯一选择吗？**

​		在《深入理解Java虚拟机》中关于Java堆内存有这样一段描述：随着JIT编译期的发展与逃逸分析技术逐渐成熟，栈上分配、标量替换优化技术将会导致一些微妙的变化，所有的对象都分配到堆上也渐渐变得不那么“绝对”了。在Java虚拟机中，对象是在Java堆中分配内存的，这是一个普遍的常识。但是，有种特殊情况，那就是如果经过逃逸分析( Escape Analysis)后发现，一个对象并没有逃逸出方法**【NEW的对象是否有可能在方法外被调用，调用则发生逃逸】**的话，那么就可能被优化成栈上分配。这样就无需在堆上分配内存，也无须进行垃圾回收了。这也是最常见的堆外存储技术。
​		此外，前面提到的基于 OPENJDK深度定制的 TaoBaoVM,其中创新的GCIH(GCinvisible heap)技术实现。off-heap,将生命周期较长的Java对象从heap中移至heap外，并且GC不能管理GCIH内部的Java对象，以此达到降低GC的回收频率和提升GC的回收效率的目的。

[堆**不是**分配对象存储的唯一选择吗](# 4.堆**不是**分配对象存储的唯一选择吗)

**如何将堆上的对象分配到栈，需要使用逃逸分析手段。**
		这是一种可以有效减少Java程序中同步负载和内存堆分配压力的跨函数全局数据流分析算法。通过逃逸分析， Java Hotspot编译器能够分析出一个新的对象的引用的使用范围从而决定是否要将这个对象分配到堆上。

逃逸分析的基本行为就是分析对象动态作用域：
		当一个对象在方法中被定义后，对象只在方法内部使用，则认为没有发生逃逸。
		当一个对象在方法中被定义后，它被外部方法所引用，则认为发生逃逸。例如作为调用参数传递到其他地方中。

参数设置：
・在JDK6u23版本之后， HotSpot中默认就已经开启了逃逸分析。如果使用的是较早的版本，开发人员则可以通过
选项“-XX:  Doescapeanalysis"显式开启逃逸分析
通过选项“-X:  Printescapeanalysis"查看逃逸分析的筛选结果

> **结论：** 开发中能使用局部变量的，就不要使用在方法外定义。

## 14.逃逸分析：代码优化

​		使用逃逸分析，编译器可以对代码做如下优化：
一、**栈上分配**。将堆分配转化为栈分配。如果一个对象在子程序中被分配，要使指向该对象的指针永远不会逃逸，对象可能是栈分配的候选，而不是堆分配。
二、**同步省略**。如果一个对象被发现只能从一个线程被访问到，那么对于这个对象的操作可以不考虑同步。
三、**分离对象或标量替换**。有的对象可能不需要作为一个连续的内存结构存在也可以被访问到，那么对象的部分（或全部）可以不存储在内存，而是存储在CPU寄存器中。



### 1.栈上分配

实验：

1.-Xmx1G -Xms1G -XX:-DoEscapeAnalysis -XX:+PrintGCDetails

2.-Xmx1G -Xms1G -XX:+DoEscapeAnalysis -XX:+PrintGCDetails

3.-Xmx256m -Xms256m -XX:-DoEscapeAnalysis -XX:+PrintGCDetails

4.-Xmx256m -Xms256m -XX:+DoEscapeAnalysis -XX:+PrintGCDetails

```java
/**
 * 栈上分配测试
 * -Xmx1G -Xms1G -XX:-DoEscapeAnalysis -XX:+PrintGCDetails
 * @author shkstart  shkstart@126.com
 * @create 2020  10:31
 */
public class StackAllocation {
    public static void main(String[] args) {
        long start = System.currentTimeMillis();

        for (int i = 0; i \< 10000000; i++) {
            alloc();
        }
        // 查看执行时间
        long end = System.currentTimeMillis();
        System.out.println("花费的时间为： " + (end - start) + " ms");
        // 为了方便查看堆内存中对象个数，线程sleep
        try {
            Thread.sleep(1000000);
        } catch (InterruptedException e1) {
            e1.printStackTrace();
        }
    }

    private static void alloc() {
        User user = new User();//未发生逃逸
    }

    static class User {

    }
}
```

### 2.同步省略（锁消除）

​		**线程同步的代价是相当高的，同步的后果是降低并发性和性能。**
​		在动态编译同步块的时候，JIT编译器可以借助逃逸分析来**判断同步块所使用的锁对象是否只能够被一个线程访问而没有被发布到其他线程**。如果没有，那么JIT编译器在编译这个同步块的时候就会取消对这部分代码的同步。这样就能大大提高并发性和性能。这个取消同步的过程就叫同步省略，也叫锁消除。

<img src="http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211130134841650.png" alt="image-20211130134841650" style="zoom:67%;" />

### 3.分离对象或标量替换

​		标量(Scalar)是指一个无法再分解成更小的数据的数据。Java中的**原始数据类型**就是**标量**。相对的，那些**还可以分解**的数据叫做**聚合量( Aggregate)**,Java中的**对象就是聚合量**，因为他可以分解成其他聚合暈和标量
​		在JIT阶段，如果经过逃逸分析，发现一个对象不会被外界访问的话，那么经过JIT优化，就会把这个对象拆解成若干个其中包含的若干个成员变量来代替。这个过程就是**标量替换。**

**标量替换参数设置：**
参数-XX:+EliminateAllocations:开启标量替換（默认打开），允许将对象打散分配在栈上。

### 4.堆**不是**分配对象存储的唯一选择吗？

上述代码在主函数中进行了1亿次alloc。调用进行对象创建，由于User对象实例需要占据约16字节的空间，因此累计分配空间达到将近1.5GB。如果堆空间小于这个值，就必然会发生GC。使用如下参数运行上述代码
-server -Xmx100m -xms100m	-xx:+DoEscapeAnalvsis  -XX:  Print GC	-XX:+EliminateAllocations
这里使用参数如下
・参数- server:启动 server模式，因为在 Server模式下，オ可以启用逃逸分析。
・参数-XX:  +DoEscapeAnalysis:启用逃逸分析
・参数-Xmx10m:指定了堆空间最大为10MB
・参数-XX:  Print GC:将打印GC日志。
・参数-XX: EliminateAllocations:开启了标量替换（默认打开），允许将对象打散分配在栈上，比如对象拥有id和name两个字段，那么这两个字段将会被视为两个独立的局部变量进行分配。

​		关于逃逸分析的论文在1999年就已经发表了，但直到JDK1.6オ有实现，而且这项技术到如今也**并不是十分成熟**的。
​		其根本原因就是无法保证逃逸分析的性能消耗一定能高于他的消耗。虽然经过逃逸分析可以做标量替换、栈上分配、和锁消除。但是逃逸分析自身也是需要进行一系列复杂的分析的，这其实也是一个相对耗时的过程。
​		一个极端的例子，就是经过逃逸分析之后，发现没有一个对象是不逃逸的。那这个逃逸分析的过程就白白浪费掉了
​		虽然这项技术并不十分成熟，但是它也是即时编译器优化技术中一个十分重要的手段。注意到有一些观点，认为通过逃逸分析，JVM会在栈上分配那些不会逃逸的对象，这在理论上是可行的，但是取决于JVM设计者的选择。据我所知， Oracle Hotspot JVM中并未这么做，这一点在逃逸分析相关的文档里已经说明，所以可以明确所有的对象实例都是创建在堆上。
​		目前很多书籍还是基于JDK7以前的版本，JDK已经发生了很大变化， intern字符串的缓存和静态变量曾经都被分配在永久代上，而永久代已经被元数据区取代。但是，intern:字符串缓存和静态变量并不是被转移到元数据区，而是直接在堆上分配，所以这一点同样符合前面一点的结论：**对象实例都是分配在堆上。**

# 九、方法区

## 1.栈、堆、方法区间的交互关系

![image-20211130192113431](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211130192113431.png)

![image-20211130192158749](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211130192158749.png)

## 2.方法区基本理解

​		《Java虚拟机规范》中明确说明："尽管所有的方法区在逻辑上是属于堆的一部分，但些简单的实现可能不会选择去进行垃圾收集或者进行压缩。”但对于 HotSpotJVM而言，方法区还有一个别名叫做**Non-Heap（非堆），目的就是要和堆分开。所以，方法区看作是一块独立于Java堆的内存空间。**

・方法区( Method Area)与JAVA堆一样，是各个**线程共享**的内存区域。
・方法区在JVM启动的时侯被创建，并且它的实际的物理内存空间中和Java堆区一样都可以是不连续的。
・方法区的大小，跟堆空间一样，可以选择固定大小或者可扩展。
・方法区的大小决定了系统可以保存多少个类，如果系统定义了太多的类【比如加载大量的第三方的jar包； Tomcat部署的工程过多(30-50个)；大量动态的生成反射类】，导致方法区溢出，虚拟机同样会抛出内存溢出错误：java.lang. OutOfMemoryError:
PermGen space 或者 java. lang.OutOfMemoryError: Metaspace
・关闭JVM就会释放这个区域的内存。

## 3.HotSpot中方法区的演进

在**jdk7及以前**，习惯上把方法区，称为**永久代**。**jdk8开始**，使用**元空间**取代了永久代。
In JDK8, classes metadata is now stored in the native heap and this space is called Metaspace
本质上，方法区和永久代并不等价。**仅是对 HotSpot而言的**。《Java虚拟机规范》对如何实现方法区，不做统一要求。例如： BEA JRockit / IBM J9中不存在永久代的概念。现在来看，当年使用永久代，不是好的idea。导致Java程序更容易OOM(超过XX: MaxPermSize上限)

而到了JDK8,终于完全废弃了永久代的概念，改用与 Jrockit、J9一样在本地内存中实现的元空间( Metaspace)来代替

元空间的本质和永久代类似，都是对JVM规范中方法区的实现。不过**元空间与永久代最大的区别在于：元空间不在虚拟机设置的内存中，而是使用本地内存。**永久代、元空间二者并不只是名字变了，内部结构也调整了。根据《Java虚拟机规范》的规定，如果方法区无法满足新的内存分配需求时，将抛出OOM异常。

<img src="http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211130193924514.png" alt="image-20211130193924514" style="zoom:67%;" />

## 4.设置方法区大小

方法区的大小不必是固定的，JVM可以根据应用的需要动态调整。
**jdk7及以前：**

通过**-XX: PermSize**来设置永久代初始分配空间。默认值是20.75M
**-XX: MaxPermSize**来设定永久代最大可分配空间。32位机器默认是64M,64位机器模式是82M
当JVM加载的类信息容量超过了这个值，会报异常 OutOfMemoryError: Permgen Space。
可通过命令行查看：jps————》jinfo -flag PermSize/MaxPermSize ’num‘

**jdk8及以后：**

​		元数据区大小可以使用参数**-XX: MetaspaceSize**和**-XX: MaxMetaspacesSize**指定，替代上述原有的两个参数。
​		**默认值**依赖于平台。 windows下，-XX: MetaspaceSize是21M,-XX: MaxMetaspaceSize的值是-1,即没有限制。
​		与永久代不同，如果不指定大小，默认情况下，虚拟机会耗尽所有的可用系统内存。如果元数据区发生溢出，虚拟机一样会抛出异常OutOfMemoryError:Metaspace
​		-XX: MetaspaceSize:设置初始的元空间大小。对于ー个64位的服务器端JVM来说，其默认的-XX: MetaspaceSize值为21MB。这就是初始的高水位线，一旦触及这个水位线，Full GC将会被触发并卸载没用的类（即这些类对应的类加载器不再存活），然后这个高水位线将会重置。新的高水位线的值取决于GC后释放了多少元空间。如果释放的空间不足，那么在不超过 MaxMetaspaceSize时，适当提高该值。如果释放空间过多，则适当降低该值。
​		如果初始化的高水位线设置过低，上述高水位线调整情况会发生很多次。通过垃圾回收器的日志可以观察到FullGC多次调用。为了避免频繁地GC,建议将
-XX: MetaspaceSize设置为一个相对较高的值。

## 5.OOM举例

```java
import com.sun.xml.internal.ws.org.objectweb.asm.ClassWriter;
import jdk.internal.org.objectweb.asm.Opcodes;

/**
 * jdk6/7中：
 * -XX:PermSize=10m -XX:MaxPermSize=10m
 *
 * jdk8中：
 * -XX:MetaspaceSize=10m -XX:MaxMetaspaceSize=10m
 *
 * @author shkstart  shkstart@126.com
 * @create 2020  22:24
 */
public class OOMTest extends ClassLoader {
    public static void main(String[] args) {
        int j = 0;
        try {
            OOMTest test = new OOMTest();
            for (int i = 0; i \< 10000; i++) {
                //创建ClassWriter对象，用于生成类的二进制字节码
                ClassWriter classWriter = new ClassWriter(0);
                //指明版本号，修饰符，类名，包名，父类，接口
                classWriter.visit(Opcodes.V1_6, Opcodes.ACC_PUBLIC, "Class" + i, null, "java/lang/Object", null);
                //返回byte[]
                byte[] code = classWriter.toByteArray();
                //类的加载
                test.defineClass("Class" + i, code, 0, code.length);//Class对象
                j++;
            }
        } finally {
            System.out.println(j);
        }
    }
}

```

**如何解决这些OOM？**

1、要解决OOM异常或 heap space的异常，一般的手段是首先通过内存映像分析工具(如Eclipse Memory Analyzer)对dump出来的堆转储快照进行分析，重点是确认内存中的对象是否是必要的，也就是要先分清楚到底是出现了内存泄漏（ Memory Leak)还是内存溢出( Memory Overflow)
2、如果是内存泄漏，可进一步通过工具査看泄漏对象到 GC Roots的引用链。于是就能找到泄漏对象是通过怎样的路径与 GC Roots相关联并导致垃圾收集器无法自动回收它们的。掌握了泄漏对象的类型信息，以及 GC Roots引用链的信息，就可以比较准确地定位出泄漏代码的位置。
3、如果不存在内存泄漏，换句话说就是内存中的对象确实都还必须存活着，那就应当检査虚拟机的堆参数(-Xmx与-Xms),与机器物理内存对比看是否还可以调大，从代码上检查是否存在某些对象生命周期过长、持有状态时间过长的情况，尝试减少程序运行期的内存消耗。

## **6.方法区内部结构**

​		《深入理解Java虚拟机》书中对方法区( Method Area)存储内容描述如下它用于存储已被虚拟机加载的**类型信息、常量、静态变量、即时编译器编译后的代码缓存等**。

![image-20211130202647120](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211130202647120.png)

### **类型信息：**

对每个加载的类型(类class、接口 interface、枚举enum、注解 annotation),JVM必须在方法区中存储以下类型信息：
①这个类型的完整有效名称(全名=包名.类名)
②)这个类型直接父类的完整有效名（对于 interface或是java.lang.Object,都没有父类)
③这个类型的修饰符（pulblic, abstract,fina的某个子集)
④这个类型直接接口的一个有序列表

### **域（Filed）信息**

JVM必须在方法区中保存类型的所有域的相关信息以及域的声明顺序。
域的相关信息包括：域名称、域类型、域修饰符（ public，private，protected，static，fina， volatile，transient的某个子集）

### **方法（Method）信息**

JTVM必须保存所有方法的以下信息，同域信息一样包括声明顺序
:arrow_up_small: 方法名称
:arrow_up_small: 方法的返回类型(或void)方法参数的数量和类型（按顺序
:arrow_up_small: 方法的修饰符（ public, private, protected, static, final,synchronized, native, abstract的一个子集)
:arrow_up_small: 方法的字节码( bytecodes)、操作数栈、局部变量表及大小( abstract和native方法除外)
:arrow_up_small: 异常表( abstract和 native方法除外)：每个异常处理的开始位置、结束位置、代码处理在程序计数器中的偏移地址被捕获的异常类的常量池索引

**non- final的类变量**

静态变量和类关联在一起，随着类的加载而加载，它们成为类数据在逻辑上的一部分。
类变量被类的所有实例共享，即使没有类实例时你也可以访问它。

**全局常量： static final**
被声明为 final的类变量的处理方法则不同，每个全局常量在编译的时候就会被分配了。

```java
import java.io.Serializable;

/**
 * 测试方法区的内部构成
 * @author shkstart  shkstart@126.com
 * @create 2020  23:39
 */
public class MethodInnerStrucTest extends Object implements Comparable\<String>,Serializable {
    //属性
    public int num = 10;
    private static String str = "测试方法的内部结构";
    //构造器
    //方法
    public void test1(){
        int count = 20;
        System.out.println("count = " + count);
    }
    public static int test2(int cal){
        int result = 0;
        try {
            int value = 30;
            result = value / cal;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    @Override
    public int compareTo(String o) {
        return 0;
    }
}

//运行javap-v-p MethodInnerStrucTest.class > test.txt


Classfile /D:/workspace_idea5/JVMDemo/out/production/chapter09/com/atguigu/java/MethodInnerStrucTest.class
  Last modified 2020-4-22; size 1626 bytes
  MD5 checksum 69643a16925bb67a96f54050375c75d0
  Compiled from "MethodInnerStrucTest.java"
  //类型信息
public class com.atguigu.java.MethodInnerStrucTest extends java.lang.Object 
implements java.lang.Comparable\<java.lang.String>, java.io.Serializable

  minor version: 0
  major version: 51
  flags: ACC_PUBLIC, ACC_SUPER
Constant pool:
   #1 = Methodref          #18.#52        // java/lang/Object."\<init>":()V
   #2 = Fieldref           #17.#53        // com/atguigu/java/MethodInnerStrucTest.num:I
   #3 = Fieldref           #54.#55        // java/lang/System.out:Ljava/io/PrintStream;
   #4 = Class              #56            // java/lang/StringBuilder
   #5 = Methodref          #4.#52         // java/lang/StringBuilder."\<init>":()V
   #6 = String             #57            // count =
   #7 = Methodref          #4.#58         // java/lang/StringBuilder.append:(Ljava/lang/String;)Ljava/lang/StringBuilder;
   #8 = Methodref          #4.#59         // java/lang/StringBuilder.append:(I)Ljava/lang/StringBuilder;
   #9 = Methodref          #4.#60         // java/lang/StringBuilder.toString:()Ljava/lang/String;
  #10 = Methodref          #61.#62        // java/io/PrintStream.println:(Ljava/lang/String;)V
  #11 = Class              #63            // java/lang/Exception
  #12 = Methodref          #11.#64        // java/lang/Exception.printStackTrace:()V
  #13 = Class              #65            // java/lang/String
  #14 = Methodref          #17.#66        // com/atguigu/java/MethodInnerStrucTest.compareTo:(Ljava/lang/String;)I
  #15 = String             #67            // 测试方法的内部结构
  #16 = Fieldref           #17.#68        // com/atguigu/java/MethodInnerStrucTest.str:Ljava/lang/String;
  #17 = Class              #69            // com/atguigu/java/MethodInnerStrucTest
  #18 = Class              #70            // java/lang/Object
  #19 = Class              #71            // java/lang/Comparable
  #20 = Class              #72            // java/io/Serializable
  #21 = Utf8               num
  #22 = Utf8               I
  #23 = Utf8               str
  #24 = Utf8               Ljava/lang/String;
  #25 = Utf8               \<init>
  #26 = Utf8               ()V
  #27 = Utf8               Code
  #28 = Utf8               LineNumberTable
  #29 = Utf8               LocalVariableTable
  #30 = Utf8               this
  #31 = Utf8               Lcom/atguigu/java/MethodInnerStrucTest;
  #32 = Utf8               test1
  #33 = Utf8               count
  #34 = Utf8               test2
  #35 = Utf8               (I)I
  #36 = Utf8               value
  #37 = Utf8               e
  #38 = Utf8               Ljava/lang/Exception;
  #39 = Utf8               cal
  #40 = Utf8               result
  #41 = Utf8               StackMapTable
  #42 = Class              #63            // java/lang/Exception
  #43 = Utf8               compareTo
  #44 = Utf8               (Ljava/lang/String;)I
  #45 = Utf8               o
  #46 = Utf8               (Ljava/lang/Object;)I
  #47 = Utf8               \<clinit>
  #48 = Utf8               Signature
  #49 = Utf8               Ljava/lang/Object;Ljava/lang/Comparable\<Ljava/lang/String;>;Ljava/io/Serializable;
  #50 = Utf8               SourceFile
  #51 = Utf8               MethodInnerStrucTest.java
  #52 = NameAndType        #25:#26        // "\<init>":()V
  #53 = NameAndType        #21:#22        // num:I
  #54 = Class              #73            // java/lang/System
  #55 = NameAndType        #74:#75        // out:Ljava/io/PrintStream;
  #56 = Utf8               java/lang/StringBuilder
  #57 = Utf8               count =
  #58 = NameAndType        #76:#77        // append:(Ljava/lang/String;)Ljava/lang/StringBuilder;
  #59 = NameAndType        #76:#78        // append:(I)Ljava/lang/StringBuilder;
  #60 = NameAndType        #79:#80        // toString:()Ljava/lang/String;
  #61 = Class              #81            // java/io/PrintStream
  #62 = NameAndType        #82:#83        // println:(Ljava/lang/String;)V
  #63 = Utf8               java/lang/Exception
  #64 = NameAndType        #84:#26        // printStackTrace:()V
  #65 = Utf8               java/lang/String
  #66 = NameAndType        #43:#44        // compareTo:(Ljava/lang/String;)I
  #67 = Utf8               测试方法的内部结构
  #68 = NameAndType        #23:#24        // str:Ljava/lang/String;
  #69 = Utf8               com/atguigu/java/MethodInnerStrucTest
  #70 = Utf8               java/lang/Object
  #71 = Utf8               java/lang/Comparable
  #72 = Utf8               java/io/Serializable
  #73 = Utf8               java/lang/System
  #74 = Utf8               out
  #75 = Utf8               Ljava/io/PrintStream;
  #76 = Utf8               append
  #77 = Utf8               (Ljava/lang/String;)Ljava/lang/StringBuilder;
  #78 = Utf8               (I)Ljava/lang/StringBuilder;
  #79 = Utf8               toString
  #80 = Utf8               ()Ljava/lang/String;
  #81 = Utf8               java/io/PrintStream
  #82 = Utf8               println
  #83 = Utf8               (Ljava/lang/String;)V
  #84 = Utf8               printStackTrace
{
  //域信息
  public int num;
    descriptor: I
    flags: ACC_PUBLIC

  private static java.lang.String str;
    descriptor: Ljava/lang/String;
    flags: ACC_PRIVATE, ACC_STATIC

  //方法信息
  public com.atguigu.java.MethodInnerStrucTest();
    descriptor: ()V
    flags: ACC_PUBLIC
    Code:
      stack=2, locals=1, args_size=1
         0: aload_0
         1: invokespecial #1                  // Method java/lang/Object."\<init>":()V
         4: aload_0
         5: bipush        10
         7: putfield      #2                  // Field num:I
        10: return
      LineNumberTable:
        line 10: 0
        line 12: 4
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            0      11     0  this   Lcom/atguigu/java/MethodInnerStrucTest;

  public void test1();
    descriptor: ()V
    flags: ACC_PUBLIC
    Code:
      stack=3, locals=2, args_size=1
         0: bipush        20
         2: istore_1
         3: getstatic     #3                  // Field java/lang/System.out:Ljava/io/PrintStream;
         6: new           #4                  // class java/lang/StringBuilder
         9: dup
        10: invokespecial #5                  // Method java/lang/StringBuilder."\<init>":()V
        13: ldc           #6                  // String count =
        15: invokevirtual #7                  // Method java/lang/StringBuilder.append:(Ljava/lang/String;)Ljava/lang/StringBuilder;
        18: iload_1
        19: invokevirtual #8                  // Method java/lang/StringBuilder.append:(I)Ljava/lang/StringBuilder;
        22: invokevirtual #9                  // Method java/lang/StringBuilder.toString:()Ljava/lang/String;
        25: invokevirtual #10                 // Method java/io/PrintStream.println:(Ljava/lang/String;)V
        28: return
      LineNumberTable:
        line 17: 0
        line 18: 3
        line 19: 28
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            0      29     0  this   Lcom/atguigu/java/MethodInnerStrucTest;
            3      26     1 count   I

  public static int test2(int);
    descriptor: (I)I
    flags: ACC_PUBLIC, ACC_STATIC
    Code:
      stack=2, locals=3, args_size=1
         0: iconst_0
         1: istore_1
         2: bipush        30
         4: istore_2
         5: iload_2
         6: iload_0
         7: idiv
         8: istore_1
         9: goto          17
        12: astore_2
        13: aload_2
        14: invokevirtual #12                 // Method java/lang/Exception.printStackTrace:()V
        17: iload_1
        18: ireturn
      Exception table:
         from    to  target type
             2     9    12   Class java/lang/Exception
      LineNumberTable:
        line 21: 0
        line 23: 2
        line 24: 5
        line 27: 9
        line 25: 12
        line 26: 13
        line 28: 17
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            5       4     2 value   I
           13       4     2     e   Ljava/lang/Exception;
            0      19     0   cal   I
            2      17     1 result   I
      StackMapTable: number_of_entries = 2
        frame_type = 255 /* full_frame */
          offset_delta = 12
          locals = [ int, int ]
          stack = [ class java/lang/Exception ]
        frame_type = 4 /* same */

  public int compareTo(java.lang.String);
    descriptor: (Ljava/lang/String;)I
    flags: ACC_PUBLIC
    Code:
      stack=1, locals=2, args_size=2
         0: iconst_0
         1: ireturn
      LineNumberTable:
        line 33: 0
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            0       2     0  this   Lcom/atguigu/java/MethodInnerStrucTest;
            0       2     1     o   Ljava/lang/String;

  public int compareTo(java.lang.Object);
    descriptor: (Ljava/lang/Object;)I
    flags: ACC_PUBLIC, ACC_BRIDGE, ACC_SYNTHETIC
    Code:
      stack=2, locals=2, args_size=2
         0: aload_0
         1: aload_1
         2: checkcast     #13                 // class java/lang/String
         5: invokevirtual #14                 // Method compareTo:(Ljava/lang/String;)I
         8: ireturn
      LineNumberTable:
        line 10: 0
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            0       9     0  this   Lcom/atguigu/java/MethodInnerStrucTest;

  static {};
    descriptor: ()V
    flags: ACC_STATIC
    Code:
      stack=1, locals=0, args_size=0
         0: ldc           #15                 // String 测试方法的内部结构
         2: putstatic     #16                 // Field str:Ljava/lang/String;
         5: return
      LineNumberTable:
        line 13: 0
}
Signature: #49                          // Ljava/lang/Object;Ljava/lang/Comparable\<Ljava/lang/String;>;Ljava/io/Serializable;
SourceFile: "MethodInnerStrucTest.java"

```

### 运行时常量池VS常量池

#### 常量池

方法区内部包含了**运行时常量池**
・字节码文件，内部包含了**常量池**。
・要弄清楚方法区，需要理解清楚ClassFile,因为加载类的信息都在方法区。
・要弄清楚方法区的运行时常量池，需要理解清楚ClassFile中的常量池https://docs.oracle.com/javase/specs/ivms/se8/htm1/jvms-4.html如下：

一个有效的字节码文件中除了包含类的版本信息、字段、方法以及接口等描述信息外，还包含一项信息那就是**常量池表( Constant Pool Table)**,包括各种字面量和对类型、域和方法的符号引用。

<img src="http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211201133937336.png" alt="image-20211201133937336" style="zoom: 80%;" />

##### **为什么需要常量池？**

一个java源文件中的类、接口，编译后产生一个字节码文件。而Java中的字节码需要数据支持，通常这种数据会很大以至于不能直接存到字节码里，换另一种方式，可以存到常量池，这个字节码包含了指向常量池的引用。在动态链接的时候会用到运行时常量池，之前有介绍。

##### **小结**

常量池，可以看做是一张表，虚拟机指令根据这张常量表找到要执行的类名、方法名、参数类型、字面量等类型。

#### 运行时常量池

:avocado: 运行时常量池( Runtime Constant Pool)是方法区的一部分。
:avocado: 常量池表( Constant Pool Table)是Class文件的一部分，用于**存放编译期生成的各种字面量与符号引用，这部分内容将在类加载后存放到方法区的运行时常量池中。**
:avocado: 运行时常量池，在加载类和接口到虚拟机后，就会创建对应的运行时常量池。
:avocado: JVM为每个已加载的类型（类或接口）都维护一个常量池。池中的数据项像数组项一样，是通过索引访问的。
:avocado: 运行时常量池中包含多种不同的常量，包括编译期就已经明确的数值字面量，也包括到运行期解析后才能够获得的方法或者字段引用。此时不再是常量池中的符号地址了，这里换为真实地址。
:avocado: 运行时常量池，相对于Class文件常量池的另一重要特征是：具备动态性。运行时常量池类似于传统编程语言中的符号表( symol table),但是它所包含的数据却比符号表要更加丰富一些。
:avocado: 当创建类或接口的运行时常量池时，如果构造运行时常量池所需的内存空间超过了方法区所能提供的最大值，则JVM会抛 OutOfMemoryError异常。

## 7.方法区的演进细节

### 1.首先明确：只有 HotSpotオ有永久代。

BEA JRockit、IBM J9等来说，是不存在永久代的概念的。原则上如何实现方法区属于虚拟机实现细节，不受《Java虚拟机规范》管束，并不要求统一。

### 2, HotSpot中方法区的变化：

| jak1.6及之前 | 有永久代( permanent generation),静态变量（变量名）存放在永久代上 |
| ------------ | ------------------------------------------------------------ |
| jdk. 7       | 有永久代，但已经逐步“去永久代”，字符串常量池、静态变量移除，保存在堆中 |
| jak1.8及之后 | 无永久代，类型信息、字段、方法、常量保存在本地内存的元空间，但字符串常量池、静态变量仍在堆 |

<img src="http://rcy276gfy.hd-bkt.clouddn.com/work/%E7%AC%AC08%E7%AB%A0_%E6%96%B9%E6%B3%95%E5%8C%BA%E7%9A%84%E6%BC%94%E8%BF%9B%E7%BB%86%E8%8A%82-hotspot.jpg" alt="第08章_方法区的演进细节-hotspot" style="zoom: 50%;" />

### 3.永久代为什么要被元空间替换？

・随着Java8的到来， Hotspot Vy中再也见不到永久代了。但是这并不意味着类的元数据信息也消失了。这些数据被移到了一个与堆不相连的本地内存区域，这个区域叫做元空间( Metaspace).
・由于类的元数据分配在本地内存中，元空间的最大可分配空间就是系统可用内存空
・这项改动是很有必要的，原因有：

#### 	1)为永久代设置空间**大小是很难确定**的

​			在某些场景下，如果动态加载类过多，容易产生Perm 区的OOM。比如某个实际Web工程中，因为功能点比较多，在运行过程中，要不断动态加载很多类，经常出现致命错误。比如Exception in thread ‘dubbo client x.x conner’ java. lang. Outommemoryemor PermGen space 而元空间和永久代之间最大的区别在于：元空间并不在虚拟机中，而是使用本地内存。因此，默认情况下，元空间的大小仅受本地内存限制。

#### 	2)对永久代进行**调优是很困难**的。

・判定一个常量是否“废弃”还是相对简单，而要判定一个类型是否属于“不再被使用的类”的条件就比较苛刻了。需要同时满足下面三个条件：
		该类所有的实例都已经被回收，也就是JAVA堆中不存在该类及其任何派生子类的实例。
		加载该类的类加载器已经被回收，这个条件除非是经过精心设计的可替换类加载器的场景，如OSGi、JSP的重加载等，否则通常是很难达成的。
		该类对应的java.lang.Class对象没有在任何地方被引用，无法在任何地方通过反射访问该类的方法。
・JAVA虚拟机被允许对满足上述三个条件的无用类进行回收，这里说的仅仅是“被允许”，而并不是和对象一样，没有引用了就必然会回收。关于是否要对类型进行回收，HotSpot虚拟机提供了-Xnoclassc参数进行控制，还可以使用 -verbose:class 以及 -XX:  TracedClass - Loading、-XX: +TraceClassUnLoading查看类加载和卸载信息。
・在大量使用反射、动态代理、CGLib等字节码框架，动态生成JSP以及OSGi这类频繁自定义类加载器的场景中，通常都需要Java虚拟机具备类型卸载的能力，以保证不会对方法区造成过大的内存压力。

### 4、Stringtable为什么要调整？

​		jdk7中将 string Table放到了堆空间中。因为永久代的回收效率很低，在full GC的时候才会触发。而full GC是老年代的空间不足、永久代不足时才会触发
这就导致 StringTable回收效率不高。而我们开发中会有大量的字符串被创建，回收效率低，导致永久代内存不足。放到堆里，能及时回收内存。

##  8.静态变量存在哪

工具：

```java
    public class StaticObjTest {
        static class Test {
            static ObjectHolder staticObj = new ObjectHolder();
            ObjectHolder instanceObj = new ObjectHolder();
            void foo

            {
                ObjectHolder localObj = new ObjectH01der();
                System.out.println("done");
                private static class ObjectHolder {
                }
                public static void main (String[]args){
                Test test = new StaticObjTest.Test();
                test.foo();
            }
        }
```

staticOBJ随着Test的类型信息存放在方法区， instanceOBJ随着Test的对象实例存放在JAVA堆，localObject则是存放在foo()方法栈帧的局部变量表中。

```
hsdb>scanoops 0x00007f32c7800000 0x00007f32c7b50000 JHSDB_TestCase$ObjectHolder
0x00007f32c7a7c458 JHSDB_TestCase$ObjectHolder
0x00007f32c7a7c480 JHSDB_TestCase$ObjectHolder
0x00007f32c7a7c490 JHSDB_TestCase$ObjectHolder
```

测试发现：三个对象的数据在内存中的地址都落在Eden区范围内，所以结论：只要是对象实例必然会在Java堆中分配

接着，找到了一个引用该 staticon>对象的地方，是在一个java.1ang.C1ass的实例里，并且给出了这个实例的地址，通过工 nspector查看该对象实例，可以清楚看到这确实是一个java.1ang.C1ass类型的对象实例，里面有一个名为 statical]的实例字段：

![image-20211201190914101](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211201190914101.png)

​		从《Java虚拟机规范》所定义的概念模型来看，所有Class相关的信息都应该存放在方法区之中，但方法区该如何实现，《JAVA虚拟机规范》并未做出规定，这就成了一件允许不同虚拟机自己灵活把握的事情。**JDK7及其以后版本的 HotSpot虚拟机选择把静态变量与类型在Java语言一端的映射class对象存放在一起，存储于Java堆之中，从我们的实验中也明确验证了这一点。**

## 9.方法区垃圾回收

​		有些人认为方法区(如 HotSpot虚拟机中的元空间或者永久)是没有垃圾收集行为的，其实不然。《Java虚拟机规范》对方法区的约束是非常宽松的，提到过可以不要求虚拟机在方法区中实现垃圾收集。事实上也确实有未实现或未能完整实现方法区类型卸载的收集器存在(如JDK11时期的ZGC收集器就不支持类卸载)。
​		一般来说这个区域的回收效果比较难令人满意，尤其是**类型的卸载，条件相当苛刻**。但是这部分区域的回收有时又确实是必要的。以前Sun公司的Bug列表中，曾出现过的若干个严重的Bug就是由于低版本的 HotSpot虚拟机对此区域未完全回收而导致内存泄漏。
​		**方法区的垃圾收集主要回收两部分内容：常量池中废弃的常量和不再使用的类型。**

​		先来说说方法区内常量池之中主要存放的**两大类常量**：字面量和符号引用字面量比较接近JAVA语言层次的常量概念，如文本字符串、被声明为final的常量值等。而符号引用则属于编译原理方面的概念，包括下面三类常量：
​				1、类和接口的全限定名
​				2、字段的名称和描述符
​				3、方法的名称和描述符
​		HotSpot,虚拟机对常量池的回收策略是很明确的，**只要常量池中的常量没有被任何地方引用，就可以被回收。**
​		回收废弃常量与回收JAVA堆中的对象非常类似

​		判定一个常量是否“废弃”还是相对简单，而要**判定一个类型是否属于“不再被使用的类”的条件就比较苛刻了。需要同时满足下面三个条件**
​				该类所有的实例都已经被回收，也就是Java堆中不存在该类及其任何派生子类的实例。
​				加载该类的类加载器已经被回收，这个条件除非是经过精心设计的可替换类加载器的场景，如OSGi、JSP的重加载等，否则通常是很难达成的。
​				该类对应的java.lang.Class对象没有在任何地方被引用，无法在任何地方通过反射访问该类的方法。
​		Java虚拟机被允许对满足上述三个条件的无用类进行回收，这里说的仅仅是“被允许”，而并不是和对象一样，没有引用了就必然会回收。关于是否要对类型进行回收，HotSpot虚拟机提供了-Xnoclassc参数进行控制，还可以使用 -cverbose:class以及 -XX: +TracedClass- Loading、-XX:  TracedClassUnLoading查看类加载和卸载信息。
​		在大量使用反射、动态代理、CGLib等字节码框架，动态生成JSP以及SGi这类频繁自定义类加载器的场景中，通常都需要Java虚拟机具备类型卸载的能力，以保证不会对方法区造成过大的内存压力。

# 十、对象的实例化内存  布局与访问定位

![第10章_对象的内存布局](http://rcy276gfy.hd-bkt.clouddn.com/%E7%AC%AC10%E7%AB%A0_%E5%AF%B9%E8%B1%A1%E7%9A%84%E5%86%85%E5%AD%98%E5%B8%83%E5%B1%80.jpg)

## 1.对象实例化的几种方式

![第10章_对象的实例化](http://rcy276gfy.hd-bkt.clouddn.com/%E7%AC%AC10%E7%AB%A0_%E5%AF%B9%E8%B1%A1%E7%9A%84%E5%AE%9E%E4%BE%8B%E5%8C%96.jpg)

## 2.创建对象的步骤

### 1.判断对象对应的类是否加载、链接、初始化

​		虚拟机遇到一条new指令，首先去检査这个指令的参数能否在 Metaspace的常量池中定位到一个类的符号引用，并且检查这个符号引用代表的类是否已经被加载、解析和初始化。（即判断类元信息是否存在）。如果没有，那么在双亲委派模式下，使用当前类加载器以classloader 包名 类名为Key进行查找对应的，class文件。如果没有找到文件，则抛出Classnotfound Exception异常，如果找到，则进行类加载，并生成对应的class类对象

### 2.为对象分配内存

​		首先计算对象占用空间大小，接着在堆中划分一块内存给新对象。如果实例成员变量是引用变量，仅分配引用变量空间即可，即4个字节大小。
**如果内存规整，使用指针碰撞**
​		如果内存是规整的，那么虚拟机将采用的是指针碰撞法( Bump The Pointer)来为对象分配内存。意思是所有用过的内存在一边，空闲的内存在另外一边，中间放着一个指针作为分界点的指示器，分配内存就仅仅是把指针向空闲那边挪动一段与对象大小相等的距离罢了。如果垃圾收集器选择的是 Serial、 Pardew这种基于压缩算法的，虚拟机采用这种分配方式。般使用带有 compact（整理）过程的收集器时，使用指针碰撞。
**如果内存不规整，虚拟机需要维护一个列表，使用空闲列表分配**
​		如果内存不是规整的，已使用的内存和未使用的内存相互交错，那么虚拟机将采用的是空闲列表法来为对象分配内存。意思是虚拟机维护了一个列表，记录上哪些内存块是可用的，再分配的时候从列表中找到一块足够大的空间划分给对象实例，并更新列表上的内容。这种分配方式成为“空闲列表( Free List)”
说明：选择哪种分配方式由Java堆是否规整决定，而JAVA堆是否规整又由所采用的垃圾收集器是否带有压缩整理功能决定。

### 3.处理并发安全问题

​		在分配内存空间时，另外一个问题是及时保证new对象时候的线程安全性：创建对象是非常频繁的操作，虚拟机需要解决并发问题。虚拟机采用了两种方式解决并发问题:
・CAS( Compare And Swap)失败重试、区域加锁：保证指针更新操作的原子性；
・TLAB把内存分配的动作按照线程划分在不同的空间之中进行，即每个线程在JAVA堆中预先分配一小块内存，称为本地线程分配缓冲区，（TLAB, Thread Local All ocation Buffer)虚拟机是否使用TLAB,可以通过-XX:+/- UseTLAB参数来设定。

### 4,初始化分配到的空间

​		内存分配结束，虚拟机将分配到的内存空间都初始化为零值（不包括对象头）。这一步保证了对象的实例字段在JAVA代码中可以不用赋初始值就可以直接使用，程序能访问到这些字段的数据类型所对应的零值。

### 5,设置对象的对象头

​		将对象的所属类（即类的元数据信息）、对象的 Hashcode,和对象的GC信息、锁信息等数
据存储在对象的对象头中。这个过程的具体设置方式取决于JVM实现。

### 6,执行init方法进行初始化

​		在Java程序的视角看来，初始化才正式开始。初始化成员变量，执行实例化代码块，调用类的构造方法，并把堆内对象的首地址赋值给引用变量。因此一般来说(由字节码中是否跟随有invokespecial指令所决定)，new指令之后会接着就是执行方法，把对象按照程序员的意愿进行初始化，这样一个真正可用的对象才算完全创建出来。

## 3.对象的内存布局

![第10章_内存布局](http://rcy276gfy.hd-bkt.clouddn.com/%E7%AC%AC10%E7%AB%A0_%E5%86%85%E5%AD%98%E5%B8%83%E5%B1%80.jpg)





![第10章_图示对象的内存布局](http://rcy276gfy.hd-bkt.clouddn.com/%E7%AC%AC10%E7%AB%A0_%E5%9B%BE%E7%A4%BA%E5%AF%B9%E8%B1%A1%E7%9A%84%E5%86%85%E5%AD%98%E5%B8%83%E5%B1%80.jpg)

## 4.对象访问定位

![第10章_对象访问定位](http://rcy276gfy.hd-bkt.clouddn.com/%E7%AC%AC10%E7%AB%A0_%E5%AF%B9%E8%B1%A1%E8%AE%BF%E9%97%AE%E5%AE%9A%E4%BD%8D.jpg)

<img src="http://rcy276gfy.hd-bkt.clouddn.com/%E7%AC%AC10%E7%AB%A0_%E6%96%B9%E5%BC%8F1%EF%BC%9A%E5%8F%A5%E6%9F%84%E8%AE%BF%E9%97%AE.jpg" alt="第10章_方式1：句柄访问" style="zoom: 50%;" />

<img src="http://rcy276gfy.hd-bkt.clouddn.com/%E7%AC%AC10%E7%AB%A0_%E6%96%B9%E5%BC%8F2%EF%BC%9A%E4%BD%BF%E7%94%A8%E7%9B%B4%E6%8E%A5%E6%8C%87%E9%92%88%E8%AE%BF%E9%97%AE.jpg" alt="第10章_方式2：使用直接指针访问" style="zoom:50%;" />

<img src="http://rcy276gfy.hd-bkt.clouddn.com/%E7%AC%AC10%E7%AB%A0_%E5%8F%A5%E6%9F%84%E8%AE%BF%E9%97%AE%E5%AF%B9%E8%B1%A1-%E4%B8%B4%E6%97%B6.jpg" alt="第10章_句柄访问对象-临时" style="zoom:50%;" />

# 十一、_直接内存_  

・不是虚拟机运行时数据区的一部分，也不是《Java虚拟机规范》中定义的内存区域。
・直接内存是在Java堆外的、直接向系统申请的内存区间。
来源于NIO,通过存在堆中的 Directbytebuffer操作 Native内存
・通常，访问直接内存的速度会优于Java堆。即读写性能高。因此出于性能考虑，读写频繁的场合可能会考虑使用直接内存。
Java的NIO库允许Java程序使用直接内存，用于数据缓冲区

非直接缓存：读写文件，需要与磁盘交互，需要由用户态切换到内核态。在内核态时，需要内存如右图的操作。
使用ｴO,见右图。这里需要两份内存存储重复数据，效率低。

直接缓存：使用NIO时，如图。操作系统划出的直接缓存区可以被java代码直接访问，只有一份。NIO适合对大文件的读写操作。

![image-20211204181442675](http://rcy276gfy.hd-bkt.clouddn.com/image-20211204181442675.png)

直接内存也可能导致 Outofmemoryerror异常，由于直接内存在Java堆外，因此它的大小不会直接受限于-Xmx指定的最大堆大小，但是系统内存是有限的，Java堆和直接内存的总和依然受限于操作系统能给出的最大内存。
**缺点：**
分配回收成本较高
不受JVM内存回收管理
直接内存大小可以通过 MaxDlrectMemorySize如果不指定，默认与堆的最大值一Xmx参数值一致

# 十二、_执行引擎_



# 十三、StringTable

## 1.String的基本特性

**String:字符串,使用一对" "引起来表示.**
・ string s1=" atgulqu";//字面量的定义方式
・ string s2= new String("hello")；
**string声明为final的,不可被继承**
・ string实现了 Serializable接口:表示字符串是支持序列化的.
			实现了 Comparable接口:表示 string可以比较大小
・ String在jdk8及以前内部定义了 final char【】 value用于存储字符串数据.jk9时改为byte【】加上编码标记 以节约空间。StringBuffer与StringBuilder同步修改。
**string:代表不可变的字符序列.简称:不可变性.**

当对字符串重新赋值时,需要重写指定内存区域赋值,不能使用原有的value进行赋值.
当对现有的字符串进行连接操作时,也需要重新指定内存区域赋值,不能使用原有的value进行赋值.
当调用 string的 replace()方法修改指定字符或字符串时,也需要重新指定内存区域赋值,不能使用原有的value进行赋值
通过字面量的方式(区别于new)给一个字符串赋值,此时的字符串值声明在字符串常量池中.

**字符串常量池中是不会存储相同内容的字符串的**
Stringl的 String Pool是一个固定大小的 Hashtable,默认值大小长度是1009.如果放进 string Pool的String非常多,就会造成Hash冲严重,从而导致链表会很长,而链表长了后直接会造成的影响就是当调用
String. internl时性能会大幅下降.
使用-XX: StringTableSize可设置 StringTable的长度
在jdk6中 StringTable是固定的,就是1009的长度,所以如果常量池中的字符串过多就会导致效率下降很快. StringTableSize设置没有要求
在jdk7中， Stringtable的长度默认值是60013, StringTableSize设置没有要求
Jdk8开始，设置 StringTable的长度的话，1009是可设置的最小值。

## 2.String的内存分配

​		在Java语言中有8种基本数据类型和一种比较特殊的类型 string。这些类型为了使它们在运行过程中速度更快、更节省内存，都提供了一种常量池的概念。常量池就类似一个Java系统级别提供的缓存。8种基本数据类型的常量池都是系统协调的，String类型的常量池比较特殊。它的主要使用方法有两种：
直接使用双引号声明出来的 string对象会直接存储在常量池中。比如：Stringinfo="atqulgu.com";
如果不是用双引号声明的 string对象，可以使用 string提供的 Intern（）方法。

Java6及以前，字符串常量池存放在永久代。
Java7 中 Oracle的工程师对字符串池的逻辑做了很大的改变，即将字符串常量池的位置调整到Java堆内。
		所有的字符串都保存在堆(Heap)中，和其他普通对象一样，这样可以让你在进行调优应用时仅需要调整堆大小就可以了。
		字符串常量池概念原本使用得比较多，但是这个改动使得我们有足够的理由让我们重新考虑在Java7中使用 string.intern（）
Java8元空间，字符串常量在堆。

## 3.String的基本操作

![image-20211207141556841](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211207141556841.png)

## 4.字符串拼接操作

常量与常量的拼接结果在常量池，原理是编译期优化
2.常量池中不会存在相同内容的常量。
3.只要其中有一个是变量，结果就在堆中。变量拼接的原理是 String Builder
4.如果拼接的结果调用 intern（）方法，则主动将常量池中还没有的字符串对象放入池中，并返回此对象地址。

### 字符串如何拼接？

字符审拼接操作不一定使用的是 Stringbuilder!
如果拼接符号左右两边部是字符审常量戦常量引用，则仍然使编译期优化，即非 StringBuilder的方式分对于 final修飾类、方法、蒸本数类率、引用数据类型的量的结构时，能使用上 final的时候建议使用上。

体会执行效率：通过 StringBuilder的append（）的方式添加字符宇的教率要远高于使用 string的字符宇拼接方式！
洋情： StringBuilder的 append（）的方式：自始至終中只创建过一个StringBuilder的对象
使用String的字符串拼接方式：建过多个 StringBuilder和 String的对象
使用 String的字符串拼接方式：内存中出于创建了较多 StringBuilder和 String的对象，内存占用更大；如果进行GC,需要花费额外的时间。
改进空间：在实际开发中，如果基本确定要前前后后添加的字符串长度不高手某个限定值 highlevel的况下，建议使用构造器实例化

StringBuilder s=new StringBuilder(highlevel);//new char[highlevel]

```java
String s1="a";
String s2="b";
String s3="ab";
//s1+s2细节：
//1.StringBuilder s=new StringBuilder();
//s.append("a");
//s.append("b");
//s.toString()//--->约等于 new String("ab")
```



## 5.intern（）的使用

​		如果不是用双引号声明的 string对象，可以使用 string提供的 intern方法： intern方法会从字符串常量池中査询当前字符串是否存在，若不存在就会将当前字符串放入常量池中。
比如：String myinfo = new string("I love atguigu").intern(）
​		也就是说，如果在任意字符串上调用 string. intern方法，那么其返回结果所指向的那个类实例，必须和直接以常量形式出现的字符串实例完全相同。因此，下列表达式的值必定是true:
​		(“a”+“b”+“c”).intern() =="abc"
​		通俗点讲， Interned String/就是确保字符串在内存里只有一份拷贝，这样可以节约内存空间，加快字符串操作任务的执行速度。注意，这个值会被存放在字符串内部池(String Intern Pool)

### 问题

new String（“ab”）会创建几个对象,new String("a") + new String("b")呢？

![image-20211208140030760](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211208140030760.png)

![image-20211208140108804](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211208140108804.png)

```java
/**
 * 题目：
 * new String("ab")会创建几个对象？看字节码，就知道是两个。
 *     一个对象是：new关键字在堆空间创建的
 *     另一个对象是：字符串常量池中的对象"ab"。 字节码指令：ldc
 *
 *
 * 思考：
 * new String("a") + new String("b")呢？
 *  对象1：new StringBuilder()
 *  对象2： new String("a")
 *  对象3： 常量池中的"a"
 *  对象4： new String("b")
 *  对象5： 常量池中的"b"
 *
 *  深入剖析： StringBuilder的toString():
 *      对象6 ：new String("ab")
 *       强调一下，toString()的调用，在字符串常量池中，没有生成"ab"
 */
public class StringNewTest {
    public static void main(String[] args) {
//        String str = new String("ab");

        String str = new String("a") + new String("b");
    }
}
```

### 如何保证变量s指向的是字符串常量池中的数据呢？

```java
/**
 * 如何保证变量s指向的是字符串常量池中的数据呢？
 * 有两种方式：
 * 方式一： String s = "shkstart";//字面量定义的方式
 * 方式二： 调用intern()
 *         String s = new String("shkstart").intern();
 *         String s = new StringBuilder("shkstart").toString().intern();
 */
public class StringIntern {
    public static void main(String[] args) {

        String s = new String("1");
        s.intern();//调用此方法之前，字符串常量池中已经存在了"1"
        String s2 = "1";
        System.out.println(s == s2);//jdk6：false   jdk7/8：false


        String s3 = new String("1") + new String("1");//s3变量记录的地址为：new String("11")
        //执行完上一行代码以后，字符串常量池中，是否存在"11"呢？答案：不存在！！
        s3.intern();//在字符串常量池中生成"11"。如何理解：jdk6:创建了一个新的对象"11",也就有新的地址。
                                            //         jdk7:此时常量中并没有创建"11",而是创建一个指向堆空间中new String("11")的地址
        String s4 = "11";//s4变量记录的地址：使用的是上一行代码代码执行时，在常量池中生成的"11"的地址
        System.out.println(s3 == s4);//jdk6：false  jdk7/8：true
    }


}
```

```java
public class StringIntern1 {
    public static void main(String[] args) {
        String s3 = new String("1") + new String("1");//new String("11")
        //执行完上一行代码以后，字符串常量池中，是否存在"11"呢？答案：不存在！！
        String s4 = "11";//在字符串常量池中生成对象"11"
        String s5 = s3.intern();
        System.out.println(s3 == s4);//false
        System.out.println(s5 == s4);//true
    }
}
```

### 总结 stringl的 intern（）的使用

・jdk1.6中，将这个字符串对象尝试放入串池。
		如果串池中有，则并不会放入。返回已有的串池中的对象的地址。如果没有，**会把此对象复制一份**，放入串池，并返回串池中的对象地址
・Jdk1.7起，将这个字符串对象尝试放入串池。
		如果串池中有，则并不会放入。返回已有的串池中的对象的地址。如果没有，**则会把对象的引用地址复制一份**，放入串池，并返回串池中的引用地址

```java
public class StringExer1 {
    public static void main(String[] args) {
        String x = "ab";
        String s = new String("a") + new String("b");//new String("ab")
        //在上一行代码执行完以后，字符串常量池中并没有"ab"

        String s2 = s.intern();//jdk6中：在串池中创建一个字符串"ab"
                               //jdk8中：串池中没有创建字符串"ab",而是创建一个引用，指向new String("ab")，将此引用返回

        System.out.println(s2 == "ab");//jdk6:true  jdk8:true
        System.out.println(s == "ab");//jdk6:false  jdk8:true
    }
}
```

```java
public class StringExer2 {
    public static void main(String[] args) {
        String s1 = new String("ab");//执行完以后，会在字符串常量池中会生成"ab"
//        String s1 = new String("a") + new String("b");////执行完以后，不会在字符串常量池中会生成"ab"
        s1.intern();
        String s2 = "ab";
        System.out.println(s1 == s2);
    }
}
```

### 空间效率测试

```java
/**
 * 使用intern()测试执行效率：空间使用上
 *
 * 结论：对于程序中大量存在存在的字符串，尤其其中存在很多重复字符串时，使用intern()可以节省内存空间。
 * 大的网站平台，需要内存中存储大量的字符串。比如社交网站，很多人都存储：北京市、海淀区等信息。这时侯如果字符串都调用intern（）方 *    * 法，就会明显降低内存的大小。
 */
public class StringIntern2 {
    static final int MAX_COUNT = 1000 * 10000;
    static final String[] arr = new String[MAX_COUNT];

    public static void main(String[] args) {
        Integer[] data = new Integer[]{1,2,3,4,5,6,7,8,9,10};

        long start = System.currentTimeMillis();
        for (int i = 0; i \< MAX_COUNT; i++) {
//            arr[i] = new String(String.valueOf(data[i % data.length]));
            arr[i] = new String(String.valueOf(data[i % data.length])).intern();

        }
        long end = System.currentTimeMillis();
        System.out.println("花费的时间为：" + (end - start));

        try {
            Thread.sleep(1000000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.GC();
    }
}
```

### 垃圾回收测试

```java
/**
 * String的垃圾回收:
 * -Xms15m -Xmx15m -XX:+PrintStringTableStatistics -XX:+PrintGCDetails
 *
 * @author shkstart  shkstart@126.com
 * @create 2020  21:27
 */
public class StringGCTest {
    public static void main(String[] args) {
        for (int j = 0; j \< 100000; j++) {
            String.valueOf(j).intern();
        }
    }
}
```

### G1的String去重操作

#### **背景：**

对许多Java应用（有大的也有小的）做的测试得出以下结果：
		堆存活数据集合里面 string,对象占了25%
		堆存活数据集合里面重复的 string对象有13.5%
		String对象的平均长度是45
许多大规模的Java应用的瓶颈在于内存，测试表明，在这些类型的应用里面，Java堆中存活的数据集合差不多25%是 string对象。更进一步，这里面差不多一半 string对象是重复的，重复的意思是说:
strinG1. equals( string2)=true。堆上存在重复的 String对象必然是一种内存的浪费。这个项目将在G1垃圾收集器中实现自动持续对重复的 string对象进行去重，这样就能避免浪费内存。

#### **实现**

当垃圾收集器工作的时候，会访问堆上存活的对象。对每一个访问的对象都会检查是否是候选的要去重的String对象。
如果是，把这个对象的一个引用插入到队列中等待后续的处理。一个去重的线程在后台运行，处理这个队列。处理队列的一个元素意味着从队列删除这个元素，然后尝试去重它引用的String对象。
使用一个 hashtable来记录所有的被 String对象使用的不重复的char数组。当去重的时候，会査这个 hashtable,来看堆上是否已经存在一个一模一样的char数组。
如果存在， string对象会被调整引用那个数组，释放对原来的数组的引用，最终会被垃圾收集器回收掉。
如果查找失败，char数组会被插入到 hashtable,这样以后的时候就可以共享这个数组了。

#### **命令行选项**

UsestringDeduplication(bool):开启 String去重，默认是不开启的，需要手动开启。
PrintstringDeduplicationStatistics(bool):打印详细的去重统计信息
StringdeduplicationAgethreshold( uintx):达到这个年龄的 string对象被认为是去重的候选对象

# 十四、_垃圾回收概述_              

垃圾收集，不是Java语言的伴生产物。早在1960年，第一门开始使用内存动态分配和垃圾收集技术的Lisp语言诞生
关于垃圾收集有三个经典问题：哪些内存需要回收？>什么时候回收？如何回收？
		垃圾收集机制是Java的招牌能力，极大地提高了开发效率。如今，垃圾收集几乎成为现代语言的标配，即使经过如此长时间的发展，Java的垃圾收集机制仍然在不断的演进中，不同大小的设备、不同特征的应用场景，对垃圾收集提出了新的挑战，这当然也是面试的热点。

题例：
**蚂蚁金服：**
你知道哪几种垃圾回收器，各自的优缺点，重点讲一下CMS和G1
面： JVM GC算法有哪些，目前的JDK版本采用什么回收算法
面：G1回收器讲下回收过程
GC是什么？为什么要有GC?
面：GC的两种判定方法?CMS收集器与G1收集器的特点。
**百度：**
说一下GC算法，分代回收说下垃圾收集策略和算法
**天猫：**
面： JVM GC原理，JVM怎么回收内存
一面：CMS特点，垃圾回收算法有哪些？各自的优缺点，他们共同的缺点是什么？
**滴滴**
面：java的垃圾回收器都有哪些，说下G1的应用场景，平时你是如何搭配使用垃圾回收器的。
**京东：**
你知道哪几种垃圾收集器，各自的优缺点，重点讲下CMS和G1,包括原理，流程，优缺点。垃圾回收算法的实现原理阿里：
讲一讲垃圾回收算法。什么情况下触发垃圾回收？如何选择合适的垃圾收集算法？
JVM有哪三种垃圾回收器？
**字节跳动：**
常见的垃圾回收器算法有哪些，各有什么优劣？system.GC（）和 runtime.GC（）会做什么事情？面： Java GC机制？ GC Roots有哪些？
二面：Java对象的回收方式，回收算法
CMS和G1了解么，CMS解决什么问题，说一下回收的过程。
CMS回收停顿了几次，为什么要停顿两次。                                

## 1.什么是垃圾

   **什么是垃圾( Garbage)呢？**

垃圾是指在运行程序中没有任何指针指向的对象，这个对象就是需要被回收的垃圾。
An object is considered garbage when it can nolonger be reached from any pointer in the runningprogram
如果不及时对内存中的垃圾进行清理，那么，这些垃圾对象所占的内存空间会一直保留到应用程序结束，被保留的空间无法被其他对象使用。甚至可能导致内存溢出。

##  2.想要学习GC,首先需要理解为什么需要GC?

   ​		对于高级语言来说，一个基本认知是如果不进行垃圾回收，内存迟早都会被消耗完因为不断地分配内存空间而不进行回收，就好像不停地生产生活垃圾而从来不打扫一样。
   ​		除了释放没用的对象，垃圾回收也可以清除内存里的记录碎片。碎片整理将所占用的堆内存移到堆的一端，以便JVM将整理出的内存分配给新的对象。
   ​		随着应用程序所应付的业务越来越庞大、复杂，用户越来越多，没有GC就不能保证应用程序的正常进行。而经常造成STW的GC又跟不上实际的需求，所以才会不断地尝试对GC进行优化。

3. ## 早期垃圾回收

   ​		在早期的C/C  时代，垃圾回收基本上是手工进行的。开发人员可以使用new关键字进行内存申请，并使用 delete关键字进行内存释放。比如以下代码。

   ![image-20211213192112115](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211213192112115.png)

   ​		这种方式可以灵活控制内存释放的时间，但是会给开发人员带来频繁申请和释放内存的管理负担。倘若有一处内存区间由于程序员编码的问题忘记被回收，那么就会产生内存泄漏，垃圾对象永远无法被清除，随着系统运行时间的不断增长，垃圾对象所耗内存可能持续上升，直到出现内存溢出并造成应用程序崩溃。现在，除了Java以外，C#、 python、Ruby等语言都使用了自动垃圾回收的思想，也是未来发展趋势。可以说，这种自动化的内存分配和垃圾回收的方式己经成为现代开发语言必备的标准。

4. ## Java垃圾回收机制

​		自动内存管理，无需开发人员手动参与内存的分配与回收，这样降低内存泄漏和内存溢出的风险。没有垃圾回收器，java也会和cpp一样，各种悬垂指针，野指针，泄露问题让你头疼不已。
​		自动内存管理机制，将程序员从繁重的内存管理中释放出来，可以更专心地专注于业务开发
oracle官网关于垃圾回收的介绍：https://docs.oracle.com/javase/8/docs/technotes/guides/vm/GCtuning/toc.html
​		对于Java开发人员而言，自动内存管理就像是一个黑匣子，如果过度依赖于“自动”，那么这将会是一场灾难，最严重的就会弱化Java开发人员在程序出现内存溢出时定位问题和解决问题的能力。
​		此时，了解JVM的自动内存分配和内存回收原理就显得非常重要，只有在真正了解JVM是如何管理内存后，我们才能够在遇见 OutOfMemoryError时，快速地根据错误异常日志定位问题和解决问题。
​		当需要排查各种内存溢出、内存泄漏问题时，当垃圾收集成为系统达到更高并发量的瓶颈时，我们就必须对这些“自动化”的技术实施必要的监控和调节。

![image-20211213193207101](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211213193207101.png)

垃圾回收器可以对年轻代回收，也可以对老年代回收，甚至是全堆和方法区的回收。
其中，Java堆是垃圾收集器的工作重点。
从次数上讲
频繁收集 Young区
较少收集old区
基本不动Perm区

# 十五、_垃圾回收相关算法_

##  1.垃圾标记阶段的算法

###  		1.垃圾标记阶段：对象存活判断

​		在堆里存放着几乎所有的Java对象实例，在GC执行垃圾回收之前，首先需要区分出内存中哪些是存活对象，哪些是已经死亡的对象。只有被标记为己经死亡的对象，GCオ会在执行垃圾回收时，释放掉其所占用的内存空间，因此这个过程我们可以称为**垃圾标记阶段**。
  	 那么在JVM中究竟是如何标记一个死亡对象呢？简单来说，当一个对象已经不再被任何的存活对象继续引用时，就可以宣判为已经死亡。**判断对象存活一般有两种方式：引用计数算法和可达性分析算法。**

#### 方式一：引用计数算法

- 引用计数算法( Reference Counting)比较简单，**对每个对象保存一个整型的引用计数器属性。用于记录对象被引用的情况。**
- 对于一个对象A,只要有任何一个对象引用了A,则A的引用计数器就加1;当引用失效时，引用计数器就减1。只要对象A的引用计数器的值为0,即表示对象A不可能再被使用，可进行回收。
- **优点**：实现简单，垃圾对象便于辨识；判定效率高，回收没有延退性。
- **缺点**：它需要单独的字段存储计数器，这样的做法增加了存储空间的开销。每次赋值都需要更新计数器，伴随着加法和减法操作，这增加了时间开销。引用计数器有一个严重的问题，即无法处理循环引用的情况。这是一条致命缺陷，导致在Java的垃圾回收器中没有使用这类算法。

#### 方式二：可达性分析(或根搜索算法、追踪性垃圾收集)

- 相对于引用计数算法而言，可达性分析算法不仅同样具备实现简单和执行高效等特点，更重要的是该算法可以有效地解决在引用计数算法中循环引用的问题，防止内存泄漏的发生。
- 相较于引用计数算法，这里的可达性分析就是Java、C#选择的。这种类型的垃圾收集通常也叫作追踪性垃圾收集（ Tracing Garbage Collection)。

所谓" **GC Roots**"根集合就是**一组必须活跃的引用**。
**基本思路：**

- 可达性分析算法是以根对象集合( GC Roots)为起始点，按照从上至下的方式搜索被根对象集合所连接的目标对象是否可达。

- 使用可达性分析算法后，内存中的存活对象都会被根对象集合直接或间接连接着，搜索所走过的路径称为**引用链( Reference Chain)**

- 如果目标对象没有任何引用链相连，则是不可达的，就意味着该对象己经死亡，可以标记为垃圾对象。

- 在可达性分析算法中，只有能够被根对象集合直接或者间接连接的对象才是存活对象。

  ![image-20211213194458567](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211213194458567.png)

  

##### GC ROOT

  在Java语言中， GC Roots包括以下几类元素：

  - 虚拟机栈中引用的对象。比如：各个线程被调用的方法中使用到的参数、局部变量等。
  - 本地方法栈内JNI（通常说的本地方法）引用的对象
  - 方法区中类静态属性引用的对象>比如：Java类的引用类型静态变量方法区中常量引用的对象。比如：字符串常量池( String Table)里的引用所有被同步锁 synchronized持有的对象
  - Java虚拟机内部的引用。基本数据类型对应的class对象，一些常驻的异常对象（如：Null Pointerexception、 OutOfMemoryError),系统类加载器。
  - 反映java虚拟机内部情况的 JMXbeam、JVMTI中注册的回调、本地代码缓存等。
  
  - 除了这些固定的 GC Roots集合以外，根据用户所选用的垃圾收集器以及当前回收的内存区域不同，还可以有其他对象“临时性”地加入，共同构成完整 GC Roots集合。比如：分代收集和局部回收( Partial GC)。如果只针对Java堆中的某一块区域进行垃圾回收(比如：典型的只针对新生代)，必须考虑到内存区域是虚拟机自己的实现细节，更不是孤立封闭的，这个区域的对象完全有可能被其他区域的对象所引用，这时候就需要一并将关联的区域对象也加入 GC Roots 集合中去考虑，才能保证可达性分析的准确性
  - 小技巧：由于Root采用栈方式存放变量和指针，所以如果一个指针，它保存了堆内存里面的对象，但是自己又不存放在堆内存里面，那它就是一个Root
  - 如果要使用可达性分析算法来判断内存是否可回收，那么分析工作必须在个能保障一致性的快照中进行。这点不满足的话分析结果的准确性就无法保证。
  - 这点也是导致GC进行时必须 “Stop The World"的一个重要原因。即使是号称（几乎）不会发生停顿的CMS收集器中，**枚举根节点时也是必须要停顿的。**

##  2.对象的 finalization机制

- Java语言提供了对象终止( finalization)机制来允许开发人员提供对象被销毁之前的自定义处理逻辑。

- 当垃圾回收器发现没有引用指向一个对象，即：垃圾回收此对象之前，总会先调用这个对象的 finallize（）方法

- **finalize()**方法允许在子类中被重写，用**于在对象被回收时进行资源释放**。通常在这个方法中进行一些资源释放和清理的工作，比如关闭文件、套接字和数据库连接等。

- 永远不要主动调用某个对象的finalize()方法，应该交给垃圾回收机制调用。理由包括下面三点：

  -  finalize() 时可能会导致对象复活。
  -  finalize() 方法的执行时间是没有保障的，它完全由GC线程决定，极端情况下，若不发生GC,则finalize()方法将没有执行机会。
  - 一个糟糕的 finalize() 会严重影响GC的性能

  从功能上来说， finalize() 方法与 C 中的析构函数比较相似，但是Java采用的是基于垃圾回收器的自动内存管理机制，所以 finalize() 方法在本质上不同于C中的析构函数。由于 finalize() 方法的存在，虚拟机中的对象一般处于三种可能的状态。

- 如果从所有的根节点都无法访问到某个对象，说明对象己经不再使用了。一般来说，此对象需要被回收。但事实上，也并非是“非死不可”的，这时候它们暂时处于“缓刑”阶段。**一个无法触及的对象有可能在某一个条件下“复活”自己**，如果这样，那么对它的回收就是不合理的，为此，定义虚拟机中的对象可能的三种状态。如下：

  - 可触及的：从根节点开始，可以到达这个对象。
  - 可复活的：对象的所有引用都被释放，但是对象有可能 finalize() 中复活。
  - 不可触及的：对象的 finalize() 被调用，并且没有复活，那么就会进入不可触及状态。不可触及的对象不可能被复活，因为 finalize() 只会被调用一次。

- 以上3种状态中，是由于fina1ize（）方法的存在，进行的区分。只有在对象不可触及时才可以被回收。

- **具体过程：**

- 判定一个对象 objA 是否可回收，至少要经历两次标记过程

  - 1.如果对象。objA到 GC Roots没有引用链，则进行第一次标记。
  - 2.进行筛选，判断此对象是否有必要执行finalize()方法。
    - ①如果对象objA没有重写 finalize()方法，或者 finalize() 方法已经被虚拟机调用过，则虚拟机视为“没有必要执行”，objA被判定为不可触及的。
    - ②如果对象objA重写了finalize() 方法，且还未执行过，那么objA会被插入到F- Queue队列中，由一个虚拟机自动创建的、低优先级的Finalizer线程触发其 finalize() 方法执行。
    - ③ finalize() 方法是对象逃脱死亡的最后机会，稍后GC会对F- Queue队列中的对象进行第二次标记。如果objA在finalize() 方法中与引用链上的任何一个对象建立了联系，那么在第二次标记时，objA会被移出“即将回收”集合。之后，对象会再次出现没有引用存在的情况。在这个情况下，finalize方法不会被再次调用，对象会直接变成不可触及的状态，也就是说，**一个对象的finalize方法只会被调用一次。**

##  3.MAT与 Jprofiler的GC Roots湖源

### MAT

MAT是 Memory Analyzer的简称，它是一款功能强大的Java堆内存分析器。用于査找内存泄漏以及査看内存消耗情况。MAT是基于 Eclipse开发的，是一款免费的性能分析工具大家可以在https://www.eclipse.org/mat/下载并使用MAT。

​		**获取 dump 文件**

![image-20211213202356234](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211213202356234.png)

![image-20211213202420474](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211213202420474.png)

![image-20211214182640190](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211214182640190.png)

![image-20211214182749364](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211214182749364.png)

### Jprofiler

<img src="http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211214184140247.png" alt="image-20211214184140247" style="zoom: 80%;" />

## 4.垃圾清除阶段算法之标记一清除算法

- 当成功区分出内存中存活对象和死亡对象后，GC接下来的任务就是执行垃圾回收，释放掉无用对象所占用的内存空间，以便有足够的可用内存空间为新对象分配内存。
- 目前在JVM中比较常见的三种垃圾收集算法是**标记 - 清除算法（Mark Sweep)、复制算法( Copying)、标记 - 压缩算法（Mark Compact）**

### 标记 - 清除算法（Mark Sweep) 

> 停止-标记-清除

**背景**：标记一清除算法(Mark- Sweep)是一种非常基础和常见的垃圾收集算法，该算法被J. Mccarthy等人在1960年提出并并应用于Lisp语言。
**执行过程**：当堆中的有效内存空间(avail able memory)被耗尽的时候，就**会停止**整个程序(也被称为 stop the world),然后进行两项工作，第一项则是标记，第二项则是清除。
**标记**：Collector从引用根节点开始遍历，标记所有被引用的对象。一般是在对象的 Header中记录为可达对象。
**清除**：Collector对堆内存从头到尾进行线性的遍历，如果发现某个对象在其 Headerl中没有标记为可达对象，则将其回收.

**缺点**
效率不算高
在进行GC的时候，需要停止整个应用程序，导致用户体验差。
这种方式清理出来的空闲内存是不连续的，产生内存碎片。需要维护一个空闲列表注意。
**何为清除？**
这里所谓的清除并不是真的置空，而是把需要清除的对象地址保存在空闲的地址列表里。下次有新对象需要加载时，判断垃圾的位置空间是否够如果够，就存放。

### 复制算法( Copying)

> 两块-活连续复制到另一块-清除

**背景**
		为了解决标记一清除算法在垃圾收集效率方面的缺陷,M,工. Minsky于1963年发表了著名的论文,"使用双存储区的**Lisp语言**垃圾收集器CALISP Garbage Collector Algorithm Using Serial Secondary Storage)"。M.L. Minsky在该论文中描述的算法被人们]称为复制( Copying)算法,它也被M.L. Minsky本人成功地引入到了Lisp语言的一个实现版本中。
**执行过程**
		将活着的内存空间分为两块,每次只使用其中一块,在垃圾回收时将正在使用的内存中的存活对象复制到未被使用的内存块中,之后清除正在使用的内存块中的所有对象,交换两个内存的角色,最后完成垃圾回收.

**优点：**
没有标记和清除过程，实现简单，运行高效
复制过去以后保证空间的连续性，不会出现“碎片”问题缺点
**缺点**：需要两倍的内存空间。
			对于G1这种分拆成为大量 region的GC,复制而不是移动，意味着GC需要维护 region之间对象引用关系，不管是内存占用或者时间开销也不小。
**特别的**：如果系统中的垃圾对象很多，复制算法不会很理想，因为复制算法需要复制的存活对象数量并不会太大或者说非常低才行。

### 标记 - 压缩算法（Mark Compact）

> 标记-引用对象压缩到一端-清除

**背景**
		复制算法的高效性是建立在存活对象少、垃圾对象多的前提下的。这种情况在新生代经常发生，但是在老年代，更常见的情况是大部分对象都是存活对象。如果依然使用复制算法，由于存活对象较多，复制的成本也将很高。因此，基于老年代垃圾回收的特性，需要使用其他的算法。
标记一清除算法的确可以应用在老年代中，但是该算法不仅执行效率低下，而且在执行完内存回收后还会产生内存碎片，所以JM的设计者需要在此基础之上进行改进。标记压缩(Mark- Compact)算法由此诞生。
1970年前后，G.L. Steele、C.J. Chene和D.S.Wise等研究者发布标记压缩算法。在许多现代的垃圾收集器中，人们都使用了标记-压缩算法或其改进版本。

**执行过程**
第一阶段和标记清除算法一样从根节点开始标记所有被引用对象
第二阶段将所有的存活对象压缩到内存的一端，按顺序排放。
之后，清理边界外所有的空间。

​		标记一压缩算法的最终效果等同于标记一清除算法执行完成后，再进行一次内存碎片整理，因此，也可以把它称为标记一清除一压缩（Mark- Sweep-
Compact)算法。二者的本质差异在于标记一清除算法是一种非移动式的回收算法，标记-压缩是移动式的。是否移动回收后的存活对象是一项优缺点并存的风险决策。可以看到，标记的存活对象将会被整理，按照内存地址依次排列，而未被标记的内存会被清理掉。如此一来，当我们需要给新对象分配内存时，JVM只需要持有一个内存的起始地址即可，这比维护一个空闲列表显然少了许多开销。

**优点：**
消除了标记一清除算法当中，内存区域分散的缺点，我们需要给新对象分配内存时，JVM只需要持有一个内存的起始地址即可。消除了复制算法当中，内存减半的高额代价
**缺点：**
从效率上来说，标记一整理算法要低于复制算法移动对象的同时，如果对象被其他对象引用，则还需要调整引用的地址。移动过程中，需要全程暂停用户应用程序。即：STW

### 总结

![image-20211214190625627](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211214190625627.png)

​		效率上来说，复制算法是当之无愧的老大，但是却浪费了太多内存。而为了尽量兼顾上面提到的三个指标，标记一整理算法相对来说更平滑一些，但是效率上不尽如人意，它比复制算法多了一个标记的阶段，比标记一清除多了一个整理内存的阶段。

- 前面所有这些算法中，并没有一种算法可以完全替代其他算法，它们都具有自己独特的优势和特点。分代收集算法应运而生。
- 分代收集算法，是基于这样一个事实：不同的对象的生命周期是不一样的。因此，不同生命周期的对象可以采取不同的收集方式，以便提高回收效率。一般是把Java堆分为新生代和老年代，这样就可以根据各个年代的特点使用不同的回收算法，以提高垃圾回收的效率
- 在Java程序运行的过程中，会产生大量的对象，其中有些对象是与业务信息相关，比如**Http请求中的 Session对象、线程、 Socket连接**，这类对象跟业务直接挂钩，因此生命周期比较长。但是还有一些对象，主要是程序运行过程中生成的临时变量，这些对象生命周期会比较短，比如： string,对象，由于其不变类的特性，系统会产生大量的这些对象，有些对象甚至只用一次即可回收。

​	目前几乎所有的GC都是采用分代收集( Generational Collecting)算法执行垃圾回收的。在 Hotspot中，基于分代的概念，GC所使用的内存回收算法必须结合年轻代和老年代各自的特点。
**年轻代( Young Gen)**
​		年轻代特点：区域相对老年代较小，对象生命周期短、存活率低，回收频繁。这种情况**复制算法的回收整理，速度是最快**的。复制算法的效率只和当前存活对象大小有关，因此很适用于年轻代的回收。而复制算法内存利用率不高的问题，通过 hotspot中的两个 survivor的设计得到缓解。
**老年代( Tensured Gen)**
​		老年代特点：区域较大，对象生命周期长、存活率高，回收不及年轻代频繁。这种情况存在大量存活率高的对象，复制算法明显变得不合适。一般是由**标记一清除或者是标记一清除与标记整理的混合实现**。Mark阶段的开销与**存活对象的数量**成正比。Sweep阶段的开销与**所管理区域的大小**成正相关。Compact阶段的开销与**存活对象的数据**成正比。

​		以 Hotspot中的CMS回收器为例，CMS是基于Mark- Sweep实现的，对于对象的回收效率很高。而对于碎片问题，CMS采用基于Mark- Compact算法的 Serial old 回收器作为补偿措施：当内存回收不佳（碎片导致的 Concurrent Mode Failure时），将采用 Seralold执行FullGC以达到对老年代内存的整理。分代的思想被现有的虚拟机广泛使用。几乎所有的垃圾回收器都区分新生代和老年代。

## 分区算法

​		一般来说，在相同条件下，堆空间越大，一次GC时所需要的时间就越长，有关GC产生的停顿也越长。为了更好地控制GC产生的停顿时间，将一块大的内存区域分割成多个小块，根据目标的停顿时间，每次合理地回收若干个小区间，而不是整个堆空间，从而减少ー次GC所产生的停顿。分代算法将按照对象的生命周期长短划分成两个部分，分区算法将整个堆空间划分成连续的不同小区间。每一个小区间都独立使用，独立回收。这种算法的好处是可以控制一次回收多少个小区间。

### 增量收集算法

缺点
使用这种方式，由于在垃圾回收过程中，间断性地还执行了应用程序代码，所以能减少系统的停顿时间。但是，因为线程切换和上下文转换的消耗，会使得垃圾回收的总体成本上升，造成系统吞吐量的下降。

<img src="http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211214191651601.png" alt="image-20211214191651601"  />

# 十六、_垃圾回收相关概念_

## 1.System.GC()的理解

- 在默认情况下，通过 System.GC)或者 Runtime. getruntime（）.GC（）的调用，**会显式触发Full GC**,同时对老年代和新生代进行回收，尝试释放被丢弃对象占用的内存。
- 然而 system.GC（）调用附带一个免责声明，**无法保证对垃圾收集器的调用。**
- JVM实现者可以通过 System.GC（）调用来决定JVM的GC行为。而一般情况下，垃圾回收应该是自动进行的，无须手动触发，否则就太过于麻烦了。在一些特殊情况下，如我们正在编写一个性能基准，我们可以在运行之间调用System.GC（）。

## 2.内存溢出与内存泄漏

### 内存溢出 (满了)

- 内存溢出相对于内存泄漏来说，尽管更容易被理解，但是同样的，内存溢出也是引发程序崩溃的罪魁祸首之一。
- 由于GC一直在发展，所有一般情況下，除非应用程序占用的内存增长速度非常快，造成垃圾回收已经跟不上内存消耗的速度，否则不太容易出现OOM的情况。
- 大多数情况下，GC会进行各种年龄段的垃圾回收，实在不行了就放大招，来一次独占式的Full GC操作，这时候会回收大量的内存，供应用程序继续使用。
- javadoc中对 OutOfMemoryError的解释是，**没有空闲内存，并且垃圾收集器也无法提供更多内存。**

・没有空闲内存的情况:说明java虚拟机的堆内存不够.原因有二：
**(1)Java虚拟机的堆内存设置不够**
		比如:可能存在内存泄漏问题:地很有可能就是堆的大小不合理,比如我们要处理比较可观的数据量,但是没有显式指定JVM堆大小或者指定数值偏小.我们可以通过参数-Xms、Xmx来调整.
**(2)代码中创建了大量大对象,并且长时间不能被垃圾收集器收集(存在被引用)**
		s对于老版本的 Oracle JDK,因为永久代的大小是有限的,并且JVM对永久代垃圾回收(如,常量池回收、卸载不再需要的类型)非常不积极,所以当我们不断添加新类型的时候,永久代出现 OutOfMemoryError也非常多见,尤其是在运行时存在大量动态类型生成的场合;类似 l tern字符串缓存占用太多空间,也会导致OOM问题.对应的异常信息,会标记出来和永久代相关:"java.lang.OutOfMemoryError: Permgen space".
		随着元数据区的引入,方法区内存已经不再那么窘迫,所以相应的OOM有所改观,出现OOM,异常信息则变成了:"java.lang. OutOfMemoryError: Metaspace".直接内存不足,也会导致OOM.

​		这里面隐含着一层意思是,在抛出 OutOfMemoryError之前,通常垃圾收集器会被触发,尽其所能去清理出空间。例如:在引用机制分析中,涉及到JVM会去尝试回收软引用指向的对象等。在java.nio.BTts. reservememory()方法中,我们能清楚的看到, System.GC()会被调用,以清理空间.
​		当然,也不是在任何情况下垃圾收集器都会被触发的。比如,我们去分配一个超大对象,类似一个超大数组超过堆的最大值,JVM可以判断出垃圾收集并不能解决这个问题,所以直接抛出 OutOfMemoryError.

### 内存泄漏（不能回收）

​		也称作“存储渗漏”。严格来说，只有对象不会再被程序用到了，但是GC又不能回收他们的情况，才叫内存泄漏。但实际情况很多时候一些不太好的实践（或疏忽）会导致对象的生命周期变得很长甚至导致OOM,也可以叫做宽泛意义上的“内存泄漏”。
​		尽管内存泄漏并不会立刻引起程序崩溃，但是一旦发生内存泄漏，程序中的可用内存就会被逐步蚕食，直至耗尽所有内存，最终出现 OutOfMemory异常，导致程序崩溃。注意，这里的存储空间并不是指物理内存，而是指虚拟内存大小，这个虚拟内存大小取决于磁盘交换区设定的大小。

**举例**
1、单例模式
单例的生命周期和应用程序是一样长的，所以单例程序中，如果持有对外部对象的引用的话，那么这个外部对象是不能被回收的，则会导致内存泄漏的产生。
2、一些提供close的资源未关闭导致内存泄漏
数据库连接( datasource. getconnection（）),网络连接( socket)和io连接必须手动close,否则是不能被回收的。

## 3.Stop The World

- Stop-the-World,简称 STW,指的是GC事件发生过程中，会产生应用程序的停顿。停顿产生时整个应用程序线程都会被暂停，没有任何响应，有点像卡死的感觉，这个停顿称为STW.

- 可达性分析算法中枚举根节点( GC Roots)会导致所有Java执行线程停顿。分析工作必须在一个能确保一致性的快照中进行。一致性指整个分析期间整个执行系统看起来像被冻结在某个时间点上如果出现分析过程中对象引用关系还在不断变化，则分析结果的准确性无法保证。
- 被STW中断的应用程序线程会在完成GC之后恢复，频繁中断会让用户感觉像是网速不快造成电影卡带一样，所以我们需要减少STW的发生
- STW事件和采用哪款GC无关，所有的GC都有这个事件。哪怕是G1也不能完全避免Stop-the-world情况发生，只能说垃圾回收器越来越优秀，回收效率越来越高，尽可能地缩短了暂停时间。
- STW是JVM在后台自动发起和自动完成的。在用户不可见的情况下，把用户正常的工作线程全部停掉。
- 开发中不要用 system.GC() 会导致Stop-the- world的发生。

## 4.垃圾回收的并发与并行

并发和并行，在谈论垃圾收集器的上下文语境中，它们可以解释如下：
**并行( Parallel):**指多条垃圾收集线程并行工作，但此时用户线程仍处于等待状态。如 Pardew、 Parallel Scavenge、 Parallel Old
**串行( Serial):**相较于并行的概念，单线程执行。如果内存不够，则程序暂停，启动JVM垃圾回收器进行垃圾回收。回收完，再启动程序的线程。
**并发和并行,在谈论垃圾收集器的上下文语境中,它们可以解释如下:**
并发( Concurrent):指用户线程与垃圾收集线程同时执行(但不一定是并行的,可能会交替执行),垃圾回收线程在执行时不会停顿用户程序的运行。用户程序在继续运行,而垃圾收集程序线程运行于另ー个CPU上，如:CMS、G1。

## 5.安全点与安全区域

#### 安全点

- 程序执行时并非在所有地方都能停顿下来开始GC,只有在特定的位置才能停顿下来开始GC,这些位置称为“安全点( Safepoint)”。
- Safe Pointl的选择很重要，如果太少可能导致GC等待的时间太长，如果太频繁可能导致运行时的性能问题。大部分指令的执行时间都非常短暂通常会根据“是否具有让程序长时间执行的特征”为标准。比如：选择些执行时间较长的指令作为 Safe Point,如**方法调用、循环跳转和异常跳转**等。
- 如何在GC发生时，检査所有线程都跑到最近的安全点停顿下来呢？
- 抢先式中断：（目前没有虚拟机采用了)
  首先中断所有线程。如果还有线程不在安全点，就恢复线程，让线程跑到安全点。
- 主动式中断
  设置一个中断标志，各个线程运行到 Safe Point的时候主动轮询这个标志，如果中断标志为真，则将自己进行中断挂起。

#### 安全区域

- Safepoint机制保证了程序执行时，在不太长的时间内就会遇到可进入GC的 Safepoint。但是，程序“不执行”的时候呢？例如线程处于Sleep状态或Blocked状态，这时候线程无法响应JVM的中断请求，“走”到安全点去中断挂起，JVM也不太可能等待线程被唤醒。对于这种情况，就需要安全区域( Safe Region)来解决。
- 安全区域是指在一段代码片段中，对象的引用关系不会发生变化，在这个区域中的任何位置开始GC都是安全的。我们也可以把 Safe Region看做是被扩展了的 Safepoint。

实际执行时：
1、当线程运行到 Safe Region的代码时，首先标识已经进入了 Safe Region,如果这段时间内发生GC,JVM会忽略标识为 Safe Region状态的线程
2、当线程即将离开 Safe Region时，会检査JVM是否已经完成GC,如果完成了，则继续运行，否则线程必须等待直到收到可以安全离开 Safe Regiong的信号为止；

## 6.引用

​		我们希望能描述这样一类对象：当内存空间还足够时，则能保留在内存中；如果内存空间在进行垃圾收集后还是很紧张，则可以抛弃这些对象。
【既偏门又非常高频的面试题】强引用、软引用、弱引用、虚引用有什么区别？具体使用场景是什么？
​		在JDK1.2版之后，Java对引用的概念进行了扩充，将引用分为强引用（ Strong Reference)、软引用( Soft Reference)、弱引用( Weak Reference)和虚引用(Phantom Reference)4种，**这4种引用强度依次逐渐减弱。**
​		除强引用外，其他3种引用均可以在java.lang. ref包中找到它们的身影。如下图，显示了这3种引用类型对应的类，开发人员可以在应用程序中直接使用它们。

![image-20211215135730045](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211215135730045.png)

Reference子类中只有终结器引用是包内可见的，其他3种引用类型均为public可以在应用程序中直接使用

- 强引用( StrongReference):**【引用在就别管我】**最传统的“引用”的定义，是指在程序代码之中普遍存在的引用赋值，即类似“ Object obj= new Object（）”这种引用关系。无论任何情况下，**只要强引用关系还存在，垃圾收集器就永远不会回收掉被引用的对象。**
- 软引用( SoftReference):**【快满了回收我】**在系统将要发生内存溢出之前，将会把这些对象列入回收范围之中进行第二次回收。如果这次回收后还没有足够的内存，才会抛出内存溢出异常。
- 弱引用( WeakReference):**【看到就回收我】**被弱引用关联的对象只能生存到下一次垃圾收集之前。当垃圾收集器工作时，无论内存空间是否足够,都会回收掉被弱引用关联的对象.
- 虚引用( PhantomReference):**【不影响你】**一个对象是否有虚引用的存在,完全不会对其生存时间构成影响,也无法通过虚引用来获得一个对象的实例.为一个对象设置虚引用关联的唯一目的就是能在这个对象被收集器回收时收到一个系统通知

### 强引用

- 在Java程序中，最常见的引用类型是强引用(普通系统99%以上都是强引用)，也就是我们最常见的普通对象引用，也是默认的引用类型。
- 当在JAVA语言中使用new操作符创建一个新的对象，并将其赋值给一个变量的时候，这个变量就成为指向该对象的一个强引用。
- 强引用的对象是可触及的，垃圾收集器就永远不会回收掉被引用的对象
- 对于一个普通的对象，如果没有其他的引用关系，只要超过了引用的作用域或者显式地将相应（强）引用赋值为null,就是可以当做垃圾被收集了，当然具体回收时机还是要看垃圾收集策略。
- 相对的，软引用、弱引用和虚引用的对象是软可触及、弱可触及和虚可触及的，在一定条件下，都是可以被回收的。所以，强引用是造成Java内存泄漏的主要原因之

### 软引用

- 软引用是用来描述一些还有用，但非必需的对象。只被软引用关联着的对象，在系统将要发生内存溢出异常前，会把这些对象列进回收范围之中进行第二次回收，如果这次回收还没有足够的内存，オ会抛出内存溢出异常。
- 软引用通常用来实现内存敏感的缓存。比如：高速缓存就有用到软引用。如果还有空闲内存，就可以暂时保留缓存，当内存不足时清理掉，这样就保证了使用缓存的同时，不会耗尽内存。
- 垃圾回收器在某个时刻决定回收软可达的对象的时候，会清理软引用，并可选地把引用存放到一个引用队列( Reference Queue)。
- 类似弱引用，只不过Java虚拟机会尽量让软引用的存活时间长一些，迫不得已才清理。

### 弱引用

- 弱引用也是用来描述那些非必需对象，被弱引用关联的对象只能生存到下一次垃圾收集发生为止。在系统GC时，只要发现弱引用，不管系统堆空间使用是否充足，都会回收掉只被弱引用关联的对象
- 但是，由于垃圾回收器的线程通常优先级很低，因此，并不一定能很快地发现持有弱引用的对象。在这种情况下，弱引用对象可以存在较长的时间。
- 弱引用和软引用一样，在构造弱引用时，也可以指定一个引用队列，当弱引用对象被回收时，就会加入指定的引用队列，通过这个队列可以跟踪对象的回收情况。
- 软引用、弱引用都非常适合来保存那些可有可无的缓存数据。如果这么做，当系统内存不足时，这些缓存数据会被回收，不会导致内存溢出。而当内存资源充足时，这些缓存数据又可以存在相当长的时间，从而起到加速系统的作用。
- 弱引用对象与软引用对象的最大不同就在于，当GC在进行回收时，需要通过算法检查是否回收软引用对象，而对于弱引用对象，GC总是进行回收。弱引用对象更容易、更快被GC回收。面试题：你开发中使用过 WeakHashMap吗？

### 虚引用

​		也称为“幽灵引用”或者“幻影引用”，是所有引用类型中最弱的一个。一个对象是否有虚引用的存在，完全不会决定对象的生命周期。如果一个对象仅持有虚引用，那么它和没有引用几乎是一样的，随时都可能被垃圾回收器回收。它不能单独使用，也无法通过虚引用来获取被引用的对象。当试图通过虚引用的get（）方法取得对象时，总是null。为一个对象设置虚引用关联的唯一目的在于跟踪垃圾回收过程。比如：能在这个对象被收集器回收时收到一个系统通知。

​		虚引用必须和引用队列一起使用。虚引用在创建时必须提供一个引用队列作为参数。当垃圾回收器准备回收一个对象时，如果发现它还有虚引用，就会在回收对象后，将这个虚引用加入引用队列，以通知应用程序对象的回收情况。由于虚引用可以跟踪对象的回收时间，因此，也可以将一些资源释放操作放置在虚引用中执行和记录。在JDK1.2版之后提供了 PhantomReference类来实现虚引用。

### 终结器引用

​		它用以实现对象的finalize()方法，也可以称为终结器引用。无需手动编码，其内部配合引用队列使用。在GC时，终结器引用入队。由Finalizer线程通过终结器引用找到被引用对象并调用它的finalize()方法，第二次GC时才能回收被引用对象。

# 十七、垃圾回收器

## 1.GC分类

​		垃圾收集器没有在规范中进行过多的规定，可以由不同的厂商、不同版本的JVM来实现。由于JDK的版本处于高速送代过程中，因此Java发展至今已经衍生了众多的GC版本。从不同角度分析垃圾收集器，可以将GC分为不同的类型。

​		**按线程数分**，可以分为串行垃圾回收器和并行垃圾回收器。

​		串行回收指的是在同一时间段内只允许有一个CPU用于执行垃圾回收操作，此时工作线程被暂停，直至垃圾收集工作结束。在诸如单CPU处理器或者较小的应用内存等硬件平台不是特别优越的场合，串行回收器的性能表现可以超过并行回收器和并发回收器。所以，串行回收默认被应用在客户端的Client模式下的JVM中在并发能力比较强的CPU上，并行回收器产生的停顿时间要短于串行回收器。
​		和串行回收相反，并行收集可以运用多个CPU同时执行垃圾回收，因此提升了应用的吞吐量，不过并行回收仍然与串行回收一样，采用独占式，使用了“Stop-the- world”机制。

​		**按照工作模式分，**可以分为并发式垃圾回收器和独占式垃圾回收器。

​		并发式垃圾回收器与应用程序线程交替工作，以尽可能减少应用程序的停顿时间。独占式垃圾回收器( Stop the world)一旦运行，就停止应用程序中的所有用户线程，直到垃圾回收过程完全结束

​		**按碎片处理方式分**，可分为压缩式垃圾回收器和非压缩式垃圾回收器
​		压缩式垃圾回收器会在回收完成后，对存活对象进行压缩整理，消除回收后的碎片。非压缩式的垃圾回收器不进行这步操作。
​		**按工作的内存区间分**，又可分为年轻代垃圾回收器和老年代垃圾回收器。

## 2.GC性能评估指标

吞吐量：运行用户代码的时间占总运行时间的比例(总运行时间：程序的运行时间十内存回收的时间)
垃圾收集开销：吞吐量的补数，垃圾收集所用时间与总运行时间的比例
暂停时间：执行垃圾收集时，程序的工作线程被暂停的时间
收集频率：相对于应用程序的执行，收集操作发生的频率。
内存占用：JAVA堆区所占的内存大小。
快速：一个对象从诞生到被回收所经历的时间。

​		这三者共同构成一个“不可能三角”。三者总体的表现会随着技术进步而越来越好。一款优秀的收集器通常最多同时满足其中的两项。
​		这三项里，暂停时间的重要性日益凸显。因为随着硬件发展，内存占用多些越来越能容忍，硬件性能的提升也有助于降低收集器运行时对应用程序的影响，即提高了吞吐量。而内存的扩大，对延退反而带来负面效果。**简单来说，主要抓住两点：吞吐量、暂停时间。**



## 3.吞吐量与暂停时间

​		吞吐量就是CPU用于运行用户代码的时间与CPU总消耗时间的比值，即**吞吐量=运行用户代码时间/(运行用户代码时间+垃圾收集时间)**。比如：虚拟机总共运行了180分钟，其中垃圾收集花掉1分钟，那吞吐量就是99%。
这种情况下，应用程序能容忍较高的暂停时间，因此，高吞吐量的应用程序有更长的时间基准，快速响应是不必考虑的吞吐量优先，意味着在单位时间内，STW的时间最短。

​		**“暂停时间”是指一个时间段内应用程序线程暂停**，让GC线程执行的状态。例如，GC期间100毫秒的暂停时间意味着在这100毫秒期间内没有应用程序线程是活动的。暂停时间优先，意味着尽可能让单次STW的时间最短。

​		高吞吐量较好因为这会让应用程序的最终用户感觉只有应用程序线程在做“生产性”工作。直觉上，吞吐量越高程序运行越快。
​		低暂停时间（低延迟）较好因为从最终用户的角度来看不管是GC还是其他原因导致一个应用被挂起始终是不好的。这取决于应用程序的类型，有时候甚至短暂的260毫秒暂停都可能打断终端用户体验。因此，具有低的较大暂停时间是非常重要的，特别是对于一个交互式应用程序。
​		不幸的是”高吞吐量”和”低暂停时间”是一对相互竞争的目标（矛盾）因为如果选择以吞吐量优先，那么必然需要降低内存回收的执行频率，但是这样会导致GC需要更长的暂停时间来执行内存回收。相反的，如果选择以低延迟优先为原则，那么为了降低每次执行内存回收时的暂停时间，也只能频繁地执行内存回收，但这又引起了年轻代内存的缩减和导致程序吞吐量的下降。

​		在设计（或使用）GC算法时，我们必须确定我们的目标：一个GC算法只可能针对两个目标之一（即只专注于较大吞吐量或最小暂停时间），或尝试找到一个二者的折衷。现在标准：在最大吞吐量优先的情况下，降低停顿时间。

## 4，垃圾回收器发展史

有了虚拟机，就一定需要收集垃圾的机制，这就是 Garbage Collection,对应的产品我们称为 Garbage Collector.
・1999年随JDK1.3.1一起来的是串行方式的 Serial GC,它是第一款GC. Pardew垃圾收集器是 Seria收集器的多线程版本
・2002年2月26日，Paralle GC和 Concurrent Mark Sweep GC跟随JDK1.4.2起发布Parallel GC在JDK6之后成为 Hotspot默认GC.2012年，在JDK1.7u4版本中，G1可用。
・2017年，JDK9中G1变成默认的垃圾收集器，以替代CMS.
・2018年3月，JDK10中G1垃圾回收器的并行完整垃圾回收，实现并行性来改善最坏情况下的延迟。
・2018年9月，JDK11发布。引入Bpsi1on垃圾回收器，又被称为"No-Op（无操作）回收器。同时，引入zGC:可伸缩的低延迟垃圾回收器( Experimental).
・2019年3月，JDK12发布。增强G1,自动返回未用堆内存给操作系统。同时，引入Sh. enandoah GC:低停顿时间的GC( Experimenta1).
・2019年9月，JDK13发布。增强ZGC,自动返回未用堆内存给操作系统
・2020年3月，JDK14发布。删除CMS垃圾回收器。扩展zGC在 macos,和 Windows上的应用

> 串行回收器： Serial、 Serial Old
> 并行回收器： Pa rnew、Parallel Scavenge、 Parallel Old
> 并发回收器：CMS、G1

### 垃圾收集器的组合关系

新生代收集器： Serial、 Pardew、Parallel Scavenge
老年代收集器： Serial 0ld、Parallel 0ld、CMS
整堆收集器：G1

![第17章_经典的7种GC](http://rcy276gfy.hd-bkt.clouddn.com/work/%E7%AC%AC17%E7%AB%A0_%E7%BB%8F%E5%85%B8%E7%9A%847%E7%A7%8DGC.jpg)

JDK 8—>JDK 9 实线----》红虚线

—>JDK 14 实线----》绿虚线 并废弃CMS 默认G1

​		为什么要有很多收集器，一个不够吗？因为Java的使用场景很多，移动端，服务器等。所以就需要针对不同的场景，提供不同的垃圾收集器，提高垃圾收集的性能。
​		虽然我们会对各个收集器进行比较，但并非为了挑选一个最好的收集器出来。没有一种放之四海皆准、任何场景下都适用的完美收集器存在更加没有万能的收集器。所以我们选择的只是对具体应用最合适的收集器。

![第17章_垃圾收集器组合](http://rcy276gfy.hd-bkt.clouddn.com/work/%E7%AC%AC17%E7%AB%A0_%E5%9E%83%E5%9C%BE%E6%94%B6%E9%9B%86%E5%99%A8%E7%BB%84%E5%90%88.jpg)

## 5.查看默认垃圾回收器

**-XX:  PrintCommandLineFlags:**查看命令行相关参数（包含使用的垃圾收集器）
使用命令行指令：jinfo -flag 相关垃圾回收器参数 进程ID

![image-20211216134714020](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211216134714020.png)

## Serial 串行回收

- Serial 收集器是最基本、历史最悠久的垃圾收集器了。JDK1.3之前回收新生代唯一的选择。
- Serial 收集器作为 Hotspot中Client模式下的默认新生代垃圾收集器。
- Serial收集器采用**复制算法**、串行回收和"Stop-the-World"机制的方式执行内存回收。
- 除了年轻代之外， Serial 收集器还提供用于执行老年代垃圾收集的 Serial Old收集器。 Serial Old收集器同样也采用了串行回收和" Stop the World"机制，只不过内存回收算法使用的是**标记一压缩算法**。
- Serial Old是运行在Client 模式下默认的老年代的垃圾回收器。
  - Serial Old在 Server,模式下主要有两个用途：①与新生代的Parallel Scavenge配合使用。②作为老年代CMS收集器的后备垃圾收集方案。

- **优势**：简单而高效（与其他收集器的单线程比），对于限定单个CPU的环境来说， Serial 收集器由于没有线程交互的开销，专心做垃圾收集自然可以获得最高的单线程收集效率。运行在Client 模式下的虚拟机是个不错的选择。
- 在用户的桌面应用场景中，可用内存一般不大(几十MB至一两百MB),可以在较短时间内完成垃圾收集(几十ms至一百多ms),只要不频繁发生使用串行回收器是可以接受的。
- 在 Hotspot虚拟机中，使用 -XX:  UseSerialGC参数可以指定年轻代和老年代都使用串行收集器。**等价于新生代用 Seral GC,且老年代用 Serial Old GC**

总结：这种垃圾收集器大家了解，现在已经不用串行的了。而且在限定单核cpuオ可以用。现在都不是单核的了。对于交互较强的应用而言，这种垃圾收集器是不能接受的。一般在Java Web应用程序中是不会采用串行垃圾收集器的。

## ParNew 并行回收

​		如果说 Serial GC是年轻代中的单线程垃圾收集器，那么 ParNewl收集器则是 **Seral 收集器的多线程版本**。Par是 Parallel 的缩写，New:只能处理的是新生代。ParNew收集器除了采用并行回收的方式执行内存回收外，两款垃圾收集器之间几乎没有任何区别。 ParNew收集器在年轻代中同样也是采用**复制算法**、"Stop-the-world"机制。ParNew是很多JVM运行在 **Server模式下新生代的默认垃圾收集器**。

对于新生代，回收次数频繁，使用并行方式高效。
对于老年代，回收次数少，使用串行方式节省资源。（CPU并行需要切换线程，串行可以省去切换线程的资源）

![image-20211216185521163](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211216185521163.png)

![image-20211216185631103](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211216185631103.png)

- 由于 Pardew收集器是基于并行回收，那么是否可以断定 Parnewl收集器的回收效率在任何场景下都会比 Seral 收集器更高效？
  - Parnew收集器运行在多CPU的环境下，由于可以充分利用多CPU、多核心等物理硬件资源优势，可以更快速地完成垃圾收集，提升程序的吞吐量。
  - 但是在单个CPU的环境下， Parnewl收集器不比 Seral 收集器更高效。虽然 Serlal收集器是基于串行回收，但是由于CPU不需要频繁地做任务切换，因此可以有效避免多线程交互过程中产生的一些额外开销。
- 因为除 Seral外，目前只有 PardNew GC能与CMS收集器配合工作。
- 在程序中，开发人员可以通过选项”-XX:  UseParNewGC"手动指定使用ParNewl收集器执行内存回收任务。它表示年轻代使用并行收集器，不影响老年代。
- -XX: ParallelGCThreads限制线程数量，默认开启和CPU数据相同的线程数。

## Parallel Scavenge 吞吐量优先

- HotSpot的年轻代中除了拥有 ParNew收集器是基于并行回收的以外，Parallel Scavenge收集器同样也采用了复制算法、并行回收和"Stop The World"机制。
- 那么 Parallel 收集器的出现是否多此一举？
  - 和 Pardew收集器不同， Parallel Scavenge收集器的目标则是达到个可控制的吞吐量( Throughput),它也被称为吞吐量优先的垃圾收集器。
    - 自适应调节策略也是 Parallel Scavenge与 ParNew一个重要区别。

高吞吐量则可以高效率地利用CPU时间，尽快完成程序的运算任务，主要适合在后台运算而不需要太多交互的任务。因此，常见在服务器环境中使用。例如，那些执行批量处理、订单处理、工资支付、科学计算的应用程序。
Parallel 收集器在JDK1.6时提供了用于执行老年代垃圾收集的
Parallel Old 收集器，用来代替老年代的 Seral Old收集器。
Parallel Old 收集器采用了**标记-压缩**算法，但同样也是基于并行回收和"Stop-the- World"机制。

​		吞吐量就是CPU用于运行用户代码的时间与CPU总消耗时间的比值，即吞吐量=运行用户代码时间/(运行用户代码时间 垃圾收集时间)。比如：虚拟机总共运行了160分钟，其中垃圾收集花掉1分钟，那吞吐量就是99%。
​		这种情况下，应用程序能容忍较高的暂停时间，因此，高吞吐量的应用程序有更长的时间基准，快速响应是不必考虑的。吞吐量优先，意味着在单位时间内，ST的时间最短。在程序吞吐量优先的应用场景中，Parallel 收集器和 Parallel Old收集器的组合，在 Server模式下的内存回收性能很不错。在Java8中，默认是此垃圾收集器。

**参数设置:**
-XX:  +UseParallelGC手动指定年轻代使用Para1le1并行收集器执行内存回收任务
-XX:  +UseParallelOldGC手动指定老年代都是使用并行回收收集器。分别适用于新生代和老年代。默认jdk8是开启的。上面两个参数，默认开启一个，另一个也会被开启。（互相激活）
-XX: +ParallelGCThreads设置年轻代并行收集器的线程数。一般地，最好与CPU数量相等，以避免过多的线程数影响垃圾收集性能。在默认情况下，当CPU数量小于8个，ParallelGCThreads的值等于CPU数量。当CPU数量大于8个，ParallelGCThreads的值等于**3+[5*CPU_Count] / 8]**。

-XX: MaxGCPauseMillis 设置垃圾收集器最大停顿时间(即STW的时间)。单位是毫秒。
		为了尽可能地把停顿时间控制在 MaxGCPauseMillis 以内，收集器在工作时会调整Java堆大小或者其他一些参数。对于用户来讲，停顿时间越短体验越好。但是在服务器端，我们注重高并发，整体的吞吐量。所以服务器端适合 Paralle1,进行控制。该参数使用需谨慎。
-XX: GCTimeRatio 垃圾收集时间占总时间的比例 (=1/(N+1))用于衡量吞吐量的大小。
		取值范围(0,100)。默认值99,也就是垃圾回收时间不超过1%。与前一个 -XX: MaxGCPauseMillis参数有一定矛盾性。暂停时间越长， Radio参数就容易超过设定的比例。

-XX:  UseAdaptiveSizePoltcy 设置 Parallel Scavenge收集器具有自适应调节策略
		在这种模式下，年轻代的大小、Eden和 Survivor的比例、晋升老年代的对象年龄等参数会被自动调整，已达到在堆大小、吞吐量和停顿时间之间的平衡点。在手动调优比较困难的场合，可以直接使用这种自适应的方式，仅指定虚拟机的最大堆、日标的吞吐量( GCTimeRatio )和停顿时间( MaxGCPauseMillis ),让虚拟机自己完成调优工作。

## CMS 低延迟

- 在JDK1.5时期， HotSpot推出了一款在强交互应用中几乎可认为有划时代意义的垃圾收集器：CMS( Concurrent - Mark - Sweep)收集器，这款收集器是 HotSpot虚拟机中**第一款真正意义上的并发收集器，它第一次实现了让垃圾收集线程与用户线程同时工作。**
- CMS收集器的关注点是尽可能缩短垃圾收集时用户线程的停顿时间。停顿时间越短（低延迟）就越适合与用户交互的程序，良好的响应速度能提升用户体验。目前很大一部分的Java应用集中在互联网站或者B/S系统的服务端上，这类应用尤其重视服务的响应速度，希望系统停顿时间最短，以给用户带来较好的体验。CMS收集器就非常符合这类应用的需求。
- CMS的垃圾收集算法采用**标记一清除**算法，并且也会"Stop-the-world
- 不幸的是，CMS作为老年代的收集器，却无法与JDK1.4.8中已经存在的新生代收集器Parallel Scavenge配合工作，所以在JDK1.5中使用CMS来收集老年代的时候，新生代只能选择 Pardew或者 Sera1收集器中的一个。在G1出现之前，CMS使用还是非常广泛的。一直到今天，仍然有很多系统使用 CMS GC。

**工作原理**

![image-20211217133947237](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20211217133947237.png)

- CMS整个过程比之前的收集器要复杂，整个过程分为4个主要阶段，即初始标记阶段、并发标记阶段、重新标记阶段和并发清除阶段。
- **初始标记( Initial-Mark)阶段：**在这个阶段中，程序中所有的工作线程都将会因为“Stop-the-World”机制而出现短暂的暂停，这个阶段的主要任务仅仅只是标记出GC Roots能直接关联到的对象。一旦标记完成之后就会恢复之前被暂停的所有应用线程。由于直接关联对象比较小，所以这里的速度非常快。
- **并发标记( Concurrent-Mark)阶段：**从 GC Roots的直接关联对象开始遍历整个对象图的过程，这个过程耗时较长但是不需要停顿用户线程，可以与垃圾收集线程一起并发运行。
- **重新标记( Remark)阶段：**由于在并发标记阶段中，程序的工作线程会和垃圾收集线程同时运行或者交叉运行，因此为了修正并发标记期间，因用户程序继续运作而导致标记产生变动的那一部分对象的标记记录，这个阶段的停顿时间通常会比初始标记阶段稍长一些，但也远比并发标记阶段的时间短。
- **并发清除( Concurrent- Sweep)阶段：**此阶段清理删除掉标记阶段判断的己经死亡的对象，释放内存空间。由于不需要移动存活对象，所以这个阶段也是可以与用户线程同时并发的。

**特点与弊端**

- 尽管CMS收集器采用的是并发回收（非独占式），但是在其初始化标记和再次标记这两个阶段中仍然需要执行“Stop-The-Wolrd”机制暂停程序中的工作线程，不过暂停时间并不会太长，因此可以说明目前所有的垃圾收集器都做不到完全不需要 “Stop-The-Wolrd”，只是尽可能地缩短暂停时间。

- 由于最耗费时间的并发标记与并发清除阶段都不需要暂停工作，所以整体的回收是低停顿的。

- 另外，由于在垃圾收集阶段用户线程没有中断，所以在CMS回收过程中，还应该确保应用程序用户线程有足够的内存可用。因此，CMS收集器不能像其他收集器那样等到老年代几乎完全被填满了再进行收集，而是当堆内存使用率达到某一阈值时，便开始进行回收，以确保应用程序在CMS工作过程中依然有足够的空间支持应用程序运行。要是CMS运行期间预留的内存无法满足程序需要，就会出现一次“ Concurrent Mode Failure”失败，这时虚拟机将启动后备预案：临时启用 Seral Old收集器来重新进行老年代的垃圾收集，这样停顿时间就很长了。

- CMS收集器的垃圾收集算法采用的是标记一清除算法，这意味着每次执行完内存回收后，由于被执行内存回收的无用对象所占用的内存空间极有可能是不连续的一些内存块，不可避免地将会产生一些内存碎片。那么CMS在为新对象分配内存空间时，将无法使用指针碰撞( Bump the Pointer)技术，而只能够选择空闲列表( Free List)执行内存分配。为什么不使用Mark Compact？因为当并发清除的时候，用 Compact 整理内存的话，原来的用户线程使用的内存还怎么用呢？要保证用户线程能继续执行，前提是它运行的资源不受影响。 Mark Compact更适合“ Stop the World”这种场景下使用。

- CMS的优点：

  并发收集、低延迟

- CMS的弊端：
  **1)会产生内存碎片，**导致并发清除后，用户线程可用的空间不足。在无法分配大对象的情况下，不得不提前触发Full GC。

  **2)CMS收集器对CPU资源非常敏感。**在并发阶段，它虽然不会导致用户停顿，但是会因为占用了一部分线程而导致应用程序变慢，总吞吐量会降低。
  **3)CMS收集器无法处理浮动垃圾。**可能出现“ Concurrent Mode Failure"失败而导致另一次Full GC的产生。在并发标记阶段由于程序的工作线程和垃圾收集线程是同时运行或者交叉运行的，那么在并发标记阶段如果产生新的垃圾对象，CMS将无法对这些垃圾对象进行标记，最终会导致这些新产生的垃圾对象没有被及时回收，从而只能在下一次执行GC时释放这些之前未被回收的内存空间。

**参数设置**

- **-XX:  UseConcMarkSweepGC **手动指定使用CMS收集器执行内存回收任务。开启该参数后会自动将 -XX:  UseParNEWGC打开。即： ParNew( Young区用) +CMS(Old区用)  Serial Old的组合。
- **-XX: CMSLnitiatingOccupanyFraction** 设置堆内存使用率的阈值，一旦达到该阈值，便开始进行回收。JDK5及以前版本的默认值为68,即当老年代的空间使用率达到68%时，会执行一次CMS回收。JDK6及以上版本默认值为92%。如果内存增长缓慢，则可以设置一个稍大的值，大的阈值可以有效降低CMS的触发频率，减少老年代回收的次数可以较为明显地改善应用程序性能。反之，如果应用程序内存使用率增长很快，则应该降低这个阈值，以避免频繁触发老年代串行收集器。因此通过该选项便可以有效降低Full GC的执行次数。
- **-XX:  UseCMSCompactAtFullCollection **用于指定在执行完Full GC后对内存空间进行压缩整理，以此避免内存碎片的产生。不过由于内存压缩整理过程无法并发执行，所带来的问题就是停顿时间变得更长了。
- **-XX: CMSFullGCsBeforeCompaction** 设置在执行多少次Full GC后对内存空间进行压缩整理。
- **-XX:  ParalellCMSThreads** 设置CMS的线程数量。CMS默认启动的线程数是(ParalellCMSThreads+3)/4。ParalellCMSThreads是年轻代并行收集器的线程数。当CPU资源比较紧张时，受到CMS收集器线程的影响，应用程序的性能在垃圾回收阶段可能会非常糟糕。

**总结**

小结：
HotSpot有这么多的垃圾回收器，那么如果有人问， Serial GC、ParalleGC、Concurrent Mark Sweep GC.这三个GC有什么不同呢？
请记住以下口令：
如果你想要最小化地使用内存和并行开销，请选 Serial GC;
如果你想要最大化应用程序的吞吐量，请选 Paralle GC;
如果你想要最小化GC的中断或停顿时间，请选 CMS GC。

JDK9新特性：CMS 被标记为 Deprecate(JEP291)。如果对JDK9及以上版本的 Hotspot,虚拟机使用参数 -XX:  UseConcMarkSweepGC 来开启CMS收集器的话，用户会收到一个警告信息，提示CMS未来将会被废弃。
DK14新特性：删除CMS垃圾回收器(JEP363)移除了CMS垃圾收集器，如果在JDK14中使用 -XX:  UseConcMarkSweepGC的话，JVM不会报错，只是给出一个warning信息，但是不会exit。JVM会自动回退以默认GC方式启动JVM。

## G1 区域分代化

为什么名字叫做 Garbage First(G1)呢？
		因为G1是一个**并行回收器**，它**把堆内存分割为很多不相关的区域( Region)（物理上不连续的）**。使用不同的 Region来表示Eden、幸存者0区，幸存者1区，老年代等。
		G1 GC有计划地避免在整个Java堆中进行全区域的垃圾收集。G1跟踪各个 Region里面的垃圾堆积的价值大小（回收所获得的空间大小以及回收所需时间的经验值），在后台维护一个优先列表，每次根据允许的收集时间，优先回收价值最大的 Region由于这种方式的侧重点在于回收垃圾最大量的区间( Region),所以我们给G1一个名字：垃圾优先(Garbage First)。

既然我们已经有了前面几个强大的GC,为什么还要发布 Garbage First(G1)GC?
		原因就在于应用程序所应对的业务越来越庞大、复杂，用户越来越多，没有GC就不能保证应用程序正常进行，而经常造成STW的GC又跟不上实际的需求，所以才会不断地尝试对GC进行优化。G1( Garbage- First)垃圾回收器是在Java7 update4之后引入的一个新的垃圾回收器，是当今收集器技术发展的最前沿成果之一。
		与此同时，为了适应现在不断扩大的内存和不断增加的处理器数量，进一步降低暂停时间( pause time),同时兼顾良好的吞吐量。官方给G1设定的目标是在延退可控的情况下获得尽可能高的吞吐量，所以才担当起“全功能收集器”的重任与期望。

​		G1( Garbage- First)是一款面向服务端应用的垃圾收集器，主要针对配备多核CPU及大容量内存的机器，以极高概率满足GC停顿时间的同时，还兼具高吞吐量的性能特征。
​		在JDK1.7版本正式启用，移除了 Experimental的标识，是JDK9以后的默认垃圾回收器，取代了CMS回收器以及Paralel Parallel Old组合。被 Oracle官方称为“全功能的垃圾收集器”。与此同时，CMS已经在JDK9中被标记为废弃( deprecated)。在jdk8中还不是默认的垃圾回收器，需要使用 -XX: UseG1GC来启用。

### 优势

与其他GC收集器相比，G1使用了全新的分区算法，其特点如下所示：

### **并行与并发**

并行性：G1在回收期间，可以有多个GC线程同时工作，有效利用多核计算能力。此时用户线程STW
并发性：G1拥有与应用程序交替执行的能力，部分工作可以和应用程序同时执行，因此，一般来说，不会在整个回收阶段发生完全阻塞应用程序的情况。

### **分代收集**

从分代上看，G1依然属于分代型垃圾回收器，它会区分年轻代和老年代，年轻代依然有Eden区和 Survivor区。但从堆的结构上看，它不要求整个Eden区、年轻代或者老年代都是连续的，也不再坚持固定大小和固定数量。将堆空间分为若干个区域( Region),这些区域中包含了逻辑上的年轻代和老年代。和之前的各类回收器不同，它同时兼顾年轻代和老年代。对比其他回收器，或者工作在年轻代，或者工作在老年代；

### **空间整合**

​		CMS:“标记-清除”算法、内存碎片、若干次GC后进行一次碎片整理。G1将内存划分为一个个的 region。内存的回收是以 regiont作为基本单位的。Region之间是复制算法，但整体上实际可看作是标记一压缩（Mark- Compact算法，两种算法都可以避免内存碎片。这种特性有利于程序长时间运行，分配大对象时不会因为无法找到连续内存空间而提前触发下一次GC。尤其是当Java堆非常大的时候，G1的优势更加明显。

### **可预测的停顿时间模型(即：软实时 soft real-time)**

​		这是G1相对于CMS的另一大优势，G1除了追求低停顿外，还能建立可预测的停顿时间模型，能让使用者明确指定在一个长度为M毫秒的时间片段内，消耗在垃圾收集上的时间不得超过N毫秒。由于分区的原因，G1可以只选取部分区域进行内存回收，这样缩小了回收的范围，因此对于全局停顿情况的发生也能得到较好的控制。

​		G1跟踪各个 Region 里面的垃圾堆积的价值大小（回收所获得的空间大小以及回收所需时间的经验值），在后台维护一个优先列表，每次根据允许的收集时间，优先回收价值最大的 Region。保证了G1收集器在有限的时间内可以获取尽可能高的收集效率。相比于 CMS GC,G1未必能做到CMS在最好情况下的延时停顿，但是最差情况要好很多。

​		相较于CMS,G1还不具备全方位、压倒性优势。比如在用户程序运行过程中，G1无论是为了垃圾收集产生的内存占用( Footprint)还是程序运行时的额外执行负载( overload)都要比CMS要高。从经验上来说，在小内存应用上CMS的表现大概率会优于G1,而G1在大内存应用上则发挥其优势。平衡点在6-8GB之间。

### **参数设置**

-XX:+UseG1GC手动指定使用G1收集器执行内存回收任务
-XX:G1HeapRegionSize设置每个 Regionl的大小。值是2的幂，范围是1MB到32MB之间，目标是根据最小的Java堆大小划分出约2048个区域。默认是堆内存的1/2000
-XX: MaxGCPauseMilllis设置期望达到的最大GC停顿时间指标（JVM会尽力实现，但不保证达到）,默认值是200ms。
-XX:ParallelGCThreads设置STW工作线程数的值。最多设置为8。
-XX:ConcGCThreads设置并发标记的线程数。将n设置为并行垃圾回收线程数(ParallelGCThreadS)的1/4左右。
-XX: InitiatingHeapOccupancyPercent设置触发并发GC周期的Java。堆占用率阈值。超过此值，就触发GC。默认值是45。

### **G1回收器常见步骤**

G1的设计原则就是简化JVM性能调优，开发人员只需要简单的三步即可完成调优
第一步：开启G1垃圾收集器
第二步：设置堆的最大内存
第三步：设置最大的停顿时间
G1中提供了三种垃圾回收模式： YoungGC、 Mixed GC和FullGC,在不同的条件下被触发。

### **使用场景**

面向服务端应用，针对具有大内存、多处理器的机器。（在普通大小的堆里表现并不惊喜）
最主要的应用是需要低GC延迟，并具有大堆的应用程序提供解决方案；如：在堆大小约6GB或更大时，可预测的暂停时间可以低于8.5秒；（G1通过每次只清理一部分而不是全部的 Region的增量式清理来保证每次G停顿时间不会过长）用来替换掉JDK1.5中的CMS收集器
在下面的情况时，使用G1可能比CMS好：
①超过50%的Java堆被活动数据占用；
②对象分配频率或年代提升频率变化很大；
③GC停顿时间过长(长于6.5至1秒)；
Hotspot垃圾收集器里，除了G1以外，其他的垃圾收集器使用内置的JVM线程执行。GC的多线程操作，而G1GC可以采用应用线程承担后台运行的GC工作，即当JVM的GC线程处理速度慢时，系统会调用**应用程序线程**帮助加速垃圾回收过程。

### Region

​		使用G1收集器时，它将整个Java堆划分成约2048个大小相同的独立 Region块，每个 Region块大小根据堆空间的实际大小而定，整体被控制在1MB到32MB之间，且为2的N次幂，即1MB,2MB,4MB,8MB,16MB,32MB。可以通过**-XX:G1HeapRegionSize**设定。所有的 Region大小相同，且在JVM生命周期内不会被改变。
​		虽然还保留有新生代和老年代的概念，但新生代和老年代不再是物理隔离的了，它们都是一部分 Region（不需要连续）的集合。通过 Region的动态分配方式实现逻辑上的连续。

![image-20211219174654066](http://rcy276gfy.hd-bkt.clouddn.com/image-20211219174654066.png)

​		一个 region有可能属于Eden, Survivor或者Old/ Tenured内存区域。但是 一个 region只可能属于一个角色。图中的E表示该 region属于Eden内存区域，S表示属于 Survivor内存区域，O表示属于Old内存区域。图中空白的表示未使用的内存空间。
​		G1垃圾收集器还增加了一种新的内存区域，叫做 Humongous内存区域，如图中的H块。主要用于存储大对象，如果超过1.5个 region,就放到H。

**设置H的原因：**对于堆中的大对象，默认直接会被分配到老年代，但是如果它是一个短期存在的大对象，就会对垃圾收集器造成负面影响。为了解决这个问题，G1划分了一个 Humongous区。它用来专门存放大对象。如果一个H区装不下ー个大对象，那么G1会寻找连续的H区来存储。为了能找到连续的H区，有时候不得不启动Full GC.G1的大多数行为都把H区作为老年代的一部分来看待。

### G1 回收过程

G1 GC的垃圾回收过程主要包括如下三个环节
年轻代GC( Young GC)
老年代并发标记过程( Concurrent Marking)
混合回收( Mixed GC)
(如果需要，单线程、独占式、高强度的FullGC还是继续存在的。它针对GC的评估失败提供了一种失败保护机制，即强力回收。）

![image-20211219175120643](http://rcy276gfy.hd-bkt.clouddn.com/image-20211219175120643.png)

​		应用程序分配内存，当年轻代的Eden区用尽时开始年轻代回收过程；G1的年轻代收集阶段是一个并行的独占式收集器。在年轻代回收期，G1GC暂停所有应用程序线程，启动多线程执行年轻代回收。然后从年轻代区间移动存活对象到 Survivor区间或者老年区间，也有可能是两个区间都会涉及。
当堆内存使用达到一定值(默认45%)时，开始老年代并发标记过程。标记完成马上开始混合回收过程。对于一个混合回收期，G1GC从老年区间移动存活对象到空闲区间，这些空闲区间也就成为了老年代的一部分。和年轻代不同，老年代的G1回收器和其他GC不同，G1的老年代回收器不需要整个老年代被回收，一次只需要扫描/回收小部分老年代的 Region就可以了。同时，这个老年代 Region是和年轻代一起被回收的。举个例子：一个Web服务器，Java进程最大堆内存为4G,每分钟响应1500个请求，每45秒钟会新分配大约2G的内存。G1会每45秒钟进行一次年轻代回收，每31个小时整个堆的使用率会达到45%,会开始老年代并发标记过程，标记完成后开始四到五次的混合回收。

#### Remembered Set

- 一个对象被不同区域引用的问题。一个 Region不可能是孤立的，一个 Region中的对象可能被其他任意 Region中对象引用，判断对象存活时，是否需要扫描整个Java堆才能保证准确。在其他的分代收集器，也存在这样的问题(而G1更突出)。回收新生代也不得不同时扫描老年代？这样的话会降低 Minor GC的效率。
- 解决方法：
- 无论G1还是其他分代收集器，JVM都是使用 Remembered Set来避免全局扫描：每个 Region都有一个对应的 Remembered Set;每次 Reference类型数据写操作时，都会产生一个 Write Barrier暂时中断操作；然后检查将要写入的引用指向的对象是否和该 Referencea类型数据在不同的 Region(其他收集器：检査老年代对象是否引用了新生代对象）；如果不同，通过 Cardtable把相关引用信息记录到引用指向对象的所在 Region对应的 Remembered Set中；当进行垃圾收集时，在GC根节点的枚举范围加入 Remembered Set:就可以保证不进行全局扫描，也不会有遗漏。

#### **回收过程一：年轻代GC**

<img src="http://rcy276gfy.hd-bkt.clouddn.com/image-20211219180806808.png" alt="image-20211219180806808" style="zoom:50%;" />

​		JVM启动时，G1先准备好Eden区，程序在运行过程中不断创建对象到Eden区，当Eden空间耗尽时，G1会启动一次年轻代垃圾回收过程。年轻代垃圾回收只会回收Eden区和 Survivor区。首先61停止应用程序的执行(Stop-The-World),G1创建回收集(Collection Set),回收集是指需要被回收的内存分段的集合，年轻代回收过程的回收集包含年轻代Eden区和 Survivor区所有的内存分段。

然后开始如下回收过程：
第一阶段，扫描根。
根是指 static变量指向的对象，正在执行的方法调用链条上的局部变量等。根引用连同RSet记录的外部引用作为扫描存活对象的入口
第二阶段，更新RSet.
处理 dirty card queue（见备注）中的card,更新RSet。此阶段完成后，RSet可以准确的反映老年代对所在的内存分段中对象的引用。
第三阶段，处理RSet.
识别被老年代对象指向的Eden中的对象，这些被指向的Eden中的对象被认为是存活的对象。
第四阶段，复制对象。
此阶段，对象树被遍历，Eden区内存段中存活的对象会被复制到 Survivor区中空的内存分段，Survivor区内存段中存活的对象如果年龄未达阈值，年龄会加1,达到阀值会被会被复制到0ld区中空的内存分段。如果 Survivor空间不够，Eden空间的部分数据会直接晋升到老年代空间。
第五阶段，处理引用。
处理Soft,Weak, Phantom,Fina1, JNI Weak等引用。最终Eden空间的数据为空，GC停止工作，而目标内存中的对象都是连续存储的，没有碎片，所以复制过程可以达到内存整理的效果，减少碎片。

#### 回收过程二：并发标记过程

- 初始标记阶段：标记从根节点直接可达的对象。这个阶段是STW的，并且会触发一次年轻代GC.
- 根区域扫描( Root Region Scanning):G1 GC扫描 Survivor区直接可达的老年代区域对象，并标记被引用的对象。这一过程必须在 young GC之前完成
- 并发标记( Concurrent Marking):在整个堆中进行并发标记（和应用程序并发执行），此过程可能被 young GC中断。在并发标记阶段，若发现区域对象中的所有对象都是垃圾，那这个区域会被立即回收。同时，并发标记过程中，会计算每个区域的对象活性（区域中存活对象的比例）。
- 再次标记( Remark):由于应用程序持续进行，需要修正上一次的标记结果。是STW的。G1中采用了比CMS更快的初始快照算法： snapshot-at-the- beginning(SATB)。
- 独占清理(cleanup,STW):计算各个区域的存活对象和GC回收比例，并进行排序，识别可以混合回收的区域。为下阶段做铺垫。是ST的。这个阶段并不会实际上去做垃圾的收集并发清理阶段：识别并清理完全空闲的区域。

#### 回收阶段三：混合回收

​		当越来越多的对象晋升到老年代。old region时，为了避免堆内存被耗尽，虚拟机会触发一个混合的垃圾收集器，即 Mixed GC,该算法并不是一个Old GC,除了回收整个 Young Region,还会回收一部分的Old Region。这里需要注意：是一部分老年代，而不是全部老年代。可以选择哪些Old Region进行收集，从而可以对垃圾回收的耗时时间进行控制。也要注意的是 Mixed GC并不是Full GC。

![image-20211219181644860](http://rcy276gfy.hd-bkt.clouddn.com/image-20211219181644860.png)

- 并发标记结束以后，老年代中百分百为垃圾的内存分段被回收了，部分为垃圾的内存分段被计算了出来。默认情况下，这些老年代的内存分段会分8次(可以通过XX:G1 MixedGCCountTarget设置)被回收。

- 混合回收的回收集(Collection Set)包括八分之一的老年代内存分段，Eden区内存分段， Survivor区内存分段。混合回收的算法和年轻代回收的算法完全一样，只是回收集多了老年代的内存分段。具体过程请参考上面的年轻代回收过程。

- 由于老年代中的内存分段默认分8次回收，G1会优先回收垃圾多的内存分段。垃圾占内存分段比例越高的，越会被先回收。并且有一个阈值会决定内存分段是否被回收，-XX:G1 MixedGCliveThresholPercent,默认为65%,意思是垃圾占内存分段比例要达到65%才会被回收。如果垃圾占比太低，意味着存活的对象占比高，在复制的时候会花费更多的时间。

- 混合回收并不一定要进行8次。有一个阈值-XX:G1HeapWastePercent,默认值为10%,意思是允许整个堆内存中有10%的空间被浪费，意味着如果发现可以回收的垃圾占堆内存的比例低于10%,则不再进行混合回收。因为GC会花费很多的时间但是回收到的内存却很少。

  

  **总结**

  G1的初衷就是要避免Full GC的出现。但是如果上述方式不能正常工作，G1会停止应用程序的执行(Stop-The-World),使用单线程的内存回收算法进行垃圾回收，性能会非常差，应用程序停顿时间会很长要避免Full GC的发生，一旦发生需要进行调整。什么时候会发生Full GC呢？比如堆内存太小，当G1在复制存活对象的时候没有空的内存分段可用则会回退到Full GC,这种情况可以通过増大内存解决。导致G1 Full GC的原因可能有两个：Evacuation的时候没有足够的to- space来存放晋升的对象。并发处理过程完成之前空间耗尽。

​		从 Oracle官方透露出来的信息可获知，回收阶段( Evacuation)其实本也有想过设计成与用户程序一起并发执行，但这件事情做起来比较复杂，考虑到G1只是回收一部分 Reglon,停顿时间是用户可控制的，所以并不迫切去实现，而选择把这个特性放到了G1之后出现的低延迟垃圾收集器(即ZGC)中。另外，还考虑到G1不是仅仅面向低延迟，停顿用户线程能够最大幅度提高垃圾收集效率，为了保证吞吐量所以才选择了完全暂停用户线程的实现方案。

**优化建议**

年轻代大小
避免使用-Xmn或-XX: NewRatio等相关选项显式设置年轻代大小。固定年轻代的大小会覆盖暂停时间目标暂停时间目标不要太过严苛

G1 GC的吞吐量目标是90%的应用程序时间和1%的垃圾回收时间评估G1GC的吞吐量时，暂停时间目标不要太严苛。目标太过严苛表
示你愿意承受更多的垃圾回收开销，而这些会直接影响到吞吐量。

## 垃圾回收器总结

![image-20211219210702749](http://rcy276gfy.hd-bkt.clouddn.com/image-20211219210702749.png)

Java垃圾收集器的配置对于]W써优化来说是一个很重要的选择，选择合适的垃圾收集器可以让V的性能有一个很大的提升。
怎么选择垃圾收集器？

- 优先调整堆的大小让JVM自适应完成
- 如果内存小于100M,使用串行收集器
- 如果是单核、单机程序，并且没有停顿时间的要求，串行收集器
- 如果是多CPU、需要高吞吐量、允许停顿时间超过1秒，选择并行或者JVM自己选择
- 如果是多CPU、追求低停顿时间，需快速响应（比如延迟不能超过1秒，如互联网应用），使用并发收集器
- 官方推荐G1,性能高。**现在互联网的项目，基本都是使用G1。**

最后需要明确一个观点
1.没有最好的收集器，更没有万能的收集；
2.调优永远是针对特定场景、特定需求，不存在一劳永逸的收集器

对于垃圾收集，面试官可以循序渐进从理论、实践各种角度深入，也未必是要求面试者什么都懂。但如果你懂得原理，一定会成为面试中的加分项。
这里较通用、基础性的部分如下
垃圾收集的算法有哪些？如何判断一个对象是否可以回收？
垃圾收集器工作的基本流程。
另外，大家需要多关注垃圾回收器这一章的各种常用的参数。

## GC日志分析

通过阅读GC日志，我们可以了解Java虚拟机内存分配与回收策略。
内存分配与垃圾回收的参数列表
-XX:+PriintGC 输出GC日志。类似：- verbose:GC
-XX:+ PrintGCDetails 输出GC的详细日志
-XX:+PrintGCTimeStamps输出GC的时间戳（以基准时间的形式）
-XX:+ PrintGCDateStamps输出GC的时间戳（以日期的形式，如2013-05-04T21:53:59.234+0800)
-XX:+PrintHeapAtGC 在进行GC的前后打印出堆的信息
-XlogGC:../logs/GC.log日志文件的输出路径

![image-20211219211435931](http://rcy276gfy.hd-bkt.clouddn.com/image-20211219211435931.png)

- "[GC"和"[Full GC"说明了这次垃圾收集的停顿类型,如果有"Full"则说明GC发生了Stop The World
- 使用 Serial收集器在新生代的名字是 Default New Generation,因此显示的是"[ ParNew
- 使用 ParNew收集器在新生代的名字会变成"[Pardew",意思是" Parallel New Generation"
- 使用Parallel Scavenge收集器在新生代的名字是"Psyounggen"
- 老年代的收集和新生代道理一样,名字也是收集器决定的
- 使用G1收集器的话,会显示为" garbage- first heap"

**Allocation Failure**
表明本次引起GC的原因是因为在年轻代中没有足够的空间能够存储新的数据了。
**[ PSZoungGen:5986K->696K(8704K)]5986K--704K(9216K)**
中括号内：GC回收前年轻代大小，回收后大小，（年轻代总大小）
括号外：GC回收前年轻代和老年代大小，回收后大小，（年轻代和老年代总大小）
**user**代表用户态回收耗时，sys内核态回收耗时，rea实际耗时。由于多核的原因，时间总和可能会超过real时间

![image-20211219212013261](http://rcy276gfy.hd-bkt.clouddn.com/image-20211219212013261.png)

![image-20211219212033708](http://rcy276gfy.hd-bkt.clouddn.com/image-20211219212033708.png)

## 日志分析工具

可以用一些工具去分析这些GC日志。常用的日志分析工具有： GCVlewer、 GCEsay、 GCHisto、 GCCLogViewer、Hpjmeter、 garbagecat等。

## 垃圾回收器的新时代发展

GC仍然处于飞速发展之中，目前的默认选项G1GC在不断的进行改进，很多我们原来认为的缺点，例如串行的FullGC、 Card Table扫描的低效等，都已经被大幅改进，例如，JDK10以后，FullGC已经是并行运行，在很多场景下，其表现还略优于 ParallelGC的并行FullGC实现。即使是 SerialGC,虽然比较古老，但是简单的设计和实现未必就是过时的，它本身的开销，不管是GC相关数据结构的开销，还是线程的开销，都是非常小的，所以随着云计算的兴起，在 Serverless:等新的应用场景下， SeralGC找到了新的舞台。比较不幸的是 CMS GC,因为其算法的理论缺陷等原因，虽然现在还有非常大的用户群体，但在3DK9中已经被标记为废弃，并在JDK14版本中移除。

Open JDK12的 Shenandoah GC:低停颠时间的cc（实验性）
Shenandoah,无疑是众多GC中最孤独的一个。是第一款不由 Oracle公司团队领导开发的 Hotspot垃圾收集器。不可避免的受到官方的排挤。比如号称openJDK和oracleJDK没有区别的oracle公司仍拒绝在oracleJDK12中支持 Shenandoah。Shenandoah垃圾回收器最初由 Redhat进行的一项垃圾收集器研究项目 Pauseless GC的实现，旨在针对]WM上的内存回收实现低停顿的需求。在2014年贡献给OPENJDK. Red Hat研发 Shenandoah团队对外宣称， Shenandoah垃圾回收器的暂停时间与堆大小无关，这意味着无论将堆设置为200MB还是200GB,99.9%的目标都可以把垃圾收集的停顿时间限制在十毫秒以内。不过实际使用性能将取决于实际工作堆的大小和工作负载。

总结：
Shenandoah GC的弱项：高运行负担下的吞吐量下降。
Shenandoah GC的强项：低延迟时间。
Shenandoah GC的工作过程大致分为九个阶段，这里就不再赘述。在之前
Java12新特性视频里有过介绍。

## ZGC

​		ZGC与 Shenandoah目标高度相似，在尽可能对吞吐量影响不大的前提下实现在任意堆内存大小下都可以把垃圾收集的停顿时间限制在十毫秒以内的低延迟。《深入理解Java虚拟机》一书中这样定义zGC:2GC收集器是一款基于Region内存布局的，（暂时）不设分代的，使用了读屏障、染色指针和内存多重映射等技术来实现可并发的标记一压缩算法的，以低延迟为首要目标的一款垃圾收集器2GC的工作过程可以分为4个阶段：并发标记一并发预备重分配一并发重分配并发重映射等。ZGC几乎在所有地方并发执行的，除了初始标记的是STW的。所以停顿时间几乎就耗费在初始标记上，这部分的实际时间是非常少的。

JBP364:ZGC应用在 macos上
JEP365:ZGC应用在 Windows上
JDK14之前，ZGC仅inuxオ支持。
・尽管许多使用ZGC的用户都使用类エinux的环境，但在 Windows和 macos上，人们也需要ZGC进行开发部署和测试。许多桌面应用也可以从ZGC中受益。因此，ZGC特性被移植到了 Windows和 macos上。
・现在mac或 Windows上也能使用ZGC了，示例如下：XX: +UnlockExperimentalVMOptions -XX: +UseZGC





# 复习【[processon作图，完善流程过程中再次熟悉](https://www.processon.com/diagraming/61c016576376892b1df8091e)】



完成：[JVM总图 - ProcessOn](https://www.processon.com/diagraming/61c016576376892b1df8091e)
