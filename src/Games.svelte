<script lang="ts">
    import proxyManager from "./proxy.svelte";
    import { Home } from "@lucide/svelte";

    let { view = $bindable() }: { view: string } = $props();

    const games = [
        { name: '1v1.lol', url: 'https://1v1.lol', imageUrl: 'https://img.poki.com/cdn-cgi/image/quality=78,width=314,height=314,fit=cover,f=auto/1a822d85-316b-488c-b306-135a43498343.png' },
        { name: 'Vex 7', url: 'https://www.crazygames.com/game/vex-7', imageUrl: 'https://images.crazygames.com/games/vex-7/cover-1664528612222.png?auto=format,compress&q=75&cs=strip&ch=DPR&w=236&h=133&fit=crop' },
        { name: 'Vex 6', url: 'https://www.crazygames.com/game/vex-6', imageUrl: 'https://images.crazygames.com/games/vex-6/cover-1635241592133.png?auto=format,compress&q=75&cs=strip&ch=DPR&w=236&h=133&fit=crop' },
        { name: 'Slope', url: 'https://slopegame.io/', imageUrl: 'https://slopegame.io/images/slope-game-logo.png' },
        { name: 'Run 3', url: 'https://www.coolmathgames.com/0-run-3', imageUrl: 'https://www.coolmathgames.com/sites/default/files/styles/mobile_game_image/public/run-3-thumb-new.jpg' },
        { name: 'Retro Bowl', url: 'https://retrobowl.me/', imageUrl: 'https://assets.poki.com/images/g/436/01655211-f299-470f-a232-23586f2e134a_170x120.jpg' },
        { name: 'Minecraft Classic', url: 'https://classic.minecraft.net/', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png' },
        { name: 'Moto X3M', url: 'https://www.motox3m.co/', imageUrl: 'https://assets.poki.com/images/g/285/522f2528-3931-442a-8a01-d64f6f3d85c3_170x120.jpg' },
        { name: 'Madalin Stunt Cars 2', url: 'https://www.crazygames.com/game/madalin-stunt-cars-2', imageUrl: 'https://images.crazygames.com/games/madalin-stunt-cars-2/cover-1584373339730.png?auto=format,compress&q=75&cs=strip&ch=DPR&w=236&h=133&fit=crop' },
        { name: 'Jetpack Joyride', url: 'https://www.crazygames.com/game/jetpack-joyride', imageUrl: 'https://images.crazygames.com/games/jetpack-joyride/cover-1679048233023.png?auto=format,compress&q=75&cs=strip&ch=DPR&w=236&h=133&fit=crop' },
        { name: 'Geometry Dash', url: 'https://gd.games/instant-play/geometry-dash-scratch', imageUrl: 'https://images.crazygames.com/games/geometry-dash/cover-1692353325490.png?auto=format,compress&q=75&cs=strip&ch=DPR&w=236&h=133&fit=crop' },
        { name: 'FNAF 1', url: 'https://scratch.mit.edu/projects/63734928/fullscreen/', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/Five_Nights_at_Freddy%27s_cover_art.jpg/220px-Five_Nights_at_Freddy%27s_cover_art.jpg' },
        { name: 'Drift Hunters', url: 'https://www.crazygames.com/game/drift-hunters', imageUrl: 'https://images.crazygames.com/games/drift-hunters/cover-1653571693282.png?auto=format,compress&q=75&cs=strip&ch=DPR&w=236&h=133&fit=crop' },
        { name: 'Cookie Clicker', url: 'https://orteil.dashnet.org/cookieclicker/', imageUrl: 'https://orteil.dashnet.org/cookieclicker/img/icon.png' },
        { name: 'Bitlife', url: 'https://www.agame.com/game/bitlife-life-simulator', imageUrl: 'https://img.poki.com/cdn-cgi/image/quality=78,width=314,height=314,fit=cover,f=auto/1273532a-683c-4078-90a3-e42429021eda.png' },
        { name: 'Basketball Stars', url: 'https://www.crazygames.com/game/basketball-stars', imageUrl: 'https://images.crazygames.com/games/basketball-stars/cover-1583231502523.png?auto=format,compress&q=75&cs=strip&ch=DPR&w=236&h=133&fit=crop' },
    ];

    function playGame(url: string) {
        proxyManager.startProxy(url);
    }
</script>

<div class="p-8 text-white bg-slate-950 min-h-screen">
    <div class="flex justify-between items-center mb-8">
        <h1 class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-300">Games</h1>
        <button class="btn btn-ghost btn-circle" onclick={() => view = 'home'} title="Go Home">
            <Home />
        </button>
    </div>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {#each games as game}
            <div class="card bg-zinc-900 shadow-xl cursor-pointer transform hover:scale-105 transition-transform duration-300" onclick={() => playGame(game.url)}>
                <figure><img src={game.imageUrl} alt={game.name} class="h-32 w-full object-cover" /></figure>
                <div class="card-body p-4 items-center text-center">
                    <h2 class="card-title text-sm">{game.name}</h2>
                </div>
            </div>
        {/each}
    </div>
</div>