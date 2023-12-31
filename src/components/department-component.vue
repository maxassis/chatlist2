<template>
  <div class="department-wrapper" ref="target">
    <section
      class="dpt"
      @click="open = !open"
      :class="[
        getNames.length != 0 || checkedItems.noDelegated ? 'dpt--blue' : null,
      ]"
    >
      <span class="dpt__item-name" v-if="checkedItems.noDelegated && getNames.length <= 3"
        >Sem delegado</span
      >
      <span class="dpt__item-name" v-if="getNames.length == 0 && checkedItems.noDelegated == false"
        >Usuário/Departamento:</span
      >
      <span
        v-else-if="getNames.length <= 3"
        v-for="name in getNames"
        :key="name"
        class="dpt__names"
        >{{ name }}</span
      >
      <span v-else
        >{{
          checkedItems.noDelegated ? getNames.length + 1 : getNames.length
        }}
        Usuário/Departamento selecionados</span
      >
    </section>

    <section class="dpt__list" v-show="open">
      <div class="dpt__search-wrapper">
        <div class="dpt__icon">
          <Icon icon="lupa2" />
        </div>
        <input
          type="text"
          class="dpt__search-input"
          placeholder="Pesquisar"
          v-model="userSearch"
        />
      </div>

      <div class="dpt__options">
        <div class="dpt__not-found" v-show="!groupsSelectFiltered?.length && !usersSelectFiltered?.length">
          <span>Nenhuma tag encontrada.</span>
        </div>

        <div class="dpt__items" v-show="groupsSelectFiltered?.length || usersSelectFiltered?.length">
          <div
            class="dpt__single-item"
            :class="[
              noDelegatedSelected && !departmentSelected
                ? 'dpt__single-item--disabled'
                : null,
            ]"
          >
            <label>
              <input
                type="checkbox"
                class="dpt__input"
                @change="
                  selectNoDelegated();
                  emit('sendDepartments', checkedItems);
                "
                v-model="checkedItems.noDelegated"
              />
              Sem usuário delegado
            </label>
          </div>

          <div class="dpt__type">
            <span>Departamentos</span>
          </div>

          <div
            class="dpt__single-item"
            :class="[
                  departmentSelected && !noDelegatedSelected
                    ? 'dpt__single-item--disabled'
                    : null,
                ]"
            v-for="department in groupsSelectFiltered"
            :key="department.id"
          >
            <label>
              <input
                type="checkbox"
                class="dpt__input"               
                v-model="checkedItems.groups"
                :value="department.id"
                @change="
                  checkDepartment();
                  emit('sendDepartments', checkedItems);
                "
              />
              {{ department.name }}
            </label>
          </div>

          <div class="dpt__type">
            <span>Usuários</span>
          </div>

          <div
            class="dpt__single-item"
            :class="[
                  departmentSelected && !noDelegatedSelected
                    ? 'dpt__single-item--disabled'
                    : null,
                ]"
            v-for="user in usersSelectFiltered"
            :key="user.id"
          >
            <label>
              <input
                type="checkbox"
                class="dpt__input"
                v-model="checkedItems.users"
                :value="user.id"
                @change="
                  checkDepartment();
                  emit('sendDepartments', checkedItems);
                "
              />
              {{ user.name }}
            </label>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import Icon from "./icon-component.vue"
import { ref, computed, reactive } from "vue";
import { onClickOutside } from "@vueuse/core";
import { fetchDpt } from "../functions/requests";
import type { checkedDptItems } from "../types";

const target = ref(null);
const data = fetchDpt();
// eslint-disable-next-line
const emit = defineEmits(["sendDepartments"]);

// LOCAL STATE
const departments = data;
const open = ref(false);
const noDelegatedSelected = ref(false);
const departmentSelected = ref(false);
const userSearch = ref("");
let checkedItems = reactive<checkedDptItems>({
  groups: [],
  users: [],
  noDelegated: false,
});

// COMPUTED
const groupsSelectFiltered = computed(() => {
  const dp = departments.value?.groups?.filter((item) => {
    return item.name.toLowerCase().indexOf(userSearch.value.toLowerCase()) > -1;
  });

  return dp;
});

const usersSelectFiltered = computed(() => {
  const dp = departments.value?.users.filter((item) => {
    return item.name.toLowerCase().indexOf(userSearch.value.toLowerCase()) > -1;
  });

  return dp;
});

const getNames = computed(() => {
  let names: string[] = [];
  let dpts = departments;
  const selectedDpts = checkedItems.users.concat(checkedItems.groups);

  dpts.value?.users?.forEach((item) => {
    if (selectedDpts.includes(item.id)) names.push(item.name);
  });

  dpts.value?.groups?.forEach((item) => {
    if (selectedDpts.includes(item.id)) names.push(item.name);
  });

  return names;
});

// FUNCTIONS
function selectNoDelegated() {
  if (checkedItems.noDelegated) {
    noDelegatedSelected.value = false;
    departmentSelected.value = true;
  } else {
    noDelegatedSelected.value = false;
    departmentSelected.value = false;
  }
}

function checkDepartment() {
  if (checkedItems.groups.length > 0 || checkedItems.users.length > 0) {
    noDelegatedSelected.value = true;
    departmentSelected.value = false;
  } else {
    noDelegatedSelected.value = false;
    departmentSelected.value = false;
  }
}

const clearDptInput = () => {
    (checkedItems.groups = []),
    (checkedItems.users = []),
    (checkedItems.noDelegated = false);
};

// eslint-disable-next-line
function changeInputs(obj: checkedDptItems) {
    checkedItems.groups = obj.groups
    checkedItems.users = obj.users
    checkedItems.noDelegated = obj.noDelegated
    emit('sendDepartments', checkedItems)
}

// eslint-disable-next-line
defineExpose({ clearDptInput, changeInputs });

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

  &--blue {
    background-color: var(--background-blue);
    border-color: #abc4ff;
  }

  &__names {
    font-size:12px;
    &:not(:first-child) {
      margin-inline-start: 8px;
    }
  }

  &__item-name {
    font-size:12px;
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
    // border: 0.8px solid #dee2e6;
    overflow: hidden;
    background-color: var(--component-background);
  }

  &__search-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    inline-size: 100%;
    block-size: 48px;
    background-color: var(--component-header);
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
    color: var(--font-color);
  }

  &__not-found {
    text-align: center;
    font-size: 12px;
    margin-block-start: 15px;
    color: var(--font-color);
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
    border-block-end: 1.6px solid var(--component-item-border);
    padding-inline-start: 15px;
    font-size: 12px;

    > label {
      margin-block-end: 0;
      color: var(--font-color);
    }

    &--disabled {
      opacity: 0.4;
      pointer-events: none;
    }
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
    color: var(--font-color);

    span {
      font-weight: 800;
      font-style: italic;
      font-size: 14px;
    }
  }
}

</style>
