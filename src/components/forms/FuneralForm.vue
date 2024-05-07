<template>
  <v-form v-model="valid" id="form">
    <v-container>
      <h3>Tipo de cotización</h3>
      <v-row class="mt-1 mb-3">
        <v-col cols="12" md="6">
          <v-btn-toggle v-model="funeralData.type" mandatory color="blue-darken-3">
            <v-btn value="Individual">
              Individual
            </v-btn>
            <v-btn value="Colectivo">
              Colectivo
            </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>

      <h3 v-if="funeralData.type === 'Colectivo'">Datos de la empresa</h3>
      <v-expand-transition>
        <v-row class="mt-1 mb-3" v-if="funeralData.type === 'Colectivo'">
          <v-col cols="12" md="6">
            <v-label>Nombre de empresa</v-label>
            <v-text-field v-model="funeralData.company.name" :rules="[requiredRule]"
              label="Ingrese el nombre de la empresa" placeholder="V-000000000" hide-details required></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-label>RIF</v-label>
            <v-text-field v-model="funeralData.company.rif" :rules="[requiredRule]" label="Ingrese el RIF de la empresa"
              placeholder="V-000000000" hide-details required></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-label>Correo electrónico</v-label>
            <v-text-field v-model="funeralData.company.email" :rules="emailRules" label="Ingrese el correo electrónico"
              placeholder="ejemplo@mail.com" type="email" hide-details required></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-label>Número telefónico</v-label>
            <v-text-field v-model="funeralData.company.phoneNumber" :rules="[requiredRule]"
              label="Ingrese el número de teléfono" placeholder="+58 0123-4567890" required></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-label>Persona a cargo</v-label>
            <v-text-field v-model="funeralData.company.owner" :rules="[requiredRule]"
              label="Ingrese el encargado de la empresa" placeholder="+58 0123-4567890" required></v-text-field>
          </v-col>

          <v-divider></v-divider>
        </v-row>
      </v-expand-transition>

      <v-row class="mt-1 mb-3">
        <v-col>
          <h3>Datos del cliente:</h3>
          <span>{{ client.name }}</span>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-label>Edad</v-label>
          <v-text-field v-model="client.age" placeholder="" min="0" max="99" step="1" type="number"
            readOnly></v-text-field>
        </v-col>

        <v-divider></v-divider>
      </v-row>

      <h3>Beneficiarios (personas a incluir en la póliza):</h3>
      <v-row class="mt-2">
        <v-col>
          <v-row v-for="(item, index) in funeralData.beneficiaries">
            <v-col cols="12" md="4">
              <v-label>Nombre</v-label>
              <v-text-field v-model="item.name" label="Ingrese el nombre del beneficiario" placeholder=""
                :rules="[requiredRule]" required></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-label>Parentesco</v-label>
              <v-text-field v-model="item.relationship" label="Ingrese el parentesco del beneficiario" placeholder=""
                :rules="[requiredRule]" required></v-text-field>
            </v-col>
            <v-col cols="9" md="3">
              <v-label>Edad</v-label>
              <v-text-field v-model="item.age" label="Ingrese la edad del beneficiario" placeholder="" min="0" max="99"
                step="1" type="number" :rules="ageRule" required></v-text-field>
            </v-col>
            <v-col cols="3" md="1">
              <v-btn icon="mdi-minus" class="mx-1 ma-2" @click="popBeneficiary(index)"></v-btn>
            </v-col>
            <v-divider></v-divider>
          </v-row>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-btn icon="mdi-plus" class="mx-1 ma-2" @click="pushNewBeneficiary()"></v-btn>
      </v-card-actions>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: 'funeral-form',

  props: {
    client: Object,
  },

  data: () => ({
    valid: false,
    types: ['Individual', 'Colectivo'],

    funeralData: {
      type: 'Individual',
      company: {
        name: '',
        rif: '',
        email: '',
        phoneNumber: '',
        owner: '',
      },
      beneficiaries: [{
        name: '',
        relationship: '',
        age: '',
      }],
    },

    requiredRule:
      value => {
        if (value) return true

        return 'Campo requerido.'
      },
    ageRule: [
      value => value ? true : 'Campo requerido.',
      value => value >= 0 && value <= 100 ? true : 'La edad debe ser entre 0 y 100 años.',
      value => value % 1 == 0 ? true : 'Edad no válida.',
    ],
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
        if(this.funeralData.type === 'Colectivo') {
          this.$emit('submit', data);
        } else {
          this.$emit('submit', { ...data, company: undefined });
        }
      } else {
        this.$emit('invalidForm');
      }
    },

    pushNewBeneficiary() {
      this.funeralData.beneficiaries.push({
        name: '',
        relationship: '',
        age: '',
      });
    },
    popBeneficiary(index) {
      this.funeralData.beneficiaries = this.funeralData.beneficiaries.filter(item => item !== this.funeralData.beneficiaries[index]);
    },
  },

  watch: {
    // Valida el formulario
    valid(newValid) {
      this.submitForm(newValid, this.funeralData);
    },
    funeralData: {
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