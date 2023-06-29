<template>
  <div class="variations">
    <div>Atributos/Variaciones</div>
    <div class="container">
      <div class="row">
        <div class="col-2">
          <img :src="product.image" style="width: 50px; heigth: 50px" alt="" />
        </div>
        <div class="col-8">{{ product.title }}</div>
      </div>
    </div>

    <div class="container atributos">
      <div class="row">
        <div class="col-8 col-sm-8 col-lg-12 mt-4">Atributos</div>
        <div class="col-12">
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="activar_opciones"
              v-model="product.has_options"
              @change="UpdateOpciones()"
            />
            <label class="form-check-label" for="activar_opciones"
              >Activar Opciones</label
            >
            <br />
            <span style="font-size: 12px">Cree opciones para sus productos.</span>
          </div>
        </div>
        <div class="opciones" v-if="product.has_options == true">
          <div class="col-12 col-sm-12 col-lg-12">
            <button
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#modal_crear_atributo"
            >
              + ATRIBUTO
            </button>
          </div>
          <div class="row mt-4">
            <div class="col-12 col-sm-12 col-lg-12 p-0 m-0">
              <ul class="list-group">
                <li
                  v-for="(atributo, index) in atributos"
                  :key="index"
                  class="list-group-item"
                >
                  <div style="font-size: 12px">ATRIBUTOS</div>
                  {{ atributo.nombre }}
                  <div class="d-flex flex-row-reverse">
                    <v-btn
                      class="ml-1"
                      elevation="4"
                      icon
                      small
                      data-bs-toggle="modal"
                      data-bs-target="#agregar_editar_items"
                      @click="SetEditAtributoItems(atributo)"
                    >
                      <font-awesome-icon icon="eye" />
                    </v-btn>

                    <v-btn
                      class="ml-1"
                      elevation="4"
                      color="green"
                      icon
                      small
                      data-bs-toggle="modal"
                      data-bs-target="#modal_agregar_item"
                      @click="SetEditAtributoItems(atributo)"
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>

                    <v-btn
                      elevation="4"
                      icon
                      color="red"
                      small
                      @click="DeteleAtributo(atributo)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container variaciones">
      <div class="row">
        <div class="col-12 col-sm-12">
          <div class="row">
            <div class="col-12 col-sm-12" v-if="product.has_options == true">
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  v-model="product.has_variation"
                  @change="UpdateHasVariation(product.has_variation)"
                />
                <label class="form-check-label" for="flexSwitchCheckDefault"
                  >Con Variaciones (activa las variaciones)</label
                >
                <br />
                <span style="font-size: 12px"
                  >Si no activa los precios, aparecera en la tienda con el boton consultar
                  y no agreagar al carrito.</span
                >
              </div>
            </div>
            <div class="row mb-12" v-if="product.has_variation == true">
              <div class="col-12 col-sm-12 col-lg-12">
                <h6>Variaciones</h6>
              </div>
              <div class="col-4 col-sm-4 col-lg-1">
                <v-btn
                  :disabled="atributos.length == 0"
                  elevation="4"
                  icon
                  data-bs-toggle="modal"
                  data-bs-target="#modal_create_variacion"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </div>
              <div class="container">
                <div class="row">
                  <div
                    class="col-12 col-sm-12 col-lg-12"
                    v-for="(variacion, index) in variaciones"
                    :key="index"
                  >
                    <div class="card mb-2 mt-2" style="width: auto">
                      <div class="card-body">
                        <div class="container">
                          <div class="row">
                            <div class="col-4 col-sm-4">
                              <div
                                class="d-inline-block p-2 mr-2 bg-success text-white mb-1"
                                v-for="(itm, index_itm) in variacion.item"
                                :key="index_itm"
                              >
                                {{ itm.item }}
                              </div>
                            </div>
                            <div class="col-8 col-sm-8">
                              <p>
                                <span style="color: black">STOCK: </span>
                                <span v-if="variacion.no_stock == false"
                                  >{{ variacion.stock }}
                                </span>
                                <span
                                  style="font-size: 12px"
                                  v-if="variacion.no_stock == true"
                                  >Sin control de stock
                                </span>
                              </p>
                              <p>
                                <span style="color: black">PRECIO $:</span>
                                {{ variacion.price }}
                              </p>
                            </div>
                            <div class="botonera d-flex justify-content-end">
                              <v-btn
                                elevation="4"
                                icon
                                color="red"
                                small
                                @click="DeleteVariacion(variacion)"
                              >
                                <v-icon>mdi-delete</v-icon>
                              </v-btn>
                              <v-btn
                                elevation="4"
                                icon
                                color="yellow"
                                small
                                @click="SetUpdateVariacion(variacion)"
                                class="ml-2"
                                data-bs-toggle="modal"
                                data-bs-target="#editStockModal"
                              >
                                <font-awesome-icon icon="pencil-alt" />
                              </v-btn>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-sm-12" v-if="product.has_variation == false">
                <span
                  style="font-size: 12px !important"
                  v-if="product.has_options == true"
                  >La variaciones permiten ponerle stock y precio a las opciones, y crear
                  combinaciones entre ellas. Por ejemplo una zapatilla puede tener color y
                  talle, se combinan esas opciones, y se crea una variacion, asi se puede
                  tener control exacto del stock de ese determinado producto, y si esa
                  variacion tiene un precio distinto de otra.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MODALES -->

    <!-- MODAL CREAR ATRIBUTO -->
    <div
      class="modal fade"
      id="modal_crear_atributo"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      data-backdrop="false"
    >
      <div class="modal-dialog modal-fullscreen-sm-down modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Crear una opcion</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label"
                  >Opcion nueva</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Atributo nuevo"
                  v-model="createAtributo.nombre"
                />
              </div>
              <div class="mb-3">
                <v-switch
                  v-model="activar_repeticiones"
                  label="Repetir opcion"
                ></v-switch>
              </div>
              <div class="mb-3" v-if="activar_repeticiones">
                <label for="exampleFormControlInput1" class="form-label"
                  >Repeticiones</label
                >
                <input
                  type="number"
                  class="form-control"
                  id="exampleFormControlInput1"
                  min="0"
                  v-model="createAtributo.repeat"
                />
              </div>
              <span style="font-size: 12px"
                >Las repeticiones sirven para que el usuario elija varias veces esta
                opcion,por ejemple una heladeria repite 3 veces, si el usuario puede
                eleguir 3 sabores. <br />Esta opcion se desactiva si utiliza variaciones.
              </span>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button
              type="button"
              class="btn btn-success"
              @click="CreateAtributo()"
              data-bs-dismiss="modal"
            >
              Crear atributo
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- MODAL CREAR ATRIBUTO-->

    <!-- MODAL VER ITEMS -->
    <div
      class="modal fade"
      id="agregar_editar_items"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-fullscreen-sm-down modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              {{ editAtributoItems.nombre }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <h6>Items</h6>
            <div class="row">
              <div class="col-12 col-sm-12">
                <ul class="list-group">
                  <li
                    v-for="(item, index) in editAtributoItems.atributo_item"
                    :key="index"
                    class="list-group-item"
                  >
                    {{ item.item }}
                    <!--                     <div class="d-flex flex-row-reverse">
                      <v-btn
                        elevation="4"
                        icon
                        color="red"
                        small
                        @click="DeteleAtributo(atributo)"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </div> -->
                  </li>
                </ul>
              </div>
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
    <!-- MODAL VER ITEMS -->

    <!-- MODAL AGREGAR ITEM AL ATRIBUTO -->

    <div
      class="modal fade"
      id="modal_agregar_item"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              {{ editAtributoItems.nombre }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <h6>Agregar item</h6>
            <form>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label"
                  >Item nuevo</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Item nuevo"
                  v-model="createItemAtributo.item"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button
              type="button"
              data-bs-dismiss="modal"
              class="btn btn-success"
              @click="CreateItemAtributo()"
            >
              Crear item
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL AGREGAR ITEM AL ATRIBUTO -->

    <!-- MODAL CREAR VARIACION -->

    <div
      class="modal fade"
      id="modal_create_variacion"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-scrollable modal-fullscreen-sm-down">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Crear Varacion</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="botones_items">
              <div class="mb-3" v-for="(atributo, index) in atributos" :key="index">
                <label for="exampleFormControlInput1" class="form-label"
                  >{{ atributo.nombre }}
                </label>
                <div class="botones">
                  <button
                    class="btn btn-outline-secondary mr-1"
                    v-for="(itm, index_itm) in atributo.atributo_item"
                    :key="index_itm"
                    @click="SelectVariation(itm)"
                  >
                    {{ itm.item }}
                  </button>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-sm-12"><h6>Selecciono:</h6></div>
              <div class="col-12 col-sm-12">
                <div
                  class="d-inline p-2 mr-2 bg-success text-white"
                  v-for="(itm, index_itm) in itemsSelected_nombres"
                  :key="index_itm"
                >
                  {{ itm }}
                </div>
              </div>
              <div
                class="col-12 col-sm-12"
                v-if="itemsSelected_id.length == 0"
                style="color: red"
              >
                Seleccione los items
              </div>
              <div class="col-12 col-sm-12">
                <form>
                  <div class="mb-3">
                    <v-switch
                      v-model="createVariacion.no_stock"
                      label="Sin Stock"
                    ></v-switch>
                  </div>
                  <div class="mb-3" v-if="createVariacion.no_stock == false">
                    <label for="stock" class="form-label">Stock</label>
                    <input
                      type="number"
                      class="form-control"
                      id="stock"
                      min="0"
                      v-model="createVariacion.stock"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="price" class="form-label">Precio $</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      min="0"
                      v-model="createVariacion.price"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="clear()"
            >
              Cerrar
            </button>
            <button
              @click="BuscarVaracion()"
              type="button"
              class="btn btn-success"
              data-bs-dismiss="modal"
            >
              Crear variacion
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL CREAR VARIACION -->
    <!-- MODAL EDITAR VARIACION -->

    <div
      class="modal fade"
      id="editStockModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-scrollable modal-fullscreen-md-down">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Editar: {{ updateVariacion.item }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="stock" class="form-label">Precio</label>
                <input
                  type="number"
                  class="form-control"
                  id="stock"
                  min="0"
                  v-model="updateVariacion.price"
                />
              </div>
              <div class="mb-3">
                <label for="stock" class="form-label">Stock</label>
                <input
                  type="number"
                  class="form-control"
                  id="stock"
                  min="0"
                  v-model="updateVariacion.stock"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Cerrar
            </button>
            <button
              type="button"
              class="btn btn-success"
              data-bs-dismiss="modal"
              @click="UpdateVariacion()"
            >
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL EDITAR VARIACION -->

    <!-- MODALES -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "VariationsComponents",
  props: ["product_prop"],

  mounted() {
    console.log("mountend");
    this.GetAtributosConItems(this.product_prop);
    this.GetVariacionOffProduct(this.product_prop);
    this.product = this.product_prop;
  },
  watch: {
    product_prop(value) {
      console.log("watch product_prop");
      console.log(value);
      if (value) {
        this.product = value;
        this.GetAtributosConItems(this.product);
        this.GetVariacionOffProduct(this.product);
      }
    },
  },

  data() {
    return {
      atributos: [],
      product: [],
      /* VARIACIONES DATA */
      variaciones: [],

      /* ATRIBUTOS DATA */
      createAtributo: {
        nombre: "",
        repeat: 0,
      },
      activar_repeticiones: false,
      editAtributoItems: [],
      createItemAtributo: {
        item: "",
      },
      variationValuesforChild: [],
      itemsSelected_id: [],
      itemsSelected_nombres: [],
      createVariacion: {
        product: 0,
        stock: 0,
        price: 0,
        no_stock: false,
      },
      updateVariacion: {
        id: 0,
        price: 0,
        stock: 0,
        item: "",
      },
    };
  },

  methods: {
    /* VARIACIONES METHODS */

    UpdateOpciones() {
      let data = {
        has_options: this.product.has_options,
      };

      axios
        .put(
          this.server + "/api/v1/admin/product/atributo/update/" + this.product.id,
          data,
          {
            headers: {
              Authorization: localStorage.getItem("access"),
            },
          }
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    SetUpdateVariacion(variacion) {
      console.log(variacion);
      this.updateVariacion = {
        id: variacion.id,
        price: variacion.price,
        stock: variacion.stock,
        item: variacion.item[0].item,
      };
    },

    UpdateVariacion() {
      axios
        .put(
          this.server + "/api/v1/admin/variation/update/" + this.updateVariacion.id,
          this.updateVariacion,
          {
            headers: {
              Authorization: localStorage.getItem("access"),
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          this.$swal.fire(
            "Variacion Actualizada!",
            "Se ha actualizado correctamente esta variacion!",
            "success"
          );
          this.GetVariacionOffProduct(this.product);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    DeleteVariacion(variacion) {
      this.$swal
        .fire({
          title: "Esta seguro?",
          text: "Esta a punto de eliminar esta variacion.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "SI, Borrarla!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(this.server + "/api/v1/admin/variation/delete/" + variacion.id, {
                headers: {
                  Authorization: localStorage.getItem("access"),
                },
              })
              .then((response) => {
                console.log(response);
                this.$swal.fire(
                  "Variacion eliminada!",
                  "La variacion ha sido eliminada correctamente.",
                  "success"
                );
                this.GetVariacionOffProduct(this.product);
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
    },

    CreateVariacion() {
      console.log("create Varaicon");
      console.log("this.product");
      console.log(this.product);
      /* Crear variacion */
      this.createVariacion.item = this.itemsSelected_id;
      console.log(this.createVariacion);
      this.createVariacion.product = this.product.id;
      axios
        .post(this.server + "/variations/variaciones/", this.createVariacion, {
          headers: {
            Authorization: localStorage.getItem("access"),
          },
        })
        .then((response) => {
          console.log(response);
          this.$swal.fire(
            "Variacion Creada!",
            "Se ha creado una nueva variacion para este producto.",
            "success"
          );
          this.clear();
          this.GetVariacionOffProduct(this.product);
          this.createVariacion = {
            product: this.product.id,
            stock: 0,
            price: "",
            no_stock: false,
          };
        })
        .catch((error) => {
          console.log(error);
        });
    },

    BuscarVaracion() {
      /* Buscar si ya existe */
      let data = {
        product: this.product.id,
        item: this.itemsSelected_id,
      };
      if (this.itemsSelected_id.length == 0) {
        this.$swal.fire({
          title: "Atencion",
          icon: "info",
          text: "Debe seleccionar los items para crear la variacion!",
        });
      }
      let variSelect = 0;

      axios
        .post(this.server + "/api/v1/admin/product/variations/search/", data)
        .then((response) => {
          console.log(variSelect);
          console.log("estamos por aca");
          console.log(response.data);
          let variacion = response.data;
          if (variacion.length > 0) {
            variacion.forEach((vari) => {
              if (vari.repeticiones === this.atributos.length) {
                console.log(vari.pk);
                variSelect = vari.pk;
                console.log("variSelect");
                console.log(variSelect);
                this.$swal.fire({
                  title: "Atencion",
                  icon: "info",
                  text: "Esta variacion ya existe!",
                });
              }
            });
          }
          if (variSelect == 0) {
            console.log("vale 0");
            console.log(variSelect);
            this.CreateVariacion();
          } else {
            console.log("distinto de 0");
            console.log(variSelect);
          }
        });
    },

    clear() {
      this.itemsSelected_id = [];
      this.itemsSelected_nombres = [];
    },

    SelectVariation(value) {
      if (this.variationValuesforChild.length == this.atributos.length) {
        this.variationValuesforChild.splice(0, this.variationValuesforChild.length);
        this.itemsSelected_id.splice(0, this.itemsSelected_id.length);
        this.itemsSelected_nombres.splice(0, this.itemsSelected_nombres.length);
      }

      if (this.variationValuesforChild.some((elem) => elem.id === value.id)) {
        var index = this.variationValuesforChild.findIndex(
          (item) => item.id === value.id
        );
        this.variationValuesforChild.splice(index, 1, value);
      } else {
        this.variationValuesforChild.push(value);
      }

      console.log("this.varationValuesforChild");
      console.log(this.variationValuesforChild);

      let items = [];

      let items_nombre = [];

      this.variationValuesforChild.forEach((item) => {
        items.push(item.id);
        items_nombre.push(item.item);
      });
      this.itemsSelected_id = items;
      this.itemsSelected_nombres = items_nombre;

      console.log("====items=====");
      console.log(items);
      console.log("====items=====");
      console.log("=====itemsSelected_id====");
      console.log(this.itemsSelected_id);
      console.log("=====items_nombre====");
      console.log(items_nombre);
    },

    UpdateHasVariation(value) {
      console.log(value);
      if (value == true) {
        console.log("ejecuto true");
        let data = {
          only_attribute: false,
          has_variation: true,
        };
        axios
          .put(
            this.server +
              "/api/v1/admin/product/variation/type/update/" +
              this.product.id,
            data,
            {
              headers: {
                Authorization: localStorage.getItem("access"),
              },
            }
          )
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      if (value == false) {
        console.log("ejecuto false");
        let data = {
          has_variation: false,
        };
        axios
          .put(
            this.server +
              "/api/v1/admin/product/variation/type/update/" +
              this.product.id,
            data,
            {
              headers: {
                Authorization: localStorage.getItem("access"),
              },
            }
          )
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    GetVariacionOffProduct(product) {
      axios
        .get(this.server + "/api/v1/admin/product/variation/view/?product=" + product.id)
        .then((response) => {
          console.log("GetVariacionOffProduct");
          console.log(response.data.results);
          this.variaciones = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    /* ATRIBUTOS METHODS*/
    CreateItemAtributo() {
      const data = new FormData();
      data.append("atributo", this.editAtributoItems.id);
      data.append("item", this.createItemAtributo.item);

      axios
        .post(this.server + "/api/v1/admin/product/atributo/item/create", data, {
          headers: {
            Authorization: localStorage.getItem("access"),
          },
        })
        .then((response) => {
          console.log(response);
          this.$swal.fire(
            "Item Creado!",
            "Se ha creado un nuevo item al atributo.",
            "success"
          );
          this.GetAtributosConItems(this.product);
          this.createItemAtributo.item = "";
        })
        .catch((error) => {
          console.log(error);
        });
    },

    SetEditAtributoItems(atributo) {
      this.editAtributoItems = atributo;
      console.log(this.editAtributoItems);
    },

    CreateItemAtributo() {
      const data = new FormData();
      data.append("atributo", this.editAtributoItems.id);
      data.append("item", this.createItemAtributo.item);

      axios
        .post(this.server + "/api/v1/admin/product/atributo/item/create", data, {
          headers: {
            Authorization: localStorage.getItem("access"),
          },
        })
        .then((response) => {
          console.log(response);
          this.$swal.fire(
            "Item Creado!",
            "Se ha creado un nuevo item al atributo.",
            "success"
          );
          this.GetAtributosConItems(this.product_prop);
          this.createItemAtributo.item = "";
        })
        .catch((error) => {
          console.log(error);
        });
    },

    CreateAtributo() {
      const data = new FormData();
      data.append("product", this.product_prop.id);
      data.append("nombre", this.createAtributo.nombre);
      data.append("repeat", this.createAtributo.repeat);

      axios
        .post(this.server + "/api/v1/admin/product/atributo/create", data, {
          headers: {
            Authorization: localStorage.getItem("access"),
          },
        })
        .then((response) => {
          console.log(response);
          this.$swal.fire(
            "Atributo Creado!",
            "Se ha creado un nuevo atributo para este producto.",
            "success"
          );
          this.createAtributo.nombre = "";
          this.GetAtributosConItems(this.product);
        });
    },

    DeteleAtributo(atributo) {
      this.$swal
        .fire({
          title: "Esta seguro?",
          text: "Esta a punto de eliminar este atributo de este producto.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "SI, Borrarlo!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(
                this.server +
                  "/api/v1/admin/product/atributo/delete/" +
                  atributo.id +
                  "/",
                {
                  headers: {
                    Authorization: localStorage.getItem("access"),
                  },
                }
              )
              .then((response) => {
                console.log(response);
                this.$swal.fire(
                  "Producto eliminado!",
                  "El atributo ha sido eliminado correctamente.",
                  "success"
                );
                this.GetAtributosConItems(this.product);
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
    },

    GetAtributosConItems(product) {
      axios
        .get(this.server + "/api/v1/admin/product/atributos/", {
          headers: {
            Authorization: localStorage.getItem("access"),
          },
          params: {
            product: product.id,
          },
        })
        .then((response) => {
          console.log(response.data.results);
          console.log("atributos");
          this.atributos = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.variations {
  margin-bottom: 200px !important;
}
.behind-modal {
  z-index: -1;
}
.atributos {
  z-index: -1;
}
.col-lg-3,
.col-md-4 {
  height: 100vh; /* Cambiar por la altura deseada */
}
</style>
