<script context="module">import Checkbox from './checkbox.svelte';
export const meta = {
    title: 'Checkbox',
    component: Checkbox,
    args: {
        label: 'Check Me',
        disabled: false,
        checked: false,
        labelHidden: false,
        indeterminate: false,
        required: false,
        error: '',
        valid: true,
    },
    argTypes: {
        label: { control: 'text' },
        disabled: { control: 'boolean' },
        checked: { control: 'boolean' },
        labelHidden: { control: 'boolean' },
        indeterminate: { control: 'boolean' },
        value: { control: 'text', table: { disable: true } },
        group: { control: 'object', table: { disable: true } },
        valid: { control: 'boolean' },
    },
};
</script>

<script>import { action } from '@storybook/addon-actions';
import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
  <Checkbox
    {...args}
    on:change={action('change')}
    on:click={action('click')}
    on:keypress={action('keypress')}
  />
</Template>

<Story name="Default" />

<Story name="Disabled" args={{ disabled: true }} />

<Story name="Checked" args={{ checked: true }} />

<Story name="Hidden Label" args={{ labelHidden: true }} />

<Story name="Indeterminate" args={{ indeterminate: true }} />

<Story name="Required" args={{ required: true }} />

<Story name="Invalid with Error" args={{ error: 'Error', valid: false }} />

<Story name="Valid" args={{ valid: true }} />
