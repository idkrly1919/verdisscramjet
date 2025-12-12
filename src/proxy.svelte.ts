class ProxyManager {
    isProxyOpen: boolean = $state(false);
    url: string = $state("");
    iframeUrl: string = $state("");
    
    // External proxy prefix
    prefix = "https://google-i39l.onrender.com/share/scramjet/";

    setDestination(destination: string) {
        if (destination === "") {
            this.url = "https://duckduckgo.com";
        } else if (!destination.includes(".") || destination.includes(" ")) {
            this.url = "https://duckduckgo.com/?q=" + encodeURIComponent(destination);
        } else {
            if (!destination.startsWith("https://") && !destination.startsWith("http://")) {
                this.url = "https://" + destination;
            } else {
                this.url = destination;
            }
        }
    }

    reloadIframe() {
        if (this.url) {
            this.iframeUrl = this.prefix + this.url;
        }
    }

    startProxy(destinationInput: string): boolean {
        this.setDestination(destinationInput);
        this.isProxyOpen = true;
        this.reloadIframe();
        return true;
    }
}

const proxyManager = $state(new ProxyManager());
export default proxyManager;