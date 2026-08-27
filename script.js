
const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");

menuBtn.addEventListener("click", () => {
  mobileNav.classList.toggle("open");
});

mobileNav.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => mobileNav.classList.remove("open"));
});

const trackData = {
  turn1:{title:"TURN 1",body:"Heavy braking after the main straight. One of Sepang’s key opening-lap and overtaking zones.",tags:["BRAKING","OVERTAKE"]},
  turn2:{title:"TURN 2",body:"A tight follow-up corner. Drivers must balance rotation with a clean exit into the next section.",tags:["TRACTION","EXIT"]},
  turn3:{title:"TURN 3",body:"A faster flowing section where momentum matters more than a single braking point.",tags:["FLOW","BALANCE"]},
  turn4:{title:"TURN 4",body:"A slower corner after a faster approach. Braking stability and traction matter here.",tags:["BRAKING","TRACTION"]},
  turn5:{title:"TURN 5",body:"Part of Sepang’s flowing middle sector. Smooth steering helps protect tyre temperature and balance.",tags:["FLOW","TYRES"]},
  turn6:{title:"TURN 6",body:"Another rhythm corner where carrying speed without overheating the tyres can pay off later.",tags:["RHYTHM","TYRES"]},
  turn7:{title:"TURN 7",body:"A technical change of direction. Drivers need confidence in the front end without compromising the next corner.",tags:["TECHNICAL","BALANCE"]},
  turn8:{title:"TURN 8",body:"A medium-speed section where line choice matters, especially if grip changes with rain.",tags:["LINE","GRIP"]},
  turn9:{title:"TURN 9",body:"A slower uphill-style corner in the classic Sepang rhythm. Easy place to lose momentum.",tags:["SLOW","TRACTION"]},
  turn10:{title:"TURN 10",body:"Acceleration zone where drivers build speed into the next sequence.",tags:["ACCELERATION","SETUP"]},
  turn11:{title:"TURN 11",body:"A technical corner requiring patience on entry and strong traction on exit.",tags:["TECHNICAL","EXIT"]},
  turn12:{title:"TURN 12",body:"Fast direction change. Confidence and aero balance become more important here.",tags:["HIGH SPEED","AERO"]},
  turn13:{title:"TURN 13",body:"Part of the run toward the closing sector. Small mistakes can compromise the next braking zone.",tags:["PRECISION","FLOW"]},
  turn14:{title:"TURN 14",body:"A critical setup corner before the final run. Good exit speed matters for positioning.",tags:["SETUP","EXIT SPEED"]},
  turn15:{title:"TURN 15",body:"The final corner feeds the main straight. A clean exit can create an attack into Turn 1.",tags:["FINAL CORNER","OVERTAKE"]}
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


function makeFanCardPngBlob() {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 1200;
      canvas.height = 1500;
      const ctx = canvas.getContext("2d");

      const grad = ctx.createLinearGradient(0, 0, 1200, 1500);
      grad.addColorStop(0, "#ffb000");
      grad.addColorStop(0.55, "#ff6b00");
      grad.addColorStop(1, "#ff3b16");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(0,0,0,.08)";
      ctx.font = "900 620px Arial";
      ctx.fillText("//", 570, 1420);

      ctx.fillStyle = "#0a0a0a";
      ctx.font = "700 44px Arial";
      ctx.fillText("SEPANG//26", 70, 95);
      ctx.textAlign = "right";
      ctx.font = "700 24px Arial";
      ctx.fillText("MY PICKS", 1130, 92);
      ctx.textAlign = "left";

      ctx.font = "700 22px Arial";
      ctx.fillText("RACE WINNER", 70, 330);
      ctx.font = "900 108px Arial";
      const winner = document.getElementById("cardWinner").textContent || "YOUR PICK";
      wrapCanvasText(ctx, winner, 70, 445, 1060, 110);

      ctx.strokeStyle = "#0a0a0a";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(70, 760);
      ctx.lineTo(1130, 760);
      ctx.stroke();

      const blocks = [
        ["POLE", document.getElementById("cardPole").textContent],
        ["RAIN", document.getElementById("cardRain").textContent],
        ["STRATEGY", document.getElementById("cardStops").textContent]
      ];
      const x = [70, 430, 790];
      blocks.forEach((b, i) => {
        ctx.font = "700 20px Arial";
        ctx.fillText(b[0], x[i], 840);
        ctx.font = "900 40px Arial";
        wrapCanvasText(ctx, b[1], x[i], 900, 300, 44);
      });

      ctx.beginPath();
      ctx.moveTo(70, 1080);
      ctx.lineTo(1130, 1080);
      ctx.stroke();

      ctx.font = "700 22px Arial";
      ctx.fillText("UNOFFICIAL FAN COMPANION · MALAYSIA", 70, 1380);
      ctx.font = "400 18px Arial";
      ctx.fillText("Fan-made. Not affiliated with Formula 1, FIA, teams, or Sepang International Circuit.", 70, 1425);

      canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error("PNG generation failed")), "image/png", 1);
    } catch (err) {
      reject(err);
    }
  });
}

function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = String(text).split(" ");
  let line = "";
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    if (ctx.measureText(testLine).width > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, y);
      line = words[n] + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, y);
}

async function getFanCardFile() {
  const blob = await makeFanCardPngBlob();
  return new File([blob], "sepang26-my-picks.png", {type:"image/png"});
}

document.getElementById("downloadCard").addEventListener("click", async () => {
  const file = await getFanCardFile();
  const url = URL.createObjectURL(file);
  const a = document.createElement("a");
  a.href = url;
  a.download = file.name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
});

document.getElementById("shareCard").addEventListener("click", async () => {
  const file = await getFanCardFile();

  if (navigator.share && navigator.canShare && navigator.canShare({files:[file]})) {
    try {
      await navigator.share({
        title: "My SEPANG//26 Picks",
        text: "My Sepang race-weekend prediction. #SEPANG26",
        files: [file]
      });
      return;
    } catch (err) {
      if (err && err.name === "AbortError") return;
    }
  }

  const url = URL.createObjectURL(file);
  const a = document.createElement("a");
  a.href = url;
  a.download = file.name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
  alert("Direct social sharing is not supported by this browser, so the PNG was downloaded instead.");
});
