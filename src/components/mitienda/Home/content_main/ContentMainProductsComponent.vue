<template>
  <div class="ContentMainProductsComponent">
    <LoadingSearchComponent v-if="loaded == false" />

    <!-- no_ubicacion -->

    <div class="container" v-if="no_ubi == true">
      <div class="row card no_ubi_card">
        <div class="col-12">
          <div class="container">
            <div class="row">
              <div class="col-4">
                <font-awesome-icon
                  icon="fa-solid fa-xmark"
                  style="color: red"
                  class="icon_no_ubi"
                />
                <font-awesome-icon icon="fa-solid fa-location-dot" class="icon_no_ubi" />
              </div>
              <div class="col-8">
                <span class="no_ubi_text"
                  >No se ha podido obtener su localizacion. <br />
                  Por favor active la ubicacion o haga click en
                  <span><font-awesome-icon icon="fa-solid fa-pencil" /></span> "cambiar"
                  para obtener una ubicacion aproximada y poder arrojar resultados
                  optimos.</span
                >
              </div>
            </div>
          </div>
          <!--  -->
        </div>
      </div>
    </div>

    <div class="container product_container" v-if="loaded == true">
      <div class="row product_row" v-if="products.length > 0">
        <div class="topBarNav">
          <div class="container mt-2 mb-2">
            <div class="row d-flex justify-content-end align-items-center">
              <div class="col-6 col-lg-4 col-xs-6">
                <span class="radio_text">Radio de busqueda en KMs</span>
              </div>
              <div class="col-6 col-lg-3 col-xs-6">
                <div class="input-group">
                  <button class="btn btn-outline-secondary" type="button">
                    <font-awesome-icon
                      icon="fa-solid fa-minus"
                      @click="DisminuirRadio()"
                    />
                  </button>
                  <input
                    type="text"
                    class="form-control"
                    v-model="radius"
                    step="1"
                    readonly
                  />
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    @click="AumentarRadio()"
                  >
                    <font-awesome-icon icon="fa-solid fa-plus" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-6 col-lg-4 product_col"
          v-for="(product, index) in products"
          :key="index"
        >
          <a @click="GoToStore(product)">
            <div class="card shadow-sm featured mt-1">
              <img class="card-img-top" :src="product.image" :alt="product.name" />
              <div class="card-body">
                <span class="product_title">{{ product.title.slice(0, 100) }}</span>
                <br />

                <span
                  v-if="product.in_offer_price == 0 && product.price > 0"
                  class="product_price"
                  >{{ product.price }}</span
                >
                <span v-if="product.price == 0" class="product_price_consultar"
                  >consultar</span
                >
                <span v-if="product.in_offer_price > 0" class="product_price_old_price">{{
                  product.price
                }}</span>
                <span class="product_in_offer_price" v-if="product.in_offer_price > 0">{{
                  product.in_offer_price
                }}</span>
              </div>
              <div class="card-footer">
                <div class="container p-0 mt-1">
                  <div class="row p-0">
                    <div class="col-12 d-flex align-items-center p-0">
                      <img
                        :src="product.category.tienda.tienda_images[0].logo"
                        alt=""
                        class="logo_tienda"
                      />
                      <span class="tienda_title">
                        {{ product.category.tienda.name }}
                      </span>
                    </div>
                    <div class="col-12 d-flex align-items-center p-0">
                      <span class="address"
                        ><font-awesome-icon icon="fa-solid fa-location-dot" />
                        <span
                          class="city"
                          v-if="product.category.tienda.geo_tienda[0].city"
                        >
                          {{ product.category.tienda.geo_tienda[0].city }},
                        </span>
                        <span
                          class="village"
                          v-if="product.category.tienda.geo_tienda[0].village"
                          >{{ product.category.tienda.geo_tienda[0].village }},
                        </span>
                        <span
                          class="road"
                          v-if="product.category.tienda.geo_tienda[0].road"
                          >{{
                            product.category.tienda.geo_tienda[0].road.slice(0, 25)
                          }}</span
                        >
                        <span
                          v-if="product.category.tienda.geo_tienda[0].road.length > 25"
                          >...</span
                        >
                        &nbsp;
                        <span
                          class="roda_number"
                          v-if="product.category.tienda.geo_tienda[0].house_number"
                          >{{ product.category.tienda.geo_tienda[0].house_number }}</span
                        >
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingSearchComponent from "./searchs/LoadingSearchComponent.vue";
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "ContentMainProductsComponent",
  components: {
    LoadingSearchComponent,
  },

  mounted() {
    if (Object.keys(this.user_latLng).length > 0) {
      this.GetProductsNears();
    }
    if (Object.keys(this.user_latLng).length <= 0) {
      this.no_ubi = true;
      this.loaded = true;
      if (localStorage.getItem("setLocation")) {
        localStorage.removeItem("setLocation");
      }
    } else {
      this.no_ubi = false;
      this.loaded = false;
    }
  },
  computed: {
    ...mapState("user", ["user_latLng"]),
  },
  watch: {
    user_latLng(value) {
      if (Object.keys(value).length > 0) {
        this.GetProductsNears();
      }
      if (Object.keys(value).length <= 0) {
        this.no_ubi = true;
        this.loaded = true;
      } else {
        this.no_ubi = false;
        this.loaded = true;
      }
    },
    radius() {
      this.GetProductsNears();
    },
  },

  data() {
    return {
      products: [],
      radius: 5,
      loaded: false,
      no_ubi: false,
    };
  },
  methods: {
    DisminuirRadio() {
      if (this.radius != 5) {
        this.radius -= 5;
      }
    },
    AumentarRadio() {
      this.radius += 5;
    },

    GoToStore(product) {
      this.$router.push({
        path: "/" + product.category.tienda.domain + "?producto=" + product.id,
      });
    },

    GetProductsNears() {
      this.loaded = false;
      axios
        .get(this.server + "/api/v1/products/nears/", {
          params: {
            lat: localStorage.getItem("lat"),
            lng: localStorage.getItem("lng"),
            radius: this.radius,
          },
        })
        .then((response) => {
          this.products = response.data.results;
          console.log("GetProductsNears");
          console.log(this.products);
          this.loaded = true;
        })
        .catch((error) => {
          console.log(error);
          console.log("error_no_ubi");
          this.loaded = true;
        });
    },
  },
};
</script>

