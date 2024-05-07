<template>
  <v-container>
    <v-form v-model="valid" id="form">
      <v-row>
        <v-col cols="12">
          <v-label>Nombre y apellido</v-label>
          <v-text-field v-model="client.name" :rules="[requiredRule]" label="Escriba su nombre" hide-details
            required></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-label>Número telefónico</v-label>
          <v-text-field v-model="client.phoneNumber" :rules="[requiredRule]" label="Ingrese su número de teléfono"
            placeholder="+58 0123-4567890" required></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-label>Cédula de identidad</v-label>
          <v-text-field v-model="client.idCard" :rules="[requiredRule]" label="Ingrese su cédula"
            placeholder="V-000000000" hide-details required></v-text-field>
        </v-col>
      </v-row>
      <v-row id="fecha">
        <v-col cols="12" md="5">
          <v-label>Fecha de nacimiento</v-label>
          <v-text-field @click="datePicker = !datePicker" :rules="[birthdayRule]" append-inner-icon="mdi-calendar-edit"
            :model-value="client.birthday ? adapter.format(client.birthday, 'fullDateWithWeekday') : 'Seleccionar fecha'"
            readonly>
          </v-text-field>
        </v-col>

        <v-col cols="12" md="7">
          <v-label>Correo electrónico</v-label>
          <v-text-field v-model="client.email" :rules="emailRules" label="Correo electrónico"
            placeholder="ejemplo@mail.com" type="email" hide-details required></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-expand-transition>
            <v-date-picker v-if="datePicker" v-model="client.birthday" :max="new Date(Date.now())" view-mode="year"
              color="primary" @update:modelValue="datePicker = false" aria-label="Seleccionar fecha"></v-date-picker>
          </v-expand-transition>
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

    client: {
      idCard: '',
      name: '',
      email: '',
      phoneNumber: '',
      age: null,
      birthday: null,
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
    getAge(dateString) {
      var birthday = +new Date(dateString);
      return ~~((Date.now() - birthday) / (31557600000));
    },

    submitForm(valid, data) {
      if (valid) {
        data.age = this.getAge(data.birthday);
        this.$emit('submit', data);
      } else {
        this.$emit('invalidForm');
      }
    }
  },

  watch: {
    // Valida el formulario
    valid(newValid) {
      this.submitForm(newValid, this.client);
    },
    healthData: {
      handler(newData) {
        this.submitForm(this.valid, newData);
      },
      deep: true,
    },
  }
}
</script>

<style scoped>
.absolute {
  position: relative;
}
</style>
