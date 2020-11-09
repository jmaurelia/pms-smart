<template>
  <!-- Dashboard -->
  <div class="dashboard">
    <!-- Content -->
    <div class="dashboard__content">
      <!-- Header -->
      <div class="dashboard__header">
        <!-- BackButton -->
        <b-link :to="{ name: 'Home' }" class="header__action"
          ><b-icon icon="arrow-left"
        /></b-link>
        <!-- Row -->
        <b-row align-v="end">
          <b-col cols="8">
            <!-- title -->
            <h2 class="header__title">{{ item.name }}</h2>
            <!-- secondary -->
            <p class="header__secondary text-muted">
              <span v-if="!item.description">Sin Descripción</span>
              <span v-else>{{item.description}}</span>
            </p>
          </b-col>
          <b-col cols="4" class="text-right">
            <b-button @click="offPrograms()" v-if="!!item.programs"
              ><b-icon icon="power" aria-hidden="true" class="mb-1"
            /></b-button>
          </b-col>
        </b-row>
      </div>
      <!-- ./Header -->

      <!-- Page -->
      <div class="dashboard__page">
        <!-- sensor -->
        <b-row class="pms__items">
          <b-col cols="6">
            <div class="pms__items__item pms__items__item--temperature">
              <div class="item__icon"><b-icon icon="thermometer" /></div>
              <div class="item__name">
                {{ item.temperature | fixedNumber }} ºC
              </div>
            </div>
          </b-col>
          <b-col cols="6">
            <div class="pms__items__item pms__items__item--humidity">
              <div class="item__icon"><b-icon icon="droplet-half" /></div>
              <div class="item__name">{{ item.humidity | fixedNumber }}%</div>
            </div>
          </b-col>
        </b-row>
        <h5 class="page__title my-3" v-if="!!item.programs">Programas:</h5>
        <!-- switch -->
        <b-row v-if="!!item.programs" class="pms__items">
          <b-col
            md="6"
            xl="3"
            v-for="(item, index) in item.programs"
            :key="index"
          >
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
                :class="[item ? '' : 'item__switch--on']"
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
      <!-- ./Page -->

      <!-- Loading -->
      <transition name="fade"><Loading v-if="isLoading" /></transition>
      <!-- ./Loading -->
    </div>
    <!-- ./Content -->

    <!-- Sidebar -->
    <Sidebar />
    <!-- ./Sidebar -->
  </div>
  <!-- ./Dashboard -->
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
      item: {},
      database: database.ref(this.$route.params.roomId),
      isLoading: true,
    };
  },
  filters: {
    fixedNumber(value) {
      if (String(value).length >= 3 && value !== undefined) {
        return value.toFixed(2);
      } else {
        return value;
      }
    },
  },
  methods: {
    // GetData Room
    getData() {
      return new Promise((resolve, reject) => {
        this.database.on("value", (snapshot) => {
          this.item = snapshot.val();
          resolve();
        });
      });
    },
    // Loading Data
    async loadingData() {
      await this.getData();
      this.isLoading = false;
    },
    // Update State
    confirmModal(value) {
      if (value.item) {
        this.$bvModal
          .msgBoxConfirm(
            "Confirmar si quiere activar el programa " + value.index,
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
          .then((data) => {
            if (data) {
              // const
              const databaseRef = database.ref(
                this.$route.params.roomId + "/programs"
              );
              const programs = this.item.programs;
              const activeted = Object.keys(programs).filter((x) => {
                return programs[x] !== true;
              });

              // validate
              if (activeted.length !== 0) {
                databaseRef.child(String(activeted)).set(true);
              }

              // on
              databaseRef.child(value.index).set(0);
              database.ref(this.$route.params.roomId).update({ reset: true });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    // Reset Programs
    offPrograms() {
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
          // const
          const programs = Object.keys(this.item.programs);
          const databaseRef = database.ref(
            this.$route.params.roomId + "/programs"
          );
          const resetRef = database.ref(this.$route.params.roomId);

          // reset relay
          resetRef.update({ reset: 0 });

          // set true programs
          programs.forEach((element) => {
            databaseRef.child(element).set(true);
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.loadingData();
  },
  beforeDestroy() {
    this.database.off("value");
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