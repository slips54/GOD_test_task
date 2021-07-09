<template>
  <div class="prizelist_page div_100">
    <prize-list v-if="data_loaded" :classes="classes"  :archetypes="archetypes">
      <template #prizelist-weapons-bg>
        <div class="prizelist_weapons-bg div_100 bg-cover ovh" style="background-image: url('/prizelist_bg.svg');">
          <video id="prizelist_weapons-bg_video" class="video_bg"
                 v-if="video_bg"
                 src="/video/test.mp4"
                 loop autoplay muted
                 @loadedmetadata="getVideoDimensions"
                 :style="video_style"
          ></video>
        </div>
      </template>
    </prize-list>
  </div>
</template>

<script>

import PrizeList from '@/components/PrizeList.vue';

export default {
  name: 'PrizeListPage',
  components: {
    PrizeList
  },
  data(){
    return {
      archetypes: {},
      classes: {},
      data_loaded: false,
      video_bg: false,
      video_style: {
        width: 0,
        height: 0
      }
    }
  },
  created() {
    this.getPrizeList();
  },
  methods : {
    getPrizeList : async function (){
      const f = await fetch("/data/prizelist.json");
      const prize_list_data = await f.json();
      this.archetypes = prize_list_data.archetypes;
      this.classes = prize_list_data.classes;
      this.data_loaded = true;
    },
    getVideoDimensions: function(e){
      const video_width = e.target.videoWidth;
      const video_height = e.target.videoHeight;
      const width = e.target.parentNode.clientWidth;
      const height = e.target.parentNode.clientHeight;
      const ratio = width / height;
      if(ratio > 1 && video_width > video_height){
        this.video_style.width = 100*ratio+'%';
        this.video_style.height = 100+'%';
      }else
      if(ratio < 1 && video_width > video_height){
        this.video_style.width = 100/ratio+'%';
        this.video_style.height = 100+'%';
      }
    }
  }
}
</script>


