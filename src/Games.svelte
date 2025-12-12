<script lang="ts">
    import proxyManager from "./proxy.svelte";
    import { Home, Search, Play } from "@lucide/svelte";
    import { games, type Game } from "./gamesData";

    let { view = $bindable() }: { view: string } = $props();
    let searchQuery = $state("");
    
    let filteredGames = $derived.by(() => {
        if (!searchQuery) return games;
        const lowerCaseQuery = searchQuery.toLowerCase();
        return games.filter(game => 
            game.name.toLowerCase().includes(lowerCaseQuery)
        );
    });

    function handleGameClick(game: Game) {
        // Cloaking logic
        document.title = "Classroom";
        const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
        if (link) {
            link.href = "/Google_Classroom_Logo.svg.png";
        } else {
            const newLink = document.createElement("link");
            newLink.rel = "icon";
            newLink.href = "/Google_Classroom_Logo.svg.png";
            document.head.appendChild(newLink);
        }

        // Direct launch via external proxy
        proxyManager.iframeUrl = `https://google-i39l.onrender.com/share/scramjet/${game.url}`;
        proxyManager.isProxyOpen = true;
    }
</script>

<div class="p-8 text-white bg-slate-950 min-h-screen relative font-sans">
    <!-- Header -->
    <div class="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
        <div class="flex flex-col">
            <h1 class="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-gradient bg-300% tracking-tight">Games</h1>
            <p class="text-zinc-400 mt-1 font-medium">Browse and play your favorite titles</p>
        </div>
        
        <div class="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <div class="relative w-full sm:w-64 group">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search class="h-4 w-4 text-zinc-500 group-focus-within:text-blue-400 transition-colors" />
                </div>
                <input 
                    type="text" 
                    placeholder="Search..." 
                    class="input w-full pl-10 bg-zinc-900/50 border-zinc-800 text-white placeholder-zinc-500 focus:bg-zinc-900 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 rounded-xl transition-all h-10 text-sm"
                    bind:value={searchQuery}
                />
            </div>
            
            <button class="btn btn-circle btn-sm bg-zinc-800 hover:bg-zinc-700 border-none text-zinc-400 hover:text-white transition-all" onclick={() => view = 'home'} title="Go Home">
                <Home size={18} />
            </button>
        </div>
    </div>

    <!-- Games Grid -->
    <div>
        {#if filteredGames.length === 0}
            <div class="flex flex-col items-center justify-center text-zinc-500 mt-20 gap-4">
                <Search size={48} class="opacity-20" />
                <p>No games found matching "{searchQuery}"</p>
            </div>
        {:else}
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {#each filteredGames as game}
                    <button class="group relative flex flex-col bg-zinc-900 hover:bg-zinc-800 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20 text-left" onclick={() => handleGameClick(game)}>
                        <div class="relative aspect-[4/3] overflow-hidden w-full">
                            <img src={game.imageUrl} alt={game.name} class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                            
                            <!-- Play Icon Overlay -->
                            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div class="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transform scale-50 group-hover:scale-100 transition-transform duration-300">
                                    <Play size={20} fill="currentColor" />
                                </div>
                            </div>
                        </div>
                        <div class="p-4">
                            <h3 class="font-bold text-zinc-100 text-sm leading-tight line-clamp-1 group-hover:text-blue-400 transition-colors">{game.name}</h3>
                            <p class="text-xs text-zinc-500 mt-1">Click to play</p>
                        </div>
                    </button>
                {/each}
            </div>
        {/if}
    </div>
</div>

<style>
    .bg-300\% {
        background-size: 300% 300%;
    }
    
    @keyframes gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    
    .animate-gradient {
        animation: gradient 8s ease infinite;
    }
</style>