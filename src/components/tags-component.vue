<template>
  <div class="tags-wrapper" ref="target">
    <section class="tags" :class="[checkedCategories.length > 0 ? 'tags--blue' : null]" @click="open = !open">
      <span v-if="checkedCategories.length == 0"
        >Tags:</span
      >
      <span v-else-if="checkedCategories.length <= 2">
        <span v-for="tag in checkedCategories" :key="tag" class="tags__names">{{ tag }}</span></span
      >
      <span v-else
        ><span>{{ checkedCategories.length }} tags selecionadas</span>
      </span>
    </section>

    <section class="tags__list" v-show="open">
      <div class="tags__search-wrapper">
        <div class="tags__icon">
          <img src="../../assets/lupa2.svg" />
        </div>
        <input
          type="text"
          class="tags__search-input"
          placeholder="Pesquisar"
          v-model="tagSearch"
        />
      </div>

      <div class="tags__options">
        <div class="tags__not-found" v-show="!filteredItems.length">
          <span>Nenhuma tag encontrada.</span>
        </div>

        <div class="tags__items">
          <div
            class="tags__single-item"
            v-for="item in filteredItems"
            :key="item.id"
            :style="'color:' + item.color + '; background-color:' + item.bg"
          >
            <label>
              <input
                type="checkbox"
                :value="item.text"
                v-model="checkedCategories"
                class="tags__input"
                @change="emit('sendTags', checkedCategories)"
              />
              {{ item.text }}
            </label>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineEmits } from "vue";
import { fetchTags } from "../functions/requests";
import { onClickOutside } from "@vueuse/core";

const data = fetchTags();
const target = ref(null);
const emit = defineEmits(['sendTags'])

// local state
const open = ref(false);
const tagSearch = ref("");
const checkedCategories = ref<Array<string>>([]);
let tags = data;


const filteredItems = computed(() => {
  let valores = tags.value;
  valores = valores.filter((item) => {
    return item.text.toLowerCase().indexOf(tagSearch.value.toLowerCase()) > -1;
  });
  return valores;
});

// fecha ao clicar fora
onClickOutside(target, () => (open.value = false));
</script>

<style scoped lang="scss">
.tags-wrapper {
  position: relative;
  block-size: 28.8px;
}

.tags {
  display: flex;
  align-items: center;
  border: 1.6px solid #dfe1e5;
  border-radius: 7px;
  inline-size: 100%;
  block-size: 28.8px;
  font-size: 12px;
  padding-inline-start: 15px;
  background-color: #fff;
  cursor: pointer;

  &--blue {
    background-color: #ccdbfd ;
    border-color: #abc4ff ;
  }

  &__names {
    margin-inline-start: 6px
  }

  &__list {
    position: absolute;
    max-inline-size: 250px;
    inline-size: 100%;
    block-size: 320px;
    background-color: #fff;
    inset-block-start: 36.8px;
    inset-inline-start: 9.6px;
    z-index: 1;
    border-radius: 9.6px;
    box-shadow: 0 40px 80px -19.2px rgba(0, 0, 0, 0.25);
    border: 0.8px solid #dee2e6;
    overflow: hidden;
  }

  &__search-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    inline-size: 100%;
    block-size: 48px;
    background-color: #e5e5e5;
  }

  &__icon {
    background-color: #fff;
    display: flex;
    block-size: 33.6px;
    border-inline-end: 0;
    inline-size: 48px;
    justify-content: center;
    align-items: center;
    border-top-left-radius: 96px;
    border-bottom-left-radius: 96px;

    > img {
      inline-size: 20px;
    }
  }

  &__search-input {
    inline-size: 65%;
    block-size: 33.6px;
    border-top-right-radius: 96px;
    border-bottom-right-radius: 96px;
    font-size: 13.6px;
    border-color: transparent;
    border-inline-start-width: 1.6px;
    border-inline-start-style: solid;
    border-inline-start-color: rgb(223, 225, 229);
    border-inline-start: none;
    outline: none;
  }

  &__items {
    block-size: 272px;
    overflow: auto;
  }

  &__not-found {
    text-align: center;
    font-size: 12px;
    margin-block-start: 15px;
  }

  &__single-item {
    display: flex;
    align-items: center;
    block-size: 30px;
    border-block-end: 1.6px solid #f8f8ff;
    padding-inline-start: 15px;
    font-size: 12px;
  }

  &__input {
    accent-color: #1ba779;
  }
}
</style>
