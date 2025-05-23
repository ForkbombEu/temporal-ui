import { writable } from 'svelte/store';
import { goto } from '$app/navigation';
import { translate } from '../i18n/translate';
import { createSchedule, editSchedule } from '../services/schedule-service';
import { setSearchAttributes } from '../services/workflow-service';
import { encodePayloads } from '../utilities/encode-payload';
import { stringifyWithBigInt } from '../utilities/parse-with-big-int';
import { routeForSchedule, routeForSchedules } from '../utilities/route-for';
import { convertDaysAndMonths, timeToInterval, } from '../utilities/schedule-data-formatting';
// TODO: Post Beta, add support of additional fields.
// "startTime": "2022-07-04T03:18:59.668Z",
// "endTime": "2022-07-04T03:18:59.668Z",
// "jitter": "string",
// "timezoneName": "string",
// "timezoneData": "string"
const setBodySpec = (body, spec, presets) => {
    const { hour, minute, second, phase, cronString } = spec;
    const { preset, months, days, daysOfMonth, daysOfWeek } = presets;
    if (preset === 'string') {
        // Add the cronString as a comment to the cronString to view it for frequency
        const cronStringWithComment = `${cronString}#${cronString}`;
        body.schedule.spec.cronString = [cronStringWithComment];
        body.schedule.spec.calendar = [];
        body.schedule.spec.interval = [];
    }
    else if (preset === 'interval') {
        const interval = timeToInterval(days, hour, minute, second);
        // The Schedule IntervalSpec implements IIntervalSpec which encodes/decodes string to Interval
        body.schedule.spec.interval = [
            { interval, phase: phase || '0s' },
        ];
        body.schedule.spec.cronString = [];
        body.schedule.spec.calendar = [];
    }
    else {
        const { month, dayOfMonth, dayOfWeek } = convertDaysAndMonths({
            months,
            daysOfMonth,
            daysOfWeek,
        });
        body.schedule.spec.calendar = [
            {
                year: '*',
                month: preset === 'month' ? month : '',
                dayOfMonth: preset === 'month' ? dayOfMonth : '',
                dayOfWeek: preset === 'week' ? dayOfWeek : '',
                hour,
                minute,
                second,
            },
        ];
        body.schedule.spec.interval = [];
        body.schedule.spec.cronString = [];
    }
};
export const submitCreateSchedule = async ({ action, spec, presets, }) => {
    const { namespace, name, workflowId, workflowType, taskQueue, input, encoding, messageType, searchAttributes, } = action;
    let payloads;
    if (input) {
        try {
            payloads = await encodePayloads({ input, encoding, messageType });
        }
        catch (e) {
            error.set(`${translate('data-encoder.encode-error')}: ${e === null || e === void 0 ? void 0 : e.message}`);
            return;
        }
    }
    const body = {
        schedule_id: name.trim(),
        searchAttributes: searchAttributes.length === 0
            ? null
            : {
                indexedFields: {
                    ...setSearchAttributes(searchAttributes),
                },
            },
        schedule: {
            spec: {
                calendar: [],
                interval: [],
                cronString: [],
            },
            action: {
                startWorkflow: {
                    workflowId: workflowId,
                    workflowType: { name: workflowType },
                    taskQueue: { name: taskQueue },
                    input: payloads ? { payloads } : null,
                },
            },
        },
    };
    setBodySpec(body, spec, presets);
    // Wait 2 seconds for create to get it on fetchAllSchedules
    loading.set(true);
    const { error: err } = await createSchedule({
        scheduleId: name,
        namespace,
        body,
    });
    if (err) {
        error.set(err);
        loading.set(false);
    }
    else {
        setTimeout(() => {
            error.set('');
            loading.set(false);
            goto(routeForSchedules({ namespace }));
        }, 2000);
    }
};
export const submitEditSchedule = async ({ action, spec, presets }, schedule, scheduleId) => {
    var _a, _b;
    const { namespace, name, workflowId, workflowType, taskQueue, input, encoding, messageType, searchAttributes, } = action;
    let payloads;
    if (input) {
        try {
            payloads = await encodePayloads({ input, encoding, messageType });
        }
        catch (e) {
            error.set(`${translate('data-encoder.encode-error')}: ${e === null || e === void 0 ? void 0 : e.message}`);
            return;
        }
    }
    const { preset } = presets;
    const body = {
        schedule_id: scheduleId,
        searchAttributes: searchAttributes.length === 0
            ? null
            : {
                indexedFields: {
                    ...setSearchAttributes(searchAttributes),
                },
            },
        schedule: {
            ...schedule,
            action: {
                startWorkflow: {
                    ...schedule.action.startWorkflow,
                    workflowId,
                    workflowType: { name: workflowType },
                    taskQueue: { name: taskQueue },
                    ...(input !== undefined && { input: payloads ? { payloads } : null }),
                },
            },
        },
    };
    const fields = (_b = (_a = body.schedule.action.startWorkflow) === null || _a === void 0 ? void 0 : _a.header) === null || _b === void 0 ? void 0 : _b.fields;
    if (fields && Object.keys(fields).length > 0) {
        try {
            const entries = Object.entries(fields);
            for (const [key, value] of entries) {
                const encodedValue = await encodePayloads({
                    input: stringifyWithBigInt(value),
                    encoding: 'json/plain',
                });
                fields[key] = encodedValue[0];
            }
        }
        catch (e) {
            error.set(`${translate('data-encoder.encode-error')}: ${e === null || e === void 0 ? void 0 : e.message}`);
            return;
        }
    }
    if (preset === 'existing') {
        body.schedule.spec = schedule.spec;
    }
    else {
        setBodySpec(body, spec, presets);
        body.schedule.spec.structuredCalendar = [];
    }
    // Wait 2 seconds for edit to get it on fetchSchedule
    loading.set(true);
    const { error: err } = await editSchedule({
        namespace,
        scheduleId,
        body,
    });
    if (err) {
        error.set(err);
        loading.set(false);
    }
    else {
        setTimeout(() => {
            goto(routeForSchedule({ namespace, scheduleId: name }));
            error.set('');
            loading.set(false);
        }, 2000);
    }
};
export const loading = writable(false);
export const error = writable('');
export const schedulesCount = writable('0');
