// content.js

console.log("✅ Absently content.js loaded");

const excuseMessage = "Hey team, ran into tech issues. Here's my update: [fill in]";

// 🧠 Simulate human-like click interactions
function triggerMouseEvents(element) {
  ["mouseover", "mousedown", "mouseup", "click"].forEach(type => {
    const event = new MouseEvent(type, {
      bubbles: true,
      cancelable: true,
      view: window
    });
    element.dispatchEvent(event);
  });
}

// 💬 Popup UI with countdown
function showPopupWithCountdown() {
    if (document.getElementById("absently-popup")) return;
  
    const popup = document.createElement("div");
    popup.id = "absently-popup";
    popup.style.all = "initial";
    popup.style.position = "fixed";
    popup.style.bottom = "20px";
    popup.style.right = "20px";
    popup.style.zIndex = "9999";
    popup.style.maxWidth = "280px";
    popup.style.maxHeight = "180px";
    popup.style.overflow = "hidden";
    popup.style.pointerEvents = "auto";
    popup.style.fontFamily = "sans-serif";
  
    popup.innerHTML = `
      <div id="absently-box" style="
        background: #1e1e1e;
        color: white;
        padding: 16px;
        border-radius: 12px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.4);
        overflow: hidden;
        cursor: move;
      ">
        <div>🚨 Meeting detected</div>
        <div style="margin-top: 4px;">Sending auto message in <span id="absently-timer">60</span> seconds...</div>
        <div style="display: flex; gap: 10px; margin-top: 12px;">
          <button id="absently-cancel" style="
            flex: 1;
            padding: 6px;
            border: none;
            background: #333;
            color: white;
            border-radius: 6px;
            cursor: pointer;
          ">I'm going</button>
          <button id="absently-sendNow" style="
            flex: 1;
            padding: 6px;
            border: none;
            background: #555;
            color: white;
            border-radius: 6px;
            cursor: pointer;
          ">Send excuse</button>
        </div>
      </div>
    `;
  
    document.body.appendChild(popup);
    makePopupDraggable(popup, document.getElementById("absently-box"));
  
    let countdown = 60;
    const timer = setInterval(() => {
      countdown--;
      const timerEl = document.getElementById("absently-timer");
      if (timerEl) timerEl.textContent = countdown;
      if (countdown <= 0) {
        clearInterval(timer);
        popup.remove();
        openPreviewAndSend();
      }
    }, 1000);
  
    document.getElementById("absently-cancel").onclick = () => {
      clearInterval(timer);
      popup.remove();
    };
  
    document.getElementById("absently-sendNow").onclick = () => {
      clearInterval(timer);
      popup.remove();
      openPreviewAndSend();
    };
  }
  
  // 🛠️ Enable dragging
  function makePopupDraggable(popup, handle) {
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;
  
    handle.addEventListener("mousedown", (e) => {
      isDragging = true;
      offsetX = e.clientX - popup.getBoundingClientRect().left;
      offsetY = e.clientY - popup.getBoundingClientRect().top;
      popup.style.transition = "none";
      e.preventDefault();
    });
  
    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      popup.style.left = `${e.clientX - offsetX}px`;
      popup.style.top = `${e.clientY - offsetY}px`;
      popup.style.right = "auto";
      popup.style.bottom = "auto";
      popup.style.position = "fixed";
    });
  
    document.addEventListener("mouseup", () => {
      isDragging = false;
    });
  }
  

