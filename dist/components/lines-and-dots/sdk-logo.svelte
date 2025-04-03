<script>import { fullEventHistory } from '../../stores/events';
import { getSDKandVersion } from '../../utilities/get-sdk-version';
import { isWorkflowTaskCompletedEvent } from '../../utilities/is-event-type';
import dotNet from '../../vendor/sdk-logos/dot-net-logo.png';
import go from '../../vendor/sdk-logos/go-logo.png';
import java from '../../vendor/sdk-logos/java-logo.png';
import php from '../../vendor/sdk-logos/php-logo.png';
import python from '../../vendor/sdk-logos/python-logo.png';
import ruby from '../../vendor/sdk-logos/ruby-logo.png';
import rust from '../../vendor/sdk-logos/rust-logo.png';
import typescript from '../../vendor/sdk-logos/ts-logo.png';
const sdkLogos = {
    go,
    typescript,
    java,
    python,
    '.net': dotNet,
    ruby,
    php,
    rust,
};
$: workflowCompletedTasks = $fullEventHistory.filter(isWorkflowTaskCompletedEvent);
$: ({ sdk, version } = getSDKandVersion(workflowCompletedTasks));
$: logo = sdkLogos[sdk.toLowerCase()];
</script>

{#if sdk && version}
  <div class="flex h-4 items-center justify-between gap-16 whitespace-nowrap">
    <span class="font-mono">SDK</span>
    <p class="flex items-center gap-1">
      {#if logo}
        <img src={logo} alt="SDK Icon" class="h-6 w-6" />
      {/if}
      {sdk}
      {version}
    </p>
  </div>
{/if}
