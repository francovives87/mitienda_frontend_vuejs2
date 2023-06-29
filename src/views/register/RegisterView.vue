<template>
  <div class="container register d-flex justify-content-center">
    <div class="row" v-if="status == 'registro_completo'">
      <div class="col-12 col-lg-12 col-sm-12 col-xs-12 col-md-12 check_container">
        <div class="icon_check d-flex justify-content-center">
          <font-awesome-icon icon="fa-regular fa-circle-check" />
        </div>
        <h6 class="d-flex justify-content-center">REGISTRO COMPLETADO</h6>
        <p>
          Por Favor ingrese a su correo electronico
          <span class="mail_completed"> {{ email_completed }}</span>
          y haga click en el link que le enviamos para confirmar su direccion de correo y
          poder ingresar al sistema. muchas gracias
        </p>
      </div>
    </div>
    <div
      class="container d-flex justify-content-center loading"
      v-if="status == 'en_proceso'"
    >
      <div class="row">
        <div class="col-12 d-flex justify-content-center">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Cargando...</span>
          </div>
        </div>
        <div class="col-12 d-flex justify-content-center" style="margin-top: 25px">
          <h6>PROCESANDO...</h6>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row d-flex justify-content-center" v-if="status == 'sin_proceso'">
        <div class="col-12 col-lg-8 col-sm-12 col-xs-12 col-md-12">
          <div class="card">
            <div class="card-header">Registro de usuario</div>
            <div class="card-body">
              <div class="registo_error" v-if="registro_error != ''">
                {{ registro_error }}
              </div>

              <form @submit.prevent="submitForm">
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    v-model="email"
                    required
                  />
                  <div class="invalid-feedback">Por favor ingrese un email válido.</div>
                </div>
                <div class="mb-3">
                  <label for="username" class="form-label">Nombre de usuario:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="username"
                    v-model="username"
                    required
                  />
                  <div class="invalid-feedback">Por favor ingrese un username.</div>
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Contraseña</label>
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    v-model="password"
                    required
                  />
                  <div class="invalid-feedback">
                    La contraseña debe tener al menos 6 caracteres.
                  </div>
                </div>
                <div class="mb-3">
                  <label for="confirm-password" class="form-label"
                    >Confirmar contraseña</label
                  >
                  <input
                    type="password"
                    class="form-control"
                    id="confirm-password"
                    v-model="confirmPassword"
                    required
                  />
                  <div class="invalid-feedback">Las contraseñas no coinciden.</div>
                </div>
                <div class="d-flex justify-content-end">
                  <button type="submit" class="btn btn-primary">Registrarse</button>
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
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      email_completed: "",
      username: "",
      password: "",
      confirmPassword: "",
      registro_error: "",
      status: "sin_proceso",
    };
  },
  created() {
    if (localStorage.getItem("cod_ref")) {
      this.$router.push({
        name: "home",
      });
    }
  },

  methods: {
    isValidEmail(email) {
      const regex = /\S+@\S+\.\S+/;
      return regex.test(email);
    },
    submitForm() {
      // Validación de email
      if (!this.isValidEmail(this.email)) {
        const emailInput = document.getElementById("email");
        emailInput.classList.add("is-invalid");
        return;
      }

      // Validación de username
      if (this.username.trim() === "") {
        const usernameInput = document.getElementById("username");
        usernameInput.classList.add("is-invalid");
        return;
      }

      // Validación de contraseña
      if (this.password.length < 6) {
        const passwordInput = document.getElementById("password");
        passwordInput.classList.add("is-invalid");
        return;
      }

      // Validación de confirmación de contraseña
      if (this.password !== this.confirmPassword) {
        const confirmPasswordInput = document.getElementById("confirm-password");
        confirmPasswordInput.classList.add("is-invalid");
        return;
      }

      //methdo post
      this.status = "en_proceso";
      const formData = new FormData();
      formData.append("email", this.email);
      formData.append("username", this.username);
      formData.append("password", this.password);
      if (localStorage.getItem("visitor")) {
        formData.append("visitor_id", localStorage.getItem("visitor"));
      }

      axios
        .post(this.server + "/api/v1/register/", formData)
        .then((response) => {
          console.log(response.data);
          this.$swal.fire(
            "Registro completado!",
            "Se ha registrado correctamente.",
            "success"
          );
          this.status = "registro_completo";
        })
        .catch((error) => {
          console.log(error);
          this.registro_error = error.response.data;
          console.log(error.response.data);
          this.$swal.fire(
            "Algo salio mal!",
            "Revise el mensaje de error que aparece en el formulario",
            "error"
          );
          this.status = "sin_proceso";
        });

      // Si todo es válido, limpiamos los campos y mostramos mensaje de éxito
      this.email_completed = this.email;
      this.email = "";
      this.username = "";
      this.password = "";
      this.confirmPassword = "";
      const emailInput = document.getElementById("email");
      const usernameInput = document.getElementById("username");
      const passwordInput = document.getElementById("password");
      const confirmPasswordInput = document.getElementById("confirm-password");
      emailInput.classList.remove("is-invalid");
      usernameInput.classList.remove("is-invalid");
      passwordInput.classList.remove("is-invalid");
      confirmPasswordInput.classList.remove("is-invalid");
    },
  },
};
</script>
<style scoped>
.register {
  margin-top: 75px;
}
.registo_error {
  background-color: orangered;
  color: white;
  border: 2px solid gray;
  border-radius: 3px;
}
.loading {
  margin-top: 160px !important;
}
.check_container {
  margin-top: 60px !important;
}
.icon_check {
  font-size: 60px;
  margin-bottom: 20px;
  color: green;
}
.mail_completed {
  font-weight: bold;
}
</style>
