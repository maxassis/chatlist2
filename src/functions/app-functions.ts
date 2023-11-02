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

export const body = reactive({
  page_num: 0,
  filter_order_by: fields.date,
  filter_tag: fields.tags,
  filter_tag_rule: fields.allTags === "" ? "or" : fields.allTags,
  filter_user_rule: fields.allDpt === "" ? "or" : fields.allDpt,
  filter_user: fields.departments,
  filter_phone: fields.phone,
  filter_funnel_step: fields.funnels,
  filter_status: fields.status,
  filter_search_number: fields.whatsNumber,
  filter_search_name: fields.name,
  filter_new_messages: fields.newMessages === true ? "True" : "",
  filter_archived: fields.archiveSearch === true ? "True" : "",
  filter_broadcast: fields.broadcastSearch === true ? "True" : "",
  filter_favorited: fields.favoritedSearch === true ? "True" : "",
  filter_scheduled: fields.scheduledSearch === true ? "True" : "",
});

// FUNCTIONS
export const incomingTags = (tags: Array<string>) => (fields.tags = tags);
export const incomingDepartments = (departments: checkedDptItems) =>
  (fields.departments = departments);
export const incomingFunnels = (funnels: Array<string>) =>
  (fields.funnels = funnels);
