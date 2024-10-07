import { defineConfig } from 'vite'
import path from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import tsconfigPaths from 'vite-tsconfig-paths'

// import dts from 'vite-plugin-dts'

const config = defineConfig({
    build: {
        minify: false,
        lib: {
            entry: ["./index.html"],
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
        tsconfigPaths(),
        viteStaticCopy({
            targets: [
                {
                    src: './public/textures',
                    dest: './'
                }
            ]
        })
    ],
    resolve: {
        alias: {
            // 'woby-three/jsx-dev-runtime': process.argv.includes('dev') ? path.resolve('../woby-three/src/jsx-runtime/jsx-runtime') : 'woby-three/jsx-dev-runtime',
            // 'woby-three/jsx-runtime': process.argv.includes('dev') ? path.resolve('../woby-three/code/lib/jsx/runtime') : 'woby-three/jsx-runtime',

            // 'woby-three/jsx-runtime': process.argv.includes('dev') ? path.resolve('../woby-three/src/jsx/runtime'): 'woby-three/jsx-runtime',
            'woby-three/jsx-runtime': path.resolve('../woby-three/code/lib/jsx/runtime'),
            'woby-three/jsx-dev-runtime': path.resolve('../woby-three/code/lib/jsx/runtime'),
            'woby-three/src': path.resolve('../woby-three/code/src'),
            'woby-three/lib': path.resolve('../woby-three/code/lib'),
            'woby-three/examples/jsm': path.resolve('../woby-three/code/examples/jsm'),
            // 'woby/jsx-runtime': path.resolve('../woby/src/jsx/runtime'),
            // 'woby-three/dist/types/jsx-runtime/jsx-runtime': 'woby-three/dist/types/jsx-runtime/jsx-dev-runtime',
            // 'woby/jsx-runtime':/*  process.argv.includes('dev') ? */ path.resolve('../woby/src/jsx/runtime'), // : 'woby/jsx-runtime',
            'woby/jsx-runtime':/*  process.argv.includes('dev') ? */ path.resolve('../woby/src/jsx/runtime'), // : 'woby/jsx-runtime',
            'woby/jsx-dev-runtime':/*  process.argv.includes('dev') ? */ path.resolve('../woby/src/jsx/runtime'), // : 'woby/jsx-runtime',
            'woby': path.resolve('../woby/src/index'),

            // 'woby': process.argv.includes('dev') ? path.resolve('../woby/src/index') : 'woby/jsx-runtime',
            // 'woby': path.resolve('../woby/src/index'),
            // 'oby': path.resolve('../oby/src'),
            // 'oby/~/methods': path.resolve('../oby/src/methods'),
            // 'three/addons': 'three/examples/jsm',
            // 'three/tsl': 'three/webgpu',
            // 'three': 'three/webgpu',
        },
    },
})


export default config
