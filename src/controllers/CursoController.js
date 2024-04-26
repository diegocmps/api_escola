const Curso = require("../models/Cursos")

class CursoController {

    async listar (req, res){
        try {

            const { id } = req.params
            const { nome } = req.query
    
            if (id) {
                const curso = await Curso.findByPk(id)
    
                if (!curso) {
                    return res.status(404).json({ message: "Curso não encontrado." })
                }
    
                return res.json(curso)
    
            } else if (nome) {
    
                const curso = await Curso.findAll({
                    where: {
                        nome: nome
                    }
                })
    
                return res.json(curso)
            }
            else {
                const curso = await Curso.findAll()
    
                res.json(curso)
            }
    
    
        } catch (error) {
    
            res.status(500).json({ message: "Houve um erro ao tentar listar os cursos." })
    
        }
    }
    async cadastrar(req, res) {
        try {

            const { nome } = req.body
            const { duracao_horas } = req.body
    
            if (!nome) {
                return res.status(400).json({ message: "O nome do curso é obrigatório." })
            }
    
            if (!(duracao_horas >= 40 && duracao_horas <= 200)) {
                return res.status(400).json({ message: "A duração do curso deve ser entre 40 e 200 horas." })
            }
    
    
            const curso = await Curso.create({
                nome: nome,
                duracao_horas: duracao_horas
            })
    
            res.json(curso)
    
        } catch (error) {
    
            res.status(500).json({ message: "Houve um erro ao tentar cadastrar o curso." })
    
        }
    }

    async atualizar(req, res) {
        try {
            const { id } = req.params
            const data = req.body
    
            const curso = await Curso.findByPk(id)
    
            if (!curso) {
                return res.status(404).json({ message: "Curso não localizado." })
            }
    
            const [updated] = await Curso.update(
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
    
            const curso = await Curso.findByPk(id)
    
            if (!curso) {
                return res.status(404).json({ message: "Curso não encontrado" })
            }
    
            await Curso.destroy({
                where: {
                    id: id
                }
            })
    
    
            res.status(204).json({})
    
        } catch (error) {
    
            res.status(500).json({ message: "Ocorreu um erro ao tentar excluir o curso" })
        }
        
    }

}

module.exports = new CursoController