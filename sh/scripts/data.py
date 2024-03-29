
import pathlib
import re
import os
from pprint import pprint

root = pathlib.Path(__file__).parent.parent.parent.resolve()
gen = f'{root}/gen'
data = f'{root}/data'
data_txt = ''

with open(f'{gen}/data.js', 'r') as file: 
    data_txt = file.read()

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

def add_shader(paths, progs, modules):
    current_name = None
    vert = None
    frag = None
    module = None

    i = len(paths) - 1

    while i >= 0:
        shader = paths[i]
        split = shader.split('.')
        name = split[0]
        ext = split[1]

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
                module = f'$shader_{name}'
                del paths[i]

        i -= 1

    if vert == None: 
        raise Exception(f'Missing vert file for shader {current_name}.')

    if frag == None: 
        raise Exception(f'Missing frag file for shader {current_name}.')

    if module == None: 
        raise Exception(f'Missing js file for shader {current_name}.')

    progs.append(
        '"%s": new Shader("%s", "%s", %s)' % (
            current_name, vert, frag, module))

    modules.append(
        f'import * as $shader_{name} from "../data/shaders/{name}.js";')

def shaders(data_txt):
    paths = []
    progs = []
    modules = []

    walk(f'{data}/shaders', paths)

    while len(paths) > 0:
        add_shader(paths, progs, modules)

    title('Shaders')
    pprint(progs)

    title('Shader modules')
    pprint(modules)
        
    data_txt = data_txt.replace('//{{shaders}}', strlist(progs, 2))
    data_txt = data_txt.replace('//{{shader_modules}}', strlist(modules, 0))

    return data_txt

def materials(data_txt):
    paths = []
    lines = []
    modules = []

    walk(f'{data}/materials', paths)

    for path in paths:
        name = path.split('.')[0]
        lines.append(f'"{name}": new Material(this, $material_{name})')
        modules.append(f'import * as $material_{name} from "../data/materials/{name}.js";')

    title('Materials')
    pprint(lines)

    title('Material modules')
    pprint(modules)
        
    data_txt = data_txt.replace('//{{materials}}', strlist(lines, 2))
    data_txt = data_txt.replace('//{{material_modules}}', strlist(modules, 0))

    return data_txt

def textures(data_txt):
    textures = []
    lines = []

    walk(f'{data}/textures', textures)

    for texture in textures:
        name = texture.split('.')[0]
        lines.append(f'"{name}": new Texture("{texture}")')

    title('Textures')
    pprint(lines)

    data_txt = data_txt.replace('//{{textures}}', strlist(lines, 2))

    return data_txt

def sounds(data_txt):
    sounds = []
    lines = []

    walk(f'{data}/sounds', sounds)

    for sound in sounds:
        lines.append(f'"{sound}"')

    title('Sounds')
    pprint(lines)

    data_txt = data_txt.replace('//{{sounds}}', strlist(lines, 2))

    return data_txt

def scenes(data_txt):
    files = []
    scenes = {}
    modules = []
    lines = []

    walk(f'{data}/scenes', files)

    for file in files:
        split = file.split('.')
        name = split[0]
        ext = split[1]

        if ext == 'js' or ext == 'json':
            if name not in scenes:
                scenes[name] = {}
            scenes[name][ext] = file

    for key, value in scenes.items():
        if scenes[key]['json'] == None:
            raise Exception(f'Missing json file for scene {key}.')

        if scenes[key]['js'] == None:
            raise Exception(f'Missing js file for scene {key}.')
        
        lines.append(f'"{key}": new Scene($scn_data_{key}, $scene_{key})')
        modules.append(f'import * as $scene_{key} from "../data/scenes/{key}.js";')
        modules.append(f'import * as $scn_data_{key} from "../data/scenes/{key}.json.js";')

    title('Scenes')
    pprint(lines)

    title('Scene modules')
    pprint(modules)

    data_txt = data_txt.replace('//{{scene_modules}}', '\n'.join(modules))
    data_txt = data_txt.replace('//{{scenes}}', strlist(lines, 2))

    return data_txt

def configs(data_txt):
    paths = []
    lines = []
    modules = []

    walk(f'{data}/configs', paths)

    for path in paths:
        name = path.split('.')[0]
        lines.append(f'"{name}": new Config($config_{name})')
        modules.append(f'import * as $config_{name} from "../data/configs/{name}.js";')

    title('Configs')
    pprint(lines)

    title('Config modules')
    pprint(modules)
        
    data_txt = data_txt.replace('//{{configs}}', strlist(lines, 2))
    data_txt = data_txt.replace('//{{config_modules}}', strlist(modules, 0))

    return data_txt

data_txt = shaders(data_txt)
data_txt = materials(data_txt)
data_txt = textures(data_txt)
data_txt = sounds(data_txt)
data_txt = scenes(data_txt)
data_txt = configs(data_txt)

with open(f'{root}/src/data.js', "w") as file:
    file.write(data_txt)

end()
