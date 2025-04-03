<script>var _a, _b, _c, _d;
import { page } from '$app/stores';
import EventSummaryTable from './event-summary-table.svelte';
import TabButton from '../../holocene/tab-buttons/tab-button.svelte';
import TabButtons from '../../holocene/tab-buttons/tab-buttons.svelte';
import WorkflowHistoryJson from '../../pages/workflow-history-json.svelte';
import { eventFilterSort, eventViewType } from '../../stores/event-view';
import { fullEventHistory } from '../../stores/events';
import { eventCategoryFilter } from '../../stores/filters';
import { workflowRun } from '../../stores/workflow-run';
export let history;
export let groups;
export let minimized = true;
$: ({ workflow } = $workflowRun);
$: reverseSort = $eventFilterSort === 'descending';
$: updating = !$fullEventHistory.length;
$: compact = $eventViewType === 'compact';
$: $eventCategoryFilter = ((_b = (_a = $page.url) === null || _a === void 0 ? void 0 : _a.searchParams) === null || _b === void 0 ? void 0 : _b.get('category'))
    ? (_d = (_c = $page.url) === null || _c === void 0 ? void 0 : _c.searchParams) === null || _d === void 0 ? void 0 : _d.get('category').split(',')
    : undefined;
$: pendingActivities = workflow.pendingActivities;
$: pendingNexusOperations = workflow.pendingNexusOperations;
$: items = compact
    ? groups
    : reverseSort
        ? [...pendingNexusOperations, ...pendingActivities, ...history]
        : [...history, ...pendingActivities, ...pendingNexusOperations];
const onAllClick = () => {
    $eventViewType = 'feed';
};
const onCompactClick = () => {
    $eventViewType = 'compact';
};
const onJSONClick = () => {
    $eventViewType = 'json';
};
</script>

<div class="flex items-center justify-end gap-4 pt-4 lg:pt-8">
  <div class="flex items-center gap-2 px-4">
    <TabButtons>
      <TabButton
        active={$eventViewType === 'feed'}
        data-testid="feed"
        icon="feed"
        class="h-10"
        on:click={onAllClick}>All</TabButton
      >
      <TabButton
        active={$eventViewType === 'compact'}
        data-testid="compact"
        icon="compact"
        class="h-10"
        on:click={onCompactClick}>Compact</TabButton
      >
      <TabButton
        active={$eventViewType === 'json'}
        data-testid="json"
        icon="json"
        class="h-10"
        on:click={onJSONClick}>JSON</TabButton
      >
    </TabButtons>
  </div>
</div>
{#if $eventViewType === 'json'}
  <div class="border-t border-subtle px-4">
    <WorkflowHistoryJson />
  </div>
{:else}
  <div data-testid="event-summary-table">
    <EventSummaryTable {updating} {items} {groups} {compact} {minimized} />
  </div>
{/if}
