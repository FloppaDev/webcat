
import bpy

class Vertex:
    def __init__(self, position, uv):
        self.position = position
        self.uv = uv

class Primitive:
    def __init__(self): 
        self.indices = []

class Mesh:
    def __init__(self):
        self.vertices = []
        self.primitives = []

class Object:
    def __init__(self):
        self.mesh = Mesh()

for ob in bpy.data.objects:
    print('\n'+ob.name)

    if ob.type == 'MESH':
        mesh = ob.data

        out_object = Object()

        mesh.validate_material_indices()
        mesh.calc_loop_triangles()

        materials = mesh.materials
        
        for i in range(0, len(materials)):
            out_object.mesh.primitives.append(Primitive())

        vertices = mesh.vertices
        uv_map = mesh.uv_layers[0].data

        out_object.mesh.vertices = [None] * len(uv_map)

        loop_triangles = mesh.loop_triangles
        loops = mesh.loops

        for loop_triangle in loop_triangles:
            material_index = loop_triangle.material_index
            out_primitive = out_object.mesh.primitives[material_index]

            for loop in loop_triangle.loops:
                vertex_loop = loops[loop]

                index = vertex_loop.vertex_index
                vertex = vertices[index] 
                position = vertex.co
                uv = uv_map[index].uv

                out_primitive.indices.append(index)
                out_object.mesh.vertices[index] = Vertex(position, uv)

    else:
        pass
        #TODO get object 
