<template>
  <v-alert v-if="notice" outlined type="error" text >
    {{notice.error}}
  </v-alert>
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
        }
      },
    },
  }
</script>
