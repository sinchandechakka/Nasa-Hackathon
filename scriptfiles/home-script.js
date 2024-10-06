blackhole('#blackhole');

function blackhole(element) {
  var h = $(element).height(),
      w = $(element).width(),
      cw = w,
      ch = h,
      maxorbit = 10, // distance from center
      centery = ch / 2,
      centerx = cw / 2;

  var startTime = new Date().getTime();
  var currentTime = 0;

  var stars = [],
      expanse = true; // always true now

  var canvas = $('<canvas/>').attr({ width: cw, height: ch }).appendTo(element),
      context = canvas.get(0).getContext("2d");

  context.globalCompositeOperation = "multiply";

  function setDPI(canvas, dpi) {
    // Set up CSS size if it's not set up already
    if (!canvas.get(0).style.width)
      canvas.get(0).style.width = canvas.get(0).width + 'px';
    if (!canvas.get(0).style.height)
      canvas.get(0).style.height = canvas.get(0).height + 'px';

    var scaleFactor = dpi / 96;
    canvas.get(0).width = Math.ceil(canvas.get(0).width * scaleFactor);
    canvas.get(0).height = Math.ceil(canvas.get(0).height * scaleFactor);
    var ctx = canvas.get(0).getContext('2d');
    ctx.scale(scaleFactor, scaleFactor);
  }

  function rotate(cx, cy, x, y, angle) {
    var radians = angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
        ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return [nx, ny];
  }

  setDPI(canvas, 192);

  var star = function() {
    // Get a weighted random number, so that the majority of stars will form in the center of the orbit
    var rands = [];
    rands.push(Math.random() * (maxorbit / 2) + 1);
    rands.push(Math.random() * (maxorbit / 2) + maxorbit);

    this.orbital = (rands.reduce(function(p, c) {
      return p + c;
    }, 0) / rands.length);

    this.x = centerx; // All of these stars are at the center x position at all times
    this.y = centery + this.orbital; // Set Y position starting at the center y + the position in the orbit

    this.yOrigin = centery + this.orbital; // Used to track the particles origin

    this.speed = (Math.floor(Math.random() * 5) + 1) * Math.PI / 400; // The rate at which this star will orbit
    this.rotation = 0; // current Rotation
    this.startRotation = (Math.floor(Math.random() * 360) + 1) * Math.PI / 180; // Starting rotation.  

    this.id = stars.length; // Used when expansion takes place.

    this.collapseBonus = this.orbital - (maxorbit * 0.7); // Bonus to randomly place some stars outside of the black hole
    if (this.collapseBonus < 0) {
      this.collapseBonus = 0; // set it to 0 to avoid stars going inside the black hole
    }

    stars.push(this);
    this.color = 'rgba(255,255,255,1)'; // Color the star white, less opaque

    this.hoverPos = centery + (maxorbit / 2) + this.collapseBonus; // Position on hover
    this.expansePos = centery + (this.id % 100) * -10 + (Math.floor(Math.random() * 20) + 1); // Position when expansion takes place

    this.prevR = this.startRotation;
    this.prevX = this.x;
    this.prevY = this.y;
  }

  star.prototype.draw = function() {
    if (expanse) { // always expanding now
      this.rotation = this.startRotation + (currentTime * (this.speed / 2));
      if (this.y > this.expansePos) {
        this.y -= Math.floor(this.expansePos - this.y) / -140;
      }
    }

    context.save();
    context.fillStyle = this.color;
    context.strokeStyle = this.color;
    context.beginPath();
    var oldPos = rotate(centerx, centery, this.prevX, this.prevY, -this.prevR);

    // Draw a longer trail by adjusting the start position
    var trailLength = 10; // Adjust this value for trail length
    var trailStartX = this.x - Math.sin(this.rotation) + trailLength;
    var trailStartY = this.y - Math.cos(this.rotation) + trailLength;

    context.moveTo(oldPos[0], oldPos[1]);
    context.translate(centerx, centery);
    context.rotate(this.rotation);
    context.translate(-centerx, -centery);
    context.lineTo(this.x, this.y);
    context.stroke();
    context.restore();

    this.prevR = this.rotation;
    this.prevX = this.x;
    this.prevY = this.y;
  }


  window.requestFrame = (function() {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 60);
      };
  })();

  function loop() {
    var now = new Date().getTime();
    currentTime = (now - startTime) / 50;

    context.fillStyle = 'rgba(25,25,25,0.1)'; // clear the context, leaving trails
    context.fillRect(0, 0, cw, ch);

    for (var i = 0; i < stars.length; i++) { // For each star
      stars[i].draw(); // Draw it
    }

    requestFrame(loop);
  }

  function init(time) {
    context.fillStyle = 'rgba(25,25,25,0.6)'; // Initial clear of the canvas
    context.fillRect(0, 0, cw, ch);
    for (var i = 0; i < 3000; i++) { // create 2500 stars
      new star();
    }
    loop();
  }
  init();
}

var dropDown = function() {
  document.querySelector('.menu-dropdown').addEventListener('click', function() {
    const content = document.querySelector('.menu-content');
    const con = document.querySelector('.con');
    
    // Toggle the active class for the hamburger/close button animation
    con.classList.toggle('menu-active');
    this.classList.toggle('menu-active');

    // Toggle the visibility of the dropdown content
    content.classList.toggle('hidden');

    // Ensure smooth transition for content opacity
    setTimeout(function() {
      content.style.opacity = content.style.opacity === '1' ? '0' : '1';
    }, 300);  // Delay added to sync with the menu dropdown animation
  });
}

// Call the dropdown menu function to activate the toggle
dropDown();