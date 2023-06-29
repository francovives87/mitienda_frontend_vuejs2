<template>
  <div class="AdminProductsDesktop">
    <div class="row">
      <div class="col-lg-3 sidebar" style="height: 100vh; overflow: auto">
        <!-- Aquí va el contenido de la barra lateral izquierda -->
        <div class="container-fluid">
          <div class="row">
            <div class="col-12 d-flex justify-content-center">
              <button
                class="btn btn-outline-success btn_crear_cate"
                data-bs-toggle="modal"
                data-bs-target="#modalCreateCategoria"
                @click="GetCategoriesSinMptt()"
              >
                
                <font-awesome-icon icon="fa-solid fa-circle-plus" /> CREAR CATEGORIA
              </button>
            </div>
          </div>
        </div>
        <div class="lista_categorias" style="margin-top: 20px">
          <div
            class="title_lista_categorias"
            style="margin-bottom: 10px; font-weight: bold"
          >
            Categorias
          </div>
          <ul style="list-style-type: none; padding: 0">
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
      <div class="col-lg-6" style="max-height: 100vh; overflow: auto">
        <!-- Aquí va el contenido principal -->
        <div class="container-fluid">
          <div class="row">
            <div id="section1" class="col-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <ContentProducts
                :category_id="selectedCategoryCode"
                @product-emit="GetProductEmit"
                @vista-emit="GetVistaEmit"
              ></ContentProducts>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 sidebar" style="max-height: 100vh; overflow: auto">
        <!-- Aquí va el contenido de la barra lateral derecha -->

        <NoProductSelectedComponent
          v-if="ShowOnTercerComponent == null"
        ></NoProductSelectedComponent>
        <VariationsComponents
          v-if="ShowOnTercerComponent == 'variations'"
          :product_prop="product"
        ></VariationsComponents>
        <EditProductComponent
          v-if="ShowOnTercerComponent == 'editProduct'"
          :product_prop="product"
        ></EditProductComponent>
      </div>
    </div>
    <!-- modales -->
    <!-- Modal  AGREGAR CATEGORIA-->
    <div
      class="modal fade"
      id="modalCreateCategoria"
      tabindex="-1"
      aria-labelledby="modalCreateCategoriaLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
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
              Cerrar
            </button>
            <button type="button" class="btn btn-primary" @click="CreateCategorie">
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
import NoProductSelectedComponent from "../products/NoProductSelectedComponent.vue";
import EditProductComponent from "../products/EditProductComponent.vue";
export default {
  name: "AdminProductsDesktop",

  components: {
    CategoriesMenuItems,
    ContentProducts,
    VariationsComponents,
    NoProductSelectedComponent,
    EditProductComponent,
  },

  data() {
    return {
      ShowOnTercerComponent: null,
      categories: [],
      categoriesNoMptt: [],
      selectedCategoryCode: 0,
      createCategoria_name: null,
      createCategoria_parent: "",
      categoryFeatured: false,
      product: [],
    };
  },

  computed: {
    ...mapState("user", ["mitienda"]),
  },
  mounted() {
    this.GetCategories();
  },

  methods: {
    GetProductEmit(product) {
      this.product = product;
      console.log("GetProductEmit");
      console.log(this.product);
    },
    GetVistaEmit(vista) {
      this.ShowOnTercerComponent = vista;
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
      this.selectedCategoryCode = categoryId;
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
.AdminProductsDesktop {
  margin-top: 53px !important;
}
.sidebar {
  background-color: #f5f5f5;
  padding: 20px;
}
.z-index-top {
  z-index: 9999;
}
.modal-backdrop {
  backdrop-filter: none;
}

.lista_categorias {
  margin-top: 20px;
}

.title_lista_categorias {
  margin-bottom: 10px;
  font-weight: bold;
}

.lista_categorias ul {
  list-style-type: none;
  padding: 0;
}
.btn_crear_cate{
  font-size: 14px;
  font-weight: 500;
}
</style>
