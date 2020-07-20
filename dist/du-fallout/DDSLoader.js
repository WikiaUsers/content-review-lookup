//importScript("MediaWiki:Squish.js");
/*
* @author mrdoob / http://mrdoob.com/
*/
if(THREE != undefined){
 
THREE.DDSLoader = function () {
	this._parser = THREE.DDSLoader.parse;
};
 
THREE.DDSLoader.prototype = Object.create( THREE.CompressedTextureLoader.prototype );
 
THREE.DDSLoader.parse = function ( buffer, loadMipmaps ) {
 
	var dds = { mipmaps: [], width: 0, height: 0, format: null, mipmapCount: 1 };
 
	// Adapted from @toji's DDS utils
	//	https://github.com/toji/webgl-texture-utils/blob/master/texture-util/dds.js
 
	// All values and structures referenced from:
	// http://msdn.microsoft.com/en-us/library/bb943991.aspx/
 
	var DDS_MAGIC = 0x20534444;
 
	var DDSD_CAPS = 0x1,
	DDSD_HEIGHT = 0x2,
	DDSD_WIDTH = 0x4,
	DDSD_PITCH = 0x8,
	DDSD_PIXELFORMAT = 0x1000,
	DDSD_MIPMAPCOUNT = 0x20000,
	DDSD_LINEARSIZE = 0x80000,
	DDSD_DEPTH = 0x800000;
 
	var DDSCAPS_COMPLEX = 0x8,
	DDSCAPS_MIPMAP = 0x400000,
	DDSCAPS_TEXTURE = 0x1000;
 
	var DDSCAPS2_CUBEMAP = 0x200,
	DDSCAPS2_CUBEMAP_POSITIVEX = 0x400,
	DDSCAPS2_CUBEMAP_NEGATIVEX = 0x800,
	DDSCAPS2_CUBEMAP_POSITIVEY = 0x1000,
	DDSCAPS2_CUBEMAP_NEGATIVEY = 0x2000,
	DDSCAPS2_CUBEMAP_POSITIVEZ = 0x4000,
	DDSCAPS2_CUBEMAP_NEGATIVEZ = 0x8000,
	DDSCAPS2_VOLUME = 0x200000;
 
	var DDPF_ALPHAPIXELS = 0x1,
	DDPF_ALPHA = 0x2,
	DDPF_FOURCC = 0x4,
	DDPF_RGB = 0x40,
	DDPF_YUV = 0x200,
	DDPF_LUMINANCE = 0x20000;
 
	function fourCCToInt32( value ) {
 
		return value.charCodeAt(0) +
		(value.charCodeAt(1) << 8) +
		(value.charCodeAt(2) << 16) +
		(value.charCodeAt(3) << 24);
 
	}
 
	function int32ToFourCC( value ) {
 
		return String.fromCharCode(
		value & 0xff,
		(value >> 8) & 0xff,
		(value >> 16) & 0xff,
		(value >> 24) & 0xff
		);
	}
 
	function loadARGBMip( buffer, dataOffset, width, height ) {
		var dataLength = width*height*4;
		var srcBuffer = new Uint8Array( buffer, dataOffset, dataLength );
		var byteArray = new Uint8Array( dataLength );
		var dst = 0;
		var src = 0;
		for ( var y = 0; y < height; y++ ) {
			for ( var x = 0; x < width; x++ ) {
				var b = srcBuffer[src]; src++;
				var g = srcBuffer[src]; src++;
				var r = srcBuffer[src]; src++;
				var a = srcBuffer[src]; src++;
				byteArray[dst] = r; dst++;	//r
				byteArray[dst] = g; dst++;	//g
				byteArray[dst] = b; dst++;	//b
				byteArray[dst] = a; dst++;	//a
			}
		}
		return byteArray;
	}
 
	var FOURCC_DXT1 = fourCCToInt32("DXT1");
	var FOURCC_DXT3 = fourCCToInt32("DXT3");
	var FOURCC_DXT5 = fourCCToInt32("DXT5");
 
	var headerLengthInt = 31; // The header length in 32 bit ints
 
	// Offsets into the header array
 
	var off_magic = 0;
 
	var off_size = 1;
	var off_flags = 2;
	var off_height = 3;
	var off_width = 4;
 
	var off_mipmapCount = 7;
 
	var off_pfFlags = 20;
	var off_pfFourCC = 21;
	var off_RGBBitCount = 22;
	var off_RBitMask = 23;
	var off_GBitMask = 24;
	var off_BBitMask = 25;
	var off_ABitMask = 26;
 
	var off_caps = 27;
	var off_caps2 = 28;
	var off_caps3 = 29;
	var off_caps4 = 30;
 
	// Parse header
 
	var header = new Int32Array( buffer, 0, headerLengthInt );
 
	if ( header[ off_magic ] !== DDS_MAGIC ) {
 
		console.error( 'THREE.DDSLoader.parse: Invalid magic number in DDS header.' );
		return dds;
 
	}
 
	if ( ! header[ off_pfFlags ] & DDPF_FOURCC ) {
 
		console.error( 'THREE.DDSLoader.parse: Unsupported format, must contain a FourCC code.' );
		return dds;
 
	}
 
	var blockBytes;
 
	var fourCC = header[ off_pfFourCC ];
 
	var isRGBAUncompressed = false;
 
	switch ( fourCC ) {
 
		case FOURCC_DXT1:
		blockBytes = 8;
		dds.format = THREE.RGB_S3TC_DXT1_Format;
		break;
 
		case FOURCC_DXT3:
 
		blockBytes = 16;
		dds.format = THREE.RGBA_S3TC_DXT3_Format;
		break;
 
		case FOURCC_DXT5:
 
		blockBytes = 16;
		dds.format = THREE.RGBA_S3TC_DXT5_Format;
		break;
 
		default:
 
		if( header[off_RGBBitCount] ==32
		&& header[off_RBitMask]&0xff0000
		&& header[off_GBitMask]&0xff00
		&& header[off_BBitMask]&0xff
		&& header[off_ABitMask]&0xff000000  ) {
			isRGBAUncompressed = true;
			blockBytes = 64;
			dds.format = THREE.RGBAFormat;
		} else {
			console.error( 'THREE.DDSLoader.parse: Unsupported FourCC code ', int32ToFourCC( fourCC ) );
			return dds;
		}
	}
 
	dds.mipmapCount = 1;
 
	if ( header[ off_flags ] & DDSD_MIPMAPCOUNT && loadMipmaps !== false ) {
 
		dds.mipmapCount = Math.max( 1, header[ off_mipmapCount ] );
 
	}
 
	//TODO: Verify that all faces of the cubemap are present with DDSCAPS2_CUBEMAP_POSITIVEX, etc.
 
	dds.isCubemap = header[ off_caps2 ] & DDSCAPS2_CUBEMAP ? true : false;
 
	dds.width = header[ off_width ];
	dds.height = header[ off_height ];
 
	var dataOffset = header[ off_size ] + 4;
 
	// Extract mipmaps buffers
 
	var width = dds.width;
	var height = dds.height;
 
	var faces = dds.isCubemap ? 6 : 1;
 
	for ( var face = 0; face < faces; face ++ ) {
 
		for ( var i = 0; i < dds.mipmapCount; i ++ ) {
 
			if( isRGBAUncompressed ) {
				var byteArray = loadARGBMip( buffer, dataOffset, width, height );
				var dataLength = byteArray.length;
			} else {
				var dataLength = Math.max( 4, width ) / 4 * Math.max( 4, height ) / 4 * blockBytes;
				var byteArray = new Uint8Array( buffer, dataOffset, dataLength );
			}
 
			var mipmap = { "data": byteArray, "width": width, "height": height };
			dds.mipmaps.push( mipmap );
 
			dataOffset += dataLength;
 
			width = Math.max( width * 0.5, 1 );
			height = Math.max( height * 0.5, 1 );
 
		}
 
		width = dds.width;
		height = dds.height;
 
	}
	var texArray=[];
	
		var texture = new THREE.CompressedTexture();
		var images=[];
		texture.image=images;
 		var texDatas = dds;
 		
 		
 		
		
		if ( texDatas.isCubemap ) {

			var faces = texDatas.mipmaps.length / texDatas.mipmapCount;

			for ( var f = 0; f < faces; f ++ ) {

				images[ f ] = { mipmaps : [] };

				for ( var i = 0; i < texDatas.mipmapCount; i ++ ) {

					images[ f ].mipmaps.push( texDatas.mipmaps[ f * texDatas.mipmapCount + i ] );
					images[ f ].format = texDatas.format;
					images[ f ].width = texDatas.width;
					images[ f ].height = texDatas.height;

				}

			}

		} else {

			texture.image.width = texDatas.width;
			texture.image.height = texDatas.height;
			texture.mipmaps = texDatas.mipmaps;

		}

		if ( texDatas.mipmapCount === 1 ) {

			texture.minFilter = THREE.LinearFilter;

		}

		texture.format = texDatas.format;
		texture.wrapS=THREE.RepeatWrapping;
		texture.wrapT=THREE.RepeatWrapping;
		texture.needsUpdate = true;
		return texture;
	
	
	
};
}
function b64ToUint6 (nChr) {
 
	return nChr > 64 && nChr < 91 ?
	nChr - 65
	: nChr > 96 && nChr < 123 ?
	nChr - 71
	: nChr > 47 && nChr < 58 ?
	nChr + 4
	: nChr === 43 ?
	62
	: nChr === 47 ?
	63
	:
	0;
 
}
function base64DecToArr (sBase64, nBlocksSize) {
 
	var
	sB64Enc = sBase64.replace(/[^A-Za-z0-9\+\/]/g, ""), nInLen = sB64Enc.length,
	nOutLen = nBlocksSize ? Math.ceil((nInLen * 3 + 1 >> 2) / nBlocksSize) * nBlocksSize : nInLen * 3 + 1 >> 2, taBytes = new Uint8Array(nOutLen);
 
	for (var nMod3, nMod4, nUint24 = 0, nOutIdx = 0, nInIdx = 0; nInIdx < nInLen; nInIdx++) {
		nMod4 = nInIdx & 3;
		nUint24 |= b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << 18 - 6 * nMod4;
		if (nMod4 === 3 || nInLen - nInIdx === 1) {
			for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
				taBytes[nOutIdx] = nUint24 >>> (16 >>> nMod3 & 24) & 255;
			}
			nUint24 = 0;
 
		}
	}
 
	return taBytes;
}

