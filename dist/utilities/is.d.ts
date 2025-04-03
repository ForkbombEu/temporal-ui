import type { EventSortOrder } from '../stores/event-view';
type Quote = "'" | '"';
export declare const isString: (x: unknown) => x is string;
export declare const isNull: (x: unknown) => x is null;
export declare const isObject: (x: unknown) => x is Record<string, unknown>;
export declare const isNumber: (x: unknown) => x is number;
export declare const isExecutionStatus: (x: unknown) => x is import("@temporalio/proto").temporal.api.enums.v1.WorkflowExecutionStatus;
export declare const isSpace: (x: unknown) => x is " ";
export declare const isQuote: (x: unknown) => x is Quote;
export declare const isBacktick: (x: unknown) => x is "`";
export declare const isOperator: (x: unknown) => x is "between" | "===" | "!==" | ">=" | "<=" | "==" | "!=" | "=" | ">" | "<" | "!" | "and" | "or" | "order by" | "in" | "(" | ")" | "starts_with";
export declare const isConditional: (x: unknown) => x is "===" | "!==" | ">=" | "<=" | "==" | "!=" | "=" | ">" | "<" | "!" | "in" | "starts_with" | "is" | "is not";
export declare const isParenthesis: (x: unknown) => x is "(" | ")";
export declare const isEndParenthesis: (x: unknown) => x is ")";
export declare const isJoin: (x: unknown) => x is "and" | "or";
export declare const isBetween: (x: unknown) => boolean;
export declare const isNullConditional: (x: unknown) => boolean;
export declare const isSortOrder: (sortOrder: string | EventSortOrder) => sortOrder is EventSortOrder;
export declare const isError: (e: unknown) => e is Error;
export declare const isStartsWith: (x: unknown) => boolean;
export declare const isInConditional: (x: unknown) => boolean;
export {};
