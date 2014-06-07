function buildAxis( src, dst, colorHex, dashed ) {
        var geom = new THREE.Geometry(),
            mat;

        if(dashed) {
                mat = new THREE.LineDashedMaterial({ linewidth: 3, color: colorHex, dashSize: 3, gapSize: 3 });
        } else {
                mat = new THREE.LineBasicMaterial({ linewidth: 3, color: colorHex });
        }

        geom.vertices.push( src.clone() );
        geom.vertices.push( dst.clone() );
        geom.computeLineDistances(); // This one is SUPER important, otherwise dashed lines will appear as simple plain lines

        var axis = new THREE.Line( geom, mat, THREE.LinePieces );

        return axis;

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
	// not to used
	function axes(){
		//****************************************************************//
		var x = new THREE.Vector3(1,0,0);
		var y = new THREE.Vector3(0,1,0);
		var z = new THREE.Vector3(0,0,1);
		//****************************************************************//
		var geometry = new THREE.CylinderGeometry( 1, 1, 20, 20 );
		var material = new THREE.MeshBasicMaterial( {color: 0x0000ff} ); 
		var cylinderX = new THREE.Mesh( geometry, material );
		//-----
		var geometry = new THREE.CylinderGeometry( 0, 3, 5, 10 );
		var material = new THREE.MeshBasicMaterial( {color: 0x0000ff} ); 		
		var coneX = new THREE.Mesh( geometry, material );

		//-----
		cylinderX.rotateOnAxis(z,-89.5);
		coneX.rotateOnAxis(z,-89.50);
		//-----
		coneX.position.x = 12;
		coneX.position.z = 0.10;
		
		//****************************************************************//
		var geometry = new THREE.CylinderGeometry( 1, 1, 20, 20 );
		var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
		var cylinderY = new THREE.Mesh( geometry, material );
		//-----
		var geometry = new THREE.CylinderGeometry( 0, 3, 5, 10 );
		var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 		
		var coneY = new THREE.Mesh( geometry, material );
		// coneY.append(renderer.domElement);
		//-----
		cylinderY.rotateOnAxis(z,-0);
		coneY.rotateOnAxis(z,-0);
		//-----
		coneY.position.x = -9.9;
		coneY.position.y = 23;
		//-----
		cylinderY.position.x = -10;
		cylinderY.position.y = 10;
		//****************************************************************//
		var geometry = new THREE.CylinderGeometry( 1, 1, 20, 20 );
		var material = new THREE.MeshBasicMaterial( {color: 0xff0000} ); 
		var cylinderZ = new THREE.Mesh( geometry, material );
		//-----
		var geometry = new THREE.CylinderGeometry( 0, 3, 5, 10 );
		var material = new THREE.MeshBasicMaterial( {color: 0xff0000} ); 		
		var coneZ = new THREE.Mesh( geometry, material );
		//-----
		cylinderZ.rotateOnAxis(x,89.5);
		coneZ.rotateOnAxis(x,89.5);
		//-----
		coneZ.position.x = -9.9;
		coneZ.position.y = 0;
		coneZ.position.z = 22;
		//-----
		cylinderZ.position.x = -9.9;
		cylinderZ.position.y = 0;
		cylinderZ.position.z = 9.9;
		//****************************************************************//

		//****************************************************************//
		scene.add( cylinderX );
		scene.add( coneX );
		
		scene.add( cylinderY );
		scene.add( coneY );

		scene.add( cylinderZ );
		scene.add( coneZ );
	}