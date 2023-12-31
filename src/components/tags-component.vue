<template>
  <div class="tags-wrapper" ref="target">
    <section
      class="tags"
      :class="[checkedCategories.length > 0 ? 'tags--blue' : null]"
      @click="open = !open"
    >
      <span v-if="checkedCategories.length == 0">Tags:</span>
      <span v-else-if="checkedCategories.length <= 2">
        <span v-for="tag in checkedCategories" :key="tag" class="tags__names">{{
          tag
        }}</span></span
      >
      <span v-else
        ><span>{{ checkedCategories.length }} tags selecionadas</span>
      </span>
    </section>

    <section class="tags__list" v-show="open">
      <div class="tags__search-wrapper">
        <div class="tags__icon">
          <Icon icon="lupa2" />
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
import Icon from "./icon-component.vue";
import { ref, computed } from "vue";
import { fetchTags } from "../functions/requests";
import { onClickOutside } from "@vueuse/core";

const data = fetchTags();
const target = ref(null);
// eslint-disable-next-line
const emit = defineEmits(["sendTags"]);

// local state
const open = ref(false);
const tagSearch = ref("");
const checkedCategories = ref<Array<string>>([]);
let tags = data;

// COMPUTED
const filteredItems = computed(() => {
  let valores = tags.value;
  valores = valores.filter((item) => {
    return item.text.toLowerCase().indexOf(tagSearch.value.toLowerCase()) > -1;
  });
  return valores;
});

// FUNCTIONS
const clearInput = () => (checkedCategories.value = []);
// eslint-disable-next-line
defineExpose({ clearInput });

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
  border: var(--input-border);
  border-radius: 7px;
  inline-size: 100%;
  block-size: 28.8px;
  font-size: 12px;
  padding-inline-start: 15px;
  background-color: var(--input-color);
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  color: var(--font-color);

  > span {
    font-size: 12px;
  }

  &--blue {
    background-color: var(--background-blue);
    border-color: #abc4ff;
  }

  &__names {
    font-size: 12px;

    &:not(:first-child) {
      margin-inline-start: 8px;
    }
  }

  &__list {
    position: absolute;
    max-inline-size: 250px;
    inline-size: 100%;
    block-size: 320px;
    background-color: var(--component-background);
    inset-block-start: 36.8px;
    inset-inline-start: 9.6px;
    z-index: 1;
    border-radius: 9.6px;
    box-shadow: 0 40px 80px -19.2px rgba(0, 0, 0, 0.25);
    // border: 0.8px solid #dee2e6;
    overflow: hidden;
  }

  &__search-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    inline-size: 100%;
    block-size: 48px;
    background-color:  var(--component-header);
  }

  &__icon {
    background-color: var(--input-color);
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
    background-color: var(--input-color);
    color: var(--font-color)
  }

  &__items {
    block-size: 272px;
    overflow: auto;
  }

  &__not-found {
    text-align: center;
    font-size: 12px;
    margin-block-start: 15px;
    color: var(--font-color);
  }

  &__single-item {
    display: flex;
    align-items: center;
    block-size: 30px;
    border-block-end: 1.6px solid var(--component-item-border);
    padding-inline-start: 15px;
    font-size: 12px;

    > label {
      margin-block-end: 0;
    }
  }

  &__input {
    accent-color: #1ba779;
  }
}

</style>
