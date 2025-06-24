import { callServerMethod, GenericContext, startRecording, stopRecordingAndDumpHtml } from '@vehmloewff/server-method'
import { file, serve } from 'bun'
import { renderMessage } from './app'

const server = serve({
	port: 8000,
	routes: {
		'/': {
			GET: async () => {
				const ctx = new GenericContext()
				startRecording(ctx)
				const mainText = await renderMessage(ctx, () => {})
				const recordingHtml = stopRecordingAndDumpHtml(ctx)

				const html = `<html><head>${recordingHtml}<script defer src="/client.js"></script></head><body>${mainText}</body></html>`

				return new Response(html, {
					headers: { 'Content-Type': 'text/html' },
				})
			},
		},
		'/client.js': {
			GET: async () => new Response(file('./dist/client.js'), { headers: { 'Content-Type': 'application/javascript' } }),
		},
		'/method/:id': {
			POST: async request => {
				return Response.json({
					data: await callServerMethod(request.params.id, new GenericContext(), (await request.json()).data),
				})
			},
		},
	},
})

console.log(`Listening at http://${server.hostname}:${server.port}`)
