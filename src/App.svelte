<script lang="ts">
    import Config from "./Config.svelte";
    import config from "./config.svelte";
    import proxyManager from "./proxy.svelte";
    import { onEnterKeyPressed } from "./util";
    import autoProxyProber from "./prober.svelte";
    import { History } from "./history";
    import Games from "./Games.svelte";
    import Classroom from "./classroom/Classroom.svelte";
    import { brandIcons } from "./icons";
    import {
        Search,
        Settings2,
        RotateCw,
        ArrowRight,
        ArrowLeft,
        X,
        Gamepad2,
        Maximize2,
    } from "@lucide/svelte";
    import { onMount } from "svelte";
    import { fade, fly } from "svelte/transition";

    $effect(() => {
        if (config.useBare && config.bareSelectedProxy === "auto") {
            autoProxyProber.probeBare();
        } else if (config.wispSelectedProxy === "auto") {
            autoProxyProber.probeWisp();
        }
    });

    onMount(() => {
        if (document) {
            document.title = localStorage.getItem("tabTitle") || "Classroom";
            const faviconElement = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
            if (faviconElement) {
                faviconElement.href = localStorage.getItem("faviconUrl") || "/Google_Classroom_Logo.svg.png";
            } else {
                const newLink = document.createElement("link");
                newLink.rel = "icon";
                newLink.href = localStorage.getItem("faviconUrl") || "/Google_Classroom_Logo.svg.png";
                document.head.appendChild(newLink);
            }
            window.document.documentElement.style.setProperty("--color-blue-500", localStorage.getItem("theme") || "#2b7fff")
            window.document.documentElement.style.setProperty("--color-slate-950", localStorage.getItem("bgColor") || "#0d1117")
        }
    });

    let urlBar: HTMLInputElement = $state();
    let searchbar: HTMLInputElement = $state();

    $effect(() => {
        if (view === 'home' && !proxyManager.isProxyOpen && urlBar) {
            urlBar.focus();
        }
    });

    $effect(() => {
        proxyManager.setProxyServer(proxyManager.proxyUrl);
    });

    let destinationInput = $state("");
    let view = $state("classroom"); 
    let isConfigOpen = $state(false);
    let isWarping = $state(false);

    function startProxy(url?: string) {
        const dest = url || destinationInput;
        if (proxyManager.startProxy(dest)) {
            console.log("proxy started for", dest);
        }
    }

    let iframeHasLoaded = $state(false);
    let iframe: HTMLIFrameElement = $state();

    const iframeAllow =
        "accelerometer ambient-light-sensor attribution-reporting autoplay bluetooth browsing-topics camera compute-pressure " +
        "cross-origin-isolated display-capture document-domain encrypted-media fullscreen gamepad geolocation gyroscope hid " +
        "identity-credentials-get idle-detection local-fonts magnetometer microphone midi otp-credentials payment " +
        "picture-in-picture publickey-credentials-create publickey-credentials-get screen-wake-lock serial speaker-selection " +
        "storage-access usb web-share window-management xr-spatial-tracking";

    const iframeSandbox =
        "allow-popups allow-downloads allow-forms allow-modals allow-orientation-lock " +
        "allow-pointer-lock allow-presentation allow-same-origin allow-scripts allow-storage-access-by-user-activation";

    function onIframeLoad() {
        if (iframe == undefined) return;
        try {
            const src = iframe.contentWindow.location.pathname;
            // Check if path starts with scramjet prefix
            if (proxyManager.scramjetConfig && !src.startsWith(proxyManager.scramjetConfig.prefix)) return;

            iframeHasLoaded = true;
                        
            if (searchbar) {
                searchbar.value = proxyManager.url;
            }
            destinationInput = proxyManager.url;

            if (proxyManager.controller) {
                proxyManager.url = proxyManager.controller.decodeUrl(iframe.contentWindow.location.href);
            }
        } catch(e) {
            // Ignore cross-origin errors
            iframeHasLoaded = true;
        }
    }

    let proxyHistory = new History();
    $effect(() => {
        proxyHistory.addToHistory(proxyManager.url);
    });

    function setUrl(url: string | null) {
        if (url == null) return;
        proxyManager.url = url;
        proxyManager.reloadIframe();
    }

    // Typing effect for "Welcome to..."
    let welcomeText = "verdis."; 
    let typedText = $state("v");

    $effect(() => {
        if (view === 'welcome' && typedText.length < welcomeText.length) {
            const timeout = setTimeout(() => {
                typedText = welcomeText.slice(0, typedText.length + 1);
            }, 150);
            return () => clearTimeout(timeout);
        }
    });

    function triggerWarp() {
        isWarping = true;
        setTimeout(() => {
            view = 'home';
            isWarping = false;
        }, 1500);
    }

    const shortcuts = [
        { name: "Google", url: "https://google.com", style: "bg-white text-black", logo: brandIcons.Google },
        { name: "YouTube", url: "https://www.youtube.com", style: "bg-white text-black", logo: brandIcons.YouTube },
        { name: "Spotify", url: "https://open.spotify.com", style: "bg-[#1DB954] text-white", logo: brandIcons.Spotify },
        { name: "Discord", url: "https://discord.com", style: "bg-[#5865F2] text-white", logo: brandIcons.Discord },
        { name: "ChatGPT", url: "https://chatgpt.com", style: "bg-[#10A37F] text-white", textLogo: "ChatGPT", logo: null },
        { name: "GeForce Now", url: "https://play.geforcenow.com", style: "bg-[#76B900] text-black", textLogo: "GEFORCE NOW", logo: null },
        { name: "GitHub", url: "https://github.com", style: "bg-[#181717] text-white", logo: brandIcons.GitHub },
        { name: "Twitch", url: "https://twitch.tv", style: "bg-[#9146FF] text-white", logo: brandIcons.Twitch },
        { name: "ESPN", url: "https://espn.com", style: "bg-[#CC0000] text-white", textLogo: "ESPN", logo: null },
        { name: "TikTok", url: "https://tiktok.com", style: "bg-black text-white", logo: brandIcons.TikTok },
    ];

    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }

    function getFavicon(url: string) {
        return `https://www.google.com/s2/favicons?sz=128&domain=${url}`;
    }

