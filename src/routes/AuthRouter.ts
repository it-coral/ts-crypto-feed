import {Router, Request, Response, NextFunction} from 'express';

const localAuth = require('../auth/local');
const authHelpers = require('../auth/_helpers');
var util = require('util');

export class AuthRouter {
  router: Router

  /**
   * Initialize the AuthRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

/**
 * Creates new user record in database
 * @param  req Request object
 * @param  res Response object
 * @param  next NextFunction that is called
 * @return JSON of user object
 */
  public register(req: Request, res: Response, next: NextFunction) {
    return authHelpers.createUser(req)
    .then((user) => {return localAuth.encodeToken(user[0]); })
    .then((token) => {
      res.status(200).json({
        status: 'success',
        token: token
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 'error',
        message: 'Something went wrong, and we didn\'t create a user. :('
      });
    });
  }

 /**
  * Logs the user in
  * @param  req Request object
  * @param  res Response object
  * @param  next NextFunction that is called
  * @return JSON of user object and auth token
  */
  public login(req: Request, res: Response, next: NextFunction) {
    const username = req.body.username;
    const password = req.body.password;
    return authHelpers.getUserByUsername(username)
    .then((response) => {
      authHelpers.comparePass(password, response.password);
      return response;
    })
    .then((response) => { return localAuth.encodeToken(response); })
    .then((token) => {
      res.status(200).json({
        status: 'success',
        token: token
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 'error'
      });
    });
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.post('/register', this.register);
    this.router.post('/login', this.login);
  }

}



// Create the AuthRouter, and export its configured Express.Router
const authRoutes = new AuthRouter();
authRoutes.init();

export default authRoutes.router;