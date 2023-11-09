import { ref, readonly, computed } from "vue";

const chat_ids = ref(new Set<string>());

const methods = {
  addItem(item: string) {
    chat_ids.value.add(item);
  },
  removeItem(item: string) {
    chat_ids.value.delete(item);
  },
  clear() {
    chat_ids.value.clear();
  },
};

const getters = {
  getSize: computed(() => {
    return chat_ids.value.size;
  }),
};

export default {
  state: readonly(chat_ids),
  methods,
  getters,
};
