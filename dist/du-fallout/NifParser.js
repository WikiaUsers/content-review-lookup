importScript("MediaWiki:Jdataview.js");
importScript("MediaWiki:Jparser.js");
NifParser = function(){
	var _this = this;
	this.parser=null;
	this.nifobj=null;
	this.debug=false;
	this.callback=null;
	this.progress=null;
	this.parse=function(mdata,callback,progress,debug){
		//$.getScript( mw.config.get('wgScript')+'?title='+mw.util.wikiUrlencode("MediaWiki:Jdataview.js")+'&action=raw&ctype=text/javascript').done(function( data, textStatus, jqxhr ) {
			//$.getScript( mw.config.get('wgScript')+'?title='+mw.util.wikiUrlencode("MediaWiki:Jparser.js")+'&action=raw&ctype=text/javascript').done(function( data, textStatus, jqxhr ) {		
				_this.callback=(!callback)?null:callback;
				_this.progress=(!progress)?null:progress;
				_this.debug=(!debug)?false:true;
				_this.callback=callback;
				_this.blockIndex=-1;
				var nif=new jDataView(mdata);
				nif._littleEndian=true;
				_this.parser = new jParser(nif, {

					vec3F:{
						'x': 'float32',
						'y': 'float32',
						'z': 'float32'
					},

					vec4F:{
						'x': 'float32',
						'y': 'float32',
						'z': 'float32',
						'w': 'float32'
					},

					quat:{
						'w': 'float32',
						'x': 'float32',
						'y': 'float32',
						'z': 'float32'

					},

					mat9F:{
						'a1': 'float32',
						'b1': 'float32',
						'c1': 'float32',
						'a2': 'float32',
						'b2': 'float32',
						'c2': 'float32',
						'a3': 'float32',
						'b3': 'float32',
						'c3': 'float32'
					},

					mat4F:{
						'a1': 'float32',
						'b1': 'float32',
						'a2': 'float32',
						'b2': 'float32'
					},

					color3F:{
						'r': 'float32',
						'g': 'float32',
						'b': 'float32'
					},

					color4F:{
						'r': 'float32',
						'g': 'float32',
						'b': 'float32',
						'a': 'float32'
					},
					im12F:{
						'ma1': 'float32',
						'mb1': 'float32',
						'mc1': 'float32',
						'md1': 'float32',
						'ma2': 'float32',
						'mb2': 'float32',
						'mc2': 'float32',
						'md2': 'float32',
						'ma3': 'float32',
						'mb3': 'float32',
						'mc3': 'float32',
						'md3': 'float32',
					},
					mat16F:{
						'ma1': 'float32',
						'mb1': 'float32',
						'mc1': 'float32',
						'md1': 'float32',
						'ma2': 'float32',
						'mb2': 'float32',
						'mc2': 'float32',
						'md2': 'float32',
						'ma3': 'float32',
						'mb3': 'float32',
						'mc3': 'float32',
						'md3': 'float32',
						'ma4': 'float32',
						'mb4': 'float32',
						'mc4': 'float32',
						'md4': 'float32'
					},
					uv:{
						'u':'float32',
						'v':'float32'
					},
					stringEntry:function(){
						var len = this.parse('uint32');
						var res = this.parse(['string',len]);
						return res;
					},

					nameLookup:function(){
						var idx=this.parse('uint32');
						return nameTable[idx];
					},
					pointCollection:function(){
						var points=[];
						if(hpoints > 0){
							for(var i=0; i < strips; i++)
							{
								points.push(this.parse(['array','uint16',stripLengths[i]]));
							}
						}
						return points;
					},
					numStrips:function(){
						strips=this.parse('uint16');
						return strips;
					},
					stripLengths:function(){
						stripLengths=this.parse(['array','uint16',strips])
						return stripLengths;
					},
					hasPoints:function(){
						hpoints=this.parse('int8');
						return hpoints;
					},

					texprop:function(){
						var res={
							name:null,
							numExtraDataList:null,
							extraDataList:null,
							controller:null,
							flags:null,
							textureCount:null,
							hasBaseTexture:null,
							baseTexture:null,
							hasDarkTexture:null,
							darkTexture:null,
							hasDetailTexture:null,
							detailTexture:null,
							hasGlossTexture:null,
							glossTexture:null,
							hasGlowTexture:null,
							glowTexture:null,
							hasBumpMapTexture:null,
							bumpMapTexture:null,
							bumpMapLumaScale:null,
							bumpMapLumaOffset:null,
							bumpMapMatrix:null,
							hasNormalTexture:null,
							normalTexture:null,
							hasUnknownTexture:null,
							unknownTexture:null,
							unknownFloat:null,
							hasDecal0Texture:null,
							decal0Texture:null,
							hasDecal1Texture:null,
							decal1Texture:null,
							hasDecal2Texture:null,
							decal2Texture:null,
							hasDecal3Texture:null,
							decal3Texture:null,
							numShaderTextures:null,
							shaderTextures:null,
						};

						res.name=this.parse('nameLookup');

						res.numExtraDataList=this.parse('uint32');

						res.extraDataList=this.parse(['array','int32',res.numExtraDataList]);

						res.controller=this.parse('int32');

						res.flags=this.parse('uint16');

						res.textureCount=this.parse('uint32');

						res.hasBaseTexture=this.parse('int8');

						if(res.hasBaseTexture==1)
						{
							//console.log("\t"+this.tell());
							res.baseTexture=this.parse('texDesc');
							//console.log(res.baseTexture);
						}
						//console.log("\t"+this.tell());
						res.hasDarkTexture=this.parse('int8');

						if(res.hasDarkTexture==1)
						{
							res.darkTexture=this.parse('texDesc');
						}
						hasDetailTexture=this.parse('int8');
						if(res.hasDetailTexture==1)
						{
							res.detailTexture=this.parse('texDesc');
						}
						res.hasGlossTexture=this.parse('int8');
						if(res.hasGlossTexture==1)
						{
							res.glossTexture=this.parse('texDesc');
						}
						res.hasGlowTexture=this.parse('int8');
						if(res.hasGlowTexture==1)
						{
							res.glowTexture=this.parse('texDesc');
						}
						res.hasBumpMapTexture=this.parse('int8');
						if(res.hasBumpMapTexture==1)
						{
							res.bumpMapTexture=this.parse('texDesc');
							res.bumpMapLumaScale=this.parse('float32');
							res.bumpMapLumaOffset=this.parse('float32');
							res.bumpMapMatrix=this.parse('mat4F');
						}
						res.hasNormalTexture=this.parse('int8');
						if(res.hasNormalTexture==1)
						{
							res.normalTexture=this.parse('texDesc');
						}
						res.hasUnknownTexture=this.parse('int8');
						if(res.hasUnknownTexture==1)
						{
							res.unknownTexture=this.parse('texDesc');
							res.unknownFloat=this.parse('float32');
						}

						res.hasDecal0Texture=this.parse('int8');
						if(res.hasDecal0Texture==1)
						{
							res.decal0Texture=this.parse('texDesc');
						}
						if(res.textureCount>=10)
						{
							res.hasDecal1Texture=this.parse('int8');
							if(res.hasDecal1Texture==1)
							{
								res.decal1Texture=this.parse('texDesc');
							}
						}
						if(res.textureCount>=11)
						{
							res.hasDecal2Texture=this.parse('int8');
							if(res.hasDecal2Texture==1)
							{
								res.decal2Texture=this.parse('texDesc');
							}
						}
						if(res.textureCount>=12)
						{
							res.hasDecal3Texture=this.parse('int8');
							if(res.hasDecal3Texture==1)
							{
								res.decal3Texture=this.parse('texDesc');
							}
						}

						res.numShaderTextures=this.parse('uint32');
						res.shaderTextures=this.parse(['array','shaderTexture',res.numShaderTextures]);
					},
					shaderTexture:function(){
						var res={
							isUsed:null,
							textureData:null,
							mapIndex:null,
						};
						res.isUsed=this.parse('int8');
						if(res.isUsed==1)
						{
							res.textureData=this.parse('texDesc');
							res.mapIndex=this.parse('uint32');
						}
						return res;
					},
					texDesc:function(){
						var res={
							source:null,
							flags:null,
							unkShort:null,
							hasTextureTransform:null,
							translation:null,
							tiling:null,
							wRotation:null,
							transformType:null,
							centerOffset:null
						};
						res.source=this.parse('int32');
						res.flags=this.parse('int16');
						//res.unkShort=this.parse('int16');
						res.hasTextureTransform=this.parse('int8');
						if(res.hasTextureTransform==1)
						{
							res.translation=this.parse('uv');
							res.tiling=this.parse('uv');
							res.wRotation=this.parse('float32');
							res.transformType=this.parse('uint32');
							res.centerOffset=this.parse('uv');

						}

						return res;
					},



					header:{
						fileinfo:['string',30],
						version:['string',8],
						unkbyte:'uint8',
						version2:['array','uint8',4],
						unkbyte2:'uint8',
						unkint:'uint32',
						blockCount:'uint32',
						unkint2:'uint32',
						unkStrLen:'uint8',
						unkStr:['string',function(){return this.current.unkStrLen}],
						doNothingLen:'uint8',
						doNothingStr:['string',function(){return this.current.doNothingLen}],
						typeLength:'int8',
						type:['string',function(){return this.current.typeLength}]
					},
					blockNames:{
						nameCount:'uint16',
						names:['array','stringEntry',function(){return this.current.nameCount;}]
					},
					stringData:{
						stringCount:'uint32',
						unkInt:'uint32',
						strings:['array','stringEntry',function(){return this.current.stringCount;}],
						unkInt2:'uint32'
					},

					keyparser:function(type,inter){
						var k={
							time:this.parse('float32'),
							value:this.parse(type),
							forward:0,
							backward:0,
							tbc:0
						};
						if(inter==2)
						{
							k.forward=this.parse(type);
							k.backward=this.parse(type);
						}
						if(inter==3)
						{
							k.tbc=this.parse('vec3F');
						}
						return k;
					},

					keys:function(type){
						var res={
							numKeys:this.parse('uint32'),
							interpolation:0,
							keys:0
						};
						if(res.numKeys > 0)
						{
							res.interpolation=this.parse('uint32');
							res.keys=this.parse(['array',['keyparser',type,res.interpolation],res.numKeys]);
						}
						return res;

					},
					ntked:function(){
						var type='nameLookup';
						var res={
							name:this.parse('nameLookup'),
							numTextKeys:this.parse('uint32'),
							keys:0
						};
						if(res.numKeys > 0)
						{
							res.keys=this.parse(['array',['keyparser',type,res.interpolation],res.numKeys]);
						}
						return res;

					},
					nitd:function(){
						var res={
							numRotationKeys:0,//'uint32',
							rotationType:0,//'uint32',
							quaternionKeys:[],
							xyzRotations:[],//['array',['array',['keys','float32'],3],function(){return this.current.numRotationKeys}],
							translations:[],//['keys','vec3F'],
							scales:[]//['keys','float32']
						}
						res.numRotationKeys=this.parse('uint32');
						if(res.numRotationKeys > 0)
						{
							res.rotationType=this.parse('uint32');
							if(res.rotationType!=4)
							{
								if(res.rotationType==1)
								{
									res.quaternionKeys=this.parse(['array',['keyparser','quat',res.rotationType],res.numRotationKeys]);
								}else{
									console.log('rotation Type: '+res.rotationType+' not currently implemented!');
								}
							}else{
								res.xyzRotations=this.parse(['array',['keys','float32'],3]);
								console.log(res.xyzRotations);
							}
						}
						res.translations=this.parse(['keys','vec3F']);
						res.scales=this.parse(['keys','float32']);
						return res;
					},
					BSBound:{
						name:'nameLookup',
						center:'vec3F',
						dimensions:'vec3F',
					},
					BSFadeNode:{
						name:'nameLookup',
						numExtraDataList:'uint32',
						extraDataList:['array','int32',function(){return this.current.numExtraDataList;}],
						controller:'int32',
						flags:'uint16',
						unkShort:'uint16',
						translation:'vec3F',
						rotation:'mat9F',
						scale:'float32',
						numProperties:'uint32',
						properties:['array','int32',function(){return this.current.numProperties;}],
						collisionObject:'int32',
						numChildren:'uint32',
						children:['array','int32',function(){return this.current.numChildren;}],
						numEffects:'uint32',
						effects:['array','int32',function(){return this.current.numEffects;}]
					},
					BSXFlags:{
						name:'nameLookup',
						integerData:'uint32'
					},
					NiStringExtraData:{
						name:'nameLookup',
						stringData:'nameLookup'
					},
					NiFloatExtraData:{
						name:'nameLookup',
						floatData:'float32'
					},
					NiIntegerExtraData:{
						name:'nameLookup',
						integerData:'uint32'
					},
					bhkConvexVerticesShape:{
						material:'uint32',
						radius:'float32',
						unkFloats:['array','float32',6],
						numVertices:'uint32',
						vertices:['array','vec4F',function(){return this.current.numVertices;}],
						numNormals:'uint32',
						normals:['array','vec4F',function(){return this.current.numNormals;}]
					},
					bhkRigidBody:{
						shape:'int32',
						layer:'uint8',
						colFilter:'uint8',
						unkShort:'uint16',
						unkInt1:'int32',
						unkInt2:'int32',
						unkInts:['array','int32',3],
						collisionResponse:'uint8',
						unkByte:'uint8',
						procContactDelay:'uint16',
						unkShorts:['array','uint16',2],
						layerCopy:'uint8',
						colFilterCopy:'uint8',
						unkShorts2:['array','uint16',7],
						translation:'vec4F',
						rotation:'quat',
						linearVelocity:'vec4F',
						angularVelocity:'vec4F',
						intertia:'im12F',
						center:'vec4F',
						mass:'float32',
						linearDamping:'float32',
						angularDamping:'float32',
						friction:'float32',
						restitution:'float32',
						maxLinearVelocity:'float32',
						maxAngularVelocity:'float32',
						penetrationDepth:'float32',
						motionSystem:'uint8',
						deactivatorType:'uint8',
						solverDeactivation:'uint8',
						qualityType:'uint8',
						unkInt3:'uint32',
						unkInt4:'uint32',
						unkInt5:'uint32',
						numConstraints:'uint32',
						constraints:['array','int32',function(){return this.current.numConstraints;}],
						unkInt6:'uint32'
					},
					bhkRigidBodyT:
					{
						shape:'int32',
						layer:'uint8',
						colFilter:'uint8',
						unkShort:'uint16',
						unkInt1:'int32',
						unkInt2:'int32',
						unkInts:['array','int32',3],
						collisionResponse:'uint8',
						unkByte:'uint8',
						procContactDelay:'uint16',
						unkShorts:['array','uint16',2],
						layerCopy:'uint8',
						colFilterCopy:'uint8',
						unkShorts2:['array','uint16',7],
						translation:'vec4F',
						rotation:'quat',
						linearVelocity:'vec4F',
						angularVelocity:'vec4F',
						intertia:'im12F',
						center:'vec4F',
						mass:'float32',
						linearDamping:'float32',
						angularDamping:'float32',
						friction:'float32',
						restitution:'float32',
						maxLinearVelocity:'float32',
						maxAngularVelocity:'float32',
						penetrationDepth:'float32',
						motionSystem:'uint8',
						deactivatorType:'uint8',
						solverDeactivation:'uint8',
						qualityType:'uint8',
						unkInt3:'uint32',
						unkInt4:'uint32',
						unkInt5:'uint32',
						numConstraints:'uint32',
						constraints:['array','int32',function(){return this.current.numConstraints;}],
						unkInt6:'uint32'
					},
					bhkCollisionObject:{
						target:'int32',
						flags:'int16',
						body:'int32'
					},
					bhkBoxShape:{
						material:'uint32',
						radius:'float32',
						unkBytes:['array','uint8',8],
						dimensions:'vec3F',
						minimumSize:'float32'
					},
					NiTriStrips:{
						name:'nameLookup',
						numExtraDataList:'uint32',
						extraDataList:['array','int32',function(){return this.current.numExtraDataList;}],
						controller:'int32',
						flags:'int16',
						unkShort:'uint16',
						translation:'vec3F',
						rotation:'mat9F',
						scale:'float32',
						numProperties:'uint32',
						properties:['array','int32',function(){return this.current.numProperties;}],
						collisionObject:'int32',
						data:'int32',
						skinInstance:'int32',
						numMaterials:'uint32',
						materialNames:['array','nameLookup',function(){return this.current.numMaterials;}],
						materialExtra:['array','int32',function(){return this.current.numMaterials;}],
						activeMaterial:'int32',
						dirtyFlag:'int8'
					},
					NiTriShape:{
						name:'nameLookup',
						numExtraDataList:'uint32',
						extraDataList:['array','int32',function(){return this.current.numExtraDataList;}],
						controller:'int32',
						flags:'int16',
						unkShort:'uint16',
						translation:'vec3F',
						rotation:'mat9F',
						scale:'float32',
						numProperties:'uint32',
						properties:['array','int32',function(){return this.current.numProperties;}],
						collisionObject:'int32',
						data:'int32',
						skinInstance:'int32',
						numMaterials:'uint32',
						materialNames:['array','nameLookup',function(){return this.current.numMaterials;}],
						materialExtra:['array','int32',function(){return this.current.numMaterials;}],
						activeMaterial:'int32',
						dirtyFlag:'int8'
					},
					BSShaderPPLightingProperty:{
						name:'nameLookup',
						numExtraDataList:'uint32',
						extraDataList:['array','int32',function(){return this.current.numExtraDataList;}],
						controller:'int32',
						flags:'int16',
						shaderType:'uint32',
						shaderFlags:'uint32',
						unkInt:'int32',
						envmapScale:'float32',
						unkInt2:'int32',
						textureSet:'int32',
						unkFloat:'float32',
						refractionPeriod:'int32',
						unkFloat2:'float32',
						unkFloat3:'float32'
					},
					BSShaderTextureSet:{
						numTextures:'int32',
						textures:['array','stringEntry',function(){return this.current.numTextures;}]
					},
					NiMaterialProperty:{
						name:'nameLookup',
						numExtraDataList:'uint32',
						extraDataList:['array','int32',function(){return this.current.numExtraDataList;}],
						controller:'int32',
						specularColor:'color3F',
						emissiveColor:'color3F',
						glossiness:'float32',
						alpha:'float32',
						emitMult:'float32'
					},
					NiAlphaProperty:{
						name:'nameLookup',
						numExtraDataList:'uint32',
						extraDataList:['array','int32',function(){return this.current.numExtraDataList;}],
						controller:'int32',
						flags:'int16',
						threshold:'int8'
					},
					NiTriStripsData:{
						unkInt:'int32',
						numVertices:'uint16',
						keepFlags:'int8',
						compFlags:'int8',
						hasVerts:'int8',
						vertices:['array','vec3F',function(){return this.current.numVertices;}],
						bsNumUVSets:'uint16',
						hasNormals:'int8',
						normals:['array','vec3F',function(){return (this.current.numVertices*this.current.hasNormals);}],
						tangents:['array','vec3F',function(){return (this.current.hasNormals > 0 && this.current.bsNumUVSets > 0)?this.current.numVertices:0;}],
						bitangents:['array','vec3F',function(){return (this.current.hasNormals > 0 && this.current.bsNumUVSets > 0)?this.current.numVertices:0;}],
						center:'vec3F',
						radius:'float32',
						hasVertexColors:'int8',
						vertexColors:['array','color4F',function(){return (this.current.numVertices*this.current.hasVertexColors);}],
						uvSets:['array','uv',function(){return (this.current.bsNumUVSets > 0)?this.current.numVertices:0;}],
						consistencyFlags:'uint16',
						additionalData:'int32',
						numTriangles:'uint16',
						numStrips:'numStrips',
						stripLengths:'stripLengths',
						hasPoints:'hasPoints',
						points:'pointCollection'
					},
					matchgroups:{
						numVertices:'uint16',
						vertIndices:['array','uint16',function(){return this.current.numVertices}]
					},
					NiTriShapeData:{
						unkInt:'int32',
						numVertices:'uint16',
						keepFlags:'int8',
						compFlags:'int8',
						hasVerts:'int8',
						vertices:['array','vec3F',function(){return this.current.numVertices;}],
						bsNumUVSets:'uint16',
						hasNormals:'int8',
						normals:['array','vec3F',function(){return (this.current.numVertices*this.current.hasNormals);}],
						tangents:['array','vec3F',function(){return (this.current.hasNormals > 0 && this.current.bsNumUVSets > 0)?this.current.numVertices:0;}],
						bitangents:['array','vec3F',function(){return (this.current.hasNormals > 0 && this.current.bsNumUVSets > 0)?this.current.numVertices:0;}],
						center:'vec3F',
						radius:'float32',
						hasVertexColors:'int8',
						vertexColors:['array','color4F',function(){return (this.current.numVertices*this.current.hasVertexColors);}],
						uvSets:['array','uv',function(){return (this.current.bsNumUVSets > 0)?this.current.numVertices:0;}],
						consistencyFlags:'uint16',
						additionalData:'int32',
						numTriangles:'uint16',
						numTrianglePoints:'uint32',
						hasTriangles:'int8',
						triangles:['array',['array','uint16',3],function(){return this.current.numTriangles}],
						numMatchGroups:'uint16',
						matchGroups:['array','matchgroups',function(){return this.current.numMatchGroups}],
					},
					partition:{
						partFlag:'uint16',
						bodyPart:'uint16'
					},
					NiTextKeyExtraData:['ntked'],
					BSDismemberSkinInstance:{
						data:'int32',
						skinPartition:'int32',
						skeletonRoot:'int32',
						numBones:'uint32',
						bones:['array','int32',function(){return this.current.numBones}],
						numPartitions:'int32',
						partitions:['array','partition',function(){return this.current.numPartitions}]
					},
					vertexweight:{
						index:'uint16',
						weight:'float32'
					},
					bonelist:{
							rotation:'mat9F',
							translation:'vec3F',
							scale:'float32',
							boundingSphereOffset:'vec3F',
							boundingSphereRadius:'float32',
							numVertices:'uint16',
							vertexWeights:['array','vertexweight',function(){return this.current.numVertices}]
					},
					bonelistb:{
							rotation:'mat9F',
							translation:'vec3F',
							scale:'float32',
							boundingSphereOffset:'vec3F',
							boundingSphereRadius:'float32',
							numVertices:'uint16',
					},
					NiSkinData:{
						rotation:'mat9F',
						translation:'vec3F',
						scale:'float32',
						numBones:'uint32',
						hasVertWeights:'uint8',
						boneListb:['array','bonelistb',function(){return ((this.current.hasVertWeights==0)?this.current.numBones:0)}],
						boneList:['array','bonelist',function(){return (this.current.numBones*this.current.hasVertWeights)}]
					},
					strip:function(sl){
						var s=[];
						for(var i=0; i < sl.length;i++)
						{
							s.push(this.parse(['array','uint16',sl[i]]));
							
						}
						return s;
					},
					skinpartitionblock:function(){
						var spb={
							numVertices:"",
							numTriangles:"",
							numBones:"",
							numStrips:"",
							numWeightsPerVertex:"",
							bones:"",
							hasVertexMap:"",
							vertexMap:"",
							hasVertexWeights:"",
							vertexWeights:"",
							stripLengths:"",
							hasFaces:"",
							strips:[],
							triangles:[],
							hasBoneIndices:"",
							boneIndices:""
						}
							spb.numVertices=this.parse('uint16');
							spb.numTriangles=this.parse('uint16');
							spb.numBones=this.parse('uint16');
							spb.numStrips=this.parse('uint16');
							spb.numWeightsPerVertex=this.parse('uint16');
							spb.bones=this.parse(['array','uint16',function(){return spb.numBones}]);
							spb.hasVertexMap=this.parse('uint8');
							spb.vertexMap=this.parse(['array','uint16',function(){return (spb.numVertices * spb.hasVertexMap)}]);
							spb.hasVertexWeights=this.parse('uint8');
							spb.vertexWeights=this.parse(['array',['array','float32',function(){return (spb.numWeightsPerVertex * spb.hasVertexWeights)}],function(){return (spb.numVertices * spb.hasVertexWeights)}]);
							spb.stripLengths=this.parse(['array','uint16',function(){return spb.numStrips}]);
							spb.hasFaces=this.parse('uint8');
							if(spb.hasFaces==1 && spb.numStrips >0 )
							{
								for(var i=0; i < spb.numStrips;i++)
								{
							
									spb.strips.push(this.parse(['array','uint16',function(){return spb.stripLengths[i]}]));
								}
							}
							if(spb.hasFaces==1 && spb.numStrips== 0)
							{
								for(var i=0;i<spb.numTriangles;i++)
								{
									spb.triangles.push(this.parse(['array','uint16',3]))
								}
							}
							spb.hasBoneIndices=this.parse('uint8');
							spb.boneIndices=this.parse(['array',['array','uint8',function(){return (spb.numWeightsPerVertex * spb.hasBoneIndices)}],function(){return (spb.numVertices * spb.hasBoneIndices)}]);
							
							return spb;
					},
					NiSkinPartition:{
						numSkinPartitionBlocks:'uint32',
						skinPartitionBlocks:['array','skinpartitionblock',function(){return this.current.numSkinPartitionBlocks}]
					},
					NiNode:{
						name:'nameLookup',
						numExtraDataList:'uint32',
						extraDataList:['array','int32',function(){return this.current.numExtraDataList;}],
						controller:'int32',
						flags:'int16',
						unkShort:'uint16',
						translation:'vec3F',
						rotation:'mat9F',
						scale:'float32',
						numProperties:'uint32',
						properties:['array','int32',function(){return this.current.numProperties;}],
						collisionObject:'int32',
						numChildren:'uint32',
						children:['array','int32',function(){return this.current.numChildren;}],
						numEffects:'uint32',
						effects:['array','int32',function(){return this.current.numEffects;}],
					},
					NiTransformController:{
						nextController:'int32',
						flags:'int16',
						frequency:'float32',
						phase:'float32',
						startTime:'float32',
						stopTime:'float32',
						target:'int32',
						interpolator:'int32'
					},
					NiTransformInterpolator:{
						translation:'vec3F',
						rotation:'quat',
						scale:'float32',
						data:'int32'
					},
					NiTransformData:['nitd'],/*{
						numRotationKeys:'uint32',
						rotationType:'uint32',
						xyzRotations:['array',['array',['keys','float32'],3],function(){return this.current.numRotationKeys}],
						translations:['keys','vec3F'],
						scales:['keys','float32']
					},*/
					NiBillboardNode:{
						name:'nameLookup',
						numExtraDataList:'uint32',
						extraDataList:['array','int32',function(){return this.current.numExtraDataList;}],
						controller:'int32',
						flags:'int16',
						unkShort:'uint16',
						translation:'vec3F',
						rotation:'mat9F',
						scale:'float32',
						numProperties:'uint32',
						properties:['array','int32',function(){return this.current.numProperties;}],
						collisionObject:'int32',
						numChildren:'uint32',
						children:['array','int32',function(){return this.current.numChildren;}],
						numEffects:'uint32',
						effects:['array','int32',function(){return this.current.numEffects;}],
						billboardMode:'uint16'
					},
					NiVisController:{
						nextController:'int32',
						flags:'int16',
						frequency:'float32',
						phase:'float32',
						startTime:'float32',
						stopTime:'float32',
						target:'int32',
						interpolator:'int32'
					},
					NiAlphaController:{
						nextController:'int32',
						flags:'int16',
						frequency:'float32',
						phase:'float32',
						startTime:'float32',
						stopTime:'float32',
						target:'int32',
						interpolator:'int32'
					},
					NiBoolInterpolator:{
						boolValue:'int8',
						data:'uint32',
					},
					NiBoolData:{
						data:['keys','int8'],
					},
					NiStencilProperty:{
						name:'nameLookup',
						numExtraDataList:'uint32',
						extraDataList:['array','int32',function(){return this.current.numExtraDataList;}],
						controller:'int32',
						flags:'int16',
						stencilRef:'uint32',
						stencilMask:'int32'
					},
					NiMaterialColorController:{
						nextController:'int32',
						flags:'int16',
						frequency:'float32',
						phase:'float32',
						startTime:'float32',
						stopTime:'float32',
						target:'int32',
						interpolator:'int32',
						targetColor:'uint16',
					},
					NiPoint3Interpolator:{
						point3Value:'vec3F',
						data:'int32',
					},
					NiPosData:{
						data:['keys','vec3F'],
					},
					NiTexturingProperty:['texprop'],
					NiTextureTransformController:{
						nextController:'int32',
						flags:'int16',
						frequency:'float32',
						phase:'float32',
						startTime:'float32',
						stopTime:'float32',
						target:'int32',
						interpolator:'int32',
						unkbyte:'int8',
						textureSlot:'uint32',
						operation:'uint32',
					},
					NiFloatInterpolator:{
						floatValue:'float32',
						data:'uint32',
					},
					NiFloatData:{
						data:['keys','float32'],
					},
					NiSourceTexture:{
						name:'nameLookup',
						numExtraDataList:'uint32',
						extraDataList:['array','int32',function(){return this.current.numExtraDataList;}],
						controller:'int32',
						useExternal:'int8',
						fileName:'nameLookup',
						unkLink:'int32',
						pixelLayout:'uint32',
						useMipmaps:'uint32',
						alphaFormat:'uint32',
						isStatic:'int8',
						directRender:'int8',
						persistRenderData:'int8',
					},
					BSShaderNoLightingProperty:{
						name:['nameLookup'],
						numExtraDataList:'uint32',
						extraDataList:['array','int32',function(){return this.current.numExtraDataList;}],
						controller:'int32',
						flags:'int16',
						shaderType:'uint32',
						shaderFlags:'uint32',
						unkInt:'int32',
						envmapScale:'float32',
						unkInt2:'int32',
						fileName:'stringEntry',
						unkFloat1:'float32',
						unkFloat2:'float32',
						unkFloat3:'float32',
						unkFloat4:'float32',
					},

				});
				//console.log("parsing header");
				var header=_this.parser.parse('header');
				//console.log("parsing blockNames");
				var bn=_this.parser.parse('blockNames');
				var blockMap=[];
				for(var i=0; i < header.blockCount;i++)
				{
					blockMap.push(bn.names[_this.parser.parse('uint16')]);
				}
				//console.log("parsing blockSizes");
				var blockSizes=_this.parser.parse(['array','uint32',header.blockCount]);
				//console.log("parsing stringData");
				var stringTable=_this.parser.parse('stringData');
				nameTable=stringTable.strings;
				var blocks=[];
				var blockOff=[];
				var start=_this.parser.tell();
				blockOff.push(start);
				for(var i=0; i < blockSizes.length;i++)
				{
					start+=blockSizes[i];
					blockOff.push(start);
				}

				var i = 0, limit = header.blockCount, busy = false;
				var processor = setInterval(function()
				{
					if(!busy)
					{
						busy = true;
						if(closing==true)
						{

							clearInterval(processor);
						}
						_this.blockIndex=i;
						if(progress != null){
							var prog={
								'current':i,
								'total':header.blockCount
							};
							//var infoText="Parsing Format..."+Math.round((i/header.blockCount)*100)+"%";
							//$("#viewInfoText").text(infoText);
							progress(prog);
						}
						blocks.push(parseBlock(i,blockMap,blockOff,blocks));
						if(++i == limit)
						{
							clearInterval(processor);
							_this.nifobj={
							header:header,
							map:blockMap,
							blocks:blocks
							};
							var result={
								'nifobj':_this.nifobj
							};
							if(_this.callback != null){
								_this.callback(result);
							}
						}
						busy = false;
					}
				}, 5);
			//});
		//});
	};
	var parseBlock=function(i,blockMap,blockOff,blocks){
		output("parsing block: "+i+" "+blockMap[i]);
		output("Offset: "+_this.parser.tell()+" Expected: "+blockOff[i]);
		if(blockMap[i]=="BSShaderNoLightingProperty" || blockMap[i]=="NiSourceTexture")
		{
			var block=_this.parser.parse(blockMap[i]);
			return block;
		}else{
			return _this.parser.parse(blockMap[i]);
		}
		
		return block;
		
	}
	
	var output=function(content)
	{
		if(_this.debug ==true)
		{
			console.log(content);
		}
	};
	
};