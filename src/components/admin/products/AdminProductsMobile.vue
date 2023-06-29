<template>
  <div class="AdminProductsMobile">
    <div>
      <v-navigation-drawer v-model="drawer" absolute temporary class="navigation_menu">
        <div class="container menu_mobile">
          <div class="row">
            <div class="col-12 p-2 d-flex justify-content-end btn_close_container">
              <button class="btn btn-outline-secondary" @click.stop="drawer = !drawer">
                <font-awesome-icon icon="fa-solid fa-xmark" />
              </button>
            </div>
            <div class="col-12 btn_create_cate_container d-flex justify-content-center">
              <button
                class="btn btn-outline-success btn_create_cate"
                data-bs-toggle="modal"
                data-bs-target="#modalCreateCategoria"
                @click="GetCategoriesSinMptt()"
              >
                <font-awesome-icon icon="fa-solid fa-circle-plus" /> CREAR CATEGORIA
              </button>
            </div>
            <div class="col-12 border-bottom pb-2"></div>
          </div>
          <div class="ul_container pt-2">
            <div class="row"></div>
            <ul>
              <CategoriesMenuItems
                v-for="category in categories"
                :category="category"
                :key="category.id"
                @category-click="handleCategoryClick"
                @category-delete="RefreshCategory"
              ></CategoriesMenuItems>
            </ul>
          </div>
        </div>
      </v-navigation-drawer>

      <div class="container barra_mobile d-block d-sm-none pt-3">
        <div class="row text-end d-flex align-items-center">
          <div
            class="col-6 col-xs-6 d-flex justify-content-center"
            style="font-size: 12px"
          >
            CREE O EXPLORE LAS CATEGORIAS DE SU TIENDA
          </div>
          <div
            class="col-2 col-xs-2 d-flex justify-content-end"
            style="font-size: 20px"
          ></div>
          <div class="col-4 col-xs-4 d-flex justify-content-end">
            <button class="btn btn-outline-secondary" @click.stop="drawer = !drawer">
              <font-awesome-icon icon="fa-solid fa-bars" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- CONTENT -->
    <div class="content_products">
      <div class="topBarNav" v-if="ShowOnTercerComponent != 'listProducts'">
        <div class="container">
          <div class="row">
            <div class="col-10 d-flex align-items-center">
              <a class="atras" @click="VolverAproductos()">
                <font-awesome-icon icon="fa-solid fa-arrow-left" />
              </a>
              <div class="titulo_topBarNav">atras</div>
            </div>
          </div>
        </div>
      </div>

      <div class="container mt-3">
        <div class="row" v-if="ShowOnTercerComponent == 'listProducts'">
          <div class="col-12 col-xs-12">
            <div id="section1" class="col-lg-12 col-md-12 col-sm-12">
              <ContentProducts
                :category_id="selectedCategoryCode"
                @product-emit="GetProductEmit"
                @vista-emit="GetVistaEmit"
              ></ContentProducts>
            </div>
          </div>
        </div>
        <div class="row" v-if="ShowOnTercerComponent == 'variations'">
          <VariationsComponents :product_prop="product" />
        </div>
        <div class="row" v-if="ShowOnTercerComponent == 'editProduct'">
          <EditProductComponentVue :product_prop="product" />
        </div>
      </div>
    </div>
    <!--  -->

    <!--  -->
    <!-- modales -->
    <!-- Modal  AGREGAR CATEGORIA-->
    <div
      class="modal fade"
      id="modalCreateCategoria"
      tabindex="-1"
      aria-labelledby="modalCreateCategoriaLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-fullscreen-md-down">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Crear Categoria</h1>
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
                <div class="col-12 col-sm-12">
                  Agregar categoria principal
                  <form>
                    <div class="form-group">
                      <label for="category-select">Categoría Padre</label>
                      <select
                        class="form-select"
                        id="category-select"
                        @change="onCategoryChange($event)"
                      >
                        <option value="" selected>Ninguna</option>
                        <option
                          v-for="category in categoriesNoMptt"
                          :key="category.id"
                          :value="category.id"
                        >
                          {{ category.name }}
                        </option>
                      </select>
                    </div>

                    <div class="mb-3">
                      <label for="name" class="form-label">Nombre de la categoria</label>
                      <input
                        type="input"
                        class="form-control"
                        id="name"
                        placeholder="Nombre de la categoria"
                        v-model="createCategoria_name"
                      />
                    </div>
                    <div class="form-check form-switch">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                        v-model="categoryFeatured"
                      />
                      <label class="form-check-label" for="flexSwitchCheckDefault"
                        >Destacada</label
                      >
                      <br />
                      <span style="font-size: 12px"
                        >Al destacar una categoria, aparecera en la portada de la
                        tienda.</span
                      >
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              @click="CreateCategorie"
            >
              Crear Categoria
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal  AGREGAR CATEGORIA-->
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import CategoriesMenuItems from "../products/CategoriesMenuItems.vue";
import ContentProducts from "../products/ContentProducts.vue";
import VariationsComponents from "../products/VariationsComponents.vue";
import EditProductComponentVue from "./EditProductComponent.vue";

