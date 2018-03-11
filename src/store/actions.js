import * as types from './mutations-types'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'
import {saveSearch,deleteSearch,clearSearch,saveFavorite,deleteFavorite,savePlay} from 'common/js/catch'

export const selectPlay = function({commit,state},{list,index}){
    commit(types.SET_SEQUENCE_LIST,list)
    if (state.mode === playMode.random) {
        let randomList = shuffle(list)
        commit(types.SET_PLAYLIST,randomList)
        index = findIndex(randomList,list[index])
    }else{
        commit(types.SET_PLAYLIST,list)
    }
    commit(types.SET_CURRENT_INDEX,index)
    commit(types.SET_FULL_SCREEN,true)
    commit(types.SET_PLAYING_STATE,true)
}

export const randomPlay = function({commit,state},{list}){
    commit(types.SET_PLAY_MODE,playMode.random)
    commit(types.SET_SEQUENCE_LIST,list)
    commit(types.SET_PLAYLIST,shuffle(list))
    commit(types.SET_CURRENT_INDEX,0)
    commit(types.SET_FULL_SCREEN,true)
    commit(types.SET_PLAYING_STATE,true)
}

function findIndex(list,song){
    return list.findIndex((item)=>{
        return item.id === song.id
    })
}

export const insertSong = function({commit,state},song){
    let playList = state.playList.slice() //等价于.slice(0) 创建了副本 不能直接赋值成state.playList 下边playList.splice()等价于state.playList.slice() 是对state修改 除mutations外修改state都会报错
    let sequenceList = state.sequenceList.slice()
    let currentIndex = state.currentIndex //这个不会报错 state.currentIndex是个值 这句是变量赋值
    let currentSong = playList[currentIndex]

    // 加入到播放列表
    let findPlayingIndex = findIndex(playList, song) //找到插入歌曲在播放列表中的index

    currentIndex++ //插入当前播放索引下一个
    playList.splice(currentIndex,0,song) //插入当前歌曲

    if (findPlayingIndex>-1) { //有要插入的这首歌
        if (currentIndex > findPlayingIndex) { //这首歌在当前播放之前
            playList.splice(findPlayingIndex,1)
            currentIndex-- //在当前播放之前删了一个 所以index -1
        }else{ //这首歌在当前播放之后
            playList.splice(findPlayingIndex+1 ,1) //前边插入自身歌曲 长度加了1
        }
    };
    // 加入到sequence列表
    let currentSongIndex = findIndex(sequenceList,currentSong) + 1 //找到要插入位置的index值
    let findSongIndex = findIndex(sequenceList,song)

    sequenceList.splice(currentSongIndex, 0, song)
    if (findSongIndex > -1) {
        if (currentSongIndex > findSongIndex) {
            sequenceList.splice(findSongIndex, 1)
        }else{
            sequenceList.splice(findSongIndex+1, 1)
        }
    };

    commit(types.SET_PLAYLIST, playList)
    commit(types.SET_SEQUENCE_LIST, sequenceList)
    commit(types.SET_CURRENT_INDEX, currentIndex)
    commit(types.SET_FULL_SCREEN,true)
    commit(types.SET_PLAYING_STATE,true)
}

export const saveSearchHistory = function({commit,state},query){
    commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

export const deleteSearchHistory = function({commit,state},query){
    commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

export const clearSearchHistory = function({commit,state}){
    commit(types.SET_SEARCH_HISTORY, clearSearch())
}

export const saveFavoriteList = function({commit,state}, song){
    commit(types.SET_FAVORITE_LIST, saveFavorite(song))
}

export const deleteFavoriteList = function ({commit,state}, song) {
    commit(types.SET_FAVORITE_LIST, deleteFavorite(song))
}
// 删除歌曲
export const deleteSong = function({commit,state}, song){
    let playList = state.playList.slice()
    let sequenceList = state.sequenceList.slice()
    let currentIndex = state.currentIndex

    let playIndex = findIndex(playList, song)
    playList.splice(playIndex, 1)
    let sequenceIndex = findIndex(sequenceList, song)
    sequenceList.splice(sequenceIndex, 1)
    // console.log(currentIndex,playIndex)
    if (currentIndex > playIndex || currentIndex===playList.length) {
        currentIndex--
    }
    commit(types.SET_PLAYLIST, playList)
    commit(types.SET_SEQUENCE_LIST, sequenceList)
    commit(types.SET_CURRENT_INDEX, currentIndex)

    // 列表删成空
    if (!playList.length) {
        commit(types.SET_PLAYING_STATE, false)
    }else{
        // commit(types.SET_PLAYING_STATE,true)
    }
}
// 清空歌曲
export const deleteSongList = function({commit,state}){
    commit(types.SET_PLAYLIST,[])
    commit(types.SET_SEQUENCE_LIST,[])
    commit(types.SET_CURRENT_INDEX,-1)
    commit(types.SET_PLAYING_STATE,false)
}

// 保存播放历史
export const savePlayHistory = function ({commit}, song) {
    commit(types.SET_PLAY_HISTORY, savePlay(song))
}