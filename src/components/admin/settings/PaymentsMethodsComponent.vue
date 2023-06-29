<template>
  <div class="PaymentsMethodsComponent">
    <div class="container mt-3 mb-3">
      <div class="row">
        <div class="col-12">
          <font-awesome-icon icon="fa-solid fa-credit-card" />
          <span> METODOS DE COBRO</span>
        </div>
      </div>
    </div>

    <div class="container mt-3">
      <div class="row border-top">
        <div class="col-12 col-lg-4 col-xs-12 mt-3">
          <div class="card shadow">
            <div class="card-body">
              <div class="form-group">
                <label for="switch1">Ordenar</label>
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="switch1"
                    v-model="mitienda[0].store_settings[0].only_order"
                    @change="UpdatePaymentsMethods"
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="switch2">Mercadopago</label>
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="switch2"
                    v-model="mitienda[0].store_settings[0].mercadopago"
                    @change="UpdatePaymentsMethods"
                  />
                  <a
                    href="#"
                    class="text-decoration-none d-flex justify-content-end align-items-center"
                    style="font-size: 12px"
                    v-if="mitienda[0].store_settings[0].mercadopago == true"
                  >
                    <font-awesome-icon icon="fa-solid fa-pen-to-square" /> CONFIGURAR</a
                  >
                </div>
              </div>
              <div class="form-group">
                <label for="switch3">Transferencia</label>
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="switch3"
                    v-model="mitienda[0].store_settings[0].transfer"
                    @change="UpdatePaymentsMethods"
                  />
                  <a
                    href="#"
                    class="text-decoration-none d-flex justify-content-end align-items-center"
                    style="font-size: 12px"
                    v-if="mitienda[0].store_settings[0].transfer == true"
                  >
                    <font-awesome-icon icon="fa-solid fa-pen-to-square" /> CONFIGURAR</a
                  >
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
import { mapState } from "vuex";
import axios from "axios";
export default {
  name: "PaymentsMethodsComponent",
  data() {
    return {};
  },
  computed: {
    ...mapState("user", ["mitienda"]),
  },

  methods: {
    UpdatePaymentsMethods() {
      console.log("UpdatePaymentsMethods");
      let data = {
        only_order: this.mitienda[0].store_settings[0].only_order,
        transfer: this.mitienda[0].store_settings[0].transfer,
        mercadopago: this.mitienda[0].store_settings[0].mercadopago,
      };
      axios
        .put(
          this.server +
            "/api/v1/admin/tienda/settings/payments/methods/" +
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

<style></style>
