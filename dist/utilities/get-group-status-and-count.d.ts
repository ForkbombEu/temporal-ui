import type { WorkflowStatus } from '../types/workflows';
export declare const getStatusAndCountOfGroup: (groups?: any[]) => {
    status: WorkflowStatus;
    count: number;
}[];
