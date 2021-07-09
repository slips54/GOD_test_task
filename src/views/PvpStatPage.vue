<template>
  <div class="pvp-stat_page div_100">
    <div class="pvp-stat-container">
      <h2>PVP СТАТИСТИКА</h2>
      <div class="pvp-stat_canvas-wrapper">
        <div class="pvp_stat-inputs">
          <inputs-block :params="stats" @paramChanged="redrawRating()" />
        </div>
        <canvas class="pvp-stat_pentagon div_100" ref="myCanvas"></canvas>
        <div class="pvp-stat_param-item"
             v-for="(param, index) in param_positions.canvas_outer"
             :key="index"
             :style="{left: param[0]+'px', top: param[1]+'px'}"
             :class="'n'+index">
          <div class="label">{{stats[index].name}}</div>
          <div class="value">{{getPercent(stats[index])}}%</div>
        </div>
        <div class="pvp-stat_canvas-wrapper_rating div_100">
          <div class="pvp-stat_param-point"
               v-for="(param, index) in points_pos"
               :key="index"
               :style="{left: param[0]+'px', top: param[1]+'px'}"
               :class="'n'+index">
          </div>
          <div class="pvp-stat_rating div_100">
            <div class="title">РЕЙТИНГ</div>
            <div class="value">{{ratingValue}}</div>
            <div class="value_top">ТОП-{{topPercent}}%</div>
          </div>
        </div>
      </div>


    </div>
  </div>
</template>

<script>

import InputsBlock from "@/components/InputsBlock";

export default {
  components: {
    InputsBlock
  },
  data(){
    return {
      ctx: null,
      param_positions: {
        canvas_outer: [],
        rating_canvas: [],
        canvas_inner_border: []
      },
      points_pos: [],
      stats: [
        {
          name: 'Убийств',
          value: 0,
          max: 400
        },
        {
          name: 'Помощь',
          value: 0,
          max: 100
        },
        {
          name: 'Убийств в подкате',
          value: 0,
          max: 320
        },
        {
          name: 'Убийств в голову',
          value: 0,
          max: 235
        },
        {
          name: 'Смертей',
          value: 0,
          max: 375
        }
      ]
    }
  },
  computed: {
    stats_count: function(){
      return this.stats.length;
    },
    topPercent: function(){
      return this.stats.reduce((acc, v)=>{
        let p = this.getPercent(v);
          if(acc < p) {
            return Number(p);
          } else{
            return acc;
          }
      }, 0);
    },
    ratingValue: function(){
      let rating = this.stats.reduce((acc, v)=>{
        let p = this.getPercent(v);
        return (acc + p);
      }, 0) / this.stats_count;
      return Math.round(rating*10);
    }
  },
  mounted() {
    setTimeout(()=>{
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },0)

    const canvas_outer = this.$refs.myCanvas;
    const rating_canvas = canvas_outer;
    this.drawPentagon(canvas_outer, 2, 'canvas_outer', {strokeStyle: '#A8A8A8', lineWidth :10});
    this.drawPentagon(canvas_outer, 2.3, 'canvas_inner_border', {strokeStyle: 'transparent', lineWidth :1});
    this.drawPentagon(rating_canvas, 3.5, 'rating_canvas', {strokeStyle: 'rgba(168, 168, 168, 0.3)', lineWidth :1});
  },
  methods: {
    drawPentagon: function(canvas, divider, pos_arr_id, style){
      if(this.ctx === null){
        this.ctx = canvas.getContext('2d');
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
      }

      var numberOfSides = this.stats_count,
          size = canvas.width / divider,
          Xcenter = canvas.width / 2,
          Ycenter = canvas.width / 2 + 10,
          step  = 2 * Math.PI / numberOfSides,
          shift = (Math.PI / 180.0) * -18;

      this.ctx.lineCap = 'round';
      this.ctx.beginPath();
      var local_param_pos = [];
      for (var i = 0; i <= numberOfSides;i++) {
        var curStep = i * step + shift;
        let x = Xcenter + size * Math.cos(curStep);
        let y = Ycenter + size * Math.sin(curStep);
        if(numberOfSides !== i){
          local_param_pos.push([x, y]);
        }
        this.ctx.lineTo(x, y);
      }

      this.ctx.strokeStyle = style.strokeStyle;
      this.ctx.lineWidth = style.lineWidth;
      this.ctx.stroke();
      this.ctx.closePath();
      this.param_positions[pos_arr_id] = local_param_pos.slice();
      if(pos_arr_id === 'rating_canvas'){
        this.points_pos = local_param_pos.slice();
      }
    },
    getPercent: function(stat){
      return Math.min(Math.round(stat.value / stat.max * 100), 100);
    },
    redrawRating: function(){
      this.ctx.clearRect(0, 0, 500, 500);
      this.drawPentagon(this.$refs.myCanvas, 2, 'canvas_outer', {strokeStyle: '#A8A8A8', lineWidth : 10});
      this.ctx.lineCap = 'round';
      this.ctx.beginPath();
      for (var i = 0; i <= this.stats_count;i++) {
        let counter = (i === this.stats_count) ? 0: i;
        let [x, y] = this.param_positions.rating_canvas[counter];
        let [maxX, maxY] = this.param_positions.canvas_inner_border[counter];
        let percent = 1 - this.getPercent(this.stats[counter])/100;
        let deltaX = (maxX - x) * percent;
        let deltaY = (maxY - y) * percent;
        x = maxX - deltaX;
        y = maxY - deltaY;
        this.points_pos[counter] = [x, y].slice();
        this.ctx.lineTo(x, y);
      }
      this.ctx.strokeStyle = "rgba(168, 168, 168, 0.3)";
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }
}

</script>
