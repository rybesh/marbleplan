Loading a Marble Plan fragment: http://rybesh.github.io/marbleplan/

Steps to produce this:

1. Use the [quadric edge collapse decimation](http://www.shapeways.com/tutorials/polygon_reduction_with_meshlab) filter in [MeshLab](http://meshlab.sourceforge.net/) to downsample the fragment mesh from ~18 million faces to ~128,000 faces.
2. Use [Wei Meng's PLY loader](http://threejs.org/examples/webgl_loader_ply.html) to load the downsampled fragment mesh.
3. Light the face and rear of the fragment mesh with [two spotlights](main.js#L39-L60) to produce shadows making the engravings visible.
