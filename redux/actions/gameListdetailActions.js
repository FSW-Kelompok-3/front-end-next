export const setPlayed = (condition) => ({
  type: 'Is_Game_Played',
  payload: condition
});

export const getGames = () => ({
  type: 'Loaded_All_Game',
  payload: [{ "title": "Game1",
              "id":1,
              "description": "ini game 1 lorem ipsum sit dolor amet lorem ipsum sit dolor amet lorem ipsum sit dolor amet"
            },
            { "title": "Game2",
              "id":2,
              "description": "ini game 2 lorem ipsum sit dolor amet lorem ipsum sit dolor amet lorem ipsum sit dolor amet"
            },
            { "title": "Game3",
              "id":3,
              "description": "ini game 3 lorem ipsum sit dolor amet lorem ipsum sit dolor amet lorem ipsum sit dolor amet"
            },
            { "title": "Game4",
              "id":4,
              "description": "ini game 4 lorem ipsum sit dolor amet lorem ipsum sit dolor amet lorem ipsum sit dolor amet"
            }
           ]
});

// export function getGames() {
//   return function (dispatch) {
//     return fetch('https://jsonplaceholder.typicode.com/users')
//     .then(response => response.json())
//     .then(json => {
//       dispatch({
//         type: 'Loaded_All_Game',
//         payload: json
//       });
//     });
//   }
// }

export const setGameDetailPosition = (position) => ({
  type: 'Game_Detail_Position',
  payload: position
});

export const setPlayedDummy = (condition) => ({
  type: 'Is_Game_Played_Dummy',
  payload: condition
});
export const resetPlayedDummy = () => ({
  type: 'Reset_Game_Played_Dummy'
});
