import React from 'react';
import { chatwootKey } from '../../../core/constants';

class ChatwootWidget extends React.Component {
    componentDidMount() {
        window.chatwootSettings = {
            hideMessageBubble: false,
            launcherTitle: 'Chat with us',
            position: 'right', // This can be left or right
            locale: 'en', // Language to be set
            type: 'standard', // [standard, expanded_bubble]
        };

        (function (d, t) {
            var BASE_URL = "https://app.chatwoot.com";
            var g = d.createElement(t), s = d.getElementsByTagName(t)[0];
            g.src = BASE_URL + "/packs/js/sdk.js";
            s.parentNode.insertBefore(g, s);
            g.async = !0;
            g.onload = function () {
                window.chatwootSDK.run({
                    websiteToken: chatwootKey,
                    baseUrl: BASE_URL
                })
            }
        })(document, "script");
    }

    render() {
        return null;
    }
}

export default ChatwootWidget