<script lang="ts">
    import { Home, Calendar, ClipboardList, Archive, Settings } from '@lucide/svelte';
</script>

<aside class="w-72 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 overflow-y-auto py-2 fixed top-16 left-0 hidden md:block">
    <div class="space-y-1">
        <div class="px-6 py-3 flex items-center gap-4 bg-blue-50 text-blue-700 rounded-r-full mr-2 cursor-pointer font-medium text-sm">
            <Home size={22} />
            <span>Home</span>
        </div>
        <div class="px-6 py-3 flex items-center gap-4 text-gray-600 hover:bg-gray-100 rounded-r-full mr-2 cursor-pointer font-medium text-sm transition-colors">
            <Calendar size={22} />
            <span>Calendar</span>
        </div>
    </div>

    <div class="border-t border-gray-200 my-2"></div>

    <div class="px-6 py-3 flex items-center gap-4 text-gray-600 hover:bg-gray-100 rounded-r-full mr-2 cursor-pointer font-medium text-sm transition-colors group">
        <div class="flex items-center gap-4 flex-1">
            <svg class="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l-5.5 9h11z"/><path d="M2 12l5.5 9h9z" fill="none"/></svg> 
            <span class="group-hover:text-black">Enrolled</span>
        </div>
    </div>
    
    <div class="space-y-1">
        <div class="px-6 py-3 flex items-center gap-4 text-gray-600 hover:bg-gray-100 rounded-r-full mr-2 cursor-pointer font-medium text-sm transition-colors">
            <ClipboardList size={22} />
            <span>To-do</span>
        </div>
        <div class="px-6 py-3 flex items-center gap-4 text-gray-600 hover:bg-gray-100 rounded-r-full mr-2 cursor-pointer font-medium text-sm transition-colors">
            <div class="w-8 h-8 rounded-full bg-green-700 text-white flex items-center justify-center text-xs font-bold">V</div>
            <div class="flex flex-col truncate">
                <span class="truncate font-medium text-gray-700">verdis.</span>
                <span class="text-xs text-gray-500 font-normal">MathX</span>
            </div>
        </div>
    </div>

    <div class="border-t border-gray-200 my-2"></div>

    <div class="space-y-1">
        <div class="px-6 py-3 flex items-center gap-4 text-gray-600 hover:bg-gray-100 rounded-r-full mr-2 cursor-pointer font-medium text-sm transition-colors">
            <Archive size={22} />
            <span>Archived classes</span>
        </div>
        <div class="px-6 py-3 flex items-center gap-4 text-gray-600 hover:bg-gray-100 rounded-r-full mr-2 cursor-pointer font-medium text-sm transition-colors">
            <Settings size={22} />
            <span>Settings</span>
        </div>
    </div>
</aside>