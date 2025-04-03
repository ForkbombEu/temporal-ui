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
export type AppleProps = typeof __propDef.props;
export type AppleEvents = typeof __propDef.events;
export type AppleSlots = typeof __propDef.slots;
export default class Apple extends SvelteComponentTyped<AppleProps, AppleEvents, AppleSlots> {
}
export {};
