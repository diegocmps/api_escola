const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role= require('../models/Role');
const Permission = require('../models/Permission');

class LoginController {

    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).send('Email e senha são obrigatórios');
            }


            const usuario = await User.findOne({
                where: { email: email },
                include: [{
                    model: Role, as: 'roles', through: { attributes: [] },
                    include: [{ model: Permission, as: 'permissions', through: { attributes: [] } }]
                }],
            })

            if (!usuario) {
                return res.status(404).send('Usuário não encontrado');
            }

            const senhaCorreta = await bcrypt.compare(password, usuario.password);

            if (!senhaCorreta) {
                return res.status(401).send('Senha incorreta');
            }

            const payload = { id: usuario.id, email: usuario.email, roles: usuario.roles };
            const token = jwt.sign(payload, process.env.SECRET_JWT, { expiresIn: '1h' });
            res.status(200).json({ token });

        } catch (err) {
            console.error(err);
            res.status(500).send('Erro no servidor');
        }
    }
}

module.exports = new LoginController()