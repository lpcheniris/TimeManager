import { Application, Router } from 'express';
import { TimerController } from "./controllers/TimerController";
import { IndexController } from "./controllers/IndexController";
import { PlaneController } from './controllers/PlaneController';

const _routes: [string, Router][] = [
    ['/', IndexController],
    ['/timer', TimerController],
    ['/plane', PlaneController]
];

export const routes = (app: Application) => {
    _routes.forEach((route) => {
        const [url, controller] = route;
        app.use(url, controller);
    });
};