const validateName = (req, res, next) => {
    const talkerData = { ...req.body };

    if (!Object.keys(talkerData).some((e) => e === 'name')) {
        return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    } 
    if (talkerData.name.length < 3) {
        return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    } 
    if (!Object.keys(talkerData).some((e) => e === 'age')) {
        return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    } 
    if (Number(talkerData.age) <= 18) {
        return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
    } 
    return next();
};

const validateAge = (req, res, next) => {
    const talkerData = { ...req.body };

    if (!Object.keys(talkerData).some((e) => e === 'age')) {
        return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    } 
    console.log(talkerData);
    if (Number(talkerData.age) < 18) {
        return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
    } 
    return next();
};

const validateTalk = (req, res, next) => {
    const talkerData = { ...req.body };

    if (!Object.keys(talkerData).some((e) => e === 'talk')) {
      return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    }
    return next();
};

const validateWatchAt = (req, res, next) => {
    const { talk: { watchedAt } } = req.body;
    const regex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
    if (!watchedAt) {
      return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    }
    if (watchedAt.match(regex)) {
      return next();
    }
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  };
  
const validateRate = (req, res, next) => {
    const { talk: { rate } } = req.body;
    if (!rate) {
      return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
    }
    if (Number.isInteger(rate) && (Number(rate) >= 1 && Number(rate) <= 5)) {
      return next();
    }
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
};

module.exports = {
    validateName,
    validateAge,
    validateTalk,
    validateWatchAt,
    validateRate,
};