<script>import { writable } from 'svelte/store';
import { afterUpdate } from 'svelte';
import { twMerge as merge } from 'tailwind-merge';
import Chip from '../chip.svelte';
import Label from '../label.svelte';
export let id;
export let chips;
export let label;
export let labelHidden = false;
export let placeholder = '';
export let name = id;
export let disabled = false;
export let required = false;
export let hintText = '';
export let validator = () => true;
export let removeChipButtonLabel;
export let external = false;
export let maxLength = 0;
const values = writable(chips);
let displayValue = '';
let inputContainer;
let input;
$: chips, ($values = chips);
$: invalid = $values.some((chip) => !validator(chip));
values.subscribe((updatedChips) => {
    chips = updatedChips;
});
let className = '';
export { className as class };
afterUpdate(() => {
    input.scrollIntoView({ block: 'nearest', inline: 'start' });
});
const handleKeydown = (e) => {
    const value = displayValue.trim();
    if ((e.key === ',' || e.key === 'Enter') && value !== '') {
        e.preventDefault();
        values.update((previous) => [...previous, value]);
        displayValue = '';
    }
    const eventTarget = e.target;
    if (e.key === 'Backspace' &&
        eventTarget &&
        eventTarget.value === '' &&
        $values.length > 0) {
        values.update((previous) => previous.slice(0, -1));
    }
};
const handlePaste = (e) => {
    e.preventDefault();
    if (maxLength && $values.length >= maxLength)
        return;
    const clipboardContents = e.clipboardData.getData('text/plain');
    let newValues = clipboardContents
        .split(',')
        .map((content) => content.trim());
    if (maxLength) {
        newValues = newValues.slice(0, maxLength - $values.length);
    }
    values.update((previous) => [...previous, ...newValues]);
};
const handleBlur = () => {
    const value = displayValue.trim();
    if (value !== '') {
        values.update((previous) => [...previous, value]);
        displayValue = '';
    }
};
const removeChip = (index) => {
    values.update((previous) => {
        previous.splice(index, 1);
        return previous;
    });
};
</script>

<div
  class={merge(
    'group flex flex-col gap-1',
    disabled && 'cursor-not-allowed',
    className,
  )}
>
  <Label {required} {label} {disabled} hidden={labelHidden} for={id} />
  <div
    bind:this={inputContainer}
    class={merge(
      'surface-primary flex max-h-20 min-h-[2.5rem] w-full flex-row flex-wrap gap-1 overflow-y-scroll border border-subtle p-2 text-sm text-primary focus-within:border-interactive focus-within:ring-2 focus-within:ring-primary/70',
      disabled && 'cursor-not-allowed opacity-65',
      invalid && 'invalid',
    )}
  >
    {#if $values.length > 0 && !external}
      {#each $values as chip, i (`${chip}-${i}`)}
        {@const valid = validator(chip)}
        <Chip
          removeButtonLabel={typeof removeChipButtonLabel === 'string'
            ? removeChipButtonLabel
            : removeChipButtonLabel(chip)}
          on:remove={() => removeChip(i)}
          intent={valid ? 'default' : 'warning'}
          {disabled}>{chip}</Chip
        >
      {/each}
    {/if}
    <input
      data-lpignore="true"
      data-1p-ignore="true"
      autocomplete="off"
      class:cursor-not-allowed={disabled}
      {disabled}
      {placeholder}
      {id}
      {name}
      {required}
      multiple
      data-testid={id}
      bind:this={input}
      bind:value={displayValue}
      on:blur={handleBlur}
      on:keydown|stopPropagation={handleKeydown}
      on:paste={handlePaste}
      maxlength={maxLength && $values.length >= maxLength ? 0 : undefined}
      size={placeholder.length || undefined}
    />
  </div>

  {#if (invalid && hintText) || (maxLength && !disabled)}
    <div class="flex justify-between gap-2">
      <div
        class="error-msg"
        class:min-width={maxLength}
        aria-live={invalid ? 'assertive' : 'off'}
      >
        {#if invalid && hintText}
          <p>{hintText}</p>
        {/if}
      </div>
      {#if maxLength && !disabled}
        <span class="count">
          <span
            class="text-information"
            class:warn={maxLength - $values?.length <= 5}
            class:error={maxLength === $values?.length}
          >
            {$values?.length ?? 0}
          </span>&nbsp;/&nbsp;{maxLength}
        </span>
      {/if}
    </div>
  {/if}

  {#if $values.length > 0 && external}
    <div class="flex flex-row flex-wrap gap-1">
      {#each $values as chip, i (`${chip}-${i}`)}
        {@const valid = validator(chip)}
        <Chip
          removeButtonLabel={typeof removeChipButtonLabel === 'string'
            ? removeChipButtonLabel
            : removeChipButtonLabel(chip)}
          on:remove={() => removeChip(i)}
          intent={valid ? 'default' : 'warning'}
          {disabled}>{chip}</Chip
        >
      {/each}
    </div>
  {/if}
</div>

<style>
  .invalid {

    border-color: rgb(var(--color-border-danger))
}

.invalid:focus-within {

    border-color: rgb(var(--color-border-danger));

    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);

    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);

    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);

    --tw-ring-color: rgb(var(--color-border-focus-danger) / 0.7)
}

  input {

    background-color: rgb(var(--color-surface-primary));

    color: rgb(var(--color-text-primary));

    display: inline-block;

    flex-grow: 1
}

  input:focus {

    outline: 2px solid transparent;

    outline-offset: 2px
}

  .error-msg {

    overflow-wrap: break-word;

    font-size: 0.875rem;

    line-height: 1.25rem;

    color: rgb(var(--color-text-danger))
}

  .error-msg.min-width {

    width: calc(100% - 6rem)
}

  .count {

    visibility: hidden;

    text-align: right;

    font-size: 0.875rem;

    line-height: 1.25rem;

    font-weight: 500;

    color: rgb(var(--color-text-primary))
}

  .group:focus-within .count {

    visibility: visible
}

  .count > .warn {

    color: rgb(var(--color-text-warning))
}

  .count > .error {

    color: rgb(var(--color-text-danger))
}</style>
