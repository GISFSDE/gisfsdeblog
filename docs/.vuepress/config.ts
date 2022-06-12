import { defineUserConfig } from "vuepress";
import { componentsPlugin } from "vuepress-plugin-components";
import theme from "./theme";

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
    componentsPlugin({
      addThis: "ra-62a4a48ea8503a62",
      backToTop: true,
      components: ["Badge", "CodePen", "FontIcon", "PDF", "StackBlitz"],
      iconAssets: "//at.alicdn.com/t/font_2410206_a0xb9hku9iu.css",
    }),
  ],
});
