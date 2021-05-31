<template>
  <v-container fill-height>
    <Snackbar
      :error="error"
      :myTimeout="myTimeout"
      :showSnackbar="showSnackbar"
      @close="closeSnackbar"
    />
    <v-row justify="center">
      <v-col
        cols="12"
        sm="6"
        md="5"
        lg="4"
      >
        <v-card class="elevation-3">
          <v-progress-linear
            v-show="isLoading"
            indeterminate
          />
          <v-card-title class="d-flex justify-center font-weight-regular">{{ texts.title }}</v-card-title>
          <v-card-subtitle class="d-flex justify-center">Bem-vindo à vue finances</v-card-subtitle>
          <v-card-text>
            <v-form class="mt-8 mb-12">
              <v-text-field
                v-if="!isLogin"
                name="name"
                label="Nome"
                type="text"
                color="orange"
                :append-outer-icon="!$v.user.name.$invalid ? 'check' : ''"
                :error-messages="nameErrors"
                :success="!$v.user.name.$invalid"
                v-model.trim="$v.user.name.$model"
                outlined
                dense
              />
              <v-text-field
                name="email"
                label="Email"
                type="email"
                color="orange"
                :append-outer-icon="!$v.user.email.$invalid ? 'check' : ''"
                :error-messages="emailErrors"
                :success="!$v.user.email.$invalid"
                v-model.trim="$v.user.email.$model"
                outlined
                dense
              />
              <v-text-field
                name="password"
                label="Senha"
                type="password"
                color="orange"
                :append-outer-icon="!$v.user.password.$invalid ? 'check' : ''"
                :error-messages="passwordErrors"
                :success="!$v.user.password.$invalid"
                v-model.trim="$v.user.password.$model"
                outlined
                dense
              />
            </v-form>
            <v-card-actions>
              <v-btn
                v-bind="attrsBtn"
                @click="submit"
                :disabled="!!isLoading"
              >
                {{ texts.button }}
              </v-btn>
            </v-card-actions>
            <p class="d-flex justify-center font-weight-regular">
              {{texts.ask}}
              <a
                :class="$style.link"
                @click="isLogin = !isLogin"
              >
                {{ texts.textLink }}
              </a>
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
import AuthService from './../services/auth-services'

import Snackbar from '../../../components/Snackbar'
import { formatError } from '@/utils'

export default {
  name: 'Login',
  components: { Snackbar },
  data: () => {
    return {
      isLogin: true,
      isLoading: false,
      error: undefined,
      showSnackbar: false,
      myTimeout: '3000',
      attrsBtn: {
        color: '#f6cb27',
        class: 'black--text font-weight-regular',
        block: true
      },
      user: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  validations () {
    const validations = {
      user: {
        email: {
          required,
          email
        },
        password: {
          required,
          minLength: minLength(6)
        }
      }
    }

    if (this.isLogin) { return validations }

    return {
      user: {
        ...validations.user,
        name: {
          required,
          minLength: minLength(5)
        }
      }
    }
  },
  computed: {
    texts () {
      return this.isLogin
        ? { title: 'Login de usuário', button: 'Login', ask: 'Registre-se gratuitamente', textLink: 'Registrar' }
        : { title: 'Criar uma conta gratuita', button: 'Criar conta', ask: 'Já possui conta?', textLink: 'Entrar' }
    },
    emailErrors () {
      const errors = []
      const email = this.$v.user.email
      if (!email.$dirty) { return errors }
      !email.required && errors.push('Este campo é obrigatório!')
      !email.email && errors.push('Insira um email válido!')
      return errors
    },
    nameErrors () {
      const errors = []
      const name = this.$v.user.name
      if (!name.$dirty) { return errors }
      !name.required && errors.push('Este campo é obrigatório!')
      !name.minLength && errors.push(`Insira pelo menos ${name.$params.minLength.min} caracteres!`)
      return errors
    },
    passwordErrors () {
      const errors = []
      const password = this.$v.user.password
      if (!password.$dirty) { return errors }
      !password.required && errors.push('Este campo é obrigatório!')
      !password.minLength && errors.push(`Insira pelo menos ${password.$params.minLength.min} caracteres!`)
      return errors
    }
  },
  methods: {
    async submit () {
      if (!this.$v.user.$invalid) {
        this.isLoading = true
        try {
          this.isLogin
            ? await AuthService.login(this.user)
            : await AuthService.signup(this.user)
          this.$router.push(this.$route.query.redirect || '/dashboard')
        } catch (err) {
          this.error = formatError(err.message)
          this.showSnackbar = true
          setTimeout(() => { this.showSnackbar = false }, 4000)
        } finally {
          this.isLoading = false
        }
      }
    },
    closeSnackbar () {
      this.showSnackbar = false
    }
  }
}
</script>

<style module>
.link {
  color: orange !important;
  margin-left: 3px;
}
</style>
