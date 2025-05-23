import { describe, expect, it } from 'vitest';
import { groupEvents } from './';
import { getEventGroupDisplayName } from './get-group-name';
const scheduledEvent = {
    id: '5',
    eventId: '5',
    eventTime: '2021-12-27T15:23:21.806965200Z',
    eventType: 'ActivityTaskScheduled',
    version: '0',
    taskId: '1049493',
    activityTaskScheduledEventAttributes: {
        activityId: '5',
        activityType: {
            name: 'CompletedActivity',
        },
        namespace: '',
        taskQueue: {
            name: 'rainbow-statuses',
            kind: 'Normal',
        },
        input: null,
    },
};
const anotherScheduledEvent = {
    id: '99',
    eventId: '99',
    eventTime: '2021-12-27T15:23:21.806965200Z',
    eventType: 'ActivityTaskScheduled',
    version: '0',
    taskId: '1049494',
    activityTaskScheduledEventAttributes: {
        activityId: '5',
        activityType: {
            name: 'FicticiousEvent',
        },
        namespace: '',
        taskQueue: {
            name: 'test-events',
            kind: 'Normal',
        },
        input: null,
    },
};
const startedEvent = {
    id: '6',
    eventId: '6',
    eventTime: '2021-12-27T15:23:21.824600700Z',
    eventType: 'ActivityTaskStarted',
    version: '0',
    taskId: '1049497',
    activityTaskStartedEventAttributes: {
        scheduledEventId: '5',
        identity: '21665@temporal@',
        requestId: '0202572f-485c-426a-a3ee-02ea46d3cad7',
        attempt: 1,
        lastFailure: null,
    },
};
const completedEvent = {
    id: '7',
    eventId: '7',
    eventTime: '2021-12-27T15:23:21.841178500Z',
    eventType: 'ActivityTaskCompleted',
    version: '0',
    taskId: '1049498',
    activityTaskCompletedEventAttributes: {
        result: null,
        scheduledEventId: '5',
        startedEventId: '6',
        identity: '21665@temporal@',
    },
};
const eventHistory = [
    scheduledEvent,
    startedEvent,
    anotherScheduledEvent,
    completedEvent,
];
describe('groupEvents', () => {
    it('should create a new entry when given a scheduled event', () => {
        const groups = groupEvents([scheduledEvent]);
        const group = groups.find(({ id }) => id === scheduledEvent.id);
        expect(group.events.get(scheduledEvent.id)).toBe(scheduledEvent);
    });
    it('should be able to store multiple event groups', () => {
        const groups = groupEvents([
            scheduledEvent,
            anotherScheduledEvent,
        ]);
        expect(Object.keys(groups).length).toBe(2);
    });
    it('should be able to get event groups in ascending order by default', () => {
        const groups = groupEvents([
            scheduledEvent,
            anotherScheduledEvent,
        ]);
        expect(groups[0].id).toBe(scheduledEvent.id);
    });
    it('should be able to get event groups in descending order', () => {
        const groups = groupEvents([scheduledEvent, anotherScheduledEvent], 'descending');
        expect(groups[0].id).toBe(anotherScheduledEvent.id);
    });
    it('should add a completed event to the correct group', () => {
        const groups = groupEvents([
            scheduledEvent,
            completedEvent,
        ]);
        const group = groups.find(({ id }) => id === scheduledEvent.id);
        expect(group.events.size).toBe(2);
        expect(group.events.get(completedEvent.id)).toBe(completedEvent);
    });
    it('should add a completed event to the correct group in descending order', () => {
        const groups = groupEvents([completedEvent, scheduledEvent], 'descending');
        const group = groups.find(({ id }) => id === scheduledEvent.id);
        expect(group.events.size).toBe(2);
        expect(group.events.get(completedEvent.id)).toBe(completedEvent);
    });
    it('should be able to add multiple event groups and their associated events', () => {
        const groups = groupEvents(eventHistory);
        const [first, second] = Object.values(groups);
        expect(Object.values(groups).length).toBe(2);
        expect(first.events.size).toBe(3);
        expect(second.events.size).toBe(1);
    });
});
describe('getEventGroupDisplayName', () => {
    it('should get the name of the eventGroup', () => {
        const [group] = groupEvents(eventHistory);
        expect(group.name).toBe('CompletedActivity');
    });
    it('should guard against empty arguments', () => {
        expect(getEventGroupDisplayName(undefined)).toBe('');
    });
    it('should get the name of a TimerStartedEvent', () => {
        const timerStartedEvent = {
            eventId: '8',
            timerStartedEventAttributes: {
                timerId: '8',
                startToFireTimeout: '4s',
                workflowTaskCompletedEventId: '4',
            },
            id: '8',
            name: 'TimerStarted',
        };
        expect(getEventGroupDisplayName(timerStartedEvent)).toBe('8 (4s)');
    });
    it('should get the name of a SignalExternalWorkflowExecutionInitiatedEvent', () => {
        const signalEvent = {
            eventId: '12',
            signalExternalWorkflowExecutionInitiatedEventAttributes: {
                signalName: 'WorkflowSignal',
            },
            name: 'WorkflowExecutionSignaled',
        };
        expect(getEventGroupDisplayName(signalEvent)).toBe('WorkflowSignal');
    });
    it('should get the name of a WorkflowExecutionSignaledEvent', () => {
        const workflowExectutionSignaledEvent = {
            eventId: '12',
            workflowExecutionSignaledEventAttributes: {
                signalName: 'signalBeforeReset',
            },
            name: 'WorkflowExecutionSignaled',
        };
        expect(getEventGroupDisplayName(workflowExectutionSignaledEvent)).toBe('signalBeforeReset');
    });
    it('should get the name of a MarkerRecordedEvent', () => {
        const markerRecordedEvent = {
            eventId: '5',
            eventTime: '2022-07-01T20:23:49.135788128Z',
            eventType: 'MarkerRecorded',
            markerRecordedEventAttributes: {
                markerName: 'Version',
                workflowTaskCompletedEventId: '4',
            },
            category: 'marker',
            timestamp: '2022-07-01 UTC 20:23:49.13',
        };
        expect(getEventGroupDisplayName(markerRecordedEvent)).toBe('Version');
    });
    it('should get the name of a StartChildWorkflowExecutionInitiatedEvent', () => {
        const startChildWorkflowEvent = {
            startChildWorkflowExecutionInitiatedEventAttributes: {
                workflowType: {
                    name: 'Workflow Name',
                },
            },
        };
        expect(getEventGroupDisplayName(startChildWorkflowEvent)).toBe('Workflow Name');
    });
    it('should get the name of a WorkflowExecutionUpdateAcceptedEvent', () => {
        const workflowUpdateAcceptedEvent = {
            workflowExecutionUpdateAcceptedEventAttributes: {
                acceptedRequest: {
                    input: {
                        name: 'Start the update',
                    },
                },
            },
        };
        expect(getEventGroupDisplayName(workflowUpdateAcceptedEvent)).toBe('Start the update');
    });
    it('should get the name of a Local Activity from payload', () => {
        const localActivityPayload = {
            metadata: {
                encoding: 'anNvbi9wbGFpbg==',
                type: 'S2V5d29yZA==',
            },
            data: 'eyAiYWN0aXZpdHlfdHlwZSI6ICJjYXRzIiB9',
        };
        const localActivityEvent = {
            eventType: 'MarkerRecorded',
            markerRecordedEventAttributes: {
                markerName: 'core_local_activity',
                details: {
                    data: {
                        payloads: [localActivityPayload],
                    },
                },
            },
            attributes: {
                markerName: 'core_local_activity',
                details: {
                    data: {
                        payloads: [localActivityPayload],
                    },
                },
            },
        };
        expect(getEventGroupDisplayName(localActivityEvent)).toBe('cats');
    });
});
