<template>
  <div class="AdminOrdersView">
    <div class="container mt-3">
      <div class="row">
        <div class="col-12">
          <div class="card shadow rounded">
            <div class="card-body">
              <div class="container">
                <div class="row">
                  <div class="col-9 col-lg-10">
                    <h6>Detalle de la orden: #{{ order.order_id }}</h6>
                    <p class="detalle_orden">
                      Total: $ {{ orderDetail.total }} <br />
                      Cantidad de productos: {{ orderDetail.quantity_products }} <br />
                      Metodo de pago : {{ orderDetail.metodo_pago }} <br />
                      <span v-if="orderDetail.metodo_pago == 'mercadopago'">
                        MercadoPago estado:
                        <span
                          v-if="orderDetail.mercado_pago_approved == true"
                          style="color: green"
                          >Pago Aprobado</span
                        >
                        <span
                          v-if="orderDetail.mercado_pago_approved == false"
                          style="color: red"
                        >
                          Pago Rechazado o Cancelado
                        </span>
                      </span>
                      <br />
                      <font-awesome-icon icon="dollar-sign" /> Pago:
                      <span style="color: orange" v-if="orderDetail.pago == 'pendiente'"
                        >{{ orderDetail.pago }} <font-awesome-icon icon="clock"
                      /></span>
                      <span
                        style="color: green"
                        v-if="orderDetail.pago == 'completado'"
                        >{{ orderDetail.pago }}</span
                      >
                      <br />
                      Estado de la orden:
                      <span v-if="orderDetail.estado == 'Visto'" style="color: blue"
                        >{{ orderDetail.estado }} &nbsp;
                        <font-awesome-icon icon="check-double"
                      /></span>
                      <span v-if="orderDetail.estado == 'en espera'" style="color: orange"
                        >{{ orderDetail.estado }} &nbsp; <font-awesome-icon icon="clock"
                      /></span>
                      <span v-if="orderDetail.estado == 'cancelada'" style="color: red"
                        >{{ orderDetail.estado }} &nbsp; <font-awesome-icon icon="times"
                      /></span>
                      <span
                        v-if="orderDetail.estado == 'Orden completada'"
                        style="color: green"
                        >{{ orderDetail.estado }} &nbsp; <font-awesome-icon icon="check"
                      /></span>
                      <span
                        v-if="orderDetail.estado == 'Producto despachado'"
                        style="color: purple"
                        >{{ orderDetail.estado }} &nbsp; <font-awesome-icon icon="truck"
                      /></span>
                      <br />
                      Fecha: {{ orderDetail.created }}
                    </p>
                  </div>
                  <div class="col-3 col-lg-2">
                    <div class="btn-group">
                      <button
                        type="button"
                        class="btn btn-outline-secondary dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <font-awesome-icon icon="fa-solid fa-gears" />
                      </button>
                      <ul class="dropdown-menu" style="color: blank !important">
                        <li>
                          <a
                            class="dropdown-item"
                            @click="OrderEstado('producto_despachado')"
                            >Producto despachado</a
                          >
                        </li>
                        <li>
                          <a
                            class="dropdown-item"
                            @click="OrderEstado('orden_completada')"
                            >Orden completada</a
                          >
                        </li>
                        <li><hr class="dropdown-divider" /></li>
                        <li>
                          <a class="dropdown-item" @click="OrderPagoEstado('completado')"
                            >Pago completado</a
                          >
                        </li>
                        <li>
                          <a class="dropdown-item" @click="OrderPagoEstado('pendiente')"
                            >Pago pendiente</a
                          >
                        </li>
                        <li><hr class="dropdown-divider" /></li>
                        <li>
                          <a class="dropdown-item" @click="CancelOrder()"
                            >Cancelar Orden</a
                          >
                        </li>
                        <li>
                          <a class="dropdown-item" @click="DeleteOrder()"
                            >Eliminar Orden</a
                          >
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="container" v-if="orderDetail.mercado_pago_approved">
                  <div class="row">
                    <div class="col-12">
                      <div class="card">
                        <div class="card-body">
                          <h6>MercadoPago Comprobante</h6>

                          <div class="row">
                            <div class="col-6 col-sm-6">
                              <p class="detalle_orden">
                                <span class="data_item">collection_id: </span
                                >{{ mercadoPago_detail.collection_id }} <br />
                                <span class="data_item">collection_status: </span
                                >{{ mercadoPago_detail.collection_status }} <br />
                                <span class="data_item">payment_type: </span
                                >{{ mercadoPago_detail.payment_type }} <br />
                              </p>
                            </div>
                            <div class="col-6 col-sm-6">
                              <p class="detalle_orden">
                                <span class="data_item">payment_id: </span
                                >{{ mercadoPago_detail.payment_id }} <br />

                                <span class="data_item">merchant_order_id: </span
                                >{{ mercadoPago_detail.merchant_order_id }} <br />

                                <span class="data_item">external_reference: </span
                                >{{ mercadoPago_detail.external_reference }} <br />
                              </p>
                            </div>
                            <div class="col-12">
                              <p>
                                <span style="font-size: 12px">
                                  Recuerde comprobar y comparar estos datos en su cuenta
                                  de MercadoPago.</span
                                >
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="container" v-if="orderDetail.personal_user_data">
                <div class="row">
                  <div class="col-12">
                    <div class="card">
                      <div class="card-body">
                        <h6>Datos del comprador</h6>
                        <br />
                        <div class="row">
                          <div class="col-6 col-sm-6">
                            <p class="detalle_orden">
                              <span class="data_item">Nombre: </span
                              >{{ orderDetail.personal_user_data.nombre }} <br />
                              <span class="data_item">Apellido: </span
                              >{{ orderDetail.personal_user_data.apellido }} <br />
                              <span class="data_item">Pais: </span
                              >{{ orderDetail.personal_user_data.pais }} <br />

                              <span class="data_item">Provincia: </span
                              >{{ orderDetail.personal_user_data.estado }} <br />

                              <span class="data_item">Ciudad: </span
                              >{{ orderDetail.personal_user_data.ciudad }} <br />
                            </p>
                          </div>
                          <div class="col-6 col-sm-6">
                            <p class="detalle_orden">
                              <span class="data_item">Direccion: </span
                              >{{ orderDetail.personal_user_data.direccion }} <br />

                              <span class="data_item">cod postal: </span
                              >{{ orderDetail.personal_user_data.codigo_postal }} <br />

                              <span class="data_item">Telefono: </span
                              >{{ orderDetail.personal_user_data.telefono }} <br />

                              <span class="data_item">Email: </span
                              >{{ orderDetail.personal_user_data.user.email }} <br />

                              <span class="data_item">Username: </span
                              >{{ orderDetail.personal_user_data.user.username }} <br />
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="container" v-if="orderDetail.envio">
                <div class="row">
                  <div class="col-12">
                    <div class="card">
                      <div class="card-body">
                        <h6>Envio Seleccionado</h6>
                        <div class="row">
                          <div class="col-12">
                            <p class="detalle_orden">
                              <span class="data_item">Nombre: </span
                              >{{ orderDetail.envio.name }} <br />
                              <span class="data_item">Descripcion: </span
                              >{{ orderDetail.envio.description }} <br />
                              <span class="data_item">Precio: </span
                              >{{ orderDetail.envio.price }} <br />
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="container" v-if="orderDetail.anonymous_user_data">
                <div class="row">
                  <div class="col-12">
                    <div class="card">
                      <div class="card-body">
                        <h6>Datos del comprador</h6>
                        <br />
                        <span>Usuario no registrado.</span>
                        <div class="row">
                          <div class="col-6 col-sm-6">
                            <p class="detalle_orden">
                              <span class="data_item">Nombre: </span
                              >{{ orderDetail.anonymous_user_data.nombre }} <br />
                              <span class="data_item">Apellido: </span
                              >{{ orderDetail.anonymous_user_data.apellido }} <br />
                              <span class="data_item">Pais: </span
                              >{{ orderDetail.anonymous_user_data.pais }} <br />

                              <span class="data_item">Provincia: </span
                              >{{ orderDetail.anonymous_user_data.estado }} <br />

                              <span class="data_item">Ciudad: </span
                              >{{ orderDetail.anonymous_user_data.ciudad }} <br />
                            </p>
                          </div>
                          <div class="col-6 col-sm-6">
                            <p class="detalle_orden">
                              <span class="data_item">Direccion: </span
                              >{{ orderDetail.anonymous_user_data.direccion }} <br />

                              <span class="data_item">cod postal: </span
                              >{{ orderDetail.anonymous_user_data.codigo_postal }} <br />

                              <span class="data_item">Telefono: </span
                              >{{ orderDetail.anonymous_user_data.telefono }} <br />

                              <span class="data_item">Email: </span
                              >{{ orderDetail.anonymous_user_data.email }} <br />
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Lista de productos -->

              <div class="container">
                <div class="row">
                  <div class="col-12">
                    <div
                      class="card ordenes"
                      v-for="(product, index) in orderDetail.productos"
                      :key="index"
                    >
                      <div class="card-body">
                        <div class="row">
                          <div class="col-4">
                            <img
                              class="img_product"
                              :src="server + product.product.image"
                              alt=""
                            />
                          </div>
                          <div class="col-8">
                            <h6 class="card-title">
                              {{ product.product.title }}
                            </h6>
                            <div>
                              <p>
                                <span class="product_item"> Cantidad: </span
                                ><span class="product_item_content">
                                  {{ product.quantity }}
                                </span>
                                <br />
                                <span class="product_item"> Precio: $ </span
                                ><span class="product_item_content">
                                  {{ product.price_sale }}
                                </span>
                                <br />
                                <span class="product_item"> subtotal: $ </span
                                ><span class="product_item_content">
                                  {{ product.quantity * product.price_sale }}
                                </span>
                                <br />
                              </p>
                            </div>
                          </div>
                        </div>
                        <div
                          class="row d-flex justify-content-end"
                          v-if="product.variacion_id != null"
                        >
                          <AdminOrderProductVariation
                            v-if="product.variacion_id != null"
                            :product="product"
                          />
                        </div>
                        <div
                          class="row d-flex justify-content-end"
                          v-if="product.options != null"
                        >
                          <div class="col-12">
                            <span style="font-size: 13px">opciones:</span>
                            <ul class="list-group list-group-flush">
                              <li
                                class="list-group-item"
                                v-for="(vari, index) in product.options"
                                :key="index"
                              >
                                {{ vari }}
                              </li>
                            </ul>
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
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AdminOrderProductVariation from "./AdminOrderProductVariation.vue";
export default {
  name: "AdminOrdersView",
  props: ["order"],
  components: {
    AdminOrderProductVariation,
  },

  mounted() {
    this.GetOrder();
  },
  data() {
    return {
      orderDetail: [],
    };
  },
  methods: {
    GetOrder() {
      axios
        .get(this.server + "/api/v1/admin/order/view", {
          headers: {
            Authorization: localStorage.getItem("access"),
          },
          params: {
            tienda: this.order.tienda_id,
            order: this.order.order_id,
          },
        })
        .then((response) => {
          this.orderDetail = response.data.results[0];
          console.log(this.orderDetail);
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
.img_product {
  width: 100px;
  height: 100px;
}
.product_item {
  font-size: 12px;
}
@media (max-width: 768px) {
  .AdminOrdersView {
    margin-top: 70px !important;
  }
  .img_product {
    width: 60px;
    height: 60px;
  }
}
</style>
