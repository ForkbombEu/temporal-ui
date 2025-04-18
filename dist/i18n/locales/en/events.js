export const Namespace = 'events';
export const Strings = {
    'empty-state-title': 'No Events Match',
    'empty-state-description': 'There are no events that match your filters or selected view. Adjust your filters or view to see your events.',
    'group-empty-state-title': 'Event Group Not Found',
    'sort-ascending': 'Sort 1-9',
    'sort-descending': 'Sort 9-1',
    'date-and-time': 'Date & Time',
    'show-elapsed-time': 'Show Elapsed Time & Duration',
    'event-type': 'Event Type',
    'workflow-events': 'Workflow Events',
    category: {
        all: 'All',
        activity: 'Activity',
        'activity-tooltip': "An Activity is a normal function or method execution that's intended to execute a single, well-defined action.",
        'child-workflow': 'Child Workflow',
        'child-workflow-tooltip': 'A Child Workflow Execution is a Workflow Execution that is spawned from within another Workflow in the same Namespace.',
        command: 'Command',
        'command-tooltip': 'Command Events',
        other: 'Other',
        'other-tooltip': 'Marker Recorded, Upsert Search Attributes and Workflow Properties Modified.',
        'local-activity': 'Local Activity',
        'local-activity-tooltip': 'A Local Activity is an Activity Execution that executes in the same process as the Workflow Execution that spawns it.',
        nexus: 'Nexus',
        'nexus-tooltip': 'Nexus connects durable executions within and across Namespaces.',
        signal: 'Signal',
        'signal-tooltip': 'Signals are asynchronous write requests. They cause changes in the running Workflow, but you cannot await any response or error.',
        timer: 'Timer',
        'timer-tooltip': 'Timers are durable timers set for a fixed time period.',
        update: 'Update',
        'update-tooltip': 'Updates are synchronous, tracked write requests. The sender of the Update can wait for a response on completion or an error on failure.',
        workflow: 'Workflow',
        'workflow-tooltip': 'A Workflow Task is a Task that contains the context needed to make progress with a Workflow Execution.',
    },
    'attribute-group': {
        activity: 'Activity',
        parent: 'Parent',
        'retry-policy': 'Retry Policy',
        schedule: 'Schedule',
        'search-attributes': 'Search Attributes',
        summary: 'Summary',
        'task-queue': 'Task Queue',
        workflow: 'Workflow',
    },
    'custom-search-attributes': 'Custom Search Attributes',
    'custom-search': 'custom search',
    attribute: 'attribute',
    'event-group': 'Events related to {{eventName}}',
    'error-event': 'Error Event',
    'import-event-history': 'Import Event History',
    'import-event-history-file-upload': 'Select an event history JSON file to upload',
    'event-history-view': 'Event History View',
    'api-history-link': 'View in Github',
    'history-expected-formats': 'Expected JSON formats',
    'event-history-import-error': 'Could not create event history from JSON',
    'event-history-load-error': 'Could not parse JSON',
    'event-classification-label': 'Event Classification',
    'event-classification': {
        unspecified: 'Unspecified',
        scheduled: 'Scheduled',
        open: 'Open',
        new: 'New',
        started: 'Started',
        initiated: 'Initiated',
        running: 'Running',
        completed: 'Completed',
        fired: 'Fired',
        cancelrequested: 'Cancel Requested',
        timedout: 'Timed Out',
        signaled: 'Signaled',
        canceled: 'Canceled',
        failed: 'Failed',
        terminated: 'Terminated',
        pending: 'Pending',
        retrying: 'Retrying',
    },
    'decode-event-history': 'Decode Event History',
    encoded: 'Encoded',
    decoded: 'Decoded',
    'decoded-description': 'Codec Server decoded and base64 encoded',
    readable: 'Human Readable',
    'readable-description': 'Codec Server decoded and base64 decoded',
    'event-types': 'Event Types',
    'decode-failed': 'Decoding failed',
    'view-raw-history': 'View Raw History',
};
