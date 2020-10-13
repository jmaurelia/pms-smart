<template>
  <div>
    Rooms
    <h3>{{ $route.params.name }}</h3>
    <p>{{ roomData }}</p>
    <b-list-group v-if="roomData.programs" class="px-4">
      <b-list-group-item class="d-flex" v-for="(item, index) in roomData.programs" :key="index"
        >Programa {{ index }}
        <b-form-checkbox switch size="lg" class="ml-auto"
      /></b-list-group-item>
    </b-list-group>
    <span v-else>No hay</span>
  </div>
</template>

<script>
import router from "@/router";
import { database } from "@/firebase";

export default {
  data() {
    return {
      roomData: {},
      roomName: this.$route.params.name,
    };
  },
  methods: {
    getData() {
      var roomRef = database.ref(this.roomName);

      roomRef.on("value", (snapshot) => {
        this.roomData = snapshot.val();
        console.log(this.roomData);
      });
    },
  },
  created() {
    this.getData();
  },
};
</script>