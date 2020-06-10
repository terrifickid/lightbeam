<template>
  <v-card>
    <v-card-title>
      Users
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="users"
      :search="search"
    ></v-data-table>
  </v-card>
</template>


<script>

export default {
  name: 'Users',
  components: {

  },
  data () {
    return {
      search: '',
      headers: [


      ],
      users: []
    }
  },
  async mounted(){
    var users = await this.$store.dispatch('dbGet', {endpoint: 'users/'});
    this.users = users;
    this.headers = [
      {
        text: 'Username',
        align: 'start',
        value: 'username',
      },
      { text: 'Distributor', value: 'calories' },
      { text: 'Campaign', value: 'fat' },
      { text: 'Role', value: 'role' },
      { text: 'Active', value: 'protein' },
    ];

  }
}
</script>
