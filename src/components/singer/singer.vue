<template>
    <div class="singer" ref="singer">
         <ListView @select="selectSinger" :data="singers" ref="list"></ListView>
         <router-view></router-view>
    </div>
</template>

<script>
import {getSingerList} from 'api/singer'
import {ERR_OK} from 'api/config'
import Singer from 'common/js/singer'
import ListView from 'base/listview/listview'
import {mapMutations} from 'vuex'
import {playListMixin} from 'common/js/mixin'

const HOT_NAME = '热门'
const HOT_LEN ='10'

export default{
    mixins:[playListMixin],
    data(){
        return{
            singers:[]
        }
    },
    methods:{
        handlePlayList(){
            const bottom = this.playList.length>0 ? '60px' : '0'
            this.$refs.singer.style.bottom = bottom
            this.$refs.list.refresh()
        },
        selectSinger(singer){
            this.$router.push({
                path:`/singer/${singer.id}`
            })
            this.setSinger(singer)
        },
        _getSingerList(){
            getSingerList().then((res)=>{
                if(res.code === ERR_OK){
                    this.singers = this._normalizeSinger(res.data.list)
                }
            })
        },
        _normalizeSinger(list){
            let map = {
                hot:{
                    title:HOT_NAME,
                    items:[]
                }
            }
            list.forEach((e,i)=>{
                if (i<HOT_LEN) {
                    map.hot.items.push(
                        new Singer({
                            id:e.Fsinger_mid,
                            name:e.Fsinger_name
                        })
                    )
                };
                const key = e.Findex
                if (!map[key]) {
                    map[key]={
                        title:key,
                        items:[]
                    }
                };
                map[key].items.push(
                    new Singer({
                        id:e.Fsinger_mid,
                        name:e.Fsinger_name
                    })
                )
            })

            let hot = [];
            let letter = [];
            for(let i in map){
                let val = map[i];
                if (val.title.match(/[a-zA-Z]/)) {
                    letter.push(val)
                }else if(val.title === HOT_NAME){
                    hot.push(val)
                }
            }
            letter.sort((a,b)=>{
                return a.title.charCodeAt(0) - b.title.charCodeAt(0)
            })
            return hot.concat(letter)
        },
        ...mapMutations({
            setSinger:'SET_SINGER'
        })
    },
    created(){
        this._getSingerList();
    },
    components:{
        ListView
    }
}
</script>

<style lang="stylus" scoped>
.singer
    position:fixed
    top:88px
    bottom:0
    width:100%
</style>