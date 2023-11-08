import { ref, readonly } from "vue";

const ID = ref("");
export const cardSelected = () => {
  const selectID = (dt: string) => (ID.value = dt);

  return {
    IDSelected: readonly(ID),
    selectID,
  };
};


