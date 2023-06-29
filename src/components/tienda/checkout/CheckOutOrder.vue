<template>
  <div class="CheckOutOrder">
    <CheckOutCompletedSucces v-if="checkout_status == 'completado'" />
    <ProcesandoComponent v-if="checkout_status == 'procesando'" />
    <CheckOutCompletedError v-if="checkout_status == 'error'" :motivo="motivo_error" />
    <div class="CheckOut" v-if="checkout_status == 'en_espera'">
      <div class="container">
        <div class="row">
          <div class="col-12 col-lg-6 col-xs-12">
            <TiendaCartSumaryComponent />
          </div>
          <div class="col-12 col-lg-6 col-xs-12">
            <div class="card shadow">
              <div class="card-body">
                <div class="card-title"><h6>Orden y pago</h6></div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="PatmentsRadios"
                    id="ordenar"
                    value="ordenar"
                    v-model="paymentSeleccionado"
                  />
                  <label class="form-check-label" for="ordenar"> Ordenar </label> <br />
                  <span style="font-size: 12px"
                    >(Se crea la orden y el pago se hace en efectivo o como se acuerde con
                    el dueño de la tienda)</span
                  >
                </div>
                <div
                  class="form-check"
                  v-if="tienda.store_settings[0].mercadopago == true"
                >
                  <input
                    class="form-check-input"
                    type="radio"
                    name="PatmentsRadios"
                    id="mercadopago"
                    value="mercadopago"
                    v-model="paymentSeleccionado"
                  />
                  <label class="form-check-label" for="mercadopago">MercadoPago </label>
                  <br />
                  <span style="font-size: 12px"
                    >(Se crea la orden y se realiza el pago a travez de mercadopago sin
                    intervencion.)</span
                  >
                </div>
                <div class="form-check" v-if="tienda.store_settings[0].transfer == true">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="PatmentsRadios"
                    id="transferencia"
                    value="transferencia"
                    v-model="paymentSeleccionado"
                  />
                  <label class="form-check-label" for="transferencia">
                    Transferencia
                  </label>
                  <br />
                  <span style="font-size: 12px"
                    >(Se crea la orden y se muestra a continuacion el CBU para realizar la
                    transferencia.)</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container mt-2">
        <div class="row">
          <div class="col-12 col-lg-6 col-xs-12">
            <div class="card shadow">
              <div class="card-body">
                <div class="card-title"><h6>Envio</h6></div>
                <div class="form-check" v-for="envio in envios" :key="envio.id">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="envioRadios"
                    :id="'envio_' + envio.id"
                    :value="envio.id"
                    v-model="envioSeleccionado"
                    @change="EnvioNombre(envio.name)"
                  />
                  <label class="form-check-label" :for="'envio_' + envio.id">
                    <span> {{ envio.name }} ($ {{ envio.price }}) </span> <br />
                    <span style="font-size: 12px">{{ envio.description }}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 col-lg-6 col-xs-12">
            <div class="card shadow">
              <div class="card-body d-flex justify-content-center">
                <button class="btn btn-success custom-btn-success" @click="Ordernar()">
                  <font-awesome-icon icon="fa-solid fa-bag-shopping" /> Finalizar Orden
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import axios from "axios";
import TiendaCartSumaryComponent from "../../tienda/TiendaCartSumaryComponent.vue";
import ProcesandoComponent from "../../tienda/checkout/ProcesandoComponent.vue";
import CheckOutCompletedSucces from "./CheckOutCompletedSucces.vue";
import CheckOutCompletedError from "./CheckOutCompletedError.vue";
export default {
  name: "CheckOutOrder",
  props: ["user_data"],
  components: {
    TiendaCartSumaryComponent,
    ProcesandoComponent,
    CheckOutCompletedSucces,
    CheckOutCompletedError,
  },

  mounted() {
    this.GetEnvios();
  },

  data() {
    return {
      checkout_status: "en_espera",
      envios: [],
      envioSeleccionado: null,
      paymentSeleccionado: null,
      motivo_error: null,
      envio_nombre: null,
    };
  },
  computed: {
    ...mapState("tienda", ["tienda"]),
    ...mapState("cart", ["cart", "count", "total", "total_total"]),
  },

  methods: {
    ...mapMutations("cart", ["ClearCart", "AddEnvio"]),

    EnvioNombre(envio) {
      this.envio_nombre = envio;
      console.log("EnvioNombre");
      console.log(this.envio_nombre);
    },

    FinalizarOrden() {
      this.ClearCart();
      this.envioSeleccionado = null;
      this.paymentSeleccionado = null;
      this.checkout_status = "completado";
    },
    VistaError(motivo) {
      this.checkout_status = "error";
      this.motivo_error = motivo;
    },

    Ordernar() {
      console.log("CreateOrder");
      console.log(this.envioSeleccionado);
      console.log(this.paymentSeleccionado);
      let ejecutar_orden = null;
      let falta = null;
      if (this.envioSeleccionado == null) {
        ejecutar_orden = false;
        falta = "envio";
      }
      if (this.paymentSeleccionado == null) {
        ejecutar_orden = false;
        falta = "metodo de pago";
      }

      if (ejecutar_orden == false) {
        this.$swal.fire(
          "Falta seleccionar: " + falta,
          "Por favor para completar la orden elija un " + falta,
          "info"
        );
      } else {
        this.$swal
          .fire({
            title: "¿Confirmar la orden?",
            text: "Esta a punto de terminar su orden",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#198754",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si! confirmar",
          })
          .then((result) => {
            if (this.user_data.user_data_id != null) {
              console.log("ejecuto create order User");
              this.CreateOrderUser();
            }
            if (this.user_data.user_anonymous_id != null) {
              console.log("ejecuto create anonymous data user");
              this.CreateAnonymousOrder();
            }
          });
      }
    },

    SendWhatsApp(cart, order_id) {
      let message = "Mitienda.app\n\n";

      message += "*Nuevo Pedido! ID #*" + order_id + "\n";
      message +=
        "Link de la orden: " +
        "https://mitienda.app/admin/orders?order_id=" +
        order_id +
        "\n\n";

      message += "*RESUMEN DE LA ORDEN:*\n";
      message += "Total: " + this.total_total + "\n";
      message += "Cantidad de productos: " + this.count + "\n";
      message += "Envio: " + this.envio_nombre + "\n\n";

      message += "*DATOS DEL CLIENTE:*\n";
      message +=
        "Nombre: " +
        this.user_data.data.nombre +
        " " +
        this.user_data.data.apellido +
        "\n";
      if (this.user_data.data.pais) {
        message += "Pais: " + this.user_data.data.pais + "\n";
      }
      if (this.user_data.data.estado) {
        message += "Estado/Provincia: " + this.user_data.data.estado + "\n";
      }
      if (this.user_data.data.ciudad) {
        message += "Ciudad: " + this.user_data.data.ciudad + "\n";
      }
      if (this.user_data.data.codigo_postal) {
        message += "Codigo postal: " + this.user_data.data.codigo_postal + "\n";
      }
      message += "Direccion: " + this.user_data.data.direccion + "\n";
      if (this.user_data.data.apartamento) {
        message += "Apartamento: " + this.user_data.data.apartamento + "\n";
      }
      message += "Telefono : " + this.user_data.data.telefono + "\n";
      if (this.user_data.data.email) {
        message += "E-mail : " + this.user_data.data.email + "\n\n";
      }
      message += "*DETALLE DE LA ORDEN:*\n";

      cart.forEach((product) => {
        message += `*${product.title}*\n`;

        if (product.opciones) {
          message += `(Opciones: ${product.opciones.join(", ")})\n`;
        } else if (product.variaciones) {
          message += `(Variaciones: ${product.variaciones.join(", ")})\n`;
        }
        if (product.in_offer) {
          message += `Precio: ${product.in_offer_price}\n`;
          message += `Cantidad: ${product.quantity}\n`;
          message += `Subtotal: ${product.in_offer_price * product.quantity}\n\n`;
        } else {
          message += `Precio: ${product.price}\n`;
          message += `Cantidad: ${product.quantity}\n`;
          message += `Subtotal: ${product.price * product.quantity}\n\n`;
        }
      });

      console.log("SendWhatsApp");
      let formattedMessage = encodeURIComponent(message);
      let whatsappNumber = this.tienda.store_settings[0].wp_number;

      const whatsappLink = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${formattedMessage}`;

      window.open(whatsappLink, "_self");
    },

    CreateOrderUser() {
      this.checkout_status = "procesando";
      let order = {
        total: this.total_total,
        metodo_pago: this.paymentSeleccionado,
        quantity_products: this.count,
        personal_user_data: this.user_data.user_data_id,
        productos: this.cart,
        tienda: this.tienda.id,
        envio: this.envioSeleccionado,
      };
      axios
        .post(this.server + "/api/v1/tienda/order/user/create", order, {
          headers: {
            Authorization: localStorage.getItem("access"),
          },
        })
        .then((response) => {
          console.log("order_data");
          console.log(response.data);
          let order_id = response.data.orden_id;
          console.log(this.tienda.store_settings[0].order_wp);

          if (this.tienda.store_settings[0].order_wp == true) {
            this.SendWhatsApp(this.cart, order_id);
          }
          this.FinalizarOrden();
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response.data.msj);
          if (error.response.data.msj) {
            this.VistaError("Limite de ordenes superado para esta tienda.");
          }
        });
    },

    CreateAnonymousOrder() {
      this.checkout_status = "procesando";
      let order = {
        total: this.total_total,
        metodo_pago: this.paymentSeleccionado,
        quantity_products: this.count,
        anonymous_user_data: this.user_data.user_anonymous_id,
        productos: this.cart,
        tienda: this.tienda.id,
        envio: this.envioSeleccionado,
      };
      axios
        .post(this.server + "/api/v1/tienda/order/anonymous/create", order)
        .then((response) => {
          console.log("order_data");
          console.log(response.data);
          let order_id = response.data.orden_id;
          if (this.tienda.store_settings[0].order_wp == true) {
            this.SendWhatsApp(this.cart, order_id);
          }
          this.FinalizarOrden();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    GetEnvios() {
      axios
        .get(this.server + "/api/v1/tienda/envios/", {
          params: {
            tienda: this.tienda.id,
          },
        })
        .then((response) => {
          this.envios = response.data.results;
          console.log(this.envios);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.data.msj) {
            this.VistaError("Limite de ordenes superado para esta tienda.");
          }
        });
    },
  },
};
</script>

<style scoped>
.custom-btn-success {
  background-color: #1c8c6e;
  border-color: #1c8c6e;
  height: 46px !important;
  width: 200px;
  font-weight: 800;
}
.custom-btn-success:hover {
  background-color: #0d503c;
  border-color: #0d503c;
}
</style>
