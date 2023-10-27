import { defineConfig } from 'vite'
import path from 'path'
import dts from 'vite-plugin-dts'

const config = defineConfig({
    build: {
        minify: false,
        lib: {
            entry: ["./index.html"],
            name: "test",
            formats: ['es', 'cjs', 'umd'],
            fileName: (format: string, entryName: string) => `${entryName}.${format}.js`
        },
        sourcemap: true,
    },
    esbuild: {
        jsx: 'automatic',
    },
    plugins: [
        dts({ entryRoot: './src', outputDir: './dist/types', exclude: './nodes_modules' })
    ],
    resolve: {
        alias: {
            'voby-three/jsx-dev-runtime': process.argv.includes('dev') ? path.resolve('../voby-three/src/jsx-runtime/jsx-runtime') : 'voby-three/jsx-dev-runtime',
            'voby-three/jsx-runtime': process.argv.includes('dev') ? path.resolve('../voby-three/src/jsx-runtime/jsx-runtime') : 'voby-three/jsx-runtime',
        },
    },
})



export default config
