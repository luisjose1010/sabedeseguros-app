<template>
  <v-container>
    <v-form v-model="valid">
      <v-row v-for="(question, index) in questions">
        <v-col>
          <v-label>{{ question }}</v-label>
          <v-text-field v-model="answers[index]" :rules="[requiredRule(answers[index])]" required></v-text-field>
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
      '¿Tiene alguna compañía de su preferencia?',
      '¿Con qué frecuencia viaja al exterior?',
      '¿Cuánto es su mayor tiempo de permanencia en el exterior?',
    ],
    answers: [],

    requiredRule: (value) =>
      value ? true : 'Campo requerido.'
  }),
  methods: {
    submitForm(valid, data) {
      if (valid) {
        this.$emit('submit', data);
      } else {
        this.$emit('invalidForm');
      }
    },
  },
  computed: {
    questionsAnswers() {
      return this.questions.map((question, index) => ({
        question: question,
        answer: this.answers[index],
      }));
    },
  },
  watch: {
    questionsAnswers: {
      handler(newAnswers) {
        this.submitForm(this.valid, newAnswers);
      },
      deep: true,
    },
    valid(newValid) {
      this.submitForm(newValid, this.questionsAnswers);
    },
  },
};
</script>

<style scoped>
.absolute {
  position: relative;
}
</style>