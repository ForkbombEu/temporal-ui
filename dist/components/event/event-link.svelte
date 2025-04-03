<script>var _a, _b, _c, _d;
import Link from '../../holocene/link.svelte';
import { translate } from '../../i18n/translate';
import { routeForEventHistory, routeForEventHistoryEvent, } from '../../utilities/route-for';
export let link;
export let value = link.workflowEvent.workflowId;
export let label = translate('nexus.link');
export let href = undefined;
$: if (!href) {
    if ((_b = (_a = link.workflowEvent) === null || _a === void 0 ? void 0 : _a.eventRef) === null || _b === void 0 ? void 0 : _b.eventId) {
        href = routeForEventHistoryEvent({
            namespace: link.workflowEvent.namespace,
            workflow: link.workflowEvent.workflowId,
            run: link.workflowEvent.runId,
            eventId: link.workflowEvent.eventRef.eventId,
        });
        value = `${link.workflowEvent.workflowId}/history/events/${link.workflowEvent.eventRef.eventId}`;
    }
    else if (((_d = (_c = link.workflowEvent) === null || _c === void 0 ? void 0 : _c.eventRef) === null || _d === void 0 ? void 0 : _d.eventType) ===
        'EVENT_TYPE_WORKFLOW_EXECUTION_STARTED') {
        href = routeForEventHistoryEvent({
            namespace: link.workflowEvent.namespace,
            workflow: link.workflowEvent.workflowId,
            run: link.workflowEvent.runId,
            eventId: '1',
        });
        value = `${link.workflowEvent.workflowId}/history/events/1`;
    }
    else {
        href = routeForEventHistory({
            namespace: link.workflowEvent.namespace,
            workflow: link.workflowEvent.workflowId,
            run: link.workflowEvent.runId,
        });
        value = `${link.workflowEvent.workflowId}/history`;
    }
}
</script>

<div
  class="flex flex-row items-center gap-2 overflow-hidden first:pt-0 last:border-b-0 {$$props.class}"
>
  <p class="max-w-fit whitespace-nowrap text-right text-sm">
    {label}
  </p>
  <div class="overflow-hidden {$$props.linkClass}">
    <Link {href}>
      {value}
    </Link>
  </div>
</div>
