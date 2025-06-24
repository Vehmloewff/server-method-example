# [@vehmloewff/server-method](https://github.com/vehmloewff/server-method) Example

Because of the way that `server-method` leverages export conditions in order to work, a separate npm package is required in order to demonstrate its usage.

Run `bun start` and navigate to [`localhost:8000`](http://localhost:8000). The command will also generate a browser build at `dist/client.js`, which demonstrates the ability to shake out the server code.

Most of these files are framework-level things, but `app.ts` is where the application would reside. Note how `renderMessage` is called both from the server and the client. Also note how the client hydration step calls the server methods, but it is very fast and does not send a request to the server.
