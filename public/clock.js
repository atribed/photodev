var currentEndAngle = 0
var currentStartAngle = 0;
var currentColor = 'black';
var lineRadius = 75;
var lineWidth = 15;

var count = 0;

var animateClock = function() {
    count++;
    console.log(count);
    var canvas = document.getElementById('circleTimer')
    var ctx = canvas.getContext('2d');
    var x = canvas.width / 2;
    var y = canvas.height / 2;
    var radius, width;

    var startAngle = currentStartAngle * Math.PI;
    var endAngle = (currentEndAngle) * Math.PI;

    currentStartAngle = currentEndAngle - 0.1;
    currentEndAngle = currentEndAngle + 0.1;

    radius = lineRadius;
    width = lineWidth;
    //ctx.save();
    //ctx.rotate(-Math.PI/2);
    // 12 degrees each second
    ctx.beginPath();
    ctx.arc(50, 50, radius, startAngle, endAngle, false);
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#000000';
    ctx.lineCap = 'round';
    ctx.stroke();
};

setInterval(animateClock, 1000);

animateClock();