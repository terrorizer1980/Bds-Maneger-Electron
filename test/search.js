import { startApp, stopApp } from './hooks';
describe('Opening the Windows', () => {
  let app;
  beforeEach(async () => {
    app = await startApp();
  });

  afterEach(async() => {
    await stopApp(app);
  });

  it('opens a window', async() => {
    app.client.waitUntilWindowLoaded()
    app.client.getWindowCount()
      .should.eventually.equal(3);
  });
  it('Checking for a title', async() => {
    app.client.getTitle().should.eventually.include('BDS Maneger');
  });
});
