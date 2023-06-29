<template>
  <div class="row mt-3 mb-3 d-flex align-items-center">
    <div class="col-5 col-xs-5 col-lg-5">
      <div class="input-group">
        <button
          class="btn btn-outline-secondary"
          type="button"
          :disabled="!enabled"
          @click="decrement"
        >
          <font-awesome-icon icon="fa-solid fa-minus" />
        </button>
        <input
          type="text"
          class="form-control"
          v-model="quantity_only_attribute"
          min="1"
          max="100"
          step="1"
          readonly
        />
        <button
          class="btn btn-outline-secondary"
          type="button"
          :disabled="!enabled"
          @click="increment()"
        >
          <font-awesome-icon icon="fa-solid fa-plus" />
        </button>
      </div>
    </div>
    <div class="col-5 col-xs-5 col-lg-5 pr-0 mr-0">
      <button
        type="button"
        class="btn btn-outline-secondary"
        :disabled="!enabled"
        @click="AddToCartProductWithVariation()"
      >
        <font-awesome-icon icon="fa-solid fa-cart-plus" />
        <span style="font-size: 12px"> AGREGAR </span>
      </button>
    </div>
    <div class="col-2 col-xs-2 col-lg-2 p-0">
      <button type="button" class="btn btn-outline-secondary" @click="SendWhtasApp()">
        <font-awesome-icon class="whatsapp_button" icon="fa-brands fa-whatsapp" />
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "AddToCartWithVariationComponent",
  props: ["product", "variationValuesforChild", "variacionEncontrada"],
  data() {
    return {
      quantity_only_attribute: 0,
      enabled: false,
    };
  },
  computed: {
    ...mapState("cart", ["cart"]),
    ...mapState("tienda", ["tienda"]),
  },

  watch: {
    variacionEncontrada(value) {
      if (!value) {
        this.enabled = false;
      } else {
        this.enabled = true;
      }
    },
  },

  methods: {
    ...mapMutations("cart", ["AddToCartWithVariationVuex", "AddTotal", "ClearTotal"]),

    SendWhtasApp() {
      if (this.tienda.store_settings[0].order_wp == true) {
        if (this.tienda.store_settings[0].wp_number) {
          let message = "Mitienda.app\n\n";
          message += "Hola tengo una consulta sobre este producto de su tienda \n";
          message += "*" + this.product.title + "*" + "\n";
          let formattedMessage = encodeURIComponent(message);
          let whatsappNumber = this.tienda.store_settings[0].wp_number;
          const whatsappLink = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${formattedMessage}`;
          window.open(whatsappLink, "_self");
        } else {
          this.$swal.fire(
            "No hay WhatsApp configurado!",
            "El administrador de esta tienda aun no a configurado su numero de WhatsApp.",
            "info"
          );
        }
      } else {
        this.$swal.fire(
          "No hay WhatsApp configurado!",
          "El administrador de esta tienda, no recibe consultas u ordenes por WhatsApp.",
          "info"
        );
      }
    },

    totalPrice() {
      let price = 0;
      this.cart.map((el) => {
        if (el["has_variation"] == true) {
          price += el["quantity"] * el["price"];
          this.AddTotal(price);
        } else {
          if (el["in_offer"] == false) {
            price += el["quantity"] * el["price"];
            this.AddTotal(price);
          }
          if (el["in_offer"] == true) {
            price += el["quantity"] * el["in_offer_price"];
            this.AddTotal(price);
          }
        }
        if (this.cart.length == 0) {
          this.ClearTotal();
        }
      });
    },

    AddToCartProductWithVariation() {
      if (this.quantity_only_attribute != 0) {
        let variaciones = [];

        this.variationValuesforChild.forEach(function callback(value, index) {
          variaciones.push(value.item);
        });
        console.log(variaciones);

        this.product.variaciones = variaciones;

        console.log(this.product);

        console.log("variacion seleccionada");
        console.log(this.variacionEncontrada);

        /* REEMPLAZO EL PRECIO DE LA BASE DE DATOS, POR EL DE LA VARIACIONE ENCONTRADA */
        this.product.price = this.variacionEncontrada.price;
        this.product.quantity = this.quantity_only_attribute;
        this.AddToCartWithVariationVuex(this.product);
        this.totalPrice();
        this.$swal.fire({
          position: "center-end",
          icon: "success",
          title: "se agregaron " + this.quantity_only_attribute + " al carrito",
          showConfirmButton: false,
          timer: 1200,
        });
        this.quantity_only_attribute = 0;
      }
    },

    increment() {
      if (this.variacionEncontrada.no_stock == false) {
        if (this.quantity_only_attribute != this.variacionEncontrada.stock) {
          this.quantity_only_attribute++;
        }
      } else {
        this.quantity_only_attribute++;
      }
    },
    decrement() {
      if (this.quantity_only_attribute != 1) {
        this.quantity_only_attribute--;
      }
    },
  },
};
</script>

<style scoped>
.whatsapp_button {
  color: green !important;
  font-size: 25px !important;
}
</style>