// 🔁 Smart + Reliable Message Sender (Now with Popup Close)
function openPreviewAndSend() {
    const excuseMessage = "Hey team, ran into tech issues. Here's my update: [fill in]";
  
    navigator.clipboard.writeText(excuseMessage).then(() => {
      console.log("📋 Clipboard populated with excuse.");
  
      const meetingBlock = [...document.querySelectorAll("div[id^='AQMk']")]
        .find(el => el.innerText?.toLowerCase().includes("microsoft teams"));
  
      if (!meetingBlock) {
        console.warn("❌ Meeting block not found.");
        return;
      }
  
      meetingBlock.scrollIntoView({ behavior: "instant", block: "center" });
      meetingBlock.focus();
  
      setTimeout(() => {
        const enterEvent = new KeyboardEvent("keydown", {
          key: "Enter", code: "Enter", keyCode: 13, bubbles: true
        });
        meetingBlock.dispatchEvent(enterEvent);
  
        const previewInterval = setInterval(() => {
          const preview = [...document.querySelectorAll("div")]
            .find(div =>
              div.querySelector('[role="tablist"]') &&
              div.innerText.toLowerCase().includes("chat") &&
              div.innerText.toLowerCase().includes("details")
            );
  
          if (preview) {
            clearInterval(previewInterval);
  
            const tryChatTab = setInterval(() => {
              const chatTab = [...document.querySelectorAll('[role="tab"]')]
                .find(el =>
                  el.textContent?.trim().toLowerCase() === "chat" &&
                  el.offsetParent !== null
                );
  
              if (chatTab) {
                clearInterval(tryChatTab);
  
                chatTab.scrollIntoView({ behavior: "smooth", block: "center" });
                chatTab.focus();
                ["mouseover", "mousedown", "mouseup", "click"].forEach(type => {
                  chatTab.dispatchEvent(new MouseEvent(type, {
                    bubbles: true, cancelable: true, view: window, buttons: 1
                  }));
                });
  
                const tryInput = setInterval(() => {
                  const input = document.querySelector('[contenteditable="true"]');
                  if (input) {
                    clearInterval(tryInput);
                    input.focus();
                    document.execCommand("paste");
  
                    input.dispatchEvent(new InputEvent("input", {
                      bubbles: true, cancelable: true, inputType: "insertText"
                    }));
  
                    // ✅ Attempt to directly focus the send button
                    setTimeout(() => {
                      const sendBtn = document.querySelector('button.ui-toolbar__item');
  
                      if (sendBtn) {
                        console.log("🎯 Send button found — trying to focus.");
                        sendBtn.scrollIntoView({ behavior: "smooth", block: "center" });
                        sendBtn.focus();
  
                        setTimeout(() => {
                          if (document.activeElement === sendBtn) {
                            console.log("🟢 Send button focused — pressing Enter.");
                            sendBtn.dispatchEvent(new KeyboardEvent("keydown", {
                              key: "Enter", code: "Enter", keyCode: 13, bubbles: true
                            }));
                          } else {
                            console.warn("🔴 Focus failed — retrying with Tab fallback.");
                            let tabCount = 0;
                            const tabLoop = setInterval(() => {
                              document.activeElement.dispatchEvent(new KeyboardEvent("keydown", {
                                key: "Tab", code: "Tab", keyCode: 9, bubbles: true,
                              }));
                              tabCount++;
  
                              if (document.activeElement === sendBtn || tabCount >= 6) {
                                clearInterval(tabLoop);
                                setTimeout(() => {
                                  document.activeElement.dispatchEvent(new KeyboardEvent("keydown", {
                                    key: "Enter", code: "Enter", keyCode: 13, bubbles: true,
                                  }));
                                  console.log("📤 Sent after fallback focus.");
                                }, 100);
                              }
                            }, 100);
                          }
  
                          // ✅✅ Close the popup (finally)
                          const popup = document.getElementById("absently-popup");
                          if (popup) {
                            popup.remove();
                            console.log("🧼 Popup closed.");
                          }
                        }, 300);
                      } else {
                        console.warn("❌ Send button not found.");
                      }
                    }, 400);
                  }
                }, 500);
              }
            }, 500);
          }
        }, 1000);
      }, 300);
    }).catch(err => {
      console.error("❌ Clipboard write failed:", err);
    });
  }  
  

  
// 🧠 Looks for "Join" buttons
function isVisible(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.width > 0 &&
      rect.height > 0 &&
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  function checkAndTriggerPopup() {
    const joinBtn = Array.from(document.querySelectorAll("button"))
      .find(btn =>
        btn.textContent.trim().toLowerCase() === "join" && isVisible(btn)
      );
  
    if (joinBtn && !document.getElementById("absently-popup")) {
      console.log("📌 Visible Join button found — triggering popup.");
      showPopupWithCountdown();
    }
  }

// 🚀 Start script + observe mutations
window.addEventListener("load", () => {
  setTimeout(() => {
    console.log("🧪 Initial load check...");
    checkAndTriggerPopup();
  }, 1000);
});

const observer = new MutationObserver(checkAndTriggerPopup);
observer.observe(document.body, { childList: true, subtree: true });
