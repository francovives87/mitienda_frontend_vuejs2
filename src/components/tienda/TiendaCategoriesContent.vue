<template>
  <div class="TiendaCategoriesContent">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <span class="categorie_title">{{ categoria.name }}</span>
          <div class="border-top mt-2"></div>
        </div>
      </div>
      <!-- lista productos -->
      <div class="row p-0">
        <div
          class="col-6 col-lg-3 col-xs-6 p-0 featured_container"
          v-for="(product, index) in products"
          :key="index"
        >
          <a @click="emitProductOfCategorie(product)">
            <div class="card shadow product mt-3 featured">
              <img class="card-img-top" :src="product.image" :alt="product.name" />
              <div class="card-body">
                <span class="product_title">{{ product.title }}</span> <br />
                <span class="product_description text-muted">{{
                  product.description.slice(0, 30)
                }}</span>
                <span v-if="product.description.length >= 30">...</span>
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
  name: "TiendaCategoriesContent",
  props: ["categoria"],

  computed: {
    ...mapState("tienda", ["tienda"]),
  },

  watch: {
    categoria(value) {
      console.log("watch");
      this.GetProductsOfCategorie(value.id);
    },
  },

  mounted() {
    this.GetProductsOfCategorie(this.categoria.id);
  },

  data() {
    return {
      products: [],
    };
  },
  methods: {
    emitProductOfCategorie(product) {
      this.$emit("categorie-product-selected", product);
    },

    GetProductsOfCategorie(category) {
      axios
        .get(this.server + "/api/v1/store/categorie/products/list/", {
          params: {
            tienda: this.tienda.id,
            category: category,
          },
        })
        .then((response) => {
          this.products = response.data.results;
          console.log("GetProductsOfCategorie");
          console.log(this.products);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.TiendaCategoriesContent {
  background-color: #f5f5f5;
  padding-top: 10px !important;
}
.search_container {
  padding: 30px 0px 30px 0px;
  background-color: #ffffff !important;
}

.search-box {
  position: relative;
  display: inline-block;
  margin-right: 30px !important;
}

.search-input {
  width: 400px;
  height: 36px;
  border-radius: 18px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding-left: 16px;
}

.search-input:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5), 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-btn {
  position: absolute;
  top: 0;
  right: 0;
  height: 36px;
  width: 36px;
  border: none;
  border-radius: 18px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-btn:focus {
  outline: none;
}

.search-btn:hover {
  background-color: #f0f0f0;
}

.card-img-top {
  height: 250px;
  width: 100%;
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

.featured {
  margin-right: 2px !important;
}
.featured_container {
  margin-bottom: 20px !important;
}
.categorie_title {
  font-size: 18px !important;
  font-weight: 500;
  text-transform: uppercase;
}

@media (max-width: 768px) {
  .TiendaCategoriesContent {
    background-color: #f5f5f5;
    margin-top: 20px;
  }

  .search_container {
    padding: 30px 0px 30px 0px !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
  }

  .search-box {
    position: relative;
    display: inline-block;
  }
  .search-input {
    width: 300px;
    height: 36px;
    border-radius: 18px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding-left: 16px;
  }

  .search-input:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5), 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .search-btn {
    position: absolute;
    top: 0;
    right: 0;
    height: 36px;
    width: 36px;
    border: none;
    border-radius: 18px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .search-btn:focus {
    outline: none;
  }

  .search-btn:hover {
    background-color: #f0f0f0;
  }
  .card-img-top {
    height: 250px;
    width: 100%;
  }

  .featured {
    height: 320px !important;
  }

  .featured_container {
    margin-bottom: 20px !important;
  }
  .categorie_title {
    font-size: 16px !important;
    font-weight: 500;
    text-transform: uppercase;
  }
}
</style>
