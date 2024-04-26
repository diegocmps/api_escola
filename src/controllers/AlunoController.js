const Aluno = require("../models/Aluno")

class AlunoController {

    async listar(req, res) {
        try {

            const { id } = req.params
            const { nome } = req.query

            if (id) {
                const aluno = await Aluno.findByPk(id)

                if (!aluno) {
                    return res.status(404).json({ message: "Aluno não encontrado." })
                }

                return res.json(aluno)

            } else if (nome) {

                const aluno = await Aluno.findAll({
                    where: {
                        nome: nome
                    }
                })

                return res.json(aluno)
            }
            else {
                const aluno = await Aluno.findAll()

                res.json(aluno)
            }


        } catch (error) {

            res.status(500).json({ message: "Houve um erro ao tentar listar os alunos." })

        }
    }

    async cadastrar(req, res) {
        try {

            const email = req.body.email
            const password = req.body.password
            const { nome } = req.body
            const { data_nascimento } = req.body
            const { celular } = req.body

            if (!nome) {
                return res.status(400).json({ message: "O nome do aluno é obrigatório." })
            }

            if (!data_nascimento.match(/\d{4}-\d{2}-\d{2}/gm)) {
                return res.status(400).json({ message: "A data de nascimento não está no formato correto." })
            }

            if (!celular.match(/^\d{9}$/)) {
                return res.status(400).json({ message: "Insira um número de celular válido." })
            }

            const aluno = await Aluno.create({
                email: email,
                password: password,
                nome: nome,
                data_nascimento: data_nascimento,
                celular: celular
            })

            res.json(aluno)

        } catch (error) {
            res.status(500).json({ message: "Houve um erro ao tentar cadastrar o aluno." })
        }
    }

    async atualizar(req, res) {
        try {
            const { id } = req.params
            const data = req.body

            const aluno = await Aluno.findByPk(id)

            if (!aluno) {
                return res.status(404).json({ message: "Aluno não localizado." })
            }

            const [updated] = await Aluno.update(
                data,
                { where: { id: id } }
            )

            if (!updated) {
                res.status(404).json({ message: "Não encontrado" })
            }

            res.status(200).json({ message: "Dados atualizados com sucesso." })


        } catch (error) {

            res.status(500).json({ message: "Houve um erro ao tentar atualizar os dados." })

        }
    }

    async deletar(req, res) {
        try {

            const { id } = req.params

            const aluno = await Aluno.findByPk(id)

            if (!aluno) {
                return res.status(404).json({ message: "Aluno não encontrado" })
            }

            await Aluno.destroy({
                where: {
                    id: id
                }
            })


            res.status(204).json({})

        } catch (error) {

            res.status(500).json({ message: "Ocorreu um erro ao tentar excluir o aluno" })
        }
    }
}

module.exports = new AlunoController