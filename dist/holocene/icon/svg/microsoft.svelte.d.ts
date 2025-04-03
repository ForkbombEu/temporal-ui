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
export type MicrosoftProps = typeof __propDef.props;
export type MicrosoftEvents = typeof __propDef.events;
export type MicrosoftSlots = typeof __propDef.slots;
export default class Microsoft extends SvelteComponentTyped<MicrosoftProps, MicrosoftEvents, MicrosoftSlots> {
}
export {};
