<template>
  <div class="AdminOrdersMenu">
    <ul class="list-unstyled">
      <li
        v-for="result in dates"
        :key="result.date"
        class="py-3 border-top border-bottom"
      >
        <a @click="GetOrder(result)">{{ result.formatted_date }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AdminOrdersMenu",
  props: ["mitienda"],
  data() {
    return {
      dates: [],
    };
  },
  mounted() {
    this.GetDatesOrders();
  },

  methods: {
    GetOrder(original_date) {
      console.log(original_date);
      this.$emit("fecha", original_date);
    },

    GetDatesOrders() {
      axios
        .get(this.server + "/api/v1/admin/order/dates/", {
          headers: {
            Authorization: localStorage.getItem("access"),
          },
          params: {
            tienda: this.mitienda.id,
          },
        })
        .then((response) => {
          this.dates = response.data.results;
          console.log(this.dates);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style></style>
