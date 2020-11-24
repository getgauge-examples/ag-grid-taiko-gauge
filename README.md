# Testing ag-grid with Taiko

This is an example project to test ag-grid with Taiko. It mainly uses the example hosted on [ag-grid/example.php](https://www.ag-grid.com/example.php) for its test cases.

This example covers
- Sorting an ag-grid column
- Filtering an ag-grid
- Grouping elements on ag-grid
- Verifying a text on the grid
- Selecting an element from the combobox inside the cell of the ag-grid
- Select a date inside a cell of the ag-grid

## Pre-requisites

* [NodeJS](https://nodejs.org/en/)
* [Gauge](https://docs.gauge.org/getting_started/installing-gauge.html?os=macos&language=javascript&ide=vscode)
Taiko can easily be run with other javascript test runners like Mocha or Jest instead of Gauge. Gauge is listed as the dependency here as this project uses taiko with Gauge as its runner.
* `npm install` inside the project directory installs the other pre-requisites

## Running the tests
* `npm run test`
This would run the tests by the runner Gauge and generate the reports under `reports/html-report/index.html`