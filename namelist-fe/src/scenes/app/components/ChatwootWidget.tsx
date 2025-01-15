import React from 'react'
import { chatwootKey } from '../../../core/constants'

declare global {
    interface Window {
        chatwootSettings: {
            hideMessageBubble: boolean
            launcherTitle: string
            position: 'left' | 'right'
            locale: string
            type: 'standard' | 'expanded_bubble'
        }
        chatwootSDK: {
            run: (config: { websiteToken: string; baseUrl: string }) => void
        }
    }
}

class ChatwootWidget extends React.Component {
    componentDidMount(): void {
        window.chatwootSettings = {
            hideMessageBubble: false,
            launcherTitle: 'Chat with us',
            position: 'right',
            locale: 'en',
            type: 'standard',
        };

        (function (d: Document, t: string): void {
            const BASE_URL = "https://app.chatwoot.com";
            const g = d.createElement(t) as HTMLScriptElement;
            const s = d.getElementsByTagName(t)[0];
            g.src = `${BASE_URL}/packs/js/sdk.js`;
            g.async = true;
            s.parentNode?.insertBefore(g, s);

            g.onload = () => {
                window.chatwootSDK.run({
                    websiteToken: chatwootKey,
                    baseUrl: BASE_URL,
                });
            };
        })(document, "script");
    }

    render(): null {
        return null
    }
}

export default ChatwootWidget;