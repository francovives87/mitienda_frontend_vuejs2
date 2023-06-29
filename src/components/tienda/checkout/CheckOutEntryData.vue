<template>
  <div class="CheckOutEntryData">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">Datos para la orden</div>
            <div class="card-body">
              <form @submit.prevent="submitForm">
                <div class="row mb-3">
                  <div class="col">
                    <label for="nombre" class="form-label">Nombre:</label>
                    <input
                      type="text"
                      class="form-control"
                      id="nombre"
                      v-model="personal_data.nombre"
                      required
                    />
                  </div>
                  <div class="col">
                    <label for="apellido" class="form-label">Apellido:</label>
                    <input
                      type="text"
                      class="form-control"
                      id="apellido"
                      v-model="personal_data.apellido"
                      required
                    />
                  </div>
                </div>
                <div class="col" v-if="tienda.store_settings[0].tipo_tienda == 'store'">
                  <label for="dni" class="form-label">DNI:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="dni"
                    v-model="personal_data.dni"
                    required
                  />
                </div>
                <div
                  class="row mb-3"
                  v-if="tienda.store_settings[0].tipo_tienda == 'store'"
                >
                  <div class="col">
                    <label for="pais" class="form-label">País:</label>
                    <input
                      type="text"
                      class="form-control"
                      id="pais"
                      v-model="personal_data.pais"
                      required
                    />
                  </div>
                  <div class="col" v-if="tienda.store_settings[0].tipo_tienda == 'store'">
                    <label for="ciudad" class="form-label">Ciudad:</label>
                    <input
                      type="text"
                      class="form-control"
                      id="ciudad"
                      v-model="personal_data.ciudad"
                      required
                    />
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col" v-if="tienda.store_settings[0].tipo_tienda == 'store'">
                    <label for="estado" class="form-label">Estado/provincia:</label>
                    <input
                      type="text"
                      class="form-control"
                      id="estado"
                      v-model="personal_data.estado"
                      required
                    />
                  </div>
                  <div class="col" v-if="tienda.store_settings[0].tipo_tienda == 'store'">
                    <label for="codigo_postal" class="form-label">Código postal:</label>
                    <input
                      type="text"
                      class="form-control"
                      id="codigo_postal"
                      v-model="personal_data.codigo_postal"
                      required
                    />
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col">
                    <label for="direccion" class="form-label">Dirección:</label>
                    <input
                      type="text"
                      class="form-control"
                      id="direccion"
                      v-model="personal_data.direccion"
                      required
                    />
                  </div>
                  <div class="col">
                    <label for="apartamento" class="form-label">Apartamento:</label>
                    <input
                      type="text"
                      class="form-control"
                      id="apartamento"
                      v-model="personal_data.apartamento"
                    />
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col">
                    <label for="telefono" class="form-label">Teléfono:</label>
                    <input
                      type="text"
                      class="form-control"
                      id="telefono"
                      v-model="personal_data.telefono"
                      required
                    />
                  </div>
                </div>
                <div class="d-flex justify-content-end">
                  <button type="submit" class="btn btn-outline-secondary">
                    <font-awesome-icon icon="fa-solid fa-circle-arrow-right" /> CONTINUAR
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingComponent from "../../mitienda/LoadingComponent.vue";
import { mapState } from "vuex";
import axios from "axios";
export default {
  name: "CheckOutEntryData",
  components: {
    LoadingComponent,
  },
  data() {
    return {
      data_load: false,
      personal_data: {
        nombre: "",
        apellido: "",
        pais: "",
        ciudad: "",
        estado: "",
        direccion: "",
        apartamento: "",
        codigo_postal: "",
        telefono: "",
        dni: "",
      },
      hay_data_user: false,
      user_data_id: null,
      user_anonymous_id: null,
    };
  },

  mounted() {
    this.GetPersonalUserData();
    console.log("CheckOutEntryData");
  },

  computed: {
    ...mapState("tienda", ["tienda"]),
  },
  methods: {
    submitForm() {
      console.log("envio form");
      if (localStorage.getItem("access")) {
        if (this.hay_data_user == false) {
          this.CreateNewPersonalData();
        } else {
          this.UpdatePersonalDataUser();
        }
      } else {
        console.log("Anonimo");
        this.CreateAnonymousPersonalData();
      }
    },

    Continue(user_type) {
      let data = {
        vista: "finish_order",
        user_data_id: this.user_data_id,
        user_anonymous_id: this.user_anonymous_id,
        user_type: user_type,
        data: this.personal_data,
      };
      this.$emit("vista_checkout", data);
    },

    UpdatePersonalDataUser() {
      axios
        .put(
          this.server + "/api/v1/user/personal/update/" + this.user_data_id + "/",
          this.personal_data,
          {
            headers: {
              Authorization: localStorage.getItem("access"),
            },
          }
        )
        .then((response) => {
          console.log("UpdatePersonalDataUser");
          console.log(response.data);
          this.Continue("user");
        })
        .catch((error) => {
          console.log(error);
        });
    },

    CreateAnonymousPersonalData() {
      console.log("CreateAnonymousPersonalData");
      console.log(this.personal_data);
      axios
        .post(this.server + "/api/v1/user/data/anonymous/create", this.personal_data)
        .then((response) => {
          console.log("CreateAnonymousPersonalData");
          console.log(response.data);
          this.user_anonymous_id = response.data.id;
          this.Continue("anonimo");
        })
        .catch((error) => {
          console.log(error);
        });
    },

    CreateNewPersonalData() {
      axios
        .post(this.server + "/api/v1/user/personal/create/", this.personal_data, {
          headers: {
            Authorization: localStorage.getItem("access"),
          },
        })
        .then((response) => {
          console.log("submitForm");
          console.log(response.data);
          console.log("id");
          console.log(response.data.id);
          this.user_data_id = response.data.id;
          this.Continue("anonimo");
        })
        .catch((error) => {
          console.log(error);
        });
    },

    GetPersonalUserData() {
      console.log("hola");
      if (localStorage.getItem("cod_ref")) {
        axios
          .get(this.server + "/api/v1/user/data/personal/", {
            headers: {
              Authorization: localStorage.getItem("access"),
            },
          })
          .then((response) => {
            console.log("GetPersonalUserData");
            console.log(response.data);
            console.log(response.data.length);
            if (response.data.length > 0) {
              this.hay_data_user = true;
              this.personal_data = {
                nombre: response.data[0].nombre,
                apellido: response.data[0].apellido,
                pais: response.data[0].pais,
                ciudad: response.data[0].ciudad,
                estado: response.data[0].estado,
                direccion: response.data[0].direccion,
                apartamento: response.data[0].apartamento,
                codigo_postal: response.data[0].codigo_postal,
                telefono: response.data[0].telefono,
                dni: response.data[0].dni,
              };
              this.user_data_id = response.data[0].id;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style></style>
