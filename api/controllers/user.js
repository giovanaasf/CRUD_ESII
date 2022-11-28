import { db } from "../db.js";

export const getUsers = (_, res) => {
  const q = "SELECT * FROM livros";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addUser = (req, res) => {
  const q =
    "INSERT INTO livros (`nome`, `autor`, `data_inicio`, `data_fim`, `nota`) VALUES(?)";

  const values = [
    req.body.nome,
    req.body.autor,
    req.body.data_inicio,
    req.body.data_fim,
    req.body.nota,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Livro criado com sucesso.");
  });
};

export const updateUser = (req, res) => {
  const q =
    "UPDATE livros SET `nome` = ?, `autor` = ?, `data_inicio` = ?, `data_fim` = ?, `nota`= ? WHERE `idLivro` = ?";

  const values = [
    req.body.nome,
    req.body.autor,
    req.body.data_inicio,
    req.body.data_fim,
    req.body.nota,
  ];

  db.query(q, [...values, req.params.idLivro], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Livro atualizado com sucesso.");
  });
};

export const deleteUser = (req, res) => {
  const q = "DELETE FROM livros WHERE `idLivro` = ?";

  db.query(q, [req.params.idLivro], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Livro deletado com sucesso.");
  });
};