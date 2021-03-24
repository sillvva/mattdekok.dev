import { Request, Response } from 'express';
import { Endpoint, RequestType } from 'firebase-backend';
import { config } from "firebase-functions";
import StripeAPI from "stripe";

interface StripeKeys {
    public: string;
    secret: string;
}

export default new Endpoint(
    'payment',
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

        if (!name) {
            return res.json({
                body: req.body,
                status: "error",
                error: {
                    type: "Missing Information",
                    message: "Name is missing."
                }
            });
        }

        if (!email) {
            return res.json({
                body: req.body,
                status: "failed",
                error: {
                    type: "Missing Information",
                    message: "Email address is missing."
                }
            });
        }

        if (amount <= 1) {
            return res.json({
                body: req.body,
                status: "failed",
                error: {
                    type: "Invalid Information",
                    message: "Please enter an amount greater than 0."
                }
            });
        }

        if (!email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            return res.json({
                body: req.body,
                status: "failed",
                error: {
                    type: "Invalid Information",
                    message: "The email address you submitted is invalid."
                }
            });
        }

        if (!tokenId) {
            return res.json({
                body: req.body,
                status: "failed",
                error: {
                    type: "Missing Information",
                    message: "Payment token is missing."
                }
            });
        }

        try {
            let charge = await stripe.charges.create({
                amount: amount,
                currency: "usd",
                description: `Donation from ${name.length > 0 ? name : "anonymous"}`,
                source: tokenId,
                statement_descriptor: `Donation to Matt DeKok`,
                receipt_email: email
            });

            return res.json({
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
            return res.json({
                body: req.body,
                status: "failed",
                error: {
                    type: err.raw ? "ChargeFailed (" + err.raw.statusCode + ")" : null,
                    message: err.raw ? err.raw.message : err.message
                }
            });
        }
    }
);