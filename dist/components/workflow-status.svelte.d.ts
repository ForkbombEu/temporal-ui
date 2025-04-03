import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        delay?: number;
        status?: "Unspecified" | "Scheduled" | "Open" | "New" | "Started" | "Initiated" | "Running" | "Completed" | "Fired" | "CancelRequested" | "TimedOut" | "Signaled" | "Canceled" | "Failed" | "Terminated" | "Paused" | "Pending" | "Retrying" | "ContinuedAsNew";
        count?: number | undefined;
        loading?: boolean;
        newCount?: number | undefined;
        big?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type WorkflowStatusProps = typeof __propDef.props;
export type WorkflowStatusEvents = typeof __propDef.events;
export type WorkflowStatusSlots = typeof __propDef.slots;
export default class WorkflowStatus extends SvelteComponentTyped<WorkflowStatusProps, WorkflowStatusEvents, WorkflowStatusSlots> {
}
export {};
