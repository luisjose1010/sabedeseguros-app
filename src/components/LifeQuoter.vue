<template>
  <v-app>
    <v-main class="mx-auto">
      <v-container>
        <h2>Cotizador Vida</h2>
        <base-form :valid="valid" :tabs="tabs" @back="valid = true" @next="valid = false">
          <v-window-item :value="1">
            <client-form @submit="submitClient" @invalidForm="valid = false">
              <v-divider></v-divider>

              <v-row class="mt-4">
                <v-col cols="12">
                  <v-label>Fumador</v-label>
                  <p class="mt-1">
                    <v-btn-toggle v-model="lifeData.smoker" mandatory shaped color="blue-darken-3">
                      <v-btn value="Si">
                        Si
                      </v-btn>
                      <v-btn value="No">
                        No
                      </v-btn>
                    </v-btn-toggle>
                  </p>
                </v-col>
                <v-col cols="12">
                  <v-label>¿Tienes alguna modalidad en mente?</v-label>
                  <p class="mt-1">
                    <v-btn-toggle v-model="lifeData.modality" mandatory shaped color="blue-darken-3">
                      <v-btn value="Temporal">
                        Temporal
                      </v-btn>
                      <v-btn value="Otro">
                        Otro
                      </v-btn>
                      <v-btn value="No tengo">
                        No tengo
                      </v-btn>
                    </v-btn-toggle>
                  </p>
                </v-col>
                <v-col v-if="lifeData.modality !== 'Temporal' && lifeData.modality !== 'No tengo'" cols="12">
                  <v-text-field v-model="lifeData.modality" :rules="[requiredRule]"
                    label="Escribe la modalidad de tu preferencia" hide-details required></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-label>¿Tienes alguna suma asegurada en mente?</v-label>
                  <p class="mt-1">
                    <v-btn-toggle v-model="selection" mandatory shaped color="blue-darken-3">
                      <v-btn value="Si">
                        Si
                      </v-btn>
                      <v-btn value="No">
                        No
                      </v-btn>
                    </v-btn-toggle>
                  </p>
                </v-col>
                <v-col v-if="selection === 'Si'" cols="12">
                  <v-text-field v-model="lifeData.insuredSum" :rules="[requiredRule]" label="Suma asegurada"
                    hide-details required></v-text-field>
                </v-col>
              </v-row>
            </client-form>
          </v-window-item>

          <v-window-item :value="2">
            <questions-form @submit="submitQuestions" @invalidForm="valid = false"></questions-form>
          </v-window-item>

          <v-window-item :value="3">
            <life-viewer :quotation="quotation"></life-viewer>
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
import LifeViewer from './quotations-viewers/LifeViewer.vue';

export default {
  name: 'life-quoter',
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
    },
    lifeData: {
      smoker: 'No',
      modality: 'Temporal',
      insuredSum: '',
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
      this.client = client;
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
        lifeData: this.lifeData,
        questions: this.questions,
      }
    }
  },

  watch: {
    selection(newValue) {
      if(newValue === 'Si') {
        this.lifeData.insuredSum = '';
      } else {
        this.lifeData.insuredSum = 'No';
      }
    },
  },

  components: {
    BaseForm,
    ClientForm,
    QuestionsForm,
    LifeViewer,
  }
}
</script>