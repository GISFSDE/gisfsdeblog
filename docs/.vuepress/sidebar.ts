import { sidebar } from "vuepress-theme-hope";

export default sidebar([
  "/",
  "/home",
  {
    text: "JAVA全栈",
    icon: "edit",
    prefix: "/posts/",
    children: [
      {
        text: "后端",
        icon: "edit",
        prefix: "2021/",
        children: [
          { text: "JAVA", icon: "edit", link: "Java" },
          { text: "JVM", icon: "edit", link: "JVM" },
          { text: "Python", icon: "edit", link: "Python3" },
          { text: "MYSQL", icon: "edit", link: "MYSQLOptimize" },
          { text: "PostgreSQL", icon: "edit", link: "inconstruction" },
          { text: "MongoDB", icon: "edit", link: "MongoDB" },
          { text: "系统优化", icon: "edit", link: "inconstruction" },
          { text: "系统设计", icon: "edit", link: "inconstruction" },
          { text: "功能DEMO", icon: "edit", link: "inconstruction" },
        ],
      },
      {
        text: "软件工程",
        icon: "edit",
        prefix: "2021/",
        children: [
          { text: "项目管理", icon: "edit", link: "PM" },
          { text: "架构师", icon: "edit", link: "Architect" },
          { text: "软件工程", icon: "edit", link: "inconstruction" },
          { text: "网络", icon: "edit", link: "Network" },
          { text: "安全", icon: "edit", link: "inconstruction" },
          { text: "算法", icon: "edit", link: "Algorithm" },
          { text: "设计模式", icon: "edit", link: "DesignPatterns" },
          { text: "测试", icon: "edit", link: "inconstruction" },
          { text: "程序员修电脑", icon: "edit", link: "DevelopersFixComputer" },
          { text: "数学", icon: "edit", link: "inconstruction" },
          { text: "英语", icon: "edit", link: "EnglishDay" },
        ],
      },
      {
        text: "框架-中间件",
        icon: "edit",
        prefix: "2021/",
        children: [
          { text: "Spring", icon: "edit", link: "Spring" },
          { text: "SpringMVC", icon: "edit", link: "SpringMVC" },
          { text: "Mybatis", icon: "edit", link: "Mybatis" },
          { text: "Mybatis-Plus", icon: "edit", link: "Mybatis-Plus" },
          { text: "SpringBoot", icon: "edit", link: "SpringBoot" },
          { text: "SpringCloud", icon: "edit", link: "SpringCloud" },
          { text: "Dubbo", icon: "edit", link: "Dubbo" },
          { text: "RabbitMQ", icon: "edit", link: "RabbitMQ" },
          { text: "Redis", icon: "edit", link: "Redis" },
          { text: "Nginx", icon: "edit", link: "Nginx" },
          { text: "Maven", icon: "edit", link: "inconstruction" },

        ],
      },
      {
        text: "运维-工具",
        icon: "edit",
        prefix: "2021/",
        children: [

          { text: "Linux", icon: "edit", link: "Linux" },
          { text: "Docker", icon: "edit", link: "Docker" },
          { text: "IIS", icon: "edit", link: "inconstruction" },
          { text: "Jenkins", icon: "edit", link: "inconstruction" },
          { text: "从零网站上线", icon: "edit", link: "inconstruction" },

        ],
      },
      {
        text: "前端",
        icon: "edit",
        children: [
          {
            text: "前端",
            icon: "edit",
            link: "2021/FrontEnd",
          },
          {
            text: "UI设计",
            icon: "edit",
            link: "2021/FrontEnd",
          },
          {
            text: "小程序",
            icon: "edit",
            link: "2021/WMP",
          },
        ],
      },

    ],
  },
  {
    text: "快乐编程",
    icon: "edit",
    prefix: "/posts/",
    children: [
      {
        text: "技术前沿",
        icon: "edit",
        prefix: "2021/",
        children: [
          { text: "项目管理", icon: "edit", link: "inconstruction" },
        ],
      },
      {
        text: "大数据",
        icon: "edit",
        prefix: "2021/",
        children: [
          { text: "大数据", icon: "edit", link: "inconstruction" },
        ],
      },
      {
        text: "AI",
        icon: "edit",
        prefix: "2021/",
        children: [
          { text: "深度学习", icon: "edit", link: "inconstruction" },
        ],
      },
      {
        text: "GAME",
        icon: "edit",
        prefix: "2021/",
        children: [
          { text: "UE4", icon: "edit", link: "inconstruction" },
        ],
      },
      {
        text: "GIS",
        icon: "edit",
        children: [
          {
            text: "GIS基础知识",
            icon: "edit",
            link: "2021/GIS",
          },
          {
            text: "GIS软件",
            icon: "edit",
            link: "2021/GIS",
          },
          {
            text: "Leaflet",
            icon: "edit",
            link: "2021/GIS",
          },
          {
            text: "Mapbox",
            icon: "edit",
            link: "2021/GIS",
          },
          {
            text: "Cesium",
            icon: "edit",
            link: "2021/GIS",
          },
          {
            text: "最新技术",
            icon: "edit",
            link: "2021/GIS",
          },
        ],
      },
    ],
  },
  {
    text: "思考",
    icon: "edit",
    prefix: "/posts/",
    children: [
      {
        text: "技术思考",
        icon: "edit",
        prefix: "2021/",
        children: [
          { text: "项目管理", icon: "edit", link: "inconstruction" },
        ],
      },
      {
        text: "生活思考",
        icon: "edit",
        prefix: "2021/",
        children: [
          { text: "如何学习一个新知识", icon: "edit", link: "HowToLearn" },
        ],
      },
    ],
  },
  {
    text: "生活",
    icon: "hot",
    prefix: "/posts/",
    children: [
      {
        text: "TODO",
        icon: "edit",
        prefix: "2021/",
        children: [
          { text: "TODO", icon: "edit", link: "TODO" },
        ],
      },
      {
        text: "穿搭护肤",
        icon: "edit",
        prefix: "2021/",
        children: [
          { text: "穿搭", icon: "edit", link: "Health" },
          { text: "护肤", icon: "edit", link: "Health" },
        ],
      },
      {
        text: "自媒体",
        icon: "edit",
        prefix: "2021/",
        children: [
          { text: "自媒体规划", icon: "edit", link: "We-Media" },
          { text: "自媒体矩阵", icon: "edit", link: "We-Media" },
          { text: "自媒体知识", icon: "edit", link: "We-Media" },
        ],
      },
      {
        text: "书影音",
        icon: "edit",
        prefix: "2021/",
        children: [
          { text: "读后感", icon: "edit", link: "BMM" },
          { text: "观后感", icon: "edit", link: "BMM" },
        ],
      },
      {
        text: "年月日",
        icon: "edit",
        prefix: "2021/",
        children: [
          { text: "年月日", icon: "edit", link: "Summarize" },
        ],
      },
      {
        text: "健康",
        icon: "edit",
        children: [
          {
            text: "健身知识",
            icon: "edit",
            link: "2021/inconstruction",
          },
          {
            text: "营养搭配",
            icon: "edit",
            link: "2021/inconstruction",
          },
          {
            text: "美食制作",
            icon: "edit",
            link: "2021/inconstruction",
          },
        ],
      },
      {
        text: "有用工具",
        icon: "edit",
        children: [
          {
            text: "电脑工具",
            icon: "edit",
            link: "2021/inconstruction",
          },
          {
            text: "",
            icon: "edit",
            link: "2021/inconstruction",
          },
        ],
      },
      {
        text: "Adobe",
        icon: "edit",
        children: [
          {
            text: "PS",
            icon: "edit",
            link: "2021/inconstruction",
          },
          {
            text: "AE",
            icon: "edit",
            link: "2021/inconstruction",
          },
          {
            text: "平面设计",
            icon: "edit",
            link: "2021/inconstruction",
          }
        ],
      },
      {
        text: "三维",
        icon: "edit",
        children: [
          {
            text: "C4D",
            icon: "edit",
            link: "2021/inconstruction",
          },
        ],
      },
    ],
  },
  {
    text: "艺术",
    icon: "creative",
    prefix: "/posts/",
    children: [
      {
        text: "音乐",
        icon: "edit",
        prefix: "2021/",
        children: [
          { text: "乐理", icon: "edit", link: "inconstruction" },
          { text: "吉他谱", icon: "edit", link: "inconstruction" },
          { text: "钢琴谱", icon: "edit", link: "inconstruction" },
          { text: "其他谱", icon: "edit", link: "inconstruction" },
          { text: "作词编曲", icon: "edit", link: "inconstruction" },
        ],
      },
      {
        text: "摄影",
        icon: "edit",
        prefix: "2021/",
        children: [
          { text: "审美提高", icon: "edit", link: "album" },
          { text: "摄影", icon: "edit", link: "inconstruction" },
        ],
      },
      {
        text: "数绘",
        icon: "edit",
        prefix: "2021/",
        children: [
          { text: "审美提高", icon: "edit", link: "inconstruction" },
          { text: "数绘", icon: "edit", link: "inconstruction" },
        ],
      },
      {
        text: "记录",
        icon: "edit",
        children: [
          {
            text: "摄影记录",
            icon: "edit",
            link: "2021/inconstruction",
          },
          {
            text: "绘画记录",
            icon: "edit",
            link: "2021/inconstruction",
          },
          {
            text: "音乐记录",
            icon: "edit",
            link: "2021/inconstruction",
          },
          {
            text: "视频记录",
            icon: "edit",
            link: "2021/inconstruction",
          },
        ],
      },
    ],
  },
  { text: "关于我", icon: "emoji", link: "/guide/" },
]);
