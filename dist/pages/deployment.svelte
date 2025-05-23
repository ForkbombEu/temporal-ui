<script>import { page } from '$app/stores';
import VersionTableRow from '../components/deployments/version-table-row.svelte';
import Button from '../holocene/button.svelte';
import Icon from '../holocene/icon/icon.svelte';
import Link from '../holocene/link.svelte';
import PaginatedTable from '../holocene/table/paginated-table/paginated.svelte';
import { translate } from '../i18n/translate';
import { fetchDeployment } from '../services/deployments-service';
import { decodeURIForSvelte } from '../utilities/encode-uri';
import { routeForWorkerDeployments, routeForWorkflowsWithQuery, } from '../utilities/route-for';
$: namespace = $page.params.namespace;
$: deploymentName = $page.params.deployment;
$: parameters = {
    namespace,
    deploymentName: decodeURIForSvelte(deploymentName),
};
$: deploymentFetch = fetchDeployment(parameters);
const columns = [
    { label: translate('deployments.version'), pinned: true },
    {
        label: translate('deployments.deployed'),
        pinned: true,
    },
    {
        label: translate('deployments.workflows'),
        pinned: true,
    },
];
</script>

{#await deploymentFetch then deployment}
  <header
    class="flex flex-row flex-wrap justify-between gap-8 border-b border-subtle px-4 pb-4 pt-8 md:pt-20 xl:px-8"
  >
    <div class="relative flex w-full flex-col gap-4">
      <div class="flex items-center gap-2">
        <Link
          href={routeForWorkerDeployments({ namespace })}
          icon="chevron-left"
        >
          {translate('deployments.back-to-deployments')}
        </Link>
        <Icon name="chevron-left" />
        {deploymentName}
      </div>
      <div class="flex w-full items-center justify-between">
        <h1>{deploymentName}</h1>
        <Button
          href={routeForWorkflowsWithQuery({
            namespace: $page.params.namespace,
            query: `TemporalWorkerDeployment="${deploymentName}"`,
          })}>{translate('deployments.go-to-workflows')}</Button
        >
      </div>
    </div>
  </header>
  <div class="bg-primary p-8">
    <PaginatedTable
      aria-label={translate('deployments.deployments')}
      perPageLabel={translate('common.per-page')}
      nextPageButtonLabel={translate('common.next-page')}
      previousPageButtonLabel={translate('common.previous-page')}
      pageButtonLabel={(page) => translate('common.go-to-page', { page })}
      items={deployment.workerDeploymentInfo.versionSummaries}
      let:visibleItems
    >
      <caption class="sr-only" slot="caption">
        {translate('deployments.deployments')}
      </caption>

      <tr slot="headers" class="text-left">
        {#each columns as { label }, index}
          <th class={index === 0 && 'w-full'}>{label}</th>
        {/each}
      </tr>

      {#each visibleItems as version}
        <VersionTableRow
          routingConfig={deployment.workerDeploymentInfo.routingConfig}
          {version}
          {columns}
        />
      {/each}
    </PaginatedTable>
  </div>
{/await}
