<template>
  <v-container>
    <v-form v-model="valid" id="form">
      <v-row>
        <v-col cols="12" md="6">
          <v-label>Nombre de empresa</v-label>
          <v-text-field v-model="company.name" :rules="[requiredRule]" label="Ingrese el nombre de la empresa"
            placeholder="V-000000000" hide-details required></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-label>RIF</v-label>
          <v-text-field v-model="company.rif" :rules="[requiredRule]" label="Ingrese el RIF de la empresa"
            placeholder="V-000000000" hide-details required></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-label>Correo electrónico</v-label>
          <v-text-field v-model="company.email" :rules="emailRules" label="Ingrese el correo electrónico"
            placeholder="ejemplo@mail.com" type="email" hide-details required></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-label>Número telefónico</v-label>
          <v-text-field v-model="company.phoneNumber" :rules="[requiredRule]" label="Ingrese el número de teléfono"
            placeholder="+58 0123-4567890" required></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-label>Persona a cargo</v-label>
          <v-text-field v-model="company.owner" :rules="[requiredRule]" label="Ingrese el encargado de la empresa"
            placeholder="+58 0123-4567890" required></v-text-field>
        </v-col>
      </v-row>

      <slot></slot>
    </v-form>
  </v-container>
</template>

<script>
import { useDate } from 'vuetify'

export default {
  data: () => ({
    valid: false,
    adapter: useDate(),
    datePicker: false,

    company: {
      name: '',
      rif: '',
      email: '',
      phoneNumber: '',
      owner: '',
    },

    requiredRule:
      value => {
        if (value) return true

        return 'Campo requerido.'
      },
    birthdayRule:
      value => {
        if (value !== 'Seleccionar fecha') return true

        return 'Campo requerido.'
      },
    emailRules: [
      value => {
        if (value) return true

        return 'Campo requerido.'
      },
      value => {
        if (/.+@.+\..+/.test(value)) return true

        return 'Dirección de correo inválida.'
      },
    ],
  }),

  methods: {
    submitForm(valid, data) {
      if (valid) {
        this.$emit('submit', data);
      } else {
        this.$emit('invalidForm');
      }
    }
  },

  watch: {
    valid(newValid) {
      this.submitForm(newValid, this.company);
    },
  }
}
</script>

<style scoped>
.absolute {
  position: relative;
}
</style>
