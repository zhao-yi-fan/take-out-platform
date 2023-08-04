<template>
  <div class="top-home">
    <router-view></router-view>
    <prompt></prompt>
    <tab-bar></tab-bar>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import prompt from "@/components/prompt";
import TabBar from "@/components/TabBar";
</script>

<style lang="scss" scoped>
.top-home {
  width: 100%;
  height: 100%;
}
</style>
