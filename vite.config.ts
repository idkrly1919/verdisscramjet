import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import { viteStaticCopy } from "vite-plugin-static-copy";
import { bareModulePath } from "@mercuryworkshop/bare-as-module3";
import { libcurlPath } from "@mercuryworkshop/libcurl-transport";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node";
import AdmZip from "adm-zip";
import fs from "fs";
import path from "path";

function unzipScramjetPlugin() {
    return {
        name: 'unzip-scramjet',
        buildStart() {
            const zipPath = path.resolve(__dirname, 'scramjet-main.zip');
            if (fs.existsSync(zipPath)) {
                console.log('Extracting scramjet-main.zip...');
                const zip = new AdmZip(zipPath);
                const zipEntries = zip.getEntries();
                
                // Extract to public/scramjet
                // We assume the zip might have a root folder (scramjet-main/), we need to flatten it or handle it.
                // For safety, we'll extract specifically the files we need or just dump it if it's the right structure.
                
                // Let's try to find the 'scramjet' folder inside or if the root is the content.
                // Strategy: Extract everything to public/temp and move or just extract to public/scramjet if structure matches.
                // Simplest: Extract all to public/ and let the user structure dictate.
                
                zip.extractAllTo(path.resolve(__dirname, 'public'), true);
                
                // If the zip contained a top level folder "scramjet-main", we might want to rename it or move contents.
                // But for now, we assume the zip contains the 'scramjet' folder or the necessary files.
                // If the user provided a repo zip, it likely has "scramjet-main" as root.
                
                const extractedRoot = path.resolve(__dirname, 'public/scramjet-main');
                const targetDir = path.resolve(__dirname, 'public/scramjet');

                if (fs.existsSync(extractedRoot)) {
                    // Move contents of scramjet-main to scramjet
                    if (fs.existsSync(targetDir)) {
                        fs.rmSync(targetDir, { recursive: true, force: true });
                    }
                    fs.renameSync(extractedRoot, targetDir);
                }
                
                console.log('Scramjet backend extracted.');
            }
        }
    }
}

// https://vite.dev/config/
export default defineConfig({
    base: "",
    plugins: [
        svelte(),
        tailwindcss(),
        unzipScramjetPlugin(),
        viteStaticCopy({
            targets: [
                // Scramjet copy removed - using zip content
                {
                    src: bareModulePath + "/*.*js",
                    dest: "baremod",
                },
                {
                    src: libcurlPath + "/*.*js",
                    dest: "libcurl",
                },
                {
                    src: baremuxPath + "/*.*js",
                    dest: "baremux",
                },
            ]
        }),
    ],
})