<template>
  <div ref="inputFrame" class="inputs_frame">
    <div class="inputs_frame-title">Введите значения</div>
    <div class="input_frame"
         v-for="(param, index) in params"
         :key="index">
      <label :for="param.name">{{param.name}}</label>
      <input type="text" @keypress.enter="dataCapture"
             :placeholder="param.name"
             :name="param.name"
      >
    </div>
    <button @click="dataCapture">ok</button>
  </div>
</template>

<script>

export default {
  props: {
    params: {
      type: Array,
      required: true
    }
  },
  methods: {
    dataCapture: function (){
      this.$refs.inputFrame.getElementsByTagName('input').forEach((v, i)=>{
        if(isNaN(v.value) || v.value === '' || v.value < 0){
          this.params[i].value = 0;
        } else{
          this.params[i].value = v.value;
        }
      })
      this.$emit('paramChanged');
    }
  }
}

</script>