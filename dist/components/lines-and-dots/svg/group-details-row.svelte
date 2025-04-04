<script>var _a, _b, _c;
import { tick } from 'svelte';
import { page } from '$app/stores';
import MetadataDecoder from '../../event/metadata-decoder.svelte';
import WorkflowStatus from '../../workflow-status.svelte';
import Button from '../../../holocene/button.svelte';
import Icon from '../../../holocene/icon/icon.svelte';
import Link from '../../../holocene/link.svelte';
import { translate } from '../../../i18n/translate';
import { activeGroupHeight, setActiveGroup } from '../../../stores/active-events';
import { format } from '../../../utilities/format-camel-case';
import { formatDistanceAbbreviated } from '../../../utilities/format-time';
import { isChildWorkflowExecutionStartedEvent } from '../../../utilities/is-event-type';
import { routeForEventHistory } from '../../../utilities/route-for';
import { mergeEventGroupDetails } from '../constants';
import GraphWidget from './graph-widget.svelte';
import GroupDetailsText from './group-details-text.svelte';
export let group;
export let canvasWidth;
export let x = 0;
export let y;
let offsetHeight;
$: contentHeight = offsetHeight || 0;
const setActiveGroupHeight = (height) => {
    $activeGroupHeight = height;
};
$: setActiveGroupHeight(contentHeight || 0);
$: status = (group === null || group === void 0 ? void 0 : group.finalClassification) || (group === null || group === void 0 ? void 0 : group.classification);
$: ({ namespace } = $page.params);
$: width = canvasWidth;
$: title = group.displayName;
$: attributes = mergeEventGroupDetails(group);
$: codeBlockAttributes = Object.entries(attributes).filter(([, value]) => typeof value === 'object');
$: textAttributes = Object.entries(attributes).filter(([, value]) => typeof value !== 'object');
$: link = (_a = group.links) === null || _a === void 0 ? void 0 : _a[0];
$: childWorkflowStartedEvent =
    group && group.eventList.find(isChildWorkflowExecutionStartedEvent);
$: duration = formatDistanceAbbreviated({
    start: (_b = group === null || group === void 0 ? void 0 : group.initialEvent) === null || _b === void 0 ? void 0 : _b.eventTime,
    end: (_c = group === null || group === void 0 ? void 0 : group.lastEvent) === null || _c === void 0 ? void 0 : _c.eventTime,
    includeMilliseconds: true,
});
$: {
    if (group === null || group === void 0 ? void 0 : group.pendingActivity) {
        if (group.pendingActivity.attempt > 1) {
            status = translate('events.event-classification.retrying');
        }
        else {
            status = translate('events.event-classification.pending');
        }
    }
}
const onDecode = async () => {
    await tick();
    contentHeight = offsetHeight;
};
</script>

<g role="button" tabindex="0" class="relative z-50">
  <foreignObject {x} {y} {width} height={contentHeight}>
    <div bind:offsetHeight class="flex flex-col border-b border-subtle">
      <div
        class="relative flex h-full items-center justify-between bg-slate-50 text-sm dark:bg-slate-800"
      >
        <div class="flex h-full items-center gap-4 px-2">
          {#if status}
            <WorkflowStatus {status} />
          {/if}
          {title}
          {#if duration}
            <div class="flex items-center gap-1">
              <Icon name="clock" />
              {duration}
            </div>
          {/if}
        </div>
        <div class="flex items-center gap-4">
          <Button
            variant="ghost"
            size="xs"
            on:click={() => setActiveGroup(group)}
            >{translate('common.close')} <Icon name="close" /></Button
          >
        </div>
      </div>
      <div class="surface-primary flex flex-col gap-4 p-4 xl:flex-row">
        <div class="w-full xl:w-1/2">
          <div class="grid grid-cols-2 gap-3">
            {#if group.userMetadata?.summary}
              <MetadataDecoder
                value={group?.userMetadata?.summary}
                let:decodedValue
                fallback={translate('events.decode-failed')}
                {onDecode}
              >
                <div>
                  <div class="font-medium leading-3 text-brand">
                    {translate('common.summary')}
                  </div>
                  <div class="text-wrap break-all leading-4">
                    {decodedValue}
                  </div>
                </div>
              </MetadataDecoder>
            {/if}
            {#if link}
              <div>
                <div class="font-medium leading-3 text-secondary">
                  {translate('nexus.link')}
                </div>
                <div class="text-wrap break-all leading-4">
                  <Link
                    href={routeForEventHistory({
                      namespace: link.workflowEvent.namespace,
                      workflow: link.workflowEvent.workflowId,
                      run: link.workflowEvent.runId,
                      eventId: link.workflowEvent?.eventRef?.eventId,
                    })}>{link.workflowEvent.workflowId}</Link
                  >
                </div>
              </div>
            {/if}
            {#each textAttributes as [key, value] (key)}
              <div>
                <div class="font-medium leading-3 text-secondary">
                  {format(key)}
                </div>
                <div class="text-wrap break-all leading-4">
                  <GroupDetailsText {key} {value} {attributes} />
                </div>
              </div>
            {/each}
          </div>
        </div>
        <div class="flex w-full flex-col gap-2 xl:w-1/2">
          {#each codeBlockAttributes as [key, value] (key)}
            <div>
              <div class="font-medium leading-4 text-secondary">
                {format(key)}
              </div>
              <GroupDetailsText {key} {value} {attributes} {onDecode} />
            </div>
          {/each}
        </div>
      </div>
      {#if childWorkflowStartedEvent}
        <div class="surface-primary px-4">
          <div class="font-medium leading-4 text-secondary">Child Workflow</div>
          {#key group.eventList.length}
            <GraphWidget
              {namespace}
              workflowId={childWorkflowStartedEvent.attributes.workflowExecution
                .workflowId}
              runId={childWorkflowStartedEvent.attributes.workflowExecution
                .runId}
              viewportHeight={200}
              class="surface-primary overflow-x-hidden border border-subtle"
              onLoad={onDecode}
            />
          {/key}
        </div>
      {/if}
    </div>
  </foreignObject>
</g>

<style>
  g {
    pointer-events: bounding-box;
    outline: none;
  }</style>
