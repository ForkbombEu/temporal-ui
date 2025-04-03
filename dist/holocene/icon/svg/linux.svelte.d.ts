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
export type LinuxProps = typeof __propDef.props;
export type LinuxEvents = typeof __propDef.events;
export type LinuxSlots = typeof __propDef.slots;
export default class Linux extends SvelteComponentTyped<LinuxProps, LinuxEvents, LinuxSlots> {
}
export {};
