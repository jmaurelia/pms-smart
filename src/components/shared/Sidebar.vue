<template>
  <div class="sidebar">
    <!-- sidebar menu -->
    <div class="sidebar__menu">
      <b-button @click="signOut()" variant="danger" size="lg" block>Cerrar Sesión</b-button>
    </div>

    <!-- backdrop -->
    <div
      class="sidebar__backdrop"
      v-if="state"
      @click="sendStateToParent()"
    ></div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    state: Boolean,
  },
  methods: {
    ...mapActions("Auth", ["signOut"]),
    sendStateToParent() {
      this.$emit("stateFromChild", false);
    },
  },
};
</script>
