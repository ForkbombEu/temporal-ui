<script>import PayloadDecoder from '../components/event/payload-decoder.svelte';
import CodeBlock from '../holocene/code-block.svelte';
import { translate } from '../i18n/translate';
import { workflowRun } from '../stores/workflow-run';
$: ({ workflow } = $workflowRun);
</script>

<div class="flex flex-col gap-4">
  {#if workflow?.searchAttributes}
    <div class="mt-4 flex flex-col gap-2">
      <h3>
        {translate('events.attribute-group.search-attributes')}
      </h3>
      <PayloadDecoder
        value={{ searchAttributes: workflow.searchAttributes }}
        key="searchAttributes"
        let:decodedValue
      >
        <CodeBlock
          content={decodedValue}
          copyIconTitle={translate('common.copy-icon-title')}
          copySuccessIconTitle={translate('common.copy-success-icon-title')}
        />
      </PayloadDecoder>
    </div>
  {/if}

  {#if workflow?.memo}
    <div class="mt-4 flex flex-col gap-2">
      <h3>{translate('common.memo')}</h3>
      <PayloadDecoder
        value={{ memo: workflow.memo }}
        key="memo"
        let:decodedValue
      >
        <CodeBlock
          content={decodedValue}
          copyIconTitle={translate('common.copy-icon-title')}
          copySuccessIconTitle={translate('common.copy-success-icon-title')}
        />
      </PayloadDecoder>
    </div>
  {/if}
</div>
