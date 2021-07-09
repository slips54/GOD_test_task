<template>
  <div class="shop_box-item" ref="shopBoxItem" :class="{popup_showed: popup_showed, [box_data.rarity]: true}">
    <div class="shop_box-item-image div_100" :style="{backgroundImage:  'url('+box_image_src+')'}"></div>
    <div class="shop_box-item-gradient div_100"></div>

    <div class="shop_box-item-rarity">
      {{ rarity_name }}
    </div>
    <div class="box_open-info">
      <div class="icon"></div>
      <div class="label">КАК ОТКРЫТЬ</div>
      <div class="tooltip">
        Открывать кейсы могут только участники с <strong>Полным доступом</strong>
      </div>
    </div>
    <div class="shop_box-item-name" v-html="box_data.name"></div>
    <div class="box_favorites-btn"
         :class="{
           'active': box_data.favorite,
           'disabled':  box_data.favorite === undefined
         }"
         @click="toggleFavorite()"
          >
      <div class="icon">
        <svg width="30" height="28" viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path class="fill-icon" d="M15 3.23607L17.4167 10.6738L17.6412 11.3647H18.3677H26.1882L19.8613 15.9615L19.2735 16.3885L19.498 17.0795L21.9147 24.5172L15.5878 19.9205L15 19.4934L14.4122 19.9205L8.08533 24.5172L10.502 17.0795L10.7265 16.3885L10.1387 15.9615L3.81184 11.3647H11.6323H12.3588L12.5833 10.6738L15 3.23607Z" fill="white" stroke="white" stroke-width="2"/>
          <path class="stroke-icon" fill-rule="evenodd" clip-rule="evenodd" d="M18.3677 10.3647L15 0L11.6323 10.3647H0.734154L9.55093 16.7705L6.18322 27.1353L15 20.7295L23.8168 27.1353L20.4491 16.7705L29.2659 10.3647H18.3677ZM23.1105 12.3647H16.9146L15 6.47214L13.0854 12.3647H6.88952L11.9021 16.0066L9.98745 21.8992L15 18.2574L20.0126 21.8992L18.0979 16.0066L23.1105 12.3647Z" fill="white"/>
        </svg>
      </div>
      <div class="label">В ИЗБРАННОЕ</div>
    </div>

    <div class="box-controls">
      <div class="select_currency" v-if="!for_victories_box">
        ВЫБЕРИ ВАЛЮТУ
      </div>
      <div class="box-prizes">
        <div class="box-prizes-label">ВОЗМОЖНЫЕ ПРИЗЫ</div>
        <div class="box-prizes-previews">
          <div class="box-prizes-preview"
               v-for="(prize_preview, index) in prizes_previews_src"
               :key="index"
               :class="{active: prize_preview.availability}"
               :style="{backgroundImage:  'url(/boxes/items/'+prize_preview.preview+')'}">
            <div class="icon"></div>
          </div>
          <div class="view_all_prize-btn" @click="showPopup(true)"><span>СМОТРЕТЬ ВСЕ</span></div>
        </div>
      </div>
      <div class="box-victories-counter" v-if="for_victories_box">
        <div class="row">
          <div class="col">ПОБЕД ДО ОТКРЫТИЯ</div>
          <div class="col">{{ current_win }}/{{ box_data.wins_needed }}</div>
        </div>
        <div class="row">
          <div class="box-progress">
            <div class="progress" :style="{transform: 'translateX('+wins_progress+'%)'}"></div>
          </div>
        </div>
      </div>
      <div class="box-controls_btns select_currency-btns" v-if="!for_victories_box">
        <div class="box-controls_btn select_currency-btn n1" @click="setCurrency('sun')" :class="{selected : this.current_currency === 'sun'}">
          <div class="icon"></div>
          <div class="value">{{ all_sun_currency }}</div>
        </div>
        <div class="box-controls_btn select_currency-btn n2" @click="setCurrency('medal')" :class="{selected : this.current_currency === 'medal'}">
          <div class="icon"></div>
          <div class="value">{{ all_medal_currency }}</div>
        </div>
      </div>
      <div class="box-controls_btns">
        <div class="box-controls_btn select_quantity n1" v-if="!for_victories_box">
          <div class="arrow left" :class="{ visible: current_step > 0 }" @click="setCount(-1)"></div>
          <div class="value">{{ select_steps[current_step]  }}</div>
          <div class="arrow right"  :class="{ visible: current_step < select_steps.length-1 }" @click="setCount(1)"></div>
        </div>
        <div class="box-controls_btn open_btn n2" @click="openBox()">
          <div class="btn-bg" :style="{transform: 'translateX('+open_btn_fill_percent+'%)'}"></div>
          <span>открыть</span>
        </div>
      </div>

    </div>

    <div class="all_prizes-list" :class="{active: popup_showed}">

      <div class="all_prizes-list-header">
        <div class="title">все возможные призы</div>
        <div class="close-btn" @click="showPopup(false)"><div class="icon"></div></div>
      </div>
      <div class="all_prizes-list-scroll">
        <div class="all_prizes-list-items">
          <div class="all_prizes-list-item"
               v-for="(item, index) in box_data.prizes"
               :key="index"
                :class="{active: item.availability}" >
            <span> {{ item.name }} </span>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>


