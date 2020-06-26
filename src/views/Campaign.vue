<template>
  <div class="campaign">
    <div class="container">

    <h1>{{campaign.name}}</h1>


    <div class="row">
      <div class="col-12 col-sm-6 col-md-4" v-for="(product, index) in campaign.products" :key="index">
        <v-card>
          <v-img src="http://via.placeholder.com/300x300"></v-img>
          <v-card-title>{{product.name}}</v-card-title>
          <v-card-subtitle>${{product.price}}</v-card-subtitle>
          <v-card-text>
            {{product.description}}
            <p class="mt-6"><v-btn @click="addToCart(product)" color="red" dark small>Add to Cart</v-btn></p>
          </v-card-text>
        </v-card>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <h2>My Order</h2>
   
        <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Qty</th>
          <th class="text-left">Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cart" :key="item.name">
          <td>{{ item.name }}</td>
          <td>{{ item.qty }}</td>
          <td>${{ item.price }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
      </div>
    </div>


</div>

  </div>
</template>

<script>

export default {
  name: 'Campaign',
  data: () => ({
    campaign: {},
    order: []
  }),
  computed: {
    cart(){
      return this.reduced.map(item => {
        var tally = 0;
        for(let counted of this.order){
          console.log(counted);
          if( counted == item) tally += 1;
        }
        item.qty = tally;
        return item;
      });
    },
    reduced(){
      return this.order.reduce((sum, val) => {
        for (let i in sum) {
            if (sum[i] === val) {
              return sum;
            }
        }
        sum.push(val);
        return sum;
      }, []);
    }
  },
  components: {
  },
  methods:{
    addToCart(product){
      this.order.push(product);
    }
  },
  async mounted(){
    console.log();
    const res = await this.$store.dispatch('dbQuery', {endpoint: 'campaigns/', params: {"_id": this.$route.params.id} });
    this.campaign = res[0];
  }
}
</script>
<style scoped>
h1{font-weight: normal}
</style>
