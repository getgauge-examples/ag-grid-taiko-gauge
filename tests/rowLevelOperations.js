/* globals gauge*/
"use strict";
const { openBrowser, closeBrowser, within, click, screenshot,$,doubleClick } = require('taiko');
const assert = require("assert");
const path = require("path");
const headless = process.env.headless_chrome.toLowerCase() === 'true';

gauge.customScreenshotWriter = async function () {
    const screenshotFilePath = path.join(process.env['gauge_screenshots_dir'], `screenshot-${process.hrtime.bigint()}.png`);
    await screenshot({ path: screenshotFilePath });
    return path.basename(screenshotFilePath);
};

step("Click on <element> within row with index <index>", async function(element, index) {
	await click($('[col-id="'+element+'"]'), within($('[row-index="'+index+'"]')));
});

step("Doubleclick on <element> within row with index <index>", async function(element, index) {
	await doubleClick($('[col-id="'+element+'"]'), within($('[row-index="'+index+'"]')));
});

step("Select <arg0> from list", async function(arg0) {
	await click("Spanish");
});