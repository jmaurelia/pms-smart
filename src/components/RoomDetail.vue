<template>
  <div class="page-wrapper">
    <!-- header -->
    <div class="page-header page-header-home">
      <b-link :to="{ name: 'Home' }" class="header-action"
        ><b-icon icon="arrow-left-short"
      /></b-link>
      <div class="page-header-section">
        <h2 class="header-title mb-0">fdfdfd</h2>
        <p class="text-secondary mb-0">
          <!-- <span v-if="roomById.description">{{ roomById.description }}</span> -->
          <span>Sin Descripción</span>
        </p>
      </div>
    </div>
    <!-- content -->
    <div class="page-content">
      <b-row>
        <b-col cols="6">
          <b-card border-variant="light">
            <b-media vertical-align="center">
              <template #aside>
                <h2 class="mb-0"><b-icon icon="thermometer" /></h2>
              </template>
              <h4 class="mb-0 font-weight-bold">
                {{ roomById.temperature.toFixed(0) }} ºC
              </h4>
              <p class="mb-0 text-secondary text-truncate">Temp.</p>
            </b-media>
          </b-card>
        </b-col>
        <b-col cols="6">
          <b-card border-variant="light">
            <b-media vertical-align="center">
              <template #aside>
                <h2 class="mb-0"><b-icon icon="droplet-half" /></h2>
              </template>
              <h4 class="mb-0 font-weight-bold">66%</h4>
              <p class="mb-0 text-secondary text-truncate">Hum.</p>
            </b-media>
          </b-card>
        </b-col>
      </b-row>
      <div>
        <div class="pms-title-category my-4">
          <h5 class="title mb-0">Programas</h5>
          <p class="text-secondary mb-0">008 Disponibles</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapState("Rooms", ["roomById", "isLoading"]),
  },
  methods: {
    ...mapActions("Rooms", ["fetchRoomById"]),
  },
  mounted() {
    this.fetchRoomById(this.$route.params.roomId);
  },
};
</script>