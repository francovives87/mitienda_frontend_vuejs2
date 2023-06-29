<template>
  <div class="HomeView">
    <!-- offcanvas -->
    <div
      class="offcanvas offcanvas-start"
      tabindex="-1"
      id="offcanvasExample"
      aria-labelledby="offcanvasExampleLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasExampleLabel">Explore mitienda.app</h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <div>Buesque las tiendas que necesita segun sus necesidades.</div>
        <div class="container">
          <div class="row">
            <div class="col-12 mt-3">
              <div>
                <h6>
                  <a @click="InicioMobile">
                    <font-awesome-icon icon="fa-solid fa-house" /> INICIO
                  </a>
                </h6>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-3">
          <ul>
            <MenuItem
              v-for="category in categories"
              :category="category"
              :key="category.id"
              @category-click="handleCategoryClick"
            ></MenuItem>
          </ul>
        </div>
      </div>
    </div>

    <!-- offcanvas -->

    <div class="container barra_exploracion_movil d-block d-sm-none pt-3">
      <div class="row text-end d-flex align-items-center">
        <div class="col-8 col-xs-8 d-flex justify-content-center" style="font-size: 12px">
          <div class="container">
            <div class="row">
              <div class="col-12 p-0">
                <SearchInputComponent
                  @search_kword="SearchOnMiTienda"
                  @clear_search="ClearSearch"
                  :activeTab="activeTab"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="col-4 col-xs-4 d-flex justify-content-end">
          <button
            class="btn btn-outline-secondary"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample"
          >
            <font-awesome-icon icon="fa-solid fa-bars" />
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="border-top mt-2"></div>
        </div>
        <div class="col-12 pt-1">
          <a data-bs-toggle="modal" data-bs-target="#miUbicacionModal">
            <font-awesome-icon icon="fa-solid fa-location-dot" />
            <span class="ubi_span" v-if="Object.keys(user_city).length > 0">
              {{ user_city.city }}, {{ user_city.state }} , {{ user_city.country_code }},
              {{ user_city.postcode }}
              <span class="barrio">{{ user_city.suburb.slice(0, 16) }}</span>
              <span class="" style="margin-left: 10px">
                <a
                  data-bs-toggle="modal"
                  data-bs-target="#miUbicacionModal"
                  @click="openMiUbicacion = true"
                  class="ubi_link"
                >
                  <font-awesome-icon icon="fa-solid fa-pencil" />
                  <span style="font-size: 9px !important">cambiar</span>
                </a></span
              >
            </span>
            <span class="ubi_span" v-if="Object.keys(user_city).length === 0">
              Sin ubicacion
              <span class="" style="margin-left: 10px">
                <a
                  data-bs-toggle="modal"
                  data-bs-target="#miUbicacionModal"
                  @click="openMiUbicacion = true"
                  class="ubi_link"
                >
                  <font-awesome-icon icon="fa-solid fa-pencil" /> cambiar
                </a></span
              >
            </span>
          </a>
        </div>
      </div>
    </div>
    <!-- contenido -->
    <div class="container-fluid">
      <div class="row">
        <div
          class="col-3 col-lg-3 col-md-4 col-sm-6 d-none d-sm-block"
          style="background-color: #ffffff"
        >
          <div class="sidebar" ref="sidebar">
            <!-- Aquí colocas el contenido de la barra lateral izquierda-->
            <div class="container">
              <div class="row">
                <div class="col-12">
                  <h6>
                    <a @click="view_display = 'content_main_tiendas'">
                      <font-awesome-icon icon="fa-solid fa-house" /> INICIO</a
                    >
                  </h6>
                </div>
                <div class="col-12">
                  <h6><font-awesome-icon icon="fa-solid fa-list" /> CATEGORIAS</h6>
                </div>
              </div>
            </div>
            <ul>
              <MenuItem
                v-for="category in categories"
                :category="category"
                :key="category.id"
                @category-click="handleCategoryClick"
              ></MenuItem>
            </ul>
          </div>
        </div>
        <div class="col-12 col-lg-6 col-xs-12">
          <div class="content" ref="content">
            <!-- Aquí colocas el contenido principal -->
            <!-- buscado desktop -->
            <div class="container d-none d-sm-block">
              <div class="row">
                <div class="col-12">
                  <SearchInputComponent
                    @search_kword="SearchOnMiTienda"
                    @clear_search="ClearSearch"
                    :activeTab="activeTab"
                  />
                </div>
              </div>
            </div>
            <!-- buscado desktop -->
            <!-- contendio -->
            <!-- TABS -->
            <div class="container mt-4">
              <div class="row">
                <div class="col-12">
                  <ul class="nav nav-tabs">
                    <li class="nav-item">
                      <button
                        class="nav-link"
                        :class="{ active: activeTab === 0 }"
                        data-bs-toggle="tab"
                        data-bs-target="#tab-1"
                        @click="activeTab = 0"
                      >
                        <font-awesome-icon icon="fa-solid fa-store" /> Tiendas
                      </button>
                    </li>
                    <li class="nav-item">
                      <button
                        class="nav-link"
                        :class="{ active: activeTab === 1 }"
                        data-bs-toggle="tab"
                        data-bs-target="#tab-2"
                        @click="activeTab = 1"
                      >
                        <font-awesome-icon icon="fa-solid fa-box" /> Productos
                        <span style="font-size: 11px">(EXPLORAR)</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- TABS -->
            <!-- MAIN -->
            <!-- TIENDAS -->
            <div class="contenido_tiendas" v-if="activeTab == 0">
              <ContentMainTiendasComponent
                v-if="view_display == 'content_main_tiendas'"
              />
              <SearchTiendasContentComponent
                v-if="view_display == 'search_content_tiendas'"
                :kword="search_kword"
              />
              <TiendasPorCategoriasComponent
                v-if="view_display == 'content_main_tiendas_por_categorias'"
                :category="selectedCategoryCode"
              />
            </div>
            <!-- TIENDAS -->

            <!-- PRODUCTS -->
            <div class="contenido_productos" v-if="activeTab == 1">
              <ContentMainProductsComponent
                v-if="view_display == 'content_main_products'"
              />
              <SearchProductsContentComponent
                v-if="view_display == 'search_content_products'"
                :kword="search_kword"
              />
            </div>
            <!-- PRODUCTS -->
            <!-- MAIN -->
            <!-- contendio -->
          </div>
        </div>
        <!-- Barra lateral derecha -->
        <div class="col-3 col-lg-3 d-none d-sm-block">
          <div class="sidebar-right" ref="sidebarRight">
            <!-- Contenido de la barra lateral derecha -->
            <div class="container">
              <div class="row">
                <div class="col-12">
                  <div class="card shadow">
                    <div class="card-body">
                      <h6 class="card-title ubi_title">
                        <font-awesome-icon icon="fa-solid fa-location-dot" /> Mi Ubicacion
                      </h6>
                      <div class="border-top"></div>
                      <div class="card-text">
                        <span class="ubi_span" v-if="Object.keys(user_city).length > 0">
                          {{ user_city.city }}, {{ user_city.state }} ,
                          {{ user_city.country_code }}, {{ user_city.postcode }} <br />
                          <span class="barrio"> {{ user_city.suburb }}</span>
                          <span class="d-flex justify-content-end">
                            <a
                              data-bs-toggle="modal"
                              data-bs-target="#miUbicacionModal"
                              @click="openMiUbicacion = true"
                              class="ubi_link"
                            >
                              <br />
                              <font-awesome-icon icon="fa-solid fa-pencil" /> cambiar
                            </a></span
                          >
                        </span>
                        <span class="ubi_span" v-if="Object.keys(user_city).length === 0">
                          Sin ubicacion
                          <span class="d-flex justify-content-end">
                            <a
                              data-bs-toggle="modal"
                              data-bs-target="#miUbicacionModal"
                              @click="openMiUbicacion = true"
                              class="ubi_link"
                            >
                              <br />
                              <font-awesome-icon icon="fa-solid fa-pencil" /> cambiar
                            </a></span
                          >
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- MODALES -->
    <!-- MODAL MI UBICACION -->

    <!-- Modal -->
    <div
      class="modal fade"
      id="miUbicacionModal"
      tabindex="-1"
      aria-labelledby="miUbicacionModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg modal-dialog-scrollable modal-fullscreen-md-down">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="miUbicacionModalLabel">
              <font-awesome-icon icon="fa-solid fa-location-dot" /> Obtener Ubicacion.
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="openMiUbicacion = false"
            ></button>
          </div>
          <div class="modal-body">
            <MiUbicacionComponent v-if="openMiUbicacion == true" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import MenuItem from "../../src/components/mitienda/MenuItem.vue";