export default {
  name: "AdminProductsMobile",
  components: {
    CategoriesMenuItems,
    ContentProducts,
    VariationsComponents,
    EditProductComponentVue,
  },

  data() {
    return {
      drawer: null,
      ShowOnTercerComponent: "listProducts",
      categories: [],
      categoriesNoMptt: [],
      selectedCategoryCode: 0,
      createCategoria_name: null,
      createCategoria_parent: "",
      categoryFeatured: false,
      product: [],
      vista: "products",
    };
  },
  computed: {
    ...mapState("user", ["mitienda"]),
  },
  mounted() {
    this.GetCategories();
  },
  methods: {
    VolverAproductos() {
      console.log(this.selectedCategoryCode);
      this.ShowOnTercerComponent = "listProducts";
    },
    ClearModalCreteCategorie() {
      this.createCategoria_name = null;
      this.createCategoria_parent = "";
    },

    CreateCategorie() {
      const data = new FormData();
      data.append("name", this.createCategoria_name);
      data.append("parent", this.createCategoria_parent);
      data.append("tienda", this.mitienda[0].id);
      data.append("featured", this.categoryFeatured);
      axios
        .post(this.server + "/api/v1/admin/categories/create", data, {
          headers: {
            Authorization: localStorage.getItem("access"),
          },
        })
        .then((response) => {
          console.log(response);
          this.GetCategories();
          this.$swal.fire(
            "Categoria Creada!",
            "Se ha creado una nueva categoria.",
            "success"
          );
          this.GetCategories();
          this.ClearModalCreteCategorie();
        })
        .catch((error) => {
          console.log(error);
          this.$swal.fire("Error!", "se ha producido un error.", "error");
        });
    },

    GetProductEmit(product) {
      this.product = product;
      console.log("GetProductEmit");
      console.log(this.product);
    },
    GetVistaEmit(vista) {
      this.ShowOnTercerComponent = vista;
    },

    onCategoryChange(event) {
      console.log("event");
      console.log(event.target.value);
      let categoryId = event.target.value;
      if (categoryId === "") {
        categoryId = "";
      }
      // Llama a la función que manejará el ID de la categoría seleccionada
      this.handleCategorySelection(categoryId);
    },
    handleCategorySelection(categoryId) {
      // Hacer algo con el ID de la categoría seleccionada, por ejemplo:
      console.log("Categoría seleccionada:", categoryId);
      this.createCategoria_parent = categoryId;
    },

    handleCategoryClick(categoryId) {
      console.log("handleCategoryClick");
      console.log(this.drawer);
      this.selectedCategoryCode = categoryId;
      this.drawer = false;
      this.ShowOnTercerComponent = "listProducts";
    },
    RefreshCategory() {
      console.log("se necesita refresh");
      this.GetCategories();
    },

    GetCategories() {
      axios
        .get(
          this.server +
            "/api/v1/admin/categories/list/mptt/?tienda=" +
            this.mitienda[0].id,
          {
            headers: {
              Authorization: localStorage.getItem("access"),
            },
          }
        )
        .then((response) => {
          console.log(response.data.results);
          this.categories = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    GetCategoriesSinMptt() {
      axios
        .get(this.server + "/api/v1/admin/categories/list/", {
          headers: {
            Authorization: localStorage.getItem("access"),
          },
          params: {
            tienda: this.mitienda[0].id,
          },
        })
        .then((response) => {
          console.log(response.data.results);
          this.categoriesNoMptt = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.AdminProductsMobile {
  margin-top: 62px !important;
}
.btn_create_cate_container {
  margin-top: 150px !important;
  font-size: 12px !important;
}
.btn_create_cate {
}
.ul_container {
  padding-left: 0px !important;
  margin-left: 0px !important;
}
.navigation_menu {
  padding-left: 0px !important;
  background-color: #f5f5f5;
}
.volver_a_prod_contain {
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
}
.topBarNav {
  height: 40px;
  background-color: #ffffff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 10px !important;
}
.atras {
  font-size: 24px;
  color: #000000;
  padding-right: 12px;
  padding-left: 10px;
  transition: all 0.3s ease-in-out;
  border-right: 1px solid gray;
}
.atras:hover {
  background-color: #e5e5e5;
}
.titulo_topBarNav {
  font-size: 12px;
  padding-left: 5px !important;
  text-transform: uppercase !important;
}

@media (max-width: 768px) {
  .barra_mobile {
    height: 60px;
    background-color: #f5f5f5;
    width: 100% !important;
    margin-top: 53px !important;
    position: fixed;
    top: 0;
    z-index: 1000;
  }
  .topBarNav {
    height: 40px;
    background-color: #ffffff;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  }
  .content_products {
    margin-top: 120px;
  }
  .btn_close_container{
    margin-top: 110px !important;
  }
  .btn_create_cate_container {
    margin-top: 5px !important;

  }
  .btn_create_cate {
    font-size: 14px !important;
    font-weight: 500;
  }
}
</style>
