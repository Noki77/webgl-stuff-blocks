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

function RenderableFace(vertices) {
    return {
        bind: function () {
            var buf = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buf);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        }
    };
}

function RenderableObject(faces) {
    return {
        bind: function() {
            for (face in faces) {
                face.bind();
            }
        }
    }
}

function Cube() {
    var faces = [
        new RenderableFace ([
            -.5, -.5, .5,   1, 0, 0,
            .5, -.5, .5,    1, 1, 0,
            .5, .5, .5,     0, 0, 1,   // FRONT
            -.5, .5, .5,    0, 1, 0,
            -.5, -.5, .5,   1, 0, 0,
            .5, .5, .5,     0, 0, 1
        ]), new RenderableFace ([
            -.5, -.5, -.5,  1, 0, 0,
            .5, -.5, -.5,   1, 1, 0,
            .5, .5, -.5,    0, 0, 1,  // BACK
            -.5, .5, -.5,   0, 1, 0,
            -.5, -.5, -.5,  1, 0, 0,
            .5, .5, -.5,    0, 0, 1
        ]), new RenderableFace ([
            -.5, -.5, -.5,  1, 0, 0,
            -.5, .5, -.5,   1, 1, 0,
            -.5, .5, .5,    0, 0, 1,  // LEFT
            -.5, -.5, .5,   0, 1, 0,
            -.5, -.5, -.5,  1, 0, 0,
            -.5, .5, -.5,   0, 0, 1
        ]), new RenderableFace ([
            .5, -.5, -.5,   1, 0, 0,
            .5, .5, -.5,    1, 1, 0,
            .5, .5, .5,     0, 0, 1,  // RIGHT
            .5, -.5, .5,    0, 1, 0,
            .5, -.5, -.5,   1, 0, 0,
            .5, .5, -.5,    0, 0, 1
        ]), new RenderableFace ([
            -.5, .5, -.5,   1, 0, 0,
            .5, .5, -.5,    1, 1, 0,
            .5, .5, .5,     0, 0, 1,  // TOP
            -.5, .5, .5,    0, 1, 0,
            -.5, .5, -.5,   1, 0, 0,
            .5, .5, -.5,    0, 0, 1
        ]), new RenderableFace ([
            -.5, -.5, -.5,  1, 0, 0,
            .5, -.5, -.5,   1, 1, 0,
            .5, -.5, .5,    0, 0, 1,  // BOTTOM
            -.5, -.5, .5,   0, 1, 0,
            -.5, -.5, -.5,  1, 0, 0,
            .5, -.5, -.5,   0, 0, 1
        ])
    ];
    
    return {
        bind: function() {
            for (face in faces) {
                face.bind();
            }
        }
    }
}

function TransparentCube() {
    var faces = [
        new RenderableFace ([
            -.5, -.5, .5,   1, 0, 0, .5,
            .5, -.5, .5,    1, 1, 0, .5,
            .5, .5, .5,     0, 0, 1, .5,   // FRONT
            -.5, .5, .5,    0, 1, 0, .5,
            -.5, -.5, .5,   1, 0, 0, .5,
            .5, .5, .5,     0, 0, 1, .5
        ]), new RenderableFace ([
            -.5, -.5, -.5,  1, 0, 0, .5,
            .5, -.5, -.5,   1, 1, 0, .5,
            .5, .5, -.5,    0, 0, 1, .5,  // BACK
            -.5, .5, -.5,   0, 1, 0, .5,
            -.5, -.5, -.5,  1, 0, 0, .5,
            .5, .5, -.5,    0, 0, 1, .5
        ]), new RenderableFace ([
            -.5, -.5, -.5,  1, 0, 0, .5,
            -.5, .5, -.5,   1, 1, 0, .5,
            -.5, .5, .5,    0, 0, 1, .5,  // LEFT
            -.5, -.5, .5,   0, 1, 0, .5,
            -.5, -.5, -.5,  1, 0, 0, .5,
            -.5, .5, -.5,   0, 0, 1, .5
        ]), new RenderableFace ([
            .5, -.5, -.5,   1, 0, 0, .5,
            .5, .5, -.5,    1, 1, 0, .5,
            .5, .5, .5,     0, 0, 1, .5,  // RIGHT
            .5, -.5, .5,    0, 1, 0, .5,
            .5, -.5, -.5,   1, 0, 0, .5,
            .5, .5, -.5,    0, 0, 1, .5
        ]), new RenderableFace ([
            -.5, .5, -.5,   1, 0, 0, .5,
            .5, .5, -.5,    1, 1, 0, .5,
            .5, .5, .5,     0, 0, 1, .5,  // TOP
            -.5, .5, .5,    0, 1, 0, .5,
            -.5, .5, -.5,   1, 0, 0, .5,
            .5, .5, -.5,    0, 0, 1, .5
        ]), new RenderableFace ([
            -.5, -.5, -.5,  1, 0, 0, .5,
            .5, -.5, -.5,   1, 1, 0, .5,
            .5, -.5, .5,    0, 0, 1, .5,  // BOTTOM
            -.5, -.5, .5,   0, 1, 0, .5,
            -.5, -.5, -.5,  1, 0, 0, .5,
            .5, -.5, -.5,   0, 0, 1, .5
        ])
    ];
    
    return {
        bind: function() {
            for (face in faces) {
                face.bind();
            }
        }
    }
}