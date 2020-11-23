/* globals gauge*/
"use strict";
const { openBrowser, closeBrowser, goto, click, screenshot, write,below,textBox,button,dragAndDrop,text,checkBox,toLeftOf,toRightOf,into } = require('taiko');
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


step("Goto ag-grid example page", async () => {
    await goto('https://www.ag-grid.com/example.php');
});

step("Goto local ag-grid example page", async () => {
    await goto('file:///'+process.cwd()+'/project/index.html');
});

step("Close Column options", async () => {
    await click("Columns");
});

step("Click on column <columnName>", async (columnName) => {
    await click(columnName);
});

step("write <someText> below <relativeText>", async function(someText, relativeText) {
    await click(textBox(below(relativeText)));
    await write(someText,below(relativeText));
});

step("Click on filter for the column <relativeText>", async function (relativeText) {
    await click(button({"aria-label": "Open Filter Menu"}),below(relativeText),toRightOf(relativeText))
});

step("Unselect All optioins in the filter below <relativeText>", async function(relativeText) {
    await click(checkBox(toLeftOf(text("Select All",below(relativeText)))));
});

step("Select option <value> below <relativeText>", async function (value, relativeText) {
    await click(checkBox(toLeftOf(text(value,below(relativeText)))));
});

step("Drag column <arg0> to set row groups", async function(arg0) {
    await dragAndDrop("Language",into('Drag here to set row groups'))
});

step("Select <relativeText>", async function(relativeText) {
    await click(checkBox(toLeftOf(text(relativeText))));
});

step(["Sort column <columnName>","Click on column <columnName> again to change the sort order",
"Click on column <columnName> again to remove the sort order"], async function(columnName) {
    await click(columnName);
});