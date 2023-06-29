<template>
  <div class="ProductViewComponent" ref="ProductViewComponent">
    <div class="topBarNav">
      <div class="container">
        <div class="row">
          <div class="col-10 d-flex align-items-center">
            <a class="atras" @click="emitClose()">
              <font-awesome-icon icon="fa-solid fa-arrow-left" />
            </a>
            <h3 class="titulo">{{ product.title }}</h3>
          </div>
          <div class="col-2 d-flex align-items-center justify-content-end">
            <a class="cerrar" @click="emitClose()">
              <font-awesome-icon icon="fa-solid fa-xmark" />
            </a>
          </div>
        </div>
      </div>
    </div>
    <ProductViewDesktopComponent :product="product" v-if="height > 1" />
    <ProductViewMobileComponent :product="product" v-if="height == 1" />
  </div>
</template>

<script>
import ProductViewDesktopComponent from "../../components/tienda/ProductViewsComponentes/ProductViewDesktopComponent.vue";
import ProductViewMobileComponent from "../../components/tienda/ProductViewsComponentes/ProductViewMobileComponent.vue";
export default {
  name: "ProductViewComponent",
  props: ["product"],
  components: {
    ProductViewDesktopComponent,
    ProductViewMobileComponent,
  },

  mounted() {
    this.scrollToTop();
  },
  updated() {
    this.scrollToTop();
  },

  computed: {
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 1;
        case "sm":
          return 1;
        case "md":
          return 3;
        case "lg":
          return 4;
        case "xl":
          return 6;
      }
    },
  },

  methods: {
    emitClose() {
      this.$emit("display", "content");
    },
    scrollToTop() {
      this.$nextTick(() => {
        this.$refs.ProductViewComponent.scrollTop = 0;
      });
    },
  },
};
</script>

<style scoped>
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

/* top bar */
</style>
