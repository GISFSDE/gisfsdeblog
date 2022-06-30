import { defineUserConfig } from "vuepress";
import { componentsPlugin } from "vuepress-plugin-components";
import theme from "./theme";
import { sitemapPlugin } from "vuepress-plugin-sitemap2";
import { seoPlugin } from "vuepress-plugin-seo2";

import { path } from "@vuepress/utils";
import { docsearchPlugin } from "@vuepress/plugin-docsearch";

export default defineUserConfig({
  lang: "zh-CN",
  title: "GIS-FSDE",
  description: "GISFSDE(GIS Full Stack Developer)--GIS开发、JAVA全栈开发",

  base: "/",

  head: [
    [
      "link",
      {
        rel: "stylesheet",
        href: "//at.alicdn.com/t/font_2410206_mfj6e1vbwo.css",
      },
    ],
  ],


  theme,
  plugins: [
    docsearchPlugin({
      appId: "LTZGG0WZIE",
      apiKey: "5dff9de50652488d0636b7c72e75cdc5",
      indexName: "gisfsde",
    }),
    componentsPlugin({
      addThis: "ra-62a4a48ea8503a62",
      backToTop: true,
      components: ["Badge", "CodePen", "FontIcon", "PDF", "StackBlitz"],
      iconAssets: "//at.alicdn.com/t/font_2410206_a0xb9hku9iu.css",
    }),
    // https://vuepress-theme-hope.github.io/v2/seo/zh/config.html
    seoPlugin({
      hostname: "https://www.gisfsde.com",
      author: "GIS-FSDE"
    }),
    // https://vuepress-theme-hope.github.io/v2/sitemap/zh/config.html
    sitemapPlugin({
      hostname: "https://www.gisfsde.com",
    }),

  ],


  // ---------三维LOGO------
  pagePatterns: ["**/*.md", "!**/*.snippet.md", "!.vuepress", "!node_modules"],
  alias: {
    "@IconDisplay": path.resolve(__dirname, "./components/IconDisplay"),
    "@KatexPlayground": path.resolve(__dirname, "./components/KatexPlayground"),
    "@theme-hope/components/HomeHero": path.resolve(
      __dirname,
      "./components/HopeHero",
    ),
    "@gistravel": path.resolve(__dirname, "components/vuepages/gistravel.vue"),

  },
  define: () => ({
    IS_NETLIFY: "NETLIFY" in process.env,
  }),
});
