import posthog from "posthog-js"
import { isDebug } from "./constants"

export enum TrackingEvent {
    pageView = "$pageview",
    login = "login",
    logout = "logout"
}

export interface TrackingMonitorInterface {
    track(event: TrackingEvent, data?: {}): void
}

export class TrackingMonitor implements TrackingMonitorInterface {
    track(event: TrackingEvent, data?: {}): void {
        if (isDebug) {
            console.log(`Tracking event: ${event}`, data)
        }
        posthog.capture(event, data)
    }
}