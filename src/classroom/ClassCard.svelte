<script lang="ts">
    import { MoreVertical, Folder, FileBadge } from '@lucide/svelte';

    export let title: string;
    export let section: string;
    export let teacher: string;
    export let bgImage: string;
    export let avatar: string;
</script>

<div class="flex flex-col bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-72 w-72 relative group">
    <!-- Header Image Area -->
    <div class="h-24 bg-cover bg-center p-4 relative" style="background-image: url('{bgImage}')">
        <div class="flex justify-between items-start text-white">
            <div class="hover:underline">
                <h2 class="text-xl font-medium leading-tight">{title}</h2>
                <p class="text-xs hover:underline">{section}</p>
            </div>
            <button class="p-1 rounded-full hover:bg-white/20 transition-colors">
                <MoreVertical size={20} />
            </button>
        </div>
        <div class="absolute bottom-2 left-4 text-white text-xs hover:underline">
            {teacher}
        </div>
        <!-- Teacher Avatar -->
        <div class="absolute -bottom-8 right-4 h-16 w-16 rounded-full overflow-hidden border-2 border-transparent">
            <!-- svelte-ignore a11y_img_redundant_alt -->
            <img src={avatar} alt="Teacher Avatar" class="h-full w-full object-cover" />
        </div>
    </div>

    <!-- Body -->
    <div class="flex-grow pt-10 px-4 pb-2">
        <div class="h-full text-xs text-gray-500 space-y-2">
            <!-- Placeholder for assignments or description if needed -->
        </div>
    </div>

    <!-- Footer -->
    <div class="h-12 border-t border-gray-200 flex justify-end items-center px-2">
        <button class="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors" title="Open gradebook">
            <FileBadge size={20} />
        </button>
        <button class="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors" title="Open folder">
            <Folder size={20} />
        </button>
    </div>
</div>