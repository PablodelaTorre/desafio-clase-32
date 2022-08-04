import log4js from 'log4js'
// import 'dotenv/config'

log4js.configure({
    appenders:{
        logsConsola:{type:"console"},
        logsFileWarn:{type:"file",filename:"warn.log"},
        logsFileError:{type:"file",filename:"error.log"}
    },
    categories:{
        default:{appenders:['logsConsola'], level:'all'},
        console:{appenders:['logsConsola'], level:'all'},
        archivo:{appenders:['logsFileWarn'], level:'warn'},
        error:{appenders:['logsFileError'], level:'error'}
    }
})

export const logWarn = log4js.getLogger('archivo')
export const logError = log4js.getLogger('error')
export const logConsole = log4js.getLogger('console')


