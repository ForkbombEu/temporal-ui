import type { WorkflowTaskCompletedEvent } from '../types/events';
export declare const getSDKandVersion: (tasks: WorkflowTaskCompletedEvent[]) => {
    sdk: string;
    version: string;
};
