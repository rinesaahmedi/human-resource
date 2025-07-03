const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// GET të gjithë ekipet
router.get("/", async (req, res) => {
    const ekipet = await prisma.ekipi.findMany({ include: { gara: true } });
    res.json(ekipet);
});

// GET ekipet e një gare specifike
router.get("/gara/:garaId", async (req, res) => {
    const ekipet = await prisma.ekipi.findMany({
        where: { garaId: parseInt(req.params.garaId) },
    });
    res.json(ekipet);
});

// POST shto ekip
router.post("/", async (req, res) => {
    const { emriEkipit, numriPjestareve, garaId } = req.body;
    const ekipi = await prisma.ekipi.create({
        data: { emriEkipit, numriPjestareve:parseInt(numriPjestareve), garaId: parseInt(garaId) },
    });
    res.status(201).json(ekipi);
});

// PUT përditëso ekip
router.put("/:id", async (req, res) => {
    const { emriEkipit, numriPjestareve, garaId } = req.body;
    const ekipi = await prisma.ekipi.update({
        where: { id: parseInt(req.params.id) },
        data: { emriEkipit, numriPjestareve, garaId },
    });
    res.json(ekipi);
});

// DELETE fshi ekip
router.delete("/:id", async (req, res) => {
    await prisma.ekipi.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: "Ekipi u fshi me sukses." });
});

module.exports = router;
