import { defineConfig } from 'vite'
import path from 'path'
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
    ],
    resolve: {
        alias: {
            // 'woby-three/jsx-dev-runtime': process.argv.includes('dev') ? path.resolve('../woby-three/src/jsx/runtime') : 'woby-three/jsx-dev-runtime',
            // 'woby-three/jsx-runtime': process.argv.includes('dev') ? path.resolve('../woby-three/src/jsx/runtime') : 'woby-three/jsx-runtime',
            // 'woby/jsx-runtime': process.argv.includes('dev') ? path.resolve('../woby/src/jsx/runtime') : 'woby/jsx-runtime',

             // 'woby-three/jsx-dev-runtime': process.argv.includes('dev') ? path.resolve('../woby-three/src/jsx-runtime/jsx-runtime') : 'woby-three/jsx-dev-runtime',
            // 'woby-three/jsx-runtime': process.argv.includes('dev') ? path.resolve('../woby-three/dist/jsx-runtime/jsx-runtime') : 'woby-three/jsx-runtime',
            // 'woby-three/jsx-runtime': process.argv.includes('dev') ? path.resolve('../woby-three/src/jsx/runtime'): 'woby-three/jsx-runtime',
            'woby-three/jsx-runtime': path.resolve('../woby-three/src/jsx/runtime'),
            'woby-three/jsx-dev-runtime': path.resolve('../woby-three/src/jsx/runtime'),
            // 'woby/jsx-runtime': path.resolve('../woby/src/jsx/runtime'),
            // 'woby-three/dist/types/jsx-runtime/jsx-runtime': 'woby-three/dist/types/jsx-runtime/jsx-dev-runtime',
            'woby/jsx-runtime':/*  process.argv.includes('dev') ? */ path.resolve('../woby/src/jsx/runtime'), // : 'woby/jsx-runtime',
            'woby/jsx-dev-runtime':/*  process.argv.includes('dev') ? */ path.resolve('../woby/src/jsx/runtime'), // : 'woby/jsx-runtime',
            // 'woby': process.argv.includes('dev') ? path.resolve('../woby/src/index') : 'woby/jsx-runtime',
            'woby': path.resolve('../woby/src/index'),
        },
    },
})



export default config
