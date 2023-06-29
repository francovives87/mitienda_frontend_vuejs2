<template>
  <div class="AdminOrdersList">
    <div class="container mt-3">
      <div class="row">
        <div class="col-12">
          <div class="card shadow rounded">
            <div class="card-body">
              <div class="container mt-3">
                <div class="row">
                  <div class="col-12">
                    <span
                      ><font-awesome-icon icon="fa-solid fa-bag-shopping" /> ORDENES
                    </span>
                    <span style="margin-left: 10px">{{
                      fecha_emitida.formatted_date
                    }}</span>
                  </div>
                </div>
              </div>
              <ul class="list-group list-group-flush">
                <li
                  class="list-group-item border-top border-bottom"
                  v-for="(order, index) in orders"
                  :key="index"
                >
                  <a @click="ShowOrder(order)">
                    <div class="container">
                      <div class="row">
                        <div class="col-12 col-lg-4 col-xs-12 list">
                          <span
                            ><font-awesome-icon
                              icon="fa-solid fa-hashtag"
                              class="order_icon"
                            />
                            ID:
                          </span>
                          <span class="order_list_data"> {{ order.id }} </span> <br />
                          <span>
                            <font-awesome-icon
                              icon="fa-solid fa-dollar-sign"
                              style="color: green"
                            />
                          </span>
                          <span class="order_list_data"> {{ order.total }} </span> <br />
                          <span class="badge bg-secondary">Estado: </span>
                          <span
                            class="order_list_data"
                            v-if="order.estado == 'en espera'"
                            style="color: orange"
                          >
                            {{ order.estado }}
                            <font-awesome-icon icon="fa-solid fa-clock" /> <br />
                          </span>
                          <span class="badge bg-secondary">Metodo de pago:</span>
                          <span class="order_list_data">{{ order.metodo_pago }} </span>
                          <br />
                          <span class="badge bg-secondary">Pago: </span>
                          <span
                            class="order_list_data"
                            v-if="order.pago == 'pendiente'"
                            style="color: orange"
                          >
                            {{ order.pago }}
                            <font-awesome-icon icon="fa-solid fa-clock" />
                          </span>
                        </div>
                        <div class="col-6 col-lg-4 d-none d-sm-block">
                          <p v-if="order.anonymous_user_data != null">
                            <span
                              ><font-awesome-icon icon="fa-solid fa-user" />
                              <h6>Datos del cliente</h6></span
                            >
                            <span class="badge bg-secondary">nombre</span>
                            {{ order.anonymous_user_data.nombre }}
                            {{ order.anonymous_user_data.apellido }} <br />
                            <span class="badge bg-secondary">telefono</span>
                            {{ order.anonymous_user_data.telefono }} <br />
                            <span class="badge bg-secondary">direccion</span>
                            {{ order.anonymous_user_data.direccion }}
                            {{ order.anonymous_user_data.apartamento }}
                          </p>
                          <p v-if="order.personal_user_data != null">
                            <span
                              ><font-awesome-icon icon="fa-solid fa-user" />
                              <h6>Datos del cliente</h6></span
                            >
                            <span class="badge bg-secondary">nombre</span>
                            {{ order.personal_user_data.nombre }}
                            {{ order.personal_user_data.apellido }} <br />
                            <span class="badge bg-secondary">telefono</span>
                            {{ order.personal_user_data.telefono }} <br />
                            <span class="badge bg-secondary">direccion</span>
                            {{ order.personal_user_data.direccion }}
                            {{ order.personal_user_data.apartamento }} <br />
                            <span class="badge bg-success">usuario</span>
                          </p>
                        </div>
                        <div class="col-6 col-lg-4 d-none d-sm-block">
                          <span
                            ><font-awesome-icon icon="fa-solid fa-box" />
                            <h6>Contenido</h6></span
                          >
                          <p>
                            <span class="badge bg-secondary">Cantidad de productos</span>
                            <span> {{ order.quantity_products }} </span> <br />
                            <span class="badge bg-secondary">Envio</span>
                            <span> {{ order.envio.name }} </span> <br />
                          </p>
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "AdminOrdersList",
  props: ["fecha_emitida"],

  data() {
    return {
      orders: [],
    };
  },

  mounted() {
    this.GetOrdersByDate();
  },

  computed: {
    ...mapState("user", ["mitienda"]),
  },

  watch: {
    fecha_emitida(value) {
      console.log("desde Watch");
      console.log(value);
      this.GetOrdersByDate();
    },
  },

  methods: {
    ShowOrder(order) {
      this.$emit("showOrder", order.id);
    },

    GetOrdersByDate() {
      axios
        .get(this.server + "/api/v1/admin/order/dates/list/", {
          headers: {
            Authorization: localStorage.getItem("access"),
          },
          params: {
            tienda: this.mitienda[0].id,
            fecha: this.fecha_emitida.original_date,
          },
        })
        .then((response) => {
          this.orders = response.data.results;
          console.log(this.orders);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
@media (max-width: 768px) {
  .AdminOrdersList {
    margin-top: 60px;
  }
  .list {
    font-size: 14px !important;
  }
}
</style>
