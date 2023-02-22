import nodeLog from '@/utils/nodeLog';

export default function handler(req, res) {
	if (req.method === 'POST') {
		//get the data from the body of the request and validate the data before acting on it
		const { name, email, subject, message, turnstileToken, acceptTerms } =
			req.body;
		nodeLog(req, 'The request body');
		return res.status(200).send({
			message: 'The contact api route is working fine',
		});
	} else {
		return res.status(405).send({
			message: 'Method not allowed',
		});
	}
}
