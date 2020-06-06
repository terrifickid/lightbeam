<template>
<!-- App.vue -->

<v-app>
  <v-navigation-drawer app v-model="drawer">
     <v-list>
       <v-list-item>
          <v-list-item-content>
             <v-list-item-title>Application</v-list-item-title>
             <v-list-item-subtitle>Subtext</v-list-item-subtitle>
           </v-list-item-content>
       </v-list-item>
     </v-list>
  </v-navigation-drawer>

  <v-app-bar app>

     <v-row  :align="'center'" :justify="'start'">
       <v-col v-show="user"><v-app-bar-nav-icon @click="drawer = !drawer" ></v-app-bar-nav-icon></v-col>
       <v-col><v-img class="float-right text-right" src="http://localhost:3000/logo.png" max-height="40" max-width="100" contain></v-img></v-col>
     </v-row>




  </v-app-bar>

  <!-- Sizes your content based upon application components -->
  <v-content>

    <!-- Provides the application the proper gutter -->
    <v-container fluid>

      <!-- If using vue-router -->
      <router-view></router-view>
    </v-container>
  </v-content>

  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: { },
  data: () => ({
    drawer: false
  }),
  computed:{
    user:{
      get(){
         return this.$store.getters.getUser;
      },
      set(value){
        this.$store.commit('setUser', value);
      }
    },
  },
};
</script>
