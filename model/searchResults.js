//custom modules
const db = require('./bd/mysqlPool')
//class
module.exports = class SearchGroup{
    constructor(id,name,fullName,owner,repoUrl,createAt,updateAt,gitUrl,homePage,watchers,language,openIssues,description){
        this.id = id
        this.name = name
        this.fullName = fullName
        this.owner = {
            ownerId: owner.id,
            ownerName: owner.name,
            ownerAvatar: owner.avatar,
            ownerHomeUrl:owner.homeUrl,
            ownerType:owner.type
        }
        this.repoUrl = repoUrl
        this.createAt = (createAt.replace('T',' ')).replace('Z','')
        this.updatedAt = (updateAt.replace('T',' ')).replace('Z','')
        this.gitUrl = gitUrl
        this.homePage = homePage
        this.watchers = watchers
        this.language = language
        this.openIssues = openIssues
        this.description = description.replace('\'',' ')
        this.resultID
    }
    set setResultId(id){
        this.resultID = id
    }
    // =====================================================================================
    // INSTANCE METHODS ====================================================================
    // =====================================================================================
    save(){
        return db.query(`INSERT INTO searchResults (id,name,fullName,
                                    ownerId,onwerName,ownerAvatar,
                                    onwerHomeUrl,onwerType,repoUrl,
                                    createdAt,updatedAt,gitUrl,homePage,
                                    watchers,\`language\`,openIssues,description)
                        VALUES(?,?,?,?,?,?,?,?,
                        ?,?,?,?,?,?,?,?,?);`, 
                        [`${this.id}`,`${this.name}`,`${this.fullName}`,`${this.owner.ownerId}`,
                        `${this.owner.ownerName}`,`${this.owner.ownerAvatar}`,`${this.owner.ownerHomeUrl}`,`${this.owner.ownerType}`,
                        `${this.repoUrl}`,`${this.createAt}.0`,`${this.updatedAt}.0`,`${this.gitUrl}`,
                        `${this.homePage}`,`${this.watchers}`,`${this.language}`,`${this.openIssues}`,`${this.description}`]) 
     }
     relateSearchResultsToSearchGroup(searchGropuId){
         return db.query(`INSERT INTO searchDate_searchResults (searchGroup_id,searchResults_ID)
         VALUES(?,?);`,[`${searchGropuId}`,`${this.resultID}`])
     }
     // =====================================================================================
     // CLASS METHODS =======================================================================
     // =====================================================================================
     static fetchResultsByGroupId(searchGroupID){
         return db.query(`SELECT 
                            sr.*,
                            g.id as groupId
                        FROM searchResults sr 
                        LEFT JOIN searchDate_searchResults s ON s.searchResults_ID = sr.resultId 
                        LEFT JOIN searchGroup g ON g.id = s.searchGroup_id 
                        WHERE s.searchGroup_id = ?`,[`${searchGroupID}`])
     }
     
}