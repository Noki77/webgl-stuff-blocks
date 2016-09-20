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

precision mediump float;

attribute vec3 vertexPosition;
attribute vec4 vertexColor;

varying vec4 pxColor;

void main() {
    gl_Position = vec4(vertexPosition, 1.0);
    pxColor = vertexColor;
}