const { Command } = require('commander');
const http = require('http');
const program = new Command();

program
  .requiredOption('-h, --host <host>', 'server host')
  .requiredOption('-p, --port <port>', 'server port')
  .requiredOption('-c, --cache <path>', 'cache directory path')
  .parse(process.argv);

const { host, port, cache } = program.opts();

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Server is running');
});

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});
