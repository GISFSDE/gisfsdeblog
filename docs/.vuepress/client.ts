// import * as Lealet from "leaflet";
// import "leaflet/dist/leaflet.css";
// // import { Icon } from 'leaflet';
// // 使用异步函数也是可以的

// export default async ({
//     Vue, // VuePress 正在使用的 Vue 构造函数
//     options, // 附加到根实例的一些选项
//     router, // 当前应用的路由实例
//     siteData, // 站点元数据
//     isServer // 当前应用配置是处于 服务端渲染 或 客户端
// }) => {
//     // delete Icon.Default.prototype._getIconUrl;
//     // Icon.Default.mergeOptions({
//     //     iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//     //     iconUrl: require('leaflet/dist/images/marker-icon.png'),
//     //     shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
//     // });
//     // ...做一些其他的应用级别的优化
//     if (!isServer) {
//         var L = Vue.use(Lealet);
//         await import("leaflet").then(module => {
//             Vue.use(module.default);
//         });
//     }
// }
// import LL from 'leaflet'
// import "leaflet/dist/leaflet.css";
// export default async ({
//     Vue,
//     options, // 附加到根实例的一些选项
//     router, // 当前应用的路由实例
//     siteData, // 站点元数据
//     isServer // 当前应用配置是处于 服务端渲染 或 客户端
// }) => {
//     if (!isServer) {
//         await import("leaflet").then(module => {
//             Vue.use(module, { name: 'L' })
//             Vue.prototype.L = module;
//         });
//     }
// }


import { defineClientConfig } from '@vuepress/client'

export default defineClientConfig({
    async enhance() {
        if (!__VUEPRESS_SSR__) {
            await import('leaflet')

        }
    },
})
