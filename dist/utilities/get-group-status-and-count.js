import { workflowStatuses } from '../models/workflow-status';
import { decodePayload } from './decode-payload';
export const getStatusAndCountOfGroup = (groups = []) => {
    return groups
        .map((group) => {
        const status = decodePayload(group === null || group === void 0 ? void 0 : group.groupValues[0]);
        const count = parseInt(group.count);
        return {
            status,
            count,
        };
    })
        .sort((a, b) => {
        return (workflowStatuses.indexOf(a.status) - workflowStatuses.indexOf(b.status));
    });
};
