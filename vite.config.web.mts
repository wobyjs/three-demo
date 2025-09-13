import { defineConfig } from 'vite'
import path from 'path'
// import dts from 'vite-plugin-dts'
import tailwindcss from '@tailwindcss/vite'

const config = defineConfig({
    build: {
        minify: false,
        lib: {
            entry: ["./index.html", './css3d.html', './css3d_webgl.html', './gltf_anisotropy.html'],
            name: "test",
            formats: ['es'],
            fileName: (format: string, entryName: string) => `${entryName}.${format}.js`
        },

        sourcemap: true,
    },
    esbuild: {
        jsx: 'automatic',
    },
    plugins: [
        // dts({ entryRoot: './src', outputDir: './dist/types', exclude: './nodes_modules' })
        tailwindcss(),
    ],
    resolve: {
        alias: {
            // '@woby/three/jsx-dev-runtime': process.argv.includes('dev') ? path.resolve('../three/src/jsx/runtime') : '@woby/three',
            // '@woby/three/jsx-runtime': process.argv.includes('dev') ? path.resolve('../three/src/jsx/runtime') : '@woby/three',
            // 'woby/jsx-runtime': process.argv.includes('dev') ? path.resolve('../woby/src/jsx/runtime') : 'woby',

            // '@woby/three/jsx-dev-runtime': process.argv.includes('dev') ? path.resolve('../three/src/jsx-runtime/jsx-runtime') : '@woby/three',
            // '@woby/three/jsx-runtime': process.argv.includes('dev') ? path.resolve('../three/dist/jsx-runtime/jsx-runtime') : '@woby/three',
            // '@woby/three/jsx-runtime': process.argv.includes('dev') ? path.resolve('../three/src/jsx/runtime'): '@woby/three',
            '@woby/three/jsx-runtime': path.resolve('../three/code/lib/jsx/runtime'),
            '@woby/three/jsx-dev-runtime': path.resolve('../three/code/lib/jsx/runtime'),
            '@woby/three/src': path.resolve('../three/code/src'),
            '@woby/three/lib': path.resolve('../three/code/lib'),
            '@woby/three/examples/jsm': path.resolve('../three/code/examples/jsm'),
            // 'woby/jsx-runtime': path.resolve('../woby/src/jsx/runtime'),
            // '@woby/three/dist/types/jsx-runtime/jsx-runtime': '@woby/three/dist/types/jsx-runtime',
            'woby/jsx-runtime': process.argv.includes('dev') ? path.resolve('../woby/src/jsx/runtime') : 'woby',
            'woby/jsx-dev-runtime': process.argv.includes('dev') ? path.resolve('../woby/src/jsx/runtime') : 'woby',
            'woby': process.argv.includes('dev') ? path.resolve('../woby/src/index') : 'woby',
            // 'woby': path.resolve('../woby/src/index'),
            // 'three/addons': 'three/examples/jsm',
            // 'three/tsl': 'three/webgpu',
            // 'three': 'three/webgpu',
        },
    },
})



export default config
