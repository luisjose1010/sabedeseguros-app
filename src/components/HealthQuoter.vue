<template>
  <v-app>
    <v-main class="mx-auto">
      <v-container>
        <h2>Cotizador Salud</h2>
        <base-form :valid="valid" :tabs="tabs">
          <v-window-item :value="1">
            <client-form @submit="submitClient"></client-form>
          </v-window-item>

          <v-window-item :value="2">
            <health-form :client="quotation.client" @submit="submitHealth"></health-form>
          </v-window-item>

          <v-window-item :value="3">
            <questions-form @submit="submitQuestions"></questions-form>
          </v-window-item>

          <v-window-item :value="4">
            <health-viewer :quotation="quotation"></health-viewer>
          </v-window-item>
        </base-form>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import BaseForm from '@/components/forms/BaseForm.vue';
import ClientForm from '@/components/forms/ClientForm.vue';
import HealthForm from '@/components/forms/HealthForm.vue';
import QuestionsForm from '@/components/forms/QuestionsForm.vue';
import HealthViewer from '@/components/quotations-viewers/HealthViewer.vue';

export default {
  name: 'health-quoter',
  data: () => ({
    valid: false,

    tabs: [
      'Datos personales',
      'Selección de Seguro',
      'Preguntas finales',
      'Cotización realizada',
    ],

    client: {
      idCard: '',
      name: '',
      email: '',
      phoneNumber: '',
      birthday: null,
    },
    healthData: {
      beneficiaries: [],
      total: 0,
    },
    questions: [],
  }),

  methods: {
    submitClient(client) {
      this.client = client;
      this.valid = true;
    },

    submitHealth(healthData) {
      this.healthData = healthData;
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
        client: this.client,
        healthData: this.healthData,
        questions: this.questions,
      }
    }
  },

  components: {
    BaseForm,
    ClientForm,
    HealthForm,
    QuestionsForm,
    HealthViewer,
  }
}
</script>