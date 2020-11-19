/* globals gauge*/
"use strict";
const { openBrowser, closeBrowser, goto, click, screenshot, write,below,textBox,button,dragAndDrop,text,checkBox,toLeftOf,into,$ } = require('taiko');
const assert = require("assert");
const path = require("path");
const headless = process.env.headless_chrome.toLowerCase() === 'true';

beforeSuite(async () => {
    await openBrowser({ headless: headless })
});

afterSuite(async () => {
    console.log("here")
    await closeBrowser();
});

gauge.customScreenshotWriter = async function () {
    const screenshotFilePath = path.join(process.env['gauge_screenshots_dir'], `screenshot-${process.hrtime.bigint()}.png`);
    await screenshot({ path: screenshotFilePath });
    return path.basename(screenshotFilePath);
};


step("Goto ag-grid example page", async () => {
    await goto('https://www.ag-grid.com/example.php');
});

step("Goto local ag-grid example page", async () => {
    await goto('file:///<localfile_path>/project/index.html');
});

step("Close Column options", async () => {
    await click("Columns");
});

step("Click on column <columnName> below <relativeText>", async (columnName, relativeText) => {
    await click(columnName,below(relativeText));
});

step("write <someText> below <relativeText>", async function(someText, relativeText) {
    await click(textBox(below(relativeText)));
    await write(someText,below(relativeText));
});

step("Click on filter for the column <relativeText>", async function (relativeText) {
    await click(button({"aria-label": "Open Filter Menu"}),below(relativeText))
});

step("Click on checkbox next to <value> below <relativeText>", async function(value, relativeText) {
    await click(checkBox(toLeftOf(text(value,below(relativeText)))));
});

step("Drag column <arg0> to set row groups", async function(arg0) {
    await dragAndDrop("Language",into('Drag here to set row groups'))
});

step("Select <relativeText>", async function(relativeText) {
    await click(checkBox(toLeftOf(text(relativeText))));
});
