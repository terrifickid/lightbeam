<template>
  <v-card>
    <v-toolbar color="red" short flat dark>
      <v-toolbar-title>Campaigns</v-toolbar-title>
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

    <v-dialog v-model="dialog" persistent fullscreen hide-overlay max-width="800">
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

                    <v-divider  class="mb-6"></v-divider>
<v-card-text>
                <v-tabs left center-active show-arrows="true">
                  <v-tab align="start"> Name &amp; Launch Date</v-tab>
                  <v-tab justify="start" align="start">Client Info</v-tab>
                  <v-tab>Shopper Login</v-tab>
                  <v-tab>Shopper Experience</v-tab>
                  <v-tab>Checkout Info</v-tab>
                  <v-tab>Departments</v-tab>
                  <v-tab>Locations</v-tab>
                  <v-tab>Managers</v-tab>
                  <v-tab>Fufillment</v-tab>
                  <v-tab>Products</v-tab>
                  <v-tab>Preview</v-tab>
                  <v-tab-item >
                  <v-card flat class="mt-6">
                    <v-card-text>
                        <v-text-field v-model="record.name" label="Campaign Name"></v-text-field>
                        <v-text-field v-model="record.companyname" label="Company Name"></v-text-field>
                        <v-text-field v-model="record.distributor" label="Distributor"></v-text-field>
                    </v-card-text>
                  </v-card>
                  <v-card flat class="mt-6">
                    <v-card-text>
                        <v-text-field v-model="record.name" label="Campaign Name"></v-text-field>
                        <v-text-field v-model="record.companyname" label="Company Name"></v-text-field>
                        <v-text-field v-model="record.distributor" label="Distributor"></v-text-field>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat class="mt-6">
                    <v-card-text>
                        <v-text-field v-model="record.clientFirstName" label="Client First Name"></v-text-field>
                        <v-text-field v-model="record.clientLastName" label="Client Last Name"></v-text-field>
                        <v-text-field v-model="record.email" label="Client Email"></v-text-field>
                        <v-switch v-model="record.switch1" label="Allow account to see reports"></v-switch>
                    </v-card-text>
                  </v-card>

                  <v-card flat class="mt-6">
                    <v-card-text>
                        <v-text-field v-model="record.clientUsername" label="Client Username"></v-text-field>
                        <v-text-field v-model="record.clientPassword" label="Client Password"></v-text-field>

                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat>
                    <v-card-text>
                        <v-text-field v-model="record.shopperUsername" label="Shopper Username"></v-text-field>
                        <v-text-field v-model="record.shopperPassword" label="Shopper Password"></v-text-field>

                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat>
                    <v-card-text>
                      <v-textarea label="Campaign Message" v-model="record.campaignmessage"></v-textarea>
                        <v-switch v-model="record.displaystorefrontpricing" label="Display storefront pricing"></v-switch>
                        <v-switch v-model="record.offercompanyallowance" label="Offer company allowance"></v-switch>
                        <v-switch v-model="record.limititemsinshoppingcart" label="Limit items in shopping cart"></v-switch>
                        <v-switch v-model="record.limitshoppingcartamount" label="Limit shopping cart $ amount"></v-switch>
                        <v-switch v-model="record.emailconfirmation" label="Email Confirmation"></v-switch>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  Checkout Info
                </v-tab-item>
              </v-tabs>
</v-card-text>

  <v-divider  class="mb-3"></v-divider>
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
  name: 'Home',
  data(){
    return{
      data: [],
      headers: [],
      record: {},
      search: null,
      dialog: false,
      isLoading: true,
      isSaving: false,
    }
  },
  components: {

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
      var res = await this.$store.dispatch('dbUpdate', {endpoint: 'campaigns/', params: this.record});
      if(res){
        this.data = await this.$store.dispatch('dbQuery', {endpoint: 'campaigns/', params: {} });
        this.dialog = false;
        this.record = Object.assign({}, {});
        this.isSaving = false;
        return;
      }

      this.isSaving = false;
      return;
    },
  },
  async mounted(){
    this.data = await this.$store.dispatch('dbQuery', {endpoint: 'campaigns/', params: {}});
    this.headers = [
      {
        text: 'Campaign',
        align: 'start',
        value: 'name',
      },
      { text: 'Actions', value: 'actions', sortable: false },
    ];
    this.isLoading = false;

  }
}
</script>
<style scoped>

</style>
