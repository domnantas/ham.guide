<template>
  <div class="exam">
    <div v-if="!selectedExam" class="select">
      <button v-for="exam in exams" @click="selectedExam = exam">
        {{ exam.title }}
      </button>
    </div>
    <div class="questions" v-if="selectedExam">
      <h2>{{ selectedExam.title }}</h2>
      <div class="question" v-for="(question, questionIndex) in randomQuestions" role="radiogroup">
        <div>
          <img class="question-image" v-if="question.image" :src="question.image" />
          <strong class="question-text">{{ question.text }}</strong>
          <span class="error" v-if="chosen[questionIndex] === undefined && submitted">
            Pažymėkite atsakymą
          </span>
          <span class="error" v-if="chosen[questionIndex] !== question.answer && finished">
            Neteisingas atsakymas
          </span>
        </div>
        <label v-for="(choice, choiceIndex) in question.choices" class="choice"
          :class="{ correct: finished && question.answer === choiceIndex}">
          <input type="radio" :value="choiceIndex" :name="`question${questionIndex}`" v-model="chosen[questionIndex]"
            :disabled="finished" />
          {{ choice }}
        </label>
      </div>
      <button @click="checkResults" v-if="!finished">Tikrinti</button>
      <div v-if="submitted && !areAllQuestionsAnswered" class="error">Yra nepažymėtų atsakymų</div>
      <div class="results" v-if="finished">
        <strong class="result" :class="{ error: correctNumber < 25 }">
          {{ correctNumber }}/30 --
          {{ Math.round((correctNumber * 100) / 30) }}%
        </strong>
        <button @click="reset">Naujas testas</button>
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
      finished: false,
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
    },
    areAllQuestionsAnswered() {
      return this.chosen.filter(() => true).length === this.randomQuestions.length;
    }
  },
  methods: {
    checkResults() {
      this.submitted = true;
      if (this.areAllQuestionsAnswered) {
        this.finished = true;
      }
    },
    reset() {
      this.selectedExam = null;
      this.submitted = false;
      this.chosen = [];
      this.finished = false;
    },
  },
};
</script>

<style scoped>
button {
  color: #fff;
  font-size: 1.2rem;
  background-color: var(--c-brand);
  padding: 1rem;
  border: none;
  cursor: pointer;
  margin-bottom: 20px;
}

.select>button:not(:last-of-type) {
  margin-right: 20px;
}

.question {
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  line-height: 1.5;
}

.question-image {
  display: block;
}

.dark .question-image {
  filter: invert(1);
}

.question-text {
  margin-bottom: 10px;
  display: inline-block;
}

.choice {
  margin-bottom: 10px;
}

.results {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.result {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: green;
}

.error {
  color: red;
}

.correct {
  color: green;
}
</style>
