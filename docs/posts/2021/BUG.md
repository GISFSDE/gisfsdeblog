---
index: 1
icon: markdown
title: BUG
date: 2022-06-06
category:
  - BUG
tag:
  - BUG
---
> 一次相见，绝不再见
> BUG分类解决记录，常见排查方法，常见避免方法总结。

<!-- more -->

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

![image-20210823140101556](http://qnimg.gisfsde.com/work/image-20210823140101556.png)

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
\<parent>
        \<groupId>org.springframework.boot\</groupId>
        \<artifactId>spring-boot-starter-parent\</artifactId>
        \<version>2.2.6.RELEASE\</version>
        \<relativePath /><!-- 加上这个-->
    \</parent>
```

# JAVA

外部jar包不编译到target问题

```xml
<!--引入本地资源-->
        \<resources>
            <!--加载lib文件，特殊情况下会有lib，但大部分都靠依赖下载了-->
            \<resource>
                \<directory>lib\</directory>
                \<targetPath>BOOT-INF/lib/\</targetPath>
                \<includes>
                    \<include>**/*.jar\</include>
                \</includes>
            \</resource>
            <!--打jar包-->
            \<resource>
                \<directory>src/main/java\</directory>
                \<includes>
                    \<include>**/*.properties\</include>
                    \<include>**/*.xml\</include>
                \</includes>
            \</resource>
            <!--将properties和xml文件编译-->
            \<resource>
                \<directory>src/main/resources\</directory>
                \<includes>
                    \<include>**/*.properties\</include>
                    \<include>**/*.xml\</include>
                \</includes>
                \<filtering>false\</filtering>
            \</resource>
        \</resources>
```



[(1条消息) SpringBoot项目报错解决：“Error starting ApplicationContext. To display the conditions report re-run ...”_牛·云说的博客-CSDN博客](https://blog.csdn.net/m0_50762431/article/details/122143601)



## java.security.cert.CertificateException: No subject alternative names present

```java
public class HttpClientUtils {

    public static CloseableHttpClient acceptsUntrustedCertsHttpClient() throws KeyStoreException, NoSuchAlgorithmException, KeyManagementException {
        HttpClientBuilder b = HttpClientBuilder.create();

        // setup a Trust Strategy that allows all certificates.
        //
        SSLContext sslContext = new SSLContextBuilder().loadTrustMaterial(null, new TrustStrategy() {
            @Override
            public boolean isTrusted(X509Certificate[] arg0, String arg1) throws CertificateException {
                return true;
            }
        }).build();
        b.setSSLContext(sslContext);

        // don't check Hostnames, either.
        //      -- use SSLConnectionSocketFactory.getDefaultHostnameVerifier(), if you don't want to weaken
        HostnameVerifier hostnameVerifier = NoopHostnameVerifier.INSTANCE;

        // here's the special part:
        //      -- need to create an SSL Socket Factory, to use our weakened "trust strategy";
        //      -- and create a Registry, to register it.
        //
        SSLConnectionSocketFactory sslSocketFactory = new SSLConnectionSocketFactory(sslContext, hostnameVerifier);
        Registry socketFactoryRegistry = RegistryBuilder.create()
                .register("http", PlainConnectionSocketFactory.getSocketFactory())
                .register("https", sslSocketFactory)
                .build();

        // now, we create connection-manager using our Registry.
        //      -- allows multi-threaded use
        PoolingHttpClientConnectionManager connMgr = new PoolingHttpClientConnectionManager( socketFactoryRegistry);
        connMgr.setMaxTotal(200);
        connMgr.setDefaultMaxPerRoute(100);
        b.setConnectionManager( connMgr);

        // finally, build the HttpClient;
        //      -- done!
        CloseableHttpClient client = b.build();

        return client;
    }

}
```

```java
@Configuration
public class RestTemplateConfig {

    @Bean
    public RestTemplate httpsRestTemplate(HttpComponentsClientHttpRequestFactory httpsFactory){
        RestTemplate restTemplate = new RestTemplate(httpsFactory);
        restTemplate.setErrorHandler(new ResponseErrorHandler() {
            @Override
            public boolean hasError(ClientHttpResponse clientHttpResponse) {
                return false;
            }

            @Override
            public void handleError(ClientHttpResponse clientHttpResponse) {
                //默认处理非200的返回，会抛异常
            }
        });
        return restTemplate;
    }

    @Bean(name = "httpsFactory")
    public HttpComponentsClientHttpRequestFactory httpComponentsClientHttpRequestFactory() throws Exception{
        CloseableHttpClient httpClient = HttpClientUtils.acceptsUntrustedCertsHttpClient();
        HttpComponentsClientHttpRequestFactory httpsFactory = new HttpComponentsClientHttpRequestFactory(httpClient);
        httpsFactory.setReadTimeout(2000);
        httpsFactory.setConnectTimeout(2000);
        return httpsFactory;
    }
```

```java
@Qualifier("httpsRestTemplate")
@Autowired
RestTemplate restTemplate;
```

## Bad Request This combination of host and port requires TLS

配置https但访问地址为http

如果是postman，关闭证书校验

# 前端

# 常犯bug

列表不倒序

搜索与分页不关联

