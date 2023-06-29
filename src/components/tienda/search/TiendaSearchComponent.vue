<template>
  <div class="TiendaSearchComponent">
    <div class="topBarNav">
      <div class="container">
        <div class="row">
          <div class="col-10 d-flex align-items-center">
            <a class="atras" @click="emitClose()">
              <font-awesome-icon icon="fa-solid fa-arrow-left" />
            </a>
            <h3 class="titulo">Resultado de la busqueda</h3>
          </div>
          <div class="col-2 d-flex align-items-center justify-content-end">
            <a class="cerrar" @click="emitClose()">
              <font-awesome-icon icon="fa-solid fa-xmark" />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="container products">
      <div class="row">
        <div
          class="col-12 col-lg-3 col-xs-12 mt-3"
          v-for="(product, index) in products"
          :key="index"
        >
          <a @click="emitProduct(product)">
            <div class="card shadow-sm featured">
              <img class="card-img-top" :src="product.image" :alt="product.name" />
              <div class="card-body">
                <span class="product_title">{{ product.title }}</span> <br />
                <span class="product_description text-muted">{{
                  product.description.slice(0, 50) + '...' 
                }}</span>

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
export default {
  name: "TiendaSearchComponent",
  props: ["search"],

  mounted() {
    console.log(this.search);
    this.SearchOnStore(this.search);
  },

  computed: {
    ...mapState("tienda", ["tienda"]),
  },

  watch: {
    search(value) {
      console.log("CAMBIOOOO!!!");
      console.log(value);
      if (value.length >= 4) {
        this.SearchOnStore(value);
      }
    },
  },

  data() {
    return {
      products: [],
    };
  },
  methods: {
    emitProduct(product) {
      this.$emit("search-product-selected", product);
    },
    emitClose() {
      this.$emit("display", "content");
    },

    SearchOnStore(kword) {
      axios
        .get(this.server + "/api/v1/store/product/search/", {
          params: {
            search: kword,
            tienda: this.tienda.id,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.products = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>

.TiendaSearchComponent{
  margin-bottom: 30px !important;
}

.topBarNav {
  height: 40px;
  background-color: #ffffff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 10px !important;
}
.atras {
  font-size: 24px;
  color: #000000;
  padding-right: 12px;
  padding-left: 10px;
  transition: all 0.3s ease-in-out;
  border-right: 1px solid gray;
}
.atras:hover {
  background-color: #e5e5e5;
}
.cerrar {
  font-size: 24px;
  color: #000000;
  padding-left: 10px;
  padding-right: 10px !important;
  transition: all 0.3s ease-in-out;
  border-left: 1px solid gray;
}
.cerrar:hover {
  background-color: #e5e5e5;
}
.titulo {
  font-size: 12px;
  font-weight: 600;
  margin: 0;
  color: #000000;
  text-transform: uppercase !important;
  margin-left: 10px;
}
.ProductsFeatureds {
  background-color: #f5f5f5;
}

.products {
  margin-top: 30px !important;
}

.card-img-top {
  height: 250px;
  width: 100%;
}
.VueCarousel-pagination {
  display: none !important;
}
.featured {
  margin-left: 8px !important;
  margin-right: 8px !important;
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
@media (max-width: 768px) {
  .card-img-top {
    height: 250px;
    width: 100%;
  }
  .VueCarousel-pagination {
    display: none !important;
  }
}

/* top bar */
</style>
