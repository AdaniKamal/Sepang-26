
const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");

menuBtn.addEventListener("click", () => {
  mobileNav.classList.toggle("open");
});

mobileNav.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => mobileNav.classList.remove("open"));
});

const trackData = {
  turn1: {
    title: "TURN 1",
    body: "Heavy braking at the end of the main straight makes this one of the clearest overtaking opportunities.",
    tags: ["BRAKING", "OVERTAKE"]
  },
  fast: {
    title: "FAST SECTION",
    body: "High-speed direction changes reward confidence and a stable car. Small mistakes can cost momentum for several corners.",
    tags: ["HIGH SPEED", "FLOW"]
  },
  final: {
    title: "FINAL CORNER",
    body: "The exit matters because it feeds onto the main straight. A clean launch can create an overtaking opportunity into Turn 1.",
    tags: ["EXIT SPEED", "SETUP"]
  },
  rain: {
    title: "RAIN WATCH",
    body: "Tropical showers can change grip quickly. A driver may face a different track condition within the same lap.",
    tags: ["WEATHER", "GRIP"]
  }
};

document.querySelectorAll(".hotspot").forEach(h => {
  h.addEventListener("click", () => {
    const data = trackData[h.dataset.zone];
    document.getElementById("trackInfo").innerHTML = `
      <div class="card-label">CIRCUIT NOTE</div>
      <h3>${data.title}</h3>
      <p>${data.body}</p>
      <div class="track-tags">${data.tags.map(t => `<span>${t}</span>`).join("")}</div>
    `;
  });
});

const rookieTopics = {
  drs: {
    num:"01",
    title:"DRS HELPS OVERTAKING.",
    body:"Drivers can reduce rear-wing drag in designated situations, helping them gain speed on a straight and attack the car ahead."
  },
  qualifying: {
    num:"02",
    title:"QUALIFYING SETS THE GRID.",
    body:"Drivers compete for starting position before the race. Starting further forward normally means less traffic and more strategic control."
  },
  tyres: {
    num:"03",
    title:"TYRES CHANGE THE RACE.",
    body:"Different tyre compounds trade grip for durability. Heat, track surface and rain can force teams to change their plan."
  },
  rain: {
    num:"04",
    title:"SEPANG WEATHER CAN FLIP EVERYTHING.",
    body:"Tropical rain can arrive quickly and unevenly. Teams must judge the right moment to change tyres without losing too much time."
  }
};

document.querySelectorAll(".rookie-card").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".rookie-card").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const t = rookieTopics[btn.dataset.topic];
    document.getElementById("rookieExplainer").innerHTML = `
      <div class="big-num">${t.num}</div>
      <div><h3>${t.title}</h3><p>${t.body}</p></div>
    `;
  });
});

document.getElementById("strategyForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const condition = document.getElementById("trackCondition").value;
  const tyre = document.getElementById("startingTyre").value;
  const rainLap = document.getElementById("rainLap").value;

  let next = "HARD";
  let box = "LAP 20—26";
  let risk = "LOW";
  let note = "Use the durable tyre to protect track position and extend the first stint.";

  if (condition === "heavy") {
    next = "WET";
    box = "BOX NOW";
    risk = "HIGH";
    note = "Heavy rain changes the priority from tyre life to grip and visibility. Waiting too long can be costly.";
  } else if (condition === "light" || rainLap !== "none") {
    next = "INTERMEDIATE";
    const lap = Number(rainLap || 20);
    box = rainLap === "none" ? "WATCH RADAR" : `LAP ${Math.max(1, lap-2)}—${lap+2}`;
    risk = "MED";
    note = "Stay out while the dry tyre still works. If grip drops quickly, switch to intermediates before the field reacts.";
  } else if (tyre === "soft") {
    next = "MEDIUM";
    box = "LAP 14—20";
    risk = "MED";
    note = "The soft tyre gives early grip but may fade sooner in hot conditions. Protect it or pit before lap time drops sharply.";
  }

  document.getElementById("strategyResult").innerHTML = `
    <div class="result-top">
      <div>
        <div class="card-label">FAN STRATEGY</div>
        <h3>${tyre.toUpperCase()} → ${next}</h3>
      </div>
      <div class="risk">RISK <strong>${risk}</strong></div>
    </div>
    <div class="strategy-flow">
      <div class="flow-step"><span>START</span><strong>${tyre.toUpperCase()}</strong></div>
      <div class="flow-line"></div>
      <div class="flow-step"><span>CONDITION</span><strong>${condition.toUpperCase()}</strong></div>
      <div class="flow-line"></div>
      <div class="flow-step"><span>BOX</span><strong>${box}</strong></div>
    </div>
    <div class="engineer"><span>RACE ENGINEER SAYS</span><p>${note}</p></div>
    <small>Educational fan simulation only. Not official F1 or team strategy.</small>
  `;
});

document.getElementById("predictionForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const winner = document.getElementById("winner").value.trim() || "YOUR PICK";
  const pole = document.getElementById("pole").value.trim() || "YOUR PICK";
  document.getElementById("cardWinner").textContent = winner.toUpperCase();
  document.getElementById("cardPole").textContent = pole.toUpperCase();
  document.getElementById("cardRain").textContent = document.getElementById("rainPick").value;
  document.getElementById("cardStops").textContent = document.getElementById("stops").value;
  document.getElementById("fanCard").scrollIntoView({behavior:"smooth", block:"center"});
});
