(function() {
    let style = '#our_logo{display:block;z-index:9999;position:absolute;user-select:none}#our_logo.size_140{width:140px;height:18px}#our_logo.size_120{width:120px;height:18px}';

    // Function to get the referrer domain
    function getReferrerHostname() {
        try {
            if (!document.referrer) return "";
            const url = new URL(document.referrer);
            return url.hostname.toLowerCase();
        } catch (e) {
            return "";
        }
    }

    // Function to get the traffic source (for iframe)
    function getTrafficSource() {
        try {
            // Try to get the parent window domain (for iframe)
            if (window.parent && window.parent !== window) {
                return window.parent.location.hostname.toLowerCase();
            }
        } catch (e) {
            // If access is blocked by CORS, use referrer instead
            return getReferrerHostname();
        }
        return getReferrerHostname();
    }

    // Function to create UTM parameters
    function generateUTMParams() {
        const trafficSource = getTrafficSource();
        const isOwnDomain = [
            "igru.net",
            "igru.com.ua",
            "8games.net",
            "1gry.pl",
            "marty-games.github.io",
            "github.io",
            "cdn.jsdelivr.net",
            "jsdelivr.net",
            "raw.githack.com"
        ].includes(trafficSource);

        const isInIframe = window.self !== window.top;
        const params = new URLSearchParams();

        params.set('utm_source', 'logo_link');

        if (isInIframe && isOwnDomain) {
            params.set('utm_medium', 'iframe_own');
        } else if (isInIframe) {
            params.set('utm_medium', 'iframe_external');
        } else {
            params.set('utm_medium', 'direct');
        }

        if (trafficSource) {
            params.set('utm_campaign', trafficSource);
        }

        return params.toString();
    }

    let vse = {
        "size_140": '<div id="our_logo" class="size_140"><a target="_blank" href="https://igru.net/{{UTM}}" title="All Games - Online | The Original"><img src="/dasha1/111_4.png" width="140" height="18" style="cursor: pointer;" title="All Games - Online | The Original" alt="All Games - Online | The Original"></a></div>',
        "size_120": '<div id="our_logo" class="size_120"><a target="_blank" href="https://igru.net/{{UTM}}" title="All Games - Online | The Original"><img src="/dasha1/111_4.png" width="120" height="18" style="cursor: pointer;" title="All Games - Online | The Original" alt="All Games - Online | The Original"></a></div>'
    };

    let gm = {
        "size_140": '<div id="our_logo" class="size_140"><a target="_blank" href="https://8games.net/{{UTM}}" title="All Games Online - Play For Free"><img src="/dasha1/1112.png" width="140" height="18" style="cursor: pointer;" title="All Games Online - Play For Free" alt="All Games Online - Play For Free"></a></div>',
        "size_120": '<div id="our_logo" class="size_120"><a target="_blank" href="https://8games.net/{{UTM}}" title="All Games Online - Play For Free"><img src="/dasha1/1112.png" width="120" height="18" style="cursor: pointer;" title="All Games Online - Play For Free" alt="All Games Online - Play For Free"></a></div>'
    };

    let css = (e, styles) => {
        for (const property in styles)
            e.style[property] = styles[property];
    };

    let alertLogo = (size = '140', position) => {
        const sheet = document.createElement('style');
        sheet.innerHTML = style;
        document.body.appendChild(sheet);

        const wrapperLogo = document.createElement('div');

        let lang = (navigator.language || navigator.userLanguage).slice(0, 2);
        let currentLogo = '';

        document.referrer.includes(atob("OGdhbWVzLm5ldA==")) && (lang = 'gm');
        document.referrer.includes(atob("aWdydS5uZXQ=")) && (lang = 'vse');

        ((lang === 'en' || lang === 'gm') && lang !== 'vse')
            ? currentLogo = gm['size_' + size]
            : currentLogo = vse['size_' + size];

        // Generate UTM parameters and insert them into the link
        const utmParams = generateUTMParams();
        currentLogo = currentLogo.replace('{{UTM}}', '?' + utmParams);

        wrapperLogo.innerHTML = currentLogo;
        document.body.appendChild(wrapperLogo);

        if (typeof position != 'undefined') {
            css(document.getElementById('our_logo'), position);
        }
    };

    window.alertLogo = alertLogo;
})();
