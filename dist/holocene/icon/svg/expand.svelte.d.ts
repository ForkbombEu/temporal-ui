import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ExpandProps = typeof __propDef.props;
export type ExpandEvents = typeof __propDef.events;
export type ExpandSlots = typeof __propDef.slots;
export default class Expand extends SvelteComponentTyped<ExpandProps, ExpandEvents, ExpandSlots> {
}
export {};
