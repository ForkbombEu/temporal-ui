<script>var _a;
import { page } from '$app/stores';
import EventSummaryRow from '../components/event/event-summary-row.svelte';
import Button from '../holocene/button.svelte';
import { groupEvents } from '../models/event-groups';
import { isEvent } from '../models/event-history';
import { fetchAllEvents } from '../services/events-service';
import { eventFilterSort } from '../stores/event-view';
import { fullEventHistory } from '../stores/events';
import { workflowRun } from '../stores/workflow-run';
$: ({
    id: eventId,
    namespace,
    workflow: workflowId,
    run: runId,
} = $page.params);
$: ids = [eventId];
const resetFullHistory = () => {
    $fullEventHistory = [];
};
const fetchEvents = async (namespace, workflowId, runId) => {
    if (!$fullEventHistory.length) {
        resetFullHistory();
        $fullEventHistory = await fetchAllEvents({
            namespace,
            workflowId,
            runId,
        });
    }
};
$: fetchEvents(namespace, workflowId, runId);
$: ({ workflow } = $workflowRun);
$: pendingActivities = workflow === null || workflow === void 0 ? void 0 : workflow.pendingActivities;
$: pendingNexusOperations = workflow === null || workflow === void 0 ? void 0 : workflow.pendingNexusOperations;
$: ascendingGroups = groupEvents($fullEventHistory, 'ascending', pendingActivities, pendingNexusOperations);
$: groups =
    $eventFilterSort === 'ascending'
        ? ascendingGroups
        : [...ascendingGroups].reverse();
$: visibleItems = $fullEventHistory.filter((e) => ids.includes(e.id));
$: loading = !visibleItems.length;
const loadPrevious = () => {
    const firstId = parseInt(ids[0]);
    const previousTen = [];
    const start = firstId - 10;
    for (let i = 0; i < 10; i++) {
        if (start + i > 0) {
            previousTen.push((start + i).toString());
        }
    }
    ids = [...previousTen, ...ids];
};
const loadNext = () => {
    const lastId = parseInt(ids[ids.length - 1]);
    const nextTen = [];
    const start = lastId + 1;
    for (let i = 0; i < 10; i++) {
        if (start + i <= $fullEventHistory.length) {
            nextTen.push((start + i).toString());
        }
    }
    ids = [...ids, ...nextTen];
};
$: lastEventId = (_a = $fullEventHistory[$fullEventHistory.length - 1]) === null || _a === void 0 ? void 0 : _a.id;
</script>

<div
  class="flex flex-col gap-2 px-8 pb-24 pt-2"
  data-testid="event-summary-log"
>
  <Button
    variant="secondary"
    size="xs"
    leadingIcon="arrow-up"
    on:click={loadPrevious}
    disabled={ids[0] === '1' || loading}
    data-testid="load-previous">Show Previous 10</Button
  >
  <table>
    <thead></thead>
    <tbody>
      {#each visibleItems as event, index (event.id)}
        <EventSummaryRow
          {event}
          {index}
          group={groups.find((g) => isEvent(event) && g.eventIds.has(event.id))}
          initialItem={$fullEventHistory[0]}
        />
      {/each}
    </tbody>
  </table>
  <Button
    variant="secondary"
    size="xs"
    leadingIcon="arrow-down"
    on:click={loadNext}
    disabled={ids[ids.length - 1] === lastEventId || loading}
    data-testid="load-next">Show Next 10</Button
  >
</div>

<style>
  tbody :global(tr.dense) {
    height: 2rem
}
tbody :global(tr.dense):hover {
    cursor: pointer;
    background-color: rgb(var(--color-interactive-table-hover));
    background-attachment: fixed
}
    tbody :global(tr.expanded) {
    width: 100%
}
    tbody :global(tr.expanded):hover {
    background-color: rgb(var(--color-surface-primary))
}
    tbody :global(tr.dense:nth-of-type(odd)) {
    background-color: rgb(var(--color-surface-primary));
    color: rgb(var(--color-text-primary))
}
    tbody :global(tr.dense:nth-of-type(odd)):hover {
    background-color: rgb(var(--color-interactive-table-hover))
}
    tbody :global(tr.dense.expanded) {
    background-color: rgb(var(--color-interactive-secondary-active))
}
    tbody :global(tr.dense.active) {
    background-color: rgb(var(--color-interactive-table-hover))
}
    tbody :global(tr > td) {
    white-space: nowrap;
    padding: 0.5rem
}
    tbody :global(tr > td > .table-link):hover {
    --tw-text-opacity: 1;
    color: rgb(29 100 216 / var(--tw-text-opacity));
    text-decoration-line: underline;
    text-decoration-color: #1D64D8
}</style>