<style scoped>
.ContentMainProductsComponent {
  margin-top: 20px !important;
  margin-bottom: 30px !important;
}
.topBarNav {
  height: 56px;
  background-color: #ffffff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 10px !important;
  padding: 2px 0px 2px 0px !important;
  margin-bottom: 10px !important;
  border-radius: 10px; /* ajustar el valor según sea necesario */
}
.radio_text {
  font-size: 12px !important;
  font-weight: 500;
}
.card-img-top {
  height: 250px;
  width: 100%;
}
.featured {
  height: 350px !important;
}
.VueCarousel-pagination {
  display: none !important;
}
.product_container {
  padding: 0px !important;
  margin: 0px !important;
}
.product_row {
  padding: 0px !important;
  margin: 0px !important;
}
.product_col {
  padding: 0px !important;
  margin: 0px !important;
}

.product_title {
  font-size: 14px !important;
  font-weight: 600;
  text-transform: uppercase;
}
.product_description {
  font-size: 13px !important;
}
.product_price {
  color: green;
  margin-right: 10px;
}
.product_price_old_price {
  color: black;
  font-size: 14px;
  text-decoration: line-through;
  margin-right: 5px;
}
.product_in_offer_price {
  color: green;
}
.product_price_consultar {
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  color: green;
}
.logo_tienda {
  width: 30px;
  height: 30px;
}
.tienda_title {
  text-transform: uppercase !important;
  font-size: 12px !important;
  margin-left: 2px !important;
}
.address {
  font-size: 12px !important;
}
.no_ubi_card {
  padding: 20px 0px 20px 0px !important;
}
.icon_no_ubi {
  font-size: 20px !important;
}
.no_ubi_text {
  font-size: 13px;
}

@media (max-width: 768px) {
  .topBarNav {
    height: 56px;
    background-color: #ffffff;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    margin-top: 10px !important;
    padding: 2px 0px 2px 0px !important;
    margin-bottom: 10px !important;
    border-radius: 10px; /* ajustar el valor según sea necesario */
  }
  .radio_text {
    font-size: 12px !important;
    font-weight: 500;
  }

  .featured {
    padding: 0px !important;
    width: 100% !important;
    height: 350px !important;
  }
  .product_container {
    padding: 0px !important;
    margin: 0px !important;
  }
  .product_row {
    padding: 0px !important;
    margin: 0px !important;
  }
  .product_col {
    padding: 0px !important;
    margin: 0px !important;
  }

  .card-img-top {
    height: 250px !important;
    width: 100%;
  }
  .VueCarousel-pagination {
    display: none !important;
  }
  .logo_tienda {
    width: 30px;
    height: 30px;
  }
  .product_title {
    font-size: 14px !important;
    font-weight: 600;
    text-transform: uppercase;
  }
  .product_description {
    font-size: 13px !important;
  }
  .product_price {
    color: green;
    margin-right: 10px;
  }
  .product_price_old_price {
    color: black;
    font-size: 12px;
    text-decoration: line-through;
    margin-right: 5px;
  }
  .product_in_offer_price {
    color: green;
  }
  .product_price_consultar {
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    color: green;
  }
  .tienda_title {
    text-transform: uppercase !important;
    font-size: 12px !important;
    margin-left: 2px !important;
  }
  .address {
    font-size: 12px !important;
  }
}
</style>
