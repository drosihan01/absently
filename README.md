# 🫥 Absently – Your Invisible Meeting Wingman

**Absently** is a Chrome extension that helps you gracefully excuse yourself from Microsoft Teams meetings — automatically. It detects meetings, sends human-like fallback messages, and vanishes quietly after taking action.

---

## ⚠️ Disclaimer

Absently is an **automated assistant** that will act on your behalf — including clicking buttons, sending messages, and interacting with Microsoft Teams in your browser. Use responsibly and with awareness.

> 🔒 This extension currently:
- ✅ Only works with the **browser version** of Microsoft Teams
- ✅ Only supports **1 active meeting at a time**
- 🚧 Is still in early development — unexpected behavior may occur

---

## 🔧 Features

- 🧠 Smart detection of Microsoft Teams browser meetings  
- ⏱️ Countdown-triggered auto action (e.g., "Meeting starting in 2 min")  
- 📝 Auto-generated excuse messages  
- 🎈 Lightweight popup UI to notify the user before acting  
- 🫥 Disappears after completing its job  

---

## 🚧 TODOs

### 1. 🧠 Smarter Meeting Selection  
When multiple meetings are listed (e.g., overlapping events), detect and act on the correct one.  
✅ Consider heuristics like:
- Closest start time
- Calendar highlight
- Presence of “Join” button

### 2. 🫥 Auto-Disappear  
After message is sent or action is taken, the popup and overlays should disappear to stay stealthy.

### 3. ⏱️ Trigger by Countdown  
Finalize the logic for triggering the message when countdown hits 0.  
✅ Must:
- Work 2 minutes before meeting start (configurable)
- Be cancellable before execution

### 4. 🏠 Fix Main Page Logic  
Ensure the extension behaves properly on the main Microsoft Teams page and not just the meeting preview.

### 5. 🪟 Revise Popup  
Improve visual styling, text clarity, and drag behavior of the popup.  
✅ Consider:
- More friendly tone
- Dismiss/cancel option
- Optional “Send Now” override

### 6. 🧱 Modular & Robust Codebase  
Refactor JS into reusable modules:
- DOM utils
- Detection logic
- Popup UI
- Message sender

### 7. 🧪 Create Testing Plan  
Ensure consistent behavior across environments:
- ✅ Meetings created by user vs others
- ✅ Different browsers (Chrome, Arc)
- ✅ DOM structure changes
- ✅ Multiple meetings

---

## 🛠️ Setup

1. Clone this repo  
2. Open Chrome → `chrome://extensions`  
3. Enable **Developer Mode**  
4. Click **Load unpacked** → select the project folder  
5. Navigate to a Microsoft Teams meeting page to test

---

## 🤖 Core Files

| File | Description |
|------|-------------|
| `manifest.json` | Chrome extension config |
| `content.js` | Main detection & action logic |
| `popup.js` | Countdown popup + UI events |
| `utils.js` | DOM helpers & modular functions |

---

## 📌 Vision

Absently started with a simple idea:  
> What if your browser had your back when you just… couldn’t?

Whether you're sick, in back-to-backs, or need a breather — Absently is your ghostwriter for graceful escapes.

---

## 💬 License

MIT — Free for non-evil uses. Be kind, not shady.
