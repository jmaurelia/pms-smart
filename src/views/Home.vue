<template>
  <div class="page-wrapper" :class="toogle ? 'sidebar-open' : ''">
    <!-- header -->
    <div class="page-header page-header-home">
      <b-link @click="toggleSidebar()" class="header-action"
        ><b-icon icon="list"
      /></b-link>
      <div class="page-header-section">
        <h2 class="header-title mb-0">
          Hola, {{ this.$store.state.Auth.user.name }}
        </h2>
        <p class="text-secondary mb-0">
          {{ this.$store.state.Auth.user.role }}
        </p>
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
          <router-link :to="{ name: 'Room', params: { roomId: index } }">
            <b-card border-variant="light" class="pms-item-list">
              <div class="d-flex align-items-center pms-item">
                <b-avatar icon="house" size="41px" rounded />
                <div class="ml-3 mr-auto">
                  <h6 class="name mb-0 text-dark">{{ item.name }}</h6>
                  <p class="mb-0 text-secondary d-none">
                    <span class="mr-3"
                      >T: {{ item.temperature }}ºC</span
                    >
                    <span>h: {{ item.humidity }}%</span>
                  </p>
                </div>
                <b-icon class="text-dark" icon="arrow-right-short" />
              </div>
            </b-card>
          </router-link>
        </li>
      </ul>
    </div>

    <!-- sidebar -->
    <Sidebar :state="toogle" @stateFromChild="toggleSidebar"/>
  </div>
</template>

<script>
import Sidebar from "../components/shared/Sidebar";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      toogle: false,
    };
  },
  components: {
    Sidebar,
  },
  computed: {
    ...mapState("Rooms", ["rooms"]),
    countRooms() {
      return Object.keys(this.rooms).length;
    },
  },
  methods: {
    ...mapActions("Rooms", ["fetchRooms"]),
    toggleSidebar() {
      this.toogle = !this.toogle;
    },
  },
  created() {
    this.fetchRooms();
  },
};
</script>