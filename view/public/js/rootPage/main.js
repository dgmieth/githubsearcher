const appCtrl = new AppCtrl()
const dataCtrl = new DataCtrl()
const uiCtrl = new UICtrl()

appCtrl.getSearchGroups(dataCtrl,uiCtrl)
appCtrl.loadLanguageItemsListeners(dataCtrl,uiCtrl)
appCtrl.loadSearchBtnListener(dataCtrl,uiCtrl)