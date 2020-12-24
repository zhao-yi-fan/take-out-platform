<!-- 首页 -->
<template>
  <div class="wsw-top-Home">
    <router-view></router-view>
    <prompt></prompt>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
import { ref } from 'vue'
import prompt from "@/components/prompt.vue"
import TabBar from './TabBar.vue';

export default {
  name: '',
  components: {
    prompt,
    TabBar
  },
  TabBaretup (propes, { root }) {

    return {
      
    }
  }
}
</script>

<style lang="scss" scoped>
.wsw-top-Home {
  width: 100%;
  height: 100%;
}
</style>
