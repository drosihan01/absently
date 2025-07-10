document.addEventListener("DOMContentLoaded", async () => {
  const status = document.getElementById("status");
  const meetingCheck = document.getElementById("meetingCheck");
  const button = document.getElementById("test-btn");

  // Finds the first Teams tab (if open)
  async function getTeamsTab() {
    return new Promise((resolve) => {
      chrome.tabs.query({ url: "*://teams.microsoft.com/*" }, (tabs) => {
        resolve(tabs[0] || null);
      });
    });
  }

  async function runCheck() {
    status.textContent = "⏳ Looking for Teams tab...";
    meetingCheck.textContent = "";

    const tab = await getTeamsTab();

    if (!tab) {
      status.textContent = "❌ No Microsoft Teams tab found.";
      return;
    }

    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        func: () => {
          const joinButton = Array.from(document.querySelectorAll("button"))
            .find(btn => btn.textContent.trim().toLowerCase() === "join");

          return {
            isTeams: window.location.hostname.includes("teams"),
            joinFound: Boolean(joinButton),
          };
        },
      },
      (results) => {
        const res = results?.[0]?.result;
        if (!res) {
          status.textContent = "⚠️ Script ran, but no result.";
          return;
        }

        const { isTeams, joinFound } = res;

        status.textContent = isTeams
          ? "✅ Microsoft Teams tab found."
          : "❌ Not a Microsoft Teams tab.";

        meetingCheck.textContent = joinFound
          ? "✅ Join button is visible!"
          : "⏳ No Join button found yet.";
      }
    );
  }

  // Run on load
  runCheck();

  // Also trigger on button click
  button.addEventListener("click", runCheck);
});

