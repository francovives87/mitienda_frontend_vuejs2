<template>
  <div id="map-container">
    <l-map>
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker :lat-lng="location"></l-marker>
    </l-map>
  </div>
</template>

<script>
import { mapState } from "vuex";
import L from "leaflet";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";

export default {
  name: "InfoUbicacion",
  components: { LMap, LTileLayer, LMarker },
  computed: {
    ...mapState("tienda", ["tienda"]),
  },

  data() {
    return {
      map: null, // guardaremos el objeto map de Leaflet en una propiedad del componente
      zoom: 13,
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      location: null,
      center: null,
      attribution:
        'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    };
  },
  mounted() {
    // creamos el objeto map de Leaflet y lo guardamos en la propiedad del componente
    this.CreateMap();
  },
  beforeDestroy() {
    // destruimos el objeto map de Leaflet cuando el componente se desmonta
    this.map.remove();
  },
  methods: {
    CreateMap() {
      let coordenadas = [];
      coordenadas.push(parseFloat(this.tienda.geo_tienda[0].location.coordinates[1]));
      coordenadas.push(parseFloat(this.tienda.geo_tienda[0].location.coordinates[0]));
      this.location = L.latLng(coordenadas);
      console.log("this.location");
      console.log(this.location);
      this.center = L.latLng(coordenadas);
      this.map = L.map("map-container", {
        center: this.center,
        zoom: this.zoom,
        dragging: true, // habilita el arrastre del mapa
        zoomControl: true, // habilita el control de zoom
        scrollWheelZoom: true, // habilita el zoom con la rueda del mouse
      });
      L.tileLayer(this.url, { attribution: this.attribution }).addTo(this.map);
      L.marker(this.location).addTo(this.map);
    },
  },
};
</script>

<style scoped>
#map-container {
  height: 400px;
}
</style>
