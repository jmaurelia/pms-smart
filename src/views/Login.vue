<template>
  <div class="page-wrapper page-login">
    <!-- header -->
    <div class="page-header">
      <div class="brand">
        <img src="https://www.ubiobio.cl/w/img/isoc.png" alt="UBB" />
      </div>
    </div>

    <!-- content -->
    <div class="page-content">
      <div class="page-login-form">
        <!-- header -->
        <div class="login-form-header">
          <h2 class="mb-0 header-title">Bienvenidos</h2>
          <p class="mb-0 text-muted">Ingresa con tu cuenta</p>
        </div>
        <!-- Form -->
        <b-form class="mt-4" @submit.prevent="loginProcess(loginForm)">
          <!-- user -->
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
              variant="dark"
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
    </div>

    <!-- footer -->
    <div class="page-footer">
      <span class="text-secondary">v1.2 © PM Soluciones.</span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      loginForm: {
        email: "joaquin.maurelia@gmail.com",
        password: "Pms2020",
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

<style lang="scss" scoped>
.page-login {
  // Header
  .page-header {
    display: flex;
    align-items: center;

    .brand {
      img {
        height: 80px;
      }
      svg {
        fill: black;
        width: auto;
        height: 55px;
      }
    }
  }

  // Content
  .page-content {
    display: flex;
    align-items: center;
  }

  // Form
  &-form {
    width: 100%;

    // header
    .login-form-header {
      line-height: 1.2;
    }
  }

  //   @landscape
  @media (orientation: landscape) {
    flex-direction: row;

    //   header
    .page-header {
      width: 40%;
      justify-content: center;
    }

    // content
    .page-content {
      justify-content: center;

      .page-login-form {
        max-width: 400px;
      }
    }

    // footer
    .page-footer {
      display: none;
    }
  }
}
</style>
