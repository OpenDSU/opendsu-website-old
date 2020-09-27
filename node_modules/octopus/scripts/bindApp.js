function populateActions(actions, solution, app) {
	let appNameWithoutPrototype = app.replace("-prototype", "");
	actions.push({
		"type": "copy",
		"src": `./${app}/seed`,
		"target": `./web-server/${solution}/apps/${appNameWithoutPrototype}/seed`,
		"options": {
			overwrite: true
		}
	});
	actions.push({
		"type": "execute",
		"cmd": `echo Use this folder template in order to customize the application instance by adding configuration, pages etc. > ./web-server/${solution}/apps/${appNameWithoutPrototype}/readme`
	});
}

module.exports = {populateActions};