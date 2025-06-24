import { GenericContext, setServerMethodBrowserHandler, startBrowserReplay, stopBrowserReplay } from '@vehmloewff/server_method'
import { renderMessage } from './do_something'

setServerMethodBrowserHandler(async (_, id, input) => {
	const response = await fetch(`/method/${id}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ data: input }),
	})

	return (await response.json()).data
})

const setMessage = (text: string) => (document.textContent = text)

const ctx = new GenericContext()
startBrowserReplay(ctx)
renderMessage(ctx, setMessage).then(text => {
	stopBrowserReplay(ctx)

	setMessage(text)
	console.log(`hydrated with '${text}'`)
})
