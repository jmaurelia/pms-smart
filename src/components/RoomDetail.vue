<template>
  <div class="page-wrapper">
    <!-- header -->
    <div class="page-header page-header-home">
      <b-link :to="{ name: 'Home' }" class="header-action"
        ><b-icon icon="arrow-left-short"
      /></b-link>
      <div class="page-header-section">
        <h2 class="header-title mb-0">{{ roomById.name }}</h2>
        <p class="text-secondary mb-0">
          <span v-if="roomById.description">{{ roomById.description }}</span>
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
                {{ roomById.temperature | fixedNumber }} ºC
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
              <h4 class="mb-0 font-weight-bold">
                {{ roomById.humidity | fixedNumber }}%
              </h4>
              <p class="mb-0 text-secondary text-truncate">Hum.</p>
            </b-media>
          </b-card>
        </b-col>
      </b-row>
      <div>
        <div class="pms-title-category my-4">
          <h5 class="title mb-0">Programas</h5>
          <p class="text-secondary mb-0">
            {{ roomById.programsCount }} Disponibles
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  filters: {
    fixedNumber(v) {
      if (String(v).length >= 3 && v !== undefined) {
        return v.toFixed(0);
      } else {
        return v;
      }
    },
  },
  computed: {
    ...mapState("Rooms", ["roomById", "isLoading"]),
  },
  methods: {
    ...mapActions("Rooms", ["fetchRoomById"]),
  },
  created() {
    this.fetchRoomById(this.$route.params.roomId);
  },
};
</script>