import * as React from 'react';
import { Turnstile } from '@marsidev/react-turnstile';

const TurnstileWidget = React.forwardRef(function TurnstileWidget(props, ref) {
	return (
		<Turnstile
			ref={ref}
			siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
			{...props}
		/>
	);
});

export default TurnstileWidget;
