<script lang="ts">
    import { Home, Calendar, BookOpen, GraduationCap, Archive, Settings } from '@lucide/svelte';
</script>

<aside class="w-72 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 overflow-y-auto py-2 fixed top-16 left-0 hidden md:block">
    <div class="space-y-1">
        <div class="px-4 py-3 flex items-center gap-4 bg-blue-50 text-blue-700 rounded-r-full mr-2 cursor-pointer font-medium text-sm">
            <Home size={20} />
            <span>Classes</span>
        </div>
        <div class="px-4 py-3 flex items-center gap-4 text-gray-600 hover:bg-gray-100 rounded-r-full mr-2 cursor-pointer font-medium text-sm transition-colors">
            <Calendar size={20} />
            <span>Calendar</span>
        </div>
    </div>

    <div class="border-t border-gray-200 my-2"></div>

    <div class="px-4 py-2 text-xs font-medium text-gray-500">Enrolled</div>
    <div class="space-y-1">
        <div class="px-4 py-3 flex items-center gap-4 text-gray-600 hover:bg-gray-100 rounded-r-full mr-2 cursor-pointer font-medium text-sm transition-colors">
            <BookOpen size={20} />
            <span>To-do</span>
        </div>
        <div class="px-4 py-3 flex items-center gap-4 text-gray-600 hover:bg-gray-100 rounded-r-full mr-2 cursor-pointer font-medium text-sm transition-colors">
            <div class="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px]">P</div>
            <div class="flex flex-col truncate">
                <span class="truncate">Period 1 - AP Physics C</span>
                <span class="text-xs text-gray-500 font-normal">Mr. Newton</span>
            </div>
        </div>
        <div class="px-4 py-3 flex items-center gap-4 text-gray-600 hover:bg-gray-100 rounded-r-full mr-2 cursor-pointer font-medium text-sm transition-colors">
            <div class="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">C</div>
            <div class="flex flex-col truncate">
                <span class="truncate">Period 2 - AP Calculus BC</span>
                <span class="text-xs text-gray-500 font-normal">Mrs. Leibniz</span>
            </div>
        </div>
        <div class="px-4 py-3 flex items-center gap-4 text-gray-600 hover:bg-gray-100 rounded-r-full mr-2 cursor-pointer font-medium text-sm transition-colors">
            <div class="w-5 h-5 rounded-full bg-green-600 text-white flex items-center justify-center text-[10px]">L</div>
            <div class="flex flex-col truncate">
                <span class="truncate">Period 3 - AP Lit</span>
                <span class="text-xs text-gray-500 font-normal">Mr. Shakespeare</span>
            </div>
        </div>
    </div>

    <div class="border-t border-gray-200 my-2"></div>

    <div class="space-y-1">
        <div class="px-4 py-3 flex items-center gap-4 text-gray-600 hover:bg-gray-100 rounded-r-full mr-2 cursor-pointer font-medium text-sm transition-colors">
            <Archive size={20} />
            <span>Archived classes</span>
        </div>
        <div class="px-4 py-3 flex items-center gap-4 text-gray-600 hover:bg-gray-100 rounded-r-full mr-2 cursor-pointer font-medium text-sm transition-colors">
            <Settings size={20} />
            <span>Settings</span>
        </div>
    </div>
</aside>