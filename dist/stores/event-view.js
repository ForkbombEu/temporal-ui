import { persistStore } from './persist-store';
export const autoRefreshWorkflow = persistStore('autoRefreshWorkflow', 'off');
export const eventViewType = persistStore('eventView', 'feed', true);
export const minimizeEventView = persistStore('minimizeEventView', true, true);
export const eventFilterSort = persistStore('eventFilterSort', 'descending');
export const eventShowElapsed = persistStore('eventShowElapsed', 'false');
