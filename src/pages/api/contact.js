import isValidEmail, { emailRegex } from '@/lib/isValidEmail';
import Joi from 'joi';

const reqBodySchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string()
		.custom((value, helpers) => {
			if (!isValidEmail(value)) {
				return helpers.message('Invalid email address');
			}
			return value;
		})
		.required(),
	subject: Joi.string().required(),
	message: Joi.string().required(),
	turnstileToken: Joi.string().required(),
	acceptTerms: Joi.boolean()
		.custom((value, helpers) => {
			if (!value) {
				return helpers.message(
					'You did not accept our terms and privacy policy'
				);
			}
			return value;
		})
		.required(),
});

const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;
const TURNSTILE_VERIFY_URL =
	'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const reqBody = req?.body;
		// nodeLog(typeof reqBody === 'object' && reqBody instanceof Object);
		// nodeLog(req.body instanceof {})
		if (typeof reqBody === 'object' && reqBody instanceof Object) {
			try {
				const _ = await reqBodySchema.validateAsync(reqBody);
				//by now we have validated the body of the request
				const { name, email, subject, message, turnstileToken } =
					reqBody;
					
				//verify the token
				try {
					const bodyData = `secret=${encodeURIComponent(
						TURNSTILE_SECRET_KEY
					)}&response=${encodeURIComponent(turnstileToken)}`;

					const verifyResponse = await fetch(TURNSTILE_VERIFY_URL, {
						method: 'POST',
						body: bodyData,
						headers: {
							'content-type': 'application/x-www-form-urlencoded',
						},
					});
					if (verifyResponse.ok) {
						//get the data from the body of the request
						const verifyData = await verifyResponse.json();
						//process the form data if the token verification success is true
						if (verifyData?.success) {
							//send the form data using email or save the submission to a database
							return res.status(200).send({
								message: 'Form submission was successful',
							});
						} else {
							//will be caught in the catch block with 403 status code
							throw new Error('Token verification failed');
						}
					} else {
						//will be caught in the catch block with 403 status code
						throw new Error('Token verification failed');
					}
				} catch (err) {
					return res.status(403).send({
						message: 'Token verification failed',
					});
				}
			} catch (err) {
				//transform the error before sending them in the response
				const transformedErrors = err?.details?.map(
					({ message, context }) => {
						return {
							errorMessage: message,
							context,
						};
					}
				);
				return res.status(400).send({
					message: 'Invalid request data',
					errors: transformedErrors,
				});
			}
		} else {
			return res.status(400).send({
				message: 'Missing body in request',
			});
		}
	} else {
		return res.status(405).send({
			message: 'Method not allowed',
		});
	}
}
