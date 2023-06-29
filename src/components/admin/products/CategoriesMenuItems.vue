<template>
  <li class="submenu dropdown" style="margin-bottom: 5px;">
    <a
      v-if="category.children.length > 0"
      class="dropdown-toggle"
      data-bs-toggle="collapse"
      :data-bs-target="'#submenu-' + category.id"
      >{{ category.name }}</a
    >
    <a v-else @click="handleCategoryClick">{{ category.name }}</a
    >&nbsp;&nbsp;<a @click="DeleteCategorie(category)"
      ><font-awesome-icon icon="fa-solid fa-trash" style="color: red"
    /></a>
    <ul
      v-if="category.children.length > 0"
      class="collapse"
      :id="'submenu-' + category.id"
    >
      <CategoriesMenuItems
        v-for="child in category.children"
        :category="child"
        :key="child.id"
        @category-click="handleChildCategoryClick"
        @category-delete="CategoryResfresh"
      ></CategoriesMenuItems>
    </ul>
  </li>
</template>

<script>
import axios from "axios";
export default {
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
  name: "CategoriesMenuItems",
  methods: {
    DeleteCategorie(category) {
      this.$swal
        .fire({
          title: "Esta seguro?",
          text: "Esta seguro que quiere eliminar esta categoria?!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, Borrarla!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            console.log(category);
            axios
              .delete(this.server + "/api/v1/admin/categories/delete/" + category.id, {
                headers: {
                  Authorization: localStorage.getItem("access"),
                },
              })
              .then((response) => {
                console.log(response.data);
                this.CategoryResfresh();
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
    },

    handleCategoryClick() {
      if (this.category.children.length > 0) {
        // Do nothing if the category has children
        return;
      }
      // Emit an event with the category code to the parent component
      this.$emit("category-click", this.category.id);
    },
    handleChildCategoryClick(childCategoryId) {
      // Emit the event with the child cacategory-deletetegory code to the parent component
      this.$emit("category-click", childCategoryId);
    },
    CategoryResfresh() {
      this.$emit("category-delete", "refresh");
    },
  },
};
</script>
<style scoped>
li {
  list-style: none;
}

.submenu ul {
  padding-left: 20px; /* Ajusta este valor a tu preferencia */
}

  /* estilos para el componente CategoriesMenuItems */
  li {
    list-style: none;
    padding: 10px;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    background-color: #f5f5f5;
    margin: 0px !important
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

@media screen and (max-width: 768px) {
  /* estilos específicos para dispositivos móviles */
}


</style>
