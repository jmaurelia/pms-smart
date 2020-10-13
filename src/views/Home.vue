<template>
  <div class="home">
    <Navigation />
    <!-- list -->
    <b-container>
      <b-row>
        <b-col v-for="(item, index) in rooms" :key="index" cols="6">
          <b-card class="text-center">
            <b-icon-broadcast /> <br />
            <h5 class="mb-0">
              <router-link :to="'/room/' + item">{{ item }}</router-link>
            </h5>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { database } from "@/firebase";
import Navigation from "@/components/layout/Navigation.vue";

export default {
  name: "Home",
  data() {
    return {
      rooms: [],
    };
  },
  components: {
    Navigation,
  },
  methods: {
    getRooms() {
      database.ref().on("value", (snapshot) => {
        this.rooms = Object.keys(snapshot.val());
      });
    },
  },
  mounted() {
    this.getRooms();
  },
};
</script>
