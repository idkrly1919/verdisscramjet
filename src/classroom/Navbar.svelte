<script lang="ts">
    import { Menu, Plus, Grip, User } from '@lucide/svelte';

    let { onVerdisClick }: { onVerdisClick: () => void } = $props();
</script>

<nav class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 fixed top-0 w-full z-50">
    <div class="flex items-center gap-4">
        <button class="p-3 rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
            <Menu size={24} />
        </button>
        <div class="flex items-center gap-2">
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div 
                class="flex items-center gap-1 text-gray-600 hover:text-green-600 hover:underline cursor-pointer transition-colors"
                onclick={onVerdisClick}
            >
                <div class="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-white font-bold text-xl overflow-hidden relative">
                    <img src="/Google_Classroom_Logo.svg.png" alt="Logo" class="w-full h-full object-cover p-1.5" />
                </div>
                <span class="text-xl font-medium ml-1">verdis.</span>
            </div>
        </div>
    </div>

    <div class="flex items-center gap-2">
        <a href="https://github.com/tenclips" target="_blank" class="text-sm font-medium text-gray-600 hover:underline hover:text-blue-600 mr-2">
            idkrly1919
        </a>
        <button class="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
            <Plus size={24} />
        </button>
        <button class="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
            <Grip size={24} />
        </button>
        <button class="p-1 ml-1 rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
            <div class="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-medium">
                V
            </div>
        </button>
    </div>
</nav>