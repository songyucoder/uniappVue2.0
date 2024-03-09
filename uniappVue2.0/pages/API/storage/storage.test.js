const PAGE_PATH = '/pages/API/storage/storage'


describe('ExtApi-StorageInfoTest', () => {

  let page;
  function getData(key = '') {
    return new Promise(async (resolve, reject) => {
      const data = await page.data()
      resolve(key ? data[key] : data)
    })
  }


  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor(600);
  });

  it('Check async properties', async () => {
    // 异步存储测试
    await page.setData({
      key: "autotest_key_mock",
      data:"长安大道连狭斜，青牛白马七香车。玉辇纵横过主第，金鞭络绎向侯家。龙衔宝盖承朝日，凤吐流苏带晚霞。百尺游丝争绕树，一群娇鸟共啼花。游蜂戏蝶千门侧，碧树银台万种色。复道交窗作合欢，双阙连甍垂凤翼。"
    })
    await page.waitFor(600)
    const btnSetStorageButtonInfo = await page.$('.btn-setstorageAsync')
    await btnSetStorageButtonInfo.tap()
    await page.waitFor(600)
    const btnGetStorageButtonInfo = await page.$('.btn-getstorageAsync')
    await btnGetStorageButtonInfo.tap()
    await page.waitFor(600)
    expect(await getData('apiGetData')).toEqual("长安大道连狭斜，青牛白马七香车。玉辇纵横过主第，金鞭络绎向侯家。龙衔宝盖承朝日，凤吐流苏带晚霞。百尺游丝争绕树，一群娇鸟共啼花。游蜂戏蝶千门侧，碧树银台万种色。复道交窗作合欢，双阙连甍垂凤翼。")

    // 测试 clear
    let btnGetStorageInfoASyncButton = await page.$('.btn-getStorageInfoASync')
    await btnGetStorageInfoASyncButton.tap()
    await page.waitFor(600)
    storageInfoRet = await getData('apiGetData')
    expect(storageInfoRet.keys[0]).toEqual("autotest_key_mock")

    const btnClearStorageInfoASyncButton = await page.$('.btn-clearStorageInfoASync')
    await btnClearStorageInfoASyncButton.tap()
    page.waitFor(600)

    await btnGetStorageInfoASyncButton.tap()
    await page.waitFor(600)
    storageInfoRet = await getData('apiGetData')
    expect(storageInfoRet.keys.length).toEqual(0)


    await page.setData({
      key: "autotest_key_mock",
      data:1100.8989
    })
    await page.waitFor(600)
    await btnSetStorageButtonInfo.tap()
    await page.waitFor(600)
    await btnGetStorageButtonInfo.tap()
    await page.waitFor(600)
    expect(await getData('apiGetData')).toEqual(1100.8989)


    // 测试 remove
    await btnGetStorageInfoASyncButton.tap()
    await page.waitFor(600)
    storageInfoRet = await getData('apiGetData')
    expect(storageInfoRet.keys[0]).toEqual("autotest_key_mock")

    const btnRemoveStorageInfoASyncButton = await page.$('.btn-removeStorageInfoASync')
    await btnRemoveStorageInfoASyncButton.tap()
    page.waitFor(600)

    await btnGetStorageInfoASyncButton.tap()
    await page.waitFor(600)
    storageInfoRet = await getData('apiGetData')
    expect(storageInfoRet.keys.length).toEqual(0)


    await page.setData({
      key: "autotest_key_mock",
      data:123456789
    })
    await page.waitFor(600)
    await btnSetStorageButtonInfo.tap()
    await page.waitFor(600)
    await btnGetStorageButtonInfo.tap()
    await page.waitFor(600)
    expect(await getData('apiGetData')).toEqual(123456789)

    let userObj = {
      name:"zhangsan",
      age:12
    }
    await page.setData({
      key: "autotest_key_mock",
      data:userObj
    })
    await page.waitFor(600)
    await btnSetStorageButtonInfo.tap()
    await page.waitFor(600)
    await btnGetStorageButtonInfo.tap()
    await page.waitFor(600)
    expect(await getData('apiGetData')).toEqual(userObj)

    await page.setData({
      key: "autotest_key_mock",
      data:{
        name:"zhangsan",
        age:122
      }
    })
    await page.waitFor(600)
    await btnSetStorageButtonInfo.tap()
    await page.waitFor(600)
    await btnGetStorageButtonInfo.tap()
    await page.waitFor(600)
    let objRet = await getData('apiGetData')
    expect(objRet.age).toEqual(122)




  });


  it('Check sync properties', async () => {

    await page.setData({
      key: "autotest_key_mock",
      data:"长安大道连狭斜，青牛白马七香车。玉辇纵横过主第，金鞭络绎向侯家。龙衔宝盖承朝日，凤吐流苏带晚霞。百尺游丝争绕树，一群娇鸟共啼花。游蜂戏蝶千门侧，碧树银台万种色。复道交窗作合欢，双阙连甍垂凤翼。"
    })
    await page.waitFor(600)
    let btnSetStorageButtonInfo = await page.$('.btn-setstorageSync')
    await btnSetStorageButtonInfo.tap()
    await page.waitFor(600)
    let btnGetStorageButtonInfo = await page.$('.btn-getstorageSync')
    await btnGetStorageButtonInfo.tap()
    await page.waitFor(600)
    expect(await getData('apiGetData')).toEqual("长安大道连狭斜，青牛白马七香车。玉辇纵横过主第，金鞭络绎向侯家。龙衔宝盖承朝日，凤吐流苏带晚霞。百尺游丝争绕树，一群娇鸟共啼花。游蜂戏蝶千门侧，碧树银台万种色。复道交窗作合欢，双阙连甍垂凤翼。")

    // 测试clear
    const btnGetStorageInfoSyncButton = await page.$('.btn-getStorageInfoSync')
    await btnGetStorageInfoSyncButton.tap()
    await page.waitFor(600)
    let storageInfoRet = await getData('apiGetData')
    expect(storageInfoRet.keys[0]).toEqual("autotest_key_mock")


    const btnClearStorageInfoSyncButton = await page.$('.btn-clearStorageInfoSync')
    await btnClearStorageInfoSyncButton.tap()

    await btnGetStorageInfoSyncButton.tap()
    await page.waitFor(600)
    storageInfoRet = await getData('apiGetData')
    expect(storageInfoRet.keys.length).toEqual(0)


    await page.setData({
      key: "autotest_key_mock",
      data:12345789.235689
    })
    await page.waitFor(600)
    btnSetStorageButtonInfo = await page.$('.btn-setstorageSync')
    await btnSetStorageButtonInfo.tap()
    await page.waitFor(600)
    btnGetStorageButtonInfo = await page.$('.btn-getstorageSync')
    await btnGetStorageButtonInfo.tap()
    await page.waitFor(600)
    expect(await getData('apiGetData')).toEqual(12345789.235689)
    
    
    // 测试 remove
    await btnGetStorageInfoSyncButton.tap()
    await page.waitFor(600)
    storageInfoRet = await getData('apiGetData')
    expect(storageInfoRet.keys[0]).toEqual("autotest_key_mock")
    
    const btnRemoveStorageInfoSyncButton = await page.$('.btn-removeStorageInfoSync')
    await btnRemoveStorageInfoSyncButton.tap()
    page.waitFor(600)
    
    await btnGetStorageInfoSyncButton.tap()
    await page.waitFor(600)
    storageInfoRet = await getData('apiGetData')
    expect(storageInfoRet.keys.length).toEqual(0)

    await page.setData({
      key: "autotest_key_mock",
      data:0
    })
    await page.waitFor(600)
    btnSetStorageButtonInfo = await page.$('.btn-setstorageSync')
    await btnSetStorageButtonInfo.tap()
    await page.waitFor(600)
    btnGetStorageButtonInfo = await page.$('.btn-getstorageSync')
    await btnGetStorageButtonInfo.tap()
    await page.waitFor(600)
    expect(await getData('apiGetData')).toEqual(0)



    await page.setData({
      key: "autotest_key_mock",
      data:{
        name:"tom",
        age:10
      }
    })
    await page.waitFor(600)
    btnSetStorageButtonInfo = await page.$('.btn-setstorageSync')
    await btnSetStorageButtonInfo.tap()
    await page.waitFor(600)
    btnGetStorageButtonInfo = await page.$('.btn-getstorageSync')
    await btnGetStorageButtonInfo.tap()
    await page.waitFor(600)
    let objRet = await getData('apiGetData')
    expect(objRet.name).toEqual("tom")




  });

});
