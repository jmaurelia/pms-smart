<template>
  <div class="d-flex justify-content-between align-items-center">
    <div>
      <h3 class="mb-0">Bienvenido</h3>
      <p>{{ userProfile.name }}</p>
    </div>
    <b-icon @click="signOut" icon="exclamation-circle-fill" variant="danger" />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "HelloWorld",
  computed: {
    ...mapState("Auth", ["userProfile"]),
  },
  methods: {
    ...mapActions("Auth", ["signOut"]),
  },
};
</script>

//<div id="nav">
//<router-link to="/">Home</router-link> |
//<router-link to="/about">About</router-link>
//</div>