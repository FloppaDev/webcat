
import bpy
import sys
import copy
import json

blend_path = sys.argv[-1]
json_path = blend_path.rsplit('.', 1)[0] + '.json.js'

def new(obj):
    return copy.deepcopy(obj)

Primitive = {
    'indices': [],
}

Mesh = {
    'materials': [],
    'primitives': [],
    'v_positions': [],
    'v_uvs': [],
}

Object = {
    'name': None,
    'mesh': None,
}

Scene = {
    'objects': [],
}

out_scene = new(Scene)

for ob in bpy.data.objects:
    out_object = new(Object)
    out_object['name'] = ob.name

    if ob.type == 'MESH':
        mesh = ob.data

        out_object['mesh'] = new(Mesh)

        mesh.validate_material_indices()
        mesh.calc_loop_triangles()

        materials = mesh.materials

        for material in materials:
            if material.name == 'Material' or material.name.startswith('Material.'):
                out_object['mesh']['materials'].append('default')
            else:
                out_object['mesh']['materials'].append(material.name)
        
        for i in range(0, len(materials)):
            out_object['mesh']['primitives'].append(new(Primitive))

        vertices = mesh.vertices
        uv_map = mesh.uv_layers[0].data

        out_object['mesh']['v_positions'] = [None] * len(uv_map)
        out_object['mesh']['v_uvs'] = [None] * len(uv_map)

        loop_triangles = mesh.loop_triangles
        loops = mesh.loops

        for loop_triangle in loop_triangles:
            material_index = loop_triangle.material_index
            out_primitive = out_object['mesh']['primitives'][material_index]

            for loop in loop_triangle.loops:
                vertex_loop = loops[loop]

                loop_index = vertex_loop.vertex_index
                vertex = vertices[loop_index] 
                index = vertex_loop.index
                position = list(vertex.co)
                uv = list(uv_map[index].uv)

                out_primitive['indices'].append(index)
                out_object['mesh']['v_positions'][index] = position
                out_object['mesh']['v_uvs'][index] = uv 

    else:
        pass
        #TODO get object 

    out_scene['objects'].append(out_object)

js_prefix = 'export const DATA = '
output = js_prefix + json.dumps(out_scene, indent=4)

with open(json_path, "w") as f:
    f.write(output)
