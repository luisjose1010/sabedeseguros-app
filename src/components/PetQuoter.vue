<template>
  <v-app>
    <v-main class="mx-auto">
      <v-container>
        <h2>Cotizador Mascotas</h2>
        <base-form :valid="valid" :tabs="tabs" @back="valid = true" @next="valid = false">
          <v-window-item :value="1">
            <pet-form @submit="submitPet" @invalidForm="valid = false"></pet-form>
          </v-window-item>

          <v-window-item :value="2">
            <pet-viewer :quotation="quotation"></pet-viewer>
          </v-window-item>
        </base-form>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import BaseForm from '@/components/forms/BaseForm.vue';
import PetForm from '@/components/forms/PetForm.vue'
import PetViewer from '@/components/quotations-viewers/PetViewer.vue'

export default {
  name: 'pet-quoter',
  data: () => ({
    valid: false,

    tabs: [
      'Datos de mascota',
      'Cotización realizada',
    ],

    petData: {
      name: '',
      type: '',
      breed: '',
      birthday: '',
      age: null,
    },

    requiredRule:
      value => {
        if (value) return true

        return 'Campo requerido.'
      },
  }),

  methods: {
    submitPet(petData) {
      this.petData = petData;
      this.valid = true;
    },
  },

  computed: {
    quotation() {
      return {
        petData: this.petData,
      };
    }
  },

  components: {
    BaseForm,
    PetForm,
    PetViewer,
  }
}
</script>