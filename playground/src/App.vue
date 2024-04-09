<script setup lang="ts">
import { computed, ref, shallowRef } from 'vue'
import type { Highlighter } from 'shiki'
import { getHighlighter } from 'shiki'
import { grammarGlob } from '../../src/index'

const code = ref('**/*.?([cm])[jt]s?(x)')
const shiki = shallowRef<Highlighter>()

getHighlighter({
  themes: [
    'vitesse-dark',
  ],
  langs: [
    'js',
    grammarGlob,
  ],
})
  .then((highlighter) => {
    shiki.value = highlighter
  })

const highlighted = computed(() => {
  return shiki.value?.codeToHtml(code.value, {
    lang: 'glob',
    theme: 'vitesse-dark',
  }) || ''
})
</script>

<template>
  <div style="display:grid;grid-template-rows: 1fr 1fr;height: 100vh; gap: 1em;">
    <textarea v-model="code" style="padding: 1rem; font-size: 24px;" />
    <div style="padding: 0.5rem" v-html="highlighted" />
  </div>
</template>

<style>
html {
  color-scheme: dark;
  font-size: 24px;
}
</style>
