<script setup>
defineProps({
  name: String,
  image: String,
  status: String,
  species: String
});
</script>

<template>
  <div class="item-character">
    <img :src="image" :alt="name" />
    <div class="text-character">
      <h2 class="name-charecter">Name: {{ name }}</h2>
      <span>{{ status }}</span>
      <span>{{ species }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.item-character {
  display: flex;
  width: 600px;
  height: 220px;
  background-color: darkcyan;

  img {
    display: block;
  }
}

.text-character {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
  color: aquamarine;
}
</style>
