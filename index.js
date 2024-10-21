const { Command } = require('commander');
const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const program = new Command();

program
  .requiredOption('-h, --host <host>', 'server host')
  .requiredOption('-p, --port <port>', 'server port')
  .requiredOption('-c, --cache <path>', 'cache directory path')
  .parse(process.argv);

const { host, port, cache } = program.opts();

const server = http.createServer(async (req, res) => {
  const filePath = path.join(cache, req.url.substring(1) + '.jpg');

  if (req.method === 'GET') {
    try {
      const data = await fs.readFile(filePath);
      res.writeHead(200, { 'Content-Type': 'image/jpeg' });
      res.end(data);
    } catch {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  } else {
    // Відповідь для не підтримуваних методів
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
  }
}); 

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});
