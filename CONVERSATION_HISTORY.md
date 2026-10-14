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

## 6. Custom Branding Request

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

## 7. Mobile App Implementation (PWA + Android, Apple iOS & macOS)

> *"can you create the mobile app for the calculator"*  
> *"do 1 (Recommended) and also the macOS and Apple mobile phone"*

### Implementation Details:
1. **Progressive Web App (PWA) Foundation**:
   - Web App Manifest (`manifest.json`): Standalone display mode, dark violet branding theme, and quick shortcuts.
   - Offline Caching Service Worker (`sw.js`): Automatically caches assets for zero-latency offline performance.
   - High-Resolution Multi-Platform Icons: Generated in `180x180` (Apple Touch Icon), `192x192` (Android Maskable), and `512x512` (Splash & Play Store) formats.
   - Apple iOS / macOS Integration: `apple-mobile-web-app-capable`, `black-translucent` status bar, and Apple touch icons.
   - Mobile Haptic Vibrations: Integrated `navigator.vibrate` on keypress for native-feeling tactile feedback.
   - Dynamic Install Prompt: Header install button with tailored instructions for Android, iPhone / iPad (Safari Add to Home Screen), and Mac (Add to Dock).

2. **Native Mobile App Projects (Capacitor)**:
   - Configured `@capacitor/core`, `@capacitor/cli`, `@capacitor/android`, and `@capacitor/ios`.
   - Native Android Studio project located in `android/` (`com.dabeltech.calcpro`).
   - Native Apple Xcode project located in `ios/` supporting iOS (iPhone/iPad) and macOS Catalyst.
   - Configured launcher mipmaps and iOS AppIcon assets.
   - Automated sync pipeline via `npm run sync`.

---

## 8. Project File Structure

```text
calculator-app/
├── .github/workflows/       # CI/CD workflows for building all platform installers
│   └── build-installers.yml # GitHub Actions pipeline for Android, Windows, macOS, iOS
├── .gitignore               # Ignored files, dependencies, and build artifacts
├── CONVERSATION_HISTORY.md  # Detailed session record
├── README.md                # Project documentation and mobile user guide
├── android/                 # Native Android Studio Project
├── ios/                     # Native Apple Xcode Project (iOS & macOS)
├── electron/                # Electron desktop shell
│   └── main.js
├── icons/                   # High-res vector and PNG app icons (180, 192, 512, 1024)
├── release/                 # Local Windows builds (.exe)
├── www/                     # Bundled assets for Capacitor mobile builds
├── capacitor.config.json    # Capacitor configuration
├── package.json             # NPM project definitions & mobile build scripts
├── manifest.json            # Web app manifest for PWA installation
├── sw.js                    # Service worker for offline functionality
├── sync-web.js              # Build sync automation script
├── index.html               # Main UI and layout
├── script.js                # Core computation engine and PWA lifecycle handlers
└── style.css                # Glassmorphic dark styling and mobile-first responsiveness
```

---

## 9. Installation Setup Files & Multi-Platform Release (v1.0.0)

> *"provide the installation setup file for all"*

### Implementation Details:
1. **Desktop Electron Packaging**:
   - Added Electron desktop shell (`electron/main.js`) with native menu bar, window bounds, and external link handling.
   - Integrated `electron-builder` to package Windows installers locally and via CI.
   - Built Windows NSIS Installer (`CalcPro-Setup-1.0.0.exe`, 110.7 MB) and Portable executable (`CalcPro-Portable-1.0.0.exe`, 110.4 MB).

2. **Automated Cloud CI/CD Build Pipeline (`.github/workflows/build-installers.yml`)**:
   - Multi-job GitHub Actions workflow triggered on version tags (`v*`) and manual dispatch.
   - **Android Job**: Runs on Ubuntu with JDK 21, compiles Android APK via Gradle (`CalcPro-Android.apk`, 4.2 MB).
   - **Windows Job**: Compiles NSIS installer and portable EXE.
   - **macOS Job**: Builds DMG packages for both Apple Silicon (ARM64, 128.3 MB) and Intel (x64, 131.7 MB).
   - **iOS Job**: Builds unsigned IPA package (`CalcPro-iOS-unsigned.ipa`, 0.7 MB) using `xcodebuild` on macOS runners.
   - **Release Job**: Aggregates all build artifacts and automatically attaches them to GitHub Release `v1.0.0`.

3. **Published GitHub Release**:
   - Release URL: [https://github.com/dabelinfotech/calculator-app/releases/tag/v1.0.0](https://github.com/dabelinfotech/calculator-app/releases/tag/v1.0.0)
   - Available Installers:
     - `CalcPro-Android.apk` (4.2 MB) — Android
     - `CalcPro-Setup-1.0.0.exe` (110.7 MB) — Windows Installer
     - `CalcPro-Portable-1.0.0.exe` (110.4 MB) — Windows Portable
     - `CalcPro-1.0.0-mac-arm64.dmg` (128.3 MB) — macOS Apple Silicon (M1/M2/M3/M4)
     - `CalcPro-1.0.0-mac-x64.dmg` (131.7 MB) — macOS Intel
     - `CalcPro-iOS-unsigned.ipa` (0.7 MB) — Apple iOS (iPhone/iPad)


