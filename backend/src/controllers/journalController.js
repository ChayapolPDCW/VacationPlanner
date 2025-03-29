import prisma from "../services/dbService.js";

export const createJournal = async (req, res) => {
    try {
        const { title, notes, mood, rating, visibility } = req.body;
        const user = req.user;

        const journal = await prisma.journal.create({
            data: {
                title,
                notes,
                mood,
                rating,
                visibility,
                createdAt,
                userId: user.id
            }
        });

        res.status(200).json({
            status: "success",
            data: journal
        });
    } catch (error) {
        console.error("Create journal error:", error);
        res.status(500).json({
            status: "error",
            message: "Failed to create journal"
        });
    }
};


// Get All Journals of the users
export const getAllJournals = async (req, res) => {
    try {
        const user = req.user;
        const journals = await prisma.journal.findMany({
            select: {
                id: true,
                title: true,
                notes: true,
                mood: true,
                rating: true,
                visibility: true,
                createdAt: true
            }
        }); 
        res.status(200).json({
            status: "success",
            data: journals
        });
    } catch (error) {
        console.error("Get journals error:", error);
        res.status(500).json({
            status: "error",
            message: "Failed to get journals"
        });
    }
};


// Get all journals for one user by id
export const getJournalsByID = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user_id;

        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({
                status: "error",
                message: "Invalid journal ID"
            });
        }

        const journals  = await prisma.journal.findUnique({
            where: {
                id: parseInt(id),
                userId: user
            },
            select: {
                id: true,
                userId: true,
                title: true,
                notes: true,
                mood: true,
                rating: true,
                visibility: true,
                createdAt: true
            }
        });
        res.status(200).json({
            status: "success",
            data: journals
        });
    } catch (error) {
        console.error("Get journals error:", error);
        res.status(500).json({
            status: "error",
            message: "Failed to get journal by ID"
        });
    }
};

export const updateJournal = async (req, res) => {
    try{
        const { id } = req.params;
        const { title, notes, mood, rating, visibility } = req.body;
        const user = req.user_id;

        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({
                status: "error",
                message: "Invalid journal ID"
            });
        }

        const journal = await prisma.journal.update({
            where: {
                id: parseInt(id),
                userId: user
            },
            data: {
                title,
                notes,
                mood,
                rating,
                visibility
            }
        });

        res.status(200).json({
            status: "success",
            data: journal
        });

    }catch(error){
        console.error("Update journal error:", error);
        res.status(500).json({
            status: "error",
            message: "Failed to update journal"
        });
    }
}; 

export const deleteJournal = async(req, res) => {
    try{
        const { id } = req.params;
        const user = req.user_id;

        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({
                status: "error",
                message: "Invalid journal ID"
            });
        }

        const journal = await prisma.journal.delete({
            where: {
                id: parseInt(id),
                userId: user
            }
        });

        res.status(200).json({
            status: "success",
            data: journal
        });
    }catch(error){
        console.error("Delete journal error:", error);
        res.status(500).json({
            status: "error",
            message: "Failed to delete journal"
        });
    }
}