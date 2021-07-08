class UICtrl {
    constructor(){
        this.main = 'main'
        this.content = {
            div: 'content',
            mainContent: 'mainContent'
        }
        this.spinner = {
            main: 'spinnerMainWrapper',
            mainContentSpinner:'mainContentSpinner'
        }
        this.alert = {
            div: 'alert',
            btn: 'alertCloseButton',
            msg: 'text'
        }
        this.searchSideBar = {
            div: 'searchSideBar',
            toggle: 'toggleBtn',
            title: 'title',
            reposPerPage: {
                div: 'reposPerPage',
                repos: 'repos'
            } ,
            searchBtn: 'searchBtn'
        }
        this.modal = {
            id: 'modalDiv',
            body: 'modalBody',
            title: 'modalDivTitle',
            class: {
                notModalEnabled: 'notModalEnabled'
            }
        }
        this.historySideBar = {
            list: 'historyList',
            btns: 'historySearchSideBar'
        }
        this.languageList = {
            languageItem: 'languageItem'
        }
    }
// =====================================================================================
// ACTIVE CLASS ========================================================================
// =====================================================================================
    toggleActiveClassLanguageBtns(btn){
        if(btn.classList.contains('active')){
            btn.classList.remove('active')
            return false
        }else{
            btn.classList.add('active')
            return true
        }
    }
    removeActiveClassLanguageBtns(btn){
        if(btn.classList.contains('active')){
            btn.classList.remove('active')
        }
    }
    removeActiveClassFromAllLanguageBtns(){
        for(let btn of document.getElementsByClassName(uiCtrl.getIDs.languageList.languageItem)){
            if(btn.classList.contains('active')){
                btn.classList.remove('active')
            }
        }
    }
    resetReposPerPage(){
        document.getElementById(this.searchSideBar.reposPerPage.repos).value = 1
    }
    toggleActiveClassHistoryButns(btn){
        this.removeActiveClassFromAllHistoryBtns()
        btn.classList.add('active')
    }
    addActiveClassHistoryBtnsAfterSearch(groupSearchId){
        this.removeActiveClassFromAllHistoryBtns()
        document.getElementById(`${groupSearchId}`).classList.add('active')
    }
    removeActiveClassFromAllHistoryBtns(){
        for(let button of document.getElementsByClassName(this.getIDs.historySideBar.btns)){
            if(button.classList.contains(`active`)){
                button.classList.remove('active')
            }
        }
    }
// =====================================================================================
// CHANGE UI INTERFACE =================================================================
// =====================================================================================
    chageAppStateUI(dataCtrl,appCtrl){
        if(appCtrl.getAppState === appCtrl.getAppStates._INITIAL){
            document.getElementById(this.content.mainContent).innerHTML = `
            <div class="container-fluid mx-auto my-auto h-100 w-100">
                <div class="row h-100 h-100 mx-auto my-auto align-items-center">
                    <div class="col-12">
                        <div class="h3">Please select 5 languages to execute a query in GitHub</div>
                        <div class="h3"><i style="font-size:2rem">or</i></div>
                        <div class="h3">Select one search from the history sidebar to show its results</div>
                        <div class=".container-fluid mx-auto my-auto text-center w-100" style="height:25px!important"></div>
                        <div class="h5" style="color:gray"><strong>Disclaimer: </strong> There is an app limition due to GitHub's search api. GitHub established a max of 30 requests per minute. Therefore, if you choose to return 6 results per language, you will have to wait for a minute before seding a new request.</div>
                    </div>
                </div>
            </div>
            `
        }
        if(appCtrl.getAppState === appCtrl.getAppStates._SEARCHING){
            const selectedResults = dataCtrl.returnData('selectedGroupIdRepos')
            var idResultsArray = []
            var innerRows = ''
            selectedResults.forEach(repo => {
                idResultsArray.push(repo.resultId)
                innerRows = `${innerRows}
                <tr id="${repo.resultId}" style="cursor:pointer">
                    <td>${repo.name}</td>
                    <td>${repo.language}</td>
                    <td><a href="${repo.repoUrl}" target="_blank" class="notModalEnabled">Open repo</a></td>
                    <td>${repo.watchers}</td>
                </tr>
                `
            })
            dataCtrl.setIdResultsArray(idResultsArray)
            document.getElementById(this.content.mainContent).innerHTML = `
            <div class="container-fluid mx-auto my-auto h-100 w-100" style="overflow-y:auto">
                <div class="row h-100 h-100 mx-auto my-auto align-items-center">
                    <div class="col-12">
                        <div class="container-fluid w-100 mx-auto my-auto text-center h-100" style="padding: 2px!important;">
                            <table class="table table-light table-striped table-hover table-sm">
                                <thead class="thead-dark">
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Language</th>
                                        <th scope="col">Link</th>
                                        <th scope="col">Watchers</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${innerRows}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            `
            appCtrl.loadResultsListeners(dataCtrl,this)
        }
    }
    changeSearchSideBarUI(dataCtrl,appCtrl){
        if(appCtrl.getSearchSideBarState === appCtrl.getSearchSideBarStates._SEARCHING){
            for(let btn of document.getElementsByClassName(uiCtrl.getIDs.languageList.languageItem)){
                if(!btn.classList.contains('active')){
                    btn.disabled = false
                    btn.classList.remove(`disabled`)
                }
            }
            const qttyOfLanguages = dataCtrl.returnData(`selectedLanguagesMaximumLength`)
            const lenghtSelectedLanguages = dataCtrl.returnData('lengthValueSelectedLanguages')
            if(lenghtSelectedLanguages===0){
                document.getElementById(this.searchSideBar.searchBtn).textContent = `Choose ${qttyOfLanguages-lenghtSelectedLanguages} languages`
            } else {
                document.getElementById(this.searchSideBar.searchBtn).textContent = `Choose ${qttyOfLanguages-lenghtSelectedLanguages} more`
            }
            document.getElementById(this.searchSideBar.searchBtn).disabled = true
            if(document.getElementById(this.searchSideBar.searchBtn).classList.contains(`btn-primary`)){
                document.getElementById(this.searchSideBar.searchBtn).classList.remove(`btn-primary`)
                document.getElementById(this.searchSideBar.searchBtn).classList.add('btn-secondary')
                document.getElementById(this.searchSideBar.searchBtn).disabled = true
            }
        }
        if(appCtrl.getSearchSideBarState === appCtrl.getSearchSideBarStates._NOTSEARCHABLE){
            for(let btn of document.getElementsByClassName(uiCtrl.getIDs.languageList.languageItem)){
                if(!btn.classList.contains('active')){
                    btn.disabled = false
                    btn.classList.add(`disabled`)
                }
            }
            document.getElementById(this.searchSideBar.searchBtn).textContent = `Search`
            if(document.getElementById(this.searchSideBar.searchBtn).classList.contains(`btn-secondary`)){
                document.getElementById(this.searchSideBar.searchBtn).classList.add('btn-primary')
                document.getElementById(this.searchSideBar.searchBtn).classList.remove(`btn-secondary`)
                document.getElementById(this.searchSideBar.searchBtn).disabled = false
            }

        }
    }
    loadHistorySideBarUI(dataCtrl,appCtrl){
        var innerButtons = ''
        const tempArray = dataCtrl.returnData('searchGroups')
        tempArray.forEach(reg => {
            innerButtons = `${innerButtons}
            <button id="${reg.id}" class="item historySearchSideBar" style="z-index:10"><div class="item my-auto mx-auto text-center" style="height:80px!important;">
            <div class="row h-100">
                <div class="col-12" style="font-size: .9rem;">Date: ${reg.searchDate.split('T')[0]}</div>
                <div class="col-12">
                <style>
                    .p-2{
                        font-size: .7rem;
                        padding:0 10px!important;
                        font-style:italic;
                    }
                </style>
                    <div class="d-flex justify-content-center flex-wrap">
                        <div class="p-2">${reg.languages.split(',')[0]}</div>
                        <div class="p-2">${reg.languages.split(',')[1]}</div>
                        <div class="p-2">${reg.languages.split(',')[2]}</div>
                        <div class="p-2">${reg.languages.split(',')[3]}</div>
                        <div class="p-2">${reg.languages.split(',')[4]}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div></button>
            `
        })
        document.getElementById(this.historySideBar.list).innerHTML = innerButtons
    }
// =====================================================================================
// SPINNER CONTROLLER ==================================================================
// =====================================================================================
    showHideSpinner(spinnerDOMLevel,showHide){
        if(spinnerDOMLevel===`main`){
            if(showHide===`show`){
                document.getElementById(this.main).style.display = `none`
                document.getElementById(this.spinner.main).style.display = 'block'
            }else if(showHide===`hide`){
                document.getElementById(this.main).style.display = `block`
                document.getElementById(this.spinner.main).style.display = 'none'
            }
        }else if(spinnerDOMLevel==='mainContent'){
            if(showHide===`show`){
                document.getElementById(this.content.mainContent).style.display = `none`
                document.getElementById(this.spinner.mainContentSpinner).style.display = 'block'
            }else if(showHide===`hide`){
                document.getElementById(this.content.mainContent).style.display = `block`
                document.getElementById(this.spinner.mainContentSpinner).style.display = 'none'
            }
        }
    }
// =====================================================================================
// ALERT CONTROLLER ====================================================================
// =====================================================================================
    showHideAlert(showHide,isDanger,msg){
        console.log(1)
        if(document.getElementById(this.alert.div).classList.contains('alert-success')){
            console.log(11)
            document.getElementById(this.alert.div).classList.remove('alert-success')
        }
        if(document.getElementById(this.alert.div).classList.contains('alert-danger')){
            console.log(12)
            document.getElementById(this.alert.div).classList.remove('alert-danger')
        }
        if(showHide==='show'){
            console.log(2)
            const alertClasses = isDanger === true ? 'alert-danger' : 'alert-success'
            document.getElementById(this.alert.div).classList.add(alertClasses)
            document.getElementById(this.alert.msg).innerText = msg
            document.getElementById(this.alert.div).classList.remove('fade')
            document.getElementById(this.alert.div).classList.add('show')
        }else if (showHide==='hide'){
            console.log(3)
            document.getElementById(this.alert.div).classList.remove('alert-success','alert-danger','alerta-warning', 'show')
            document.getElementById(this.alert.div).classList.add('fade')
        }
    }
// =====================================================================================
// MODAL CONTROLLER ====================================================================
// =====================================================================================
    showHideModal(dataCtrl,appCtrl,showHide){
        const repo = dataCtrl.returnData('selectedResultIdInfo')[0]
        document.getElementById(this.modal.title).innerText = `${repo.name} details`
        document.getElementById(this.modal.body).innerHTML = `
        <div class=".container-fluid mx-auto my-auto w-100 text-center">
            <div class="row h-100 w-100 align-items-center">
                <div class="col-4">
                    <div class="row h-100 w-100 align-items-center">
                        <div class="col-12">
                            <img src="${repo.ownerAvatar}" alt="owner avatar" height="100px" width="100px"> 
                        </div>
                    </div>
                </div>
                <div class="col-8">
                    <div class="row h-100 w-100 text-left">
                        <div class="col-12"><strong>Full name:</strong> ${repo.fullName === "null" || repo.fullName === "undefined" ? '' : repo.fullName}</div>
                        <div class="col-12"><strong>Owner:</strong> ${repo.onwerName === "null" || repo.onwerName === "undefined"  ? '' : repo.onwerName}</div>
                        <div class="col-12"><strong>Name:</strong> ${repo.onwerType === "null" || repo.onwerType === "undefined"  ? '' : repo.onwerType}</div>
                        <div class="col-12"><strong>Language:</strong> ${repo.language === "null" || repo.language === "undefined" ? '' : repo.language}</div>
                    </div>    
                </div>
            </div>
        </div>
        <hr>
        <div class=".container-fluid mx-auto my-auto w-100 text-center">
            <div class="row h-100 w-100 align-items-center">
                <div class="col-6"><strong>Repo url: </strong><a href="${repo.repoUrl}" target="_blank" class="notModalEnabled">open repo</a></div>
                <div class="col-6"><strong>Github: </strong><a href="${repo.onwerHomeUrl}" target="_blank" class="notModalEnabled">open home page</a></div>
            </div>
        </div>
        <hr>
        <div class=".container-fluid mx-auto my-auto w-100 text-lfet">
            <div class="row h-100 w-100 text-left">
                <div class="col-12"><strong>Created at: </strong>${repo.createdAt.replace(/T/,' ').replace(/\..+/, '')}</div>
                <div class="col-12"><strong>Last update: </strong>${repo.updatedAt.replace(/T/,' ').replace(/\..+/, '')}</div>
                <div class="col-12"><strong>Watchers: </strong>${repo.watchers}</div>
                <div class="col-12"><strong>Open issues: </strong>${repo.openIssues}</div>
            </div>
        </div>
        <hr>
        <div class=".container-fluid mx-auto my-auto w-100 text-lfet">
            <div class="row h-100 w-100 text-left">
                <div class="col-12"><strong>Description: </strong>${repo.description==="null" || repo.description === "undefined" ? ' ' : repo.description}</div>
            </div>
        </div>
        `
        $(`#${this.modal.id}`).modal(showHide)
    }
// =====================================================================================
// RETURN IDS METHODS ==================================================================
// =====================================================================================
    get getIDs(){
        return this
    }
}