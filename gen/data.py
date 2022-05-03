
import pathlib
import re

dir = pathlib.Path(__file__).parent.resolve()

with open(f'{dir}/templates/data.js', 'r') as file: 
    data = file.read()

keys = re.findall('//{{[a-zA-Z_]+[a-zA-Z0-9_]*}}', data)

def shaders(): pass

def textures(): pass

def sounds(): pass

for key in keys:
    eval(f'{key[4:-2]}()')
