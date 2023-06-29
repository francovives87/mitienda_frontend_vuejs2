<template>
  <div class="SearchProductsContentComponent">
    <div class="container mt-3">
      <div class="row">
        <div class="col-12">
          <h6><font-awesome-icon icon="fa-solid fa-box" /> Resultados de productos</h6>
        </div>
      </div>
    </div>

    <LoadingSearchComponent v-if="loaded == false" />
    <!-- contendido de la busqueda -->
    <!-- lista de productos -->

    <div class="container product_container" v-if="loaded == true">
      <div class="row product_row">
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
                <div class="container p-0">
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
import axios from "axios";
import { mapState } from "vuex";
import LoadingSearchComponent from "./LoadingSearchComponent.vue";
export default {
  name: "SearchProductsContentComponent",
  components: {
    LoadingSearchComponent,
  },
  props: ["kword"],
  computed: {
    ...mapState("user", ["user_latLng"]),
  },
  mounted() {
    this.SearchProductGeoTrigram();
  },

  watch: {
    kword() {
      this.SearchProductGeoTrigram();
    },

    radius(value) {
      this.SearchProductGeoTrigram();
    },
  },

  data() {
    return {
      loaded: false,
      radius: 5,
      products: [],
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

    SearchProductGeoTrigram() {
      this.loaded = false;
      axios
        .get(this.server + "/api/v1/products/search/geo/triagram/", {
          params: {
            lat: this.user_latLng.lat,
            lng: this.user_latLng.lng,
            radius: this.radius,
            search: this.kword,
          },
        })
        .then((response) => {
          console.log("SearchProductGeoTrigram");
          this.products = response.data.results;
          console.log(this.products);
          this.loaded = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
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
