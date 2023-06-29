<template>
  <div class="SearchTiendasContentComponent">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h6><font-awesome-icon icon="fa-solid fa-store" /> Resultados de Tiendas</h6>
        </div>
      </div>
    </div>

    <LoadingSearchComponent v-if="loaded == false" />
    <!-- contendido de la busqueda -->

    <!-- radio KM -->
    <div class="topBarNav">
      <div class="container mt-2 mb-2">
        <div class="row d-flex justify-content-end align-items-center">
          <div class="col-6 col-lg-4 col-xs-6">
            <span class="radio_text">Radio de busqueda en KMs</span>
          </div>
          <div class="col-6 col-lg-3 col-xs-6">
            <div class="input-group">
              <button class="btn btn-outline-secondary" type="button">
                <font-awesome-icon icon="fa-solid fa-minus" @click="DisminuirRadio()" />
              </button>
              <input
                type="text"
                class="form-control"
                v-model="radius"
                step="1"
                readonly
              />
              <button
                class="btn btn-outline-secondary"
                type="button"
                @click="AumentarRadio()"
              >
                <font-awesome-icon icon="fa-solid fa-plus" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- resultados -->
    <div class="container tienda_container" v-if="loaded == true && tiendas.length > 0">
      <div class="row tienda_row">
        <div
          class="col-6 col-lg-4 col-xs-6 tienda_col"
          v-for="(tienda, index) in tiendas"
          :key="index"
        >
          <a @click="GoToStore(tienda)">
            <div class="card shadow-sm featured">
              <div class="rounded-circle d-flex justify-content-center mt-2">
                <div class="image d-flex justify-content-center p-0 mt-2">
                  <img :src="tienda.tienda_images[0].logo" class="profile-img-circle" />
                </div>
              </div>
              <div class="card-body text-center">
                <h5 class="card-title font-weight-bold text-uppercase">
                  {{ tienda.name }}
                </h5>
                <span
                  class="card-text text-muted categories"
                  v-for="(category, index) in tienda.categories"
                  :key="index"
                >
                  <span class="text_categorie"> {{ category.nombre }} </span>
                </span>
              </div>
              <div
                class="card-footer"
                v-if="
                  tienda.geo_tienda[0].city != null ||
                  tienda.geo_tienda[0].village != null
                "
              >
                <div class="container">
                  <div class="row p-0">
                    <div class="col-12 p-0">
                      <span class="text_ubi"
                        ><font-awesome-icon icon="fa-solid fa-location-dot"
                      /></span>
                      <span class="text_ubi" v-if="tienda.geo_tienda[0].city">
                        {{ tienda.geo_tienda[0].city }},
                      </span>
                      <span v-if="tienda.geo_tienda[0].village != null">
                        {{ tienda.geo_tienda[0].village }},
                      </span>
                      <span class="text_ubi" v-if="tienda.geo_tienda[0].road">{{
                        tienda.geo_tienda[0].road.slice(0, 23)
                      }}</span>
                      <span class="text_ubi" v-if="tienda.geo_tienda[0].road.length == 23"
                        >...</span
                      >
                      <span class="text_ubi" v-if="tienda.geo_tienda[0].house_number">
                        {{ tienda.geo_tienda[0].house_number }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import LoadingSearchComponent from "./LoadingSearchComponent.vue";
export default {
  name: "SearchTiendasContentComponent",
  components: {
    LoadingSearchComponent,
  },

  props: ["kword"],

  mounted() {
    this.loaded = false;
    this.BusquedaUnificada();
    this.radius = 5;
  },
  computed: {
    ...mapState("user", ["user_latLng"]),
  },
  watch: {
    kword() {
      this.BusquedaUnificada(this.radius);
    },

    radius(value) {
      this.BusquedaUnificada(value);
    },
  },
  data() {
    return {
      tiendas: [],
      loaded: false,
      radius: 5,
    };
  },
  methods: {
    DisminuirRadio() {
      if (this.radius != 5) {
        this.radius -= 5;
      }
    },
    AumentarRadio() {
      this.radius += 5;
    },

    GoToStore(tienda) {
      console.log(tienda);
      this.$router.push({
        path: "/" + tienda.domain,
      });
    },

    BusquedaUnificada(radius) {
      this.loaded = false;
      console.log("BusquedaUnificada");
      console.log("radius");
      console.log(radius);
      axios
        .get(this.server + "/api/v1/tienda/search/store/geo/", {
          params: {
            q: this.kword,
            lat: this.user_latLng.lat,
            lng: this.user_latLng.lng,
            radius: radius,
          },
        })
        .then((response) => {
          this.tiendas = response.data.results;
          console.log(this.tiendas);
          this.loaded = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.topBarNav {
  height: 56px;
  background-color: #ffffff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 10px !important;
  padding: 2px 0px 2px 0px !important;
  margin-bottom: 10px !important;
  border-radius: 10px; /* ajustar el valor según sea necesario */
}

.SearchTiendasContentComponent {
  margin-top: 15px !important;
  margin-left: 5px !important;
  margin-bottom: 30px !important;
}
.home_title {
  font-size: 18px;
  text-transform: uppercase;
  font-weight: 500;
}

.profile-img {
  width: 80px;
  height: 80px;
}

.card {
  margin-left: 3px !important;
  height: 250px !important;
}

.card-title {
  text-transform: uppercase;
}

.text-muted {
  font-size: 14px;
  margin-bottom: 0.5rem;
}
.categories {
  font-size: 12px !important;
  font-weight: 500;
}
.tienda_container {
  padding: 0px !important;
  margin: 0px !important;
}
.tienda_row {
  padding: 0px !important;
  margin: 0px !important;
}
.tienda_col {
  padding: 0px !important;
  margin: 0px !important;
}
.radio_text {
  font-size: 12px !important;
  font-weight: 500;
}
.profile-img-circle {
  width: 80px !important;
  height: 80px !important;
  border-radius: 50%; /* Agregamos un border-radius del 50% para hacer la imagen circular */
  overflow: hidden;
  border: 2px solid #f2f2f2; /* Cambia este valor al color gris claro deseado */
}
.text_ubi {
  font-size: 12px !important;
}
.featured {
  padding: 0px !important;
  width: 100% !important;
  height: 300px !important;
}
.text_categorie {
  font-size: 12px !important;
}

@media (max-width: 768px) {
  .topBarNav {
    height: 64px;
    background-color: #ffffff;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    margin-top: 10px !important;
    padding: 2px 0px 2px 0px !important;
    margin-bottom: 10px !important;
    border-radius: 10px; /* ajustar el valor según sea necesario */
  }
  .SearchTiendasContentComponent {
    margin-top: 15px !important;
    margin-left: 5px !important;
    margin-bottom: 30px !important;
  }

  .featured {
    padding: 0px !important;
    width: 100% !important;
    height: 350px !important;
  }
  .tienda_container {
    padding: 0px !important;
    margin: 0px !important;
  }
  .tienda_row {
    padding: 0px !important;
    margin: 0px !important;
  }
  .tienda_col {
    padding: 0px !important;
    margin: 0px !important;
  }
  .radio_text {
    font-size: 12px !important;
    font-weight: 500;
  }
  .profile-img-circle {
    width: 80px !important;
    height: 80px !important;
    border-radius: 50%; /* Agregamos un border-radius del 50% para hacer la imagen circular */
    overflow: hidden;
    border: 2px solid #f2f2f2; /* Cambia este valor al color gris claro deseado */
  }
  .text_categorie {
    font-size: 11px !important;
  }
}
</style>
