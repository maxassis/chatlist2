import { ref } from 'vue'
import { formatDistance } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import format from "date-fns/format";
import intervalToDuration from "date-fns/intervalToDuration";
import { zonedTimeToUtc, utcToZonedTime } from "date-fns-tz";

//REFS
export const hours = ref(false);

export function dateCalc(dt: string, timezone: string) {
    // ESSE DATEFORMATTED É NECESSÁRIO PARA FUNCIONAR NO SAFARI
    const dateFormatted = dt.replace(/\s/, "T");
  
    const serverTimeZone = "Africa/Dakar";
    const userTimeZone = timezone;
  
    // HORÁRIOS NO FUSO DO SERVIDOR
    const date = new Date(dateFormatted);
    const dateInServerZone = zonedTimeToUtc(date, serverTimeZone);
  
    // HORÁRIOS NO FUSO DO USUÁRIO
    const hourNow = new Date();
    const dateInUserZone = utcToZonedTime(dateInServerZone, userTimeZone);
    const hournowInUserZone = utcToZonedTime(hourNow, userTimeZone);
  
    // CALCULA DISTANCIA DE TEMPO ENTRE A HORA ATUAL NO SERVIDOR E A HORA DA ATUALIZAÇÃO DO CARD
    const distanceInWords = formatDistance(dateInUserZone, hournowInUserZone, {
      includeSeconds: true,
      locale: ptBR,
    });
  
    // VERIFICA SE A MENSAGEM FOI ENVIADA HÁ MAIS DE 24HS
    const interval = intervalToDuration({
      start: dateInUserZone,
      end: hournowInUserZone,
    });
  
    if (interval.days && interval.days < 1) {
      hours.value = true;
      return format(dateInUserZone, "HH:mm");
    } else {
      hours.value = false;
      return distanceInWords;
    }
  }


