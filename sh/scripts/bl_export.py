
import bpy

for ob in bpy.data.objects:
    print (ob.name)
    try:
        ob.material_slot_remove()
        print ("removed material from " + ob.name)
    except:
        print (ob.name + " does not have materials.")
