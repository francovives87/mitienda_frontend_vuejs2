<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary bg-light fixed-top shadow-sm">
    <div class="container d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center text-center">
        <button
          type="button"
          class="btn btn-outline-secondary me-2 back-button"
          @click="$router.go(-1)"
          v-if="GroupMenu === 'store'"
        >
          <font-awesome-icon icon="fa-solid fa-arrow-left-long" />
        </button>

        <div class="d-flex align-items-center">
          <router-link
            :to="{ name: 'home' }"
            class="navbar-brand mx-auto text-center d-flex align-items-center"
            ><img src="img/mitienda_logo_3_2_512.png" class="logo_mitienda" />
            <span class="text_mitienda"> Mitienda </span>
            <span class="text_app">.app</span></router-link
          >
        </div>
      </div>
      <div class="d-flex align-items-center">
        <div class="dropdown-wrapper me-2">
          <!-- Dropdown content -->
          <div class="dropdown">
            <button
              class="btn btn-outline-secondary dropdown-toggle btn-no-border"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <font-awesome-icon icon="fa-solid fa-user" />
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li v-if="user_email">
                <span class="user_email"> {{ user_email }} </span>
              </li>
              <li>
                <router-link
                  v-if="access_token == false"
                  :to="{ name: 'login' }"
                  class="link"
                  >ingresar</router-link
                >
                <router-link
                  v-if="access_token == true"
                  :to="{ name: 'login' }"
                  class="link"
                  >mi cuenta</router-link
                >
              </li>
              <li>
                <router-link
                  v-if="access_token == false"
                  :to="{ name: 'register' }"
                  class="link"
                  >registrarme</router-link
                >
                <a v-if="access_token == true" class="link" @click="CloseSession()"
                  >cerrar sesion</a
                >
              </li>
            </ul>
          </div>
        </div>
        <button
          type="button"
          class="btn btn-outline-secondary position-relative"
          v-if="access_token == true && this.mitienda.length <= 0"
          @click="CreateStore()"
        >
          <span
            class="position-absolute d-flex justify-content-start top-0 translate-middle bg-success rounded-circle p-0 align-middle"
          >
            <span
              style="
                display: inline-block;
                width: 20px;
                height: 20px;
                font-size: 14px;
                line-height: 20px;
                text-align: center;
                color: #fff;
              "
              >+</span
            >
          </span>
          <font-awesome-icon icon="fa-solid fa-store" />
        </button>

        <!-- MENU ADMIN -->
        <div class="d-flex align-items-center" v-if="this.mitienda.length > 0">
          <div class="dropdown-wrapper me-2">
            <!-- Dropdown content -->
            <div class="dropdown">
              <button
                class="btn btn-outline-secondary dropdown-toggle btn-no-border"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <font-awesome-icon icon="fa-solid fa-store" />
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <li v-if="mitienda">
                  <span class="user_email"> {{ mitienda[0].name }} </span>
                </li>
                <li>
                  <a v-if="this.mitienda.length > 0" @click="GoToMyStore()" class="link"
                    >Ver mi tienda
                    <span style="margin-left: 10px"
                      ><font-awesome-icon
                        style="font-size: 18px; color: #6c757d"
                        icon="fa-regular fa-eye"
                    /></span>
                  </a>
                </li>
                <li>
                  <router-link :to="{ name: 'admin_products' }" class="link"
                    >Publicar</router-link
                  >
                </li>
                <li>
                  <router-link :to="{ name: 'admin_orders' }" class="link"
                    >Ordenes</router-link
                  >
                </li>
                <li>
                  <router-link :to="{ name: 'admin_settings' }" class="link"
                    >Configuracion</router-link
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "Navbar",
  props: ["update"],

  watch: {
    update(value) {
      console.log("watch update");
      console.log(value);
      this.ModificarUserMenu();
    },
  },

  mounted() {
    this.ModificarUserMenu();
  },

  computed: {
    ...mapState("user", ["mitienda"]),
    ...mapState("tienda", ["tienda"]),
    GroupMenu() {
      return this.$route.meta.group; // obtiene el grupo de la ruta activa
    },
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 1;
        case "sm":
          return 1;
        case "md":
          return 2;
        case "lg":
          return 4;
        case "xl":
          return 6;
      }
    },
  },

  data() {
    return {
      user_email: null,
      access_token: false,
    };
  },
  methods: {
    ...mapMutations("user", ["ClearTiendaState", "ClearVisitorId"]),

    GoToMyStore() {
      console.log("GoToMyStore");
      this.$router.push({
        path: "/" + this.mitienda[0].domain,
        props: {
          change_domain: this.mitienda[0].domain,
        },
      });
    },

    CreateStore() {
      this.$router.push({
        name: "createStore",
      });
    },

    ModificarUserMenu() {
      this.user_email = localStorage.getItem("email");
      if (localStorage.getItem("access")) {
        this.access_token = true;
      }
      this.update = "";
    },

    CloseSession() {
      localStorage.removeItem("access");
      localStorage.removeItem("cod_ref");
      localStorage.removeItem("email");
      localStorage.removeItem("refresh");
      localStorage.removeItem("username");
      localStorage.removeItem("visitor");
      this.ClearVisitorId();
      this.user_email = null;
      this.access_token = false;
      this.ClearTiendaState();
      this.$router.push({
        name: "home",
      });
    },
  },
};
</script>

<style scoped>
.logo_mitienda {
  height: 30px !important;
  margin-right: 5px !important;
}
.text_mitienda {
  text-transform: uppercase;
  font-weight: 600;
  color: #5e0b85 !important;
}
.text_app {
  font-size: 14px !important;
}

.navbar {
  background-color: #ffffff !important;
}
.link {
  font-size: 12px !important;
  text-transform: uppercase !important;
  margin-left: 10px !important;
}
.link:hover {
  background-color: transparent !important;
}

.user_email {
  font-size: 12px !important;
  text-transform: lowercase;
  padding-left: 4px;
}
.dropdown {
  border: none !important;
}
.dropdown-wrapper {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  z-index: 1000;
  width: 250px;
}
.back-button {
  border-radius: 0%;
  border-left: none !important;
  border-top: none !important;
  border-bottom: none !important;
  height: 100% !important;
}
.btn-no-border {
  border: none !important;
}
li {
  padding: 5px 3px 5px 3px !important;
  border-bottom: 1px solid gainsboro;
}
li:hover {
  padding: 5px 3px 5px 3px !important;
  background-color: gainsboro;
}
.link_style {
  color: transparent !important;
}
@media (max-width: 991px) {
  .logo_mitienda {
    height: 30px !important;
    margin-right: 5px !important;
  }

  .dropdown-menu {
    position: absolute;
    right: 0;
    z-index: 1000;
    width: 200px;
  }
}
</style>
