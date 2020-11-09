<template>
  <!-- authentication: Login -->
  <div class="authentication">
    <!-- form -->
    <div class="authentication__form">
      <!-- body -->
      <div class="authentication__form__body">
        <!-- brand -->
        <div class="auth-brand">
          <svg
            id="logo_blanco"
            class="logo"
            xmlns="http://www.w3.org/2000/svg"
            width="150"
            height="58"
            viewBox="0 0 150 58"
          >
            <g id="Capa_3" data-name="Capa 3" transform="translate(0 23.788)">
              <path
                id="Trazado_6"
                data-name="Trazado 6"
                d="M-180.443,425.732h28.179c9.828,0,12.2,4.9,12.2,11.465v2.867c0,4.993-2.19,10.726-9.5,10.726H-170.1V459.2h-10.34Zm10.34,16.736h16.069c2.422,0,3.354-1.572,3.354-3.56v-1.294c0-2.266-1.118-3.561-4.239-3.561H-170.1Z"
                transform="translate(180.443 -425.362)"
                fill="#2c323c"
              />
              <path
                id="Trazado_7"
                data-name="Trazado 7"
                d="M-136.613,425.732h15.882l11.692,21.545,11.691-21.545h15.881V459.2h-10.06V435.163h-.092L-105.174,459.2h-7.733l-13.554-24.041h-.092V459.2h-10.061Z"
                transform="translate(182.575 -425.362)"
                fill="#2c323c"
              />
              <path
                id="Trazado_8"
                data-name="Trazado 8"
                d="M-77.954,448.262h10.341c.046,3.56,1.491,3.838,4.472,3.838h12.669c2.189,0,4.424-.231,4.424-2.821,0-2.912-1.21-3.1-14.531-3.1-15.559,0-17.328-1.85-17.328-10.079,0-6.057.559-10.726,13.6-10.726h14.439c11.924,0,13.042,4.022,13.042,9.893v1.064H-47.166c0-2.45-.28-3.467-5.03-3.467H-63.654c-2.33,0-3.914.786-3.914,2.589,0,2.912,1.259,3,12.344,2.959,16.069-.047,19.8.924,19.8,10.679,0,9.015-3.075,10.5-16.815,10.5H-64.772c-9.409,0-13.182-1.758-13.182-9.016Z"
                transform="translate(185.428 -425.377)"
                fill="#2c323c"
              />
            </g>
            <g id="Capa_5" data-name="Capa 5" transform="translate(53.023)">
              <g id="Grupo_3" data-name="Grupo 3">
                <path
                  id="Trazado_9"
                  data-name="Trazado 9"
                  d="M-88.855,410.944l-3.893,3.863a23.328,23.328,0,0,0-8.909-5.548,24.151,24.151,0,0,0-10.7-1.1,23.412,23.412,0,0,0-12.525,5.621c-.368.33-.737.66-1.106,1.025l-3.893-3.863.111-.11a29.09,29.09,0,0,1,23.316-8.166,29.132,29.132,0,0,1,9.02,2.4A28.5,28.5,0,0,1-88.855,410.944Z"
                  transform="translate(129.88 -402.524)"
                  fill="#2c323c"
                />
                <path
                  id="Trazado_10"
                  data-name="Trazado 10"
                  d="M-97,418.241l-3.893,3.864-.148-.147a12.589,12.589,0,0,0-17.524.147l-3.892-3.864a17.773,17.773,0,0,1,8.227-4.651A18.121,18.121,0,0,1-97,418.241Z"
                  transform="translate(130.241 -402.094)"
                  fill="#2c323c"
                />
              </g>
              <ellipse
                id="Elipse_2"
                data-name="Elipse 2"
                cx="4.996"
                cy="4.959"
                rx="4.996"
                ry="4.959"
                transform="translate(15.52 21.847)"
                fill="#2c323c"
              />
            </g>
          </svg>
        </div>

        <!-- title -->
        <h4 class="mb-0">Ingresar</h4>
        <p class="text-muted">
          Ingrese su dirección de correo electrónico y contraseña para acceder a
          la cuenta.
        </p>

        <!-- form -->
        <b-form @submit.prevent="loginProcess(loginForm)">
          <!-- email -->
          <b-form-group label="Email">
            <b-form-input
              v-model="loginForm.email"
              placeholder="usuario@mail.cl"
              type="email"
              autocomplete="off"
              :state="isValidated"
              size="lg"
              required
            />
          </b-form-group>
          <!-- password -->
          <b-form-group label="Password">
            <b-form-input
              v-model="loginForm.password"
              type="password"
              size="lg"
              :state="isValidated"
              required
            />
          </b-form-group>
          <!-- button -->
          <div class="text-center mt-4">
            <b-button
              variant="primary"
              size="lg"
              type="sumbit"
              :disabled="isLoading"
              block
            >
              <span v-if="!isLoading">Ingresar</span>
              <b-spinner v-else small label="Spinning" variant="light" />
            </b-button>
          </div>
        </b-form>
      </div>

      <!-- footer -->
      <div class="authentication__form__footer">
        <p class="text-muted">PMS Soluciones v.1.1</p>
      </div>
    </div>

    <!-- image -->
    <div class="authentication__image"></div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      loginForm: {
        email: "",
        password: "",
      },
    };
  },
  // computed
  computed: {
    ...mapState("Auth", ["isLoading", "isValidated"]),
  },
  // methods
  methods: {
    ...mapActions("Auth", ["logIn"]),
    loginProcess() {
      this.logIn(this.loginForm);
    },
  },
};
</script>
