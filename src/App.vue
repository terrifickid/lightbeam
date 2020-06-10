<template>
<!-- App.vue -->

<v-app>

  <v-navigation-drawer app v-model="drawer">

  <v-list >

   <v-list-item :to="{name: 'Home'}">
     <v-list-item-title>Home</v-list-item-title>
   </v-list-item>
  <v-divider></v-divider>

   <v-list-group>
     <template v-slot:activator>
       <v-list-item-title>Reports</v-list-item-title>
     </template>
   </v-list-group>

   <v-divider></v-divider>
    <v-list-group>
      <template v-slot:activator>
        <v-list-item-title>Catalog</v-list-item-title>
      </template>
    </v-list-group>
    <v-divider></v-divider>
     <v-list-group>
       <template v-slot:activator>
         <v-list-item-title>People Management</v-list-item-title>
       </template>

       <v-list-item link :to="{name: 'Users'}">
         <v-list-item-title>Users</v-list-item-title>
       </v-list-item>


     </v-list-group>
     <v-divider></v-divider>
      <v-list-group>
        <template v-slot:activator>
          <v-list-item-title>Order Management</v-list-item-title>
        </template>
      </v-list-group>
      <v-divider></v-divider>
      <v-list-item :to="{name: 'Login'}" ><v-list-item-title >Logout</v-list-item-title></v-list-item>

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
  <Notice></Notice>
      <!-- If using vue-router -->
      <router-view></router-view>
    </v-container>
  </v-content>

  </v-app>
</template>

<script>
import Notice from './components/Notice.vue';
import router from './router';
export default {
  name: 'App',
  components: { Notice },
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
  methods:{
    Route(link){
      router.push(link);
    }
  },
  beforeCreate(){

  }
};
</script>
