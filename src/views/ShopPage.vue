<template>
  <div class="div_100 shop_page">

    <div class="boxes_block">
      <div class="boxes_block-scroll">
        <shop-box
            v-for="(box, index) in sorted_boxes"
            :key="box.id"
            :box_data="box"
            :time_to_open="1000"
            :class="{['z'+(boxes.length-index)]: true}"
        />
      </div>
    </div>
  </div>
</template>

<script>

import ShopBox from '@/components/ShopBox.vue';

export default {
  components: {
    ShopBox
  },
  data(){
    return{
      boxes: []
    }
  },
  created() {
    this.getBoxes();
  },
  computed: {
    sorted_boxes: function(){
      let sorted_arr = [...this.boxes].sort((a, b)=>{
        let map = new Map();
        map.set(true, 10);
        map.set(false, 2);
        map.set(undefined, 0);
        let sizes_param={
          fav: map,
          rar: {
            "rare" : 5,
            "normal" : 1,
            "for_victories" : 0
          }
        }
        console.log(sizes_param.fav.get(a.favorite))
        console.log(sizes_param.fav.get(b.favorite))
        let a_size = sizes_param.fav.get(a.favorite) + sizes_param.rar[a.rarity];
        let b_size = sizes_param.fav.get(b.favorite) + sizes_param.rar[b.rarity];
        console.log(a_size, b_size, a, b)
        return b_size - a_size;
      });
      console.log(sorted_arr);
      return sorted_arr;
    }
  },
  methods: {
    getBoxes: async function(){
      const f = await fetch("/data/boxlist.json");
      const boxes_data = await f.json();
      this.boxes = boxes_data.boxes;
    }
  }
}

</script>