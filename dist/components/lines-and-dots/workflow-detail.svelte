<script>import Copyable from '../../holocene/copyable/index.svelte';
import Icon from '../../holocene/icon/icon.svelte';
import Link from '../../holocene/link.svelte';
import Tooltip from '../../holocene/tooltip.svelte';
import { translate } from '../../i18n/translate';
export let title = '';
export let content;
export let copyable = false;
export let filterable = false;
export let href = null;
export let icon = undefined;
export let tooltip = '';
export let badge = false;
</script>

<p
  class="flex h-4 items-center justify-between gap-16 truncate whitespace-nowrap {$$restProps.class}"
>
  {#if title}
    <span class="font-mono">{title}</span>
  {/if}
  {#if icon}
    <Icon name={icon} />
  {/if}
  {#if copyable}
    <Copyable
      copyIconTitle={translate('common.copy-icon-title')}
      copySuccessIconTitle={translate('common.copy-success-icon-title')}
      {content}
      visible
      container-class="gap-1 w-full justify-end"
    >
      {#if href}
        <Link
          {href}
          class="flex w-fit flex-row items-center gap-1 truncate rounded-sm p-1 leading-4 {badge &&
            'surface-subtle'}"
          ><span class="truncate">{content}</span>
          {#if filterable}
            <Icon name="filter" class="shrink-0" />
          {/if}
        </Link>
      {:else}
        <Tooltip text={tooltip} hide={!tooltip} top>
          <span
            class="w-fit select-all truncate rounded-sm p-1 leading-4"
            class:surface-subtle={badge}>{content}</span
          >
        </Tooltip>
      {/if}
    </Copyable>
  {:else if href}
    <Link
      {href}
      class="value truncate rounded-sm p-1 leading-4 {badge &&
        'surface-subtle'}">{content}</Link
    >
  {:else}
    <Tooltip text={tooltip} hide={!tooltip} top>
      <span
        class="w-fit select-all truncate rounded-sm p-1 leading-4"
        class:surface-subtle={badge}>{content}</span
      >
    </Tooltip>
  {/if}
</p>
