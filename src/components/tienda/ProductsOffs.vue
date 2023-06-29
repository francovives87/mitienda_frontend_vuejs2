<template>
  <div class="ProductsOffs" v-if="productsOffs.length > 0">
    <div class="container p-0">
      <div class="row p-0">
        <div class="col-12">
          <span style="color: red !important"
            ><font-awesome-icon icon="fa-solid fa-fire"
          /></span>
          <span class="featured_title"> Productos en ofertas</span>
        </div>
        <div class="col-12 mt-2 p-0 featured_container" v-if="productsOffs.length > 0">
          <carousel
            :per-page="height"
            :mouse-drag="true"
            :navigationEnabled="height > 2 ? true : false"
            paginationPosition="false"
            :loop="true"
          >
            <slide v-for="(offs, index) in productsOffs" :key="index">
              <a @click="emitProduct(offs)">
                <div class="card shadow-sm featured">
                  <img class="card-img-top" :src="offs.image" :alt="offs.name" />
                  <div class="card-body">
                    <span class="product_title">{{ offs.title }}</span> <br />
                    <span class="product_description text-muted">{{
                      offs.description.slice(0, 30)
                    }}</span
                    ><span class="text-muted" v-if="offs.description.length >= 30"
                      >...</span
                    >
                    <br />
                    <span
                      v-if="offs.in_offer_price == 0 && offs.price > 0"
                      class="product_price"
                      >{{ offs.price }}</span
                    >
                    <span v-if="offs.price == 0" class="product_price_consultar"
                      >consultar</span
                    >
                    <span
                      v-if="offs.in_offer_price > 0"
                      class="product_price_old_price"
                      >{{ offs.price }}</span
                    >

                    <span class="product_in_offer_price" v-if="offs.in_offer_price > 0">{{
                      offs.in_offer_price
                    }}</span>
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
  name: "ProductsOffs",
  components: {
    Carousel,
    Slide,
  },

  mounted() {
    this.GetProductsOffs();
  },

  watch: {
    tienda(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.GetProductsOffs(); // Llama a tu función cuando el estado cambie
      }
    },
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
      productsOffs: [],
      carouselOptions: {
        slidesToShow: 3,
      },
    };
  },

  methods: {
    emitProduct(product) {
      this.$emit("product-selected", product);
    },

    GetProductsOffs() {
      axios
        .get(this.server + "/api/v1/store/products/offs/", {
          params: {
            tienda: this.tienda.id,
          },
        })
        .then((response) => {
          console.log("GetProductsOffs");
          this.productsOffs = response.data.results;
          console.log(this.productsOffs);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
  },
};
</script>

<style scoped>
.ProductsOffs {
  margin-top: 0px !important;
  margin-bottom: 30px !important;
  background-color: #f5f5f5;
}

.card-img-top {
  height: 250px;
  width: 100%;
}
.VueCarousel-pagination {
  display: none !important;
}
.featured {
  margin-right: 2px !important;
  height: 350px !important;
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
.featured_container {
  padding: 0px 5px 0px 5px !important;
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
