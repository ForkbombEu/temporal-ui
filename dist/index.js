import i18next from 'i18next';
import { i18nNamespaces } from './i18n';
import resources from './i18n/locales';
import { toEventHistory } from './models/event-history';
import { toWorkflowExecution, toWorkflowExecutions, } from './models/workflow-execution';
import { workflowStatuses } from './models/workflow-status';
import { eventViewType } from './stores/event-view';
import { pauseLiveUpdates } from './stores/events';
import { currentEventHistory, fullEventHistory } from './stores/events';
import { workflowRun } from './stores/workflow-run';
import { formatDistanceAbbreviated } from './utilities/format-time';
import { toWorkflowStatusReadable } from './utilities/screaming-enums';
import WorkflowStatus from './components/workflow-status.svelte';
import WorkflowHistoryLayout from './layouts/workflow-history-layout.svelte';
import WorkflowRunLayout from './layouts/workflow-run-layout.svelte';
import WorkflowsWithNewSearch from './pages/workflows-with-new-search.svelte';
export { currentEventHistory, eventViewType, formatDistanceAbbreviated, fullEventHistory, pauseLiveUpdates, toEventHistory, toWorkflowExecution, toWorkflowExecutions, toWorkflowStatusReadable, WorkflowHistoryLayout, workflowRun, WorkflowRunLayout, WorkflowStatus, workflowStatuses, WorkflowsWithNewSearch, };
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
export function calculateElapsedTime(workflow) {
    return formatDistanceAbbreviated({
        start: workflow === null || workflow === void 0 ? void 0 : workflow.startTime,
        end: (workflow === null || workflow === void 0 ? void 0 : workflow.endTime) || Date.now(),
        includeMilliseconds: true,
    });
}
