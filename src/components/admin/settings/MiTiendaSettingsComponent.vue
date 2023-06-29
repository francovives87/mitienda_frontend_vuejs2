<template>
  <div class="MiTiendaSettingsComponent">
    <div class="container mt-3">
      <div class="row">
        <div class="col-12">
          <font-awesome-icon icon="fa-solid fa-store" />
          <span> MI TIENDA</span>
        </div>
      </div>
    </div>

    <div class="container border-top mt-3">
      <div class="row d-flex justify-content-beetween">
        <div class="col-12 col-lg-6 col-xs-12">
          <div class="card mt-3">
            <div class="card-body">
              <p>
                ¡Bienvenido a la sección de configuración de tu tienda en nuestro
                marketplace! Aquí podrás personalizar y ajustar todos los detalles de tu
                tienda para ofrecer la mejor experiencia a tus clientes. <br />
                <span v-if="leer_mas == false" class="d-flex justify-content-end">
                  <a
                    style="font-size: 12px important; color: blue !important"
                    @click="leer_mas = true"
                    >leer mas</a
                  >
                </span>
                <span v-if="leer_mas == true">
                  En esta sección, podrás configurar el tipo de tienda, si es una tienda
                  convencional o de envios. Además, podrás establecer la localización de
                  tu tienda para que los usuarios puedan encontrarte fácilmente. También
                  te brindamos la opción de elegir cómo deseas recibir las órdenes: ya sea
                  a través de correo electrónico, para tener un registro digital, o por
                  WhatsApp, para una comunicación más directa y ágil. Estamos aquí para
                  ayudarte a personalizar tu tienda y facilitar tus operaciones en nuestro
                  marketplace.</span
                >
                <br />
                <span v-if="leer_mas == true" class="d-flex justify-content-end">
                  <a
                    style="font-size: 12px important; color: blue !important"
                    @click="leer_mas = false"
                    >ocultar</a
                  >
                </span>
              </p>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-4 col-xs-12 mt-3">
          <div class="card" style="width: 18rem">
            <div class="card-body">
              <h5 class="card-title">Mi Tienda / Mi Plan</h5>

              <table class="table">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Mi Tienda</th>
                    <th scope="col">Mi Plan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="col" style="font-size: 10px">PRODUCTOS</th>
                    <td>{{ mitienda[0].total_products }}</td>
                    <td>{{ mitienda[0].plan.product_products }}</td>
                  </tr>
                  <tr>
                    <th scope="col" style="font-size: 10px">ORDENES</th>
                    <td>0</td>
                    <td>0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="row mb-3">
        <div class="col-12 border-top mt-3 mb-3"></div>
        <div class="col-12 col-lg-4 col-xs-12 mt-3">
          <div class="card shadow-sm">
            <div class="card-body">
              <h5 class="card-title">Opciones de tienda</h5>
              <div class="btn-group" role="group" aria-label="Opciones de tienda">
                <input
                  type="radio"
                  class="btn-check"
                  name="options"
                  id="tienda-estandar"
                  autocomplete="off"
                  v-model="mitienda[0].store_settings[0].tipo_tienda"
                  value="store"
                  @change="UpdateTipoTienda()"
                />
                <label class="btn btn-outline-primary" for="tienda-estandar"
                  >Tienda estándar</label
                >

                <input
                  type="radio"
                  class="btn-check"
                  name="options"
                  id="tienda-envios"
                  autocomplete="off"
                  v-model="mitienda[0].store_settings[0].tipo_tienda"
                  value="order"
                  @change="UpdateTipoTienda()"
                />
                <label class="btn btn-outline-primary" for="tienda-envios"
                  >Tienda de envíos</label
                >
              </div>
              <div class="row">
                <div class="col-12 col-lg-12 col-xs-12">
                  <p class="mt-3" style="font-size: 12px">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex molestias
                    ut error exercitationem, quo cumque dicta sequi explicabo obcaecati
                    aliquam expedita placeat aperiam aspernatur nesciunt quibusdam. Vel
                    magnam deserunt amet.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-4 col-xs-12 mt-3">
          <div class="card shadow-sm">
            <div class="card-body">
              <h5 class="card-title">Geolocalizacion de la tienda</h5>
              <div class="d-flex justify-content-center">
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#GeoSettingsModal"
                  @click="geoSettingsOpen = true"
                >
                  <font-awesome-icon icon="fa-solid fa-location-dot" />
                  <span style="font-size: 12px; font-weight: 900"> CONFIGURAR</span>
                </button>
              </div>
              <div class="container mt-3" v-if="mitienda[0].geo_tienda[0]">
                <div class="row">
                  <p v-if="mitienda[0].geo_tienda[0].id > 0" style="font-size: 12px">
                    {{ mitienda[0].geo_tienda[0].country }},
                    {{ mitienda[0].geo_tienda[0].state }},
                    {{ mitienda[0].geo_tienda[0].city }} <br />
                    {{ mitienda[0].geo_tienda[0].state_district }} <br />
                    {{ mitienda[0].geo_tienda[0].region }} <br />
                    {{ mitienda[0].geo_tienda[0].municipality }} <br />
                    {{ mitienda[0].geo_tienda[0].suburb }} <br />
                    {{ mitienda[0].geo_tienda[0].road }}
                    {{ mitienda[0].geo_tienda[0].house_number }} <br />
                    {{ mitienda[0].geo_tienda[0].postcode }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-4 col-xs-12 mt-3">
          <MiTiendaSettingsWpOrders />
        </div>
      </div>
    </div>
    <!-- MODALES -->

    <!-- Modal -->
    <div
      class="modal fade"
      id="GeoSettingsModal"
      tabindex="-1"
      aria-labelledby="GeoSettingsModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-scrollable modal-fullscreen-md-down modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="GeoSettingsModalLabel">
              <font-awesome-icon icon="fa-solid fa-location-dot" /> Configuracion de
              geolocalizacion
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="geoSettingsOpen = false"
            ></button>
          </div>
          <div class="modal-body">
            <GeoSettingsComponent v-if="geoSettingsOpen == true" />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="geoSettingsOpen = false"
            >
              Cerrar
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
import GeoSettingsComponent from "./GeoSettingsComponent.vue";
import MiTiendaSettingsWpOrders from "./MiTiendaSettingsWpOrders.vue";
export default {
  name: "MiTiendaSettingsComponent",
  components: {
    GeoSettingsComponent,
    MiTiendaSettingsWpOrders,
  },
  data() {
    return {
      tipo_tienda: "",
      geoSettingsOpen: false,
      leer_mas: false,
    };
  },
  computed: {
    ...mapState("user", ["mitienda"]),
  },
  methods: {
    UpdateTipoTienda() {
      console.log("UpdateTipoTienda");
      let data = {
        tipo_tienda: this.mitienda[0].store_settings[0].tipo_tienda,
      };
      axios
        .put(
          this.server +
            "/api/v1/admin/tienda/settings/type/" +
            this.mitienda[0].store_settings[0].id +
            "/",
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
  },
};
</script>

<style scoped></style>
