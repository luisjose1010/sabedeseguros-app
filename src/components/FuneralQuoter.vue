<template>
  <v-app>
    <v-main class="mx-auto">
      <v-container>
        <h2>Cotizador de Funerario</h2>
        <base-form :valid="valid" :tabs="tabs" @back="valid = true" @next="valid = false">
          <v-window-item :value="1">
            <client-form @submit="submitClient" @invalidForm="valid = false"></client-form>
          </v-window-item>

          <v-window-item :value="2">
            <funeral-form :client="quotation.client" @submit="submitFuneral" @invalidForm="valid = false"></funeral-form>
          </v-window-item>

          <v-window-item :value="3">
            <questions-form @submit="submitQuestions" @invalidForm="valid = false"></questions-form>
          </v-window-item>

          <v-window-item :value="4">
            <funeral-viewer :quotation="quotation"></funeral-viewer>
          </v-window-item>
        </base-form>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import BaseForm from '@/components/forms/BaseForm.vue';
import ClientForm from '@/components/forms/ClientForm.vue';
import FuneralForm from '@/components/forms/FuneralForm.vue';
import QuestionsForm from '@/components/forms/QuestionsForm.vue';
import FuneralViewer from '@/components/quotations-viewers/FuneralViewer.vue';

export default {
  name: 'funeral-quoter',
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
    funeralData: {},
    questions: [],
  }),

  methods: {
    submitClient(client) {
      this.client = client;
      this.valid = true;
    },

    submitFuneral(funeralData) {
      this.funeralData = funeralData;
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
        funeralData: this.funeralData,
        questions: this.questions,
      }
    }
  },

  components: {
    BaseForm,
    ClientForm,
    FuneralForm,
    QuestionsForm,
    FuneralViewer,
  }
}
</script>