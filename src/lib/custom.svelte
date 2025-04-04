<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
    import { WorkflowHistoryLayout } from '$lib';
    import { toEventHistory } from './models/event-history';
    import { toWorkflowExecution } from './models/workflow-execution';
    import { currentEventHistory, fullEventHistory } from './stores/events';
    import { workflowRun } from './stores/workflow-run';
    import type { HistoryEvent } from './types';
    import "./temporal.css"

	//

    export let workflowResponse:Record<string, unknown>
    export let eventHistory: { history: { events: HistoryEvent[] } };

	//

	$workflowRun = { ...$workflowRun, workflow: toWorkflowExecution(workflowResponse) };
	$fullEventHistory = toEventHistory(eventHistory.history.events);
	$currentEventHistory = toEventHistory(eventHistory.history.events);

	//

	beforeNavigate(({ cancel, to }) => {
		const pathname = to?.url.pathname;
		if (pathname?.includes('undefined')) cancel();
	});
</script>

<div class="temporal-ui-workflow space-y-4">
  <WorkflowHistoryLayout></WorkflowHistoryLayout>
</div>

<style>
	:global(div > table > tbody > div.text-right.hidden) {
		display: block;
	}

	:global(button.toggle-button[data-testid='download']) {
		display: none;
	}

	:global(button.toggle-button[data-testid='pause']) {
		display: none;
	}

	:global(.temporal-ui-workflow a) {
        text-decoration: none;
	}

    :global(.temporal-ui-workflow a :hover) {
        cursor: not-allowed;
        color: inherit
    }
</style>
