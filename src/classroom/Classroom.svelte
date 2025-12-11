<script lang="ts">
    import Navbar from './Navbar.svelte';
    import Sidebar from './Sidebar.svelte';
    import ClassCard from './ClassCard.svelte';

    let { enterApp }: { enterApp: () => void } = $props();

    const classes = [
        {
            title: "verdis.",
            section: "MathX",
            teacher: "idkrly1919"
        }
    ];
</script>

<div class="min-h-screen bg-white text-gray-900 font-sans">
    <Navbar onVerdisClick={() => {}} />
    <Sidebar />
    
    <main class="pt-20 px-4 md:pl-80 md:pr-8 pb-8">
        <div class="flex flex-wrap gap-6 justify-center sm:justify-start">
            {#each classes as cls}
                <ClassCard {...cls} onClick={enterApp} />
            {/each}
        </div>
    </main>
</div>