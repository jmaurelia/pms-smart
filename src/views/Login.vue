<template>
    <div>
        <!-- form -->
        <b-form @submit.prevent="login(loginForm)">
            <b-form-group label="Usuario">
                <b-form-input v-model="loginForm.user" placeholder="usuario@mail.cl" autocomplete="off" required />
            </b-form-group>
            <b-form-group label="Password">
                <b-form-input v-model="loginForm.password" type="password" required />
            </b-form-group>
            <b-button class="mt-3" variant="primary" type="submit">Ingresar</b-button>
        </b-form>
        <!-- ./form -->
    </div>
</template>

<script>
import { auth } from '@/firebase'
import { mapActions } from "vuex"

export default {
    data() {
        return {
            loginForm: {
                user: 'usuario@bioforest.cl',
                password: 'Qwerty123'
            }
        }
    },
    methods: {
        ...mapActions('Auth', ['signIn']),
        login() {
            this.signIn(this.loginForm)
        }
    }
}
</script>