const asyncHandler = require("express-async-handler");
const Compte = require("../models/compteModel");
const Client = require("../models/clientModel");
const emailsender = require("../template/controller/email");
const authEmail = process.env.EMAIL;
const authPassword = process.env.PASS;

// @desc    Create new Compte by client
// @route   POST /newCompte
// @access  Public
const newCompte = asyncHandler(async (req, res) =>
{
    const {
        idClient,
        solde,
        type,

    } = req.body;

    if (
        !idClient ||
        !solde ||
        !type
        
    )
    {
        res.status(400);
        throw new Error("Please fill in all fields");
    }

    // get client id from token
    const client = await Client.findById(idClient);
    // const date = new Date();
    // rib: date.getTime(),
    console.log("client", client);
    if (client)
    {
        const compte = await Compte.create({
            rib: Math.floor(Math.random() * 10000000000000000),
            solde,
            type,
            status: "Pending",
            idClient: client._id,
            
        });
        if (compte)
        {
            
            emailsender.mail({
                email: client.email,
                subject: "Your Compte is on its way!",
                fullName: client.fullName,
                authEmail,
                authPassword,
            });

            res.status(201).send({ message: "  your Compte was send to admin" });
        } else
        {
            throw new Error("something went wrong");
        }
    }
    if (!client)
    {
        throw new Error("something went wrong with client function");
    }
});

// @desc    Get all Compte
// @route   GET /Comptes
// @access  Private
const getComptes = asyncHandler(async (req, res) =>
{
    const comptes = await Compte.find({})
        .populate("idClient", "fullName")
    res.status(200).json(comptes);
});

// @desc    Accept Compte
// @route   POST /acceptCompte
// @access  Private
const acceptCompte = asyncHandler(async (req, res) =>
{
    // update Compte status
    const compteId = req.params.id;
    const compte = await Compte.findById(compteId);

    if (!compte)
    {
        res.status(400);
        throw new Error("Compte not found");
    }

    const updatedCompte = await Compte.findByIdAndUpdate(compteId, req.body, {
        new: true,
    });

    if (updatedCompte)
    {
        // update client status
        const clientId = updatedCompte.idClient;
        const client = await Client.findById(clientId);
        if (client)
        {
           
            emailsender.mail({
                email: client.email,
                subject: "Your Compte was accepted!",
                fullName: client.fullName,
                authEmail,
                authPassword,
            });

            res.send({ message: " The Compte has been confirmed " });
        }
    }
});

// @desc   get Comptr by id

const getCompteById = asyncHandler(async (req, res) =>
{
    const compte = await Compte.findById(req.params.id)
    if (compte) {
       res.status(200).json(compte);
    }
});


// @desc    Cancel Compte
// @route   POST /cancelCompte
// @access  Private
const cancelCompte = asyncHandler(async (req, res) =>
{
    // update Compte status
    const compteId = req.params.id;
    const compte = await Compte.findById(compteId);

    if (!compte)
    {
        res.status(400);
        throw new Error("Compte not found");
    }

    const updatedCompte = await Compte.findByIdAndUpdate(compteId, req.body, {
        new: true,
    });

    if (updatedCompte)
    {
        // update client status
        const clientId = updatedCompte.idClient;
        const client = await Client.findById(clientId);
        if (client)
        {
            
            emailsender.mail({
                email: client.email,
                subject: "Your Compte was canceled!",
                fullName: client.fullName,
                authEmail,
                authPassword,
            });
            
            res.send({ message: " The Compte has been canceled " });
        }
    }
});

// @desc    Get single Compte
// @route   DELETE /singleCompte/:id
// @access  Private
const singleCompte = asyncHandler(async (req, res) =>
{
    const compteId = req.params.id;

    const compte = await Compte.findById(compteId)
        .populate("idClient")

    if (!compte)
    {
        res.status(400);
        throw new Error("Compte not found");
    }

    res.send(compte);
});


// @desc    Get total Comptes
// @route   GET /totalComptes
// @access  Private

const totalComptes = asyncHandler(async (req, res) =>
{
    const total = await Compte.countDocuments();
    res.status(200).json(total);
});

// @desc    Get total soldes
// @route   GET /totalSoldes
// @access  Private

const totalSoldes = asyncHandler(async (req, res) =>
{
    let total = 0;
    const comptes = await Compte.find({});
    comptes.forEach((compte) =>
    {
        total += compte.solde;
    });
    res.status(200).json(total);
});

    

module.exports = {
    getComptes,
    acceptCompte,
    cancelCompte,
    singleCompte,
    newCompte,
    totalComptes,
    getCompteById,
    totalSoldes,
};
