import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { faBars, faChartSimple, faSchool, faRss, faRightFromBracket, faPenToSquare, faTrashCan, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export default defineNuxtPlugin((nuxtApp) => {
  library.add(faBars, faChartSimple, faSchool, faRss, faRightFromBracket, faPenToSquare, faTrashCan, faMagnifyingGlass);
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon);
});