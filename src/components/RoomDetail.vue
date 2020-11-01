<template>
  <div class="dashboard">
    <!-- content -->
    <div class="dashboard__content">
      <!-- header -->
      <div class="dashboard__header">
        <!-- button-toggle -->
        <b-link :to="{ name: 'Home' }" class="header__action"
          ><b-icon icon="arrow-left"
        /></b-link>
        <!-- title -->
        <h2 class="header__title">{{ dataItem.name }}</h2>
        <!-- secondary -->
        <p class="header__secondary text-muted">
          <span v-if="dataItem.description">{{ dataItem.description }}</span>
          <span>Sin Descripción</span>
        </p>
      </div>
      <!-- page -->
      <div class="dashboard__page">
        <!-- sensor -->
        <b-row class="pms__items">
          <b-col cols="6">
            <div class="pms__items__item pms__items__item--temperature">
              <div class="item__icon"><b-icon icon="thermometer" /></div>
              <div class="item__name">
                {{ dataItem.temperature | fixedNumber }} ºC
              </div>
            </div>
          </b-col>
          <b-col cols="6">
            <div class="pms__items__item pms__items__item--humidity">
              <div class="item__icon"><b-icon icon="droplet-half" /></div>
              <div class="item__name">
                {{ dataItem.humidity | fixedNumber }}%
              </div>
            </div>
          </b-col>
        </b-row>
        <!-- switch -->
        <b-row class="pms__items">
          <b-col lg="3" v-for="(item, index) in dataItem.programs" :key="index">
            <div class="pms__items__item">
              <div class="item__icon"><b-icon icon="brightness-alt-high-fill" style="transform: rotate(180deg)" /></div>
              <div class="item__name">Programa {{ index }}</div>
              <div
                class="item__switch"
                :class="[item ? 'item__switch--on' : '']"
                @click="
                  confirmModal({
                    index,
                    item,
                    room: $route.params.roomId,
                  })
                "
              ></div>
            </div>
          </b-col>
        </b-row>
      </div>
      <!-- loading -->
      <transition name="fade"><Loading v-if="isLoading" /></transition>
    </div>

    <!-- sidebar -->
    <Sidebar />
  </div>
</template>

<script>
import { database } from "@/firebase";
import Loading from "./shared/Loading";
import Sidebar from "./shared/Sidebar";

export default {
  components: {
    Loading,
    Sidebar,
  },
  data() {
    return {
      dataItem: "",
      isLoading: false,
      roomSelected: this.$route.params.roomId,
    };
  },
  filters: {
    fixedNumber(v) {
      if (String(v).length >= 3 && v !== undefined) {
        return v.toFixed(2);
      } else {
        return v;
      }
    },
  },
  methods: {
    getRoom() {
      return new Promise((resolve, reject) => {
        var dataRef = database.ref(this.roomSelected);

        dataRef.on("value", (snapshot) => {
          this.dataItem = snapshot.val();
          resolve();
        });
      });
    },
    confirmModal(value) {
      console.log(value);
    },
  },
  async beforeMount() {
    this.isLoading = true;
    await this.getRoom();
    this.isLoading = false;
  },
  beforeDestroy() {
    var dataRef = database.ref(this.roomSelected);
    dataRef.off("value");
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