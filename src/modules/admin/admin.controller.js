import adminService from "./admin.service.js";

const adminController = {
    registerAdmin: async (req, res) => {
        try {
            console.log("----");
            
            const admin = await adminService.registerAdmin(req.body);
            res.status(201).json(admin);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },

    loginAdmin: async (req, res) => {
        try {
            const response = await adminService.loginAdmin(req.body);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },
}

export default adminController;