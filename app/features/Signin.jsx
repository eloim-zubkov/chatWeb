const React = require('react');
const axios = require('axios');
const {withFormik} = require('formik');
const yup = require('yup');

const LoginForm = withFormik({
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
		axios.patch('/api/users', {name, password})
			.then(() => props.router.push('/'))
			.catch((error) => {
				setSubmitting(false);
				const {response} = error;

				if (response && response.data.message === 'Wrong password') {
					setFieldError('auth', 'Неверный логин/пароль');
				}
			});
	}
})(require('app/components/LoginForm'));

module.exports = (props) => (
	<LoginForm
		withSignUp
		header="Вход в систему"
		{...props}
	/>
);
