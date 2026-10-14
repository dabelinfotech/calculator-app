/* ================================================
   CalcPro — Application Logic
   ================================================ */

// ===========================
// MODE / TAB SWITCHING
// ===========================

const modes = ['standard', 'scientific', 'converter'];
let currentMode = 'standard';

const tabBtns = document.querySelectorAll('.mode-tab');
const tabIndicator = document.getElementById('tabIndicator');

function switchMode(mode) {
  currentMode = mode;
  const idx = modes.indexOf(mode);

  tabBtns.forEach(b => b.classList.toggle('active', b.dataset.mode === mode));
  tabIndicator.setAttribute('data-pos', idx);

  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.getElementById(`panel-${mode}`).classList.add('active');
}

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => switchMode(btn.dataset.mode));
});

// ===========================
// RIPPLE EFFECT
// ===========================

document.addEventListener('click', (e) => {
  const btn = e.target.closest('.key, .swap-btn, .mode-tab, .cat-tab, .sci-toggle');
  if (!btn) return;

  const rect = btn.getBoundingClientRect();
  const ripple = document.createElement('span');
  ripple.classList.add('ripple');
  const size = Math.max(rect.width, rect.height);
  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
  ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 500);
});


// ===========================
// STANDARD CALCULATOR
// ===========================

const stdCalc = (() => {
  let current = '0';
  let previous = '';
  let operator = null;
  let shouldReset = false;
  let lastExpression = '';

  const resultEl = document.getElementById('std-result');
  const exprEl = document.getElementById('std-expression');

  function updateDisplay() {
    let display = current;
    if (display.length > 12) resultEl.classList.add('long');
    else resultEl.classList.remove('long');
    if (display.length > 18) resultEl.classList.add('very-long');
    else resultEl.classList.remove('very-long');
    resultEl.textContent = display;
    exprEl.textContent = lastExpression;
  }

  function formatNum(n) {
    if (n === Infinity || n === -Infinity) return 'Error';
    if (isNaN(n)) return 'Error';
    const str = String(n);
    if (str.length > 15) return parseFloat(n.toPrecision(12)).toString();
    return str;
  }

  const opSymbols = { '+': '+', '-': '−', '*': '×', '/': '÷' };

  function handleNumber(val) {
    if (shouldReset) {
      current = val;
      shouldReset = false;
    } else {
      current = current === '0' ? val : current + val;
    }
    updateDisplay();
  }

  function handleDecimal() {
    if (shouldReset) {
      current = '0.';
      shouldReset = false;
    } else if (!current.includes('.')) {
      current += '.';
    }
    updateDisplay();
  }

  function handleOperator(op) {
    if (operator && !shouldReset) {
      calculate();
    }
    previous = current;
    operator = op;
    shouldReset = true;
    lastExpression = `${previous} ${opSymbols[op]}`;

    // Highlight active operator
    document.querySelectorAll('#std-keypad .key.op').forEach(b => b.classList.remove('active-op'));
    const opBtn = document.querySelector(`#std-keypad .key.op[data-value="${op}"]`);
    if (opBtn) opBtn.classList.add('active-op');

    updateDisplay();
  }

  function calculate() {
    if (!operator || previous === '') return;
    const a = parseFloat(previous);
    const b = parseFloat(current);
    let result;

    switch (operator) {
      case '+': result = a + b; break;
      case '-': result = a - b; break;
      case '*': result = a * b; break;
      case '/': result = b === 0 ? NaN : a / b; break;
    }

    lastExpression = `${previous} ${opSymbols[operator]} ${current} =`;
    current = formatNum(result);
    operator = null;
    previous = '';
    shouldReset = true;

    document.querySelectorAll('#std-keypad .key.op').forEach(b => b.classList.remove('active-op'));
    updateDisplay();
  }

  function handleClear() {
    current = '0';
    previous = '';
    operator = null;
    shouldReset = false;
    lastExpression = '';
    document.querySelectorAll('#std-keypad .key.op').forEach(b => b.classList.remove('active-op'));
    updateDisplay();
  }

  function handleSign() {
    if (current === '0') return;
    current = current.startsWith('-') ? current.slice(1) : '-' + current;
    updateDisplay();
  }

  function handlePercent() {
    current = formatNum(parseFloat(current) / 100);
    updateDisplay();
  }

  // Event delegation
  document.getElementById('std-keypad').addEventListener('click', (e) => {
    const btn = e.target.closest('.key');
    if (!btn) return;

    const action = btn.dataset.action;
    const value = btn.dataset.value;

    switch (action) {
      case 'number':   handleNumber(value); break;
      case 'decimal':  handleDecimal(); break;
      case 'operator': handleOperator(value); break;
      case 'equals':   calculate(); break;
      case 'clear':    handleClear(); break;
      case 'sign':     handleSign(); break;
      case 'percent':  handlePercent(); break;
    }
  });

  return { handleClear };
})();


