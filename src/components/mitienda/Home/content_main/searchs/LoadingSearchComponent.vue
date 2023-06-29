<template>
  <div class="LoadingComponent">
    <div class="d-flex justify-content-center">
      <div
        class="spinner-border text-primary"
        style="width: 4rem; height: 4rem; border-width: 6px"
        role="status"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div class="container d-flex justify-content-center text_loading">
        <div class="row">
            <div class="col-12">
                <h6>BUSCANDO RESULTADOS...</h6>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoadingComponent",
};
</script>

<style scoped>
.LoadingComponent {
  margin-top: 10px !important;
}
.text_loading{
    margin-top: 30px;
}
</style>