<script>


export default {
  props: {
    box_data: {
      type: Object,
      required: true
    },
    time_to_open: {
      type: Number,
      default: 2000
    }
  },
  data(){
    return {
      popup_showed: false,
      select_steps: [1, 5, 10, 15, 25, 35, 50],
      current_step: 0,
      current_win: 0,
      current_currency: 'sun',
      rare_dict: {
        "rare" : {name: "РЕДКИЙ", color: '#FFA114', dark_color: '#503000'},
        "normal" :  {name: "ОБЫЧНЫЙ", color: '#41A93F', dark_color: '#065704'},
        "for_victories" : {name: "за победы", color: '#8747C7', dark_color: '#271A34'}
      },
      open_btn_fill: 0
    }
  },
  mounted() {
    this.$refs.shopBoxItem.style.setProperty('--box-color', this.rarity_color);
    this.$refs.shopBoxItem.style.setProperty('--box-dark-color', this.rarity_dark_color);
  },
  computed: {
    for_victories_box: function(){
      return this.box_data.rarity === 'for_victories';
    },
    wins_progress: function(){
      return -100 + (this.current_win / this.box_data.wins_needed) * 100;
    },
    open_btn_fill_percent: function(){
      return -100 + this.open_btn_fill;
    },
    rarity_name: function(){
      return this.rare_dict[this.box_data.rarity].name
    },
    rarity_color: function(){
      return this.rare_dict[this.box_data.rarity].color
    },
    rarity_dark_color: function(){
      return this.rare_dict[this.box_data.rarity].dark_color
    },
    all_sun_currency: function(){
      return this.select_steps[this.current_step] * this.box_data.sun_currency;
    },
    all_medal_currency: function(){
      return this.select_steps[this.current_step] * this.box_data.medal_currency;
    },
    box_image_src: function(){
      return '/boxes/'+this.box_data.preview;
    },
    prizes_previews_src: function(){
      let count = 0;
      return this.box_data.prizes.filter((v)=>{
        if(count < 4){
          if(v.preview) {
            count++;
            return true;
          }
        } else {
          return false;
        }
      })
    },
    prizes_availably_count: function(){
      return this.box_data.prizes.reduce((acc, v)=>{
        if(!v.availability){
          return ++acc;
        } else {
          return acc;
        }
      }, 0);
    }
  },
  methods: {
    setCount: function(delta){
      this.current_step = Math.min(this.select_steps.length-1, Math.max(0, this.current_step + Number(delta)));
    },
    toggleFavorite: function(){
      if(this.box_data.favorite !== undefined){
        if(this.box_data.favorite) {
          this.box_data.favorite = false;
        } else {
          this.box_data.favorite = true;
        }
      }
    },
    setCurrency: function(currency){
      this.current_currency = currency;
    },
    showPopup: function(show){
      this.popup_showed = show;
    },
    openBox: function(){
      let interval;
      let step = 5 / this.time_to_open * 100;
      interval = setInterval(()=>{
        this.open_btn_fill+=step;
        if(this.open_btn_fill >= 100){
          clearInterval(interval);
          this.openBoxEvent();
          this.open_btn_fill = 0;
        }
      }, 5);
    },
    openBoxEvent: function(){
      if (this.for_victories_box) {
        if(this.current_win < this.box_data.wins_needed){
          this.current_win++;
        } else{
          this.current_win = 0;
          let index = this.checkAvailable();
          this.box_data.prizes[index].availability = true;
          alert('Кейс открыт, получена награда - ' + this.box_data.prizes[index].name);
          if(this.prizes_availably_count === 0){
            this.updatePrizes();
            alert('Все призы получены, список наград обновен!!!');
          }
        }
      } else {
        for(let i = 0; i < this.select_steps[this.current_step]; i++){
          let index = this.checkAvailable();
          this.box_data.prizes[index].availability = true;
          alert('Кейс открыт, получена награда - ' + this.box_data.prizes[index].name);
          if(this.prizes_availably_count === 0){
            this.updatePrizes();
            alert('Все призы получены, список наград обновен!!!');
          }
        }
        this.current_step = 0;
      }
    },
    checkAvailable: function(){
      let index = this.getRandIndex(0, this.box_data.prizes.length-1);
      if(this.box_data.prizes[index].availability && this.prizes_availably_count > 0){
         return this.checkAvailable();
      } else{
        return index;
      }
    },
    getRandIndex: function(min, max){
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    updatePrizes: function(){
      this.box_data.prizes.forEach((v)=>{
        v.availability = false;
      })
    }
  }
}

</script>