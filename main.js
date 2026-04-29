document.getElementById("year").textContent = new Date().getFullYear();

let index = 0;
const images = document.querySelectorAll(".slides img");
function changeImage() {
    images[index].classList.remove("active");
    index = (index + 1) % images.length;
    images[index].classList.add("active");
}
setInterval(changeImage, 3000);

async function loadOutlooks() {
    const now = new Date();
    const response = await fetch("outlooks.json");
    const outlooks = await response.json();
    const activeNow = outlooks.filter(o => {
    const start = new Date(o.start);
    const end = new Date(o.end);
    return now >= start && now <= end;
});

const container = document.getElementById("activeOutlookContainer");
    if (activeNow.length > 0) {
        container.innerHTML = activeNow.map(o => `
          <div class="outlook-card">
            <img src="${o.image}" alt="${o.title}">
            <div class="outlook-text">
              <h3>${o.title}</h3>
              <p>${o.text}</p>
            </div>
          </div>
        `).join("");
      } else {
        container.innerHTML = `
          <div class="outlook-card">
            <img src="" alt="No risk active.">
            <div class="outlook-text">
              <h3>No outlook active</h3>
              <p>I have currently not issued any outlooks. As always, keep an eye on the Met Office warnings. My guidance is completely unofficial, only updated if I have time, and you should rely on the Met Office for official guidance.</p>
             </div>
         </div>
     `;
     }
}

function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], {hour: "2-digit", minute:"2-digit"});
    document.getElementById("clock").textContent = timeString;
}

setInterval(updateClock, 1000);
updateClock();

loadOutlooks();