<script setup>
import { ref, computed } from 'vue';
import FilterComponent from './FilterComponent.vue';

const props = defineProps({
  totalPages: Number
});

const emit = defineEmits(['changePage']);

const currentPage = ref(1);
const characterName = ref(null);
const characterStatus = ref(null);

const visiblePages = computed(() => {
  const pages = [];
  const start = Math.max(1, currentPage.value - 5);
  const end = Math.min(props.totalPages, start + 9);

  for (let i = start; i <= end; ++i) {
    pages.push(i);
  }
  return pages;
});

function nextPage() {
  if (currentPage.value >= props.totalPages) {
    return;
  }
  ++currentPage.value;
  emit('changePage', currentPage.value, characterName.value, characterStatus.value);
}

function prevPage() {
  if (currentPage.value <= 1) {
    return;
  }
  --currentPage.value;
  emit('changePage', currentPage.value, characterName.value, characterStatus.value);
}

function goToPage(number) {
  currentPage.value = number;
  emit('changePage', number, characterName.value, characterStatus.value);
}

function updateFilterNames(name, status) {
  characterName.value = name;
  characterStatus.value = status;
  currentPage.value = 1;
  emit('changePage', 1, characterName.value, characterStatus.value);
}
</script>

<template>
  <FilterComponent @updateFilter="updateFilterNames" />
  <div class="btn-wrap">
    <button @click="prevPage">{{ '<' }}</button>
    <ul>
      <li v-for="page in visiblePages" :key="page">
        <button @click="goToPage(page)" :class="{ 'active-btn': page === currentPage }">
          {{ page }}
        </button>
      </li>
    </ul>
    <button @click="nextPage">{{ '>' }}</button>
  </div>
</template>

<style lang="scss" scoped>
.btn-wrap {
  margin: 5px;
  display: flex;
  gap: 10px;
  justify-content: center;
}

ul {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  gap: 5px;
  list-style: none;
  align-items: center;
}

button {
  user-select: none;
}

.active-btn {
  background-color: red;
}
</style>
