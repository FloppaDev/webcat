
import pathlib
import re
import os
from pprint import pprint

root = pathlib.Path(__file__).parent.parent.resolve()
gen = f'{root}/gen'
data = f'{root}/data'

with open(f'{gen}/templates/data.js', 'r') as file: 
    data_txt = file.read()

keys = re.findall('//{{[a-zA-Z_]+[a-zA-Z0-9_]*}}', data_txt)

def shaders():
    shaders = []
    shader_progs = []

    for path, subdirs, files in os.walk(f'{data}/shaders'):
        for file in files:
            shaders.append(file)

    for shader1 in shaders:
        alone = True
        split = shader1.split('.')
        name1 = split[0]
        ext1 = split[1]

        for shader2 in shaders:
            if shader1 == shader2:
                continue

            split = shader2.split('.')
            name2 = split[0]
            ext2 = split[1]

            if name1 == name2:
                if ext1 == 'vert':
                    if ext2 == 'frag':
                        shader_progs.append(
                            '%s:{ vert: "%s", frag: "%s" }' % (name1, shader1, shader2))
                        alone = False
                        break
                    else:
                        raise Exception(f'Unexpected extension for {shader2}')
                elif ext2 == 'vert':
                    if ext1 == 'frag':
                        shader_progs.append(
                            '%s:{ vert: "%s", frag: "%s" }' % (name1, shader2, shader1))
                        alone = False
                        break
                    else:
                        raise Exception(f'Unexpected extension for {shader1}')
                else:
                    raise Exception(f'No vert shader for {shader1}')

        if alone:
            if ext1 == 'vert':
                lines.append(
                    '%s:{ vert: "%s", frag: "%s" }' % (name1, shader1, "null"))
            else:
                raise Exception(f'Unexpected extension for {shader1}')

    shader_progs = list(dict.fromkeys(shader_progs))

    print('----------------- Shaders: -----------------')
    pprint(shader_progs)

def textures(): pass

def sounds(): pass

for key in keys:
    eval(f'{key[4:-2]}()')
