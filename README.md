### 参考慕课qq音乐music-app全手写实例

基于vue全家桶与部分开源vue组件
感谢qq音乐各种api的无私奉献 ^_^

#### 实现功能
- 主播放器/迷你模仿器切换
- banner轮播
- 推荐歌单/歌单详情页
- 音乐播放与切换/播放历史
- 音乐播放进度拖拽/滚动歌词联动
- 顺序/随机/循环 3种播放模式
- 歌手列表/详情页
- 歌手列表仿原生首字母touchmove事件联动
- 歌手/歌单排行榜
- 搜索歌曲/歌手
- 热门搜索/搜索历史
- 歌曲收藏
- loading
- 图片/路由懒加载
- 各种细节处理与transition动画

#### 涉及组件
- confirm 弹窗
- listview 联动列表
- loading 加载动画
- no-result 无数据提示
- progress-bar 可拖拽音乐进度
- progress-circle mini播放器圆形进度条
- disc 音乐播放disc转动动画效果
- scroll 基于better-scroll组件的简易封装
- search-box 搜索框
- search-list 记录列表
- slider 轮播
- song-list 榜单排行
- switches 选项卡效果实现
- top-tip tip提示

#### 如需预览请

>clone到本地

>$ cnpm i //未上传node_modules

>$ npm run dev

>http://localhost:8880/

#### 部分实例截图
###### 首页推荐
![第1张-首页推荐](https://github.com/shai2/mine-music-app/blob/master/static/1.png)
###### 歌手列表
![第2张-歌手列表](https://github.com/shai2/mine-music-app/blob/master/static/2.png)
###### 排行榜
![第3张-排行榜](https://github.com/shai2/mine-music-app/blob/master/static/3.png)
###### 搜索页面
![第4张-搜索页面](https://github.com/shai2/mine-music-app/blob/master/static/4.png)
###### 歌手歌曲
![第5张-歌手歌曲](https://github.com/shai2/mine-music-app/blob/master/static/5.png)
###### 播放页面
![第6张-播放页面](https://github.com/shai2/mine-music-app/blob/master/static/6.png)
###### 歌词滚动
![第7张-歌词滚动](https://github.com/shai2/mine-music-app/blob/master/static/7.png)
###### 播放列表
![第8张-播放列表](https://github.com/shai2/mine-music-app/blob/master/static/8.png)
###### 历史记录
![第9张-历史记录](https://github.com/shai2/mine-music-app/blob/master/static/9.png)
###### 榜单列表
![第10张-榜单列表](https://github.com/shai2/mine-music-app/blob/master/static/10.png)