<script>import HistoryImport from '../components/import/event-history-file-import.svelte';
import ToggleButton from '../holocene/toggle-button/toggle-button.svelte';
import ToggleButtons from '../holocene/toggle-button/toggle-buttons.svelte';
import { translate } from '../i18n/translate';
import { lastUsedNamespace } from '../stores/namespaces';
import { routeForEventHistoryImport } from '../utilities/route-for';
</script>

<section id="event-history">
  <nav
    class="flex flex-col items-start justify-between gap-4 pb-4 md:flex-row"
    aria-label={translate('events.import-event-history')}
  >
    <h3>
      {translate('events.import-event-history')}
    </h3>
    <div class="flex gap-4">
      <HistoryImport />
    </div>
  </nav>
  <nav
    class="flex items-end justify-end gap-4"
    aria-label={translate('events.event-history-view')}
  >
    <div id="event-view-toggle" class="surface-primary flex gap-4">
      <ToggleButtons>
        <ToggleButton
          icon="feed"
          href={routeForEventHistoryImport($lastUsedNamespace, 'feed')}
          >{translate('workflows.history')}</ToggleButton
        >
        <ToggleButton
          icon="compact"
          href={routeForEventHistoryImport($lastUsedNamespace, 'compact')}
          >{translate('workflows.compact')}</ToggleButton
        >
        <ToggleButton
          icon="json"
          href={routeForEventHistoryImport($lastUsedNamespace, 'json')}
          >{translate('workflows.json')}</ToggleButton
        >
      </ToggleButtons>
    </div>
  </nav>
  <slot />
</section>
