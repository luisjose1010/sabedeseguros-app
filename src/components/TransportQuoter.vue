<template>
  <v-app>
    <v-main class="mx-auto">
      <v-container>
        <h2>Cotizador Transporte</h2>
        <base-form :valid="valid" :tabs="tabs" @back="valid = true" @next="valid = false">
          <v-window-item :value="1">
            <company-form @submit="submitCompany" @invalidForm="valid = false"></company-form>
          </v-window-item>

          <v-window-item :value="2">
            <questions-form @submit="submitQuestions" @invalidForm="valid = false"></questions-form>
          </v-window-item>

          <v-window-item :value="3">
            <transport-viewer :quotation="quotation"></transport-viewer>
          </v-window-item>
        </base-form>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import BaseForm from '@/components/forms/BaseForm.vue';
import CompanyForm from '@/components/forms/CompanyForm.vue';
import QuestionsForm from '@/components/forms/QuestionsForm.vue';
import TransportViewer from './quotations-viewers/TransportViewer.vue';

export default {
  name: 'transport-quoter',
  data: () => ({
    valid: false,

    tabs: [
      'Datos de transporte',
      'Preguntas finales',
      'Cotización realizada',
    ],

    company: {
      name: '',
      rif: '',
      email: '',
      phoneNumber: '',
      owner: '',
    },
    questions: [],
  }),

  methods: {
    submitCompany(company) {
      this.company = company;
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
        company: this.company,
        questions: this.questions,
      };
    }
  },

  components: {
    BaseForm,
    CompanyForm,
    QuestionsForm,
    TransportViewer,
  }
}
</script>