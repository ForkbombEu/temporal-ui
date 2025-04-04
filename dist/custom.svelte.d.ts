import { SvelteComponentTyped } from "svelte";
import type { HistoryEvent } from './types';
import "./temporal.css";
declare const __propDef: {
    props: {
        workflowResponse: Record<string, unknown>;
        eventHistory: {
            history: {
                events: HistoryEvent[];
            };
        };
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type CustomProps = typeof __propDef.props;
export type CustomEvents = typeof __propDef.events;
export type CustomSlots = typeof __propDef.slots;
export default class Custom extends SvelteComponentTyped<CustomProps, CustomEvents, CustomSlots> {
}
export {};
