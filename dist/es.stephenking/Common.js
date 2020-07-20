/* 
var Weatherbox[3];
var Wind_direction[3] = 0,0,-20;	//Movement speed and direction

bmap Weather_bmap = <raindrop.tga>;   //The particle bmap

function Weather_part_event()
{
	//keep the particle within the box
	vec_set(my.x,vector(cycle(my.x,camera.x-Weatherbox.x,camera.x+Weatherbox.x),
	cycle(my.y,camera.y-Weatherbox.y,camera.y+Weatherbox.y),
	cycle(my.z,camera.z-Weatherbox.z,camera.z+Weatherbox.z)));

	//update the movement speed and direction
	vec_set(my.vel_x,vector(Wind_direction.x,Wind_direction.y,Wind_direction.z));
	
	my.lifespan = 100; // live forever
}

function Weather_part()
{
	//place particles at random positions within the box
	vec_set(my.x,vector(camera.x+random(Weatherbox.x*2)-Weatherbox.x,
	camera.y+random(Weatherbox.y*2)-Weatherbox.y,
	camera.z+random(Weatherbox.z*2)-Weatherbox.z));
	
	my.bmap = Weather_bmap;
	my.size = random(1)+2;
	my.move = on;

	my.function = Weather_part_event;
}

function CreateWeatherParticles(cx,cy,cz,numparticles)
{
	Weatherbox.x = cx/2;
	Weatherbox.y = cy/2;
	Weatherbox.z = cz/2;
	
	//create the particles
	effect(Weather_part,numparticles,nullvector,nullvector);
}
*/