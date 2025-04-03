import { SvelteComponentTyped } from "svelte";
import TabButtons from './tab-buttons.svelte';
export declare const meta: {
    title: string;
    component: typeof TabButton;
    subcomponents: {
        TabButtons: typeof TabButtons;
    };
    argTypes: {
        icon: {
            name: string;
            control: "select";
            options: string[];
        };
        group: {
            table: {
                disable: true;
            };
        };
        base: {
            table: {
                disable: true;
            };
        };
        href: {
            table: {
                disable: true;
            };
        };
        active: {
            table: {
                disable: true;
            };
        };
    };
};
declare const __propDef: {
    props: Record<string, never>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type TabButtonProps = typeof __propDef.props;
export type TabButtonEvents = typeof __propDef.events;
export type TabButtonSlots = typeof __propDef.slots;
export default class TabButton extends SvelteComponentTyped<TabButtonProps, TabButtonEvents, TabButtonSlots> {
}
export {};
