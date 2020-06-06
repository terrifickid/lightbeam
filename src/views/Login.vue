<template>
  <div class="home">
  <v-row :align="'center'" :justify="'center'">
    <v-col cols="12" sm="6">
      <v-form ref="form" class="pa-12" @submit="submit()" onSubmit="return false;">
      <h1 class="mb-6">Welcome to Orderwrite!</h1>
      <Notice></Notice>

      <h4 class="mt-6 mb-4">Login</h4>

        <v-text-field v-model="form.username.value" :rules="form.username.rules" label="Username" required></v-text-field>
        <v-text-field :type="'password'" :rules="form.password.rules" v-model="form.password.value" label="Password" required></v-text-field>
        <v-btn type="submit" dark color="secondary"  :loading="form.btn.loader" class="mt-4">Login</v-btn>
      </v-form>
    </v-col>
  <v-col cols="12" sm="6">
    <img src="http://localhost:3000/party_cart.png" style="max-width: 100%;">
  </v-col>
  </v-row>

  </div>
</template>

<script>
import Notice from '../components/Notice.vue';
export default {
  name: 'Home',
  data: () => ({
    form: {
      username: {
        value: null,
        rules: [v => !!v || 'Username is required']
      },
      password: {
        value: null,
        rules: [v => !!v || 'Password is required']
      },
      btn:{
        loader: false
      }
    }
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
  components: {
    Notice
  },
  methods:{
    async submit(){
      if(this.$refs.form.validate()){
        this.form.btn.loader = true;
        var res = await this.$store.dispatch('login', {username: this.form.username.value, password: this.form.password.value});
        if(!res) this.form.btn.loader = false;
      }
    }
  },
  async mounted(){
  this.$store.commit('setUser', null);
  }
}
</script>
<style scoped>
h1{font-weight: normal}
</style>
