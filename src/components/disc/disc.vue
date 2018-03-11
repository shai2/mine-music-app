<template>
    <transition name="slide">
        <MusicList :title="title" :bgImage="bgImage" :songs="songs"></MusicList>
    </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import {mapGetters} from 'vuex'
import {getSongList} from 'api/recommend'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'

export default{
    data(){
        return{
            songs:[]
        }
    },
    components:{
        MusicList
    },
    computed:{
        title(){
            return this.disc.dissname
        },
        bgImage(){
            return this.disc.imgurl
        },
        ...mapGetters([
            'disc'
        ])
    },
    methods:{
        _getSongList(){
            if (!this.disc.dissid) {
                this.$router.push('/recommend')
                return;
            };
            getSongList(this.disc.dissid).then((res)=>{
                if(res.code === ERR_OK){
                    this.songs = this._normalizeSongs(res.cdlist[0].songlist)
                }
            })
        },
        _normalizeSongs(list){
            let ret = []
            list.forEach((song)=>{
                if (song.songid && song.albumid) {
                    ret.push(createSong(song))
                };
            })
            return ret
        }
    },
    created(){
        this._getSongList()
    }
}
</script>

<style scoped lang="stylus">
@import "~common/stylus/variable"

.slide-enter-active,.slide-leave-active
    transition:all 0.3s
.slide-enter,.slide-leave-to
    transform:translate3d(100%,0,0)
</style>