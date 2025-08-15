import { Router } from 'express';
import authorize from "../Middleware/auth.middleware.js";
import {createSubscription, getUserSubscriptions} from "../controllers/subscription.controller.js";
const subscriptionsrouter = Router();

subscriptionsrouter.get('/', (req, res) => res.send({ title: "Get all Subscriptions" }));
subscriptionsrouter.get('/:id', (req, res) => res.send({ title: "Get Subscription details" }));
subscriptionsrouter.post('/', authorize,createSubscription);
subscriptionsrouter.put('/:id', (req, res) => res.send({ title: "Update the Subscription" }));
subscriptionsrouter.delete('/:id', (req, res) => res.send({ title: "Delete a Subscription" }));
subscriptionsrouter.get('/user/:id', authorize,getUserSubscriptions);
subscriptionsrouter.put('/:id/cancel', (req, res) => res.send({ title: "Cancel a Subscription" }));
subscriptionsrouter.put('/upcoming-renewals', (req, res) => res.send({ title: "Get all user subscriptions" }));

export default subscriptionsrouter;

