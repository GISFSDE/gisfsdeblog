import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar";
import sidebar from "./sidebar";

export default hopeTheme({

  backToTop: true,
  fullscreen: true,
  themeColor: {
    blue: "#2196f3",
    red: "#f26d6d",
    green: "#3eaf7c",
    orange: "#fb9b5f",
  },
  hostname: "https://www.gisfsde.com",

  author: {
    name: "GIS-FSDE",
    url: "https://www.gisfsde.com",
  },

  iconPrefix: "iconfont icon-",

  logo: "/logo.svg",

  repo: "GISFSDE/",

  docsDir: "docs",

  // navbar
  navbar: navbar,

  // sidebar
  sidebar: sidebar,

  footer: '<a href="https://beian.miit.gov.cn">浙ICP备2022017274号</a>',

  displayFooter: true,

  pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime", "Word"],

  blog: {
    description: "-----GISFSDE(GIS Full Stack Developer)-----GIS开发、JAVA全栈开发",
    // 个人介绍地址
    intro: "https://www.gisfsde.com/guide/",
    // 自媒体矩阵
    medias: {
      Gitee: "https://gitee.com/gisfsde",
      GitHub: "https://github.com/GISFSDE",
      Wechat: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI5NDc0MDg1Mg==#wechat_redirect",
      Weibo: "https://example.com",
      Zhihu: "https://example.com",
    },
    // 侧边栏显示
    // sidebarDisplay: "always",
    timeline: "光阴似箭",
    // articlePerPage:10   分页数
  },

  encrypt: {
    config: {
      "/posts/2021/TODO.html": ["724111"],
      "/posts/2021/Life.html": ["724111"],
    },
  },

  plugins: {
    copyright: true,
    blog: {
      autoExcerpt: true,
    },

    // 如果你不需要评论，可以直接删除 comment 配置，
    // 以下配置仅供体验，如果你需要评论，请自行配置并使用自己的环境，详见文档。
    // 为了避免打扰主题开发者以及消耗他的资源，请不要在你的正式环境中直接使用下列配置!!!!!
    comment: {
      /**
       * Using giscus
       */
      provider: "Giscus",
      repo: "GISFSDE/vuepressd-discussions",
      repoId: "R_kgDOHc7-gA",
      category: "Announcements",
      categoryId: "DIC_kwDOHc7-gM4CPewo",
      /**
       * Using twikoo
       */
      // type: "twikoo",
      // envId: "https://twikoo.ccknbc.vercel.app",

      /**
       * Using Waline
       */
      // type: "waline",
      // serverURL: "https://vuepress-theme-hope-comment.vercel.app",
    },

    mdEnhance: {
      enableAll: true,
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
    },
  },
});
