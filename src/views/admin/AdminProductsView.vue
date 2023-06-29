<template>
  <div class="AdminProductsView">
    <AdminProductsDesktop v-if="height > 1" />
    <AdminProductsMobile v-if="height == 1" />
  </div>
</template>

<script>
import AdminProductsDesktop from "../../components/admin/products/AdminProductsDesktop.vue";
import AdminProductsMobile from "../../components/admin/products/AdminProductsMobile.vue";
export default {
  name: "AdminProductsView",

  components: {
    AdminProductsDesktop,
    AdminProductsMobile,
  },

  mounted(){
    console.log("this.$vuetify.breakpoint.name");
    console.log(this.$vuetify.breakpoint.name);
    console.log("height");
    console.log(this.height);
  },
  computed: {
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 1;
        case "sm":
          return 1;
        case "md":
          return 2;
        case "lg":
          return 4;
        case "xl":
          return 6;
      }
    },
  },
};
</script>

<style></style>
