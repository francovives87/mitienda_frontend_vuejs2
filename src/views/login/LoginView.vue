<template>
  <div class="LoginView">
    <div class="container-fluid" v-if="verified == true">
      <div class="row verified_contain">
        <div class="col-12 col-lg-12 col-sm-12 col-xs-12 col-md-12 check_container">
          <div class="icon_check d-flex justify-content-center">
            <font-awesome-icon icon="fa-regular fa-circle-check" />
          </div>
          <h6 class="d-flex justify-content-center">EMAIL VERIFICADO CORRECTAMENTE</h6>
          <span class="d-flex justify-content-center text-center" style="font-size: 13px"
            >Ya puede ingresar al sistema,ingrese sus crendenciales y haga click en
            "iniciar sesion"</span
          >
        </div>
      </div>
    </div>
    <div class="container-fluid form_contain">
      <div class="row d-flex justify-content-center align-items-center">
        <div class="col-sm-8 col-md-6 col-lg-4">
          <div class="card">
            <div class="card-body">
              <h1 class="card-title text-center">Iniciar sesión</h1>
              <form @submit.prevent="submit">
                <div class="form-group">
                  <label for="email">Correo electrónico</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    v-model="email"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="password">Contraseña</label>
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    v-model="password"
                    required
                  />
                </div>
                <div class="d-flex justify-content-end">
                  <button type="submit" class="btn btn-primary btn-block mt-3">
                    Iniciar sesión
                  </button>
                </div>
              </form>
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
export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
      verified: false,
    };
  },

  mounted() {
    this.GetParams();
  },

  methods: {
    ...mapMutations("user", ["AddMiTienda", "AddVisitorId"]),
    GetParams() {
      let urlParams = new URLSearchParams(window.location.search);
      this.codigo = urlParams.get("codigo");
      this.cod_ref = parseInt(urlParams.get("coderef"));
      console.log("GET PARAMS");
      console.log(this.codigo);
      if (this.codigo !== null && this.cod_ref !== null) {
        console.log("HAY PARAMS");
        this.VerifyEmail();
      } else {
        console.log("NO HAY PARAMS");
      }
    },
    VerifyEmail() {
      axios
        .get(this.server + "/api/v1/email-verify/", {
          params: {
            codigo: this.codigo,
            coderef: this.cod_ref,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.verified = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    CreateUserVisitor() {
      let data = {
        user: localStorage.getItem("cod_ref"),
      };
      axios
        .post(this.server + "/api/v1/user/visitor/create/", data)
        .then((response) => {
          console.log("CreateUserVisitor");
          console.log(response.data);
          localStorage.setItem("visitor", response.data.id);
          this.AddVisitorId(response.data.id);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    submit() {
      const formData = {
        email: this.email,
        password: this.password,
      };
      axios
        .post(this.server + "/api/v1/login/", formData)
        .then((response) => {
          if (response.data.tokens.access) {
            console.log("LOGIN");
            console.log(response.data);
            const access = response.data.tokens.access;
            const refresh = response.data.tokens.refresh;
            const cod_ref = response.data.credentials.cod_ref;
            const username = response.data.username;
            const email = response.data.email;
            let auth_access = "Bearer " + access;
            console.log(auth_access);
            localStorage.setItem("access", auth_access);
            localStorage.setItem("refresh", refresh);
            localStorage.setItem("cod_ref", cod_ref);
            localStorage.setItem("username", username);
            localStorage.setItem("email", email);
            if (response.data.visitor_id == null) {
              console.log("No User_Visitor /lo creo");
              this.CreateUserVisitor();
            } else {
              console.log("HAY user_visitor /actualizo storage");
              localStorage.setItem("visitor", response.data.visitor_id);
              this.AddVisitorId(response.data.visitor_id);
            }

            this.$emit("email", email);
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
            this.$router.push({
              name: "home",
            });
          }
        })
        .catch((error) => {
          console.log("ERROR");
          console.log(error.response.data.detail);
          if (error.response.data.detail == "Email is not verified") {
            this.$swal.fire(
              "Correo Electronico no verificado!",
              "Ingrese a su correo electronico y busque nuestro email para verificar su cuenta y poder ingresar al sistema.",
              "info"
            );
          }
          if (error.response.data.detail == "Invalid credentials, try again") {
            this.$swal.fire(
              "Credenciales Incorrectas",
              "Esta ingresando un correo y/o contraseña incorrecta!",
              "error"
            );
          }
          if (error.response.data.detail == "Not is admin") {
            this.$swal.fire(
              "Usted no es administrador!",
              "No tiende permisos de administrador",
              "info"
            );
          }
        });
    },
  },
};
</script>

<style scoped>
.verified_contain {
  margin-top: 100px;
}
.form_contain {
  margin-top: 150px !important;
}
.icon_check {
  font-size: 60px;
  margin-bottom: 20px;
  color: green;
}
</style>
