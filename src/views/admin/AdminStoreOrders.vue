<template>
  <div class="AdminStoreOrders">
    <!-- menu mobile -->
    <div class="barra_mobile d-block d-sm-none">
      <div class="container">
        <div class="row d-flex align-items-center">
          <div class="col-8 col-xs-8 p-2">
            <font-awesome-icon icon="fa-solid fa-list-check" />
            <span style="font-size: 12px"> LISTA DE ORDENES POR FECHA </span>
          </div>
          <div class="col-4 col-xs-4 p-2 d-flex justify-content-end">
            <button
              class="btn btn-outline-secondary"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasMenuMobile"
              aria-controls="offcanvasMenuMobile"
            >
              <font-awesome-icon icon="fa-solid fa-bars" />
            </button>

            <div
              class="offcanvas offcanvas-start"
              style="margin-top: 55px"
              tabindex="-1"
              id="offcanvasMenuMobile"
              aria-labelledby="offcanvasMenuMobileLabel"
            >
              <div class="offcanvas-header">
                <div class="offcanvas-title" id="offcanvasMenuMobileLabel">
                  <font-awesome-icon icon="fa-solid fa-list-check" />
                  <span style="font-size: 12px"> LISTA DE ORDENES POR FECHA </span>
                </div>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div class="offcanvas-body">
                <AdminOrdersMenu
                  @fecha="GetOrderByDate"
                  v-if="mitienda[0].id > 0"
                  :mitienda="mitienda[0]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- menu mobile -->
    <div class="container-fluid">
      <div class="row">
        <div
          class="col-3 d-none d-xl-block d-xxl-none"
          style="background-color: #f5f5f5; height: 100vh; overflow-y: scroll"
        >
          <!-- Contenido de la barra lateral izquierda -->
          <AdminOrdersMenu
            @fecha="GetOrderByDate"
            v-if="mitienda[0].id > 0"
            :mitienda="mitienda[0]"
          />
        </div>
        <div class="col" style="height: 100vh; overflow-y: scroll">
          <!-- Contenido de la sección principal -->
          <AdminOrdersView :order="order" v-if="order_vista == 'order_detail'" />
          <AdminOrdersList
            v-if="order_vista == 'orders_list'"
            :fecha_emitida="fecha_selected"
            @showOrder="ShowOrder"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AdminOrdersMenu from "../../components/admin/orders/AdminOrdersMenu.vue";
import AdminOrdersView from "../../components/admin/orders/AdminOrdersView.vue";
import AdminOrdersList from "../../components/admin/orders/AdminOrdersList.vue";
export default {
  name: "AdminStoreOrders",
  components: {
    AdminOrdersMenu,
    AdminOrdersView,
    AdminOrdersList,
  },

  mounted() {
    this.GetIfParams();
  },

  computed: {
    ...mapState("user", ["mitienda"]),
  },

  data() {
    return {
      order: {
        order_id: 0,
        tienda_id: 0,
      },
      fecha_selected: null,
      order_vista: "content",
    };
  },

  methods: {
    CerrarOffcanvas() {
      const offcanvas = document.querySelector(".offcanvas.show");
      if (offcanvas) {
        const btn = offcanvas.querySelector('[data-bs-dismiss="offcanvas"]');
        if (btn) {
          btn.click();
        }
      }
    },

    ShowOrder(value){
      this.order={
        order_id:value,
        tienda_id:this.mitienda[0].id
      }
      this.order_vista = "order_detail";
    },

    GetOrderByDate(value) {
      console.log("Fecha emitida");
      console.log(value);
      this.fecha_selected = value;
      this.order_vista = "orders_list";
      this.CerrarOffcanvas();
    },

    GetIfParams() {
      /* hay Orden? */
      const url = new URL(window.location.href);

      // Obtener la cadena de consulta de la URL
      const queryString = url.search;

      // Crear un nuevo objeto URLSearchParams
      const searchParams = new URLSearchParams(queryString);

      // Acceder a los parámetros de la URL
      const order = searchParams.get("order");
      const tienda = searchParams.get("tienda");
      console.log("order");
      console.log(order);
      console.log(tienda);
      this.order = {
        order_id: order,
        tienda_id: tienda,
      };
      if (order > 0) {
        this.order_vista = "order_detail";
      }

      console.log(this.order);
    },
  },
};
</script>

<style scoped>
.AdminStoreOrders {
  margin-top: 56px !important;
}

@media (max-width: 768px) {
  .barra_mobile {
    height: 60px;
    background-color: #f5f5f5;
    width: 100% !important;
    margin-top: 53px !important;
    position: fixed;
    top: 0;
    z-index: 1000;
  }
  .contenido_settings {
    margin-top: 120px;
  }
}
</style>
