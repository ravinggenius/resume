import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import React from 'react';

import { Body, Header, SectionLayout } from './Section';

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

const ContactCard = ({ email, location, name, phone, title, website }) => (
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

ContactCard.propTypes = exact({
	email: PropTypes.string.isRequired,
	location: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	phone: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	website: PropTypes.string.isRequired
});

export default ContactCard;
