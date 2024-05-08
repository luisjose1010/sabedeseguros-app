<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-img :width="355" aspect-ratio="16/9" cover :src="imageSrc"></v-img>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-label>Empresa</v-label>
          <v-autocomplete v-model="healthData.company" label="Selecciona la empresa de tu preferencia"
            :items="companies"></v-autocomplete>
        </v-col>
        <v-col cols="12" md="6">
          <v-label>Suma asegurada</v-label>
          <v-select v-model="healthData.insuredSum" label="Selecciona el monto asegurado anual"
            :items="insuredSums"></v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-label>Tipo</v-label>
          <v-select v-model="healthData.type" :items="types"></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-label>Modo de pago</v-label>
          <v-select v-model="healthData.mode" :items="modes"></v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <h3>Titular:</h3>
          <span>{{ client.name }}</span>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-label>Edad</v-label>
          <v-text-field v-model="client.age" placeholder="" min="0" max="99" step="1" type="number"
            readOnly></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-label>Prima</v-label>
          <p v-if="healthAmounts === null"><v-progress-circular color="primary" indeterminate></v-progress-circular></p>
          <p v-else-if="healthData.amount !== ''"><b>${{ healthData.amount }}</b></p>
          <p v-else><b>N/A</b></p>
        </v-col>
        <v-col cols="12" sm="6" md="4" class="mb-sm-3">
          <v-label>Total</v-label>
          <p v-if="healthAmounts === null"><v-progress-circular color="primary" indeterminate></v-progress-circular></p>
          <p v-else-if="healthData.total !== ''"><b>${{ healthData.total }}</b></p>
          <p v-else><b>N/A</b></p>
        </v-col>
      </v-row>


      <h3 class="mt-4 mt-md-2">Beneficiarios:</h3>
      <br>
      <v-row>
        <v-col>
          <v-row v-for="(item, index) in healthData.beneficiaries">
            <v-col cols="12" md="5">
              <v-label>Edad</v-label>
              <v-text-field v-model="item.age" label="Ingrese la edad del beneficiario" placeholder="" min="0" max="99"
                step="1" type="number" :rules="ageRule" required></v-text-field>
            </v-col>
            <v-col cols="10" md="4">
              <v-label>Parentesco</v-label>
              <v-text-field v-model="item.relationship" label="Ingrese el parentesco del beneficiario" placeholder=""
                :rules="[requiredRule]" required></v-text-field>
            </v-col>
            <v-col cols="9" md="2">
              <v-label>Prima</v-label>
              <p v-if="healthAmounts === null"><v-progress-circular color="primary" indeterminate></v-progress-circular>
              </p>
              <p v-else-if="item.amount !== ''"><b>${{ item.amount }}</b></p>
              <p v-else><b>N/A</b></p>
            </v-col>
            <v-col cols="3" md="1">
              <v-btn icon="mdi-minus" class="mx-1 ma-2" @click="popBeneficiary(index)"></v-btn>
            </v-col>
            <v-divider></v-divider>
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
import api from '@/api';

