import { SvelteComponentTyped } from "svelte";
import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
import type { IconName } from '../icon';
declare const __propDef: {
    props: ({
        icon?: IconName;
        group?: boolean;
        active?: boolean;
        'data-testid'?: string;
        tooltip?: string;
    } & HTMLAnchorAttributes & {
        href: string;
        base?: string;
    }) | ({
        icon?: IconName;
        group?: boolean;
        active?: boolean;
        'data-testid'?: string;
        tooltip?: string;
    } & HTMLButtonAttributes & {
        href?: never;
        base?: never;
    });
    events: {
        click: MouseEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type TabButtonProps = typeof __propDef.props;
export type TabButtonEvents = typeof __propDef.events;
export type TabButtonSlots = typeof __propDef.slots;
export default class TabButton extends SvelteComponentTyped<TabButtonProps, TabButtonEvents, TabButtonSlots> {
}
export {};
