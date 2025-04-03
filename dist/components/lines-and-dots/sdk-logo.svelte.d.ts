import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: Record<string, never>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type SdkLogoProps = typeof __propDef.props;
export type SdkLogoEvents = typeof __propDef.events;
export type SdkLogoSlots = typeof __propDef.slots;
export default class SdkLogo extends SvelteComponentTyped<SdkLogoProps, SdkLogoEvents, SdkLogoSlots> {
}
export {};
