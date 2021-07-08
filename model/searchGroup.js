//custom modules
const db = require('./bd/mysqlPool')
//class
module.exports = class SearchGroup{
    constructor(languages,reposPerPage){
        this.languages = languages
        this.reposPerPage = reposPerPage
        this.id = null,
        this.date = null
    }
    set setId(id){
        this.id = id
    }
    set setDate(date){
        this.date = date
    }
    // =====================================================================================
    // INSTANCE METHODS ====================================================================
    // =====================================================================================
    save(){
       return db.query(`INSERT INTO searchGroup (languages,reposPerPage,searchDate)
                        VALUES (?,?,CURRENT_TIMESTAMP()) `, [`${this.languages}`,`${this.reposPerPage}`]) 
    }
    // =====================================================================================
    // CLASS METHODS =======================================================================
    // =====================================================================================
    static fetchAllSearchGroups(){
        return db.query('SELECT * FROM searchGroup ORDER BY searchDate DESC;')
    }
}