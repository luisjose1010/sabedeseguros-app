<template>
  <v-container>
    <v-form v-model="valid">
      <v-row>
        <v-col cols="12" md="4">
          <v-label>Nombre y apellido</v-label>
          <v-text-field v-model="client.name" :counter="10" :rules="nameRules" label="Escriba su nombre" hide-details
            required></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-label>Correo electrónico</v-label>
          <v-text-field v-model="client.email" :rules="emailRules" label="Email" placeholder="ejemplo@mail.com"
            type="email" hide-details required></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-label>Cédula de identidad</v-label>
          <v-text-field v-model="client.idCard" label="Ingrese su cédula" placeholder="V-000000000" hide-details
            required></v-text-field>
        </v-col>

      </v-row>
      <v-row>
        <v-col>
          <v-label>Fecha de nacimiento</v-label>
          <v-input>
            {{ client.birthday ? adapter.format(client.birthday, 'fullDateWithWeekday') : 'Seleccionar fecha' }}
            <v-icon icon="mdi-calendar-edit" class="mx-2" @click="datePicker = !datePicker"></v-icon>
            <v-date-picker v-if="datePicker" v-model="client.birthday" :max="new Date(Date.now())" view-mode="year"
              color="primary" @update:modelValue="datePicker = false"></v-date-picker>
          </v-input>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-label>Número telefónico</v-label>
          <v-text-field v-model="client.phoneNumber" label="Ingrese su número de teléfono"
            placeholder="+58 0123-4567890" required></v-text-field>
        </v-col>
      </v-row>
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
    beneficiaries: [],

    client: {
      idCard: '',
      name: '',
      email: '',
      phoneNumber: '',
      age: null,
      birthday: null,
    },

    nameRules: [
      value => {
        if (value) return true

        return 'Name is required.'
      },
    ],
    emailRules: [
      value => {
        if (value) return true

        return 'E-mail is required.'
      },
      value => {
        if (/.+@.+\..+/.test(value)) return true

        return 'E-mail must be valid.'
      },
    ],
  }),

  methods: {
    getAge(dateString) {
      var birthday = +new Date(dateString);
      return ~~((Date.now() - birthday) / (31557600000));
    }
  },

  watch: {
    valid(newValid) {
      if (newValid) {
        this.client.age = this.getAge(this.client.birthday);
        this.$emit('submit', this.client);
      }
    }
  }
}
</script>

<style scoped>
.absolute {
  position: relative;
}
</style>
