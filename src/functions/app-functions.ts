import { reactive, ref } from "vue";
import { fieldsTypes, checkedDptItems } from "../types";

// LOCAL STATE
export const fields = reactive<fieldsTypes>({
  name: "",
  phone: "",
  allTags: "",
  allDpt: "",
  whatsNumber: "",
  tags: [],
  departments: { users: [], groups: [], noDelegated: false },
  funnels: [],
  status: "",
  date: "",
  newMessages: false,
  archiveSearch: false,
  broadcastSearch: false,
  favoritedSearch: false,
  scheduledSearch: false,
  page_num: 0,
});

export const scrollList = ref(false);

// FUNCTIONS
export const incomingTags = (tags: Array<string>) => (fields.tags = tags);
export const incomingDepartments = (departments: checkedDptItems) =>
  (fields.departments = departments);
export const incomingFunnels = (funnels: Array<string>) =>
  (fields.funnels = funnels);
 
