// Generated by kea-typegen on Tue, 07 Jan 2025 19:37:24 GMT. DO NOT EDIT THIS FILE MANUALLY.

import type { Logic } from 'kea'

export interface navigationLogicType extends Logic {
    actionCreators: {
        setOpened: (value: boolean) => ({
            type: "set opened (src.scenes.app.components.appHeaderLogic)";
            payload: {
                value: boolean;
            };
        });
    };
    actionKeys: {
        "set opened (src.scenes.app.components.appHeaderLogic)": "setOpened";
    };
    actionTypes: {
        setOpened: "set opened (src.scenes.app.components.appHeaderLogic)";
    };
    actions: {
        setOpened: (value: boolean) => void;
    };
    asyncActions: {
        setOpened: (value: boolean) => Promise<any>;
    };
    defaults: {
        opened: boolean;
    };
    events: {};
    key: undefined;
    listeners: {};
    path: [
        "src",
        "scenes",
        "app",
        "components",
        "appHeaderLogic"
    ];
    pathString: "src.scenes.app.components.appHeaderLogic";
    props: Record<string, unknown>;
    reducer: (state: any, action: any, fullState: any) => {
        opened: boolean;
    };
    reducers: {
        opened: (state: boolean, action: any, fullState: any) => boolean;
    };
    selector: (state: any) => {
        opened: boolean;
    };
    selectors: {
        opened: (state: any, props?: any) => boolean;
    };
    sharedListeners: {};
    values: {
        opened: boolean;
    };
    _isKea: true;
    _isKeaWithKey: false;
}