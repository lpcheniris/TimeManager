import { Application, Router } from 'express';
import { TimerController } from "./controllers/TimerController";
import { IndexController } from "./controllers/IndexController";
import { PlanController } from './controllers/PlanController';
import { ScheduleController } from './controllers/ScheduleController';
import { PublicController } from './controllers/PublicController';
import { TaskController } from './controllers/TaskController';
import { TaskCalendarController } from './controllers/TaskCalendarController';
import { DiaryController } from './controllers/DiaryController';


const _routes: [string, Router][] = [
    ['/', IndexController],
    ['/timer', TimerController],
    ['/plan', PlanController],
    ['/schedule', ScheduleController],
    ['/task', TaskController],
    ['/taskCalendar', TaskCalendarController],
    ['/diary', DiaryController]
];

export const routes = (app: Application) => {
    _routes.forEach((route) => {
        const [url, controller] = route;
        app.use(url, controller);
    });
};