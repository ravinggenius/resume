import React from 'react';
import styled from 'react-emotion';

const Name = styled.h1``;

const Location = styled.address``;

const Email = styled.address``;

const Phone = styled.address``;

export default ({ email, location, name, phone }) => (
	<section>
		<Name>{name}</Name>

		<Location>{location}</Location>

		<Email>{email}</Email>

		<Phone>{phone}</Phone>
	</section>
);
