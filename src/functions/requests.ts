/* eslint-disable @typescript-eslint/no-unused-vars */
import { ref } from "vue";
import { z } from "zod";
import { createZodFetcher } from "zod-fetch";
import {
  fields,
  tokenFilter,
  hiddenObserver,
  loadingDots,
} from "./app-functions";

//const enviroment: "DEV" | "PROD" = "DEV";
const enviroment = process.env.NODE_ENV === "development" ? "DEV" : "PROD";

const fetcher = createZodFetcher();

// REQUISIÇÃO DE TAGS
const schemaTags = z.array(
  z.object({
    id: z.string().min(1),
    text: z.string(),
    color: z.string(),
    bg: z.string(),
  })
);

export type Tags = z.infer<typeof schemaTags>;

export function fetchTags() {
  const dt = ref<Tags>([]);
  const url =
    enviroment === "DEV"
      ? "https://run.mocky.io/v3/6b4cb26a-02fb-4792-8d53-f42492e7ca75"
      : `${window.location.origin}/chatlist/tags`;

  fetcher(schemaTags, url)
    .then((response) => (dt.value = response))
    .catch((error) => console.log(error));

  return dt;
}

// REQUISIÇÃO DE DEPARTAMENTOS
export const schemaDpt = z.object({
  users: z.array(
    z.object({
      id: z.string().min(1),
      type: z.string(),
      name: z.string(),
      email: z.string(),
    })
  ),
  groups: z.array(
    z.object({
      id: z.string().min(1),
      name: z.string(),
    })
  ),
});

export type Dpt = z.infer<typeof schemaDpt>;
export function fetchDpt() {
  const dt = ref<Dpt | undefined>(undefined);
  const url =
    enviroment === "DEV"
      ? "https://run.mocky.io/v3/e2053a35-39e2-4b02-b9c3-7908267d3612"
      : `${window.location.origin}/chatlist/users_and_groups`;

  fetcher(schemaDpt, url)
    .then((response) => {
      dt.value = response;
    })
    .catch((error) => console.log(error));

  return dt;
}

// REQUISIÇÃO DE FUNIL
export const schemaFunnels = z.array(
  z.object({
    id: z.string().min(1),
    name: z.string(),
    steps: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    ),
  })
);

export type Funis = z.infer<typeof schemaFunnels>;

export function fetchFunnels() {
  const dt = ref<Funis | []>([]);
  const url =
    enviroment === "DEV"
      ? "https://run.mocky.io/v3/8586f883-b690-4365-8989-b6ee66dea738"
      : `${window.location.origin}/chatlist/funnels`;

  fetcher(schemaFunnels, url)
    .then((response) => (dt.value = response))
    .catch((error) => console.log(error));

  return dt;
}

// REQUISIÇÂO DE DEVICES
export const schemaDevices = z.array(
  z.object({
    id: z.string().min(1),
    description: z.string(),
    owner_wa_id: z.string(),
  })
);

export type Devices = z.infer<typeof schemaDevices>;

export function fetchDevices() {
  const dt = ref<Devices>([]);
  const url =
    enviroment === "DEV"
      ? "https://run.mocky.io/v3/9ec958b0-004f-4cea-a2b3-c8ba266d5064"
      : `${window.location.origin}/chatlist/phones`;

  fetcher(schemaDevices, url)
    .then((response) => (dt.value = response))
    .catch((error) => console.log(error));

  return dt;
}

// REQUISIÇÂO ONLINE
export const schemaOnline = z.object({
  groups: z.array(
    z.object({
      id: z.string(),
      is_online: z.boolean(),
      name: z.string(),
      users: z.array(z.string()),
    })
  ),
  users: z.array(
    z.object({
      email: z.string(),
      id: z.string(),
      is_online: z.boolean(),
      name: z.string(),
    })
  ),
});

export type OnlineType = z.infer<typeof schemaOnline>;

export function fetchOnline() {
  const dt = ref<OnlineType>();
  const url =
    enviroment === "DEV"
      ? "https://run.mocky.io/v3/7c9c2989-e157-4cca-9d61-fe22bba4ce0f"
      : `${window.location.origin}/get_users_and_groups`;

  fetcher(schemaOnline, url)
    .then((response) => {
      dt.value = response;
    })
    .catch((error) => console.log(error));

  return dt;
}

