<template>
  <div class="TiendasCercanasComponent">
    <LoadingSearchComponent v-if="loaded == false" />

    <!-- no_ubicacion -->

    <div class="container" v-if="no_ubi == true">
      <div class="row card no_ubi_card">
        <div class="col-12">
          <div class="container">
            <div class="row">
              <div class="col-4">
                <font-awesome-icon
                  icon="fa-solid fa-xmark"
                  style="color: red"
                  class="icon_no_ubi"
                />
                <font-awesome-icon icon="fa-solid fa-location-dot" class="icon_no_ubi" />
              </div>
              <div class="col-8">
                <span class="no_ubi_text"
                  >No se ha podido obtener su localizacion. <br />
                  Por favor active la ubicacion o haga click en
                  <span><font-awesome-icon icon="fa-solid fa-pencil" /></span> "cambiar"
                  para obtener una ubicacion aproximada y poder arrojar resultados
                  optimos.</span
                >
              </div>
            </div>
          </div>
          <!--  -->
        </div>
      </div>
    </div>

    <div class="tiendas_cercanas" v-if="loaded == true">
      <div class="container" v-if="tiendas.length > 0">
        <div class="row tienda_row">
          <div class="col-12 p-0">
            <span class="home_title"
              ><font-awesome-icon icon="fa-solid fa-map-location-dot" /> Tiendas
              cercanas</span
            >
            <br />
          </div>
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
                      <font-awesome-icon
                        icon="fa-solid fa-minus"
                        @click="DisminuirRadio()"
                      />
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
          <!-- contenido -->

          <!-- lista de tiendas cercanas -->

          <div
            class="col-6 col-lg-4 col-xs-6 tienda_col"
            v-for="(tienda, index) in tiendas"
            :key="index"
          >
            <a @click="GoToStore(tienda)">
              <div class="card shadow-sm featured mt-1">
                <div class="image d-flex justify-content-center p-0 mt-2">
                  <img
                    class="card-img-top profile-img-circle"
                    :src="tienda.tienda.tienda_images[0].logo"
                  />
                </div>

                <div class="card-body">
                  <div class="d-flex justify-content-center p-0">
                    <span class="tienda_title">{{ tienda.tienda.name }}</span>
                  </div>
                  <span
                    class="card-text text-muted mt-1"
                    v-for="(category, index) in tienda.tienda.categories"
                    :key="index"
                  >
                    <span class="text_categorie">
                      {{ category.nombre.slice(0, 25) }} <br />
                    </span>
                  </span>
                </div>
                <div
                  class="card-footer"
                  v-if="tienda.city != null || tienda.village != null"
                >
                  <div class="container">
                    <div class="row p-0">
                      <div class="col-12 p-0">
                        <span class="text_ubi"
                          ><font-awesome-icon icon="fa-solid fa-location-dot"
                        /></span>
                        <span class="text_ubi" v-if="tienda.city">
                          {{ tienda.city }},
                        </span>
                        <span v-if="tienda.village != null"> {{ tienda.village }}, </span>
                        <span class="text_ubi" v-if="tienda.road">{{
                          tienda.road.slice(0, 12)
                        }}</span>
                        <span class="text_ubi" v-if="tienda.road.length >= 12">...</span>
                        <span class="text_ubi" v-if="tienda.house_number">
                          {{ tienda.house_number }}</span
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
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import LoadingSearchComponent from "../searchs/LoadingSearchComponent.vue";

export default {
  name: "TiendasCercanasComponent",
  components: {
    LoadingSearchComponent,
  },

  data() {
    return {
      tiendas: [],
      radius: 5,
      loaded: false,
      no_ubi: false,
    };
  },

  mounted() {
    if (Object.keys(this.user_latLng).length > 0) {
      this.GetTiendasCercanas();
    }
    if (Object.keys(this.user_latLng).length <= 0) {
      this.no_ubi = true;
      this.loaded = true;
    } else {
      this.no_ubi = false;
      this.loaded = false;
    }
  },
  computed: {
    ...mapState("user", ["user_latLng"]),
  },
  watch: {
    user_latLng(value) {
      if (Object.keys(value).length > 0) {
        this.GetTiendasCercanas();
      }
      if (Object.keys(value).length <= 0) {
        this.no_ubi = true;
        this.loaded = true;
      } else {
        this.no_ubi = false;
        this.loaded = true;
      }
    },
    radius() {
      this.GetTiendasCercanas();
    },
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
      console.log("GoToStore");
      console.log(tienda.tienda.domain);
      this.$router.push({
        path: "/" + tienda.tienda.domain,
      });
    },

    GetTiendasCercanas() {
      this.loaded = false;
      axios
        .get(this.server + "/api/v1/tienda/geo/nears/", {
          params: {
            lng: this.user_latLng.lng,
            lat: this.user_latLng.lat,
            radius: this.radius,
          },
        })
        .then((response) => {
          this.tiendas = response.data.results;
          console.log("GetTiendasCercanas");
          console.log(this.tiendas);
          this.loaded = true;
        })
        .catch((error) => {
          console.log(error);
          console.log("error_no_ubi");
          this.loaded = true;
        });
    },
  },
};
</script>

<style scoped>
.TiendasCercanasComponent {
  margin-top: 10px;
  margin-bottom: 50px !important;
}
.topBarNav {
  height: 56px;
  background-color: #ffffff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 10px !important;
  padding: 2px 0px 2px 0px !important;
  margin-bottom: 10px !important;
  border-radius: 10px; /* ajustar el valor según sea necesario */
}
.home_title {
  font-size: 15px;
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

.featured {
  width: 100% !important;
  height: 260px !important;
}
.profile-img-circle {
  width: 80px !important;
  height: 80px !important;
  border-radius: 50%; /* Agregamos un border-radius del 50% para hacer la imagen circular */
  overflow: hidden;
  border: 2px solid #f2f2f2; /* Cambia este valor al color gris claro deseado */
}

.tienda_title {
  text-transform: uppercase;
  font-weight: 500;
}
.categories {
  padding: 0px !important;
  margin: 0px !important;
}
.text_ubi {
  font-size: 12px !important;
}

.radio_text {
  font-size: 12px !important;
  font-weight: 500;
}
.no_ubi_card {
  padding: 20px 0px 20px 0px !important;
}
.icon_no_ubi {
  font-size: 20px !important;
}
.no_ubi_text {
  font-size: 13px;
}

@media (max-width: 768px) {
  .TiendasCercanasComponent {
    padding: 0px !important;
  }
  .topBarNav {
    height: 56px;
    background-color: #ffffff;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    margin-top: 10px !important;
    padding: 2px 0px 2px 0px !important;
    margin-bottom: 10px !important;
    border-radius: 10px; /* ajustar el valor según sea necesario */
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
  .featured {
    padding: 0px !important;
    width: 100% !important;
    height: 260px !important;
  }
  .profile-img-circle {
    padding: 0px !important;
    width: 60px !important;
    height: 60px !important;
    border-radius: 50%; /* Agregamos un border-radius del 50% para hacer la imagen circular */
  }

  .li_cat_sel {
    display: inline-block;
    margin-right: 1px !important; /* Ajusta el margen derecho según tus necesidades */
    padding: 5px 3px 5px 3px !important;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f5f5f5;
    color: #333;
    font-size: 12px;
    cursor: pointer;
  }
  .radio_text {
    font-size: 12px !important;
    font-weight: 500;
  }
  .text_categorie {
    font-size: 11px !important;
    display: inline;
  }
}
</style>
