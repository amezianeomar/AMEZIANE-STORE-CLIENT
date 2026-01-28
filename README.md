# AMEZIANE-STORE CLIENT (God-Tier Edition) 🎮

The official **React Frontend** for the Ameziane Store project. This application consumes the **AMEZIANE-STORE-BACKEND** API to provide a seamless, high-performance shopping experience designed for gamers.

## 🌌 Visual Identity: "Cyberpunk God-Tier"

This frontend has been engineered with a custom **Carbon & Neon Design System**:

* **Deep Void Background**: A pure tech-gradient (`#050510`) replacing standard white/gray backgrounds.
* **Holographic UI**: Glassmorphism panels with neon cyan/purple borders (`1px solid #00f3ff`).
* **HUD Typography**: `Orbitron` (Headers) and `Rajdhani` (Body) fonts for maximum readability and style.
* **Interactive Elements**:
  * **Glow Effects**: Hover states trigger neon pulses.
  * **Custom Modals**: "Access Authorized" cyberpunk alerts instead of browser defaults.
  * **Smooth UX**: Auto-scroll to top on pagination.

## 🚀 Key Features

### 1. Artifact Search & Filtering

* **Real-Time Search**: Filter artifacts by name instantly.
* **Advanced Filters**: Narrow down by **Category** (e.g., "Consoles", "Armes") and **Max Price**.
* **Reset**: Smart reset logic when changing filters.

### 2. Pagination System

* **server-side Pagination**: Displays 6 items per page.
* **Smart Navigation**: "Previous/Next" buttons with auto-scroll and visual disable states.
* **Mobile Stack**: Pagination controls adapt to vertical stacking on mobile devices.

### 3. Management Interface

* **Add Artifact**: A dedicated sidebar form (`AddComp`) to upload new products.
* **File Upload**: Custom styled "Choose File" button matching the neon theme.
* **Feedback**: Cyberpunk Modal system for success/error messages.

## 🛠️ Installation

```bash
# 1. Clone the repository
git clone https://github.com/amezianeomar/AMEZIANE-STORE-CLIENT.git

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

The application will launch at `http://localhost:3000` and connect to the Laravel API at `http://localhost:8000`.

## 📱 Responsiveness

* **Desktop**: Dashboard layout with Sidebar + Grid.
* **Mobile**: Single-column HUD layout with optimized padding and safe-area insets.
* **Tablet**: Adaptive grid columns.

---
**Lead Tech / QA**: AMEZIANE OMAR ASSISTANT
*Code Audited & Compliant: 2026-01-28*