// REQUISIÇÂO CHATS
export const fullCards = ref<Chats>();

export const schemaChats = z
  .object({
    total_chats: z.number(),
    total_returned: z.number(),
    page_num: z.number(),
    chats: z.array(
      z.object({
        id: z.string().min(1),
        phone_id: z.string(),
        account_id: z.string().min(1),
        wa_chat_id: z.string(),
        name: z.string(),
        kind: z.string(),
        picture: z.string().nullable(),
        status: z.string().nullable(),
        favorite: z.boolean(),
        archived: z.boolean(),
        scheduled: z.boolean(),
        new_messages: z.number(),
        updated: z.string(),
        created: z.string(),
        last_message: z.object({
          text: z.string().nullable(),
          date: z.string().nullable(),
        }),
        users_delegated_ids: z.array(z.string()),
        groups_delegated_ids: z.array(z.string()),
        funnel_steps_ids: z.array(z.string()),
        tags: z.array(
          z.object({ text: z.string(), color: z.string(), bg: z.string() })
        ),
      })
    ),
  })
  .transform(({ chats }) => chats);

export type Chats = z.infer<typeof schemaChats>;
export function fetchChatsMock() {
  const dt = ref<Chats | undefined>(undefined);
  const url = "https://run.mocky.io/v3/eae31c54-ae3d-41f7-9586-ce3e4d8e20b9";

  fetcher(schemaChats, url)
    .then((response) => {
      fullCards.value = response;
      // console.log(dt.value)
    })
    .catch((error) => console.log(error));
}

export function fetchChatsMonolito() {
  const dt = ref<Chats | undefined>(undefined);
  const url = `${window.location.origin}/chatlist/store`;

  fetcher(schemaChats, url, {
    method: "POST",
    body: JSON.stringify({
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
    }),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((response) => (fullCards.value = response))
    .catch((error) => console.log(error));
}

export function fetchCard() {
  return enviroment === "DEV" ? fetchChatsMock() : fetchChatsMonolito();
}

// REQUISIÇAO CARDS NO SCROLL
export function fetchChatsOnScroll() {
  const dt = ref<Chats | undefined>(undefined);
  const url =
    enviroment === "DEV"
      ? "https://run.mocky.io/v3/eae31c54-ae3d-41f7-9586-ce3e4d8e20b9"
      : `${window.location.origin}/chatlist/store`;
  loadingDots.value = true;

  fetcher(schemaChats, url, {
    method: "POST",
    body: JSON.stringify({
      page_num: fields.page_num,
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
    }),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((response) => {
      fullCards.value = fullCards?.value?.concat(response);

      response.length === 0
        ? (hiddenObserver.value = false)
        : (hiddenObserver.value = true);
      loadingDots.value = false;
    })
    .catch((error) => console.log(error));
}


// TOKEN
export const tokenInfo = ref<tokenType>();

export const schemaToken2 = z.object({
  user_type: z.string(),
  permissions: z.array(z.string()),
  account_id: z.string().min(1),
  timezone: z.string(),
  user_name: z.string(),
  user_id: z.string().min(1),
  super_level: z.number(),
  groups_ids: z.array(z.string()),
  account_features: z.array(z.string()),
  exp: z.number(),
  iat: z.number(),
});

export const schemaToken = z.string();
export type tokenType = z.infer<typeof schemaToken2>;

export function fetchToken() {
  const dt = ref<tokenType>();
  const decode = (token: string): string =>
    decodeURIComponent(
      atob(token.split(".")[1].replace("-", "+").replace("_", "/"))
        .split("")
        .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join("")
    );

  const url =
    enviroment === "DEV"
      ? "https://run.mocky.io/v3/539721dd-cb03-4d27-b0ef-9f6acd1cfe20"
      : `${window.location.origin}/jwt/user-service-token`;

  fetch(url, {
    headers: {
      "Content-Type": "text/plain; charset=UTF-8",
    },
  })
    .then((response) => response.text())
    .then((json) => decode(json))
    .then((token) => JSON.parse(token))
    .then((token) => {
      const parsedData = schemaToken2.safeParse(token);

      if (parsedData.success) {
        tokenInfo.value = parsedData.data;
        tokenFilter(parsedData.data);
      } else {
        console.log(parsedData.error);
      }
    })
    .catch((error) => console.log(error));
}

fetchToken();
