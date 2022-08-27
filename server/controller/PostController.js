import PostsModel from '../models/Post.js'

export const create = async (req, res) => {
	try {
		const doc = new PostsModel({
			name: req.body.fullName,
			mail: req.body.email,
			massive: req.body.massive,
		})
		const posts = await doc.save()
		res.json(posts)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось создать список задач',
		})
	}
}
export const getAll = async (req, res) => {
	 try {
			const post = await PostsModel.find()
			res.json(post)
		} catch (err) {
			console.log(err)
			res.status(500).json({
				message: 'Не удалось получить задачи',
			})
		}
}
 export const update = async (req, res) => {
 	 try {
 			const postId = req.params.id
 			await PostsModel.updateOne(
				{
					_id: postId,
				},
				{
					massive: req.body.massive,
				}
			)
			res.json({
				success:true
			})
 		} catch (err) {
 			console.log(err)
 			res.status(500).json({
 				message: 'Не удалось создать события',
 			})
 		}
 }
export const getOne = async (req, res) => {
	 try {
			const postId = req.params.id;
    PostsModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        returnDocument: 'after',
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
						message: 'Не удалось получить пользователя',
					})
        }
        if (!doc) {
          return res.status(404).json({
            message: 'Пользователь не найден',
          });
        }
        res.json(doc);})} 
				catch (err) {
			console.log(err)
			res.status(500).json({
				message: 'Не удалось получить пользователя',
			})
		}
}
