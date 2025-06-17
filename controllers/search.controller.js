const userDB = require('../models/user.model');

exports.searchUsers = (req, res) => {
  let query = req.query.q;
  if (!query || query.trim().length === 0) {
    return res.render('search-users', { 
      user: req.session.user, 
      query: '', 
      users: [], 
      message: 'Por favor, ingresa un término de búsqueda.' 
    });
  }
  
  query = query.trim();

  userDB.searchUsers(query, (err, users) => {
    if (err) {
      console.error('Error en búsqueda de usuarios:', err.message);
      return res.status(500).send('Error en búsqueda de usuarios.');
    }
    
    res.render('search-users', { 
      user: req.session.user, 
      query, 
      users, 
      message: users.length === 0 ? 'No se encontraron resultados.' : null 
    });
  });
};