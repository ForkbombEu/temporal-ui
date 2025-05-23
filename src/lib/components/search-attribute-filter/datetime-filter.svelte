<script lang="ts">
  import { addHours, addMinutes, addSeconds, startOfDay } from 'date-fns';
  import { zonedTimeToUtc } from 'date-fns-tz';
  import { getContext } from 'svelte';

  import Button from '$lib/holocene/button.svelte';
  import DatePicker from '$lib/holocene/date-picker.svelte';
  import Icon from '$lib/holocene/icon/icon.svelte';
  import Input from '$lib/holocene/input/input.svelte';
  import { Menu, MenuButton, MenuContainer } from '$lib/holocene/menu';
  import MenuDivider from '$lib/holocene/menu/menu-divider.svelte';
  import MenuItem from '$lib/holocene/menu/menu-item.svelte';
  import RadioInput from '$lib/holocene/radio-input/radio-input.svelte';
  import Option from '$lib/holocene/select/option.svelte';
  import Select from '$lib/holocene/select/select.svelte';
  import TimePicker from '$lib/holocene/time-picker.svelte';
  import { translate } from '$lib/i18n/translate';
  import { supportsAdvancedVisibility } from '$lib/stores/advanced-visibility';
  import {
    endDate,
    endHour,
    endMinute,
    endSecond,
    getTimezone,
    relativeTimeDuration,
    relativeTimeUnit,
    startDate,
    startHour,
    startMinute,
    startSecond,
    TIME_UNIT_OPTIONS,
    timeFormat,
    timeFormatType,
  } from '$lib/stores/time-format';
  import { getSelectedTimezone } from '$lib/utilities/format-date';
  import { toDate } from '$lib/utilities/to-duration';

  import ConditionalMenu from './conditional-menu.svelte';
  import { FILTER_CONTEXT, type FilterContext } from './index.svelte';

  const { filter, handleSubmit } = getContext<FilterContext>(FILTER_CONTEXT);

  $: isTimeRange = $filter.conditional === 'BETWEEN';
  $: selectedTime = getSelectedTimezone($timeFormat);

  $: useBetweenDateTimeQuery = isTimeRange || !$supportsAdvancedVisibility;
  $: disabled =
    $timeFormatType === 'relative' &&
    !useBetweenDateTimeQuery &&
    (!$relativeTimeDuration || error($relativeTimeDuration));

  const onStartDateChange = (d: CustomEvent) => {
    $startDate = startOfDay(d.detail);
    $startHour = '';
    $startMinute = '';
    $startSecond = '';
  };

  const onEndDateChange = (d: CustomEvent) => {
    $endDate = startOfDay(d.detail);
    $endHour = '';
    $endMinute = '';
    $endSecond = '';
  };

  const applyTimeChanges = (
    date: Date,
    time: { hour?: string; minute?: string; second?: string },
  ) => {
    let _date = new Date(date);
    if (time.hour) _date = addHours(_date, parseInt(time.hour));
    if (time.minute) _date = addMinutes(_date, parseInt(time.minute));
    if (time.second) _date = addSeconds(_date, parseInt(time.second));

    return _date;
  };

  const onApply = () => {
    if ($timeFormatType === 'relative' && !useBetweenDateTimeQuery) {
      if (!$relativeTimeDuration) return;
      $filter.value = toDate(`${$relativeTimeDuration} ${$relativeTimeUnit}`);
      $filter.customDate = false;
    } else {
      let startDateWithTime = applyTimeChanges($startDate, {
        hour: $startHour,
        minute: $startMinute,
        second: $startSecond,
      });
      let endDateWithTime = applyTimeChanges($endDate, {
        hour: $endHour,
        minute: $endMinute,
        second: $endSecond,
      });

      const timezone = getTimezone($timeFormat);
      const formattedStartTime = zonedTimeToUtc(
        startDateWithTime,
        timezone,
      ).toISOString();

      const formattedEndTime = zonedTimeToUtc(
        endDateWithTime,
        timezone,
      ).toISOString();

      const value = useBetweenDateTimeQuery
        ? `BETWEEN "${formattedStartTime}" AND "${formattedEndTime}"`
        : formattedStartTime;

      $filter.value = value;

      if (isTimeRange) {
        $filter.customDate = true;
        $filter.conditional = '';
      } else {
        $filter.customDate = false;
      }
    }

    handleSubmit();
  };

  const error = (x: string) => {
    if (x) return isNaN(Number(x)) || isNaN(parseFloat(x));
    return false;
  };