export default {
  name: 'health-form',

  props: {
    client: Object,
  },

  data: () => ({
    valid: false,

    insuredSums: ['Cargando...'],
    types: ['HCM', 'EMERGENCIAS MÉDICAS', 'MEDICINA PREPAGADA (ZULIA)', 'APS'],
    companies: ['Cargando...'],
    modes: ['ANUAL', 'SEMESTRAL', 'TRIMESTRAL'],
    modeMultipliers: [1, 2, 4],

    healthData: {
      company: 'Cargando...',
      insuredSum: 'Cargando...',
      type: 'HCM',
      mode: 'ANUAL',
      amount: '',
      total: '',
      beneficiaries: [{
        age: '',
        relationship: '',
        amount: '',
      }],
    },
    healthAmounts: null,

    requiredRule:
      value => {
        if (value) return true

        return 'Campo requerido.'
      },
    ageRule: [
      value => value ? true : 'Campo requerido.',
      value => value >= 0 && value <= 100 ? true : 'La edad debe ser entre 0 y 100 años.',
      value => value % 1 == 0 ? true : 'Edad no válida.',
    ]
  }),

  methods: {
    getAmount(age) {
      if (this.healthAmounts !== null) {
        let amount = this.healthAmounts.filter(item => item.age == age);

        if (amount.length === 1) {
          amount = amount[0].premium
        } else {
          amount = '';
        }

        return amount;
      }
    },
    submitForm(valid, data) {
      if (valid) {
        this.$emit('submit', data);
      } else {
        this.$emit('invalidForm');
      }
    },

    fetchCompanies() {
      const type = this.healthData.type;

      api.get(`/health/company?&type=${type}`)
        .then((response) => {
          this.companies = response.data;
          this.healthData.company = this.companies[0];
          this.fetchInsuredSums();
        })
        .catch((error) => {
          console.log(error);
        })
    },
    fetchInsuredSums() {
      const company = this.healthData.company;
      const type = this.healthData.type;

      api.get(`/health/insured-sum?company=${company}&type=${type}`)
        .then((response) => {
          this.insuredSums = response.data;
          this.healthData.insuredSum = this.insuredSums[0];
          this.fetchHealth();
        })
        .catch((error) => {
          console.log(error);
        })
    },
    fetchHealth() {
      const company = this.healthData.company;
      const type = this.healthData.type;
      const insuredSum = this.healthData.insuredSum;

      api.get(`/health?company=${company}&type=${type}&insured_sum=${insuredSum}`)
        .then((response) => {
          this.healthAmounts = response.data;
          this.updateAmounts();
        })
        .catch((error) => {
          console.log(error);
        })
    },

    updateAmounts() {
      const modeMultiplier = this.modeMultipliers[this.modes.indexOf(this.healthData.mode)];
      this.healthData.amount = this.getAmount(this.client.age);
      this.healthData.total = 0;

      if (parseFloat(this.healthData.amount)) {
        this.healthData.amount = parseFloat(this.healthData.amount) / modeMultiplier; // Modifica según si es 'ANUAL' u otro
        this.healthData.total += parseFloat(this.healthData.amount);
      } else {
        this.healthData.amount = this.healthData.amount;
      }

      for (const [index, item] of this.healthData.beneficiaries.entries()) {
        const beneficiaryAmount = this.getAmount(item.age);

        if (parseFloat(beneficiaryAmount)) {
          this.healthData.beneficiaries[index].amount = parseFloat(beneficiaryAmount) / modeMultiplier; // Modifica según si es 'ANUAL' u otro
          this.healthData.total += parseFloat(beneficiaryAmount) / modeMultiplier;
        } else {
          this.healthData.beneficiaries[index].amount = beneficiaryAmount;
        }
      }
    },

    pushNewBeneficiary() {
      this.healthData.beneficiaries.push({
        age: '',
        relationship: '',
        amount: '',
      });
    },
    popBeneficiary(index) {
      this.healthData.beneficiaries = this.healthData.beneficiaries.filter(item => item !== this.healthData.beneficiaries[index]);
    },

    toDashCase(str) {
      return str.replace(/\s+/g, '-').toLowerCase();
    },
  },

  computed: {
    beneficiaries() {
      return this.healthData.beneficiaries;
    },
    company() {
      return this.healthData.company;
    },
    type() {
      return this.healthData.type;
    },
    insuredSum() {
      return this.healthData.insuredSum;
    },
    mode() {
      return this.healthData.mode;
    },

    imageSrc() {
      const company = this.toDashCase(this.healthData.company);
      const images = import.meta.glob('@/assets/**.png', { eager: true, import: 'default' });
      return images[`/src/assets/${company}.png`];
    },
  },

  watch: {
    healthData: {
      handler(newData) {
        this.submitForm(this.valid, newData)
      },
      deep: true,
    },
    valid(newValid) {
      this.submitForm(newValid, this.healthData)
    },
    beneficiaries: {
      handler() {
        this.updateAmounts();
      },
      deep: true,
    },
    company() {
      this.healthAmounts = null
      this.fetchInsuredSums();
    },
    type() {
      this.healthAmounts = null
      this.fetchCompanies();
    },
    insuredSum() {
      this.healthAmounts = null
      this.fetchHealth();
    },
    mode() {
      this.updateAmounts();
    },
  },

  created() {
    this.fetchCompanies();
  }
}
</script>

<style scoped>
.img-selected {
  border: 3px solid #c7850e;
  border-radius: 1rem;
}
</style>
