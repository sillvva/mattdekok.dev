import { Request, Response } from 'express';
import { Endpoint, RequestType } from 'firebase-backend';
import { config } from "firebase-functions";
import StripeAPI from "stripe";

interface StripeKeys {
    public: string;
    secret: string;
}

export default new Endpoint(
    'donate',
    RequestType.POST,
    async (req: Request, res: Response) => {
        const stripeKeys: StripeKeys = config().stripe;
        const stripe = new StripeAPI(stripeKeys.secret, {
            apiVersion: '2020-08-27'
        });

        const name: string = req.body.name;
        const email: string = req.body.email;
        // Stripe considers "5" to be $0.05. Multiply by 100 to get dollars
        const amount: number = Math.abs(Math.round(parseFloat(req.body.amount) * 100));
        const tokenId: any = req.body.tokenId;

        try {
            let charge = await stripe.charges.create({
                amount: amount,
                currency: "usd",
                description: `Donation from ${name.length > 0 ? name : "anonymous"}`,
                source: tokenId,
                statement_descriptor: `Donation to mattdekok.dev`,
                receipt_email: email
            });

            res.json({
                body: req.body,
                status: charge.status,
                error:
                    charge.status === "failed"
                        ? {
                            type: "ChargeFailed (" + charge.failure_code + ")",
                            message: charge.failure_message
                        }
                        : null
            });
        } catch (err) {
            res.status(500).json({
                body: req.body,
                status: "failed",
                error: err
            });
        }
    }
);