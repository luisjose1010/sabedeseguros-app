<template>
  <v-container>
    <h3>Datos del cliente</h3>
    <v-row class="mt-1 mb-3">
      <v-col cols="12" md="4">
        <v-label>Nombre y apellido</v-label>
        <v-text-field v-model="quotation.client.name" readonly></v-text-field>
      </v-col>

      <v-col cols="12" md="4">
        <v-label>Correo electrónico</v-label>
        <v-text-field v-model="quotation.client.email" readonly></v-text-field>
      </v-col>

      <v-col cols="12" md="4">
        <v-label>Cédula de identidad</v-label>
        <v-text-field v-model="quotation.client.idCard" readonly></v-text-field>
      </v-col>

      <v-col cols="12" sm="6">
        <v-label>Número telefónico</v-label>
        <v-text-field v-model="quotation.client.phoneNumber" readonly></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-label>Edad</v-label>
        <v-select v-model="quotation.client.age" readonly></v-select>
      </v-col>

      <v-divider></v-divider>
    </v-row>

    <h3 v-if="quotation.funeralData.type === 'Colectivo'">Datos de la empresa</h3>
    <v-row v-if="quotation.funeralData.type === 'Colectivo'" class="mt-1 mb-3">
      <v-col cols="12" md="6">
        <v-label>Nombre de empresa</v-label>
        <v-text-field v-model="quotation.funeralData.company.name" readonly></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-label>RIF</v-label>
        <v-text-field v-model="quotation.funeralData.company.rif" readonly></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-label>Correo electrónico</v-label>
        <v-text-field v-model="quotation.funeralData.company.email" readonly></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-label>Número telefónico</v-label>
        <v-text-field v-model="quotation.funeralData.company.phoneNumber" readonly></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-label>Persona a cargo</v-label>
        <v-text-field v-model="quotation.funeralData.company.owner" readonly></v-text-field>
      </v-col>

      <v-divider></v-divider>
    </v-row>

    <v-row class="mt-2">
      <v-col>
        <b>Beneficiarios:</b>
        <v-expansion-panels v-model="extendedBeneficiaries" multiple class="my-2">
          <v-expansion-panel v-for="(beneficiary, index) in quotation.funeralData.beneficiaries" :value="index"
            :key="index" :title="`Beneficiario ${index + 1}`">
            <v-expansion-panel-text>
              <p>
                <b>Nombre:</b>
                {{ beneficiary.name }}
              </p>
              <p>
                <b>Parentesco:</b>
                {{ beneficiary.relationship }}
              </p>
              <p>
                <b>Edad:</b>
                {{ beneficiary.age }}
              </p>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>

      <v-divider></v-divider>
    </v-row>

    <v-row class="mt-2">
      <v-col>
        <b>Preguntas:</b>
        <v-list lines="one">
          <v-list-item v-for="item in quotation.questions" prepend-icon="mdi-help-circle-outline" :key="item">
            <v-list-item-title>
              {{ item.question }}
            </v-list-item-title>
            <b>R:</b> {{ item.answer }}
          </v-list-item>
        </v-list>
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
  name: 'funeral-viewer',

  data: () => ({
    valid: false,
    extendedBeneficiaries: [],
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
    // Inicia abierto el panel extensible de beneficiarios
    this.extendedBeneficiaries = Object.keys(this.quotation.funeralData.beneficiaries)

    api.post('/funeral', this.quotation)
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