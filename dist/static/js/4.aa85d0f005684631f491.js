webpackJsonp([4],{NSSj:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var s=e("4YfN"),i=e.n(s),a=e("kvay"),o=e("9rMa"),r=e("m40h"),c=e("T452"),u=e("PvFA"),d={data:function(){return{songs:[]}},components:{MusicList:a.a},computed:i()({title:function(){return this.disc.dissname},bgImage:function(){return this.disc.imgurl}},Object(o.c)(["disc"])),methods:{_getSongList:function(){var t=this;this.disc.dissid?Object(r.c)(this.disc.dissid).then(function(n){n.code===c.a&&(t.songs=t._normalizeSongs(n.cdlist[0].songlist))}):this.$router.push("/recommend")},_normalizeSongs:function(t){var n=[];return t.forEach(function(t){t.songid&&t.albumid&&n.push(Object(u.a)(t))}),n}},created:function(){this._getSongList()}},f={render:function(){var t=this.$createElement,n=this._self._c||t;return n("transition",{attrs:{name:"slide"}},[n("MusicList",{attrs:{title:this.title,bgImage:this.bgImage,songs:this.songs}})],1)},staticRenderFns:[]};var g=e("Z0/y")(d,f,!1,function(t){e("SXaY")},"data-v-3359a1c6",null);n.default=g.exports},SXaY:function(t,n){},m40h:function(t,n,e){"use strict";n.b=function(){var t=o()({},c.b,{platform:"h5",uin:0,needNewCode:1});return Object(r.a)("https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg",t,c.c)},n.a=function(){var t=o()({},c.b,{platform:"yqq",hostUin:0,sin:0,ein:29,sortId:5,needNewCode:0,categoryId:1e7,rnd:Math.random(),format:"json"});return d.a.get("/api/getDiscList",{params:t}).then(function(t){return i.a.resolve(t.data)})},n.c=function(t){var n=o()({},c.b,{disstid:t,type:1,json:1,utf8:1,onlysong:0,platform:"yqq",hostUin:0,needNewCode:0,format:"json"});return d.a.get("/api/getSongList",{params:n}).then(function(t){return i.a.resolve(t.data)})};var s=e("rVsN"),i=e.n(s),a=e("aA9S"),o=e.n(a),r=e("Gak4"),c=e("T452"),u=e("2sCs"),d=e.n(u)}});
//# sourceMappingURL=4.aa85d0f005684631f491.js.map