<template>
  <v-form v-model="valid">
    <v-container>
      <v-item-group v-model="healthData.company">
        <v-row>
          <v-col cols="12" md="4">
            <v-item value="SEGUROS MERCANTIL" v-slot="{ isSelected, toggle }">
              <v-img :width="355" aspect-ratio="16/9" cover src="@/assets/mercantil-seguros.png" @click="toggle"
                :class="isSelected ? 'img-selected' : ''"></v-img>
            </v-item>
          </v-col>

          <v-col cols="12" md="4">
            <v-item value="ESTAR SEGUROS" v-slot="{ isSelected, toggle }">
              <v-img :width="355" aspect-ratio="16/9" cover src="@/assets/estar-seguros.png" @click="toggle"
                :class="isSelected ? 'img-selected' : ''"></v-img>
            </v-item>
          </v-col>

          <v-col cols="12" md="4">
            <v-item value="LA INTERNACIONAL" v-slot="{ isSelected, toggle }">
              <v-img :width="250" aspect-ratio="16/9" cover src="@/assets/la-internacional.png" @click="toggle"
                :class="isSelected ? 'img-selected' : ''"></v-img>
            </v-item>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-label>Tipo</v-label>
            <v-select v-model="healthData.type" :items="types"></v-select>
          </v-col>
          <v-col>
            <v-label>Suma asegurada</v-label>
            <v-select v-model="healthData.insuredSum" :items="insuredSums"></v-select>
          </v-col>
        </v-row>
      </v-item-group>

      <v-row>
        <v-col>
          <h3>Titular:</h3>
          <span>{{ client.name }}</span>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-label>Edad</v-label>
          <v-text-field v-model="client.age" placeholder="" min="0" max="99" step="1" type="number"
            readOnly></v-text-field>
        </v-col>
        <v-col>
          <v-label>Prima</v-label>
          <p><b>{{ 'Prueba' }}</b></p>
        </v-col>
      </v-row>


      <h3 class="mt-2">Beneficiarios:</h3>
      <br>
      <v-row>
        <v-col>
          <v-row v-for="(item, index) in healthData.beneficiaries">
            <v-col xs="12" md="5">
              <v-label>Edad</v-label>
              <v-text-field v-model="item.age" label="Ingrese la edad del beneficiario" placeholder="" min="0" max="99"
                step="1" type="number" :rules="[requiredRule]" required></v-text-field>
            </v-col>
            <v-col xs="10" md="4">
              <v-label>Parentesco</v-label>
              <v-text-field v-model="item.relationship" label="Ingrese el parentesco del beneficiario" placeholder=""
                :rules="[requiredRule]" required></v-text-field>
            </v-col>
            <v-col xs="10" md="2">
              <v-label>Prima</v-label>
              <p><b>{{ 'Prueba' }}</b></p>
            </v-col>
            <v-col xs="2" md="1">
              <v-btn icon="mdi-minus" class="mx-1 ma-2" @click="popBeneficiary(index)"></v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-btn icon="mdi-plus" class="mx-1 ma-2" @click="pushNewBeneficiary()"></v-btn>
      </v-card-actions>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: 'health-form',

  props: {
    client: Object,
  },

  data: () => ({
    valid: false,

    insuredSums: ['20,000', '30,000', '50,000', '100,000', '200,000', '500,000'],
    types: ['REGIONAL', 'NACIONAL', 'INTERNACIONAL', 'BAJO COSTO'],

    healthData: {
      company: 'SEGUROS MERCANTIL',
      insuredSum: '50,000',
      type: 'NACIONAL',
      beneficiaries: [{
        age: '',
        relationship: '',
      }],
    },

    requiredRule:
      value => {
        if (value) return true

        return 'Campo requerido.'
      },
  }),

  methods: {
    pushNewBeneficiary() {
      this.healthData.beneficiaries.push({
        age: '',
        relationship: '',
      });
    },

    popBeneficiary(index) {
      this.healthData.beneficiaries = this.healthData.beneficiaries.filter(item => item !== this.healthData.beneficiaries[index]);
    }
  },

  watch: {
    valid(newValid) {
      if (newValid) {
        this.$emit('submit', this.healthData);
      }
    }
  }
}
</script>

<style scoped>
.img-selected {
  border: 3px solid #c7850e;
  border-radius: 1rem;
}
</style>
