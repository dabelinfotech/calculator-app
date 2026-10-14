# CalcPro — Smart Calculator & Unit Converter

A modern, responsive calculator and multi-unit converter application available as an **Installable Mobile PWA** (Android, Apple iOS/iPhone, macOS) and as a **Native Mobile App** (Android Studio & iOS Xcode projects via Capacitor).

![CalcPro](https://img.shields.io/badge/Platforms-Android%20%7C%20iOS%20%7C%20macOS%20%7C%20Web-blueviolet)
![License](https://img.shields.io/badge/License-MIT-brightgreen)
![PWA](https://img.shields.io/badge/PWA-Ready-success)

---

## 📱 Mobile App Options

CalcPro is fully ready for mobile in two ways:

### 1. Instant Mobile Install (PWA — Progressive Web App)
Works out-of-the-box with **no app store required**, works **offline**, has **haptic feedback**, and adds an app icon to your home screen or dock.

* **On Android (Chrome / Edge / Samsung Internet):**
  1. Open the calculator URL in your mobile browser.
  2. Tap the **"Install"** button in the header (or tap browser menu `⋮` > **"Install app"** / **"Add to Home screen"**).
  3. The app is installed as a standalone fullscreen app on your device.

* **On Apple iPhone & iPad (Safari):**
  1. Open the calculator URL in Safari.
  2. Tap the **Share** button (`⎙` / square with arrow) at the bottom.
  3. Scroll down and tap **"Add to Home Screen"**.
  4. Tap **Add** — CalcPro will appear with its native app icon and run full screen.

* **On Apple macOS (Mac):**
  * **Safari (macOS Sonoma / Sequoia):** Go to `File` > **"Add to Dock"**.
  * **Chrome / Edge:** Click the **Install** icon in the address bar or menu.

---

### 2. Native Mobile Projects (Capacitor for Android & iOS)
Pre-configured native projects located in:
* `android/` — Native Android Studio project (`com.dabeltech.calcpro`)
* `ios/` — Native Apple Xcode project for iOS & macOS Catalyst

#### Useful NPM Commands:
```bash
# Sync web assets to both Android and iOS projects
npm run sync

# Open project in Android Studio (to run on device / build APK)
npm run open:android

# Open project in Xcode (to run on iPhone / iPad / Mac)
npm run open:ios

# Direct APK build command (requires Android SDK & Gradle)
npm run build:apk
```

---

## 🚀 Calculator Features

### 1. 🧮 Standard Calculator
- Essential arithmetic: Addition (`+`), Subtraction (`−`), Multiplication (`×`), and Division (`÷`).
- Percentage calculations (`%`) and positive/negative sign negation (`±`).
- Real-time expression evaluation and history display.
- Physical keyboard support (Numpad, Enter, Backspace, Esc).

### 2. 🔬 Scientific Calculator
- **Trigonometric Functions**: `sin`, `cos`, `tan` + Inverse functions (`sin⁻¹`, `cos⁻¹`, `tan⁻¹`) via `INV` toggle.
- **Angle Modes**: One-click switching between `RAD` (Radians) and `DEG` (Degrees).
- **Logarithmic Functions**: Base-10 Log (`log`), Natural Log (`ln`).
- **Exponents & Powers**: `x²`, `x³`, `xʸ`, `10ˣ`, and `eˣ`.
- **Special Functions**: Square root (`√`), Factorial (`x!`), Absolute value (`|x|`), and mathematical constants (`π`, `e`).

### 3. 📐 Unit Converter
Bidirectional real-time conversion with one-touch swap and instant quick reference cards:
- **Length**: Millimeter (mm), Centimeter (cm), Meter (m), Kilometer (km), Inch (in), Foot (ft), Yard (yd), Mile (mi), Micrometer (μm), Nanometer (nm).
- **Volume**: Milliliter (mL), Liter (L), Cubic centimeter (cm³), Cubic meter (m³), US Gallon, UK Gallon, Quart, Pint, Cup, Fluid Ounce (fl oz), Tablespoon, Teaspoon.
- **Weight**: Milligram (mg), Gram (g), Kilogram (kg), Metric Ton (t), Ounce (oz), Pound (lb), Stone (st).
- **Temperature**: Celsius (°C), Fahrenheit (°F), Kelvin (K).

---

## 🎨 Design & Experience
- **Glassmorphism Aesthetic**: Deep dark theme with glowing backdrop ambient orbs.
- **Mobile-first Responsiveness**: Ergonomically designed for one-handed thumb use on phones and expansive layout on tablets & desktops.
- **Tactile Haptic Feedback**: Light vibration response on key taps on supported mobile devices.
- **Offline Caching**: Built-in Service Worker ensures the calculator functions with zero internet connection once installed.

---

## 💻 Running the Web App Locally

```bash
# Start local server
npm start
# Or
npx serve . -l 3000
```
- **Desktop:** `http://localhost:3000`
- **Mobile (LAN):** `http://<your-local-ip>:3000`

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).  
*Powered by Dabeltech*
