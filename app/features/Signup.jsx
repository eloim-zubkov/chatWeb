const axios = require('axios');
const {withFormik} = require('formik');
const yup = require('yup');
const LoginForm = require('app/components/LoginForm');

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

	handleSubmit: ({name, password}, {props, setSubmitting}) => {
		axios.post('/api/users', {name, password}).then(() => {
			props.router.push('/signin');
		}).catch((err) => {
			setSubmitting(false);
			throw err;
		});
	}
})(LoginForm);
