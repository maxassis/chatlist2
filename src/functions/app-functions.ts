import { reactive, ref } from "vue";
import { fieldsTypes, checkedDptItems } from "../types";
import { fetchCard } from "./requests";
import type { tokenType } from "./requests";

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

export const inputsHidden = {
  nameInput: false,
  phoneInput: false,
  telNumberInput: false,
  tagInput: false,
  userInput: false,
  funnelInput: false,
  chatStatus: false,
  orderByInput: false,
  unreadInput: false,
  archivedInput: false,
  broadcastInput: false,
  favoritedInput: false,
  addChat: false
}

export const scrollList = ref(false);
export const hasFilter = ref(false);
export const user = ref("");


// FUNCTIONS
export const incomingTags = (tags: Array<string>) => {
  fields.tags = tags;
  fetchCard();
};
export const incomingDepartments = (departments: checkedDptItems) => {
  fields.departments = departments;
  fetchCard();
};
export const incomingFunnels = (funnels: Array<string>) => {
  fields.funnels = funnels;
  fetchCard();
};


export function tokenFilter(token: tokenType) {
  user.value = token.user_type;

  const is_admin_or_super = user.value === "admin" || user.value === "super";

  if (
    token.account_features.includes("FUNNEL") &&
    (token.permissions.includes("CHAT_FILTER_BY_FUNNEL") || is_admin_or_super)
  ) {
    inputsHidden.funnelInput = true;
    hasFilter.value = true;
  }
  if (
    token.account_features.includes("START_CHAT") &&
    (token.permissions.includes("CHAT_ADD_CHAT") || is_admin_or_super)
  ) {
    inputsHidden.addChat = true;
    hasFilter.value = true;
  }
  if (token.account_features.includes("CHAT_STATUS")) {
    inputsHidden.chatStatus = true;
    hasFilter.value = true;
  }
  if (token.permissions.includes("CHAT_ORDER_BY") || is_admin_or_super) {
    inputsHidden.orderByInput = true;
    hasFilter.value = true;
  }
  if (token.permissions.includes("CHAT_FILTER_BY_NAME") || is_admin_or_super) {
    inputsHidden.nameInput = true;
    hasFilter.value = true;
  }
  if (token.permissions.includes("CHAT_FILTER_BY_PHONE") || is_admin_or_super) {
    inputsHidden.phoneInput = true;
    hasFilter.value = true;
  }
  if (
    token.permissions.includes("CHAT_FILTER_BY_NUMBER") ||
    is_admin_or_super
  ) {
    inputsHidden.telNumberInput = true;
    hasFilter.value = true;
  }
  if (token.permissions.includes("CHAT_FILTER_BY_TAG") || is_admin_or_super) {
    inputsHidden.tagInput = true;
    hasFilter.value = true;
  }
  if (token.permissions.includes("CHAT_FILTER_BY_USER") || is_admin_or_super) {
    inputsHidden.userInput = true;
    hasFilter.value = true;
  }
  if (
    token.permissions.includes("CHAT_FILTER_BY_UNREAD") ||
    is_admin_or_super
  ) {
    inputsHidden.unreadInput = true;
    hasFilter.value = true;
  }
  if (
    token.permissions.includes("CHAT_FILTER_BY_ARCHIVED") ||
    is_admin_or_super
  ) {
    inputsHidden.archivedInput = true;
    hasFilter.value = true;
  }
  if (
    token.permissions.includes("CHAT_FILTER_BY_BROADCAST") ||
    is_admin_or_super
  ) {
    inputsHidden.broadcastInput = true;
    hasFilter.value = true;
  }
  if (
    token.permissions.includes("CHAT_FILTER_BY_FAVORITED") ||
    is_admin_or_super
  ) {
    inputsHidden.favoritedInput = true;
    hasFilter.value = true;
  }
}

