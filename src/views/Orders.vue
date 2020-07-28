<template>

  <v-card>

  <v-toolbar color="red" short flat dark>
    <v-toolbar-title>Orders</v-toolbar-title>
  </v-toolbar>
    <v-card-title>
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
      :items="data"
      :search="search"
      :loading="isLoading"
    >
    <template v-slot:item.cart="{ item }">
      {{item.cart | json}}
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="edit(item)"
      >
        mdi-pencil
      </v-icon>
    </template>
    </v-data-table>


    <v-dialog v-model="dialog" persistent hide-overlay max-width="800">
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
                  <span class="headline">User</span>
                </v-card-title>
                <v-divider  class="mb-6"></v-divider>
                <v-card-text>

                      blank!

                </v-card-text>

                <v-card-actions class="pa-6">

                  <v-btn color="red"   large outlined @click="del">DELETE</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="secondary"  large light  outlined @click="close">Cancel</v-btn>
                  <v-btn color="red" large dark @click="save" :loading="isSaving">Save</v-btn>

                </v-card-actions>
              </v-card>
            </v-dialog>

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
      data: [],
      isLoading: true,
      isSaving: false,
      isDeleting: false,
      dialog: false,
      record: {}
    }
  },
  methods:{
    edit(record){
      this.record = Object.assign({}, record);
      this.dialog = true;
    },
    close(){
    this.dialog = false;
    this.record = Object.assign({}, {});
    },
    async save(){
      this.isSaving = true;
      var res = await this.$store.dispatch('dbUpdate', {endpoint: 'orders/', params: this.record});
      if(res){
        this.data = await this.$store.dispatch('dbQuery', {endpoint: 'orders/', params: {} });
        this.dialog = false;
        this.record = Object.assign({}, {});
        this.isSaving = false;
        return;
      }

      this.isSaving = false;
      return;
    },
    async del(){
      var res = await this.$store.dispatch('dbDelete', {endpoint: 'orders/'+this.record._id });
      if(res) this.data = await this.$store.dispatch('dbQuery', {endpoint: 'orders/', params: {} });
      this.dialog = false;
      this.record = Object.assign({}, {});
    }

  },
  async mounted(){
    this.data = await this.$store.dispatch('dbQuery', {endpoint: 'orders/', params: {}});
    console.log(this.data);
    this.headers = [
      {
        text: 'ID',
        align: 'start',
        value: '_id',
      },
      { text: 'Cart', value: 'cart' },

      { text: 'Actions', value: 'actions', sortable: false },
    ];
    this.isLoading = false;

  }
}
</script>
