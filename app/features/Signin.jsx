const React = require('react');
const axios = require('axios');
const {withFormik} = require('formik');
const {Box, Button, Form, FormField, Layer, TextInput} = require('grommet');
const yup = require('yup');
const PropTypes = require('prop-types');

function Signin({handleChange, handleSubmit, isSubmitting, errors}) {
	return (
		<Layer>
			<Box align="center">
				<Form onSubmit={handleSubmit}>
					<FormField label="Ваш ник" error={errors.text}>
						<TextInput
							name="name"
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
			.max(20)
	}),

	handleSubmit: ({name}, {props, setSubmitting}) => {
		axios.patch('/api/name', {name}).then(() => {
			props.router.push('/');
		}).catch(() => {
			setSubmitting(false);
		});
	}
})(Signin);
