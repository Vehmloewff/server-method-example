import { build, $ } from 'bun'

await build({
	entrypoints: ['./client.ts'],
	target: 'browser',
	outdir: './dist',
})

await $`rollup dist/client.js -o dist/client.js`
