<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn"
        @touchstart.prevernt="progressTouchStart"
        @touchmove.prevernt="progressTouchMove"
        @touchend="progressTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {prefixStyle} from 'common/js/dom'
const transform = prefixStyle('transform')

export default{
  props:{
    percent:{
      type:Number,
      default:0
    }
  },
  methods:{
    progressClick(e){
      // this._offset(e.offsetX) 这句错的 点到条是对的 点按钮是错的
      const rect = this.$refs.progressBar.getBoundingClientRect()
      const offsetWidth = e.pageX - rect.left
      this._offset(offsetWidth)
      this._triggerPercent()
    },
    progressTouchStart(e){
      this.touch.init = true
      this.touch.startX = e.touches[0].pageX
      this.touch.left = this.$refs.progress.clientWidth
    },
    progressTouchMove(e){
      if (!this.touch.init) return;
      const deltaX = e.touches[0].pageX - this.touch.startX
      const offsetWidth = Math.min(this.$refs.progressBar.clientWidth,Math.max(0,this.touch.left + deltaX))
      this._offset(offsetWidth)
    },
    progressTouchEnd(){
      this.touch.init = false
      this._triggerPercent()
    },
    _triggerPercent(){
      const barWidth = this.$refs.progressBar.clientWidth - 16
      const percent = this.$refs.progress.clientWidth/barWidth
      this.$emit('percentChange',percent)
    },
    _offset(offsetWidth){
      this.$refs.progress.style.width = `${offsetWidth}px`
      this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`
    }
  },
  created(){
    this.touch = {}
  },
  watch:{
    percent(newPercent){
      if (newPercent>=0 && !this.touch.init) { //保证拖动优先级 没有拖动过程的中才自动改变条长度
        const barWidth = this.$refs.progressBar.clientWidth - 16
        const offsetWidth = newPercent * barWidth
        this._offset(offsetWidth)
      };
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>