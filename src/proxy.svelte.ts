import { BareMuxConnection } from "@mercuryworkshop/bare-mux";
import config from "./config.svelte";
import { httpUrlToWebSocket } from "./util";
import autoProxyProber from "./prober.svelte";
import { adBlocklist } from "./adBlocklist";

// Declare global Scramjet types if needed, or rely on window globals
declare global {
    var $scramjetLoadController: any;
}

let iframeHasLoaded = $state(true);
let proxyStarted = $state(false);

export class ServiceWorkerConfig {
    blocklist: Set<string> = new Set();

    constructor(adblock: boolean) {
        if (adblock) this.blocklist = new Set(adBlocklist);
    }
}

export class ProxyManager {
    // set in index.html
    scramjetConfig: any;
    bareMuxConnection: BareMuxConnection;
    controller: any; // ScramjetController instance

    constructor() {
        // Scramjet handles SW registration differently, usually via its controller
    }

    async initializeProxy() {
        // Initialize Scramjet Controller
        const { ScramjetController } = window.$scramjetLoadController();
        this.controller = new ScramjetController(this.scramjetConfig);
        await this.controller.init();

        // Register SW
        if ('serviceWorker' in navigator) {
             await navigator.serviceWorker.register("scramjet/sw.js");
        }

        // Initialize BareMux
        this.bareMuxConnection = new BareMuxConnection("/baremux/worker.js");
        
        await this.setProxyServer(this.proxyUrl);
    }

    async setProxyServer(proxyUrl: string) {
        if (proxyUrl == "") return;
        const loc = "/"; // Root path for baremux scripts

        if (config.useBare) {
            this.bareMuxConnection.setTransport(loc + "baremod/index.mjs", [
                proxyUrl
            ]);
        } else {
            // set to websocket protocol
            this.bareMuxConnection.setTransport(loc + "libcurl/index.mjs", [
                { wisp: httpUrlToWebSocket(proxyUrl) },
            ]);
        }
    }

    isProxyOpen: boolean = $state(false);
    
    url: string = $state("");
    iframeUrl: string = $state("");
    
    reloadIframe() {
        if (this.controller) {
            this.iframeUrl = this.controller.encodeUrl(this.url);
        }
    }

    proxyUrl = $derived.by(() => {
        if (config.useBare) {
            if (config.bareSelectedProxy === "auto") return autoProxyProber.bareUrl;
            else if (config.bareSelectedProxy === "custom") return config.bareCustomProxy;
            else return config.bareSelectedProxy;
        } else {
            if (config.wispSelectedProxy === "auto") return autoProxyProber.wispUrl;
            else if (config.wispSelectedProxy === "custom") return config.wispCustomProxy;
            else return config.wispSelectedProxy;
        }
    });

    setDestination(destination: string) {
        if (destination === "") {
            this.url = "https://duckduckgo.com";
            return;
        }
        if (!destination.includes(".") || destination.includes(" ")) {
            this.url =
                "https://duckduckgo.com/?q=" + destination;
            return;
        }
        if (
            !destination.startsWith("https://") &&
            !destination.startsWith("http://")
        ) {
            this.url = "https://" + destination;
            return;
        }
        this.url = destination;
    }

    async updateSWConfig(cfg: ServiceWorkerConfig) {
        // Scramjet might handle config differently, typically via postMessage to SW
        // For basic adblocking implementation similar to UV, we'd need to extend the SW
        // For now, this is a placeholder matching the previous structure
        if (navigator.serviceWorker && navigator.serviceWorker.controller) {
             navigator.serviceWorker.controller.postMessage({
                 type: "updateConfig",
                 data: cfg
             });
        }
    }

    startProxy(destinationInput: string): boolean {
        if (proxyManager.proxyUrl === "")
            return false;
    
        proxyManager.setDestination(destinationInput);
        proxyManager.isProxyOpen = true;
        console.log("States updated")
        proxyManager.reloadIframe();
    
        return true;
    }
}

const proxyManager = $state(new ProxyManager());
export default proxyManager;