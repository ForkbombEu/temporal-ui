import { writable } from 'svelte/store';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fromEventToRawEvent, getEventAttributes, toEventHistory } from '.';
import eventsFixture from '$fixtures/raw-events.descending.completed.json';
import settingsFixture from '$fixtures/settings.json';
const historyEvent = {
    eventId: '1',
    eventTime: '2022-07-01T20:28:48.796369169Z',
    eventType: 'WorkflowExecutionStarted',
    version: '0',
    taskId: '29887292',
    workflowExecutionStartedEventAttributes: {
        workflowType: {
            name: 'workflow.completion',
        },
        parentWorkflowNamespace: 'canary',
        parentWorkflowExecution: {
            workflowId: 'temporal.fixture.completed.workflow.id',
            runId: '971e2165-c4f8-4f78-87ca-b652a06eb234',
        },
        parentInitiatedEventId: '10',
        taskQueue: {
            name: 'canary-task-queue',
            kind: 'Normal',
        },
        input: {
            payloads: [
                {
                    metadata: {
                        encoding: 'anNvbi9wbGFpbg==',
                    },
                    data: 'MTY1NjcwNzMyODc3NDI2MzA4Ng==',
                },
                {
                    metadata: {
                        encoding: 'anNvbi9wbGFpbg==',
                    },
                    data: 'ImNhbmFyeSI=',
                },
            ],
        },
        workflowExecutionTimeout: '0s',
        workflowRunTimeout: '1200s',
        workflowTaskTimeout: '20s',
        continuedExecutionRunId: '',
        initiator: 'Unspecified',
        continuedFailure: null,
        lastCompletionResult: null,
        originalExecutionRunId: '202dcff6-7f35-4c65-995c-bcadce524fb1',
        identity: '',
        firstExecutionRunId: '202dcff6-7f35-4c65-995c-bcadce524fb1',
        retryPolicy: null,
        attempt: 1,
        workflowExecutionExpirationTime: null,
        cronSchedule: '',
        firstWorkflowTaskBackoff: '0s',
        memo: null,
        searchAttributes: {
            indexedFields: {
                CustomKeywordField: {
                    metadata: {
                        encoding: 'anNvbi9wbGFpbg==',
                        type: 'S2V5d29yZA==',
                    },
                    data: 'ImNoaWxkV29ya2Zsb3dWYWx1ZSI=',
                },
            },
        },
        prevAutoResetPoints: null,
        header: {
            fields: {},
        },
        parentInitiatedEventVersion: '0',
    },
};
const namespace = 'unit-tests';
const settings = settingsFixture;
const accessToken = 'token-test';
describe('getEventAttributes', () => {
    beforeEach(() => {
        vi.mock('$lib/utilities/decode-payload', () => {
            const fn = async (x) => x;
            const convertPayloadToJsonWithCodec = vi.fn(fn);
            const decodePayloadAttributes = vi.fn(fn);
            return {
                convertPayloadToJsonWithCodec,
                decodePayloadAttributes,
            };
        });
    });
    afterEach(() => {
        vi.clearAllMocks();
    });
    it('should affix the type to the history event', async () => {
        const eventType = 'workflowExecutionStartedEventAttributes';
        const event = await getEventAttributes({
            historyEvent,
            namespace,
            settings,
            accessToken,
        });
        expect(event.type).toBe(eventType);
    });
    it('should call convertWithCodec if not provided an endpoint in settings', async () => {
        const convertWithCodec = vi.fn(async (x) => x);
        await getEventAttributes({
            historyEvent,
            namespace,
            settings,
            accessToken,
        }, {
            convertWithCodec,
        });
        expect(convertWithCodec).toBeCalled();
    });
    it('should call convertWithCodec if provided an endpoint in settings', async () => {
        const convertWithCodec = vi.fn(async (x) => x);
        await getEventAttributes({
            historyEvent,
            namespace,
            settings: { ...settings, codec: { endpoint: 'https://localhost' } },
            accessToken,
        }, {
            convertWithCodec,
        });
        expect(convertWithCodec).toBeCalled();
    });
    it('should call convertWithCodec if provided an endpoint in settings', async () => {
        const convertWithCodec = vi.fn(async (x) => x);
        await getEventAttributes({
            historyEvent,
            namespace,
            settings,
            accessToken,
        }, {
            convertWithCodec,
            encoderEndpoint: writable('https://localhost'),
        });
        expect(convertWithCodec).toBeCalled();
    });
});
describe('toEventHistory', () => {
    const additionalProperties = [
        'attributes',
        'eventType',
        'classification',
        'category',
        'id',
        'name',
        'timestamp',
    ];
    for (const property of additionalProperties) {
        it(`should add a[n] ${property} property`, async () => {
            const events = await toEventHistory(eventsFixture.history.events);
            const [event] = events;
            expect(event[property]).toBeDefined();
        });
    }
});
describe('fromEventToRawEvent', () => {
    const additionalProperties = [
        'attributes',
        'classification',
        'category',
        'id',
        'name',
        'timestamp',
    ];
    for (const property of additionalProperties) {
        it(`should remove a[n] ${property} property`, async () => {
            const events = await toEventHistory(eventsFixture.history.events);
            const [event] = events;
            const rawEvent = fromEventToRawEvent(event);
            expect(rawEvent[property]).toBeUndefined();
        });
    }
});
