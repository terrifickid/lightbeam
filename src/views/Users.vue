<template>

  <v-card>

  <v-toolbar color="red" short flat dark>
    <v-toolbar-title>Users</v-toolbar-title>
  </v-toolbar>
    <v-card-title>
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Search"
      single-line
      hide-details
    ></v-text-field>
    <v-dialog v-model="userDialog" persistent hide-overlay max-width="800">
              <template v-slot:activator="{ on, attrs }">
              <v-btn
                fab
                dark
                color="red"
                bottom
                right
                fixed
                v-on="on"
                v-bind="attrs"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">Add New User</span>
                </v-card-title>
                <v-divider  class="mb-5"></v-divider>
                <v-card-text>

                        <v-text-field v-model="user.username" label="Username"></v-text-field>

                        <v-text-field v-model="user.password" label="Password"></v-text-field>

                        <v-text-field v-model="user.role" label="Role"></v-text-field>

                        <v-text-field  v-model="user.email" type="email" label="Email"></v-text-field>

                        <v-text-field v-model="user.firstname" label="First Name"></v-text-field>

                        <v-text-field  v-model="user.lastname" label="Last Name"></v-text-field>

                        <v-text-field v-model="user.campaign" label="Campaign"></v-text-field>

                        <v-text-field v-model="user.distributor" label="Distributor"></v-text-field>





                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="users"
      :search="search"
      :loading="isLoading"
    >
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editUser(item)"
      >
        mdi-pencil
      </v-icon>

    </template>
    </v-data-table>
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
      headers: [],
      users: [],
      isLoading: true,
      userDialog: false,
      user: {}
    }
  },
  methods:{
    editUser(user){
      this.user = Object.assign({}, user);
      this.userDialog = true;
    },
    close(){
    this.userDialog = false;
        this.$nextTick(() => {
          this.user = Object.assign({}, {});
        });
    },
    async save(){
      var write = await this.$store.dispatch('dbUpdate', {endpoint: 'users/', params: this.user});
      this.users = await this.$store.dispatch('dbQuery', {endpoint: 'users/', params: {} });
      this.userDialog = false;
      this.$nextTick(() => {
        this.user = Object.assign({}, {});
      });
      console.log(write);
    }

  },
  async mounted(){
    var users = await this.$store.dispatch('dbQuery', {endpoint: 'users/', params: {}});
    this.users = users;
    this.headers = [
      {
        text: 'Username',
        align: 'start',
        value: 'username',
      },
      { text: 'Distributor', value: 'distributor' },
      { text: 'Campaign', value: 'campaign' },
      { text: 'Role', value: 'role' },
      { text: 'Actions', value: 'actions', sortable: false },
    ];
    this.isLoading = false;

  }
}
</script>
