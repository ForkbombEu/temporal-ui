import i18next from 'i18next';
import { i18nNamespaces } from './i18n';
import resources from './i18n/locales';
import { toEventHistory } from './models/event-history';
import { toWorkflowExecution, toWorkflowExecutions, } from './models/workflow-execution';
import { eventViewType } from './stores/event-view';
import { currentEventHistory, fullEventHistory } from './stores/events';
import { workflowRun } from './stores/workflow-run';
import WorkflowView from './custom.svelte';
import WorkflowHistoryLayout from './layouts/workflow-history-layout.svelte';
import WorkflowsWithNewSearch from './pages/workflows-with-new-search.svelte';
export { eventViewType, toEventHistory, currentEventHistory, fullEventHistory, toWorkflowExecution, toWorkflowExecutions, WorkflowHistoryLayout, workflowRun, WorkflowsWithNewSearch, WorkflowView, };
//
export async function initI18n() {
    await i18next.init({
        fallbackLng: 'en',
        load: 'languageOnly',
        ns: i18nNamespaces,
        defaultNS: 'common',
        detection: {
            order: ['querystring', 'localStorage', 'navigator'],
            caches: ['localStorage'],
            lookupQuerystring: 'lng',
            lookupLocalStorage: 'locale',
        },
        resources,
    });
}
