<script setup>
import { ref, onMounted } from 'vue';
import getData from '@/paginationService';
import ItemCharecterComponent from './ItemCharecterComponent.vue';
import PaginationComponent from './PaginationComponent.vue';

const charactersList = ref([]);
const totalPages = ref(null);
const isCorrectRequest = ref(false);

async function getCharectersList(page = 1, name, status) {
  try {
    const response = await getData(page, name, status);
    charactersList.value = response.data.results;
    totalPages.value = response.data.info.pages;
    isCorrectRequest.value = false;
  } catch (err) {
    console.log(err);
    isCorrectRequest.value = true;
  }
}

onMounted(() => {
  getCharectersList();
});
</script>

<template>
  <div v-if="isCorrectRequest" class="error-message">
    Неверно введеные данные, проверьте корректность
  </div>
  <PaginationComponent v-if="totalPages" @changePage="getCharectersList" :totalPages="totalPages" />
  <div class="list-characters">
    <ItemCharecterComponent
      v-for="character in charactersList"
      :key="character.id"
      :name="character.name"
      :image="character.image"
      :status="character.status"
      :species="character.species"
    ></ItemCharecterComponent>
  </div>
</template>

<style lang="scss" scoped>
.error-message {
  margin: 0 auto;
  margin-bottom: 5px;
  padding: 15px;
  background-color: red;
  width: 300px;
  color: whitesmoke;
  text-align: center;
}

.button-wrap {
  display: flex;
  justify-content: center;
}

.list-characters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}
</style>
