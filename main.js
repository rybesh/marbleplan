/*global THREE Detector requestAnimationFrame */

window.onload = function() {
	var renderer,
		  scene,
		  camera,
		  controls,
		  material;
	
	if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

  renderer = new THREE.WebGLRenderer({ antialias: true });

  document.body.appendChild( renderer.domElement );
	renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor( 0xFCF4DC, 1 );
  renderer.shadowMapEnabled = true;
  renderer.shadowMapSoft = true;
	
	scene = new THREE.Scene();

	// Add the fragment to the scene
	material = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
  var loader = new THREE.PLYLoader();
  loader.addEventListener('load', function(event) {

    var geometry = event.content;

    var fragment = new THREE.Mesh(geometry, material);
    fragment.scale.set( 0.1, 0.1, 0.1 );
    fragment.position.set( -60, 80, 0 );
    fragment.castShadow = true;
    fragment.receiveShadow = true;
    
    scene.add(fragment);
  });
  loader.load('./models/010g_128000.ply');

  // Lighting
	scene.add( new THREE.AmbientLight( 0xffffff ) );
  
  var spot1 = new THREE.SpotLight( 0xFFFFFF, 1.5 );
  spot1.position.set( 0, 0, 55 );
  spot1.castShadow = true;
  spot1.target.position.set( 0, 0, 0 );
  spot1.shadowDarkness = 0.65;
  spot1.shadowCameraNear = 60;
  spot1.shadowCameraFar = 75;
  //spot1.shadowCameraVisible = true;
  scene.add(spot1);
  
  var spot2 = new THREE.SpotLight( 0xFFFFFF, 1.5 );
  spot2.position.set( 0, 0, -80 );
  spot2.castShadow = true;
  spot2.target.position.set( 0, 0, 0 );
  spot2.shadowDarkness = 0.65;
  spot2.shadowCameraNear = 60;
  spot2.shadowCameraFar = 75;
  //spot2.shadowCameraVisible = true;
  scene.add(spot2);
  
  // Add axes
	//var axes = buildAxes( 1000 );
	//scene.add( axes );

	// We need a camera to look at the scene!
	camera = new THREE.PerspectiveCamera(
    45, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.set( 0, 0, -90 );
	camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );
	
	// And some sort of controls to move around
	// We'll use one of THREE's provided control classes for simplicity
	controls = new THREE.TrackballControls( camera );
	controls.rotateSpeed = 1.0;
	controls.zoomSpeed = 0.1;
	controls.panSpeed = 0.8;

	controls.noZoom = false;
	controls.noPan = false;

	controls.staticMoving = true;
	controls.dynamicDampingFactor = 0.3;


	// and go!
	animate();

	function animate() {
		requestAnimationFrame( animate );
		controls.update();
		renderer.render( scene, camera );
	}

	function buildAxes( length ) {
		var axes = new THREE.Object3D();

		axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( length, 0, 0 ), 0xFF0000, false ) ); // +X
		axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( -length, 0, 0 ), 0xFF0000, true) ); // -X
		axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, length, 0 ), 0x00FF00, false ) ); // +Y
		axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, -length, 0 ), 0x00FF00, true ) ); // -Y
		axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, length ), 0x0000FF, false ) ); // +Z
		axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, -length ), 0x0000FF, true ) ); // -Z

		return axes;

	}

	function buildAxis( src, dst, colorHex, dashed ) {
		var geom = new THREE.Geometry(),
			  mat; 

		if(dashed) {
			mat = new THREE.LineDashedMaterial(
        { linewidth: 3, color: colorHex, dashSize: 3, gapSize: 3 });
		} else {
			mat = new THREE.LineBasicMaterial(
        { linewidth: 3, color: colorHex });
		}

		geom.vertices.push( src.clone() );
		geom.vertices.push( dst.clone() );
		geom.computeLineDistances(); 

		var axis = new THREE.Line( geom, mat, THREE.LinePieces );

		return axis;

	}
}
