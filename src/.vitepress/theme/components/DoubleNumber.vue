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
  color: var(--vp-button-brand-text);
  font-size: 1rem;
  font-weight: 600;
  background-color: var(--vp-button-brand-bg);
  padding: 0 20px;
  line-height: 40px;
  border: 1px solid var(--vp-button-brand-border);
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.25s;
}

button:hover {
  background-color: var(--vp-button-brand-hover-bg);
}
</style>
