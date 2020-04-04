var canvas = document.getElementById("viewport");
 
/* Rresize the canvas to occupy the full page, 
   by getting the widow width and height and setting it to canvas*/
 
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 50);

let renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: document.getElementById("viewport")
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x2e345B);
// document.body.appendChild(renderer.domElement);

camera.position.x = 0;
camera.position.y = 1; //change to 0 when finished 
camera.position.z = 18;

let light = new THREE.AmbientLight(0xFFFFFF); // white spotlight shining from the side, casting a shadow
scene.add(light);

//remove grid when finished 
let gridHelper = new THREE.GridHelper(50, 50);
scene.add(gridHelper);

var loader = new THREE.TextureLoader();

// canvas OBJECTS 
var cubeMaterials = [
    new THREE.MeshLambertMaterial({ color: 0x2E345B,wireframe: true, wireframe_linewidth: 10}),
    new THREE.MeshLambertMaterial({ color: 0x2E345B,wireframe: true, wireframe_linewidth: 10}),
    new THREE.MeshLambertMaterial({ map: loader.load('https://raw.githubusercontent.com/coloradical/Rae_Portfolio/v9/pngSRC/flooring.png')}),
    new THREE.MeshLambertMaterial({ map: loader.load('https://raw.githubusercontent.com/coloradical/Rae_Portfolio/v9/pngSRC/flooring.png')}),
    new THREE.MeshBasicMaterial({color: 0x2E345B,wireframe: true, wireframe_linewidth: 10})

  ];


  
cubeMaterials = new THREE.MeshFaceMaterial(cubeMaterials);

var cubeGeometry = new THREE.BoxGeometry(80,0,70);
var floor = new THREE.Mesh(cubeGeometry,cubeMaterials);
var ceiling = new THREE.Mesh(cubeGeometry,cubeMaterials);

var wallGeometry = new THREE.PlaneGeometry(80,80);


var wall2Geometry = new THREE.PlaneGeometry(18,180);
var wallMaterial = new THREE.MeshBasicMaterial( {color: 0x47578a, side: THREE.DoubleSide});
var wall2Material = new THREE.MeshBasicMaterial( {color: 0x2E3456, side: THREE.DoubleSide} );

var wall = new THREE.Mesh( wallGeometry, wallMaterial );
var wall2 = new THREE.Mesh( wallGeometry, wall2Material );
var wall3 = new THREE.Mesh( wallGeometry, wall2Material );


//loaders
var doorway = new THREE.MeshLambertMaterial({
  map: loader.load('https://raw.githubusercontent.com/coloradical/Rae_Portfolio/v9/pngSRC/doorway.png')
});

doorway.transparent=true;

var deskchair = new THREE.MeshLambertMaterial({
  map: loader.load('https://raw.githubusercontent.com/coloradical/Rae_Portfolio/v9/pngSRC/deskchair2.png')
});

deskchair.transparent=true;


 
// create a plane geometry for the image with a width of 10
// and a height that preserves the image's aspect ratio
var doorGeometry = new THREE.PlaneGeometry(60, 24);
var deskGeometry = new THREE.PlaneGeometry(20, 24);




// combine our image geometry and material into a mesh
var doorwayMesh = new THREE.Mesh(doorGeometry, doorway);
var deskMesh = new THREE.Mesh(deskGeometry, deskchair);




// set the position of the image mesh in the x,y,z dimensions
doorwayMesh.position.set(-1,0,-14);
deskMesh.position.set(-1,-3,-34);
floor.position.set (-1,-14,-30);
ceiling.position.set(-1,14,-30)
wall.position.set(-1,0,-40);



wall2.rotateY(180);
wall2.position.set(-25,0,-40);

wall3.rotateY(-180);
wall3.position.set(25,0,-40);

// add the image to the scene
scene.add(doorwayMesh, floor, ceiling, wall, deskMesh); 



let animate = function() {
    requestAnimationFrame(animate);

    //controls.update();
    renderer.render(scene, camera);
};


//scroll BAR
window.onscroll = function() {scrollProgress()};

function scrollProgress() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  var truncScroll = Math.trunc(scrolled);
  document.getElementById("myBar").style.width = scrolled + "%";
//   document.getElementById("updatedProgress").innerHTML = truncScroll +"%";

}



//update ON SCROLL 
var updatedProgress = window.innerWidth/100;
var updatedProgressHeight = window.innerHeight/100;

const header = document.querySelector('.header');
const social = document.querySelector('.social');

uos(0, .1, p => (header.style.opacity = ((updatedProgress-(p*90)) / (updatedProgress) )));
uos(0, .1, p => (social.style.paddingTop= (((p)) * (updatedProgress*10) +"%" )));


//////////////////
animate();



function updateCamera(ev) {
    let div1 = document.getElementById("div1");
	camera.position.z = 18 - window.scrollY / 250.0;
}

window.addEventListener("scroll", updateCamera);