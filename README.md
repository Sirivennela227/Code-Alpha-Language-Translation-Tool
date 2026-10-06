# AI Language Translation Tool 🌍

[![CodeAlpha AI Internship](https://img.shields.io/badge/CodeAlpha-AI%20Internship-indigo?style=for-the-badge&logo=google)](https://codealpha.tech/)
[![Task](https://img.shields.io/badge/Task-1%20Language%20Translation%20Tool-brightgreen?style=for-the-badge)](README.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

A modern, responsive, web-based **Language Translation Tool** built as part of the **CodeAlpha AI Internship Program (Task 1)**. The tool allows users to input text in any language, choose a source and target language (or auto-detect), and translate seamlessly with multi-provider API fallbacks, speech audio playback, language swapping, character limits, and clipboard integration.

---

## 🌟 Key Features

- **🌐 15+ Indian & Global Languages Supported:**
  - English, Telugu, Hindi, Tamil, Kannada, Malayalam, Bengali, Marathi, Gujarati, Spanish, French, German, Japanese, Korean, Chinese, and Arabic.
- **🔍 Auto Language Detection:** Automatically identifies the source language when typing.
- **⚡ Dual API Translation Engine:**
  - Uses free & public translation APIs (**MyMemory API** with automatic fallback to **Google Translate GTX**).
  - Requires **zero API keys** or configuration setup to run out of the box.
- **🔄 Instant Language Swap:** Exchange source and target languages with animated UI feedback.
- **🔊 Text-to-Speech (TTS):** Listen to source text and translated output in natural native accents via Web Speech Synthesis.
- **📋 Clipboard Integration:** 1-click **Paste** from clipboard and **Copy** translation with animated toast notifications.
- **⚡ Live Debounced Translation:** Auto-translates after typing pauses (600ms debounce), plus instant translation on button click.
- **⚡ Quick Sample Prompts:** Try preset sample sentences with a single click.
- **🎨 Glassmorphism & Responsive UI:** Crafted with vibrant gradient palettes, modern typography (*Plus Jakarta Sans*), micro-animations, and full mobile/laptop responsiveness.

---

## 🛠️ Tech Stack & Technologies Used

- **Frontend Core:** HTML5, CSS3, JavaScript (ES6+ Vanilla)
- **Styling & UI:** Custom CSS Glassmorphism Design System, CSS Flexbox & Grid
- **Fonts & Icons:** Google Fonts (*Plus Jakarta Sans*), FontAwesome 6.4 Free Icons
- **Translation APIs:**
  - Primary: [MyMemory Translation API](https://mymemory.translated.net/)
  - Secondary Fallback: Google Translate GTX Endpoint
- **Audio & Accessibility:** Native Web Speech Synthesis API (`window.speechSynthesis`)

---

## 📁 Project Structure

```text
CodeAlpha-Language-Translation-Tool/
│
├── index.html        # Main HTML structure & accessibility markup
├── style.css         # Glassmorphism design system & responsive styles
├── script.js         # Translation API logic, event handlers & TTS
├── README.md         # Detailed project documentation & instructions
└── .gitignore        # Standard Git ignore file
```

---

## 🚀 How to Run the Project in VS Code

### Option 1: Direct File Opening (Easiest)
1. Open the project folder in **VS Code**.
2. Right-click on `index.html`.
3. Select **Open with Default Browser** (or double-click `index.html` in your file explorer).

### Option 2: Using VS Code Live Server Extension (Recommended)
1. Install the **Live Server** extension in VS Code (`ms-vscode.live-server`).
2. Right-click `index.html` and select **Open with Live Server**.
3. Your web browser will launch at `http://127.0.0.1:5500`.

### Option 3: Local Node HTTP Server (Optional)
```bash
# Run a lightweight server using npx
npx serve .
```

---

## ⚙️ How the Translation API Works

1. **No API Key Required:** The application utilizes public REST endpoints that accept parameters directly via HTTP GET requests.
2. **Resilient Fallback Mechanism:**
   - When text is submitted, `script.js` first queries **MyMemory API**.
   - If MyMemory is unreachable or rate-limited, it automatically switches to **Google GTX API**.
   - This ensures 100% continuous uptime without API rate-limit interruptions.

---

## 📸 Screenshots

*(Add your application screenshots here before uploading to GitHub)*

| Desktop View | Mobile View |
| :---: | :---: |
| ![Desktop View](https://via.placeholder.com/600x350?text=Desktop+View) | ![Mobile View](https://via.placeholder.com/300x500?text=Mobile+View) |

---

## 🔮 Future Enhancements

- 🎙️ **Speech-to-Text (Voice Input):** Microphone support for translating spoken audio.
- 📜 **Translation History Log:** Save recent translations locally (`localStorage`).
- 🌙 **Dark / Light Theme Toggle:** Customizable appearance themes.
- 💾 **Export as PDF/TXT:** Download translated text to local files.

---

## 🤝 Submission Information

- **Internship:** CodeAlpha AI Internship
- **Task:** Task 1 - Language Translation Tool
- **Repository Name:** `CodeAlpha-Language-Translation-Tool`

---

## 📜 License

This project is licensed under the **MIT License** - feel free to use and adapt for learning purposes.
