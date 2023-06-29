<template>
  <div class="AdminEnviosComponent">
    <div class="container mt-3">
      <div class="row">
        <div class="col-12">
          <div class="card shadow rounded">
            <div class="card-body">
              <div class="container mb-3">
                <div class="row d-flex justify-content-between align-items-center">
                  <div class="col-5 col-lg-3 col-xs-5">
                    <h6 class="mt-3">
                      <font-awesome-icon icon="fa-solid fa-truck" /> ENVIOS
                    </h6>
                  </div>
                  <div class="col-7 col-lg-3 col-xs-7">
                    <button
                      type="button"
                      class="btn btn-outline-success"
                      data-bs-toggle="modal"
                      data-bs-target="#enviosModal"
                    >
                      + Crear Envio
                    </button>
<!--                     <button
                      type="button"
                      class="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#zoneModal"
                    >
                      Zona
                    </button> -->
                  </div>
                </div>
              </div>

              <ul class="list-group list-group-flush">
                <li
                  class="list-group-item border-top border-bottom"
                  v-for="(envio, index) in envios"
                  :key="index"
                >
                  <div class="container">
                    <div class="row">
                      <div class="col-6 col-lg-3 col-xs-6">
                        {{ envio.name }}
                      </div>
                      <div class="col-3 col-lg-3 col-xs-3 d-none d-sm-block">
                        {{ envio.description }}
                      </div>
                      <div class="col-3 col-lg-3 col-xs-3 d-none d-sm-block">
                        {{ envio.price }}
                      </div>
                      <div class="col-6 col-lg-3 col-xs-6 d-flex justify-content-center">
                        <span
                          ><a
                            style="color: blue !important"
                            data-bs-toggle="modal"
                            data-bs-target="#editarEnvioModal"
                            @click="SetEditEnvio(envio)"
                            ><font-awesome-icon icon="fa-solid fa-pencil" /></a
                        ></span>
                        <span>
                          <a
                            style="color: red !important; margin-left: 30px !important"
                            @click="DeleteEnvio(envio)"
                          >
                            <font-awesome-icon icon="fa-solid fa-trash" /></a
                        ></span>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MODALES -->

    <!-- modal zone -->
    <!-- Button trigger modal -->

    <!-- Modal -->
    <div
      class="modal fade"
      id="zoneModal"
      tabindex="-1"
      aria-labelledby="zoneModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="zoneModalLabel">Modal title</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <DeliveryZone />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Crear envio -->
    <div
      class="modal fade"
      id="enviosModal"
      tabindex="-1"
      aria-labelledby="enviosModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-scrollable modal-fullscreen-md-down">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="enviosModalLabel">
              <font-awesome-icon icon="fa-solid fa-truck" /> Crear envio
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="name">Nombre</label>
              <input type="text" class="form-control" v-model="envio.name" />

              <label for="description">Descripción</label>
              <textarea
                class="form-control"
                rows="3"
                v-model="envio.description"
              ></textarea>

              <label for="price">Precio</label>
              <input type="number" class="form-control" v-model="envio.price" />
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
              @click="CreateEnvio()"
            >
              Crear Envio
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Editar envio -->
    <div
      class="modal fade"
      id="editarEnvioModal"
      tabindex="-1"
      aria-labelledby="editarEnvioModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-scrollable modal-fullscreen-md-down">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="editarEnvioModalLabel">
              <font-awesome-icon icon="fa-solid fa-truck" /> Editar Envio
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="name">Nombre</label>
              <input type="text" class="form-control" v-model="envio_edit.name" />

              <label for="description">Descripción</label>
              <textarea
                class="form-control"
                rows="3"
                v-model="envio_edit.description"
              ></textarea>

              <label for="price">Precio</label>
              <input type="number" class="form-control" v-model="envio_edit.price" />
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
              @click="UpdateEnvio()"
            >
              Actualizar envio
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import DeliveryZone from './DeliveryZone.vue';
export default {
  components:{
    DeliveryZone
  },

  mounted() {
    this.GetEnvios();
  },
  data() {
    return {
      tienda_id: 0,
      envios: [],
      envio: {
        nombre: "",
        description: "",
        price: 0,
      },
      envio_edit: {
        id: 0,
        name: "",
        description: "",
        price: 0,
      },
    };
  },
  computed: {
    ...mapState("user", ["mitienda"]),
  },
  methods: {
    DeleteEnvio(envio) {
      this.$swal
        .fire({
          title: "Esta seguro?",
          text: "Esta seguro que quiere eliminar este envio?!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, Borrarla!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(
                this.server + "/api/v1/admin/tienda/envio/delete/" + envio.id + "/",
                {
                  headers: {
                    Authorization: localStorage.getItem("access"),
                  },
                }
              )
              .then((response) => {
                console.log(response.data);
                this.GetEnvios();
                this.$swal.fire(
                  "Envio Eliminado!",
                  "Se ha eliminado correctamente este envio",
                  "success"
                );
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
    },

    UpdateEnvio() {
      this.envio_edit.tienda = this.mitienda[0].id;
      axios
        .put(
          this.server + "/api/v1/admin/tienda/envio/update/" + this.envio_edit.id + "/",
          this.envio_edit,
          {
            headers: {
              Authorization: localStorage.getItem("access"),
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          this.$swal.fire(
            "Envio Actualizado!",
            "Se actualizo correctamente el envio.",
            "success"
          );
          this.GetEnvios();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    SetEditEnvio(envio) {
      this.envio_edit = {
        id: envio.id,
        name: envio.name,
        description: envio.description,
        price: envio.price,
      };
    },

    CreateEnvio() {
      this.envio.tienda = this.mitienda[0].id;

      axios
        .post(this.server + "/api/v1/admin/tienda/envio/create/", this.envio, {
          headers: {
            Authorization: localStorage.getItem("access"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.GetEnvios();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    GetEnvios() {
      axios
        .get(this.server + "/api/v1/tienda/envios/", {
          params: {
            tienda: this.mitienda[0].id,
          },
        })
        .then((response) => {
          this.envios = response.data.results;
          console.log(this.envios);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.card {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}

.card-title,
.card-text {
  margin-bottom: 1rem;
}
</style>
