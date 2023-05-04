import express from 'express'
import { getIcecreamById, getIcecreams } from '../controllers/rootController'

export const getRootRouter = () => {
	const router = express.Router()

	router.get('/icecream/:id', getIcecreamById)

	router.use('/uploads/', express.static('src/img'))

	router.get('/', getIcecreams)

	return router
}
