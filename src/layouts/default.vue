<template>
  <v-app id="inspire">
    <!-- <v-navigation-drawer v-model="appStore.drawer">
    </v-navigation-drawer> -->

    <!-- <v-app-bar>
      <v-app-bar-nav-icon @click="appStore.toggleDrawer()" />

      <v-app-bar-title>Application</v-app-bar-title>
    </v-app-bar> -->

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
  import { useAppStore } from '@/stores/app'
  const appStore = useAppStore()
</script>

<style lang="scss" scoped>
:deep(main) {
  background-color: #f5f5f5;
}
</style>