import { Portal } from '../core/types'
import { AppContext } from '../app-container'

const pathsWithoutPortalId = [
    'login',
]

function isPathWithoutPortalId(path: string): boolean {
    const firstPart = path.split('/')[1]
    return pathsWithoutPortalId.includes(firstPart)
}

function addPortalIdUnlessPresent(path: string, portalId?: Portal['id']): string {
    if (path.match(/^\/portal\/\d+/)) {
        return path
    }

    let prefix = ''
    try {
        prefix = `/portal/${portalId ?? AppContext.getCurrentPortalId()}`
        if (path == '/') {
            return prefix
        }
    } catch (e) {
        // Not logged in
    }
    if (path === prefix || path.startsWith(prefix + '/')) {
        return path
    }
    return `${prefix}/${path.startsWith('/') ? path.slice(1) : path}`
}

export function removePortalIdIfPresent(path: string): string {
    if (path.match(/^\/portal\/\d+/)) {
        return '/' + path.split('/').splice(3).join('/')
    }
    return path
}

export function addPortalIdIfMissing(path: string, portalId?: Portal['id']): string {
    return isPathWithoutPortalId(removePortalIdIfPresent(path))
        ? removePortalIdIfPresent(path)
        : addPortalIdUnlessPresent(path, portalId)
}
