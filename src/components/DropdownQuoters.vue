<template>
  <div>
    <h2>Todos los cotizadores</h2>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-title>
          <b>Cotizador de Salud</b>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <health-quoter></health-quoter>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-title>
          <b>Cotizador de Funerario</b>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <funeral-quoter></funeral-quoter>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-title>
          <b>Cotizador de Accidentes Personales</b>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <accidents-quoter></accidents-quoter>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-title>
          <b>Cotizador de Vida</b>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <life-quoter></life-quoter>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-title>
          <b>Cotizador de Automóvil</b>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <car-quoter></car-quoter>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-title>
          <b>Cotizador de Patrimoniales</b>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <patrimonial-quoter></patrimonial-quoter>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-title>
          <b>Cotizador de Transporte</b>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <transport-quoter></transport-quoter>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-title>
          <b>Cotizador de Fianzas</b>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <surety-quoter></surety-quoter>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-title>
          <b>Cotizador de Mascotas</b>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <pet-quoter></pet-quoter>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import HealthQuoter from '@/components/HealthQuoter.vue';
import FuneralQuoter from '@/components/FuneralQuoter.vue';
import AccidentsQuoter from '@/components/AccidentsQuoter.vue';
import LifeQuoter from '@/components/LifeQuoter.vue';
import CarQuoter from '@/components/CarQuoter.vue';
import PatrimonialQuoter from '@/components/PatrimonialQuoter.vue';
import TransportQuoter from '@/components/TransportQuoter.vue';
import SuretyQuoter from '@/components/SuretyQuoter.vue';
import PetQuoter from '@/components/PetQuoter.vue';

export default {
  name: 'dropdown-quoters',

  data: () => ({

  }),

  methods: {

  },

  components: {
    HealthQuoter,
    FuneralQuoter,
    AccidentsQuoter,
    LifeQuoter,
    CarQuoter,
    PatrimonialQuoter,
    TransportQuoter,
    SuretyQuoter,
    PetQuoter,
  }
}
</script>