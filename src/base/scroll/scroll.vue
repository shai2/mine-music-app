<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default{
  props:{
    probeType:{
      type:Number,
      default:1
    },
    click:{
      type:Boolean,
      default:true
    },
    data:{
      type:Array,
      default:null
    },
    listenScroll:{
      type:Boolean,
      default:false
    },
    eventPassthrough:{
      type:String,
      default:''
    },
    pullup:{
      type:Boolean,
      default:false
    },
    pulldown:{
      type:Boolean,
      default:false
    },
    beforeScroll:{
      type:Boolean,
      default:false
    }

  },
  methods:{
    _initScroll(){
      if(this.$refs.wrapper){
        this.scroll = new BScroll(this.$refs.wrapper,{
          probeType:this.probeType,
          click:this.click,
          eventPassthrough:this.eventPassthrough
        })

        if (this.listenScroll) {
          let _this = this
          this.scroll.on('scroll',(pos)=>{
            _this.$emit('scroll',pos)
          })
        }
      }
      if (this.pullup) {
        this.scroll.on('scrollEnd',()=>{
          if (this.scroll.y < this.scroll.maxScrollY+50) {
            this.$emit('scrollToEnd')
          };
        })
      };
      if (this.pulldown) {
        this.scroll.on('touchEnd',()=>{
          if (this.scroll.y > 30) {
            this.$emit('scrollToStart')
          };
        })
      };
      if (this.beforeScroll) {
        this.scroll.on('beforeScrollStart',()=>{
          this.$emit('beforeScroll')
        })
      };
    },
    enable(){
      if(this.scroll) this.scroll.enable();
    },
    disable(){
      if (this.scroll) this.scroll.disable();
    },
    refresh(){
      if (this.scroll) this.scroll.refresh();
    },
    scrollTo(){
      if (this.scroll) this.scroll.scrollTo.apply(this.scroll,arguments);
    },
    scrollToElement(){
      if (this.scroll) this.scroll.scrollToElement.apply(this.scroll,arguments);
    }
  },
  mounted(){
    this.$nextTick(()=>{
      this._initScroll()
    })

  },
  watch:{
    data(){
      this.$nextTick(()=>{
        this.scroll.refresh()
      })
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
