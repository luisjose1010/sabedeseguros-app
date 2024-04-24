<template>
  <v-container>
    <h3>Datos de mascota</h3>
    <v-row class="mt-1 mb-3">
      <v-col cols="12">
        <v-label>Nombre del solicitante</v-label>
        <v-text-field v-model="quotation.petData.name" readonly></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-label>Tipo de mascota</v-label>
        <v-text-field v-model="quotation.petData.type" readonly></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-label>Raza</v-label>
        <v-text-field v-model="quotation.petData.breed" readonly></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-label>Fecha de nacimiento</v-label>
        <v-text-field :model-value="adapter.format(quotation.petData.birthday, 'fullDateWithWeekday')" readonly></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-label>Edad</v-label>
        <v-text-field v-model="quotation.petData.age" readonly></v-text-field>
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
import { useDate } from 'vuetify';

export default {
  name: 'pet-viewer',

  data: () => ({
    valid: false,
    adapter: useDate(),
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
    const quotation = this.quotation;
    quotation.petData.birthday = this.adapter.format(quotation.petData.birthday, 'fullDateWithWeekday');

    api.post('/pet', quotation)
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