import chalk from 'chalk'

import { app } from './app.js'
import { PORT } from './app.js'

app.listen(PORT, () => {
	console.log(chalk.yellow(''))
	console.log(chalk.yellow('-----------'))
	console.log(chalk.yellow(`piu piu Server start OK on port ${PORT}  `))
	console.log(chalk.yellow('OGC'))
})
