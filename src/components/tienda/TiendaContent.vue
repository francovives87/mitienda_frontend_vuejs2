<template>
  <div class="TiendaContent">
    <div class="container main_products">
      <div class="row">
        <div class="col-12">
          <ProductsFeatureds
            v-if="tienda.id > 0"
            @product-selected="handleProductSelected"
          />
        </div>
        <div class="col-12">
          <ProductsOffs v-if="tienda.id > 0" @product-selected="handleProductSelected" />
        </div>
        <div class="col-12">
          <ProductsNews v-if="tienda.id > 0" @product-selected="handleProductSelected" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import ProductsFeatureds from "./ProductsFeatureds.vue";
import ProductsOffs from "./ProductsOffs.vue";
import ProductsNews from "./ProductsNews.vue";
export default {
  name: "TiendaContent",
  components: {
    ProductsFeatureds,
    ProductsOffs,
    ProductsNews,
  },
  computed: {
    ...mapState("tienda", ["tienda"]),
  },

  methods: {
    handleProductSelected(product) {
      // O emitir un evento personalizado que se propagará hacia arriba
      this.$emit("product-selected", product);
    },
  },
};
</script>

<style scoped>
.main_products {
  background-color: #f5f5f5;
}
</style>
