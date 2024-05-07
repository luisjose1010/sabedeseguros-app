<template>
  <v-container>
    <v-form v-model="valid">
      <v-row>
        <v-col cols="12" sm="6">
          <v-label>Tipo de mascota</v-label>
          <p class="mt-1">
            <v-btn-toggle v-model="petData.type" mandatory shaped color="blue-darken-3">
              <v-btn value="Canina">
                Canina
              </v-btn>
              <v-btn value="Felina">
                Felina
              </v-btn>
            </v-btn-toggle>
          </p>
        </v-col>
        <v-col cols="12" md="6">
          <v-label>Raza</v-label>
          <v-text-field v-model="petData.breed" :rules="[requiredRule]" label="Ingrese la raza de la mascota"
            placeholder="" required></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-label>Fecha de nacimiento</v-label>
          <v-text-field @click="datePicker = !datePicker" :rules="[birthdayRule]" append-inner-icon="mdi-calendar-edit"
            :model-value="petData.birthday ? adapter.format(petData.birthday, 'fullDateWithWeekday') : 'Seleccionar fecha'"
            readonly>
          </v-text-field>
        </v-col>
        <v-col cols="12">
          <v-expand-transition>
            <v-date-picker v-if="datePicker" v-model="petData.birthday" :max="new Date(Date.now())" view-mode="year"
              color="primary" @update:modelValue="datePicker = false" aria-label="Seleccionar fecha"></v-date-picker>
          </v-expand-transition>
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

    petData: {
      type: 'Canina',
      breed: '',
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
    valid(newValid) {
      this.submitForm(newValid, this.petData);
    },
  }
}
</script>

<style scoped>
.absolute {
  position: relative;
}
</style>
