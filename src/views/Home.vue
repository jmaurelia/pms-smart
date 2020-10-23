<template>
  <div class="page-wrapper">
    <!-- header -->
    <div class="page-header page-header-home">
      <b-link class="header-action"><b-icon icon="list" /></b-link>
      <div class="page-header-section">
        <h2 class="header-title mb-0">Hola, Juan</h2>
        <p class="text-secondary mb-0">Investigador</p>
      </div>
    </div>

    <!-- content -->
    <div class="page-content">
      <!-- header -->
      <div class="pms-title-category mb-4">
        <h5 class="title mb-0">Bioforest</h5>
        <p class="text-secondary mb-0">{{ countRooms }} Salas</p>
      </div>

      <!-- items -->
      <ul class="list-unstyled">
        <li v-for="(item, index) in rooms" :key="index" class="mb-2">
          <router-link :to="{ name: 'Room', params: { roomId: item.index } }"></router-link>
          <b-card border-variant="light" class="pms-item-list">
            <div class="d-flex align-items-center pms-item">
              <b-avatar icon="house" size="41px" rounded />
              <div class="ml-3 mr-auto">
                <h6 class="name mb-0">{{ item.name }}</h6>
                <p class="mb-0 text-secondary">
                  <span class="mr-3">T: {{ item.temperature.toFixed() }}ºC</span>
                  <span>h: {{ item.humidity.toFixed() }}%</span>
                </p>
              </div>
              <b-icon icon="arrow-right-short" />
            </div>
          </b-card>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState("Rooms", ["rooms"]),
    countRooms() {
      return Object.keys(this.rooms).length;
    },
  },
  methods: {
    ...mapActions("Rooms", ["fetchRooms"]),
  },
  created() {
    this.fetchRooms();
  },
};
</script>