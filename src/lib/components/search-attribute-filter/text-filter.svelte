<script lang="ts">
  import { getContext } from 'svelte';

  import Input from '$lib/holocene/input/input.svelte';
  import { translate } from '$lib/i18n/translate';
  import { prefixSearchEnabled } from '$lib/stores/capability-enablement';
  import { SEARCH_ATTRIBUTE_TYPE } from '$lib/types/workflows';

  import ConditionalMenu from './conditional-menu.svelte';
  import { FILTER_CONTEXT, type FilterContext } from './index.svelte';

  const { filter, handleSubmit } = getContext<FilterContext>(FILTER_CONTEXT);

  $: ({ value } = $filter);
  $: _value = value;

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && _value !== '') {
      e.preventDefault();
      $filter.value = _value;
      handleSubmit();
    }
  }

  $: options = [
    { value: '=', label: translate('common.equal-to') },
    { value: '!=', label: translate('common.not-equal-to') },
    ...($prefixSearchEnabled && $filter.type === SEARCH_ATTRIBUTE_TYPE.KEYWORD
      ? [{ value: 'STARTS_WITH', label: translate('common.starts-with') }]
      : []),
  ];
</script>

<ConditionalMenu {options} inputId="text-filter" noBorderLeft>
  <Input
    label={$filter.attribute}
    labelHidden
    id="text-filter"
    type="search"
    placeholder={`${translate('common.enter')} ${$filter.attribute}`}
    icon="search"
    class="w-full [&_*]:border-l-0"
    bind:value={_value}
    on:keydown={handleKeydown}
  />
</ConditionalMenu>
