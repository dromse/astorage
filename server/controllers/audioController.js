const ApiError = require('../exceptions/apiError');
const AudioService = require('../services/audioService');

const validate = require('../utils/validateData');

class AudioController {
  async upload(req, res, next) {
    try {
      const { audio } = req.files;
      const { visibility, title } = req.body;
      const user = req.user;

      const audioInfo = {
        visibility,
        userId: user.id,
        title,
      };

      const message = await AudioService.upload(audio, audioInfo);

      return res.status(200).json({ message });
    } catch (e) {
      next(e);
    }
  }

  async download(req, res, next) {
    try {
      const { fileId } = req.params;

      const pathToFile = await AudioService.download(fileId);

      return res.status(200).download(pathToFile);
    } catch (e) {
      next(e);
    }
  }

  async remove(req, res, next) {
    try {
      const { fileId } = req.params;
      const userId = req.user.id;

      const pathToFile = await AudioService.remove(fileId, userId);
      return res.status(200).json({ pathToFile });
    } catch (e) {
      next(e);
    }
  }

  async getUserAudios(req, res, next) {
    try {
      const user = req.user;
      const audios = await AudioService.getUserAudios(user.id);
      return res.status(200).json({ audios });
    } catch (e) {
      next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      const audios = await AudioService.getAll();
      return res.status(200).json({ audios });
    } catch (e) {
      next(e);
    }
  }

  async changeVisibility(req, res, next) {
    try {
      const { fileId } = req.params;
      const { visibility } = req.body;
      const user = req.user;

      const audio = await AudioService.updateData(fileId, user.id, {
        visibility,
      });

      return res.status(200).json({ audio });
    } catch (err) {
      next(err);
    }
  }

  async changeTitle(req, res, next) {
    try {
      validate(req, 'Change Audio Title Error.');

      const { fileId } = req.params;
      const { title } = req.body;
      const user = req.user;

      const audio = await AudioService.updateData(fileId, user.id, { title });

      return res.status(200).json({ audio });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AudioController();
