<template>
  <div class="ContentMainTiendasComponent">
    <TiendasVisitadasComponent />
    <TiendasCercanasComponent />
  </div>
</template>

<script>
import TiendasCercanasComponent from "./content_tiendas/TiendasCercanasComponent.vue";
import TiendasVisitadasComponent from "./content_tiendas/TiendasVisitadasComponent.vue";

export default {
  name: "ContentMainTiendasComponent",
  components: {
    TiendasCercanasComponent,
    TiendasVisitadasComponent,
  },
};
</script>

<style scoped>
.ContentMainTiendasComponent {
  margin: 0px !important;
  padding: 0px !important;
}
</style>
