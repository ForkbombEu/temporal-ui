<script>import CodeBlock from '../../holocene/code-block.svelte';
import RangeInput from '../../holocene/input/range-input.svelte';
import { translate } from '../../i18n/translate';
import { fromEventToRawEvent } from '../../models/event-history';
import { decodeEventHistory } from '../../stores/events';
import { stringifyWithBigInt } from '../../utilities/parse-with-big-int';
import PayloadDecoder from '../event/payload-decoder.svelte';
export let events = [];
let index = 1;
function handleKeydown(event) {
    switch (event.code) {
        case 'ArrowRight':
        case 'KeyL':
            event.preventDefault();
            event.stopPropagation();
            if (index < events.length) {
                index += 1;
            }
            break;
        case 'ArrowLeft':
        case 'KeyH':
            event.preventDefault();
            event.stopPropagation();
            if (index > 1) {
                index -= 1;
            }
            break;
        default:
            break;
    }
}
</script>

<svelte:window on:keydown={handleKeydown} />
<div class="flex gap-4 max-sm:flex-col">
  <div class="bg-gray-100 flex w-full gap-4">
    <RangeInput
      label={translate('common.event')}
      labelHidden
      id="range-input-event-history"
      min={1}
      max={events.length}
      bind:value={index}
    />
    <div class="flex items-center justify-center gap-3">
      <button
        class="caret"
        disabled={index === 1}
        on:click={() => {
          index -= 1;
        }}
        aria-label={translate('common.previous')}
      >
        <span
          class="arrow arrow-left border-b-transparent border-t-transparent dark:border-r-white"
          class:border-r-slate-900={index !== 1}
          class:border-r-slate-100={index === 1}
          class:dark:border-r-slate-800={index === 1}
        />
      </button>
      <button
        class="caret"
        disabled={index === events.length}
        on:click={() => {
          index += 1;
        }}
        aria-label={translate('common.next')}
      >
        <span
          class="arrow arrow-right border-b-transparent border-t-transparent dark:border-l-white"
          class:border-l-slate-100={index === events.length}
          class:border-l-slate-900={index !== events.length}
          class:dark:border-l-slate-800={index === events.length}
        />
      </button>
    </div>
  </div>
  <slot name="decode" />
</div>
<div class="min-h-screen py-4">
  {#if $decodeEventHistory}
    {#key [index, $decodeEventHistory]}
      <PayloadDecoder
        value={fromEventToRawEvent(events[index - 1])}
        let:decodedValue
      >
        <CodeBlock
          content={decodedValue}
          testId="event-history-json"
          copyIconTitle={translate('common.copy-icon-title')}
          copySuccessIconTitle={translate('common.copy-success-icon-title')}
        />
      </PayloadDecoder>
    {/key}
  {:else}
    {#key index}
      <CodeBlock
        content={stringifyWithBigInt(
          fromEventToRawEvent(events[index - 1]),
          undefined,
          2,
        )}
        testId="event-history-json"
        copyIconTitle={translate('common.copy-icon-title')}
        copySuccessIconTitle={translate('common.copy-success-icon-title')}
      />
    {/key}
  {/if}
</div>

<style>
  .caret {

    position: relative;

    width: 12px;
    height: 12px;
}

  .caret:disabled {

    cursor: not-allowed;

    --tw-text-opacity: 1;

    color: rgb(124 143 177 / var(--tw-text-opacity));
}

  .arrow {

    position: absolute;

    left: 0px;

    top: 0px;

    height: 0px;

    width: 0px;

    border-style: solid;
    border-width: 6px 12px 6px 0;
}

  .arrow-left {
    border-width: 6px 12px 6px 0;
  }

  .arrow-right {
    border-width: 6px 0 6px 12px;
  }</style>
