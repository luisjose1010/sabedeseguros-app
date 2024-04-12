<template>
  <v-container>
    <v-form v-model="valid">
      <v-row v-for="(question, index) in questions">
        <v-col>
          <v-label>{{ question }}</v-label>
          <v-text-field v-model="answers[index]" :rules="[requiredRule]" required></v-text-field>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: 'questions-form',
  data: () => ({
    valid: false,

    questions: [
      '¿Tienes alguna compañía de tu preferencia?',
      '¿Tienes algún monto establecido para esto?',
      '¿Con qué frecuencia viajas al exterior?',
    ],
    answers: [],

    requiredRule:
      value => {
        if (value) return true

        return 'Campo requerido.'
      },
  }),

  methods: {

  },

  computed: {
    questionsAnswers() {
      return this.questions.map((question, index) => ({
        question: question,
        answer: this.answers[index],
      }))
    }
  },

  watch: {
    valid(newValid) {
      if (newValid) {
        this.$emit('submit', this.questionsAnswers);
      }
    }
  },
}
</script>

<style scoped>
.absolute {
  position: relative;
}
</style>
