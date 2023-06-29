<template>
  <div class="TiendaCartSumaryComponent">
    <div class="card shadow">
      <div class="card-body">
        <h5 class="card-title">Resumen del carrito</h5>
        <div class="">
          <span class="cart_text_sumary">Total productos: ${{ total }}</span> <br>
          <span class="cart_text_sumary">Envio: ${{ envio }}</span> <br>
          <span class="cart_text_sumary">Cantidad de productos: {{ count }}</span> <br>
          <span class="cart_text_sumary">Total: ${{ sumatoria }}</span> <br>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "TiendaCartSumaryComponent",

  methods: {
    ...mapMutations("cart", ["AddTotal", "AddTotalTotal"]),
  },

  computed: {
    ...mapState("cart", ["count", "total", "envio", "total_total"]),
    ...mapState("tienda", ["tienda"]),
    sumatoria() {
      let suma = parseInt(this.total) + parseInt(this.envio);
      this.AddTotalTotal(suma);
      return suma;
    },
  },
};
</script>

<style scoped>
.TiendaCartSumaryComponent{
  margin-top:20px !important;
}
</style>
