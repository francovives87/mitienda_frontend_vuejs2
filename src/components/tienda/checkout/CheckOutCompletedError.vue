<template>
  <div class="CheckOutCompletedError">
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="col-12 d-flex justify-content-center">
          <font-awesome-icon icon="fa-solid fa-circle-xmark"  class="icon_error"  />
        </div>
        <div class="col-12 d-flex justify-content-center mt-3">
          <span style="font-size: 20px">OCURRIO UN ERROR!</span> <br />
        </div>
        <div class="col-12 d-flex justify-content-center mt-3">
          <span style="font-size: 20px"> No se ha podido procesar la orden.</span>
        </div>
        <div class="col-12 d-flex justify-content-center mt-3">
          <span style="font-size: 20px">{{motivo}}</span>
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
  name: "CheckOutCompletedError",
  props:["motivo"],
};
</script>

<style scoped>
.icon_error {
  font-size: 60px;
  color: red;
}
</style>
