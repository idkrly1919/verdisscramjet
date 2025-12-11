<script lang="ts">
    import { Menu, Plus, Grip } from '@lucide/svelte';

    let { onVerdisClick }: { onVerdisClick: () => void } = $props();
</script>

<nav class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 fixed top-0 w-full z-50">
    <div class="flex items-center gap-4">
        <button class="p-3 rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
            <Menu size={24} />
        </button>
        <div class="flex items-center gap-2 text-gray-600 hover:text-green-700 cursor-pointer">
            <div class="w-8 h-8 flex items-center justify-center">
                <img src="/Google_Classroom_Logo.svg.png" alt="Logo" class="w-full h-full object-contain" />
            </div>
            <span class="text-xl font-medium text-gray-600 hover:underline">Classroom</span>
        </div>
    </div>

    <div class="flex items-center gap-2">
        <button class="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
            <Plus size={24} />
        </button>
        <button class="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
            <Grip size={24} />
        </button>
        <button class="p-1 ml-1 rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
            <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
                A
            </div>
        </button>
    </div>
</nav>