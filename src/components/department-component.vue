<template> 
  <div class="department-wrapper" ref="target">
    <section class="dpt" @click="open = !open">
      <span>Usuário/Departamento</span>
    </section>

    <section class="dpt__list" v-show="open">
      <div class="dpt__search-wrapper">
        <div class="dpt__icon">
          <img src="../../assets/lupa2.svg" />
        </div>
        <input type="text" class="dpt__search-input" placeholder="Pesquisar" />
      </div>

      <div class="dtp__options">
        <!-- <div class="dtp__not-found">
          <span>Nenhuma tag encontrada.</span>
        </div> -->

        <div class="dpt__items">
          <div class="dpt__single-item">
            <label>
              <input type="checkbox" class="dpt__input" />
              Sem usuário delegado
            </label>
          </div>

          <div class="dpt__type">
            <span>Departamentos</span>
          </div>

          <div
            class="dpt__single-item"
            v-for="department in groupsSelectFiltered"
            :key="department.id"
            
          >
            <label>
              <input type="checkbox" class="dpt__input" v-model="checkedItems.groups" :value="department.id" />
              {{ department.name }}
            </label>
          </div>

          <div class="dpt__type">
            <span>Usuários</span>
          </div>

          <div
            class="dpt__single-item"
            v-for="user in usersSelectFiltered"
            :key="user.id"
            
          >
            <label>
              <input type="checkbox" class="dpt__input" v-model="checkedItems.users" :value="user.id"/>
              {{ user.name }}
            </label>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from "vue";
import { onClickOutside } from "@vueuse/core";
import { fetchDpt } from "../functions/requests";

const target = ref(null);
const data = fetchDpt();

const open = ref(false);
const departments = data;
const checkedItems = reactive({
  groups: [],
  users: [],
  noDelegated: false,
});

const groupsSelectFiltered = computed(() => {
  let dpt = departments.value?.groups;

  return dpt;
});

const usersSelectFiltered = computed(() => {
  let dpt = departments?.value?.users;

  return dpt;
});

// fecha ao clicar fora
onClickOutside(target, () => (open.value = false));
</script>

<style lang="scss" scoped>
.department-wrapper {
  position: relative;
  block-size: 28.8px;
}

.dpt {
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

  &__not-found {
    text-align: center;
    font-size: 12px;
    margin-block-start: 15px;
  }

  &__items {
    overflow: auto;
    block-size: 272px;
  }

  &__single-item {
    display: flex;
    align-items: center;
    inline-size: 100%;
    block-size: 30px;
    border-block-end: 1.6px solid #f8f8ff;
    padding-inline-start: 15px;
    font-size: 12px;
  }

  &__input {
    accent-color: #1ba779;
  }

  &__type {
    display: flex;
    align-items: center;
    inline-size: 100%;
    block-size: 30px;
    padding-inline-start: 15px;

    span {
      font-weight: 800;
      font-style: italic;
      font-size: 14px;
    }
  }
}
</style>
