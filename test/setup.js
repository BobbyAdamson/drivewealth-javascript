import { User, setup, ENVIRONMENTS } from "../lib/drivewealth";

const SECONDS = 15;

beforeAll(() => {

	window.jasmine.DEFAULT_TIMEOUT_INTERVAL = SECONDS * 1000;

	setup({
		env: ENVIRONMENTS.UAT,
		httpImpl: require("../lib/httpImpls/request.js"),
		appTypeID: "2000",
		appVersion: "1.0",
	});

	return User.login(
		process.env.username || "timurt",
		process.env.password || "passw0rd",
	)
	.then(user => {
		window.user = user;
	})
	.catch(console.error);
});

afterAll(() => user.logout().catch(console.error));
