<script>import { beforeNavigate } from '$app/navigation';
import { WorkflowHistoryLayout } from './';
import { toEventHistory } from './models/event-history';
import { toWorkflowExecution } from './models/workflow-execution';
import { currentEventHistory, fullEventHistory } from './stores/events';
import { workflowRun } from './stores/workflow-run';
import "./temporal.css";
//
export let workflowResponse;
export let eventHistory;
//
$workflowRun = { ...$workflowRun, workflow: toWorkflowExecution(workflowResponse) };
$fullEventHistory = toEventHistory(eventHistory.history.events);
$currentEventHistory = toEventHistory(eventHistory.history.events);
//
beforeNavigate(({ cancel, to }) => {
    const pathname = to === null || to === void 0 ? void 0 : to.url.pathname;
    if (pathname === null || pathname === void 0 ? void 0 : pathname.includes('undefined'))
        cancel();
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
    }</style>
