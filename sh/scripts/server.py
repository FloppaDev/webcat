
from http.server import HTTPServer, BaseHTTPRequestHandler
import pathlib
import subprocess

BIND_HOST = 'localhost'
PORT = 8080

root = pathlib.Path(__file__).parent.parent.parent.resolve()

def gen():
    subprocess.run([f'{root}/sh/gen.sh'])

def f(path):
    with open(f'{root}/{path}', 'rb') as file:
        return file.read()

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        s = self.requestline.split()[1]

        if s == '/':
            gen() 

        self.send_response(200)

        if s.endswith('html') or s == '/':
            self.send_header('Content-type', 'text/html')
        elif s.endswith('js'):
            self.send_header('Content-type', 'text/javascript')
        elif s.endswith('css'):
            self.send_header('Content-type', 'text/css')

        self.end_headers()

        if s == '/':
            file = f('index.html')
        else:
            file = f(s)
        
        self.wfile.write(file)

print(f'Listening on http://{BIND_HOST}:{PORT}')

httpd = HTTPServer((BIND_HOST, PORT), SimpleHTTPRequestHandler)

try:
    httpd.serve_forever()
except KeyboardInterrupt:
    print()
