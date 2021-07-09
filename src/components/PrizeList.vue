<template>
  <div class="prizelist-container">
    <div class="prizelist-container_title">
      набор
      прототипов
      оружия
    </div>
    <div class="prizelist_weapons">
      <slot name="prizelist-weapons-bg"></slot>
      <img :src="active_class_weapon">
    </div>
    <div class="prizelist_classes">
      <div class="prizelist_classes-grid div_100">
        <div v-for="(index) in 20" :key="index"></div>
      </div>
      <div class="prizelist_classes-content div_100">
        <div class="prizelist_classes-info">
          <div class="info_text">
            Ходят слухи, что на подвальном этаже Старого Тотрика скрыт тайный арсенал «Молохов», украденных Сопротивлением. Многие отправлялись на его поиски, но ни один не вернулся.
          </div>
        </div>
        <div class="prizelist_classes-type_list">
          <div class="archetype_item"
               v-for="(archetype, index) in archetypes"
               :key="index"
               @click="setState('archetype', index)"
               :class="{'active': index === state.archetype}">
            <div class="archetype_icon" :class="index"></div>
            <div class="archetype_name">{{ archetype.name }}</div>
          </div>
        </div>
        <div class="prizelist_classes-list">
          <div class="class_item"
               v-for="class_item in active_class_list"
               :key="class_item"
               @click="setState('class', class_item)"
               :class="{'active': class_item === state.class}">
            <div class="class_icon" :class="class_item"></div>
            <div class="class_name" v-html="classes[class_item].name"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'PrizeList',
  props: {
    archetypes: {
      type: Object,
      required: true
    },
    classes: {
      type: Object,
      required: true
    }
  },
  data(){
    return {
      state: {
        archetype: 'archer',
        class: this.archetypes['archer'].classes[0]
      }
    }
  },
  computed: {
    active_class_list: function(){
      return this.archetypes[this.state.archetype].classes;
    },
    active_class_weapon: function(){
      return '/weapons/'+this.classes[this.state.class].weapon_img;
    }
  },
  methods: {
    setState: function(category, value){
      this.state[category] = value;
      if(category === 'archetype') this.state['class'] = this.archetypes[value].classes[0];
    }
  }
}
</script>