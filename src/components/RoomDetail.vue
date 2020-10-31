<template>
  <div class="dashboard">
    <div class="dashboard__content">
      <!-- header -->
      <div class="dashboard__header">
        <!-- button-toggle -->
        <b-link :to="{ name: 'Home' }" class="header__action"
          ><b-icon icon="arrow-left"
        /></b-link>
        <!-- title -->
        <h2 class="header__title">{{ roomById.name }}</h2>
        <!-- secondary -->
        <p class="header__secondary text-muted">
          <span v-if="roomById.description">{{ roomById.description }}</span>
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
                {{ roomById.temperature | fixedNumber }} ºC
              </div>
            </div>
          </b-col>
          <b-col cols="6">
            <div class="pms__items__item pms__items__item--humidity">
              <div class="item__icon"><b-icon icon="droplet-half" /></div>
              <div class="item__name">
                {{ roomById.humidity | fixedNumber }}%
              </div>
            </div>
          </b-col>
        </b-row>
      </div>

      <!-- loading-page -->
      <transition name="fade"><Loading v-if="isLoading" /></transition>
    </div>
    <!-- sidebar -->
    <Sidebar />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Loading from "./shared/Loading";
import Sidebar from "./shared/Sidebar";
import { database, usersCollection } from "@/firebase";

export default {
  components: {
    Sidebar,
    Loading,
  },
  data() {
    return {
      isLoading: true,
      roomName: "",
    };
  },
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
    ...mapState("Rooms", ["roomById"]),
  },
  methods: {
    ...mapActions("Rooms", ["fetchRoomById", "updateProgram"]),
    getData(value) {
      var starCountRef = database.ref(value);
      starCountRef.on("value", function (snapshot) {
        console.log(snapshot.val());
      });
    },
    showMsgBoxTwo(data) {
      this.$bvModal
        .msgBoxConfirm(
          "Confirmar si quiere activar el programa " + data.index,
          {
            title: "Confirmar",
            size: "sm",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: "Confirmar",
            cancelTitle: "Cancelar",
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true,
          }
        )
        .then((value) => {
          if (value) {
            this.updateProgram(data);
          } else {
            console.log("cancelado");
          }
        })
        .catch((err) => {
          console.log("CANCEL");
        });
    },
  },
  async mounted() {
    this.roomName = this.$route.params.roomId;

    this.getData(this.roomName)

    await this.fetchRoomById(this.roomName);

    this.isLoading = false;
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