</script>

<ConditionalMenu
  inputId="time-range-filter"
  options={[
    { value: '<=', label: translate('common.before') },
    { value: 'BETWEEN', label: translate('common.between') },
    { value: '>=', label: translate('common.after') },
  ]}
  noBorderLeft
  noBorderRight
>
  <MenuContainer>
    <MenuButton
      id="time-range-filter"
      controls="time-range-filter-menu"
      class="whitespace-nowrap"
    >
      {translate('workflows.select-time')}
    </MenuButton>
    <Menu
      keepOpen
      id="time-range-filter-menu"
      class="max-h-fit w-[27rem] !overflow-visible"
    >
      {#if isTimeRange}
        <MenuItem>
          <div class="flex flex-col gap-2">
            <DatePicker
              label={translate('common.start')}
              on:datechange={onStartDateChange}
              selected={new Date($startDate)}
              todayLabel={translate('common.today')}
              closeLabel={translate('common.close')}
              clearLabel={translate('common.clear-input-button-label')}
            />
            <TimePicker
              bind:hour={$startHour}
              bind:minute={$startMinute}
              bind:second={$startSecond}
              twelveHourClock={false}
            />
          </div>
        </MenuItem>
        <MenuDivider />
        <MenuItem>
          <div class="flex flex-col gap-2">
            <DatePicker
              label={translate('common.end')}
              on:datechange={onEndDateChange}
              selected={new Date($endDate)}
              todayLabel={translate('common.today')}
              closeLabel={translate('common.close')}
              clearLabel={translate('common.clear-input-button-label')}
            />
            <TimePicker
              bind:hour={$endHour}
              bind:minute={$endMinute}
              bind:second={$endSecond}
              twelveHourClock={false}
            />
          </div>
        </MenuItem>
      {:else}
        <MenuItem on:click={() => ($timeFormatType = 'relative')}>
          <div class="flex flex-col">
            <RadioInput
              label={translate('common.relative')}
              id="relative-time"
              value="relative"
              name="time-filter-type"
              group={timeFormatType}
            />
            <div class="ml-6 flex gap-2 pt-2">
              <Input
                label={translate('common.relative')}
                labelHidden
                id="relative-datetime-input"
                bind:value={$relativeTimeDuration}
                placeholder="00"
                error={error($relativeTimeDuration)}
                class="h-10"
                disabled={$timeFormatType !== 'relative'}
              />
              <Select
                bind:value={$relativeTimeUnit}
                id="relative-datetime-unit-input"
                label={translate('common.time-unit')}
                labelHidden
                disabled={$timeFormatType !== 'relative'}
              >
                {#each TIME_UNIT_OPTIONS as unit}
                  <Option value={unit}>{unit} {translate('common.ago')}</Option>
                {/each}
              </Select>
            </div>
          </div>
        </MenuItem>
        <MenuDivider />
        <MenuItem on:click={() => ($timeFormatType = 'absolute')}>
          <div class="flex flex-col gap-2">
            <RadioInput
              label={translate('common.absolute')}
              id="absolute-time"
              value="absolute"
              name="time-filter-type"
              group={timeFormatType}
            />
            <div class="ml-6 flex flex-col gap-2">
              <DatePicker
                label={''}
                labelHidden
                on:datechange={onStartDateChange}
                selected={new Date($startDate)}
                todayLabel={translate('common.today')}
                closeLabel={translate('common.close')}
                clearLabel={translate('common.clear-input-button-label')}
                disabled={$timeFormatType !== 'absolute'}
              />
              <TimePicker
                bind:hour={$startHour}
                bind:minute={$startMinute}
                bind:second={$startSecond}
                twelveHourClock={false}
                disabled={$timeFormatType !== 'absolute'}
              />
            </div>
          </div>
        </MenuItem>
      {/if}
      <MenuDivider />
      <div class="flex items-center p-2">
        <Button size="xs" style="width: 100%" on:click={onApply} {disabled}
          >{translate('common.apply')}</Button
        >
      </div>
      <MenuItem centered disabled class="!pt-0">
        <Icon name="clock" aria-hidden="true" />
        {translate('common.based-on-time-preface')}
        {selectedTime}
      </MenuItem>
    </Menu>
  </MenuContainer>
</ConditionalMenu>
