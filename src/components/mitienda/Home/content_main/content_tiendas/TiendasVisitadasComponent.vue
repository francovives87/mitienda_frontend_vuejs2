<template>
  <div class="TiendasVisitadasComponent" v-if="tiendasVisitadas.length > 0">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <span class="home_title"
            ><font-awesome-icon icon="fa-solid fa-eye" /> Tiendas Visitadas</span
          >
        </div>
      </div>
      <carousel
        :per-page="height"
        :mouse-drag="true"
        :navigationEnabled="height > 2 ? true : false"
        paginationPosition="false"
        :loop="true"
      >
        <slide v-for="(tienda, index) in tiendasVisitadas" :key="index">
          <a @click="GoToStore(tienda)">
            <div class="card shadow-sm featured mt-1">
              <div class="image d-flex justify-content-center p-0 mt-2">
                <img
                  class="card-img-top profile-img-circle"
                  :src="tienda.tienda_images[0].logo"
                />
              </div>

              <div class="card-body">
                <div class="d-flex justify-content-center p-0">
                  <span class="tienda_title">{{ tienda.name }}</span>
                </div>
              </div>
            </div>
          </a>
        </slide>
      </carousel>
      <div class="col-12 d-flex justify-content-end">
        <span class="li_cat_sel"
          ><font-awesome-icon icon="fa-solid fa-circle-plus" /> ver todas</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import { Carousel, Slide } from "vue-carousel";
export default {
  name: "TiendasVisitadasComponent",
  components: {
    Carousel,
    Slide,
  },
  watch: {
    visitor_id(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.GetTiendasVisitadas(); // Llama a tu función cuando el estado cambie
      }
    },
  },

  computed: {
    ...mapState("user", ["visitor_id"]),
    height() {
      console.log("this.$vuetify.breakpoint.name");
      console.log(this.$vuetify.breakpoint.width);
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          if (this.$vuetify.breakpoint.width < 360) {
            return 3;
          } else {
            return 3;
          }
        case "sm":
          return 2;
        case "md":
          return 2;
        case "lg":
          return 6;
        case "xl":
          return 6;
      }
    },
  },

  mounted() {
    if (localStorage.getItem("visitor")) {
      this.GetTiendasVisitadas();
    }
  },

  data() {
    return {
      tiendasVisitadas: [],
    };
  },
  methods: {
    GoToStore(tienda) {
      console.log("GoToStore");
      console.log(tienda.domain);
      this.$router.push({
        path: "/" + tienda.domain,
      });
    },

    GetTiendasVisitadas() {
      axios
        .get(this.server + "/api/v1/store/visitor/list/", {
          params: {
            visitor_id: localStorage.getItem("visitor"),
          },
        })
        .then((response) => {
          this.tiendasVisitadas = response.data.results;
          console.log("GetTiendasVisitads");
          console.log(this.tiendasVisitadas);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.TiendasVisitadasComponent {
  margin-top: 10px !important;
}
.home_title {
  font-size: 15px;
  text-transform: uppercase;
  font-weight: 500;
}
.featured {
  width: 100% !important;
  height: 100px !important;
}
.profile-img-circle {
  width: 50px !important;
  height: 50px !important;
  border-radius: 50%; /* Agregamos un border-radius del 50% para hacer la imagen circular */
  overflow: hidden;
  border: 2px solid #f2f2f2; /* Cambia este valor al color gris claro deseado */
}

.tienda_title {
  text-transform: uppercase;
  font-weight: 500;
  font-size: 11px !important;
}
.li_cat_sel {
  display: inline-block;
  margin-right: 1px !important; /* Ajusta el margen derecho según tus necesidades */
  padding: 5px 3px 5px 3px !important;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f5f5f5;
  color: #333;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase !important;
  cursor: pointer;
}
@media (max-width: 768px) {
  .featured {
    padding: 0px !important;
    width: 100% !important;
    height: 110px !important;
  }
  .profile-img-circle {
    padding: 0px !important;
    width: 60px !important;
    height: 60px !important;
    border-radius: 50%; /* Agregamos un border-radius del 50% para hacer la imagen circular */
  }
  .tienda_title {
    text-transform: uppercase;
    font-weight: 500;
  }
}
</style>
