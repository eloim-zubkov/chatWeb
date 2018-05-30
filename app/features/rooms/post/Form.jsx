const React = require('react');
const {withFormik} = require('formik');
const axios = require('axios');
const {Box, Button, Form, FormField, TextInput} = require('grommet');
const _ = require('underscore');
const yup = require('yup');
const PropTypes = require('prop-types');

function Room({
	errors, isSubmitting, handleChange, handleSubmit, values
}) {
	return (
		<Box align="center">
			<Form onSubmit={handleSubmit}>
				<FormField label="Название" error={errors.text}>
					<TextInput
						name="roomName"
						onDOMChange={handleChange}
					/>
				</FormField>
				<FormField label="Пароль" error={errors.text}>
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
						label="Сохранить"
						type={isSubmitting ? 'button' : 'submit'}
					/>
					<Button
						label="Отменить"
						path="/"
					/>
				</Box>
			</Form>
		</Box>
	);
}

Room.propTypes = {
	isSubmitting: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	values: PropTypes.any.isRequired,
	handleChange: PropTypes.func.isRequired,
	setFieldValue: PropTypes.func.isRequired,
	errors: PropTypes.any.isRequired
};

module.exports = withFormik({
	mapPropsToValues: ({post}) => ({
		_id: post && post._id,
		text: post ? post.text : '',
		image: post && post.image
	}),

	validationSchema: yup.object().shape({
		roomName: yup
			.string()
			.required()
			.min(3)
			.max(20),
		password: yup
			.string()
			.min(6)
			.max(20),
	}),

	handleSubmit: ({roomName, password}, {props, setSubmitting}) => {
		axios.post(`/api/rooms`, {name: roomName, password}).then((res) => {
			props.router.push(`/${res.room._id}`);
		}).catch(() => {
			setSubmitting(false);
		});
	}
})(Room);
