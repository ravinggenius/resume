import { css } from '@emotion/core';
import React from 'react';
import rehypeReact from 'rehype-react';

const markdown = css`
	@media print {
		a::before {
			content: '[';
		}

		a::after {
			content: '](' attr(href) ')';
		}
	}
`;

// SEE https://github.com/rehypejs/rehype-react/commit/21bb91cfe4dd935216593878e200a28de7ca2980
const renderAst = new rehypeReact({
	createElement: React.createElement,
	Fragment: React.Fragment
}).Compiler;

const Markdown = ({ tree, wrapper: Wrapper }) => (
	<Wrapper css={markdown}>{renderAst(tree)}</Wrapper>
);

export default Markdown;
