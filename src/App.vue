<template>
  <div class="app">
    <NavbarComponent v-if="status_load == 'procesado'" :update="update_nav_bar" />
    <LoadingComponent v-if="status_load == 'en_proceso'" />
    <router-view v-if="status_load == 'procesado'" @email="handleLoginSuccessful" />
  </div>
</template>

<script>
import NavbarComponent from "../src/components/mitienda/NavbarComponent.vue";
import LoadingComponent from "../src/components/mitienda/LoadingComponent.vue";
import { mapState, mapMutations } from "vuex";
import axios from "axios";
export default {
  name: "App",

  components: {
    NavbarComponent,
    LoadingComponent,
  },
  created() {
    this.FirstIncome();
  },
  mounted() {
    setInterval(() => {
      console.log("arranca este");
      this.getTokenAndRefresh();
    }, 840000);
  },

  data() {
    return {
      status_load: "en_proceso",
      update_nav_bar: "",
      tienda_data: null,
    };
  },

  methods: {
    ...mapMutations("user", ["AddMiTienda", "AddVisitorId"]),

    handleLoginSuccessful(email) {
      console.log("Login successful!");
      // Aquí se puede hacer cualquier otra acción necesaria
      this.update_nav_bar = email;
    },

    CreateVisitor() {
      axios
        .post(this.server + "/api/v1/user/visitor/create/")
        .then((response) => {
          console.log("CreateVisitor");
          console.log(response.data);
          localStorage.setItem("visitor", response.data.id);
          this.AddVisitorId(response.data.id);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    FirstIncome() {
      /* vistor */
      if (localStorage.getItem("visitor")) {
        console.log("hay visitor");
        this.AddVisitorId(localStorage.getItem("visitor"));
      } else {
        console.log("NO hay visitor");
        this.CreateVisitor();
      }
      /* user */
      if (localStorage.getItem("refresh")) {
        const accessData = {
          refresh: localStorage.getItem("refresh"),
        };
        axios
          .post(this.server + "/api/v1/token/refresh/", accessData)
          .then((response) => {
            const access = response.data.access;
            let bearer_access = "Bearer " + access;
            localStorage.setItem("access", bearer_access);
            console.log(response.data.access);
            axios
              .get(this.server + "/api/v1/tienda/user/token/", {
                headers: {
                  Authorization: localStorage.getItem("access"),
                },
              })
              .then((response) => {
                console.log("data tienda");
                console.log(response.data);
                if (response.data.length > 0) {
                  this.AddMiTienda(response.data);
                }
              })
              .catch((error) => {
                console.log(error);
              });
            this.status_load = "procesado";
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.status_load = "procesado";
        console.log("NO HAY REGISTRO CREO VISIT");
      }
    },

    getTokenAndRefresh() {
      if (localStorage.getItem("refresh")) {
        const accessData = {
          refresh: localStorage.getItem("refresh"),
        };
        axios
          .post(this.server + "/api/v1/token/refresh/", accessData)
          .then((response) => {
            const access = response.data.access;
            let bearer_access = "Bearer " + access;
            localStorage.setItem("access", bearer_access);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.load = true;
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Oswald:wght@500&display=swap");

body {
  font-family: "Oswald", sans-serif;
  font-weight: 500;
}
a {
  text-decoration: none !important;
  color: black !important;
  cursor: pointer !important;
}
a:hover {
  color: #000000 !important;
}
</style>
