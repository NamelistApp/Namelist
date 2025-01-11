import { Team } from '../domain/types'
import { AppContext } from '../MainContainer'

const pathsWithoutTeamId = [
    'login',
]

function isPathWithoutTeamId(path: string): boolean {
    const firstPart = path.split('/')[1]
    return pathsWithoutTeamId.includes(firstPart)
}

function addTeamIdUnlessPresent(path: string, teamId?: Team['id']): string {
    if (path.match(/^\/team\/\d+/)) {
        return path
    }

    let prefix = ''
    try {
        prefix = `/team/${teamId ?? AppContext.getCurrentTeamId()}`
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

export function removeTeamIdIfPresent(path: string): string {
    if (path.match(/^\/team\/\d+/)) {
        return '/' + path.split('/').splice(3).join('/')
    }
    return path
}

export function addTeamIdIfMissing(path: string, teamId?: Team['id']): string {
    return isPathWithoutTeamId(removeTeamIdIfPresent(path))
        ? removeTeamIdIfPresent(path)
        : addTeamIdUnlessPresent(path, teamId)
}
