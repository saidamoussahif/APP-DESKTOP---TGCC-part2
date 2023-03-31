const Employe = require('./Schema');

const addEmploye = async (req, res) => {
	const { fullname, email, age, phone, adress } = req.body;
	try {
		const newEmploye = new Employe({
			fullname,
			email,
			age,
			phone,
			adress,
		});
		const employe = await newEmploye.save();
		res.status(200).json(employe);
	}
	catch (err) {
		console.log(err);
	}
};

const getEmployes = async (req, res) => {
	try {
		const employes = await Employe.find();
		res.status(200).json(employes);
	}
	catch (err) {
		console.log(err);
	}
}

module.exports = {
	addEmploye,
	getEmployes,
};