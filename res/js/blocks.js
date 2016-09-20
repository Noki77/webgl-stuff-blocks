/*
* This file is part of the project webgl-stuff-blocks, licensed under the
* Creative Commons Attribution-NoDerivatives 4.0 International license.
* 
* Copyright (c) 2016 Justin Vogel <dernoki77@gmail.com>
* Copyright (c) contributors
* 
* You should have received a copy of the license along with this
* work. If not, see <http://creativecommons.org/licenses/by-nd/4.0/>.
* 
* THIS SOFTWARE IS PROVIDED UNDER THE TERMS
* OF THIS CREATIVE COMMONS PUBLIC LICENSE ("CCPL" OR "LICENSE").
* THE SOFTWARE IS PROTECTED BY COPYRIGHT AND/OR OTHER APPLICABLE LAW.
* ANY USE OF THE WORK OTHER THAN AS AUTHORIZED UNDER THIS LICENSE
* OR COPYRIGHT LAW IS PROHIBITED.
* 
* BY EXERCISING ANY RIGHTS TO THE SOFTWARE PROVIDED HERE,
* YOU ACCEPT AND AGREE TO BE BOUND BY THE TERMS OF THIS LICENSE.
* TO THE EXTENT THIS LICENSE MAY BE CONSIDERED TO BE A CONTRACT,
* THE LICENSOR GRANTS YOU THE RIGHTS CONTAINED HERE IN CONSIDERATION
* OF YOUR ACCEPTANCE OF SUCH TERMS AND CONDITIONS.
*/

var cvs = document.getElementById("cvs");

var box = document.getElementById("loader-content");
var boxLayer = document.getElementById("loading-layer");
var statusThing = document.getElementById("status");

var aspect;

var timeouts = [];
var intervals = [];

function error(text) {
    box.innerHTML = "<h3 style='color:red'>" + text + "</h3>";
}

function status(text) {
    statusThing.innerHTML = text;
}

var gl;

function initMatrix() {
    gl.clearColor(0, 0, 0, 1);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
    
    //gl.viewport(0, 0, );
    //gluPerspective(75, aspect, .1, 100);
    gl.viewport(0, 0, cvs.clientWidth, cvs.clientHeight);
}

function updateMatrix() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

function updateCanvas() {
    cvs.width = cvs.clientWidth;
    cvs.height = cvs.clientHeight;
    
    aspect = cvs.clientHeight / cvs.clientWidth;
}

function initGL() {
    gl = null;
    gl = cvs.getContext("webgl") || cvs.getContext("experimental-webgl") || cvs.getContext("webkit-3d") || cvs.getContext("moz-webgl");
    
    if (!gl) {
        error("Could not initialize WebGL!<br>(Maybe it's not supported by your browser?)");
        return;
    }
}

function loadFile(path) {
    var returnValue = undefined;
    var req = new XMLHttpRequest();
    req.open("GET", path, false);
    req.overrideMimeType("text/plain");
    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            returnValue = this.responseText;
        } else {
            returnValue = {error: "Failed to load resource '" + path + "'!", msg: "(" + this.readyState + "|" + this.status + ") " + this.responseText};
        }
    };
    req.send();
    return returnValue;
}

function loadShader(name, isFragment) {
    fs = isFragment != undefined ? isFragment : false;
    return loadFile("res/shaders/" + name + (fs ? ".fsh" : ".vsh"));
}

function stopAll(msg) {
    for (var j in timeouts) {
        clearTimeout(timeouts[j]);
    }
    
    for (var j in intervals) {
        clearInterval(intervals[j]);
    }
    
    throw new Error(msg === undefined ? "Stopped, no reason given." : "Stopped: " + msg);
}

function checkResource(loadedResource) {
    if (loadedResource.error !== undefined) {
        error(loadedResource.error + "<br>" + loadedResource.msg);
        stopAll(loadedResource.error);
        return;
    }
    
    return loadedResource;
}

function timeout(functionToExecute, time) {
    var test = setTimeout(functionToExecute, time);
    timeouts.push(test);
}

function interval(functionToExecute, time) {
    intervals.push(setInterval(functionToExecute, time));
}

