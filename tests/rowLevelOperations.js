/* globals gauge*/
"use strict";
const { openBrowser, closeBrowser, within, click, screenshot,$ } = require('taiko');
const assert = require("assert");
const path = require("path");
const headless = process.env.headless_chrome.toLowerCase() === 'true';

beforeSuite(async () => {
    await openBrowser({ headless: headless })
});

afterSuite(async () => {
    await closeBrowser();
});

gauge.customScreenshotWriter = async function () {
    const screenshotFilePath = path.join(process.env['gauge_screenshots_dir'], `screenshot-${process.hrtime.bigint()}.png`);
    await screenshot({ path: screenshotFilePath });
    return path.basename(screenshotFilePath);
};

step("Click on <element> within row with index <index>", async function(element, index) {
	click($('[col-id="'+element+'"]'), within($('[row-index="'+index+'"]')))
});