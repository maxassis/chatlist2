import { ref } from "vue";
import { z } from "zod";
import { createZodFetcher } from "zod-fetch";

const fetcher = createZodFetcher();
const environment = "dev"  // dev | prod

// REQUISIÇÃO DE TAGS
const schemaTags = z.array(
  z.object({
    id: z.string().min(1),
    text: z.string().min(1),
    color: z.string(),
    bg: z.string(),
  })
);

export type Tags = z.infer<typeof schemaTags>;

export function fetchTags() {
  const dt = ref<Tags>([]);
  const url = environment === "dev" ? "http://localhost:3000/tags" : "";

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
      type: z.string().min(1),
      name: z.string().min(1),
      email: z.string().min(1),
    })
  ),
  groups: z.array(
    z.object({
      id: z.string().min(1),
      name: z.string().min(1),
    })
  ),
});

export type Dpt = z.infer<typeof schemaDpt>;
export function fetchDpt() {
  const dt = ref<Dpt | undefined>(undefined);
  const url =  environment === "dev" ? "http://localhost:3000/users_and_groups" :  "";

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
    name: z.string().min(1),
    steps: z.array(
      z.object({
        id: z.string().min(1),
        name: z.string().min(1),
      })
    ),
  })
);

export type Funis = z.infer<typeof schemaFunnels>;

export function fetchFunnels() {
  const dt = ref<Funis | []>([]);
  const url = environment === "dev" ? "http://localhost:3000/funnels" : "";

  fetcher(schemaFunnels, url)
    .then((response) => (dt.value = response))
    .catch((error) => console.log(error));

  return dt;
}

// REQUISIÇÂO DE DEVICES
export const schemaDevices = z.array(
  z.object({
     id: z.string().min(1),
     description: z.string().min(1),
     owner_wa_id: z.string() 
    })
  )

export type Devices = z.infer<typeof schemaDevices>; 

export function fetchDevices() {
  const dt = ref<Devices>([]);
  const url = environment === "dev" ? "http://localhost:3000/devices" : "";

  fetcher(schemaDevices, url)
    .then((response) => (dt.value = response))
    .catch((error) => console.log(error));

  return dt;
}


// REQUISIÇÂO CHATS
// export const schemaChats = z.object({
//   total_chats: z.number(),
//   total_returned: z.number(),
//   page_num: z.number(),
//   chats: z.array(
//     z.object({
//       id: z.string().min(1),
//       phone_id: z.string(),
//       account_id: z.string(),
//       wa_chat_id: z.string(),
//       name: z.string(),
//       kind: z.string(),
//       picture: z.string(),
//       status: z.string(),
//       favorite: z.boolean(),
//       archived: z.boolean(),
//       scheduled: z.boolean(),
//       new_messages: z.number(),
//       updated: z.string(),
//       created: z.string(),
//       last_message: z.object({ text: z.string(), date: z.string() }),
//       users_delegated_ids: z.array(z.string()),
//       groups_delegated_ids: z.array(z.string()),
//       funnel_steps_ids: z.array(z.string()),
//       tags: z.array(
//         z.object({ text: z.string(), color: z.string(), bg: z.string() })
//       )
//     })
//   )
// })

