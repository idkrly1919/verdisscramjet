<script lang="ts">
    import { MoreVertical, Folder, FileBadge } from '@lucide/svelte';

    export let title: string;
    export let section: string;
    export let teacher: string;
    export let onClick: () => void;
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div 
    class="flex flex-col bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer w-[300px] h-[280px] relative group"
    onclick={onClick}
>
    <!-- Header -->
    <div class="h-28 bg-[#1E8E3E] p-4 relative">
        <div class="flex justify-between items-start text-white">
            <div class="flex flex-col max-w-[80%]">
                <h2 class="text-2xl font-medium leading-tight hover:underline truncate">{title}</h2>
                <p class="text-sm hover:underline mt-1">{section}</p>
            </div>
            <button class="p-1 rounded-full hover:bg-white/20 transition-colors -mt-1 -mr-1">
                <MoreVertical size={20} />
            </button>
        </div>
        <div class="absolute bottom-3 left-4 text-white/90 text-xs hover:underline z-10">
            <!-- Prevent bubble from capturing click -->
            <a href="https://github.com/idkrly1919" target="_blank" onclick={(e) => e.stopPropagation()} class="hover:text-white">
                {teacher}
            </a>
        </div>
        
        <!-- Teacher Icon Bubble -->
        <div class="absolute right-4 -bottom-10">
             <img src="/Google_Classroom_Logo.svg.png" alt="Class Icon" class="w-20 h-20 rounded-full border border-gray-200 bg-white object-cover" />
        </div>
    </div>

    <!-- Body (Empty space mostly) -->
    <div class="flex-grow bg-white">
    </div>

    <!-- Footer -->
    <div class="h-14 border-t border-gray-200 flex justify-end items-center px-4 gap-2 bg-white">
        <button class="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors" title="Open gradebook" onclick={(e) => e.stopPropagation()}>
            <FileBadge size={22} />
        </button>
        <button class="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors" title="Open folder" onclick={(e) => e.stopPropagation()}>
            <Folder size={22} />
        </button>
    </div>
</div>