function Figure() {}

Figure.prototype.init = function (canvas) {
    this.canvas  = canvas;
};

Figure.prototype.draw = function (nameFigure,x,y,h,w,color) {
    if(this.canvas.getContext){
        let ctx = this.canvas.getContext('2d');
        if(nameFigure === 'triangle'){
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.moveTo(0, 70);
            ctx.lineTo(60, 0);
            ctx.lineTo(110, 70);
            ctx.moveTo(90, 60);
            ctx.lineTo(60, 20);
            ctx.lineTo(25, 60);
            ctx.fill();
            ctx.closePath();
        }else if(nameFigure === 'rect') {
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.rect(x, y, w, h);
            ctx.fill();
            ctx.closePath();
        }else if(nameFigure === 'arc'){
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.moveTo(x, y);
            ctx.arc(x, y, 50, 0, Math.PI/2, false);
            ctx.fill();
            ctx.closePath();
        }else{
            document.getElementById('message').innerText = "Такой фигуры не найденно";
        }
    }
};

function inherit(parentClass) {
    function ChildClass(){}
    ChildClass.prototype = {...parentClass.prototype};
    ChildClass.prototype.constructor = ChildClass;
    ChildClass.prototype._super = parentClass.prototype;
    return ChildClass;
}

let Triangle = inherit(Figure);
let Rect = inherit(Figure);
let Arc = inherit(Figure);

let triangle = new Triangle();
let rect = new Rect();
let arc = new Arc();

triangle.init(document.getElementById('canvas'));
triangle.draw('triangle', 1,1,2,2,"#ff4387");

rect.init(document.getElementById('canvas'));
rect.draw('rect', 150,20,50,50,"#ff4387")

arc.init(document.getElementById('canvas'));
arc.draw('arc', 250,20,50,50,"#ff4387");
