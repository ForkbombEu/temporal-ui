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
export type CircleCheckProps = typeof __propDef.props;
export type CircleCheckEvents = typeof __propDef.events;
export type CircleCheckSlots = typeof __propDef.slots;
export default class CircleCheck extends SvelteComponentTyped<CircleCheckProps, CircleCheckEvents, CircleCheckSlots> {
}
export {};
