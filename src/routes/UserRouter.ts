import {Router, Request, Response, NextFunction} from 'express';
import {IRequest} from '../classes/IRequest';
const tokenHelper = require('../tools/tokens');
const toolHelpers = require('../tools/_helpers');
var util = require('util');

export class UserRouter {
  router: Router


  /**
   * Initialize the AuthRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * @description Gets a user object for logged in user
   * @param  req Request object
   * @param  res Response object
   * @param  next NextFunction that is called
   * @return 200 JSON of user object
   */
    public getUser(req: IRequest, res: Response, next: NextFunction) {
      let uid = parseInt(req.params.id);
      if(uid) {
        return User.where({user_id:uid}).fetch()
        .asCallback((err, user) => {
          res.status(200).json({
            status: 'success',
            token: tokenHelper.encodeToken(user.get('user_id')),
            user: user
          });
        });
      } else {
        res.status(200).json({
          status: 'success',
          token: tokenHelper.encodeToken(req.user.id),
          user: req.user
        });
      }
    }

    /**
    * @description Updates/Saves the current user's information
    * @param Request
    * @param Response
    * @param Callback function (NextFunction)
    */
    public putUser(req: Request, res: Response, next: NextFunction) {
      tokenHelper.getUserIdFromRequest(req, (err, user_id, token) => {
        if(err) {
            res.status(401).json({
            status: 'Token has expired',
            message: 'Your token has expired.'
          });
        } else {
          toolHelpers.updateUser(user_id, req.body, function(err, count) {
            var user = toolHelpers.getUserById(user_id)
            .asCallback((err, values) => {
              res.status(200).json({
                status: 'success',
                token: token,
                user: values
              });
            });
          });
        }
      });
    }

    /**
    * @description Gets list of groups user belongs to
    * @param Request
    * @param Response
    * @param Callback function (NextFunction)
    */
    public getGroups(req: Request, res: Response, next: NextFunction) {
      tokenHelper.getUserIdFromRequest(req, (err, user_id, token) => {
        if(err) {
            res.status(401).json({
            status: 'Token has expired',
            message: 'Your token has expired.'
          });
        } else {
          let uid = parseInt(req.params.id);
          if(uid) {
            var groups = toolHelpers.getUsersPublicGroups(uid)
            .asCallback((err, values) => {
              res.status(200).json({
                status: 'success',
                token: token,
                groups: values
              });
            });
          } else {
            var groups = toolHelpers.getUsersGroups(user_id)
            .asCallback((err, values) => {
              res.status(200).json({
                status: 'success',
                token: token,
                groups: values
              });
            });
          }

        }
      });
    }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    // Routes for /api/v1/user
    this.router.get('/', this.getUser);
    this.router.put('/', this.putUser);
    this.router.get('/groups', this.getGroups);
    this.router.get('/:id', this.getUser);
    this.router.get('/:id/groups', this.getGroups);
  }

}

// Create the AuthRouter, and export its configured Express.Router
const authRoutes = new UserRouter();
authRoutes.init();

export default authRoutes.router;
