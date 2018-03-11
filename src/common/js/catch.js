import storage from 'good-storage'
const SEARCH_KEY = '__search__'
const SEARCH_MAX_LENGTH = 15 //最多15条 再多会替换掉早的 有重复的放在前面

const PLAY_KEY = '__play__'
const PLAY_MAX_LEN = 200

const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LEN = 200


export function loadSearch(){
    return storage.get(SEARCH_KEY, [])
}
export function loadFavorite(){
    return storage.get(FAVORITE_KEY, [])
}
export function loadPlay() {
  return storage.get(PLAY_KEY, [])
}
//------------------------------------------------------------------------------
// 把搜索记录添加到历史
export function saveSearch(query){
    let searches = storage.get(SEARCH_KEY,[]) //读取__search__ 没有的话 返回默认的[]
    insertArray(searches, query, (item)=>{
        return item === query
    }, SEARCH_MAX_LENGTH)

    storage.set(SEARCH_KEY, searches)
    return searches
}

//插入storage的方法\插入facorite  compare是用来比较的function
function insertArray(arr, val, compare, maxLen){
    const index = arr.findIndex(compare)
    if (index === 0) {
        return
    };
    if (index > 0) {
        arr.splice(index, 1)
    };
    arr.unshift(val)
    if (maxLen && arr.length>maxLen) {
        arr.pop()
    };

}
//------------------------------------------------------------------------------
// 删除历史记录
export function deleteSearch(query){
    let searches = storage.get(SEARCH_KEY,[]) //读取__search__ 没有的话 返回默认的[]
    deleteFromArray(searches, (item)=>{
        return item === query
    })

    storage.set(SEARCH_KEY, searches)
    return searches
}
//删除storage的方法\删除facorite
function deleteFromArray(arr, compare){
    const index =arr.findIndex(compare)
    if (index>-1) {
        arr.splice(index, 1)
    };
}//------------------------------------------------------------------------------
// 清空历史记录
export function clearSearch(){
    storage.set(SEARCH_KEY, [])
    return searches
}
//------------------------------------------------------------------------------
// 添加喜欢歌曲
export function saveFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, FAVORITE_MAX_LEN)
  storage.set(FAVORITE_KEY, songs)
  console.log('执行到添加歌曲',songs)
  return songs
}
// 移除喜欢歌曲
export function deleteFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  console.log(songs)
  deleteFromArray(songs, (item) => {
    return item.id === song.id
  })
  storage.set(FAVORITE_KEY, songs)
  console.log('执行到移除歌曲',songs)
  return songs
}
//------------------------------------------------------------------------------
// 添加播放历史
export function savePlay(song) {
  let songs = storage.get(PLAY_KEY, [])
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, PLAY_MAX_LEN)
  storage.set(PLAY_KEY, songs)
  return songs
}