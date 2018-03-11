<template>
  <div id="app">
    <MHeader></MHeader>
    <tab></tab>
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
    <Player></Player>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header'
import Tab from 'components/tab/tab'
import Player from 'components/player/player.vue'

export default {
  data(){
    return{

    }
  },
  components:{
    MHeader,
    Tab,
    Player
  },
  created(){

  }
}
</script>

<style lang="stylus">

</style>