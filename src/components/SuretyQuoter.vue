<template>
  <v-app>
    <v-main class="mx-auto">
      <v-container>
        <h2>Cotizador Fianzas</h2>
        <base-form :valid="valid" :tabs="tabs" @back="valid = true" @next="valid = false">
          <v-window-item :value="1">
            <surety-form @submit="submitSurety" @invalidForm="valid = false"></surety-form>
          </v-window-item>

          <v-window-item :value="2">
            <surety-viewer :quotation="quotation"></surety-viewer>
          </v-window-item>
        </base-form>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import BaseForm from '@/components/forms/BaseForm.vue';
import SuretyForm from '@/components/forms/SuretyForm.vue'
import SuretyViewer from '@/components/quotations-viewers/SuretyViewer.vue'

export default {
  name: 'surety-quoter',
  data: () => ({
    valid: false,

    tabs: [
      'Datos de la fianza',
      'Cotización realizada',
    ],

    suretyData: {
      name: '',
      companyName: '',
      email: '',
      phoneNumber: '',
      type: '',
    },
  }),

  methods: {
    submitSurety(suretyData) {
      this.suretyData = suretyData;
      this.valid = true;
    },
  },

  computed: {
    quotation() {
      return {
        suretyData: this.suretyData,
      };
    }
  },

  components: {
    BaseForm,
    SuretyForm,
    SuretyViewer,
  }
}
</script>