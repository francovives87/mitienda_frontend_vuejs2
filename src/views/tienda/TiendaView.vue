<template>
  <div class="TiendaView">
    <LoadingComponent v-if="loaded == false" />
    <div class="tienda" v-if="loaded == true">
      <!-- OFFCANVAS -->
      <!-- OffCanvas Categorias -->
      <div
        class="offcanvas offcanvas-start"
        tabindex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasExampleLabel">
            <font-awesome-icon icon="fa-solid fa-bars" /> Categorias de {{ tienda.name }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <div>
            Explorer todas las catagorias que tiene
            <span style="font-weight: 900 !important"> {{ tienda.name }} </span> para
            encontrar lo que busca.
          </div>
          <div class="mt-3">
            <ul>
              <li>
                <a @click="Inicio()"
                  ><span class="inicio">
                    <font-awesome-icon icon="fa-solid fa-house" /> INICIO</span
                  >
                </a>
              </li>
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
      <!-- OffCanvas Categorias -->
      <!-- OffCanvas Carrito -->
      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasCarrito"
        aria-labelledby="offcanvasCarritoLabel"
        style="z-index: 1050 !important"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasCarritoLabel">
            <font-awesome-icon icon="fa-solid fa-cart-shopping" /> Carrito
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <div class="row">
            <div class="col-12 ordenar_button_container d-flex justify-content-end">
              <button
                class="btn btn-success ordenar_button"
                data-bs-toggle="modal"
                data-bs-target="#modalOrdenar"
                @click="Ordenar()"
                :disabled="cart.length == 0"
              >
                <font-awesome-icon icon="fa-solid fa-bag-shopping" />
                <span class="ordenar_button_text"> ORDENAR </span>
              </button>
              <button
                class="btn btn btn-outline-secondary ordenar_clear_button"
                @click="LimpiarCarrito()"
              >
                <font-awesome-icon icon="fa-solid fa-trash-can" />
              </button>
            </div>
          </div>
          <TiendaCartComponent />
        </div>
      </div>
      <!-- OffCanvas Carrito -->

      <!-- OFFCANVAS -->

      <div class="store" v-if="not_found == false">
        <div class="top_bar_sticky p-1">
          <div class="container">
            <div class="row d-flex align-items-center">
              <div class="col-8 col-xs-8 col-lg-4">
                <span class="tienda_title"> {{ tienda.name }} {{ change_domain }}</span>
                <span class="edit_name_tienda" v-if="isMitienda == true">
                  <a
                    class="edit_name_tienda"
                    data-bs-toggle="modal"
                    data-bs-target="#editTiendaName"
                  >
                    <font-awesome-icon icon="fa-solid fa-pencil" /> editar nombre
                  </a></span
                >
              </div>

              <div class="mas_info_container col-4 col-xs-4 col-lg-8 p-1">
                <div>
                  <button
                    type="button"
                    class="btn btn-outline-secondary button_top_bar"
                    data-bs-toggle="modal"
                    data-bs-target="#infoStoreModal"
                  >
                    <font-awesome-icon icon="fa-solid fa-circle-info" />
                  </button>
                </div>
                <div class="d-flex align-items-center">
                  <button
                    class="btn btn-outline-secondary button_top_bar position-relative"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasCarrito"
                    aria-controls="offcanvasCarrito"
                  >
                    <font-awesome-icon icon="fa-solid fa-cart-shopping" />
                    <span
                      class="position-absolute top-100 end-1 translate-middle bg-green text-white rounded-circle px-1"
                      style="background-color: green !important; font-size: 13px"
                      >{{ count }}</span
                    >
                  </button>
                </div>

                <div>
                  <button
                    type="button"
                    class="btn btn-outline-secondary button_top_bar d-xl-none d-xxl-block"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasExample"
                    aria-controls="offcanvasExample"
                  >
                    <font-awesome-icon icon="fa-solid fa-bars" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="profile-cover">
          <img :src="tienda.tienda_images[0].portada" alt="Cover Image" />
          <div class="carousel-edit-button">
            <button
              class="btn btn-light"
              v-if="isMitienda == true"
              data-bs-toggle="modal"
              data-bs-target="#modalEditPortada"
            >
              <font-awesome-icon icon="fa-solid fa-image" />
            </button>
          </div>

          <div class="profile-pic">
            <img :src="tienda.tienda_images[0].logo" alt="Profile Image" />
          </div>
          <div class="top_bar">
            <div class="container">
              <div class="row">
                <div class="col-2 col-lg-2 col-xs-2 button_editar_perfil">
                  <button
                    class="btn btn-dark"
                    v-if="isMitienda == true"
                    data-bs-toggle="modal"
                    data-bs-target="#modalEditLogo"
                  >
                    <font-awesome-icon icon="fa-solid fa-image" />
                  </button>
                </div>
                <div class="col-6 col-lg-8 col-xs-6">
                  <div class="container">
                    <div class="row d-flex justify-content-end align-items-center">
                      <div class="col-2 col-xs-2">
                        <div class="info_item_avg">
                          <div class="rating_container">
                            <v-icon class="dot">mdi-star</v-icon>
                            &nbsp;
                            <span
                              class="rating_number"
                              v-if="tienda.average.rating__avg > 0"
                              >{{
                                (
                                  Math.round(tienda.average.rating__avg * 100) / 100
                                ).toFixed(1)
                              }}</span
                            >
                            <span
                              class="rating_number"
                              v-if="tienda.average.rating__avg == null"
                              >0</span
                            >
                          </div>
                        </div>
                      </div>

                      <div class="col-3 col-xs-3 col-lg-1 d-block d-sm-none">
                        <button
                          class="btn btn-outline-secondary btn-sm"
                          @click="Compartir()"
                        >
                          <font-awesome-icon
                            class="icon_net"
                            icon="fa-solid fa-share-nodes"
                          />
                        </button>
                      </div>
                      <div class="col-3 col-xs-3 col-lg-1">
                        <button
                          class="btn btn-outline-secondary btn-sm"
                          @click="SendWhtasApp()"
                        >
                          <font-awesome-icon
                            style="color: green"
                            icon="fa-brands fa-whatsapp"
                            class="icon_net"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mas_info_container col-6 col-lg-3 col-xs-6 p-1"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- CATEGORIAS DESTACADAS -->
        <!-- CATEGORIAS DESTACADAS -->

        <!-- CONTENT -->
        <div class="container-fluid content">
          <div class="row">
            <div class="col-2 p-0 overflow-y-auto d-none d-sm-block">
              <!-- Aquí va la barra lateral izquierda -->
              <div class="row">
                <div class="ul_container">
                  <div class="row">
                    <div class="col-12 p-2 d-flex justify-content-end"></div>
                  </div>
                  <ul>
                    <li>
                      <a @click="Inicio()"
                        ><span class="inicio">
                          <font-awesome-icon icon="fa-solid fa-house" /> INICIO</span
                        >
                      </a>
                    </li>
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
            <div class="col col-xs-12 p-0 overflow-y-auto" ref="scrollContainer">
              <!-- Aquí va el contenido -->

              <div class="container">
                <div class="row">
                  <div class="col-12 search_container d-flex justify-content-end">
                    <form @submit.prevent="SearchOnStore()">
                      <div class="search-box">
                        <input
                          type="text"
                          class="form-control search-input"
                          :placeholder="'Buscar en ' + tienda.name"
                          v-model="search_kword"
                        />
                        <button
                          type="submit"
                          class="btn btn-link search-btn"
                          @click="SearchOnStore()"
                        >
                          <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <TiendaContent
                v-if="tienda.id > 0 && display_view == 'content'"
                @product-selected="handleProductSelected"
              />
              <ProductViewComponent
                v-if="display_view == 'product_view'"
                :product="product"
                @display="ShowContent"
              />
              <TiendaCategoriesContent
                v-if="display_view == 'categorie_content_view'"
                :categoria="selectedCategory"
                @categorie-product-selected="handleCategorieProductSelected"
              />
              <!-- search -->
              <TiendaSearchComponent
                :search="search_kword"
                v-if="display_view == 'search_view'"
                @display="ShowContent"
                @search-product-selected="handleProductSelected"
              />
            </div>
          </div>
        </div>
        <!-- CONTENT -->

        <!-- Explorer -->
      </div>
      <div class="container" v-if="not_found == true">
        <div class="row">
          <div class="col-12">Tienda no encontrada.</div>
        </div>
      </div>
      <!-- MODALES -->

      <!-- Modal Info de la tienda -->

      <!-- Modal -->
      <div
        class="modal fade"
        id="infoStoreModal"
        tabindex="-1"
        aria-labelledby="infoStoreModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-scrollable modal-fullscreen-md-down">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="infoStoreModalLabel">
                <font-awesome-icon icon="fa-solid fa-circle-info" /> Informacion de
                {{ tienda.name }}
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div>
                <ul class="nav nav-tabs">
                  <li class="nav-item">
                    <button
                      class="nav-link"
                      :class="{ active: activeTab === 0 }"
                      data-bs-toggle="tab"
                      data-bs-target="#tab-1"
                      @click="activeTab = 0"
                    >
                      <font-awesome-icon icon="fa-solid fa-store" /> Tienda
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
                      <font-awesome-icon icon="fa-solid fa-location-dot" /> Ubicacion
                    </button>
                  </li>
                  <li class="nav-item">
                    <button
                      class="nav-link"
                      :class="{ active: activeTab === 2 }"
                      data-bs-toggle="tab"
                      data-bs-target="#tab-3"
                      @click="activeTab = 2"
                    >
                      <font-awesome-icon icon="fa-solid fa-clock" /> Horarios
                    </button>
                  </li>
                </ul>

                <div class="tab-content mt-2">
                  <InfoTienda v-if="activeTab == 0" />
                  <InfoUbicacion v-if="activeTab == 1" />
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                @click="activeTab = 0"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Editar nombre -->
      <div
        class="modal fade"
        id="editTiendaName"
        tabindex="-1"
        aria-labelledby="editTiendaNameLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-fullscreen-md-down modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="editTiendaNameLabel">
                Editar nombre de la tienda
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="container">
                <div class="row">
                  <div class="col-12 card p-2 mb-3">
                    Nombre actual:
                    <span style="font-weight: 700"> {{ tienda.name }} </span>
                  </div>
                  <div class="col-12 card p-2">
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label"
                        >Nombre nuevo:</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        v-model="editTiendaName"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Cerrar
              </button>
              <button
                type="button"
                class="btn btn-success"
                data-bs-dismiss="modal"
                @click="UpdateTiendaName()"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal editar Portada -->
      <div
        class="modal fade"
        id="modalEditPortada"
        tabindex="-1"
        aria-labelledby="modalEditPortadaLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-fullscreen-md-down modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="modalEditPortadaLabel">Editar Portada</h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                @click="clearFileInputPortada"
              ></button>
            </div>
            <div class="modal-body">
              <label for="editImagePortada" class="form-label">Selecionar imagen</label>
              <div class="mb-3">
                <input
                  type="file"
                  class="form-control"
                  name="editImagePortada"
                  id="editImagePortada"
                  ref="editImagePortada"
                  @change="onFileSelectedPortada"
                />

                <div class="col-12 col-sm-12">
                  <p>Imagen seleccionada:</p>
                  <img
                    :src="previewNewPortada"
                    alt=""
                    style="width: 150px; heigth: 150px"
                  />
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                @click="clearFileInputPortada"
              >
                Cerrar
              </button>
              <button
                type="button"
                class="btn btn-success"
                data-bs-dismiss="modal"
                @click="UpdatePortada()"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Editar Logo -->

      <div
        class="modal fade"
        id="modalEditLogo"
        tabindex="-1"
        aria-labelledby="modalEditLogoLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-fullscreen-md-down modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="modalEditLogoLabel">Editar Logo</h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                @click="clearFileInputLogo()"
              ></button>
            </div>
            <div class="modal-body">
              <label for="editImagePortada" class="form-label">Selecionar imagen</label>
              <div class="mb-3">
                <input
                  type="file"
                  class="form-control"
                  name="editImageLogo"
                  id="editImageLogo"
                  ref="editImageLogo"
                  @change="onFileSelectedLogo"
                />

                <div class="col-12 col-sm-12">
                  <p>Imagen seleccionada:</p>
                  <img :src="previewNewLogo" alt="" style="width: 150px; heigth: 150px" />
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                @click="clearFileInputLogo()"
              >
                Cerrar
              </button>
              <button
                type="button"
                class="btn btn-success"
                data-bs-dismiss="modal"
                @click="UpdateLogo()"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal ORDENAR-->
      <div
        class="modal fade"
        id="modalOrdenar"
        tabindex="-1"
        aria-labelledby="modalOrdenarLabel"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-dialog-scrollable modal-fullscreen-md-down modal-lg"
        >
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="modalOrdenarLabel">ORDENAR</h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <CheckOutEntryData
                v-if="checkout_view == 'entry_data'"
                @vista_checkout="ChangeVistaCheckOut"
              />
              <CheckOutOrder
                :user_data="user_data"
                v-if="checkout_view == 'finish_order'"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- MODALES -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapMutations } from "vuex";
