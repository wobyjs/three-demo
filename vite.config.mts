import { defineConfig } from 'vite'
import path from 'path'
// import dts from 'vite-plugin-dts'

const config = defineConfig({
    build: {
        minify: false,
        lib: {
            entry: ["./index.html"],
            name: "test",
            formats: [/* 'cjs',  */'es'/* , 'umd' */],
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
            'woby-three/jsx-dev-runtime': process.argv.includes('dev') ? path.resolve('../woby-three/src/jsx-runtime/jsx-runtime') : 'woby-three/dist/types/jsx-runtime/jsx-dev-runtime.d.ts',
            'woby-three/jsx-runtime': process.argv.includes('dev') ? path.resolve('../woby-three/src/jsx-runtime/jsx-runtime') : 'woby-three/dist/types/jsx-runtime/jsx-runtime.d.ts',
            'woby/jsx-runtime': process.argv.includes('dev') ? path.resolve('../woby/src/jsx/runtime') : 'woby',
            'woby/jsx-dev-runtime': process.argv.includes('dev') ? path.resolve('../woby/src/jsx/runtime') : 'woby',

        },
    },
})



export default config
