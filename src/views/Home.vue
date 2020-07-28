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
    <template v-slot:item._id="{ item }">
      <a :href="'/campaign/'+item._id">View</a>

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
                <v-tabs left center-active :show-arrows="true">
                  <v-tab align="start"> Name &amp; Launch Date</v-tab>
                  <v-tab justify="start" align="start">Client Info</v-tab>
                  <v-tab>Shopper Login</v-tab>
                  <v-tab>Shopper Experience</v-tab>

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

                  <v-card>

                    <v-data-table
                      class="mt-6"
                      :headers="[
                        {
                          text: 'Image',
                          align: 'start',
                          value: 'image',
                        },
                        {
                          text: 'Type',
                          align: 'start',
                          value: 'type',
                        },
                        {
                          text: 'Name',
                          align: 'start',
                          value: 'name',
                        },
                        {
                          text: 'Price',
                          align: 'end',
                          value: 'price',
                        },
                        { text: 'Actions', value: 'actions', sortable: false }]"
                      :items="record.products"
                      hide-default-footer
                    >
                    <template v-slot:item.actions="{ item }">
                      <v-icon
                        small
                        class="mr-2"
                        @click="editProduct(item)"
                      >
                        mdi-pencil
                      </v-icon>

                    </template>
                    </v-data-table>


                  </v-card>
                  <v-dialog v-model="productDialog" persistent hide-overlay max-width="800">
                            <template v-slot:activator="{ on, attrs }">
                            <v-btn class="mt-6"  dark color="red" v-on="on" v-bind="attrs">
                              Add Product<v-icon>mdi-plus</v-icon>
                            </v-btn>
                            </template>
                            <v-card>
                              <v-card-title>
                                <span class="headline">Product</span>
                              </v-card-title>
                              <v-divider  class="mb-6"></v-divider>
                              <v-card-text>

                                <v-select :items="types" item-value="type" v-model="productRecord.type" item-text="type" label="Type" ></v-select>
                                <v-text-field v-model="productRecord.name" label="Product Name"></v-text-field>
                                <v-text-field v-model="productRecord.price" label="Product Price"></v-text-field>
                                <v-text-field v-model="productRecord.description" label="Product Description"></v-text-field>


                              </v-card-text>

                              <v-card-actions class="pa-6">

                                <v-btn color="red"   large outlined @click="delProduct">DELETE</v-btn>
                                <v-spacer></v-spacer>
                                <v-btn color="secondary"  large light  outlined @click="closeProduct">Cancel</v-btn>
                                <v-btn color="red" large dark @click="saveProduct" :loading="isSaving">Save</v-btn>

                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                </v-tab-item>
                <v-tab-item>
                  <v-row>

                    <v-col v-for="(product, index) in record.products" :key="index" cols="12" sm="6" md="4">
                      <v-card>
                        <v-img src="http://via.placeholder.com/300x300"></v-img>
                        <v-card-title>{{product.name}}</v-card-title>
                        <v-card-subtitle>${{product.price}}</v-card-subtitle>
                        <v-card-text>
                          {{product.description}}
                        </v-card-text>
                      </v-card>
                    </v-col>


                  </v-row>
                </v-tab-item>

              </v-tabs>
</v-card-text>

  <v-divider  class="mb-3"></v-divider>
              <v-card-actions class="pa-6">

                  <v-btn color="red"   large outlined @click="del">DELETE</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="secondary"  large light  outlined @click="close">Close</v-btn>
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
      productRecord: {},
      search: null,
      dialog: false,
      productDialog: false,
      productIndex: null,
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

        this.isSaving = false;
        return;
      }
      this.isSaving = false;
      return;
    },
    async del(){
      var res = await this.$store.dispatch('dbDelete', {endpoint: 'campaigns/'+this.record._id });
      if(res) this.data = await this.$store.dispatch('dbQuery', {endpoint: 'campaigns/', params: {} });
      this.dialog = false;
      this.record = Object.assign({}, {});
    },
    editProduct(productRecord){
      this.productIndex = this.record.products.indexOf(productRecord);
      this.productRecord = Object.assign({}, productRecord);
      this.productDialog = true;
      console.log(this.productIndex);
    },
    closeProduct(){
      this.productIndex = null;
      this.productDialog = false;
      this.productRecord = Object.assign({}, {});
    },
    saveProduct(){
      if(!this.record.products)this.record.products = [];
      if(this.productIndex === null){
        this.record.products.push(this.productRecord);
      }else{
        this.record.products[this.productIndex] = this.productRecord;
      }
      this.productIndex = null;
      this.productRecord = Object.assign({}, {});
      this.productDialog = false;
    },
    delProduct(){
      this.record.products.splice(this.productIndex, 1);
      this.productIndex = null;
      this.productDialog = false;
      this.productRecord = Object.assign({}, {});
    }
  },
  async mounted(){
    this.types = await this.$store.dispatch('dbQuery', {endpoint: 'types/', params: {} });
    this.data = await this.$store.dispatch('dbQuery', {endpoint: 'campaigns/', params: {}});
    this.headers = [

      {
        text: 'Campaign',
        align: 'start',
        value: 'name',
      },{
        text: 'Link',
        align: 'start',
        value: '_id',
      },
      { text: 'Actions', value: 'actions', sortable: false },
    ];
    this.isLoading = false;

  }
}
</script>
<style scoped>

</style>
