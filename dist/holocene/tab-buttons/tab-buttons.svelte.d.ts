import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: Record<string, never>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type TabButtonsProps = typeof __propDef.props;
export type TabButtonsEvents = typeof __propDef.events;
export type TabButtonsSlots = typeof __propDef.slots;
export default class TabButtons extends SvelteComponentTyped<TabButtonsProps, TabButtonsEvents, TabButtonsSlots> {
}
export {};
