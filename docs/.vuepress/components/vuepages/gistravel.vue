<template>
  <div id="leafletmap"></div>
</template>

<script>
// import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
export default {
  name: "gistravel",

  props: {
    value: {
      type: String,
      default: "",
    },
  },

  computed: {},
  mounted() {
    let map = L.map("leafletmap", {
      minZoom: 3,
      maxZoom: 18,
      center: [30.289602, 120.141876],
      zoom: 10,
      zoomControl: false,
      attributionControl: false,
      crs: L.CRS.EPSG3857,
    });
    this.map = map;
    L.tileLayer(
      "http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}"
    ).addTo(map);
    // 标点
    L.marker([30.217985, 120.138313]).addTo(map);
    // 弹出框
    var popup = L.popup()
      .setLatLng([30.217985, 120.138313])
      .setContent(
        "<p>杭州动物园<br />杭州动物园游玩很开心,有小西挤.</p><img src='http://qnimg.gisfsde.com/markdown/98a01243deb029185e2b1b730d3c212bfb73fef04409c-CjaE8C_fw658' alt='some_text'>"
      )
      .openOn(map);
    //
  },
};
</script>

<style lang="scss" scoped>
#leafletmap {
  width: 100%;
  height: 500px;
  z-index: 1;
  margin: auto;
}
</style>