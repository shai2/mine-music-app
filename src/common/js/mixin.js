import {mapGetters,mapMutations,mapActions} from 'vuex'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'

export const playListMixin = {
    computed:{
        ...mapGetters([
            'playList'
        ])
    },
    methods:{
        handlePlayList(){
            throw new Error('handlePlayList()未定义')
        }
    },
    mounted(){
        this.handlePlayList(this.playList)
    },
    activated(){
        this.handlePlayList(this.playList)
    },
    watch:{
        playList(newVal){
            this.handlePlayList(newVal)
        }
    }
}

export const playerMixin = {
    computed:{
        iconMode(){
          return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
        },
        ...mapGetters([
            'sequenceList',
            'currentSong',
            'playList',
            'mode',
            'favoriteList'
        ])
    },
    methods:{
        changeMode(){
            const mode = (this.mode+1) % 3
            this.setPlayMode(mode)
            let list = null
            if (mode === playMode.random) {
            list = shuffle(this.sequenceList)
        }else{
            list = this.sequenceList
        }
        this.resetCurrentIndex(list) //传入打乱数组
        this.setPlayList(list)
        },
        resetCurrentIndex(list){
            let index = list.findIndex((item)=>{
            return item.id === this.currentSong.id //找到打乱数组中当前歌曲的索引（id相同）
            })
            this.setCurrentIndex(index) //把index改成打乱数组的index
        },
        getFavoriteIcon(song) {
            if (this.isFavorite(song)) {
                return 'icon-favorite'
            }
            return 'icon-not-favorite'
        },
        toggleFavorite(song) {
            if (this.isFavorite(song)) {
                this.deleteFavoriteList(song)
            } else {
                this.saveFavoriteList(song)
            }
        },
        isFavorite(song) {
            const index = this.favoriteList.findIndex((item) => {
                return item.id === song.id
            })
            return index > -1 //Boolean index不是-1说明找到了 为有这首歌
        },
        ...mapMutations({
            setPlayingState : "SET_PLAYING_STATE",
            setCurrentIndex : "SET_CURRENT_INDEX",
            setPlayMode : "SET_PLAY_MODE",
            setPlayList : "SET_PLAYLIST"
        }),
        ...mapActions([
            'saveFavoriteList',
            'deleteFavoriteList'
        ]),

    }
}

export const searchMixin = {
    data() {
        return {
            query: '',
            refreshDelay: 120 //不想要
        }
    },
    methods:{
        onQueryChange(txt){
            this.query = txt
        },
        blurInput(){
            this.$refs.searchBox.blur()
        },
        addQuery(e){
            this.$refs.searchBox.setQuery(e)
        },
        saveSearch(){
            this.saveSearchHistory(this.query)
        },
        ...mapActions([
            'saveSearchHistory',
            'deleteSearchHistory',
            'clearSearchHistory'
        ])
    },
    computed:{
        ...mapGetters([
            'searchHistory'
        ])
    }
}