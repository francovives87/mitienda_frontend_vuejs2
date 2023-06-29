<template>
  <div class="MiTiendaSettingsWpOrders">
    <div class="card shadow-sm">
      <div class="card-body">
        <h5 class="card-title">
          <font-awesome-icon icon="fa-solid fa-bag-shopping" /> Recibir Ordenes y
          Consultas
        </h5>
        <div class="form-group">
          <label for="switch_email"
            ><font-awesome-icon icon="fa-solid fa-envelope" /> Por E-mail</label
          >
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              id="switch_email"
              v-model="mitienda[0].store_settings[0].order_email"
              @change="UpdateOrdersRecive()"
            />
          </div>
        </div>
        <div class="form-group">
          <label for="switch_wp"
            ><font-awesome-icon icon="fa-brands fa-whatsapp" /> Por Whatsapp</label
          >
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              id="switch_wp"
              v-model="mitienda[0].store_settings[0].order_wp"
            />
          </div>
          <p
            style="font-size: 12px"
            v-if="mitienda[0].store_settings[0].order_wp == true"
          >
            Ingrese su numero de WhatsApp para recibir las ordenes y las consultas.
          </p>
          <input
            class="form-control mt-2"
            type="text"
            placeholder="Numero de WhatsApp"
            aria-label="default input example"
            v-if="mitienda[0].store_settings[0].order_wp == true"
            v-model="mitienda[0].store_settings[0].wp_number"
          />
          <div class="mt-2 d-flex justify-content-end">
            <button class="btn btn-primary btn-sm" @click="UpdateOrdersRecive()">
              <span><font-awesome-icon icon="fa-solid fa-floppy-disk" /> GUARDAR</span>
            </button>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-lg-12 col-xs-12">
            <p class="mt-2" style="font-size: 12px">
              Si eliges recibir las órdenes por correo electrónico, tendrás la ventaja de
              contar con un registro digital detallado de todas las transacciones
              realizadas en tu tienda. Podrás revisar y gestionar las órdenes de manera
              eficiente, manteniendo un seguimiento ordenado de tus ventas. Por otro lado,
              si activas la opción de recibir órdenes por WhatsApp <br />
              <span v-if="leer_mas == false" class="d-flex justify-content-end">
                <a
                  style="font-size: 12px important; color: blue !important"
                  @click="leer_mas = true"
                  >leer mas</a
                >
              </span>
              <span v-if="leer_mas == true">
                además de las órdenes, también podrás recibir consultas sobre tus
                productos directamente en tu aplicación de mensajería. Esto te permitirá
                establecer una comunicación más rápida y personalizada con tus clientes,
                brindándoles un servicio excepcional y resolviendo sus dudas de manera
                inmediata. Tendrás todas las herramientas necesarias para impulsar tu
                negocio y mantener una relación cercana con tus compradores.</span
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
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
export default {
  name: "MiTiendaSettingsWpOrders",

  computed: {
    ...mapState("user", ["mitienda"]),
  },

  data() {
    return {
      wp_number: null,
      leer_mas: false,
    };
  },

  methods: {
    SaveWpNumber() {
      console.log("SaveWpNumber");
      let data = {
        wp_number: this.mitienda[0].store_settings[0].wp_number,
      };
      axios
        .put(
          this.server +
            "/api/v1/admin/tienda/settings/orders/wpnumber/" +
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
          console.log("res_SaveWpNumber");
          console.log(response.data);
          this.$swal.fire(
            "WhatsApp configurado correctamente!",
            "Ahora puede recibir ordenes y consultas de la tienda a su WhatsApp.",
            "success"
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },

    UpdateOrdersRecive() {
      console.log("UpdateOrdersRecive");
      let data = {
        order_email: this.mitienda[0].store_settings[0].order_email,
        order_wp: this.mitienda[0].store_settings[0].order_wp,
      };
      axios
        .put(
          this.server +
            "/api/v1/admin/tienda/settings/orders/recive/" +
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
          if (this.mitienda[0].store_settings[0].order_wp == true) {
            this.SaveWpNumber();
          } else {
            this.$swal.fire(
              "WhatsApp Desactivado correctamente!",
              "Ha desactivado recibir ordenes y consultas por WhatsApp.",
              "info"
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style></style>
