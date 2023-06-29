<template>
  <div class="CreateStore">
    <!-- cartel success -->
    <div class="container" v-if="create_status == 'completo'">
      <div class="row">
        <div class="col-12 col-lg-12 col-sm-12 col-xs-12 col-md-12 check_container">
          <div class="icon_check d-flex justify-content-center">
            <font-awesome-icon icon="fa-regular fa-circle-check" />
          </div>
          <h6 class="d-flex justify-content-center">TIENDA CREADA!</h6>
          <p class="">
            Se ha creado su tienda exitosamente! <br />
            Le deseamos muchos exitos!. <br />
            los datos de su tienda: <br />
            para que la gente ingrese debe compartir su link<br />
            <span class="mail_completed">mitienda.app/{{ newStoreData.domain }}</span>
            <br />
          </p>
        </div>
      </div>
    </div>
    <!-- Codigo -->
    <div class="code" v-if="create_status == 'sin_proceso'">
      <div class="barra-top d-block d-lg-none">
        <div
          class="container-fluid d-flex justify-content-between align-items-center h-100"
        >
          <span
            >Seleccione todas las categorias que se adaptan a su tienda.
            <font-awesome-icon icon="fa-solid fa-arrow-right-long"
          /></span>
          <button class="btn btn-outline-secondary" @click="ChangeVista()">
            <font-awesome-icon icon="fa-solid fa-bars" />
          </button>
        </div>
      </div>

      <!-- movil -->
      <div class="container" v-if="mobile_status == true">
        <div class="row">
          <div class="col-12 col-xs-12 scrollable barra_mobile">
            <div class="col-12">
              <span class="card mb-3 cartel"
                >Seleccione todas las categorias que se adaptan a su tienda.</span
              >
            </div>
            <ul>
              <MenuItem
                v-for="category in categories"
                :category="category"
                :key="category.id"
                @category-click="handleCategoryClick"
              ></MenuItem>
            </ul>
          </div>
        </div>
      </div>
      <!-- movil -->

      <div class="container p-0">
        <div class="row">
          <div class="col-6 col-lg-6 barra scrollable d-none d-lg-block">
            <div class="col-12">
              <span class="card mb-3 cartel"
                >Seleccione todas las categorias que se adaptan a su tienda.</span
              >
            </div>
            <ul>
              <MenuItem
                v-for="category in categories"
                :category="category"
                :key="category.id"
                @category-click="handleCategoryClick"
              ></MenuItem>
            </ul>
          </div>

          <div class="col content scrollable" v-if="mobile_status == false">
            <div class="container-fluid">
              <div class="row">
                <div class="col-12">
                  <div>
                    <span>categorias seleccionadas:</span>
                    <ul class="ul__cat_sel">
                      <li
                        v-for="nombre in selectedCategoriesName"
                        :key="nombre.id"
                        class="li_cat_sel"
                      >
                        {{ nombre }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 col-xs-12 col-lg-8">
                  <form @submit.prevent="CreateStore">
                    <div class="mb-3" v-if="have_error == true">
                      <div class="registo_error">{{ errors_display }}</div>
                    </div>
                    <div class="mb-3">
                      <label for="domain" class="form-label">Dominio</label>
                      <div class="input-group">
                        <div class="input-group-text">mitienda.app/</div>
                        <input
                          type="text"
                          class="form-control"
                          id="domain"
                          v-model="domain"
                          required
                        />
                      </div>
                    </div>
                    <div class="mb-3">
                      <label for="name" class="form-label">Nombre de la tienda</label>
                      <input
                        type="text"
                        class="form-control"
                        id="name"
                        v-model="name"
                        required
                      />
                    </div>
                    <div class="input-group mb-1 card" style="font-size: 13px">
                      Ingrese su numero de WhatsApp, es necesario para recibir consultas y
                      ordenes desde su tienda. Si desea puede desactivar este funcion una
                      vez creada la tienda en configuracion.
                    </div>
                    <div class="input-group mb-3">
                      <span class="input-group-text" id="basic-addon1"
                        ><font-awesome-icon
                          icon="fa-brands fa-whatsapp"
                          style="color: green; font-size: 20px !important"
                      /></span>
                      <br />

                      <input
                        type="text"
                        class="form-control"
                        placeholder="Numero de WhatsApp"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        required
                        v-model="wp_number"
                      />
                    </div>
                    <div class="input-group mb-1 card" style="font-size: 13px">
                      Ingrese una descripcion de que se trata su tienda o un mensaje o
                      idea acerca de su tienda, para que los usuarios la vean cuando
                      entran a su tienda en informacion.
                    </div>

                    <div class="mb-2">
                      <label for="description" class="form-label"
                        >Descripción/Mensaje/Idea</label
                      >
                      <textarea
                        class="form-control"
                        id="description"
                        rows="3"
                        v-model="description"
                        required
                      ></textarea>
                    </div>
                    <div class="mb-3 d-flex justify-content-end">
                      <v-btn elevation="2" type="submit" style="color: green"
                        ><font-awesome-icon icon="fa-solid fa-shop" /> &nbsp;Crear
                        Tienda</v-btn
                      >
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Barra de navegación inferior -->
      <nav
        class="navbar fixed-bottom navbar-light bg-light mobile_bar d-lg-none"
        v-if="mobile_status == true"
      >
        <!-- Contenido de la barra de navegación -->
        <div class="container d-flex justify-content-center">
          <div class="row">
            <div class="col-12">
              <button class="btn btn-outline-success" @click="ChangeVista()">
                Guardar Seleccion
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapState, mapMutations } from "vuex";
import MenuItem from "../../components/Register/MenuItem.vue";
export default {
  name: "CreateStore",
  components: {
    MenuItem,
  },
  data() {
    return {
      categories: [],
      selectedCategoryCode: 0,
      selectedCategoriesName: [],
      selectedCategoriesID: [],
      errors_display: [],
      mobile_status: false,
      name: "",
      description: "",
      wp_number: "",
      domain: "",
      have_error: false,
      newStoreData: {
        domain: "",
        nombre: "",
        description: "",
      },
      create_status: "sin_proceso",
      plan: [],
    };
  },
  created() {
    /* guard */
    if (!localStorage.getItem("access")) {
      this.$router.push({
        name: "home",
      });
    }
  },
  mounted() {
    this.GetCategoriesOfStores();
    this.GetPlan();
  },

  computed: {
    ...mapState("user", ["mitienda"]),
  },

  methods: {
    ...mapMutations("user", ["AddMiTienda"]),

    GetPlan() {
      axios
        .get(this.server + "/api/v1/admin/tienda/plan/", {
          headers: {
            Authorization: localStorage.getItem("access"),
          },
          params: {
            name: "free",
          },
        })
        .then((response) => {
          this.plan = response.data.results[0];
          console.log("plan");
          console.log(this.plan);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    ChangeVista() {
      console.log("hol");
      this.mobile_status = !this.mobile_status;
    },

    CreateStore() {
      var domain_toLowerCase = this.domain.toLowerCase();
      var domain_replace = domain_toLowerCase.replace(
        /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\ /]/gi,
        "."
      );
      const data = {
        domain: domain_replace,
        name: this.name,
        description: this.description,
        categories: this.selectedCategoriesID,
        plan: this.plan.id,
        wp_number: this.wp_number,
      };

      if (this.selectedCategoriesID.length == 0) {
        this.$swal.fire(
          "Error en categorias!",
          "debe seleccionar al menos una categoria.",
          "error"
        );
      } else {
        axios
          .post(this.server + "/api/v1/tiendas/create/", data, {
            headers: {
              Authorization: localStorage.getItem("access"),
            },
          })
          .then((response) => {
            console.log(response.data);
            this.newStoreData = {
              domain: response.data.domain,
              nombre: response.data.name,
              description: response.data.description,
            };
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
                this.$router.push({
                  path: "/" + this.mitienda[0].domain,
                });
              })
              .catch((error) => {
                console.log(error);
              });
            this.create_status = "completo";
            this.$swal.fire(
              "Tienda Creada!",
              "Tienda creada correctamente. Exitos!",
              "success"
            );
          })
          .catch((error) => {
            console.log(error.response.data);
            this.errors_display = error.response.data;
            this.have_error = true;
            this.$swal.fire(
              "Error al crear la tienda!",
              "Revise encima del formulario, los mensajes de error que aparecen.",
              "error"
            );
          });
      }
    },

    handleCategoryClick(category) {
      if (this.selectedCategoriesID.includes(category.id)) {
        // Remove category.id from selectedCategoriesID array if it's already selected
        this.selectedCategoriesID.splice(
          this.selectedCategoriesID.indexOf(category.id),
          1
        );
      } else {
        // Add category to selectedCategories array if it's not already selected
        this.selectedCategoriesID.push(category.id);
        console.log(this.selectedCategoriesID);
      }
      //PARA LOS NOMBRES
      if (this.selectedCategoriesName.includes(category.nombre)) {
        // Remove category.nombre from selectedCategoriesName array if it's already selected
        this.selectedCategoriesName.splice(
          this.selectedCategoriesName.indexOf(category.nombre),
          1
        );
      } else {
        // Add category to selectedCategories array if it's not already selected
        this.selectedCategoriesName.push(category.nombre);
        console.log(this.selectedCategoriesName);
      }
    },

    GetCategoriesOfStores() {
      axios
        .get(this.server + "/api/v1/tiendas/categories/list/mptt/")
        .then((response) => {
          console.log(response.data.results);
          this.categories = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.CreateStore {
  margin-top: 80px;
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
.content {
  height: auto !important;
}
.barra {
  max-height: calc(100vh - 150px); /* Define una altura máxima para la barra */
  padding-left: 0px !important;
  width: 400px !important;
}
.scrollable {
  overflow-y: auto; /* Agrega scroll a los elementos con la clase "scrollable" */
}
ul {
  padding-left: 0px !important;
}
.registo_error {
  background-color: orangered;
  color: white;
  border: 2px solid gray;
  border-radius: 3px;
}
.row {
  display: flex;
  flex-wrap: nowrap;
  height: 100% !important;
  overflow-x: auto;
  overflow-y: hidden;
}
.cartel {
  text-transform: uppercase !important;
  font-size: 12px !important;
  padding: 2px;
}

.barra-top {
  height: 80px;
  background-color: #ededed;
}

.ul_cat_sel {
  list-style: none;
  padding: 0;
  margin: 0;
}

.li_cat_sel {
  display: inline-block;
  margin-right: 2px; /* Ajusta el margen derecho según tus necesidades */
  padding: 5px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f5f5f5;
  color: #333;
  font-size: 12px;
  cursor: pointer;
}

@media (max-width: 991px) {
  .CreateStore {
    margin-top: 50px;
  }

  .barra-top {
    display: block;
  }
  .barra_mobile {
    width: 100% !important;
  }
  .mobile_bar {
    height: 60px !important;
    background-color: #ededed !important;
  }
  .row {
    display: flex;
    flex-wrap: nowrap;
    width: 100% !important;
    overflow-x: auto;
    overflow-y: hidden;
  }
}
</style>
