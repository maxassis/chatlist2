import type { singleCardType } from "@/types";
import { tokenInfo } from "./requests";
import { fields } from "./app-functions";
import { fullCards } from "./requests";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getIntersection = <T,_>(a: T[], ...arr: T[][]): T[] => [...new Set(a)].filter((v) => arr.every((b) => b.includes(v)));

export function updateCard(dt: singleCardType) {
    //this.webSocketInput = dt;
    console.log("recebendo webSocket ", dt);

    // aplica os filtros
    const filters = [
      removeBecauseOfArchived,
      removeBecauseOfName,
      removeBecauseOfNumber,
      removeBecauseOfDevice,
      removeBecauseOfBroadcast,
      removeBecauseOfNewMessages,
      removeBecauseOfFavorites,
      removeBecauseOfScheduled,
      removeBecauseOfFunnels,
      removeBecauseOfStatus,
      removeBecauseOfUserOrDepartment,
      removeBecauseOfTags,
      removeBecauseOfTokenPermissions,
    ];
    
    //remove os card
    const shouldRemove = filters.some(filter => filter(dt));
    if (shouldRemove) {
      fullCards.value = fullCards.value.filter(card => card.id !== dt.id);
      return;
    }
  
    //atualiza o card
    const index = fullCards.value.findIndex(card => card.id === dt.id);
    if (index !== -1) {
      fullCards.value[index] = dt;
     orderRefresh();
    } else {
      orderByDate(dt);
    }
}


function removeBecauseOfArchived(dt: singleCardType) {
    if ((dt.archived === true && fields.archiveSearch === false) ||
        (dt.archived === false && fields.archiveSearch === true)) {
        return true;
    }
    return false;
}

function removeBecauseOfFunnels(dt: singleCardType) {
    // Se tem funis marcados e o chat não tem nenhum funil
    if (fields.funnels.length > 0 && dt.funnel_steps_ids.length === 0) {
        return true;
    }
    else if (fields.funnels.length > 0) {
        // Verificar se há algum funil em comum
        // Se não nenhum funil marcado dentro dos que estão filtrados
        if (getIntersection(fields.funnels, dt.funnel_steps_ids).length === 0) {
            return true;
        }
    }
    return false;
}

function removeBecauseOfUserOrDepartment(dt: singleCardType) {            
      const totalSelected = fields.departments.users.concat(fields.departments.groups)
      const socketItems = dt.users_delegated_ids.concat(dt.groups_delegated_ids)

    // sem delegado  
      if (fields.departments.noDelegated && fields.allDpt === "") {
        if (dt.users_delegated_ids.length > 0 || dt.groups_delegated_ids.length > 0) {
            return true
        }
     } 
      else if (fields.departments.noDelegated && fields.allDpt === "and") {
        if (dt.users_delegated_ids.length > 0 || dt.groups_delegated_ids.length > 0) {
            return true
        }    
      }
      else if (fields.departments.noDelegated && fields.allDpt === "ne") {
        if (dt.users_delegated_ids.length === 0 && dt.groups_delegated_ids.length === 0) {
            return true
        }  
      } 

      // Se possui qualquer uma das tags
      if (fields.allDpt === "" && totalSelected.length > 0) {
          if (getIntersection(socketItems, totalSelected).length === 0) { 
              // não encontrou nenhum usuario
              return true;
          }
      }
      // Se possui todas as tags
      else if (fields.allDpt === "and") {
          if (getIntersection(socketItems, totalSelected).length < totalSelected.length) {
              // Se a intersection é menor que o total de usuarios então é pq não encontrou todas as tags
              return true;
          }
      }
      // Se não possui nenhuma das tags:
      else if (fields.allDpt === "ne") {
          if (getIntersection(socketItems, totalSelected).length > 0) {  
              // encontrou pelo menos 1 usuario
              return true;
          }
      }
      return false;
  
}

function removeBecauseOfTags(dt: singleCardType) {
    // if(fields.allTags === "") {
    //     return false;
    // }

    // Colocar as tags do chat em um array
    const objToArray = <T, K extends keyof T>(objs: T[], property: K): T[K][] => {
        return objs.map((obj) => obj[property]);
      };
    
      const arrTagsUser = objToArray(dt.tags, "text");

    // Se possui qualquer uma das tags
    if (fields.allTags === "" && fields.allTags.length > 0) {
        if (getIntersection(arrTagsUser, fields.tags).length === 0) {
            // não encontrou nenhuma tag
            return true;
        }
    }
    // Se possui todas as tags
    else if (fields.allTags === "and") {
        if (getIntersection(arrTagsUser, fields.tags).length < fields.tags.length) {
            // Se a intersection é meno que o total de tags do usuário então é pq não encontrou todas as tags
            return true;
        }
    }
    // Se não possui nenhuma das tags:
    else if (fields.allTags === "ne") {
        if (getIntersection(arrTagsUser, fields.tags).length > 0) {
            // encontrou pelo menos 1 tag
            return true;
        }
    }
    return false;
}

function removeBecauseOfNewMessages(dt: singleCardType) {
    if (fields.newMessages === true && dt.new_messages === 0) {
        return true;
    }
    return false;
}

