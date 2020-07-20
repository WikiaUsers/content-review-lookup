Game=function(data){
    this.dungeon=null;
    this.character=null;
    Object.defineProperty(this, "dungeon", { 
      value: createDungeon(data.map),             
      configurable: false     
    });  
    Object.defineProperty(this, "character", { 
      value: new Character(data.pos),             
      configurable: false     
    });
    this.test=function(dir){
        return parseTile(dir);
    }
    this.move=function(dir){
        var dirs = {
        'norte': 0, 'n': 0, 
        'sur': 1, 's': 1,
        'oeste': 2, 'o': 2, 
        'este': 3, 'e': 3,
        'nordeste': 4, 'ne': 4, 
        'sudeste': 5, 'se': 5,
        'noroeste': 6, 'no': 6,
        'sudoeste': 7, 'so': 7,
        }
        var dirFuture={x:0,y:0}
        switch(dirs[dir]){
            case 0:
                dirFuture={x:-1,y:0}
                break;
            case 1:
                dirFuture={x:1,y:0}
                break;
            case 2:
                dirFuture={x:0,y:-1}
                break;
            case 3:
                dirFuture={x:0,y:1}
                break;
        }
        moveFuture={x:this.character.x+dirFuture.x,y:this.character.y+dirFuture.y}
        if(this.dungeon[moveFuture.x][moveFuture.y].tile.name!="barrera"){
            //move(moveFuture.x,moveFuture.y)
            this.character.moveXY(moveFuture.x,moveFuture.y);

            console.log("puedes pasar");
      }else{
            console.log("no puedes pasar");
      }



    }
    
    
    function createDungeon(dungeon){
        var Tile=function(name){
            this.name=name;
        }
        var br=new Tile("barrera");
        var pi=new Tile("piso");
        var wt=new Tile("agua");
        var lv=new Tile("lava");

        function parseTile(tile){
            switch(tile.substr(0,2)){
                case "BR":
                    return br;
                    break;
                case "PI":
                    return pi;
                    break;
                case "WT":
                    return wt;a
                    break;
                case "LV":
                    return lv;
                    break;
            }
        }
        var parseDungeon=[];
        for (var i = 0; i < dungeon.length; i++) {
            var filesN=[]
            var files=dungeon[i];
            for (var j = 0; j < files.length; j++) {
                var tile=parseTile(files[j].tile);
                var enemigos;
                var objetos;
                if($.isArray(files[j].objetos)){
                    objetos=files[j].objetos;
                }
                if($.isArray(files[j].enemigos)){
                    enemigos=files[j].enemigos;
                }
                filesN.push({tile:tile,objetos: objetos,enemigos:enemigos});
            }
            parseDungeon.push(filesN);

        }
        return parseDungeon;
    }
    viewTile=function(){
        return map[character.x][character.y];
    }

    function Character(pos){
        this.x=pos.x;
        this.y=pos.y;
        this.life=100;
        this.alive=true;
        function setX(x){
            this.x=x;
        }
        function getX(){
            return this.x;
        }
        function setY(y){
            this.y=y;
        }
        function getY(){
            return this.y
        }
        this.moveXY=function(x,y){
            this.x=x;
            this.y=y;
        }
        this.addLive=function(l){
            this.life+=l;
        }
        this.reduceLive=function(l){
            this.life-=l;
            if(this.life<=0){
                alive=false;
            }
        }
    }
};