<template>
  <div>{{ name }}</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  public name: string = 'Hello World'
}
</script>