function setupShaders(vertexShader, fragmentShader) {
    var vshader = gl.createShader(gl.VERTEX_SHADER);
    var fshader = gl.createShader(gl.FRAGMENT_SHADER);
    
    gl.shaderSource(vshader, vertexShader);
    gl.shaderSource(fshader, fragmentShader);
    
    gl.compileShader(vshader);
    if (!gl.getShaderParameter(vshader, gl.COMPILE_STATUS)) {
        error("Failed to compile shader!" + gl.getShaderInfoLog(vshader));
        stopAll("Failed to compile shader");
    }
    
    gl.compileShader(fshader);
    if (!gl.getShaderParameter(fshader, gl.COMPILE_STATUS)) {
        error("Failed to compile shader!" + gl.getShaderInfoLog(fshader));
        stopAll("Failed to compile shader");
    }
    
    var program = gl.createProgram();
    gl.attachShader(program, vshader);
    gl.attachShader(program, fshader);
    
    return program;
}

function bindRectShader() {
    var program_rect = loadAndSetupShader("rainbow_rect");
    linkProgram(program_rect);
    
    var posAttribLoc = gl.getAttribLocation(program_rect, "vertexPosition");
    gl.vertexAttribPointer(posAttribLoc, 2, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
    var colorAttribLoc = gl.getAttribLocation(program_rect, "vertexColor");
    gl.vertexAttribPointer(colorAttribLoc, 3, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
    
    gl.enableVertexAttribArray(posAttribLoc);
    gl.enableVertexAttribArray(colorAttribLoc);
    
    gl.useProgram(program_rect);
}

function bind3D() {
    var program_3d = loadAndSetupShader("rainbow_rect_3d");
    linkProgram(program_3d);
    
    var posAttribLoc = gl.getAttribLocation(program_3d, "vertexPosition");
    gl.vertexAttribPointer(posAttribLoc, 3, gl.FLOAT, gl.FALSE, 6 * Float32Array.BYTES_PER_ELEMENT, 0);
    var colorAttribLoc = gl.getAttribLocation(program_3d, "vertexColor");
    gl.vertexAttribPointer(colorAttribLoc, 3, gl.FLOAT, gl.FALSE, 6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
    
    gl.enableVertexAttribArray(posAttribLoc);
    gl.enableVertexAttribArray(colorAttribLoc);
    
    gl.useProgram(program_3d);
}

function bind3DTransparent() {
    var program_3d_transparent = loadAndSetupShader("rainbow_rect_3d_transparence");
    linkProgram(program_3d_transparent);
    
    var posAttribLoc = gl.getAttribLocation(program_3d_transparent, "vertexPosition");
    gl.vertexAttribPointer(posAttribLoc, 3, gl.FLOAT, gl.FALSE, 7 * Float32Array.BYTES_PER_ELEMENT, 0);
    var colorAttribLoc = gl.getAttribLocation(program_3d_transparent, "vertexColor");
    gl.vertexAttribPointer(colorAttribLoc, 4, gl.FLOAT, gl.FALSE, 7 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
    
    gl.enableVertexAttribArray(posAttribLoc);
    gl.enableVertexAttribArray(colorAttribLoc);
    
    gl.useProgram(program_3d_transparent);
}

function startRendering() {
    /*var obj = new RenderableFace([
        -.5, -.5,   1, 0, 0,
        .5, -.5,    1, 1, 0,
        .5, .5,     0, 0, 1,
        -.5, .5,    0, 1, 0,
        -.5, -.5,   1, 0, 0,
        .5, .5,     0, 0, 1
    ]);
    
    obj.bind();
    
    bindRectShader();
    */
    
    status("Binding transparent cube");
    var cube = new TransparentCube();
    cube.bind();
    
    status("Loading shaders");
    bind3DTransparent();
    
    gl.drawArrays(gl.TRIANGLES, 0, 36);
}

function loadAndSetupShader(name) {
    var vertex = checkResource(loadShader(name));
    var fragment = checkResource(loadShader(name, true));

    var program = setupShaders(vertex, fragment);
    
    return program;
}

function linkProgram(program) {
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            error("Failed to link program!" + gl.getProgramInfoLog(program));
            stopAll("Failed to link shader program");
        }
}

updateCanvas();
cvs.onresize = function() { updateCanvas(); };
timeout(function() {
    status("Initializing OpenGL");
    initGL();
    
    if (!gl) {
        return;
    }
    
    status("Initializing viewport");
    initMatrix();
    timeout(function () {
        status("Starting rendering");
        startRendering();
        
        timeout(function () {
            status("Finished loading");
            boxLayer.classList.add("out");
            timeout(function () {
                boxLayer.style.display = "none";
            }, 1500);
        }, 20);
    }, 20);
}, 1000);
