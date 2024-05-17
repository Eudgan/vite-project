<script setup>
import { ref } from 'vue';

const emit = defineEmits(['updateFilter']);

const characterName = ref(null);
const status = ref('');
const statusList = [
  {
    value: '',
    disabled: true,
    selected: true,
    translateName: 'Выберите статус'
  },
  {
    value: 'alive',
    translateName: 'Жив'
  },
  {
    value: 'dead',
    translateName: 'Мертв'
  },
  {
    value: 'unknown',
    translateName: 'Неизвестно'
  }
];

function submitFilter() {
  emit('updateFilter', characterName.value, status.value);
}

function clearFilter() {
  characterName.value = null;
  status.value = '';
  emit('updateFilter', null, null);
}
</script>

<template>
  <div class="input-area">
    <input type="text" v-model="characterName" placeholder="Введите имя персонажа" />
    <select v-model="status">
      <option
        v-for="status in statusList"
        :key="status.value"
        :value="status.value"
        :selected="status.selected"
        :disabled="status.disabled"
      >
        {{ status.translateName }}
      </option>
    </select>
    <button type="submit" @click="submitFilter">Применить</button>
    <button type="submit" @click="clearFilter">Очистить</button>
  </div>
</template>

<style lang="scss" scoped>
.input-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}
</style>
