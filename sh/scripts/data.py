
import pathlib
import re
import os
from pprint import pprint

root = pathlib.Path(__file__).parent.parent.parent.resolve()
gen = f'{root}/gen'
data = f'{root}/data'

with open(f'{gen}/data.js', 'r') as file: 
    data_txt = file.read()

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
                shader_progs.append(
                    '%s:{ vert: "%s", frag: "%s" }' % (name1, shader1, "null"))
            else:
                raise Exception(f'Unexpected extension for {shader1}')

    shader_progs = list(dict.fromkeys(shader_progs))

    title('Shaders')
    pprint(shader_progs)

    return strlist(shader_progs, 2)

def textures(): pass

def sounds(): pass

for key in keys:
    k = key[4:-2]
    result = eval(k+'()')

    if result != None:
        data_txt = data_txt.replace('//{{%s}}' % k, result)

with open(f'{root}/src/data.js', "w") as file:
    file.write(data_txt)

end()
