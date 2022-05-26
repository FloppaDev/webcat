
import bpy
import copy
import json

def new(obj):
    return copy.deepcopy(obj)

Vertex = {
    'position': None,
    'uv': None,
}

Primitive = {
    'indices': [],
}

Mesh = {
    'materials': [],
    'primitives': [],
    'vertices': [],
}

Object = {
    'mesh': None,
}

Scene = {
    'objects': [],
}

out_scene = new(Scene)

for ob in bpy.data.objects:
    print('\n'+ob.name)

    if ob.type == 'MESH':
        mesh = ob.data

        out_object = new(Object)
        out_object['mesh'] = new(Mesh)

        mesh.validate_material_indices()
        mesh.calc_loop_triangles()

        materials = mesh.materials

        for material in materials:
            out_object['mesh']['materials'].append(material.name)
        
        for i in range(0, len(materials)):
            out_object['mesh']['primitives'].append(new(Primitive))

        vertices = mesh.vertices
        uv_map = mesh.uv_layers[0].data

        out_object['mesh']['vertices'] = [None] * len(uv_map)

        loop_triangles = mesh.loop_triangles
        loops = mesh.loops

        for loop_triangle in loop_triangles:
            material_index = loop_triangle.material_index
            out_primitive = out_object['mesh']['primitives'][material_index]

            for loop in loop_triangle.loops:
                vertex_loop = loops[loop]

                index = vertex_loop.vertex_index
                vertex = vertices[index] 
                position = list(vertex.co)
                uv = list(uv_map[index].uv)

                out_primitive['indices'].append(index)
                out_object['mesh']['vertices'][index] = new(Vertex)
                out_object['mesh']['vertices'][index]['position'] = position
                out_object['mesh']['vertices'][index]['uv'] = uv 

        out_scene['objects'].append(out_object)

    else:
        pass
        #TODO get object 

print(json.dumps(out_scene, indent=4))
