import express, { RequestHandler } from 'express';
import socketio from 'socket.io';
import { app } from 'electron';
import path from 'path';
import fs from 'fs';
import { getMatches, addMatch, deleteMatch, updateMatch } from './index';

export const getMatchesRoute: express.RequestHandler = async (req, res) => {
	const matches = await getMatches();
	return res.json(matches);
};

export const addMatchRoute: RequestHandler = async (req, res) => {
	const match = await addMatch(req.body);
	return res.sendStatus(match ? 200 : 500);
};
export const deleteMatchRoute: RequestHandler = async (req, res) => {
	const match = await deleteMatch(req.params.id);
	return res.sendStatus(match ? 200 : 500);
};

export const updateMatchRoute = (io: socketio.Server): RequestHandler => async (req, res) => {
	const match = await updateMatch(req.body);
	io.emit('match');
	return res.sendStatus(match ? 200 : 500);
};

export const getMaps: express.RequestHandler = (req, res) => {
	const defaultMaps = ['de_mirage', 'de_dust2', 'de_inferno', 'de_nuke', 'de_train', 'de_overpass', 'de_vertigo'];
	const mapFilePath = path.join(app.getPath('userData'), 'maps.json');
	try {
		const maps = JSON.parse(fs.readFileSync(mapFilePath, 'utf8'));
		if (Array.isArray(maps)) {
			return res.json(maps);
		}
		return res.json(defaultMaps);
	} catch {
		return res.json(defaultMaps);
	}
};