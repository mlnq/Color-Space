let camera, scene, renderer, mesh;
let desc= document.getElementById('info');
desc.innerHTML="RGB Cube Michał Mlenko. To move press keys: [Q] [W] [E]";

init();
animate();


function init() {

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.5, 1000 );
    camera.position.z = 3;

    scene = new THREE.Scene();
    const geometry = new THREE.BoxGeometry( 1,1,1 ).toNonIndexed();
    const material = new THREE.MeshBasicMaterial( { vertexColors: true } ); 
    const positionAttribute = geometry.getAttribute( 'position' );
        
    const colors = [];
    let color;
        let coordsArray = [...positionAttribute.array];
        let coords=[];

        for(let i=0;i<positionAttribute.count;i++)
        {
          coords.push({
            x: coordsArray[0+i*3],
            y: coordsArray[1+i*3],
            z: coordsArray[2+i*3],
          })
        }

        console.log(positionAttribute.count);
        console.log(coordsArray);
        console.log(coords);


        console.log(geometry);
    for ( let i = 0; i < positionAttribute.count; i += 3 ) {
        //iteracja co 1 face.
            for(let k =0;k<3;k++)
            {
              color = new THREE.Color( 
                coords[i+k].x +0.5 ,
                coords[i+k].y +0.5 ,
                coords[i+k].z +0.5 
              );
              colors.push( color.r,color.g,color.b );
            }
            
        
    }
        console.log(colors);
    geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

}

function animate() {

    requestAnimationFrame( animate );

    if (window.isQDown)
    mesh.rotation.x += 0.02;

    if(window.isWDown)
    mesh.rotation.y += 0.02;

    if(window.isEDown)
    mesh.rotation.z += 0.02;


    renderer.render( scene, camera );

}

function handleKeyDown(event) {
  if (event.keyCode === 81) { 
    window.isQDown = true;
  }
  if (event.keyCode === 87) { 
    window.isWDown = true;
  }
  if (event.keyCode === 69) { 
    window.isEDown = true;
  }
}

function handleKeyUp(event) {
  if (event.keyCode === 81) { 
    window.isQDown = false;
  }
  if (event.keyCode === 87) { 
    window.isWDown = false;
  }
  if (event.keyCode === 69) { 
    window.isEDown = false;
  }
}
window.addEventListener('keydown', handleKeyDown, false);
window.addEventListener('keyup', handleKeyUp, false);

