<template>
  <v-container>
    <h3>Datos de la fianza</h3>
    <v-row class="mt-1 mb-3">
      <v-col cols="12">
        <v-label>Tipo de fianza</v-label>
        <v-select v-model="quotation.suretyData.type" readonly></v-select>
      </v-col>

      <v-col cols="12" md="6">
        <v-label>Nombre y apellido</v-label>
        <v-text-field v-model="quotation.suretyData.name" readonly></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-label>Nombre de empresa</v-label>
        <v-text-field v-model="quotation.suretyData.companyName" readonly></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-label>Correo electrónico</v-label>
        <v-text-field v-model="quotation.suretyData.email" readonly></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-label>Número telefónico</v-label>
        <v-text-field v-model="quotation.suretyData.phoneNumber" readonly></v-text-field>
      </v-col>
    </v-row>

    <v-row class="d-print-none">
      <v-col>
        <a href="/citas"><v-btn color="primary" class="float-right mx-2">Agendar Cita</v-btn></a>
        <v-btn @click="printDownload" color="success" class="float-right mx-2">Descargar</v-btn>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" width="auto">
      <v-card max-width="600" prepend-icon="mdi-email" :text="dialogMessage" :title="dialogTitle">
        <template v-slot:actions>
          <v-btn class="ms-auto" text="Aceptar" @click="dialog = false"></v-btn>
        </template>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import api from '@/api';

export default {
  name: 'surety-viewer',

  data: () => ({
    valid: false,
    dialog: false,
    dialogTitle: '',
    dialogMessage: '',
  }),

  props: {
    quotation: Object,
  },

  methods: {
    printDownload() {
      window.print()
    }
  },

  mounted() {
    api.post('/surety', this.quotation)
      .then((response) => {
        if (response.data) {
          this.dialogTitle = 'Correo electrónico enviado';
          this.dialogMessage = 'En breve un asesor se pondrá en contacto con usted.';
          this.dialog = true;
        } else {
          this.dialogTitle = 'Error';
          this.dialogMessage = 'Ha ocurrido un error al enviar el correo de la cotización.';
          this.dialog = true;
        }
      })
      .catch(() => {
        this.dialogTitle = 'Error';
        this.dialogMessage = 'Ha ocurrido un error enviando la cotización.';
        this.dialog = true;
      });
  }
}
</script>

<style scoped></style>