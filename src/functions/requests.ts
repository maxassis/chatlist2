import { ref } from "vue";
import { z } from "zod";
import { createZodFetcher } from "zod-fetch";

const fetcher = createZodFetcher();

const schema = z.array(
  z.object({
    id: z.string().min(1),
    text: z.string(),
    color: z.string(),
    bg: z.string(),
  })
);

export type Tags = z.infer<typeof schema>;

export function fetchTags() {
   const dt = ref<Tags>([])
   
   fetcher(schema, "http://localhost:3000/tags")
  .then((response) => dt.value = response)
  .catch((error) => console.log(error));

  return dt
}




