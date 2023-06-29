<template>
  <div class="GeoSettingsComponent">
    <div class="container mt-3" v-if="geoLocationCompleted == false">
      <div class="row">
        <div class="col-12 col-lg-7 d-flex justify-content-center">
          <div
            class="spinner-border text-primary"
            role="status"
            style="width: 4rem; height: 4rem; border-width: 6px"
          >
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <div class="col-12 col-lg-7 d-flex justify-content-center mt-3">
          <span style="font-size: 16px"
            >OBTENIENDO GEOLOCALIZACION, AGUARDE UNOS INSTANTES POR FAVOR.</span
          >
        </div>
      </div>
    </div>
    <div class="container p-0">
      <div class="row p-0">
        <div class="col-12 col-lg-7 p-0">
          <div class="map" id="map"></div>
        </div>
        <div class="col-12 col-lg-5" v-show="geoLocationCompleted == true">
          <div class="container" v-if="address != null">
            <div class="row">
              <div class="col-12 button_container d-flex justify-content-end">
                <button class="btn btn-success" @click="CreateGeoDjango()">
                  <font-awesome-icon icon="fa-solid fa-location-dot" /> <span style="font-size:12px; font-weight: 900;">GUARDAR</span>
                </button>
              </div>
            </div>
            <form>
              <div class="mb-3">
                <label for="house_number" class="form-label">Número de casa</label>
                <input
                  type="text"
                  class="form-control"
                  id="house_number"
                  v-model="address.house_number"
                />
              </div>
              <div class="mb-3">
                <label for="road" class="form-label">Calle</label>
                <input
                  type="text"
                  class="form-control"
                  id="road"
                  v-model="address.road"
                />
              </div>
              <div class="mb-3">
                <label for="suburb" class="form-label">Barrio</label>
                <input
                  type="text"
                  class="form-control"
                  id="suburb"
                  v-model="address.suburb"
                />
              </div>
              <div class="mb-3">
                <label for="city_district" class="form-label"
                  >Distrito de la ciudad</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="city_district"
                  v-model="address.city_district"
                />
              </div>
              <div class="mb-3">
                <label for="city" class="form-label">Ciudad</label>
                <input
                  type="text"
                  class="form-control"
                  id="city"
                  v-model="address.city"
                />
              </div>
              <div class="mb-3">
                <label for="municipality" class="form-label">Municipio</label>
                <input
                  type="text"
                  class="form-control"
                  id="municipality"
                  v-model="address.municipality"
                />
              </div>
              <div class="mb-3">
                <label for="region" class="form-label">Región</label>
                <input
                  type="text"
                  class="form-control"
                  id="region"
                  v-model="address.region"
                />
              </div>
              <div class="mb-3">
                <label for="state_district" class="form-label">Distrito del estado</label>
                <input
                  type="text"
                  class="form-control"
                  id="state_district"
                  v-model="address.state_district"
                />
              </div>
              <div class="mb-3">
                <label for="state" class="form-label">Provincia</label>
                <input
                  type="text"
                  class="form-control"
                  id="state"
                  v-model="address.state"
                />
              </div>
              <div class="mb-3">
                <label for="postcode" class="form-label">Código Postal</label>
                <input
                  type="text"
                  class="form-control"
                  id="postcode"
                  v-model="address.postcode"
                />
              </div>
              <div class="mb-3">
                <label for="country" class="form-label">País</label>
                <input
                  type="text"
                  class="form-control"
                  id="country"
                  v-model="address.country"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default {
  name: "GeoSettingsComponent",

  mounted() {
    this.ObtenerLanLgnDelNavegador();
  },

  computed: {
    ...mapState("user", ["mitienda"]),
  },

  data() {
    return {
      geoLocationCompleted: false,
      myPosition: [],
      address: null,
      marker: null,
      map: null,
      drawer: null,
      lat: null,
      lng: null,
    };
  },
  methods: {
    CreateGeoDjango() {
      let coordenadas = [];
      coordenadas.push(parseFloat(this.lng));
      coordenadas.push(parseFloat(this.lat));
      let location = {
        type: "Point",
        coordinates: coordenadas,
      };
      this.address.location = location;
      this.address.tienda = this.mitienda[0].id;
      console.log("json_to_send");
      console.log(this.address);

      axios
        .post(this.server + "/api/v1/admin/tienda/geo/create", this.address, {
          headers: {
            Authorization: localStorage.getItem("access"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.$swal.fire(
            "Geolocalizacion Guardada!",
            "Se ha establecido la geolocalizacion de su tienda corrrectamente.",
            "success"
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },

    ObtenerLanLgnDelNavegador() {
      var setLocation = parseInt(localStorage.getItem("setLocation"));
      console.log("setLocation");
      console.log(setLocation);

      if (
        localStorage.getItem("setLocation") == 1 ||
        !localStorage.getItem("setLocation")
      ) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.ShowPosition);
        } else {
          console.log("rechazo geo");
          x.innerHTML = "Geolocation is not supported by this browser.";
        }
      }
    },
    ShowPosition(position) {
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);

      this.myPosition.push(position.coords.latitude);
      this.myPosition.push(position.coords.longitude);

      console.log("this.myPosition");
      console.log(this.myPosition);
      localStorage.setItem("setLocation", 1);
      this.Reverse();
    },

    cerrarMapa() {
      if (this.map) {
        this.map.remove();
        this.map = null;
      }
    },

    CrearMap() {
      this.map = L.map("map").setView([this.myPosition[0], this.myPosition[1]], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        maxZoom: 18,
      }).addTo(this.map);

      // Crea el marcador y lo agrega al mapa
      this.marker = L.marker([this.myPosition[0], this.myPosition[1]], {
        draggable: true,
      }).addTo(this.map);
      this.geoLocationCompleted = true;
      // Escucha el evento dragend del marcador para actualizar las coordenadas y la dirección
      this.marker.on("dragend", (event) => {
        const { lat, lng } = event.target.getLatLng();
        this.myPosition[0] = lat;
        this.myPosition[1] = lng;

        // Realiza la petición a la API de Nominatim para obtener la dirección
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${this.myPosition[0]}&lon=${this.myPosition[1]}&format=jsonv2`;

        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            this.address = data.address;
            console.log("cammmbiiioooo");
            console.log("data");
            console.log(data);
            this.lat = data.lat;
            this.lng = data.lon;
            console.log(this.address);
            console.log("lat/lng");
            console.log(this.lat);
            console.log(this.lng);
          });
      });
    },
    Reverse() {
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${this.myPosition[0]}&lon=${this.myPosition[1]}&format=jsonv2`;
      console.log("reverse");
      console.log(url);
      axios
        .get(url)
        .then((response) => {
          console.log("reverse");
          console.log("this.address");
          this.address = response.data.address;
          console.log("data_reverse");
          console.log(response.data);
          this.lat = response.data.lat;
          this.lng = response.data.lon;
          console.log("lat/lng");
          console.log(this.lat);
          console.log(this.lng);
          this.CrearMap();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.map {
  height: 400px;
  width: 100%;
}
.button_container{
  padding: 4px 4px 4px 4px;
  background-color: #f5f5f5;
}
@media (max-width: 768px) {
  .map {
    height: 400px;
  }
}
</style>
