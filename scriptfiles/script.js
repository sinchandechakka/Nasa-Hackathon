document.addEventListener('DOMContentLoaded', () => {

  window.addEventListener('resize', function() {
      window.location.reload();
  });

  function movePlanet(container, semiMajorAxis, semiMinorAxis, speed, offsetX, offsetY, startAngle) {
      let angle = startAngle;
      let isPaused = false;
      let currentRequest = null;

      function update() {

          if (!isPaused) {
              const x = offsetX + semiMajorAxis * Math.cos(angle);
              const y = offsetY + semiMinorAxis * Math.sin(angle);

              container.style.transform = `translate(${x - container.offsetWidth / 2}px, ${y - container.offsetHeight / 2}px)`;
              angle += speed;
          }
          currentRequest = requestAnimationFrame(update);
      }

      update();

      container.addEventListener('mouseenter', () => {
          isPaused = true;
          cancelAnimationFrame(currentRequest);
          showTooltip(container.querySelector('.planet'));
      });

      container.addEventListener('mouseleave', () => {
          isPaused = false;
          update();
          hideTooltip();
      });
  }


  function closePlanetModal() {
      const modal = document.getElementById('planet-modal');
      modal.style.display = 'none';
  }

  document.querySelectorAll('.planet-container').forEach(container => {
      container.addEventListener('click', () => {
          const planet = container.querySelector('.planet');
          const planetName = planet.getAttribute('data-name');
          const planetData = getPlanetInfo(planetName);
          openPlanetModal(planetName, planetData);
      });
  });

  function openPlanetModal(planetName, planetData) {
      const modal = document.getElementById('planet-modal');
      const modalContentleft = document.getElementById('modal-planet-left');
      const modalContentright = document.getElementById('modal-planet-right');
      const modalContent = document.querySelector('.modal-content');

      const planetStyles = {
          "Mercury": {
              color: "135deg, #000000,#000000, #434343",
              image: "assets/mercury_modal/mercurysurf.png"
          },
          "Venus": {
              color: "180deg, #000000,#000000,#000000,#000000,#9c7f6a,#b56c4c",
              image: "assets/venus_modal/venus_surf.png"
          },
          "Earth": {
              color: "170deg, #000000,#000000,#000000,#8abbcf,#4c61b5",
              image: "assets/earth_modal/earth.png"
          },
          "Mars": {
              color: "150deg, #000000,#000000,#9c7f6a",
              image: "assets/mars_modal/marsurf.png"
          },
          "Jupiter": {
              color: "180deg, #000000,#000000,#000000,#000000, #a59186,#c99039",
              image: "assets/jupiter_modal/jupitersurf.png"
          },
          "Saturn": {
              color: "175deg, #000000,#000000,#000000,#000000,#cecece,#bfbdaf",
              image: "assets/saturn_modal/saturnsurf.png"
          },
          "Uranus": {
              color: "175deg, #000000,#000000,#000000,#85addb",
              image: "assets/uranus_modal/urannusurf.png"
          },
          "Neptune": {
              color: "175deg, #000000,#000000,#000000,#85addb,#274687",
              image: "assets/neptune_modal/neptunesurf.png"
          }

      };

      const animatedTitle = planetName.split('').map((letter, index) => {
          return `<span class="animated-letter" style="--i:${index};">${letter}</span>`;
      }).join('');

      const selectedPlanet = planetStyles[planetName] || {
          color: "#fff",
          image: ""
      };
      modalContentleft.innerHTML = `
          <img src="${planetData.gif}" alt="${planetName} GIF" class="planet-gif" style="width: 100%; max-height: 300px; object-fit: contain;">
          <br>
          <br>
          <h2>${animatedTitle}</h2>
          <br>
          <h3 class="animated-text" style="--delay: 0.1s;">${planetData.sundist}</h3><p class="animated-text" style="--delay: 0.2s;">${planetData.dist}</p>
          <h3 class="animated-text" style="--delay: 0.2s;">${planetData.Gravity}</h3><p class="animated-text" style="--delay: 0.3s;">${planetData.gravinfo}</p>
          <h3 class="animated-text" style="--delay: 0.3s;">${planetData.moons}</h3><p class="animated-text" style="--delay: 0.4s;">${planetData.moondinfo}</p>`;


      modalContentright.innerHTML = `
        <ul>
          <li class="animated-text" style="--delay: 0.4s;">${planetData.info1}</li>
          <li class="animated-text" style="--delay: 0.2s;">${planetData.info2}</li>
          <li class="animated-text" style="--delay: 0.3s;">${planetData.info3}</li>
          <li class="animated-text" style="--delay: 0.4s;">${planetData.info4}</li>
          <li class="animated-text" style="--delay: 0.5s;">${planetData.info5}</li>
        </ul>`;

      modalContent.style.backgroundImage = `url(${selectedPlanet.image}), linear-gradient(${selectedPlanet.color})`;
      modalContent.style.backgroundPosition = "center";
      modalContent.style.backgroundSize = "cover";
      modalContent.style.backgroundRepeat = "no-repeat";

      modal.style.display = 'block';
  }


  function getPlanetInfo(planetName) {
      const planetData = {
          "Mercury": {
              "sundist": "DISTANCE FROM SUN:",
              "dist": "58 million km",
              "Gravity": "GRAVITY: ",
              "gravinfo": "3.7 m/s²",
              "moons": "NO OF MOONS: ",
              "moondinfo": "0",
              "info1": "Mercury is the planet that orbits the closest to the Sun.",
              "info2": "Mercury is the smallest planet in our solar system – only slightly larger than Earth's Moon.",
              "info3": "Mercury's thin atmosphere, or exosphere, is composed mostly of oxygen (O2), sodium (Na), hydrogen (H2), helium (He), and potassium (K).",
              "info4": "Mercury is a rocky planet, also known as a terrestrial planet. Mercury has a solid, cratered surface, much like the Earth's moon.",
              "gif": "assets/mercury_modal/mercury.gif"
          },


          "Venus": {
              "sundist": "DISTANCE FROM SUN: ",
              "dist": "108.2 million km",
              "Gravity": "GRAVITY: ",
              "gravinfo": "8.87 m/s²",
              "moons": "NO OF MOONS: ",
              "moondinfo": "0",
              "info1": "Venus is the second closest planet to the Sun.",
              "info2": "Venus is often called Earth’s twin because they’re similar in size and structure, but Venus has extreme surface heat and a dense, toxic atmosphere. If the Sun were as tall as a typical front door, Earth and Venus would each be about the size of a nickel.",
              "info3": "Venus’ thick atmosphere traps heat creating a runaway greenhouse effect – making it the hottest planet in our solar system with surface temperatures hot enough to melt lead. The greenhouse effect makes Venus roughly 700°F (390°C) hotter than it would be without a greenhouse effect.",
              "info4": "Venus has a solid surface covered in dome-like volcanoes, rifts, and mountains, with expansive volcanic plains and vast, ridged plateaus.",
              "info5": "                        ",
              "gif": "assets/venus_modal/venus.gif"
          },


          "Earth": {
              "sundist": "DISTANCE FROM SUN: ",
              "dist": "149.6 million km",
              "Gravity": "GRAVITY: ",
              "gravinfo": "9.807 m/s²",
              "moons": "NO OF MOONS: ",
              "moondinfo": "1",
              "info1": "Earth is the third closest planet to the Sun.",
              "info2": " Earth has a diameter of about 12,742 kilometers (7,918 miles), making it the fifth-largest planet in the Solar System. Its total surface area is approximately 510 million square kilometers.",
              "info3": "Earth's atmosphere is made up of 78% nitrogen, 21% oxygen, and trace amounts of other gases like carbon dioxide and argon.",
              "info4": "Earth's surface is incredibly diverse, with about 70% covered by oceans, and the remaining 30% consisting of mountains, deserts, plains, and forests.",
              "info5": "Earth rotates on its axis once every 24 hours, causing day and night. It also takes about 365.25 days to orbit the Sun, giving us a year. The slight tilt of Earth's axis (23.5°) is responsible for the changing seasons.",
              "gif": "assets/earth_modal/earth-ezgif.com-resize.gif"
          },


          "Mars": {
              "sundist": "DISTANCE FROM SUN: ",
              "dist": "227.9 million km",
              "Gravity": "GRAVITY: ",
              "gravinfo": "3.71 m/s²",
              "moons": "NO OF MOONS: ",
              "moondinfo": "2",
              "info1": "Mars is the forth closest planet to the Sun.",
              "info2": "Mars has a diameter of about 6,779 kilometers (4,212 miles), which makes it about half the size of Earth. It’s the second-smallest planet in the Solar System.",
              "info3": "Mars has a thin atmosphere composed mostly of carbon dioxide (about 95%), with traces of nitrogen and argon. This thin atmosphere provides little insulation, causing temperatures to fluctuate widely.",
              "info4": "Mars is home to the tallest volcano in the solar system, Olympus Mons, which is about 22 kilometers (13.6 miles) high. The planet also features vast plains, deep valleys like Valles Marineris, and large dune fields.",
              "gif": "assets/mars_modal/Mars.gif"
          },


          "Jupiter": {

              "sundist": "DISTANCE FROM SUN: ",
              "dist": "778.5 million km",
              "Gravity": "GRAVITY: ",
              "gravinfo": "24.79 m/s²",
              "moons": "NO OF MOONS: ",
              "moondinfo": "95",
              "info1": "Jupiter is the fifth closest planet to the Sun.",
              "info2": " Jupiter is the largest planet in the Solar System, with a diameter of about 139,820 kilometers (86,881 miles). It is so massive that it could fit all the other planets inside it and still have room to spare.",
              "info3": "Jupiter's atmosphere is mostly composed of hydrogen (around 90%) and helium (about 10%), with traces of methane, water vapor, and ammonia.",
              "info4": "Jupiter has no solid surface like Earth or Mars. Instead, it’s a gas giant, so its surface is a dense layer of gas, transitioning into a fluid-like state as you move deeper into the planet.",
              "info5": "Jupiter has the strongest magnetic field of any planet in the Solar System, about 20,000 times stronger than Earth's. This powerful field creates intense radiation belts and massive auroras at its poles.",
              "gif": "assets/jupiter_modal/jupiter.gif"
          },


          "Saturn": {
              "sundist": "DISTANCE FROM SUN: ",
              "dist": "1.434 billion km",
              "Gravity": "GRAVITY: ",
              "gravinfo": "10.44 m/s²",
              "moons": "NO OF MOONS: ",
              "moondinfo": "147",
              "info1": "Saturn is the sixth closest planet to the Sun.",
              "info2": " Saturn is the second-largest planet in the Solar System, with a diameter of about 116,460 kilometers (72,366 miles). Despite its size, it has the lowest density of any planet, so much so that it would float in water.",
              "info3": "Saturn's atmosphere is primarily composed of hydrogen (about 96%) and helium (about 3%), with traces of methane, ammonia, and other gases. Its atmosphere has stunning banded cloud formations and hosts massive storms.",
              "info4": "Like Jupiter, Saturn is a gas giant and does not have a solid surface. Its visible terrain consists of thick layers of gas, which become denser and hotter as you go deeper.",
              "info5": "Saturn is famous for its complex and extensive ring system, made mostly of ice and rock particles. These rings are divided into several sections (A, B, C rings, etc.), and they stretch up to 282,000 kilometers (175,000 miles) from the planet.",
              "gif": "assets/saturn_modal/saturn.gif"
          },


          "Uranus": {
              "sundist": "DISTANCE FROM SUN: ",
              "dist": "2.871 billion km",
              "Gravity": "GRAVITY: ",
              "gravinfo": "8.87 m/s²",
              "moons": "NO OF MOONS: ",
              "moondinfo": "27",
              "info1": "Uranus is the seventh closest planet to the Sun.",
              "info2": "Uranus has a diameter of about 50,724 kilometers (31,518 miles), making it the third-largest planet in the Solar System.",
              "info3": "Uranus' atmosphere is primarily made of hydrogen (about 83%) and helium (about 15%), with a higher proportion of methane (around 2%) compared to Jupiter and Saturn.",
              "info4": "Like the other gas giants, Uranus does not have a solid surface. It is classified as an ice giant because a significant portion of its interior is composed of icy materials such as water, ammonia, and methane, beneath its thick atmosphere.",
              "info5": " Uranus is unique in the Solar System because it rotates on its side, with an axial tilt of about 98 degrees. This extreme tilt causes its poles to experience 42 years of continuous sunlight followed by 42 years of darkness.",
              "gif": "assets/uranus_modal/Uranus.gif"
          },


          "Neptune": {
              "sundist": "DISTANCE FROM SUN: ",
              "dist": "4.495 billion km",
              "Gravity": "GRAVITY: ",
              "gravinfo": "11.15 m/s²",
              "moons": "NO OF MOONS: ",
              "moondinfo": "14",
              "info1": "Neptune is the eighth closest planet to the Sun.",
              "info2": "Neptune has a diameter of about 49,244 kilometers (30,598 miles), making it slightly smaller than Uranus but still the fourth-largest planet in the Solar System.",
              "info3": "Neptune's atmosphere is mostly hydrogen (about 80%) and helium (about 19%), with traces of methane, which gives the planet its vivid blue color.",
              "info4": "Neptune, like Uranus, is classified as an ice giant because it has a large amount of icy materials such as water, ammonia, and methane in its interior. It lacks a solid surface, with its outer layers being thick clouds of gas that transition to slushy ice and rock deeper down.",
              "info5": "Neptune is one of the coldest places in the Solar System, with average atmospheric temperatures around -214 degrees Celsius (-353 degrees Fahrenheit). Despite being farther from the Sun, it emits more internal heat than it receives, suggesting that it has an internal heat source.",
              "gif": "assets/neptune_modal/Neptune.gif"
          }
      }


      return planetData[planetName] || {
          info: "Information about this planet is not available.",
          img: ""
      };
  }


  document.querySelector('.close-button').addEventListener('click', closePlanetModal);

  window.addEventListener('click', (event) => {
      const modal = document.getElementById('planet-modal');
      if (event.target === modal) {
          closePlanetModal();
      }
  });

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  const mercuryContainer = document.getElementById('mercury-container');
  const venusContainer = document.getElementById('venus-container');
  const earthContainer = document.getElementById('earth-container');
  const marsContainer = document.getElementById('mars-container');
  const jupiterContainer = document.getElementById('jupiter-container');
  const saturnContainer = document.getElementById('saturn-container');
  const uranusContainer = document.getElementById('uranus-container');
  const neptuneContainer = document.getElementById('neptune-container');
  const sun = document.querySelector('.celestial-body');

  const tooltip = document.querySelector('#tooltip');

  sun.style.position = "absolute";
  sun.style.top = `${centerY}px`;
  sun.style.left = `${centerX}px`;

  movePlanet(mercuryContainer, 42, 42, 0.04, centerX, centerY, Math.random() * 2 * Math.PI);
  movePlanet(venusContainer, 67, 69, 0.007, centerX, centerY, Math.random() * 2 * Math.PI);
  movePlanet(earthContainer, 125, 125, 0.005, centerX, centerY, Math.random() * 2 * Math.PI);
  movePlanet(marsContainer, 175, 170, 0.004, centerX, centerY, Math.random() * 2 * Math.PI);
  movePlanet(jupiterContainer, 250, 240, 0.002, centerX, centerY, Math.random() * 2 * Math.PI);
  movePlanet(saturnContainer, 300, 280, 0.001, centerX, centerY, Math.random() * 2 * Math.PI);
  movePlanet(uranusContainer, 350, 330, 0.0007, centerX, centerY, Math.random() * 2 * Math.PI);
  movePlanet(neptuneContainer, 450, 375, 0.0005, centerX, centerY, Math.random() * 2 * Math.PI);

  function showTooltip(planet) {
      const planetName = planet.getAttribute('data-name');
      tooltip.textContent = planetName;
      tooltip.style.opacity = 1;
      tooltip.style.top = `${planet.getBoundingClientRect().top - 10}px`;
      tooltip.style.left = `${planet.getBoundingClientRect().left + planet.offsetWidth / 2}px`;
  }

  function hideTooltip() {
      tooltip.style.opacity = 0;
  }
});

