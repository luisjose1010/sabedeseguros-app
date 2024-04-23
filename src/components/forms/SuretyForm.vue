<template>
  <v-container>
    <v-form v-model="valid">
      <v-row>
        <v-col>
          <v-radio-group v-model="suretyData.type" class="mt-1">
            <template v-slot:label>
              <div><strong>Tipo de fianza</strong></div>
            </template>
            <v-radio v-for="(item, index) in types" :label="item" :value="item" :key="index"
              color="blue-darken-3"></v-radio>
          </v-radio-group>
        </v-col>

        <v-col cols="12" md="7">
          <v-label>Nombre y apellido</v-label>
          <v-text-field v-model="suretyData.name" :rules="[requiredRule]" label="Ingrese su nombre" placeholder=""
            required></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-label>Empresa</v-label>
          <v-text-field v-model="suretyData.companyName" :rules="[requiredRule]" label="Ingrese el nombre de la empresa"
            placeholder="" required></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-label>Correo electrónico</v-label>
          <v-text-field v-model="suretyData.email" :rules="emailRules" label="Ingrese el correo electrónico"
            placeholder="ejemplo@mail.com" required></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-label>Número telefónico</v-label>
          <v-text-field v-model="suretyData.phoneNumber" :rules="[requiredRule]" label="Ingrese el número telefónico"
            placeholder="+58 0123-4567890" required></v-text-field>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    types: [
      'Licitación',
      'Anticipo y su cumplimiento',
      'Importación y judicial',
      'Laboral',
    ],

    suretyData: {
      name: '',
      companyName: '',
      email: '',
      phoneNumber: '',
      type: 'Licitación',
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
      this.submitForm(newValid, this.suretyData);
    },
  }
}
</script>

<style scoped>
.absolute {
  position: relative;
}
</style>
