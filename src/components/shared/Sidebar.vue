<template>
  <div class="sidebar-content">
    <div class="sidebar-left">
      <!-- header -->
      <div class="sidebar-header">{{ state }}</div>
      <!-- logout -->
      <div class="sidebar-footer mt-auto px-3 pb-3">
        <b-button @click="signOut()" variant="danger" size="lg" block>Cerrar Sesión</b-button>
      </div>
    </div>
    <div
      v-if="state"
      @click="sendStateToParent()"
      class="sidebar-backdrop"
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

<style lang="scss" scoped>
$sidebar-width: 280px;

.sidebar {
  // sidebar
  &-left {
    top: 0;
    left: -($sidebar-width);
    width: $sidebar-width;
    height: 100%;
    bottom: 0;
    display: flex;
    position: fixed;
    z-index: 999;
    flex-direction: column;
    background-color: white;
    transition: left 0.2s ease;

    // header
    .sidebar-header {
      min-height: 24%;
      display: block;
      background-color: rgba(orange, 0.2);
    }
  }

  // backdrop
  &-backdrop {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    z-index: 998;
    background-color: rgba(black, 0.3);
  }
}

.sidebar-open {
  .sidebar-left {
    left: 0;
  }
}
</style>