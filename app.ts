import { GenericContext, serverMethod } from '@vehmloewff/server-method'

const sayHello = serverMethod('say_hello', {
	match: { schema: { name: 'string' } },
	async fn(_, input) {
		console.log(`say_hello was called with name: ${input.name}`)

		return `Hello, ${input.name}!`
	},
})

export async function renderMessage(ctx: GenericContext, onUpdate: (text: string) => void) {
	if ('window' in globalThis) {
		document.addEventListener('click', async () => {
			onUpdate(`update: ${await sayHello.call(ctx, { name: 'World' })}`)
		})
	}

	return `initial: ${await sayHello.call(ctx, { name: 'World' })}`
}
