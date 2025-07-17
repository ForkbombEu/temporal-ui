<script>import Paginated from '../../holocene/table/paginated-table/paginated.svelte';
import { translate } from '../../i18n/translate';
import { isEventGroup } from '../../models/event-groups';
import { isEvent } from '../../models/event-history';
import { fullEventHistory } from '../../stores/events';
import { eventStatusFilter } from '../../stores/filters';
import { getFailedOrPendingEvents } from '../../utilities/get-failed-or-pending';
import { isPendingActivity, isPendingNexusOperation, } from '../../utilities/is-pending-activity';
import HistoryGraph from '../lines-and-dots/svg/history-graph.svelte';
import EventEmptyRow from './event-empty-row.svelte';
import EventSummaryRow from './event-summary-row.svelte';
import PendingActivitySummaryRow from './pending-activity-summary-row.svelte';
import PendingNexusSummaryRow from './pending-nexus-summary-row.svelte';
export let items;
export let groups = [];
export let updating = false;
export let loading = false;
export let compact = false;
export let minimized = true;
export let expandAll = false;
export let showGraph = !compact;
$: initialItem = $fullEventHistory === null || $fullEventHistory === void 0 ? void 0 : $fullEventHistory[0];
const history = (items) => {
    return items;
};
$: filteredForStatus = (items) => getFailedOrPendingEvents(items, $eventStatusFilter);
</script>

<Paginated
  perPageLabel={translate('common.per-page')}
  nextPageButtonLabel={translate('common.next-page')}
  previousPageButtonLabel={translate('common.previous-page')}
  pageButtonLabel={(page) => translate('common.go-to-page', { page })}
  {updating}
  items={filteredForStatus(items)}
  let:visibleItems
  variant="split"
  maxHeight={minimized ? 'calc(100vh - 200px)' : '20000px'}
>
  {#if showGraph}
    <HistoryGraph {groups} history={history(visibleItems)} />
  {/if}
  <div class="w-full">
    {#each visibleItems as event, index (JSON.stringify(event))}
      {#if isEventGroup(event)}
        <EventSummaryRow
          {event}
          {index}
          group={event}
          {compact}
          {expandAll}
          {initialItem}
        />
      {:else if isPendingActivity(event)}
        <PendingActivitySummaryRow
          {event}
          {index}
          group={groups.find(
            (g) =>
              isPendingActivity(event) && g?.pendingActivity?.id === event.id,
          )}
          {expandAll}
        />
      {:else if isPendingNexusOperation(event)}
        <PendingNexusSummaryRow
          {event}
          {index}
          group={groups.find(
            (g) =>
              isPendingNexusOperation(event) &&
              g?.pendingNexusOperation?.scheduledEventId ===
                event.scheduledEventId,
          )}
          {expandAll}
        />
      {:else}
        <EventSummaryRow
          {event}
          {index}
          group={groups.find((g) => isEvent(event) && g.eventIds.has(event.id))}
          {compact}
          {expandAll}
          {initialItem}
        />
      {/if}
    {:else}
      <EventEmptyRow loading={!$fullEventHistory.length || loading} />
    {/each}
  </div>
</Paginated>