function str2ab(str) {
  var buf = new ArrayBuffer(str.length); // 2 bytes for each char
  var bufView = new Uint8Array(buf);
  for (var i=0, strLen=str.length; i<strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}


/**
 * @author Eberhard Graether / http://egraether.com/
 * @author Mark Lundin 	/ http://mark-lundin.com
 */
 
THREE.TrackballControls = function ( object, domElement ) {
 
	var _this = this;
	var STATE = { NONE: -1, ROTATE: 0, ZOOM: 4, PAN: 1, TOUCH_ROTATE: 3, TOUCH_ZOOM_PAN: 4 };
 
	this.object = object;
	this.domElement = ( domElement !== undefined ) ? domElement : document;
 
	// API
 
	this.enabled = true;
 
	this.screen = { left: 0, top: 0, width: 0, height: 0 };
 
	this.rotateSpeed = 1.0;
	this.zoomSpeed = 1.2;
	this.panSpeed = 0.3;
 
	this.noRotate = false;
	this.noZoom = false;
	this.noPan = false;
	this.noRoll = false;
 
	this.staticMoving = false;
	this.dynamicDampingFactor = 0.2;
 
	this.minDistance = 0;
	this.maxDistance = Infinity;
 
	this.keys = [ 65 /*A*/, 83 /*S*/, 68 /*D*/ ];
 
	// internals
 
	this.target = new THREE.Vector3();
 
	var EPS = 0.000001;
 
	var lastPosition = new THREE.Vector3();
 
	var _state = STATE.NONE,
	_prevState = STATE.NONE,
 
	_eye = new THREE.Vector3(),
 
	_rotateStart = new THREE.Vector3(),
	_rotateEnd = new THREE.Vector3(),
 
	_zoomStart = new THREE.Vector2(),
	_zoomEnd = new THREE.Vector2(),
 
	_touchZoomDistanceStart = 0,
	_touchZoomDistanceEnd = 0,
 
	_panStart = new THREE.Vector2(),
	_panEnd = new THREE.Vector2();
 
	// for reset
 
	this.target0 = this.target.clone();
	this.position0 = this.object.position.clone();
	this.up0 = this.object.up.clone();
 
	// events
 
	var changeEvent = { type: 'change' };
	var startEvent = { type: 'start'};
	var endEvent = { type: 'end'};
 
 
	// methods
 
	this.handleResize = function () {
 
		if ( this.domElement === document ) {
 
			this.screen.left = 0;
			this.screen.top = 0;
			this.screen.width = window.innerWidth;
			this.screen.height = window.innerHeight;
 
		} else {
 
			var box = this.domElement.getBoundingClientRect();
			// adjustments come from similar code in the jquery offset() function
			var d = this.domElement.ownerDocument.documentElement;
			this.screen.left = box.left + window.pageXOffset - d.clientLeft;
			this.screen.top = box.top + window.pageYOffset - d.clientTop;
			this.screen.width = box.width;
			this.screen.height = box.height;
 
		}
 
	};
 
	this.handleEvent = function ( event ) {
 
		if ( typeof this[ event.type ] == 'function' ) {
 
			this[ event.type ]( event );
 
		}
 
	};
 
	var getMouseOnScreen = ( function () {
 
		var vector = new THREE.Vector2();
 
		return function ( pageX, pageY ) {
 
			vector.set(
				( pageX - _this.screen.left ) / _this.screen.width,
				( pageY - _this.screen.top ) / _this.screen.height
			);
 
			return vector;
 
		};
 
	}() );
 
	var getMouseProjectionOnBall = ( function () {
 
		var vector = new THREE.Vector3();
		var objectUp = new THREE.Vector3();
		var mouseOnBall = new THREE.Vector3();
 
		return function ( pageX, pageY ) {
 
			mouseOnBall.set(
				( pageX - _this.screen.width * 0.5 - _this.screen.left ) / (_this.screen.width*.5),
				( _this.screen.height * 0.5 + _this.screen.top - pageY ) / (_this.screen.height*.5),
				0.0
			);
 
			var length = mouseOnBall.length();
 
			if ( _this.noRoll ) {
 
				if ( length < Math.SQRT1_2 ) {
 
					mouseOnBall.z = Math.sqrt( 1.0 - length*length );
 
				} else {
 
					mouseOnBall.z = .5 / length;
 
				}
 
			} else if ( length > 1.0 ) {
 
				mouseOnBall.normalize();
 
			} else {
 
				mouseOnBall.z = Math.sqrt( 1.0 - length * length );
 
			}
 
			_eye.copy( _this.object.position ).sub( _this.target );
 
			vector.copy( _this.object.up ).setLength( mouseOnBall.y )
			vector.add( objectUp.copy( _this.object.up ).cross( _eye ).setLength( mouseOnBall.x ) );
			vector.add( _eye.setLength( mouseOnBall.z ) );
 
			return vector;
 
		};
 
	}() );
 
	this.rotateCamera = (function(){
 
		var axis = new THREE.Vector3(),
			quaternion = new THREE.Quaternion();
 
 
		return function () {
 
			var angle = Math.acos( _rotateStart.dot( _rotateEnd ) / _rotateStart.length() / _rotateEnd.length() );
 
			if ( angle ) {
 
				axis.crossVectors( _rotateStart, _rotateEnd ).normalize();
 
				angle *= _this.rotateSpeed;
 
				quaternion.setFromAxisAngle( axis, -angle );
 
				_eye.applyQuaternion( quaternion );
				_this.object.up.applyQuaternion( quaternion );
 
				_rotateEnd.applyQuaternion( quaternion );
 
				if ( _this.staticMoving ) {
 
					_rotateStart.copy( _rotateEnd );
 
				} else {
 
					quaternion.setFromAxisAngle( axis, angle * ( _this.dynamicDampingFactor - 1.0 ) );
					_rotateStart.applyQuaternion( quaternion );
 
				}
 
			}
		}
 
	}());
 
	this.zoomCamera = function () {
 
		if ( _state === STATE.TOUCH_ZOOM_PAN ) {
 
			var factor = _touchZoomDistanceStart / _touchZoomDistanceEnd;
			_touchZoomDistanceStart = _touchZoomDistanceEnd;
			_eye.multiplyScalar( factor );
 
		} else {
 
			var factor = 1.0 + ( _zoomEnd.y - _zoomStart.y ) * _this.zoomSpeed;
 
			if ( factor !== 1.0 && factor > 0.0 ) {
 
				_eye.multiplyScalar( factor );
 
				if ( _this.staticMoving ) {
 
					_zoomStart.copy( _zoomEnd );
 
				} else {
 
					_zoomStart.y += ( _zoomEnd.y - _zoomStart.y ) * this.dynamicDampingFactor;
 
				}
 
			}
 
		}
 
	};
 
	this.panCamera = (function(){
 
		var mouseChange = new THREE.Vector2(),
			objectUp = new THREE.Vector3(),
			pan = new THREE.Vector3();
 
		return function () {
 
			mouseChange.copy( _panEnd ).sub( _panStart );
 
			if ( mouseChange.lengthSq() ) {
 
				mouseChange.multiplyScalar( _eye.length() * _this.panSpeed );
 
				pan.copy( _eye ).cross( _this.object.up ).setLength( mouseChange.x );
				pan.add( objectUp.copy( _this.object.up ).setLength( mouseChange.y ) );
 
				_this.object.position.add( pan );
				_this.target.add( pan );
 
				if ( _this.staticMoving ) {
 
					_panStart.copy( _panEnd );
 
				} else {
 
					_panStart.add( mouseChange.subVectors( _panEnd, _panStart ).multiplyScalar( _this.dynamicDampingFactor ) );
 
				}
 
			}
		}
 
	}());
 
	this.checkDistances = function () {
 
		if ( !_this.noZoom || !_this.noPan ) {
 
			if ( _eye.lengthSq() > _this.maxDistance * _this.maxDistance ) {
 
				_this.object.position.addVectors( _this.target, _eye.setLength( _this.maxDistance ) );
 
			}
 
			if ( _eye.lengthSq() < _this.minDistance * _this.minDistance ) {
 
				_this.object.position.addVectors( _this.target, _eye.setLength( _this.minDistance ) );
 
			}
 
		}
 
	};
 
	this.update = function () {
 
		_eye.subVectors( _this.object.position, _this.target );
 
		if ( !_this.noRotate ) {
 
			_this.rotateCamera();
 
		}
 
		if ( !_this.noZoom ) {
 
			_this.zoomCamera();
 
		}
 
		if ( !_this.noPan ) {
 
			_this.panCamera();
 
		}
 
		_this.object.position.addVectors( _this.target, _eye );
 
		_this.checkDistances();
 
		_this.object.lookAt( _this.target );
 
		if ( lastPosition.distanceToSquared( _this.object.position ) > EPS ) {
 
			_this.dispatchEvent( changeEvent );
 
			lastPosition.copy( _this.object.position );
 
		}
 
	};
 
	this.reset = function () {
 
		_state = STATE.NONE;
		_prevState = STATE.NONE;
 
		_this.target.copy( _this.target0 );
		_this.object.position.copy( _this.position0 );
		_this.object.up.copy( _this.up0 );
 
		_eye.subVectors( _this.object.position, _this.target );
 
		_this.object.lookAt( _this.target );
 
		_this.dispatchEvent( changeEvent );
 
		lastPosition.copy( _this.object.position );
 
	};
 
	// listeners
 
	function keydown( event ) {
 
		if ( _this.enabled === false ) return;
 
		window.removeEventListener( 'keydown', keydown );
 
		_prevState = _state;
 
		if ( _state !== STATE.NONE ) {
 
			return;
 
		} else if ( event.keyCode === _this.keys[ STATE.ROTATE ] && !_this.noRotate ) {
 
			_state = STATE.ROTATE;
 
		} else if ( event.keyCode === _this.keys[ STATE.ZOOM ] && !_this.noZoom ) {
 
			_state = STATE.ZOOM;
 
		} else if ( event.keyCode === _this.keys[ STATE.PAN ] && !_this.noPan ) {
 
			_state = STATE.PAN;
 
		}
 
	}
 
	function keyup( event ) {
 
		if ( _this.enabled === false ) return;
 
		_state = _prevState;
 
		window.addEventListener( 'keydown', keydown, false );
 
	}
 
	function mousedown( event ) {
 
		if ( _this.enabled === false ) return;
 
		//event.preventDefault();
		//event.stopPropagation();
 
		if ( _state === STATE.NONE ) {
 
			_state = event.button;
 
		}
 
		if ( _state === STATE.ROTATE && !_this.noRotate ) {
 
			_rotateStart.copy( getMouseProjectionOnBall( event.pageX, event.pageY ) );
			_rotateEnd.copy( _rotateStart );
 
		} else if ( _state === STATE.ZOOM && !_this.noZoom ) {
 
			_zoomStart.copy( getMouseOnScreen( event.pageX, event.pageY ) );
			_zoomEnd.copy(_zoomStart);
 
		} else if ( _state === STATE.PAN && !_this.noPan ) {
 
			_panStart.copy( getMouseOnScreen( event.pageX, event.pageY ) );
			_panEnd.copy(_panStart)
 
		}
 
		document.addEventListener( 'mousemove', mousemove, false );
		document.addEventListener( 'mouseup', mouseup, false );
 
		_this.dispatchEvent( startEvent );
 
	}
 
	function mousemove( event ) {
 
		if ( _this.enabled === false ) return;
 
		event.preventDefault();
		event.stopPropagation();
 
		if ( _state === STATE.ROTATE && !_this.noRotate ) {
 
			_rotateEnd.copy( getMouseProjectionOnBall( event.pageX, event.pageY ) );
 
		} else if ( _state === STATE.ZOOM && !_this.noZoom ) {
 
			_zoomEnd.copy( getMouseOnScreen( event.pageX, event.pageY ) );
 
		} else if ( _state === STATE.PAN && !_this.noPan ) {
 
			_panEnd.copy( getMouseOnScreen( event.pageX, event.pageY ) );
 
		}
 
	}
 
	function mouseup( event ) {
 
		if ( _this.enabled === false ) return;
 
		event.preventDefault();
		event.stopPropagation();
 
		_state = STATE.NONE;
 
		document.removeEventListener( 'mousemove', mousemove );
		document.removeEventListener( 'mouseup', mouseup );
		_this.dispatchEvent( endEvent );
 
	}
 
	function mousewheel( event ) {
 
		if ( _this.enabled === false ) return;
 
		//event.preventDefault();
		//event.stopPropagation();
 
		var delta = 0;
 
		if ( event.wheelDelta ) { // WebKit / Opera / Explorer 9
 
			delta = event.wheelDelta / 40;
 
		} else if ( event.detail ) { // Firefox
 
			delta = - event.detail / 3;
 
		}
 
		_zoomStart.y += delta * 0.01;
		_this.dispatchEvent( startEvent );
		_this.dispatchEvent( endEvent );
 
	}
 
	function touchstart( event ) {
 
		if ( _this.enabled === false ) return;
 
		switch ( event.touches.length ) {
 
			case 1:
				_state = STATE.TOUCH_ROTATE;
				_rotateStart.copy( getMouseProjectionOnBall( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY ) );
				_rotateEnd.copy( _rotateStart );
				break;
 
			case 2:
				_state = STATE.TOUCH_ZOOM_PAN;
				var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
				var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
				_touchZoomDistanceEnd = _touchZoomDistanceStart = Math.sqrt( dx * dx + dy * dy );
 
				var x = ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX ) / 2;
				var y = ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY ) / 2;
				_panStart.copy( getMouseOnScreen( x, y ) );
				_panEnd.copy( _panStart );
				break;
 
			default:
				_state = STATE.NONE;
 
		}
		_this.dispatchEvent( startEvent );
 
 
	}
 
	function touchmove( event ) {
 
		if ( _this.enabled === false ) return;
 
		event.preventDefault();
		event.stopPropagation();
 
		switch ( event.touches.length ) {
 
			case 1:
				_rotateEnd.copy( getMouseProjectionOnBall( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY ) );
				break;
 
			case 2:
				var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
				var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
				_touchZoomDistanceEnd = Math.sqrt( dx * dx + dy * dy );
 
				var x = ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX ) / 2;
				var y = ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY ) / 2;
				_panEnd.copy( getMouseOnScreen( x, y ) );
				break;
 
			default:
				_state = STATE.NONE;
 
		}
 
	}
 
	function touchend( event ) {
 
		if ( _this.enabled === false ) return;
 
		switch ( event.touches.length ) {
 
			case 1:
				_rotateEnd.copy( getMouseProjectionOnBall( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY ) );
				_rotateStart.copy( _rotateEnd );
				break;
 
			case 2:
				_touchZoomDistanceStart = _touchZoomDistanceEnd = 0;
 
				var x = ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX ) / 2;
				var y = ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY ) / 2;
				_panEnd.copy( getMouseOnScreen( x, y ) );
				_panStart.copy( _panEnd );
				break;
 
		}
 
		_state = STATE.NONE;
		_this.dispatchEvent( endEvent );
 
	}
 
	this.domElement.addEventListener( 'contextmenu', function ( event ) { if ( _this.enabled === false ) return; event.preventDefault(); }, false );
 
	this.domElement.addEventListener( 'mousedown', mousedown, false );
 
	this.domElement.addEventListener( 'mousewheel', mousewheel, false );
	this.domElement.addEventListener( 'DOMMouseScroll', mousewheel, false ); // firefox
 
	this.domElement.addEventListener( 'touchstart', touchstart, false );
	this.domElement.addEventListener( 'touchend', touchend, false );
	this.domElement.addEventListener( 'touchmove', touchmove, false );
 
	window.addEventListener( 'keydown', keydown, false );
	window.addEventListener( 'keyup', keyup, false );
 
	this.handleResize();
 
	// force an update at start
	this.update();
 
};
 
THREE.TrackballControls.prototype = Object.create( THREE.EventDispatcher.prototype );
THREE.TrackballControls.prototype.constructor = THREE.TrackballControls;