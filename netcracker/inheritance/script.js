class Figure{
    constructor(id, nameFigure, param){
        this.canvas = document.getElementById(id);
        this.figure = nameFigure;
        this.param = param;
    }
    draw(){
        if(this.canvas.getContext){
            let ctx = this.canvas.getContext('2d');
            if(this.figure === 'triangle'){
                ctx.beginPath();
                ctx.fillStyle = this.param.color;
                ctx.moveTo(0, 70);
                ctx.lineTo(60, 0);
                ctx.lineTo(110, 70);
                ctx.moveTo(90, 60);
                ctx.lineTo(60, 20);
                ctx.lineTo(25, 60);
                ctx.fill();
                ctx.closePath();
            }else if(this.figure === 'rect') {
                ctx.beginPath();
                ctx.fillStyle = this.param.color;
                ctx.rect(this.param.x,this.param.y,this.param.width,this.param.height);
                ctx.fill();
                ctx.closePath();
            }else if(this.figure === 'arc'){
                ctx.beginPath();
                ctx.fillStyle = this.param.color;
                ctx.moveTo(this.param.x, this.param.y);
                ctx.arc(this.param.x, this.param.y, 50, 0, Math.PI/2, false);
                ctx.fill();
                ctx.closePath();
            }else{
                document.getElementById('message').innerText = "Такой фигуры не найденно";
            }
        }
    }
}

class Triangle extends Figure{
    constructor(id, param) {
        super(id, 'triangle', param);
        super.draw();
    }
}

class Rect extends Figure{
    constructor(id, param) {
        super(id, 'rect', param);
        super.draw();
    }
}

class Arc extends Figure{
    constructor(id, param) {
        super(id, 'arc', param);
        super.draw();
    }
}

let triangle = new Triangle('canvas', {color: "#ff4387", width: 80, height: 50, x: 150, y: 20});
let rect = new Rect('canvas', {color: "#ff4387", width: 80, height: 50, x: 150, y: 20});
let arc = new Arc('canvas', {color: "#ff4387", width: 50, height: 50, x: 250, y: 20});

// function Figure() {}
//
// Figure.prototype.init = function (canvas) {
//     this.canvas  = canvas;
// };
//
// Figure.prototype.draw = function (nameFigure,x,y,h,w,color) {
//
// };
//
// function inherit(parentClass) {
//     function ChildClass(){}
//     ChildClass.prototype = Object.create(parentClass.prototype);
//     ChildClass.prototype.constructor = ChildClass;
//     ChildClass.prototype._super = parentClass.prototype;
//     return ChildClass;
// }
//
// let Triangle = inherit(Figure);
// let Rect = inherit(Figure);
// let Arc = inherit(Figure);
//
// let triangle = new Triangle();
// let rect = new Rect();
// let arc = new Arc();
//
// triangle.init(document.getElementById('canvas'));
// triangle.draw('triangle', 1,1,2,2,);
//
// rect.init(document.getElementById('canvas'));
// rect.draw('rect', 150,20,80,50,"#ff4387")
//
// arc.init(document.getElementById('canvas'));
// arc.draw('arc', 250,20,50,50,"#ff4387");
