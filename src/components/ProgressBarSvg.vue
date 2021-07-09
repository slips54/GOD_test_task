<template>
  <div class="div_100">
    <div class="progress-bar_overflow ovh" ref="progressBarOverflow">
      <img src="/progress.svg" alt="">
      <div class="progress-bar_overflow-move div_100 ovh" :style="{transform: 'translateY('+wrapper_pos+'%)'}">
        <img class="progress-bar_overflow-fill div_100" src="/progress_fill.svg" alt="" :style="{transform: 'translateY('+wrapper_pos_reverse+'%)'}">
      </div>
      <progress-bar-checkpoints-svg :checkpoints_active="checkpoints_active" />

    </div>
    <div class="bottom_spacer"></div>
    <inputs-block :params="params" class="progress-bar-inputs" @paramChanged="setParams"/>

  </div>
</template>

<script>

import ProgressBarCheckpointsSvg from "@/components/ProgressBarCheckpointsSvg";
import InputsBlock from "@/components/InputsBlock";

export default {
  name: 'ProgressBarSvg',
  components: {
    InputsBlock,
    ProgressBarCheckpointsSvg
  },
  data(){
    return{
      params: [
        {
          name: 'Number',
          value: 0
        }
      ],
      progress: 0,
      star_h: 0,
      checkpoints_active: 0,
      checkpoints: [300, 370, 415, 800, 870, 915, 1300]
    }
  },
  computed: {
    wrapper_pos: function(){
      return -100 - (-100 * this.progress);
    },
    wrapper_pos_reverse: function(){
      return 100 - (100 * this.progress);
    },
    checkpointsSteps: function(){
      let arr = [];
      this.checkpoints.forEach((v, i)=>{
        if(i === 0){
          arr.push(v);
        } else {
          arr.push(v - this.checkpoints[i-1])
        }
      })
      return arr;
    },
    stepPercent: function(){
      return 100 / this.checkpoints.length - this.star_h;
    }
  },
  mounted(){
    this.star_h = document.getElementsByClassName('progress-bar_star')[0].getBoundingClientRect().height / document.getElementsByClassName('progress-bar_overflow')[0].getBoundingClientRect().height *100;
  },
  methods: {
    setParams: function (){
      this.progress = 0;
      let p = 0;
      let pr = this.params[0].value;
      let count = 0;
      for (let v of this.checkpointsSteps){
        p = pr - v;
        if(p > 0){
          pr-=v;
          count++;
          this.progress += (this.stepPercent + this.star_h) / 100;
        } else
        if(p === 0){
          count++;
          this.progress += (this.stepPercent + this.star_h) / 100;
          break;
        } else {
          this.progress += (this.stepPercent * (pr / v) / 100);
          break;
        }
      }
      this.checkpoints_active = count;
      let scrollY = this.$refs.progressBarOverflow.clientHeight * this.progress;
      window.scrollTo({
        top: (scrollY < 400) ? 0: scrollY-400,
        behavior: "smooth"
      });
    }
  }
}
</script>