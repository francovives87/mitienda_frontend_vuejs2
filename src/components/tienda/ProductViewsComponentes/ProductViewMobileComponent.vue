<template>
  <div class="ProductViewDesktopComponent">
    <div class="container mt-1">
      <div class="row">
        <div class="col-12 col-lg-8 col-sm-12 col-xs-12" style="overflow-y: scroll">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <carousel
                  :per-page="1"
                  :mouse-drag="false"
                  :navigationEnabled="height == 4 ? true : false"
                  paginationPosition="false"
                  :loop="true"
                >
                  <slide v-for="(img, index) in imagenes_array" :key="index">
                    <div class="images_slide">
                      <img :src="img.image" alt="" class="mobile" />
                      <div class="overlay">
                        <font-awesome-icon icon="fa-images" /> &nbsp; {{ index + 1 }}/{{
                          imagenes_array.length
                        }}
                      </div>
                    </div>
                  </slide>
                </carousel>
              </div>
            </div>
          </div>
          <div class="container p-0">
            <div class="row content_product mt-3 d-flex justify-content-center p-0">
              <div class="col-12">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">{{ product.title }}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">
                      {{ product.category.name }}
                    </h6>
                    <div class="container">
                      <div class="row">
                        <div class="col-6" v-if="product.with_price == true">
                          <span style="font-size: 12px">PRECIO $</span> <br />
                          <span v-if="product.in_offer == false">
                            {{ product.price }}
                          </span>
                          <span v-if="product.in_offer == true">
                            <span
                              style="text-decoration: line-through; font-size: 12px"
                              >{{ product.price }}</span
                            >
                            <br />
                            <span style="font-size: 14px; color: green">{{
                              product.in_offer_price
                            }}</span>
                          </span>
                        </div>
                        <div class="col-6" v-if="product.has_variation == false">
                          <div v-if="product.with_stock == true">
                            <span style="font-size: 12px">STOCK</span> <br />
                            <span class="stock" v-if="product.stock > 0">
                              {{ product.stock }}
                            </span>
                            <span class="sin_stock" v-if="product.stock <= 0">
                              Sin stock</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="container description">
            <div class="row">
              <div class="col-12">
                <div>
                  <ul class="nav nav-tabs mt-2">
                    <li class="nav-item">
                      <button
                        class="nav-link"
                        :class="{ active: activeTab === 0 }"
                        data-bs-toggle="tab"
                        data-bs-target="#tab-1"
                        @click="activeTab = 0"
                      >
                        <font-awesome-icon icon="fa-solid fa-circle-info" /> Descripcion
                      </button>
                    </li>
                  </ul>

                  <div class="tab-content mt-2">
                    <div class="description_container" v-if="activeTab == 0">
                      <div v-if="leer_mas == false">
                        <p class="card-text">
                          {{ product.description.slice(0, 130) }}
                          <span v-if="product.description.length >= 130">
                            <span v-if="product.description.length >= 130">...</span>
                            <br />
                            <span class="d-flex justify-content-end">
                              <a class="leer_mas" @click="leer_mas = true"> leer mas</a>
                            </span>
                          </span>
                        </p>
                      </div>
                      <div v-if="leer_mas == true">
                        <p class="card-text">
                          {{ product.description }} <br />
                          <span class="d-flex justify-content-end">
                            <a class="leer_mas" @click="leer_mas = false"> ocultar</a>
                          </span>
                        </p>
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

    <!-- OPCIONES -->
    <div v-if="product.has_options == true">
      <div v-if="product.has_variation == false">
        <div class="container opciones">
          <div class="row">
            <div class="col-12 card">
              <div class="col-12 mt-2">
                <h6>OPCIONES</h6>
              </div>
              <div class="row">
                <div class="col-12" v-for="(atributo, index) in atributos" :key="index">
                  <div class="col-12 col-sm-12 col-xs-12" v-if="atributo.repeat == 0">
                    <div class="d-grid gap-0">
                      <h6>{{ atributo.nombre }}</h6>
                      <button
                        class="btn btn-outline-secondary"
                        data-bs-toggle="modal"
                        data-bs-target="#selectAttributeModal"
                        @click="SetAtributo(atributo)"
                      >
                        Seleccionar {{ atributo.nombre }}
                      </button>
                    </div>
                  </div>
                  <div class="col-11 col-sm-11" v-if="atributo.repeat > 0">
                    <div
                      class="d-grid gap-0"
                      v-for="(attribute, index) in atributo.repeat"
                      :key="index"
                    >
                      <h6>{{ atributo.nombre }} {{ index + 1 }}</h6>
                      <button
                        class="btn btn-outline-secondary"
                        data-bs-toggle="modal"
                        data-bs-target="#selectAttributeRepeatModal"
                        @click="SetAtributo(atributo)"
                      >
                        Seleccionar {{ atributo.nombre }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mb-3">
                <!-- Mostrar opciones seleccionadas -->
                <div class="container">
                  <div class="row mt-2" v-if="attributes_selected.length > 0">
                    <h6>selecciono:</h6>
                    <div class="col-12 col-xl-6 col-sm-12 col-xs-12 mb-3">
                      <div
                        class="d-block p-2 bg-dark text-white"
                        v-for="(item, index) in attributes_selected"
                        :key="index"
                      >
                        {{ item }}
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

    <!-- VARIACIONES -->
    <div v-if="product.has_variation == true">
      <div class="container variaciones">
        <div class="row p-2 d-flex justify-content-center">
          <div class="col-12 card p-2">
            <div class="col-12">
              <span style="font-size: 12px">VARIACIONES</span>
            </div>
            <div class="col-12" v-for="(atributo, index) in atributos" :key="index">
              <div class="col-12 col-sm-12 col-xs-12" v-if="atributo.repeat == 0">
                <div class="d-grid gap-0">
                  <h6>{{ atributo.nombre }}</h6>
                  <button
                    class="btn btn-outline-secondary"
                    data-bs-toggle="modal"
                    data-bs-target="#selectVariModal"
                    @click="SetAtributo(atributo)"
                  >
                    Seleccionar {{ atributo.nombre }}
                  </button>
                </div>
              </div>
              <div class="col-11 col-sm-11" v-if="atributo.repeat > 0">
                <div
                  class="d-grid gap-0"
                  v-for="(attribute, index) in atributo.repeat"
                  :key="index"
                >
                  <h6>{{ atributo.nombre }}</h6>
                  <v-btn
                    block
                    data-bs-toggle="modal"
                    data-bs-target="#selectAttributeModal"
                    @click="SetAtributo(atributo)"
                  >
                    Seleccionar {{ atributo.nombre }}</v-btn
                  >
                </div>
              </div>
            </div>
            <div
              class="row mt-2 variacion_seleccionada"
              v-if="variationValuesforChild.length > 0"
            >
              <div class="col-12">
                <h6>Selecciono:</h6>
              </div>
              <div class="col-xl-6 col-sm-12">
                <div
                  class="d-inline p-2 mr-2 bg-dark text-white"
                  v-for="(item, index) in variationValuesforChild"
                  :key="index"
                >
                  {{ item.item }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- variaciones -->

    <div class="container"></div>

    <!-- variacion todavia no buscada -->
    <div class="container" v-if="flagResultadoBusquedaVariaciones == 0">
      <div class="row d-flex justify-content-center">
        <div class="col-12 col-sm-12"></div>
      </div>
    </div>

    <!-- variacion NO encontrada -->
    <div class="container" v-if="flagResultadoBusquedaVariaciones == 2">
      <div class="row d-flex justify-content-center">
        <div class="col-12 col-sm-12">Variacion no encontrada!</div>
      </div>
    </div>

    <!-- Variacion ENCONTRADA -->
    <div class="container" style="background-color: #f5f5f5 !important">
      <div class="row">
        <div class="col-12">
          <div
            class="card variacion_encontrada"
            v-if="flagResultadoBusquedaVariaciones == 1"
          >
            <div class="card-body">
              <p>
                <span class="card-text variacion_titulos"> precio: $ </span
                >{{ variacionEncontrada.price }} <br />
                <span
                  class="variacion_titulos"
                  v-if="variacionEncontrada.no_stock == false"
                >
                  stock: </span
                ><span v-if="variacionEncontrada.no_stock == false">{{
                  variacionEncontrada.stock
                }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Variacion Encontrada -->

    <!-- ADD TO CART -->

    <!-- SIMPLE PRODUCT -->

    <!-- detalle producto -->
    <div class="container">
      <div class="row">
        <div class="col-4 actions-column" style="overflow-y: scroll">
          <div class="botoneras">
            <AddToCartSimpleComponent
              :product="product"
              v-if="product.has_options == false"
            />
            <AddToCartWithOptions
              :product="product"
              :attributes_selected="attributes_selected"
              @atributes-updated="handleAttributesUpdated"
              v-if="product.has_options == true && product.has_variation == false"
            />
            <AddToCartWithVariationComponent
              v-if="product.has_variation == true"
              :product="product"
              :variacionEncontrada="variacionEncontrada"
              :variationValuesforChild="variationValuesforChild"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- MODALES -->
    <!-- MODAL SELECCIONAR VARIACIONES -->
    <!-- MODAL SELECCCIONAR VARIACION -->
    <!-- Modal -->
    <div
      class="modal fade"
      id="selectVariModal"
      tabindex="-1"
      aria-labelledby="selectVariModal"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-scrollable modal-fullscreen-md-down">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="selectVariModal">
              Seleccione uno: {{ atributo_select.nombre }}
            </h5>
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
                <div class="col-11 col-sm-11">
                  <div class="d-grid gap-0">
                    <v-btn
                      block
                      data-bs-dismiss="modal"
                      v-for="(item, index) in atributo_select.atributo_item"
                      :key="index"
                      class="mb-2"
                      @click="SelectVariation(item)"
                    >
                      {{ item.item }}
                    </v-btn>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL -->

    <!-- MODAL SELECCIONAR Atributos -->
    <div
      class="modal fade"
      id="selectAttributeModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-scrollable modal-fullscreen-md-down">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Seleccione {{ atributo_select.nombre }}
            </h5>
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
                <div class="col-11 col-sm-11">
                  <div class="d-grid gap-0">
                    <v-btn
                      block
                      data-bs-dismiss="modal"
                      v-for="(item, index) in atributo_select.atributo_item"
                      :key="index"
                      class="mb-2"
                      @click="SelectAttribute(item)"
                    >
                      {{ item.item }}
                    </v-btn>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Seleccionar atributos Repeat -->

    <div
      class="modal fade"
      id="selectAttributeRepeatModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-scrollable modal-fullscreen-md-down">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Seleccione uno: ATTRIBUTE {{ atributo_select.nombre }}
            </h5>
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
                <div class="col-11 col-sm-11">
                  <div class="d-grid gap-0">
                    <v-btn
                      block
                      data-bs-dismiss="modal"
                      v-for="(item, index) in atributo_select.atributo_item"
                      :key="index"
                      class="mb-2"
                      @click="SelectAttributeRepeat(item)"
                    >
                      {{ item.item }}
                    </v-btn>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import { mapMutations } from "vuex";
import AddToCartSimpleComponent from "../../../components/tienda/addToCart/AddToCartSimpleComponent.vue";
import AddToCartWithOptions from "../../../components/tienda/addToCart/AddToCartWithOptions.vue";
import AddToCartWithVariationComponent from "../../../components/tienda/addToCart/AddToCartWithVariationComponent.vue";
import axios from "axios";
export default {
  name: "ProductViewDesktopComponent",
  props: ["product"],
  components: {
    Carousel,
    Slide,
    AddToCartSimpleComponent,
    AddToCartWithOptions,
    AddToCartWithVariationComponent,
  },
  data() {
    return {
      quantity_only_attribute: 1,
      imagenes_array: [],
      atributos: [],
      atributo_select: [],
      attributes: [],
      attributes_selected: [],
      variationValuesforChild: [],
      variacionEncontrada: [],
      flagResultadoBusquedaVariaciones: 0,
      activeTab: 0,
      leer_mas: false,
    };
  },

  created() {
    this.LoadImages();
    this.GetAtributosOffProduct();
  },

  mounted() {},

  computed: {
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 1;
        case "sm":
          return 1;
        case "md":
          return 3;
        case "lg":
          return 4;
        case "xl":
          return 6;
      }
    },
  },

  methods: {
    ...mapMutations("cart", [
      "AddToCartVuex",
      "RemoveItemVuex",
      "AddToCartWithVariationVuex",
      "RemoveItemVuexWithVariation",
      "AddToCartOnlyAttributeVuex",
    ]),

    buscarVariacion(items) {
      let data = {
        product: this.product.id,
        item: items,
      };

      let variSelect = 0;

      axios
        .post(this.server + "/api/v1/admin/product/variations/search/", data)
        .then((response) => {
          this.loading = true;
          console.log(response.data);
          let variacion = response.data;
          variacion.forEach((vari) => {
            if (vari.repeticiones === this.atributos.length) {
              console.log("esta es");
              variSelect = vari.pk;
              console.log(variSelect);
            }
          });
          if (variSelect == 0) {
            console.log("variacion no encontrada!");
            this.variacionEncontrada = [];
            this.flagResultadoBusquedaVariaciones = 2;
            this.loading = false;
          } else {
            axios
              .get(this.server + "/api/v1/admin/product/variation/" + variSelect)
              .then((response) => {
                this.variacionEncontrada = response.data;
                /* Le agrego la variacion al productDetail, para agregar y elimar */
                this.product.variacion_id = this.variacionEncontrada.id;
                console.log("variacion encontrada");
                console.log(this.variacionEncontrada);
                this.contar = 0;
              });
            this.flagResultadoBusquedaVariaciones = 1;
            this.loading = false;
            window.scrollTo(
              0,
              document.body.scrollHeight || document.documentElement.scrollHeight
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    SelectVariation(value) {
      console.log("this.atributos.length");
      console.log(this.atributos.length);
      if (this.variationValuesforChild.length == this.atributos.length) {
        this.variationValuesforChild.splice(0, this.variationValuesforChild.length);
        this.onlyAttibute = false;
      }

      if (this.variationValuesforChild.some((elem) => elem.id === value.id)) {
        var index = this.variationValuesforChild.findIndex(
          (item) => item.id === value.id
        );
        this.variationValuesforChild.splice(index, 1, value);
      } else {
        this.variationValuesforChild.push(value);
      }

      console.log(this.variationValuesforChild);

      let items = [];

      this.variationValuesforChild.forEach((item) => {
        items.push(item.id);
      });

      console.log("====items=====");
      console.log(items);
      console.log("====items=====");

      if (this.variationValuesforChild.length == this.atributos.length) {
        console.log("aca ejecuto funcion para buscar");
        this.buscarVariacion(items);
      }
    },

    handleAttributesUpdated(data) {
      this.attributes = data.attributes;
      this.attributes_selected = data.attributes_selected;
      this.quantity_only_attribute = data.quantity_only_attribute;
    },

    SelectAttribute(value) {
      if (this.attributes.length == this.atributos.length) {
        this.attributes.splice(0, this.attributes.length);
        this.attributes_selected.splice(0, this.attributes_selected.length);
      }
      console.log(value);
      this.attributes.push(value.id);
      this.attributes_selected.push(value.item);
      console.log("Attributes");
      console.log(this.attributes);
      console.log("attributes_selected");
      console.log(this.attributes_selected);

      if (this.attributes.length > 0) {
        console.log("aca muestro agregar");
        this.onlyAttibute = true;
        this.product.atributos = this.attributes;
        console.log(this.product);
      }
    },

    SelectAttributeRepeat(value) {
      if (this.attributes.length == this.atributos[0].repeat) {
        this.attributes.splice(0, this.attributes.length);
        this.attributes_selected.splice(0, this.attributes_selected.length);
      }
      console.log(value);
      this.attributes.push(value.id);
      this.attributes_selected.push(value.item);
      console.log("Attributes");
      console.log(this.attributes);
      console.log("attributes_selected");
      console.log(this.attributes_selected);

      if (this.attributes.length > 0) {
        console.log("aca muestro agregar");
        this.onlyAttibute = true;
        this.product.atributos = this.attributes;
        console.log(this.product);
      }
    },

    SetAtributo(atributo) {
      this.atributo_select = atributo;
    },
    GetAtributosOffProduct() {
      axios
        .get(this.server + "/api/v1/store/product/atributos/", {
          params: {
            product: this.product.id,
          },
        })
        .then((response) => {
          console.log("GetAtributosOffProduct");
          console.log(response.data.results);
          this.atributos = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    LoadImages() {
      let images = {
        image: null,
      };
      this.product.images_product.forEach((el) => {
        images = {
          image: el.image,
        };
        this.imagenes_array.push(images);
      });
      let portada = {
        image: this.product.image,
      };
      this.imagenes_array.unshift(portada);

      console.log("desde LOAD_images");
      console.log(this.imagenes_array);
    },

    emitClose() {
      this.$emit("display", "content");
    },
  },
};
</script>

<style scoped>
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
.cerrar {
  font-size: 24px;
  color: #000000;
  padding-left: 10px;
  padding-right: 10px !important;
  transition: all 0.3s ease-in-out;
  border-left: 1px solid gray;
}
.cerrar:hover {
  background-color: #e5e5e5;
}
.titulo {
  font-size: 12px;
  font-weight: 600;
  margin: 0;
  color: #000000;
  text-transform: uppercase !important;
  margin-left: 10px;
}

/* top bar */
.actions-column {
  background-color: #ffffff;
  height: 100vh;
}
.images_slide img {
  width: auto;
  height: 480px;
}

.images_slide {
  padding: 0px !important;
  margin: 0px !important;
  position: relative;
  margin-top: 15px;
}
.overlay {
  position: absolute;
  margin-top: 10px;
  top: 0;
  right: 0;
  background: rgb(0, 0, 0);
  background: rgba(0, 0, 0, 0.7); /* Black see-through */
  color: #f1f1f1;
  width: 66px;
  height: 38px;
  transition: 0.5s ease;
  color: white;
  font-size: 16px;
  padding-top: 5px;
  padding-bottom: 3px;
  padding-left: 5px;
  padding-right: 5px;
  text-align: center;
  text-transform: uppercase;
  opacity: 1;
  border-bottom-left-radius: 3%;
  border-bottom-right-radius: 3%;
}
.whatsapp_button {
  font-size: 25px;
  color: green;
}

@media (max-width: 768px) {
  .ProductViewDesktopComponent {
    margin-bottom: 50px !important;
  }

  .actions-column {
    position: fixed;
    bottom: 0;
    overflow-y: scroll;
    height: 60px;
    background-color: #ffffff;
    width: 100%;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2); /* Agregar esta línea */
  }
  .images_slide img {
    width: 100%;
    height: auto;
  }
  .content_product {
    background-color: #f5f5f5;
    padding-top: 5px !important;
  }
  .variacion_encontrada {
    margin-bottom: 30px !important;
    height: 100px !important;
  }
  .opciones {
    margin-top: 5px !important;
    margin-bottom: 90px !important;
    background-color: #f5f5f5 !important;
  }
  .variaciones {
    background-color: #f5f5f5 !important;
    margin-bottom: 10px !important;
    padding-bottom: 3px !important;
  }
  .variacion_seleccionada {
    margin-bottom: 30px !important;
    padding-bottom: 20px !important;
  }
  .variacion_encontrada {
    margin-bottom: 60px !important;
  }
  .sin_stock {
    display: inline-block;
    margin-right: 1px !important; /* Ajusta el margen derecho según tus necesidades */
    padding: 5px 3px 5px 3px !important;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f5f5f5;
    color: red;
    font-size: 11px;
    font-weight: 500;
    text-transform: uppercase !important;
    cursor: pointer;
  }
  .stock {
    display: inline-block;
    margin-right: 1px !important; /* Ajusta el margen derecho según tus necesidades */
    padding: 5px 5px 5px 5px !important;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f5f5f5;
    color: green;
    font-size: 15px;
    font-weight: 500;
    text-transform: uppercase !important;
    cursor: pointer;
  }
  .description {
    padding: 0px 0px 20px 0px !important;
  }
  .leer_mas {
    font-size: 12px !important;
    color: blue !important;
    display: inline-block;
    margin-right: 1px !important; /* Ajusta el margen derecho según tus necesidades */
    padding: 5px 3px 5px 3px !important;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f5f5f5;
    font-size: 11px;
    font-weight: 500;
    text-transform: uppercase !important;
    cursor: pointer;
  }
}
</style>
