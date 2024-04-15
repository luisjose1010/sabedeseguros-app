<template>
  <v-container>
    <v-row class="my-3">
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
        <v-label>Compañía</v-label>
        <v-select v-model="quotation.healthData.company" readonly></v-select>
      </v-col>

      <v-col cols="12" sm="6">
        <v-label>Suma asegurada</v-label>
        <v-select v-model="quotation.healthData.insuredSum" readonly></v-select>
      </v-col>
      <v-col cols="12" sm="6">
        <v-label>Tipo</v-label>
        <v-select v-model="quotation.healthData.type" readonly></v-select>
      </v-col>

      <v-col cols="12" sm="6">
        <v-label>Modo de pago</v-label>
        <v-select v-model="quotation.healthData.mode" readonly></v-select>
      </v-col>
      <v-col cols="12" sm="6">
        <v-label>Monto total</v-label>
        <br>
        <v-chip variant="outlined" size="large">
          <p>
            <b>Total:</b>
            ${{ quotation.healthData.total }}
          </p>
        </v-chip>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <v-row class="mt-2">
      <v-col>
        <b>Beneficiarios:</b>
        <v-expansion-panels v-model="extendedBeneficiaries" multiple class="my-2">
          <v-expansion-panel v-for="(beneficiary, index) in quotation.healthData.beneficiaries" :value="index"
            :key="index" :title="`Beneficiario ${index + 1}`">
            <v-expansion-panel-text>
              <p>
                <b>Edad:</b>
                {{ beneficiary.age }}
              </p>
              <p>
                <b>Parentesco:</b>
                {{ beneficiary.relationship }}
              </p>
              <p>
                <b>Prima:</b>
                ${{ beneficiary.amount }}
              </p>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>

    <v-divider></v-divider>

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
        <v-btn @click="printDownload" color="success" class="float-right">Descargar</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'health-viewer',

  data: () => ({
    valid: false,
    extendedBeneficiaries: [],
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
    this.extendedBeneficiaries = Object.keys(this.quotation.healthData.beneficiaries)
  }
}
</script>

<style scoped></style>