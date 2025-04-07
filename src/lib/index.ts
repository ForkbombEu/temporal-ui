import i18next from 'i18next';

import { i18nNamespaces } from './i18n';
import resources from './i18n/locales';
import { toEventHistory } from './models/event-history';
import {
  toWorkflowExecution,
  toWorkflowExecutions,
} from './models/workflow-execution';
import { eventViewType } from './stores/event-view';
import { currentEventHistory, fullEventHistory } from './stores/events';
import type { WorkflowRunWithWorkers } from './stores/workflow-run';
import { workflowRun } from './stores/workflow-run';
import type { HistoryEvent, WorkflowEvent } from './types/events';
import type { ListWorkflowExecutionsResponse } from './types/workflows';
import { toWorkflowStatusReadable } from './utilities/screaming-enums';

import WorkflowStatus from './components/workflow-status.svelte';
import WorkflowHistoryLayout from './layouts/workflow-history-layout.svelte';
import WorkflowRunLayout from './layouts/workflow-run-layout.svelte';
import WorkflowsWithNewSearch from './pages/workflows-with-new-search.svelte';

export {
  eventViewType,
  toEventHistory,
  currentEventHistory,
  fullEventHistory,
  toWorkflowExecution,
  toWorkflowExecutions,
  WorkflowHistoryLayout,
  workflowRun,
  WorkflowsWithNewSearch,
  WorkflowStatus,
  toWorkflowStatusReadable,
  WorkflowRunLayout,
};

export type {
  HistoryEvent,
  WorkflowRunWithWorkers,
  WorkflowEvent,
  ListWorkflowExecutionsResponse,
};

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
