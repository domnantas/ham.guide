<template>
  <div class="exam">
    <div v-if="!selectedExam" class="select">
      <button v-for="exam in exams" @click="selectedExam = exam">
        {{ exam.title }}
      </button>
    </div>
    <div class="questions" v-if="selectedExam">
      <h2>{{ selectedExam.title }}</h2>
      <div
        class="question"
        v-for="(question, questionIndex) in randomQuestions"
        role="radiogroup"
      >
        <div>
          <img
            class="question-image"
            v-if="question.image"
            :src="question.image"
          />
          <strong class="question-text">{{ question.text }}</strong>
          <span
            class="error"
            v-if="chosen[questionIndex] === undefined && submitted"
          >
            Pažymėkite atsakymą
          </span>
          <span
            class="error"
            v-if="chosen[questionIndex] !== question.answer && finished"
          >
            Neteisinga
          </span>
        </div>
        <label v-for="(choice, choiceIndex) in question.choices" class="choice">
          <input
            type="radio"
            :value="choiceIndex"
            :name="`question${questionIndex}`"
            v-model="chosen[questionIndex]"
            :disabled="finished"
          />
          {{ choice }}
        </label>
      </div>
      <button @click="checkResults" v-if="!finished">Tikrinti</button>
      <div class="results" v-if="finished">
        <strong class="result" :class="{ error: correctNumber < 25 }">
          {{ correctNumber }}/30 --
          {{ Math.round((correctNumber * 100) / 30) }}%
        </strong>
        <button @click="reset">Išvalyti</button>
      </div>
    </div>
  </div>
</template>

<script>
import exams from '../data/exams.json';

export default {
  data() {
    return {
      exams: exams,
      selectedExam: null,
      submitted: false,
      chosen: [],
      finished: false
    };
  },
  computed: {
    randomQuestions() {
      return this.selectedExam.questions
        .sort(() => 0.5 - Math.random())
        .slice(0, 30);
    },
    correctNumber() {
      return this.randomQuestions.reduce((accumulator, current, index) => {
        if (current.answer === this.chosen[index]) accumulator++;
        return accumulator;
      }, 0);
    }
  },
  methods: {
    checkResults() {
      this.submitted = true;
      if (
        this.chosen.filter(() => true).length === this.randomQuestions.length
      ) {
        this.finished = true;
      }
    },
    reset() {
      this.selectedExam = null;
      this.submitted = false;
      this.chosen = [];
      this.finished = false;
    }
  }
};
</script>

<style lang="stylus" scoped>
button
  color #fff
  font-size 1.2rem
  background-color $accentColor
  padding 1rem
  border none
  cursor pointer

.select > button:not(:first-of-type)
  margin-left 20px

.question
  display flex
  flex-direction column
  margin 20px 0
  line-height 1.5

.question-image
  display block

.question-text
  margin-bottom 10px
  display inline-block

.choice
  margin-bottom 10px

.results
  display flex
  flex-direction column
  align-items flex-start

.result
  font-size 1.5rem
  margin-bottom 20px
  color green

.error
  color red
</style>
