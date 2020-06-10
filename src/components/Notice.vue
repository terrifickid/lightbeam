<template>
<div>
  <v-snackbar v-model="notice.show" :color="notice.color" :right="true" :timeout="3000" :top="true">
  <b>{{notice.color}}</b>{{notice.message}}
  </v-snackbar>
</div>
</template>

<script>
  export default {
    name: 'Notice',
    data: () => ({

    }),

    computed:{
      notice:{
        get(){
           return this.$store.getters.getNotice;
        },
        set(){
        console.log('set');
          this.$store.commit('setNotice', this.notice);
        }
      },
    },
  }
</script>
<style scoped>
b,span{text-transform: uppercase;}
</style>
