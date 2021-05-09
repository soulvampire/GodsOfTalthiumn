/*******************/
/* character stats */
/*******************/
game.character_stat_entity = me.Entity.extend(
  {
    /**********************************************/
    /* data object where to store key information */
    /**********************************************/
    character_stats_data:
    {
      player_stats:
      {
        player_initial_level: 1,
        player_initial_experience: 0,
        player_initial_max_health: 100,
        player_initial_current_health: 100,
        player_initial_max_energy: 100,
        player_initial_current_energy: 100,
        player_initial_max_mana: 100,
        player_initial_current_mana: 100,
        player_initial_gold: 0,
        player_initial_summoning: 30,
        player_initial_summoning_interval: 3000,
      },

      player_skills:
      {
        player_fighting:
        {
          player_level: 1,
          player_experience: 0,
        },

        player_spellcasting:
        {
          player_level: 1,
          player_experience: 0,
        },

        player_archery:
        {
          player_level: 1,
          player_experience: 0,
        },

        player_crafting:
        {
          player_level: 1,
          player_experience: 0,
        },

        player_lockpicking:
        {
          player_level: 1,
          player_experience: 0,
        },
      }
    }
  });