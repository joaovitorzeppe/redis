import pagamento from "../models/pagamentoModel.js";

function findAll(req, res) {
    pagamento.findAll({
        order: ['idpagamento'],
    }).then((result) => res.json(result));
  }
  
function findOne(req, res) {
    pagamento.findByPk(req.params.id).then((result) => res.json(result));
}

function addOne(req, res) {
    pagamento.create({
        idcomanda: req.body.idcomanda,
        idtppag: req.body.idtppag,
        vlpagamento: req.body.vlpagamento,
    }).then((result) => res.json(result)).catch((err)=>{
        res.status(400).send(err.errors[0].message)});
}

async function updateOne(req, res) {
    await pagamento.update(
        {
            idcomanda: req.body.idcomanda,
            idtppag: req.body.idtppag,
            vlpagamento: req.body.vlpagamento,
        },
        {
            where: {
                idpagamento: req.params.id,
            },
        }
);

    pagamento.findByPk(req.params.id).then((result) => res.json(result)).catch((err)=>{
        res.status(400).send(err.errors[0].message)});
}

async function deleteOne(req, res) {
    await pagamento.destroy({
        where: {
        idpagamento: req.params.id,
    },
});

    pagamento.findAll({order:['idpagamento']}).then((result) => res.json(result)).catch((err)=>{
        res.status(400).send(err.errors[0].message)});
}

export default { findAll, findOne, addOne, updateOne, deleteOne };
