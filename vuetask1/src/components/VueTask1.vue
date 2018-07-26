<template>
  <div class="task">
    <h1>{{ msg }}</h1>
    <div v-if="imageData.length > 0">
      <img class="preview" :src="imageData">
    </div>
    <div>Upload an image:
      <input type="file" @change="previewImage" accept="image/*"> 
    </div>
  </div>
</template>

<script>
export default {
  name: 'VueTask1',
  data () {
    return {
      msg: 'Vue task!',
      imageData: ""
      }
  },
  
  methods: {
      previewImage (event) {
        var pics = event.target;
        if (pics.files && pics.files[0]) {
          var reader = new FileReader();
          reader.onload = (e) => {
            this.imageData = e.target.result;
          }
          reader.readAsDataURL(pics.files[0]);
        }
      }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1 {
  font-weight: normal;
}
img.preview {
  width: 200px;
  background-color: white;
  border: 1px solid #ddd;
  padding: 5px;
}
</style>