function createStarfield(numStars) {
  const container = document.querySelector('.solar-syst');

  for (let i = 0; i < numStars; i++) {
  
      const star = document.createElement('div');
      star.classList.add('star');

      const size = Math.random() * 2 + 1; 
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const opacity = Math.random() * 0.8 + 0.2; 

      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${x}px`;
      star.style.top = `${y}px`;
      star.style.opacity = opacity;

      container.appendChild(star);
  }
}

function createAsteroid() {
  const asteroid = document.createElement('div');
  asteroid.classList.add('asteroid');
  const size = randomInt(1, 5); 
  asteroid.style.width = `${size}px`;
  asteroid.style.height = `${size}px`;

  return asteroid;
}

function generateAsteroidBelt(layers, asteroidsPerLayer, radius, spacing, direction) {
  const container = document.querySelector('.solar-syst');
  const baseRadius = radius;
  const layerSpacing = spacing;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  for (let layer = 0; layer < layers; layer++) {
      const currentRadius = baseRadius + layer * layerSpacing;


      const layerContainer = document.createElement('div');
      layerContainer.classList.add('asteroid-layer');
      layerContainer.style.width = `${currentRadius * 2}px`;
      layerContainer.style.height = `${currentRadius * 2}px`;
      layerContainer.style.left = `${centerX - currentRadius}px`;
      layerContainer.style.top = `${centerY - currentRadius}px`;
      layerContainer.style.animation = `${direction} linear infinite`;
      layerContainer.style.animationDuration = `${randomInt(50, 120)}s`;

      for (let i = 0; i < asteroidsPerLayer; i++) {
          const asteroid = createAsteroid();

          const angle = Math.random() * 2 * Math.PI;

          const randomOffset = randomInt(-10, 10);
          const orbitX = (currentRadius + randomOffset) * Math.sin(angle);
          const orbitY = (currentRadius + randomOffset) * Math.cos(angle);

          asteroid.style.left = `${orbitX + currentRadius}px`;
          asteroid.style.top = `${orbitY + currentRadius}px`;


          layerContainer.appendChild(asteroid);
      }

      container.appendChild(layerContainer);
  }
}


function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



window.onload = function() {
  createStarfield(1000);
  generateAsteroidBelt(15, 25, 190, 2, 'rotateBelt');

  generateAsteroidBelt(30, 30, 700, 10, 'rotateBelt2');
};


class ArrowPointer {
  constructor() {
      this.root = document.body
      this.cursor = document.querySelector(".curzr")

      this.position = {
              distanceX: 0,
              distanceY: 0,
              distance: 0,
              pointerX: 0,
              pointerY: 0,
          },
          this.previousPointerX = 0
      this.previousPointerY = 0
      this.angle = 0
      this.previousAngle = 0
      this.angleDisplace = 0
      this.degrees = 57.296
      this.cursorSize = 20

      this.cursorStyle = {
          boxSizing: 'border-box',
          position: 'fixed',
          top: '0px',
          left: `${ -this.cursorSize / 2 }px`,
          zIndex: '2147483647',
          width: `${ this.cursorSize }px`,
          height: `${ this.cursorSize }px`,
          transition: '250ms, transform 100ms',
          userSelect: 'none',
          pointerEvents: 'none'
      }

      this.init(this.cursor, this.cursorStyle)
  }

  init(el, style) {
      Object.assign(el.style, style)
      this.cursor.removeAttribute("hidden")

  }

  move(event) {
      this.previousPointerX = this.position.pointerX
      this.previousPointerY = this.position.pointerY
      this.position.pointerX = event.pageX + this.root.getBoundingClientRect().x
      this.position.pointerY = event.pageY + this.root.getBoundingClientRect().y
      this.position.distanceX = this.previousPointerX - this.position.pointerX
      this.position.distanceY = this.previousPointerY - this.position.pointerY
      this.distance = Math.sqrt(this.position.distanceY ** 2 + this.position.distanceX ** 2)

      this.cursor.style.transform = `translate3d(${this.position.pointerX}px, ${this.position.pointerY}px, 0)`

      if (this.distance > 1) {
          this.rotate(this.position)
      } else {
          this.cursor.style.transform += ` rotate(${this.angleDisplace}deg)`
      }
  }

  rotate(position) {
      let unsortedAngle = Math.atan(Math.abs(position.distanceY) / Math.abs(position.distanceX)) * this.degrees
      let modAngle
      const style = this.cursor.style
      this.previousAngle = this.angle

      if (position.distanceX <= 0 && position.distanceY >= 0) {
          this.angle = 90 - unsortedAngle + 0
      } else if (position.distanceX < 0 && position.distanceY < 0) {
          this.angle = unsortedAngle + 90
      } else if (position.distanceX >= 0 && position.distanceY <= 0) {
          this.angle = 90 - unsortedAngle + 180
      } else if (position.distanceX > 0 && position.distanceY > 0) {
          this.angle = unsortedAngle + 270
      }

      if (isNaN(this.angle)) {
          this.angle = this.previousAngle
      } else {
          if (this.angle - this.previousAngle <= -270) {
              this.angleDisplace += 360 + this.angle - this.previousAngle
          } else if (this.angle - this.previousAngle >= 270) {
              this.angleDisplace += this.angle - this.previousAngle - 360
          } else {
              this.angleDisplace += this.angle - this.previousAngle
          }
      }
      style.transform += ` rotate(${this.angleDisplace}deg)`

      setTimeout(() => {
          modAngle = this.angleDisplace >= 0 ? this.angleDisplace % 360 : 360 + this.angleDisplace % 360
          if (modAngle >= 45 && modAngle < 135) {
              style.left = `${ -this.cursorSize }px`
              style.top = `${ -this.cursorSize / 2 }px`
          } else if (modAngle >= 135 && modAngle < 225) {
              style.left = `${ -this.cursorSize / 2 }px`
              style.top = `${ -this.cursorSize }px`
          } else if (modAngle >= 225 && modAngle < 315) {
              style.left = '0px'
              style.top = `${ -this.cursorSize / 2 }px`
          } else {
              style.left = `${ -this.cursorSize / 2 }px`
              style.top = '0px'
          }
      }, 0)
  }

  remove() {
      this.cursor.remove()
  }
}

(() => {
  const cursor = new ArrowPointer()
  if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      document.onmousemove = function(event) {
          cursor.move(event)
      }
  } else {
      cursor.remove()
  }
})()


document.querySelectorAll('.asteroids-container').forEach(asteroid => {
  asteroid.addEventListener('click', function() {
      window.location.href = 'asteroid.html';
  });
});

function moveAsteroid(container, speed) {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;


  const maxX = screenWidth * 0.8;
  const maxY = screenHeight * 0.8;


  let x = Math.random() * maxX;
  let y = Math.random() * maxY;

  let deltaX = (Math.random() - 0.5) * speed;
  let deltaY = (Math.random() - 0.5) * speed;

  let isPaused = false;
  let currentRequest = null;

  function update() {
      if (!isPaused) {

          x += deltaX;
          y += deltaY;
          if (x < 0 || x > maxX) deltaX *= -1;
          if (y < 0 || y > maxY) deltaY *= -1;

          container.style.transform = `translate(${x}px, ${y}px)`;
      }
      currentRequest = requestAnimationFrame(update);
  }

  update();

  container.addEventListener('mouseenter', () => {
      isPaused = true;
      cancelAnimationFrame(currentRequest);
      showTooltip(container.querySelector('.asteroid'));
  });


  container.addEventListener('mouseleave', () => {
      isPaused = false;
      update();
      hideTooltip();
  });
}

const ast1 = document.getElementById('apophis-container');
const ast2 = document.getElementById('bennu-container');
const obj1 = document.getElementById('obj4660-container');
const obj2 = document.getElementById('obj2001-container');
const comet1 = document.getElementById('cum109p-container');
const comet2 = document.getElementById('cumc-container');


moveAsteroid(ast1, 0.4);
moveAsteroid(ast2, 0.4);
moveAsteroid(obj1, 0.4);
moveAsteroid(obj2, 0.4);
moveAsteroid(comet1, 0.4);
moveAsteroid(comet2, 0.4);


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