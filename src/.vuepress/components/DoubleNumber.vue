<template>
  <div class="doubler">
    <h3>{{ number }}</h3>
    <button @click="double">Double</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      number: 1,
    };
  },
  methods: {
    double() {
      this.number = this.number * 2;
    },
  },
};
</script>

<style scoped>
.doubler {
  text-align: center;
}

button {
  color: #fff;
  font-size: 1.2rem;
  background-color: var(--c-brand);
  padding: 1.5rem;
  border: none;
}
</style>