import SearchInputComponent from "../components/mitienda/Home/SearchInputComponent.vue";
import MiUbicacionComponent from "../components/mitienda/Home/MiUbicacionComponent.vue";
import ContentMainTiendasComponent from "../components/mitienda/Home/content_main/ContentMainTiendasComponent.vue";
import ContentMainProductsComponent from "../components/mitienda/Home/content_main/ContentMainProductsComponent.vue";
import SearchMainComponent from "../components/mitienda/Home/content_main/SearchMainComponent.vue";
import SearchTiendasContentComponent from "../components/mitienda/Home/content_main/searchs/SearchTiendasContentComponent.vue";
import SearchProductsContentComponent from "../components/mitienda/Home/content_main/searchs/SearchProductsContentComponent.vue";
import TiendasPorCategoriasComponent from "../components/mitienda/Home/content_main/content_tiendas/TiendasPorCategoriasComponent.vue";
export default {
  name: "Home",

  components: {
    MenuItem,
    SearchInputComponent,
    MiUbicacionComponent,
    ContentMainTiendasComponent,
    SearchMainComponent,
    SearchTiendasContentComponent,
    SearchProductsContentComponent,
    ContentMainProductsComponent,
    TiendasPorCategoriasComponent,
  },

  data() {
    return {
      categories: [],
      myPosition: [],
      openMiUbicacion: false,
      geoData: {
        pais: "",
        region: "",
        subregion: "",
        ciudad: "",
        barrio: "",
        lat: 0,
        lng: 0,
      },
      address: "",
      marker: null,
      map: null,
      view_display: "content_main_tiendas",
      search_kword: null,
      activeTab: 0,
      selectedCategoryCode: 0,
    };
  },
  mounted() {
    this.ObtenerLanLgnDelNavegador();
    this.GetCategoriesOfStores();
  },

  computed: {
    ...mapState("tienda", ["tienda", "mitienda"]),
    ...mapState("user", ["user_store", "user_latLng", "user_city"]),
  },

  watch: {
    activeTab(value) {
      if (value == 0) {
        this.view_display = "content_main_tiendas";
      }
      if (value == 1) {
        this.view_display = "content_main_products";
      }
    },
  },

  methods: {
    ...mapMutations("cart", ["ClearCart"]),
    ...mapMutations("user", ["AddUserlatLng", "AddUserCity"]),

    SearchOnMiTienda(value) {
      /* si estoy buscando tiendas (activeTab:0) */
      if (value.activeTab == 0) {
        this.view_display = "search_content_tiendas";
        this.activeTab = value.activeTab;
        this.search_kword = value.kword;
      }
      if (value.activeTab == 1) {
        this.view_display = "search_content_products";
        this.activeTab = value.activeTab;
        this.search_kword = value.kword;
      }
    },
    ClearSearch(value) {
      console.log("HomeView_ClearSearch");
      console.log(value);
      this.view_display = value.vista;
      this.activeTab = value.activeTab;
    },

    InicioMobile() {
      this.view_display = "content_main_tiendas";
      this.cerrarOffcanvas();
    },

    cerrarOffcanvas() {
      const offcanvas = document.querySelector(".offcanvas.show");
      if (offcanvas) {
        const btn = offcanvas.querySelector('[data-bs-dismiss="offcanvas"]');
        if (btn) {
          btn.click();
        }
      }
    },

    handleCategoryClick(category) {
      this.selectedCategoryCode = category;
      console.log(this.selectedCategoryCode);
      this.view_display = "content_main_tiendas_por_categorias";
      this.cerrarOffcanvas();
    },

    GetCategoriesOfStores() {
      axios
        .get(this.server + "/api/v1/tiendas/categories/list/mptt/")
        .then((response) => {
          console.log(response.data.results);
          this.categories = response.data.results;
        })
        .catch((error) => {
          console.log(error);
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
          console.log(response.data.address);
          localStorage.setItem("city", response.data.address.city);
          localStorage.setItem("state", response.data.address.state);
          localStorage.setItem("country_code", response.data.address.country_code);
          localStorage.setItem("postcode", response.data.address.postcode);
          localStorage.setItem("suburb", response.data.address.suburb);
          let ubi_data = {
            city: localStorage.getItem("city"),
            state: localStorage.getItem("state"),
            country_code: localStorage.getItem("country_code"),
            postcode: localStorage.getItem("postcode"),
            suburb: localStorage.getItem("suburb"),
          };
          this.AddUserCity(ubi_data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    ObtenerLanLgnDelNavegador() {
      if (
        localStorage.getItem("setLocation") != 1 ||
        !localStorage.getItem("setLocation")
      ) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.ShowPosition);
        } else {
          console.log("rechazo geo");
          x.innerHTML = "Geolocation is not supported by this browser.";
        }
      } else {
        let ubi_data = {
          city: localStorage.getItem("city"),
          state: localStorage.getItem("state"),
          country_code: localStorage.getItem("country_code"),
          postcode: localStorage.getItem("postcode"),
          suburb: localStorage.getItem("suburb"),
        };
        this.AddUserCity(ubi_data);
        let latLng_user = {
          lat: localStorage.getItem("lat"),
          lng: localStorage.getItem("lng"),
        };
        this.AddUserlatLng(latLng_user);
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
      localStorage.setItem("lat", position.coords.latitude);
      localStorage.setItem("lng", position.coords.longitude);
      localStorage.setItem("setLocation", 1);
      let data = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      this.AddUserlatLng(data);
      this.Reverse();
    },
  },
};
</script>

<style scoped>
.HomeView {
  background-color: #f0f2f5;
}

.sidebar {
  height: 100vh;
  overflow-y: scroll;
  padding-top: 80px !important;
  background-color: #ffffff !important;
}

.content {
  height: 100vh;
  overflow-y: scroll;
  padding-top: 80px !important;
}

.sidebar-right {
  height: 100vh;
  overflow-y: scroll;
  padding-top: 80px !important;
}
.ubi_title {
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
}

.ubi_span {
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
}
.ubi_link {
  font-size: 12px;
  color: blue !important;
}
.barrio {
  text-decoration: none !important;
  font-weight: 300 !important;
}

@media (max-width: 768px) {
  .barra_exploracion_movil {
    height: 100px !important;
    background-color: ghostwhite;
    margin-top: 48px !important;
    position: fixed;
    top: 0;
    width: 100%;
    background-color: #fff;
    z-index: 1000;

    /* Aquí puedes agregar cualquier otra propiedad CSS que desees */
  }

  .ul_container {
    padding: 0px !important;
    margin: 0px !important;
  }
  .menu_mobile {
    padding-left: 0px !important;
  }
  .content {
    margin-top: 60px !important;
  }

  .ubi_span {
    font-size: 11px;
    font-weight: 500;
    text-transform: uppercase;
  }
  .barrio {
    font-size: 10px !important;
    text-decoration: none !important;
    font-weight: 300 !important;
  }
}
</style>
