<template>
  <router-view v-slot="{ Component }">
    <!-- 优化下面的代码 -->
    <keep-alive v-if="$route.meta.keepAlive">
      <component :is="Component" />
    </keep-alive>
    <component :is="Component" v-else />
  </router-view>
</template>

<style lang="scss">
html,
body,
#app {
  width: 100%;
  height: 100%;
}
* {
  padding: 0;
  margin: 0;
}
</style>
