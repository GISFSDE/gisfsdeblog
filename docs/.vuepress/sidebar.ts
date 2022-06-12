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
          { text: "JAVA", icon: "edit", link: "article1" },
          { text: "JVM", icon: "edit", link: "article1" },
          { text: "Python", icon: "edit", link: "article2" },
          { text: "MYSQL", icon: "edit", link: "article2" },
          { text: "PostgreSQL", icon: "edit", link: "article2" },
          { text: "MongoDB", icon: "edit", link: "article2" },
          { text: "系统优化", icon: "edit", link: "article2" },
          { text: "系统设计", icon: "edit", link: "article2" },
          { text: "功能DEMO", icon: "edit", link: "article2" },
        ],
      },
      {
        text: "软件工程",
        icon: "edit",
        prefix: "article/",
        children: [
          { text: "项目管理", icon: "edit", link: "article1" },
          { text: "软件工程", icon: "edit", link: "article2" },
          { text: "网络", icon: "edit", link: "article2" },
          { text: "安全", icon: "edit", link: "article2" },
          { text: "算法", icon: "edit", link: "article2" },
          { text: "设计模式", icon: "edit", link: "article2" },
          { text: "测试", icon: "edit", link: "article1" },
          { text: "程序员修电脑", icon: "edit", link: "article2" },
          { text: "数学", icon: "edit", link: "article2" },
        ],
      },
      {
        text: "框架-中间件",
        icon: "edit",
        prefix: "article/",
        children: [
          { text: "Spring", icon: "edit", link: "article2" },
          { text: "SpringMVC", icon: "edit", link: "article2" },
          { text: "Mybatis", icon: "edit", link: "article2" },
          { text: "Mybatis-Plus", icon: "edit", link: "article2" },
          { text: "SpringBoot", icon: "edit", link: "article2" },
          { text: "SpringCloud", icon: "edit", link: "article1" },
          { text: "Dubbo", icon: "edit", link: "article1" },
          { text: "RabbitMQ", icon: "edit", link: "article1" },
          { text: "Redis", icon: "edit", link: "article1" },
          { text: "Nginx", icon: "edit", link: "article1" },
          { text: "RabbitMQ", icon: "edit", link: "article1" },
          { text: "Maven", icon: "edit", link: "article1" },

        ],
      },
      {
        text: "运维-工具",
        icon: "edit",
        prefix: "article/",
        children: [

          { text: "Linux", icon: "edit", link: "article2" },
          { text: "Docker", icon: "edit", link: "article2" },
          { text: "IIS", icon: "edit", link: "article2" },
          { text: "Jenkins", icon: "edit", link: "article2" },
          { text: "从零网站上线", icon: "edit", link: "article2" },

        ],
      },
      {
        text: "前端",
        icon: "edit",
        children: [
          {
            text: "前端",
            icon: "edit",
            link: "2021/前端",
          },
          {
            text: "UI设计",
            icon: "edit",
            link: "2021/前端",
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
        prefix: "article/",
        children: [
          { text: "项目管理", icon: "edit", link: "article1" },
        ],
      },
      {
        text: "大数据",
        icon: "edit",
        prefix: "article/",
        children: [
          { text: "大数据", icon: "edit", link: "article1" },
        ],
      },
      {
        text: "AI",
        icon: "edit",
        prefix: "article/",
        children: [
          { text: "深度学习", icon: "edit", link: "article1" },
        ],
      },
      {
        text: "GAME",
        icon: "edit",
        prefix: "article/",
        children: [
          { text: "UE4", icon: "edit", link: "article1" },
        ],
      },
      {
        text: "GIS",
        icon: "edit",
        children: [
          {
            text: "GIS基础知识",
            icon: "edit",
            link: "article/article5",
          },
          {
            text: "GIS软件",
            icon: "edit",
            link: "article/article6",
          },
          {
            text: "Leaflet",
            icon: "edit",
            link: "article/article6",
          },
          {
            text: "Mapbox",
            icon: "edit",
            link: "article/article6",
          },
          {
            text: "Cesium",
            icon: "edit",
            link: "article/article6",
          },
          {
            text: "最新技术",
            icon: "edit",
            link: "article/article6",
          },
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
        prefix: "article/",
        children: [
          { text: "TODO", icon: "edit", link: "article1" },
        ],
      },
      {
        text: "穿搭护肤",
        icon: "edit",
        prefix: "article/",
        children: [
          { text: "穿搭", icon: "edit", link: "article1" },
          { text: "护肤", icon: "edit", link: "article2" },
        ],
      },
      {
        text: "自媒体",
        icon: "edit",
        prefix: "article/",
        children: [
          { text: "自媒体规划", icon: "edit", link: "article1" },
          { text: "自媒体矩阵", icon: "edit", link: "article2" },
          { text: "自媒体知识", icon: "edit", link: "article2" },
        ],
      },
      {
        text: "书影音",
        icon: "edit",
        prefix: "article/",
        children: [
          { text: "读后感", icon: "edit", link: "article1" },
          { text: "观后感", icon: "edit", link: "article2" },
        ],
      },
      {
        text: "年月日",
        icon: "edit",
        prefix: "article/",
        children: [
          { text: "年月日", icon: "edit", link: "article1" },
        ],
      },
      {
        text: "健康",
        icon: "edit",
        children: [
          {
            text: "健身知识",
            icon: "edit",
            link: "article/article5",
          },
          {
            text: "营养搭配",
            icon: "edit",
            link: "article/article6",
          },
          {
            text: "美食制作",
            icon: "edit",
            link: "article/article6",
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
            link: "article/article5",
          },
          {
            text: "",
            icon: "edit",
            link: "article/article6",
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
            link: "article/article5",
          },
          {
            text: "AE",
            icon: "edit",
            link: "article/article6",
          },
          {
            text: "平面设计",
            icon: "edit",
            link: "article/article6",
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
            link: "article/article5",
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
        prefix: "article/",
        children: [
          { text: "乐理", icon: "edit", link: "article1" },
          { text: "吉他谱", icon: "edit", link: "article2" },
          { text: "钢琴谱", icon: "edit", link: "article2" },
          { text: "其他谱", icon: "edit", link: "article2" },
          { text: "作词编曲", icon: "edit", link: "article2" },
        ],
      },
      {
        text: "摄影",
        icon: "edit",
        prefix: "article/",
        children: [
          { text: "审美提高", icon: "edit", link: "album" },
          { text: "摄影", icon: "edit", link: "article2" },
        ],
      },
      {
        text: "数绘",
        icon: "edit",
        prefix: "article/",
        children: [
          { text: "审美提高", icon: "edit", link: "article1" },
          { text: "数绘", icon: "edit", link: "article2" },
        ],
      },
      {
        text: "记录",
        icon: "edit",
        children: [
          {
            text: "摄影记录",
            icon: "edit",
            link: "article/article5",
          },
          {
            text: "绘画记录",
            icon: "edit",
            link: "article/article6",
          },
          {
            text: "音乐记录",
            icon: "edit",
            link: "article/article6",
          },
          {
            text: "视频记录",
            icon: "edit",
            link: "article/article6",
          },
        ],
      },
    ],
  },
  { text: "关于我", icon: "emoji", link: "/guide/" },
]);
