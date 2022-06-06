---
index: 2
icon: markdown
title: SpringMVC
category:
  - SpringMVC
tag:
  - SpringMVC
---

> > SpringMVC
>
> <!-- more -->
>
> > # 新学四问
> >
> > **WHY【与前代优化了什么，弥补了什么空白】：**
> > **WHAT【框架，思维导图，主题框架】：**
> > **HOW【如何记忆，学习资源】**：
> > **LEVEL【不是每个都学精】：**
>
# 进度：【一天 】

# 综合问题

1. 运行流程？
2. 常用注解？
3. 如何解决中文乱码？
4. 重定向？转发？
4. springmvc的控制器是单例的吗?是线程安全的吗？

# 一、简介

# 二、流程

## DispatcherServlet调用链

![image-20220106183253208](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20220106183253208.png)

## 重要成员

```java
// 文件上传组件
/** MultipartResolver used by this servlet */
private MultipartResolver multipartResolver;

// 资源定位组件
/** LocaleResolver used by this servlet */
private LocaleResolver localeResolver;

// 主题解析组件
/** ThemeResolver used by this servlet */
private ThemeResolver themeResolver;

// 处理器映射器组件集合
/** List of HandlerMappings used by this servlet */
private List<HandlerMapping> handlerMappings;

// 处理器适配器组件集合
/** List of HandlerAdapters used by this servlet */
private List<HandlerAdapter> handlerAdapters;

// 异常处理解析器集合
/** List of HandlerExceptionResolvers used by this servlet */
private List<HandlerExceptionResolver> handlerExceptionResolvers;

// 视图名解析器
/** RequestToViewNameTranslator used by this servlet */
private RequestToViewNameTranslator viewNameTranslator;

// 重定向及FlashMap存储组件
/** FlashMapManager used by this servlet */
private FlashMapManager flashMapManager;

// 视图解析组件集合
/** List of ViewResolvers used by this servlet */
private List<ViewResolver> viewResolvers;
```



## 流程

![image-20220318134148875](http://rcy276gfy.hd-bkt.clouddn.com/work/image-20220318134148875.png)

![image-20220319133423318](http://rcy276gfy.hd-bkt.clouddn.com/image-20220319133423318.png)

DispatcherServlet ==> HandlerMapping ==> HandlerExecutionChain(Handler、HandlerInterceptor) ==> HandlerAdapter ==> Handler ==> ModelAndView ==>ViewResolver ==> View

第一步：发起请求到**前端控制器/中央控制器(DispatcherServlet)**

第二步：前端控制器请求**处理器映射器HandlerMapping**查找 Handler （可以根据xml配置、注解进行查找）

第三步：处理器映射器HandlerMapping向前端控制器返回Handler，HandlerMapping会把请求映射为**HandlerExecutionChain对象**（包含一个Handler处理器（页面控制器）对象，多个HandlerInterceptor拦截器对象），通过这种策略模式，很容易添加新的映射策略

第四步：前端控制器调用**处理器适配器HandlerAdapter**去执行Handler

第五步：处理器适配器HandlerAdapter将会根据适配的结果去执行Handler

第六步：Handler执行完成给适配器返回**ModelAndView**

第七步：处理器适配器HandlerAdapter向前端控制器返回ModelAndView （ModelAndView是springmvc框架的一个底层对象，包括 Model和view）

第八步：前端控制器请求**视图解析器ViewResolver**去进行视图解析 （根据逻辑视图名解析成真正的视图(jsp)），通过这种策略很容易更换其他视图技术，只需要更改视图解析器即可

第九步：视图解析器ViewResolver向前端控制器返回**View**

第十步：前端控制器进行视图**渲染** （视图渲染将模型数据(在ModelAndView对象中)填充到request域）

第十一步：前端控制器向用户响应结果

# 三、拦截器

```java
package com.jeethink.framework.interceptor;

import java.lang.reflect.Method;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import com.alibaba.fastjson.JSONObject;
import com.jeethink.common.utils.ServletUtils;
import com.jeethink.framework.interceptor.annotation.RepeatSubmit;
import com.jeethink.framework.web.domain.AjaxResult;

/**
 * 防止重复提交拦截器
 * 
 @author  官方网址
 */
@Component
public abstract class RepeatSubmitInterceptor extends HandlerInterceptorAdapter
{
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception
    {
        if (handler instanceof HandlerMethod)
        {
            HandlerMethod handlerMethod = (HandlerMethod) handler;
            Method method = handlerMethod.getMethod();
            RepeatSubmit annotation = method.getAnnotation(RepeatSubmit.class);
            if (annotation != null)
            {
                if (this.isRepeatSubmit(request))
                {
                    AjaxResult ajaxResult = AjaxResult.error("不允许重复提交，请稍后再试");
                    ServletUtils.renderString(response, JSONObject.toJSONString(ajaxResult));
                    return false;
                }
            }
            return true;
        }
        else
        {
            return super.preHandle(request, response, handler);
        }
    }

    /**
     * 验证是否重复提交由子类实现具体的防重复提交的规则
     * 
     * @param httpServletRequest
     * @return
     * @throws Exception
     */
    public abstract boolean isRepeatSubmit(HttpServletRequest request);
}
```

# 四、重定向转发

（1）转发：在返回值前面加"forward:"，譬如"forward:user.do?name=method4"

（2）重定向：在返回值前面加"redirect:"，譬如"redirect:http://www.baidu.com"

# 五、常用注解



# 引用：



