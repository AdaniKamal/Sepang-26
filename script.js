
const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");

menuBtn.addEventListener("click", () => {
  mobileNav.classList.toggle("open");
});

mobileNav.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => mobileNav.classList.remove("open"));
});

const trackData = {
  turn1:{title:"TURN 1",body:"Opening corner at the end of the main straight. Heavy braking and traffic make this an important race-start zone.",tags:["BRAKING","START"]},
  turn2:{title:"TURN 2",body:"A tight follow-up corner immediately after Turn 1. Exit positioning matters for the run into the next section.",tags:["TRACTION","EXIT"]},
  turn3:{title:"TURN 3",body:"A long sweeping section where drivers carry speed and build momentum toward Turn 4.",tags:["SWEEP","MOMENTUM"]},
  turn4:{title:"TURN 4",body:"A distinct change of direction at the top of the circuit layout, setting up the descent into the next sequence.",tags:["DIRECTION","SETUP"]},
  turn5:{title:"TURN 5",body:"Part of the flowing upper-middle section. Smooth line choice helps preserve speed into Turn 6.",tags:["FLOW","LINE"]},
  turn6:{title:"TURN 6",body:"A fast-looking bend in the upper-right section of the circuit, linking into the long run toward Turn 7.",tags:["SPEED","FLOW"]},
  turn7:{title:"TURN 7",body:"The first corner of the right-side complex. Braking and positioning are important before Turn 8.",tags:["BRAKING","POSITION"]},
  turn8:{title:"TURN 8",body:"A second corner in the right-side complex that sends the car back across the circuit toward Turn 9.",tags:["EXIT","TRANSITION"]},
  turn9:{title:"TURN 9",body:"A tight inward corner in the lower-right-middle section. Drivers need controlled entry and clean traction.",tags:["TIGHT","TRACTION"]},
  turn10:{title:"TURN 10",body:"A follow-on corner after Turn 9 that feeds the long lower section of the lap.",tags:["FLOW","EXIT"]},
  turn11:{title:"TURN 11",body:"The lowest point of the circuit layout, a major direction change before the run back toward Turns 12–14.",tags:["DIRECTION","LOWER SECTOR"]},
  turn12:{title:"TURN 12",body:"A corner in the lower-left return section, setting up the next sequence.",tags:["SETUP","RETURN"]},
  turn13:{title:"TURN 13",body:"A further bend in the lower-left section where maintaining rhythm helps into Turn 14.",tags:["RHYTHM","FLOW"]},
  turn14:{title:"TURN 14",body:"The final lower-left corner before the circuit reconnects toward the last turn.",tags:["SETUP","FINAL SECTOR"]},
  turn15:{title:"TURN 15",body:"The final corner before the main straight. Exit speed is important for the run back to Turn 1.",tags:["FINAL CORNER","EXIT SPEED"]}
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


// ===== V5: MET Malaysia via data.gov.my =====
const WEATHER_API = "https://api.data.gov.my/weather/forecast";
const WARNING_API = "https://api.data.gov.my/weather/warning";
const SEPANG_FILTER = "?contains=Sepang@location__location_name";
const RACE_DATES = new Set(["2026-10-02","2026-10-03","2026-10-04"]);

let latestSepangForecast = null;

function weatherKind(text="") {
  const s = String(text).toLowerCase();
  if (s.includes("ribut petir")) return "storm";
  if (s.includes("hujan")) return "rain";
  if (s.includes("jerebu")) return "haze";
  if (s.includes("tiada hujan")) return "dry";
  return "mixed";
}

function weatherIconFor(text="") {
  const kind = weatherKind(text);
  if (kind === "storm") return "⛈";
  if (kind === "rain") return "☂";
  if (kind === "haze") return "≋";
  if (kind === "dry") return "☀";
  return "◐";
}

function englishWeather(text="") {
  const exact = {
    "Tiada hujan":"No rain",
    "Hujan":"Rain",
    "Hujan di beberapa tempat":"Scattered rain",
    "Hujan di satu dua tempat":"Isolated rain",
    "Hujan di satu dua tempat di kawasan pantai":"Isolated rain over coastal areas",
    "Hujan di satu dua tempat di kawasan pedalaman":"Isolated rain over inland areas",
    "Ribut petir":"Thunderstorms",
    "Ribut petir di beberapa tempat":"Scattered thunderstorms",
    "Ribut petir di beberapa tempat di kawasan pedalaman":"Scattered thunderstorms over inland areas",
    "Ribut petir di satu dua tempat":"Isolated thunderstorms",
    "Ribut petir di satu dua tempat di kawasan pantai":"Isolated thunderstorms over coastal areas",
    "Ribut petir di satu dua tempat di kawasan pedalaman":"Isolated thunderstorms over inland areas",
    "Berjerebu":"Hazy"
  };
  return exact[text] || text || "Forecast unavailable";
}

function englishWhen(text="") {
  const map = {
    "Pagi":"Morning","Petang":"Afternoon","Malam":"Night",
    "Pagi dan Petang":"Morning & afternoon",
    "Pagi dan Malam":"Morning & night",
    "Petang dan Malam":"Afternoon & night",
    "Sepanjang Hari":"Throughout the day"
  };
  return map[text] || text || "";
}

function formatForecastDate(dateString) {
  const d = new Date(dateString + "T00:00:00");
  return {
    day: new Intl.DateTimeFormat("en-MY",{weekday:"short"}).format(d).toUpperCase(),
    date: new Intl.DateTimeFormat("en-MY",{day:"2-digit",month:"short"}).format(d).toUpperCase()
  };
}

function applyFanReady(forecast) {
  const summary = forecast?.summary_forecast || "";
  const kind = weatherKind(summary);
  const title = document.getElementById("fanReadyTitle");
  const items = document.getElementById("fanReadyItems");

  let tips = [];
  if (kind === "storm") {
    title.textContent = "THUNDERSTORM MODE";
    tips = ["PACK A PONCHO","PROTECT ELECTRONICS","EXPECT GRIP CHANGES","ALLOW EXTRA TRAVEL TIME"];
  } else if (kind === "rain") {
    title.textContent = "RAIN-READY MODE";
    tips = ["PACK A PONCHO","WATERPROOF YOUR BAG","WATCH TRACK CONDITIONS"];
  } else if (kind === "haze") {
    title.textContent = "HAZE AWARENESS";
    tips = ["CHECK MET UPDATES","PLAN FOR VISIBILITY","STAY HYDRATED"];
  } else {
    title.textContent = "HOT-WEATHER MODE";
    tips = ["HYDRATE EARLY","SUN PROTECTION","LIGHT CLOTHING","KEEP PONCHO READY"];
  }

  items.innerHTML = tips.map(t => `<span>${t}</span>`).join("");
}

function mapWeatherToStrategy(forecast) {
  const kind = weatherKind(forecast?.summary_forecast || "");
  const condition = document.getElementById("trackCondition");
  const rainLap = document.getElementById("rainLap");

  if (kind === "storm") {
    condition.value = "heavy";
    rainLap.value = "25";
  } else if (kind === "rain") {
    condition.value = "light";
    rainLap.value = "25";
  } else {
    condition.value = "dry";
    rainLap.value = "none";
  }

  document.getElementById("strategy").scrollIntoView({behavior:"smooth"});
}

async function loadSepangWeather() {
  const grid = document.getElementById("forecastGrid");

  try {
    const forecastRes = await fetch(WEATHER_API + SEPANG_FILTER);
    if (!forecastRes.ok) throw new Error(`Forecast API returned ${forecastRes.status}`);
    const forecasts = await forecastRes.json();

    if (!Array.isArray(forecasts) || !forecasts.length) {
      throw new Error("No Sepang forecast rows returned");
    }

    // The API can return multiple Sepang rows for the same date.
    // Deduplicate by calendar date so the fan UI always shows ONE card per day.
    forecasts.sort((a,b) => String(a.date).localeCompare(String(b.date)));

    const uniqueByDate = new Map();
    for (const row of forecasts) {
      if (!row?.date) continue;

      if (!uniqueByDate.has(row.date)) {
        uniqueByDate.set(row.date, row);
        continue;
      }

      // Prefer the row with more populated forecast fields if duplicates exist.
      const current = uniqueByDate.get(row.date);
      const score = obj => [
        obj.summary_forecast,
        obj.summary_when,
        obj.morning_forecast,
        obj.afternoon_forecast,
        obj.night_forecast,
        obj.min_temp,
        obj.max_temp
      ].filter(v => v !== null && v !== undefined && v !== "").length;

      if (score(row) > score(current)) uniqueByDate.set(row.date, row);
    }

    const dailyForecasts = Array.from(uniqueByDate.values())
      .sort((a,b) => String(a.date).localeCompare(String(b.date)));

    if (!dailyForecasts.length) throw new Error("No usable Sepang forecast rows returned");

    latestSepangForecast = dailyForecasts[0];

    const today = dailyForecasts[0];
    document.getElementById("weatherTemp").textContent = `${today.max_temp ?? "--"}°`;
    document.getElementById("weatherRange").textContent = `${today.min_temp ?? "--"}° MIN / ${today.max_temp ?? "--"}° MAX`;
    document.getElementById("weatherSummary").textContent = englishWeather(today.summary_forecast);
    document.getElementById("weatherMorning").textContent = englishWeather(today.morning_forecast);
    document.getElementById("weatherAfternoon").textContent = englishWeather(today.afternoon_forecast);
    document.getElementById("weatherNight").textContent = englishWeather(today.night_forecast);
    document.getElementById("weatherIcon").textContent = weatherIconFor(today.summary_forecast);
    document.getElementById("weatherUpdated").textContent = `FORECAST DATE ${formatForecastDate(today.date).date}`;

    const display = dailyForecasts.slice(0,7);
    const localToday = new Intl.DateTimeFormat("en-CA", {
      timeZone:"Asia/Kuala_Lumpur",
      year:"numeric", month:"2-digit", day:"2-digit"
    }).format(new Date());

    grid.innerHTML = display.map(f => {
      const fd = formatForecastDate(f.date);
      const race = RACE_DATES.has(f.date);
      const isToday = f.date === localToday;
      return `
        <article class="forecast-day ${race ? "race-day" : ""} ${isToday ? "today-card" : ""}">
          <div class="forecast-date">${fd.day} · ${fd.date}${race ? " · RACE WEEKEND" : ""}</div>
          ${isToday ? '<div class="today-badge">TODAY</div>' : ''}
          <div class="forecast-icon">${weatherIconFor(f.summary_forecast)}</div>
          <h3>${englishWeather(f.summary_forecast)}</h3>
          <div class="when">${englishWhen(f.summary_when)}</div>
          <div class="temp-range">${f.min_temp ?? "--"}° / ${f.max_temp ?? "--"}°C</div>
        </article>
      `;
    }).join("");

    applyFanReady(today);
  } catch (err) {
    console.error("SEPANG//26 weather error:", err);
    grid.innerHTML = `
      <article class="forecast-day loading-card">
        <span class="api-error">WEATHER DATA TEMPORARILY UNAVAILABLE</span>
        <strong>SEPANG//26 STILL WORKS OFFLINE</strong>
        <p>Refresh later for the latest MET Malaysia forecast via data.gov.my.</p>
      </article>
    `;
    document.getElementById("weatherSummary").textContent = "Weather feed temporarily unavailable.";
    document.getElementById("weatherRange").textContent = "CHECK AGAIN SOON";
    document.getElementById("fanReadyTitle").textContent = "DEFAULT RACE-DAY PREP";
    document.getElementById("fanReadyItems").innerHTML =
      "<span>HYDRATE</span><span>PACK A PONCHO</span><span>PROTECT ELECTRONICS</span>";
  }

  // Weather warnings are queried separately because they have a different schema.
  try {
    const warningRes = await fetch(WARNING_API + "?limit=20");
    if (!warningRes.ok) return;
    const warnings = await warningRes.json();
    if (!Array.isArray(warnings)) return;

    const now = new Date();
    const relevant = warnings.find(w => {
      const text = [
        w.heading_en,w.text_en,w.instruction_en,
        w.heading_bm,w.text_bm,w.instruction_bm
      ].filter(Boolean).join(" ").toLowerCase();

      const locationHit = text.includes("sepang") || text.includes("selangor");
      const validTo = w.valid_to ? new Date(w.valid_to) : null;
      const stillValid = !validTo || validTo >= now;
      return locationHit && stillValid;
    });

    if (relevant) {
      const box = document.getElementById("weatherAlert");
      box.hidden = false;
      document.getElementById("weatherAlertTitle").textContent =
        relevant.heading_en || relevant.warning_issue?.title_en || "MET Malaysia weather warning";
      document.getElementById("weatherAlertText").textContent =
        relevant.instruction_en || relevant.text_en || "Please follow the latest MET Malaysia advisory.";
    }
  } catch (err) {
    console.warn("Weather warning feed unavailable:", err);
  }
}

document.getElementById("useWeatherStrategy").addEventListener("click", () => {
  if (latestSepangForecast) mapWeatherToStrategy(latestSepangForecast);
  else document.getElementById("strategy").scrollIntoView({behavior:"smooth"});
});

loadSepangWeather();


// ===== V6: weather card interaction =====
const weatherCard = document.getElementById("weatherCard");

function setWeatherCardOpen(open) {
  weatherCard.classList.toggle("is-open", open);
  weatherCard.setAttribute("aria-expanded", String(open));
}

weatherCard.addEventListener("click", (event) => {
  if (event.target.closest("a")) return;
  setWeatherCardOpen(!weatherCard.classList.contains("is-open"));
});

weatherCard.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    setWeatherCardOpen(!weatherCard.classList.contains("is-open"));
  }
  if (event.key === "Escape") setWeatherCardOpen(false);
});

// ===== V6: forecast carousel =====
const forecastGrid = document.getElementById("forecastGrid");
const forecastPrev = document.getElementById("forecastPrev");
const forecastNext = document.getElementById("forecastNext");

function forecastScrollAmount() {
  const firstCard = forecastGrid.querySelector(".forecast-day");
  if (!firstCard) return forecastGrid.clientWidth * 0.8;
  const gap = 10;
  return firstCard.getBoundingClientRect().width + gap;
}

forecastPrev.addEventListener("click", () => {
  forecastGrid.scrollBy({left:-forecastScrollAmount(), behavior:"smooth"});
});

forecastNext.addEventListener("click", () => {
  forecastGrid.scrollBy({left:forecastScrollAmount(), behavior:"smooth"});
});

function updateForecastArrows() {
  const maxScroll = forecastGrid.scrollWidth - forecastGrid.clientWidth - 4;
  forecastPrev.disabled = forecastGrid.scrollLeft <= 4;
  forecastNext.disabled = forecastGrid.scrollLeft >= maxScroll;
}

forecastGrid.addEventListener("scroll", updateForecastArrows, {passive:true});
window.addEventListener("resize", updateForecastArrows);
setTimeout(updateForecastArrows, 900);
