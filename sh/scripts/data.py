
#TODO rework formatting of generated code.

import pathlib
import re
import os
from pprint import pprint

root = pathlib.Path(__file__).parent.parent.parent.resolve()
gen = f'{root}/gen'
data = f'{root}/data'

with open(f'{gen}/data.js', 'r') as file: 
    data_txt = file.read()

with open(f'{gen}/pipelines.js', 'r') as file: 
    pipelines_txt = file.read()

keys = re.findall('//{{[a-zA-Z_]+[a-zA-Z0-9_]*}}', data_txt)
tab = '    '
ansi_base = '\033[0m'
ansi_bold = '\033[0;1m'

def strlist(list, tabn):
    result = ""

    for i, item in enumerate(list):
        if i != 0:
            result += tab * tabn

        result += item

        if i != len(list) - 1:
             result += ",\n"

    return result

def title(s):
    print(f'-----------------{ansi_bold} {s}: {ansi_base}-----------------')

def end():
    print('---------------------------------------------------------')

def walk(d, target):
    for path, dirs, files in os.walk(d):
        for file in files:
            f = os.path.join(path[len(d):], file)

            if f[0] == '/':
                f = f[1:]

            target.append(f)

def add_shader(paths, progs, pipelines):
    current_name = None
    vert = None
    frag = None
    js = None

    i = len(paths) - 1

    while i >= 0:
        shader = paths[i]
        split = shader.split('.')
        name = split[0]
        ext = split[1]
        print(ext)

        if current_name == None:
            current_name = name

        if current_name == name:
            if ext == 'vert':
                vert = shader
                del paths[i]
            elif ext == 'frag':
                frag = shader 
                del paths[i]
            elif ext == 'js':
                js = shader 
                del paths[i]

        i -= 1

    if vert == None: 
        raise Exception(f'Missing vert file for shader {current_name}.')

    if frag == None: 
        raise Exception(f'Missing frag file for shader {current_name}.')

    if js == None: 
        raise Exception(f'Missing js file for shader {current_name}.')

    progs.append(
        '"%s":{ vert: "%s", frag: "%s" }' % (
            current_name, vert, frag))

    with open(f'{data}/shaders/{js}', 'r') as file: 
        js_txt = file.read()

    pipelines.append(
        '"%s": {\n%s\n},\n' % (current_name, js_txt))

def shaders():
    paths = []
    progs = []
    pipelines = []

    walk(f'{data}/shaders', paths)

    while len(paths) > 0:
        add_shader(paths, progs, pipelines)

    title('Shaders')
    pprint(progs)

    title('Pipelines')
    pprint(pipelines)

    with open(f'{root}/src/pipelines.js', "w") as file:
        file.write(pipelines_txt.replace('//{{pipelines}}', strlist(pipelines, 1)))

    return strlist(progs, 2)

def textures():
    textures = []
    lines = []

    walk(f'{data}/textures', textures)

    for texture in textures:
        lines.append(f'"{texture}"')

    return strlist(lines, 2)

def sounds():
    sounds = []
    lines = []

    walk(f'{data}/sounds', sounds)

    for sound in sounds:
        lines.append(f'"{sound}"')

    return strlist(lines, 2)

for key in keys:
    k = key[4:-2]
    result = eval(k+'()')

    if result != None:
        data_txt = data_txt.replace('//{{%s}}' % k, result)

with open(f'{root}/src/data.js', "w") as file:
    file.write(data_txt)

end()
