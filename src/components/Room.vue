<template>
  <div>
    Rooms
    <h3>{{ $route.params.name }}</h3>
    <pre>{{ roomData }}</pre>
    <b-list-group v-if="roomData.programs" class="px-4">
      <b-list-group-item
        class="d-flex align-items-center"
        v-for="(item, index) in roomData.programs"
        :key="index"
      >
        Programa {{ index }}
        <b-button
          @click="setProgram(index, item)"
          class="ml-auto"
          :class="[item ? 'btn-success' : 'btn-secondary']"
        >
          <b-icon icon="power" /> 
        </b-button>
      </b-list-group-item>
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
      });
    },
    async setProgram(index, item) {
      if (item === 0) {
        var programs = this.roomData.programs;
        var programActive = Object.keys(programs).filter(function (key) {
          return programs[key] != 0;
        });
        var reference = database.ref(this.roomName + "/programs");

        if (programActive.length != 0) {
          await reference.child(String(programActive)).set(0);
        }

        await reference.child(index).set("on");
      }
    },
  },
  created() {
    this.getData();
  },
};
</script>