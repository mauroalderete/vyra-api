module.exports = class UserModel {
    constructor(user, password, uid){
        if(
            typeof user === undefined
            && typeof password === undefined
            && typeof uid === undefined
        ){
            this.username = ''
            this.password = ''
            this.uid = ''
        } else {
            this.set(user, password, uid)
        }
        
    }

    set(user, password, uid){
        if(user != undefined && password == undefined && uid == undefined){
            this.username = ('username' in user)? user.username : undefined
            this.password = ('password' in user)? user.password : undefined
            this.uid = ('uid' in user)? user.uid : undefined
        } else {
            this.username = user
            this.password = password
            this.uid = uid
        }
    }

    equal( user ){
        if ( 'username' in user 
        && 'password' in user
        && 'uid' in user) {
            if( this.username == user.username
                && this.password == user.password
                && this.uid == user.uid) {
                    return true
                } else {
                    return false
                }
        } else {
            return false
        }
    }
}