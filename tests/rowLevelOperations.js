/* globals gauge*/
"use strict";
const { below, textBox, within, click, screenshot,$,doubleClick,button,toRightOf } = require('taiko');
const assert = require("assert");
const path = require("path");
const headless = process.env.headless_chrome.toLowerCase() === 'true';

gauge.customScreenshotWriter = async function () {
    const screenshotFilePath = path.join(process.env['gauge_screenshots_dir'], `screenshot-${process.hrtime.bigint()}.png`);
    await screenshot({ path: screenshotFilePath });
    return path.basename(screenshotFilePath);
};

step("Doubleclick on <element> within row with index <index>", async function(element, index) {
    await doubleClick($('[col-id="'+element+'"]', within($('[row-index="'+index+'"]'))));
    //    await doubleClick($('[col-id="'+element+'"]'), within($('[row-index="'+index+'"]')));
});

step("Select <element> from list", async function(element) {
	await click(element);
});

step("Verify the text in column <columnIndex> of row <rowIndex> is <text>", async function(columnIndex, rowIndex,text) {
	await assert.equal(await ($('[col-id="'+columnIndex+'"]', within($('[row-index="'+rowIndex+'"]'))).text()),text);
});

step("Click on textbox below <element>", async function (element) {
    await click(textBox(below(element)));
});

step("Click on filter for the column index <relativeText>", async function(relativeText) {
    await click(button({"aria-label": "Open Filter Menu"}),below(relativeText),toRightOf(relativeText))
});

step("Select date as tomorrow", async function() {
    var date = new Date();
    var last = new Date(date.getTime() + (1 * 24 * 60 * 60 * 1000));
    var day =last.getDate();

    const mon = new Intl.DateTimeFormat('en', { month: 'long' }).format(date);    
    console.log(day)
    console.log(mon)
    await click(day,below(mon),within($('.flatpickr-innerContainer')))
});