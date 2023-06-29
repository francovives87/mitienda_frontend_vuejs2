<template>
  <div class="GeoSettingsComponent">
    <div class="container mt-3" v-if="geoLocationCompleted == false">
      <div class="row">
        <div class="col-12 col-lg-12 d-flex justify-content-center">
          <div
            class="spinner-border text-primary"
            role="status"
            style="width: 4rem; height: 4rem; border-width: 6px"
          >
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <div class="col-12 col-lg-12 d-flex justify-content-center mt-3">
          <span style="font-size: 16px"
            >OBTENIENDO GEOLOCALIZACION, AGUARDE UNOS INSTANTES POR FAVOR.</span
          >
        </div>
      </div>
    </div>
    <div class="container p-0">
      <div class="row p-0">
        <div class="col-12 col-lg-12 p-0">
          <div class="map" id="map"></div>
        </div>
        <div class="col-12 border-top mt-2"></div>
        <div class="col-12 d-flex justify-content-end mt-2">
          <div
            class="procensado_geo d-flex align-items-center"
            v-if="procesando_geo == true"
          >
            <div class="spinner-border text-primary spinner" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <span class="procensado_geo_text"> Obteniendo geolocalizacion... </span>
          </div>
          <button
            class="btn btn-success"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="GuardarPosition()"
            :disabled="disable_button"
          >
            <span class="button_save">
              <font-awesome-icon icon="fa-solid fa-location-dot" /> Guardar
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import { faL } from "@fortawesome/free-solid-svg-icons";

export default {
  name: "GeoSettingsComponent",

  mounted() {
    this.ObtenerLanLgnDelNavegador();
  },

  computed: {
    ...mapState("user", ["mitienda"]),
  },

  watch: {
    address(value) {
      if (Object.keys(this.address).length > 0) {
        this.disable_button = false;
      }
    },
  },

  data() {
    return {
      geoLocationCompleted: false,
      myPosition: [],
      address: {},
      marker: null,
      map: null,
      lat: null,
      lng: null,
      zoom: 16,
      disable_button: true,
      procesando_geo: false,
    };
  },
  methods: {
    ...mapMutations("user", ["AddUserCity", "AddUserlatLng"]),
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
      if (
        localStorage.getItem("setLocation") == 1 ||
        !localStorage.getItem("setLocation")
      ) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.ShowPosition, (error) => {
            console.log("rechazo geo");
            this.myPosition.push(parseFloat("-32.953366091836735"));
            this.myPosition.push(parseFloat("-60.66329423469388"));
            if (!this.map) {
              this.CrearMap();
            }
          });
        } else {
          console.log("Geolocation is not supported by this browser.");
          this.myPosition.push(parseFloat("-32.953366091836735"));
          this.myPosition.push(parseFloat("-60.66329423469388"));
          if (!this.map) {
            this.CrearMap();
          }
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
      this.map = L.map("map").setView(
        [this.myPosition[0], this.myPosition[1]],
        this.zoom
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        maxZoom: 18,
      }).addTo(this.map);
      this.geoLocationCompleted = true;
      // Agrega el control de búsqueda de direcciones con reverse geocoding
      L.Control.geocoder({
        position: "topleft",
        defaultMarkGeocode: false,
        placeholder: "Buscar dirección...",
        reverse: true,
      })
        .on("markgeocode", (event) => {
          // Obtiene la dirección y las coordenadas del resultado de búsqueda y las actualiza en el estado
          const { name, center } = event.geocode;
          this.address.direccion = name;
          this.myPosition[0] = center.lat;
          this.myPosition[1] = center.lng;

          // Actualiza el marcador en el mapa y centra el mapa en la nueva posición
          this.marker.setLatLng(this.myPosition);
          this.map.setView(this.myPosition, this.zoom);
          this.Reverse();
        })
        .addTo(this.map);

      // Crea el marcador y lo agrega al mapa
      this.marker = L.marker([this.myPosition[0], this.myPosition[1]], {
        draggable: true,
      }).addTo(this.map);

      // Escucha el evento dragend del marcador para actualizar las coordenadas y la dirección
      this.marker.on("dragend", (event) => {
        const { lat, lng } = event.target.getLatLng();
        this.myPosition[0] = lat;
        this.myPosition[1] = lng;

        // Actualiza el marcador en el mapa y centra el mapa en la nueva posición
        this.marker.setLatLng(this.myPosition);
        this.map.setView(this.myPosition, this.zoom);

        // Realiza la petición a la API de Nominatim para obtener la dirección
        this.Reverse();
      });
    },

    GuardarPosition() {
      console.log("Guardar_position_address");
      console.log(this.address);
      if (Object.keys(this.address).length === 0) {
        console.log("El ojete esta vacio");
        this.$swal.fire(
          "No hay posicion seleccionada.",
          "Por favor mueva el punto para obtener alguna posicion",
          "info"
        );
      } else {
        let ciudad = null
        if (this.address.city) {
          ciudad = this.address.city
          localStorage.setItem("city", ciudad);
        } 
        if (this.address.village) {
          ciudad = this.address.village
          localStorage.setItem("city", ciudad);
        }

        localStorage.setItem("state", this.address.state);
        localStorage.setItem("country_code", this.address.country_code);
        localStorage.setItem("postcode", this.address.postcode);
        localStorage.setItem("lat", this.address.lat);
        localStorage.setItem("lng", this.address.lng);
        localStorage.setItem("suburb",this.address.suburb);

        let ubi_data = {
          city: localStorage.getItem("city"),
          state: localStorage.getItem("state"),
          country_code: localStorage.getItem("country_code"),
          postcode: localStorage.getItem("postcode"),
          suburb:localStorage.getItem("suburb"),
        };
        this.AddUserCity(ubi_data);
        let latLng = {
          lat: this.address.lat,
          lng: this.address.lng,
        };
        this.AddUserlatLng(latLng);
      }
    },

    Reverse() {
      this.procesando_geo = true;
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
          this.address.lat = this.lat;
          this.address.lng = this.lng;
          console.log("lat/lng");
          console.log(this.lat);
          console.log(this.lng);
          // Comprueba si la instancia del mapa ya existe antes de crear el mapa
          if (!this.map) {
            this.CrearMap();
          }
          this.map.setView(this.myPosition, this.zoom);
          this.procesando_geo = false;
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
  height: 350px;
  width: 100%;
}
.button_container {
  padding: 4px 4px 4px 4px;
  background-color: #f5f5f5;
}
.spinner {
  margin-right: 4px !important;
  width: 25px;
  height: 25px;
}
.procensado_geo_text {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  margin-right: 8px !important;
}
.button_save {
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 700;
}
@media (max-width: 768px) {
  .map {
    height: 400px;
  }
}
</style>
