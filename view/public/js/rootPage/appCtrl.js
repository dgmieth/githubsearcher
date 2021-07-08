class AppCtrl {
    constructor(){
        this.appStates = {
            _INITIAL: 'Initial',
            _SEARCHING: 'Searching'
        }
        this.searchSidebarStates = {
            _SEARCHING: 'Searching',
            _NOTSEARCHABLE: 'NotSearchable'
        }
        this.activeClassHistoryBtn = {
            add: false,
            id: null
        }
        this.searchSidebarState = this.searchSidebarStates._SEARCHING
        this.appState = this.appStates._INITIAL
    }
// =====================================================================================
// FETCH METHODS =======================================================================
// =====================================================================================
    getSearchGroups(dataCtrl,uiCtrl){
        fetch('/services/searchGroups')
        .then(answer => { return answer.json()})
        .then(response => {
            if(!response.hasErros){
                dataCtrl.setSearchGroups(response.data)
                uiCtrl.loadHistorySideBarUI(dataCtrl,this)
                this.loadHistorySideBarListeners(dataCtrl,uiCtrl)
                
                uiCtrl.chageAppStateUI(dataCtrl,this)
                if(this.activeClassHistoryBtn.add){
                    uiCtrl.addActiveClassHistoryBtnsAfterSearch(this.activeClassHistoryBtn.id)
                    this.activeClassHistoryBtn.add = false
                    this.activeClassHistoryBtn.id = null
                }
                uiCtrl.showHideSpinner(`main`,`hide`)
                uiCtrl.showHideSpinner(`mainContent`,'hide')
            }
        })
        .catch(err => {
            console.log(err)
        })
    }
    postSearchAndSave(dataCtrl,uiCtrl,bodyObj){
        fetch('/services/searchAndSave', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(bodyObj)
        })
        .then(asnwer => { return asnwer.json()})
        .then(response => {
            console.log(response)
            if(!response.hasErros){
                this.setSearchSideBarState = this.getSearchSideBarStates._SEARCHING
                dataCtrl.resetSelectedLanguages()
                uiCtrl.resetReposPerPage()
                uiCtrl.removeActiveClassFromAllLanguageBtns()
                uiCtrl.changeSearchSideBarUI(dataCtrl,this)
                this.getSearchGroups(dataCtrl,uiCtrl)
                this.activeClassHistoryBtn.add = true
                this.activeClassHistoryBtn.id = response.data[0].groupId
                this.setAppState = this.getAppStates._SEARCHING
                dataCtrl.setGroupId(this.activeClassHistoryBtn.id)
                dataCtrl.setRepos(response.data)
            }else{
                uiCtrl.showHideAlert('show',true,'Couldnt connect to database')    
            }
        })
        .catch(err => {
            console.log(err)
            uiCtrl.showHideAlert('show',true,err.erros)
        })
    }
    getResultsForGroupId(dataCtrl,uiCtrl,groupID){
        fetch(`/services/resultsForGroupId/?id=${groupID}`)
        .then(answer => { return answer.json() })
        .then(response => {
            if(!response.hasErros){
                this.setAppState = this.getAppStates._SEARCHING
                dataCtrl.setRepos(response.data)
                uiCtrl.chageAppStateUI(dataCtrl,this)
                uiCtrl.showHideSpinner(`mainContent`,'hide')
            }
        })
        .catch(err => {
            console.log(err)
        })
    }
// =====================================================================================
// EVENT LISTENERS =====================================================================
// =====================================================================================
    loadLanguageItemsListeners(dataCtrl,uiCtrl){
        for(let btn of document.getElementsByClassName(uiCtrl.getIDs.languageList.languageItem)){
            btn.addEventListener('click', (e)=> {
                const newSelection = uiCtrl.toggleActiveClassLanguageBtns(e.target)
                if(newSelection){
                    const canSaveNewLanguage = dataCtrl.returnData('lengthSelectedLanguages')
                    if(canSaveNewLanguage){
                        dataCtrl.setSelectedLaguages(e.target.id,this)
                    }else{
                        uiCtrl.removeActiveClassLanguageBtns(e.target)
                        dataCtrl.removeSelectedLanguage(e.target.id,this)
                    }
                }else{
                    dataCtrl.removeSelectedLanguage(e.target.id,this)
                }
                uiCtrl.changeSearchSideBarUI(dataCtrl,this)
            })
        }
    }
    loadSearchBtnListener(dataCtrl,uiCtrl){
        document.getElementById(uiCtrl.getIDs.searchSideBar.searchBtn).addEventListener('click',(e)=>{
            const bodyObj = {
                languages: dataCtrl.returnData(`selectedLanguages`),
                reposPerPage: parseInt(document.getElementById(uiCtrl.getIDs.searchSideBar.reposPerPage.repos).value)

            }
            uiCtrl.showHideSpinner(`mainContent`,'show')
            setTimeout(() => {
                this.postSearchAndSave(dataCtrl,uiCtrl,bodyObj)
            }, 0);
        })
    }
    loadHistorySideBarListeners(dataCtrl,uiCtrl){
        for(let btn of document.getElementsByClassName(uiCtrl.getIDs.historySideBar.btns)){
            btn.addEventListener('click',(e)=>{
                uiCtrl.toggleActiveClassHistoryButns(btn)
                const tempArray = dataCtrl.returnData(`repos`).filter(repo => {
                    if(repo.groupId===parseInt(btn.id)){
                        return true
                    }
                    return false
                })
                dataCtrl.setGroupId(btn.id)
                uiCtrl.showHideSpinner(`mainContent`,'show')
                setTimeout(() => {
                    if(tempArray.length===0){
                        this.getResultsForGroupId(dataCtrl,uiCtrl,btn.id)
                    }else{
                        this.setAppState = this.getAppStates._SEARCHING
                        uiCtrl.chageAppStateUI(dataCtrl,this)
                    }
                }, 0);
                
            })
        }
    }
    loadResultsListeners(dataCtrl,uiCtrl){
        dataCtrl.returnData('idResultsArray').forEach(result => {
            document.getElementById(result).addEventListener('click',(e)=>{
                if(!e.target.classList.contains(uiCtrl.getIDs.modal.class.notModalEnabled)){
                    dataCtrl.setResultId(e.target.parentElement.id)
                    uiCtrl.showHideModal(dataCtrl,uiCtrl,'show')
                }
            })
        })
    }
// =====================================================================================
// SIDEBARS TOGGLE METHODS =============================================================
// =====================================================================================
    toggleSidebar(ref,uiCtrl){
        const id = uiCtrl.getIDs().sidebar.div
        document.getElementById(id).classList.toggle('active');
    }
// =====================================================================================
// APP STATE METHODS ===================================================================
// =====================================================================================
    get getAppState(){
        return this.appState
    }
    get getAppStates(){
        return this.appStates
    }
    set setAppState(state){
        this.appState = state
    }
// =====================================================================================
// SEARCHSIDEBAR METHODS ===============================================================
// =====================================================================================
    get getSearchSideBarState(){
        return this.searchSidebarState
    }
    get getSearchSideBarStates(){
        return this.searchSidebarStates
    }
    set setSearchSideBarState(state){
        this.searchSidebarState = state
    }
}