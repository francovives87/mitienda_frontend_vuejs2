<template>
  <div class="ProductsFeatureds" v-if="featureds.length > 0">
    <div class="container p-0">
      <div class="row p-0">
        <div class="col-12 featured_title">
          <span style="color: orange !important"
            ><font-awesome-icon icon="fa-solid fa-star"
          /></span>
          Productos Destacados
        </div>
        <div class="col-12 p-0 featured_container" v-if="featureds.length > 0">
          <carousel
            :per-page="height"
            :mouse-drag="true"
            :navigationEnabled="height > 2 ? true : false"
            paginationPosition="false"
            :loop="true"
          >
            <slide v-for="(featured, index) in featureds" :key="index">
              <a @click="emitProduct(featured)">
                <div class="card shadow-sm featured">
                  <img class="card-img-top" :src="featured.image" :alt="featured.name" />
                  <div class="card-body">
                    <span class="product_title">{{ featured.title }}</span> <br />
                    <span class="product_description text-muted">{{
                      featured.description.slice(0, 30)
                    }}</span
                    ><span class="text-muted" v-if="featured.description.length >= 30"
                      >...</span
                    >
                    <br />
                    <span
                      v-if="featured.in_offer_price == 0 && featured.price > 0"
                      class="product_price"
                      >{{ featured.price }}</span
                    >
                    <span v-if="featured.price == 0" class="product_price_consultar"
                      >consultar</span
                    >
                    <span
                      v-if="featured.in_offer_price > 0"
                      class="product_price_old_price"
                      >{{ featured.price }}</span
                    >

                    <span
                      class="product_in_offer_price"
                      v-if="featured.in_offer_price > 0"
                      >{{ featured.in_offer_price }}</span
                    >
                  </div>
                </div>
              </a>
            </slide>
          </carousel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import axios from "axios";
import { Carousel, Slide } from "vue-carousel";
export default {
  name: "ProductsFeatureds",
  components: {
    Carousel,
    Slide,
  },

  mounted() {
    this.GetFeaturedsProducts();
  },

  computed: {
    ...mapState("tienda", ["tienda"]),
    height() {
      console.log("this.$vuetify.breakpoint.name");
      console.log(this.$vuetify.breakpoint.width);
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          if (this.$vuetify.breakpoint.width < 360) {
            return 1;
          } else {
            return 2;
          }
        case "sm":
          return 2;
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
      featureds: [],
      carouselOptions: {
        slidesToShow: 3,
      },
    };
  },

  watch: {
    tienda(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.GetFeaturedsProducts(); // Llama a tu función cuando el estado cambie
      }
    },
  },

  methods: {
    emitProduct(product) {
      this.$emit("product-selected", product);
    },

    GetFeaturedsProducts() {
      axios
        .get(this.server + "/api/v1/store/products/featured/", {
          params: {
            tienda: this.tienda.id,
          },
        })
        .then((response) => {
          console.log("GetFeaturedsProducts");
          this.featureds = response.data.results;
          console.log(this.featureds);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
  },
};
</script>

<style scoped>
.ProductsFeatureds {
  background-color: #f5f5f5;
  padding-top: 10px !important;
}

.card-img-top {
  height: 250px;
  width: 100%;
}
.VueCarousel-pagination {
  display: none !important;
}
.featured_container {
  padding: 0px 5px 0px 5px !important;
}
.featured {
  margin-right: 2px !important;
}
.product_title {
  font-size: 14px !important;
  font-weight: 600;
  text-transform: uppercase;
}
.product_description {
  font-size: 13px !important;
  line-height: 0 !important;
  margin-bottom: 0 !important;
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
.featured_title {
  text-transform: uppercase;
  font-size: 16px !important;
  font-weight: 500;
  margin-bottom: 5px !important;
}

@media (max-width: 768px) {
  .card-img-top {
    height: 250px;
    width: 100%;
  }
  .VueCarousel-pagination {
    display: none !important;
  }
  .featured {
    margin-right: 2px !important;
    height: 300px !important;
  }
}
</style>
