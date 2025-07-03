const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// GET të gjitha Garat
router.get("/", async (req, res) => {
    const garat = await prisma.gara.findMany({ include: { ekipet: true } });
    res.json(garat);
});

// GET një Gara me ID
router.get("/:id", async (req, res) => {
    const gara = await prisma.gara.findUnique({
        where: { id: parseInt(req.params.id) },
        include: { ekipet: true },
    });
    res.json(gara);
});

// POST shto një Gara
router.post("/", async (req, res) => {
    const { emriGares, llojiGares } = req.body;
    const gara = await prisma.gara.create({
        data: { emriGares, llojiGares },
    });
    res.status(201).json(gara);
});

// PUT update një Gara
router.put("/:id", async (req, res) => {
    const { emriGares, llojiGares } = req.body;
    const gara = await prisma.gara.update({
        where: { id: parseInt(req.params.id) },
        data: { emriGares, llojiGares },
    });
    res.json(gara);
});

// DELETE një Gara
router.delete("/:id", async (req, res) => {
    await prisma.gara.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: "Gara u fshi me sukses." });
});

module.exports = router;
