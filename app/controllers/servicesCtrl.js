//node modules
const https = require('https');
//npm modules
const axios = require('axios')
//classes
const SearchGroup = require('../../model/searchGroup')
const SearchResults = require('../../model/searchResults')
//support functions

//services routes
// =====================================================================================
// SEARCH GROUPS =======================================================================
// =====================================================================================
exports.searchGroups = (req,res,next) => {
    const returnObj = {
        hasErros: true,
        data: null,
        error: 'No data returned from database'
    }
    SearchGroup.fetchAllSearchGroups()
    .then(([data0,meta0])=>{
        if(data0){
            returnObj.hasErros = false
            returnObj.data= data0
            returnObj.error= null
            res.json(returnObj)
        }else{
            res.json(returnObj)
        }
    })
    .catch(err => {
        console.log(err)
        res.json(returnObj)
    })
}
// =====================================================================================
// SEARCH AND SAVE =====================================================================
// =====================================================================================
exports.searchAndSave = (req,res,next) => {
    const returnObj = {
        hasErros: true,
        data:null,
        error: 'No data returned from database'
    }
    console.log(res.body)
    const searchGroup = new SearchGroup(req.body.languages,req.body.reposPerPage)
    const checkTotalResults = searchGroup.reposPerPage*searchGroup.languages.length
    searchGroup.save()
    .then(([data0,meta0])=>{
        var resultsCounter = 0
        if(data0){
            searchGroup.setId = data0.insertId
            searchGroup.languages.forEach(language => {
                axios({
                    headers: {
                        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:60.0) Gecko/20100101 Firefox/60.'
                    },
                    json: true,
                    url: `https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&per_page=${searchGroup.reposPerPage}`
                })
                .then(response => {
                    if(response){
                        const items = response.data.items
                        items.forEach(item => {
                            const owner = {
                                id: item.owner.id,
                                name: item.owner.name,
                                avatar: item.owner.avatar_url,
                                homeUrl: item.owner.html_url,
                                type: item.owner.type
                            }
                            const searchResults = new SearchResults(item.id,item.name,item.fullName,owner,item.html_url,item.created_at,item.updated_at,item.git_url,item.homepage,item.watchers_count,item.language,item.open_issues_count,item.description)
                            searchResults.save()
                            .then(([data1,meta1])=>{
                                if(data1){
                                    searchResults.setResultId = data1.insertId
                                    searchResults.relateSearchResultsToSearchGroup(searchGroup.id)
                                    .then(([data2,meta2])=>{
                                        if(data2){
                                            resultsCounter += 1
                                            if(checkTotalResults===resultsCounter){
                                                SearchResults.fetchResultsByGroupId(searchGroup.id)
                                                .then(([data3,meta3])=>{
                                                    returnObj.hasErros = false,
                                                    returnObj.data = data3
                                                    returnObj.error = null
                                                    res.json(returnObj)
                                                })
                                                .catch(err => {
                                                    console.log('error mais mostrada')
                                                    console.log(err)
                                                    returnObj.hasErros = true,
                                                    returnObj.error = 'Couldnt retrieve results from database'
                                                    res.json(returnObj)
                                                })
                                            }
                                        }
                                    })
                                }
                            })
                            .catch(err => {
                                console.log(err)
                                returnObj.hasErros = true,
                                returnObj.error = 'Couldnt save results'
                                res.json(returnObj)
                            })
                        })
                    }
                    
                })
                .catch(err => {
                    console.log(err)
                    returnObj.hasErros = true,
                    returnObj.error = 'Couldnt retrieve information from github'
                    return res.json(returnObj)
                })
            });
        }
    })
    .catch(err=>{
        console.log(err)
        returnObj.hasErros = true,
        returnObj.error = 'Couldnt save results group'
        res.json(returnObj)
    })
}
// =====================================================================================
// GET RESULTS FOR GORUP ID ============================================================
// =====================================================================================
exports.resultsForGroupId = (req,res,next) => {
    const returnObj = {
        hasErros: true,
        data:null,
        error: 'Database connection error'
    }
    SearchResults.fetchResultsByGroupId(req.query.id)
    .then(([data,meta])=>{
        returnObj.hasErros = false,
        returnObj.data = data
        returnObj.error = null
        res.json(returnObj)
    })
    .catch(err => {
        console.log('error mais mostrada')
        console.log(err)
        returnObj.hasErros = true,
        returnObj.error = 'Couldnt retrieve results from database'
        res.json(returnObj)
    })
}