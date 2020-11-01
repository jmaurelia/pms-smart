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
        <!-- grid -->
        <b-row align-v="end">
          <b-col cols="8">
            <!-- title -->
            <h2 class="header__title">{{ dataItem.name }}</h2>
            <!-- secondary -->
            <p class="header__secondary text-muted">
              <span v-if="dataItem.description">{{
                dataItem.description
              }}</span>
              <span>Sin Descripción</span>
            </p>
          </b-col>
          <b-col class="text-right">
            <b-button v-if="!!dataItem.programs" pill variant="danger" size="lg" @click="turnOffPograms()">
              <b-icon icon="power" aria-hidden="true" class="mb-1" />
            </b-button>
          </b-col>
        </b-row>
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
        <h5 class="page__title my-3" v-if="!!dataItem.programs">Programas:</h5>
        <!-- switch -->
        <b-row v-if="!!dataItem.programs" class="pms__items">
          <b-col lg="3" v-for="(item, index) in dataItem.programs" :key="index">
            <div class="pms__items__item">
              <div class="item__icon">
                <b-icon
                  icon="brightness-alt-high-fill"
                  style="transform: rotate(180deg)"
                />
              </div>
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
import { mapActions } from "vuex";

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
    ...mapActions("Rooms", ["updateProgram"]),
    getRoom() {
      return new Promise((resolve, reject) => {
        var dataRef = database.ref(this.roomSelected);

        dataRef.on("value", (snapshot) => {
          this.dataItem = snapshot.val();
          resolve();
        });
      });
    },
    async confirmModal(data) {
      if (data.item === 1 || data.item === "1") {
        console.log("Encendido");
      } else {
        // -------------
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
              const dataRef = database.ref(this.roomSelected + "/programs");
              const programs = this.dataItem.programs;
              const programActi = Object.keys(programs).filter((key) => {
                return programs[key] != false;
              });

              if (programActi.length !== 0) {
                dataRef.child(String(programActi)).set(false);
              }

              dataRef.child(data.index).set("1");

              this.getRoom();
            } else {
              console.log("cancelado");
            }
          })
          .catch((err) => {
            console.log("CANCEL");
          });
        // -------------
      }
    },
    turnOffPograms() {
      console.log("apagar Todos");
      this.$bvModal
        .msgBoxConfirm("Apagar todos los programas", {
          title: "Confirmar",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "Confirmar",
          cancelTitle: "Cancelar",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          const programs = Object.keys(this.dataItem.programs);
          const dataRef = database.ref(this.roomSelected + "/programs");

          programs.forEach((element) => {
            dataRef.child(element).set(false);
          });
        })
        .catch((e) => {
          console.log(e);
        });
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