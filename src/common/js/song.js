import {getLyric} from 'api/song'
import {ERR_OK} from 'api/config'
import {base64} from 'js-base64'

export default class Song{
    constructor({id,mid,singer,name,album,duration,image,url}){
        this.id = id
        this.mid = mid
        this.singer = singer
        this.name = name
        this.album = album
        this.duration = duration
        this.image = image
        this.url = url
    }

    getLyric(){ // 返回一个Promidse
        // 重复到歌单不重复请求
        if (this.lyric) {
            return Promise.resolve(this.lyric)
        }else{
            return new Promise((resolve,reject)=>{
                getLyric(this.mid).then((res)=>{
                    if (res.retcode === ERR_OK) {
                        this.lyric = Base64.decode(res.lyric)
                        resolve(this.lyric)
                    }else{
                        reject('no lyric')
                    }
                })
            })

        }
    }
}

export function createSong(musicData){
    return new Song({
        id : musicData.songid,
        mid : musicData.songmid,
        singer : filterSinger(musicData.singer),
        name : musicData.songname,
        album : musicData.albumname,
        duration : musicData.interval,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
        url: `http://isure.stream.qqmusic.qq.com/C100${musicData.songmid}.m4a?fromtag=32`
    })
}

function filterSinger(singer){
    let ret = []
    if (singer) {
        singer.forEach((e)=>{
            ret.push(e.name)
        })
    };
    return ret.join('/')
}