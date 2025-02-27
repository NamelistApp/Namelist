// Generated by kea-typegen on Mon, 30 Dec 2024 05:04:21 GMT. DO NOT EDIT THIS FILE MANUALLY.

import type { Logic } from 'kea'

import type { User } from '../core/types'

export interface userLogicType extends Logic {
    actionCreators: {
        loadUser: () => ({
            type: "load user (src.userLogic)";
            payload: {};
        });
        logout: () => ({
            type: "logout (src.userLogic)";
            payload: {
                value: true;
            };
        });
        loadUserSuccess: (user: User | null, payload?: {}) => ({
            type: "load user success (src.userLogic)";
            payload: {
                user: User | null;
                payload?: {};
            };
        });
        loadUserFailure: (error: string, errorObject?: any) => ({
            type: "load user failure (src.userLogic)";
            payload: {
                error: string;
                errorObject?: any;
            };
        });
    };
    actionKeys: {
        "load user (src.userLogic)": "loadUser";
        "logout (src.userLogic)": "logout";
        "load user success (src.userLogic)": "loadUserSuccess";
        "load user failure (src.userLogic)": "loadUserFailure";
    };
    actionTypes: {
        loadUser: "load user (src.userLogic)";
        logout: "logout (src.userLogic)";
        loadUserSuccess: "load user success (src.userLogic)";
        loadUserFailure: "load user failure (src.userLogic)";
    };
    actions: {
        loadUser: () => void;
        logout: () => void;
        loadUserSuccess: (user: User | null, payload?: {}) => void;
        loadUserFailure: (error: string, errorObject?: any) => void;
    };
    asyncActions: {
        loadUser: () => Promise<any>;
        logout: () => Promise<any>;
        loadUserSuccess: (user: User | null, payload?: {}) => Promise<any>;
        loadUserFailure: (error: string, errorObject?: any) => Promise<any>;
    };
    defaults: {
        user: User | null;
        userLoading: boolean;
    };
    events: {};
    key: undefined;
    listeners: {
        "logout": ((action: {
            type: "logout (src.userLogic)";
            payload: {
                value: true;
            };
        }, previousState: any) => void | Promise<void>)[];
    };
    path: [
        "src",
        "userLogic"
    ];
    pathString: "src.userLogic";
    props: Record<string, unknown>;
    reducer: (state: any, action: any, fullState: any) => {
        user: User | null;
        userLoading: boolean;
    };
    reducers: {
        user: (state: User | null, action: any, fullState: any) => User | null;
        userLoading: (state: boolean, action: any, fullState: any) => boolean;
    };
    selector: (state: any) => {
        user: User | null;
        userLoading: boolean;
    };
    selectors: {
        user: (state: any, props?: any) => User | null;
        userLoading: (state: any, props?: any) => boolean;
    };
    sharedListeners: {};
    values: {
        user: User | null;
        userLoading: boolean;
    };
    _isKea: true;
    _isKeaWithKey: false;
}