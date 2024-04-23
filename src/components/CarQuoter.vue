<template>
  <v-app>
    <v-main class="mx-auto">
      <v-container>
        <h2>Cotizador de Auto</h2>
        <base-form :valid="valid" :tabs="tabs" @back="valid = true" @next="valid = false">
          <v-window-item :value="1">
            <client-form @submit="submitClient" @invalidForm="valid = false">
              <v-divider></v-divider>

              <v-row class="mt-4">
                <v-col cols="12" sm="6">
                  <v-label>Marca</v-label>
                  <v-text-field v-model="carData.brand" :rules="[requiredRule]" label="Escriba la marca del vehículo"
                    hide-details required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-label>Modelo</v-label>
                  <v-text-field v-model="carData.model" :rules="[requiredRule]" label="Escriba el modelo del vehículo"
                    hide-details required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-label>Año</v-label>
                  <v-text-field v-model="carData.year" :rules="yearRule" label="Escriba el año del vehículo"
                    type="number" hide-details required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-label>Versión</v-label>
                  <v-text-field v-model="carData.version" :rules="[requiredRule]"
                    label="Escriba la versión del vehículo" hide-details required></v-text-field>
                </v-col>
              </v-row>
            </client-form>
          </v-window-item>

          <v-window-item :value="2">
            <questions-form @submit="submitQuestions" @invalidForm="valid = false"></questions-form>
          </v-window-item>

          <v-window-item :value="3">
            <car-viewer :quotation="quotation"></car-viewer>
          </v-window-item>
        </base-form>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import BaseForm from '@/components/forms/BaseForm.vue';
import ClientForm from '@/components/forms/ClientForm.vue';
import QuestionsForm from '@/components/forms/QuestionsForm.vue';
import CarViewer from './quotations-viewers/CarViewer.vue';

export default {
  name: 'car-quoter',
  data: () => ({
    valid: false,
    selection: 'Si',

    tabs: [
      'Datos personales',
      'Preguntas finales',
      'Cotización realizada',
    ],

    client: {
      idCard: '',
      name: '',
      email: '',
      phoneNumber: '',
      birthday: null,
      occupation: '',
    },
    carData: {
      brand: '',
      model: '',
      year: '',
      version: '',
    },
    questions: [],

    requiredRule:
      value => {
        if (value) return true

        return 'Campo requerido.'
      },
    yearRule: [
      value => value ? true : 'Campo requerido.',
      value => value % 1 == 0 ? true : 'Ingrese un año válido.',
    ]
  }),

  methods: {
    submitClient(client) {
      this.client = { ...client, occupation: this.client.occupation };
      this.valid = true;
    },

    submitQuestions(questions) {
      this.questions = questions;
      this.valid = true;
    },
  },

  computed: {
    quotation() {
      return {
        client: { ...this.client, occupation: this.client.occupation },
        carData: this.carData,
        questions: this.questions,
      }
    }
  },

  components: {
    BaseForm,
    ClientForm,
    QuestionsForm,
    CarViewer,
  }
}
</script>