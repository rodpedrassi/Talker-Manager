const validateLoginData = (req, res, next) => {
    const loginData = { ...req.body };
    if (!Object.keys(loginData).some((e) => e === 'email')) {
      return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    } 
    const validRegex = /[a-z0-9]+@[a-z]+\.[a-z]/;
    if (!loginData.email.match(validRegex)) {
      return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }

    if (!Object.keys(loginData).some((e) => e === 'password')) {
      return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    } 
    if (loginData.password.length < 6) {
      return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    } 
    
    next();
  };

module.exports = {
    validateLoginData,
};