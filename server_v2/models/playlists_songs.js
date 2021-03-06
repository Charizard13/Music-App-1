"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Playlists_songs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Song,
        {
          foreignKey: "songId",
        }
      );
      // this.belongsTo( models.song,
      //   {
      //     foreignKey: "songId",
      //   }
      // );
      // this.belongsTo( models.playlist,
      //   {
      //     foreignKey: "playlistId",
      //   }
      // );
    
    }
  };

  Playlists_songs.init(
    {
      playlistId: DataTypes.INTEGER,
      songId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Playlists_songs",
    }
  );
  return Playlists_songs;
};
