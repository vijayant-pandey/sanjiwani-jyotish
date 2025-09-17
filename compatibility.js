function sumDigits(str) {
  return str.split('').reduce((acc, d) => acc + parseInt(d, 10), 0);
}

function reduceNumber(num) {
  while (![11, 22, 33].includes(num) && num > 9) {
    num = sumDigits(String(num));
  }
  return num;
}

function letterToNumber(letter) {
  const code = letter.toUpperCase().charCodeAt(0);
  if (code < 65 || code > 90) return 0;
  return ((code - 64) % 9) || 9;
}

function lifePathNumber(birthDate) {
  const [year, month, day] = birthDate.split('-');
  let total = sumDigits(year) + sumDigits(month) + sumDigits(day);
  return reduceNumber(total);
}

function expressionNumber(name) {
  let total = 0;
  for (let char of name) total += letterToNumber(char);
  return reduceNumber(total);
}

function getPlanetAssoc(number) {
  const mapping = {
    1: "Surya (Sun)", 2: "Chandra (Moon)", 3: "Guru (Jupiter)", 4: "Rahu (North Node)",
    5: "Budh (Mercury)", 6: "Shukra (Venus)", 7: "Ketu (South Node)", 8: "Shani (Saturn)", 9: "Mangal (Mars)",
    11: "Master Intuitive (Moon + Sun)", 22: "Master Builder (Uranus + Moon)", 33: "Master Teacher (Venus + Jupiter)"
  };
  return mapping[number] || "Unknown";
}

function getNumberMeaning(num) {
  const meaning = {
    1: "Independent, authoritative, energetic, leader.",
    2: "Sensitive, diplomatic, caring, partnership oriented.",
    3: "Creative, optimistic, expressive, social.",
    4: "Practical, stable, disciplined, organized.",
    5: "Adventurous, dynamic, witty, communicator.",
    6: "Responsible, nurturing, harmonious, caring.",
    7: "Spiritual, introspective, analytic, wise.",
    8: "Ambitious, powerful, disciplined, executive.",
    9: "Compassionate, generous, idealistic, humanitarian.",
    11: "Intuitive, inspirational, mystic, channel.",
    22: "Visionary, practical, builder, leader.",
    33: "Teacher, healer, nurturing, selfless."
  };
  return meaning[num] || "";
}

function getFriendEnemy(number) {
  const friendsList = {
    1: [1, 4, 6, 8], 2: [2, 4, 5], 3: [3, 6, 9], 4: [1, 2, 7, 8], 5: [2, 5, 6, 9],
    6: [1, 3, 5, 6, 9], 7: [2, 4, 7, 8], 8: [1, 4, 8, 9], 9: [3, 5, 6, 8, 9],
    11: [2, 4, 6], 22: [4, 7, 8], 33: [3, 6, 9]
  };
  const enemiesList = {
    1: [2, 7], 2: [1, 9], 3: [1, 4, 8], 4: [3, 5, 9], 5: [4, 7, 8], 6: [7, 8],
    7: [1, 3, 5, 6, 9], 8: [2, 5, 6], 9: [2, 4, 7],
    11: [3, 7, 8], 22: [5, 9], 33: [1, 2, 4, 5, 7, 8]
  };
  return {
    friends: friendsList[number] || [],
    enemies: enemiesList[number] || []
  };
}

function getCompatMsg(n1, n2) {
  const fr1 = getFriendEnemy(n1).friends;
  const fr2 = getFriendEnemy(n2).friends;
  const en1 = getFriendEnemy(n1).enemies;
  const en2 = getFriendEnemy(n2).enemies;
  let compatibility = "Neutral";
  let details = "Average; may need understanding.";
  if (n1 === n2) {
    compatibility = "Excellent";
    details = "Shared interests, strong mutual understanding.";
  } else if (fr1.includes(n2) || fr2.includes(n1)) {
    compatibility = "Good";
    details = "Friendly vibrations, mutual support and comfort.";
  } else if (en1.includes(n2) || en2.includes(n1)) {
    compatibility = "Low";
    details = "Challenging and may require efforts to balance differences.";
  }
  return { compatibility, details };
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('compatibilityForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = '';
    const n1 = document.getElementById('name1').value.trim();
    const d1 = document.getElementById('birthDate1').value;
    const n2 = document.getElementById('name2').value.trim();
    const d2 = document.getElementById('birthDate2').value;

    if (!n1 || !d1 || !n2 || !d2) {
      errorDiv.textContent = "Please fill all fields.";
      return;
    }

    if (isNaN(new Date(d1)) || isNaN(new Date(d2))) {
      errorDiv.textContent = "Please provide valid birth dates.";
      return;
    }

    const lp1 = lifePathNumber(d1);
    const lp2 = lifePathNumber(d2);
    const expr1 = expressionNumber(n1);
    const expr2 = expressionNumber(n2);

    const p1Planet = getPlanetAssoc(lp1);
    const p2Planet = getPlanetAssoc(lp2);
    const e1Planet = getPlanetAssoc(expr1);
    const e2Planet = getPlanetAssoc(expr2);

    const compatLP = getCompatMsg(lp1, lp2);
    const compatExpr = getCompatMsg(expr1, expr2);

    const reportHTML = `
      <div class="section-title">Couple Numerology Overview (Vedic)</div>
      <table>
        <tr><th></th><th>Partner 1</th><th>Partner 2</th></tr>
        <tr><td>Full Name</td><td>${n1}</td><td>${n2}</td></tr>
        <tr><td>Birth Date</td><td>${d1}</td><td>${d2}</td></tr>
        <tr><td>Life Path Number</td><td>${lp1} (${p1Planet})<br>${getNumberMeaning(lp1)}</td><td>${lp2} (${p2Planet})<br>${getNumberMeaning(lp2)}</td></tr>
        <tr><td>Expression Number</td><td>${expr1} (${e1Planet})<br>${getNumberMeaning(expr1)}</td><td>${expr2} (${e2Planet})<br>${getNumberMeaning(expr2)}</td></tr>
      </table>
      <div class="section-title">Compatibility Analysis</div>
      <div class="compat">Life Path Compatibility: <span>${compatLP.compatibility}</span><br/><small>${compatLP.details}</small></div>
      <div class="compat">Expression Compatibility: <span>${compatExpr.compatibility}</span><br/><small>${compatExpr.details}</small></div>
      <hr>
      <ul>
        <li>Numbers <b>friendly</b> by Vedic tradition increase harmony and understanding.</li>
        <li>Numbers <b>hostile</b> may require patience, respect, and conscious effort.</li>
        <li>Consider both partners’ strengths and planetary influences for genuine well-being.</li>
      </ul>
    `;

    document.getElementById('report').innerHTML = reportHTML;
  });
});
