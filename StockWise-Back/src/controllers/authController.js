const { authUsersService } = require('../services/authService');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'prueba123';

exports.authUsers = async (req, res) => {
  try {
    const { mail, contra } = req.body; 

    if (!mail || !contra) {
      return res.status(400).json({ message: "Mail y contraseña requeridos" });
    }

    const user = await authUsersService(mail, contra); 
    
    if (!user) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }
    
    const payload = {
      id: user.ID,
      rol: user.ROL
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' });

    res.status(200).json({ 
      message: "Login exitoso", 
      token: token,
      user: user
    });

  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};