// ===========================
// SCIENTIFIC CALCULATOR
// ===========================

const sciCalc = (() => {
  let expression = '';
  let angleMode = 'rad'; // 'rad' or 'deg'
  let isInverse = false;

  const resultEl = document.getElementById('sci-result');
  const exprEl = document.getElementById('sci-expression');
  const angleBadge = document.getElementById('sci-angle-badge');

  function updateDisplay(result) {
    exprEl.textContent = expression || '';
    if (result !== undefined) {
      let r = String(result);
      if (r.length > 12) resultEl.classList.add('long');
      else resultEl.classList.remove('long');
      if (r.length > 18) resultEl.classList.add('very-long');
      else resultEl.classList.remove('very-long');
      resultEl.textContent = r;
    }
    angleBadge.textContent = angleMode.toUpperCase();
  }

  function formatResult(n) {
    if (n === Infinity || n === -Infinity) return 'Error';
    if (isNaN(n)) return 'Error';
    if (Number.isInteger(n) && Math.abs(n) < 1e15) return n.toString();
    return parseFloat(n.toPrecision(12)).toString();
  }

  function toRad(deg) { return deg * Math.PI / 180; }
  function toDeg(rad) { return rad * 180 / Math.PI; }

  function factorial(n) {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    if (n > 170) return Infinity;
    if (!Number.isInteger(n)) return gamma(n + 1);
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
  }

  // Stirling approximation for gamma
  function gamma(z) {
    if (z < 0.5) return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z));
    z -= 1;
    const g = 7;
    const c = [
      0.99999999999980993, 676.5203681218851, -1259.1392167224028,
      771.32342877765313, -176.61502916214059, 12.507343278686905,
      -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7
    ];
    let x = c[0];
    for (let i = 1; i < g + 2; i++) x += c[i] / (z + i);
    const t = z + g + 0.5;
    return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x;
  }

  // Angle-aware trig
  function trigFn(fn, val) {
    const v = angleMode === 'deg' ? toRad(val) : val;
    switch (fn) {
      case 'sin': return Math.sin(v);
      case 'cos': return Math.cos(v);
      case 'tan': return Math.tan(v);
    }
  }

  function invTrigFn(fn, val) {
    let result;
    switch (fn) {
      case 'sin': result = Math.asin(val); break;
      case 'cos': result = Math.acos(val); break;
      case 'tan': result = Math.atan(val); break;
    }
    return angleMode === 'deg' ? toDeg(result) : result;
  }

  function handleSciFn(fn) {
    const currentVal = parseFloat(resultEl.textContent) || 0;
    let result;

    switch (fn) {
      case 'sin':
        if (isInverse) {
          expression = `asin(${currentVal})`;
          result = invTrigFn('sin', currentVal);
        } else {
          expression = `sin(${currentVal})`;
          result = trigFn('sin', currentVal);
        }
        break;
      case 'cos':
        if (isInverse) {
          expression = `acos(${currentVal})`;
          result = invTrigFn('cos', currentVal);
        } else {
          expression = `cos(${currentVal})`;
          result = trigFn('cos', currentVal);
        }
        break;
      case 'tan':
        if (isInverse) {
          expression = `atan(${currentVal})`;
          result = invTrigFn('tan', currentVal);
        } else {
          expression = `tan(${currentVal})`;
          result = trigFn('tan', currentVal);
        }
        break;
      case 'log':
        if (isInverse) {
          expression = `10^(${currentVal})`;
          result = Math.pow(10, currentVal);
        } else {
          expression = `log(${currentVal})`;
          result = Math.log10(currentVal);
        }
        break;
      case 'ln':
        if (isInverse) {
          expression = `e^(${currentVal})`;
          result = Math.exp(currentVal);
        } else {
          expression = `ln(${currentVal})`;
          result = Math.log(currentVal);
        }
        break;
      case 'sqrt':
        if (isInverse) {
          expression = `(${currentVal})²`;
          result = currentVal * currentVal;
        } else {
          expression = `√(${currentVal})`;
          result = Math.sqrt(currentVal);
        }
        break;
      case 'square':
        expression = `(${currentVal})²`;
        result = currentVal * currentVal;
        break;
      case 'cube':
        expression = `(${currentVal})³`;
        result = currentVal * currentVal * currentVal;
        break;
      case 'power':
        expression = `${currentVal}^`;
        resultEl.textContent = formatResult(currentVal);
        exprEl.textContent = expression;
        // Power mode: next input will be the exponent
        sciState.pendingPower = currentVal;
        sciState.awaitingExponent = true;
        sciState.inputBuffer = '';
        return;
      case 'factorial':
        expression = `${currentVal}!`;
        result = factorial(currentVal);
        break;
      case 'pi':
        expression = 'π';
        result = Math.PI;
        break;
      case 'e':
        expression = 'e';
        result = Math.E;
        break;
      case 'abs':
        expression = `|${currentVal}|`;
        result = Math.abs(currentVal);
        break;
      case 'exp':
        expression = `e^(${currentVal})`;
        result = Math.exp(currentVal);
        break;
      case 'tenx':
        expression = `10^(${currentVal})`;
        result = Math.pow(10, currentVal);
        break;
    }

    const formatted = formatResult(result);
    sciState.inputBuffer = formatted;
    sciState.hasResult = true;
    updateDisplay(formatted);
  }

  // INV button labels
  const invLabels = {
    'sci-sin': ['sin', 'sin⁻¹'],
    'sci-cos': ['cos', 'cos⁻¹'],
    'sci-tan': ['tan', 'tan⁻¹'],
    'sci-log': ['log', '10ˣ'],
    'sci-ln':  ['ln', 'eˣ'],
    'sci-sqrt': ['√', 'x²'],
  };

  function toggleInverse() {
    isInverse = !isInverse;
    document.getElementById('sci-inv-btn').classList.toggle('active', isInverse);
    for (const [id, [normal, inv]] of Object.entries(invLabels)) {
      const el = document.getElementById(id);
      if (el) el.textContent = isInverse ? inv : normal;
    }
  }

  // Scientific calculator state
  const sciState = {
    inputBuffer: '0',
    operator: null,
    previousValue: null,
    hasResult: false,
    pendingPower: null,
    awaitingExponent: false,
  };

  function handleSciNumber(val) {
    if (sciState.hasResult) {
      sciState.inputBuffer = val;
      sciState.hasResult = false;
    } else {
      sciState.inputBuffer = sciState.inputBuffer === '0' ? val : sciState.inputBuffer + val;
    }
    expression = '';
    updateDisplay(sciState.inputBuffer);
  }

  function handleSciDecimal() {
    if (sciState.hasResult) {
      sciState.inputBuffer = '0.';
      sciState.hasResult = false;
    } else if (!sciState.inputBuffer.includes('.')) {
      sciState.inputBuffer += '.';
    }
    updateDisplay(sciState.inputBuffer);
  }

  function handleSciOperator(op) {
    if (sciState.operator && !sciState.hasResult) {
      handleSciEquals();
    }
    sciState.previousValue = parseFloat(sciState.inputBuffer);
    sciState.operator = op;
    sciState.hasResult = true;

    const opSymbols = { '+': '+', '-': '−', '*': '×', '/': '÷' };
    expression = `${sciState.previousValue} ${opSymbols[op]}`;
    updateDisplay(sciState.inputBuffer);
  }

  function handleSciEquals() {
    if (sciState.awaitingExponent) {
      const exp = parseFloat(sciState.inputBuffer);
      const result = Math.pow(sciState.pendingPower, exp);
      expression = `${sciState.pendingPower}^${exp} =`;
      sciState.inputBuffer = formatResult(result);
      sciState.awaitingExponent = false;
      sciState.pendingPower = null;
      sciState.hasResult = true;
      updateDisplay(sciState.inputBuffer);
      return;
    }

    if (sciState.operator === null || sciState.previousValue === null) return;

    const a = sciState.previousValue;
    const b = parseFloat(sciState.inputBuffer);
    let result;

    const opSymbols = { '+': '+', '-': '−', '*': '×', '/': '÷' };

    switch (sciState.operator) {
      case '+': result = a + b; break;
      case '-': result = a - b; break;
      case '*': result = a * b; break;
      case '/': result = b === 0 ? NaN : a / b; break;
    }

    expression = `${a} ${opSymbols[sciState.operator]} ${b} =`;
    sciState.inputBuffer = formatResult(result);
    sciState.operator = null;
    sciState.previousValue = null;
    sciState.hasResult = true;
    updateDisplay(sciState.inputBuffer);
  }

  function handleSciClear() {
    sciState.inputBuffer = '0';
    sciState.operator = null;
    sciState.previousValue = null;
    sciState.hasResult = false;
    sciState.pendingPower = null;
    sciState.awaitingExponent = false;
    expression = '';
    updateDisplay('0');
  }

  function handleSciBackspace() {
    if (sciState.hasResult) return;
    sciState.inputBuffer = sciState.inputBuffer.length > 1 
      ? sciState.inputBuffer.slice(0, -1)
      : '0';
    updateDisplay(sciState.inputBuffer);
  }

  function handleSciSign() {
    if (sciState.inputBuffer === '0') return;
    sciState.inputBuffer = sciState.inputBuffer.startsWith('-')
      ? sciState.inputBuffer.slice(1)
      : '-' + sciState.inputBuffer;
    updateDisplay(sciState.inputBuffer);
  }

  function handleSciPercent() {
    sciState.inputBuffer = formatResult(parseFloat(sciState.inputBuffer) / 100);
    sciState.hasResult = true;
    updateDisplay(sciState.inputBuffer);
  }

  // Angle mode buttons
  document.getElementById('sci-rad-btn').addEventListener('click', () => {
    angleMode = 'rad';
    document.getElementById('sci-rad-btn').classList.add('active');
    document.getElementById('sci-deg-btn').classList.remove('active');
    angleBadge.textContent = 'RAD';
  });

  document.getElementById('sci-deg-btn').addEventListener('click', () => {
    angleMode = 'deg';
    document.getElementById('sci-deg-btn').classList.add('active');
    document.getElementById('sci-rad-btn').classList.remove('active');
    angleBadge.textContent = 'DEG';
  });

  document.getElementById('sci-inv-btn').addEventListener('click', toggleInverse);

  // Event delegation for scientific keypad
  document.getElementById('sci-keypad').addEventListener('click', (e) => {
    const btn = e.target.closest('.key');
    if (!btn) return;

    const action = btn.dataset.action;
    const value = btn.dataset.value;

    switch (action) {
      case 'number':    handleSciNumber(value); break;
      case 'decimal':   handleSciDecimal(); break;
      case 'operator':  handleSciOperator(value); break;
      case 'equals':    handleSciEquals(); break;
      case 'clear':     handleSciClear(); break;
      case 'backspace': handleSciBackspace(); break;
      case 'sign':      handleSciSign(); break;
      case 'percent':   handleSciPercent(); break;
      case 'sci-fn':    handleSciFn(value); break;
      case 'paren':     /* parentheses - advanced expression mode */ break;
    }
  });

  return { handleClear: handleSciClear };
})();


