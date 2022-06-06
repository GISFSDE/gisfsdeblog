---
index: 2
icon: markdown
title: BUG
category:
  - BUG
tag:
  - BUG
---
### 一次相见，绝不再见

BUG分类解决记录，常见排查方法，常见避免方法总结。

<!--more-->

# MYSQL

Client does not support authentication protocol requested by server; 

```
mysql -hlocalhost -uroot -p
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
FLUSH PRIVILEGES;
```



Unknown initial character set index '255' received from server. Initial client character set can be forced via the 'characterEncoding' property.

```
String url后添加?useUnicode=true&characterEncoding=utf8   
mybatis url后添加?useUnicode=true&amp;characterEncoding=utf8
```



# cannot open git-upload-pack 

IDEA 设置

![image-20210823140101556](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20210823140101556.png)

# 请求有参数有特殊字符

post参数写body里面

tomcat connecter加relaxedPathChars="|{}[\]^"  relaxedQueryChars="|{}[\]^" 

```
package com.jeethink.framework.config;

import org.apache.catalina.connector.Connector;
import org.springframework.boot.web.embedded.tomcat.TomcatConnectorCustomizer;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.servlet.server.ConfigurableServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * 解决高版本Tomcat不支持在URL中传入特殊字符（比如|）的问题
 */
@Configuration
public class TomcatServerConfig {
    @Bean
    public ConfigurableServletWebServerFactory webServerFactory() {
        TomcatServletWebServerFactory factory = new TomcatServletWebServerFactory();
        factory.addConnectorCustomizers(new TomcatConnectorCustomizer() {
            @Override
            public void customize(Connector connector) {
                //允许特殊字符
                connector.setProperty("relaxedQueryChars", "|{}[]");
            }
        });
        return factory;
    }
}
```

# Maven

## ‘parent.relativePath’ of POM

```xml
<parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.2.6.RELEASE</version>
        <relativePath /><!-- 加上这个-->
    </parent>
```

# JAVA

不编译到target问题

```xml
<!--引入本地资源-->
        <resources>
            <!--加载lib文件，特殊情况下会有lib，但大部分都靠依赖下载了-->
            <resource>
                <directory>lib</directory>
                <targetPath>BOOT-INF/lib/</targetPath>
                <includes>
                    <include>**/*.jar</include>
                </includes>
            </resource>
            <!--打jar包-->
            <resource>
                <directory>src/main/java</directory>
                <includes>
                    <include>**/*.properties</include>
                    <include>**/*.xml</include>
                </includes>
            </resource>
            <!--将properties和xml文件编译-->
            <resource>
                <directory>src/main/resources</directory>
                <includes>
                    <include>**/*.properties</include>
                    <include>**/*.xml</include>
                </includes>
                <filtering>false</filtering>
            </resource>
        </resources>
```



[(1条消息) SpringBoot项目报错解决：“Error starting ApplicationContext. To display the conditions report re-run ...”_牛·云说的博客-CSDN博客](https://blog.csdn.net/m0_50762431/article/details/122143601)
