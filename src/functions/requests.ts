import { ref } from "vue";
import { z } from "zod";
import { createZodFetcher } from "zod-fetch";

const fetcher = createZodFetcher();

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
  const url = "http://localhost:3000/tags";

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
  const url = "http://localhost:3000/users_and_groups";

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
  const dt = ref<Funis | undefined>(undefined);
  const url = "http://localhost:3000/funnels";

  fetcher(schemaFunnels, url)
    .then((response) => (dt.value = response))
    .catch((error) => console.log(error));

  return dt;
}

