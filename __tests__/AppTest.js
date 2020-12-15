const assert = require('assert');
const path = require('path');
const Application = require('spectron').Application;

const app = new Application({
  path: path.resolve(__dirname, '../node_modules/.bin/electron'),
  args: [path.resolve(__dirname, '../'), '--no-sandbox'],
});

describe('Electron app tests', function () {
  //Start the electron app before each test
  beforeEach(() => {
    return app.start();
  });

  //Stop the electron app after completion of each test
  afterEach(() => {
    if (app && app.isRunning()) {
      return app.stop();
    }
  });

  it('displays a title', async () => {
    const title = await app.client.waitUntilWindowLoaded().getTitle();
    return assert.equal(title, 'BDS Maneger');
  });
});