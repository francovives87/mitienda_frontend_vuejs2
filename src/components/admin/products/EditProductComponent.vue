<template>
  <div class="EditProduct mb-12">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">Editar Producto</div>
        <div class="row">
          <div class="col-12">
            <img :src="product.image" alt="" class="images" />
            <div class="row">
              <div class="col-12">editar imagen</div>
            </div>
          </div>
          <div class="col-12">{{ product.title }}</div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <form>
            <div class="form-group">
              <label for="marca">Marca del Producto</label>
              <input
                type="text"
                class="form-control"
                id="marca"
                v-model="product.marca"
              />
            </div>
            <div class="form-group">
              <label for="title">Título</label>
              <input
                type="text"
                class="form-control"
                id="title"
                v-model="product.title"
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
            <!--             <div class="form-group">
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
            </div> -->
          </form>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">Mas imagenes</div>
      <div class="col-12">
        <!-- Button trigger modal -->
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#modalMoreImages"
        >
          + IMAGENES
        </button>
      </div>
    </div>
    <div
      class="row d-flex align-items-center"
      v-for="(image, index) in images"
      :key="index"
    >
      <div class="col-8 col-lg-6">
        <img :src="image.image" alt="" class="images" />
      </div>
      <div class="col-4 col-lg-6">
        <div class="container">
          <div class="row">
            <div class="col-lg-3">
              <v-btn
                class="mr-2"
                color="red"
                small
                elevation="2"
                icon
                outlined
                @click="DeleteImage(image)"
                ><v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>
            <div class="col-lg-3">
              <v-btn
                class="mr-2"
                color="orange"
                small
                elevation="2"
                icon
                outlined
                data-bs-toggle="modal"
                data-bs-target="#UpdateProductImagas"
                @click="SetImageToEdit(image)"
                ><font-awesome-icon icon="fa-solid fa-pencil" />
              </v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MODALES -->
    <!-- MODAL AGREGAR MAS IMAGENES -->
    <!-- Modal -->
    <div
      class="modal fade"
      id="modalMoreImages"
      tabindex="-1"
      aria-labelledby="modalMoreImagesLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">...</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    <!-- MODAL AGREGAR MAS IMAGENES -->

    <!-- MODALES -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "EditProductComponent",
  props: ["product_prop"],
  mounted() {
    this.product = this.product_prop;
    this.GetImagesOffProduct(this.product_prop);
  },
  watch: {
    product_prop(value) {
      console.log("watch product_prop");
      console.log(value);
      if (value) {
        this.product = value;
        this.GetImagesOffProduct(this.product);
      }
    },
  },
  data() {
    return {
      product: [],
      images: [],
    };
  },
  methods: {
    GetImagesOffProduct(product) {
      axios
        .get(this.server + "/api/v1/admin/product/images/" + product.id, {
          headers: {
            Authorization: localStorage.getItem("access"),
          },
        })
        .then((response) => {
          console.log("GetImagesOffProduct");
          console.log(response.data.results);
          this.images = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.images {
  border-color: #ededed !important;
  border-style: solid !important;
  border-radius: 5%;
  width: 120px !important;
  height: 100px !important;
  margin-top: 2px !important;
  margin-bottom: 2px !important;
}
</style>
