<script>import { goto } from '$app/navigation';
import Button from '../../holocene/button.svelte';
import Label from '../../holocene/label.svelte';
import { translate } from '../../i18n/translate';
import { groupEvents } from '../../models/event-groups';
import { toEventHistory } from '../../models/event-history';
import { importEventGroups, importEvents } from '../../stores/import-events';
import { lastUsedNamespace } from '../../stores/namespaces';
import { toaster } from '../../stores/toaster';
import { parseWithBigInt } from '../../utilities/parse-with-big-int';
import { routeForEventHistoryImport } from '../../utilities/route-for';
let rawEvents;
let fileLoaded = false;
const onFileSelect = async (e) => {
    var _a;
    const target = e.target;
    const file = (_a = target === null || target === void 0 ? void 0 : target.files) === null || _a === void 0 ? void 0 : _a[0];
    const reader = new FileReader();
    if (file) {
        reader.readAsText(file);
        reader.onload = () => {
            var _a, _b;
            try {
                const result = (_b = (_a = reader === null || reader === void 0 ? void 0 : reader.result) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : '';
                rawEvents = parseWithBigInt(result);
                fileLoaded = true;
            }
            catch (e) {
                toaster.push({
                    variant: 'error',
                    message: translate('events.event-history-load-error'),
                });
                fileLoaded = false;
            }
        };
    }
};
const onConfirm = async () => {
    try {
        const events = await toEventHistory(Array.isArray(rawEvents) ? rawEvents : rawEvents === null || rawEvents === void 0 ? void 0 : rawEvents.events);
        const eventGroups = groupEvents(events);
        importEvents.set(events);
        importEventGroups.set(eventGroups);
        fileLoaded = false;
        const path = routeForEventHistoryImport($lastUsedNamespace, 'feed');
        goto(path);
    }
    catch (e) {
        console.error(e);
        toaster.push({
            variant: 'error',
            message: translate('events.event-history-import-error'),
        });
    }
};
</script>

<div class="flex flex-col items-start gap-2 md:flex-row md:items-center">
  <Label
    hidden
    for="import-event-history-file-upload"
    label={translate('events.import-event-history-file-upload')}
  />
  <input
    id="import-event-history-file-upload"
    class="import-input block border border-slate-200 p-2"
    type="file"
    accept=".json"
    on:change={onFileSelect}
  />
  <Button leadingIcon="file-upload" on:click={onConfirm} disabled={!fileLoaded}
    >{translate('common.import')}</Button
  >
</div>
