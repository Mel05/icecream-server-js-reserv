import chalk from 'chalk'

import { Request, Response } from 'express'

import { RequestWithParams } from '../types/typesReqRes'

import IcecreamModel from '../models/Icecream'

interface CategoryItemType {
	category: number | undefined
}

export const getIcecreams = async (req: Request, res: Response) => {
	try {
		const {
			page = 1,
			limit = 0,
			category = undefined,
			sortBy = 'rating',
			order = 1,
			search = '',
		} = req.query

		let categoryItem: CategoryItemType | unknown = category
		let searchItem: any = search
		let sortByItem: any = { rating: order }

		if (category === undefined) {
			categoryItem = { $in: [0, 1, 2, 3, 4, 5] }
		}

		if (sortBy === 'rating') {
			sortByItem = { rating: order }
		} else if (sortBy === 'price') {
			sortByItem = { price: order }
		} else if (sortBy === 'title') {
			sortByItem = { title: order }
		}

		const startElementIndex = (Number(page) - 1) * Number(limit)

		const data = await IcecreamModel.find({
			category: categoryItem,
			title: { $regex: new RegExp(searchItem, 'i') },
		})
			.sort(sortByItem)
			.limit(Number(limit))
			.skip(startElementIndex)

		const lengthData = await IcecreamModel.find({
			category: categoryItem,
			title: { $regex: new RegExp(searchItem, 'i') },
		})
			.sort(sortByItem)
			.count()

		const totalPage = Math.ceil(Number(lengthData) / Number(limit))

		const [...dbData] = data

		res.json({
			dbData,
			paginationData: {
				lengthData,
				totalPage,
			},
		})
	} catch (error) {
		console.log(chalk.red(error))
	}
}

export const getIcecreamById = async (
	req: RequestWithParams<{ id: string }>,
	res: Response
) => {
	try {
		const icecreamData = await IcecreamModel.findById(req.params.id)

		res.json(icecreamData)
	} catch (error) {
		console.log(chalk.red(error))
	}
}
