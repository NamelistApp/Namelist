import { kea, path, defaults, reducers, actions } from "kea"

import type { navigationLogicType } from "./navigationLogicType";

const navigationLogic = kea<navigationLogicType>([
    path(['src', 'scenes', 'app', 'components', 'appHeaderLogic']),
    defaults({
        opened: false
    }),
    actions({
        setOpened: (value: boolean) => ({ value })
    }),
    reducers({
        opened: {
            setOpened: (state, { value }) => value,
        }
    })
])

export default navigationLogic