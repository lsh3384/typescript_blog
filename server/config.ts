import dotenv from 'dotenv'

dotenv.config()

const config = {
    dbHost: process.env.DB_HOST?process.env.DB_HOST:"",
    dbPort: process.env.DB_PORT?process.env.DB_PORT:"",
    dbUsername: process.env.DB_USER?process.env.DB_USER:"",
    dbPassword: process.env.DB_PASSWORD?process.env.DB_PASSWORD:"",
    dbName: process.env.DB_NAME?process.env.DB_NAME:"",
}

export default config;