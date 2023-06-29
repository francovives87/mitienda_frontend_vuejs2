<template>
  <div class="ContentProducts">
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-12 col-xs-12 title_contain mb-3" v-if="categorie.name">
          <span class="title_categoria"> {{ categorie.name }} </span>
        </div>
        <div class="col-5 col-lg-8 col-xs-5 card">
          <span class="info_crear_product"><font-awesome-icon icon="fa-solid fa-circle-info" /> Seleccione o cree una categoria para poder crear un producto </span>
        </div>
        <div class="col-7 col-lg-4 col-xs-7 d-flex justify-content-end">
          <button
            class="btn btn-outline-success btn_crear_product"
            data-bs-toggle="modal"
            data-bs-target="#ModalCreateProdcut"
            :disabled="!categorie.id"
          >
            <font-awesome-icon icon="fa-solid fa-circle-plus" /> CREAR PRODUCTO
          </button>
        </div>
      </div>
    </div>
    <div class="container products_contain">
      <div class="row">
        <div
          class="col-12 col-xs-12 card_col"
          v-for="(product, index) in products"
          :key="index"
        >
          <div class="card border-top border-bottom shadow mb-3">
            <div class="row g-0">
              <div class="col-3">
                <img :src="product.image" alt="" class="img_product" />
              </div>
              <div class="col-9">
                <div class="card-body">
                  <h5 class="card-title">{{ product.title }}</h5>
                  <div class="informacion mb-2" style="font-size: 12px !important">
                    <!-- PRECIO -->
                    <div class="container card mb-1" v-if="product.with_price == true">
                      <div class="row">
                        <div class="col-6">PRECIO: {{ product.price }}</div>
                        <div class="col-6">
                          EN OFERTA: <br />
                          <span v-if="product.in_offer_price > 0">{{
                            product.in_offer_price
                          }}</span>
                          <span v-if="product.in_offer_price == 0.0">SIN OFERTA</span>
                        </div>
                      </div>
                    </div>
                    <!-- STOCK -->
                    <div class="container card" v-if="product.with_stock == true">
                      <div class="row">
                        <div class="col-6">STOCK: HABILITADO</div>
                        <div class="col-6">
                          CANTIDAD: <br />
                          {{ product.stock }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-check form-switch mb-3">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDefault"
                      v-model="product.public"
                      @change="UpdatePublic(product)"
                    />
                    <label class="form-check-label" for="flexSwitchCheckDefault"
                      >Publicado</label
                    >
                  </div>
                  <div class="form-check form-switch mb-3">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDefault"
                      v-model="product.portada"
                      @change="UpdatePortada(product)"
                    />
                    <label class="form-check-label" for="flexSwitchCheckDefault"
                      >Destacado</label
                    >
                  </div>
                  <div class="dropdown d-flex justify-content-end">
                    <button
                      class="btn btn-outline-secondary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <font-awesome-icon icon="fa-solid fa-gear" />
                    </button>
                    <ul class="dropdown-menu">
                      <li>
                        <a @click="EmitVariaciones(product, 'editProduct')"
                          ><font-awesome-icon icon="fa-solid fa-pencil" /> editar</a
                        >
                      </li>
                      <li>
                        <a @click="EmitVariaciones(product)"
                          ><font-awesome-icon icon="fa-solid fa-dollar-sign" /> precios</a
                        >
                      </li>
                      <li>
                        <a @click="EmitVariaciones(product)"
                          ><font-awesome-icon icon="fa-solid fa-cubes" /> stock</a
                        >
                      </li>
                      <li>
                        <a @click="EmitVariaciones(product, 'variations')"
                          ><font-awesome-icon icon="fa-solid fa-table-list" />
                          variaciones</a
                        >
                      </li>
                      <li>
                        <a @click="DeleteProduct(product)" style="color: red !important"
                          ><font-awesome-icon icon="fa-solid fa-trash" /> eliminar</a
                        >
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MODALES -->

    <!-- MODAL CREAR PRODUCTO -->

    <!-- MODAL AGREGAR PRODUCTO -->

    <!-- Modal -->
    <div
      class="modal fade"
      id="ModalCreateProdcut"
      tabindex="-1"
      aria-labelledby="ModalCreateProdcutLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-fullscreen-md-down modal-lg modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Crear Producto</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form v-if="step == 0">
              <!--            <div class="form-group mt-3">
      
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    v-model="selectedOption"
                  >
                    <option selected disabled>Open this select menu</option>
                    <option value="pdf">Producto Fisico</option>
                  </select>
                
              </div> -->
              <div class="form-group">
                <label for="marca">Marca del Producto</label>
                <input
                  type="text"
                  class="form-control"
                  id="marca"
                  v-model="product.marca"
                  placeholder="Ej: Motorola, esta campo es opcional, pero recomendado para crear filtros"
                />
              </div>
              <div class="form-group">
                <label for="title">Título</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  v-model="product.title"
                  placeholder="Ej: Celular Motorola G52 azul 4gb de ram 128gb de almacenamiento"
                />
              </div>
              <div class="form-group">
                <label for="description">Descripción</label>
                <textarea
                  class="form-control"
                  id="description"
                  rows="3"
                  v-model="product.description"
                ></textarea>
              </div>
              <div class="form-group">
                <label for="image">Imagen</label>
                <input
                  type="file"
                  class="form-control"
                  name="image"
                  id="image"
                  ref="imageCreateProduct"
                  @change="onFileSelectedCreateProduct"
                />
              </div>
              <div class="image_preview" v-if="previewNew != null">
                <img :src="previewNew" alt="" style="width: 100px; heigth: 100px" />
              </div>
              <div class="container mt-3">
                <div class="row">
                  <div class="col-12">
                    <div class="form-check form-switch">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                        v-model="product.with_price"
                      />
                      <label class="form-check-label" for="flexSwitchCheckDefault"
                        >Con precios</label
                      >
                      <br />
                      <span style="font-size: 12px"
                        >Si no activa los precios, aparecera en la tienda con el boton
                        consultar y no agreagar al carrito.</span
                      >
                    </div>
                  </div>
                </div>
                <div class="row card p-2" v-if="product.with_price == true">
                  <div class="form-group">
                    <label for="title">Precio:</label>
                    <input
                      type="number"
                      class="form-control"
                      id="title"
                      v-model="product.price"
                    />
                  </div>
                  <div class="form-group">
                    <div class="form-check form-switch">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                        v-model="product.in_offer"
                      />
                      <label class="form-check-label" for="flexSwitchCheckDefault"
                        >En oferta</label
                      >
                    </div>
                  </div>
                  <div class="form-group" v-if="product.in_offer == true">
                    <label for="title">Precio en oferta</label>
                    <input
                      type="number"
                      class="form-control"
                      id="title"
                      v-model="product.in_offer_price"
                    />
                  </div>
                </div>
              </div>
              <div class="container mt-3">
                <div class="row">
                  <div class="col-12">
                    <div class="form-check form-switch">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                        v-model="product.with_stock"
                      />
                      <label class="form-check-label" for="flexSwitchCheckDefault"
                        >Con control de Stock</label
                      >
                    </div>
                  </div>
                </div>
                <div class="row" v-if="product.with_stock == true">
                  <div class="col-12 card p-2">
                    <div class="form-group">
                      <label for="title">Cantidad de unidades</label>
                      <input
                        type="number"
                        class="form-control"
                        id="title"
                        v-model="product.stock"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <!-- step 2 -->
            <div class="step2" v-if="step == 1">
              <div class="col-12 col-sm-12">
                <h6>Agregar mas imagenes</h6>
                >
                <input
                  type="file"
                  class="form-control mb-4"
                  name="product_more_images"
                  id="product_more_images"
                  ref="product_more_images"
                  multiple="multiple"
                  @change="uploadImage"
                />

                <div
                  v-for="(image, key) in product_more_images"
                  :key="key"
                  class="d-inline mt-2"
                >
                  <img
                    class="images"
                    :ref="'more_images'"
                    style="width: 100px; heigth: 100px"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              v-if="step == 0"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="DeleteStep1()"
            >
              Cerrar
            </button>
            <button
              type="button"
              v-if="step == 1"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="DeleteStep2()"
            >
              Cerrar
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="Step1()"
              v-if="step == 0"
            >
              Siguiente
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="Finalizar()"
              v-if="step == 1"
              data-bs-dismiss="modal"
            >
              Finalizar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL AGREGAR PRODUCTO -->

    <!-- MODAL CREAR PRODUCTO -->

    <!-- MODALES -->
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "ContentProducts",
  props: ["category_id"],
  computed: {
    ...mapState("user", ["mitienda"]),
  },
  watch: {
    category_id(value) {
      console.log("watch category_id");
      console.log(value);
      this.GetProductOfCategorie(value);
      this.GetCategorie(value);
    },
    selectedOption() {
      this.handleChange();
    },
  },

  mounted() {
    console.log("mounted");
    console.log(this.category_id);
    this.GetProductOfCategorie(this.category_id);
    if (this.category_id != 0) {
      this.GetCategorie(this.category_id);
    }
    this.images_limit = this.mitienda[0].plan.images_x_products;
    console.log("images_limit");
    console.log(this.images_limit);
  },
  data() {
    return {
      products: [],
      categorie: [],
      previewNew: null,
      product: {
        category: "",
        marca: "",
        title: "",
        description: "",
        image: null,
        type: "pdf",
        price: 0,
        in_offer: false,
        in_offer_price: 0,
        with_stock: false,
        stock: 0,
        with_price: false,
      },
      selectedOption: "",
      step: 0,
      product_id_step_1: 0,
      product_more_images: [],
      images_limit: 0,
      con_precio: false,
    };
  },
  methods: {
    handleChange() {
      console.log("Selected Option:", this.selectedOption);
    },

    DeleteProduct(product) {
      this.$swal
        .fire({
          title: "Esta seguro?",
          text: "Esta seguro que quiere eliminar este producto?!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, Borrarla!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            console.log(product);
            axios
              .delete(this.server + "/api/v1/admin/product/delete/" + product.id, {
                headers: {
                  Authorization: localStorage.getItem("access"),
                },
              })
              .then((response) => {
                console.log(response.data);
                this.GetProductOfCategorie(this.categorie.id);
                this.$swal.fire(
                  "Producto Eliminado!",
                  "Se ha eliminado correctamente este producto",
                  "success"
                );
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
    },
    UpdatePublic(product) {
      const data = new FormData();
      data.append("public", product.public);

      axios
        .put(this.server + "/api/v1/admin/product/public/" + product.id, data, {
          headers: {
            Authorization: localStorage.getItem("access"),
          },
        })
        .then((response) => {
          console.log(response);
          /* echa el update, solicito nuevamente la tienda a la db,
          para recargar el logo, y lo guardo nuevamente en el vuex */
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },

    UpdatePortada(product) {
      const data = new FormData();
      data.append("portada", product.portada);

      axios
        .put(this.server + "/api/v1/admin/product/portada/" + product.id, data, {
          headers: {
            Authorization: localStorage.getItem("access"),
          },
        })
        .then((response) => {
          console.log(response);
          /* echa el update, solicito nuevamente la tienda a la db,
          para recargar el logo, y lo guardo nuevamente en el vuex */
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },

    DeleteStep1() {
      this.product = {
        title: "",
        description: "",
        image: null,
        images: null,
        price: 0,
        stock: 0,
        in_offer: false,
        in_offer_price: 0,
        with_stock: false,
        with_price: false,
        type: "pdf",
      };
      this.$refs.imageCreateProduct.value = null;
      this.step = 0;
    },

    DeleteStep2() {
      this.product_id_step_1 = null;
      this.product = {
        title: "",
        description: "",
        image: null,
        images: null,
        price: 0,
        stock: 0,
        in_offer: false,
        in_offer_price: 0,
        with_stock: false,
        stock: 0,
        with_price: false,
        type: "pdf",
      };
      this.$refs.product_more_images.value = null;
      this.product_more_images.splice(0, this.product_more_images.length);
      this.step = 0;
    },

    CreateProductMoreImages() {
      let data = new FormData();
      data.append("product", this.product_id_step_1);
      /* TENGO QUE HACER ESTE FOR PORQUE SINO EL BACK NO LA RECIBE,ESTA COPIADO DEL POSTMAN */
      /* TENGO QUE MANDAR POR CADA IMAGE UN FILE */
      for (var i = 0; i < this.$refs.product_more_images.files.length; i++) {
        let file = this.$refs.product_more_images.files[i];
        data.append("image", file);
        data.append("tienda", this.mitienda[0].id);
      }
      axios
        .post(this.server + "/api/v1/admin/product/images", data, {
          headers: {
            Authorization: localStorage.getItem("access"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.$swal.fire(
            "Producto Creado!",
            "se ha creado un nuevo producto",
            "success"
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },

    Finalizar() {
      if (this.product_more_images.length > 0) {
        console.log("grabo las imagens en la db");
        this.CreateProductMoreImages();
      } else {
        this.DeleteStep2();
      }
    },

    EmitVariaciones(product, vista) {
      console.log("this.EmitVariaciones");
      console.log("vista-emit");
      console.log(vista);
      this.$emit("product-emit", product);
      this.$emit("vista-emit", vista);
    },

    ClearProduct() {
      this.product = {
        category: "",
        marca: "",
        title: "",
        description: "",
        image: null,
        type: "pdf",
      };
    },
    ChangeTypeProduct() {
      console.log(this.typeProductSelect);
      this.product.type = this.typeProductSelect;
    },

    Step1() {
      console.log("CreateProduct");
      console.log(this.categorie.id);
      let data = new FormData();
      data.append("category", this.categorie.id);
      data.append("marca", this.product.marca);
      data.append("title", this.product.title);
      data.append("description", this.product.description);
      data.append("image", this.product.image);
      data.append("type", this.product.type);
      data.append("price", this.product.price);
      data.append("in_offer", this.product.in_offer);
      data.append("in_offer_price", this.product.in_offer_price);
      data.append("with_price", this.product.with_price);
      data.append("with_stock", this.product.with_stock);
      data.append("stock", this.product.stock);

      axios
        .post(this.server + "/api/v1/admin/product/create", data, {
          headers: {
            Authorization: localStorage.getItem("access"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.ClearProduct();
          this.GetProductOfCategorie(this.categorie.id);
          this.product_id_step_1 = response.data.id;
          console.log("product_id_step_1");
          console.log(this.product_id_step_1);
          this.step = 1;
        })
        .catch((error) => {
          console.log(error.response.status);
          if (error.response.status == 403) {
            this.$swal.fire(
              "Limite Alcanzado!",
              "usted a superado el limite de productos que permite cargar su plan.",
              "error"
            );
          }
        });
    },

    onFileSelectedCreateProduct(event) {
      console.log(event);
      this.product.image = event.target.files[0];
      let file = event.target.files[0];
      this.previewNew = URL.createObjectURL(file);
    },

    GetProductOfCategorie(value) {
      axios
        .get(this.server + "/api/v1/admin/categories/product/list/", {
          params: {
            categorie: value,
          },
          headers: {
            Authorization: localStorage.getItem("access"),
          },
        })
        .then((response) => {
          console.log(response.data.results);
          this.products = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    GetCategorie(category) {
      axios
        .get(this.server + "/api/v1/admin/categories/view/" + category + "/", {
          headers: {
            Authorization: localStorage.getItem("access"),
          },
        })
        .then((response) => {
          this.categorie = response.data;
          console.log(this.categorie);
        });
    },
    /* metodo js para carcar y hace preview de multiples imagenes */
    uploadImage(e) {
      let vm = this;
      var selectedFiles = e.target.files;
      for (let i = 0; i < selectedFiles.length; i++) {
        this.product_more_images.push(selectedFiles[i]);
        if (this.product_more_images.length > this.images_limit) {
          this.$swal.fire(
            "Limite Excedido!",
            "Esta intendo cargas mas imaganes de las permitidas por su plan",
            "error"
          );
          this.$refs.product_more_images.value = null;
          this.product_more_images.splice(0, this.product_more_images.length);
        }
      }

      for (let i = 0; i < this.product_more_images.length; i++) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.$refs.more_images[i].src = reader.result;
        };

        reader.readAsDataURL(this.product_more_images[i]);
      }
      console.log(this.product_more_images);
    },
  },
};
</script>

<style scoped>
.ContentProducts {
  margin-top: 20px !important;
}

.products_contain {
  margin-top: 20px !important;
}

.title_categoria {
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 700; /* bold */
}
.title_contain {
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
}

li {
  list-style: none;
}

ul {
  margin: 0;
  padding: 0;
}

ul li {
  margin: 0;
  padding: 0;
}
.categorie_img {
  width: 50px !important;
  height: 50px !important;
}

.accordion-body {
  padding: 0.5px !important;
}
.oldPrice {
  font-size: 12px !important;
  text-decoration: line-through;
}
.newPrice {
  color: green;
  font-size: 14px !important;
}
.tienda_nuevas_title {
  border-bottom: solid 1px #000000;
}
.product_title {
  font-size: 14px;
  text-transform: uppercase;
  color: #000000;
}
.product_info_container {
  padding-top: 2px !important;
}
.product_acciones {
  padding-top: 0px !important;
  padding-right: 0px !important;
}
.item_text {
  font-size: 13px;
}
.item_price {
  font-size: 13px;
  color: green;
}
.cards_category {
  font-size: 12px !important;
  color: gray;
}

.category_name {
  font-size: 12px !important;
}
.decoration_bottom {
  height: auto;
}
.img_product {
  max-height: 100px;
  padding-top: 20px;
  padding-left: 10px;
}
.btn_crear_product {
  font-size: 14px;
  font-weight: 500;
}
.info_crear_product {
  font-size: 14px;
}

@media only screen and (max-width: 768px) {
  .img_product {
    max-height: 90px;
    padding-top: 30px;
    padding-left: 4px;
  }
  .info_crear_product {
    font-size: 12px;
  }
  .btn_crear_product {
  font-size: 14px;
  font-weight: 500;
  max-height: 50px !important;
}
}
</style>
