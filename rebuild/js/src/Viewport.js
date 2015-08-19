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

        // animations
        // if ( THREE.AnimationHandler.animations.length > 0 ) {

        //     THREE.AnimationHandler.update( 0.016 );

            // for ( var i = 0, l = sceneHelpers.children.length; i < l; i ++ ) {
            //     var helper = sceneHelpers.children[ i ];
            //     if ( helper instanceof THREE.SkeletonHelper ) {
            //         helper.update();
            //     }
            // }
            render();
        // }
    }

    var createRenderer = function ( type, antialias ) {
        // if ( type === 'WebGLRenderer' && System.support.webgl === false ) {
        //     type = 'CanvasRenderer';
        // }

        var renderer = new THREE[ type ]( { antialias: antialias } );
        renderer.setClearColor( clearColor );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.autoClear = false;
        renderer.autoUpdateScene = false;

        return renderer;
    };

    function render() {
        // sceneHelpers.updateMatrixWorld();
        scene.updateMatrixWorld();

        renderer.clear();
        renderer.render( scene, camera );

        // if ( renderer instanceof THREE.RaytracingRenderer === false ) {
        //     renderer.render( sceneHelpers, camera );
        // }
    }

    var clearColor;
    // var renderer = createRenderer( editor.config.getKey( 'project/renderer' ), editor.config.getKey( 'project/renderer/antialias' ) );
    var renderer = createRenderer( 'WebGLRenderer', true );
    container.appendChild( renderer.domElement );

    animate();

    return container;
}