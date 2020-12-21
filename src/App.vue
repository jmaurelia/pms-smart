<template>
  <div id="app">
    <!-- update -->
    <b-navbar type="dark" variant="dark" v-if="updateExists">
      <span class="text-light">Tienes una actualización</span
      ><b-button variant="primary" size="sm" class="ml-auto" @click="refreshApp"
        >Actualizar</b-button
      >
    </b-navbar>
    <!-- ./update -->
    <router-view />
  </div>
</template>

<script>
import update from "./mixins/update";

export default {
  mixins: [update],
};
</script>