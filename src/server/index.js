const express = require('express');
const router = express.Router();
const app = express();

app.use(express.json());
app.use(
	express.urlencoded({
		extended: false,
	})
);
