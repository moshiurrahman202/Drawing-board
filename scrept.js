// https://www.youtube.com/watch?v=bCYz_N6BIPw&list=PLlkGN-8wjPHWYT_00xdUibDPfHZ3Zm8i3
const pencil = document.getElementById("pencil");
const canvas = document.getElementById("canvas");
const red = document.getElementById("red");
const pink = document.getElementById("pink");
const yellow = document.getElementById("yellow");
const magenta = document.getElementById("magenta");
const orange = document.getElementById("orange");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let isDrawing = false;
let strokeColor = "black";

red.addEventListener("click", function () {
  strokeColor = "red";
});
pink.addEventListener("click", function () {
  strokeColor = "pink";
});
yellow.addEventListener("click", function () {
  strokeColor = "yellow";
});
magenta.addEventListener("click", function () {
  strokeColor = "magenta";
});
orange.addEventListener("click", function () {
  strokeColor = "orange";
});
pencil.addEventListener("click", function () {
  // console.log(`default ${isDrawing}`);
  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("mouseout", stopDrawing);

  function startDrawing(e) {
    isDrawing = true;
    // console.log(`startDrawing function ${isDrawing}`);
    draw(e);
  }

  function draw(e) {
    if (!isDrawing) return;
    // console.log(`draw function ${isDrawing}`);
    const x = e.clientX - canvas.getBoundingClientRect().left;
    const y = e.clientY - canvas.getBoundingClientRect().top;

    context.lineWidth = 10;
    context.lineCap = "round";
    context.strokeStyle = strokeColor;

    context.lineTo(x, y);
    context.stroke();
    context.beginPath();
    context.moveTo(x, y);

    document.getElementById("offsetpositionX").textContent = "Offset X: " + x;
    document.getElementById("offsetpositionY").textContent = "Offset Y: " + y;
  }

  function stopDrawing() {
    isDrawing = false;
    // console.log(`stopDrawing function ${isDrawing}`);
    context.beginPath();
  }

  document.getElementById("eraser").addEventListener("click", function () {
    context.globalCompositeOperation = "destination-out";
    context.strokeStyle = "rgba(0,0,0,0)";
  });

  document.getElementById("pencil").addEventListener("click", function () {
    context.globalCompositeOperation = "source-over";
    context.strokeStyle = strokeColor;
  });
});
