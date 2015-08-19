var Viewport = function ( editor ) {
    var container = document.createElement('div'); // to create with UI class
    var scene = editor.scene;
    var camera = editor.camera;
        // camera.position.fromArray( editor.config.getKey( 'camera/position' ) );
        // camera.lookAt( new THREE.Vector3().fromArray( editor.config.getKey( 'camera/target' ) ) );

    var objects = [];

    // Scoped methods
    function animate() {
        window.requestAnimationFrame( animate );
        render();
    }

    var createRenderer = function ( type, antialias ) {
        var renderer = new THREE[ type ]( { antialias: antialias } );
            renderer.setClearColor(  0x373737, 1 );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.autoClear = false;
            renderer.autoUpdateScene = false;

        return renderer;
    };

    function render() {
        renderer.clear();
        renderer.render( scene, camera );
    }

    var renderer = createRenderer( 'WebGLRenderer', true );
    container.appendChild( renderer.domElement );

    animate();

    return container;
}