<template>
  <v-app>
    <v-main class="mx-auto">
      <v-container>
        <h2>Cotizador de Accidentes Personales</h2>
        <base-form :valid="valid" :tabs="tabs" @back="valid = true" @next="valid = false">
          <v-window-item :value="1">
            <client-form @submit="submitClient" @invalidForm="valid = false">
              <v-row>
                <v-col>
                  <v-label>Ocupación</v-label>
                  <v-text-field v-model="client.occupation" :rules="[requiredRule]" label="Escriba su ocupación"
                    hide-details required></v-text-field>
                </v-col>
                <v-col>
                  <br>
                  <v-btn-toggle v-model="accidentsData.type" mandatory shaped color="blue-darken-3">
                    <v-btn value="Individual">
                      Individual
                    </v-btn>
                    <v-btn value="Colectivo">
                      Colectivo
                    </v-btn>
                  </v-btn-toggle>
                </v-col>
              </v-row>
            </client-form>
          </v-window-item>

          <v-window-item :value="2">
            <questions-form @submit="submitQuestions" @invalidForm="valid = false"></questions-form>
          </v-window-item>

          <v-window-item :value="3">
            <accidents-viewer :quotation="quotation"></accidents-viewer>
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
import AccidentsViewer from '@/components/quotations-viewers/AccidentsViewer.vue';

export default {
  name: 'accident-quoter',
  data: () => ({
    valid: false,

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
    accidentsData: {
      type: 'Individual',
    },
    questions: [],

    requiredRule:
      value => {
        if (value) return true

        return 'Campo requerido.'
      },
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
        accidentsData: this.accidentsData,
        questions: this.questions,
      }
    }
  },

  components: {
    BaseForm,
    ClientForm,
    QuestionsForm,
    AccidentsViewer,
  }
}
</script>