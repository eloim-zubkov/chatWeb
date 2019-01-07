const React = require('react');
const PropTypes = require('prop-types');
const {
	Article, Box, Button, Form, FormField, Header,
	Heading, Layer, TextInput, PasswordInput
} = require('grommet');

function LoginForm({
	handleChange, handleSubmit, isSubmitting, errors, header, withSignUp
}) {
	return (
		<Layer>
			<Article align="center" pad="medium">
				<Header>
					<Heading tag="h3">{header}</Heading>
				</Header>
				<Form onSubmit={handleSubmit}>
					{errors.auth && <div>{errors.auth}</div>}
					<FormField label="Ваш ник" error={errors.name}>
						<TextInput
							name="name"
							onDOMChange={handleChange}
						/>
					</FormField>
					<FormField label="Пароль" error={errors.password}>
						<PasswordInput
							name="password"
							onChange={handleChange}
						/>
					</FormField>
					<Box
						direction="row"
						justify="between"
						margin={{top: 'small'}}
					>
						<Button
							label="Отправить"
							type={isSubmitting ? 'button' : 'submit'}
						/>
						{withSignUp && (
							<Button
								label="Зарегистрироваться"
								path="/signup"
							/>
						)}
					</Box>
				</Form>
			</Article>
		</Layer>
	);
}

LoginForm.propTypes = {
	isSubmitting: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	handleChange: PropTypes.func.isRequired,
	errors: PropTypes.any.isRequired,
	header: PropTypes.string.isRequired,
	withSignUp: PropTypes.bool
};

LoginForm.defaultProps = {
	withSignUp: false
};

module.exports = LoginForm;
