<template>
  <div class="SearchInputComponent">
    <form @submit.prevent="SearchOnMiTienda()">
      <div class="search-box">
        <input
          type="text"
          class="form-control search-input"
          placeholder="Buscar tiendas o productos"
          v-model="kword"
        />
        <a class="clear-btn" @click="ClearSearch()">
          <font-awesome-icon icon="fa-solid fa-xmark" />
        </a>
        <button type="button" class="btn btn-link search-btn" @click="SearchOnMiTienda">
          <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "SearchInputComponent",
  props: ["activeTab"],
  data() {
    return {
      kword: null,
      empty: true,
    };
  },

  watch: {
    kword() {
      if (this.kword.length >= 1) {
        this.empty = false;
      }
      if (this.kword.length == 0) {
        this.empty = true;
      }
      if (this.kword.length > 3) {
        this.SearchOnMiTienda();
      }
    },
  },

  methods: {
    SearchOnMiTienda() {
      console.log("buscar en mi tienda");

      let vista = null;

      if (this.activeTab == 0) {
        vista = "search_content_tiendas";
      }

      if (this.activeTab == 1) {
        vista = "search_content_products";
      }

      this.$emit("search_kword", {
        kword: this.kword,
        vista: vista,
        activeTab: this.activeTab,
      });
    },

    ClearSearch() {
      console.log("hola");
      let vista = null;

      if (this.activeTab == 0) {
        vista = "content_main_tiendas";
      }

      if (this.activeTab == 1) {
        vista = "content_main_products";
      }

      this.$emit("clear_search", {
        vista: vista,
        activeTab: this.activeTab,
      });
      this.kword = "";
    },
  },
};
</script>

<style scoped>
.search-box {
  padding-left: 10px !important;
  position: relative;
  display: inline-block;
}

.search-input {
  width: 600px;
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

.clear-btn {
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 45px !important;
  margin-top: 0px !important;
  font-size: 25px !important;
  color: gray !important;
}

.search-btn:focus {
  outline: none;
}

.search-btn:hover {
  background-color: #f0f0f0;
}

@media (max-width: 768px) {
  .search-box {
    padding-left: 0px !important;
    position: relative;
    display: inline-block;
  }

  .search-input {
    width: 280px;
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

  .clear-btn {
    position: absolute;
    top: 0;
    right: 0;
    margin-right: 45px !important;
    margin-top: 5px !important;
    font-size: 20px !important;
    color: gray !important;
  }

  .search-btn:focus {
    outline: none;
  }

  .search-btn:hover {
    background-color: #f0f0f0;
  }
}
</style>
