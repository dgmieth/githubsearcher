class DataCtrl {
    constructor(){
        this.selectedLanguagesMaximumLength = 5
        this.selectedLanguagesQttyOfIndexes = this.selectedLanguagesMaximumLength - 1
        this.selectedLanguages = []
        this.repos = []
        this.searchGroups = []
        this.selectedGroupID = null
        this.selectedResultId = null
        this.idResultsArray = null
    }
// =====================================================================================
// SET DATA ============================================================================
// =====================================================================================
    setSelectedLaguages(language,appCtrl){
        this.selectedLanguages.push(language)
        if(!this.returnData('lengthSelectedLanguages')){
            appCtrl.setSearchSideBarState = appCtrl.getSearchSideBarStates._NOTSEARCHABLE
        }
    }
    resetSelectedLanguages(){
        this.selectedLanguages = []
    }
    removeSelectedLanguage(language,appCtrl){
        this.selectedLanguages = this.selectedLanguages.filter(reg => {
            if(reg===language){
                return false
            }
            return true
        })
        if(this.returnData('lengthSelectedLanguages')){
            appCtrl.setSearchSideBarState = appCtrl.getSearchSideBarStates._SEARCHING
        }
    }
    setRepos(reposArray){
        reposArray.forEach(reg=>{
            this.repos.push(reg)
        })
    }
    setSearchGroups(searchGroupsArray){
        this.searchGroups = searchGroupsArray
    }
    setGroupId(groupID){
        this.selectedGroupID = groupID
    }
    clearGroupId(){
        this.selectedGroupID = null
    }
    setResultId(resultId){
        this.selectedResultId = resultId
    }
    clearResultId(){
        this.selectedResultId = null
    }
    setIdResultsArray(array){
        this.idResultsArray = array
    }
// =====================================================================================
// GET DATA ============================================================================
// =====================================================================================
    returnData(description){
        //selected languages
        if(description===`selectedLanguages`){
            return this.selectedLanguages
        }
        if(description==='lengthSelectedLanguages'){
            if(this.selectedLanguages.length<=this.selectedLanguagesQttyOfIndexes){
                return true
            }
            return false
        }
        if(description==='lengthValueSelectedLanguages'){
            return this.selectedLanguages.length
        }
        if(description==='repos'){
            return this.repos
        }
        if(description==='selectedGroupIdRepos'){
            return this.repos.filter(repo => {
                if(repo.groupId===parseInt(this.selectedGroupID)){
                    return true
                }
                return false
            })
        }
        if(description==='selectedResultIdInfo'){
            return this.repos.filter(repo => {
                if(repo.resultId===parseInt(this.selectedResultId)){
                    return true
                }
                return false
            })
        }
        if(description==='searchGroups'){
            return this.searchGroups
        }
        if(description==='idResultsArray'){
            return this.idResultsArray
        }
        if(description=`selectedLanguagesMaximumLength`){
            return this.selectedLanguagesMaximumLength
        }
    }
}