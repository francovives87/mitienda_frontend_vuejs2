<template>
  <div class="AdminStoreSettings">
    <!-- menu mobile -->
    <div class="barra_mobile d-block d-sm-none">
      <div class="container">
        <div class="row d-flex align-items-center">
          <div class="col-8 col-xs-8 p-2">
            <font-awesome-icon icon="fa-solid fa-gears" />
            <span style="font-size: 12px"> CONFIGURACION DE LA TIENDA </span>
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
              style="margin-top:55px;"
              tabindex="-1"
              id="offcanvasMenuMobile"
              aria-labelledby="offcanvasMenuMobileLabel"
            >
              <div class="offcanvas-header">
                <div class="offcanvas-title" id="offcanvasMenuMobileLabel">
                  <font-awesome-icon icon="fa-solid fa-gears" />
                  <span style="font-size: 12px"> CONFIGURACION DE LA TIENDA </span>
                </div>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div class="offcanvas-body">
                <StoreSettingsMenu @vista="handleLinkSelected" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- menu mobile -->
    <div class="container-fluid contenido_settings">
      <div class="row">
        <div
          class="col-3 d-none d-xl-block d-xxl-none"
          style="background-color: #f5f5f5; height: 100vh; overflow-y: scroll"
        >
          <div class="col-12 col-lg-12 p-2 mt-2 mb-2 border-bottom">
            <font-awesome-icon icon="fa-solid fa-gears" />
            <span style="font-size: 14px"> CONFIGURACION DE LA TIENDA </span>
          </div>
          <!-- Contenido de la barra lateral izquierda -->
          <StoreSettingsMenu @vista="handleLinkSelected" />
        </div>

        <div class="col" style="height: 100vh; overflow-y: scroll">
          <!-- Contenido de la sección principal -->
          <MiTiendaSettingsComponent v-if="display_view == 'miTiendaSettings'" />
          <PaymentsMethodsComponent v-if="display_view == 'paymentsMethodSettings'" />
          <AdminEnviosComponent v-if="display_view == 'AdminEnvios'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MiTiendaSettingsComponent from "../../components/admin/settings/MiTiendaSettingsComponent.vue";
import StoreSettingsMenu from "../../components/admin/settings/StoreSettingsMenu.vue";
import PaymentsMethodsComponent from "../../components/admin/settings/PaymentsMethodsComponent.vue";
import AdminEnviosComponent from "../../components/admin/envios/AdminEnviosComponent.vue";
export default {
  name: "AdminStoreSettings",
  components: {
    MiTiendaSettingsComponent,
    StoreSettingsMenu,
    PaymentsMethodsComponent,
    AdminEnviosComponent
  },
  data() {
    return {
      display_view: "miTiendaSettings",
    };
  },

  methods: {
    cerrarOffcanvas() {
      console.log("cerrarOffcanvas");
      const offcanvas = document.querySelector(".offcanvas.show");
      if (offcanvas) {
        const btn = offcanvas.querySelector('[data-bs-dismiss="offcanvas"]');
        if (btn) {
          btn.click();
        }
      }
    },

    handleLinkSelected(value) {
      this.cerrarOffcanvas();
      console.log("handleLinkSelected");
      console.log(value);
      this.display_view = value;
    },
  },
};
</script>

<style scoped>
.AdminStoreSettings {
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
