import i18next from 'i18next';

import { i18nNamespaces } from './i18n';
import resources from './i18n/locales';
import { toEventHistory } from './models/event-history';
import {
  toWorkflowExecution,
  toWorkflowExecutions,
} from './models/workflow-execution';
import { workflowStatuses } from './models/workflow-status';
import { eventViewType } from './stores/event-view';
import { pauseLiveUpdates } from './stores/events';
import { currentEventHistory, fullEventHistory } from './stores/events';
import type { WorkflowRunWithWorkers } from './stores/workflow-run';
import { workflowRun } from './stores/workflow-run';
import type { HistoryEvent, WorkflowEvent } from './types/events';
import type {
  ListWorkflowExecutionsResponse,
  WorkflowExecution,
} from './types/workflows';
import { formatDistanceAbbreviated } from './utilities/format-time';
import { toWorkflowStatusReadable } from './utilities/screaming-enums';

import WorkflowStatus from './components/workflow-status.svelte';
import WorkflowHistoryLayout from './layouts/workflow-history-layout.svelte';
import WorkflowRunLayout from './layouts/workflow-run-layout.svelte';
import WorkflowsWithNewSearch from './pages/workflows-with-new-search.svelte';

export {
  currentEventHistory,
  eventViewType,
  formatDistanceAbbreviated,
  fullEventHistory,
  pauseLiveUpdates,
  toEventHistory,
  toWorkflowExecution,
  toWorkflowExecutions,
  toWorkflowStatusReadable,
  WorkflowHistoryLayout,
  workflowRun,
  WorkflowRunLayout,
  WorkflowStatus,
  workflowStatuses,
  WorkflowsWithNewSearch,
};

export type {
  HistoryEvent,
  ListWorkflowExecutionsResponse,
  WorkflowEvent,
  WorkflowRunWithWorkers,
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

export function calculateElapsedTime(workflow: WorkflowExecution) {
  return formatDistanceAbbreviated({
    start: workflow?.startTime,
    end: workflow?.endTime || Date.now(),
    includeMilliseconds: true,
  });
}
