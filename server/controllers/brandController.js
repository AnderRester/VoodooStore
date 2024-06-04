const { Brand, Type } = require("../models/models");
const ApiError = require("../error/ApiError");

class BrandController {
    async create(req, res) {
        const { name } = req.body;
        const brand = await Brand.create({ name });
        return res.json(brand);
    }

    async getAll(req, res) {
        const brands = await Brand.findAll();
        return res.json(brands);
    }

    async updateOne(req, res) {
        const { id } = req.params;
        const { name } = req.body;
        const brand = await Type.findOne({
            where: { id },
        });

        /*//or
        await User.update({ lastName: "Jackson" }, {
        where: {
        lastName: null
        }*/
        brand.update({ name: name });
        return res.json(brand);
    }

    async removeOne(req, res) {
        const { id } = req.params;
        const device = await Brand.removeOne({
            where: { id },
        });
        return res.json(device);
    }
}

module.exports = new BrandController();
