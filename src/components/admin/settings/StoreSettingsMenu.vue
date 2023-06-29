<template>
  <div class="StoreSettingsMenu">
    <ul class="list-unstyled">
      <li class="my-3 link">
        <a class="text-dark font-weight-bold" @click="EmitirLink('miTiendaSettings')"
          ><font-awesome-icon icon="fa-solid fa-store" /> Mi Tienda</a
        >
      </li>
      <hr class="my-2" />
      <li class="my-3 link">
        <a class="text-dark" @click="EmitirLink('paymentsMethodSettings')"
          ><font-awesome-icon icon="fa-solid fa-credit-card" /> Metodos de cobro</a
        >
      </li>
      <hr class="my-2" />
      <li class="my-3 link"><a class="text-dark" @click="EmitirLink('AdminEnvios')"><font-awesome-icon icon="fa-solid fa-truck" /> Envios</a></li>
      <hr class="my-2" />
    </ul>
  </div>
</template>

<script>
export default {
  name: "StoreSettingsMenu",

  methods: {
    EmitirLink(value) {
      this.$emit("vista", value);
      console.log("EmitirLink");
      console.log(value);
    },
  },
};
</script>

<style scoped>
.sidebar a:hover {
  background-color: #f0f0f0 !important;
}
.link:hover {
  background-color: #f0f0f0 !important;
  padding: 3px;
}
</style>
