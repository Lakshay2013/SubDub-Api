import Subscription from "../models/subscription.model.js";
import { workflowClient } from "../config/upstash.js";

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id
        });

        await workflowClient.trigger;

        res.status(201).json({ success: true, data: subscription });
    } catch (e) {
        next(e);
    }
};

export const getUserSubscriptions = async (req, res, next) => {
    try {
        // Ensure user can only fetch their own subscriptions
        const userId = req.user._id;

        const subscriptions = await Subscription.find({ user: userId });

        res.status(200).json({
            success: true,
            data: subscriptions.length > 0 ? subscriptions : null
        });
    } catch (e) {
        next(e);
    }
};
