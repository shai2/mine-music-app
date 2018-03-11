<template>
  <Scroll class="suggest"
    :data="result"
    :pullup="pullup"
    :pulldown="pulldown"
    :probeType="3"
    :beforeScroll="beforeScroll"
    @scrollToEnd="searchMore"
    @scrollToStart="refresh"
    @beforeScroll="listScroll"
    ref="suggestScroll"
  >
    <ul class="suggest-list">
      <p class="tip" v-show="pulldown">松手刷新</p>
      <Loading v-show="!pulldown" title="刷新中..."></Loading>
      <li @click="selectItem(item)" v-for="item in result" class="suggest-item">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <Loading v-show="hasMore" title="加载中..."></Loading>
    </ul>
    <div class="no-result-wrapper">
      <NoResult v-show="!hasMore && !result.length" title="暂无搜索结果"></NoResult>
    </div>
  </Scroll>
</template>

<script>
import {search} from 'api/search'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import Singer from 'common/js/singer'
import {mapMutations,mapActions} from 'vuex'
import NoResult from 'base/no-result/no-result'

const TYPE_SINGER = 'singer'
const perpage = 20

export default{
  data(){
    return{
      page:1,
      result:[],
      pullup:true,
      pulldown:true,
      hasMore:false,
      beforeScroll:true
    }
  },
  props:{
    query:{
      type:String,
      default:''
    },
    showSinger:{
      type:Boolean,
      default:true
    }
  },
  methods:{
    listScroll(){
      this.$emit('listScroll')
    },
    selectItem(item){
      if (item.type === TYPE_SINGER) {
        const singer = new Singer({
          id: item.singermid,
          name: item.singername
        })
        this.$router.push({
          path:`/search/${singer.id}`
        })
        this.setSinger(singer)
      }else{
        this.insertSong(item)
      }
      this.$emit('select',item)
    },
    search(){
      this.page = 1 //searchMore会改变page
      this.$refs.suggestScroll.scrollTo(0,0)
      this.hasMore = true
      search(this.query,this.page,this.showSinger,perpage).then((res)=>{
        if (res.code === ERR_OK) {
          // console.log(this._genResult(res.data))
          this.result = this._genResult(res.data)
          this._checkMore(res.data)
          console.log('第一次请求')
        }
      })
    },
    searchMore(){
      if (this.hasMore) {
        // this.hasMore = false //不能加 会导致计算时没有loading位置错误
        this.page++
        search(this.query,this.page,this.showSinger,perpage).then((res)=>{
          if (res.code === ERR_OK) {
            // console.log(this._genResult(res.data))
            this.result = this.result.concat(this._genResult(res.data))
            this._checkMore(res.data)
            console.log('继续请求')
          }
        })
      };
    },
    refresh(){
      if (this.pulldown) {
        this.pulldown = false
        this.page = 1
        search(this.query,this.page,this.showSinger,perpage).then((res)=>{
          if (res.code === ERR_OK) {
            // console.log(this._genResult(res.data))
            this.result = this._genResult(res.data)
            this._checkMore(res.data)
            this.pulldown = true
            console.log('刷新')
          }
        })
      };
    },
    _checkMore(data){
      const song = data.song
      if (!song.list.length || (song.curnum + song.curpage*perpage)>=song.totalnum) {
        this.hasMore = false
      }else{
        this.hasMore = true
      }
    },
    _genResult(data){
      let ret = []
      if (data.zhida && data.zhida.singerid) {
        ret.push({...data.zhida, ...{type: TYPE_SINGER}})
      };
      if (data.song) {
        ret = ret.concat(this._normalizeSongs(data.song.list))
      };
      return ret
    },
    _normalizeSongs(list){
      let ret = []
      list.forEach((item)=>{
        if (item.songid && item.albumid) {
          ret.push(createSong(item))
        };
      })
      return ret
    },
    getIconCls(item){
      return item.type === TYPE_SINGER ? 'icon-mine' : 'icon-music'
    },
    getDisplayName(item){
      return item.type === TYPE_SINGER ? item.singername : `${item.name} - ${item.singer}`
    },
    ...mapMutations({
        setSinger:'SET_SINGER'
    }),
    ...mapActions([
      'insertSong'
    ])
  },
  watch:{
    query(newQuery){
      this.search()
    }
  },
  components:{
    Scroll,
    Loading,
    NoResult
  }
}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .loading
        padding-bottom:25px
      .tip
        font-size:14px
        color: rgba(255,255,255,0.1)
        width:100%
        text-align:center
        transform:translateY(-25px)
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>