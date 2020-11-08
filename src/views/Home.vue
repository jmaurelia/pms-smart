<template>
  <div class="dashboard" :class="toogle ? 'sidebar--open' : ''">
    <div class="dashboard__content">
      <!-- header -->
      <div class="dashboard__header">
        <!-- button-toggle -->
        <b-link class="header__action d-lg-none" @click="toggleSidebar()"
          ><b-icon icon="list"
        /></b-link>
        <!-- title -->
        <h2 class="header__title">
          Hola, {{ this.$store.state.Auth.user.name }}
        </h2>
        <!-- secondary -->
        <p class="header__secondary text-muted">
          {{ this.$store.state.Auth.user.role }}
        </p>
      </div>

      <!-- content -->
      <div class="dashboard__page">
        <!-- subtitle -->
        <h5 class="page__title mb-0">Bioforest</h5>
        <p class="page__count-rooms text-muted">{{ countRooms }} Salas</p>

        <!-- list programs -->
        <b-row class="pms__items">
          <b-col lg="3" v-for="(item, index) in rooms" :key="index">
            <router-link
              class="pms__items__item"
              :to="{ name: 'Room', params: { roomId: index } }"
            >
              <div class="item__icon">
                <b-icon :icon="item.type === 'incubator' ? 'lamp' : 'house'" />
              </div>
              <div class="item__name">{{ item.name }}</div>
              <div class="item__action">
                <b-icon icon="arrow-right-short" />
              </div>
            </router-link>
          </b-col>
        </b-row>

        <!-- loading-page -->
        <transition name="fade"><Loading v-if="isLoading" /></transition>
      </div>
    </div>

    <!-- sidebar -->
    <Sidebar :state="toogle" @stateFromChild="toggleSidebar" />
  </div>
</template>

<script>
import _ from "lodash";
import Sidebar from "../components/shared/Sidebar";
import Loading from "../components/shared/Loading";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      toogle: false,
    };
  },
  components: {
    Sidebar,
    Loading,
  },
  computed: {
    ...mapState("Rooms", ["rooms", "isLoading"]),
    countRooms() {
      return Object.keys(this.rooms).length;
    },
    orderBy() {
      return _.sortBy(this.rooms, 'order');
    },
  },
  methods: {
    toggleSidebar() {
      this.toogle = !this.toogle;
    },
  },
};
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>