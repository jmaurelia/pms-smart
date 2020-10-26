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
          <ul class="list-unstyled mt-5">
            <li
              v-for="(item, index) in roomById.programs"
              :key="index"
              class="mb-2"
            >
              <b-card border-variant="light" class="pms-item-list">
                <div class="d-flex align-items-center pms-item">
                  <b-avatar icon="power" size="41px" rounded />
                  <div class="ml-3 mr-auto">
                    <h6 class="name mb-0 text-dark">Programa {{ index }}</h6>
                  </div>
                  <div class="pms-switch">
                    <b-button @click="showMsgBoxTwo({index, item, room: $route.params.roomId })" :class="[item ? 'btn-success' : 'btn-secondary']">
                      {{ item ? "Encendido" : "Apagado" }}
                    </b-button>
                  </div>
                </div>
              </b-card>
            </li>
          </ul>
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
    ...mapActions("Rooms", ["fetchRoomById", "updateProgram"]),
    showMsgBoxTwo(data) {
      this.$bvModal
        .msgBoxConfirm("Confirmar si quiere activar el programa " + data.index, {
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
          if(value) {
            this.updateProgram(data)
          } else {
            console.log('cancelado')
          }
        })
        .catch((err) => {
          console.log('CANCEL')
        });
    },
  },
  created() {
    this.fetchRoomById(this.$route.params.roomId);
  },
};
</script>