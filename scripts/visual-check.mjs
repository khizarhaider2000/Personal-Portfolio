import { chromium } from "playwright";

const viewports = [
  ["desktop", 1512, 824],
  ["mobile", 390, 844],
];

const targets = [
  ["hero", ""],
  ["about", "#about"],
  ["work", "#work"],
  ["experiences", "#experiences"],
  ["contact", "#contact"],
];

const baseUrl = process.env.PORTFOLIO_URL ?? "http://localhost:3000";

const browser = await chromium.launch({ headless: true });

try {
  for (const [label, width, height] of viewports) {
    const page = await browser.newPage({ viewport: { width, height } });
    const failures = [];
    const logs = [];

    page.on("console", (message) => logs.push(`${message.type()}: ${message.text()}`));
    page.on("pageerror", (error) => failures.push(`pageerror: ${error.message}`));
    page.on("requestfailed", (request) => {
      failures.push(`${request.url()} :: ${request.failure()?.errorText ?? "request failed"}`);
    });
    page.on("response", (response) => {
      if (response.status() >= 400) failures.push(`${response.status()} ${response.url()}`);
    });

    for (const [targetName, hash] of targets) {
      await page.goto(`${baseUrl}/${hash}`, { waitUntil: "networkidle", timeout: 60000 });
      await page.waitForTimeout(500);
      await page.screenshot({ path: `/private/tmp/portfolio-${label}-${targetName}.png` });
    }

    if (label === "desktop") {
      await page.goto(baseUrl, { waitUntil: "networkidle", timeout: 60000 });
      await page.evaluate(() => document.getElementById("work")?.scrollIntoView());
      await page.waitForTimeout(500);
      await page.mouse.move(280, 455);
      await page.waitForTimeout(350);
      await page.screenshot({ path: "/private/tmp/portfolio-desktop-work-hover.png" });
    }

    await page.close();

    if (failures.length > 0) {
      throw new Error(`Visual check failures for ${label}:\n${failures.join("\n")}`);
    }

    const relevantLogs = logs.filter((line) => !line.includes("React DevTools"));
    if (relevantLogs.length > 0) {
      throw new Error(`Console output for ${label}:\n${relevantLogs.join("\n")}`);
    }
  }

  console.log("Visual check complete. Screenshots written to /private/tmp/portfolio-*.png");
} finally {
  await browser.close();
}
