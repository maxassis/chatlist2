import { ref, readonly } from 'vue'

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
}


export default {
    state: readonly(chat_ids),
    methods
}