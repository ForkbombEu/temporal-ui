<script>import Link from '../holocene/link.svelte';
import { translate } from '../i18n/translate';
import { isCloud } from '../stores/advanced-visibility';
import { parameters } from '../stores/events';
import { routeForWorkflowHistoryJson } from '../utilities/route-for';
const { namespace, workflowId, runId } = $parameters;
$: href = routeForWorkflowHistoryJson({
    namespace,
    workflow: workflowId,
    run: runId,
});
</script>

{#if !$isCloud}
  <div class="flex items-center space-x-4">
    <Link
      icon="external-link"
      class="whitespace-nowrap"
      {href}
      newTab={true}
      data-testid="view-raw-event-history"
    >
      {translate('events.view-raw-history')}
    </Link>
  </div>
{/if}
