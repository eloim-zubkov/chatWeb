const React = require('react');
const axios = require('axios');
const {withFormik} = require('formik');
const yup = require('yup');
const PropTypes = require('prop-types');
const {Box, Button, Form, FormField, Layer, TextInput} = require('grommet');

function Signin({handleChange, handleSubmit, isSubmitting, errors}) {
	return (
		<Layer>
			<Box align="center" padding="small">
				<Form onSubmit={handleSubmit}>
					{errors.auth && <div>{errors.auth}</div>}
					<FormField label="Ваш ник" error={errors.name}>
						<TextInput
							name="name"
							onDOMChange={handleChange}
						/>
					</FormField>
					<FormField label="Пароль" error={errors.password}>
						<TextInput
							name="password"
							onDOMChange={handleChange}
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
					</Box>
				</Form>
			</Box>
		</Layer>
	);
}

Signin.propTypes = {
	isSubmitting: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	handleChange: PropTypes.func.isRequired,
	errors: PropTypes.any.isRequired
};

module.exports = withFormik({
	validationSchema: yup.object().shape({
		name: yup
			.string()
			.required()
			.min(3)
			.max(20),
		password: yup
			.string()
			.required()
			.min(3)
			.max(20)
	}),

	handleSubmit: ({name, password}, {props, setSubmitting, setFieldError}) => {
		axios.patch('/api/name', {name, password}).then(() => {
			props.router.push('/');
		}).catch(({response}) => {
			if (response.data.message === 'Wrong password') {
				setFieldError('auth', 'Неверный логин/пароль');
			}

			setSubmitting(false);
		});
	}
})(Signin);
