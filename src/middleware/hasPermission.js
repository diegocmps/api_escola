const jwt = require("jsonwebtoken")
const PermissionRole = require("../models/PermissionRole")
const Permission = require("../models/Permission")

function hasPermission(permissions) {
    return async (request, response, next) => {


        if (!request.headers.authorization) {
            return response.status(401).send("Token não fornecido!")
        }

        const token = request.headers.authorization

        if (!token) {
            return response.status(401).send({ message: "Token não fornecido" });
        }

        const decoded = jwt.verify(token, process.env.SECRET_JWT)
        request.payload = decoded

        try {

            const roles = await PermissionRole.findAll({
                where: {
                    roleId: request.payload.roles.map((role) => role.id)
                },
                attributes: ['permissionId'],
                include: [{ model: Permission, as: 'permissions' }]
            })

            const existPermission = roles.some((item) => {
                const hasPermission = item.permissions.some((p) => {
                    return permissions.includes(p.description)
                })

                return hasPermission
            })

            if (!existPermission) {
                return response.status(401).send("Você não tem permissão para acesar!")
            }

            next()
        } catch (error) {
            console.log(error)
            return response.status(401).send({
                message: "Autenticação Falhou",
                cause: error.message
            })

        }
    }
}

module.exports = { hasPermission };
