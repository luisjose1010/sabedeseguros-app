<template>
  <v-app>
    <v-main class="mx-auto">
      <v-container>
        <h2>Cotizador Mascotas</h2>
        <base-form :valid="valid" :tabs="tabs" @back="valid = true" @next="valid = false">
          <v-window-item :value="1">
            <client-form @submit="submitClient" @invalidForm="valid = false"></client-form>
          </v-window-item>

          <v-window-item :value="2">
            <pet-form @submit="submitPet" @invalidForm="valid = false"></pet-form>
          </v-window-item>

          <v-window-item :value="3">
            <questions-form @submit="submitQuestions" @invalidForm="valid = false"></questions-form>
          </v-window-item>

          <v-window-item :value="4">
            <pet-viewer :quotation="quotation"></pet-viewer>
          </v-window-item>
        </base-form>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import BaseForm from '@/components/forms/BaseForm.vue';
import ClientForm from '@/components/forms/ClientForm.vue';
import PetForm from '@/components/forms/PetForm.vue'
import PetViewer from '@/components/quotations-viewers/PetViewer.vue'

export default {
  name: 'pet-quoter',
  data: () => ({
    valid: false,

    tabs: [
      'Datos de cliente',
      'Datos de mascota',
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
    petData: {
      type: '',
      breed: '',
      birthday: '',
      age: null,
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
    submitPet(petData) {
      this.petData = petData;
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
        petData: this.petData,
        questions: this.questions,
      };
    }
  },

  components: {
    BaseForm,
    ClientForm,
    PetForm,
    PetViewer,
  }
}
</script>