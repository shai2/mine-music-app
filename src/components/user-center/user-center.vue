<template>
  <transition name="slide">
    <div class="user-center">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
      <div class="switches-wrapper">
        <Switches @switch="switchItem" :currentIndex="currentIndex" :switches="switches"></Switches>
      </div>
      <div ref="playBtn" class="play-btn" @click="random">
        <i class="icon-play"></i>
        <span class="text" @click="random">随机播放全部</span>
      </div>
      <div class="list-wrapper" ref="listWrapper">
        <!-- 我喜欢的 -->
        <Scroll ref="favoriteList" v-if="currentIndex===0" class="list-scroll" :data="favoriteList">
          <div class="list-inner">
            <SongList :songs="favoriteList" @select="selectSong">
            </SongList>
          </div>
        </Scroll>
        <!-- 最近听的 -->
        <Scroll ref="playList" v-if="currentIndex===1" class="list-scroll"
                :data="playHistory">
          <div class="list-inner">
            <SongList :songs="playHistory" @select="selectSong">
            </SongList>
          </div>
        </Scroll>
      </div>
      <div class="no-result-wrapper" v-show="noResult">
        <NoResult :title="noResultDesc"></NoResult>
      </div>
    </div>
  </transition>
</template>

<script>
import Switches from 'base/switches/switches'
import Scroll from 'base/scroll/scroll'
import NoResult from 'base/no-result/no-result'
import SongList from 'base/song-list/song-list'
import Song from 'common/js/song'
import {mapGetters,mapActions} from 'vuex'
import {playListMixin} from 'common/js/mixin'

export default{
  mixins:[playListMixin],
  data(){
    return{
      currentIndex:0,
      switches:[
        {name: '我喜欢的'},
        {name: '最近听的'}
      ]
    }
  },
  methods:{
    handlePlayList(playList){
      const bottom = playList.length > 0 ? '60px' : '0'
      this.$refs.listWrapper.style.bottom = bottom
      if(this.$refs.favoriteList) this.$refs.favoriteList.refresh()
      if(this.$refs.playList) this.$refs.playList.refresh()
    },
    random(){
      if (list.length === 0) {
        return
      };
      let list = this.currentIndex === 0 ? this.favoriteList : this.playHistory //根据switch判断左页还是右页
      list = list.map((e)=>{
        return new Song(e)
      })
      this.randomPlay({list})
    },
    back(){
      this.$router.back()
    },
    showIndex(){
      console.log(this.favoriteList)
    },
    switchItem(index){
      this.currentIndex = index
    },
    selectSong(song){
      this.insertSong(new Song(song))
    },
    ...mapActions([
      'insertSong',
      'randomPlay'
    ])
  },
  computed:{
    noResult(){
      if (this.currentIndex === 0) {
        return !this.favoriteList.length //空的时候!this.favoriteList.length===true
      }else{
        return !this.playHistory.length
      }
    },
    noResultDesc(){
      if (this.currentIndex === 0) {
        return '暂无收藏歌曲'
      }else{
        return '你还没有听过歌曲'
      }
    },
    ...mapGetters([
      'favoriteList',
      'playHistory'
    ])
  },
  components:{
    Switches,
    Scroll,
    SongList,
    NoResult
  }
}
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"

  .user-center
    position: fixed
    top: 0
    bottom: 0
    z-index: 100
    width: 100%
    background: $color-background
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .switches-wrapper
      margin: 10px 0 30px 0
    .play-btn
      box-sizing: border-box
      width: 135px
      padding: 7px 0
      margin: 0 auto
      text-align: center
      border: 1px solid  $color-text-l
      color: $color-text-l
      border-radius: 100px
      font-size: 0
      .icon-play
        display: inline-block
        vertical-align: middle
        margin-right: 6px
        font-size: $font-size-medium-x
      .text
        display: inline-block
        vertical-align: middle
        font-size: $font-size-small
    .list-wrapper
      position: absolute
      top: 110px
      bottom: 0
      width: 100%
      .list-scroll
        height: 100%
        overflow: hidden
        .list-inner
          padding: 20px 30px
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>