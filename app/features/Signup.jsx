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

	handleSubmit: (values, {props, setSubmitting}) => {
		axios.post('/api/users', values).then(() => {
			props.router.push('/');
		}).catch((err) => {
			setSubmitting(false);
			throw err;
		});
	}
})(LoginForm);