</script>

<!-- Only show star background when NOT in classroom view -->
{#if view !== 'classroom'}
    <div class="fixed inset-0 z-0 pointer-events-none bg-black overflow-hidden">
        <div class="star-container {isWarping ? 'warp' : ''}">
            <div class="stars"></div>
        </div>
        <!-- Blue Glow at Bottom -->
        <div class="absolute bottom-0 left-0 right-0 h-[60vh] bg-gradient-to-t from-blue-900/60 via-blue-900/20 to-transparent opacity-80 blur-3xl"></div>
    </div>
{/if}

<div class="min-h-screen text-white font-sans selection:bg-purple-500/30 overflow-hidden relative">
    <Config bind:isConfigOpen></Config>

    {#if proxyManager.isProxyOpen}
        <!-- Proxy View Container with vertical layout to not hide content -->
        <div class="fixed inset-0 z-10 flex flex-col" transition:fade={{ duration: 300 }}>
            <!-- Iframe Container -->
            <div class="flex-1 relative w-full overflow-hidden bg-white/5 backdrop-blur-sm rounded-b-2xl mx-auto border-x border-b border-white/10 shadow-2xl">
                <iframe
                    bind:this={iframe}
                    title="Proxy"
                    class="w-full h-full border-none bg-white"
                    src={proxyManager.iframeUrl}
                    onload={onIframeLoad}
                    allow={iframeAllow}
                    sandbox={iframeSandbox}
                ></iframe>
            </div>

            <!-- Dock Container (Fixed height, taking space) -->
            <div class="h-24 shrink-0 flex items-center justify-center relative">
                <!-- Floating Control Dock -->
                <div class="flex items-center gap-2 p-2 bg-zinc-900/90 backdrop-blur-xl border border-zinc-800/50 rounded-full shadow-2xl shadow-black/50 transition-all hover:scale-[1.02] hover:bg-zinc-900">
                    <div class="flex items-center gap-1 px-2 border-r border-zinc-800">
                        <button class="btn btn-ghost btn-circle btn-sm text-zinc-400 hover:text-white hover:bg-zinc-800" onclick={() => setUrl(proxyHistory.goBackward())}><ArrowLeft size={18} /></button>
                        <button class="btn btn-ghost btn-circle btn-sm text-zinc-400 hover:text-white hover:bg-zinc-800" onclick={() => setUrl(proxyHistory.goForward())}><ArrowRight size={18} /></button>
                        <button class="btn btn-ghost btn-circle btn-sm text-zinc-400 hover:text-white hover:bg-zinc-800" onclick={() => iframe.contentWindow.location.reload()}><RotateCw size={16} /></button>
                    </div>
                    <div class="relative w-64 group">
                        <input
                            type="text"
                            class="w-full h-9 pl-3 pr-10 bg-zinc-950/50 border border-zinc-800 rounded-full text-xs text-zinc-300 focus:outline-none focus:border-[#8b5cf6]/50 focus:text-white transition-all text-center group-hover:text-left"
                            value={proxyManager.url}
                            bind:this={searchbar}
                            onkeydown={onEnterKeyPressed(() => { proxyManager.setDestination(searchbar.value); proxyManager.reloadIframe(); })}
                            placeholder="Search or enter URL"
                        />
                    </div>
                    <div class="flex items-center gap-1 px-2 border-l border-zinc-800">
                        <button class="btn btn-ghost btn-circle btn-sm text-zinc-400 hover:text-white hover:bg-zinc-800" onclick={() => (isConfigOpen = true)}><Settings2 size={18} /></button>
                        <button class="btn btn-ghost btn-circle btn-sm text-red-400 hover:text-red-300 hover:bg-red-500/10" onclick={() => (proxyManager.isProxyOpen = false)}><X size={18} /></button>
                    </div>
                </div>
            </div>
        </div>

    {:else if view === 'classroom'}
        <!-- Google Classroom Clone -->
        <div class="relative z-10" transition:fade={{ duration: 300 }}>
            <Classroom enterApp={() => view = 'welcome'} />
        </div>

    {:else if view === 'games'}
        <div class="relative z-10">
            <Games bind:view />
        </div>
    {:else if view === 'home'}
        <!-- Dashboard Home -->
        <div class="relative z-10 min-h-screen flex flex-col items-center justify-center p-4" transition:fade={{ duration: 1000 }}>
            <!-- Navigation Buttons (Floating Top Right) -->
            <div class="absolute top-6 right-6 flex gap-4">
                <button class="p-2 text-zinc-400 hover:text-white transition-colors" onclick={() => view = 'games'} title="Games"><Gamepad2 /></button>
                <button class="p-2 text-zinc-400 hover:text-white transition-colors" onclick={toggleFullscreen} title="Fullscreen"><Maximize2 /></button>
                <button class="p-2 text-zinc-400 hover:text-white transition-colors" onclick={() => isConfigOpen = true} title="Settings"><Settings2 /></button>
            </div>

            <div class="w-full max-w-4xl flex flex-col gap-12 mt-[-5vh]">
                <!-- Center Search -->
                <div class="relative group w-full max-w-2xl mx-auto">
                    <div class="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                    <div class="relative flex items-center bg-black border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden h-14">
                        <div class="pl-4 text-zinc-500"><Search size={20} /></div>
                        
                        <!-- Custom Placeholder -->
                        {#if destinationInput === ""}
                            <span class="absolute left-14 text-zinc-500 text-lg pointer-events-none transition-opacity duration-200">
                                Search <span class="font-bold text-zinc-400">verdis.</span> or enter URL
                            </span>
                        {/if}

                        <input
                            type="text"
                            class="w-full h-full bg-transparent border-none text-lg px-4 text-white focus:outline-none focus:ring-0 relative z-10"
                            bind:this={urlBar}
                            bind:value={destinationInput}
                            onkeydown={onEnterKeyPressed(() => startProxy())}
                        />
                    </div>
                </div>

                <!-- Shortcuts Grid -->
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {#each shortcuts as shortcut}
                        <button 
                            class="flex items-center gap-3 p-4 bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800/50 hover:border-zinc-700 rounded-xl shadow-lg hover:scale-105 transition-all duration-200 text-left overflow-hidden group relative"
                            onclick={() => startProxy(shortcut.url)}
                        >
                            <div class="shrink-0 w-8 h-8 rounded-full bg-white/5 p-1 flex items-center justify-center">
                                <img src={getFavicon(shortcut.url)} alt={shortcut.name} class="w-full h-full object-contain rounded-sm" />
                            </div>
                            <span class="font-bold text-sm truncate w-full text-zinc-300 group-hover:text-white transition-colors">{shortcut.name}</span>
                        </button>
                    {/each}
                </div>
            </div>
        </div>

    {:else}
        <!-- Welcome Screen -->
        <div class="relative z-10 min-h-screen flex flex-col items-center justify-center text-center p-4">
            {#if !isWarping}
                <div class="flex flex-col items-center justify-center" transition:fade={{ duration: 500 }}>
                    <h1 class="text-6xl md:text-7xl font-bold mb-4 tracking-tight">
                        Welcome to <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-glow">{typedText}</span><span class="animate-pulse text-blue-400">|</span>
                    </h1>
                    <p class="text-zinc-400 text-xl mb-12 font-light">Start your unblocking journey today!</p>
                    
                    <button 
                        class="glass-button px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 flex items-center gap-2 group"
                        onclick={triggerWarp}
                    >
                        Get Started
                        <span class="group-hover:translate-x-1 transition-transform">✨</span>
                    </button>
                </div>
            {/if}
        </div>
    {/if}
</div>

<style>
    /* Liquid Glass Button */
    .glass-button {
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        position: relative;
        overflow: hidden;
    }

    .glass-button:hover {
        background: linear-gradient(to right, #2563eb, #9333ea);
        border-color: transparent;
        box-shadow: 0 0 20px rgba(37, 99, 235, 0.5);
        transform: scale(1.05);
    }

    .text-glow {
        text-shadow: 0 0 20px rgba(139, 92, 246, 0.5), 0 0 40px rgba(59, 130, 246, 0.3);
    }

    /* Optimized Star Animation */
    .star-container {
        position: absolute;
        width: 100%;
        height: 100%;
        perspective: 1000px;
        transform-style: preserve-3d;
    }

    .stars {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 300%; 
        background-image: 
            radial-gradient(1px 1px at 10% 10%, #fff, rgba(0,0,0,0)),
            radial-gradient(1.5px 1.5px at 20% 30%, #fff, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 30% 70%, #fff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 40% 40%, #fff, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 50% 90%, #fff, rgba(0,0,0,0)),
            radial-gradient(1.5px 1.5px at 60% 20%, #fff, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 70% 50%, #fff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 80% 80%, #fff, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 90% 10%, #fff, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 15% 15%, #fff, rgba(0,0,0,0)),
            radial-gradient(1.5px 1.5px at 25% 35%, #fff, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 35% 75%, #fff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 45% 45%, #fff, rgba(0,0,0,0));
        background-size: 550px 550px;
        background-repeat: repeat;
        animation: star-scroll 60s linear infinite;
        opacity: 0.7;
        transition: transform 2s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease;
    }

    .star-container.warp .stars {
        animation-duration: 0.2s; 
        transform: scaleY(20); 
        opacity: 0.5; 
        filter: blur(1px);
    }
    
    @keyframes star-scroll {
        from { transform: translateY(0); }
        to { transform: translateY(-33.33%); }
    }
</style>