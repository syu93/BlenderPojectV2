var Editor = function () {
    this.scene          = new THREE.Scene();
    this.scene.name     = 'MainScene';

    this.camera         = new THREE.PerspectiveCamera( 50, 1, 1, 100000 );
    this.camera.name    = 'MainCamera';
}