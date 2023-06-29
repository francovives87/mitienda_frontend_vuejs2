<template>
  <div class="TiendaCartComponent">
    <div class="container topBar">
      <div class="row">
        <TiendaCartSumaryComponent />
      </div>
    </div>
    <div class="container cart mt-3">
      <div v-for="product in cart" :key="product.id">
        <div class="card mb-3 shadow-sm bg-light">
          <div class="row g-0">
            <div class="col-md-4">
              <img :src="product.image" class="img-fluid rounded-start" />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">{{ product.title }}</h5>
                <div class="card-text">{{ product.category.name }}</div>
    
                  <div v-if="product.in_offer == true">
                    <div
                      class="card-text"
                      style="text-decoration: line-through; font-size: 12px"
                    >
                      $ {{ product.price }}
                    </div>
                    <div class="card-text">{{ product.in_offer_price }}</div>
                  </div>
                  <div v-if="product.in_offer == false">
                    <div class="card-text">{{ product.price }}</div>
                  </div>
                  <!-- Solo atributos -->
                  <div v-if="product.atributos">
                    <div v-if="product.atributos.length > 0">
                      <ul
                        class="list-group list-group-flush"
                        v-if="product.opciones.length > 0"
                      >
                        <li
                          class="list-group-item"
                          v-for="(op, index) in product.opciones"
                          :key="index"
                        >
                          {{ op }}
                        </li>
                      </ul>
                    </div>
                  </div>
            
                <!-- variaciones -->
                <div class="variaciones mt-2" v-if="product.variaciones">
                  <ul class="list-group list-group-flush">
                    <li
                      class="list-group-item"
                      v-for="(vari, index) in product.variaciones"
                      :key="index"
                    >
                      {{ vari }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div
              class="card-footer d-flex justify-content-end"
              v-if="product.has_variation == false"
            >
              <div class="col-6">
                <div class="input-group">
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    @click="removeItem(product)"
                  >
                    <font-awesome-icon icon="fa-solid fa-minus" />
                  </button>
                  <input
                    type="text"
                    class="form-control"
                    v-model="product.quantity"
                    step="1"
                    readonly
                  />
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    @click="addItem(product)"
                  >
                    <font-awesome-icon icon="fa-solid fa-plus" />
                  </button>
                </div>
              </div>
            </div>
            <!-- si tiene variaciones -->
            <div
              class="card-footer d-flex justify-content-end"
              v-if="product.has_variation == true"
            >
              <div class="col-6">
                <div class="input-group">
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    @click="RemoveItemWithVariation(product)"
                  >
                    <font-awesome-icon icon="fa-solid fa-minus" />
                  </button>
                  <input
                    type="text"
                    class="form-control"
                    v-model="product.quantity"
                    step="1"
                    readonly
                  />
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    @click="addItemConVariacion(product)"
                  >
                    <font-awesome-icon icon="fa-solid fa-plus" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import TiendaCartSumaryComponent from "./TiendaCartSumaryComponent.vue";
export default {
  name: "TiendaCartComponent",
  components: {
    TiendaCartSumaryComponent,
  },

  mounted() {},

  computed: {
    ...mapState("cart", ["cart", "count", "total"]),
  },

  data() {
    return {};
  },

  methods: {
    ...mapMutations("cart", [
      "AddToCartVuex",
      "AddToCartWithVariationVuex",
      "RemoveItemVuex",
      "RemoveItemVuexWithVariation",
      "AddTotal",
      "ClearCart",
      "ClearTotal",
      "AddToCartOnlyAttributeVuex",
      "RemoveItemtOnlyAttributeVuex",
    ]),

    RemoveItemWithVariation(product) {
      this.RemoveItemVuexWithVariation(product);
      this.totalPrice();
    },

    addItemConVariacion(product) {
      if (product.quantity != product.stock) {
        product.flag = "fromCart";
        this.AddToCartWithVariationVuex(product);
        this.totalPrice();
      }
    },

    addItem(product) {
      if (product.quantity != product.stock) {
        product.flag = "fromCart";
        this.AddToCartVuex(product);
        this.totalPrice();
      }
    },
    removeItem(product) {
      this.RemoveItemVuex(product);
      this.totalPrice();
    },

    totalPrice() {
      console.log("computed_totalPrice");
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
      });
      if (this.cart.length == 0) {
        this.ClearTotal();
      }
    },
  },
};
</script>

<style scoped>
.topBar {
  border-bottom: 1px solid gray;
  padding-bottom: 10px;
}
.cart {
  overflow-y: auto;
}
</style>
