<template>
  <div class="InfoTienda mt-2">
    <div class="container">
      <div class="row">
        <div class="col-6">
          <div class="profile-pic">
            <img :src="tienda.tienda_images[0].logo" alt="Profile Image" />
          </div>
        </div>
        <div class="col-6">
          <img :src="tienda.qr_code[0].qr_code" alt="Codigo Qr" class="codigo_qr" />
        </div>
      </div>
      <div class="row mt-2">
        <div class="card shadow rounded">
          <div class="card-body">
            <ul class="ul__cat_sel">
              <li
                v-for="categoria in tienda.categories"
                :key="categoria.id"
                class="li_cat_sel"
              >
                {{ categoria.nombre }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="row mt-2">
        <div class="card shadow rounded">
          <div class="card-body">
            <p>
              {{ tienda.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "InfoTienda",
  data() {
    return {};
  },
  computed: {
    ...mapState("tienda", ["tienda"]),
  },
};
</script>

<style scoped>
.profile-pic {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  border: solid 2px #ffffff;
  background-color: #ffffff;
}

.profile-pic img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.codigo_qr {
  width: 150px;
  height: 150px;
}
.li_cat_sel {
  display: inline-block;
  margin-right: 2px; /* Ajusta el margen derecho según tus necesidades */
  padding: 5px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f5f5f5;
  color: #333;
  font-size: 12px;
  cursor: pointer;
}
@media (max-width: 768px) {
  .profile-pic {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    border: solid 2px #ffffff;
    background-color: #ffffff;
  }

  .profile-pic img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .codigo_qr {
    width: 120px;
    height: 120px;
  }
}
</style>
