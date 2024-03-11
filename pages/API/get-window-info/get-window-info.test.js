const PAGE_PATH = '/pages/API/get-window-info/get-window-info'

describe('ExtApi-GetWindowInfo', () => {

  let page;
  let res;
  const numberProperties = [
    'pixelRatio', 'screenWidth', 'screenHeight', 'statusBarHeight',
    'windowWidth',
    'windowHeight', 'windowTop', 'windowBottom', 'screenTop'
  ]

  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor(600);
    res = await page.callMethod('jest_getWindowInfo')
  });

  it('Check GetWindowInfo', async () => {
    for (const key in res) {
      const value = res[key];
      expect(value).not.toBeNull();
      if (numberProperties.indexOf(key) != -1) {
        expect(value).toBeGreaterThanOrEqual(0);
      }
    }
  });
});
