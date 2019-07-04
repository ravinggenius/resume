import React from 'react';
import styled from 'react-emotion';

import { Body, Header, SectionLayout } from './section';

const Section = styled(SectionLayout)`
	@media print, screen and (min-width: 520px) {
		grid-template-areas: 'header body';
		grid-template-columns: max-content 1fr;
	}

	${Body} {
		@media print, screen and (min-width: 520px) {
			text-align: end;
		}
	}

	${Header} {
		writing-mode: unset;

		@media print, screen and (min-width: 520px) {
			text-align: end;
		}
	}
`;

const Name = styled.h1`
	grid-area: name;
	margin: 0;
	margin-right: 2ch;
`;

const Title = styled.span`
	color: #777777;
	display: block;
	grid-area: title;
`;

const Address = styled.address`
	font-style: normal;
`;

export default ({ email, location, name, phone, title, website }) => (
	<Section>
		<Header>
			<Name>{name}</Name>

			<Title>{title}</Title>
		</Header>

		<Body>
			<Address>{location}</Address>

			<Address>
				<a href={`mailto:${email}`}>{email}</a>
			</Address>

			<Address>
				<a href={`tel:${phone.replace(/[ .]/g, '')}`}>
					{phone.replace('+1 ', '')}
				</a>
			</Address>

			<Address>
				<a href={website}>{website.replace(/^https?:\/\//, '')}</a>
			</Address>
		</Body>
	</Section>
);
