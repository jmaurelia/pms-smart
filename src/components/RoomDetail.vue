<template>
  <!-- Dashboard -->
  <div class="dashboard" :class="updateState ? 'no-scroll' : ''">
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
              <span v-else>{{ item.description }}</span>
            </p>
          </b-col>
          <!-- <b-col cols="4" class="text-right">
            <b-button @click="offPrograms()" v-if="!!item.programs"
              ><b-icon icon="power" aria-hidden="true" class="mb-1"
            /></b-button>
          </b-col> -->
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
            <div class="pms__items__item" v-if="index !== 'reset'">
              <div class="item__icon">
                <b-icon
                  icon="brightness-alt-high-fill"
                  style="transform: rotate(180deg)"
                />
              </div>
              <div class="item__name">Programa {{ index }}</div>
              <!-- Switch -->
              <div
                class="item__switch"
                :class="[item ? '' : 'item__switch--on']"
                @click="
                  changeState({ index, item, room: $route.params.roomId })
                "
              />
              <!-- ./Switch -->
            </div>
          </b-col>
        </b-row>
      </div>
      <!-- ./Page -->

      <!-- Loading -->
      <transition name="fade"><Loading v-if="isLoading" /></transition>
      <transition name="fade">
        <div class="load-program" v-if="updateState">
          <div class="load-program__info text-center">
            <img src="../assets/planty.gif" alt="animation" />
            <h4>Cambiando Programa de Riego</h4>
          </div>
        </div>
      </transition>

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
import { database, logsCollection } from "@/firebase";
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

      //
      updateState: false,
      userIn: this.$store.state.Auth.user,
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
    // Change State
    async changeState(v) {
      database.ref(v.room + "/programs").child('reset').set(0)

      this.$bvModal
        .msgBoxConfirm("Confirmar que quiere " + (v.item ? "encender" : "apagar") + " el programa " + v.index, {
          title: "Atención",
          size: "sm",
          okVariant: "success",
          okTitle: "Confirmar",
          cancelTitle: "Cancelar",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if(value) {

            if(v.item) {
              // 00. iniciar animación
              this.updateState = true;
              database.ref(v.room + "/programs").child('reset').set(true)

              // 01. apagar si es que hay un programa encendido
              const programON = Object.keys(this.item.programs).filter((x) => {return this.item.programs[x] !== true});
              if(programON.length > 0) { database.ref(v.room + "/programs").child(String(programON)).set(true) }

              // 02. pulso reset
              setTimeout(() => { database.ref(v.room + "/programs").child('reset').set(false) }, 1000);
              setTimeout(() => { database.ref(v.room + "/programs").child('reset').set(true) }, 2000);

              // 03. encender programa seleccionado
              setTimeout(() => { database.ref(v.room + "/programs").child(v.index).set(false); }, 4000);

              // 04. desactivar animación
              setTimeout(() => { this.updateState = false; }, 6000);

            } else {
              this.updateState = true;
              
              // 01. apagar programa selecionado
              setTimeout(() => { database.ref(v.room + "/programs").child(v.index).set(true); }, 1000);

              // 02. activar reset
              setTimeout(() => { database.ref(v.room + "/programs").child('reset').set(false) }, 3000);

              // 03. desactivar animación
              setTimeout(() => { this.updateState = false; }, 4000);
            }
            
          } else {
            database.ref(v.room + "/programs").child('reset').set(true)
          }
        })
        .catch((err) => {
          console.log("Error");
        });

        
    },
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

.load-program {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: auto;
    height: 180px;
  }
}
.no-scroll {
  overflow: hidden;
}

// Modal
.modal {
  // content
  &-content {
    border: 0;
    margin: 0 30px;

    @media (min-width: 768px) {
      margin: 0;
    }
  }

  // header
  &-header {
    border-bottom: 0;
    padding-bottom: 10px;

    .modal-title {
      font-weight: 600;
    }

    .close {
      display: none;
    }
  }

  // body
  &-body {
    color: #6b7280;
    padding-top: 0;
  }

  // footer
  &-footer {
    border-top: 0;
    background-color: #f9fafb;

    .btn {
      font-weight: 600;
    }
  }
}
</style>