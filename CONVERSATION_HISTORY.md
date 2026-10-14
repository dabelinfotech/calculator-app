# CalcPro — Project Conversation & Development Record

**Session Date:** October 14, 2026  
**Project:** CalcPro (Standard Calculator, Scientific Calculator & Unit Converter)  
**Author / Organization:** [Dabeltech](https://github.com/dabelinfotech)  
**Repository:** [https://github.com/dabelinfotech/calculator-app](https://github.com/dabelinfotech/calculator-app)

---

## 1. Initial User Request & Requirements

> *"create a mobile and web app that can do the work on normal calculator with scientific calculator and can do unit measurement coversion like meter to centimeter, kilometer to meter, millimter to meter and also those that involve volume"*

### Requirements Breakdown:
1. **Standard Calculator**: Everyday calculations (+, −, ×, ÷), percentage (%), negation (±), real-time expression preview, and keyboard navigation.
2. **Scientific Calculator**:
   - Trigonometry: `sin`, `cos`, `tan` + Inverse functions (`sin⁻¹`, `cos⁻¹`, `tan⁻¹`) via `INV` mode.
   - Angle units: Toggle between `RAD` (Radians) and `DEG` (Degrees).
   - Logarithms: `log` (base-10), `ln` (natural logarithm).
   - Powers & Exponents: `x²`, `x³`, `xʸ`, `10ˣ`, and `eˣ`.
   - Special functions: Square root (`√`), Factorial (`x!`), Absolute value (`|x|`), and mathematical constants (`π`, `e`).
3. **Unit Converter**:
   - **Length**: Millimeter (mm), Centimeter (cm), Meter (m), Kilometer (km), Inch (in), Foot (ft), Yard (yd), Mile (mi), Micrometer (μm), Nanometer (nm).
   - **Volume**: Milliliter (mL), Liter (L), Cubic centimeter (cm³), Cubic meter (m³), US Gallon, UK Gallon, Quart, Pint, Cup, Fluid Ounce (fl oz), Tablespoon, Teaspoon.
   - **Weight**: Milligram (mg), Gram (g), Kilogram (kg), Metric Ton (t), Ounce (oz), Pound (lb), Stone (st).
   - **Temperature**: Celsius (°C), Fahrenheit (°F), Kelvin (K).
   - Features: Real-time calculation, bidirectional unit swapping, and interactive quick-reference cards.
4. **Mobile & Web Compatibility**: Responsive layout adapting to smartphone screens and desktop displays.

---

## 2. Technical Stack & Implementation

- **Markup & Structure (`index.html`)**: Semantic HTML5 with tabbed views for Standard, Scientific, and Converter modes.
- **Styling (`style.css`)**: Vanilla CSS, glassmorphism UI, floating ambient orbs, modern typography (`Inter` and `JetBrains Mono`), tactile ripple effects, and responsive breakpoints.
- **Logic (`script.js`)**: Pure JavaScript event-driven state machine for mathematical operations, precise floating-point rounding, angle transformations, and formula formatting.
- **Documentation (`README.md`)**: Full project documentation with feature descriptions, installation guides, and mobile instructions.

---

## 3. Server Deployment & Addresses

A local live server was started using `http-server` on port `3000`:
- **Desktop / Web:** `http://localhost:3000` (or `http://127.0.0.1:3000`)
- **Mobile (Local Network):** `http://192.168.100.28:3000` *(accessible on mobile devices connected to the same Wi-Fi)*

---

## 4. GitHub Repository Setup

- **Authenticated account:** `dabelinfotech`
- **Created Repository:** `https://github.com/dabelinfotech/calculator-app`
- **Initial Commit:** `a45820f` — CalcPro standard & scientific calculator with unit converter.

---

## 5. Custom Branding Request

> *"let powered by dabeltech appear at the bottom of the clac"*

### Changes Implemented:
1. **`index.html`**: Inserted footer inside the calculator container:
   ```html
   <footer class="app-footer">
     <span class="footer-text">Powered by <span class="footer-brand">Dabeltech</span></span>
   </footer>
   ```
2. **`style.css`**: Added gradient styling matching the accent color palette and responsive bottom spacing.
3. **GitHub Update:** Committed and pushed to `main` branch (`5fe84c3`).

---

## 6. Project File Structure

```text
calculator-app/
├── .gitignore               # Ignored files and system logs
├── CONVERSATION_HISTORY.md  # Detailed session record
├── README.md                # Project documentation and usage guide
├── index.html               # Main UI and layout
├── script.js                # Core computation and conversion engine
└── style.css                # Glassmorphic dark styling and responsiveness
```
