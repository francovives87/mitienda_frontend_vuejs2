<template>
  <div class="menuItemStore">
    <li class="submenu dropdown">
      <a
        v-if="category.children.length > 0"
        class="dropdown-toggle"
        data-bs-toggle="collapse"
        :data-bs-target="'#submenu-' + category.id"
        >{{ category.name }}</a
      >
      <a v-else @click="handleCategoryClick">{{ category.name }}</a>
      <ul
        v-if="category.children.length > 0"
        class="collapse"
        :id="'submenu-' + category.id"
      >
        <menu-item
          v-for="child in category.children"
          :category="child"
          :key="child.id"
          @category-click="handleChildCategoryClick"
        ></menu-item>
      </ul>
    </li>
  </div>
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
      if (this.category.children.length > 0) {
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
a:link {
  text-decoration: none;
  color: #000000;
}
a:visited {
  text-decoration: none;
  color: #000000;
}
a:hover {
  text-decoration: none;
  color: #000000;
}
a:active {
  text-decoration: none;
  color: #000000;
}

.submenu ul {
  padding-left: 20px; /* Ajusta este valor a tu preferencia */
}

li {
  list-style: none;
}

.dropdown {
  padding: 10px 0px 10px 0px !important;
  border-top: 1px solid #ededed !important;
  text-transform: uppercase !important;
}
.dropdown a {
  text-decoration: none !important;
  color: #000000 !important;
  cursor: pointer; /* Agregado para cambiar el cursor a una mano */
  font-size: 14px !important;
}
.dropdown a:hover {
  text-decoration: none !important;
  color: #000000 !important;
  background-color: #ffffff !important;
}

ul {
  margin: 0;
  padding: 0;
}

ul li {
  margin: 0;
  padding: 0;
}
@media (max-width: 768px) {
  .submenu {
    padding: 0px !important;
  }
  .dropdown {
    padding: 10px 0px 10px 0px !important;

    border-top: 1px solid #ededed !important;
    text-transform: uppercase !important;
  }
}
</style>
