import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import chalk from 'chalk'
import multer from 'multer'

import { getRootRouter } from './routes/rootRouter.js'

dotenv.config()

export const PORT = process.env.PORT
const DB_PATH = process.env.DB_PATH

mongoose
	.connect(process.env.DB_PATH)
	.then(() => console.log(chalk.yellow('BD works unlike me')))
	.then(() => console.log(chalk.yellow('OGC')))
	.catch(err => console.log(chalk.red('BD error', err)))

export const app = express()

const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		cb(null, 'src/img')
	},

	filename: (_, file, cb) => {
		cb(null, file.originalname)
	},
})

export const upload = multer({ storage })
export const jsonBodyMiddleware = express.json()

app.use(jsonBodyMiddleware)
app.use(cors())

app.use('/', getRootRouter())
