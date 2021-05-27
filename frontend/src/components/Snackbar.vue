<template>
  <v-snackbar
    class="orange--text"
    v-model="showSnackbar"
    top
  >
    <v-row
      class="d-flex justify-space-between pa-2"
      align="center"
    >
      <div>{{ error }}</div>
      <v-btn
        class="ml-12"
        @click="close()"
      >
        Fechar
      </v-btn>
    </v-row>
  </v-snackbar>
</template>

<script>
export default {
  props: ['error', 'showSnackbar'],
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>