// ===========================
// UNIT CONVERTER
// ===========================

const converter = (() => {
  // Unit definitions: category -> { unitName: { label, toBase, fromBase } }
  // "toBase" converts the unit to a base unit; "fromBase" converts base to unit.
  // For temperature, we use custom functions.

  const units = {
    length: {
      base: 'meter',
      units: {
        'millimeter':  { label: 'Millimeter (mm)',  factor: 0.001 },
        'centimeter':  { label: 'Centimeter (cm)',   factor: 0.01 },
        'meter':       { label: 'Meter (m)',         factor: 1 },
        'kilometer':   { label: 'Kilometer (km)',    factor: 1000 },
        'inch':        { label: 'Inch (in)',         factor: 0.0254 },
        'foot':        { label: 'Foot (ft)',         factor: 0.3048 },
        'yard':        { label: 'Yard (yd)',         factor: 0.9144 },
        'mile':        { label: 'Mile (mi)',         factor: 1609.344 },
        'micrometer':  { label: 'Micrometer (μm)',   factor: 0.000001 },
        'nanometer':   { label: 'Nanometer (nm)',    factor: 0.000000001 },
      }
    },
    volume: {
      base: 'liter',
      units: {
        'milliliter':      { label: 'Milliliter (mL)',       factor: 0.001 },
        'liter':           { label: 'Liter (L)',             factor: 1 },
        'cubic_centimeter':{ label: 'Cubic cm (cm³)',        factor: 0.001 },
        'cubic_meter':     { label: 'Cubic meter (m³)',      factor: 1000 },
        'gallon_us':       { label: 'US Gallon (gal)',       factor: 3.78541 },
        'gallon_uk':       { label: 'UK Gallon (gal)',       factor: 4.54609 },
        'quart':           { label: 'US Quart (qt)',         factor: 0.946353 },
        'pint':            { label: 'US Pint (pt)',          factor: 0.473176 },
        'cup':             { label: 'US Cup',                factor: 0.236588 },
        'fluid_ounce':     { label: 'US Fluid oz (fl oz)',   factor: 0.0295735 },
        'tablespoon':      { label: 'Tablespoon (tbsp)',     factor: 0.0147868 },
        'teaspoon':        { label: 'Teaspoon (tsp)',        factor: 0.00492892 },
      }
    },
    weight: {
      base: 'kilogram',
      units: {
        'milligram':  { label: 'Milligram (mg)',    factor: 0.000001 },
        'gram':       { label: 'Gram (g)',          factor: 0.001 },
        'kilogram':   { label: 'Kilogram (kg)',     factor: 1 },
        'metric_ton': { label: 'Metric ton (t)',    factor: 1000 },
        'ounce':      { label: 'Ounce (oz)',        factor: 0.0283495 },
        'pound':      { label: 'Pound (lb)',        factor: 0.453592 },
        'stone':      { label: 'Stone (st)',        factor: 6.35029 },
      }
    },
    temperature: {
      base: 'celsius',
      units: {
        'celsius':    { label: 'Celsius (°C)' },
        'fahrenheit': { label: 'Fahrenheit (°F)' },
        'kelvin':     { label: 'Kelvin (K)' },
      },
      convert: (value, from, to) => {
        // Convert to Celsius first
        let celsius;
        switch (from) {
          case 'celsius':    celsius = value; break;
          case 'fahrenheit': celsius = (value - 32) * 5 / 9; break;
          case 'kelvin':     celsius = value - 273.15; break;
        }
        // Convert from Celsius to target
        switch (to) {
          case 'celsius':    return celsius;
          case 'fahrenheit': return celsius * 9 / 5 + 32;
          case 'kelvin':     return celsius + 273.15;
        }
      }
    }
  };

  let currentCategory = 'length';

  const fromInput = document.getElementById('converter-from-input');
  const toInput = document.getElementById('converter-to-input');
  const fromSelect = document.getElementById('converter-from-unit');
  const toSelect = document.getElementById('converter-to-unit');
  const formulaEl = document.getElementById('conversion-formula');
  const refGrid = document.getElementById('quick-ref-grid');

  function populateSelects() {
    const cat = units[currentCategory];
    const unitKeys = Object.keys(cat.units);

    fromSelect.innerHTML = '';
    toSelect.innerHTML = '';

    unitKeys.forEach(key => {
      const opt1 = document.createElement('option');
      opt1.value = key;
      opt1.textContent = cat.units[key].label;
      fromSelect.appendChild(opt1);

      const opt2 = document.createElement('option');
      opt2.value = key;
      opt2.textContent = cat.units[key].label;
      toSelect.appendChild(opt2);
    });

    // Default selections
    if (currentCategory === 'length') {
      fromSelect.value = 'meter';
      toSelect.value = 'centimeter';
    } else if (currentCategory === 'volume') {
      fromSelect.value = 'liter';
      toSelect.value = 'milliliter';
    } else if (currentCategory === 'weight') {
      fromSelect.value = 'kilogram';
      toSelect.value = 'gram';
    } else if (currentCategory === 'temperature') {
      fromSelect.value = 'celsius';
      toSelect.value = 'fahrenheit';
    }
  }

  function convert() {
    const value = parseFloat(fromInput.value);
    if (isNaN(value)) {
      toInput.value = '';
      formulaEl.textContent = '';
      return;
    }

    const from = fromSelect.value;
    const to = toSelect.value;
    const cat = units[currentCategory];
    let result;

    if (cat.convert) {
      // Temperature
      result = cat.convert(value, from, to);
    } else {
      // Factor-based
      const baseValue = value * cat.units[from].factor;
      result = baseValue / cat.units[to].factor;
    }

    // Format result
    let formatted;
    if (Number.isInteger(result) && Math.abs(result) < 1e15) {
      formatted = result.toLocaleString('en-US');
    } else {
      formatted = parseFloat(result.toPrecision(10)).toString();
      // Add commas for large numbers
      const parts = formatted.split('.');
      parts[0] = parseInt(parts[0]).toLocaleString('en-US');
      formatted = parts.join('.');
    }

    toInput.value = formatted;

    // Show formula
    const fromLabel = cat.units[from].label.split(' (')[0];
    const toLabel = cat.units[to].label.split(' (')[0];
    formulaEl.textContent = `${value} ${fromLabel} = ${formatted} ${toLabel}`;
  }

  function buildQuickRef() {
    refGrid.innerHTML = '';
    const from = fromSelect.value;
    const cat = units[currentCategory];

    const refValues = currentCategory === 'temperature' ? [0, 100, 32, 212] : [1, 10, 100, 1000];

    refValues.forEach(val => {
      Object.keys(cat.units).forEach(to => {
        if (to === from) return;
        let result;
        if (cat.convert) {
          result = cat.convert(val, from, to);
        } else {
          const baseValue = val * cat.units[from].factor;
          result = baseValue / cat.units[to].factor;
        }
        const formatted = parseFloat(result.toPrecision(8)).toString();
        const fromAbbr = cat.units[from].label.match(/\(([^)]+)\)/)?.[1] || from;
        const toAbbr = cat.units[to].label.match(/\(([^)]+)\)/)?.[1] || to;

        const card = document.createElement('div');
        card.className = 'ref-card';
        card.innerHTML = `<span>${val} ${fromAbbr}</span><span class="ref-val">${formatted} ${toAbbr}</span>`;
        card.addEventListener('click', () => {
          fromInput.value = val;
          toSelect.value = to;
          convert();
          buildQuickRef();
        });
        refGrid.appendChild(card);
      });

      // Limit cards to keep UI clean
      if (refGrid.children.length >= 8) return;
    });

    // Trim to 8 cards max
    while (refGrid.children.length > 8) {
      refGrid.removeChild(refGrid.lastChild);
    }
  }

  // Category tabs
  document.querySelectorAll('.cat-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      currentCategory = btn.dataset.category;
      document.querySelectorAll('.cat-tab').forEach(b => b.classList.toggle('active', b === btn));
      populateSelects();
      convert();
      buildQuickRef();
    });
  });

  // Input events
  fromInput.addEventListener('input', () => { convert(); buildQuickRef(); });
  fromSelect.addEventListener('change', () => { convert(); buildQuickRef(); });
  toSelect.addEventListener('change', () => { convert(); buildQuickRef(); });

  // Swap button
  document.getElementById('converter-swap').addEventListener('click', () => {
    const tempUnit = fromSelect.value;
    const tempVal = toInput.value.replace(/,/g, '');
    fromSelect.value = toSelect.value;
    toSelect.value = tempUnit;
    fromInput.value = tempVal || fromInput.value;
    convert();
    buildQuickRef();
  });

  // Initialize
  populateSelects();
  convert();
  buildQuickRef();
})();


