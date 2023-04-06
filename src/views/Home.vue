<template>
  <div class="top-Home">
    <router-view></router-view>
    <prompt></prompt>
    <tab-bar></tab-bar>
  </div>
</template>

<script setup>
import { ref } from "vue";
import prompt from "@/components/prompt";
import TabBar from "./TabBar";
</script>

<style lang="scss" scoped>
.top-Home {
  width: 100%;
  height: 100%;
}
</style>
