<template>
  <li class="submenu dropdown">
    <a
      v-if="category.hijos.length > 0"
      class="dropdown-toggle"
      data-bs-toggle="collapse"
      :data-bs-target="'#submenu-' + category.id"
      >{{ category.nombre }}</a
    >
    <div v-else>
      <input
        type="checkbox"
        :id="'cat-' + category.id"
        :value="category.id"
        @change="handleCategoryClick()"
      />
      <label :for="'cat-' + category.id"> {{ category.nombre }}</label>
    </div>
    <ul v-if="category.hijos.length > 0" class="collapse" :id="'submenu-' + category.id">
      <menu-item
        v-for="child in category.hijos"
        :category="child"
        :key="child.id"
        @category-click="handleChildCategoryClick"
      ></menu-item>
    </ul>
  </li>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
  name: "MenuItem",
  methods: {
    handleCategoryClick() {
      if (this.category.hijos.length > 0) {
        // Do nothing if the category has children
        return;
      }
      // Emit an event with the category code to the parent component
      this.$emit("category-click", this.category);
    },
    handleChildCategoryClick(childCategoryId) {
      // Emit the event with the child category code to the parent component
      this.$emit("category-click", childCategoryId);
    },
  },
};
</script>

<style scoped>
li {
  list-style: none;
}

.submenu ul {
  padding-left: 10px; /* Ajusta este valor a tu preferencia */
}

/* estilos para el componente CategoriesMenuItems */
li {
  list-style: none;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 0px;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  background-color: #FFFFFF;
  margin: 0px !important;
  font-size: 12px !important;
  text-transform: uppercase;
}

.dropdown-toggle {
  cursor: pointer;
}

.dropdown-toggle:hover {
  text-decoration: none;
}

.dropdown-toggle:focus {
  text-decoration: none;
}

.submenu a {
  text-decoration: none;
  color: inherit;
  text-transform: uppercase;
  font-size: 12px !important;
}
@media (max-width: 768px) {
  li {
    font-size: 14px !important;
  }
}
</style>
