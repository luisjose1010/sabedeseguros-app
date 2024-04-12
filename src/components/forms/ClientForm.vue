<template>
  <v-container>
    <v-form v-model="valid" id="form">
      <v-row>
        <v-col cols="12" md="4">
          <v-label>Nombre y apellido</v-label>
          <v-text-field v-model="client.name" :rules="[requiredRule]" label="Escriba su nombre" hide-details
            required></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-label>Número telefónico</v-label>
          <v-text-field v-model="client.phoneNumber" :rules="[requiredRule]" label="Ingrese su número de teléfono"
            placeholder="+58 0123-4567890" required></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-label>Cédula de identidad</v-label>
          <v-text-field v-model="client.idCard" :rules="[requiredRule]" label="Ingrese su cédula"
            placeholder="V-000000000" hide-details required></v-text-field>
        </v-col>

      </v-row>
      <v-row id="fecha">
        <v-col>
          <v-label>Fecha de nacimiento</v-label>
          <v-input @click="datePicker = !datePicker">
              {{ client.birthday ? adapter.format(client.birthday, 'fullDateWithWeekday') : 'Seleccionar fecha' }}
              <a href="#fecha"><v-icon icon="mdi-calendar-edit" color="black" class="mx-2"></v-icon></a>
            </v-input>
          <v-expand-transition>
            <v-date-picker v-if="datePicker" v-model="client.birthday" :max="new Date(Date.now())" view-mode="year"
              color="primary" @update:modelValue="datePicker = false" aria-label="Seleccionar fecha"></v-date-picker>
          </v-expand-transition>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-label>Correo electrónico</v-label>
          <v-text-field v-model="client.email" :rules="emailRules" label="Correo electrónico"
            placeholder="ejemplo@mail.com" type="email" hide-details required></v-text-field>
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
    }
  },

  computed: {
    clientBirthday() {
      return this.client.birthday
    },
  },

  watch: {
    // Valida tanto el formulario, como la entrada del birthday
    valid(newValid) {
      if (newValid && this.clientBirthday) {
        this.client.age = this.getAge(this.client.birthday);
        this.$emit('submit', this.client);
      }
    },
    clientBirthday(newClientBirthday) {
      if (this.valid && newClientBirthday) {
        this.client.age = this.getAge(this.client.birthday);
        this.$emit('submit', this.client);
      }
    },
  }
}
</script>

<style scoped>
.absolute {
  position: relative;
}
</style>