function removeBecauseOfName(dt: singleCardType) {
    // Se campo de nome está preenchido e não encontra o nome no nome
    // que veio do websocket então retiraremos o card.
    if (fields.name != "" && !dt.name.toLowerCase().includes(fields.name.toLowerCase())) {
        return true;
    }
    return false;
}

function removeBecauseOfNumber(dt: singleCardType) {
    // Se campo de nome está preenchido e não encontra o nome no nome
    // que veio do websocket então retiraremos o card.
    if (fields.whatsNumber !== "" && !dt.wa_chat_id.includes(fields.whatsNumber)) {
        return true;
    }
    return false;
}

function removeBecauseOfDevice(dt: singleCardType) {
    if (fields.phone && (fields.phone !== dt.phone_id)) {
        return true;
    }
    return false;
}

function removeBecauseOfBroadcast(dt: singleCardType) {
    if (fields.broadcastSearch === true && dt.kind.toLowerCase() !== "broadcast") {
        return true;
    }
    return false;
}

function removeBecauseOfScheduled(dt: singleCardType) {
    if (fields.scheduledSearch === true && dt.scheduled == false) {
        return true;
    }
    return false;
}

function removeBecauseOfStatus(dt: singleCardType) {
    // Verifica se marcou status "indefinido"
    if (fields.status.toLowerCase() === 'indefinido') {
        // Se o chat tem status então retornamos true
        if (dt.status) {
            return true;
        }
        else {
            return false;
        }
    }
    // Verifica os demais status
    else if (fields.status.toLowerCase() !== '' && fields.status.toLowerCase() !== fields.status.toLowerCase()) {
        return true;
    }
    return false;
}

function removeBecauseOfFavorites(dt: singleCardType) {
    if (fields.favoritedSearch === true && dt.favorite === false) {
        return true;
    }
    return false;
}

function removeBecauseOfTokenPermissions(dt: singleCardType) {

    // caso o usuario seja ADMIN ou SUPER tenha permissao CHAT_SEE_ALL
    if (tokenInfo?.value?.user_type === "super" || tokenInfo?.value?.user_type === "admin" || tokenInfo?.value?.permissions.includes("CHAT_SEE_ALL")) {
        return false;
    }

    // filtra por usuario delegado, caso usuario seja NORMAL e não tem permissão CHAT_SEE_ALL == false
    if (tokenInfo?.value?.user_type === "normal" && !tokenInfo?.value?.permissions.includes("CHAT_SEE_ALL")) {
        // Verifica se o usuário está delegado ao chat
        if (dt.users_delegated_ids.includes(tokenInfo.value.user_id) === true) {
            return false;
        }
        // checa se o token possui permissao para algum grupo
        const intersection = getIntersection(dt.groups_delegated_ids, tokenInfo.value.groups_ids);

        // Verifica se o usuário está em algum grupo delegado ao chat:
        if (intersection.length > 0 && tokenInfo.value.permissions.includes("CHAT_VIEW_GROUP_CHATS")) {
            return false;
        }

    }
    return true;
}


function orderByDate(dt: singleCardType): void {
    interface SortingFunctions {
      [key: string]: (a: singleCardType, b: singleCardType) => number;
    }
  
    const sortingFunctions: SortingFunctions = {
      "-date_last_message": (a, b) => Date.parse(b.last_message.date as string) - Date.parse(a.last_message.date as string),
      "date_last_message": (a, b) => Date.parse(a.last_message.date as string) - Date.parse(b.last_message.date as string),
      "-new_messages": (a, b) => Date.parse(String(b.new_messages)) - Date.parse(String(a.new_messages)),
      "new_messages": (a, b) => Date.parse(String(a.new_messages)) - Date.parse(String(b.new_messages)),
      "-created": (a, b) => Date.parse(b.created) - Date.parse(a.created),
      "created": (a, b) => Date.parse(a.created) - Date.parse(b.created),
      "-updated": (a, b) => Date.parse(b.updated) - Date.parse(a.updated),
      "updated": (a, b) => Date.parse(a.updated) - Date.parse(b.updated),
    };
  
    const sortFunction = sortingFunctions[fields.date] || sortingFunctions["-updated"];
    const clone = [...fullCards.value, ...new Array(dt)];
    const results = clone.sort(sortFunction);
    const position = results.findIndex((o) => o.id === dt.id);
    fullCards.value.splice(position, 0, dt);
  }

function orderRefresh(): void {
    const sortFns: { [key: string]: (a: singleCardType, b: singleCardType ) => number } = {
      '-updated': (a, b) => Date.parse(b.updated) - Date.parse(a.updated),
      'updated': (a, b) => Date.parse(a.updated) - Date.parse(b.updated),
      '-new_messages': (a, b) => Date.parse(String(b.new_messages)) - Date.parse(String(a.new_messages)),
      'new_messages': (a, b) => Date.parse(String(a.new_messages)) - Date.parse(String(b.new_messages)),
    };
    const sortFn = sortFns[fields.date || '-updated'];
    fullCards.value.sort(sortFn);
  }