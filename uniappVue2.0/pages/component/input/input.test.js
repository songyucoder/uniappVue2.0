// uni-app自动化测试教程: uni-app自动化测试教程: https://uniapp.dcloud.net.cn/worktile/auto/hbuilderx-extension/

describe('component-native-input', () => {

  let page;
  beforeAll(async () => {
    page = await program.reLaunch('/pages/component/input/input')
    await page.waitFor(3000);
  });

  // it("beforeAllTestScreenshot", async () => {
  //   const image = await program.screenshot({
  //     fullPage: true
  //   })
  //   expect(image).toMatchImageSnapshot()
  // })
  // 测试焦点及键盘弹起
  it('focus', async () => {
    const input = await page.$('.uni-input-focus');
    expect(await input.property('focus')).toBe("true")
    // expect(await page.data("inputFocusKeyBoardChangeValue")).toBe(true)
    await page.setData({
      focus: false,
    })
    expect(await input.property('focus')).toBe("false")
    // await page.waitFor(1000)
    // expect(await page.data("inputFocusKeyBoardChangeValue")).toBe(false)
    // await page.setData({
    //   focus: true,
    // })
    // expect(await input.property('focus')).toBe(true)
    // await page.waitFor(1000)
    // expect(await page.data("inputFocusKeyBoardChangeValue")).toBe(true)
    // await page.setData({
    //   focus: false,
    // })
    // expect(await input.property('focus')).toBe(false)
    // await page.waitFor(1000)
    // expect(await page.data("inputFocusKeyBoardChangeValue")).toBe(false)
    // await page.waitFor(1000)
  });

  // 测试修改value属性
  it("value", async () => {
    const input = await page.$('.uni-input-default');
    expect(await input.property('value')).toEqual("hello uni-app x")
  })

  //测试input的类型
  it("type", async () => {
    const text = await page.$('.uni-input-type-text');
    const number = await page.$('.uni-input-type-number');
    const digit = await page.$('.uni-input-type-digit');
    const tel = await page.$('.uni-input-type-tel');
    expect(await text.property('type')).toEqual("text")
    expect(await number.property('type')).toEqual("number")
    expect(await digit.property('type')).toEqual("digit")
    expect(await tel.property('type')).toEqual("tel")
  })

  //  测试密码属性
  // it("password", async () => {
  //   const input = await page.$('.uni-input-password');
  //   expect(await input.property('password')).toBe(true)
  //   await page.setData({
  //     inputPassword: false,
  //     inputPasswordValue: "inputPasswordValue"
  //   })
  //   expect(await input.property('password')).toBe(false)
  //   await page.waitFor(500)
  //   await page.setData({
  //     inputPassword: true
  //   })
  // })
  // 测试placeholder
  // it("placeholder", async () => {
  //   const placeholder1 = await page.$('.uni-input-placeholder1');
  //   expect(await placeholder1.property("placeholder-style")).toMatchObject({
  //     "color": "red"
  //   })
  //   expect(await placeholder1.property("placeholder")).toEqual("占位符文字颜色为红色")
  //   await page.setData({
  //     inputPlaceHolderStyle: "color:#CC00CC",
  //   })
  //   expect(await placeholder1.property("placeholder-style")).toMatchObject({
  //     "color": "#CC00CC"
  //   })

  //   await page.setData({
  //     inputPlaceHolderStyle: "color:#CC19CC;background-color:#00b1c0",
  //   })
  //   expect(await placeholder1.property("placeholder-style")).toMatchObject({
  //     "color": "#CC19CC",
  //     "backgroundColor": "#00b1c0"
  //   })

  //   await page.setData({
  //     inputPlaceHolderStyle: "color:#CC19CC;background-color:#00b1c0;text-align:center;font-size:44px;font-weight:900",
  //   })
  //   expect(await placeholder1.property("placeholder-style")).toEqual({
  //     "backgroundColor": "#00b1c0",
  //     "color": "#CC19CC",
  //     "fontSize": "44px",
  //     "fontWeight": "900",
  //     "textAlign": "center"
  //   })

  //   const placeholder2 = await page.$('.uni-input-placeholder2');
  //   expect(await placeholder2.property("placeholder-class")).toMatchObject({
  //     "backgroundColor": "#008000"
  //   })
  //   await page.setData({
  //     inputPlaceHolderClass: "uni-input-placeholder-class-ts",
  //   })
  //   expect(await placeholder2.property("placeholder-class")).toMatchObject({
  //     "backgroundColor": "#FFA500"
  //   })
  //   expect(await placeholder2.property("placeholder")).toEqual("占位符背景色为绿色")
  // })

  it("disable", async () => {
    const input = await page.$('.uni-input-disable');
    expect(await input.property("disabled")).toBe("true")
  })

  it("confirm-type", async () => {
    expect(await (await page.$('.uni-input-confirm-send')).property("confirmType")).toEqual("send")
    expect(await (await page.$('.uni-input-confirm-search')).property("confirmType")).toEqual("search")
    expect(await (await page.$('.uni-input-confirm-next')).property("confirmType")).toEqual("next")
    expect(await (await page.$('.uni-input-confirm-go')).property("confirmType")).toEqual("go")
    expect(await (await page.$('.uni-input-confirm-done')).property("confirmType")).toEqual("done")
  })

  // it("maxlength", async () => {
  //   const input = await page.$('.uni-input-maxlength');
  //   await page.setData({
  //     inputMaxLengthValue: "uni-input-maxlength"
  //   })
  //   await page.waitFor(500)
  // })

  it("cursor-color", async () => {
    await page.setData({
      cursor_color: "transparent",
    })
    await page.waitFor(500)
    expect(await (await page.$('.uni-input-cursor-color')).property("cursor-color")).toBe("transparent")
  })

  it("afterAllTestScreenshot", async () => {
    const image = await program.screenshot({
      fullPage: true
    })
    expect(image).toMatchImageSnapshot()
  })
});
