import {Sequelize} from 'sequelize-typescript'

import Config from '../config'

let _dbHandler = new WeakMap();
const _dbHandlerRef = {className: 'DbHandler'}

class DbHandler {
    dbHost:string;
    dbPort:string;
    dbUsername:string;
    dbPassword:string;
    dbName:string;
    
    constructor(dbHost:string, dbPort:string, dbUsername:string, dbPassword:string, dbName:string) {
        this.dbHost = dbHost;
        this.dbPort = dbPort;
        this.dbUsername = dbUsername;
        this.dbPassword = dbPassword;
        this.dbName = dbName;
    }

    getDbInstance() {
        let instance = _dbHandler.get(_dbHandlerRef);
        if(instance === null || instance === undefined) {
            const connString = this._createDbConnString();
            instance = new Sequelize(connString, {omitNull: true, logging: false, timezone: '+09:00'});
            _dbHandler.set(_dbHandlerRef, instance);
        }

        return instance;
    }

    _createDbConnString() {
        return 'mysql://' + this.dbUsername + ':' +  this.dbPassword + '@' + this.dbHost +':' + this.dbPort + '/' + this.dbName;
    }
}

let DbHandlerInstance = new DbHandler(Config.dbHost, Config.dbPort, Config.dbUsername, Config.dbPassword, Config.dbName);

export default DbHandlerInstance;