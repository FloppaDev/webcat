
import bpy

for ob in bpy.data.objects:
    print (ob.name)
    try:
        ob.material_slot_remove()
        print ("removed material from " + ob.name)
    except:
        print (ob.name + " does not have materials.")

    data = ob.data

    try:
        data.validate_material_indices()
        data.calc_loop_triangles()

        materials = data.materials
        vertices = data.vertices

        loop_triangles = data.loop_triangles
        loops = data.loops

        for loop_triangle in loop_triangles:
            material_index = loop_triangle.material_index

            for loop in loop_triangle.loops:
                vertex_loop = loops[loop]
                index = vertex_loop.vertex_index
                vertex = vertices[index] 
                position = vertex.co

    except:
        print(ob.name + " does not have mesh data.")
