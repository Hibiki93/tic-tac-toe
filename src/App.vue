<template>
  <v-app>
    <!-- <v-app-bar>
    </v-app-bar>-->
    <v-main>
      <router-view :setting="setting"/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    setting:{
      difficult:1,
    }
  }),
};
</script>
