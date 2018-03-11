import {playMode} from 'common/js/config'
import {loadSearch,loadFavorite,loadPlay} from 'common/js/catch'

const state = {
    singer:{},
    playing:false,
    fullScreen:false,
    playList:[],
    sequenceList:[], //随机播放时不与playlist一样
    mode:playMode.sequence,
    currentIndex:-1, //当前播放的index;currentSong=playList[currentIndex]
    disc:{},
    topList:{},
    searchHistory:loadSearch(),
    favoriteList:loadFavorite(),
    playHistory: loadPlay()
}

export default state