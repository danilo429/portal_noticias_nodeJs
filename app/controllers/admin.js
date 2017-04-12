module.exports.formulario_inclusao_noticia = function (app, req, res) {
    res.render("admin/form_add_noticia", { validacao: {}, noticia_erros: {} })
}

module.exports.noticias_salvar = function (app, req, res) {
    var form_noticia = req.body;

    req.assert('titulo', 'Titulo é Obrigatório!').notEmpty()
    req.assert('resumo', 'Resumo é Obrigatório!').notEmpty()
    req.assert('resumo', 'Entre 8 a 100 caractéres!').len(8, 100)
    req.assert('autor', 'Autor é Obrigatório!').notEmpty()
    req.assert('data_noticia', 'Data é Obrigatório!').notEmpty()
    req.assert('data_noticia', 'Data no formato incorreto!').isDate({ format: 'YYYY-MM-DD' })
    req.assert('noticia', 'Notícia é Obrigatório!').notEmpty()

    var erros = req.validationErrors()
    console.log(erros)

    if (erros) {
        res.render("admin/form_add_noticia", { validacao: erros, noticia_erros: form_noticia })
        return
    }

    const connection = app.config.dbConnection()
    const noticiasModel = new app.app.models.NoticiasDAO(connection)

    noticiasModel.salvarNoticia(form_noticia, function (error, result) {
        res.redirect('/noticias')
    })
}