import MenuItem from "../../components/tienda/MenuItem.vue";
import TiendaContent from "../../components/tienda/TiendaContent.vue";
import ProductViewComponent from "../../components/tienda/ProductViewComponent.vue";
import LoadingComponent from "../../components/mitienda/LoadingComponent.vue";
import TiendaCartComponent from "../../components/tienda/TiendaCartComponent.vue";
import CheckOutEntryData from "../../components/tienda/checkout/CheckOutEntryData.vue";
import CheckOutOrder from "../../components/tienda/checkout/CheckOutOrder.vue";
import InfoTienda from "../../components/tienda/informacion/InfoTienda.vue";
import InfoUbicacion from "../../components/tienda/informacion/InfoUbicacion.vue";
import TiendaCategoriesContent from "../../components/tienda/TiendaCategoriesContent.vue";
import TiendaSearchComponent from "../../components/tienda/search/TiendaSearchComponent.vue";

export default {
  name: "TiendaView",
  components: {
    MenuItem,
    TiendaContent,
    ProductViewComponent,
    LoadingComponent,
    TiendaCartComponent,
    CheckOutEntryData,
    CheckOutOrder,
    InfoTienda,
    InfoUbicacion,
    TiendaCategoriesContent,
    TiendaSearchComponent,
  },
  props: ["change_domain"],

  mounted() {
    this.GetTiendaByParam();
    window.addEventListener("scroll", this.handleScroll);
    this.ClearCart();
  },
  data() {
    return {
      not_found: false,
      display_view: "content",
      loaded: false,
      product: null,
      store: null,
      profileImage: "",
      value: "",
      categories: [],
      isMitienda: false,
      editTiendaName: "",
      previewNewPortada: "",
      editPortadaImage: "",
      previewNewLogo: "",
      editLogoImage: "",
      product_selected: "",
      checkout_view: "",
      user_data: {},
      activeTab: 0,
      selectedCategory: null,
      search_kword: null,
      domain_tienda: null,
    };
  },
  computed: {
    ...mapState("tienda", ["tienda"]),
    ...mapState("user", ["mitienda"]),
    ...mapState("cart", ["count", "cart"]),
  },

  watch: {
    product_selected(value) {
      console.log("watch_product_selected");
      console.log(value);
      this.display_view = "product_view";
      this.product = value;
    },
    display_view() {
      this.$nextTick(() => {
        this.$refs.scrollContainer.scrollTop = 0;
      });
    },
    change_domain(value) {
      console.log("change_domain");
      console.log(value);
      this.GetTiendaByParam();
    },
    $route(to, from) {
      const newPath = to.path.split("/")[1];
      const oldPath = from.path.split("/")[1];

      console.log(`Nuevo valor después de la barra: ${newPath}`);
      console.log(`Valor anterior después de la barra: ${oldPath}`);
      if (newPath !== oldPath) {
        this.GetTiendaByParam(); // Llama a tu función cuando el valor cambie
        this.display_view = "content";
      }

      // Realizar otras acciones según sea necesario...
    },
  },

  methods: {
    ...mapMutations("tienda", ["AddTienda"]),
    ...mapMutations("cart", ["ClearCart", "AddEnvio", "ClearTotal"]),
    ...mapMutations("user", ["AddMiTienda", "AddVisitorId"]),

    SearchOnStore() {
      this.display_view = "search_view";
    },

    LimpiarCarrito() {
      this.ClearCart();
      this.ClearTotal();
    },

    Inicio() {
      this.display_view = "content";
      this.cerrarOffcanvas();
    },

    ChangeVistaCheckOut(value) {
      console.log("ChangeVistaCheckOut");
      console.log(value);
      this.checkout_view = value.vista;
      this.user_data = value;
    },

    Ordenar() {
      this.cerrarOffcanvas();
      this.checkout_view = "entry_data";
    },

    handleProductSelected(product) {
      // O emitir un evento personalizado que se propagará hacia arriba
      console.log("handleProductSelected");
      this.product_selected = product;
      console.log(this.product_selected);
    },
    handleCategorieProductSelected(product) {
      console.log("handleCategorieProductSelected");
      this.product_selected = product;
      console.log(this.product_selected);
      this.$refs.scrollContainer.scrollTo(0, 0);
    },

    ShowContent(display) {
      this.display_view = display;
      this.$refs.scrollContainer.scrollTo(0, 0);
    },

    clearFileInputPortada() {
      this.$refs.editImagePortada.value = null;
      this.previewNewPortada = "";
    },

    onFileSelectedPortada(event) {
      console.log(event);
      this.editPortadaImage = event.target.files[0];
      let file = event.target.files[0];
      this.previewNewPortada = URL.createObjectURL(file);
    },

    clearFileInputLogo() {
      this.$refs.editImageLogo.value = null;
      this.previewNewLogo = "";
    },

    onFileSelectedLogo(event) {
      console.log(event);
      this.editLogoImage = event.target.files[0];
      let file = event.target.files[0];
      this.previewNewLogo = URL.createObjectURL(file);
    },

    UpdateLogo() {
      var data = new FormData();
      data.append("logo", this.editLogoImage);
      data.append("tienda", this.mitienda[0].id);
      console.log("UpdateLogo_data");
      console.log(data);
      axios
        .put(this.server + "/api/v1/admin/tienda/logo/update/", data, {
          headers: {
            Authorization: localStorage.getItem("access"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.$swal.fire(
            "Logo Actualizado!",
            "Se actualizo el logo de la tienda correctamente.",
            "success"
          );
          this.clearFileInputLogo();
          this.GetTiendaByParam();
        });
    },

    UpdatePortada() {
      var data = new FormData();
      data.append("portada", this.editPortadaImage);
      data.append("tienda", this.mitienda[0].id);
      console.log("UpdatePortada_data");
      console.log(data);
      axios
        .put(this.server + "/api/v1/admin/tienda/portada/update/", data, {
          headers: {
            Authorization: localStorage.getItem("access"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.$swal.fire(
            "Portada Actualizada!",
            "Se actualizo la imagen de portada correctamente.",
            "success"
          );
          this.clearFileInputPortada();
          this.GetTiendaByParam();
        });
    },

    UpdateTiendaName() {
      const data = {
        name: this.editTiendaName,
      };

      axios
        .put(
          this.server + "/api/v1/admin/tienda/name/update/" + this.mitienda[0].id,
          data,
          {
            headers: {
              Authorization: localStorage.getItem("access"),
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          this.$swal.fire(
            "Nombre Actualizado!",
            "Se ha cambiado correctamente el nombre de la tienda.",
            "success"
          );
          this.GetTiendaByParam();
          this.editTiendaName = "";
        })
        .catch((error) => {
          console.log(error);
        });
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

    EditCarousell() {
      console.log("EditCarousell");
    },

    handleCategoryClick(categoryId) {
      console.log("handleCategoryClick");
      this.selectedCategory = categoryId;
      console.log(this.selectedCategory);
      this.display_view = "categorie_content_view";
      this.cerrarOffcanvas();
    },

    GetCategories(store) {
      axios
        .get(this.server + "/api/v1/categories/list/", {
          params: {
            tienda: store.id,
          },
        })
        .then((response) => {
          console.log("GetCategories");
          this.categories = response.data.results;
          console.log(this.categories);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    CreateTiendaVisitor() {
      if (this.isMitienda == false) {
        if (localStorage.getItem("visitor")) {
          let data = {
            visitor: localStorage.getItem("visitor"),
            tienda: this.tienda.id,
          };
          axios
            .post(this.server + "/api/v1/store/visitor/create/", data)
            .then((response) => {
              console.log("CreateTiendaVisitor");
              console.log(response.data);
            })
            .catch((error) => {
              console.log(error);
              localStorage.removeItem("visitor");
              console.log("CreateVisitor");
              this.CreateVisitor();
            });
        }
      }
    },

    CreateVisitor() {
      axios
        .post(this.server + "/api/v1/user/visitor/create/")
        .then((response) => {
          console.log("CreateVisitor");
          console.log(response.data);
          localStorage.setItem("visitor", response.data.id);
          this.AddVisitorId(response.data.id);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    GetTiendaByParam() {
      console.log("GetTiendaByParam");

      this.domain_tienda = this.$route.params.name;

      console.log("domain");
      console.log(this.domain_tienda);
      console.log("prod");

      axios
        .get(this.server + "/api/v1.0/tienda/", {
          params: {
            domain: this.domain_tienda,
          },
        })
        .then((response) => {
          console.log("GetTiendaByParam");
          console.log(response.data.results[0]);
          if (response.data.results[0]) {
            this.store = response.data.results[0];
            this.AddTienda(this.store);
            this.GetCategories(this.store);
            if (this.mitienda.length > 0) {
              if (this.tienda.id === this.mitienda[0].id) {
                this.isMitienda = true;
              }
            }
            this.CreateTiendaVisitor();
            /* hay producto? */
            const url = new URL(window.location.href);

            // Obtener la cadena de consulta de la URL
            const queryString = url.search;

            // Crear un nuevo objeto URLSearchParams
            const searchParams = new URLSearchParams(queryString);

            // Acceder a los parámetros de la URL
            const producto = searchParams.get("producto");
            console.log("producto");
            console.log(producto);
            if (producto) {
              console.log("hay producto!");
              axios
                .get(this.server + "/api/v1/store/products/" + producto)
                .then((response) => {
                  this.product = response.data;
                  if (this.product) {
                    console.log("producto_db");
                    console.log(this.product);
                    this.display_view = "product_view";
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            }

            this.loaded = true;
          } else {
            this.not_found = true;
            this.loaded = true;
          }
        })
        .catch((error) => {
          console.log(error);
          this.not_found = true;
          this.loaded = true;
        });
    },

    SendWhtasApp() {
      if (this.tienda.store_settings[0].order_wp == true) {
        if (this.tienda.store_settings[0].wp_number) {
          let message = "Mitienda.app\n\n";
          message += "Hola tengo una consulta sobre su tienda.";
          let formattedMessage = encodeURIComponent(message);
          let whatsappNumber = this.tienda.store_settings[0].wp_number;
          const whatsappLink = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${formattedMessage}`;
          window.open(whatsappLink, "_self");
        } else {
          this.$swal.fire(
            "No hay WhatsApp configurado!",
            "El administrador de esta tienda aun no a configurado su numero de WhatsApp.",
            "info"
          );
        }
      } else {
        this.$swal.fire(
          "No hay WhatsApp configurado!",
          "El administrador de esta tienda, no recibe consultas u ordenes por WhatsApp.",
          "info"
        );
      }
    },
    Compartir() {
      if (navigator.share) {
        // Compartir es compatible
        navigator
          .share({
            title: this.tienda.name,
            text: "Echa un vistazo a esta tienda",
            url: "https://mitienda.app/" + this.tienda.domain,
          })
          .then(() => {
            console.log("Contenido compartido exitosamente");
          })
          .catch((error) => {
            console.error("Error al compartir:", error);
          });
      } else {
        // Compartir no es compatible, muestra una alternativa
        alert("La función de compartir no es compatible en este navegador.");
      }
    },
  },
};
</script>

<style scoped>
a:link {
  text-decoration: none;
  color: #000000;
}
a:visited {
  text-decoration: none;
  color: #000000;
}
a:hover {
  text-decoration: none;
  color: #000000;
}
a:active {
  text-decoration: none;
  color: #000000;
}

.inicio {
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 600;
}
.TiendaView {
  margin-top: 53px;
}
.carousel-edit-button {
  position: absolute;
  bottom: 60px;
  right: 150px;
}

.profile-cover {
  position: relative;
  margin-top: 100px !important;
}

.profile-cover img {
  width: 100%;
  height: 400px;
}

.profile-pic {
  position: absolute;
  left: 100px;
  bottom: -30px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  border: solid 2px #ffffff;
  background-color: #ffffff;
}

.profile-pic img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.top_bar {
  height: 48px;
  background-color: honeydew !important;
  padding-top: 2px !important;
  padding-bottom: 2px !important;
}
.btn-sm {
  padding: 0.5rem 1rem;
  margin-top: 0px !important;
}
.icon_net {
  font-size: 25px !important;
}

.button_editar_perfil {
  margin-left: 150px !important;
}
.rating {
  width: 100px !important;
}
.mas_info_container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.overflow-y-auto {
  overflow-y: auto;
  height: 100vh !important;
}
.content {
  margin-top: 60px !important;
}
.button_top_bar {
  margin-left: 2px !important;
}
.top_bar_sticky {
  margin-top: 53px !important;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #fff;
  z-index: 1000;
  /* Aquí puedes agregar cualquier otra propiedad CSS que desees */
}
.edit_name_tienda {
  margin-left: 4px !important;
  font-size: 12px;
  color: blue !important;
}
.tienda_title {
  text-transform: uppercase;
  font-size: 25px;
  font-weight: 500;
}
.info_item_avg {
  display: flex;
  align-items: center;
  justify-content: center;
}
.dot {
  height: 32px;
  width: 32px;
  background-color: #efefef;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid gold;
  color: orange !important;
}

.rating_container {
  margin-top: 5px;
  border-radius: 10% !important;
  width: 50px !important;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rating_number {
  padding-right: 3px;
  font-size: 18px !important;
  font-weight: 500;
}
.social_net {
  font-size: 26px !important;
  margin-left: 10px !important;
  border-right: 1px solid gray;
  border-left: 1px solid gray;
  padding: 0px 10px 0px 10px !important;
}

li {
  list-style: none;
}
.ordenar_button_container {
  background-color: #f5f5f5;
  padding: 10px 0px 10px 0px;
}
.ordenar_button {
  margin-right: 5px !important;
}
.ordenar_clear_button {
  margin-right: 20px !important;
}
.ordenar_button_text {
  font-weight: 600 !important;
}
.search_container {
  padding: 10px 0px 10px 0px;
}

.search-box {
  position: relative;
  display: inline-block;
  margin-right: 30px !important;
}

.search-input {
  width: 400px;
  height: 36px;
  border-radius: 18px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding-left: 16px;
}

.search-input:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5), 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-btn {
  position: absolute;
  top: 0;
  right: 0;
  height: 36px;
  width: 36px;
  border: none;
  border-radius: 18px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-btn:focus {
  outline: none;
}

.search-btn:hover {
  background-color: #f0f0f0;
}

@media (max-width: 768px) {
  .nav-item {
    font-size: 14px;
  }

  .carousel-edit-button {
    position: absolute;
    bottom: 50px;
    right: 10px;
  }
  .button_editar_perfil {
    margin-left: 100px !important;
  }

  .menu_mobile {
    margin-top: 52px !important;
  }
  .TiendaView {
    margin-top: 53px;
  }
  .top_bar {
    height: 40px;
    background-color: honeydew !important;
    padding-top: 2px !important;
    padding-bottom: 2px !important;
  }
  .btn-sm {
    padding: 0.3rem 0.5rem;
    margin-top: 0px !important;
  }

  .icon_net {
    font-size: 20px !important;
  }

  .profile-cover {
    position: relative;
    width: 100% !important;
    margin-top: 100px !important;
  }

  .profile-cover img {
    width: 100%;
    height: auto;
  }

  .profile-pic {
    position: absolute;
    left: 20px;
    bottom: -5px;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    border: solid 2px #ffffff;
    background-color: #ffffff !important;
  }

  .profile-pic img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .dot {
    height: 28px;
    width: 28px;
    background-color: #efefef;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid gold;
    color: orange !important;
  }

  .rating_container {
    margin-top: 5px;
    border-radius: 10% !important;
    width: 50px !important;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .rating_number {
    padding-right: 3px;
    font-size: 16px !important;
    font-weight: 500;
  }

  .content {
    margin-top: 10px !important;
  }
  .top_bar_sticky {
    margin-top: 53px !important;
    position: fixed;
    top: 0;
    width: 100%;
    background-color: #fff;
    z-index: 1000;
    /* Aquí puedes agregar cualquier otra propiedad CSS que desees */
  }
  .edit_name_tienda {
    margin-left: 1px !important;
    font-size: 12px;
    color: blue !important;
    display: block;
  }
  .tienda_title {
    text-transform: uppercase;
    font-size: 20px;
    font-weight: 500;
  }
  .social_net {
    font-size: 26px !important;
    margin-left: 10px !important;
  }
  .search_container {
    padding: 10px 0px 10px 0px !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
  }

  .search-box {
    position: relative;
    display: inline-block;
  }
  .search-input {
    width: 300px;
    height: 36px;
    border-radius: 18px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding-left: 16px;
  }

  .search-input:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5), 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .search-btn {
    position: absolute;
    top: 0;
    right: 0;
    height: 36px;
    width: 36px;
    border: none;
    border-radius: 18px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .search-btn:focus {
    outline: none;
  }

  .search-btn:hover {
    background-color: #f0f0f0;
  }
}
</style>
