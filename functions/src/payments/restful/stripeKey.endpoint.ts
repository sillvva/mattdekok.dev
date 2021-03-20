import { Request, Response } from 'express';
import { Endpoint, RequestType } from 'firebase-backend';
import { config } from 'firebase-functions';

export default new Endpoint(
    'stripeKey',
    RequestType.GET,
    (req: Request, res: Response) => {
        res.status(200).json({
            key: config().stripe.public
        });
    }
);