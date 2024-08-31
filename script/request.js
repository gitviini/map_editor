//generate
const create = document.querySelector('.create')
const options = document.querySelector('.options')
const models = document.querySelector('.models')
const rooms = document.querySelector('.rooms')
const container_models = document.querySelector('.container_models')
const container_rooms = document.querySelector('.container_rooms')
const model_faces = '<div class="face front"></div><div class="face right"></div><div class="face left"></div><div class="face bottom"></div><div class="face back"></div><div class="face top"></div>'
const transparent = '<div class="cube" width="50" height="50" length="50" x="0" y="0" z="0" rotatex="0" rotatey="0" rotatez="0" color="transparent" filter="drop-shadow(0 0 10px #fff)" style="min-width: 50px; min-height: 50px;"><div class="face front" style="width: 50px; transform: translateZ(25px); height: 50px; background: transparent;"></div><div class="face right" style="height: 50px; transform: rotateY(90deg) translateZ(25px); width: 50px; background: transparent;"></div><div class="face left" style="height: 50px; transform: rotateY(-90deg) translateZ(25px); width: 50px; background: transparent;"></div><div class="face bottom" style="width: 50px; height: 50px; transform: rotateY(180deg) rotateX(90deg) translateZ(-25px); background: transparent;"></div><div class="face back" style="width: 50px; transform: rotateY(180deg) translateZ(25px); height: 50px; background: transparent;"></div><div class="face top" style="width: 50px; height: 50px; transform: rotateX(90deg) translateZ(25px); background: transparent;"></div></div>'
const models_list = {}
const form = document.querySelector('form')
const input_size = document.querySelector('.size')
const add_layer = document.querySelector('.add_layer')
const add_button = document.querySelector('.add_button')
//orientation
const orientation_cube = document.querySelector('.orientation')
//motion
const display = document.querySelector('.create')
//actions
const titule = document.querySelector('#titule')
const save = document.querySelector('#save')
const del = document.querySelector('#delete')
const change_models = document.querySelector('.change_models')
const change_rooms = document.querySelector('.change_rooms')
//buttons of moviment
const move_buttons = document.querySelector('.move_buttons')
const up = document.querySelector('#up')
const down = document.querySelector('#down')
const left = document.querySelector('#left')
const right = document.querySelector('#right')