<script context="module">import Button from './button.svelte';
import { iconNames } from './icon';
export const meta = {
    title: 'Button',
    component: Button,
    args: {
        variant: 'primary',
        size: 'md',
        loading: false,
        disabled: false,
    },
    argTypes: {
        variant: {
            name: 'Variant',
            control: 'select',
            options: ['primary', 'secondary', 'destructive', 'ghost'],
        },
        size: {
            name: 'Size',
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg'],
        },
        loading: {
            name: 'Loading',
            control: 'boolean',
        },
        count: {
            name: 'Count',
            control: { type: 'number', min: 0, max: 99, step: 1 },
        },
        leadingIcon: {
            name: 'Leading Icon',
            control: 'select',
            options: iconNames,
            table: {
                category: 'Icon',
            },
        },
        trailingIcon: {
            name: 'Trailing Icon',
            control: 'select',
            options: iconNames,
            table: {
                category: 'Icon',
            },
        },
        href: {
            name: 'Link',
            control: 'text',
            table: {
                category: 'Link',
            },
        },
        target: {
            name: 'Link Target',
            control: 'select',
            options: ['_blank', '_self', '_parent', '_top'],
            table: {
                category: 'Link',
            },
            if: { arg: 'href' },
        },
        id: {
            name: 'ID',
            control: 'text',
            table: {
                disable: true,
            },
        },
    },
};
</script>

<script>import { action } from '@storybook/addon-actions';
import { Story, Template } from '@storybook/addon-svelte-csf';
import { shouldNotBeTransparent } from './test-utilities';
</script>

<Template let:args>
  <Button {...args} on:click={action('click')}>Click Me</Button>
</Template>

<Story name="Primary" args={{}} />

<Story name="With Long Title" let:args>
  <div class="max-w-16">
    <Button {...args} on:click={action('click')}>Request Cancellation</Button>
  </div>
</Story>

<Story name="Button Group" let:args>
  <div class="button-group flex">
    <Button {...args} on:click={action('click')}>First</Button>
    <Button {...args} on:click={action('click')}>Middle</Button>
    <Button {...args} on:click={action('click')}>Last</Button>
  </div>
</Story>

<Story
  name="Secondary"
  args={{ variant: 'secondary' }}
  play={shouldNotBeTransparent((canvas) => canvas.getByRole('button'))}
/>

<Story name="Destructive" args={{ variant: 'destructive' }} />

<Story name="Ghost" args={{ variant: 'ghost' }} />

<Story name="Extra Small" args={{ size: 'xs' }} />

<Story name="Small" args={{ size: 'sm' }} />

<Story name="Large" args={{ size: 'lg' }} />

<Story name="Loading" args={{ loading: true }} />

<Story name="Disabled" args={{ disabled: true }} />

<Story name="Active" args={{ active: true }} />

<Story name="With Count" args={{ count: 5 }} />

<Story name="With Leading Icon" args={{ leadingIcon: 'workflow' }} />

<Story name="With Trailing Icon" args={{ trailingIcon: 'workflow' }} />

<Story name="With Link" args={{ href: 'https://example.com' }} />
