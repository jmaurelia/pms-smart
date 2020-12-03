<template>
  <div>
    <div class="bg-primary px-4 mb-4 pt-5 pb-4 text-white screen-top">
      <div class="d-flex justify-content-between align-items-center">
        <router-link class="link-back" to="/home"><b-icon icon="arrow-left" class="mr-2" />Volver</router-link>
        <!-- brand -->
        <h3 class="mb-0">
          <strong>{{ roomData.name }}</strong>
        </h3>
      </div>
      <b-row class="mt-5">
        <b-col>
          <b-media no-body class="block-amb">
            <b-media-aside vertical-align="center"
              ><b-icon icon="thermometer-half"
            /></b-media-aside>
            <b-media-body class="ml-2">
              <h6 class="mb-0">{{ roomData.temperature }}ºC</h6>
              <p class="mb-0">Temperatura</p>
            </b-media-body>
          </b-media>
        </b-col>
        <b-col>
          <b-media no-body class="block-amb">
            <b-media-aside vertical-align="center"
              ><b-icon icon="droplet-half"
            /></b-media-aside>
            <b-media-body class="ml-2">
              <h6 class="mb-0">{{ roomData.humidity }}%</h6>
              <p class="mb-0">Humedad</p>
            </b-media-body>
          </b-media>
        </b-col>
      </b-row>
    </div>
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

        console.log('HOLA')

        await reference.child(index).set("on");
      }
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="scss">
.link-back {
  color: white
}
.block-amb {
  svg {
    width: 33px;
    height: 33px;
  }
  h6 {
    font-size: 21px;
    font-weight: 600;
  }
}
</style>