<template>
  <v-app>
    <v-main class="mx-auto">
      <v-container>
        <h2>Cotizador Patrimoniales</h2>
        <base-form :valid="valid" :tabs="tabs" @back="valid = true" @next="valid = false">
          <v-window-item :value="1">
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-label>Elige una opción</v-label>
                  <p class="mt-1">
                    <v-btn-toggle v-model="patrimonialData.type" mandatory shaped color="blue-darken-3">
                      <v-btn value="Empresa">
                        Empresa
                      </v-btn>
                      <v-btn value="Hogar">
                        Hogar
                      </v-btn>
                    </v-btn-toggle>
                  </p>
                </v-col>
              </v-row>

              <br>
              <h3>Formulario de {{ patrimonialData.type }}</h3>
              <v-row class="mt-1">
                <company-form v-if="patrimonialData.type === 'Empresa'" @submit="submitCompany"
                  @invalidForm="valid = false"></company-form>

                <client-form v-if="patrimonialData.type === 'Hogar'" @submit="submitClient"
                  @invalidForm="valid = false"></client-form>
              </v-row>
            </v-container>
          </v-window-item>

          <v-window-item :value="2">
            <questions-form @submit="submitQuestions" @invalidForm="valid = false"></questions-form>
          </v-window-item>

          <v-window-item :value="3">
            <patrimonial-viewer :quotation="quotation"></patrimonial-viewer>
          </v-window-item>
        </base-form>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import BaseForm from '@/components/forms/BaseForm.vue';
import CompanyForm from '@/components/forms/CompanyForm.vue';
import ClientForm from '@/components/forms/ClientForm.vue';
import QuestionsForm from '@/components/forms/QuestionsForm.vue';
import PatrimonialViewer from './quotations-viewers/PatrimonialViewer.vue';

export default {
  name: 'patrimonial-quoter',
  data: () => ({
    valid: false,

    tabs: [
      'Datos del formulario',
      'Preguntas finales',
      'Cotización realizada',
    ],

    patrimonialData: {
      type: 'Empresa',
    },
    client: {
      idCard: '',
      name: '',
      email: '',
      phoneNumber: '',
      birthday: null,
    },
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
      let quotation = {
        patrimonialData: this.patrimonialData,
        questions: this.questions,
      }
      if (this.patrimonialData.type === 'Empresa') {
        quotation.company = this.company;
      } else {
        quotation.client = this.client;
      }
      return quotation;
    }
  },

  components: {
    BaseForm,
    CompanyForm,
    ClientForm,
    QuestionsForm,
    PatrimonialViewer,
  }
}
</script>