// ===========================
// KEYBOARD SUPPORT
// ===========================

document.addEventListener('keydown', (e) => {
  if (currentMode === 'standard') {
    if (e.key >= '0' && e.key <= '9') {
      document.querySelector(`#std-keypad .key[data-value="${e.key}"]`)?.click();
    } else if (e.key === '.') {
      document.getElementById('std-dot')?.click();
    } else if (e.key === '+') {
      document.getElementById('std-add')?.click();
    } else if (e.key === '-') {
      document.getElementById('std-sub')?.click();
    } else if (e.key === '*') {
      document.getElementById('std-mul')?.click();
    } else if (e.key === '/') {
      e.preventDefault();
      document.getElementById('std-div')?.click();
    } else if (e.key === 'Enter' || e.key === '=') {
      document.getElementById('std-eq')?.click();
    } else if (e.key === 'Escape' || e.key === 'Delete') {
      document.getElementById('std-clear')?.click();
    }
  } else if (currentMode === 'scientific') {
    if (e.key >= '0' && e.key <= '9') {
      document.querySelector(`#sci-keypad .key[data-value="${e.key}"]`)?.click();
    } else if (e.key === '.') {
      document.getElementById('sci-dot')?.click();
    } else if (e.key === '+') {
      document.getElementById('sci-add')?.click();
    } else if (e.key === '-') {
      document.getElementById('sci-sub')?.click();
    } else if (e.key === '*') {
      document.getElementById('sci-mul')?.click();
    } else if (e.key === '/') {
      e.preventDefault();
      document.getElementById('sci-div')?.click();
    } else if (e.key === 'Enter' || e.key === '=') {
      document.getElementById('sci-eq')?.click();
    } else if (e.key === 'Escape' || e.key === 'Delete') {
      document.getElementById('sci-clear')?.click();
    } else if (e.key === 'Backspace') {
      document.getElementById('sci-back')?.click();
    }
  }
});
