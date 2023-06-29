<template>
  <div class="CheckOutCompletedSucces">
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="col-12 d-flex justify-content-center">
          <font-awesome-icon icon="fa-solid fa-circle-check" class="icon_check" /> <br />
        </div>
        <div class="col-12 d-flex justify-content-center mt-3">
          <span style="font-size: 20px">MUCHAS GRACIAS!</span> <br />
        </div>
        <div class="col-12 d-flex justify-content-center mt-3">
          <span style="font-size: 20px"> Orden completada exitosamente!</span>
        </div>
        <div class="col-12 d-flex justify-content-center mt-3">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "CheckOutCompletedSucces",


};
</script>

<style scoped>
.icon_check {
  font-size: 60px;
  color: green;
}
</style>
