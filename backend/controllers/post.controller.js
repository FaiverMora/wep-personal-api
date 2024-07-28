const Post = require("../models/post.model");
// const { Post } = require("../router/post.router");
const image = require("../utils/image");

function createPost(req, res) {
  const Post = new Post(req.body);
  Post.created_at = new Date();

  const imagePath = image.getFilePath(req.files.miniature);
  Post.miniature = imagePath;

  Post.save((error, postStored) => {
    if (error) {
      res.status(400).send({ msg: "Error al crear el post" });
    } else {
      res.status(201).send(postStored);
    }
  });
}

function getPosts(req, res) {
  const { page = 1, limit = 10 } = req.query;

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    sort: { created_at: "desc" },
  };

  Post.paginate({}, options, (error, postsStored) => {
    if (error) {
      res.status(400).send({ msg: "Error al obtener los post" });
    } else {
      res.status(200).send(postsStored);
    }
  });
}

function updatePost(req, res) {
  const { id } = req.params;
  const postData = req.body;

  if (req.files.miniature) {
    const imagePath = image.getFilePath(req.files.miniature);
    postData.miniature = imagePath;
  }

  Post.findByIdAndUpdate({ id: id }, postData, (erroг) => {
    if (error) {
      res.status(400).send({ msg: "Error al actualizar el post" });
    } else {
      res.status(200).send({ msg: "Actualizacion correcta" });
    }
  });
}
function deletePost(req, res) {
  const { id } = req.params;

  Post.findByIdAndDelete(id, (error) => {
    if (error) {
      res.status(400).send({ msg: "Error al eliminar el post" });
    } else {
      res.status(200).send({ msg: "post Eliminado" });
    }
  });
}

function getPost(req, res) {
  const { path } = req.params;

  Post.findOne({ path }, (error, postStored) => {
    if (error) {
      res.status(400).send({ msg: "Error al eliminar el post" });
    } else {
      res.status(200).send({ msg: "post Eliminado" });
    }
  });
}

module.exports = {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  getPost,
};
