// import Mathemagician from "game_lobby_server/src/games/Mathemagician";

// const startGame = () => {
//     return (
//         fetch()
//     )
// }

// // Example POST method implementation:
// async function startGame(url = 'http://localhost:8081/games', data = {}) {
//     const response = await fetch("http://localhost:8081/games", {
//       method: 'POST', 
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ 
//         type: "mathemagician", 
//         rounds: "rounds"
//     }) 
//     });
//     return response.json(); // parses JSON response into native JavaScript objects
//   }
  
//   postData('https://example.com/answer', { answer: 42 })
//     .then((data) => {
//       console.log(data); // JSON data parsed by `data.json()` call
//     });
  

//   export const answerGame = (id, guess) => {
//     return parse(
//         fetch("http://localhost:8081/games/:gameId/moves", {
//             method: "POST",
//             headers: {
//                 "content-type": "application/json"
//             },
//             body: JSON.stringify({ type: type, guess: guess})
//         })
//     );
// };

// if (response.ok) {
//   return await response.json();
// } else {
//   throw new Error((await response.json()).error);
// }

// fetch('flowers.jpg')
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error('Network response was not OK');
//     }
//     return response.blob();
//   })
//   .then((myBlob) => {
//     myImage.src = URL.createObjectURL(myBlob);
//   })
//   .catch((error) => {
//     console.error('There has been a problem with your fetch operation:', error);
//   });