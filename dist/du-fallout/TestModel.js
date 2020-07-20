{
    "metadata": { "formatVersion" : 3 },    

    "materials": [ {
        "DbgColor" : 15658734, // => 0xeeeeee
        "DbgIndex" : 0,
        "DbgName" : "dummy",
        "colorDiffuse" : [ 1, 0, 0 ],
    } ],

    "vertices": [ 0,0,0, 0,0,1, 1,0,1, 1,0,0, ... ],
    "normals":  [ 0,1,0, ... ],
    "colors":   [ 1,0,0, 0,1,0, 0,0,1, 1,1,0, ... ],
    "uvs":      [ [ 0,0, 0,1, 1,0, 1,1 ], ... ],

    "faces": [ 

        // triangle
        // 00 00 00 00 = 0
        // 0, [vertex_index, vertex_index, vertex_index]
        0, 0,1,2,

        // quad
        // 00 00 00 01 = 1
        // 1, [vertex_index, vertex_index, vertex_index, vertex_index]
        1, 0,1,2,3,

        // triangle with material
        // 00 00 00 10 = 2
        // 2, [vertex_index, vertex_index, vertex_index],
        // [material_index]
        2, 0,1,2, 0,

        // triangle with material, vertex uvs and face normal
        // 00 10 01 10 = 38
        // 38, [vertex_index, vertex_index, vertex_index],
        // [material_index],
        // [vertex_uv, vertex_uv, vertex_uv],
        // [face_normal]
        38, 0,1,2, 0, 0,1,2, 0,

        // triangle with material, vertex uvs and vertex normals
        // 00 10 10 10 = 42
        // 42, [vertex_index, vertex_index, vertex_index],
        // [material_index],
        // [vertex_uv, vertex_uv, vertex_uv],
        // [vertex_normal, vertex_normal, vertex_normal]
        42, 0,1,2, 0, 0,1,2, 0,1,2,

        // quad with everything
        // 11 11 11 11 = 255
        // 255, [vertex_index, vertex_index, vertex_index, vertex_index],
        //  [material_index],
        //  [face_uv],
        //  [face_vertex_uv, face_vertex_uv, face_vertex_uv, face_vertex_uv],
        //  [face_normal],
        //  [face_vertex_normal, face_vertex_normal,
        //   face_vertex_normal, face_vertex_normal],
        //  [face_color]
        //  [face_vertex_color, face_vertex_color,
        //   face_vertex_color, face_vertex_color],
        255, 0,1,2,3, 0, 0, 0,1,2,3, 0, 0,1,2,3, 0, 0,1,2,3,
    ]

}