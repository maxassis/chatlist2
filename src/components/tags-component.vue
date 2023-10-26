<template>
  {{ checkedCategories }}
  <div class="tags-wrapper">
    <section class="tags" @click="open = !open">
      <span>Tags:</span>
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
        <div class="tags__not-found"></div>

        <div class="tags__items">
          <div class="tags__single-item" v-for="item in tags" :key="item.id" :style="'color:' + item.color + '; background-color:' + item.bg">
            <label>
                  <input
                    type="checkbox"
                    :value="item.text"
                    v-model="checkedCategories"
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
import { ref } from "vue";
import { fetchTags } from '../functions/requests'
import type { Tags } from "../functions/requests"

 const data = fetchTags()

 const open = ref(false);
 const tagSearch = ref("");
 let tags = ref<Tags>([]);
 const checkedCategories = ref([])

 tags = data;
</script>

<style scoped lang="scss">
.tags-wrapper {
  position: relative;
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
    opacity: 1;
    transition: all 0.4s ease-in-out;
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

  

  &__single-item {
    block-size: 30px;
    background-color: red;

  }
}
</style>
