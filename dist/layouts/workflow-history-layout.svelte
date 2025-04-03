<script>import { beforeNavigate } from '$app/navigation';
import { page } from '$app/stores';
import EventSummary from '../components/event/event-summary.svelte';
import EventTypeFilter from '../components/lines-and-dots/event-type-filter.svelte';
import InputAndResults from '../components/lines-and-dots/input-and-results.svelte';
import TimelineGraph from '../components/lines-and-dots/svg/timeline-graph.svelte';
import WorkflowError from '../components/lines-and-dots/workflow-error.svelte';
import DownloadEventHistoryModal from '../components/workflow/download-event-history-modal.svelte';
import WorkflowCallStackError from '../components/workflow/workflow-call-stack-error.svelte';
import WorkflowCallbacks from '../components/workflow/workflow-callbacks.svelte';
import ToggleButton from '../holocene/toggle-button/toggle-button.svelte';
import ToggleButtons from '../holocene/toggle-button/toggle-buttons.svelte';
import { translate } from '../i18n/translate';
import { groupEvents } from '../models/event-groups';
import { clearActives } from '../stores/active-events';
import { eventFilterSort, eventViewType, minimizeEventView, } from '../stores/event-view';
import { currentEventHistory, filteredEventHistory, pauseLiveUpdates, } from '../stores/events';
import { workflowRun } from '../stores/workflow-run';
import { getWorkflowTaskFailedEvent } from '../utilities/get-workflow-task-failed-event';
$: ({ namespace } = $page.params);
$: ({ workflow } = $workflowRun);
$: pendingActivities = workflow === null || workflow === void 0 ? void 0 : workflow.pendingActivities;
$: pendingNexusOperations = workflow === null || workflow === void 0 ? void 0 : workflow.pendingNexusOperations;
$: reverseSort = $eventFilterSort === 'descending';
$: compact = $eventViewType === 'compact';
$: ascendingGroups = groupEvents($filteredEventHistory, 'ascending', pendingActivities, pendingNexusOperations);
$: groups = reverseSort ? [...ascendingGroups].reverse() : ascendingGroups;
$: history = reverseSort
    ? [...$filteredEventHistory].reverse()
    : $filteredEventHistory;
$: workflowTaskFailedError = getWorkflowTaskFailedEvent($currentEventHistory, 'ascending');
$: $eventViewType, clearActives();
beforeNavigate(() => {
    clearActives();
});
$: {
    if (!workflow.isRunning && $pauseLiveUpdates) {
        $pauseLiveUpdates = false;
    }
}
let showDownloadPrompt = false;
const onSort = () => {
    if (reverseSort) {
        $eventFilterSort = 'ascending';
    }
    else {
        $eventFilterSort = 'descending';
    }
};
</script>

<div class="flex flex-col gap-0 px-2 pt-4 md:px-4 lg:px-8">
  <WorkflowCallStackError />
  <div class="flex flex-col gap-2">
    <InputAndResults />
    {#if workflowTaskFailedError}
      <WorkflowError
        error={workflowTaskFailedError}
        pendingTask={workflow?.pendingWorkflowTask}
      />
    {/if}
    {#if workflow?.callbacks?.length}
      <WorkflowCallbacks callbacks={workflow.callbacks} />
    {/if}
  </div>
</div>
<div class="relative px-2 pb-24 md:px-4 lg:px-8">
  <div
    class="flex items-center justify-between gap-2 py-2 xl:gap-8"
    class:sticky-header={!$minimizeEventView}
  >
    <h2>
      {translate('workflows.event-history')}
    </h2>
    <div class="flex items-center gap-2">
      <ToggleButtons>
        {#if $eventViewType !== 'json'}
          <ToggleButton
            icon={reverseSort ? 'descending' : 'ascending'}
            data-testid="zoom-in"
            on:click={onSort}
            >{reverseSort ? 'Descending' : 'Ascending'}</ToggleButton
          >
        {/if}
        <ToggleButton
          icon={$minimizeEventView ? 'minimize' : 'expand'}
          data-testid="expandAll"
          tooltip={$minimizeEventView
            ? 'Timeline and Event History are collapsed to minimized height'
            : 'Timeline and Event History are expanded to full height'}
          on:click={() => ($minimizeEventView = !$minimizeEventView)}
          >{$minimizeEventView ? 'Minimized' : 'Expanded'}</ToggleButton
        >
        <EventTypeFilter {compact} minimized={$minimizeEventView} />
        <ToggleButton
          disabled={!workflow.isRunning}
          icon={$pauseLiveUpdates ? 'play' : 'pause'}
          data-testid="pause"
          on:click={() => ($pauseLiveUpdates = !$pauseLiveUpdates)}
        >
          {$pauseLiveUpdates ? 'Resume' : 'Pause'}
        </ToggleButton>
        <ToggleButton
          data-testid="download"
          icon="download"
          on:click={() => (showDownloadPrompt = true)}
        >
          {translate('common.download')}
        </ToggleButton>
      </ToggleButtons>
    </div>
  </div>
  <div
    class="flex w-full flex-col border border-subtle {!$minimizeEventView &&
      'border-t-0'}"
  >
    <TimelineGraph
      {workflow}
      {groups}
      {workflowTaskFailedError}
      viewportHeight={$minimizeEventView ? 360 : undefined}
    />
    <EventSummary {groups} {history} minimized={$minimizeEventView} />
  </div>
</div>
<DownloadEventHistoryModal
  bind:open={showDownloadPrompt}
  {namespace}
  workflowId={workflow.id}
  runId={workflow.runId}
/>

<style>
  .sticky-header {
    position: sticky;
    top: 0px;
    z-index: 30;
    border-bottom-width: 1px;
    border-color: rgb(var(--color-border-subtle));
    background-color: rgb(248 250 252 / 0.5)
}
@media (min-width: 768px) {
    .sticky-header {
        top: 3rem
    }
}
.sticky-header:where([data-theme="dark"], [data-theme="dark"] *) {
    background-color: rgb(20 20 20 / 0.5)
}</style>
